"""Print the shared SVG views into a preliminary coordination PDF (never IFC)."""
from pathlib import Path
import json
import shutil
import hashlib
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A3, landscape
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg

ROOT=Path(__file__).resolve().parents[2]
EVIDENCE=ROOT/'walkthrough/test-results/structural-workspace-2026-10-26'
OUT=ROOT/'revisions/structural-workspace-2026-10-26'
DATA=json.loads((ROOT/'walkthrough/public/structure/model.json').read_text())
W,H=landscape(A3);INK='#193e59';MUTED='#637c8d';LINE='#d7e1e8'
STYLE=ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=15,textColor=HexColor(INK))


def para(c,text,x,y,width,size=10):
    style=ParagraphStyle('local',parent=STYLE,fontSize=size,leading=size*1.5)
    p=Paragraph(text,style);_,h=p.wrap(width,H);p.drawOn(c,x,y-h);return y-h


def header(c,number,title,subtitle):
    c.setFillColor(HexColor(INK));c.setFont('Helvetica-Bold',13);c.drawString(36,H-38,'ASHLEY HEIGHTS / STRUCTURAL COORDINATION')
    c.setFont('Helvetica',9);c.drawRightString(W-36,H-38,number+'  |  P01  |  26 OCT 2026')
    c.setFillColor(HexColor('#fff1d4'));c.rect(36,H-82,W-72,25,fill=1,stroke=0)
    c.setFillColor(HexColor('#856126'));c.setFont('Helvetica-Bold',9);c.drawString(47,H-73,'COORDINATION STUDY - NOT FOR CONSTRUCTION, FABRICATION OR MATERIAL ORDERS')
    c.setFillColor(HexColor(INK));c.setFont('Helvetica-Bold',22);c.drawString(36,H-118,title)
    c.setFont('Helvetica',10);c.setFillColor(HexColor(MUTED));c.drawString(36,H-139,subtitle)
    c.setStrokeColor(HexColor(LINE));c.line(36,43,W-36,43)
    c.setFont('Helvetica',8);c.drawString(36,27,'Model geometry only. Verify against measured survey. No approved member sizes or reinforcement.');c.drawRightString(W-36,27,number)


def text_page(c,number,title,subtitle,columns):
    header(c,number,title,subtitle)
    gap=34;column=(W-72-gap*(len(columns)-1))/len(columns)
    for i,blocks in enumerate(columns):
        x=36+i*(column+gap);y=H-177
        for heading,text in blocks:
            c.setFillColor(HexColor(INK));c.setFont('Helvetica-Bold',12);c.drawString(x,y,heading);y-=15
            y=para(c,text,x,y,column)-24
    c.showPage()


def build():
    OUT.mkdir(parents=True,exist_ok=True);target=OUT/'Ashley-Heights-Structural-Coordination-P01.pdf'
    c=Canvas(str(target),pagesize=(W,H));c.setTitle('Ashley Heights - Structural Coordination P01 - Not for construction')
    text_page(c,'SC-000','Design basis and route to construction','Current Proposed model / brick cavity masonry / concrete basement concept',[
      [
       ('What this issue establishes','An interactive structural register linked to the current architectural model. The same element geometries generate the 3D workspace, floor plans, projected elevations and section. It identifies envelope zones, modelled opening heads and named support studies.'),
       ('Owner decisions','New house walls: brick outer leaf, insulated cavity and load-bearing blockwork inner leaf. The separate garden workshop retains its 215 mm solid-masonry concept. Ground and engineering reports are not available, confirmed by the owner on 26 October 2026.'),
       ('Known architectural constraints','Current basement footprint: 115.525 m2, with its stepped courtyard edge. New wing roof: continuous, matching 29.745-degree pitches. Loft-only courtyard projection: 720 mm. The accepted original-house stair has approximately 2.01 m checked architectural headroom in places; actual structural depth and tolerances remain critical.'),
       ('Dimensions and quantity meaning','Dimensions describe model envelopes, not surveyed spans or fabrication lengths. Areas are projected architectural geometry. No whole-house brick, block, steel or concrete procurement quantities have been issued. Model fragments must first be reconciled into wall leaves, structural floor systems and designed foundations.')
      ],[
       ('What is not designed','Steel sections and connections; joist type, size, spacing and direction; masonry strengths and bearings; lintel products and padstones; lateral restraint and stability; foundations; basement reinforcement and waterproofing joints; temporary works and excavation sequence.'),
       ('Evidence required next','Commission a measured and structural survey, opening-up of existing structure and foundation investigations, geotechnical investigation with groundwater information, drainage/service records and tree constraints. The project structural engineer must set the investigation scope; trial pits and excavation need planned safe execution.'),
       ('Issue path','1. Reconcile measured geometry and decide the wall/floor assemblies.<br/>2. Agree vertical and lateral load paths and support locations.<br/>3. Calculate and check members, connections and foundation reactions.<br/>4. Coordinate basement structure, waterproofing and temporary works.<br/>5. Add the checked design to this register and produce construction drawings, reinforcement and member schedules.<br/>6. Complete the applicable building-control process and site verification before release for construction.'),
       ('Current approval','Zero construction-approved elements. A competent structural engineer with basement experience must design/check and take responsibility for the structural scheme. These drawings do not establish safe excavation or a compliant structural solution.')
      ]])
    text_page(c,'SC-001','Calculation and drawing deliverables','Checklist for the appointed structural engineer and coordinated model',[
      [('Loads and stability','Site-specific wind and snow; permanent, imposed, partition and point loads; terraces, plant and vehicle effects where applicable. Confirm current standards/UK National Annexes and design combinations. Define diaphragms, restraint, racking frames and the complete reaction path to the ground.'),
       ('Steel and opening supports','Each final member reference must link to load derivation, analysis, bending/shear/buckling checks, deflection criteria, connection design, bearings/padstones and reactions. Coordinate cavity outer-leaf support and thermal/fire/corrosion requirements. Existing openings require verification, not automatic replacement.'),
       ('Floors and roof','Choose systems after support layout: timber/I-joist/metal-web or other engineered floors as appropriate; no joist direction has been selected. Provide spans, spacing, trimming, hangers, bearing, restraint, vibration and service-zone details. Coordinate ridge/hip/dormer members, rooflights and cantilever backspan.')],
      [('Basement and foundations','Select the foundation/retaining system from geotechnical results and adjoining foundation surveys. Check earth/water/surcharge pressures, stability, settlement, flotation, bending, shear, punching and cracking as applicable. Issue concrete specifications, cover, reinforcement plans/sections, bar schedules, joints and waterstops, coordinated with the waterproofing specialist.'),
       ('Masonry and quantity take-off','Final drawings must separate brick outer leaf, cavity/insulation and block inner leaf. Include verified openings, lintels, cavity trays, closers, ties, restraint, movement joints, DPC, substructure and local bearing details. Quantify each material from coordinated assemblies, with explicit deductions, specials and waste; do not sum mesh-envelope areas.'),
       ('Construction sequence and record','Define temporary support, excavation and retaining-wall sequence, monitoring and adjoining-building protection with the designers/contractor. Record inspections and design changes. Fabrication and procurement dimensions must be checked on site. No sequence or reinforcement schedule is supplied in this P01 issue.')]
    ])
    text_page(c,'SC-002','Key coordination questions','Items to resolve while protecting the accepted layout',[
      [(q['id']+' / '+q['title'],q['detail']) for q in DATA['coordinationItems'][:3]],
      [(q['id']+' / '+q['title'],q['detail']) for q in DATA['coordinationItems'][3:]]
    ])
    review=json.loads((EVIDENCE/'browser-review.json').read_text())
    assert review['passed'],'Browser checks must pass before making the pack'
    for i,s in enumerate(review['sheets'],10):
        name=s['name'];view=s['view'];level=s['level']
        labels={-1:'Basement',0:'Ground floor',1:'First floor',3:'Loft'}
        title=(labels.get(level,'')+' coordination plan') if view=='plan' else 'Longitudinal coordination section' if view=='section' else view.capitalize()+' structural projection'
        if s['region']=='workshop':title='Garden workshop coordination plan'
        sub='Shared element geometry / dimensions in model metres / use the interactive register to identify lines'
        header(c,f'SC-{i:03}',title,sub)
        drawing=svg2rlg(str(EVIDENCE/(name+'.svg')))
        # Fixed ratio preserves the SVG scale bar on every page.
        scale=min((W-325)/drawing.width,(H-218)/drawing.height)
        drawing.scale(scale,scale);renderPDF.draw(drawing,c,24,59)
        x=W-281;y=H-179
        c.setFillColor(HexColor(INK));c.setFont('Helvetica-Bold',11);c.drawString(x,y,'Reading this drawing');y-=18
        notes=['Cyan: wall envelopes.','Amber: modelled opening-head candidates.','Blue: floor envelopes, not a joist layout.','Green: roof envelope zones.','Purple: basement shell / foundation boundary.','Coral dashed: named support studies.','Grey: retained architectural elements.']
        for note in notes:y=para(c,note,x,y,236,9)-8
        y-=15
        detail='Plans cut at 1.20 m above the selected floor. Floor outlines and opening heads are projected for coordination. Hidden/interior lines remain visible.' if view=='plan' else 'This is an orthographic structural projection with internal lines visible, not a hidden-line architectural elevation.' if view!='section' else 'Exact mesh cut at model X = 9.455 m. No below-ground foundation geometry beyond the architectural basement base is inferred.'
        y=para(c,detail,x,y,236,9)-18
        para(c,'No issued steel sizes, joist spacing, lintel products, concrete thicknesses, reinforcing bars or foundation dimensions. Do not build or order from this issue.',x,y,236,9)
        c.showPage()
    text_page(c,'SC-090','Evidence and reference register','Source geometry, issue identity and independent guidance',[
      [('Model source','outputs/output-proposed-compact/geometry.json<br/>outputs/output-proposed-compact/navigation.json<br/>These are saved architectural exports. They are not a structural measured survey.'),
       ('Source fingerprint','Geometry SHA-256:<br/>'+DATA['sourceHashes']['outputs/output-proposed-compact/geometry.json'][:32]+'<br/>'+DATA['sourceHashes']['outputs/output-proposed-compact/geometry.json'][32:]),
       ('Live element register','The local workspace is available at http://127.0.0.1:8765/structure/. Its model.json and schedule.json retain complete element references and source hashes. Geometry changes invalidate the structural build rather than silently leaving a stale register.')],
      [('England - structural guidance','<link href="https://www.gov.uk/government/publications/structure-approved-document-a" color="#346c8c">Approved Document A: structure</link><br/>Foundations, walls, floors and roofs; checked 26 October 2026.'),
       ('Ground and moisture','<link href="https://www.gov.uk/government/publications/site-preparation-and-resistance-to-contaminates-and-moisture-approved-document-c" color="#346c8c">Approved Document C</link><br/>Ground conditions and moisture guidance; checked 26 October 2026.'),
       ('Domestic structural engineering','<link href="https://www.istructe.org/resources/guidance/structural-engineering-for-domestic-clients/" color="#346c8c">IStructE: introduction for domestic clients</link><br/>Structural assessment, calculations, foundation investigation and on-site measurement; checked 26 October 2026.'),
       ('Scope of this issue',DATA['coverage']['scope']+' '+DATA['coverage']['openingSchedule'])]
    ])
    c.save()
    for dest in [ROOT/'walkthrough/public/structure/coordination-pack.pdf',ROOT/'walkthrough/dist/structure/coordination-pack.pdf']:shutil.copy2(target,dest)
    sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
    pack={'available':True,'revision':DATA['revision'],'dataSHA256':sha(ROOT/'walkthrough/public/structure/model.json'),'viewSHA256':sha(ROOT/'walkthrough/src/structure-geometry.js'),'pdfSHA256':sha(target)}
    for base in ['public','dist']:(ROOT/f'walkthrough/{base}/structure/pack.json').write_text(json.dumps(pack,indent=2)+'\n')
    print(target)


if __name__=='__main__':build()
