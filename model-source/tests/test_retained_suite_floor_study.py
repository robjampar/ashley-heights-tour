import unittest
from scripts.structure.retained_suite_floor_study import retained_suite_study


class RetainedSuiteFloorStudyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):cls.r,cls.model=retained_suite_study()

    def test_original_suite_and_furniture_are_preserved(self):
        r=self.r;s=r['suiteCoordination']
        self.assertEqual(r['acceptedSuite']['bedroom']['bed']['center'],[11.15,-14.886])
        self.assertEqual(r['acceptedSuite']['ensuite']['fixtures']['bath'],[12.68,-5.25,13.58,-3.35])
        self.assertTrue(s['bedroomWardrobeBathroomPolygonsRetained'])
        self.assertEqual(s['panelFurnitureIntersections'],[])
        self.assertGreater(s['sofaSideAisleM'],1.2)
        self.assertGreater(s['wardrobeDoorSwingEnvelopeClearanceM'],.15)

    def test_post_lands_on_solid_lower_wall_not_door_or_joist(self):
        s=self.r['suiteCoordination']
        self.assertFalse(s['postPadstoneOverDoor'])
        self.assertGreaterEqual(s['padstoneToDoorJambPlanClearanceM'],.2)
        self.assertAlmostEqual(s['endPanelExtensionM'],.565)
        self.assertEqual(self.r['spec']['retainedGarageNorthDoorX'],[5.25,6.15])
        self.assertFalse(s['postBucklingPadstoneMasonryAndFoundationCapacityVerified'])

    def test_two_girders_deliver_their_reactions_to_the_concealed_post(self):
        for c in self.r['floorRoute']['cases']:
            south,north=c['members']['south-girder'],c['members']['short-girder']
            for case,key in [('permanent','gkKN'),('variable','qkKN')]:
                total=south[case]['reactionsKN'][1]+north[case]['reactionsKN'][0]
                self.assertAlmostEqual(c['walls']['suite-concealed-post'][key],total,places=8)
            self.assertLess(abs(c['equilibriumResidualKN']),1e-8)
            self.assertTrue(c['allWithinIsolatedGravityScreen'])

    def test_floor_coverage_and_depth_are_preserved(self):
        r=self.r
        self.assertLess(r['areaAudit']['outsideM2'],1e-8)
        self.assertLess(r['areaAudit']['uncoveredM2'],1e-8)
        self.assertAlmostEqual(r['equalLoftSpanM'],4.2225)
        self.assertEqual(r['suiteCoordination']['addedDepthComparedWithPreviousMainGirderMm'],0)
        self.assertFalse(r['installed'])
        self.assertFalse(r['approvedForConstruction'])


if __name__=='__main__':unittest.main()
