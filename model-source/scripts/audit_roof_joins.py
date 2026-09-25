"""Read-only checks of portable mesh roof joins, not a whole-building survey.

Samples vertical lines just inside each exterior wall face through its head
band. Intersections use each actual mesh face, so intersecting bounding boxes
alone cannot pass the check. Also checks that roof shells have closed edges.
Writes only its report; never opens or modifies Blender scene data.
"""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path

import numpy as np
from shapely.geometry import Point, Polygon

ROOT = Path(__file__).resolve().parents[1]


def merge_intervals(intervals, tolerance=1e-5):
    result = []
    for start, end in sorted(intervals):
        if result and start <= result[-1][1] + tolerance:
            result[-1][1] = max(result[-1][1], end)
        else:
            result.append([float(start), float(end)])
    return result


class Solid:
    def __init__(self, obj):
        self.name = obj['object_name']
        self.vertices = np.asarray(obj['vertices'], dtype=float)
        self.lo, self.hi = self.vertices.min(axis=0), self.vertices.max(axis=0)
        self.faces = []
        edges = Counter()
        for indices in obj['faces']:
            for a, b in zip(indices, indices[1:] + indices[:1]):
                edges[tuple(sorted((a, b)))] += 1
            points = self.vertices[indices]
            normal = np.sum(np.cross(points, np.roll(points, -1, axis=0)), axis=0)
            magnitude = np.linalg.norm(normal)
            if magnitude < 1e-9:
                continue
            normal /= magnitude
            if abs(normal[2]) < 1e-7:
                continue
            keep = [i for i in range(3) if i != int(np.argmax(np.abs(normal)))]
            poly = Polygon(points[:, keep])
            self.faces.append((normal, float(normal @ points[0]), keep, poly))
        self.open_edges = sum(count != 2 for count in edges.values())

    def vertical_hits(self, xy):
        if np.any(xy < self.lo[:2] - 1e-6) or np.any(xy > self.hi[:2] + 1e-6):
            return []
        hits = []
        for normal, offset, keep, poly in self.faces:
            z = (offset - normal[:2] @ xy) / normal[2]
            point = np.array([*xy, z])
            if poly.buffer(1e-7).covers(Point(point[keep])):
                if not any(abs(z - existing) < 1e-5 for existing in hits):
                    hits.append(float(z))
        hits.sort()
        return hits

    def vertical_intervals(self, xy):
        # A naked roof face has no solid volume; a different opaque surface
        # merely intersecting the sampled height does not fill an open strip.
        if self.open_edges:
            return []
        hits = self.vertical_hits(xy)
        return list(zip(hits[::2], hits[1::2]))


def uncovered(lo, hi, intervals):
    cursor, gaps = lo, []
    for start, end in merge_intervals(intervals):
        if end < cursor or start > hi:
            continue
        if start > cursor + 1e-5:
            gaps.append([cursor, min(start, hi)])
        cursor = max(cursor, end)
    if cursor < hi - 1e-5:
        gaps.append([cursor, hi])
    return gaps


def audit(data):
    solids = [Solid(obj) for obj in data['objects']
              if obj['layer'].startswith(('11 ', '12 ', '15 ', '21 ', '25 ', '30 ', '40 ', '41 '))]
    joins = []
    garage_names = {'Garage front', 'Garage west', 'Garage rear', 'Utility rear'}
    for wall in data['walls']:
        if not wall['external']:
            continue
        if wall['floor'] != 1 and wall['name'] not in garage_names:
            continue
        a, b = np.array(wall['a']), np.array(wall['b'])
        delta = b - a
        length = np.linalg.norm(delta)
        normal = np.array([-delta[1], delta[0]]) / length
        start, end = (5.251, 5.349) if wall['floor'] == 1 else (2.601, 2.721)
        # Wall specifications run clockwise around the interior: left is out.
        fractions = np.linspace(.03 / length, 1 - .03 / length, max(3, int(length / .10)))
        samples = []
        for fraction in fractions:
            centre = a + delta * fraction
            offset = wall['thickness_m'] / 2 - .015
            if wall.get('projected_x_span'):
                xa, xb = wall['projected_x_span']
                if xa < centre[0] < xb:
                    offset += wall.get('front_projection_m', 0)
            xy = centre + normal * offset
            relevant = [solid for solid in solids
                        if solid.hi[2] >= start and solid.lo[2] <= end]
            intervals = [interval for solid in relevant
                         for interval in solid.vertical_intervals(xy)]
            # The raised landing arch intentionally enters this head strip.
            # Test masonry above its exact curve, and report the aperture
            # separately; glazing is never counted as structural wall fill.
            aperture = None
            test_start = start
            arch = data.get('front_arch_review')
            if wall['name'] == 'First front' and arch:
                dx = xy[0] - arch['landing_centre_x_m']
                radius = arch['landing_radius_m']
                if abs(dx) < radius:
                    arch_top = arch['landing_spring_m'] + np.sqrt(radius**2-dx**2)
                    if arch_top > start:
                        aperture = [start, float(min(end, arch_top))]
                        test_start = max(start, arch_top+.0001)
            gaps = uncovered(test_start, end, intervals) if test_start < end else []
            samples.append({'xy_m': xy.tolist(), 'unfilled_z_intervals_m': gaps,
                            'intentional_arch_aperture_z_m': aperture})
        failing = [sample for sample in samples if sample['unfilled_z_intervals_m']]
        joins.append({'wall': wall['name'], 'strip_z_m': [start, end],
                      'sample_count': len(samples), 'unfilled_samples': len(failing),
                      'maximum_unfilled_height_m': max((b - a for sample in failing
                          for a, b in sample['unfilled_z_intervals_m']), default=0),
                      'samples': samples})
    roofs = [{'object': solid.name, 'open_or_nonmanifold_edges': solid.open_edges}
             for solid in solids if solid.name.startswith(('Main hipped roof', 'Garage flat roof',
                                                            'Front gable roof'))]
    # The rear edge of each front-gable roof cheek must lie on the main pitch,
    # not merely meet it in plan. This catches the old 215 mm Y translation
    # applied to the cheek without rebuilding its main-roof intersection.
    main = next(s for s in solids if s.name == 'Main hipped roof')
    valleys = []
    for cheek in [s for s in solids if s.name.startswith('Front gable roof ')]:
        endpoints = []
        for x in (cheek.lo[0], cheek.hi[0]):
            edge = cheek.vertices[np.abs(cheek.vertices[:, 0] - x) < 1e-5]
            top = edge[np.abs(edge[:, 2] - edge[:, 2].max()) < 1e-5]
            endpoints.append(top[np.argmax(top[:, 1])])
        samples = []
        for t in np.linspace(0, 1, 21):
            point = endpoints[0] * (1 - t) + endpoints[1] * t
            heights = main.vertical_hits(point[:2])
            difference = point[2] - max(heights) if heights else None
            samples.append({'point_m': point.tolist(), 'signed_height_difference_m': difference})
        differences = [abs(s['signed_height_difference_m']) for s in samples
                       if s['signed_height_difference_m'] is not None]
        valleys.append({'cheek': cheek.name, 'samples': samples,
                        'samples_outside_main_roof': sum(s['signed_height_difference_m'] is None
                                                         for s in samples),
                        'maximum_height_difference_m': max(differences, default=None),
                        'passes_1mm_tolerance': bool(len(differences) == len(samples)
                        and max(differences) <= .001)})
    porch = []
    for capital in [s for s in solids if s.name.startswith('Entrance porch capital')]:
        xy = (capital.lo[:2] + capital.hi[:2]) / 2
        roof_heights = [hit for roof in solids if roof.name.startswith('Entrance porch pitched roof')
                        for hit in roof.vertical_hits(xy)]
        if not roof_heights:
            porch.append({'capital': capital.name, 'missing_roof_above': True})
            continue
        intervals = [interval for solid in solids for interval in solid.vertical_intervals(xy)]
        band = [capital.hi[2] + .0001, min(roof_heights) - .0001]
        gaps = uncovered(*band, intervals) if band[1] > band[0] else []
        porch.append({'capital': capital.name, 'centre_xy_m': xy.tolist(),
                      'capital_top_m': float(capital.hi[2]),
                      'pitched_roof_underside_m': min(roof_heights),
                      'unfilled_z_intervals_m': gaps, 'passes': not gaps})
    annex_joins=[]
    annex_solids=[s for s in solids if s.name.startswith('Side annex | ')]
    annex_roof=next((s for s in annex_solids if s.name=='Side annex | Hipped lean-to roof'),None)
    if annex_roof:
        for wall in data['walls']:
            if wall.get('area_scope')!='side_annex':continue
            a,b=np.array(wall['a']),np.array(wall['b']);delta=b-a;length=np.linalg.norm(delta)
            normal=np.array([-delta[1],delta[0]])/length;samples=[]
            for t in np.linspace(.03/length,1-.03/length,max(3,int(length/.10))):
                xy=a+delta*t+normal*(wall['thickness_m']/2-.015)
                hits=annex_roof.vertical_hits(xy)
                start=wall['height_m']+.001
                gaps=uncovered(start,min(hits),[band for s in annex_solids for band in s.vertical_intervals(xy)]) if hits else [[start,None]]
                samples.append({'xy_m':xy.tolist(),'unfilled_z_intervals_m':gaps})
            annex_joins.append({'wall':wall['name'],'sample_count':len(samples),
                                'unfilled_samples':sum(bool(s['unfilled_z_intervals_m'])for s in samples),'samples':samples})
    garden_joins=[]
    garden_roof=next((s for s in solids if s.name=='Outbuilding flat roof'),None)
    if garden_roof:
        for obj in data['objects']:
            if obj['layer']!='40 Outbuildings' or not any(t in obj['name']for t in ('wall','front pier','front lintel')):continue
            wall=Solid(obj)
            if abs(wall.hi[2]-2.40)>.015:continue
            samples=[]
            for tx in(.1,.5,.9):
                for ty in(.1,.5,.9):
                    xy=wall.lo[:2]+(wall.hi[:2]-wall.lo[:2])*np.array([tx,ty])
                    hits=garden_roof.vertical_hits(xy)
                    gap=max(0,min(hits)-wall.hi[2])if hits else None
                    samples.append({'xy_m':xy.tolist(),'gap_m':gap})
            garden_joins.append({'wall':wall.name,'sample_count':len(samples),
                                 'unfilled_samples':sum(s['gap_m']is None or s['gap_m']>.001 for s in samples),'samples':samples})
    return {
        'method': 'Actual polygon/vertical-ray intersections through each portable solid, '
                  'sampled every approximately 100 mm along the outward wall-head skin. '
                  'No bounding-box overlap is accepted as seam closure.',
        'scope': 'Checks opaque infill at the visible wall head and exported roof shell edge '
                 'closure. Does not declare the whole building watertight or prove a surveyed '
                 'roof height. Native-only modifiers absent from geometry.json cannot pass '
                 'portable shell checks. Enclosed attic voids are not classified by this audit.',
        'roof_shells': roofs, 'gable_valleys': valleys, 'porch_column_supports': porch,
        'side_annex_joins':annex_joins,
        'side_annex_unfilled_samples':sum(j['unfilled_samples']for j in annex_joins),
        'garden_flat_roof_joins':garden_joins,
        'garden_flat_roof_unfilled_samples':sum(j['unfilled_samples']for j in garden_joins),
        'joins': joins,
        'unfilled_wall_head_samples': sum(j['unfilled_samples'] for j in joins),
        'total_wall_head_samples': sum(j['sample_count'] for j in joins),
    }


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--geometry', type=Path, default=ROOT / 'output-walkthrough/geometry.json')
    parser.add_argument('--output', type=Path, default=ROOT / 'output-walkthrough/roof-join-audit.json')
    args = parser.parse_args()
    raw = args.geometry.read_bytes()
    result = audit(json.loads(raw))
    result['geometry_sha256'] = hashlib.sha256(raw).hexdigest()
    args.output.write_text(json.dumps(result, indent=2))
    print(json.dumps({k: v for k, v in result.items() if k not in ('joins', 'gable_valleys','side_annex_joins')}, indent=2))
    for valley in result['gable_valleys']:
        print(valley['cheek'], 'valley max difference', valley['maximum_height_difference_m'],
              'samples outside main roof', valley['samples_outside_main_roof'])
    for join in result['joins']:
        print(join['wall'], join['unfilled_samples'], '/', join['sample_count'],
              f"max unfilled {join['maximum_unfilled_height_m'] * 1000:.1f} mm")
