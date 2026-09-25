"""Read-only exterior exposure queries shared by material tagging and the audit."""
from contextlib import nullcontext
import math
import re
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from blender_collections import collection_memberships


class ExteriorExposure:
    def __init__(self, data, scene, original, navigation, timer=None):
        phase = timer.phase if timer else lambda name: nullcontext()
        with phase('exposure.collection_index'):
            self.memberships = collection_memberships(data)
            self.site = {o.name for o in original.objects if self.memberships.get(o.as_pointer())
                         and self.memberships[o.as_pointer()][0].name.startswith(('50', '40', '41'))}
        self.terrain = navigation.get('terrain')
        self.rooms = []
        for room in navigation.get('planRooms', []):
            if room.get('floor') == 2 or len(room.get('polygon_m') or []) < 3:
                continue
            base = float(room.get('base_z', {-1: -2.8, 0: 0, 1: 2.8, 3: 5.55}.get(room.get('floor', 0), 0)))
            height = 2.4 if room.get('floor') == 3 else 6.62 if 'entrance' in room['name'].lower() else 2.75
            self.rooms.append((room['polygon_m'], base, base + height))
        with phase('exposure.extract_geometry'):
            vertices, polygons, self.categories = [], [], []
            for obj in scene.objects:
                if obj.type != 'MESH' or not obj.data.polygons or obj.hide_render:
                    continue
                if self.category(obj, None) == 'veg':
                    continue
                matrix = obj.matrix_world
                offset = len(vertices)
                vertices.extend(matrix @ v.co for v in obj.data.vertices)
                roof = self.is_roof(obj)
                slots = [self.category(obj, mat) for mat in obj.data.materials] or [self.category(obj, None)]
                slots = ['roof' if value == 'bld' and roof else value for value in slots]
                for face in obj.data.polygons:
                    polygons.append([offset + i for i in face.vertices])
                    self.categories.append(slots[face.material_index] if obj.data.materials else slots[0])
        with phase('exposure.build_bvh'):
            self.bvh = BVHTree.FromPolygons(vertices, polygons)
        self.directions = []
        for k in range(48):
            z = 1 - (k + .5) / 48
            radius = (1 - z * z) ** .5
            phi = k * 2.399963
            self.directions.append(Vector((radius * math.cos(phi), radius * math.sin(phi), z)))

    def is_site(self, obj):
        name = obj.name.removeprefix('Proposal revision | ')
        return name in self.site or name.split('.00')[0] in self.site

    @staticmethod
    def is_roof(obj):
        name = obj.name.lower()
        return ('roof' in name or re.search(r'\bridge\b', name) is not None) and not any(
            term in name for term in ('lining', 'ceiling', 'soffit', 'wall', 'closure', 'weathering'))

    def category(self, obj, material):
        names = [c.name for c in self.memberships.get(obj.as_pointer(), ())]
        name = obj.name.lower()
        if any(term in name for term in ('foliage', 'tree', 'hedge', 'branch', 'trunk', 'blossom', 'crown', 'leaf', 'shrub', 'bush')):
            return 'veg'
        if self.is_site(obj) or any(n.startswith(('P40', 'P42', 'P45', 'P50', '40 ', '41 ', '50 ')) for n in names):
            return 'out'
        if any(term in name for term in ('plot ground', 'driveway', 'lawn')):
            return 'out'
        if material and any(term in material.name.lower() for term in ('glass', 'glazing')):
            return 'glass'
        return 'bld'

    def room_base(self, point):
        for polygon, base, top in self.rooms:
            if not base - .05 < point.z < top:
                continue
            inside = False
            for k in range(len(polygon)):
                (x1, y1), (x2, y2) = polygon[k], polygon[(k + 1) % len(polygon)]
                if (y1 > point.y) != (y2 > point.y) and point.x < (x2 - x1) * (point.y - y1) / (y2 - y1) + x1:
                    inside = not inside
            if inside:
                return base
        return None

    def ground(self, x, y):
        if not self.terrain:
            return 0.0
        terrain = self.terrain
        fx = min(max((x - terrain['x0']) / terrain['step'], 0), terrain['nx'] - 1.001)
        fy = min(max((y - terrain['y0']) / terrain['step'], 0), terrain['ny'] - 1.001)
        j, i = int(fx), int(fy)
        a, b = fx - j, fy - i
        z = lambda row, col: terrain['z'][row * terrain['nx'] + col]
        return z(i, j) * (1 - a) * (1 - b) + z(i, j + 1) * a * (1 - b) + z(i + 1, j) * (1 - a) * b + z(i + 1, j + 1) * a * b

    def sees_outside(self, point, normal, *, room_veto=True):
        origin = point + normal * .15
        base = self.room_base(origin) if room_veto else None
        if base is not None and self.room_base(point + normal * .6) is not None:
            hit = self.bvh.ray_cast(origin, Vector((0, 0, -1)), 12.0)
            if hit[0] is not None and hit[0].z <= base + 1.2 and self.categories[hit[2]] != 'roof':
                return False
        if point.z < self.ground(point.x, point.y) - .27:
            return False
        if normal.z < -.7 and point.z < self.ground(point.x, point.y) + .1:
            return False
        rotation = Vector((0, 0, 1)).rotation_difference(normal)
        origin = point + normal * .03
        seen = 0
        for direction in self.directions:
            direction = rotation @ direction
            hit = self.bvh.ray_cast(origin, direction, 80)
            if hit[2] is None or (self.categories[hit[2]] in ('out', 'roof') and hit[1].dot(direction) < 0
                                 and (self.categories[hit[2]] == 'out' or hit[1].z > .2)):
                seen += 1
                if seen >= 3:
                    return True
        return False
