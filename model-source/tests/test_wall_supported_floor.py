import json
import unittest
from pathlib import Path

from scripts.structure.wall_supported_floor_study import floor_route,joist_screen
from scripts.structure.beam_analysis import loaded_steel_screen

ROOT=Path(__file__).resolve().parents[1]


class WallSupportedFloor(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.cat=json.loads((ROOT/'proposal/specs/structural-uk-catalog.json').read_text())
        cls.scenarios=json.loads((ROOT/'proposal/specs/structural-trials.json').read_text())['scenarios']
        cls.sections={s['name']:s for s in cls.cat['steel']+cls.cat['coordinationSteel']}

    def test_all_floor_actions_reach_named_wall_lines_in_every_pattern(self):
        r=floor_route(self.cat,self.scenarios)
        self.assertEqual(len(r['cases']),12)
        for c in r['cases']:
            self.assertLess(abs(c['equilibriumResidualKN']),1e-8)
            self.assertNotIn('column',c['walls'])
            self.assertNotIn('main',c['members'])
            self.assertFalse(c['combinedFloorMovementVerified'])
        self.assertEqual({c['pattern'] for c in r['cases']},{'all-loaded','gallery-south-only','gallery-north-only','gallery-north-isolated'})

    def test_steel_self_weight_matches_actual_count_in_each_bay(self):
        import math
        c=floor_route(self.cat,self.scenarios)['cases'][0]
        for patch,name in zip(c['patches'][:3],['305x165x40','203x133x30','203x133x30']):
            x0,y0,x1,y1=patch['bounds'];number=math.ceil((y1-y0)/.5)
            total_g=number*(x1-x0)*self.sections[name]['kgPerM']*9.81/1000
            self.assertAlmostEqual(patch['steelSelfWeightKNm2']*patch['areaM2'],total_g,places=8)

    def test_long_span_needs_a_different_section_from_short_bay(self):
        long=joist_screen(self.sections['305x165x40'],8.445,.5,self.scenarios)
        self.assertTrue(long['allWithinStaticScreen'])
        self.assertGreater(long['minimumSingleMemberFrequencyHz'],8)
        inadequate=loaded_steel_screen(self.sections['203x133x30'],8.445,[(0,8.445,1.35*.5)],[(0,8.445,1.5*.5)])
        self.assertFalse(inadequate['withinScreen'])
        self.assertEqual({c['action'] for c in long['cases']},{'distributed','point'})


if __name__=='__main__':unittest.main()
