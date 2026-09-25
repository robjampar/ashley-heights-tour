"""Isolated camera trials: never changes the saved model or canonical poses."""
import os
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
os.environ['ASHLEY_VARIANT'] = 'walkthrough'
os.environ['ASHLEY_RENDER_DIR'] = 'pose-audit-bedroom4'
source = (ROOT / 'scripts/render_photo_views.py').read_text()
exec(compile(source.split('views=json.loads')[0], str(ROOT / 'scripts/render_photo_views.py'), 'exec'))
scene.cycles.samples = 16
views = [v for v in json.loads((ROOT / 'photo-review/views.json').read_text()) if v['id'] == 2445676]
proposal = json.loads((ROOT / 'photo-review/pose-audit-bedroom4/proposed-pose.json').read_text())
proposed = {v['key']: v for v in proposal['proposed_views']}
for variant in ('baseline', 'candidate', 'candidate_original_z'):
    folder = ROOT / 'photo-review/pose-audit-bedroom4' / variant
    folder.mkdir(exist_ok=True)
    for original in views:
        v = dict(original)
        if variant != 'baseline':
            v.update(proposed[v['key']])
        if variant == 'candidate_original_z':
            v['position'] = [*v['position'][:2], original['position'][2]]
        camera.location = v['position']
        camera.rotation_euler = Vector(v['direction']).to_track_quat('-Z', 'Y').to_euler()
        camera.data.type = 'PERSP'
        camera.data.sensor_fit = 'HORIZONTAL'
        camera.data.angle = math.radians(v['horizontal_fov'])
        scene.render.resolution_x = v['width']
        scene.render.resolution_y = v['height']
        scene.render.filepath = str(folder / (v['key'] + '.png'))
        bpy.ops.render.render(write_still=True)
        print('TRIAL_DONE', variant, v['key'], flush=True)
print('ALL_TRIALS_DONE', flush=True)
