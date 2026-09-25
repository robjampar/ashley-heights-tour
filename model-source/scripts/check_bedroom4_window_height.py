"""Read-only interior/exterior cross-check before changing a window head."""
import json
import math
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'photo-review/pose-audit-bedroom4'
# Manually identified on listing00, the same unmodified 1024 x 683 image used
# for the facade comparison. These are approximate, not surveyed controls.
world_corners = np.array([[0, 0], [13.98, 0], [0, 5.35], [13.98, 5.35]])
image_corners = np.array([[318, 409], [722, 380], [314, 202], [738, 257]])
windows = {
    'Bedroom 4': [[359, 223], [448, 232], [359, 266], [448, 275]],
    'Bedroom 2': [[644, 257], [696, 263], [643, 293], [696, 298]],
}
matrix, rhs = [], []
for (x, z), (u, v) in zip(world_corners, image_corners):
    matrix.extend([[x, z, 1, 0, 0, 0, -u*x, -u*z],
                   [0, 0, 0, x, z, 1, -v*x, -v*z]])
    rhs.extend([u, v])
homography = np.r_[np.linalg.solve(matrix, rhs), 1].reshape(3, 3)
inverse = np.linalg.inv(homography)
rectified = {}
for name, points in windows.items():
    homogeneous = np.array([[u, v, 1] for u, v in points]) @ inverse.T
    xz = homogeneous[:, :2] / homogeneous[:, 2:]
    rectified[name] = {'source_pixels_tl_tr_bl_br': points,
                       'approximate_rectified_xz_m': xz.tolist(),
                       'head_z_m': xz[:2, 1].tolist(), 'sill_z_m': xz[2:, 1].tolist(),
                       'height_m': (xz[:2, 1] - xz[2:, 1]).tolist()}

listing = next(v for v in json.loads((ROOT / 'photo-review/views.json').read_text()) if v['key'] == 'listing-00')
eye = np.array(listing['position'])
forward = np.array(listing['direction']); forward /= np.linalg.norm(forward)
right = np.cross(forward, [0, 0, 1]); right /= np.linalg.norm(right)
up = np.cross(right, forward)
focal = 512 / math.tan(math.radians(listing['horizontal_fov'] / 2))
head_trials = []
for head in (5.0, 4.63):
    pixels = []
    for x in (1.12756, 3.38267):
        delta = np.array([x, -.07, head]) - eye
        pixels.append([512 + focal * (delta @ right) / (delta @ forward),
                       341.5 - focal * (delta @ up) / (delta @ forward)])
    # First world x lies on the left in this photograph.
    error = np.array(pixels)[:, 1] - np.array(windows['Bedroom 4'])[:2, 1]
    head_trials.append({'world_head_z_m': head, 'projected_head_pixels': pixels,
                        'vertical_error_px': error.tolist(),
                        'head_vertical_rms_px': float(np.sqrt(np.mean(error**2)))})

result = {
    'decision': 'Retain current native window geometry; proposed head-only correction is contradicted by exterior evidence.',
    'current': {'sill_z_m': 3.55, 'head_z_m': 5.0, 'opening_width_m': 2.2551136187838225},
    'interior_only_hypothesis': {'sill_z_m': 3.55, 'head_z_m': 4.63,
                                'basis': 'Candidate camera makes interior glass sill match, but glass head appears about117 pixels too high.'},
    'front_listing_homography': {'world_xz_corners_m': world_corners.tolist(),
                                'source_corners_pixels': image_corners.tolist(),
                                'matrix': homography.tolist()},
    'rectified_windows': rectified, 'fixed_listing_camera_head_trials': head_trials,
    'limitations': 'Facade control points, roof height and camera pose are approximate. Treat these values as '
                   'a contradiction check, not new exact dimensions. They show that the left and right first-floor '
                   'window heads are approximately level and near the current5.0m world height. Sourcebed4 appears '
                   'shorter partly through a higher sill; lowering only its head while preserving its sill is not '
                   'supported across both references. Interior and exterior aspect estimates remain inconsistent.',
    'native_or_metadata_changes': 'None. No fill panels, altered wall apertures, changed framing, sill, width, mullion X or camera edits.',
}
(OUT / 'window-height-crosscheck.json').write_text(json.dumps(result, indent=2))
image = Image.open(ROOT / 'source/listing-photos/00.jpg').convert('RGB')
draw = ImageDraw.Draw(image)
for name, points in windows.items():
    order = [points[i] for i in (0, 1, 3, 2, 0)]
    draw.line(order, fill='yellow', width=2)
    for point in points:
        x, y = point
        draw.ellipse((x-3, y-3, x+3, y+3), outline='yellow', width=2)
    draw.text((points[0][0], points[0][1]-16), name, fill='yellow')
draw.text((8, 8), 'Analysis overlay only: approximate source frame corners; original JPEG unchanged', fill='white')
image.save(OUT / 'window-facade-landmarks.png')
(OUT / 'Window height crosscheck.md').write_text('''# Bedroom4 window-height cross-check

**Keep the native window geometry unchanged for this release.** Lowering just the head while holding the sill fixed improves one interior projection but is contradicted by the front listing photo.

An approximate rectification of listing00 places the Bedroom4 head at4.97–5.00m and Bedroom2 at4.91–4.92m. They are approximately level and close to the current5.00m heads. The Bedroom4 frame appears1.11–1.22m high, with its sill at3.78–3.86m; these estimated facade values do not support lowering its head to4.63m while retaining the3.55m sill.

Using the existing fitted listing camera, the current Bedroom4 head has approximately6.0px vertical RMS error; lowering it to4.63m produces approximately8.1px error in the opposite direction. The camera/rectification are approximate, so these are a contradiction check rather than replacement surveyed dimensions.

The interior-only result and exterior frame aspect remain inconsistent. No wall opening metadata, native framing, sill, width, mullion positions or camera entries were changed. No artificial infill was introduced. The source JPEG remains untouched; `window-facade-landmarks.png` is a labelled analysis copy. Exact inputs and residuals are in `window-height-crosscheck.json`.
''')
print(json.dumps({'rectified_windows': rectified, 'head_trials': head_trials, 'decision': result['decision']}, indent=2))
