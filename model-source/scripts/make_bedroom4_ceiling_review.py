"""Assemble source/render ceiling tests and explain the remaining datum ambiguity."""
from pathlib import Path
import json
from PIL import Image,ImageDraw,ImageFont
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'photo-review/bedroom4-ceiling-audit'
r=json.loads((OUT/'ceiling-audit.json').read_text());t=json.loads((OUT/'taller-storey-proof.json').read_text())
font=lambda n:ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',n)
boards=[]
def board(title,items,name):
    b=Image.new('RGB',(2160,650),'#f4f2ed');d=ImageDraw.Draw(b)
    d.text((12,8),title,font=font(25),fill='#243b35')
    for i,(p,label,sub) in enumerate(items):
        d.text((i*720+10,44),label,font=font(21),fill='#243b35')
        d.text((i*720+10,70),sub,font=font(17),fill='#4f5e58')
        b.paste(Image.open(p).convert('RGB').resize((712,534),Image.Resampling.LANCZOS),(i*720+4,104))
    b.save(OUT/name,quality=96);boards.append(b)
for v,heading in enumerate(('West wall / ceiling','North wall / wardrobe','East wall / door heads and floor','South window')):
    board('Bedroom 4 — '+heading,[
        (ROOT/f'photo-review/originals/2445676-{v}.jpg','Original photograph','Unchanged source projection'),
        (OUT/f'current-{v}.png','Current model','Floor 2.80 m; room height 2.45 m; window A'),
        (OUT/f'taller_storey-{v}.png','Taller-storey hypothesis','Floor 3.168 m; room height still 2.45 m; short window')],f'Storey comparison {v}.jpg')
board('Test 1 — raising only the flat ceiling does not move the window',[ 
    (ROOT/'photo-review/originals/2445676-0.jpg','Original photograph','West wall / ceiling'),
    (OUT/'current-0.png','Current','Ceiling 2.45 m above floor'),
    (OUT/'raised_fixed-0.png','Raised ceiling, fixed camera','Ceiling 2.778 m above the same floor')], 'Ceiling-only comparison.jpg')
board('Test 2 — higher camera and ceiling versus a higher upper-floor datum',[
    (ROOT/'photo-review/originals/2445676-2.jpg','Original photograph','Door heads and threshold are independent checks'),
    (OUT/'combined_joint_fit-2.png','Higher room / camera, same floor','Joint fit still leaves 66–89 px doorway residuals'),
    (OUT/'taller_storey-2.png','Higher floor / camera / doors together','Original doorway residuals preserved')], 'Doorway hypothesis comparison.jpg')
fig,axes=plt.subplots(1,2,figsize=(12,7),constrained_layout=True)
for ax,floor,cam,ceiling,sill,title,color in [(axes[0],2.8,r['original_camera'][2],5.25,3.55,'Current vertical assumptions','#306bb5'),(axes[1],t['floor_level_m'],t['camera_z_m'],t['ceiling_world_m'],3.92,'Taller-storey hypothesis','#ba6131')]:
    ax.add_patch(Rectangle((.2,0),1.6,ceiling,fill=False,edgecolor='#888888',lw=2))
    ax.hlines([2.6,floor,ceiling],0,2,colors=['#777777',color,color],linestyles=[':', '-', '-'],linewidths=[2,3,3])
    ax.plot([.2,.2],[sill,5],color='#008d96',lw=9);ax.scatter([1.2],[cam],s=60,c=color)
    ax.plot([1.7,1.7],[floor,floor+2.1],color='#6e5b43',lw=4)
    for h,label in [(2.6,'Ground ceiling 2.600 m (assumed)'),(floor,f'Upper floor {floor:.3f} m'),(ceiling,f'Upper ceiling {ceiling:.3f} m'),(cam,f'Camera {cam:.3f} m')]:
        ax.text(2.12,h,label,va='center',fontsize=10)
    ax.text(.35,(sill+5)/2,f'Window\n{5-sill:.2f} m high',ha='left',va='center',fontsize=10,color='#007d85')
    ax.text(.35,ceiling-.16,f'Room height {ceiling-floor:.2f} m',va='top',fontsize=10,color=color)
    ax.text(2.12,(floor+2.6)/2,f'Gap {floor-2.6:.3f} m',va='center',fontsize=9,color='#777777')
    ax.set(xlim=(-.2,5),ylim=(0,6.15),ylabel='World height (m)',title=title,xticks=[]);ax.grid(axis='y',alpha=.2)
fig.suptitle('The stronger alternative changes the assumed floor-to-floor height, not the room ceiling height',fontsize=13)
fig.savefig(OUT/'Vertical datum hypotheses.png',dpi=180);fig.savefig(OUT/'Vertical datum hypotheses.pdf');plt.close(fig)
boards[0].save(OUT/'Ceiling and storey comparison.pdf',save_all=True,append_images=boards[1:],resolution=180)
Image.open(ROOT/'source/listing-photos/00.jpg').crop((255,170,500,300)).resize((980,520),Image.Resampling.LANCZOS).save(OUT/'Listing eaves reference crop.jpg',quality=96)
lines=['# Bedroom 4 ceiling / storey-height audit','',
'The user’s higher-ceiling/roof-projection hypothesis was tested explicitly. No canonical geometry, camera or opening was changed by these tests. Original source photographs and FOV remain unchanged.','',
'**Strongest alternative:** raise the assumed first-floor datum from 2.800 to 3.168 m, and move upstairs camera, doors, furnishings and ceiling together. Keep the selected short window at external head 5.000 m and sill 3.920 m. It then sits approximately 0.752–1.832 m above the new floor: essentially B internally while preserving the higher external head. The room itself remains 2.450 m high; its ceiling is higher in the roof in absolute terms.','',
'The four taller-storey proof renders preserve the original physical doorway/cornice projections and furniture-to-floor contact. The selected window head/sill are within about 3.5 px of the picked source glazing bounds. This is a coherent hypothesis, not a verified building measurement. Furniture/trim details remain approximate.','',
'**Why raising only the room ceiling was insufficient:** at the fixed corrected camera, raising it about 0.328 m shifts the west cornice by 64–67 px while leaving window pixels unchanged. Raising camera and ceiling together keeps the cornice aligned and can align the short window, but leaves physical door head/foot errors around 97–114 px. A least-squares compromise across structural controls retains 32–38 px window and 66–89 px doorway errors. Furniture dimensions were excluded from this fitting.','',
'**Remaining independent checks:** with the ground ceiling held at its estimated 2.600 m, the taller storey leaves 0.568 m between it and the upstairs floor. Ground ceilings of 2.800/2.900 m would leave 0.368/0.268 m instead, but neither is established by this audit. Across 17 modelled risers, rise changes from 164.7 to 186.4 mm; the count and vertical datum should be reconciled against the original stair views before any global change. The procedural exterior floor-band object is not an independent measurement of the hidden floor level. The listing does not expose the floor slab.','',
'**Roof:** the current assumed front overhang is only 0.165 m beyond ordinary brickwork. Its underside at the front/west inner walls is 5.448/5.502 m. The taller-storey ceiling at 5.618 m conflicts with those particular roof assumptions. An isolated feasibility variant with 0.600 m front/west projection and unchanged eave/ridge heights accommodates a thin flat ceiling; this projection is not claimed to be measured. The listing clearly shows an overhang, but does not establish its depth. Different eave height, roof thickness or pitch assumptions change the required projection. No interior slope was invented: the sources show flat ceiling planes.','',
'**Decision boundary:** the evidence does not identify ceiling height, camera height and upstairs floor datum independently. The taller-storey case best reconciles the user’s short-window description without breaking interior door/floor relationships, but requires a house-wide vertical check before adoption. Freeze uncertain height changes while the floorplan opening/layout audit proceeds.','',
'Files: `ceiling-audit.json` records controls and residuals; `taller-storey-proof.json` records dimensions and scope. The proof changes only an unsaved scene; ground-storey walls/stairs and complete exterior transitions are deliberately not presented as rebuilt.']
(OUT/'Findings.md').write_text('\n'.join(lines)+'\n')
print('Bedroom 4 ceiling/storey boards ready:',OUT)
