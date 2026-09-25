"""Saved-model regressions for external returns and the internal gallery pier."""
import json
import math
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


def faces(obj):
    for indices, slot in zip(obj['faces'], obj['face_materials']):
        points = [obj['vertices'][i] for i in indices]
        normal = [0., 0., 0.]
        for a, b in zip(points, points[1:] + points[:1]):
            for axis in range(3):
                j, k = (axis + 1) % 3, (axis + 2) % 3
                normal[axis] += a[j] * b[k] - a[k] * b[j]
        length = math.sqrt(sum(n*n for n in normal))
        if length < 1e-8:
            continue
        yield (points, [n / length for n in normal],
               obj['material_appearance'][slot], obj['materials'][slot])


class ExteriorFinishFaces(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.models = {}
        for variant in ('compact', 'planning'):
            path = ROOT / f'output-proposed-{variant}/geometry.json'
            if not path.exists():
                raise unittest.SkipTest('Build both current designs first')
            cls.models[variant] = {
                o['object_name'].removeprefix('Proposal revision | '): o
                for o in json.loads(path.read_text())['objects']}

    def assertInterior(self, role, material):
        self.assertIsNone(role, 'Interior face participates in exterior finish switch')
        self.assertIn(material, ('Warm plaster', 'Proposal | White internal walls',
                                 'Proposal | Limestone render'))

    def test_recessed_side_wing_separates_exposed_strips_from_rooms(self):
        for variant, model in self.models.items():
            for name in ('Garage family partition | end', 'Exterior brick floor band First west'):
                with self.subTest(variant=variant, wall=name):
                    outside = inside = 0
                    for pts, n, role, mat in faces(model[name]):
                        if n[0] > .7:
                            self.assertInterior(role, mat)
                        if n[0] > -.7:
                            continue
                        ys = [p[1] for p in pts]
                        self.assertFalse(min(ys) < .7849 and max(ys) > .7851,
                                         'Face spans the exposed wall and new enclosure')
                        if max(ys) <= .7851:
                            self.assertEqual(role, 'wall'); outside += 1
                        elif min(ys) >= 1.0149:
                            self.assertInterior(role, mat); inside += 1
                    self.assertGreater(outside, 0)
                    self.assertGreater(inside, 0)

    def test_original_entrance_projection_returns_are_exterior(self):
        for variant, model in self.models.items():
            for name in ('House front centre | corrected wall 1', 'First front | corrected wall 4'):
                with self.subTest(variant=variant, wall=name):
                    found = 0
                    for pts, n, role, mat in faces(model[name]):
                        if n[0] < -.7:
                            ys = [p[1] for p in pts]
                            self.assertFalse(min(ys) < -.1151 and max(ys) > -.1149)
                            if max(ys) <= -.1149:
                                self.assertEqual(role, 'wall'); found += 1
                        if n[1] > .7:
                            self.assertInterior(role, mat)
                    self.assertGreater(found, 0)

    def test_wall_above_garage_roof_is_external_only_on_west(self):
        for variant, model in self.models.items():
            with self.subTest(variant=variant):
                count = 0
                for _, n, role, mat in faces(model['Proposal | West upper principal facade above wing roof']):
                    if n[0] < -.7:
                        self.assertEqual(role, 'wall'); count += 1
                    elif n[0] > .7:
                        self.assertInterior(role, mat)
                self.assertGreater(count, 0)

    def test_entrance_bay_return_has_brick_outside_and_white_inside(self):
        for variant, model in self.models.items():
            with self.subTest(variant=variant):
                count = 0
                for _, n, role, mat in faces(model['Proposal | Entrance bay north return']):
                    if n[1] > .7:
                        self.assertEqual(role, 'wall'); count += 1
                    elif n[1] < -.7:
                        self.assertInterior(role, mat)
                self.assertGreater(count, 0)

    def test_gallery_end_pier_stays_white_on_every_face(self):
        for variant, model in self.models.items():
            with self.subTest(variant=variant):
                for _, _, role, mat in faces(model['Proposal | North ground facade end pier']):
                    self.assertInterior(role, mat)

    def test_planning_kitchen_internal_opening_is_white_including_reveals_and_soffit(self):
        pieces = [obj for name, obj in self.models['planning'].items()
                  if name.startswith(('Proposal | Kitchen side opening reveal',
                                      'Proposal | Kitchen side opening head',
                                      'Garage kitchen partition | lintel'))]
        self.assertEqual(len(pieces), 5, 'Expected the head, jamb reveals and retained lintels')
        for obj in pieces:
            with self.subTest(object=obj['object_name']):
                for _, _, role, material in faces(obj):
                    self.assertInterior(role, material)
                    self.assertEqual(material, 'Proposal | White internal walls')


if __name__ == '__main__':
    unittest.main()
