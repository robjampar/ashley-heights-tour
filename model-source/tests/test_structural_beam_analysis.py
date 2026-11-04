import unittest
from scripts.structure.beam_analysis import gravity_span, loaded_steel_screen, loaded_timber_screen


class GravityBeamAnalysisTests(unittest.TestCase):
    def test_uniform_load_against_closed_form(self):
        L=6.;w=7.;E=210000.;I=14265e4
        r=gravity_span(L,[(0,L,w)],I_mm4=I)
        self.assertAlmostEqual(r['reactionKN'],w*L/2)
        self.assertAlmostEqual(r['momentKNm'],w*L**2/8)
        self.assertAlmostEqual(r['momentStationM'],L/2)
        self.assertAlmostEqual(r['deflectionStationM'],L/2)
        self.assertAlmostEqual(r['deflectionMm'],5*w*(L*1000)**4/(384*E*I))

    def test_off_centre_point_statics_and_maximum_deflection(self):
        L=8.;a=2.;b=L-a;P=20.;E=210000.;I=8503e4
        r=gravity_span(L,points=[(a,P)],I_mm4=I)
        self.assertAlmostEqual(r['reactionsKN'][0],P*b/L)
        self.assertAlmostEqual(r['reactionsKN'][1],P*a/L)
        self.assertAlmostEqual(r['momentKNm'],P*a*b/L)
        # Closed form for a load on the left half, maximum to its right.
        x=L-( (L*L-a*a)/3 )**.5
        expected=P*a*(L-x)*(L*L-a*a-(L-x)**2)/(6*L*(E*I/1e9))*1000
        self.assertAlmostEqual(r['deflectionStationM'],x)
        self.assertAlmostEqual(r['deflectionMm'],expected)

    def test_partial_udl_and_joint_reaction_equilibrium(self):
        r=gravity_span(7,[(1,4,3)],[(5,11)],I_mm4=1e8)
        self.assertAlmostEqual(sum(r['reactionsKN']),20)
        self.assertAlmostEqual(r['reactionsKN'][1]*7,9*2.5+11*5)
        self.assertAlmostEqual(r['equilibriumResidualKN'],0)
        for value in r['endDeflectionsMm']:self.assertAlmostEqual(value,0)

    def test_load_at_support_does_not_create_bending(self):
        r=gravity_span(5,points=[(0,10),(5,20)],I_mm4=1e8)
        self.assertEqual(r['reactionsKN'],[10,20])
        self.assertAlmostEqual(r['momentKNm'],0)
        self.assertAlmostEqual(r['deflectionMm'],0)

    def test_invalid_loads_fail(self):
        for args in [(5,[(0,6,1)],[]),(5,[],[(6,1)]),(5,[(2,2,1)],[]),(5,[],[(2,-1)])]:
            with self.assertRaises(ValueError):gravity_span(*args,I_mm4=1e8)

    def test_timber_arbitrary_loading_matches_uniform_reference(self):
        from scripts.structure.trial_calculations import timber_header_screen
        reference=timber_header_screen(300,4.8,1.2,1.6)
        actual=loaded_timber_screen({'name':'90 x 300 C24','widthMm':90,'depthMm':300},4.8,[(0,4.8,1.2)],[(0,4.8,1.6)])
        self.assertAlmostEqual(actual['instant']['deflectionMm'],reference['instantDeflectionMm'])
        self.assertAlmostEqual(actual['sls']['deflectionMm'],reference['finalDeflectionMm'])
        for a,b in zip(actual['strengthCases'],reference['strengthCases']):
            self.assertAlmostEqual(a['momentKNm'],b['momentKNm'])
            self.assertAlmostEqual(a['reactionKN'],b['reactionKN'])
        self.assertEqual(actual['withinScreen'],reference['withinScreen'])

    def test_steel_screen_scales_dead_and_live_point_reactions_separately(self):
        s={'name':'test','family':'UC','kgPerM':40.3,'depthMm':303.4,'widthMm':165.,'webMm':6.,'flangeMm':10.2,'rootMm':8.9,'flatWebMm':265.2,'ImajorCm4':8503,'WelMajorCm3':560}
        r=loaded_steel_screen(s,5,permanent_points=[(1,10)],variable_points=[(4,20)])
        self.assertAlmostEqual(sum(r['uls']['reactionsKN']),1.35*(10+40.3*9.81/1000*5)+1.5*20)
        self.assertFalse(r['approvedForConstruction'])


if __name__=='__main__':unittest.main()
