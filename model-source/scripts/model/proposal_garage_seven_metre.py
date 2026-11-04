"""CJ02 accepted repeated-joist integration; Proposed scenes only."""
import json
REVISION='CJ02-native-2026-10-28'

def apply_garage_seven_metre(ns):
    import bpy
    from mathutils import Vector
    from mathutils.bvhtree import BVHTree
    from mathutils.geometry import barycentric_transform
    scene,nav,root=ns['scene'],ns['nav'],ns['ROOT']
    cfg=json.loads((root/'proposal/specs/garage-seven-metre.json').read_text())
    if scene.get('garage_seven_metre_revision')==REVISION:
        report=json.loads(scene['garage_seven_metre_report']);nav['garageSevenMetre']=report
        return [],report
    def replacement(ob,r):
        old=ob.data;old.calc_loop_triangles();src=list(old.loop_triangles);world=[ob.matrix_world@v.co for v in old.vertices]
        tree=BVHTree.FromPolygons(world,[t.vertices for t in src],all_triangles=True)
        tri=r.get('triangles')
        if tri is None:
            lo,hi=r['box'];v=[(x,y,z)for z in (lo[2],hi[2])for y in (lo[1],hi[1])for x in (lo[0],hi[0])]
            faces=[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)]
            tri=[v[j]for f in faces for j in (f[0],f[1],f[2],f[0],f[2],f[3])]
        verts=[];faces=[];indices={};inv=ob.matrix_world.inverted()
        for i in range(0,len(tri),3):
            f=[]
            for p in tri[i:i+3]:
                key=tuple(p)
                if key not in indices:indices[key]=len(verts);verts.append(inv@Vector(p))
                f.append(indices[key])
            faces.append(f)
        me=bpy.data.meshes.new(ob.name+' CJ02 coordinated mesh');me.from_pydata(verts,[],faces);me.update()
        for mat in old.materials:me.materials.append(mat)
        for uv in old.uv_layers:me.uv_layers.new(name=uv.name)
        for face in me.polygons:
            _,_,ti,_=tree.find_nearest(ob.matrix_world@face.center)
            t=src[ti];face.material_index=t.material_index
            for li in face.loop_indices:
                p=ob.matrix_world@me.vertices[me.loops[li].vertex_index].co
                for ui,uv in enumerate(old.uv_layers):
                    uvp=[Vector((*uv.data[l].uv,0))for l in t.loops]
                    me.uv_layers[ui].data[li].uv=barycentric_transform(p,*[world[v]for v in t.vertices],*uvp).xy
        ob.data=me
    owner={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    retained={c for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name for c in s.collection.children_recursive}
    changed=[];removed=[];clones={};records=[]
    def bounds(ob):
        p=[ob.matrix_world@v.co for v in ob.data.vertices]
        return [[min(v[k]for v in p)for k in range(3)],[max(v[k]for v in p)for k in range(3)]]
    def editable(name):
        if name in clones:return clones[name]
        ob=scene.objects.get(name)
        if ob is None:raise ValueError('CJ02 source missing: '+name)
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            clone=ob.copy();clone.data=ob.data.copy();clone.name='CJ02 | '+name;clone['source_name']=ob.get('source_name',ob.name)
            for c in tuple(ob.users_collection):
                if c in owner:
                    if c in retained:raise ValueError('Cannot edit shared collection: '+c.name)
                    c.objects.unlink(ob);c.objects.link(clone)
            removed.append(name);ob=clone
        if ob.modifiers:
            bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get();mesh=bpy.data.meshes.new_from_object(ob.evaluated_get(deps),preserve_all_data_layers=True,depsgraph=deps)
        else:mesh=ob.data.copy()
        ob.modifiers.clear();ob.data=mesh;changed.append(ob);clones[name]=ob;return ob
    def mapped(p,maps):
        p=list(p)
        for m in maps:
            k=m['axis'];old,new=m['old'],m['new'];i=next((i for i in range(len(old)-1)if p[k]<=old[i+1]),len(old)-2)
            p[k]=new[i]+(p[k]-old[i])*(new[i+1]-new[i])/(old[i+1]-old[i])
        return p
    # Use the authored ivory plaster appearance for all new interior panels.
    white=next(m for m in scene.objects['Proposal | West recess upper facade'].data.materials if 'white' in m.name.lower() or 'plaster' in m.name.lower())
    # Preserve authored texture coordinates on changed finish meshes.
    for r in cfg['replacementMeshes']:
        ob=editable(r['name']);before=bounds(ob);replacement(ob,r)
        if r.get('white'):
            ob.data.materials.clear();ob.data.materials.append(white)
        records.append(dict(name=ob.name,before=before,after=bounds(ob),replaced=True))
    for r in cfg['operations']:
        ob=editable(r['name']);before=bounds(ob)
        if max(abs(before[k][i]-r['before'][k][i])for k in range(2)for i in range(3))>.003:raise ValueError('CJ02 source bounds changed: '+r['name'])
        original_mesh=ob.data.copy() if r.get('preserveTextureScale') else None
        inv=ob.matrix_world.inverted()
        for v in ob.data.vertices:v.co=inv@Vector(mapped(ob.matrix_world@v.co,r['maps']))
        ob.data.update()
        if original_mesh is not None:
            ob.data.calc_loop_triangles();verts=[list(ob.matrix_world@ob.data.vertices[v].co)for t in ob.data.loop_triangles for v in t.vertices];ob.data=original_mesh;replacement(ob,{'triangles':verts})
        records.append(dict(name=ob.name,before=before,after=bounds(ob)))
    for r in cfg.get('finalMeshCorrections',[]):
        ob=editable(r['name']);before=bounds(ob);replacement(ob,r)
        if r.get('white'):
            ob.data.materials.clear();ob.data.materials.append(white)
        records.append(dict(name=ob.name,before=before,after=bounds(ob),basis=r['basis']))
    for name in cfg['retire']:
        ob=scene.objects.get(name)
        if ob is None:continue
        for c in tuple(ob.users_collection):
            if c in owner:
                if c in retained:raise ValueError('Cannot retire shared object '+name)
                c.objects.unlink(ob)
        removed.append(name)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    # Finished enclosure, independent of the floor-bearing system.
    for r in cfg['boxes']:
        src=scene.objects.get(r['template']);ob=src.copy();ob.data=src.data.copy();ob.name=r['name']
        ob['source_name']=r['name'];ob['structural_finish_detail']=r['finish']
        next(c for c in src.users_collection if c in owner).objects.link(ob)
        replacement(ob,r);changed.append(ob);clones[ob.name]=ob
        ob.data.materials.clear();ob.data.materials.append(white)
    targets={r['name']:r for r in cfg['operations']}
    for key in ('obstacles','segments'):
        groups=[nav.setdefault(key,[])];pending=ns.get('new_'+key)
        if pending is not None and pending is not groups[0]:groups.append(pending)
        for values in groups:
            for v in values:
                name=v.get('name');ob=clones.get(name)
                if ob is not None and 'box'in v:
                    lo,hi=bounds(ob);v.update(box=[lo[0],lo[1],hi[0],hi[1]],bottom=lo[2],top=hi[2])
                if name in targets and key=='segments':
                    for end in ('a','b'):v[end]=mapped([*v[end][:2],v.get('bottom',0)],targets[name]['maps'])[:2]
                    lo,hi=bounds(ob);normal=1 if abs(v['b'][0]-v['a'][0])>abs(v['b'][1]-v['a'][1]) else 0;v['thickness']=hi[normal]-lo[normal]
                    if 'Garage east separation'in name:v.update(thickness=.15,top=2.381)
                if name=='Proposal | Entrance bay north return' and key=='segments':v['b'][0]=5.16
                if name=='Proposal | West recess upper facade' and key=='segments':v.update(a=[5.1125,-9.79],b=[5.1125,-9.59],thickness=.365)
                if name=='Garage 01 | complete bench and cupboard':v['box']=[10.7825,-16,11.3725,-14.08]
            for r in cfg['boxes']:
                lo,hi=r['box']
                if key=='obstacles':values.append(dict(name=r['name'],box=[lo[0],lo[1],hi[0],hi[1]],bottom=lo[2],top=hi[2]))
                elif 'Garage north'in r['name']:values.append(dict(name=r['name'],a=[lo[0],-9.905],b=[hi[0],-9.905],thickness=.245,bottom=lo[2],top=hi[2]))
                else:values.append(dict(name=r['name'],a=[5.22,lo[1]],b=[5.22,hi[1]],thickness=.15,bottom=lo[2],top=hi[2]))
    for door in nav.get('interactiveDoors',[]):
        if door['id']=='Proposal | Garage east separation door 0':
            for key in ('hinge','openingCenter'):door[key][0]=cfg['partitionAxisX']
    for room in nav.get('planRooms',[]):
        name=room.get('name','');poly=room.get('polygon_m',[])
        if name=='New garage':room['polygon_m']=[[10.6125 if abs(x-9.3325)<.01 else 3.6125 if abs(x-3.49)<.01 else x,y]for x,y in poly]
        elif name in ('Utility','Gym'):room['polygon_m']=[[10.7625 if abs(x-9.5775)<.01 else x,y]for x,y in poly]
    report=dict(revision=REVISION,changed=[o.name for o in changed],removed=removed,operations=records,
        clearGarageDepthM=7,frontInsideX=3.6125,garageFinishedBackX=10.6125,partitionAxisX=10.6875,
        suiteLayoutPreserved=True,basementBearingWallsPreserved=True,approvedForConstruction=False,published=False,limits=cfg['limits'])
    nav['garageSevenMetre']=report;scene['garage_seven_metre_revision']=REVISION;scene['garage_seven_metre_report']=json.dumps(report)
    bpy.context.view_layer.update();return changed,report

if 'scene'in globals() and 'nav'in globals() and globals().get('VARIANT')=='compact':apply_garage_seven_metre(globals())
