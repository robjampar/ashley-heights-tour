"""Literal 50% photo/render overlays; no warping, feature invention or repainting."""
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'photo-review/alignment-overlays'
OUT.mkdir(exist_ok=True)
views=json.loads((ROOT/'photo-review/views.json').read_text())
native=ROOT/'output-walkthrough/Ashley Heights.blend'
stamp=datetime.fromtimestamp(native.stat().st_mtime,ZoneInfo('Europe/London')).strftime('%d %b %Y %H:%M %Z')
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',22)
small=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',17)
selected={'2445658-'+str(i)for i in range(4)}|{'2445670-'+str(i)for i in range(4)}|{'2445675-'+str(i)for i in range(4)}|{'2445674-'+str(i)for i in range(4)}|{'2445659-0','2445688-0','2445662-3','2445663-3','2445659-2','2445669-0','2445657-1','2445676-0','2445676-1','2445676-2','2445676-3','2445684-1','2445684-3','2445661-2','2445667-0','listing-00','listing-02'}
pages=[]
for view in views:
    path=ROOT/'photo-review/walkthrough'/f"{view['key']}.png"
    assert path.stat().st_mtime>native.stat().st_mtime,view['key']
    original=Image.open(view['source']).convert('RGB')
    render=Image.open(path).convert('RGB')
    # Same whole-frame framing. Listing originals can have a larger raster;
    # only resample their complete frame to the render's pixel dimensions.
    if original.size!=render.size:
        assert abs(original.width/original.height-render.width/render.height)<.003
        original=original.resize(render.size,Image.Resampling.LANCZOS)
    overlay=Image.blend(original,render,.5)
    overlay.save(OUT/f"{view['key']}-overlay.jpg",quality=93)
    if view['key'] not in selected:continue
    w,h=original.size
    board=Image.new('RGB',(3*w,h+114),'#f8f6ef');draw=ImageDraw.Draw(board)
    for i,(label,im)in enumerate([('Original photograph',original),('50% overlay',overlay),('Current Blender render',render)]):
        draw.text((i*w+14,12),f"{view['key']} · {label}",font=font,fill='#243e33')
        board.paste(im,(i*w,56))
    draw.text((14,h+72),f'Model saved {stamp}. Shared framing; camera positions and unlabelled dimensions remain estimates.',font=small,fill='#40544a')
    board.save(OUT/f"{view['key']}.jpg",quality=93);pages.append(board)
pages[0].save(ROOT/'output-walkthrough/Alignment overlays.pdf',save_all=True,append_images=pages[1:],resolution=144)
(OUT/'overlay-validation.json').write_text(json.dumps({'model_saved':stamp,'overlays':len(views),'review_pages':len(pages),
    'method':'Whole-frame 50% opacity blend of original source and literal Blender render. No perspective warp, local deformation, source repainting or synthetic reference photographs.'},indent=2))
print('ALIGNMENT_OVERLAYS',len(views),'PDF_PAGES',len(pages))
