"""Export the separate native model and matched navigation; never write original files."""
from datetime import datetime, timezone
import copy
with build_timer.phase('export.verify_inputs'):
 assert build_inputs == planning_source_hashes(), 'Inputs changed while model was building; rebuild from the latest sources.'
 (OUT/'build-inputs.json').write_text(json.dumps(build_inputs,indent=2)+'\n')
bpy.context.view_layer.update()
# Explicit scene-only mesh list preserves edits and Boolean results in geometry exports.
objects=[]
_export_memberships=collection_memberships(bpy.data)
depsgraph=bpy.context.evaluated_depsgraph_get()
for ob in scene.objects:
 if ob.type!='MESH':continue
 evaluated=ob.evaluated_get(depsgraph);evaluated_mesh=evaluated.to_mesh()
 objects.append({'name':ob.get('source_name',ob.name),'object_name':ob.name,'layer':next((c.name for c in _export_memberships[ob.as_pointer()] if c.name.startswith('P')),_export_memberships[ob.as_pointer()][0].name),'assembly':ob.get('assembly'),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),'vertices':[list(ob.matrix_world@v.co) for v in evaluated_mesh.vertices],'faces':[list(f.vertices) for f in evaluated_mesh.polygons],'materials':[m.get('appearance_source_material',m.name) for m in ob.data.materials],'face_materials':[f.material_index for f in evaluated_mesh.polygons],'material_appearance':[m.get('appearance_role') for m in ob.data.materials]})
 evaluated.to_mesh_clear()
build_timer.lap('export.extract_geometry')
proposal_g={**g,'objects':objects,'materials':PALETTE,'rooms':g['rooms']+new_rooms,'proposal':{'revision':spec['revision'],'brief':spec,'changes':changes,'originalFile':'../output-walkthrough/Ashley Heights.blend','coordinateSystem':'metres: x east,y rear/north,z up'}}
(OUT/'geometry.json').write_text(json.dumps(proposal_g,separators=(',',':')))
build_timer.lap('export.write_geometry')
# New collision data is derived alongside native pieces, including door apertures and stairs.
nav['surfaces'].extend(new_surfaces);nav['obstacles'].extend(new_obstacles);nav['segments'].extend(new_segments)
nav['ramps']=nav.get('ramps',[])+new_ramps
nav['planRooms'].extend(new_rooms);nav['rooms'].extend(new_views)
nav['interactiveDoors'].extend(proposed_doors)
nav['materials']=PALETTE;nav['hiddenObjects']=[n for n in nav['hiddenObjects'] if n not in excluded]
nav['design']=VARIANT or 'proposed';nav['designRevision']=spec['revision'];nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat()
nav['variant']=VARIANT;nav['designLabel']=spec.get('variantLabel','Proposed')
nav['floorLevels']=[{'id':-1,'z':-2.8,'label':'Cellar'},{'id':0,'z':0,'label':'Ground floor'},{'id':1,'z':2.8,'label':'First floor'},{'id':3,'z':spec['loftFloor'],'label':'Loft'}]
public_spec={key:value for key,value in spec.items() if key!='workDeadline'}
nav['proposal']={'changes':changes,'specification':public_spec,'originalPreserved':True,'areaBasis':'Model geometry and supplied plan; estimates, not a measured survey'}
(OUT/'navigation.json').write_text(json.dumps(nav,separators=(',',':')))
(ROOT/('walkthrough/public/proposal%s-navigation.json'%VARIANT_SUFFIX)).write_text(json.dumps(nav,separators=(',',':')))
build_timer.lap('export.write_navigation')
# Keep original scenes available in native file and make proposal the opening scene.
notes=bpy.data.texts.new('PROPOSED DESIGN — START HERE')
notes.write('Ashley Heights additive design '+spec['revision']+'\n\nOriginal house scenes are preserved in this COPY. Scene08 is the proposed design.\nAll new work is grouped in P10…P70 collections; local edits to original roof/stair/entrance are proposal-only copies in P01.\n\nUse the original/proposed button in the browser tour for comparison.\n\nThis is an editable architectural concept based on an estimated reconstruction, not construction documentation.\nRead proposal/CURRENT-BRIEF.md and the dated feasibility/area reports.\n\nLocal changes:\n'+''.join('- '+c['original']+': '+c['reason']+'\n' for c in changes))
if PLANNING:
 notes.clear();notes.write('Ashley Heights — Proposed (planning application)\n\nMatching red-brown brick house and forecourt scheme. Existing outbuildings retained. Scene 08 contains the proposed application design. Dimensions are model estimates, not construction documentation.\n')
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True
scene.render.resolution_x=1600;scene.render.resolution_y=1000;scene.render.resolution_percentage=100
scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.6
# A review camera is saved in the native file for an immediate useful arrival view.
camera=bpy.data.objects.new('Proposal | Gate arrival review',bpy.data.cameras.new('Proposal | Gate arrival review'));collection('P80 Review cameras').objects.link(camera)
camera.location=(-2.8,-15.4,1.7);target=Vector((6.8,-8.6,3.1));camera.rotation_euler=(target-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.lens=22;scene.camera=camera
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':
   area.spaces.active.region_3d.view_distance=48;area.spaces.active.region_3d.view_location=(3,0,2)
   area.spaces.active.clip_end=500
bpy.context.window.scene=scene
_native_name='Ashley Heights — Proposed (planning application)' if PLANNING else 'Ashley Heights — Proposed'+((' ('+VARIANT+')') if VARIANT else '')
build_timer.lap('export.prepare_native')
with build_timer.phase('export.save_blend'):
 bpy.ops.wm.save_as_mainfile(filepath=str(OUT/(_native_name+'.blend')))
with build_timer.phase('export.glb'):
 from proposal_kitchen_interiors import export_quiet_oak_gltf
 export_quiet_oak_gltf(filepath=str(OUT/(_native_name+'.glb')),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
import shutil
shutil.copyfile(OUT/(_native_name+'.glb'),ROOT/('walkthrough/public/proposal%s.glb'%VARIANT_SUFFIX))
# Preservation is checked against the baseline captured before any proposal work.
baseline=json.loads((ROOT/'proposal/original-preservation.json').read_text())
preservation={name:hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==digest for name,digest in baseline['files'].items()}
assert all(preservation.values()), 'Original source changed: '+str(preservation)
(OUT/'original-preservation-check.json').write_text(json.dumps(preservation,indent=2))
print('ORIGINAL_PRESERVED',all(preservation.values()),flush=True)
report={'revision':spec['revision'],'variant':VARIANT,'objects':len(objects),'newSurfaces':len(new_surfaces),'newSegments':len(new_segments),'newObstacles':len(new_obstacles),'newDoors':len(proposed_doors),'newRamps':len(new_ramps),'changes':changes,'builtAt':nav['modelUpdatedAt']}
(OUT/'build-report.json').write_text(json.dumps(report,indent=2))
print('PROPOSAL_SAVED',json.dumps({k:v for k,v in report.items() if k!='changes'}),flush=True)

build_timer.lap('export.publish_and_preservation')
