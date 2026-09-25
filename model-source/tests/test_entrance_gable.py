"""Check the delivered entrance verges for the reported coplanar-face glitch."""
import json
import unittest
from pathlib import Path
import numpy as np
from shapely.geometry import Polygon
from shapely.ops import unary_union

ROOT=Path(__file__).resolve().parents[1]

class EntranceGableTests(unittest.TestCase):
 def test_disjoint_front_faces_and_variant_specific_roof_verges(self):
  for variant in ('compact','planning'):
   with self.subTest(variant=variant):
    data=json.loads((ROOT/f'output-proposed-{variant}/geometry.json').read_text())
    bands=[o for o in data['objects'] if o['name'].startswith('Proposal | Entrance gable ') and 'rake band' in o['name']]
    self.assertEqual(len(bands),2)
    front=min(v[0] for o in bands for v in o['vertices'])
    back=max(v[0] for o in bands for v in o['vertices'])
    faces={}
    for ob in data['objects']:
     if not ob['vertices']:continue
     v=np.asarray(ob['vertices']);pieces=[]
     if v[:,0].min()>front+2e-5 or v[:,0].max()<front-2e-5:continue
     for indices in ob['faces']:
      p=v[indices]
      if len(indices)>=3 and np.max(np.abs(p[:,0]-front))<2e-5:
       q=Polygon(p[:,1:3]).buffer(0)
       if q.area>1e-8:pieces.append(q)
     if pieces:faces[ob['object_name']]=unary_union(pieces)
    for band in bands:
     p=faces[band['object_name']]
     for name,q in faces.items():
      if name!=band['object_name']:
       self.assertLess(p.intersection(q).area,2e-6,(variant,band['name'],name))
    roof=[o for o in data['objects'] if o['name'].startswith('Proposal | Joined roof') and 'Gate gable' in o['name']]
    self.assertGreater(len(roof),4)
    # The 24 September planning detail lowers the rake band and carries
    # the tiled verge over it. The compact roof still stops behind the band.
    roof_front=front if variant=='planning' else back
    self.assertAlmostEqual(min(v[0] for ob in roof for v in ob['vertices']),roof_front,places=4)
    for ob in roof:
     self.assertGreaterEqual(min(v[0] for v in ob['vertices']),roof_front-2e-5,ob['name'])
    for side in ('south','north'):
     pier=next(o for o in data['objects'] if o['name']=='Proposal | West entrance '+side+' pier')
     wall=next(o for o in data['objects'] if o['name']=='Proposal | Entrance bay '+side+' return')
     self.assertGreaterEqual(min(v[0] for v in wall['vertices']),max(v[0] for v in pier['vertices'])-2e-5)

if __name__=='__main__':unittest.main()
