"""Draw a supplier enquiry from the live garage comparison; not working drawings."""
from pathlib import Path
import hashlib
import json
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from scripts.structure.build_study import footprint

ROOT=Path(__file__).resolve().parents[2]
INK=HexColor('#17364a');MUTED=HexColor('#536b79');PALE=HexColor('#edf2f5')
BLUE=HexColor('#4c8ead');RC=HexColor('#9aaebb');BLOCK=HexColor('#f1e5be')
AMBER=HexColor('#80520a');W,H=landscape(A4)
STYLE=ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=14,textColor=INK)
SMALL=ParagraphStyle('small',parent=STYLE,fontSize=8.5,leading=11)

def clean(t):
    return str(t).translate(str.maketrans({'×':'x','−':'-','–':'-','—':'-','’':"'",'²':'2','³':'3','·':'/','≤':'<=','≥':'>='}))

def text(c,x,y,t,size=10,bold=False,color=INK):
    c.setFillColor(color);c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,clean(t))

def para(c,t,x,y,width,small=False):
    p=Paragraph(clean(t),SMALL if small else STYLE);_,h=p.wrap(width,H)
    p.drawOn(c,x,y-h);return y-h-9

def table(c,rows,x,y,widths):
    cells=[[Paragraph(escape(clean(s)),SMALL) for s in row] for row in rows]
    t=Table(cells,colWidths=widths,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),PALE),('VALIGN',(0,0),(-1,-1),'TOP'),
        ('BOTTOMPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),8),
        ('LINEBELOW',(0,0),(-1,0),.6,RC),('LINEBELOW',(0,1),(-1,-1),.25,PALE)]))
    _,h=t.wrap(sum(widths),H);t.drawOn(c,x,y-h);return y-h-14

def frame(c,title,page,hash_prefix):
    c.setFillColor(white);c.rect(0,0,W,H,fill=1,stroke=0)
    text(c,32,H-30,'ASHLEY HEIGHTS  /  GARAGE FLOOR OVER BASEMENT',10,True)
    text(c,32,H-60,title,23,True)
    text(c,32,H-82,'BB02 / VB01 / 9 November 2026 / Supplier enquiry - NOT FOR CONSTRUCTION',10,False,AMBER)
    c.setStrokeColor(RC);c.line(32,37,W-32,37)
    text(c,32,22,'Model dimensions, not survey setting-out. Capacity and reinforcement are unverified.',8,False,MUTED)
    text(c,W-212,22,f'Data {hash_prefix}  |  {page} / 4',8,False,MUTED)

def rect(c,x,y,w,h,fill,stroke=INK):
    c.setFillColor(fill);c.setStrokeColor(stroke);c.setLineWidth(.45);c.rect(x,y,w,h,fill=1,stroke=1)

def dim(c,x1,x2,y,label):
    c.setStrokeColor(MUTED);c.setLineWidth(.5);c.line(x1,y,x2,y)
    for x in (x1,x2):c.line(x-2,y-3,x+2,y+3)
    c.setFont('Helvetica',9);c.setFillColor(INK);c.drawCentredString((x1+x2)/2,y+5,clean(label))

def draw_plan(c,m,s):
    by={e['id']:e for e in m['elements']};slab=by['M-G01-GARAGE-SLAB']
    xmin,ymin=slab['bounds'][0][:2];xmax,ymax=slab['bounds'][1][:2]
    scale=57;left=67;bottom=91
    def xy(p):return left+(p[0]-xmin)*scale,bottom+(p[1]-ymin)*scale
    def polygon(poly,color):
        if poly.is_empty:return
        if hasattr(poly,'geoms'):
            for g in poly.geoms:polygon(g,color)
            return
        path=c.beginPath();coords=list(poly.exterior.coords);x,y=xy(coords[0]);path.moveTo(x,y)
        for pt in coords[1:]:path.lineTo(*xy(pt))
        path.close();c.setFillColor(color);c.setStrokeColor(MUTED);c.setLineWidth(.3);c.drawPath(path,fill=1,stroke=1)
    plan=footprint(slab['triangles']);polygon(plan,PALE)
    for e in s['elements']:
        if e['deckRole'] in ('beam','block'):polygon(footprint(e['triangles']),BLUE if e['deckRole']=='beam' else BLOCK)
    for ident in s['retainedSupportIds']:
        e=by.get(ident)
        if not e:continue
        geom=footprint(e['triangles']).intersection(plan)
        polygon(geom,RC)
    # Upper masonry sits on the retained solid north strip, not infill.
    polygon(footprint(by['M-BLOCK-4D5245A']['triangles']).intersection(plan),INK)
    x1=xy((5.2825,0))[0];xc1=xy((9.3475,0))[0];xc2=xy((9.5625,0))[0];x2=xy((13.6275,0))[0]
    dim(c,x1,xc1,68,'4065 clear');dim(c,xc2,x2,68,'4065 clear')
    for x,label in (((x1+xc1)/2,'WEST BAY'),((xc2+x2)/2,'EAST BAY')):
        text(c,x-28,bottom+(ymax-ymin)*scale-23,label,9,True)
    text(c,left,bottom+(ymax-ymin)*scale+12,'Upper bearing-wall strip / stair-girder junction',9,True)
    y=H-111;x=600;width=W-x-32
    y=para(c,'<b>Plan / topping hidden</b>',x,y,width)
    for color,label in [(BLUE,'32 precast beams'),(BLOCK,'300 infill pieces'),(RC,'Concrete support below'),(INK,'Upper masonry above solid strip')]:
        rect(c,x,y-9,10,10,color);y=para(c,label,x+17,y+2,width-17,True)-3
    y=para(c,'Beams run east-west across two short bays. Each beam is nominally 4290 mm long, at 345 mm centres.',x,y-7,width)
    y=para(c,'Perimeter bearing: 125 mm.<br/>Centre bearing: 100 mm each side of a 215 mm wall. Opposing ends have a 15 mm modelled gap.',x,y,width)
    y=para(c,'Central support includes two doorway heads. Their reactions, bending, bearing and reinforcement require design.',x,y,width)
    y=para(c,'The complete garage has 7 m clear depth. This drawing covers the current suspended RC deck footprint only; verify its junction with adjacent floor/threshold construction.',x,y,width,True)
    para(c,'Block cuts, simplified beam profiles and bearing lengths are coordination geometry only. No supplier production layout or site measurement is implied.',x,y,width,True)

def generate_pack(m,path):
    path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
    s=m['garageBeamBlock'];v=s['vehicleBrief'];q=s['quantities']
    digest=hashlib.sha256(json.dumps({'selection':s.get('selection'),'spec':v,'quantities':q,'geometry':s['elements'],'loads':s['demandCases'],'axles':s['pairedAxleCases']},sort_keys=True).encode()).hexdigest()
    c=canvas.Canvas(str(path),pagesize=(W,H));c.setTitle('Ashley Heights - Garage deck supplier enquiry BB02 / VB01');c.setAuthor('Ashley Heights project / experimental coordination study')
    frame(c,'Selected beam-and-block brief',1,digest[:10])
    y=H-107
    y=para(c,'The owner has selected <b>beam and block with a designed reinforced topping</b> over the basement, for <b>one fully laden van and one Tesla parked together</b>. The drawn 150 mm beams are provisional geometry only. Please design and price suitable beam sizes, spacing, topping and supports; assess 225 mm beams or another suitable arrangement. Solid RC is retained for comparison.',32,y,W-64)
    rows=[['Owner-agreed vehicle allowance','Maximum gross mass','Static weight','Assumed heavy axle*','Assumed heavier wheel*']]
    for item in v['vehicles']:
        rows.append([item['name'],f"{item['maximumGrossMassKg']/1000:.1f} tonnes",f"{item['grossWeightKN']:.2f} kN",f"{item['movementHeavyAxleKN']:.2f} kN",f"{item['movementHeavyWheelKN']:.2f} kN"])
    y=table(c,rows,32,y,[239,125,115,135,W-64-614])
    y=para(c,f"Together: <b>{v['combinedGrossMassKg']/1000:.1f} tonnes / {v['combinedStaticWeightKN']:.2f} kN static</b>. Both vehicles may be present. This total is not a point load or a substitute for wheel patterns. Vehicles are variable loads and are not counted as permanent resistance to groundwater uplift.",32,y,W-64)
    y=para(c,'*Study assumptions: 65% of gross weight on the heavier axle; 60:40 left-right wheel split; an additional x1.20 movement sensitivity. These are not manufacturer axle ratings or prescribed code factors. Check both directions, both axles, turning and edge positions.',32,y,W-64,True)
    y=table(c,[['Separate preliminary load cases','Basis / limits'],['5.0 kPa vehicle UDL','Provisional Category G screening basis; not added to the vehicle point cases.'],['20 / 25 / 30 kN local point sensitivities','Upper 30 kN case represents a provisional floor jack action. Contact patch and jacking arrangement unconfirmed.'],['Paired van / Tesla wheel loads','1.6 / 1.8 / 2.0 m assumed tracks. One to five beams sharing hypothetically; no sharing assumed verified.'] ],32,y,[215,W-279])
    para(c,'<b>Design basis to confirm:</b> both vehicle allowances exceed 30 kN. JRC first-generation guidance places this in Category G; the applicable UK National Annex, local concentrated actions, combinations and future access restrictions must be confirmed. The original low vehicle sensitivities have been superseded. Neither deck is currently a verified structural design.',32,y,W-64,True)
    c.showPage()
    frame(c,'Floor plan and bearing routes',2,digest[:10]);draw_plan(c,m,s);c.showPage()
    frame(c,'Floor depth and bearing junctions',3,digest[:10])
    # Section diagrams use stated dimensions, enlarged vertically for clarity.
    x=45;y=H-128;scale=1.0
    text(c,x,y,'A / Provisional 150 mm geometry - levels retained',13,True);y-=25
    layers=[(22,'Finish allowance',HexColor('#d6cbb3')),(53,'Screed allowance',HexColor('#dfdfd9')),(100,'Nominal reinforced topping',HexColor('#b9cad4')),(150,'Beam + infill zone',BLUE),(107.4,'Service space',PALE),(31.5,'Ceiling build-up',HexColor('#dddddd'))]
    layerwidth=160;top=y
    for h,label,color in layers:
        # 0.63 points/mm leaves space for all layers.
        hh=h*.63;rect(c,x,y-hh,layerwidth,hh,color);text(c,x+layerwidth+10,y-hh/2-3,f'{h:g} mm  {label}',9);y-=hh
    text(c,x,top+7,'FFL 0.000 m',9,True)
    y=para(c,'Structural underside -0.325 m. Ceiling board top -0.4324 m; finished ceiling -0.4639 m. Nominal topping includes a 25 mm camber/tolerance budget above the 75 mm comparison allowance.',x,y-13,365,True)
    para(c,'Final fire, insulation, acoustic and waterproofing layers remain to be specified and fitted. The diagram preserves current allowances; it does not certify their performance.',x,y,365,True)
    xr=448;yr=H-128
    text(c,xr,yr,'B / Central wall bearing',13,True);yr-=25
    sc=1.05;wallw=215*sc;wallx=xr+37;slabtop=yr-25
    rect(c,wallx,slabtop-195,wallw,115,RC)
    rect(c,wallx-14,slabtop-80,114*sc,60,BLUE)
    rect(c,wallx+115*sc,slabtop-80,114*sc,60,BLUE)
    rect(c,wallx-14,slabtop-20,wallw+28,24,PALE)
    dim(c,wallx,wallx+100*sc,slabtop-213,'100 mm')
    dim(c,wallx+115*sc,wallx+215*sc,slabtop-213,'100 mm')
    text(c,wallx+87,slabtop-100,'15 mm gap',9,True)
    text(c,wallx+61,slabtop-150,'215 mm wall / head',9,True)
    y2=para(c,'Diagram enlarged; not to scale. Grout/closure, restraint ties and wall-head reinforcement require design. The 125 mm perimeter seat needs a coordinated concrete pocket, waterproofing and edge restraint detail.',xr,slabtop-237,W-xr-32,True)
    para(c,'<b>225 mm alternative:</b> 225 beam + 100 topping + 22 finish = 347 mm. Omitting the 53 mm screed allowance lowers the bearing/soffit by 22 mm and leaves about 85 mm above the current ceiling board. Recheck all bearing and opening-head levels; not drawn or adopted.',xr,y2,W-xr-32,True)
    c.showPage()
    frame(c,'Comparison and requested supplier return',4,digest[:10])
    y=H-110
    y=table(c,[['Quantity / interface','Solid RC alternative','Selected beam-and-block'],['Structural envelope','250 mm','150 mm beam + 100 mm topping'],['Site concrete',f"{q['baselineConcreteM3']:.2f} m3",f"{q['siteConcreteM3']:.2f} m3 + {q['groutM3']:.3f} m3 grout"],['Additional precast / blocks','None',f"{q['beamCount']} beams / {q['beamLengthM']:.2f} m; {q['blockCount']} infill pieces"],['Deck self-weight',f"{q['baselineWeightKN']:.1f} kN",f"{q['alternativeWeightKN']:.1f} kN"],['Status','Unverified RC spatial candidate','Selected system; sizes unverified']],32,y,[210,240,W-514])
    y=para(c,'Reduced site concrete is not the same as a complete installed saving. Please return separate supply-only and installed prices, delivery/lifting, reinforcement, grout/topping, local RC strips, formwork/propping, membranes and design inclusions. Identify exclusions and programme assumptions.',32,y,W-64)
    y=para(c,'<b>Required technical return:</b> adopted UK design basis; vehicle/axle/jack load schedule; beam profile, spacing and camber; infill grade and cut layout; topping reinforcement and proven transverse load distribution; reactions at each bearing and doorway head; wall/edge ties and basement diaphragm action; construction-stage checks; fire rating and coordinated floor/ceiling build-up. Mark any change in floor height or support geometry.',32,y,W-64)
    y=para(c,'<b>Project structural engineer:</b> coordinate the supplier reactions with concrete strips, basement walls, opening heads, raft, groundwater uplift and temporary works. A lighter deck slightly reduces ground pressure but also reduces uplift resistance. Retained upper masonry must stay on a designed support strip, not the infill.',32,y,W-64)
    y=para(c,'<b>Do not infer approval from the comparison:</b> old supplier tables are legacy BS 8110 benchmarks. The current 150 mm option has unresolved local load-sharing demands. No bars, mesh, tendons, concrete pockets or production beam sizes are selected by this enquiry.',32,y,W-64,True)
    y=para(c,'<b>Sources / issue record</b>',32,y,W-64,True)
    sources=[('JRC Eurocode 1 workshop / p32 - categories and indicative actions',v['codeBasis']['sources'][0]['url']),('IStructE - UK Eurocode transition / confirm edition at design appointment',v['codeBasis']['sources'][1]['url']),('Forterra / Bison - site-specific beam-and-block design and quotation','https://www.forterra.co.uk/bison/beam-block-floors/'),('Stressline guide / legacy reference only',s['supplierReference']['url'])]
    for label,url in sources:
        y=para(c,f'<link href="{escape(url)}" color="#236a88">{escape(label)}</link>',32,y,W-64,True)+4
    c.save()
    return {'path':str(path.relative_to(ROOT)) if path.is_relative_to(ROOT) else str(path), 'pages':4,'dataSha256':digest,'approvedForConstruction':False,'sentToSupplier':False}

if __name__=='__main__':
    m=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
    out=ROOT/'walkthrough/public/structure/garage-deck-enquiry.pdf'
    print(json.dumps(generate_pack(m,out),indent=2))
