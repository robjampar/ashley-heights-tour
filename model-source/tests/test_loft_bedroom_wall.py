"""The solid eaves wall must survive roof trimming in both current designs."""
from collections import Counter
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class LoftBedroomWallTests(unittest.TestCase):
    def test_solid_wall_survives_as_a_closed_internal_mesh_below_the_roof(self):
        spec = json.loads((ROOT / 'proposal/design-spec-compact.json').read_text())
        x0, _, x1, _ = spec['frontWing']
        ridge = spec['newWingRoof']['ridge']
        slope = (ridge - spec['newWingRoof']['eave']) / ((x1-x0)/2 + .20)
        for variant in ('compact', 'planning'):
            with self.subTest(variant=variant):
                path = ROOT / f'output-proposed-{variant}/geometry.json'
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
                self.assertAlmostEqual(max(p[1] for p in vertices), -3.98, places=4)
                self.assertAlmostEqual(min(p[2] for p in vertices), 5.55, places=4)
                self.assertGreater(max(p[2] for p in vertices), 6.59)
                for x, _, z in vertices:
                    underside = ridge - slope * ((x0+x1)/2-x) - .35
                    self.assertLessEqual(z, underside + .0051)
                self.assertTrue(all(role is None for role in wall['material_appearance']))
                self.assertFalse(any('Loft knee wall 1 banister' in o['name'] for o in data['objects']))


if __name__ == '__main__':
    unittest.main()
