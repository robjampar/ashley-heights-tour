"""Regression checks for the coordinated roof envelope and level route."""
import json,math,unittest
from pathlib import Path
from scripts.geometry.symmetric_roof import envelope,soffit,z_at,inside
R=Path(__file__).resolve().parents[1]
class SymmetricRoofTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.cfg=json.loads((R/'proposal/specs/symmetric-wing-roof.json').read_text())
        cls.spec=json.loads((R/'proposal/specs/design-spec.json').read_text())
        cls.panels=envelope(cls.spec,cls.cfg)
    def test_equal_pitches_and_existing_datums(self):
        c=self.cfg;a,b=c['eavesX'];self.assertAlmostEqual(c['ridgeX'],(a+b)/2)
        self.assertEqual((c['ridgeZ'],c['eaveZ'],c['floorZ']),(8.05,5.35,5.55))
        for d in (.5,1.,2.,3.,4.):
            # South of the rear dormer, both roof faces share the same envelope.
            self.assertAlmostEqual(soffit(self.panels,c['ridgeX']-d,-12.3),soffit(self.panels,c['ridgeX']+d,-12.3),places=7)
    def test_continuous_body_without_roof_holes(self):
        for i in range(1,95):
            for j in range(1,116):
                x=4.73+i*.1;y=-16.506+j*.099
                self.assertIsNotNone(soffit(self.panels,x,y),(x,y))
    def test_turn_enters_dormer_before_lower_roof(self):
        c=self.cfg;route=c['suiteRoute']
        for a,b in zip(route,route[1:]):
            length=math.dist(a,b)
            for j in range(51):
                x=a[0]+(b[0]-a[0])*j/50;y=a[1]+(b[1]-a[1])*j/50
                for dx,dy in ((-.45,-.45),(.45,-.45),(-.45,.45),(.45,.45)):
                    if y+dy<c['mainNorthY']:
                        h=soffit(self.panels,x+dx,y+dy)
                        self.assertIsNotNone(h);self.assertGreaterEqual(min(h,c['finishedCeilingZ'])-5.564,2.)
