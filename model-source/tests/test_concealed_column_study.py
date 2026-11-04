import unittest

from scripts.structure.beam_analysis import loaded_steel_screen
from scripts.structure.concealed_column_study import displacement_at, displacement_peak, displacement_segments


class SupportedBeamMovement(unittest.TestCase):
    def member(self, points=()):
        s={'name':'test','family':'UC','kgPerM':40.3,'depthMm':303.4,'widthMm':165.,'webMm':6.,'flangeMm':10.2,'rootMm':8.9,'flatWebMm':265.2,'ImajorCm4':8503,'WelMajorCm3':560}
        return {**loaded_steel_screen(s,6,permanent_points=points),'catalogueSection':s}

    def test_matches_independent_macaulay_solver_for_offcentre_load(self):
        r=self.member([(2,40)])
        actual=displacement_peak(displacement_segments(r))
        self.assertAlmostEqual(actual['deflectionMm'],r['sls']['deflectionMm'],places=7)
        self.assertAlmostEqual(actual['stationM'],r['sls']['deflectionStationM'],places=7)

    def test_support_translation_adds_to_absolute_movement(self):
        r=self.member([(2,40)])
        shifted=displacement_segments(r,(7.,7.))
        self.assertAlmostEqual(displacement_peak(shifted)['deflectionMm'],r['sls']['deflectionMm']+7,places=7)
        self.assertAlmostEqual(displacement_at(shifted,0),7,places=7)
        self.assertAlmostEqual(displacement_at(shifted,6),7,places=7)

    def test_differential_movement_follows_linear_chord(self):
        r=self.member([(2,40)])
        base=displacement_segments(r);moved=displacement_segments(r,(3,9))
        for x in [0,1,2,3,4.5,6]:
            self.assertAlmostEqual(displacement_at(moved,x)-displacement_at(base,x),3+x,places=7)


if __name__=='__main__':unittest.main()
