"""Render editable proposal geometry for architectural review; no synthetic image edits."""
import bpy,math,json,os,hashlib
from datetime import datetime,timezone
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
variant=os.environ.get('PROPOSAL_VARIANT','compact')
assert variant in ('compact','planning'),variant
compare_original=os.environ.get('PROPOSAL_COMPARE_ORIGINAL')=='1'
OUT=ROOT/('output-walkthrough' if compare_original else 'output-proposed-'+variant)
rev=os.environ.get('PROPOSAL_RENDER_REV','current');renders=OUT/'renders'/rev;renders.mkdir(parents=True,exist_ok=True)
source_file=OUT/('Ashley Heights.blend' if compare_original else 'Ashley Heights — Proposed (planning application).blend' if variant=='planning' else 'Ashley Heights — Proposed (compact).blend')
bpy.ops.wm.open_mainfile(filepath=str(source_file))
scene=bpy.data.scenes['01 Exterior' if compare_original else '08 Proposed extensions'];bpy.context.window.scene=scene
scene.render.engine='CYCLES';scene.cycles.samples=int(os.environ.get('PROPOSAL_SAMPLES','24'));scene.cycles.use_denoising=True;scene.render.use_persistent_data=True
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
 for d in prefs.devices:d.use=d.type=='METAL'
 scene.cycles.device='GPU'
except Exception as e:print('RENDER_CPU',e)
scene.cycles.max_bounces=8;scene.cycles.transparent_max_bounces=12
scene.render.image_settings.file_format='PNG';scene.render.resolution_percentage=100;scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.55
lighting=os.environ.get('PROPOSAL_LIGHTING','daylight')
if lighting=='twilight':
 # Render-only changes. Source .blend files are opened read-only and never saved.
 # Keep every building, luminaire and camera in its existing position.
 scene.world=scene.world.copy();scene.world.use_nodes=True
 nodes=scene.world.node_tree.nodes;links=scene.world.node_tree.links;nodes.clear()
 sky=nodes.new('ShaderNodeTexSky');sky.sky_type='NISHITA';sky.sun_disc=False
 sky.sun_elevation=math.radians(.2);sky.sun_rotation=math.radians(235)
 sky.altitude=0;sky.air_density=1;sky.dust_density=2;sky.ozone_density=1
 background=nodes.new('ShaderNodeBackground');background.inputs['Strength'].default_value=.22
 output=nodes.new('ShaderNodeOutputWorld');links.new(sky.outputs['Color'],background.inputs['Color']);links.new(background.outputs[0],output.inputs['Surface'])
 for light in [o for o in scene.objects if o.type=='LIGHT']:
  light.data=light.data.copy()
  if light.data.type=='SUN':light.data.energy=0
  elif light.name=='Soft fill':light.data.energy=0
 scene.view_settings.exposure=1.0
elif lighting!='daylight':
 raise ValueError('Unknown PROPOSAL_LIGHTING: '+lighting)
camera=scene.camera;camera.data.clip_start=.03;camera.data.clip_end=500;camera.data.sensor_fit='HORIZONTAL'
views=[
 {'id':'side-wing-setback','position':[-10,-8,6.4],'target':[-1.8,1.2,3.4],'fov':60,'hide_landscape':True},
 {'id':'entrance-gable','position':[-3,-7.2,5.8],'target':[3.26,-7.2,5.35],'fov':48,'hide_landscape':True},
 {'id':'front-gates','position':[-3.0,-16.0,1.75],'target':[7.9,-8.8,3.0],'fov':78},
 {'id':'front-court','position':[-1.0,-10.0,1.7],'target':[6.8,-9.0,3.1],'fov':78},
 {'id':'aerial-southwest','position':[-24,-39,27],'target':[3.7,-1.7,1.5],'fov':58},
 {'id':'aerial-northeast','position':[32,35,28],'target':[3.0,2.0,1.5],'fov':64},
 {'id':'front-context','position':[-13,-26,8.0],'target':[5.0,-4.6,3.0],'fov':72},
 {'id':'rear-pool','position':[8.0,25.5,1.7],'target':[6.5,9.0,3.5],'fov':78},
 {'id':'rear-house','position':[-5.1,22.4,2.0],'target':[5.9,9.0,3.8],'fov':80},
 {'id':'pavilion-pool','position':[5.05,19.30,1.75],'target':[13.45,21.60,1.20],'fov':76},
 {'id':'courtyard','position':[0,-1.30,1.65],'target':[5.65,-2.25,2.0],'fov':82},
 {'id':'entrance-gallery','position':[6.0,-8.9,1.65],'target':[11.9,-8.8,2.0],'fov':83},
 {'id':'new-stair-first','position':[8.35,-10.9,4.45],'target':[10.3,-8.5,5.5],'fov':85},
 {'id':'new-loft-landing','position':[8.25,-9.0,7.15],'target':[8.8,-3.8,7.0],'fov':75},
 {'id':'original-loft-stair','position':[8.36,4.02,4.4],'target':[8.36,1.2,5.4],'fov':75},
 {'id':'original-dormer','position':[8.7,4.7,7.15],'target':[5.8,7.5,6.9],'fov':83},
 {'id':'rear-living','position':[3.7,12.5,1.65],'target':[-2.6,11.1,1.2],'fov':85},
 {'id':'principal-suite','position':[6.0,-17.2,4.45],'target':[7.55,-12.9,3.55],'fov':83},
 {'id':'principal-bathroom','position':[12.6,-15.95,4.45],'target':[12.0,-18.8,3.7],'fov':86},
 {'id':'new-loft-studio','position':[10.5,-12.3,7.15],'target':[9.0,-15.5,6.4],'fov':83},
 {'id':'library-landing','position':[10.8,-5.7,4.45],'target':[6.1,-5.5,3.6],'fov':80},
 {'id':'new-study','position':[8.65,-6.0,1.65],'target':[6.3,-4.9,.9],'fov':80},
 {'id':'garage-workshop','position':[10.5,-18.7,1.65],'target':[7.0,-19.4,.9],'fov':83},
 {'id':'outside-gates','position':[-5.7094,-16.7714,1.65],'target':[6.8,-8.9,3.0],'fov':78},
 {'id':'family-room-courtyard','position':[2.3,1.2,1.65],'target':[2.3,-3,1.35],'fov':80},
 {'id':'bedroom4-courtyard','position':[2.15,1.35,4.45],'target':[3.7,-4.3,3.9],'fov':76},
 {'id':'existing-landing-link','position':[7.3,2.4,4.45],'target':[8,-4,4.25],'fov':80},
 {'id':'old-hall-connection','position':[6.6,2.2,1.65],'target':[7,-4,1.7],'fov':80},
 {'id':'dining-to-garden-addition','position':[6.2,6.8,1.65],'target':[5.1,10.8,1.4],'fov':80},
 {'id':'old-kitchen-garden-addition','position':[2.8,6.7,1.65],'target':[1,11,1.5],'fov':80},
 {'id':'internal-garden','position':[12.05,-3.55,1.65],'target':[11.35,-.12,1.4],'fov':82},
 {'id':'garden-connection','position':[8.6,-2.25,1.65],'target':[11.7,-1.9,1.45],'fov':85},
 {'id':'cinema','position':[3.79,1.45,1.6],'target':[1.9,3.5,1.3],'fov':90},
 {'id':'side-living','position':[-.9,7.8,1.65],'target':[-3.4,2.8,1.05],'fov':85},
 {'id':'side-bathroom','position':[-2.91,4.45,4.4],'target':[-4.6,4.0,3.7],'fov':94},
 {'id':'kitchen-connection','position':[3.65,5.35,1.65],'target':[2.6,9.8,1.25],'fov':83},
 {'id':'garden-to-kitchen','position':[2.7,10.35,1.65],'target':[3.35,6.1,1.2],'fov':83},
 {'id':'laundry','position':[12.75,-9.45,4.40],'target':[11.95,-7.4,3.70],'fov':84},
 {'id':'gym','position':[11.6,-7.3,1.65],'target':[12.25,-9.5,1.0],'fov':82},
 {'id':'wine-room','position':[-.87,4.0,-1.15],'target':[-3.8,7.0,-1.35],'fov':85},
 {'id':'side-bedroom','position':[-1.3,3.25,4.4],'target':[-3.6,1.4,3.45],'fov':83},
 {'id':'basement-cinema','position':[8.62,-7.14,-1.15],'target':[6.90,-10.25,-1.45],'fov':84},
 {'id':'basement-games','position':[9.88,-5.63,-1.15],'target':[11.7,-9.0,-1.7],'fov':80},
 {'id':'basement-stair-access','position':[9.68,-6.05,1.6],'target':[6.7,-5.6,-.35],'fov':82},
 {'id':'basement-stair-bottom','position':[8.65,-5.05,-1.15],'target':[6.4,-5.1,-.2],'fov':87},
 {'id':'loft-creative','position':[.1,5.1,7.15],'target':[-2.6,7.2,6.45],'fov':83},
 {'id':'loft-shared-lounge','position':[6.8,4.9,7.15],'target':[2.3,7.1,6.45],'fov':83},
 {'id':'loft-east-work','position':[11.4,7.25,7.15],'target':[13.2,6.1,6.4],'fov':83},
 {'id':'full-width-dormer','position':[23,21,15],'target':[4.4,6.6,7.5],'fov':78},
 {'id':'roof-terrace','position':[-3.75,13.15,4.42],'target':[-1.0,9.0,3.95],'fov':82},
 {'id':'hot-tub-pool','position':[10.3,14.65,1.80],'target':[12.60,17.25,.75],'fov':82},
 {'id':'workshop-exterior','position':[-17.5,22.55,1.7],'target':[-22.6,23.7,1.35],'fov':78},
 {'id':'workshop-interior','position':[-21.4,22.9,1.6],'target':[-23.1,24.7,1.2],'fov':82},
 {'id':'family-lounge','position':[-1.30,5.65,4.35],'target':[-3.35,7.25,3.65],'fov':82},
 {'id':'family-lounge-storage','position':[-4.65,8.28,4.35],'target':[-1.15,6.45,3.65],'fov':85},
 {'id':'side-hall','position':[2.4,3.76,4.42],'target':[-3.3,3.95,4.25],'fov':80},
 {'id':'roof-connection','position':[18,-2,13],'target':[8.8,-1.5,6.9],'fov':69},
 {'id':'roof-join-underside','position':[12.8,-2.3,6.9],'target':[10.1,-1.5,7.55],'fov':75},
 {'id':'side-front-junction','position':[-3.5,-7.0,3.45],'target':[.15,0,3.75],'fov':48},
 {'id':'side-rear-opening','position':[-3.5,5.70,1.62],'target':[-1.8,9.8,1.30],'fov':79},
 {'id':'rear-dining-junction','position':[7.6,13.8,2.0],'target':[3.8,9.7,1.5],'fov':80},
 {'id':'side-wing-roof','position':[-11,5,10],'target':[-1,4.5,6.8],'fov':72},
 {'id':'west-elevation','position':[-60,-3,6],'target':[5,-3,6],'fov':50,'orthographic':39.5,'hide_landscape':True},
 {'id':'east-elevation','position':[65,-3,6],'target':[5,-3,6],'fov':50,'orthographic':39.5,'hide_landscape':True},
 {'id':'south-elevation','position':[4.5,-65,5.4],'target':[4.5,3,5.4],'fov':50,'orthographic':24.5,'hide_landscape':True},
 {'id':'north-elevation','position':[4.5,65,5.4],'target':[4.5,3,5.4],'fov':50,'orthographic':24.5,'hide_landscape':True},
]
(OUT/'review-cameras.json').write_text(json.dumps(views,indent=2))
with source_file.open('rb')as source_stream:source_sha256=hashlib.file_digest(source_stream,'sha256').hexdigest()
preview_note=os.environ.get('PROPOSAL_PREVIEW_GEOMETRY_NOTE')
(renders/'render-settings.json').write_text(json.dumps({'lighting':lighting,'source':'original' if compare_original else 'proposed','source_native_sha256':source_sha256,'started_utc':datetime.now(timezone.utc).isoformat(),'exposure':scene.view_settings.exposure,'samples':scene.cycles.samples,'width':int(os.environ.get('PROPOSAL_WIDTH','1200')),'geometry_modified':bool(preview_note),'preview_geometry_note':preview_note,'source_file_saved':False},indent=2))
keys=os.environ.get('PROPOSAL_VIEWS','front-gates,aerial-southwest,rear-house').split(',')
original_visibility={ob:ob.hide_render for ob in scene.objects}
for v in views:
 if keys!=['all'] and v['id'] not in keys:continue
 for ob,hidden in original_visibility.items():
  target_hidden=hidden
  if v.get('hide_landscape') and ob.type=='MESH':
   name=ob.name.lower()
   if any(word in name for word in ('tree','foliage','cherry','blossom','hedge','compact car','courtyard shrub','ornamental grass','garden shrub','boundary shrub','boundary leaf','garden canopy')):
    target_hidden=True
  # Unchanged visibility must not tag all 13,000 objects for dependency updates
  # between camera views. Only the elevation views change landscape visibility.
  if ob.hide_render!=target_hidden:ob.hide_render=target_hidden
 camera.data.type='ORTHO'if 'orthographic'in v else'PERSP'
 if 'orthographic'in v:camera.data.ortho_scale=v['orthographic']
 camera.location=v['position'];camera.rotation_euler=(Vector(v['target'])-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.angle=math.radians(v['fov'])
 scene.render.resolution_x=int(os.environ.get('PROPOSAL_WIDTH','1200'));scene.render.resolution_y=round(scene.render.resolution_x*.67);scene.render.filepath=str(renders/(v['id']+'.png'))
 bpy.ops.render.render(write_still=True);print('PROPOSAL_RENDER_DONE',v['id'],flush=True)
