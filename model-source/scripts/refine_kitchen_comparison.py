"""Photo-evidenced kitchen/utility corrections from all four panorama directions.

Run after refine_circulation. External wall spans and printed dimensions stay fixed;
the utility window opening is corrected to the source plan's actual jambs.
Unlabelled fitting sizes are visual estimates. Named utility reference objects
remain available for the preceding circulation pass on subsequent rebuilds.
"""
import ast
import math
from pathlib import Path
import bpy
import bmesh
from mathutils import Vector

PREFIX = 'Kitchen comparison | '


def refine_kitchen_comparison(g):
    env = dict(g, bpy=bpy, bmesh=bmesh, math=math, Vector=Vector,
               mats=g['materials'], palette=g['PALETTE'], assembly_counts={})
    tree = ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    body = next(n.body for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == 'refine')
    names = {'assembly', 'roundbox', 'sphere', 'tube', 'local_box', 'cabinet_run'}
    exec(compile(ast.Module(body=[n for n in body if isinstance(n, ast.FunctionDef)
                                 and n.name in names], type_ignores=[]), '<kitchen-tools>', 'exec'), env)
    box, mesh, cylinder, beam = [g[n] for n in ('box', 'mesh', 'cylinder', 'beam')]
    cabinet, roundbox, tube, sphere = [env[n] for n in ('cabinet_run', 'roundbox', 'tube', 'sphere')]
    layer = '16 Fittings and furniture'

    def delete(prefixes):
        for ob in list(bpy.data.objects):
            if ob.type == 'MESH' and ob.name.startswith(tuple(prefixes)):
                bpy.data.objects.remove(ob, do_unlink=True)

    def bounds(ob):
        pts = [ob.matrix_world @ v.co for v in ob.data.vertices]
        return [min(p[i] for p in pts) for i in range(3)], [max(p[i] for p in pts) for i in range(3)]

    def fit_bounds(ob, lo, hi):
        old_lo, old_hi = bounds(ob)
        inv = ob.matrix_world.inverted()
        for v in ob.data.vertices:
            p = ob.matrix_world @ v.co
            for i in range(3):
                p[i] = lo[i] + (p[i] - old_lo[i]) * (hi[i] - lo[i]) / (old_hi[i] - old_lo[i])
            v.co = inv @ p
        ob.data.update()

    def difference(ob, cutter):
        modifier = ob.modifiers.new('Real fitted aperture', 'BOOLEAN')
        modifier.operation = 'DIFFERENCE'; modifier.solver = 'EXACT'; modifier.object = cutter
        with bpy.context.temp_override(object=ob, active_object=ob):
            bpy.ops.object.modifier_apply(modifier=modifier.name)

    def round_loop(x, y, width, depth, radius, z):
        pts = []
        for sx, sy, start in ((1, 1, 0), (-1, 1, 90), (-1, -1, 180), (1, -1, 270)):
            for j in range(9):
                a = math.radians(start + j * 90 / 8)
                pts.append((x + sx * (width / 2 - radius) + radius * math.cos(a),
                            y + sy * (depth / 2 - radius) + radius * math.sin(a), z))
        return pts

    def hollow_basin(name, x, y, width, depth, top, drop, material):
        # Closed shell: top lip, sloping inside, flat inner base, outside, bottom.
        outer = round_loop(x, y, width, depth, .052, top)
        inner = round_loop(x, y, width - .028, depth - .028, .045, top - .009)
        bottom = round_loop(x, y, width - .11, depth - .11, .039, top - drop)
        lower_outer = round_loop(x, y, width - .09, depth - .09, .045, top - drop - .012)
        n = len(outer); vertices = outer + inner + bottom + lower_outer
        faces = []
        for i in range(n):
            j = (i + 1) % n
            faces.extend([(i, j, n+j, n+i), (n+i, n+j, 2*n+j, 2*n+i),
                          (i, 3*n+i, 3*n+j, j)])
        faces.extend([tuple(range(2*n, 3*n)), tuple(reversed(range(3*n, 4*n)))])
        ob = mesh(name, vertices, faces, material, layer)
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free()
        return ob

    delete([PREFIX])
    # Exact black-wall transitions on the supplied 6681px floorplan (expressed
    # in its 2048px tracing system) are 190.63 and 243.97, not 193.5 and 260.5.
    # The previously over-wide window erased the tiled pier seen in 2445663-2.
    from dimension_spec import point
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    wall = next(w for w in walls if w['name'] == 'Utility rear')
    opening = list(wall['openings'][0])
    wall['openings'][0] = opening
    new_left, new_right = [point(x, 181, 0)[0] for x in (190.63, 243.97)]
    window_width = new_right-new_left
    opening[0] = (new_left+new_right)/2-wall['a'][0]
    opening[1] = window_width
    for ob in bpy.data.objects:
        if ob.type != 'MESH':
            continue
        name = ob.get('source_name', ob.name)
        if name.startswith(('Utility rear | below 0', 'Utility rear | lintel 0',
                            'Utility rear | skirting below 0')):
            lo, hi = bounds(ob); lo[0], hi[0] = new_left, new_right
            fit_bounds(ob, lo, hi)
        elif name.startswith(('Utility rear | pier 0', 'Utility rear | skirting pier 0')):
            lo, hi = bounds(ob); hi[0] = new_left
            fit_bounds(ob, lo, hi)
    door = wall['openings'][1]
    door_left = wall['a'][0]+door[0]-door[1]/2
    pier = box(PREFIX+'Utility rear tiled pier', ((new_right+door_left)/2, wall['a'][1], 1.30),
               (door_left-new_right, wall['thickness_m'], 2.60), 'Red brown brick', '11 Ground floor - walls')
    pier.data.materials.append(g['materials']['Pale bathroom tile'])
    # South face faces the utility; remaining faces share its glazed reveal.
    for polygon in pier.data.polygons:
        if polygon.normal.y < -.5 or abs(polygon.normal.x) > .5:
            polygon.material_index = 1
    delete(['Utility rear casement mullion','Utility rear clear glass','Utility rear frame jamb',
            'Utility rear frame rail','Utility rear glazing bar','Utility rear upper vent rail',
            'Utility rear window board','Utility rear window latch'])
    xc = (new_left+new_right)/2; yy=wall['a'][1]
    window_layer = '12 Doors and windows'
    for x in (new_left+.035, new_right-.035):
        box(PREFIX+'Utility window frame jamb', (x, yy, 1.60), (.07,.14,1.20), 'White joinery', window_layer)
    for zz in (1.035, 2.165):
        box(PREFIX+'Utility window frame rail', (xc, yy, zz), (window_width,.16,.07), 'White joinery', window_layer)
    box(PREFIX+'Utility window glass', (xc, yy, 1.60), (window_width-.10,.016,1.11), 'Glazing', window_layer)
    box(PREFIX+'Utility window central mullion', (xc, yy, 1.60), (.06,.15,1.13), 'White joinery', window_layer)
    for x in (xc-window_width/4, xc+window_width/4):
        pane = window_width/2
        box(PREFIX+'Utility window opening light rail', (x, yy, 1.94), (pane,.155,.055), 'White joinery', window_layer)
        for xx in (x-pane/6,x+pane/6):
            box(PREFIX+'Utility window Georgian upright', (xx,yy-.015,1.485), (.014,.025,.83), 'White joinery', window_layer)
        for zz in (1.335,1.635):
            box(PREFIX+'Utility window Georgian rail', (x,yy-.015,zz), (pane-.06,.033,.014), 'White joinery', window_layer)
        beam(PREFIX+'Utility window latch',(x-.055,yy-.095,1.92),(x+.055,yy-.095,1.92),.015,'White joinery',window_layer)
    box(PREFIX+'Utility window board', (xc,yy-.03,.975), (window_width+.12,.41,.05), 'White joinery',window_layer)
    # The source has an under-counter fridge beside the sink, with no cupboard
    # drawer/door crossing its front. Rebuild the cupboard to its actual edge.
    delete(['Kitchen sink cabinets', 'Kitchen sink recessed bowl', 'Kitchen sink stainless surround',
            'Sink rolled rim', 'Fridge matching counter',
            'Photo detail | Kitchen rear corner infill stone worktop'])
    cabinet('Kitchen sink cabinets', (1.89, 8.37), 2.50, top=False)
    top = box(PREFIX+'Continuous rear worktop', (2.475, 8.37, .898),
              (3.70, .645, .036), 'Polished granite', layer)
    deck = box(PREFIX+'Stainless sink deck', (2.62, 8.33, .922),
               (1.36, .49, .012), 'Chrome', layer)
    carcass = bpy.data.objects['Kitchen sink cabinets carcass']
    # Make actual holes in all three supporting solids, then fit closed bowls.
    for x, width in ((2.34, .49), (2.79, .30)):
        aperture = [p[:2] for p in round_loop(x, 8.32, width-.018, .377, .046, 0)]
        cutter = g['prism'](PREFIX+'temporary sink aperture', aperture,
                           .67, 1.15, 'Metal', layer)
        for ob in (top, deck, carcass):
            difference(ob, cutter)
        bpy.data.objects.remove(cutter, do_unlink=True)
        hollow_basin(PREFIX+'Inset stainless basin', x, 8.32, width, .395, .935, .17, 'Chrome')
        cylinder(PREFIX+'Sink drain', (x, 8.32, .768), .022, .006, 'Metal', layer, n=24)
    # The oven is integrated between separate top/bottom cupboards, not laid
    # onto a full-height cupboard door. Existing glass/handles keep root's pose.
    delete(['Kitchen oven tower door', 'Kitchen oven tower raised panel', 'Kitchen oven tower stile'])
    for z, height in ((.27, .42), (1.96, .44)):
        box(PREFIX+'Oven oak cupboard door', (.803, 7.86, z), (.035, .59, height), 'Honey oak', layer)
        roundbox(PREFIX+'Oven oak raised panel', (.830, 7.86, z),
                 (.019, .46, height-.12), 'Honey oak', layer, .007)
        sphere(PREFIX+'Oven cupboard knob', (.860, 8.04, z-height/2+.075),
               (.014, .014, .014), 'Brass', layer)
    box(PREFIX+'Oven dark surround', (.850, 7.86, 1.10), (.030, .584, 1.16), 'Black screen', layer)
    for yy in (7.66, 7.79, 7.92, 8.05):
        sphere(PREFIX+'Oven control dial', (.884, yy, 1.644), (.022, .021, .021), 'Metal', layer)

    # View 2445663-1 faces west: freezer then washer occupy the west run, while
    # the ceramic sink alone returns under the north window. Leave the garden
    # door (x=-.962..-.124 at y=8.82) entirely unobstructed.
    delete(['Utility west units', 'Utility rear counter', 'Utility ceramic sink'])
    cabinet('Utility west units', (-2.36, 6.57), .78, .55, .85, 0,
            math.pi/2, 'White joinery', False, False, layer)
    utility_targets = {
        'Utility freezer': ([-2.635, 6.985, 0], [-2.085, 7.545, .86]),
        'Utility washer': ([-2.635, 7.565, 0], [-2.085, 8.125, .86]),
    }
    for name, (lo, hi) in utility_targets.items():
        fit_bounds(bpy.data.objects[name], lo, hi)
    box(PREFIX+'Utility west counter', (-2.33, 7.42, .88), (.61, 2.54, .05), 'Porcelain', layer)
    rear_counter = box('Utility rear counter', (-1.505, 8.40, .88),
                       (1.04, .58, .05), 'Porcelain', layer)
    utility_sink_x = point(225, 181, 0)[0]
    hollow_basin('Utility ceramic sink', utility_sink_x, 8.37, .50, .47, .91, .20, 'Porcelain')
    aperture = [p[:2] for p in round_loop(utility_sink_x, 8.37, .482, .452, .046, 0)]
    cutter = g['prism'](PREFIX+'temporary utility aperture', aperture,
                       .65, 1.10, 'Cream ceramic', layer)
    difference(rear_counter, cutter); bpy.data.objects.remove(cutter, do_unlink=True)
    rear_counter['utility_aperture_v1'] = True
    for x in (utility_sink_x-.14, utility_sink_x+.14):
        tube(PREFIX+'Utility sink pillar tap', [(x,8.585,.91),(x,8.585,1.035),
             (x,8.54,1.06),(x,8.48,1.04),(x,8.46,1.00)], .012, 'Chrome', layer, 12)
        beam(PREFIX+'Utility tap cross handle', (x-.032,8.585,1.078),
             (x+.032,8.585,1.078), .012, 'Chrome', layer)
    # Visible appliance controls are kept geometric and editable, without
    # inventing labels or model numbers which cannot be read in the tour.
    roundbox(PREFIX+'Utility freezer front', (-2.066, 7.265, .44),
             (.035, .53, .81), 'Porcelain', layer, .012)
    beam(PREFIX+'Utility freezer handle', (-2.031, 7.045, .790),
         (-2.031, 7.485, .790), .021, 'White joinery', layer)
    roundbox(PREFIX+'Utility washer control fascia', (-2.064, 7.845, .775),
             (.035, .52, .145), 'White joinery', layer, .010)
    for yy in (7.72, 7.825, 7.93):
        sphere(PREFIX+'Utility washer control', (-2.037, yy, .778),
               (.014, .017, .017), 'White joinery', layer)
    # Native scene shows the door parked fully open; its construction matches
    # the photographed surface-mounted plain sliding door in 2445663-3.
    for ob in list(bpy.data.objects):
        if ob.type != 'MESH' or not ob.name.startswith('Garage kitchen partition '):
            continue
        if not any(s in ob.name for s in ('panelled leaf', 'raised door panel', 'panel bead', 'brass knob')):
            continue
        lo, hi = bounds(ob)
        if (lo[1]+hi[1])/2 > 6.3:
            bpy.data.objects.remove(ob, do_unlink=True)
    utility_opening = next(w for w in walls if w['name']=='Garage kitchen partition')
    along, aperture_width = utility_opening['openings'][0][:2]
    aperture_north = utility_opening['a'][1]-along+aperture_width/2
    leaf_width = aperture_width+.04
    parked_south = aperture_north+.010
    leaf_centre = parked_south+leaf_width/2
    door = box(PREFIX+'Utility sliding door leaf', (-.185, leaf_centre, 1.05),
               (.039, leaf_width, 2.065), 'White joinery', '12 Doors and windows')
    door['walkthrough_opening_leaf'] = True
    door['assembly'] = PREFIX+'Utility sliding door'
    box(PREFIX+'Utility sliding door track cover', (-.198, aperture_north+.015, 2.145),
        (.11, leaf_width*2+.064, .09), 'White joinery', '12 Doors and windows')
    # A recessed-looking dark centre inside a chrome finger pull, on both faces.
    for x in (-.211, -.159):
        frame = box(PREFIX+'Utility sliding door recessed pull rim', (x, parked_south+.059, .94),
                    (.007, .045, .107), 'Chrome', '12 Doors and windows')
        face = box(PREFIX+'Utility sliding door pull inset', (x+(-.004 if x<-.185 else .004), parked_south+.059, .94),
                   (.003, .028, .083), 'Metal', '12 Doors and windows')
        for ob in (frame, face):
            ob['walkthrough_opening_leaf'] = True
            ob['assembly'] = PREFIX+'Utility sliding door'

    # The utility south-wall radiator is a large missing fixture in view 0.
    box(PREFIX+'Utility radiator panel', (-1.20, 6.04, .49), (.78, .067, .63),
        'White joinery', layer)
    for i in range(29):
        box(PREFIX+'Utility radiator flute', (-1.55+i*.025, 6.079, .49),
            (.010, .012, .59), 'White joinery', layer)
    for x in (-1.62, -.78):
        beam(PREFIX+'Utility radiator pipe', (x, 6.045, .02), (x, 6.045, .26), .015, 'White joinery', layer)
        sphere(PREFIX+'Utility radiator valve', (x, 6.05, .245), (.02, .027, .027), 'Chrome', layer)
    # Fit the unchanged oval tabletop to 17 visible rim points in 2445662-3;
    # the independent lower-right arc in 2445662-2 confirms this position.
    # All dimensions and the camera pose remain fixed during that fit.
    table_target = Vector((2.071, 6.308))
    table = bpy.data.objects.get('Breakfast table top')
    if table:
        lo, hi = bounds(table)
        old_centre = Vector(((lo[0]+hi[0])/2, (lo[1]+hi[1])/2))
        shift = table_target-old_centre
        for ob in bpy.data.objects:
            if ob.type != 'MESH' or not ob.name.startswith('Breakfast table'):
                continue
            inv = ob.matrix_world.inverted()
            for vertex in ob.data.vertices:
                p = ob.matrix_world@vertex.co; p.x += shift.x; p.y += shift.y
                vertex.co = inv@p
            ob.data.update(); ob['assembly'] = 'Breakfast table'
        seats = sorted([o for o in bpy.data.objects if o.type == 'MESH'
                        and o.name.startswith('Breakfast chair seat')], key=lambda o:o.name)
        centres = []
        for seat in seats:
            lo, hi = bounds(seat)
            centres.append(Vector(((lo[0]+hi[0])/2, (lo[1]+hi[1])/2)))
        parts = [[] for _ in seats]
        for ob in bpy.data.objects:
            if ob.type != 'MESH' or not ob.name.startswith('Breakfast chair'):
                continue
            lo, hi = bounds(ob); c = Vector(((lo[0]+hi[0])/2,(lo[1]+hi[1])/2))
            idx = min(range(len(centres)), key=lambda i:(c-centres[i]).length)
            parts[idx].append(ob)
        for idx, (old_centre, group) in enumerate(zip(centres, parts)):
            back = next(o for o in group if o.name.startswith('Breakfast chair back'))
            lo, hi = bounds(back)
            outward = Vector(((lo[0]+hi[0])/2, (lo[1]+hi[1])/2))-old_centre
            old_angle = math.atan2(outward.y, outward.x)
            target_angle = idx*math.pi/2-.18
            target = table_target+Vector((math.cos(target_angle),math.sin(target_angle)))*.76
            delta = target_angle-old_angle; c, s = math.cos(delta), math.sin(delta)
            for ob in group:
                inv = ob.matrix_world.inverted()
                for vertex in ob.data.vertices:
                    p = ob.matrix_world@vertex.co; q = Vector((p.x,p.y))-old_centre
                    p.x = target.x+c*q.x-s*q.y; p.y = target.y+s*q.x+c*q.y
                    vertex.co = inv@p
                ob.data.update(); ob['assembly'] = f'Breakfast chair {idx+1}'
    for ob in bpy.data.objects:
        if ob.type == 'MESH' and ob.name.startswith(PREFIX):
            ob['basis'] = 'Compared with four directions of panoramas 2445662 and 2445663; fitting dimensions estimated'
            if not ob.get('assembly'):
                if 'radiator' in ob.name:
                    label = 'Utility radiator'
                elif 'washer' in ob.name:
                    label = 'Utility washer'
                elif 'freezer' in ob.name:
                    label = 'Utility freezer'
                elif 'Oven' in ob.name:
                    label = 'Kitchen oven tower'
                elif 'Utility sink' in ob.name or 'Utility tap' in ob.name:
                    label = 'Utility ceramic sink'
                elif any(s in ob.name for s in ('basin', 'Sink drain', 'Stainless sink')):
                    label = PREFIX+'Inset sink'
                else:
                    label = ob.get('source_name', ob.name)
                ob['assembly'] = label
    return {'revision': 1, 'sources': ['2445662-0','2445662-3','2445663-0','2445663-1','2445663-2','2445663-3'],
            'utility_appliance_bounds_m': utility_targets,
            'sink_cabinet_bounds_x_m': [.64, 3.14], 'fridge_bounds_x_m': [3.14, 3.70],
            'utility_sliding_door_bounds_y_m': [parked_south, parked_south+leaf_width],
            'utility_sink_centre_x_m': utility_sink_x,
            'utility_window_plan_jambs_2048px': [190.63,243.97],
            'utility_window_jambs_x_m': [new_left,new_right],
            'utility_tiled_pier_width_m': door_left-new_right,
            'breakfast_table_centre_m': list(table_target),
            'breakfast_chair_seat_radius_m': .76,
            'breakfast_chair_arrangement_rotation_degrees': math.degrees(-.18),
            'outer_wall_span_changes': False,
            'structural_wall_changes': 'Only utility rear window jambs corrected to the supplied floorplan'}
