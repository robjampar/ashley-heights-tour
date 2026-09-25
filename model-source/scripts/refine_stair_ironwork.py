"""Photo-backed cast iron infill; existing rails, newels and stairs stay fixed.

The repeated lyre, shoulder scroll and bottom fan are visible in 2445657-0,
2445658-3 and 2445670-3. Fine casting profiles and panel spacing are inferred.
"""
import math

import bpy
from mathutils import Vector
from detail_sweep import make_tube


def refine_stair_ironwork(g):
    prefix = 'Stair photo iron | '
    old = ('Stair white baluster', 'Stair cast scroll', 'Stair baluster ornament',
           'Landing baluster', 'Landing white baluster', 'Landing cast scroll')
    for ob in list(bpy.data.objects):
        if ob.type == 'MESH' and ob.name.startswith((*old, prefix)):
            bpy.data.objects.remove(ob, do_unlink=True)
    material = bpy.data.materials.get('Pale painted cast iron')
    if material is None:
        material = bpy.data.materials.new('Pale painted cast iron')
    material.use_nodes = True
    colour = (.70, .74, .72, 1)
    material.diffuse_color = colour
    bs = material.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Base Color'].default_value = colour
    bs.inputs['Metallic'].default_value = .38
    bs.inputs['Roughness'].default_value = .34
    g['materials'][material.name] = material
    g['PALETTE'][material.name] = list(colour)
    mesh, box = g['mesh'], g['box']
    level = g.get('LEVEL', g.get('g', g).get('level_height', 2.8))

    def curve(points, samples=7):
        """Interpolated decorative centreline, with no duplicated joint points."""
        points = [Vector(p) for p in points]
        result = []
        for i in range(len(points)-1):
            p0 = points[max(0, i-1)]; p1 = points[i]
            p2 = points[i+1]; p3 = points[min(len(points)-1, i+2)]
            for j in range(samples):
                t = j/samples
                result.append(.5*((2*p1)+(-p0+p2)*t
                                   +(2*p0-5*p1+4*p2-p3)*t*t
                                   +(-p0+3*p1-3*p2+p3)*t*t*t))
        return result+[points[-1]]

    def panel(label, center, along, bottom, top, width, layer, stair=False):
        start = set(bpy.data.objects)
        center = Vector(center); along = Vector(along)
        outward = Vector((along.y, -along.x))
        height = top-bottom
        def world(u, v, d=0):
            xy = center+along*(u*width)+outward*d
            return (xy.x, xy.y, bottom+v*height)
        def pipe(name, uv, radius=.0055, closed=False, smooth=True):
            points = curve(uv) if smooth else uv
            return make_tube(mesh, prefix+label+' '+name,
                             [world(*p) for p in points], radius,
                             material.name, layer, 8, closed)
        # Full-height cast side members enclose a large, open central lyre.
        # They attach to a foot rail and a central tenon under the timber rail.
        for sign in (-1, 1):
            shape = [(0, .99), (.12, .965), (.26, .91), (.32, .85),
                     (.27, .79), (.22, .76), (.22, .65), (.31, .58),
                     (.41, .47), (.43, .36), (.34, .24), (.22, .19),
                     (.20, .12), (.29, .065), (.45, .045)]
            pipe('cast lyre side', [(sign*u, v) for u, v in shape], .0065)
            # Narrow raised spiral ribs follow the existing member itself;
            # the photographs show this ribbed casting around the large eye.
            rib_centers = [Vector(world(*uv)) for uv in
                           curve([(sign*u, v) for u, v in shape], 28)
                           if .25 <= uv.y <= .56]
            relief = []
            normal = Vector((outward.x, outward.y, 0))
            for j, centerline in enumerate(rib_centers):
                tangent = (rib_centers[min(j+1, len(rib_centers)-1)]
                           -rib_centers[max(0, j-1)]).normalized()
                across = tangent.cross(normal).normalized()
                phase = 10*math.tau*j/(len(rib_centers)-1)
                relief.append(centerline+.0075*(normal*math.cos(phase)
                                                +across*math.sin(phase)))
            make_tube(mesh, prefix+label+' raised cast spiral rib', relief,
                      .0019, material.name, layer, 6)
            # Shoulder scroll curls inward and reconnects to the upright.
            pipe('upper inward scroll', [(sign*.26, .91), (sign*.10, .90),
                 (sign*.065, .86), (sign*.105, .83), (sign*.19, .842),
                 (sign*.21, .873), (sign*.17, .885)], .005)
            pipe('lower foot scroll', [(sign*.45, .045), (sign*.33, .08),
                 (sign*.18, .077), (sign*.14, .041), (sign*.20, .025),
                 (sign*.26, .048)], .005)
            # Inner raised line follows the long centre leaf, as on the photos.
            pipe('inner lyre rib', [(0, .60), (sign*.19, .55),
                 (sign*.28, .43), (sign*.25, .32), (sign*.10, .22), (0, .20)], .0045)
            pipe('waist curl', [(sign*.22, .65), (sign*.10, .67),
                 (sign*.07, .63), (sign*.12, .61), (sign*.21, .63)], .005)
        pipe('central spear', [(0, .05), (0, .20), (0, .60), (0, .685)],
             .005, smooth=False)
        pipe('top fixing tenon', [(0, .935), (0, 1.012)], .0065, smooth=False)
        pipe('bottom cross member', [(-.46, .045), (.46, .045)], .0065, smooth=False)
        for u in (-.40, .40):
            pipe('foot fixing lug', [(u, -.005), (u, .055)], .0055, smooth=False)
        # Small flattened leaves reproduce raised cast ornament without the
        # previous bulbous, wood-turning spheres.
        for u, v, hu, hv in [(0, .692, .065, .035), (0, .963, .06, .025),
                              (0, .185, .07, .033), (0, .61, .065, .030),
                              (-.22, .65, .065, .023), (.22, .65, .065, .023),
                              (-.20, .12, .06, .021), (.20, .12, .06, .021)]:
            vertices = [world(u, v-hv), world(u+hu, v), world(u, v+hv),
                        world(u-hu, v), world(u, v, .012), world(u, v, -.012)]
            faces = [(0, 1, 4), (1, 2, 4), (2, 3, 4), (3, 0, 4),
                     (1, 0, 5), (2, 1, 5), (3, 2, 5), (0, 3, 5)]
            mesh(prefix+label+' cast pointed leaf', vertices, faces, material.name, layer)
        angle = math.atan2(along.y, along.x)
        foot = box(prefix+label+' cast foot plate',
                   (center.x, center.y, bottom+.002), (width*.98, .068, .022),
                   material.name, layer, angle)
        if stair:
            # A small open fan hangs off the horizontal mounting plate. Its
            # fan ribs meet that plate and a shared lower boss.
            for u in (-.36, -.18, 0, .18, .36):
                pipe('tread-edge fan rib', [(u, .01), (u*.72, -.043),
                     (0, -.088)], .0045)
            pipe('fan lower curl', [(-.18, -.055), (-.13, -.09), (0, -.088),
                 (.13, -.09), (.18, -.055)], .0045)
        for ob in set(bpy.data.objects)-start:
            ob['assembly'] = prefix+label
            ob['reference'] = '2445657-0, 2445658-3, 2445670-3'
        return {'name': label, 'center_xy_m': list(center), 'bottom_m': bottom,
                'top_m': top, 'width_m': width}

    specs = []
    going = (3.56-1.01)/14
    # Match the actual existing handrail centreline rather than stopping short
    # of it as the previous 0.85m constant-height sticks did.
    def handrail_z(y):
        a = Vector((3.46, 1.12)); b = Vector((1.01, 14*level/17+.89))
        return a.y+(y-a.x)/(b.x-a.x)*(b.y-a.y)
    for i in range(14):
        y = 3.56-(i+.5)*going
        base = (i+1)*level/17-.018
        top = handrail_z(y)-.024
        specs.append(panel(f'Flight panel {i+1:02}', (7.904, y), (0, 1),
                           base, top, going*.87, '13 Staircase', True))
    # Landing panels are broader than a single tread casting; their long,
    # slender silhouette and repeated scroll heads are clear in 2445670-3.
    for label, a, b, count in [
            ('Landing long', (7.82, 1.02), (7.82, 3.10), 8),
            ('Landing return', (7.82, 3.10), (8.88, 3.10), 4)]:
        a, b = Vector(a), Vector(b); along = (b-a).normalized()
        spacing = (b-a).length/count
        for i in range(count):
            center = a.lerp(b, (i+.5)/count)
            specs.append(panel(f'{label} panel {i+1:02}', center, along,
                               level+.006, level+.922, spacing*.94, '24 Trim'))
    return {'references': ['2445657-0', '2445658-3', '2445670-3'],
            'panels': specs, 'flight_panel_count': 14, 'landing_panel_count': 12,
            'preserved': 'Existing timber handrails, newels, treads, walls and navigation obstacles',
            'inferred': 'Casting section, fine relief, exact panel count/spacing and paint reflectance'}
