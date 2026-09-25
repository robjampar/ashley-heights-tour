"""Parked kitchen through-floor lift and the Bedroom 5 guide/cover assembly.

The user's lift identification is confirmed by source 2445678-2 upstairs.
Small dimensions are estimated; walls, furniture and floor heights stay fixed.
"""
import math

import bpy
import bmesh
from mathutils import Matrix, Vector
from height_spec import GROUND_CEILING, FIRST_CEILING


def refine_lift(g):
    data = g.get('g', g)
    level = g.get('LEVEL', data.get('level_height', 2.8))
    prefix = 'Through-floor lift | '
    for ob in list(bpy.data.objects):
        if ob.name.startswith(prefix):
            bpy.data.objects.remove(ob, do_unlink=True)
    box, mesh, beam = g['box'], g['mesh'], g['beam']
    materials = g['materials']
    for name, colour, roughness, transmission in [
            ('Lift cream enamel', (.78, .76, .62, 1), .32, 0),
            ('Lift smoked safety panel', (.06, .052, .035, 1), .19, .28)]:
        mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
        mat.use_nodes = True; mat.diffuse_color = colour
        bs = mat.node_tree.nodes.get('Principled BSDF')
        bs.inputs['Base Color'].default_value = colour
        bs.inputs['Roughness'].default_value = roughness
        bs.inputs['Transmission Weight'].default_value = transmission
        materials[name] = mat; g['PALETTE'][name] = list(colour)
    cream = 'Lift cream enamel'; glass = 'Lift smoked safety panel'
    ground = '16 Fittings and furniture'; upper = '26 Fittings and furniture'
    x0, x1, y0, y1 = .20, 1.64, 4.17, 4.95
    door_top, rear_top = 1.43, 1.98
    cabin = prefix+'Ground cabin'
    def part(name, center, size, mat=cream, layer=ground, assembly=cabin):
        ob = box(prefix+name, center, size, mat, layer)
        ob['assembly'] = assembly; ob['reference'] = '2445662-2, 2445662-3, 2445678-2'
        return ob
    def yz_prism(name, outline, y, thickness, mat=cream):
        n = len(outline)
        vertices = [(x, yy, z) for yy in (y-thickness/2, y+thickness/2) for x, z in outline]
        faces = [tuple(reversed(range(n))), tuple(range(n, 2*n))]
        faces += [(i, (i+1) % n, (i+1) % n+n, i+n) for i in range(n)]
        ob = mesh(prefix+name, vertices, faces, mat, ground)
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free(); ob.data.update()
        ob['assembly'] = cabin
        return ob

    # Low parked cabin, east-facing entry, raised rear sides against the guides.
    part('Ground cabin carcass plinth', ((x0+x1)/2, (y0+y1)/2, .048),
         (x1-x0, y1-y0, .076))
    part('Ground cabin inner floor', ((x0+x1)/2, (y0+y1)/2, .090),
         (x1-x0-.09, y1-y0-.09, .010), 'Blue carpet')
    part('Ground cabin carcass rear', (x0+.035, (y0+y1)/2, rear_top/2),
         (.050, y1-y0-.018, rear_top))
    for sign, yy in [('South', y0+.018), ('North', y1-.018)]:
        yz_prism('Ground cabin carcass '+sign+' lower side',
                 [(x0, .08), (x1, .08), (x1, .47), (x1-.82, 1.385), (x0, 1.385)], yy, .036)
        yz_prism('Ground cabin '+sign+' triangular safety glazing',
                 [(x1-.80, 1.385), (x1-.018, 1.385), (x1-.018, .49)], yy, .012, glass)
        yz_prism('Ground cabin carcass '+sign+' raised rear cheek',
                 [(x0, 1.38), (x0, rear_top), (x0+.41, rear_top), (x0+.88, 1.38)], yy, .036)
        for a, b in [((x1-.82, yy, 1.405), (x1, yy, 1.405)),
                     ((x1-.81, yy, 1.39), (x1-.015, yy, .475)),
                     ((x0+.41, yy, rear_top), (x0+.88, yy, 1.405))]:
            ob = beam(prefix+'Ground cabin '+sign+' edge rail', a, b, .041, cream, ground)
            ob['assembly'] = cabin
    # A single front half-height framed door is visible from the kitchen.
    part('Ground cabin entry lower panel', (x1-.018, (y0+y1)/2, .235),
         (.036, y1-y0-.06, .30))
    part('Ground cabin entry safety glazing', (x1-.015, (y0+y1)/2, .905),
         (.014, y1-y0-.11, .98), glass)
    for yy in (y0+.028, y1-.028):
        part('Ground cabin entry vertical frame', (x1-.012, yy, .749), (.046, .055, 1.35))
    for z in (.402, door_top-.025):
        part('Ground cabin entry horizontal frame', (x1-.013, (y0+y1)/2, z),
             (.052, y1-y0, .055))
    part('Ground cabin entry latch', (x1+.019, y1-.105, 1.22), (.035, .033, .085), 'Metal')
    part('Ground cabin small nameplate', (x1+.015, (y0+y1)/2, door_top-.022),
         (.004, .033, .017), 'Brass')

    # Two continuous guides, split only at floor level for useful collections.
    rail_x = .34; rail_ys = [4.265, 4.765]
    for i, yy in enumerate(rail_ys, 1):
        for floor, lo, hi, layer in [(0, .035, level, ground),
                                      (1, level, level+FIRST_CEILING-.055, upper)]:
            assembly = cabin if floor == 0 else prefix+f'Upper guide {i}'
            part(f'Guide {i} floor {floor} carcass column', (rail_x, yy, (lo+hi)/2),
                 (.074, .074, hi-lo), layer=layer, assembly=assembly)
            part(f'Guide {i} floor {floor} exposed track', (rail_x+.039, yy, (lo+hi)/2),
                 (.008, .019, hi-lo), 'Metal', layer, assembly)
        part(f'Guide {i} upper fixing bracket', (.19, yy, level+FIRST_CEILING-.04),
             (.38, .068, .045), layer=upper, assembly=prefix+'Upper drive and controls')
    part('Upper cross tie', (rail_x, sum(rail_ys)/2, level+FIRST_CEILING-.04),
         (.070, rail_ys[1]-rail_ys[0]+.07, .048), layer=upper,
         assembly=prefix+'Upper drive and controls')
    part('Upper drive box', (rail_x+.018, rail_ys[0], level+FIRST_CEILING-.22),
         (.19, .16, .32), layer=upper, assembly=prefix+'Upper drive and controls')
    part('Upper drive yellow label', (rail_x+.117, rail_ys[0], level+FIRST_CEILING-.30),
         (.004, .104, .061), 'Brass', upper, prefix+'Upper drive and controls')
    for yy in (rail_ys[0]-.035, rail_ys[0]+.032):
        part('Upper drive indicator', (rail_x+.121, yy, level+FIRST_CEILING-.18),
             (.006, .012, .012), 'Metal', upper, prefix+'Upper drive and controls')
    # Wall control beside the window, visible to the left of the upper guides.
    part('Upper wall call control', (.215, 3.415, level+1.23), (.056, .081, .143),
         layer=upper, assembly=prefix+'Upper wall call control')
    for dz in (-.040, 0, .040):
        part('Upper wall call button', (.249, 3.415, level+1.23+dz),
             (.010, .033, .022), 'Metal', upper, prefix+'Upper wall call control')

    # A real aperture and a separate carpeted cover, parked flush upstairs.
    # Original solid backups permit later edits without accumulating booleans.
    ax0, ax1, ay0, ay1 = .18, 1.74, 4.12, 5.06
    for wall_name in ('Kitchen breakfast room | ceiling', 'Bedroom 5 | floor'):
        ob = bpy.data.objects.get(wall_name)
        if ob is None:
            raise ValueError('Missing lift aperture solid: '+wall_name)
        backup_name = 'Lift aperture original | '+wall_name
        backup = bpy.data.meshes.get(backup_name)
        if backup is None:
            backup = ob.data.copy(); backup.name = backup_name; backup.use_fake_user = True
            ob['lift_aperture_original_matrix'] = [v for row in ob.matrix_world for v in row]
        else:
            saved = ob['lift_aperture_original_matrix']
            original = Matrix([saved[i:i+4] for i in range(0, 16, 4)])
            restored = backup.copy(); restored.transform(ob.matrix_world.inverted()@original)
            ob.data = restored
        cutter = box(prefix+'Temporary aperture cutter', ((ax0+ax1)/2, (ay0+ay1)/2, level-.04),
                     (ax1-ax0, ay1-ay0, .60), cream, ground)
        mod = ob.modifiers.new('Through-floor lift aperture', 'BOOLEAN')
        mod.operation = 'DIFFERENCE'; mod.solver = 'EXACT'; mod.object = cutter
        with bpy.context.temp_override(object=ob, active_object=ob):
            bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(cutter, do_unlink=True)
    cover = prefix+'Floor cover'
    part('Floor cover insulated panel', ((ax0+ax1)/2, (ay0+ay1)/2, (GROUND_CEILING+level)/2),
         (ax1-ax0-.008, ay1-ay0-.008, level-GROUND_CEILING-.004),
         layer='20 First floor - floors', assembly=cover)
    carpet = bpy.data.objects['Bedroom 5 | floor'].data.materials[0].name
    part('Floor cover carpeted upper face', ((ax0+ax1)/2, (ay0+ay1)/2, level-.001),
         (ax1-ax0-.065, ay1-ay0-.065, .002), carpet, '20 First floor - floors', cover)
    for zz, label in [(GROUND_CEILING-.020, 'Ceiling hatch frame'), (level+.006, 'Upper cover rim')]:
        for yy in (ay0, ay1):
            part(label+' long edge', ((ax0+ax1)/2, yy, zz),
                 (ax1-ax0+.037, .033, .022), layer=ground if zz<level else upper, assembly=cover)
        for xx in (ax0, ax1):
            part(label+' short edge', (xx, (ay0+ay1)/2, zz),
                 (.033, ay1-ay0-.033, .022), layer=ground if zz<level else upper, assembly=cover)
    # Underside diagonal support visible within the kitchen's framed hatch.
    for yy in (ay0+.075, ay1-.075):
        ob = beam(prefix+'Ceiling hatch diagonal support', (.35, yy, GROUND_CEILING-.041),
                  (1.62, (ay0+ay1)/2, GROUND_CEILING-.041), .021, cream, ground)
        ob['assembly'] = cover
    return {'sources': ['2445662-2', '2445662-3', '2445678-2'],
            'state': 'Cabin parked downstairs; empty upper guides and flush carpeted cover',
            'cabin_footprint_m': [x0, y0, x1, y1], 'cabin_low_top_m': door_top,
            'cabin_rear_top_m': rear_top, 'guide_x_m': rail_x, 'guide_ys_m': rail_ys,
            'aperture_footprint_m': [ax0, ay0, ax1, ay1], 'floor_to_floor_m': level,
            'preserved': 'All room walls/openings, kitchen furniture and floor-to-floor height',
            'navigation': 'Carcass body names use existing furniture selector; upper cover remains a floor surface',
            'estimated': 'Lift body dimensions, small mechanisms and materials inferred from the photos'}
