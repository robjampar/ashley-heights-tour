"""Proof of a taller ground storey; isolated scene, no canonical save."""
import os
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
os.environ['ASHLEY_VARIANT']='walkthrough';os.environ['ASHLEY_RENDER_DIR']='bedroom4-ceiling-audit'
source=(ROOT/'scripts/render_photo_views.py').read_text()
exec(compile(source.split('views=json.loads')[0],str(ROOT/'scripts/render_photo_views.py'),'exec'))
audit=json.loads((out/'ceiling-audit.json').read_text());dz=audit['combined_window']['window_only_camera_z_m']-audit['original_camera'][2]
base={ob.name:[ob.matrix_world@v.co for v in ob.data.vertices] for ob in bpy.data.objects if ob.type=='MESH'}
changed=[]
for name,pts in base.items():
    ob=bpy.data.objects[name];layer=ob.users_collection[0].name
    lo=[min(p[i] for p in pts) for i in range(3)];hi=[max(p[i] for p in pts) for i in range(3)]
    upper=layer.startswith(('20 ','21 ','22 ','23 ','24 ','25 ','26 ')) or (layer.startswith('16 ') and lo[2]>2.65)
    if not upper and not name.startswith(('Main hipped roof','Roof join | First front masonry head','Roof join | First west masonry head')):continue
    inv=ob.matrix_world.inverted();new=[p.copy() for p in pts]
    if upper:
        for p in new:p.z+=dz
        # Every upstairs floor/furnishing/door moves with the common datum.
        # For the tested window, its external head stays fixed and its actual
        # clear aperture is shortened. This changes masonry and framing alike.
        if name.startswith('First front') and lo[0]>1.06 and hi[0]<3.46 and layer.startswith(('21 ','22 ')):
            for p,old in zip(new,pts):
                if 'window board' in name:p.z=old.z+(3.92-3.55)
                elif old.z<3.55:p.z=2.8+dz+(old.z-2.8)*(3.92-(2.8+dz))/(3.55-2.8)
                elif old.z<=5:p.z=3.92+(old.z-3.55)*(5-3.92)/(5-3.55)
                else:p.z=5+(old.z-5)*((5.25+dz)-5)/.25
        if layer.startswith('25 '):
            low=min(p.z for p in new)
            for p in new:
                if p.z>low+.001:p.z=low+.02
    if name.startswith(('Roof join | First front masonry head','Roof join | First west masonry head')):ob.hide_render=True
    if name=='Main hipped roof':
        for p in new:
            if p.x<0:p.x-=.445
            if p.y<0:p.y-=.435
    for vertex,p in zip(ob.data.vertices,new):vertex.co=inv@p
    ob.data.update();changed.append(name)
bpy.context.view_layer.update()
for v in json.loads((ROOT/'photo-review/views.json').read_text()):
    if v['id']!=2445676:continue
    camera.location=(v['position'][0],v['position'][1],v['position'][2]+dz)
    camera.rotation_euler=Vector(v['direction']).to_track_quat('-Z','Y').to_euler()
    camera.data.type='PERSP';camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['horizontal_fov'])
    scene.render.resolution_x=v['width'];scene.render.resolution_y=v['height']
    scene.render.filepath=str(out/f'taller_storey-{v["view"]}.png');bpy.ops.render.render(write_still=True)
    print('TALLER_STOREY_VIEW_DONE',v['view'],flush=True)
(out/'taller-storey-proof.json').write_text(json.dumps({'floor_level_m':2.8+dz,'camera_z_m':audit['original_camera'][2]+dz,
 'ceiling_world_m':5.25+dz,'room_ceiling_height_m':2.45,'window_sill_world_m':3.92,'window_head_world_m':5,
 'window_sill_above_floor_m':3.92-2.8-dz,'window_head_above_floor_m':5-2.8-dz,
 'ground_ceiling_assumption_m':2.6,'remaining_depth_above_ground_ceiling_m':2.8+dz-2.6,
 'stair_risers_assumed':17,'old_rise_m':2.8/17,'new_rise_m':(2.8+dz)/17,
 'unchanged_ground_floor_and_facade':'Proof is restricted to upstairs views. Ground ceiling, exterior decorative band, stairs and full external transition are not rebuilt by this hypothetical test.',
 'roof_overhang_hypothesis_m':.60,'changed_meshes':changed,'canonical_files_saved':False},indent=2))
print('TALLER_STOREY_PROOF_COMPLETE',flush=True)
