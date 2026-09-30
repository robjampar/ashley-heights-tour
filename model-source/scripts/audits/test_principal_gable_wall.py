
# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json
from pathlib import Path
import unittest
import numpy as np
from shapely.geometry import Polygon, box
from shapely.ops import unary_union
from scripts.interiors.principal_gable_wall import wall_sections, mesh_parts

ROOT = Path(__file__).resolve().parents[2]


class GableWallTests(unittest.TestCase):
    def setUp(self):
        self.spec=json.loads((ROOT/'proposal/specs/design-spec-compact.json').read_text())
        self.config=json.loads((ROOT/'proposal/interiors/principal/gable-wall.json').read_text())

    def test_full_height_door_rejected(self):
        with self.assertRaisesRegex(ValueError,'intersects'):
            wall_sections(self.spec,1.2,'rectangular',2.0)

    def test_infill_and_opening_exactly_cover_former_void(self):
        r=wall_sections(self.spec,1.2,'rectangular',1.7)
        shapes=[Polygon(points) for _,points in r['sections']]
        opening=Polygon(r['opening'])
        south,north=self.spec['garageBay']['y'];floor=r['floor_z_m']
        peak=self.spec['garageBay']['ridge_z']-.25
        import math
        eave=peak-math.tan(math.radians(self.spec['garageBay']['pitch_degrees']))*(north-south)/2
        former=Polygon([(south,floor),(north,floor),(north,eave),(r['centre_y_m'],peak),(south,eave)])
        self.assertLess(unary_union(shapes+[opening]).symmetric_difference(former).area,1e-8)
        for shape in shapes:self.assertLess(shape.intersection(opening).area,1e-8)

    def test_meshes_watertight_outward_and_above_floor(self):
        r,parts=mesh_parts(self.spec,self.config)
        self.assertEqual(len(parts),6)
        for p in parts:
            vertices=np.asarray(p['vertices']);edges={};volume=0
            self.assertGreaterEqual(vertices[:,2].min(),2.8)
            for face in p['faces']:
                for i,a in enumerate(face):
                    edge=tuple(sorted((a,face[(i+1)%len(face)])))
                    edges[edge]=edges.get(edge,0)+1
                for i in range(1,len(face)-1):
                    a,b,c=vertices[[face[0],face[i],face[i+1]]]
                    volume+=np.dot(a,np.cross(b,c))/6
            self.assertTrue(all(n==2 for n in edges.values()))
            self.assertGreater(volume,0)

    def test_opening_and_existing_desk_approach_remain_clear(self):
        r,parts=mesh_parts(self.spec,self.config)
        centre=r['centre_y_m']
        for p in parts:
            o=p['obstacle']
            if o['bottom']<2.8+1.7-1e-8:
                self.assertFalse(box(*o['box']).contains(Polygon([(4.9,centre-.59),(5.2,centre-.59),(5.2,centre+.59),(4.9,centre+.59)]).centroid))
        self.assertLess(max(max(v[0] for v in p['vertices']) for p in parts),5.24)


if __name__=='__main__':unittest.main()
