"""Open curved iron links between the fixed gate piers and boundary wings.

Source 2445684 directions1/3 and the user's exterior correction establish iron,
not full-height masonry, here. Curve and partly hidden scrolls are estimates.
Run after refine_site; the main gate and annotated boundary stay fixed.
"""
import math

import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube


def refine_gate_wings(g):
    data = g.get('g', g)
    site = data.get('site',data.get('site_data'))
    prefix = 'Gate connector | '
    layer = '50 Site - approximate'
    box, mesh = g['box'], g['mesh']
    names = ('Drive gate south return', 'Drive gate north return')
    for ob in list(bpy.data.objects):
        if ob.name.startswith(prefix) or ob.name in (*names, *(n+' coping' for n in names)):
            bpy.data.objects.remove(ob, do_unlink=True)
    mat = bpy.data.materials.get('Gate connector black iron')
    if mat is None:
        mat = bpy.data.materials.new('Gate connector black iron'); mat.use_nodes = True
    mat.diffuse_color = (.018, .022, .018, 1)
    bs = mat.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Base Color'].default_value = (.018, .022, .018, 1)
    bs.inputs['Roughness'].default_value = .38
    bs.inputs['Metallic'].default_value = .65
    g['materials'][mat.name] = mat
    g['PALETTE'][mat.name] = [.018, .022, .018, 1]

    def solid(name, vertices, faces, material):
        ob = mesh(prefix+name, vertices, faces, material, layer)
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free(); ob.data.update()
        ob['reference'] = '2445684-1 / 2445684-3; user confirmed curved iron connectors'
        return ob

    def tube(name, points, r=.011, material=mat.name, closed=False):
        return make_tube(mesh, prefix+name, points, r, material, layer, 8, closed)

    gate_points = [Vector(v) for v in site['gate_endpoints_m']]
    gate_mid = (gate_points[0]+gate_points[1])/2
    panels = []
    for label, name, inner in [('South', names[0], gate_points[0]),
                               ('North', names[1], gate_points[1])]:
        record = next(v for v in site['boundary_segments'] if v['name'] == name)
        record['construction']='curved iron'
        a, b = Vector(record['a']), Vector(record['b'])
        outer = a if (a-inner).length > (b-inner).length else b
        direction = (inner-outer).normalized()
        distance = (inner-outer).length
        normal = Vector((-direction.y, direction.x))
        if normal.dot(gate_mid-(inner+outer)/2) > 0:
            normal = -normal  # Bow away from the clear driveway, never into it.
        start = outer+direction*.235
        end = inner-direction*.325
        length = (end-start).length
        bow = min(.12, length*.10)

        def xy(t):
            return start.lerp(end, t)+normal*(bow*math.sin(math.pi*t))
        def top(t):
            return 1.95+.16*t-.07*math.sin(math.pi*t)
        def point(t, z):
            p = xy(t); return (p.x, p.y, z)

        # Retain the fixed outer endpoint; add the missing terminal masonry pier.
        height = 2.10 if label == 'South' else 2.08
        box(prefix+label+' outer terminal pier', (*outer, height/2),
            (.47, .47, height), 'Red brown brick', layer)
        box(prefix+label+' terminal cap slab', (*outer, height+.038),
            (.57, .57, .076), 'Stone', layer)
        # Sloping cap below the photographed stone finial on each outer pier.
        verts = [(outer.x+sx*r, outer.y+sy*r, z)
                 for r,z in ((.285,height+.076),(.175,height+.12))
                 for sx,sy in ((-1,-1),(1,-1),(1,1),(-1,1))]
        solid(label+' terminal weathered cap', verts,
              [(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)], 'Stone')

        # Both original directions show a fluted oval stone ornament above a
        # small turned neck/base. Its .30m diameter is scaled against the .47m
        # pier; the shallow twelve-flute relief is an estimate, not a survey.
        base_z = height+.12
        profile = [(0,.095),(.012,.108),(.026,.108),(.039,.077),
                   (.053,.061),(.076,.061),(.090,.078)]
        for j in range(31):
            z = .10+.295*j/30
            r = .15*math.sqrt(max(0,1-((z-.24)/.16)**2))
            profile.append((z,r))
        sides = 72
        vertices = []
        for z,r in profile:
            for k in range(sides):
                angle = math.tau*k/sides
                flute = .007*math.sin(math.pi*(z-.09)/.31)**2 if z>.09 else 0
                radius = r-flute*(.5+.5*math.cos(12*angle))
                vertices.append((outer.x+radius*math.cos(angle),
                                 outer.y+radius*math.sin(angle),base_z+z))
        top_index = len(vertices); vertices.append((outer.x,outer.y,base_z+.40))
        faces = [tuple(reversed(range(sides)))]
        for row in range(len(profile)-1):
            for k in range(sides):
                kn=(k+1)%sides;a=row*sides;b=(row+1)*sides
                faces.append((a+k,a+kn,b+kn,b+k))
        last=(len(profile)-1)*sides
        faces += [(last+k,last+(k+1)%sides,top_index) for k in range(sides)]
        finial=solid(label+' terminal fluted stone finial',vertices,faces,'Stone')
        for polygon in finial.data.polygons:
            polygon.use_smooth = len(polygon.vertices)<sides
        finial['basis']='Observed in 2445684-1/3; estimated .30m diameter/.40m height; shallow flute relief inferred'

        # The low brick plinth follows the shallow plan curve beneath the iron.
        samples = 24
        vertices = []
        for i in range(samples+1):
            t=i/samples;p=xy(t)
            tangent=(end-start)+normal*(bow*math.pi*math.cos(math.pi*t))
            across=Vector((-tangent.y,tangent.x)).normalized()
            for z in (0,.13):
                for sign in (-1,1):
                    q=p+across*.095*sign;vertices.append((q.x,q.y,z))
        faces=[(0,2,3,1),(4*samples,4*samples+1,4*samples+3,4*samples+2)]
        for i in range(samples):
            k=4*i;n=k+4
            faces += [(k,n,n+1,k+1),(k+2,k+3,n+3,n+2),
                      (k,k+2,n+2,n),(k+1,n+1,n+3,k+3)]
        solid(label+' low curved plinth', vertices, faces, 'Red brown brick')

        for caption, level in [('bottom rail',.18),('lower scroll band bottom',.43),
                                ('lower scroll band top',.68)]:
            tube(label+' '+caption,[point(i/40,level) for i in range(41)],.018)
        for caption, drop in [('curved upper rail',0),('upper scroll band top',.075),
                              ('upper scroll band bottom',.305)]:
            tube(label+' '+caption,[point(i/40,top(i/40)-drop) for i in range(41)],.017)

        bays = max(6, math.ceil(length/.14))
        for i in range(bays+1):
            t=i/bays
            tube(label+' continuous bar '+str(i),[point(t,.145),point(t,top(t))],.0095)
        # Short spear bars in the open middle, matching the visible source rhythm.
        for i in range(bays):
            t=(i+.5)/bays
            tube(label+' spear shaft '+str(i),[point(t,.16),point(t,1.36)],.009)
            p=xy(t);r=.027
            vertices=[(p.x,p.y,1.47),(p.x-r,p.y,1.36),(p.x,p.y-r,1.36),
                      (p.x+r,p.y,1.36),(p.x,p.y+r,1.36),(p.x,p.y,1.33)]
            solid(label+' spear point '+str(i),vertices,
                  [(0,1,2),(0,2,3),(0,3,4),(0,4,1),(5,2,1),(5,3,2),(5,4,3),(5,1,4)],mat.name)
            # Two tight scrolls fill each photographed upper/lower band.
            # Finite tube ends are capped; there are no zero-thickness curves.
            for band,z in [('upper',top(t)-.190),('lower',.555)]:
                for sign in (-1,1):
                    points=[]
                    for k in range(31):
                        angle=math.tau*1.1*k/30
                        radius=.012+.038*k/30
                        du=sign*(radius*math.cos(angle))
                        zz=z+sign*.053+radius*math.sin(angle)
                        tt=min(.997,max(.003,t+du/length))
                        points.append(point(tt,zz))
                    tube(label+' '+band+' scroll '+str(i)+' '+str(sign),points,.0065)

        panels.append({'side':label,'fixed_boundary_endpoint_m':list(outer),
                       'fixed_main_pier_m':list(inner),'clear_iron_span_m':length,
                       'plan_bow_outward_estimate_m':bow,'top_m_at_ends':[top(0),top(1)],
                       'top_mid_m':top(.5),'masonry_plinth_height_m':.13,
                       'outer_finial_estimated_diameter_m':.30,
                       'outer_finial_estimated_height_m':.40,
                       'outer_finial_base_z_m':base_z})

    return {'source':['2445684-1','2445684-3'], 'panels':panels,
            'replaced_meshes':[*names, *(n+' coping' for n in names)],
            'preserved_gate_clear_width_m':site['gate_clear_width_m'],
            'preserved':'Main gateposts, gate leaves, boundary endpoints and vehicle opening',
            'collision_note':'Original return records retained as conservative barriers; native geometry is open iron above low plinths',
            'estimates':'Exact curve, concealed scrollwork, finial flute relief and cap dimensions are inferred; source planting partly obscures them'}
