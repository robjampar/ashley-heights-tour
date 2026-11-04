"""Apply the approved SW02 layout to Proposed only; preserve other scenes."""
import json,math

REVISION='SW02-native-2026-10-27'


def apply_sw02(ns):
    import bpy
    from mathutils import Vector,Matrix
    from mathutils.bvhtree import BVHTree
    from mathutils.geometry import barycentric_transform
    from scripts.interiors.interior_furnishing import RoomBuilder
    scene,nav,root=ns['scene'],ns['nav'],ns['ROOT']
    cfg=json.loads((root/'proposal/specs/sw02-native-integration.json').read_text())
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
        me=bpy.data.meshes.new(ob.name+' SW02 coordinated mesh');me.from_pydata(verts,[],faces);me.update()
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
    def final_fits():
        if scene.get('sw02_final_fits'):return []
        changed=[]
        for r in cfg.get('finalMeshCorrections',[]):
            ob=scene.objects[r['name']];ob.data=ob.data.copy();replacement(ob,r);changed.append(ob)
        for ob in scene.objects:
            if ob.name.startswith('Bar detail | console lamp ') and ob.type=='LIGHT':
                ob.location.x=9.35;ob.location.y=-4.45
            if ob.name.startswith('Bar detail | west sconce wall wash') and ob.type=='LIGHT':
                ob.location.x=9.6755;ob.location.y=-14.6092222222
            if ob.name.startswith('Bar detail | west sconce brass backplate') and ob.type=='MESH':
                lo=min((ob.matrix_world@v.co).x for v in ob.data.vertices)
                if lo<9.3:ob.matrix_world=Matrix.Translation(Vector((.3575,-.3892222222,0)))@ob.matrix_world;changed.append(ob)
        scene['sw02_final_fits']=True;return changed
    def furniture_collisions():
        boxes={'Bar detail | west library console':[7.95,-4.63,9.65,-4.275],
               'Garage 01 | complete bench and cupboard':[9.5975,-16.,10.1875,-14.08],
               'Cinema 01 | east lining':[9.295,-15.232,9.33,-12.43933]}
        for values in (nav.get('obstacles',[]),ns.get('new_obstacles',[])):
            for o in values:
                if o.get('name')in boxes:o['box']=boxes[o['name']]
        for room in nav.get('rooms',[]):
            if room.get('id')=='proposal-new-double-garage':room['label']='New garage'
    def bar_inventory(report):
        if not scene.get('accepted_bar_fitout'):return
        accepted=json.loads(scene['accepted_bar_fitout']);retired=set(report['removed'])
        accepted['sourceObjects']=[n for n in accepted['sourceObjects']if n not in retired]
        accepted['sourceObjects']+= [o.name for o in scene.objects if o.name.startswith('SW02 | Bar ') and o.name not in accepted['sourceObjects']]
        accepted['details']['sourceRevision']=REVISION
        scene['accepted_bar_fitout']=json.dumps(accepted)
    if scene.get('sw02_revision')==REVISION:
        report=json.loads(scene['sw02_report']);bar_inventory(report);furniture_collisions();moved=[]
        if scene.get('sw02_console_location')!='north-lounge':
            west=scene.get('sw02_console_location')=='west-lounge'
            origin=(5.39,-6.46)if west else(7.45,-9.6025)
            transform=Matrix.Translation(Vector((8.8,-4.45,0)))@Matrix.Rotation(-math.pi/2 if west else -math.pi,4,'Z')@Matrix.Translation(Vector((-origin[0],-origin[1],0)))
            remaining=Matrix.Translation(Vector((8.8,-4.45,0)))@Matrix.Rotation(-math.pi/2,4,'Z')@Matrix.Translation(Vector((-9.4,13.1,0)))
            for ob in scene.objects:
                if ob.type=='MESH' and ob.name.startswith(('Bar detail | west library','Bar detail | library inset','Bar detail | console ','Bar detail | west artwork')):
                    assert not any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name)
                    ob.matrix_world=transform@ob.matrix_world;moved.append(ob)
                elif ob.type=='MESH'and ob.name.startswith(('Bar detail | library brass pull','Bar detail | library horizontal book','Bar detail | book 0 bound cover','Bar detail | book 1 bound cover','Bar detail | book 2 bound cover','Bar detail | book 3 bound cover')):
                    ob.matrix_world=remaining@ob.matrix_world;moved.append(ob)
                elif ob.type=='LIGHT'and ob.name.startswith('Bar detail | console lamp '):ob.location.x=9.35;ob.location.y=-4.45
            report['consoleLocation']='Against the clear north basement wall east of the media sofa, with books, lamp and artwork; stairs and existing media joinery retained.'
            report['consoleVisualCorrection']={'to':[8.8,-4.45],'reason':'Screenshot review and furniture collision check; clear of both the stair flight and existing west media joinery.'}
            scene['sw02_console_location']='north-lounge';scene['sw02_report']=json.dumps(report);nav['sw02Integration']=report
            bpy.context.view_layer.update()
        moved+=final_fits();return moved,report
    cfg=json.loads((root/'proposal/specs/sw02-native-integration.json').read_text())
    builder=RoomBuilder(ns,'SW02 integration','','P48 SW02 coordinated layout')
    owner={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    retained={c for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name for c in s.collection.children_recursive}
    changed=[];removed=[];clones={};records=[]
    mats={r['materialFrom']:scene.objects[r['materialFrom']].data.materials[0] for r in cfg['boxes']}
    def bounds(ob):
        p=[ob.matrix_world@v.co for v in ob.data.vertices]
        return [[min(v[k]for v in p)for k in range(3)],[max(v[k]for v in p)for k in range(3)]]
    def editable(name):
        if name in clones:return clones[name]
        ob=scene.objects.get(name)
        if ob is None:raise ValueError('SW02 source missing: '+name)
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            clone=ob.copy();clone.data=ob.data.copy();clone.name='SW02 | '+name;clone['source_name']=ob.get('source_name',ob.name)
            for c in tuple(ob.users_collection):
                if c in owner:
                    if c in retained:raise ValueError('Cannot edit shared collection: '+c.name)
                    c.objects.unlink(ob);c.objects.link(clone)
            removed.append(name);ob=clone
        if ob.modifiers:
            bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get();mesh=bpy.data.meshes.new_from_object(ob.evaluated_get(deps),preserve_all_data_layers=True,depsgraph=deps)
        else:mesh=ob.data.copy()
        ob.modifiers.clear();ob.data=mesh;changed.append(ob);clones[name]=ob;return ob
    def mapped(p,operations):
        p=list(p)
        for m in operations:
            if 'translate'in m:p=[p[i]+m['translate'][i] for i in range(3)]
            elif 'rotateZ'in m:
                a=m['rotateZ'];ox,oy=m['origin'];tx,ty=m['destination'];x,y=p[0]-ox,p[1]-oy
                p[0],p[1]=tx+x*math.cos(a)-y*math.sin(a),ty+x*math.sin(a)+y*math.cos(a)
            else:
                k=m['axis'];old,new=m['old'],m['new'];i=next((i for i in range(len(old)-1)if p[k]<=old[i+1]),len(old)-2)
                p[k]=new[i]+(p[k]-old[i])*(new[i+1]-new[i])/(old[i+1]-old[i])
        return p
    for r in cfg['operations']:
        ob=editable(r['name']);before=bounds(ob)
        if max(abs(before[k][i]-r['before'][k][i])for k in range(2)for i in range(3))>.003:raise ValueError('SW02 source bounds changed: '+r['name'])
        inv=ob.matrix_world.inverted()
        for v in ob.data.vertices:v.co=inv@Vector(mapped(ob.matrix_world@v.co,r['maps']))
        ob.data.update();records.append({'name':ob.name,'before':before,'after':bounds(ob)})
    # Nearest coplanar source faces extend the authored UV mapping into small
    # repaired areas. No replacement texture/atlas or material is introduced.
    for r in cfg['replacementMeshes']:
        ob=editable(r['name']);before=bounds(ob);replacement(ob,r);records.append({'name':ob.name,'before':before,'after':bounds(ob),'replaced':True})
    for name in cfg['retire']:
        ob=scene.objects.get(name)
        if ob is None:continue
        for c in tuple(ob.users_collection):
            if c in owner:
                if c in retained:raise ValueError('Cannot retire shared object '+name)
                c.objects.unlink(ob)
        removed.append(name)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    for r in cfg['boxes']:
        lo,hi=r['low'],r['high'];ob=builder.box(r['name'],tuple((lo[k]+hi[k])/2 for k in range(3)),tuple(hi[k]-lo[k]for k in range(3)),mats[r['materialFrom']])
        ob['structural_finish_detail']=r['finish'];changed.append(ob)
    # Update all collision bodies and wall segments against the edited model.
    targets={r['name']:r for r in cfg['operations']};retired=set(removed)
    for key in ('obstacles','segments'):
        groups=[nav.setdefault(key,[])];pending=ns.get('new_'+key)
        if pending is not None and pending is not groups[0]:groups.append(pending)
        for values in groups:
            values[:]=[v for v in values if v.get('name')not in retired and not v.get('name','').startswith('Structure fit | stair-side column')]
            for v in values:
                name=v.get('name');ob=clones.get(name)
                if ob is not None and 'box'in v:
                    lo,hi=bounds(ob);v.update(box=[lo[0],lo[1],hi[0],hi[1]],bottom=lo[2],top=hi[2])
                if name in targets and key=='segments':
                    for end in ('a','b'):v[end]=mapped([*v[end][:2],v.get('bottom',0)],targets[name]['maps'])[:2]
                    if 'Garage east separation'in name:v.update(thickness=.245,top=2.756)
            if key=='obstacles':
                values.extend([{'name':'SW02 | Suite support enclosure','box':[9.335,-11.13,9.96,-10.89],'bottom':2.8,'top':5.1956},
                               {'name':'SW02 | Cinema east north pier','box':[9.3325,-11.45,9.5775,-9.905],'bottom':-2.8,'top':-.325}])
    nav['segments'].append({'name':'SW02 | Cinema east north pier','a':[9.455,-11.45],'b':[9.455,-9.905],'thickness':.245,'bottom':-2.8,'top':-.325})
    for r in cfg['doors']:
        door=next(d for d in nav['interactiveDoors']if d['id']==r['id']);door.update(r)
    # Correct the service/cinema polygons, while preserving every suite polygon.
    for room in nav.get('planRooms',[]):
        name=room.get('name','');poly=room.get('polygon_m',[])
        if name=='New double garage':
            room['name']='New garage';room['polygon_m']=[[min(x,9.3325),y]for x,y in poly]
        elif name=='Utility':room['polygon_m']=[[9.5775 if abs(x-11.43)<.01 else x,y]for x,y in poly]
        elif name=='Gym':room['polygon_m']=[[9.5775 if abs(x-11.43)<.01 else x,y]for x,y in poly]
        elif name=='Basement cinema':room['polygon_m']=[[9.3325 if abs(x-8.975)<.01 else x,y]for x,y in poly]
    for car in nav.get('proposalSite',{}).get('cars',[]):
        if car['bay']=='G1':
            car['centre_m']=[6.4725,-14.33]
            if 'actual_mesh_bounds_m'in car:
                for i in (0,3):car['actual_mesh_bounds_m'][i]-=.4275
    # Retain light data in step with any moved decorative lamp assembly.
    for light in nav.get('proposalLights',[]):
        p=light.get('position',[])
        if len(p)>2 and p[2]<0 and 9.15<p[0]<9.7 and -13.95<p[1]<-12.2:
            light['position']=mapped(p,[cfg['consoleTransform']])
    report={'revision':REVISION,'changed':[o.name for o in changed],'removed':removed,'operations':records,'suiteLayoutPreserved':True,
            'consoleLocation':'Against the clear north basement wall east of the media sofa; stairs and existing media joinery retained.',
            'garageBenchLocation':'Relocated to the enlarged utility west wall, keeping the parked van clear.',
            'published':False,'approvedForConstruction':False,'limits':'Geometry integration only; structural capacity, connections, fire and foundation design remain unverified.'}
    nav['sw02Integration']=report;scene['sw02_revision']=REVISION;scene['sw02_report']=json.dumps(report)
    bar_inventory(report)
    furniture_collisions()
    scene['sw02_console_location']='north-lounge'
    changed+=final_fits()
    bpy.context.view_layer.update();return changed,report


if 'scene'in globals() and 'nav'in globals() and globals().get('VARIANT')=='compact':apply_sw02(globals())
