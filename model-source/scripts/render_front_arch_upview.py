"""Literal +35-degree view of the landing arch from its original panorama station."""
import os
from pathlib import Path
os.environ['ASHLEY_VARIANT']='walkthrough'
os.environ['ASHLEY_MODEL_FILE']='photo-review/front-arch-proof/Front arch proof.blend'
os.environ['ASHLEY_RENDER_DIR']='front-arch-proof/proposed'
os.environ['ASHLEY_VIEWS']='none'
exec(compile(Path(__file__).with_name('render_photo_views.py').read_text(),'<photo-render>','exec'))
v=next(v for v in views if v['key']=='2445669-2');pitch=math.radians(35)
camera.location=v['position'];direction=Vector(v['direction'])*math.cos(pitch)+Vector((0,0,math.sin(pitch)));camera.rotation_euler=direction.to_track_quat('-Z','Y').to_euler();camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(v['horizontal_fov']);scene.render.resolution_x=v['width'];scene.render.resolution_y=v['height'];scene.render.filepath=str(out/'2445669-arch.png');bpy.ops.render.render(write_still=True)
