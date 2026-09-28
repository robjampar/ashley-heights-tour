"""Build the expanded Proposed / brick PDF and local gallery without changing the model."""
from pathlib import Path
from collections import OrderedDict
from html import escape
import hashlib
import json
import shutil
import zipfile
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF
from house_brochure_content import PAGES, IMAGE_LABELS

ROOT = Path(__file__).resolve().parents[1]
ORIGINAL = ROOT / 'revisions/interiors-overnight-2026-09-27/review-round-2/brochure'
EDITION = ROOT / 'revisions/brochure-expanded-2026-09-28'
OUT = ROOT / 'output/pdf'
PDF = OUT / 'ashley-heights-house-brochure.pdf'
WEB = ROOT / 'walkthrough/public/brochure'
DIST = ROOT / 'walkthrough/dist/brochure'
CACHE = EDITION / 'jpeg'
W, H = landscape(A4)
M = 34
INK, MUTED, PAPER, OAK, WHITE = map(HexColor, ['#273C34','#697169','#F6F3EB','#B79D75','#FFFFFF'])
PAGE_COUNT = len(PAGES)
for name, file in [('Sans','Arial.ttf'),('Bold','Arial Bold.ttf'),('Serif','Baskerville.ttc')]:
    pdfmetrics.registerFont(TTFont(name, '/System/Library/Fonts/Supplemental/' + file))

def slug(text):
    return text.lower().replace(' & ', '-').replace(' ', '-')

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def image_assets():
    records = json.loads((EDITION / 'image-prompts.json').read_text())
    assets = {r['key']: ROOT / r['savedPath'] for r in records if r['status'] == 'selected'}
    for key in ('kitchen','formal','drinks','bedroom','bath'):
        assets[key] = ORIGINAL / 'enhanced' / (key + '.png')
    assert set(assets) == set(IMAGE_LABELS), 'Image selection differs from content'
    CACHE.mkdir(parents=True, exist_ok=True)
    for key, source in assets.items():
        target = CACHE / (key + '.jpg')
        if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
            with Image.open(source) as im:
                im.convert('RGB').save(target, quality=96, subsampling=0, optimize=True)
    return assets

class Brochure:
    def __init__(self):
        OUT.mkdir(parents=True, exist_ok=True)
        self.c = canvas.Canvas(str(PDF), pagesize=(W,H), pageCompression=1)
        self.c.setTitle('Ashley Heights | Proposed in brick | A considered home')
        self.c.setAuthor('Ashley Heights design study')
        self.c.setSubject('50-page local owner review. Proposed brick facades, rooms, garden and model-derived plans.')
        self.c.setViewerPreference('DisplayDocTitle', 'true')
        self.page = 0
        self.current_chapter = None
        self.measured_blocks = []

    def text(self, s, x, y, size=10, font='Sans', colour=INK):
        self.c.setFillColor(colour)
        self.c.setFont(font, size)
        width = pdfmetrics.stringWidth(s, font, size)
        assert x + width <= W-M+1, (self.page, s, width)
        self.c.drawString(x, y, s)

    def para(self, s, x, y, w, size=10, colour=MUTED, leading=None, font='Sans', floor=40):
        p = Paragraph(escape(s), ParagraphStyle('body', fontName=font, fontSize=size,
                      leading=leading or size*1.43, textColor=colour))
        _, h = p.wrap(w, 2000)
        assert y-h >= floor, (self.page, 'Text overflow', y-h, s[:90])
        p.drawOn(self.c, x, y-h)
        self.measured_blocks.append(dict(page=self.page, x=x, y=y-h, width=w, height=h))
        return y-h

    def rect(self, x, y, w, h, colour):
        self.c.setFillColor(colour)
        self.c.rect(x,y,w,h,fill=1,stroke=0)

    def photo(self, key, x, y, w, h, fit='contain'):
        ir = ImageReader(str(CACHE / (key+'.jpg')))
        iw, ih = ir.getSize()
        scale = min(w/iw,h/ih) if fit == 'contain' else max(w/iw,h/ih)
        self.c.saveState()
        p = self.c.beginPath(); p.rect(x,y,w,h)
        self.c.clipPath(p,stroke=0,fill=0)
        self.c.drawImage(ir,x+(w-iw*scale)/2,y+(h-ih*scale)/2,iw*scale,ih*scale)
        self.c.restoreState()

    def bookmark(self, item):
        key = f'p{self.page:02}'
        self.c.bookmarkPage(key)
        if item['chapter'] != self.current_chapter:
            self.c.addOutlineEntry(item['chapter'],key,level=0,closed=False)
            self.current_chapter = item['chapter']
        self.c.addOutlineEntry(item['title'],key,level=1)

    def base(self, item):
        self.rect(0,0,W,H,PAPER)
        self.text('ASHLEY HEIGHTS',M,H-26,8,'Bold')
        self.text(item['chapter'].upper(),565,H-26,8,colour=MUTED)
        self.text(item['title'],M,H-66,28,'Serif')
        if item.get('subtitle'):
            self.para(item['subtitle'],M,H-81,W-2*M,9.3,floor=485)
        self.c.setStrokeColor(OAK); self.c.setLineWidth(.4)
        self.c.line(M,32,W-M,32)
        self.text('PROPOSED / BRICK  |  LOCAL OWNER REVIEW  |  28 SEPTEMBER 2026',M,18,6.8,colour=MUTED)
        self.text(f'{self.page:02} / {PAGE_COUNT:02}',W-M-38,18,7,colour=MUTED)

    def image_label(self, x, y, width):
        self.para('Model-based, AI-enhanced presentation image. Materials, planting and light are illustrative.',
                  x,y,width,6.6,leading=9,floor=35)

    def room(self, item):
        self.base(item)
        if len(item['images']) == 1:
            self.photo(item['images'][0],M,132,520,347)
            x,width,y = 576,W-M-576,474
            for title,copy in item['sections']:
                y = self.para(title,x,y,width,15.5,INK,18,'Serif')-9
                y = self.para(copy,x,y,width,9.6,leading=13.7)-19
            y = self.para('AT A GLANCE',x,y,width,7.2,INK,10,'Bold')-7
            for fact in item['facts']:
                y = self.para(fact,x,y,width,8.6,leading=12.2,floor=55)-5
            self.para(item['note'],M,113,520,9,leading=13,floor=60)
            self.image_label(M,48,520)
        else:
            col = (W-2*M-20)/2
            for i,key in enumerate(item['images']):
                x = M+i*(col+20)
                self.photo(key,x,230,col,252)
                title,copy = item['sections'][i]
                y = self.para(title,x,211,col,17,INK,20,'Serif')-7
                y = self.para(copy,x,y,col,9.6,leading=13.7,floor=98)-10
                self.para(item['facts'][i],x,y,col,8.2,INK,11,'Bold',floor=75)
            self.para(item['note'],M,69,W-2*M,8.1,leading=11.5,floor=44)
            self.image_label(M,44,W-2*M)

    def cover(self, item):
        self.rect(0,0,W,H,INK)
        self.photo('front-brick',0,125,W,H-125,'cover')
        self.text('A S H L E Y   H E I G H T S',M,84,28,'Serif',PAPER)
        self.text('A considered home',M,53,19,'Serif',PAPER)
        self.text('PROPOSED IN BRICK / THE COMPLETE ROOM-BY-ROOM EDITION',M,25,8,colour=HexColor('#D4DACF'))
        self.text('LOCAL REVIEW',W-M-106,83,8,'Bold',PAPER)
        self.text('50 PAGES / 48 VIEWS',W-M-106,63,7.5,colour=HexColor('#D4DACF'))
        self.text('SEPTEMBER 2026',W-M-106,44,7.5,colour=HexColor('#D4DACF'))

    def contents(self, item):
        self.base(item)
        self.para('Warm oak, limestone and ivory inside. Brick and dark grey tiles outside. A full tour of the complete Proposed design, from the entrance to the pool garden.',M,486,470,13,INK,19)
        chapters = [
            ('The house and its floorplans','Exterior and four model-derived plans',3,'03-07'),
            ('Arrival and living','Entrance, kitchen, formal rooms and office',8,'08-16'),
            ('Practical rooms and leisure','Gym, utility, garage, cinema, bar and games',17,'17-22'),
            ('The principal suite','Bedroom, sitting room, study, wardrobe and bath',23,'23-26'),
            ('Bedrooms and bathrooms','Guest and family rooms, ensuites and shared bath',27,'27-36'),
            ('Landings and lofts','Reading corners, loft suite and hobby room',37,'37-42'),
            ('Terrace and garden','Roof terrace, pool, garden buildings and workshop',43,'43-48'),
            ('Details and review','Materials, lighting and the next design decisions',49,'49-50'),
        ]
        y = 389
        for title,detail,page,nums in chapters:
            self.text(title,M,y,14.5,'Serif')
            self.text(detail,M,y-16,8.4,colour=MUTED)
            self.text(nums,493,y,10,colour=INK)
            self.c.linkRect('',f'p{page:02}',(M,y-23,540,y+13),relative=0,thickness=0)
            y -= 42
        self.rect(580,130,228,352,HexColor('#EAE8DE'))
        self.text('THE DESIGN THREAD',597,457,8,'Bold')
        y = 431
        for title,copy in [
            ('A place for each activity','Beds against solid walls, fixed screens, useful storage and routes considered around the furniture.'),
            ('One material family','Pale timber, ivory textiles, tactile stone and bronze details change in mood from room to room.'),
            ('Read views with plans','The images explore atmosphere. The four floorplans come directly from the model and show the room relationships.')]:
            y = self.para(title,597,y,194,14,INK,17,'Serif')-8
            y = self.para(copy,597,y,194,9.2,leading=13)-20
        self.para('Use the contents links or PDF bookmarks to jump to any chapter. All work remains local for owner review.',597,108,195,8.3,leading=12,floor=50)

    def plan(self, item):
        self.base(item)
        d = svg2rlg(str(ORIGINAL/'plans'/('compact-'+item['level']+'.svg')))
        x,y,w,h = M,47,510,439
        self.rect(x,y,w,h,WHITE)
        scale = min(w/d.width,h/d.height)
        self.c.saveState()
        self.c.translate(x+(w-d.width*scale)/2,y+(h-d.height*scale)/2)
        self.c.scale(scale,scale); renderPDF.draw(d,self.c,0,0); self.c.restoreState()
        x,width,y = 575,231,473
        for title,copy in item['sections']:
            y = self.para(title,x,y,width,16,INK,19,'Serif')-9
            y = self.para(copy,x,y,width,9.8,leading=14)-23
        self.para(item['note'],x,y,width,8.5,leading=12.1,floor=70)
        self.para('MODEL-DERIVED PLAN / Use the drawn scale bar. Not to a fixed printed scale; zoom for furniture and door detail.',x,65,width,7.1,leading=10,floor=35)

    def palette(self, item):
        self.base(item)
        self.para('A small family of materials connects the house while allowing each room its own atmosphere.',M,510,W-2*M,9.3)
        width = (W-2*M-30)/4
        cards = [
            ('kitchen-sink','Honed limestone','Worktops, tables and bath surfaces bring a quiet mineral texture. Bronze adds warmth at points of use.'),
            ('original-stair','Pale oak','Treads, cabinetry and handrails repeat the same timber family, from original hall to new suite.'),
            ('bath','Soft ivory','Walls, linen and upholstery catch daylight gently, balancing the harder stone and metal surfaces.'),
            ('front-brick','Brick and dark tile','The chosen exterior ties the house volumes together. Dormer faces and cheeks stay tiled.'),
        ]
        for i,(key,title,copy) in enumerate(cards):
            x = M+i*(width+10)
            self.photo(key,x,277,width,201,'cover')
            self.para(title,x,256,width,16,INK,19,'Serif')
            self.para(copy,x,224,width,9.4,leading=13.5)
        self.c.setStrokeColor(OAK); self.c.line(M,129,W-M,129)
        self.text('Light at three scales',M,104,18,'Serif')
        self.para('Daylight establishes the room. Pendants and wall lights give each activity a focus. Local lamps and joinery lighting add the softer evening layer. The cinema and bar use a darker version of the same warm palette.',271,111,W-M-271,9.5,leading=13.5)
        self.image_label(M,46,W-2*M)

    def review(self, item):
        self.base(item)
        self.para('This edition records the complete Proposed design in its selected brick finish, ready for a room-by-room owner review.',M,501,710,12.5,INK,18)
        columns = [
            ('What is shown',[
                ('48 presentation views','The photographs are AI-enhanced from model renders and captured model views. They are visualisations, not photographs of a completed house. Fine texture, planting, styling and light are illustrative.'),
                ('Four model floorplans','Ground, first, loft and lower-ground plans are extracted from the current Proposed model. The vector drawings remain sharp when enlarged. Dimensions in the room text are approximate model values.'),
                ('The selected version','Brick house and extension facades, dark grey roof tiles and tiled dormer faces and cheeks. The pool, roof terrace, rear garden living space and workshop belong to Proposed.')]),
            ('Decisions to carry forward',[
                ('Loft connection','The bridge still has approximately 1.78-1.90 m headroom. The dormer and eaves also have varying clearances. Architectural and structural review is needed before treating these as resolved routes.'),
                ('Detailed design','New or moved windows, bathroom services, roof-terrace loading and weathering, and pool safety and servicing need coordinated design. This brochure is not a construction specification or evidence of planning approval.'),
                ('Review locally','Use the images to comment on atmosphere and finishes, then check the model and plans for geometry and movement. Nothing from this brochure task has been published; the next step is owner review.')]),
        ]
        for i,(heading,sections) in enumerate(columns):
            x = M+i*397
            self.text(heading,x,431,22,'Serif')
            y = 402
            for title,copy in sections:
                y = self.para(title,x,y,371,12,INK,16,'Bold')-7
                y = self.para(copy,x,y,371,9.6,leading=13.8)-19
        self.para('SOURCE GUIDE / Current Proposed model and room specifications; accepted kitchen and principal-suite images; expanded September 2026 model-based image studies. Detailed image provenance and prompts accompany the local edition.',M,72,W-2*M,7.6,leading=10.7,floor=40)

    def build(self):
        for self.page,item in enumerate(PAGES,1):
            self.bookmark(item)
            getattr(self,item['kind'])(item)
            self.c.showPage()
        self.c.save()
        return self.measured_blocks

CSS = '''
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:24px}
body{margin:0;background:#f6f3eb;color:#273c34;font:16px/1.6 system-ui,sans-serif}
main{max-width:1240px;margin:auto;padding:44px 28px}header{margin-bottom:30px}
.eyebrow{font-size:12px;letter-spacing:.13em;text-transform:uppercase}
h1{font:clamp(38px,5.5vw,66px)/1.08 Georgia,serif;margin:22px 0}
h2{font:clamp(28px,3vw,40px)/1.15 Georgia,serif;margin:0 0 22px}
p{max-width:760px;color:#697169}.actions,.chapters{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}
.actions a{padding:11px 18px;border:1px solid #273c34;border-radius:3px;text-decoration:none}
.actions a:first-child{background:#273c34;color:#f6f3eb}.chapters a{font-size:14px;text-underline-offset:4px}
.chapters{gap:8px 22px;padding:18px 0;border-top:1px solid #b79d75;border-bottom:1px solid #b79d75}
a{color:inherit}a:focus-visible{outline:3px solid #b79d75;outline-offset:5px}
.skip{position:absolute;left:-9999px}.skip:focus{left:20px;top:10px;background:white;padding:10px;z-index:2}
section{margin:52px 0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:30px 24px}
figure{margin:0}img{display:block;width:100%;height:auto;background:#e8e5db}
.hero figure{max-width:100%}.hero img{width:100%}.title{font:22px/1.25 Georgia,serif;display:block;margin-bottom:7px}
figcaption{padding:16px 0 0;font-size:14px}.description{display:block;color:#697169;font-size:14px;line-height:1.6}
.image-link{display:inline-block;font-size:12px;color:#697169;margin-top:9px;text-underline-offset:3px}
.page{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#697169;display:block;margin-bottom:6px}
.plans{grid-template-columns:repeat(4,1fr)}.plans img{aspect-ratio:576/763.2;object-fit:contain;background:white}
.plans .title{font-size:20px}.top{font-size:12px;color:#697169;display:inline-block;margin-top:24px}
footer{border-top:1px solid #b79d75;padding-top:22px;margin-top:45px;font-size:13px;color:#697169}
@media(max-width:760px){main{padding:30px 18px}.grid{grid-template-columns:1fr}.plans{grid-template-columns:1fr 1fr}.actions a{font-size:14px}section{margin:36px 0}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
'''

def gallery(assets):
    for folder in (WEB,WEB/'images',WEB/'originals',WEB/'plans'):
        folder.mkdir(parents=True,exist_ok=True)
    shutil.copy2(PDF,WEB/PDF.name)
    groups = OrderedDict(); selected = []; seen = set()
    for number,item in enumerate(PAGES,1):
        if item['kind'] in ('cover','contents','plan','palette','review'):
            continue
        for i,key in enumerate(item['images']):
            assert key not in seen,key
            seen.add(key)
            copy = item['sections'][i if len(item['images'])>1 else 0][1]
            record = dict(key=key,title=IMAGE_LABELS[key],page=number,description=copy,
                          chapter=item['chapter'],source=str(assets[key].relative_to(ROOT)),sha256=digest(assets[key]))
            groups.setdefault(item['chapter'],[]).append(record); selected.append(record)
            shutil.copy2(CACHE/(key+'.jpg'),WEB/'images'/(key+'.jpg'))
            shutil.copy2(assets[key],WEB/'originals'/(key+'.png'))
    assert len(selected)==48
    def figure(record,hero=False):
        key = record['key']
        with Image.open(assets[key]) as im:
            width,height = im.size
        return f'''<figure><a href="originals/{key}.png" aria-label="Open full-size {escape(record['title'])}"><img src="images/{key}.jpg" width="{width}" height="{height}" alt="{escape(record['title'])}, model-based AI-enhanced presentation" loading="{'eager' if hero else 'lazy'}" decoding="async"></a><figcaption><span class="page">Brochure page {record['page']:02}</span><span class="title">{escape(record['title'])}</span><span class="description">{escape(record['description'])}</span><a class="image-link" href="originals/{key}.png">Open full-resolution image</a> <span aria-hidden="true"> / </span> <a class="image-link" href="{PDF.name}#page={record['page']}">View room in brochure</a></figcaption></figure>'''
    nav = ''.join(f'<a href="#{slug(k)}">{escape(k)}</a>' for k in groups)
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ashley Heights | Proposed in brick</title><link rel="icon" href="data:,"><style>{CSS}</style></head><body><a class="skip" href="#gallery">Skip to photographs</a><main id="top"><header><div class="eyebrow">Ashley Heights / Proposed in brick / Local owner review</div><h1>A considered home</h1><p>A 50-page tour of the house, with 48 presentation images, four model-derived floorplans and details of every room and garden area. Brick house facades, dark grey roof tiles and tiled dormer faces and cheeks.</p><nav class="actions" aria-label="Downloads and model"><a href="{PDF.name}">Open the 50-page brochure</a><a href="ashley-heights-presentation-images.zip" download>Download all 48 images</a><a href="/?design=proposed">Explore Proposed</a><a href="/interiors/leisure/">Room studies</a></nav><p>These are model-based AI-enhanced visualisations. Materials, planting and light are illustrative; the floorplans come directly from the model.</p><nav class="chapters" aria-label="Jump to an area">{nav}<a href="#floorplans">Floorplans</a></nav></header><div id="gallery">'''
    for chapter,records in groups.items():
        hero = chapter=='The house'
        html += f'<section id="{slug(chapter)}" class="{"hero" if hero else "chapter"}" aria-labelledby="{slug(chapter)}-title"><h2 id="{slug(chapter)}-title">{escape(chapter)}</h2><div class="{"hero-images" if hero else "grid"}">'
        html += ''.join(figure(r,hero) for r in records)
        html += '</div><a class="top" href="#top">Back to contents</a></section>'
    html += '<section id="floorplans" aria-labelledby="floorplans-title"><h2 id="floorplans-title">Model-derived floorplans</h2><p>Open any plan to inspect the vector drawing. Use the scale bars; roof slopes and variable loft headroom require the model sections.</p><div class="grid plans">'
    for i,level in enumerate(('ground','first','loft','basement'),4):
        title = {'ground':'Ground floor','first':'First floor','loft':'Loft level','basement':'Lower ground'}[level]
        for ext in ('png','svg'):
            shutil.copy2(ORIGINAL/'plans'/f'compact-{level}.{ext}',WEB/'plans'/f'{level}.{ext}')
        html += f'<figure><a href="plans/{level}.svg"><img src="plans/{level}.png" alt="Proposed {title.lower()} model-derived floorplan" loading="lazy"></a><figcaption><span class="page">Brochure page {i:02}</span><span class="title">{title}</span><a class="image-link" href="plans/{level}.svg">Open vector plan</a></figcaption></figure>'
    html += '</div></section></div><footer><p>Proposed only, with brick selected for the house and extensions. Garden buildings retain their own finishes. The presentation does not establish planning approval or a construction specification. The loft bridge headroom remains a design constraint and is described on pages 6, 42 and 50.</p><p>Everything remains local for owner review. No house geometry was changed to create this expanded edition.</p></footer></main></body></html>'
    (WEB/'index.html').write_text(html)
    with zipfile.ZipFile(WEB/'ashley-heights-presentation-images.zip','w',zipfile.ZIP_STORED) as archive:
        for r in selected:
            archive.write(assets[r['key']],f"{r['page']:02}-{r['key']}.png")
        archive.writestr('README.txt','Ashley Heights - Proposed in brick\n48 model-based AI-enhanced presentation images.\nNot photographs of a completed house. Materials, planting and lighting are illustrative.\nLocal owner review, 28 September 2026.\nImage filenames begin with the corresponding brochure page number.\n')
        archive.writestr('image-index.json',json.dumps(selected,indent=2))
    shutil.copytree(WEB,DIST,dirs_exist_ok=True)
    return selected

def main():
    assets = image_assets()
    blocks = Brochure().build()
    selected = gallery(assets)
    manifest = dict(pdf=str(PDF.relative_to(ROOT)),pages=PAGE_COUNT,selectedImages=len(assets),
                    newSelectedImages=43,reusedImages=5,primaryDesign='Proposed',exterior='brick',
                    roof='dark grey tiles',dormers='tiled faces and cheeks',publication='local owner review only',
                    imageMethod='Built-in image generation; model-based AI-enhanced visualisations',
                    pdfSha256=digest(PDF),assets=selected,
                    plans=[dict(level=l,path=str((ORIGINAL/'plans'/f'compact-{l}.svg').relative_to(ROOT)),
                                sha256=digest(ORIGINAL/'plans'/f'compact-{l}.svg')) for l in ('ground','first','loft','basement')],
                    excludedImages=['family-lounge','formal-lounge','pool-loungers'])
    (EDITION/'brochure-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    (EDITION/'layout-blocks.json').write_text(json.dumps(blocks,indent=2)+'\n')
    (EDITION/'page-content.json').write_text(json.dumps(PAGES,indent=2)+'\n')
    print(json.dumps(dict(pdf=str(PDF),pages=PAGE_COUNT,images=len(assets),sizeMB=round(PDF.stat().st_size/1e6,1))))

if __name__=='__main__':
    main()
