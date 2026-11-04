"""Continuous roof planes, open courtyard and a level gallery with headroom."""
import json,unittest
from pathlib import Path
from scripts.geometry.continuous_roof import envelope,soffit
from scripts.geometry.symmetric_roof import envelope as previous_envelope,z_at,inside
R=Path(__file__).resolve().parents[1]
class ContinuousRoofTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.cfg=json.loads((R/'proposal/specs/continuous-wing-roof.json').read_text());cls.panels=envelope(cls.cfg,False)
    def test_new_connector_meets_existing_main_wing_without_a_step(self):
        prior=json.loads((R/'proposal/specs/symmetric-wing-roof.json').read_text());spec=json.loads((R/'proposal/specs/design-spec.json').read_text());old=previous_envelope(spec,prior)
        for i in range(1,94):
            x=4.73+i*.1
            self.assertAlmostEqual(soffit(old,x,-5.001),soffit(self.panels,x,-4.999),places=5)
        for y in(-4.9,-3.5,-2,0,2,4):
            top=max(z_at(p['plane'],9.455,y)for p in self.panels if inside(9.455,y,p['poly']))
            self.assertAlmostEqual(top,8.05,places=5)
    def test_restored_projection_provides_a_900mm_level_gallery(self):
        self.assertAlmostEqual(self.cfg['facadeX']-self.cfg['previousFacadeX'],.72)
        for j in range(71):
            y=-3+j*.1
            for x in(9.29,9.74,10.19):
                self.assertGreaterEqual(min(7.6,soffit(self.panels,x,y))-5.55,2.049)
    def test_courtyard_stays_open_and_relocated_rooflights_have_real_openings(self):
        for x in(10.8,11.5,12.5,13.5):self.assertIsNone(soffit(self.panels,x,-1.5))
        cut=envelope(self.cfg)
        for x0,y0,x1,y1 in self.cfg['rooflights']:
            self.assertIsNone(soffit(cut,(x0+x1)/2,(y0+y1)/2))
            self.assertAlmostEqual(soffit(self.panels,(x0+x1)/2,(y0+y1)/2),7.6)

if __name__=='__main__':unittest.main()
