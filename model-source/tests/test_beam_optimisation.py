"""Limits, loads and physical fit of the conditional smaller-section proposal."""
import json
import math
import unittest
from pathlib import Path
from scripts.structure.beam_analysis import loaded_steel_screen

ROOT = Path(__file__).resolve().parents[1]


class BeamOptimisationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.model = json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
        cls.by = {e['id']: e for e in cls.model['elements']}
        cls.spec = json.loads((ROOT/'proposal/specs/beam-optimisation.json').read_text())
        cls.old = json.loads((ROOT/'revisions/beam-optimisation-2026-10-28/original/walkthrough/public/structure/members.json').read_text())
        cls.oldby = {e['id']: e for e in cls.old['elements']}

    def test_policy_is_member_specific_and_cannot_claim_approval(self):
        self.assertFalse(self.model['approvedForConstruction'])
        for key, rule in self.spec['members'].items():
            e = self.by[key]
            self.assertEqual(e['steelProfile']['name'], rule['section'])
            review = e['buildingRegulationsReview']
            self.assertEqual(review['status'], 'not-demonstrated')
            self.assertFalse(review['approvedForConstruction'])
            self.assertFalse(review['serviceability']['verifiedForAssembly'])
            self.assertGreaterEqual(len(review['outstanding']), 6)
            cases = e['supportScreen']['cases'] + e['supportScreen']['patternCases']
            self.assertEqual(len(cases), 12)
            for c in cases:
                self.assertEqual(c['totalDeflectionLimitMm'], 20 if key in ('M-FR-3-001','M-FR-3-010') else 10)
                self.assertAlmostEqual(c['variableDeflectionLimitMm'], c['engineeringSpanM']*1000/360)
                self.assertFalse(c['approvedForConstruction'])
                self.assertTrue(c['withinScreen'], (key,c['checks']))
        self.assertIsNone(self.by['M-FR-1-026']['supportScreen']['cases'][0]['serviceabilityPolicy'])

    def test_default_limit_and_factored_loads_are_not_relaxed(self):
        section = self.by['M-FR-3-001']['steelProfile']
        policy = self.spec['members']['M-FR-3-001']['serviceability']
        old = loaded_steel_screen(section,8,[(0,8,4)],[(0,8,3)])
        new = loaded_steel_screen(section,8,[(0,8,4)],[(0,8,3)],serviceability=policy)
        self.assertEqual(old['totalDeflectionLimitMm'],10)
        self.assertEqual(new['totalDeflectionLimitMm'],20)
        self.assertEqual(old['uls'],new['uls'])
        expected = (1.35*(4+section['kgPerM']*9.81/1000)+1.5*3)*8**2/8
        self.assertAlmostEqual(new['uls']['momentKNm'],expected)
        for bad in (0,-1,float('nan')):
            with self.assertRaises(ValueError):
                loaded_steel_screen(section,8,serviceability={**policy,'totalAbsoluteMm':bad})

    def test_main_candidate_still_fails_the_old_total_limit(self):
        e=self.by['M-FR-3-001'];c=e['supportScreen']['cases'][-1];ld=c['loads']
        old = loaded_steel_screen(e['steelProfile'],c['engineeringSpanM'],ld['permanentUDL'][:-1],ld['variableUDL'],ld['permanentPoints'],ld['variablePoints'])
        self.assertFalse(old['checks']['totalDeflection'])
        self.assertTrue(c['checks']['totalDeflection'])
        self.assertGreater(c['sls']['deflectionMm'],18)
        self.assertLess(c['sls']['deflectionMm'],20)

    def test_geometry_preserves_support_lines_floor_tops_and_mass(self):
        for ident in self.spec['members']:
            e=self.by[ident];old=self.oldby[ident]
            self.assertEqual([p[:2]for p in e['axis']],[p[:2]for p in old['axis']])
            self.assertEqual(e['bounds'][1][2],old['bounds'][1][2])
            self.assertLess(e['sectionSizeM'][1],old['sectionSizeM'][1])
            self.assertLess(e['cost']['quantity'],old['cost']['quantity'])
            self.assertAlmostEqual(e['cost']['quantity'],math.dist(*e['axis'])*e['steelProfile']['kgPerM'],places=4)
            for seat in e['bearingSeats']:
                self.assertAlmostEqual(seat['baseSupportedFraction'],1)

    def test_lower_transfer_receives_the_resized_cross_beam_reaction(self):
        main=self.by['M-FR-3-001']['supportScreen']['cases']
        lower=self.by['M-GABLE-FLOOR-BLOCK']['supportScreen']['cases']
        for parent,child in zip(main,lower):
            self.assertAlmostEqual(child['loads']['permanentPoints'][0][1],parent['permanent']['reactionsKN'][0])
            self.assertAlmostEqual(child['loads']['variablePoints'][0][1],parent['variable']['reactionsKN'][0])
        for c in self.model['loftLoadpath']['cases']:
            self.assertLess(c['equilibriumResidualKN'],1e-7)

    def test_existing_scope_has_no_new_contacts_or_finish_clashes(self):
        fit=self.model['junctionReview']['connectionFit']
        self.assertEqual(fit['intersections'],[])
        self.assertEqual(fit['seatLevelErrors'],[])
        self.assertEqual(self.model['supportAudit']['unmappedJoistEnds'],0)
        for key in ('junctionReview','coveringFit'):
            new=self.model[key]['clashAudit'] if key=='junctionReview' else self.model[key]
            old=self.old[key]['clashAudit'] if key=='junctionReview' else self.old[key]
            pair=lambda e:tuple(sorted([e['a'],e['b']])) if key=='junctionReview' else (e['objectName'],e['memberId'])
            self.assertLessEqual({pair(e)for e in new['intersections']},{pair(e)for e in old['intersections']})
