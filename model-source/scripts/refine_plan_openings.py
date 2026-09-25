"""Rebuild reviewed door jambs from the original, dimension-calibrated plan.

Only along-wall opening coordinates change. Wall centre lines, thicknesses,
floor levels and room polygons retain their printed-dimension constraints.
Photo-based door heights remain separate from this plan tracing.
"""
import ast
import math
from pathlib import Path

import bpy
import bmesh
from mathutils import Vector
from dimension_spec import point


def refine_plan_openings(g):
    import json
    root = Path(__file__).resolve().parents[1]
    audit = json.loads((root/'source/plan-opening-jambs.json').read_text())
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    selected = {}
    changes = []
    ratio = audit['source_width_px']/audit['trace_width_px']
    for row in audit['openings']:
        if row.get('apply', True) is False:
            continue
        w = next(w for w in walls if w['name'] == row['wall'])
        idx = row.get('opening_index', 0)
        op = list(w['openings'][idx]); old = op[:]
        values = [v/ratio for v in row['original_pixel_edges']]
        ends = [Vector(point(v, row['fixed'], w['floor']) if row['axis'] == 'x'
                       else point(row['fixed'], v, w['floor'])) for v in values]
        a, b = Vector(w['a']), Vector(w['b']); u = (b-a).normalized()
        op[0] = ((ends[0]+ends[1])/2-a).dot(u)
        op[1] = (ends[1]-ends[0]).length
        if w['name'] in ('Dining hall doors','Family hall door','Kitchen hall door'):
            op[3] = 2.00
        w['openings'][idx] = op
        w['jamb_source'] = 'source/plan-opening-jambs.json'
        selected[w['name']] = w
        changes.append({'wall':w['name'], 'opening_index':idx,
                        'old_width_m':old[1], 'width_m':op[1],
                        'centre_shift_along_wall_m':op[0]-old[0],
                        'original_pixel_edges':row['original_pixel_edges'],
                        'height_m':op[3], 'height_basis':'Four-direction hall photo estimate' if w['name'] in ('Dining hall doors','Family hall door','Kitchen hall door') else 'Existing estimate', 'note':row.get('note', '')})

    box = g['box']; level = data.get('level_height', g.get('LEVEL', 2.8))
    for name, w in selected.items():
        # Recreate structural pieces instead of stretching or shearing door leaves.
        for ob in list(bpy.data.objects):
            if ob.type != 'MESH':
                continue
            n = ob.get('source_name', ob.name)
            if n.startswith(name+' | ') and (
                    any(c.name.endswith('walls') for c in ob.users_collection)
                    or 'skirting' in n or 'door architrave' in n):
                bpy.data.objects.remove(ob, do_unlink=True)
            elif n.startswith(tuple(name+' '+s for s in
                    ('panelled leaf', 'raised door panel', 'panel bead',
                     'brass knob', 'classical overdoor'))):
                bpy.data.objects.remove(ob, do_unlink=True)
        a, b = Vector(w['a']), Vector(w['b']); u = (b-a).normalized()
        normal = Vector((-u.y, u.x)); length = (b-a).length
        f = w['floor']; z = f*level; height = 2.45 if f else 2.60
        angle = math.atan2(u.y, u.x); thick = w['thickness_m']
        layer = f'{f+1}1 '+('First' if f else 'Ground')+' floor - walls'

        def segment(start, end, lo, hi, suffix):
            if end-start < .004 or hi-lo < .004:
                return
            p = a+u*((start+end)/2)
            box(name+' | '+suffix, (*p, z+(lo+hi)/2),
                (end-start, thick, hi-lo), 'Warm plaster', layer, angle)
            if lo == 0:
                for side in (-1, 1):
                    q = p+normal*side*(thick/2+.012)
                    box(name+' | skirting '+suffix+str(side), (*q, z+.07),
                        (end-start, .025, .14), 'White joinery', f'{f+1}4 Trim', angle)

        prev = 0
        for idx, (centre, width, sill, head, kind) in enumerate(sorted(w['openings'])):
            lo, hi = centre-width/2, centre+width/2
            assert 0 <= lo < hi <= length, (name, lo, hi, length)
            segment(prev, lo, 0, height, 'pier '+str(idx))
            segment(lo, hi, 0, sill, 'below '+str(idx))
            segment(lo, hi, head, height, 'lintel '+str(idx))
            p = a+u*centre
            for offset in (-width/2, width/2):
                q = p+u*offset
                box(name+' | door architrave', (*q, z+head/2),
                    (.075, thick+.05, head), 'White joinery', f'{f+1}2 Doors and windows', angle)
            box(name+' | door architrave head', (*p, z+head),
                (width+.075, thick+.07, .075), 'White joinery', f'{f+1}2 Doors and windows', angle)
            prev = hi
        segment(prev, length, 0, height, 'end')

    # Reuse the existing native panelled-door construction for the reviewed
    # openings. Subsequent room-specific helpers restore photographed designs
    # and poses; the trim helper reads the revised wall specs.
    tree = ast.parse((root/'scripts/refinement_details.py').read_text())
    body = next(n.body for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'refine')
    names = {'roundbox', 'sphere', 'local_box', 'delete'}
    functions = [n for n in body if isinstance(n, ast.FunctionDef) and n.name in names]
    loop = next(n for n in body if isinstance(n, ast.For)
                and 'panelled leaf' in ast.unparse(n) and "spec['openings']" in ast.unparse(n))
    env = dict(g, bpy=bpy, bmesh=bmesh, math=math, Vector=Vector,
               mats=g['materials'], palette=g['PALETTE'], L=level,
               g=dict(g, wall_specs=list(selected.values())))
    exec(compile(ast.Module(body=functions+[loop], type_ignores=[]), '<reviewed-plan-doors>', 'exec'), env)
    return {'source':'source/floorplan.png', 'method':'Original drawn jambs; no swing arcs or perspective widths',
            'tracing_uncertainty_m':[.02, .04], 'openings':changes}
