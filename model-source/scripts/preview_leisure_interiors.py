"""Fast, read-only house load followed by a cropped editable leisure-room study."""
import argparse,bpy,bmesh,hashlib,json,math,sys
from pathlib import Path
from mathutils import Vector,Matrix
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from build_support import native_name
from proposal_leisure_interiors import apply_leisure
from proposal_kitchen_interiors import export_quiet_oak_gltf
parser=argparse.ArgumentParser();parser.add_argument('variant',choices=('compact','planning'));parser.add_argument('--area',choices=('cinema','bar','gym','utility','guest','guestbath','family','cloakroom','bedroom2','bedroom3','familybath','bedroom4'),default='cinema');parser.add_argument('--render',action='store_true');parser.add_argument('--view',default='entrance');parser.add_argument('--samples',type=int,default=32);parser.add_argument('--render-only',action='store_true');parser.add_argument('--working',action='store_true');parser.add_argument('--baseline',type=Path,help='Optional immutable native/geometry/navigation snapshot directory')
args=parser.parse_args(sys.argv[sys.argv.index('--')+1:]);VARIANT=args.variant;area=args.area
OUT=ROOT/'revisions/interiors-overnight-2026-09-27'/area/VARIANT;OUT.mkdir(parents=True,exist_ok=True)
PUBLIC=ROOT/'walkthrough/public/interiors/leisure/models';PUBLIC.mkdir(parents=True,exist_ok=True)
BASE=args.baseline.resolve()if args.baseline else ROOT/f'output-proposed-{VARIANT}';native=BASE/(native_name(VARIANT)+'.blend');source_hash=hashlib.sha256(native.read_bytes()).hexdigest()
nav=json.loads((BASE/'navigation.json').read_text());g=json.loads((BASE/'geometry.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
materials={m.name:m for m in bpy.data.materials};PALETTE=dict(g['materials']);new_obstacles=[];new_surfaces=[];new_segments=[];new_views=[]
if area=='bedroom4':
    from proposal_bedroom4_interiors import apply_bedroom4
    report=apply_bedroom4(globals())
elif area=='familybath':
    from proposal_familybath_interiors import apply_familybath
    report=apply_familybath(globals())
elif area=='bedroom3':
    from proposal_bedroom3_interiors import apply_bedroom3
    report=apply_bedroom3(globals())
elif area=='bedroom2':
    from proposal_bedroom2_interiors import apply_bedroom2
    report=apply_bedroom2(globals())
elif area=='cloakroom':
    from proposal_cloakroom_interiors import apply_cloakroom
    report=apply_cloakroom(globals())
elif area=='family':
    from proposal_family_interiors import apply_family
    report=apply_family(globals())
elif area in('guest','guestbath'):
    from proposal_guest_interiors import apply_guest
    report=apply_guest(globals())
    if area=='guestbath':
        from proposal_guestbath_interiors import apply_guestbath
        report=apply_guestbath(globals())
else:report=apply_leisure(globals(),(area,))[area]
cfg=report['configuration']
for key,pending in (('obstacles',new_obstacles),('surfaces',new_surfaces),('segments',new_segments)):nav[key].extend(pending)
nav['rooms'].extend(new_views);(OUT/'preview-navigation.json').write_text(json.dumps(nav,separators=(',',':')))
scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();rays=[]
if area=='cinema':
    sx,sy,sz=cfg['screen']['center'];sw,sh=cfg['screen']['size']
    for seat,eye in enumerate(cfg['eyes']):
        for u,v in((0,0),(-.46,-.46),(-.46,.46),(.46,-.46),(.46,.46)):
            target=Vector((sx+u*sw,sy+.009,sz+v*sh));delta=target-Vector(eye)
            hit,loc,n,f,ob,m=scene.ray_cast(deps,Vector(eye),delta.normalized(),distance=delta.length+.03)
            name=ob.get('source_name',ob.name)if hit else None
            assert hit and name.startswith('Cinema 01 | fixed projection screen'),(seat,list(target),name)
            rays.append({'seat':seat+1,'target':list(target),'hit':name})
elif area=='bar':
    for seat,yy in enumerate((-7.26,-6.50,-5.74)):
        eye=Vector((7.52,yy,-1.67))
        for u,v in((0,0),(-.46,-.46),(-.46,.46),(.46,-.46),(.46,.46)):
            target=Vector((5.255,-6.50+u*1.44,-1.42+v*.81));delta=target-eye
            hit,loc,n,f,ob,m=scene.ray_cast(deps,eye,delta.normalized(),distance=delta.length+.03)
            name=ob.get('source_name',ob.name)if hit else None
            assert hit and name.startswith('Bar 01 | fixed media TV screen'),(seat,list(target),name)
            rays.append({'seat':seat+1,'target':list(target),'hit':name})

elif area=='guest':
    sx,sy,sz=cfg['screen']['center'];sw,sh=cfg['screen']['size']
    for seat,eye in enumerate(cfg['eyes']):
        for u,v in((0,0),(-.46,-.46),(-.46,.46),(.46,-.46),(.46,.46)):
            target=Vector((sx+.0135,sy+u*sw,sz+v*sh));delta=target-Vector(eye)
            hit,loc,n,f,ob,m=scene.ray_cast(deps,Vector(eye),delta.normalized(),distance=delta.length+.03)
            name=ob.get('source_name',ob.name)if hit else None
            assert hit and name=='Guest 01 | fixed TV screen',(seat,list(target),name)
            rays.append({'seat':seat+1,'target':list(target),'hit':name})

def bounds(ob):
    p=[ob.matrix_world@Vector(v)for v in ob.bound_box]
    return [min(v[i]for v in p)for i in range(3)]+[max(v[i]for v in p)for i in range(3)]

x0,y0,x1,y1=cfg['bounds'];z=cfg['floorZ'];ceiling=cfg['ceilingZ']
crop=[x0-(.24 if area=='utility'else .17 if area=='guest'else .13),y0-.13,z-.04,x1+.15,y1+(.25 if area in('family','bedroom4')else .23 if area=='cloakroom'else .10),ceiling+.08]
study=bpy.data.scenes.new(area.title()+' — interior study');coll=bpy.data.collections.new(area.title()+' study geometry');study.collection.children.link(coll)
hidden=set(nav.get('hiddenObjects',[]));cutaway=[];copied=[]
for ob in list(scene.objects):
    name=ob.get('source_name',ob.name)
    if ob.type=='LIGHT':
        if ob.get('interior_room')==area:coll.objects.link(ob);copied.append(ob)
        continue
    if ob.type not in ('MESH','CURVE') or ob.name in hidden or name in hidden:continue
    if name in('Proposal | Entertainment basement floor','Proposal | Entertainment basement ceiling'):continue
    if area=='family' and name in('Proposal | Side wing first floor','Proposal | Side wing first ceiling'):continue
    if area in('gym','utility') and name.startswith(('Proposal | New wing ground floor','Proposal | Wing Ground ceiling','Proposal | Wing first floor')):continue
    bb=bounds(ob)
    if any(bb[i+3]<=crop[i] or bb[i]>=crop[i+3] for i in range(3)):continue
    if area=='bar' and bb[3]<9.12 and bb[4]<-9.85:continue
    if area=='gym' and bb[3]<11.43 and bb[4]<-9.85:continue
    # Keep walls that meet the L-shaped boundary; float rounding must not
    # remove the shared south wall or its return from the isolated study.
    if area=='familybath' and bb[0]>7.185 and bb[1]>6.165:continue
    if area=='bedroom3' and bb[3]<3.715 and bb[4]<5.615:continue
    if area=='family' and bb[3]<-2.48 and bb[4]<5.15:continue
    copy=ob.copy();copy.data=ob.data.copy();coll.objects.link(copy);copy.name=name;copy['source_name']=name;copy['model_object_name']=ob.name
    copy.parent=None;copy.matrix_world=ob.matrix_world.copy()
    # Long shared retaining walls are cut only in this isolated study, never in the source house.
    if any(bb[i]<crop[i]-.001 or bb[i+3]>crop[i+3]+.001 for i in range(3)):
        evaluated=ob.evaluated_get(deps);mesh=bpy.data.meshes.new_from_object(evaluated);mesh.transform(ob.matrix_world)
        bm=bmesh.new();bm.from_mesh(mesh)
        for axis in range(3):
            for upper in (False,True):
                point=[0,0,0];point[axis]=crop[axis+3]if upper else crop[axis]
                normal=[0,0,0];normal[axis]=1 if upper else -1
                result=bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.00001,plane_co=point,plane_no=normal,clear_outer=True)
                edges=[e for e in result['geom_cut']if isinstance(e,bmesh.types.BMEdge)and e.is_boundary]
                if edges:bmesh.ops.holes_fill(bm,edges=edges,sides=0)
        if not bm.faces:
            bm.free();bpy.data.objects.remove(copy,do_unlink=True);continue
        bm.to_mesh(mesh);bm.free();copy.modifiers.clear();copy.data=mesh;copy.matrix_world=Matrix.Identity(4)
    copied.append(copy)
    if bb[2]>ceiling-.05 or any(t in name for t in('acoustic ceiling','ceiling speaker','projector','ceiling concealed','ivory ceiling','pendant cable','pendant shade','pendant diffuser','pool overhead','pool light suspension','linear ceiling','strength ceiling','ceiling light')):cutaway.append(name)
bpy.context.window.scene=study;study.view_layers[0].update()
views=cfg.get('views')or{
    'entrance':{'position':[8.62,-10.50,z+1.60],'target':[6.76,-14.15,z+1.20],'fov':65},
    'seated':{'position':[6.68,-11.94,z+1.10],'target':cfg['screen']['center'],'fov':62},
    'left-seat':{'position':cfg['eyes'][0],'target':cfg['screen']['center'],'fov':62},
    'right-seat':{'position':cfg['eyes'][-1],'target':cfg['screen']['center'],'fov':62},
    'reverse':{'position':[6.78,-14.65,z+1.65],'target':[6.68,-11.6,z+.78],'fov':64},
    'details':{'position':[8.48,-13.37,z+1.45],'target':[6.68,-12.05,z+.58],'fov':56},
    'overview':{'position':[12.5,-17.5,5.6],'target':[7.1,-12.6,z+1.3],'fov':50,'cutaway':True},
}
meta={'variant':VARIANT,'room':cfg['room'],'layoutRevision':cfg['revision'],'configuration':cfg,'materials':PALETTE,'planRooms':[r for r in nav['planRooms']if r['name']==cfg['room']or(area=='bedroom4'and r['name']in('Bedroom 4','Bedroom 4 en suite'))],'proposalLights':[l for l in nav['proposalLights']if l['name'].startswith(area.title()+' 01 | ')],'cutawayObjects':cutaway,'mirrors':[m for m in nav.get('mirrors',[])if m['name'].startswith(area.title()+' 01 | ')],'objects':len(copied),'views':views,'sourceModelUpdatedAt':nav['modelUpdatedAt']}
if not args.render_only:
    export_quiet_oak_gltf(filepath=str(PUBLIC/(VARIANT+'-'+area+'.glb')),export_format='GLB',use_active_scene=True,export_apply=True,export_cameras=False,export_lights=False,export_extras=True)
    (PUBLIC/(VARIANT+'-'+area+'.json')).write_text(json.dumps(meta,indent=2)+'\n')
    bpy.data.libraries.write(str(OUT/(area.title()+' — interior study.blend')),{study},fake_user=True)
report.update({'native_screen_rays':rays,'source_house_sha256':source_hash,'source_house_unchanged':hashlib.sha256(native.read_bytes()).hexdigest()==source_hash,'isolated_objects':len(copied),'views':views})
assert report['source_house_unchanged'];(OUT/'preview-report.json').write_text(json.dumps(report,indent=2)+'\n')
if args.render:
    if args.working and area=='familybath':
        for ob in study.objects:
            if ob.get('familybath_pullout')=='upper drawer':ob.matrix_world=Matrix.Translation(Vector((.30,0,0)))@ob.matrix_world
    elif args.working and area=='cloakroom':
        for ob in study.objects:
            if ob.get('cloakroom_pullout')=='upper drawer':ob.matrix_world=Matrix.Translation(Vector((.30,0,0)))@ob.matrix_world
    elif args.working and area=='guestbath':
        for spec in nav['interactiveDoors']:
            if spec['id']!='Guestbath 01 | shower door':continue
            hinge=Vector(spec['hinge']);transform=Matrix.Translation(hinge)@Matrix.Rotation(spec['openDelta'],4,'Z')@Matrix.Translation(-hinge)
            for ob in study.objects:
                if ob.get('source_name',ob.name)in spec['members']:ob.matrix_world=transform@ob.matrix_world
    elif args.working:
        assert area=='utility','Working illustration is defined only for the utility'
        for ob in study.objects:
            if ob.get('appliance_door'):
                hinge=Vector(ob['appliance_hinge']);ob.matrix_world=Matrix.Translation(hinge)@Matrix.Rotation(ob['appliance_open_angle'],4,'Z')@Matrix.Translation(-hinge)@ob.matrix_world
            if ob.get('utility_pullout')=='hamper':ob.matrix_world=Matrix.Translation(Vector((-.52,0,0)))@ob.matrix_world
        for spec in nav['interactiveDoors']:
            if spec['id'] not in ('Proposal | Garage east separation door 0','Proposal | Boot utility inward door'):continue
            hinge=Vector(spec['hinge']);transform=Matrix.Translation(hinge)@Matrix.Rotation(spec['openDelta'],4,'Z')@Matrix.Translation(-hinge)
            for ob in study.objects:
                if ob.get('source_name',ob.name).startswith(spec['id']):ob.matrix_world=transform@ob.matrix_world
    study.render.engine='CYCLES';study.cycles.samples=args.samples;study.cycles.use_denoising=True;study.cycles.max_bounces=8
    try:
        prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
        for device in prefs.devices:device.use=device.type=='METAL'
        study.cycles.device='GPU'
    except Exception as error:print('CPU_RENDER',error,flush=True)
    world=bpy.data.worlds.new('Room studio ambient');world.use_nodes=True;world.node_tree.nodes['Background'].inputs['Color'].default_value=(.12,.12,.12,1);world.node_tree.nodes['Background'].inputs['Strength'].default_value=.15;study.world=world
    camera=bpy.data.objects.new('Room review camera',bpy.data.cameras.new('Room review camera'));study.collection.objects.link(camera);study.camera=camera
    view=views[args.view];camera.location=view['position'];camera.rotation_euler=(Vector(view['target'])-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.type='PERSP';camera.data.sensor_fit='VERTICAL';camera.data.angle_y=math.radians(view['fov']);camera.data.clip_start=.025
    if view.get('cutaway'):
        for ob in study.objects:
            if ob.get('source_name',ob.name)in cutaway:ob.hide_render=True
    study.render.resolution_x=1440;study.render.resolution_y=1000;study.render.resolution_percentage=100
    study.view_settings.view_transform='AgX';study.view_settings.look='AgX - Medium High Contrast';study.view_settings.exposure=.3
    study.render.filepath=str(OUT/(args.view+('-working'if args.working else'')+'-native.png'));bpy.ops.render.render(write_still=True)
print('ROOM_PREVIEW_COMPLETE',VARIANT,area,len(copied),'objects',len(rays),'screen rays',flush=True)
