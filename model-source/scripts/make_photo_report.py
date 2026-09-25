"""Create literal photo/render comparison sheets and a local PDF review pack."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json
ROOT=Path(__file__).resolve().parents[1];P=ROOT/'photo-review';OUT=ROOT/'output-final'
try:
 font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',22)
 titlefont=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',30)
except OSError:font=titlefont=ImageFont.load_default()
views=json.loads((P/'views.json').read_text());pages=[];directory=[]
notes={
 '2445658-3':'Stairs now rise towards the front entrance and turn onto the upper landing. Tread count and height remain inferred.',
 '2445670-3':'Landing opening, balustrade and front stair connection corrected. Compare circulation before decorative detail.',
 '2445659-0':'Three arched fanlights and double French doors replace rectangular glazing. Table/chairs repositioned from photos.',
 '2445662-0':'Raised-panel cabinets, rear glazing, double sink, gas hob and undercounter fridge reconstructed.',
 '2445666-0':'Seating, fireplace, curtains, wall lights and ornamental ceiling added from the original views.',
 '2445673-0':'Bed turned to the south wall. East-wall wardrobe, drawers and wall pictures repositioned.',
 '2445696-1':'Outbuilding rotated to face west across the lawn. Site position fitted from photo bearings, not surveyed.',
 '2445688-3':'Outbuilding moved to the east side of the garden. Original source inset plan did not specify its site position.',
 '2445671-0':'Bathroom window proportions, glazing bars and bath position revised from this photo and the fixture plan.',
 '2445675-2':'Shower moved into the south recess; basin and WC checked against the plan and other views.',
 '2445683-3':'Front elevation: estimated heights, pitched gable, porch and garage panels compared with the driveway photograph.',
 '2445688-0':'Raised camera pose estimated from facade landmarks. Eaves, roof pitch and window positions compared.',
 '2445676-0':'Bed rotated to the west wall; wardrobe and curtains repositioned.',
}
(P/'comparisons').mkdir(exist_ok=True)
for v in views:
 key=v['key'];new=P/'final'/f'{key}.png'
 if not new.exists():continue
 old=P/'baseline'/f'{key}.png';hasold=False;cols=2;width=960*cols
 page=Image.new('RGB',(width,850),'#ffffff');d=ImageDraw.Draw(page)
 d.text((22,15),f"{v['room']}  |  source {key}",font=titlefont,fill='#20323d')
 imgs=[('ORIGINAL PHOTO',Path(v['source']))]
 if hasold:imgs.append(('PREVIOUS MODEL',old))
 imgs.append(('REVISED BLENDER RENDER',new))
 for i,(label,path) in enumerate(imgs):
  page.paste(Image.open(path).convert('RGB').resize((960,720)),(i*960,85));d.text((i*960+22,53),label,font=font,fill='#285e65')
 note=notes.get(key,'Editable reconstruction. This comparison does not establish survey accuracy or an exact photographic match.')
 d.text((22,816),note,font=font,fill='#20323d')
 filename=f"{key} - {v['room'].replace('/',' ')}.jpg";page.save(P/'comparisons'/filename,quality=93)
 # Uniform paper proportions in the PDF; two-image pages retain appropriate aspect ratio.
 pdfpage=Image.new('RGB',(1920,850),'white');scale=min(1,1920/width)
 im=page.resize((int(page.width*scale),int(page.height*scale)));pdfpage.paste(im,((1920-im.width)//2,0));pages.append(pdfpage)
 directory.append({'key':key,'room':v['room'],'comparison':filename,'note':note,'includes_previous':hasold})
if pages:pages[0].save(OUT/'Photo comparison.pdf',save_all=True,append_images=pages[1:],resolution=160)
(P/'comparison-index.json').write_text(json.dumps(directory,indent=2))
print('Wrote',len(pages),'comparison pages')
