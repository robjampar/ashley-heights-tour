"""Arrange untouched source photos and real browser captures for this pass."""
from pathlib import Path
import json
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'photo-review/detail-pass-v2'
views=json.loads((ROOT/'photo-review/views.json').read_text())
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',22)
small=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',15)
pages=[]
for key in ['listing-02','2445658-3','2445659-3','2445662-1','2445683-3']:
 v=next(v for v in views if v['key']==key)
 sheet=Image.new('RGB',(1500,510),'#f8f6ef');draw=ImageDraw.Draw(sheet)
 draw.text((16,12),v['room']+' · '+key,font=font,fill='#263e34')
 for i,(label,path) in enumerate([
  ('Original photograph',Path(v['source'])),
  ('Previous browser model',OUT/'before'/f'{key}-browser.png'),
  ('Refined browser model',OUT/'after'/f'{key}-browser.png')]):
  draw.text((i*500+16,46),label,font=small,fill='#40554a')
  im=Image.open(path).convert('RGB');im.thumbnail((480,390),Image.Resampling.LANCZOS)
  sheet.paste(im,(i*500+(500-im.width)//2,78+(390-im.height)//2))
 draw.text((16,480),'Whole frames at the same estimated camera pose. Source photos are unretouched; unmeasured detail and lighting remain approximations.',font=small,fill='#40554a')
 sheet.save(OUT/f'{key}-comparison.jpg',quality=95);pages.append(sheet)
pages[0].save(ROOT/'output-walkthrough/Detail refinements.pdf',save_all=True,append_images=pages[1:],resolution=144)
print('DETAIL_COMPARISONS',len(pages))
