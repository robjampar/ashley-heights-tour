"""Owner-selected stone feature on the garden room's inside west return."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from scripts.interiors.garden_stone import apply_native
_garden_stone_report=apply_native(scene,ROOT)
nav['gardenStoneFinish']=_garden_stone_report
if _garden_stone_report['applied']:
 for _gs_material in bpy.data.materials:
  if _gs_material.name.startswith('Garden limestone | '):
   materials[_gs_material.name]=_gs_material;PALETTE[_gs_material.name]=list(_gs_material.diffuse_color)
