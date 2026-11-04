import unittest
from shapely.geometry import box, LineString
from scripts.structure.simple_stacked_wall_study import study


class SimpleStackedWallStudyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.r,cls.model=study()

    def test_floor_polygon_is_covered_without_filling_the_void(self):
        r=self.r
        self.assertAlmostEqual(r['areaAudit']['actualM2'],83.3397825,places=6)
        self.assertLess(r['areaAudit']['outsideM2'],1e-8)
        self.assertLess(r['areaAudit']['uncoveredM2'],1e-8)
        void=box(5.2325,-8.63,7.35,-5.3).buffer(-1e-5)
        for j in r['joists']:
            self.assertFalse(LineString(j['axis']).intersects(void))

    def test_every_joist_has_two_bearing_lines(self):
        r=self.r;s=r['spec'];x=r['spineAxisM']
        supports={k:LineString(v['line']) for k,v in r['floorRoute']['grid'].items()}
        supports.update({k:LineString([[xx,s['southAxisM']],[xx,s['northTransferAxisM']]])
                         for k,xx in [('west-wall',s['westAxisM']),('east-wall',s['eastAxisM']),('spine-wall',x)]})
        from shapely.geometry import Point
        for j in r['joists']:
            self.assertLessEqual(j['spacingM'],.4+1e-9)
            for i,side in enumerate(('left','right')):
                self.assertLess(supports[j[side]].distance(Point(j['axis'][i])),1e-8)

    def test_gravity_network_conserves_load_under_all_patterns(self):
        cases=self.r['floorRoute']['cases'];self.assertEqual(len(cases),18)
        for c in cases:
            self.assertLess(abs(c['equilibriumResidualKN']),1e-8)
            self.assertTrue(c['allWithinIsolatedGravityScreen'])

    def test_actual_timber_section_uniform_and_point_load_cases(self):
        cases=self.r['joistChecks'];self.assertEqual(len(cases),6)
        self.assertTrue(all(c['withinScreen'] for c in cases))
        c=next(c for c in cases if c['scenario']=='high' and c['action']=='distributed')
        L=self.r['equalLoftSpanM'];own=.072*.245*4.2
        expected=(1.35*(1.35*.4+own)+1.5*1.5*.4)*L**2/8
        self.assertAlmostEqual(c['uls']['momentKNm'],expected,places=8)
        self.assertAlmostEqual(L,4.2225)

    def test_vehicle_and_existing_furniture_aisles(self):
        r=self.r
        self.assertGreaterEqual(r['garage']['westVanClearanceM'],.49)
        self.assertGreaterEqual(r['garage']['eastVanClearanceM'],.49)
        self.assertGreaterEqual(r['bar']['westAisleAfterConsoleRelocationM'],.9)
        self.assertTrue(r['bar']['consoleRelocationRequired'])
        self.assertGreaterEqual(r['cinemaSofaEastAisleM'],1.2)

    def test_study_does_not_claim_the_unverified_garage_beam_works(self):
        trial=self.r['lowerGarageTransferSensitivity'][0]
        self.assertEqual(trial['section'],'305x165x40')
        self.assertFalse(any(c['withinScreen'] for c in trial['cases']))
        self.assertFalse(self.r['installed'])
        self.assertFalse(self.r['approvedForConstruction'])
        self.assertFalse(any(c['selected'] for c in self.r['lowerGarageTransferSensitivity']))


if __name__=='__main__':unittest.main()
