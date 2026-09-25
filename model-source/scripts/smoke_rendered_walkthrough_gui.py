"""Bounded UI smoke test; run only inside a new temporary Blender process."""
import contextlib
import hashlib
import io
import json
import math
import os
import runpy
import time
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'photo-review/rendered-walkthrough-gui'
OUT.mkdir(exist_ok=True)
report = {'pid': os.getpid(), 'started': time.time(), 'status': 'running',
          'tested_file': bpy.data.filepath, 'automatic_walk_modal_started': False,
          'simulated_w_movement_verified': False, 'escape_verified': False,
          'tested_file_sha256': hashlib.sha256(Path(bpy.data.filepath).read_bytes()).hexdigest(),
          'source_native_sha256': hashlib.sha256((ROOT/'output-walkthrough/Ashley Heights.blend').read_bytes()).hexdigest(),
          'startup_script_sha256': hashlib.sha256((ROOT/'scripts/start_rendered_walkthrough.py').read_bytes()).hexdigest()}
# This companion shell script opens the tested file and invokes the setup
# script; the smoke test additionally supplies a window size and event flag.
report['companion_launcher_sha256'] = hashlib.sha256((ROOT/'Open Rendered Walkthrough.command').read_bytes()).hexdigest()
ns = runpy.run_path(str(ROOT / 'scripts/start_rendered_walkthrough.py'))
if bpy.app.timers.is_registered(ns['begin_walk']):
    bpy.app.timers.unregister(ns['begin_walk'])
window = next(iter(bpy.context.window_manager.windows))
area = max((a for a in window.screen.areas if a.type == 'VIEW_3D'),
           key=lambda a: a.width * a.height)
region = next(r for r in area.regions if r.type == 'WINDOW')
rv3d = area.spaces.active.region_3d
cx, cy = area.x + area.width//2, area.y + area.height//2

def eye():
    return list(rv3d.view_location + rv3d.view_rotation @ Vector((0,0,rv3d.view_distance)))

def persist():
    (OUT/'smoke-test.json').write_text(json.dumps(report, indent=2))

def event(kind, value):
    window.event_simulate(type=kind, value=value, x=cx, y=cy)

def quit_process():
    report['finished'] = time.time()
    persist()
    bpy.ops.wm.quit_blender()
    return None

def begin():
    try:
        report['eye_before'] = eye()
        event('MOUSEMOVE', 'NOTHING')
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            ns['begin_walk']()
        report['modal_operator_log'] = output.getvalue()
        print(output.getvalue(), flush=True)
        report['automatic_walk_modal_started'] = 'RUNNING_MODAL' in output.getvalue()
        persist()
        bpy.app.timers.register(press_w, first_interval=2)
    except Exception as exc:
        report['error'] = repr(exc)
        report['status'] = 'failed'
        persist()
        bpy.app.timers.register(quit_process, first_interval=1)
    return None

def press_w():
    try:
        event('W', 'PRESS')
        bpy.app.timers.register(release_w, first_interval=.7)
    except Exception as exc:
        report['movement_error'] = repr(exc)
        bpy.app.timers.register(capture, first_interval=20)
    return None

def release_w():
    event('W', 'RELEASE')
    report['eye_after_w'] = eye()
    distance = (Vector(report['eye_after_w'])-Vector(report['eye_before'])).length
    report['movement_distance_m'] = distance
    report['simulated_w_movement_verified'] = .03 < distance < 3
    persist()
    event('ESC', 'PRESS')
    event('ESC', 'RELEASE')
    bpy.app.timers.register(check_escape, first_interval=2)
    return None

def check_escape():
    report['eye_after_escape'] = eye()
    distance = (Vector(report['eye_after_escape'])-Vector(report['eye_before'])).length
    report['escape_return_distance_m'] = distance
    report['escape_verified'] = report['simulated_w_movement_verified'] and distance < .01
    persist()
    bpy.app.timers.register(capture, first_interval=20)
    return None

def capture():
    try:
        with bpy.context.temp_override(window=window, area=area, region=region):
            result = bpy.ops.screen.screenshot(filepath=str(OUT/'rendered-hall.png'), check_existing=False)
        report['screenshot_operator_result'] = sorted(result)
        report['screenshot_path'] = str(OUT/'rendered-hall.png')
        report['viewport_shading'] = area.spaces.active.shading.type
        report['renderer'] = window.scene.render.engine
        report['status'] = 'passed' if all(report[k] for k in (
            'automatic_walk_modal_started', 'simulated_w_movement_verified', 'escape_verified')) else 'incomplete'
    except Exception as exc:
        report['screenshot_error'] = repr(exc)
        report['status'] = 'incomplete'
    persist()
    bpy.app.timers.register(quit_process, first_interval=1)
    return None

persist()
bpy.app.timers.register(begin, first_interval=5)
# This timer only belongs to this new process and never saves a file.
bpy.app.timers.register(quit_process, first_interval=55)
