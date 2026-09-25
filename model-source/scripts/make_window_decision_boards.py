"""Readable source / A / B / C rows from actual Blender alternative renders."""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'photo-review/decision-window'
manifest = json.loads((OUT / 'options.json').read_text())
font_path = '/System/Library/Fonts/Supplemental/Arial.ttf'
font = lambda size: ImageFont.truetype(font_path, size)
cell_width = 640
background = '#f4f2ed'
rows = []
source = {'interior': ROOT / 'photo-review/originals/2445676-3.jpg',
          'facade': ROOT / 'source/listing-photos/00.jpg'}
for view in ('interior', 'facade'):
    board = Image.new('RGB', (2560, 695), background)
    draw = ImageDraw.Draw(board)
    title = 'Bedroom 4 window — inside' if view == 'interior' else 'The same window — front of house'
    draw.text((20, 14), title, font=font(32), fill='#202b2b')
    draw.text((20, 56), 'Compare the original with A, B and C. No option has been applied to your model.',
              font=font(23), fill='#455050')
    choices = [(None, 'Original photograph', 'Reference; no measured window heights')]
    choices += [(option['label'], f"{option['label']}  {option['title']}",
                 f"Bottom {round(option['sill_above_floor_m']*100)} cm  •  Top {round(option['head_above_floor_m']*100)} cm above floor")
                for option in manifest['options']]
    for i, (label, caption, dimensions) in enumerate(choices):
        x = i * cell_width
        draw.rectangle((x+5, 91, x+635, 640), fill='white', outline='#c7cdca', width=2)
        draw.text((x+18, 102), caption, font=font(27), fill='#153d38')
        path = source[view] if label is None else OUT / f'option-{label}-{view}.png'
        image = Image.open(path).convert('RGB')
        if view == 'facade':
            # Identical image-space crop for the source and all fixed-camera
            # facade renders. No perspective warping or source retouching.
            image = image.crop((327, 190, 479, 304))
        image = image.resize((624, 468), Image.Resampling.LANCZOS)
        board.paste(image, (x+8, 141))
        draw.text((x+17, 613), dimensions, font=font(19), fill='#2c3533')
    draw.text((20, 656), 'Dimensions are proposed opening heights. Cameras and unlabelled heights are inferred; the two photo views disagree.',
              font=font(22), fill='#555d59')
    board.save(OUT / f'Window options — {view}.png')
    board.save(OUT / f'Window options — {view}.jpg', quality=96)
    rows.append(board)
combined = Image.new('RGB', (2560, 1390), background)
combined.paste(rows[0], (0, 0)); combined.paste(rows[1], (0, 695))
combined.save(OUT / 'Window options — inside and outside.png')
rows[0].save(OUT / 'Window options.pdf', save_all=True, append_images=rows[1:], resolution=200)
(OUT / 'README.md').write_text('''# Bedroom 4 window options

The image rows show **Original photograph → A → B → C** with the same camera and lighting across all three model options.

| Option | Sill above floor | Head above floor | Opening height |
|---|---:|---:|---:|
| A — current | 0.75 m | 2.20 m | 1.45 m |
| B — lower top | 0.75 m | 1.83 m | 1.08 m |
| C — higher bottom | 1.04 m | 2.20 m | 1.16 m |

The inside and front photographs disagree with the current reconstruction in different ways. Camera positions and unlabelled vertical dimensions are inferred; none of these options is asserted to be surveyed truth. No option has been applied to the saved model.

Each alternative was rendered from actual changed aperture geometry in an isolated Blender process. The wall below/above the opening, glazing, frames and mullions were changed together; no panel was placed over the existing window. The window width and horizontal mullion positions were retained. `options.json` records the modified mesh list, true wall boundaries, camera basis and source model hash.

The original photos were only cropped/resized for the labelled comparison boards. Source JPEGs, the canonical Blender file and canonical camera data were not modified. Pending the user's choice, there are no further geometry changes to these alternatives.
''')
print('DECISION_BOARDS_READY', OUT)
