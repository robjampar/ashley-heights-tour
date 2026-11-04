"""WM01 envelope continuity, finite supports, unclashed infill and load balance."""
import json
import unittest
from pathlib import Path
from scripts.structure.junctions import solid,cuboid

ROOT=Path(__file__).resolve().parents[1]


class ExteriorMasonryTests(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.model=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
  cls.by={e['id']:e for e in cls.model['elements']}
  cls.old=json.loads((ROOT/'revisions/exterior-masonry-junctions-2026-10-29/original/walkthrough/public/structure/members.json').read_text())
  cls.oldby={e['id']:e for e in cls.old['elements']}

 def test_first_floor_piers_are_cavity_masonry_but_real_loft_piers_remain_timber(self):
  for source in ('A6681C6','9D75875'):
   self.assertFalse(any(k.startswith(('M-S-'+source,'M-SP-'+source))for k in self.by))
   brick,block=[self.by['M-'+kind+'-'+source]for kind in ('BRICK','BLOCK')]
   self.assertEqual(brick['category'],'masonry');self.assertEqual(block['category'],'masonry')
   self.assertAlmostEqual(brick['bounds'][0][0]-block['bounds'][1][0],.15)
   self.assertAlmostEqual(brick['bounds'][1][0],9.7)
   for e in (brick,block):self.assertGreater(e['unitCount'],0)
  self.assertTrue(any(k.startswith('M-S-C5D458D')for k in self.by))
  self.assertTrue(any(k.startswith('M-S-377E333')for k in self.by))

 def test_west_brick_return_covers_gap_and_meets_existing_masonry(self):
  e=self.by['M-WM01-WEST-RECESS-BRICK'];shape=solid(e['triangles'])
  sample=cuboid([4.93,-9.79,3.2],[5.0325,-9.2975,5.25])
  mate=solid(self.by['M-BRICK-ACE846B']['triangles'])
  self.assertLess((sample-(shape+mate)).volume(),1e-8)
  self.assertLess((shape^mate).volume(),1e-8)
  self.assertNotIn('M-BRICK-393739F',self.by)
  for k in ('M-CJ02-RECESS-S-STUD-01','M-CJ02-RECESS-N-STUD-01'):
   self.assertEqual(self.by[k]['triangles'],self.oldby[k]['triangles'])

 def test_channel_infill_clears_root_flange_and_every_inner_hanger(self):
  e=self.by['M-WM01-GALLERY-CHANNEL-BRICK'];shape=solid(e['triangles']);beam=self.by['M-FR-1-035']
  self.assertEqual(beam['triangles'],self.oldby[beam['id']]['triangles'])
  self.assertFalse(e['channelInfill']['fullBrick'])
  self.assertLess(e['channelInfill']['depthMm'],71)
  self.assertGreaterEqual(e['bounds'][0][0]-beam['axis'][0][0],(beam['steelProfile']['webMm']/2+beam['steelProfile']['rootMm']+1.99)/1000)
  self.assertLess((shape^solid(beam['triangles'])).volume(),1e-8)
  for other in self.by.values():
   if other.get('receiverId')==beam['id'] or other['id'].startswith('M-PACK-INF-GALLERY-'):
    self.assertEqual(other['triangles'],self.oldby[other['id']]['triangles'])
    self.assertLess((shape^solid(other['triangles'])).volume(),1e-8)

 def test_both_pier_leaves_have_full_bedding_and_plate_contact(self):
  for tag,source in [('S','A6681C6'),('N','9D75875')]:
   plate=self.by['M-WM01-PIER-'+tag+'-PLATE'];ps=solid(plate['triangles'])
   for kind in ('BRICK','BLOCK'):
    wall=self.by['M-'+kind+'-'+source];bed=self.by['M-WM01-PIER-'+tag+'-'+kind+'-BED'];lo,hi=bed['bounds']
    under=cuboid([lo[0],lo[1],lo[2]-.0001],[hi[0],hi[1],lo[2]])
    above=cuboid([lo[0],lo[1],hi[2]],[hi[0],hi[1],hi[2]+.0001])^solid(wall['triangles'])
    self.assertLess((under-ps).volume(),1e-9)
    self.assertLess((above.translate([0,0,-.0001])-solid(bed['triangles'])).volume(),1e-9)
   self.assertFalse(plate['constructionDetail']['capacityVerified'])
   self.assertIn('eccentric',plate['section'])

 def test_new_dead_weight_is_counted_once_and_transferred_to_cross_beam(self):
  parts=[e for e in self.by.values()if e.get('additionalPermanentLoad')]
  for i,name in enumerate(('low','reference','high')):
   case=next(c for c in self.model['loftLoadpath']['cases']if c['scenario']==name and c['pattern']=='all')
   expected=sum(solid(e['triangles']).volume()*e['additionalPermanentLoad']['densityBoundsKNm3'][i]for e in parts)
   self.assertAlmostEqual(case['additionalPermanentLoadKN'],expected,places=7)
   self.assertEqual(len({r['memberId']for r in case['additionalPermanentLoads']}),len(parts))
   self.assertLess(case['equilibriumResidualKN'],1e-7)
   reaction=case['members']['M-FR-1-035']['permanent']['reactionsKN'][0]
   receiver=case['members']['M-FR-1-030']['loads']['permanentPoints']
   self.assertTrue(any(abs(w-reaction)<1e-7 for _,w in receiver))
   self.assertTrue(case['members']['M-FR-1-035']['withinScreen'])
  self.assertFalse(self.model['approvedForConstruction'])

 def test_scoped_collision_audits_introduce_no_new_pair(self):
  for key in ('junctionReview','coveringFit'):
   new=self.model[key]['clashAudit']if key=='junctionReview'else self.model[key]
   old=self.old[key]['clashAudit']if key=='junctionReview'else self.old[key]
   pair=lambda x:tuple(sorted((x['a'],x['b'])))if key=='junctionReview'else(x['objectName'],x['memberId'])
   self.assertLessEqual({pair(x)for x in new['intersections']},{pair(x)for x in old['intersections']})
  self.assertEqual(self.model['junctionReview']['connectionFit']['intersections'],[])
  self.assertEqual(self.model['junctionReview']['connectionFit']['seatLevelErrors'],[])

 def test_ground_piers_have_continuous_concrete_below_their_full_actual_base(self):
  concrete=[solid(e['triangles'])for e in self.by.values()if e['category']=='rc'and e['bounds'][0][2]<0 and e['bounds'][1][2]>=0]
  for e in self.by.values():
   if not e['id'].startswith('M-WM01-GROUND-'):continue
   lo,hi=e['bounds'];sample=(solid(e['triangles'])^cuboid([*lo[:2],0],[*hi[:2],.0001])).translate([0,0,-.0001])
   for support in concrete:sample-=support
   self.assertLess(sample.volume(),1e-9,e['id'])
  for key in ('M-WM01-COURTYARD-FOOTING','M-WM01-COURTYARD-UPSTAND'):
   self.assertFalse(self.by[key]['approvedForConstruction'])
