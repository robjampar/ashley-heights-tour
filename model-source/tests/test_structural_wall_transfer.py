import json
import unittest
from pathlib import Path
from scripts.structure.loft_loadpath import compare_scheme, CURRENT_MEMBERS

ROOT=Path(__file__).resolve().parents[1]


class WallTransferStudy(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.catalog=json.loads((ROOT/'proposal/specs/structural-uk-catalog.json').read_text())
        cls.scenarios=json.loads((ROOT/'proposal/specs/structural-trials.json').read_text())['scenarios']
        # Regression for the rejected wall-transfer study uses its original
        # sections, not the independently changed live SW02 girder choices.
        by={e['id']:e for e in json.loads((ROOT/'revisions/sw02-integration-2026-10-27/original/walkthrough/public/structure/members.json').read_text())['elements']}
        cls.fixed={k:by[v]['steelProfile']for k,v in CURRENT_MEMBERS.items()}
        cls.fixed['main']=cls.fixed.pop('main-south');cls.fixed.pop('main-north')

    def run_case(self,pattern='all-loaded'):
        return compare_scheme(self.catalog,self.scenarios,main_x=8.32,post_y=None,
            continuous_main_support_y=-9.905,fixed_sections=self.fixed,
            north_west_support=5.4,edge_supported=True,variable_pattern=pattern)

    def test_reactions_conserve_every_pattern_through_the_transfer(self):
        for pattern in ('all-loaded','main-south-only','main-north-only'):
            for case in self.run_case(pattern)['cases']:
                self.assertAlmostEqual(case['equilibriumResidualKN'],0,places=7)
                self.assertEqual(len(case['members']['main']['uls']['reactionsKN']),3)
                self.assertTrue(case['allWithinScreen'])
                self.assertNotIn('column',case['externalReactions'])

    def test_continuity_does_not_reuse_the_lower_split_beam_wall_reaction(self):
        case=self.run_case()['cases'][-1]
        self.assertAlmostEqual(case['externalReactions']['bearing-wall']['ulsKN'],124.9834,places=3)
        self.assertLess(case['members']['main']['sls']['deflectionMm'],2)
        self.assertGreater(self.run_case('main-north-only')['cases'][-1]['members']['north-transfer']['sls']['deflectionMm'],
                           case['members']['north-transfer']['sls']['deflectionMm'])

    def test_rejects_ambiguous_support_models(self):
        with self.assertRaises(ValueError):
            compare_scheme(self.catalog,self.scenarios,post_y=-8.63,continuous_main_support_y=-9.905)
        with self.assertRaises(ValueError):
            compare_scheme(self.catalog,self.scenarios,post_y=None,continuous_main_support_y=-20)

    def test_favourable_dead_load_exposes_north_connection_uplift(self):
        main=self.run_case('main-south-only')['cases'][0]['members']['main']
        self.assertTrue(main['upliftSensitivity']['requiresPositiveConnection'])
        self.assertAlmostEqual(main['upliftSensitivity']['holdDownDemandKN'],.676,places=2)
        self.assertFalse(main['upliftSensitivity']['connectionCapacityVerified'])


if __name__=='__main__':unittest.main()
