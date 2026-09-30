"""Native rays verify white internal returns without changing exterior finishes."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,hashlib
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
from scripts.build.build_support import native_name
variant=sys.argv[sys.argv.index('--')+1];area=sys.argv[sys.argv.index('--study')+1]if'--study'in sys.argv else None
native=ROOT/f'revisions/interiors-overnight-2026-09-27/{area}/{variant}'/(area.title()+' — interior study.blend')if area else ROOT/f'outputs/output-proposed-{variant}'/(native_name(variant)+'.blend');digest=hashlib.sha256(native.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name)if area else bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
windows=[('Utility','east window','x',13.60,13.79,-15.75,-14.75,1.20,2.30),('Utility','south window','y',-15.94,-16.12,12.195,13.195,1.40,2.35),('Gym','east window -10.9','x',13.60,13.79,-11.90,-9.90,.55,2.35),('Gym','east window -8.49','x',13.60,13.79,-9.49,-7.49,.55,2.35),('Gym','west window -9.505','x',9.40,9.245,-9.505,-8.105,.60,2.40),('Gym','west window -6.405','x',9.40,9.245,-6.405,-4.605,.60,2.40),('Gym','courtyard doors','y',-4.70,-4.41,10.745,13.145,0,2.35)]
windows.append(('Guestbath','retained north window','y',7.793,7.807,7.82,8.8311,3.96,4.84))
windows.extend([('Family','west window','x',-4.95,-5.14,6.375,7.625,3.65,5.05),('Family','north '+('window'if variant=='planning'else'doors'),'y',8.55,8.78,-3.79,-1.39,3.6 if variant=='planning'else 2.8,5.05)])
windows.append(('Bedroom2','front window','y',.15,.10,10.5292,12.9165,3.55,5.0))
windows.append(('Bedroom3','north window','y',8.68,8.72,1.192,3.6189,3.6,4.98))
windows.append(('Familybath','north window','y',7.76,7.793,5.3354,6.8474,4.02,4.82))
windows.append(('Bedroom4','south bedroom window','y',.15,.105,1.1276,3.3827,3.55,5.0))
if area:windows=[w for w in windows if w[0].lower()==area]
rays=[]
for area,label,axis,inside,frame,a,d,sill,head in windows:
    mid=(a+d)/2;z=(sill+head)/2
    point=lambda depth,u,h:(depth,u,h)if axis=='x'else(u,depth,h)
    for surface,u,h in [('head',mid,head-.001),('first jamb',a+.001,z),('second jamb',d-.001,z)]+([('sill',mid,sill+.001)]if sill>0 and not(area=='Family'and label=='north doors')else[]):
        origin=Vector(point(inside,mid,z));target=Vector(point(frame,u,h))
        if area=='Guestbath':
            # The retained blind and latch obstruct room-centre rays. Inspect
            # the exposed inner lip of each return directly, ahead of hardware.
            depth=7.777
            if surface=='head':origin=Vector(point(depth,mid,head-.020));target=Vector(point(depth,mid,head-.001))
            elif surface=='sill':origin=Vector(point(depth,mid,sill+.020));target=Vector(point(depth,mid,sill+.001))
            elif surface=='first jamb':origin=Vector(point(depth,a+.040,z));target=Vector(point(depth,a+.001,z))
            else:origin=Vector(point(depth,d-.040,z));target=Vector(point(depth,d-.001,z))
        elif area in('Family','Bedroom2','Bedroom3','Familybath','Bedroom4'):
            depth=7.793 if area=='Familybath'else 8.712 if area=='Bedroom3'else .105 if area in('Bedroom2','Bedroom4')else -5.067 if axis=='x'else 8.707
            if surface=='head':origin=Vector(point(depth,mid,head-.020));target=Vector(point(depth,mid,head-.001))
            elif surface=='sill':origin=Vector(point(depth,mid,sill+.020));target=Vector(point(depth,mid,sill+.001))
            elif surface=='first jamb':origin=Vector(point(depth,a+.020,z));target=Vector(point(depth,a+.001,z))
            else:origin=Vector(point(depth,d-.020,z));target=Vector(point(depth,d-.001,z))
        if area=='Bedroom3' and surface=='head':
            # Test the visible plaster strip beside the recessed blind headrail.
            origin=Vector(point(depth,a+.02,head-.020));target=Vector(point(depth,a+.02,head-.001))
        delta=target-origin
        hit,loc,normal,face,ob,matrix=scene.ray_cast(deps,origin,delta.normalized(),distance=delta.length+.01)
        name=ob.get('source_name',ob.name)if hit else None
        expected=f'{area} 01 | {label} internal {surface}'
        expected_material=f'Interior | {area} warm ivory'
        if area=='Guestbath'and surface=='sill':expected='En suite balcony window board';expected_material='White joinery'
        if area=='Bedroom3'and surface=='sill':expected='Bedroom 3 rear window board';expected_material='White joinery'
        if area=='Familybath'and surface=='sill':expected='Bathroom balcony window board';expected_material='White joinery'
        assert hit and name==expected,(variant,expected,name,list(loc))
        evaluated=ob.evaluated_get(deps);material=evaluated.data.materials[evaluated.data.polygons[face].material_index].name
        assert material==expected_material,(expected,material)
        rays.append({'expected':expected,'hit':name,'material':material,'position':list(loc)})
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
out=ROOT/'revisions/interiors-overnight-2026-09-27'/(area.lower()+'/'+variant+'/reveal-audit.json'if'--study'in sys.argv else'internal-reveals-'+variant+'.json');out.write_text(json.dumps({'status':'PASS','variant':variant,'source_unchanged':True,'rays':rays},indent=2)+'\n');print('PASS white internal reveals',variant,len(rays),flush=True)
