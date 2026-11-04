"""CJ01 accepted repeated-joist integration; Proposed scenes only."""
import json
REVISION='CJ01-native-2026-10-28'

def apply_continuous_joists(ns):
    import bpy
    from mathutils import Vector
    from mathutils.bvhtree import BVHTree
    from mathutils.geometry import barycentric_transform
    scene,nav,root=ns['scene'],ns['nav'],ns['ROOT']
    cfg=json.loads((root/'proposal/specs/continuous-joist-integration.json').read_text())
    if scene.get('continuous_joist_revision')==REVISION:
        report=json.loads(scene['continuous_joist_report']);nav['continuousJoistIntegration']=report
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
        me=bpy.data.meshes.new(ob.name+' CJ01 coordinated mesh');me.from_pydata(verts,[],faces);me.update()
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
        if ob is None:raise ValueError('CJ01 source missing: '+name)
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            clone=ob.copy();clone.data=ob.data.copy();clone.name='CJ01 | '+name;clone['source_name']=ob.get('source_name',ob.name)
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
    # Fill the old casing penetrations before moving the ceiling datum.
    for r in cfg['replacementMeshes']:
        ob=editable(r['name']);before=bounds(ob);replacement(ob,r)
        records.append(dict(name=ob.name,before=before,after=bounds(ob),replaced=True))
    for r in cfg['operations']:
        ob=editable(r['name']);before=bounds(ob)
        if max(abs(before[k][i]-r['before'][k][i])for k in range(2)for i in range(3))>.003:raise ValueError('CJ01 source bounds changed: '+r['name'])
        inv=ob.matrix_world.inverted()
        for v in ob.data.vertices:v.co=inv@Vector(mapped(ob.matrix_world@v.co,r['maps']))
        ob.data.update();records.append(dict(name=ob.name,before=before,after=bounds(ob)))
    for r in cfg.get('finalMeshCorrections',[]):
        ob=editable(r['name']);before=bounds(ob);replacement(ob,r)
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
    def light_drop(p):
        return next((r['drop']for r in cfg['lightMoves']if all(r['bounds'][0][k]<p[k]<r['bounds'][1][k]for k in range(3))),0)
    for ob in scene.objects:
        if ob.type=='LIGHT':
            drop=light_drop(ob.matrix_world.translation)
            if drop:ob.location.z-=drop
    for light in nav.get('proposalLights',[]):
        p=light.get('position',[])
        if len(p)==3:p[2]-=light_drop(p)
    retired=set(removed)|{'SW02 | Suite support enclosure'}
    for key in ('obstacles','segments'):
        groups=[nav.setdefault(key,[])];pending=ns.get('new_'+key)
        if pending is not None and pending is not groups[0]:groups.append(pending)
        for values in groups:
            values[:]=[v for v in values if v.get('name')not in retired]
            for v in values:
                name=v.get('name');ob=clones.get(name)
                if ob is not None and 'box'in v:
                    lo,hi=bounds(ob);v.update(box=[lo[0],lo[1],hi[0],hi[1]],bottom=lo[2],top=hi[2])
                if name=='Proposal | Garage north store separation end pier':
                    # Native mesh has a large opening. Collision body stops at its jamb.
                    if 'box'in v:v['box']=[6.15,-10.0275,9.5775,-9.7825]
                    if key=='segments':v.update(a=[6.15,-9.905],b=[9.5775,-9.905],thickness=.245)
                if name=='Proposal | Garage east separation end pier'and key=='segments':v['b']=[9.455,-10.0275]
    # The head is above walking height and must not block the wide opening.
    nav['obstacles'].append(dict(name='CJ01 | wide opening head',box=[9.5775,-10.0275,13.75,-9.7825],bottom=2.25,top=2.756))
    for door in nav.get('interactiveDoors',[]):
        if door['id']in cfg['doorIds']:door['apertureHeight']=2.2
    report=dict(revision=REVISION,changed=[o.name for o in changed],removed=removed,operations=records,suiteLayoutPreserved=True,columnEnclosureRemoved=True,
        groundCeilingDropM=cfg['groundCeilingDropM'],firstCeilingDropM=cfg['firstCeilingDropM'],rearWindowNarrowedM=.23,approvedForConstruction=False,published=False,limits=cfg['limits'])
    nav['continuousJoistIntegration']=report;scene['continuous_joist_revision']=REVISION;scene['continuous_joist_report']=json.dumps(report)
    bpy.context.view_layer.update();return changed,report

if 'scene'in globals() and 'nav'in globals() and globals().get('VARIANT')=='compact':apply_continuous_joists(globals())
