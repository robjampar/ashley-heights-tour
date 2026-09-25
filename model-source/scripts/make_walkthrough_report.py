"""Direct photo/render pairs; original photographs stay unretouched."""
from pathlib import Path
import json,textwrap
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough';REND=ROOT/'photo-review/walkthrough';PAIRS=ROOT/'photo-review/walkthrough-pairs';PAIRS.mkdir(exist_ok=True)
views=json.loads((ROOT/'photo-review/views.json').read_text())
selected=views
font='/System/Library/Fonts/Supplemental/Arial.ttf';head=ImageFont.truetype(font,32);label=ImageFont.truetype(font,22);small=ImageFont.truetype(font,18)
pages=[]
for i,v in enumerate(selected):
 p=Image.new('RGB',(2000,940),'#faf9f4');d=ImageDraw.Draw(p)
 d.text((30,20),f"Ashley Heights · {v['room']}",font=head,fill='#263d34')
 d.text((30,69),'ORIGINAL PHOTOGRAPH',font=label,fill='#58665b');d.text((1020,69),'R5 · BLENDER RENDER',font=label,fill='#58665b')
 for x,path in[(30,Path(v['source'])),(1020,REND/(v['key']+'.png'))]:
  a=Image.open(path).convert('RGB');a.thumbnail((950,720),Image.Resampling.LANCZOS);p.paste(a,(x+(950-a.width)//2,106+(720-a.height)//2))
 note='View '+v['key']+' · Estimated camera position; perspective, geometry and detail differences remain visible.'
 if v['key'].startswith('listing-'):note+=' Agent listing photo.'
 d.text((30,850),note,font=small,fill='#59675f')
 d.text((30,885),'Printed room dimensions checked. Heights, site placement, landscaping and decorative details remain inferred/simplified.',font=small,fill='#59675f')
 d.text((1890,910),f'{i+1}/{len(selected)}',font=small,fill='#59675f');p.save(PAIRS/(v['key']+'.jpg'),quality=91);pages.append(p)
pages[0].save(OUT/'Photo comparison.pdf',save_all=True,append_images=pages[1:],resolution=144)
# Review contact sheets, still pairing the unedited photograph and actual render.
for start in range(0,len(selected),6):
 im=Image.new('RGB',(1600,6*385),'white')
 for j,v in enumerate(selected[start:start+6]):
  a=Image.open(PAIRS/(v['key']+'.jpg'));a.thumbnail((800,376));im.paste(a,((j%2)*800,(j//2)*385))
 im=im.crop((0,0,1600,3*385));im.save(PAIRS/f'contact-{start//6}.jpg',quality=88)
report={'revision':'R5','pages':len(selected),'views':[v['key']for v in selected],'source_panorama_ids':sorted(set(v['id']for v in selected if v['id']<900000)),'listing_photos':['00','02'],'comparison':'Original photographs alongside literal model renders; no generated reference photography.'}
(OUT/'photo-review-validation.json').write_text(json.dumps(report,indent=2));print('PHOTO_COMPARISONS',len(pages))
