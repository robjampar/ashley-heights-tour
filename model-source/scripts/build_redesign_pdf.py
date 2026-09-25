"""A printable, bookmarked concept review with the model-derived drawing sheets."""
from pathlib import Path
import json,html
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A3
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF
import matplotlib
ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'output/pdf';DEST.mkdir(parents=True,exist_ok=True)
fontroot=Path(matplotlib.get_data_path())/'fonts/ttf'
for name,file in [('ReviewSans','DejaVuSans.ttf'),('ReviewBold','DejaVuSans-Bold.ttf'),('ReviewSerif','DejaVuSerif.ttf')]:pdfmetrics.registerFont(TTFont(name,str(fontroot/file)))
pdfmetrics.registerFontFamily('ReviewSans',normal='ReviewSans',bold='ReviewBold')
W,H=A3;M=44;INK=HexColor('#203e3a');MUTED=HexColor('#677970');PAPER=HexColor('#fffdf7');LINE=HexColor('#d7ddd1')
data=json.loads((ROOT/'walkthrough/public/redesigns/options.json').read_text());options=data['options']
path=DEST/'Ashley Heights - Six design options.pdf';c=canvas.Canvas(str(path),pagesize=A3,pageCompression=1)
c.setTitle('Ashley Heights - Six design options');c.setAuthor('Ashley Heights design study');c.setSubject('Six concept alternatives with floor plans, site arrangements and design trade-offs')
page=0

def clean(t):return t.replace('–','-').replace('—','-').replace('‑','-')
def para(text,x,y,width,size=11,leading=None,font='ReviewSans',color=MUTED):
 p=Paragraph(clean(text),ParagraphStyle('body',fontName=font,fontSize=size,leading=leading or size*1.5,textColor=color,spaceAfter=0));_,height=p.wrap(width,H);p.drawOn(c,x,y-height);return y-height

def label(t,x,y):c.setFillColor(MUTED);c.setFont('ReviewBold',8);c.drawString(x,y,t)
def title(t,x,y,size=30):c.setFillColor(INK);c.setFont('ReviewSerif',size);c.drawString(x,y,t)
def start(name=None,level=0):
 global page
 page+=1;c.setFillColor(PAPER);c.rect(0,0,W,H,fill=1,stroke=0)
 if name:c.bookmarkPage(name);c.addOutlineEntry(name,name,level=level,closed=False)
def footer(note='Concept design - dimensions from the reconstructed model'):
 c.setStrokeColor(LINE);c.line(M,36,W-M,36);c.setFont('ReviewSans',8);c.setFillColor(MUTED);c.drawString(M,23,'Ashley Heights | 25 September 2026 | '+note);c.drawRightString(W-M,23,str(page))
def image(path,x,y,w,h):c.drawImage(str(path),x,y,width=w,height=h,preserveAspectRatio=True,anchor='c',mask='auto')
def finish():c.showPage()

start('Overview')
label('ASHLEY HEIGHTS / DESIGN STUDY',M,H-53)
title('Six ways to make the house work',M,H-103,31)
y=para('Three internal layouts within the current Proposed envelope, and three complete alternatives that retain more of the original house.',M,H-129,W-2*M,13)
image(ROOT/'walkthrough/public/redesigns/images/e1-front.jpg',M,H-605,W-2*M,435)
y=H-633
label('THE FULL BRIEF',M,y);y=para('Seven bedrooms, en suites for most, a large principal suite with study, walk-through wardrobe and bathroom; open-plan kitchen and living, gym, cinema, wine bar, pool, double garage and four outside parking spaces.',M,y-17,W-2*M,12)
y-=27
label('STARTING POINT',M,y);y=para('<b>E1 - Retained front</b> is the first option to explore for fewer changes to the original house. It keeps the front, entrance, main stair, garage and fountain. Its retained garage is a tight double for compact cars. E2 offers a larger dedicated principal suite and garden leisure wing without a basement. E3 retains the most complex construction and front-building-line questions.',M,y-17,W-2*M,11)
y-=31
label('READ THE OPTIONS',M,y);y-=24
for o in options:
 c.setFillColor(INK);c.setFont('ReviewBold',11);c.drawString(M,y,o['code']+' - '+o['name']);c.setFont('ReviewSans',10);c.drawString(M+260,y,o['group']+' | '+str(o['ensuites'])+' en suites');c.linkRect('',o['code']+' '+o['name'],(M,y-7,W-M,y+13),relative=0,thickness=0);y-=25
y=para('Each option begins with a short explanation, followed by its floor plans and site arrangement. The current Existing, Proposed and planning designs remain separate choices in the browser.',M,y-8,W-2*M,10)
para('These are concept studies, not application or construction drawings. Planning acceptability, structure, fire strategy, services and site levels require professional design and a measured survey.',M,83,W-2*M,9)
footer();finish()
for o in options:
 name=o['code']+' '+o['name'];start(name)
 label(o['group'].upper()+' / '+o['code'],M,H-51);title(o['name'],M,H-96,35)
 y=para(o['tagline'],M,H-120,W-2*M,13)
 c.setFillColor(HexColor('#e4eadd'));c.roundRect(M,H-193,W-2*M,41,3,fill=1,stroke=0)
 para('7 bedrooms &nbsp; | &nbsp; '+str(o['ensuites'])+' en suites &nbsp; | &nbsp; Pool + gym + cinema + wine bar &nbsp; | &nbsp; 2 garage + 4 outside',M+14,H-164,W-2*M-28,10,color=INK)
 iw=(W-2*M-16)/2;iy=H-439
 image(ROOT/f"walkthrough/public/redesigns/images/{o['id']}-{'interior'if o['id'].startswith('i')else'front'}.jpg",M,iy,iw,230);image(ROOT/f"walkthrough/public/redesigns/images/{o['id']}-rear.jpg",M+iw+16,iy,iw,230)
 label('INTERIOR HIGHLIGHT'if o['id'].startswith('i')else'FRONT ARRIVAL',M,iy-13);label('GARDEN',M+iw+16,iy-13)
 y=iy-49;col=(W-2*M-36)/2;x2=M+col+36
 label('WHY IT WORKS',M,y);left=para(o['bestFor'],M,y-18,col,12,font='ReviewBold',color=INK)-16
 for t in o['why']:left=para('• '+html.escape(t),M,left,col,10.5)-12
 label('THE TRADE-OFF',x2,y);right=y-18
 for t in o['compromises']:right=para('• '+html.escape(t),x2,right,col,10.5)-13
 right=para('<b>Principal suite</b><br/>'+html.escape(o['principal']),x2,right-3,col,10.5)-17
 left-=9;label('WHAT STAYS',M,left);left=para(o['retained'],M,left-17,col,10.5)-20
 label('WHAT CHANGES',M,left);left=para(o['construction'],M,left-17,col,10.5)
 label('PLANNING FOCUS',x2,right);right=para(o['planningFocus'],x2,right-17,col,10.5)-17
 label('PARKING',x2,right);right=para(o['parkingNote'],x2,right-17,col,10)-14
 lower=min(left,right)
 assert lower>116,(o['id'],'summary too long',lower)
 para(o['bedroomNote']+' Floor areas on the following sheets are approximate room polygons, not surveyed gross floor area.',M,99,W-2*M,9)
 url='https://robjampar.github.io/ashley-heights-tour/model/?design='+o['id'];c.linkURL(url,(M,48,W-M,70),relative=0,thickness=0);para('Open this option in the browser: '+url,M,65,W-2*M,8,color=INK)
 footer('Concept option - see survey and planning notes');finish()
 for plan in o['plans']:
  start(name+' - '+plan['title'],1)
  svg=ROOT/f"proposal/redesigns/plans/{o['id']}/{plan['file']}";drawing=svg2rlg(str(svg));scale=min(W/drawing.width,H/drawing.height);drawing.scale(scale,scale);renderPDF.draw(drawing,c,(W-drawing.width*scale)/2,(H-drawing.height*scale)/2)
  c.setFont('ReviewSans',8);c.setFillColor(MUTED);c.drawRightString(W-M,23,str(page));finish()
start('Design basis and checks')
label('READ BEFORE DEVELOPING AN OPTION',M,H-51);title('Design basis and next decisions',M,H-99,31)
y=H-139
sections=[('Planning character','The Sevenoaks character assessment places Ashley Close in F05 Vine Avenue / Ashley Road: detached houses, spacing, setbacks and mature planting. E1 and E2 retain the main front, but their side and rear additions still need neighbour-impact assessment. E3 changes the front building line substantially. I1-I3 inherit the current Proposed envelope and its planning risks.'),('Site and groundworks','The owner confirms the site is outside the Green Belt. Council map screening and the nearby tree order are explained on the next page. Local heritage, setting effects and other flood sources remain open. E1-E3 use a levelled concept forecourt and retaining edges; the reconstructed terrain implies up to about 0.92 m of local cut and 0.27 m of fill. Pool terraces also require groundworks; the final terrace loop leaves at least 0.94 m beside the coping, retaining edges and loungers. The pool remains 8 x 3.5 m. Tree roots, drainage falls, boundary levels and the gate/road tie-in require a topographical and tree survey.'),('Room and stair checks','All six options have connected access to scheduled rooms in the navigation model at a 44 cm body width. Bedrooms and shared rooms are also checked with the other sleeping rooms unavailable, to avoid routes through someone else\'s bedroom. Each counted en suite is reachable within its own suite, without using a shared landing. New stairs were walked continuously in both directions at a 50 cm body width. The new loft-stair mesh has a 2.24 m sampled centre minimum and 1.98 m near-edge minimum. The latter is below the usual 2 m guidance, so applicability of the reduced loft provision in Approved Document K, Diagram 1.4, requires Building Control review. The E3 cellar stair samples give 2.58 m headroom. These checks do not establish a fire or structural strategy.'),('Parking checks','The complete redesigns have six compact-car positions, each tracked on entry and exit with the other cars occupied. The body is 4.4 x 1.8 m and the turning radius 4.3 m. Swept bodies were sampled every 0.10 m with a 0.03 m body margin. E1 needs a tighter planner margin for the retained garage. This does not prove driver-door opening, SUV fit, gradients or highway visibility. The internal options add a fourth outside bay but retain the current garage.'),('Loft and bedroom brief','I1-I3, E1 and E2 contain one loft guest bedroom within the seven-bedroom total, plus a separate workspace. E3 has seven first-floor bedrooms and workspace only in the original loft. Low eaves must not be treated as full-height rooms. The new E1/E2 rear dormer has 2.10 m concept clear height; roof construction, insulation, escape and ventilation remain to be designed.')]
for heading,body in sections:
 label(heading.upper(),M,y);y=para(body,M,y-17,W-2*M,10.5)-25
label('PRIMARY SOURCES',M,y);y-=18
sources=[('Sevenoaks current Local Plan','https://www.sevenoaks.gov.uk/info/20069129/current_local_plan'),('Residential Extensions SPD, adopted May 2009','https://www.sevenoaks.gov.uk/download/downloads/id/379/residential_extensions_spd_adopted_may_2009.pdf'),('Formal Detached character assessment, F05, pages 273-277','https://www.sevenoaks.gov.uk/download/downloads/id/740/f_formal_detached.pdf'),('Residential parking guidance','https://www.sevenoaks.gov.uk/download/downloads/id/307/appendix_2_-_guidance_table_for_residential_parking.pdf'),('Approved Document K, Diagram 1.4','https://assets.publishing.service.gov.uk/media/60d5bdcde90e07716f516cfd/Approved_Document_K.pdf')]
for text,url in sources:
 before=y;y=para('<link href="'+url+'" color="#2a6a5c">'+html.escape(text)+'</link>',M,y,W-2*M,9)-9
assert y>50,('sources overflow',y)
footer('Concept checks are not approval or construction certification');finish()
start('Site constraints and tree protection')
label('SITE-SPECIFIC SCREENING / 25 SEPTEMBER 2026',M,H-51)
title('What the council maps tell us',M,H-99,31)
y=H-145
for heading,body in [
 ('Conservation area and Article 4','Using the existing approximate registration of the model to British National Grid, the reconstructed title polygon does not overlap the council\'s mapped conservation or nearby Article 4 areas. The Vine conservation area is about 98 m away; mapped Article 4 records 20/009/ART4 and 20/007/ART4 are about 42 m and 89 m away. The published conservation boundary plan corroborates the location outside The Vine. This is a map screening, not a formal land-charge search or proof of permitted-development rights.'),
 ('A specific tree order beside the site','The council\'s current GIS marks TPO 19 of 1987 (87/019/TPO) as confirmed. The order schedule identifies T4 as cherry and G1 as seven lime, one beech and one birch, originally in the rear garden of 57 Hitchen Hatch Lane. Its T4 map symbol reaches across the reconstructed east/rear plot edge, while G1 is mapped just beyond the east side. The symbols are not surveyed stems, actual crowns or root-protection areas; they do not establish tree ownership.'),
 ('Implications for every option','The pool and its excavation, terrace foundations, retaining edges, service trenches, forecourt grading and contractor access must be checked against a measured tree survey and root-protection design. Identify the surviving T4 and G1 trees with the council/arboriculturist before fixing those works. The model\'s clipping or moving of approximate tree geometry is not consent for tree work. All six layouts remain concepts pending this check.'),
 ('River/sea flooding and statutory heritage','The current Environment Agency Flood Zones dataset returns no Zone 2 or 3 polygon within the reconstructed plot plus a 100 m margin, supporting a river/sea Zone 1 map screening. Historic England NHLE mapping shows no listed-building point or polygon on the plot; the nearest is Grade II Vine View, about 269 m away. This does not assess local listing, historic curtilage, setting effects or other sources of flooding.'),
 ('National Landscape boundary','Natural England mapping places the reconstructed plot outside Kent Downs National Landscape, about 675 m from its boundary. This is an approximate boundary check; it does not determine effects on the landscape setting.'),
 ('Still to establish','Local-list status, surface water, groundwater and basement suitability remain unverified. The owner confirms the plot is outside the Green Belt. Existing permission conditions, current legal order coverage, boundaries, ground levels and neighbour windows need their own checks. E1 remains the least extensive alteration of the three complete redesigns, but its planning acceptability is not guaranteed.'),
]:
 label(heading.upper(),M,y);y=para(body,M,y-18,W-2*M,11)-29
label('PRIMARY RECORDS',M,y);y-=21
for text,url in [
 ('Sevenoaks - The Vine: adopted boundary, published 2019','https://www.sevenoaks.gov.uk/download/downloads/id/482/area_boundary.pdf'),
 ('Sevenoaks public conservation-area dataset','https://www.data.gov.uk/dataset/f1e54aea-998c-41a9-99fe-c0d641fcd630/conservation-areas-sdc-public'),
 ('Sevenoaks public Article 4 dataset','https://www.data.gov.uk/dataset/e406eb68-4535-4bad-a27f-7fa82268ee8d/article-4-directions-sdc-public'),
 ('TPO 19/1987: council order and plan, PDF pages 5-6','https://maps.sevenoaks.gov.uk/tpodocuments/87_019_TPO/'),
 ('Environment Agency: current Flood Zones dataset','https://www.data.gov.uk/dataset/104434b0-5263-4c90-9b1e-e43b1d57c750/flood-map-for-planning-flood-zones1'),
 ('Natural England: National Landscape / AONB boundaries','https://www.data.gov.uk/dataset/8e3ae3b9-a827-47f1-b025-f08527a4e84e/areas-of-outstanding-natural-beauty-england'),
 ('Historic England: National Heritage List for England data','https://historicengland.org.uk/listing/the-list/data-downloads'),
]:
 y=para('<link href="'+url+'" color="#2a6a5c">'+html.escape(text)+'</link>',M,y,W-2*M,10)-12
y=para('Mapping: © Historic England 2026 and © Natural England copyright; contains Ordnance Survey data © Crown copyright and database right 2026.',M,y-8,W-2*M,8)
assert y>60,('site constraints overflow',y)
footer('Map screening - surveyed tree and legal checks remain necessary');finish()
c.save();print(path);print(page,'pages')
