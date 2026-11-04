"""Fit the retained ensuite around the owner's widened courtyard stair.

Applied after the frozen suite is imported, without editing the accepted asset.
The same operation supports a targeted refresh of an already built proposal.
"""
import json

REVISION = 'courtyard-stair-junction-2026-10-17'


def fit_courtyard_stair_junction(ns):
    import bpy
    import numpy as np
    from mathutils import Vector
    scene, nav, spec = (ns[k] for k in ('scene', 'nav', 'spec'))
    offset = float(spec['courtyard'].get('upper_glazing_x', 10.35)) - 10.35
    if offset < .001:
        return [], {'revision': REVISION, 'applied': False}
    assert abs(offset-.5) < 1e-6, 'Junction is authored for the requested 500 mm shift'
    if scene.get('courtyard_stair_junction'):
        report = json.loads(scene['courtyard_stair_junction'])
        assert report['revision'] == REVISION
        return [], report
    changed, records = {}, []
    def get(name):
        ob = scene.objects.get(name)
        assert ob is not None, name
        return ob
    def bounds(ob):
        points = [ob.matrix_world@v.co for v in ob.data.vertices]
        return [min(p[k] for p in points) for k in range(3)] + [max(p[k] for p in points) for k in range(3)]
    def mark(ob, before):
        changed[ob.name] = ob
        ob['courtyard_stair_junction'] = REVISION
        records.append({'name': ob.name, 'before': before, 'after': bounds(ob)})
    def resize(ob, target):
        # Copy shared mesh data and retain physical UV scale on each planar face.
        old = bounds(ob)
        ob.data = ob.data.copy()
        mesh, matrix = ob.data, ob.matrix_world
        points = [matrix@v.co for v in mesh.vertices]
        uv_maps = []
        for layer in mesh.uv_layers:
            for face in mesh.polygons:
                ids = list(face.loop_indices)
                xyz = np.array([list(points[mesh.loops[i].vertex_index]) for i in ids])
                axes = np.argsort(np.ptp(xyz, axis=0))[-2:]
                a = np.column_stack((xyz[:, axes], np.ones(len(ids))))
                uv = np.array([list(layer.data[i].uv) for i in ids])
                coeff = np.linalg.lstsq(a, uv, rcond=None)[0]
                if np.max(np.abs(a@coeff-uv)) < .0001:
                    uv_maps.append((layer, ids, axes, coeff))
        inv = matrix.inverted()
        for vert, p in zip(mesh.vertices, points):
            for k in range(3):
                extent = old[k+3]-old[k]
                p[k] = target[k] + ((p[k]-old[k])/extent if extent > 1e-7 else 0)*(target[k+3]-target[k])
            vert.co = inv@p
        for layer, ids, axes, coeff in uv_maps:
            for i in ids:
                p = points[mesh.loops[i].vertex_index]
                layer.data[i].uv = tuple(np.array([p[int(axes[0])], p[int(axes[1])], 1])@coeff)
        mesh.update()
        mark(ob, old)
        return ob
    def axis(name, k, low=None, high=None):
        ob = get(name); b = bounds(ob)
        if low is not None: b[k] = low
        if high is not None: b[k+3] = high
        return resize(ob, b)
    def translate(ob, dx):
        before = bounds(ob)
        ob.matrix_world.translation.x += dx
        mark(ob, before)
    def copy_box(template, name, target):
        original = get(template)
        ob = original.copy(); ob.data = original.data.copy(); ob.name = name
        ob['source_name'] = name
        original.users_collection[0].objects.link(ob)
        resize(ob, target)
        appearance = nav.get('exteriorAppearance', {})
        for names in appearance.get('objects', {}).values():
            if template in names and name not in names: names.append(name)
        return ob
    def segments(items):
        names = {s['name'] for s in items}
        nav['segments'][:] = [s for s in nav['segments'] if s['name'] not in names]
        if 'new_segments' in ns:
            ns['new_segments'][:] = [s for s in ns['new_segments'] if s['name'] not in names] + items
        else:
            nav['segments'].extend(items)

    # Clear the complete headroom shaft, including the separately imported
    # bedroom ceiling. Extend the opening past the third tread's nosing.
    from scripts.geometry.blender_booleans import BooleanWorkspace
    opening=[9.83,-4.16,10.83,-.84]
    old_start=nav.get('proposalLoft',{}).get('stair_void',opening)[1]
    bpy.ops.mesh.primitive_cube_add(size=1,location=(10.33,-2.5,5.385))
    cutter=bpy.context.object;cutter.name='Temporary courtyard headroom cut'
    cutter.dimensions=(1,3.32,.37)
    bpy.context.view_layer.update()
    candidates=[]
    for ob in scene.objects:
        if ob.type!='MESH' or not any(t in ob.name.lower() for t in ('ceiling','deck','floor')):continue
        if not ob.name.startswith(('Proposal |','Bedroom 02 |','Hobby 01 |')):continue
        b=bounds(ob)
        if 5.20<b[2]<5.56 and b[5]<5.57 and b[0]<10.83-1e-5 and b[3]>9.83+1e-5 and b[1]<-.84-1e-5 and b[4]>-4.16+1e-5:candidates.append(ob)
    with BooleanWorkspace([cutter]) as workspace:
        for ob in candidates:
            before=bounds(ob);workspace.difference(ob,[cutter],'Courtyard stair headroom')
            assert len(ob.data.vertices),ob.name
            mark(ob,before)
    bpy.data.objects.remove(cutter,do_unlink=True)
    # Difference of a walkable polygon and the rectangular opening. Keep
    # separate pieces so navigation cannot walk over the freshly cut void.
    def clip(poly,k,value,greater):
        out=[]
        for a,b in zip(poly,poly[1:]+poly[:1]):
            ai=(a[k]>=value) if greater else (a[k]<=value)
            bi=(b[k]>=value) if greater else (b[k]<=value)
            if ai:out.append(a)
            if ai!=bi:
                t=(value-a[k])/(b[k]-a[k]);out.append([a[j]+t*(b[j]-a[j]) for j in (0,1)])
        return out
    def area(poly):return abs(sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(poly,poly[1:]+poly[:1])))/2
    for items in (nav['surfaces'],ns.get('new_surfaces',[])):
        result=[]
        for surface in items:
            if abs(surface['z']-5.55)>.015:result.append(surface);continue
            poly=surface['polygon'];inside=poly;outside=[]
            for k,v,g in ((0,9.83,True),(0,10.83,False),(1,-4.16,True),(1,-.84,False)):
                part=clip(inside,k,v,not g)
                if len(part)>=3 and area(part)>1e-7:outside.append(part)
                inside=clip(inside,k,v,g)
                if not inside:break
            if len(inside)<3 or area(inside)<1e-7:result.append(surface);continue
            for i,poly in enumerate(outside):result.append({**surface,'name':surface['name']+' | stair trim '+str(i),'polygon':poly})
        items[:]=result
    if old_start>opening[1]+.001:
        delta=opening[1]-old_start
        for ob in list(scene.objects):
            if not ob.name.startswith('Proposal | Loft stair void '):continue
            before=bounds(ob)
            if 'south guard' in ob.name:ob.matrix_world.translation.y+=delta;mark(ob,before)
            elif 'west guard' in ob.name or 'east guard' in ob.name:
                south=old_start-(.06 if 'east guard' in ob.name else 0)
                north=-2.59 if 'east guard' in ob.name else -.84
                if any(t in ob.name for t in ('handrail','base rail')):
                    target=before.copy();target[1]+=delta;resize(ob,target)
                else:
                    cy=(before[1]+before[4])/2;t=max(0,min(1,(north-cy)/(north-south)))
                    ob.matrix_world.translation.y+=delta*t;mark(ob,before)
        for items in (nav['segments'],ns.get('new_segments',[])):
            for s in items:
                if s['name'].startswith('Proposal | Loft stair void '):
                    if 'south guard' in s['name']:s['a'][1]+=delta;s['b'][1]+=delta
                    elif 'west guard' in s['name'] or 'east guard' in s['name']:s['a'][1]+=delta
    if 'proposalLoft' in nav:nav['proposalLoft']['stair_void']=opening
    nav.get('proposal',{}).get('specification',{})['loftStairOpeningStartOffsetM']=.44

    # The return clears the lower landing by 320 mm from the stair centreline.
    # It abuts the retained vanity's north end instead of moving that assembly.
    jog = -4.98
    west = 'Proposal | Guest bathroom west'
    copy_box(west, 'Proposal | Stair ensuite north wall', [10.85,jog+.06,2.8,10.97,-3.144,5.35])
    copy_box(west, 'Proposal | Stair ensuite wall return', [10.35,jog-.06,2.8,10.97,jog+.06,5.35])
    axis(west,1,high=jog-.06)
    segments([
        {'name':west,'a':[10.41,-6.65],'b':[10.41,jog-.06],'bottom':2.8,'top':5.35,'thickness':.12},
        {'name':'Proposal | Stair ensuite north wall','a':[10.91,jog+.06],'b':[10.91,-3.144],'bottom':2.8,'top':5.35,'thickness':.12},
        {'name':'Proposal | Stair ensuite wall return','a':[10.35,jog],'b':[10.97,jog],'bottom':2.8,'top':5.35,'thickness':.12},
    ])
    lining = 'Ensuite 01 | west stone lining'
    copy_box(lining,'Ensuite 01 | shower west stone lining',[10.97,jog-.06,2.8,10.986,-3.277,5.28])
    copy_box(lining,'Ensuite 01 | stair return stone lining',[10.486,jog-.076,2.8,10.97,jog-.06,5.28])
    axis(lining,1,high=jog-.06)

    # Refit the shower as a 0.93 x 1.70 m walk-in, retaining the east screen.
    wall_parts = ('shower west glass channel','shower thermostatic control','handshower ', 'shower stone shelf','shower bottle')
    for ob in list(scene.objects):
        if ob.name.startswith(tuple('Ensuite 01 | '+s for s in wall_parts)): translate(ob,.5)
        elif ob.name.startswith('Ensuite 01 | rainhead'): translate(ob,.285)
    axis('Ensuite 01 | shower south fixed Glass',0,10.97,11.17)
    axis('Ensuite 01 | shower glass support',0,10.99,11.9)
    axis('Ensuite 01 | shower linear drain',0,11.08,11.78)
    for ob in scene.objects:
        if ob.name.startswith('Ensuite 01 | drain slot'):
            b=bounds(ob); centre=(b[0]+b[3])/2
            translate(ob,11.08+(centre-10.6)*(.70/1.1)-centre)

    # A complete masonry pier connects the moved glazed link to the bathroom.
    # Narrow only the corner window; preserve the opposite jamb and next window.
    facade='Proposal | North upper facade east '
    copy_box(facade+'pier 1',facade+'corner pier',[10.85,-3.259,2.8,11.205,-3.029,5.35])
    translate(get(facade+'window 0 mullion'),.5)
    for ob in list(scene.objects):
        if ob.name in (facade+'sill 0',facade+'head 0',facade+'window 0 glass') or ob.name.startswith(facade+'window 0 horizontal fram'):
            axis(ob.name,0,11.205,None)
    axis(facade+'window cill 0',0,11.135,None)
    segments([{'name':facade+'corner pier','a':[10.85,-3.144],'b':[11.205,-3.144],'bottom':2.8,'top':5.35,'thickness':.23}])
    for items in (nav['segments'],ns.get('new_segments',[])):
        for s in items:
            if s['name'] in (facade+'sill 0',facade+'head 0',facade+'window 0 glass'):s['a'][0]=11.205
    for name in ('north stone pier','north tiled reveal'):
        translate(get('Ensuite 01 | '+name),.5)
    for name in ('north stone below window','north stone above window','north window stone sill','north window tiled head'):
        axis('Ensuite 01 | '+name,0,11.205,None)
    axis('Ensuite 01 | north obscure privacy pane',0,11.26,None)

    # Reshape the actual stone surface and tile joints at the wall jog.
    polygon=[[9.96,-7.64],[13.75,-7.64],[13.75,-3.259],[10.97,-3.259],
             [10.97,jog-.06],[10.47,jog-.06],[10.47,-6.71],[9.96,-6.71]]
    floor=get('Ensuite 01 | limestone floor'); before=bounds(floor)
    oldmesh=floor.data; mesh=bpy.data.meshes.new(floor.name+' courtyard fit')
    inv=floor.matrix_world.inverted()
    mesh.from_pydata([inv@Vector((x,y,2.806)) for x,y in polygon],[],[list(range(len(polygon)))])
    for mat in oldmesh.materials:mesh.materials.append(mat)
    # The accepted floor uses planar UV coordinates; fit them before replacing it.
    if oldmesh.uv_layers.active:
        a=[];uv=[]
        for loop in oldmesh.loops:
            p=floor.matrix_world@oldmesh.vertices[loop.vertex_index].co
            a.append([p.x,p.y,1]);uv.append(list(oldmesh.uv_layers.active.data[loop.index].uv))
        coeff=np.linalg.lstsq(np.array(a),np.array(uv),rcond=None)[0]
        layer=mesh.uv_layers.new(name=oldmesh.uv_layers.active.name)
        for loop in mesh.loops:
            p=polygon[loop.vertex_index];layer.data[loop.index].uv=tuple(np.array([*p,1])@coeff)
    floor.data=mesh;mark(floor,before)
    axis('Ensuite 01 | floor tile joint',1,high=jog-.076)
    for name in ('floor cross joint.005','floor cross joint.006'):axis('Ensuite 01 | '+name,0,10.975,None)
    # The exposed lower-landing strip gets the same oak and UV scale as its neighbour.
    oak='Landings 01 | continuous oak landing floor.009'
    ob=get(oak);b=bounds(ob)
    copy_box(oak,'Landings 01 | stair lower landing infill',[10.35,jog+.06,b[2],10.85,-4.23,b[5]])
    for items in (nav['planRooms'],ns.get('new_rooms',[])):
        for room in items:
            if room['name']=='New principal bathroom':room['polygon_m']=polygon
    for items in (nav['surfaces'],ns.get('new_surfaces',[])):
        for surface in items:
            if surface['name']=='Principal suite | New principal bathroom':surface['polygon']=polygon
    # Recompute the shower collision planes from their refitted mesh extents.
    names=('shower east fixed Glass','shower south fixed Glass','shower west glass channel')
    for i,name in enumerate(names):
        b=bounds(get('Ensuite 01 | '+name)); record={'name':'Ensuite 01 | Shower glass '+str(i),'box':[b[0],b[1],b[3],b[4]],'bottom':b[2],'top':b[5]}
        for items in (nav['obstacles'],ns.get('new_obstacles',[])):
            items[:]=[o for o in items if o['name']!=record['name']]
        ns.get('new_obstacles',nav['obstacles']).append(record)
    bpy.context.view_layer.update()
    report={'revision':REVISION,'applied':True,'showerInsideMetres':[.93,1.701],
            'showerEntryMetres':.725,'wallReturnY':jog,'acceptedAssetUnchanged':True,'objects':records}
    scene['courtyard_stair_junction']=json.dumps(report)
    nav['courtyardStairJunction']=report
    return list(changed.values()),report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    fit_courtyard_stair_junction(globals())
