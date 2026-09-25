"""Isolated true geometry ceiling/camera experiments; never saves a model."""
import os,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
os.environ['ASHLEY_VARIANT']='walkthrough';os.environ['ASHLEY_RENDER_DIR']='bedroom4-ceiling-audit'
source=(ROOT/'scripts/render_photo_views.py').read_text()
exec(compile(source.split('views=json.loads')[0],str(ROOT/'scripts/render_photo_views.py'),'exec'))
audit=json.loads((out/'ceiling-audit.json').read_text());dh=audit['delta_m']
data=json.loads((ROOT/'output-walkthrough/geometry.json').read_text())
base={ob.name:[ob.matrix_world@v.co for v in ob.data.vertices] for ob in bpy.data.objects if ob.type=='MESH'}
base_hidden={ob.name:ob.hide_render for ob in bpy.data.objects if ob.type=='MESH'}
wall_names=['First front','First west','Bedroom 5 to 4','Bedroom 4 hall','Bedroom 4 shower return','Bedroom 4 en suite jog','Bedroom 4 en suite divider']
ceiling=bpy.data.objects['Bedroom 4 | ceiling'];wall=next(w for w in data['walls'] if w['name']=='First front')
op=min(wall['openings'],key=lambda o:abs(wall['a'][0]-o[0]-2.255114));cx=wall['a'][0]-op[0];left,right=cx-op[1]/2,cx+op[1]/2
windows=[]
for ob in bpy.data.objects:
    if ob.type!='MESH' or not ob.name.startswith('First front'):continue
    if ob.users_collection[0].name not in ('21 First floor - walls','22 Doors and windows'):continue
    p=base[ob.name];lo=[min(v[i] for v in p) for i in range(3)];hi=[max(v[i] for v in p) for i in range(3)]
    margin=.065 if 'window board' in ob.name else .00001
    if lo[0]>=left-margin and hi[0]<=right+margin and lo[2]>=2.8-.00001 and hi[2]<=5.25+.00001:windows.append(ob.name)
def warp(z,sill):
    if z<3.55:return 2.8+(z-2.8)*(sill-2.8)/(3.55-2.8)
    if z<=5:return sill+(z-3.55)*(5-sill)/(5-3.55)
    return z
views=[v for v in json.loads((ROOT/'photo-review/views.json').read_text()) if v['id']==2445676]
manifest=[]
for variant in audit['variants']:
    label=variant['label']
    only=os.environ.get('ASHLEY_CEILING_VARIANTS')
    if only and label not in only.split(','):continue
    dh=variant['ceiling_above_floor_m']-2.45;raised=abs(dh)>1e-6
    camera_dz=variant['camera_above_floor_m']+2.8-views[0]['position'][2]
    changed=[]
    for name,original in base.items():
        ob=bpy.data.objects[name];inv=ob.matrix_world.inverted();points=[p.copy() for p in original]
        ob.hide_render=base_hidden[name]
        if raised:
            if name.startswith(('Roof join | First front masonry head','Roof join | First west masonry head')):
                # The extended full wall replaces these short old closure
                # solids. Retaining both exposes duplicate coplanar faces.
                ob.hide_render=True
            if ob==ceiling:
                for p in points:p.z=5.25+dh+(0 if abs(p.z-5.25)<1e-4 else .02)
            if name=='Main hipped roof':
                for p in points:
                    if p.x<0:p.x-=.445
                    if p.y<0:p.y-=.435
            if ob.users_collection[0].name=='21 First floor - walls' and any(name.startswith(w+' | ') for w in wall_names):
                lo=[min(p[i] for p in points) for i in range(3)];hi=[max(p[i] for p in points) for i in range(3)]
                if (name.startswith('First front') and lo[0]>4.35) or (name.startswith('First west') and lo[1]>3.2):pass
                else:
                    for p in points:
                        if p.z>=5.25-1e-4:p.z=5.25+dh+.02
            if name.startswith('Circulation detail | Cove') and any(w in name for w in wall_names):
                # Only inside-facing coves bounding this room. Long shared
                # exterior-wall coves are moved in this unsaved trial only.
                if name.endswith(' -1') or ('en suite jog' in name and name.endswith(' 1')):
                    for p in points:p.z+=dh
        if variant['window']!='A' and name in windows:
            sill=3.84 if variant['window']=='C' else 3.92
            for p,old in zip(points,original):
                if 'window board' in name:p.z=old.z+sill-3.55
                elif old.z<=5:p.z=warp(old.z,sill)
        if any((p-q).length>1e-7 for p,q in zip(points,original)):changed.append(name)
        for v,p in zip(ob.data.vertices,points):v.co=inv@p
        ob.data.update()
    bpy.context.view_layer.update()
    for view in views:
        camera.location=variant.get('camera_xyz',(view['position'][0],view['position'][1],view['position'][2]+camera_dz))
        direction=view['direction']
        if 'camera_yaw' in variant:
            a=variant['camera_yaw']-view['view']*math.pi/2;direction=(math.cos(a),math.sin(a),0)
        camera.rotation_euler=Vector(direction).to_track_quat('-Z','Y').to_euler()
        camera.data.type='PERSP';camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(view['horizontal_fov'])
        scene.render.resolution_x=view['width'];scene.render.resolution_y=view['height']
        scene.render.filepath=str(out/f'{label}-{view["view"]}.png');bpy.ops.render.render(write_still=True)
        print('CEILING_TRIAL_VIEW_DONE',label,view['view'],flush=True)
    manifest.append(dict(variant=label,changed_meshes=changed,camera_shift_z_m=camera_dz,
                         roof_projection_hypothesis_m=.60 if raised else .165,
                         canonical_changes=False))
(out/('render-manifest-'+os.environ.get('ASHLEY_CEILING_VARIANTS','original').replace(',','_')+'.json')).write_text(json.dumps(manifest,indent=2))
print('BEDROOM4_CEILING_TRIALS_COMPLETE',flush=True)
