"""The solid eaves wall must survive roof trimming in both current designs."""
from collections import Counter
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class LoftBedroomWallTests(unittest.TestCase):
    def test_solid_wall_survives_as_a_closed_internal_mesh_below_the_roof(self):
        spec = json.loads((ROOT / 'proposal/specs/design-spec-compact.json').read_text())
        x0, _, x1, _ = spec['frontWing']
        ridge = spec['newWingRoof']['ridge']
        slope = (ridge - spec['newWingRoof']['eave']) / ((x1-x0)/2 + .20)
        for variant in ('compact', 'planning'):
            with self.subTest(variant=variant):
                path = ROOT / f'outputs/output-proposed-{variant}/geometry.json'
                if not path.exists():
                    self.skipTest('Build the current designs first')
                data = json.loads(path.read_text())
                wall = next(o for o in data['objects'] if o['name'] == 'Proposal | Loft knee wall 1')
                vertices, faces = wall['vertices'], wall['faces']
                self.assertGreaterEqual(len(vertices), 8, 'Roof trimming deleted the wall')
                edges = Counter(tuple(sorted((a, b))) for face in faces
                                for a, b in zip(face, face[1:] + face[:1]))
                self.assertTrue(all(count == 2 for count in edges.values()), 'Wall has an open edge')
                self.assertAlmostEqual(min(p[0] for p in vertices), 7.46, places=4)
                self.assertAlmostEqual(max(p[0] for p in vertices), 7.58, places=4)
                self.assertAlmostEqual(min(p[1] for p in vertices), -11.6, places=4)
                self.assertAlmostEqual(max(p[1] for p in vertices), -5.30 if spec.get('loftLevelStair') else -3.98, places=4)
                self.assertAlmostEqual(min(p[2] for p in vertices), 5.55, places=4)
                self.assertGreater(max(p[2] for p in vertices), 6.59)
                for x, _, z in vertices:
                    underside = spec['wingDormer']['ceiling_z'] if spec.get('loftLevelStair') else ridge - slope * ((x0+x1)/2-x) - .35
                    self.assertLessEqual(z, underside + .0051)
                self.assertTrue(all(role is None for role in wall['material_appearance']))
                self.assertFalse(any('Loft knee wall 1 banister' in o['name'] for o in data['objects']))

    def test_relocated_storage_wall_is_one_connected_closed_solid(self):
        for variant in ('compact','planning'):
            data=json.loads((ROOT/f'outputs/output-proposed-{variant}/geometry.json').read_text())
            if not data['proposal'].get('symmetricWingRoof'):continue
            wall=next(o for o in data['objects']if o['object_name']=='Proposal | Wing dormer south cheek')
            edges=Counter(tuple(sorted((a,b)))for face in wall['faces']for a,b in zip(face,face[1:]+face[:1]))
            self.assertTrue(all(n==2 for n in edges.values()),variant+' cheek has an open edge')
            neighbours={i:set()for i in range(len(wall['vertices']))}
            for a,b in edges:neighbours[a].add(b);neighbours[b].add(a)
            pending=[0];seen=set()
            while pending:
                i=pending.pop()
                if i in seen:continue
                seen.add(i);pending.extend(neighbours[i]-seen)
            self.assertEqual(len(seen),len(wall['vertices']),variant+' disconnected wall cells break the frame-rebate boolean')


if __name__ == '__main__':
    unittest.main()
