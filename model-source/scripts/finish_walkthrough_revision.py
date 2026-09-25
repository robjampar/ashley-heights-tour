import bpy,json,sys,ast,math
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'));OUT=ROOT/'output-walkthrough'
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Ashley Heights.blend'));scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((OUT/'geometry.json').read_text());materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_site import refine_site
from align_outbuilding import align_outbuilding
align_outbuilding(g)
g['site']=refine_site(globals())
from refine_gate_wings import refine_gate_wings
g['gate_wings_review']=refine_gate_wings(globals())
from floor_finishes import apply_floor_finishes
apply_floor_finishes()
from refine_plan_openings import refine_plan_openings
g['plan_openings_review']=refine_plan_openings(globals())
from refine_fitted_details import refine_fitted_details
g['detail_review']=refine_fitted_details(globals())
from refine_circulation import refine_circulation
g['circulation_review']=refine_circulation(globals())
from refine_drawing_opening import refine_drawing_opening
g['drawing_opening_review']=refine_drawing_opening(globals())
from refine_kitchen_comparison import refine_kitchen_comparison
g['kitchen_comparison_review']=refine_kitchen_comparison(globals())
from refine_kitchen_small_details import refine_kitchen_small_details
g['kitchen_small_details_review']=refine_kitchen_small_details(globals())
from refine_lift import refine_lift
g['lift_review']=refine_lift(globals())
from restore_shower_partition import restore_shower_partition
g['shower_partition_review']=restore_shower_partition(globals())
from refine_upstairs_comparison import refine_upstairs_comparison
g['upstairs_comparison_review']=refine_upstairs_comparison(globals(),bedroom4_variant='proposal')
from refine_roof_joins import refine_roof_joins
g['roof_join_review']=refine_roof_joins(globals())
from refine_entrance_exterior import refine_entrance_exterior
g['entrance_exterior_review']=refine_entrance_exterior(globals())
from refine_exterior_feedback import refine_exterior_feedback
g['exterior_owner_review']=refine_exterior_feedback(globals())
from refine_garden_flat_roof import refine_garden_flat_roof
g['garden_flat_roof_review']=refine_garden_flat_roof(globals())
from refine_drawing_comparison import refine_drawing_comparison
g['drawing_comparison_review']=refine_drawing_comparison(globals())
from refine_family_comparison import refine_family_comparison
g['family_comparison_review']=refine_family_comparison(globals())
from refine_trim_comparison import refine_trim_comparison
g['trim_comparison_review']=refine_trim_comparison(globals())
from refine_hall_fittings import refine_hall_fittings
g['hall_fittings_review']=refine_hall_fittings(globals())
from refine_front_bays import refine_front_bays
g['front_bay_review']=refine_front_bays(globals())
from refine_surface_joins import refine_surface_joins
g['surface_join_review']=refine_surface_joins(globals())
from refine_small_placements import refine_small_placements
g['small_placements_review']=refine_small_placements(globals())
from refine_stair_ironwork import refine_stair_ironwork
g['stair_ironwork_review']=refine_stair_ironwork(globals())
from refine_balcony_surface import refine_balcony_surface
g['balcony_surface_review']=refine_balcony_surface(globals())
from refine_drawing_doors import refine_drawing_doors
g['drawing_doors_review']=refine_drawing_doors(globals(),pose='open')
g['dining_doors_review']=refine_drawing_doors(globals(),pose='open',wall_name='Dining hall doors',opening_angle=65)
from refine_stair_dining_owner import refine_stair_dining_owner
g['stair_dining_owner_review']=refine_stair_dining_owner(globals())
from refine_side_annex import refine_side_annex
g['side_annex']=refine_side_annex(globals())
from refine_oven_orientation import refine_oven_orientation
g['oven_orientation_review']=refine_oven_orientation(globals())
from refine_rear_bay_alignment import refine_rear_bay_alignment
g['rear_bay_review']=refine_rear_bay_alignment(globals())
from refine_front_arch_windows import refine_front_arch_windows
g['front_arch_review']=refine_front_arch_windows(globals())
from refine_porch_width import refine_porch_width
g['porch_width_review']=refine_porch_width(globals())
from refine_entrance_height import refine_entrance_height
g['entrance_height_review']=refine_entrance_height(globals())
from refine_garage_moving_details import refine_garage_moving_details
g['garage_motion_review']=refine_garage_moving_details(globals())
from refine_drawing_rear_doors import refine_drawing_rear_doors
g['drawing_rear_doors_review']=refine_drawing_rear_doors(globals())
from refine_dining_small_details import refine_dining_small_details
g['dining_small_details_review']=refine_dining_small_details(globals())
from refine_entrance_details_v2 import apply as entrance_details_v2
g['entrance_details_v2_review']=entrance_details_v2(globals())
from refine_dining_wall_v2 import apply as dining_wall_v2
g['dining_wall_v2_review']=dining_wall_v2(globals())
from refine_stair_landing_join import apply as stair_landing_join
g['stair_landing_join_review']=stair_landing_join(globals())
from repair_rounding import repair_rounding
repaired=repair_rounding()
if repaired:g['rounding_repairs']=repaired
for ob in bpy.data.objects:
 if ob.type=='MESH'and ob.name.startswith('Exterior brick floor band') and not ob.get('entrance_height_uncut_mesh'):
  ob.data.materials.clear();ob.data.materials.append(materials['Warm plaster']);ob.data.materials.append(materials['Red brown brick'])
  for f in ob.data.polygons:f.material_index=1 if f.index==3 else 0
cam=bpy.data.objects['Camera | Garden layout'];cam.location=(40,60,45);cam.rotation_euler=(Vector((-5,8,0))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.ortho_scale=68
# Keep native panorama markers consistent with the literal comparison views.
for view in json.loads((ROOT/'photo-review/views.json').read_text()):
 if view['view']!=0:continue
 marker=next((ob for ob in bpy.data.objects if ob.type=='CAMERA' and ob.name.startswith(str(view['id'])+' | ')),None)
 if marker:
  marker.location=view['position'];marker.rotation_euler=Vector(view['direction']).to_track_quat('-Z','Y').to_euler()
  marker['heading_note']=view.get('pose_basis','Estimated shared panorama pose from comparison views.')
notes=bpy.data.texts.get('START HERE - Ashley Heights');notes.clear();notes.write('ASHLEY HEIGHTS — PHOTO-COMPARED EDITABLE MODEL\n\nWalkthrough: double-click Open Walkthrough.command in the project folder.\nWASD/arrows move, mouse looks, Esc releases the pointer. Room shortcuts cover both floors, garden and driveway.\nThe browser uses AgX, cast shadows, contact shading and environment reflections; Blender Cycles is the reference renderer.\n\nEditable model: 32 printed dimensions match; two rear-bay depths follow owner-selected option B. Units: metres.\nUse Scene selector: Exterior, Ground floor, First floor, Whole house, Garden layout, Hall stairs, Landing stairs.\nG moves, R rotates, S scales, Tab edits mesh vertices.\nView > Navigation > Walk Navigation also works inside Blender.\n\nLatest owner corrections: flat garden-room roof and 900 mm front overhang; flared curved gate connectors; corrected stairs/cupboards; south-facing oven; refined symmetric rear bay joinery; raised landing arch with a local ceiling reveal.\nPorch A is retained with taller entrance leaves. Rear bay B is selected (300 mm less projection). Garage and individual drawing-room door leaves animate in the browser.\nSite boundaries, levels, heights and unlabelled details are estimates. Area and photo discrepancies remain documented.\n\nBlender does not auto-reload files. Save manual edits separately before rebuilding or reopening.\n')
for ob in bpy.data.objects:
 if ob.type=='MESH'and ob.name.startswith('Balcony brick pier'):
  cy=sum((ob.matrix_world@v.co).y for v in ob.data.vertices)/len(ob.data.vertices)
  if cy>9.2:ob.location.y-=.79
from editable_origins import set_editable_origins
set_editable_origins()
g['objects']=[{'name':o.get('source_name',o.name.split('.00')[0]),'object_name':o.name,'layer':o.users_collection[0].name,'assembly':o.get('assembly'),'walkthrough_opening_leaf':bool(o.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(o.get('walkthrough_keep_visible')),'vertices':[list(o.matrix_world@v.co)for v in o.data.vertices],'faces':[list(f.vertices)for f in o.data.polygons],'materials':[m.name for m in o.data.materials],'face_materials':[f.material_index for f in o.data.polygons]}for o in bpy.data.objects if o.type=='MESH']
g['materials']=PALETTE;(OUT/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(OUT/'site-estimates.json').write_text(json.dumps(g['site'],indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'));bpy.ops.export_scene.gltf(filepath=str(OUT/'Ashley Heights.glb'),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
for sn,fn in [('01 Exterior','Exterior.png'),('02 Ground floor','Ground floor.png'),('03 First floor','First floor.png'),('05 Garden layout','Site overview.png')]:
 s=bpy.data.scenes[sn];bpy.context.window.scene=s;s.render.filepath=str(OUT/fn);bpy.ops.render.render(write_still=True)
print('FINAL_WALKTHROUGH_MODEL_SAVED')
