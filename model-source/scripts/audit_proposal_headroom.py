"""Read-only physical headroom audit of the saved proposal Blender scene.

Run using Blender --background --python this-file -- [--output report.json].
The source .blend is opened but never modified or saved. Vertical scene rays
measure real saved mesh, including roof linings and the stair structural waist.
Results are a model audit, not a survey or building-regulations certification.
"""
import argparse
import datetime
import json
import math
from pathlib import Path
import sys

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
args = argparse.ArgumentParser()
args.add_argument('--blend', default=str(ROOT / 'output-proposed/Ashley Heights — Proposed.blend'))
args.add_argument('--output', default=str(ROOT / 'proposal/P3-physical-headroom.json'))
args.add_argument('--routes', default='', help='Optional comma-separated route names')
args.add_argument('--no-grid', action='store_true')
options = args.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
source = Path(options.blend)
source_mtime = datetime.datetime.fromtimestamp(source.stat().st_mtime, datetime.timezone.utc).isoformat()
bpy.ops.wm.open_mainfile(filepath=str(source))
scene = bpy.data.scenes['08 Proposed extensions']
bpy.context.window.scene = scene
is_p4=any(ob.name.startswith('Proposal | Joined roof') for ob in scene.objects)
has_wing_stair=any(ob.name.startswith('Proposal | Ground to first lower')for ob in scene.objects)

# Inspect all model geometry in this scene regardless of the saved inspection
# view; other Blender scenes, including the untouched original, are excluded.
def reveal(layer):
    layer.exclude = False
    layer.hide_viewport = False
    layer.collection.hide_viewport = False
    for child in layer.children:
        reveal(child)
reveal(bpy.context.view_layer.layer_collection)
for ob in scene.objects:
    ob.hide_viewport = False
    ob.hide_set(False)
# A walking route through a doorway is measured with its actual hinged leaf
# open. Otherwise a low face rail can be mistaken for a floor or ceiling.
opened_doors=[]
navigation=json.loads((ROOT/'output-proposed/navigation.json').read_text())
for door in navigation['interactiveDoors']:
    if not door['id'].startswith('Proposal |') or door.get('motion'):continue
    parent=bpy.data.objects.get('Editable door | '+door['id'].replace('Proposal | ',''))
    if parent is not None:
        parent.rotation_euler.z+=door['openDelta'];opened_doors.append(door['id'])
bpy.context.view_layer.update()
depsgraph = bpy.context.evaluated_depsgraph_get()


def ray(origin, direction, distance=20):
    hit, point, normal, face, ob, matrix = scene.ray_cast(
        depsgraph, Vector(origin), Vector(direction), distance=distance)
    if not hit:
        return None
    return {'object': ob.name, 'point': [round(float(v), 5) for v in point],
            'normal': [round(float(v), 4) for v in normal]}


def point_check(label, x, y, expected_z, foot_search=.34):
    floor = ray((x, y, expected_z+foot_search), (0, 0, -1), foot_search+4)
    actual = floor['point'][2] if floor else None
    # A missing floor must not silently become a headroom pass against the
    # storey below. Continue at the intended elevation and report the gap.
    supported = actual is not None and abs(actual-expected_z) <= .255
    base = actual if supported else expected_z
    overhead = ray((x, y, base+.012), (0, 0, 1), 10)
    clearance = round(overhead['point'][2]-base, 5) if overhead else None
    return {'label': label, 'position': [round(x, 5), round(y, 5), round(expected_z, 5)],
            'physical_floor': floor, 'floor_supported_near_expected_height': supported,
            'floor_delta': round(actual-expected_z, 5) if actual is not None else None,
            'overhead': overhead, 'headroom': clearance,
            'passes_2m': supported and clearance is not None and clearance >= 1.995}


routes = {}
def route(name, points):
    if options.routes and name not in options.routes.split(','):
        return
    checks = [point_check(str(i+1), *point) for i, point in enumerate(points)]
    measured = [p['headroom'] for p in checks if p['headroom'] is not None]
    routes[name] = {'minimum_headroom': min(measured) if measured else None,
                    'floor_gaps': [p for p in checks if not p['floor_supported_near_expected_height']],
                    'below_2m': [p for p in checks if p['headroom'] is not None and p['headroom'] < 1.995],
                    'unroofed': [p for p in checks if p['headroom'] is None],
                    'samples': checks}


# Sample the actual tread centres and their two usable lateral edges. This
# exposes the saved diagonal stair waist when it projects through tread tops.
for label, bottom, top in ([('ground_to_first', 0, 2.80), ('first_to_loft', 2.80, 5.55)]if has_wing_stair else []):
    middle = (bottom+top)/2
    pts = []
    flights=([(9.37,-10.50,9.37,-8.61,bottom,middle),
              (10.62,-8.61,10.62,-10.50,middle,top)] if is_p4 else
             [(10.40,-9.95,12.29,-9.95,bottom,middle),
              (12.29,-8.70,10.40,-8.70,middle,top)])
    for x0,y0,x1,y1,z0,z1 in flights:
        rise = (z1-z0)/8
        run=math.hypot(x1-x0,y1-y0);vx=-(y1-y0)/run;vy=(x1-x0)/run
        for i in range(7):
            t = (i+.5)/7
            for lateral in (-.35, 0, .35):
                pts.append((x0+(x1-x0)*t+vx*lateral,
                            y0+(y1-y0)*t+vy*lateral,z0+(i+1)*rise))
    if is_p4:
        pts += [(x,y,middle) for x in(9.07,9.5,10.0,10.5,10.92)
                for y in(-8.4,-8.0,-7.7)]
        pts += [(10.62,-10.85,top),(9.50,-10.85,top),(8.25,-10.85,top)]
    else:
        pts += [(x, y, middle) for x in (12.55, 12.90, 13.15)
                for y in (-10.12, -9.7, -9.25, -8.7, -8.4)]
        pts += [(9.8, -8.7, top), (10.20, -8.7, top)]
    route('new_wing_'+label, pts)

oldrise = (5.55-2.80)/14
route('original_house_new_loft_stair',
      [(x, 3.5-(i+.5)*.225, 2.80+(i+1)*oldrise)
       for i in range(13) for x in (8.08, 8.365, 8.65)] +
      [(8.365, 3.95, 2.80), (8.365, .30, 5.55), (9.5, .30, 5.55)])

# Existing stair below the added flight: choose its saved original tread
# surfaces directly, then cast up to the proposed new stair soffit.
old_points = []
for ob in scene.objects:
    if ob.type != 'MESH' or not ob.name.startswith(('Stair tread', 'Stair winder')):
        continue
    vv = [ob.matrix_world @ v.co for v in ob.data.vertices]
    x0, x1 = min(v.x for v in vv), max(v.x for v in vv)
    y0, y1 = min(v.y for v in vv), max(v.y for v in vv)
    z = max(v.z for v in vv)
    if x1 > 7.845 and x0 < 8.885:
        topverts=[v for v in vv if abs(v.z-z)<.002]
        old_points.append((sum(v.x for v in topverts)/len(topverts),
                           sum(v.y for v in topverts)/len(topverts),z))
route('original_stair_below_added_flight', old_points)

route('loft_bridge_north_south',
      [(x, y, 5.55) for y in (-7.0, -6.0, -5.0,
                              -4.5, -4.25, -4.1, -3.95, -3.5, -2.0, -.7,
                              .3, 1.5, 2.5, 3.7, 4.0)
       for x in (9.35, 9.55, 9.75)])
if is_p4:
    route('new_loft_stair_west_bypass'if has_wing_stair else'new_loft_open_gallery',[(x,y,5.55) for x,y in
          [(10.62,-10.85),(9.5,-10.85),(8.25,-10.85),(8.25,-10.2),
           (8.25,-9.4),(8.25,-8.6),(8.25,-7.6),(8.25,-6.8),
           (8.6,-6.5),(9.4,-6.0)]])
route('old_dormer_cross_landing', [(x, y, 5.55) for x, y in
      [(9.5,3.8), (9.3,4.05), (9.0,4.2), (8.6,4.3), (8.2,4.45),
       (7.6,4.8), (7.4,5.4), (7.4,6.3), (7.4,7.3)]])
route('new_loft_studio_existing_door', [(x, y, 5.55) for x, y in
      ([(10.62,-10.85),(10.62,-11.4),(10.62,-11.80),(10.6,-12.5),(10.5,-13.5)] if is_p4 else
      [(9.0,-8.7),(9.0,-9.2),(9.0,-10.0),(9.0,-10.6),
       (9.0,-10.95),(9.0,-11.3),(9.1,-12.1)])])
if not is_p4:
 route('new_loft_studio_proposed_door', [(x, y, 5.55) for x, y in
      [(9.9,-8.7),(9.9,-9.3),(9.9,-10.0),(9.9,-10.6),
       (9.9,-10.95),(9.9,-11.3),(10.1,-12.1)]])
 route('new_loft_bathroom', [(x, y, 5.55) for x, y in
      [(9.7,-8.7),(9.7,-7.7),(10.0,-7.55),(10.4,-7.4),
       (10.85,-7.15),(10.85,-7.0),(10.85,-6.7),(11.8,-6.35)]])
route('new_ground_to_old_entrance', [(x, y, 0) for x, y in
      [(9.7,-8.6),(9.7,-6.1),(9.7,-4.4),(9.7,-3.6),(8.4,-3.1),
       (7.0,-2.8),(7.0,-1.8),(7.0,-1.0),(7.0,-.35),(7.0,.1)]])
if is_p4:
    route('new_first_floor_to_original_landing',[(x,y,2.80) for x,y in
          [(8.4,-10.9),(8.4,-9.5),(8.4,-8.0),(8.4,-6.2),
           (7.0,-4.3),(7.0,-4.05),(7.0,-3.5),(7.0,-2.0),
           (7.0,-.5),(7.0,-.15),(7.0,0),(7.0,.15),(7.0,.4),
           (7.0,.8),(7.0,1.5)]])

# Representative standing candidates and low-eaves storage edges. These are
# individual sample classifications, not an area calculation or navigation map.
grid=[]
for ix in range(0 if options.no_grid else 13):
    x=7.80+ix*.45
    for iy in range(24):
        y=-14.2+iy*.43
        grid.append(point_check('loft grid', x, y, 5.55))

report = {'source_blend': str(source), 'source_saved_utc': source_mtime,
          'roof_revision': ('P4 pitched roof'if has_wing_stair else'P5 unified pitched join')if is_p4 else'P3 flat roof',
          'audited_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(),
          'scene': scene.name, 'method': 'Blender scene.ray_cast against saved physical meshes; vertical floor and roof rays, no source mutation',
          'limits': 'Point samples do not certify structural support, fire safety, complete swept-body clearance, or real building dimensions. New hinged doors are opened in memory only; source file is not saved.',
          'opened_doors_for_route_audit':opened_doors,
          'routes': routes, 'new_wing_loft_grid': grid}
Path(options.output).write_text(json.dumps(report, indent=2))
print(json.dumps({'output': options.output, 'source_saved_utc': source_mtime,
                  'routes': {k: {'minimum_headroom':v['minimum_headroom'],
                                  'floor_gaps':len(v['floor_gaps']),
                                  'below_2m':len(v['below_2m']),
                                  'unroofed':len(v['unroofed'])}
                             for k,v in routes.items()}}, indent=2))
