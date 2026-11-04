import unittest
from scripts.interiors.joinery_textile_details import clipped,signed_plan_area


class FloorboardClippingTests(unittest.TestCase):
    def test_point_and_line_contacts_do_not_create_board_faces(self):
        triangle=[(0,0,2.8),(1,0,2.8),(0,1,2.8)]
        self.assertEqual(clipped(triangle,[1,0,2,1]),[])
        self.assertEqual(clipped(triangle,[0,-1,1,0]),[])

    def test_real_overlap_keeps_its_area_and_floor_height(self):
        triangle=[(0,0,2.8),(1,0,2.8),(0,1,2.8)]
        result=clipped(triangle,[0,0,.5,.5])
        self.assertAlmostEqual(signed_plan_area(result),.25)
        self.assertTrue(all(p[2]==2.8 for p in result))

    def test_translation_does_not_create_area_for_a_degenerate_cut(self):
        self.assertEqual(signed_plan_area([(9.7,-.33,2.8)]*3),0)


if __name__=='__main__':unittest.main()
