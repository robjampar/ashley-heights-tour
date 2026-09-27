"""Read-only guest-room checks against evaluated native furniture and moving leaves."""
import bpy,json,sys,math,hashlib
from pathlib import Path
from mathutils import Vector,Matrix
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/guest/{variant}'
native=out/'Guest — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/guest.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def vertices(ob):
    evaluated=ob.evaluated_get(deps);mesh=evaluated.to_mesh()
    try:return [evaluated.matrix_world@v.co for v in mesh.vertices]
    finally:evaluated.to_mesh_clear()
def bb(v):return [min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)]
parts={}
for ob in scene.objects:
    if ob.type!='MESH' or ob.get('interior_room')!='guest':continue
    parts.setdefault(ob.get('source_name',ob.name),[]).append(vertices(ob))
flat={name:[p for v in values for p in v]for name,values in parts.items()}
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id'].startswith('Guest 01 | ')]
assert len(doors)==2 and all(len(set(d['members']))==len(d['members'])for d in doors)
fixed={n:bb(v)for n,v in flat.items()if not any(n in d['members']for d in doors)}
sweeps=[]
for d in doors:
    points=[p for name in d['members']for p in flat[name]];hinge=Vector(d['hinge']);samples=[]
    for step in range(13):
        angle=d['openDelta']*step/12;transform=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);bounds=bb([transform@p for p in points])
        clashes=[n for n,other in fixed.items()if all(min(bounds[i+3],other[i+3])-max(bounds[i],other[i])>.0005 for i in range(3))]
        assert not clashes,(d['id'],step,clashes)
        samples.append({'angle':angle,'bounds':bounds,'furniture_clashes':clashes})
    sweeps.append({'door':d['id'],'members':len(d['members']),'samples':samples})
bed_terms=('bed recessed base','bed upholstered frame','wall-backed upholstered headboard','super-king mattress','draped cotton duvet','folded duvet edge','woven bed throw','sleeping pillow','small linen cushion','pillow stitched edge')
bed=bb([v for name,verts in flat.items()if any(name=='Guest 01 | '+t for t in bed_terms)for v in verts]);a,s,c,n=cfg['bed']['envelope']
assert bed[0]>=a-.003 and bed[1]>=s-.003 and bed[3]<=c+.003 and bed[4]<=n+.003,bed
sx,sy,sz=cfg['screen']['center'];sw,sh=cfg['screen']['size'];views=[]
for eye in cfg['eyes']:
    dx=eye[0]-(sx+.0135);dy=sy-eye[1];distance=math.hypot(dx,dy)
    views.append({'eye':eye,'screenDistance':distance,'centreHeadTurnDegrees':math.degrees(math.atan2(abs(dy),dx)),'horizontalFieldOfViewDegrees':math.degrees(math.atan2(dy+sw/2,dx)-math.atan2(dy-sw/2,dx)),'centreElevationDegrees':math.degrees(math.atan2(sz-eye[2],distance))})
assert max(v['centreHeadTurnDegrees']for v in views)<16
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
report={'status':'PASS','variant':variant,'source_unchanged':True,'native_sha256':digest,'door_sweeps':sweeps,'bed_bounds':bed,'viewing':views,'note':'A fixed 43-inch TV fits the short wall. Its roughly 13-degree field of view is modest at this distance; this is not an immersive cinema screen.'}
(out/'details-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS guest bed envelope, two door sweeps and fixed screen angles',variant)
