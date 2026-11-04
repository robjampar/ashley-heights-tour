import unittest
from scripts.structure.continuous_beam import continuous_gravity
from scripts.structure.beam_analysis import gravity_span


class ContinuousBeamTests(unittest.TestCase):
 def test_equal_two_spans_match_closed_form_reactions_and_hogging(self):
  r=continuous_gravity(8,[0,4,8],[(0,8,5)],I_mm4=1e8)
  for actual,expected in zip(r['reactionsKN'],[7.5,25,7.5]):self.assertAlmostEqual(actual,expected)
  self.assertAlmostEqual(r['signedCriticalMomentKNm'],-10)
  self.assertAlmostEqual(r['momentStationM'],4)
 def test_single_span_matches_independent_macaulay_solver(self):
  a=continuous_gravity(6,[0,6],[(0,2,3),(2,6,5)],[(1.3,7)],I_mm4=1e8)
  b=gravity_span(6,[(0,2,3),(2,6,5)],[(1.3,7)],I_mm4=1e8)
  for key in ('momentKNm','deflectionMm','momentStationM','deflectionStationM'):
   self.assertAlmostEqual(a[key],b[key],places=7)
 def test_point_at_middle_support_is_carried_without_bending(self):
  r=continuous_gravity(5,[0,2,5],points=[(2,10)],I_mm4=1e8)
  self.assertEqual(r['reactionsKN'],[0,10,0]);self.assertEqual(r['momentKNm'],0);self.assertEqual(r['deflectionMm'],0)
 def test_unequal_spans_balance_force_and_moment(self):
  r=continuous_gravity(5.3,[0,1.9685,5.3],[(0,1.9685,11),(1.9685,5.3,7)],[(3.7,4)],I_mm4=1e8)
  self.assertAlmostEqual(r['equilibriumResidualKN'],0,places=8)
  self.assertAlmostEqual(r['momentEquilibriumResidualKNm'],0,places=8)
  self.assertTrue(all(abs(x)<1e-7 for x in r['supportDeflectionsMm']))
 def test_invalid_support_and_load_positions_are_rejected(self):
  for supports,udls in [([1,5],[]),([0,6],[]),([0,5],[(0,6,1)])]:
   with self.assertRaises(ValueError):continuous_gravity(5,supports,udls)
 def test_alternate_span_loading_exposes_reaction_reversal(self):
  # Two equal spans, only the right loaded: left reaction is -qL/16,
  # middle is 5qL/8 and right is 7qL/16 (L = one span).
  r=continuous_gravity(8,[0,4,8],[(4,8,5)],I_mm4=1e8)
  for actual,expected in zip(r['reactionsKN'],[-1.25,12.5,8.75]):self.assertAlmostEqual(actual,expected)
 def test_signed_transferred_reactions_preserve_force_moment_and_deflection(self):
  # An upward midspan point load is the exact sign reversal of the ordinary
  # downward solution; it must not disappear or become a downward reaction.
  r=continuous_gravity(6,[0,6],points=[(3,-12)],I_mm4=1e8,allow_signed=True)
  for reaction in r['reactionsKN']:self.assertAlmostEqual(reaction,-6)
  self.assertAlmostEqual(r['signedCriticalMomentKNm'],-18)
  self.assertAlmostEqual(r['signedCriticalDeflectionMm'],-12*6000**3/(48*210000*1e8)*1000)
  with self.assertRaises(ValueError):continuous_gravity(6,[0,6],points=[(3,-12)])


if __name__=='__main__':unittest.main()
