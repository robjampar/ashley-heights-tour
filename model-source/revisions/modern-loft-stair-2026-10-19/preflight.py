import bpy,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.model.modern_loft_stair import build_modern_stair,repair_stairwell_linings
bpy.ops.wm.read_factory_settings(use_empty=True)
ns={'scene':bpy.context.scene,'ROOT':ROOT,'materials':{},'PALETTE':{}}
b=RoomBuilder(ns,'level loft','Proposal | Level loft | ','Preflight')
oak=b.material('oak',(.5,.4,.3,1));glass=b.material('clear glass',(.8,.95,1,.15));plaster=b.material('plaster',(.9,.9,.9,1))
cfg=json.loads((ROOT/'proposal/interiors/leisure/loft-stair.json').read_text())
treads,guards=build_modern_stair(b,cfg,oak,glass);repairs=repair_stairwell_linings(b,cfg,plaster)
assert len(treads)==13 and len(repairs)==6
import bmesh
for ob in b.objects:
 bm=bmesh.new();bm.from_mesh(ob.data);volume=bm.calc_volume(signed=True);bm.free()
 if volume < -1e-7:print('INVERTED',ob.name,volume,flush=True)
bpy.context.view_layer.update()
out=ROOT/'walkthrough/test-results/modern-loft-stair-2026-10-19/preflight.glb'
bpy.ops.export_scene.gltf(filepath=str(out),export_format='GLB',export_extras=True,export_apply=True)
print('MODERN_PREFLIGHT',len(b.objects),'objects',len(guards),'guard runs')
