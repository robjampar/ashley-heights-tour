"""Keep the loggia step on its two floor datums, independent of lawn grading."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
def correct_loggia_step(ns):
    import bpy
    from mathutils import Vector,Matrix
    scene=ns['scene'];name='Proposal | Loggia step';steps=[o for o in scene.objects if o.type=='MESH'and o.get('source_name',o.name)==name]
    if not steps:return None
    assert len(steps)==1,'Expected one intermediate tread for the retained summer-house rise'
    floor=next(o for o in scene.objects if o.type=='MESH'and o.get('source_name',o.name)=='Summer house floor')
    upper=max((floor.matrix_world@v.co).z for v in floor.data.vertices);lower=.20;top=(upper+lower)/2
    # Extend the tread to the actual upper floor edge: no 110 mm gap behind it.
    a,s,c,n=13.95,19.77,14.32,23.34;bottom=lower-.02
    vv=[(x,y,z)for z in(bottom,top)for y in(s,n)for x in(a,c)];ff=[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)]
    ob=steps[0];materials=list(ob.data.materials);mesh=bpy.data.meshes.new(name+' datum-correct tread');mesh.from_pydata(vv,[],ff);mesh.update()
    for mat in materials:mesh.materials.append(mat)
    ob.data=mesh;ob.matrix_world=Matrix.Identity(4);ob.modifiers.clear();ob['garden_fixed_floor_datum']=True
    for values in(ns['nav'].get('surfaces',[]),ns.get('new_surfaces',[])):
        for q in values:
            if q['name']==name:q.update(polygon=[[a,s],[c,s],[c,n],[a,n]],z=top)
    record={'object_name':ob.name,'name':name,'reason':'Intermediate tread must meet the retained terrace and summer-house floor; lawn conformation had raised it a second time.','bounds':[a,s,bottom,c,n,top],'lower_floor':lower,'upper_floor':upper,'risers':[top-lower,upper-top],'tread_depth':c-a}
    ns['nav'].setdefault('sourceGeometryCorrections',{})['loggiaStep']=record
    return record


def correct_garden_building_clearance(ns):
    """Bounded proposal-only clearance for the retained shell and existing WC door."""
    import bpy
    scene=ns['scene'];owners=set(scene.collection.children_recursive)
    volumes=[[14.145,19.455,.15,16.385,26.415,3.045], [13.35,25.00,.52,14.146,25.89,2.72]]
    workshop=next((o for o in scene.objects if o.type=='MESH'and o.get('source_name',o.name)=='Proposal | Workshop floor'),None)
    if workshop:
        pts=[workshop.matrix_world@v.co for v in workshop.data.vertices];floor=max(v.z for v in pts)
        volumes.append([min(v.x for v in pts)-.05,min(v.y for v in pts)-.05,floor-.05,max(v.x for v in pts)+.05,max(v.y for v in pts)+.05,floor+2.74])
    for values in(ns['nav'].get('surfaces',[]),ns.get('new_surfaces',[])):
        for sf in values:
            if sf['name']in('Summer house floor','Outside WC floor','Tool store floor'):sf['overridesTerrain']=True
    records=ns['nav'].setdefault('sourceGeometryCorrections',{}).setdefault('gardenBuildingClearance',[])
    if records:return records
    scene.view_layers[0].update();candidates=[]
    overlap=lambda a,b:all(a[i]<b[i+3]and a[i+3]>b[i]for i in range(3))
    for ob in list(scene.objects):
        if ob.type!='MESH':continue
        label=ob.get('source_name',ob.name)
        if not ('hedge'in label.lower() or label=='Proposal | Pool terrace retaining kerb'):continue
        vv=[ob.matrix_world@v.co for v in ob.data.vertices]
        if not vv:continue
        bb=[f(v[i]for v in vv)for f in(min,max)for i in range(3)]
        relevant=[bounds for bounds in volumes if overlap(bb,bounds)]
        if relevant:candidates.append((ob,relevant))
    cutters=[]
    for bounds in volumes:
        a,s,z,c,n,h=bounds;vv=[(x,y,zz)for zz in(z,h)for y in(s,n)for x in(a,c)];ff=[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)]
        mesh=bpy.data.meshes.new('Garden building clearance volume');mesh.from_pydata(vv,[],ff);mesh.update();cutter=bpy.data.objects.new(mesh.name,mesh);scene.collection.objects.link(cutter);cutters.append((bounds,cutter))
    for ob,relevant in candidates:
        oldname=ob.name;vertices=[list(ob.matrix_world@v.co)for v in ob.data.vertices]
        edited=ob.copy();edited.data=ob.data.copy();edited.name='Garden clearance | '+oldname.removeprefix('Proposal revision | ')
        edited['source_name']=edited.name;scene.collection.objects.link(edited);bpy.context.view_layer.objects.active=edited
        for bounds,cutter in cutters:
            if bounds not in relevant:continue
            mod=edited.modifiers.new('Retained garden building clearance','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
            bpy.ops.object.modifier_apply(modifier=mod.name)
        after=[list(edited.matrix_world@v.co)for v in edited.data.vertices]
        same=len(after)==len(vertices)and all(max(abs(a-b)for a,b in zip(v,q))<1e-6 for v,q in zip(vertices,after))
        if same:bpy.data.objects.remove(edited,do_unlink=True);continue
        for collection in tuple(ob.users_collection):
            if collection in owners or collection==scene.collection:collection.objects.unlink(ob)
        if 'excluded'in ns:ns['excluded'].add(oldname)
        if 'changes'in ns:ns['changes'].append({'original':oldname,'action':'clipped in proposal copy only','reason':'Remove kerb or hedge intrusion through retained garden-building shell and WC doorway'})
        records.append({'source_object':oldname,'replacement_object':edited.name,'cutter_volumes':relevant,'before_vertices':vertices,'reason':'Retained garden-building shell and existing WC door clearance; geometry outside the stated volumes retained.'})
    for _,cutter in cutters:
        mesh=cutter.data;bpy.data.objects.remove(cutter,do_unlink=True)
        if mesh.users==0:bpy.data.meshes.remove(mesh)
    return records
