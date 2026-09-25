"""Configure this new Blender process and invoke stock Walk Navigation."""
import bpy

# Apply navigation/render preferences only within this new Blender process.
# A first GUI launch otherwise writes them automatically when quitting.
bpy.context.preferences.use_preferences_save = False
bpy.context.preferences.view.show_splash = False

# Blender can normalize saved RENDERED shading to SOLID while loading a file.
# Restore it explicitly in this new process, without modifying the master.
scene = bpy.data.scenes['01 Exterior']
for window in bpy.context.window_manager.windows:
    window.scene = scene
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type == 'VIEW_3D':
            space = area.spaces.active
            space.shading.type = 'RENDERED'
            space.overlay.show_overlays = False
            space.show_gizmo = False

try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    devices = [d for d in prefs.devices if d.type == 'METAL']
    for device in prefs.devices:
        device.use = device.type == 'METAL'
    scene.cycles.device = 'GPU' if devices else 'CPU'
except Exception:
    scene.cycles.device = 'CPU'
# Session-only preferences; never save or overwrite the user's preferences.
walk = bpy.context.preferences.inputs.walk_navigation
walk.walk_speed = 1.4
walk.view_height = 1.6
walk.use_gravity = False

attempts = 0
def begin_walk():
    global attempts
    attempts += 1
    for window in bpy.context.window_manager.windows:
        areas = [a for a in window.screen.areas if a.type == 'VIEW_3D']
        for area in sorted(areas, key=lambda a: a.width * a.height, reverse=True):
            region = next((r for r in area.regions if r.type == 'WINDOW'), None)
            if region is None:
                continue
            try:
                with bpy.context.temp_override(window=window, area=area, region=region):
                    result = bpy.ops.view3d.walk('INVOKE_DEFAULT')
                print('Rendered walkthrough navigation:', result)
                if 'RUNNING_MODAL' in result:
                    return None
            except RuntimeError as exc:
                print('Walk Navigation will remain available from the View menu:', exc)
    return 1.0 if attempts < 5 else None

if not bpy.app.background:
    bpy.app.timers.register(begin_walk, first_interval=2.0)
