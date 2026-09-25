"""Compare actual browser and Cycles output at identical camera poses."""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'photo-review/rendering-comparison'
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',28)
small=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',20)
views=json.loads((ROOT/'photo-review/views.json').read_text())
pages=[]
for key in ['2445658-3','2445659-0']:
    room=next(v['room'] for v in views if v['key']==key)
    page=Image.new('RGB',(1980,885),'#faf9f4');draw=ImageDraw.Draw(page)
    draw.text((20,16),room+' · Actual rendering options',font=font,fill='#243e33')
    for x,title,path in [(20,'Browser · fast movement and automatic doors',DEST/f'{key}-browser.png'),
                         (1000,'Blender Cycles · comparison lighting and materials',ROOT/'photo-review/walkthrough'/f'{key}.png')]:
        draw.text((x,65),title,font=small,fill='#40544a')
        im=Image.open(path).convert('RGB');assert im.size==(960,720)
        page.paste(im,(x,100))
    draw.text((20,837),'Identical camera framing. No retouching. Cycles viewport samples refine after movement; the live browser remains an approximation.',font=small,fill='#40544a')
    page.save(DEST/f'{key}-comparison.jpg',quality=94);pages.append(page)
pages[0].save(ROOT/'output-walkthrough/Rendering options.pdf',save_all=True,append_images=pages[1:],resolution=144)
print('RENDERING_OPTIONS',len(pages))
