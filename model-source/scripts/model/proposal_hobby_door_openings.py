"""Full-height eaves doors fitted below the retained ridge and hip roofs."""
import json

REVISION = 'hobby-full-height-doors-2026-10-17'


def fit_hobby_door_openings(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    scene, nav = ns['scene'], ns['nav']
    if scene.get('hobby_full_height_doors'):
        return [], json.loads(scene['hobby_full_height_doors'])
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/hobby.json').read_text())
    from scripts.interiors.interior_suite_parts import oak_door
    leaf_builder=RoomBuilder(ns,'hobby','Hobby 01 | ','P76 Loft hobby room and bridge')
    ids={'Hobby 01 | '+d['label'] for d in cfg['doors']}
    existing={d['id']:d for d in nav.get('interactiveDoors',[])+ns.get('proposed_doors',[]) if d['id'] in ids}
    if any(existing.get('Hobby 01 | '+d['label'],{}).get('hinge')!=d['hinge'] for d in cfg['doors']):
        original={o.as_pointer() for s in bpy.data.scenes if s!=scene and 'Proposal ·' not in s.name for o in s.objects}
        for d in existing.values():
            for name in d['members']:
                ob=scene.objects.get(name)
                if ob:
                    assert ob.as_pointer() not in original,name
                    bpy.data.objects.remove(ob,do_unlink=True)
        for values in (nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):
            values[:]=[d for d in values if d['id'] not in ids]
        previous=ns.get('suite_materials')
        ns['suite_materials']={k:bpy.data.materials['Interior | Hobby '+name] for k,name in [('oak','natural oak'),('bronze','satin bronze')]}
        for d in cfg['doors']:oak_door(leaf_builder,ns,d['label'],d,d['opening'],.70,cfg['floorZ'])
        if previous is not None:ns['suite_materials']=previous
    b=RoomBuilder(ns,'hobby openings','Proposal | Full height eaves | ','P76 Full height eaves openings')
    changed=[];retired=[];replacement_segments=[];owners=set(scene.collection.children_recursive)
    y0,y1,head=4.15,4.85,7.585
    def retire(ob):
        retired.append(ob.name)
        for c in tuple(ob.users_collection):
            if c in owners:c.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    for side,x in (('west',-1.575),('east',10.33)):
        prefix='Proposal | Original loft dormer '+side+' cheek'
        old=[o for o in scene.objects if o.name.startswith(prefix) and o.type=='MESH']
        assert len(old)==3,(prefix,[o.name for o in old])
        mat=old[0].data.materials[0]
        for ob in old:retire(ob)
        for suffix,a,c,z0 in [('pier 0',y1,8.05,5.55),('head 0',4.45,y1,head)]:
            ob=b.box(side+' cheek '+suffix,(x,(a+c)/2,(z0+7.64)/2),(.18,c-a,7.64-z0),mat)
            ob.name=prefix+' '+suffix;ob['source_name']=ob.name
            replacement_segments.append({'name':ob.name,'a':[x,a],'b':[x,c],'bottom':z0,'top':7.64,'thickness':.18})
        bpy.ops.mesh.primitive_cube_add(size=1,location=(x,(y0+y1)/2,(5.50+head)/2))
        cutter=bpy.context.object;cutter.dimensions=(.5,y1-y0,head-5.50)
        bpy.context.view_layer.update()
        candidates=[o for o in scene.objects if o.type=='MESH' and o.name.startswith(
            ('Proposal | Loft west store wall south',) if side=='west' else
            ('Proposal | Loft passage east wall end pier','Proposal | Loft passage east wall cladding end pier'))]
        assert candidates,side
        with BooleanWorkspace([cutter]) as ws:
            for ob in candidates:
                ob.data=ob.data.copy();ws.difference(ob,[cutter],'Full height eaves aperture');changed.append(ob)
        bpy.data.objects.remove(cutter,do_unlink=True)
    for items in (nav['segments'],ns.get('new_segments',[])):
        result=[]
        for s in items:
            if s['name'] in retired:continue
            if s['name'].startswith(('Proposal | Loft west store wall south','Proposal | Loft passage east wall end pier','Proposal | Loft passage east wall cladding end pier')):
                a,c=sorted((s['a'][1],s['b'][1]));x=s['a'][0]
                for i,(lo,hi) in enumerate(((a,min(c,y0)),(max(a,y1),c))):
                    if hi>lo+1e-6:result.append({**s,'name':s['name']+' | door clearance '+str(i),'a':[x,lo],'b':[x,hi]})
            else:result.append(s)
        items[:]=result
    ns.get('new_segments',nav['segments']).extend(replacement_segments)
    # Planning's finish inventory precedes this aperture replacement. Keep it
    # attached to the delivered cheek pieces rather than the retired end piers.
    planning=nav.get('planningApplication')
    if planning:
        names=set(planning['tile_hung_dormer_objects'])-set(retired)
        names.update(o.name for o in b.objects if any(m.name==planning['dormer_material'] for m in o.data.materials))
        planning['tile_hung_dormer_objects']=sorted(names)
    # The archived short leaves have already been replaced by apply_hobby.
    # Record the actual aperture, not the earlier low opening in the loft brief.
    report={'revision':REVISION,'leafHeightMetres':1.981,'apertureY':[y0,y1],
            'apertureHeadZ':head,'swing':'into hobby room','retiredObjects':retired,
            'retainedRoofUnchanged':True}
    for key in ('passage_east_wall','west_store_wall'):
        if key in nav.get('proposalLoft',{}):nav['proposalLoft'][key].update(door_y=[y0,y1],door_height_m=head-5.55)
    nav['hobbyFullHeightDoors']=report;scene['hobby_full_height_doors']=json.dumps(report)
    for side,x,dx in [('west',.10,-1),('east',8.70,1)]:
        ns.get('new_views',nav['rooms']).append({'id':'proposal-hobby-'+side+'-door','label':'Loft · '+side+' eaves door','group':'Proposal · Loft','position':[x,4.50,5.55],'direction':[dx,0,-.40]})
    return changed+b.objects+leaf_builder.objects,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    fit_hobby_door_openings(globals())
