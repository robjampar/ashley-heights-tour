"""Propose (never install) a structural-only fit to four existing panorama views."""
from pathlib import Path
import hashlib
import json
import math
import numpy as np
from PIL import Image, ImageDraw
from scipy.optimize import least_squares

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'photo-review/pose-audit-bedroom4'
OUT.mkdir(exist_ok=True)
raw = (ROOT / 'output-walkthrough/geometry.json').read_bytes()
geometry = json.loads(raw)
views = [v for v in json.loads((ROOT / 'photo-review/views.json').read_text()) if v['id'] == 2445676]
focal = 480 / math.tan(math.radians(43))
old = np.array([*views[0]['position'], math.atan2(views[0]['direction'][1], views[0]['direction'][0])])


def bounds(name):
    obj = next(o for o in geometry['objects'] if o['object_name'] == name)
    vertices = np.array(obj['vertices'])
    return vertices.min(axis=0), vertices.max(axis=0)


def landmark(label, view, pixel, world, components=(0,), sigma=(6, 25)):
    return {'label': label, 'view': view, 'pixel': list(pixel), 'world_m': list(world),
            'components': list(components), 'sigma_pixels': list(sigma)}


# These are hand-picked on the untouched 960 x 720 source projections. Wall
# corners and jambs provide horizontal bearings; unknown cornice heights are
# not smuggled into the solve as supposedly measured ceiling landmarks.
# Window glazing/mullions constrain horizontal bearings only: their vertical
# sizes were estimated in the reconstruction and disagree with the photograph.
hall_left_lo, hall_left_hi = bounds('Bedroom 4 hall | door architrave')
hall_right_lo, hall_right_hi = bounds('Bedroom 4 hall | door architrave.001')
en_lo, en_hi = bounds('Bedroom 4 en suite divider | door architrave')
hall_head_lo, hall_head_hi = bounds('Bedroom 4 hall | door architrave head')
en_head_lo, en_head_hi = bounds('Bedroom 4 en suite divider | door architrave head')
landmarks = [
    landmark('SW corner', 0, (200, 300), (.115, .115, 4.28)),
    landmark('NW corner', 0, (803, 300), (.115, 3.125, 4.28)),
    landmark('Hall left jamb', 1, (929, 420), (hall_left_hi[0], hall_left_lo[1], 4.28), sigma=(9, 25)),
    landmark('En suite return corner', 2, (287, 380), (4.215, 2.255, 4.28)),
    landmark('En suite north jamb', 2, (537, 440), (en_lo[0], en_lo[1], 4.28), sigma=(9, 25)),
    landmark('Hall right jamb', 2, (79, 440), (hall_right_lo[0], hall_right_lo[1], 4.28), sigma=(12, 25)),
]
for index, u in enumerate((445, 635, 823)):
    lo, hi = bounds(f'First front casement mullion.{index + 3:03}')
    middle = (lo + hi) / 2
    landmarks.append(landmark(f'Window mullion {index + 1}', 3, (u, 410), middle))
landmarks += [
    landmark('Hall frame head', 2, (79, 187),
             (hall_right_lo[0], hall_right_lo[1], hall_head_lo[2]), (1,), (12, 25)),
    landmark('Hall frame foot', 2, (79, 676),
             (hall_right_lo[0], hall_right_lo[1], hall_right_lo[2]), (1,), (12, 25)),
    landmark('En suite frame head', 2, (537, 150),
             (en_lo[0], en_lo[1], en_head_lo[2]), (1,), (9, 25)),
]


def project(pose, item):
    yaw = pose[3] - item['view'] * math.pi / 2
    forward = np.array([math.cos(yaw), math.sin(yaw), 0])
    right = np.array([math.sin(yaw), -math.cos(yaw), 0])
    delta = np.asarray(item['world_m']) - pose[:3]
    depth = delta @ forward
    return np.array([480 + focal * (delta @ right) / depth,
                     360 - focal * delta[2] / depth])


def residuals(pose, items, weighted=True):
    errors = []
    for item in items:
        delta = project(pose, item) - item['pixel']
        for component in item['components']:
            errors.append(delta[component] / (item['sigma_pixels'][component] if weighted else 1))
    return np.array(errors)


def solve(items, initial=old):
    return least_squares(lambda p: residuals(p, items), initial,
                         bounds=([1.8, .8, 3.85, -3.4], [3.3, 2.4, 4.65, -2.8]),
                         loss='soft_l1', f_scale=1).x


candidate = solve(landmarks)
per_view = []
for view in range(4):
    items = [item for item in landmarks if item['view'] == view and 0 in item['components']]
    before = [project(old, item)[0] - item['pixel'][0] for item in items]
    after = [project(candidate, item)[0] - item['pixel'][0] for item in items]
    per_view.append({'view': view, 'horizontal_landmark_count': len(items),
                     'before_horizontal_rms_px': float(np.sqrt(np.mean(np.square(before)))),
                     'candidate_horizontal_rms_px': float(np.sqrt(np.mean(np.square(after))))})

# Hold out each compass direction. This exposes contradictions between doorway
# placement and other structural bearings instead of concealing them in one RMS.
held_out = []
for view in range(4):
    kept = [item for item in landmarks if item['view'] != view or item['components'] == [1]]
    fit = solve(kept)
    checks = [item for item in landmarks if item['view'] == view and 0 in item['components']]
    errors = [project(fit, item)[0] - item['pixel'][0] for item in checks]
    held_out.append({'held_out_view': view, 'pose': fit.tolist(),
                     'held_out_horizontal_rms_px': float(np.sqrt(np.mean(np.square(errors))))})

residual_table = []
for item in landmarks:
    residual_table.append({**item, 'before_pixel': project(old, item).tolist(),
                           'candidate_pixel': project(candidate, item).tolist(),
                           'before_error_px': (project(old, item) - item['pixel']).tolist(),
                           'candidate_error_px': (project(candidate, item) - item['pixel']).tolist()})

proposed_views = []
for view in views:
    yaw = candidate[3] - view['view'] * math.pi / 2
    proposed_views.append({'key': view['key'], 'position': candidate[:3].tolist(),
                           'direction': [math.cos(yaw), math.sin(yaw), 0],
                           'horizontal_fov': 86})
report = {
    'status': 'Candidate for a four-view render experiment; not installed automatically.',
    'geometry_sha256': hashlib.sha256(raw).hexdigest(),
    'constraints': 'One camera centre and one yaw shared by four fixed 86-degree source projections. '
                   'No furniture, room sizes, openings, FOV, pitch or roll are changed by this fit.',
    'landmark_policy': 'Manual horizontal bearings of room corners, doorway trim edges and three window '
                       'mullions. Height uses three doorway head/foot observations, with lower weight because '
                       'head heights are estimated. Ceiling/cornice height and window vertical size excluded '
                       'from fitting because they are not reliable measured controls.',
    'old_pose_xyz_yaw': old.tolist(), 'candidate_pose_xyz_yaw': candidate.tolist(),
    'translation_m': (candidate[:3] - old[:3]).tolist(),
    'yaw_change_degrees': float(math.degrees(candidate[3] - old[3])),
    'per_direction_horizontal_checks': per_view, 'leave_one_direction_out': held_out,
    'landmarks': residual_table, 'proposed_views': proposed_views,
    'recommendation': 'The small camera correction improves all four directional bearing fits, but '
                      'east-facing doorway residuals remain much larger than manual marking uncertainty. '
                      'A large southward shift is not supported. Use a candidate render comparison before '
                      'adoption; do not distort furniture or room geometry to force this pose fit.',
}
(OUT / 'proposed-pose.json').write_text(json.dumps(report, indent=2))

for view in range(4):
    image = Image.open(ROOT / f'photo-review/originals/2445676-{view}.jpg').convert('RGB')
    draw = ImageDraw.Draw(image)
    for item in [item for item in residual_table if item['view'] == view]:
        x, y = item['pixel']
        draw.ellipse((x - 5, y - 5, x + 5, y + 5), outline=(255, 255, 0), width=2)
        # Horizontal-only landmarks are labelled with full-height bearing lines;
        # their arbitrary marker Y is explicitly not treated as an observation.
        if item['components'] == [0]:
            draw.line((x, 0, x, 720), fill=(255, 255, 0), width=1)
            for key, colour in [('before_pixel', (255, 70, 70)), ('candidate_pixel', (30, 255, 220))]:
                px = item[key][0]
                draw.line((px, y - 30, px, y + 30), fill=colour, width=3)
        tx = min(750, max(6, x + 8))
        draw.rectangle((tx - 2, y - 14, tx + len(item['label']) * 6 + 2, y + 1), fill='black')
        draw.text((tx, y - 13), item['label'], fill='yellow')
    draw.rectangle((0, 0, 960, 20), fill='black')
    draw.text((8, 4), 'Source photo with analysis overlay: yellow=observed; red=old bearing; cyan=candidate bearing', fill='white')
    image.save(OUT / f'landmarks-{view}.png')
    boxes = [(0, 110, 960, 390), (760, 220, 960, 570), (0, 70, 620, 715), (300, 290, 950, 540)]
    image.crop(boxes[view]).save(OUT / f'landmark-crop-{view}.png')

lines = ['# Bedroom 4 structural camera-pose audit', '',
         'The fit proposes a small camera correction, not a room/furniture change. Original photos and '
         'canonical views.json were left untouched.', '',
         f'Old XYZ: `{old[:3].round(4).tolist()}`; candidate XYZ: `{candidate[:3].round(4).tolist()}`.',
         f'Translation: `{(candidate[:3]-old[:3]).round(4).tolist()}` m; yaw change '
         f'{math.degrees(candidate[3]-old[3]):.3f} degrees.', '',
         '| View | Horizontal landmarks | Old RMS px | Candidate RMS px |',
         '|---|---:|---:|---:|']
for row in per_view:
    lines.append(f"| {row['view']} | {row['horizontal_landmark_count']} | {row['before_horizontal_rms_px']:.1f} | {row['candidate_horizontal_rms_px']:.1f} |")
lines += ['', report['recommendation'], '', report['landmark_policy'], '',
          'See proposed-pose.json for individual residuals, held-out direction checks and proposed view entries. '
          'The labelled PNGs are copies with analysis marks; the original source JPEGs are unmodified. '
          'The remaining east-jamb residuals mean this is not a verified exact camera calibration.']
(OUT / 'Pose audit.md').write_text('\n'.join(lines) + '\n')
print(json.dumps({k: report[k] for k in ('old_pose_xyz_yaw', 'candidate_pose_xyz_yaw', 'translation_m',
                                       'yaw_change_degrees', 'per_direction_horizontal_checks',
                                       'leave_one_direction_out')}, indent=2))
