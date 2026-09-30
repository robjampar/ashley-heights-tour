
# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import unittest
import numpy as np
from shapely.geometry import Polygon
from scripts.geometry.mesh_face_triangles import triangulate_face

class FaceTriangulationTests(unittest.TestCase):
    def test_concave_opening_stays_empty_in_all_plane_axes(self):
        q=np.array([[0,0],[3,0],[3,1],[1,1],[1,3],[0,3]],float)
        source=Polygon(q)
        for drop in range(3):
            v=np.insert(q,drop,2,axis=1)
            triangles=triangulate_face(v,range(len(v)))
            polygons=[Polygon(np.delete(t,drop,axis=1)) for t in triangles]
            self.assertAlmostEqual(sum(p.area for p in polygons),source.area)
            self.assertTrue(all(source.covers(p) for p in polygons))
    def test_degenerate_face_is_ignored(self):
        v=np.array([[0,0,0],[1,0,0],[2,0,0],[3,0,0]],float)
        self.assertEqual(triangulate_face(v,range(4)),[])
    def test_self_crossing_face_has_finite_coordinates(self):
        v=np.array([[0,0,0],[2,2,0],[0,2,0],[2,0,0]],float)
        t=triangulate_face(v,range(4))
        self.assertTrue(len(t)>0)
        self.assertTrue(np.isfinite(t).all())
if __name__=='__main__':unittest.main()
