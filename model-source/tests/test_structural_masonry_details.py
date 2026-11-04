import copy
import json
import unittest
from pathlib import Path
import numpy as np
from scripts.structure.junctions import cuboid,solid,triangles,reserve_bearing_seats,coordinate_masonry
from scripts.structure.masonry_details import extend_bearing_ends,add_cavity_closures,audit_beam_end_bearings,add_retained_pier_continuity,settle_masonry_ownership

ROOT=Path(__file__).resolve().parents[1]


def member(ident,lo,hi,category='masonry',**kw):
    return dict(id=ident,name=ident,category=category,triangles=triangles(cuboid(lo,hi)),bounds=[lo,hi],
                sourceIds=[ident],measurements={},level=1,cost={'rateKey':'block','quantity':1},**kw)


def adder(elements):
    def add(ident,name,category,tri,section,**kw):
        v=np.array(tri);e=dict(id=ident,name=name,category=category,triangles=tri,
            bounds=[v.min(0).tolist(),v.max(0).tolist()],measurements={},sourceIds=kw.pop('source',[]),**kw)
        elements.append(e);return e
    return add


class MasonryDetailGeometryTests(unittest.TestCase):
    def test_named_trim_is_not_silently_skipped_by_automatic_corner_limit(self):
        wall=member('brick',[0,0,0],[1,.1025,3],leaf='brick',wallNormal=1,region='house')
        es=[wall];spec={'masonryCornerMaxAdjustmentMm':450,'cornerSearchMm':25,
            'masonryEndCorrections':[dict(memberId='brick',axis=0,end=1,targetM=.5325)]}
        coordinate_masonry(es,spec)
        self.assertAlmostEqual(es[0]['bounds'][1][0],.5325)

    def test_final_same_leaf_ownership_preserves_the_physical_union(self):
        a=member('owner',[0,0,0],[.2,.1,3],leaf='block',wallNormal=1)
        b=member('other',[.1,0,0],[.3,.1,3],leaf='block',wallNormal=1)
        before=(solid(a['triangles'])+solid(b['triangles'])).volume()
        rows=settle_masonry_ownership([a,b],{'finalMasonryOwnership':[dict(ownerId='owner',trimId='other')]})
        self.assertAlmostEqual(rows[0]['removedDuplicateM3'],.03)
        self.assertAlmostEqual((solid(a['triangles'])+solid(b['triangles'])).volume(),before)
        self.assertLess((solid(a['triangles'])^solid(b['triangles'])).volume(),1e-9)

    def test_padstone_rejects_unbacked_masonry_and_preserves_real_contact(self):
        wall=member('wall',[0,0,0],[1,.1,3],leaf='block',wallNormal=1)
        beam=member('beam',[.3,0,2.4],[.5,3,2.7],'beams')
        rule=dict(id='pad',name='pad',beamId='beam',wallId='wall',planBounds=[[.2,0],[.64,.1]],
                  padDepthM=.14,groutDepthM=.01,nominalBearingM=.1,basis='Trial',requireFullMasonryContact=True)
        es=[copy.deepcopy(wall),copy.deepcopy(beam)]
        record=reserve_bearing_seats(es,{'bearingSeatReservations':[rule]},adder(es))[0]
        self.assertEqual(record['baseSupportedFraction'],1)
        self.assertEqual(es[-2]['level'],1)
        self.assertAlmostEqual((solid(es[0]['triangles'])^solid(es[-2]['triangles'])).volume(),0)
        self.assertAlmostEqual(es[-1]['bounds'][1][2],beam['bounds'][0][2])
        bad={**rule,'planBounds':[[.2,-.1],[.64,.1]]}
        with self.assertRaisesRegex(ValueError,'extends beyond masonry'):
            reserve_bearing_seats([wall,beam],{'bearingSeatReservations':[bad]},adder([]))

    def test_cavity_closer_keeps_leaves_apart_and_remains_nonstructural(self):
        es=[member('outer',[0,0,0],[1,.1025,3],leaf='brick',wallNormal=1),
            member('inner',[0,.2525,0],[1,.3525,3],leaf='block',wallNormal=1)]
        rule=dict(id='closer',name='closer',brickId='outer',blockId='inner',axis=0,end=1,planeM=1,zRange=[0,3])
        result=add_cavity_closures(es,dict(cavityTerminalClosures=[rule],cavityClosureBasis='Unselected',cavityClosureReference='UK supplier'),adder(es))
        self.assertAlmostEqual(result[0]['cavityWidthM'],.15)
        self.assertEqual(len(es),4)
        for e in es[2:]:
            self.assertFalse(e['capacityVerified']);self.assertFalse(e['cavityClosure']['fireRatingVerified'])
            self.assertTrue(e['masonryDetail'])
            for wall in es[:2]:self.assertLess((solid(e['triangles'])^solid(wall['triangles'])).volume(),1e-9)
        self.assertAlmostEqual(sum(solid(e['triangles']).volume()for e in es[2:]),.05*.15*3)

    def test_pad_at_bonded_junction_reserves_both_inner_leaf_pieces(self):
        a=member('left',[0,0,0],[.5,.1,3],leaf='block',wallNormal=1)
        b=member('right',[.5,0,0],[1,.1,3],leaf='block',wallNormal=1)
        beam=member('beam',[.4,0,2.4],[.6,3,2.7],'beams')
        es=[a,b,beam];r=dict(id='pad',name='pad',beamId='beam',wallId='left',additionalSupportWallIds=['right'],
            planBounds=[[.3,0],[.74,.1]],padDepthM=.14,groutDepthM=.01,nominalBearingM=.1,basis='Trial',requireFullMasonryContact=True)
        record=reserve_bearing_seats(es,{'bearingSeatReservations':[r]},adder(es))[0]
        self.assertEqual(record['baseSupportedFraction'],1)
        self.assertEqual(record['wallIds'],['left','right'])
        pad=solid(es[-2]['triangles'])
        for wall in es[:2]:self.assertLess((solid(wall['triangles'])^pad).volume(),1e-9)

    def test_steel_extension_changes_length_without_moving_its_section(self):
        e=member('beam',[0,-.1,2.4],[2,.1,2.7],'beams',axis=[[0,0,2.55],[2,0,2.55]],steelProfile={'kgPerM':40})
        es=[e];old=solid(e['triangles']).volume()
        extend_bearing_ends(es,{'bearingEndExtensions':[dict(memberId='beam',axis=0,end=0,planeM=-.1)]})
        self.assertEqual(e['bounds'][0][1:],[-.1,2.4]);self.assertEqual(e['bounds'][1][1:],[.1,2.7])
        self.assertAlmostEqual(solid(e['triangles']).volume()-old,.1*.2*.3)
        self.assertEqual(e['cost']['quantity'],84)

    def test_a_beam_near_a_wall_is_not_reported_as_a_completed_support(self):
        e=member('beam',[0,-.1,2.4],[2,.1,2.7],'beams',axis=[[0,0,2.55],[2,0,2.55]],steelProfile={'kgPerM':40})
        w=member('wall',[-.2,.15,0],[.2,.25,2.6],leaf='block')
        r=audit_beam_end_bearings([e,w],{'elements':[]},[])
        self.assertEqual(r['ends'][0]['kind'],'masonry-bearing-unresolved')
        self.assertEqual(r['ends'][1]['kind'],'support-unresolved')
        self.assertTrue(all(not x['capacityVerified']for x in r['ends']))

    def test_nearby_concrete_does_not_replace_an_explicit_steel_end_connection(self):
        e=member('beam',[.01,-.1,2.4],[2,.1,2.7],'beams',axis=[[.01,0,2.55],[2,0,2.55]],
            steelProfile={'kgPerM':40},endCutDetails=[{'end':1,'supportId':'steel'}])
        p=member('pad',[-.2,-.2,2.2],[0,.2,2.39],'rc',material='concrete')
        r=audit_beam_end_bearings([e,p],{'elements':[]},[])
        self.assertEqual(r['ends'][0]['kind'],'steel-connection-required')
        self.assertEqual(r['ends'][0]['supportIds'],['steel'])

    def test_hollow_post_is_reported_as_a_real_contact_with_an_undetailed_joint(self):
        beam=member('beam',[0,-.06,2.4],[2,.06,2.7],'beams',axis=[[0,0,2.55],[2,0,2.55]],steelProfile={'kgPerM':40})
        post=member('post',[-.04,-.04,0],[.04,.04,2.4],'beams',material='steel',axis=[[0,0,0],[0,0,2.4]])
        post['triangles']=triangles(cuboid(*post['bounds'])-cuboid([-.035,-.035,-.01],[.035,.035,2.41]))
        r=audit_beam_end_bearings([beam,post],{'elements':[]},[])['ends'][0]
        self.assertEqual(r['kind'],'steel-connection-required');self.assertEqual(r['supportIds'],['post'])
        self.assertAlmostEqual(r['postContacts'][0]['contactAreaM2'],.00075,places=7)
        self.assertFalse(r['capacityVerified'])

    def test_hidden_retained_pier_band_keeps_upper_masonry_and_separate_bedding(self):
        lower=member('lower',[0,0,0],[.4,.4,2.6],'walls')
        upper=member('upper',[0,0,2.8],[.4,.4,5],'walls')
        beam=member('beam',[.1,-2,2.45],[.3,.4,2.756],'beams',issueIds=[])
        es=[beam];rule=dict(id='band',name='band',lowerSourceId='lower',upperSourceId='upper',beamId='beam',
            planBounds=[[0,0],[.4,.4]],zRange=[2.6,2.8],clearanceM=.01,basis='Explicit unverified assumption')
        rows=add_retained_pier_continuity(es,{'elements':[lower,upper]},
            {'retainedPierContinuity':[rule]},adder(es))
        band,bed=es[1:];self.assertTrue(band['retained']);self.assertFalse(band['capacityVerified'])
        self.assertEqual(band['bounds'][1][2],2.8)
        self.assertAlmostEqual(bed['bounds'][0][2],2.756)
        self.assertAlmostEqual(bed['bounds'][1][2],2.766)
        self.assertTrue(rows[0]['retainedQuantityExcluded'])
        for a,b in [(beam,band),(beam,bed),(band,bed)]:
            self.assertLess((solid(a['triangles'])^solid(b['triangles'])).volume(),1e-9)
        # The bed meets an actual upper remnant, not an erased full-height pier.
        contact=cuboid([.1,0,2.766],[.3,.4,2.767])
        self.assertAlmostEqual((contact^solid(band['triangles'])).volume(),contact.volume())

    def test_named_reveal_is_removed_from_retained_band_and_bed_without_relaxing_source_fit(self):
        lower=member('lower',[0,0,0],[.4,.4,2.6],'walls')
        upper=member('upper',[0,0,2.8],[.4,.4,5],'walls')
        reveal=cuboid([0,0,2.6],[.15,.1,5.1])
        upper['triangles']=triangles(solid(upper['triangles'])-reveal)
        beam=member('beam',[.1,-2,2.45],[.3,.4,2.756],'beams',issueIds=[])
        rule=dict(id='band',name='band',lowerSourceId='lower',upperSourceId='upper',beamId='beam',
            planBounds=[[0,0],[.4,.4]],zRange=[2.6,2.8],clearanceM=.01,basis='Explicit unverified assumption')
        with self.assertRaisesRegex(ValueError,'exceeds coincident source pier'):
            add_retained_pier_continuity([beam],{'elements':[lower,upper]},
                {'retainedPierContinuity':[rule]},adder([]))
        rule['planExclusions']=[{'bounds':[[0,0],[.15,.1]],'basis':'Reviewed terminal reveal'}]
        es=[beam];rows=add_retained_pier_continuity(es,{'elements':[lower,upper]},
            {'retainedPierContinuity':[rule]},adder(es))
        for e in es[1:]:self.assertLess((solid(e['triangles'])^reveal).volume(),1e-9)
        self.assertAlmostEqual(rows[0]['upperBedContactFraction'],1)
        self.assertAlmostEqual(rows[0]['lowerBedContactFraction'],1)
        self.assertLess(rows[0]['bedContactAreaM2'],.2*.4)


class InstalledMasonryDetailsTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
        cls.by={e['id']:e for e in cls.data['elements']}

    def test_requested_room_side_returns_join_without_a_solid_cavity_bridge(self):
        by=self.by
        self.assertAlmostEqual(by['M-BLOCK-C99B4D9']['bounds'][1][1],-9.0475)
        self.assertAlmostEqual(by['M-BLOCK-C99B4D9']['bounds'][0][1],-10.1425)
        self.assertAlmostEqual(by['M-BRICK-ACE846B']['bounds'][1][0],5.0325)
        self.assertAlmostEqual(by['M-BLOCK-ACE846B']['bounds'][1][0],5.2825)
        self.assertAlmostEqual(by['M-BLOCK-7C51DD7']['bounds'][0][1],-5.3525)
        self.assertAlmostEqual(by['M-BLOCK-7C51DD7']['bounds'][1][1],-4.2525)
        self.assertAlmostEqual(by['M-BLOCK-34AD690']['bounds'][0][2],2.766)
        self.assertAlmostEqual(by['M-BED-GALLERY-CROSS-W']['bounds'][0][2],2.756)
        self.assertAlmostEqual(by['M-BRICK-6FBC0C0']['bounds'][1][0],5.0325)
        self.assertAlmostEqual(by['M-BLOCK-6FBC0C0']['bounds'][1][0],5.1825)
        self.assertNotIn('M-BLOCK-46D1A49',by)
        self.assertIn('W-46D1A49',by['M-BLOCK-C99B4D9']['sourceIds'])
        self.assertNotIn('M-CLOSE-6FBC0C0-CORE',by)
        for ident in ['34AD690','0C22ABF']:
            core=by['M-CLOSE-'+ident+'-CORE'];profile=by['M-CLOSE-'+ident+'-PROFILE']
            self.assertAlmostEqual(core['cavityClosure']['cavityWidthM'],.15)
            self.assertLess((solid(core['triangles'])^solid(profile['triangles'])).volume(),1e-9)

    def test_new_padstones_have_masonry_below_and_clear_steel_above(self):
        by=self.by
        seats=[r for r in self.data['junctionReview']['masonry']['bearingSeats']if r['padId'].startswith('M-PAD-')]
        self.assertGreaterEqual(len(seats),7)
        for r in seats:
            self.assertEqual(r['baseSupportedFraction'],1)
            self.assertFalse(r['capacityVerified'])
            pad,grout,beam,wall=[by[r[k]]for k in('padId','groutId','beamId','wallId')]
            self.assertAlmostEqual(grout['bounds'][1][2],beam['bounds'][0][2])
            for other in [beam,wall]:self.assertLess((solid(pad['triangles'])^solid(other['triangles'])).volume(),1e-8)

    def test_every_horizontal_rolled_beam_end_has_an_honest_support_record(self):
        beams=[e for e in self.by.values()if e.get('steelProfile')and e.get('axis')and abs(e['axis'][0][2]-e['axis'][1][2])<1e-5]
        self.assertGreater(len(beams),20)
        for beam in beams:
            self.assertEqual(len(beam['endBearingReview']),2)
            self.assertTrue(all(not r['capacityVerified']for r in beam['endBearingReview']))
        self.assertTrue(any(r['kind']=='support-unresolved'for e in beams for r in e['endBearingReview']))

    def test_gallery_uses_continuous_receivers_real_piers_and_an_explicit_head_role(self):
        by=self.by
        self.assertNotIn('M-FR-1-019',by)
        self.assertNotIn('M-L-74AF027',by)
        self.assertIn('O-74AF027',by['M-FR-1-034']['sourceIds'])
        self.assertEqual(by['M-FR-1-034']['supersededOpeningHeads'][0]['memberId'],'M-L-74AF027')
        self.assertAlmostEqual(by['M-FR-1-034']['axis'][1][0],9.04)
        self.assertAlmostEqual(by['M-FR-1-035']['axis'][0][1],-4.21)
        self.assertAlmostEqual(by['M-FR-1-035']['axis'][1][1],.115)
        self.assertAlmostEqual(by['M-FR-1-036']['bounds'][0][0],5.635)
        self.assertEqual(self.data['supportAudit']['unmappedJoistEnds'],0)
        for r in self.data['junctionReview']['masonry']['retainedBearingSeats']:
            if not r['padId'].startswith('M-PAD-GALLERY'):continue
            self.assertEqual({b['role']for b in r['nativeCutBoxes']},{'pad','grout','steel-pocket'})

    def test_retained_band_and_physical_floor_are_separate_nonintersecting_solids(self):
        by=self.by;rows=self.data['junctionReview']['masonry']['retainedPierContinuity']
        self.assertEqual(len(rows),3)
        floor_layers=[e for e in by.values()if e['category']=='layers'and e['level']==1 and e.get('layerRole')in('deck','finish')]
        for r in rows:
            e=by[r['memberId']];self.assertTrue(e['retained']);self.assertIsNone(e['cost'])
            self.assertFalse(r['capacityVerified'])
            for layer in floor_layers:self.assertLess((solid(e['triangles'])^solid(layer['triangles'])).volume(),1e-8)
        self.assertAlmostEqual(by['M-GALLERY-EDGE-ANGLE-02']['bounds'][1][1],-.34)


if __name__=='__main__':unittest.main()
