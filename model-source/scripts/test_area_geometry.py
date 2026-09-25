"""Regression: a stair opening touching the facade must not reduce the envelope."""
import unittest
from area_geometry import internal_envelope

class PerimeterAreaTests(unittest.TestCase):
    def model(self):
        corners=[(0,0),(10,0),(10,8),(0,8)]
        walls=[];objects=[]
        for i,(a,b)in enumerate(zip(corners,corners[1:]+corners[:1])):
            dx,dy=b[0]-a[0],b[1]-a[1];length=(dx*dx+dy*dy)**.5;nx,ny=-dy/length,dx/length
            name=f'Exterior {i}';walls.append(dict(name=name,a=a,b=b,external=True,floor=1,thickness_m=.2))
            vertices=[(p[0]+nx*t,p[1]+ny*t,z)for p in(a,b)for t in(-.1,.1)for z in(0,2.5)]
            objects.append(dict(name=name+' | wall',layer='21 First floor - walls',vertices=vertices))
        # Deliberate deep notch at the front, as in the real first-floor stair slab.
        rooms=[dict(floor=1,polygon_m=[(0,0),(4,0),(4,4),(6,4),(6,0),(10,0),(10,8),(0,8)])]
        return dict(walls=walls,objects=objects,rooms=rooms)

    def test_stair_notch_is_included(self):
        self.assertAlmostEqual(internal_envelope(self.model(),1).area,9.8*7.8,places=6)

    def test_broken_external_perimeter_is_rejected(self):
        m=self.model();m['walls'].pop()
        with self.assertRaisesRegex(ValueError,'closed exterior perimeter'):internal_envelope(m,1)

if __name__=='__main__':unittest.main()
