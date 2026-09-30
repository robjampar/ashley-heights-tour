"""Render the four proposed gate views without modifying model or pose files."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import os
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
os.environ['ASHLEY_VARIANT']='walkthrough';os.environ['ASHLEY_RENDER_DIR']='gate-pose-final'
source=(ROOT/'scripts/studies/render_photo_views.py').read_text()
exec(compile(source.split('views=json.loads')[0],str(ROOT/'scripts/studies/render_photo_views.py'),'exec'))
proposed={v['key']:v for v in json.loads((out/'pose-fit.json').read_text())['proposed_views']}
for original in json.loads((ROOT/'archive/photo-review/views.json').read_text()):
    if original['id']!=2445684:continue
    v=dict(original,**proposed[original['key']])
    camera.location=v['position'];camera.rotation_euler=Vector(v['direction']).to_track_quat('-Z','Y').to_euler()
    camera.data.type='PERSP';camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['horizontal_fov'])
    scene.render.resolution_x=v['width'];scene.render.resolution_y=v['height']
    scene.render.filepath=str(out/(v['key']+'.png'));bpy.ops.render.render(write_still=True)
    print('GATE_POSE_VIEW_DONE',v['key'],flush=True)
print('GATE_POSE_COMPLETE',flush=True)
