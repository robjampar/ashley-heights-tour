import json
import math
import unittest
from scripts.structure.trial_calculations import (
    ROOT, CATALOG, SPEC, simple_span, steel_screen, joist_options,
    lintel_lookup, retaining_pressure, timber_header_screen,
)


class TrialCalculationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.cat=json.loads(CATALOG.read_text())

    def test_known_simple_span_udl_and_point(self):
        # 6 m, 10 kN/m, 20 kN centre point. Hand equilibrium and elastic result.
        r=simple_span(6,10,20,200000,100000000)
        self.assertAlmostEqual(r['momentKNm'],75)
        self.assertAlmostEqual(r['reactionKN'],40)
        self.assertAlmostEqual(r['deflectionMm'],12.9375)

    def test_invalid_inputs_fail_closed(self):
        for args in [(0,1,0,210000,1e8),(5,-1,0,210000,1e8),(5,1,0,210000,math.nan)]:
            with self.assertRaises(ValueError):simple_span(*args)
        with self.assertRaises(ValueError):retaining_pressure(3,18,20,.5,10,4)

    def test_steel_self_weight_and_units(self):
        s=self.cat['steel'][0];r=steel_screen(s,5,5,3)
        self.assertAlmostEqual(r['selfWeightKNm'],.2943)
        self.assertAlmostEqual(r['elasticMomentResistanceKNm'],99.4)
        self.assertAlmostEqual(r['uls']['reactionKN'],(1.35*5.2943+1.5*3)*5/2)
        self.assertFalse(r['approvedForConstruction'])
        self.assertFalse(r['lateralStabilityChecked'])

    def test_supplier_columns_and_boundary(self):
        # Same first joist row: heavy-load 3621 vs light-load 4024 mm.
        light=joist_options(self.cat['joists'],4.024,.75)
        heavy=joist_options(self.cat['joists'],4.024,1.35)
        self.assertEqual(light['candidate']['name'],'JJI 195A+')
        self.assertNotEqual(heavy['candidate']['name'],'JJI 195A+')
        self.assertNotEqual(joist_options(self.cat['joists'],4.025,.75)['candidate']['name'],'JJI 195A+')
        self.assertIsNone(joist_options(self.cat['joists'],3,1.36)['candidate'])
        self.assertIsNone(joist_options(self.cat['joists'],3,.75,2)['candidate'])
        self.assertIsNone(joist_options(self.cat['joists'],8.6,.75)['candidate'])

    def test_lintel_bearing_length_and_service_load(self):
        r=lintel_lookup(self.cat['lintels'],1.2,2,6)
        self.assertEqual(r['candidate']['lengthMm'],1500)
        self.assertAlmostEqual(r['totalUnfactoredUDLKN'],9.6)
        self.assertTrue(r['withinSWL'])
        self.assertFalse(lintel_lookup(self.cat['lintels'],1.2,2,12)['withinPublishedDomain'])
        self.assertFalse(lintel_lookup(self.cat['lintels'],1.2,2,6,1)['withinPublishedDomain'])
        self.assertIsNone(lintel_lookup(self.cat['lintels'],3.31,2,6)['candidate'])

    def test_earth_pressure_analytic_dry_and_submerged(self):
        # Dry p(z)=5+9z, H=3. Exact triangular + rectangular result.
        r=retaining_pressure(3,18,20,.5,10,0)
        self.assertAlmostEqual(r['basePressureKPa'],32)
        self.assertAlmostEqual(r['resultantKNperM'],55.5)
        self.assertAlmostEqual(r['cantileverBaseMomentKNmPerM'],63)
        r=retaining_pressure(3,18,20,.5,0,3)
        gradient=.5*(20-9.81)+9.81
        self.assertAlmostEqual(r['resultantKNperM'],gradient*9/2)
        self.assertAlmostEqual(r['cantileverBaseMomentKNmPerM'],gradient*27/6)

    def test_partial_water_matches_independent_midpoint_integration(self):
        H=3.05;wh=1.5;n=10000;dz=H/n;f=m=0
        for i in range(n):
            z=(i+.5)*dz;dry=min(z,H-wh);wet=max(0,z-(H-wh))
            p=.5*(10+19*dry+(21-9.81)*wet)+9.81*wet
            f+=p*dz;m+=p*(H-z)*dz
        r=retaining_pressure(H,19,21,.5,10,wh)
        self.assertAlmostEqual(f,r['resultantKNperM'],places=5)
        self.assertAlmostEqual(m,r['cantileverBaseMomentKNmPerM'],places=5)

    def test_timber_creep_and_permanent_case(self):
        r=timber_header_screen(195,2,5,0)
        self.assertAlmostEqual(r['finalDeflectionMm'],r['instantDeflectionMm']*1.6)
        self.assertEqual([x['kmod'] for x in r['strengthCases']],[.6,.8])
        self.assertFalse(r['supportStudsDesigned']);self.assertFalse(r['connectionsDesigned'])
        self.assertGreater(r['requiredDirectBearingLengthMm'],0)
        self.assertFalse(r['approvedForConstruction'])

    def test_direction_correction_and_preferred_stud_wall(self):
        spec=json.loads(SPEC.read_text())
        self.assertEqual(spec['floorZones'][0]['clearSpanM'],6.056)
        self.assertTrue(spec['timberWall']['preferred'])
        self.assertNotIn(8.59,[z['clearSpanM'] for z in spec['floorZones']])
        self.assertEqual(len(spec['timberWall']['openings']),3)
        self.assertFalse(spec['approvedForConstruction'])


if __name__=='__main__':unittest.main()
