"""Present actual seam renders and replayed circulation checks for local review."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon

ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'output-walkthrough'
g=json.loads((OUT/'geometry.json').read_text())
routes=json.loads((OUT/'walking-routes.json').read_text())
roof=json.loads((OUT/'roof-join-audit.json').read_text())
doors=json.loads((OUT/'circulation-current.json').read_text())
audit=json.loads((OUT/'dimension-audit.json').read_text())
fig,axes=plt.subplots(1,2,figsize=(15,9))
for floor,ax in enumerate(axes):
    for room in g['rooms']:
        if room['floor']==floor:
            ax.add_patch(Polygon(room['polygon_m'],facecolor='#f5f0e5',edgecolor='#adb4a7',lw=.6))
    for route in routes['routes']:
        if route['floor']!=floor or route['body_width_m']!=.50:continue
        points=route['path']
        if points:
            x,y=zip(*points);ax.plot(x,y,lw=1.5,alpha=.70)
            ax.plot(x[-1],y[-1],'o',ms=3)
            ax.annotate(route['room'],(x[-1],y[-1]),fontsize=6)
    ax.set_aspect('equal');ax.autoscale();ax.set_title(('Ground floor','First floor')[floor])
    ax.set_xlabel('East (m)');ax.set_ylabel('Rear (m)')
fig.suptitle('Replayed house and side-annex routes with a 0.50 m walker')
fig.tight_layout();fig.savefig(OUT/'Walking routes.png',dpi=140);plt.close(fig)

font='/System/Library/Fonts/Supplemental/Arial.ttf'
head=ImageFont.truetype(font,38);normal=ImageFont.truetype(font,23);small=ImageFont.truetype(font,19)
pages=[]
def page(title,subtitle):
    im=Image.new('RGB',(1800,1400),'#faf9f4');d=ImageDraw.Draw(im)
    d.text((40,30),title,font=head,fill='#243e33')
    d.text((40,89),subtitle,font=normal,fill='#58665b')
    return im,d
def insert(im,path,rect):
    img=Image.open(path).convert('RGB');x,y,w,h=rect;img.thumbnail((w,h),Image.Resampling.LANCZOS)
    im.paste(img,(int(x+(w-img.width)/2),int(y+(h-img.height)/2)))

im,d=page('Ashley Heights · detail and clearance review','Literal model renders and geometry checks; these checks do not establish photographic equivalence.')
insert(im,ROOT/'source/listing-photos/00.jpg',(40,145,840,570))
insert(im,ROOT/'photo-review/walkthrough/listing-00.png',(920,145,840,570))
d.text((45,735),'Original agent photograph',font=normal,fill='#243e33')
d.text((925,735),'Current Blender render',font=normal,fill='#243e33')
lines=[
    f"Roof: {roof['unfilled_wall_head_samples']} unfilled locations in {roof['total_wall_head_samples']} sampled wall-head joins; both porch supports connect.",
    f"Doorways: {doors['threshold_intrusion_count']} furniture intrusions across {doors['door_count']} checked thresholds.",
    f"Walking: {len(routes['routes'])} routes with 0.36 m and 0.50 m bodies, including both side-annex entrances.",
    'The upper gable, flat garage edge, porch and garden-building eaves have enclosed joins.',
    'The following close-up cameras are inspection views, not claimed matches to captured photo positions.',
    'Room spans remain constrained by the plan. Camera poses, heights, finishes and decorative details are estimated.',
    f"The selected model scope is {audit['area_checks'][-1]['model_internal_envelope_m2']:.2f} m² versus 290 m²; side annex is separately estimated at 5.83 m².",
    'The site remains 1,246 m² / 0.308 acres, approximately 2.6% above the user’s 0.3-acre reference.',
]
for i,line in enumerate(lines):d.text((45,825+i*57),line,font=normal if i<4 else small,fill='#34493f')
pages.append(im)
for names,title in [(['garage-front','garage-side','front-gable','gable-right'],'Garage and front gable joins'),
                    (['gable-left','porch-supports','balcony-soffit','garden-room-eaves'],'Porch, balcony and garden-building joins')]:
    im,d=page(title,'Eight model-only close-ups check the corrected edges from low and oblique positions.')
    for i,name in enumerate(names):
        x=40+(i%2)*890;y=150+(i//2)*605
        d.text((x,y),name.replace('-',' ').title(),font=normal,fill='#243e33')
        insert(im,ROOT/'photo-review/roof-inspections'/f'{name}.png',(x,y+40,840,540))
    pages.append(im)
for title,path,foot in [
    ('Doorway approaches and furniture',OUT/'Circulation current.png','Green boxes are review zones. Nearby furniture can overlap an approach zone without blocking the actual route.'),
    ('Routes through both floors',OUT/'Walking routes.png','House routes and the separate side-annex passage use actual apertures and mesh-derived obstacles. Door leaves are open in the viewer.')]:
    im,d=page(title,'Clearance checks support the walkthrough; they are not a building-accessibility assessment.')
    insert(im,path,(40,160,1720,1120));d.text((45,1325),foot,font=small,fill='#58665b');pages.append(im)
pages[0].save(OUT/'Detail and clearance review.pdf',save_all=True,append_images=pages[1:],resolution=144)
print('DETAIL_REVIEW_PAGES',len(pages))
