"""Bake a compact directional irradiance volume with Cycles, from the real house.

Two diffuse passes capture indirect sun/sky/fixtures and direct sky/fixtures.
Direct sunlight remains live in Three.js, so doors retain moving sun shadows.
Small receiver cubes are invisible to transport and have a white diffuse BRDF.
The six measured directions are fitted to a first-order irradiance field.
This is a diffuse lighting cache, not a substitute for contact shadows.
"""
import sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
import argparse, hashlib, json, math, time
import bpy
import numpy as np
from mathutils import Vector
from scripts.build.build_support import native_name
from scripts.exports.daylight_filter import filter_daylight


def inside(x,y,poly):
    result=False
    for i,p in enumerate(poly):
        q=poly[i-1]
        if (p[1]>y)!=(q[1]>y) and x<(q[0]-p[0])*(y-p[1])/(q[1]-p[1])+p[0]:result=not result
    return result


def main():
    parser=argparse.ArgumentParser();parser.add_argument('variant',choices=['compact','planning'])
    parser.add_argument('--samples',type=int,default=64);parser.add_argument('--test',action='store_true')
    args=parser.parse_args(sys.argv[sys.argv.index('--')+1:]);start=time.time()
    source=ROOT/f'outputs/output-visual-realism-{args.variant}'/(native_name(args.variant)+' — visual refinement.blend')
    navpath=ROOT/f'walkthrough/public/proposal-{args.variant}-navigation.json'
    nav=json.loads(navpath.read_text())
    settings_path=ROOT/'walkthrough/public/visual-quality/daylight-settings.json'
    settings=json.loads(settings_path.read_text())
    bpy.ops.wm.open_mainfile(filepath=str(source));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
    hidden=set(nav['hiddenObjects'])
    # Native canopy masses are replaced by individual leaves in the browser.
    # Treat those proxy volumes as porous foliage during diffuse transport;
    # opaque proxy spheres would black out windows that have real leaf gaps.
    canopy=bpy.data.materials.new('Bake | porous leaf canopy');canopy.use_nodes=True
    nodes=canopy.node_tree.nodes;nodes.clear()
    transparent=nodes.new('ShaderNodeBsdfTransparent')
    leaf=nodes.new('ShaderNodeBsdfDiffuse');leaf.inputs['Color'].default_value=(.12,.19,.07,1)
    mix=nodes.new('ShaderNodeMixShader');mix.inputs[0].default_value=.10
    output=nodes.new('ShaderNodeOutputMaterial')
    canopy.node_tree.links.new(transparent.outputs[0],mix.inputs[1]);canopy.node_tree.links.new(leaf.outputs[0],mix.inputs[2]);canopy.node_tree.links.new(mix.outputs[0],output.inputs['Surface'])
    for ob in scene.objects:
        if ob.name in hidden or ob.get('source_name') in hidden:ob.hide_render=True
        # Clear window glass has negligible diffuse transport and would waste
        # samples on transparent crossings. Opaque opal lamp diffusers remain.
        if ob.type=='MESH' and ob.data.materials and all(m and any(w in m.name.lower() for w in ('glazing','clear glass','window glass')) for m in ob.data.materials):ob.hide_render=True
        if ob.type=='LIGHT' and (('bounce' in ob.name.lower() and not ob.name.startswith('Bar detail | ')) or ob.name=='Soft fill'):ob.hide_render=True
        if ob.type=='MESH' and any(t in ob.name.lower() for t in ('tree foliage','tree crown','boundary hedge','mature foliage')):
            ob.data=ob.data.copy();ob.data.materials.clear();ob.data.materials.append(canopy)
    world=bpy.data.worlds.new('Visual quality daylight');world.use_nodes=True
    world.node_tree.nodes['Background'].inputs['Color'].default_value=(*settings['skyColor'],1)
    world.node_tree.nodes['Background'].inputs['Strength'].default_value=settings['skyStrength'];scene.world=world
    fixture_count=0
    for ob in scene.objects:
        if ob.type!='LIGHT' or ob.hide_render:continue
        ob.data=ob.data.copy()
        if ob.data.type=='SUN':
            ob.rotation_euler=tuple(math.radians(v) for v in settings['sunRotationDegrees'])
            ob.data.energy=settings['sunIntensity'];ob.data.angle=math.radians(.53)
        else:
            # Keep the actual ceiling, pendant, wall and task lights switched
            # on. Cycles traces their shadows and bounce through the rooms.
            # Neutral diffusers and larger emitters avoid orange pinpricks.
            ob.data.energy*=settings['fixtureMultiplier']
            if not ob.name.startswith('Bar detail | '):ob.data.color=(1,.95,.87)
            if ob.data.type=='POINT':ob.data.shadow_soft_size=max(.28,ob.data.shadow_soft_size)
            if ob.data.type=='AREA' and not ob.get('source_fixture'):ob.data.size=max(.6,ob.data.size)
            fixture_count+=1
    scene.render.engine='CYCLES';scene.cycles.samples=args.samples;scene.cycles.use_denoising=False
    scene.cycles.max_bounces=6;scene.cycles.diffuse_bounces=4;scene.cycles.transparent_max_bounces=32
    scene.cycles.use_adaptive_sampling=False
    try:
        prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='METAL';prefs.get_devices()
        for d in prefs.devices:d.use=d.type=='METAL'
        scene.cycles.device='GPU'
    except Exception:scene.cycles.device='CPU'
    levels={v['id']:v['z'] for v in nav['floorLevels']};levels[2]=0
    excluded=('terrace','internal garden','hot tub','hip store','eaves store')
    # The terrace lounge is an indoor room; the terrace itself stays excluded.
    rooms=[r for r in nav['planRooms'] if r.get('polygon_m') and (r['name']=='Terrace lounge' or not any(s in r['name'].lower() for s in excluded))]
    for room in rooms:
        room['base']=room.get('base_z',levels.get(room['floor'],0))
        room['height']=2.35 if room['floor'] in (-1,3) else 2.55
    # Coordinates are stored in browser Y-up order, with x fastest.
    step=[1.15,.75,1.15]
    points=[p for r in rooms for p in r['polygon_m']]
    origin=[math.floor(min(p[0] for p in points)/step[0])*step[0],-2.45,math.floor(-max(p[1] for p in points)/step[2])*step[2]]
    upper=[max(p[0] for p in points),8.4,-min(p[1] for p in points)]
    size=[math.ceil((upper[i]-origin[i])/step[i])+1 for i in range(3)]
    probes=[]
    for iz in range(size[2]):
        y=-(origin[2]+iz*step[2])
        for iy in range(size[1]):
            z=origin[1]+iy*step[1]
            for ix in range(size[0]):
                x=origin[0]+ix*step[0]
                room=next((r for r in rooms if r['base']+.12<z<r['base']+r['height'] and inside(x,y,r['polygon_m'])),None)
                if room:probes.append({'index':ix+size[0]*(iy+size[1]*iz),'position':[x,y,z],'room':room['name']})
    if args.test:probes=[{'index':0,'position':[2,12,1.2],'room':'garden'},{'index':1,'position':[11,-14,4],'room':'bedroom'},{'index':2,'position':[2,6,1.3],'room':'kitchen'}]
    # A separate, tiny card for each hemisphere; no shared vertices/normals.
    dirs=[(1,0,0),(-1,0,0),(0,0,1),(0,0,-1),(0,-1,0),(0,1,0)]
    tile=2;side=2**math.ceil(math.log2(math.ceil(math.sqrt(len(probes)*6))*tile))
    vertices=[];faces=[];tiles=[]
    for pi,probe in enumerate(probes):
        center=Vector(probe['position'])
        for di,d in enumerate(dirs):
            n=Vector(d);u=n.cross(Vector((0,1,0)) if abs(n.y)<.9 else Vector((1,0,0))).normalized();v=n.cross(u)
            c=center+n*.006;base=len(vertices)
            vertices.extend([c+u*a*.004+v*b*.004 for a,b in [(-1,-1),(1,-1),(1,1),(-1,1)]])
            faces.append((base,base+1,base+2,base+3));k=pi*6+di
            tiles.append(((k%(side//tile))*tile,(k//(side//tile))*tile))
    mesh=bpy.data.meshes.new('Irradiance receivers');mesh.from_pydata(vertices,[],faces);mesh.update()
    receiver=bpy.data.objects.new('Irradiance receivers',mesh);scene.collection.objects.link(receiver)
    for prop in ('visible_camera','visible_diffuse','visible_glossy','visible_transmission','visible_shadow'):setattr(receiver,prop,False)
    uv=mesh.uv_layers.new(name='BakeUV')
    for face,(tx,ty) in zip(mesh.polygons,tiles):
        for loop,(u,v) in zip(face.loop_indices,[(0,0),(1,0),(1,1),(0,1)]):uv.data[loop].uv=((tx+u*tile)/side,(ty+v*tile)/side)
    image=bpy.data.images.new('Irradiance atlas',side,side,float_buffer=True);image.colorspace_settings.name='Non-Color'
    mat=bpy.data.materials.new('White irradiance receiver');mat.use_nodes=True;nodes=mat.node_tree.nodes;nodes.clear()
    diffuse=nodes.new('ShaderNodeBsdfDiffuse');diffuse.inputs['Color'].default_value=(1,1,1,1)
    output=nodes.new('ShaderNodeOutputMaterial');mat.node_tree.links.new(diffuse.outputs[0],output.inputs['Surface'])
    tex=nodes.new('ShaderNodeTexImage');tex.image=image;nodes.active=tex;mesh.materials.append(mat)
    bpy.ops.object.select_all(action='DESELECT');receiver.select_set(True);bpy.context.view_layer.objects.active=receiver
    scene.render.bake.margin=0;scene.render.bake.use_clear=True;scene.render.bake.use_pass_color=False
    scene.render.bake.use_pass_indirect=True;scene.render.bake.use_pass_direct=False
    print('BAKE',args.variant,len(probes),'probes',side,'atlas',scene.cycles.device,flush=True)
    bpy.ops.object.bake(type='DIFFUSE');indirect=np.array(image.pixels[:],dtype=np.float32).reshape(side,side,4)
    for ob in scene.objects:
        if ob.type=='LIGHT' and ob.data.type=='SUN':ob.hide_render=True
    scene.render.bake.use_pass_indirect=False;scene.render.bake.use_pass_direct=True
    bpy.ops.object.bake(type='DIFFUSE');direct=np.array(image.pixels[:],dtype=np.float32).reshape(side,side,4)
    measured=np.zeros((len(probes),6,3),dtype=np.float32)
    for k,(tx,ty) in enumerate(tiles):measured[k//6,k%6]=np.mean((indirect+direct)[ty:ty+tile,tx:tx+tile,:3],axis=(0,1))
    print('BAKE_RANGE',float(measured.min()),float(measured.max()),float(np.median(measured)),flush=True)
    if not np.isfinite(measured).all() or measured.max()<.001:raise RuntimeError('Irradiance bake is empty or invalid')
    # A probe may land centimetres from a tiny bulb. Its inverse-square spike
    # must not illuminate an entire metre-wide interpolation cell.
    clamped=int(np.count_nonzero(measured>3));measured=np.minimum(measured,3)
    # Probes can fall inside furniture or close to tiny emissive fittings.
    # Robust, room-local filtering removes those outliers without spreading
    # light through a neighbouring room's wall. Keep broad daylight gradients.
    measured=filter_daylight(probes,measured)
    out=ROOT/'walkthrough/public/visual-quality';out.mkdir(exist_ok=True)
    coefficients=np.zeros((math.prod(size),4,4),dtype=np.float32)
    for p,e in zip(probes,measured):
        c=np.stack([e.mean(axis=0),(e[0]-e[1])*.32,(e[2]-e[3])*.32,(e[4]-e[5])*.32])*math.pi
        coefficients[p['index'],:,:3]=c;coefficients[p['index'],:,3]=1
    # Extend radiance into empty neighbours to avoid black interpolation at
    # wall boundaries. Occupancy stays zero so outdoor fallback still applies.
    array=coefficients.reshape(size[2],size[1],size[0],4,4)
    valid=array[...,0,3]>0
    for _ in range(2):
        accum=np.zeros_like(array);weight=np.zeros(valid.shape,dtype=np.float32)
        for axis in range(3):
            for shift in (-1,1):
                shifted=np.roll(array,shift,axis=axis);mask=np.roll(valid,shift,axis=axis)
                edge=[slice(None)]*3;edge[axis]=0 if shift==1 else -1;mask[tuple(edge)]=False
                accum+=shifted*mask[...,None,None];weight+=mask
        fill=(~valid)&(weight>0)
        array[fill,:,:3]=(accum/np.maximum(weight,1)[...,None,None])[fill,:,:3]
        # One-cell apron keeps ceilings and walls in the same lighting field.
        # Otherwise occupancy interpolation switches back to sky lighting in
        # a grid pattern at the boundary of the last measured interior layer.
        if _==0:array[fill,:,3]=1
        valid=valid|fill
    stem=args.variant+('-test' if args.test else '')
    room_exposure=[]
    for room in rooms:
        values=[float(e.mean())*math.pi for p,e in zip(probes,measured) if p['room']==room['name']]
        if not values:continue
        median=float(np.median(values))
        # A photographic meter adapts to the interior; bright glazing is left
        # to the filmic tone mapper. No light is added by this exposure change.
        exposure=max(settings['interiorExposure'],min(3.8,settings['interiorExposure']*math.sqrt(1.35/max(.15,median))))
        if 'cinema' in room['name'].lower():exposure=min(exposure,1.8)
        # The selected Art Deco bar is lit by its visible pendants, sconces and
        # shelf LEDs. Preserve their local contrast instead of lifting it to
        # the daytime exposure used by bedrooms and the main living spaces.
        if room['name']=='Basement bar and games room':exposure=1.20
        room_exposure.append({'name':room['name'],'medianIrradiance':round(median,5),'exposure':round(exposure,3)})
    payload={'version':1,'variant':args.variant,'origin':origin,'step':step,'size':size,'probes':len(probes),'samples':args.samples,'clampedChannels':clamped,'seconds':round(time.time()-start,2),'method':'Cycles diffuse indirect + direct sky and fixtures; live sun excluded','sourceSHA256':hashlib.file_digest(source.open('rb'),'sha256').hexdigest(),'modelSHA256':hashlib.file_digest((ROOT/f'walkthrough/public/proposal-{args.variant}.glb').open('rb'),'sha256').hexdigest(),'navigationSHA256':hashlib.sha256(navpath.read_bytes()).hexdigest(),'coefficients':np.round(coefficients.reshape(-1),5).tolist()}
    payload['rooms']=room_exposure
    payload['lighting']={**settings,'fixtures':fixture_count}
    payload['settingsSHA256']=hashlib.sha256(settings_path.read_bytes()).hexdigest()
    payload['furnishingsSHA256']=hashlib.file_digest((out/(args.variant+'-furnishings.glb')).open('rb'),'sha256').hexdigest()
    (out/(stem+'-daylight.json')).write_text(json.dumps(payload,separators=(',',':')))
    print('BAKED',stem,payload['seconds'],'seconds',flush=True)

if __name__=='__main__':main()
