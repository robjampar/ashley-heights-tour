"""Read-only Cycles photography of the reviewed model; never save the source file.

Blender --background --python-exit-code 1 --python scripts/render_house_brochure.py -- --views bath --source suite --draft
"""
import argparse,bpy,json,math,sys,hashlib,time
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from build_support import native_name
p=argparse.ArgumentParser();p.add_argument('--variant',default='compact',choices=('compact','planning'));p.add_argument('--source',default='full',choices=('full','suite'));p.add_argument('--views',default='front,kitchen,bedroom,bath,pool');p.add_argument('--draft',action='store_true');p.add_argument('--width',type=int);p.add_argument('--samples',type=int);p.add_argument('--finish',choices=('render','brick'),default='render');p.add_argument('--output-dir',type=Path);args=p.parse_args(sys.argv[sys.argv.index('--')+1:])
folder=ROOT/'revisions/interiors-overnight-2026-09-27/review-round-2/brochure';out=args.output_dir.resolve()if args.output_dir else folder/('drafts'if args.draft else'renders')/args.variant;out.mkdir(parents=True,exist_ok=True)
source=ROOT/f'output-proposed-{args.variant}'/(native_name(args.variant)+'.blend')if args.source=='full'else ROOT/f'proposal/interiors/principal/accepted/{args.variant}/suite.blend'
digest=hashlib.sha256(source.read_bytes()).hexdigest();bpy.ops.wm.open_mainfile(filepath=str(source))
scene=bpy.data.scenes['08 Proposed extensions'if args.source=='full'else'Principal suite — bathroom and wardrobe'];bpy.context.window.scene=scene
scene.render.engine='CYCLES';scene.cycles.samples=args.samples or(40 if args.draft else 512);scene.cycles.use_denoising=True;scene.cycles.adaptive_threshold=.025 if args.draft else .006;scene.cycles.max_bounces=12;scene.cycles.diffuse_bounces=6;scene.cycles.glossy_bounces=8;scene.cycles.transmission_bounces=12;scene.cycles.transparent_max_bounces=16;scene.cycles.sample_clamp_indirect=8;scene.render.use_persistent_data=True
scene.cycles.use_adaptive_sampling=True
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
 for d in prefs.devices:d.use=d.type=='METAL'
 if any(d.use for d in prefs.devices):scene.cycles.device='GPU'
except Exception as e:print('CPU_RENDER',e)
scene.render.resolution_x=args.width or(1500 if args.draft else 4200);scene.render.resolution_y=round(scene.render.resolution_x*2/3);scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGB';scene.render.image_settings.color_depth='16';scene.render.film_transparent=False
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=.65
# Consistent pale render / oak / dark-tile exterior, using appearance-tagged faces.
# Reassigning these render-only material slots never touches inside wall faces.
render_mat=bpy.data.materials.new('Brochure | mineral ivory render');render_mat.use_nodes=True
bs=render_mat.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(.80,.785,.735,1);bs.inputs['Roughness'].default_value=.82
nodes=render_mat.node_tree.nodes;links=render_mat.node_tree.links;tex=nodes.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=190;tex.inputs['Detail'].default_value=2;bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.13;bump.inputs['Distance'].default_value=.0015;links.new(tex.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs['Normal'],bs.inputs['Normal'])
brick_mat=bpy.data.materials.new('Brochure | red brown brick');brick_mat.use_nodes=True
nodes=brick_mat.node_tree.nodes;links=brick_mat.node_tree.links;bs=nodes.get('Principled BSDF');bs.inputs['Roughness'].default_value=.83
geo=nodes.new('ShaderNodeNewGeometry');tangent=nodes.new('ShaderNodeVectorMath');tangent.operation='CROSS_PRODUCT';links.new(geo.outputs['Normal'],tangent.inputs[0]);tangent.inputs[1].default_value=(0,0,1)
dot=nodes.new('ShaderNodeVectorMath');dot.operation='DOT_PRODUCT';links.new(geo.outputs['Position'],dot.inputs[0]);links.new(tangent.outputs[0],dot.inputs[1])
sep=nodes.new('ShaderNodeSeparateXYZ');links.new(geo.outputs['Position'],sep.inputs[0]);co=nodes.new('ShaderNodeCombineXYZ');links.new(dot.outputs['Value'],co.inputs['X']);links.new(sep.outputs['Z'],co.inputs['Y'])
brick=nodes.new('ShaderNodeTexBrick');brick.inputs['Scale'].default_value=1;brick.inputs['Brick Width'].default_value=.225;brick.inputs['Row Height'].default_value=.075;brick.inputs['Mortar Size'].default_value=.004
brick.inputs['Color1'].default_value=(.34,.12,.055,1);brick.inputs['Color2'].default_value=(.50,.24,.12,1);brick.inputs['Mortar'].default_value=(.58,.52,.43,1);links.new(co.outputs[0],brick.inputs['Vector']);links.new(brick.outputs['Color'],bs.inputs['Base Color'])
bump=nodes.new('ShaderNodeBump');bump.inputs['Distance'].default_value=.003;bump.inputs['Strength'].default_value=.45;bump.invert=True;links.new(brick.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs['Normal'],bs.inputs['Normal'])
# The browser uses world-space tile courses on vertical dormer faces. Match
# that projection in Cycles, where the inherited roof UVs otherwise stretch.
dormer_mat=bpy.data.materials.new('Brochure | grey tile hanging');dormer_mat.use_nodes=True
nodes=dormer_mat.node_tree.nodes;links=dormer_mat.node_tree.links;bs=nodes.get('Principled BSDF');bs.inputs['Roughness'].default_value=.74
geo=nodes.new('ShaderNodeNewGeometry');sep=nodes.new('ShaderNodeSeparateXYZ');links.new(geo.outputs['Position'],sep.inputs[0])
add=nodes.new('ShaderNodeMath');add.operation='ADD';links.new(sep.outputs['X'],add.inputs[0]);links.new(sep.outputs['Y'],add.inputs[1])
co=nodes.new('ShaderNodeCombineXYZ');links.new(add.outputs[0],co.inputs['X']);links.new(sep.outputs['Z'],co.inputs['Y'])
tiles=nodes.new('ShaderNodeTexBrick');tiles.inputs['Scale'].default_value=1;tiles.inputs['Brick Width'].default_value=.32;tiles.inputs['Row Height'].default_value=.16;tiles.inputs['Mortar Size'].default_value=.003
tiles.inputs['Color1'].default_value=(.075,.085,.095,1);tiles.inputs['Color2'].default_value=(.12,.13,.14,1);tiles.inputs['Mortar'].default_value=(.035,.04,.045,1)
links.new(co.outputs[0],tiles.inputs['Vector']);links.new(tiles.outputs['Color'],bs.inputs['Base Color'])
bump=nodes.new('ShaderNodeBump');bump.inputs['Distance'].default_value=.006;bump.inputs['Strength'].default_value=.35;bump.invert=True;links.new(tiles.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs['Normal'],bs.inputs['Normal'])
for ob in scene.objects:
 if ob.type=='MESH':
  for i,mat in enumerate(ob.data.materials):
   if mat and mat.get('appearance_role')=='wall':ob.data.materials[i]=brick_mat if args.finish=='brick'else render_mat
   elif mat and mat.get('appearance_role')=='dormer':ob.data.materials[i]=dormer_mat
# Physically transmitting glazing for the path tracer, instead of viewer alpha.
for mat in bpy.data.materials:
 n=mat.name.lower()
 if not mat.use_nodes or not any(s in n for s in('glass','glazing','obscure privacy pane'))or any(s in n for s in('screen','tv ','display','mirror')):continue
 bs=mat.node_tree.nodes.get('Principled BSDF')
 if bs:
  bs.inputs['Alpha'].default_value=1;bs.inputs['Transmission Weight'].default_value=.97;bs.inputs['IOR'].default_value=1.46
  bs.inputs['Roughness'].default_value=.52 if 'privacy'in n or'obscure'in n else.07
  bs.inputs['Base Color'].default_value=(.91,.95,.93,1)
world=bpy.data.worlds.new('Brochure | daylight');world.use_nodes=True;scene.world=world
nodes=world.node_tree.nodes;links=world.node_tree.links;nodes.clear();sky=nodes.new('ShaderNodeTexSky');sky.sky_type='NISHITA';sky.sun_elevation=math.radians(32);sky.sun_rotation=math.radians(235);sky.sun_intensity=.85;sky.air_density=1;sky.dust_density=.8;sky.ozone_density=1
background=nodes.new('ShaderNodeBackground');background.inputs['Strength'].default_value=.32;output=nodes.new('ShaderNodeOutputWorld');links.new(sky.outputs['Color'],background.inputs['Color']);links.new(background.outputs[0],output.inputs['Surface'])
for ob in scene.objects:
 if ob.type=='LIGHT'and(ob.data.type=='SUN'or ob.name=='Soft fill'):ob.data.energy=0
photo_lights=[]
def area(label,pos,target,power,size,color):
 data=bpy.data.lights.new('Brochure | '+label,'AREA');data.energy=power;data.shape='DISK';data.size=size;data.color=color
 ob=bpy.data.objects.new(data.name,data);scene.collection.objects.link(ob);ob.location=pos;ob.rotation_euler=(Vector(target)-ob.location).to_track_quat('-Z','Y').to_euler();ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;photo_lights.append(ob);return ob
# Broad daylight return and warm ceiling bounce supplement the actual fittings.
# These are photographic lighting rigs, not added architectural fixtures.
views={
 'front':{'pos':[-8,-21,2.8],'target':[6.0,-7.0,2.8],'fov':59,'shift':.12,'outside':True},
 'garden':{'pos':[-6,23,2.25],'target':[5.0,7.8,2.25],'fov':65,'shift':.12,'outside':True},
 'pool':{'pos':[6.0,23.1,1.72],'target':[12.7,14.1,1.72],'fov':65,'outside':True},
 'aerial':{'pos':[-25,-33,29],'target':[4,-1,1.5],'fov':51,'outside':True},
 'kitchen':{'pos':[3.8,5.25,1.62],'target':[1.3,9.05,1.40],'fov':78,'lights':[("kitchen daylight return",[3.0,10.5,2.45],[1.6,6.5,1.0],120,2.0,(1,.94,.83))]},
 'lounge':{'pos':[-.62,4.52,1.57],'target':[-4.08,7.0,1.20],'fov':75,'lights':[("lounge soft daylight",[-4.6,7.8,2.35],[-2.2,5.7,1],90,1.5,(1,.95,.87))]},
 'bedroom':{'pos':[9.55,-12.15,4.24],'target':[11.15,-15.12,3.91],'fov':73,'lights':[("suite daylight return",[13.45,-13.8,4.8],[10,-13.8,3.8],155,2.0,(1,.96,.90)),("suite warm ceiling bounce",[9.4,-12.5,5.16],[9.4,-12.5,3.3],45,2,(1,.86,.67))]},
 'bath':{'pos':[11.75,-6.79,4.19],'target':[12.82,-4.23,3.49],'fov':65,'lights':[("bath window daylight",[13.66,-4.30,4.4],[11.7,-4.3,3.7],140,1.5,(1,.96,.88)),("bath ceiling bounce",[11.65,-5.7,5.12],[11.65,-5.7,3.8],40,1.4,(1,.88,.73))]},
 'formal':{'pos':[6.13,5.70,1.58],'target':[8.42,7.77,1.22],'fov':72,'lights':[("dining daylight return",[7.0,9.30,2.30],[7,7.0,1],100,1.5,(1,.95,.86))]},
 'drinks':{'pos':[7.25,8.92,1.58],'target':[5.28,8.56,1.12],'fov':57,'lights':[("drinks soft daylight",[6.7,8.75,2.35],[5.25,8.50,1.2],45,1.2,(1,.95,.88))]},
}
for key in args.views.split(','):
 v=views[key]
 for ob in photo_lights:bpy.data.objects.remove(ob,do_unlink=True)
 photo_lights=[]
 for params in v.get('lights',[]):area(*params)
 scene.view_settings.exposure=-.6 if v.get('outside')else.8
 camera=bpy.data.objects.new('Brochure camera '+key,bpy.data.cameras.new('Brochure camera '+key));scene.collection.objects.link(camera);scene.camera=camera;camera.location=v['pos'];camera.rotation_euler=(Vector(v['target'])-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['fov']);camera.data.shift_y=v.get('shift',0);camera.data.clip_start=.035;camera.data.clip_end=500;camera.data.dof.use_dof=False
 scene.render.filepath=str(out/(key+'.png'));started=time.time();result=bpy.ops.render.render(write_still=True)
 assert 'FINISHED'in result and Path(scene.render.filepath).is_file()and Path(scene.render.filepath).stat().st_mtime>=started,'Render cancelled or image missing'
 meta={'source':str(source.relative_to(ROOT)),'sourceSha256':digest,'sourceSaved':False,'geometryChanged':False,'camera':v,'samples':scene.cycles.samples,'resolution':[scene.render.resolution_x,scene.render.resolution_y],'renderEngine':'Cycles Metal'if scene.cycles.device=='GPU'else'Cycles CPU','finish':('red brown brick'if args.finish=='brick'else'ivory render')+', oak doors, source tiled roof; dormer tile hanging','lighting':'Nishita daylight and photographic bounce; source fittings retained'}
 (out/(key+'.json')).write_text(json.dumps(meta,indent=2)+'\n');print('BROCHURE_RENDER',key,scene.render.filepath,flush=True)
 bpy.data.objects.remove(camera,do_unlink=True)
assert hashlib.sha256(source.read_bytes()).hexdigest()==digest,'Source model modified during rendering'
