"""Render a numerical trial booklet and append the current coordination drawings."""
from pathlib import Path
import json,hashlib,shutil
from xml.sax.saxutils import escape
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape,A3
from reportlab.platypus import Paragraph,Table,TableStyle
from reportlab.lib.styles import ParagraphStyle
from reportlab.graphics import renderPDF
from svglib.svglib import svg2rlg
from pypdf import PdfReader,PdfWriter

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'revisions/structural-trials-2026-10-26';OUT.mkdir(exist_ok=True,parents=True)
DATA=ROOT/'walkthrough/public/structure/trials.json';d=json.loads(DATA.read_text())
W,H=landscape(A3);M=38;INK=HexColor('#233f56');MUTED=HexColor('#657f92');y=0
style=ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=15,textColor=INK)
f=lambda n,digits=2:f'{n:.{digits}f}' if n is not None else '-'
e=lambda t:escape(str(t).translate(str.maketrans({'²':'^2','³':'^3','⁴':'^4','–':'-','—':'-'})))
body=OUT/'UK-T01-calculations.pdf';c=Canvas(str(body),pagesize=(W,H));c.setTitle('Ashley Heights UK-T01 - Experimental structural study')

def page(number,title,subtitle):
 global y
 c.setFillColor(INK);c.setFont('Helvetica-Bold',13);c.drawString(M,H-34,'ASHLEY HEIGHTS / UK STRUCTURAL TRIALS')
 c.setFont('Helvetica',9);c.drawRightString(W-M,H-34,number+' | UK-T01 | 26 OCT 2026')
 c.setFillColor(HexColor('#fff1d7'));c.rect(M,H-76,W-2*M,24,fill=1,stroke=0)
 c.setFillColor(HexColor('#8e6423'));c.setFont('Helvetica-Bold',9);c.drawString(M+10,H-68,'EXPERIMENTAL ASSUMPTIONS - NOT FOR CONSTRUCTION, FABRICATION OR ORDERS')
 c.setFillColor(INK);c.setFont('Helvetica-Bold',23);c.drawString(M,H-113,title)
 c.setFillColor(MUTED);c.setFont('Helvetica',10);c.drawString(M,H-135,subtitle)
 c.setStrokeColor(HexColor('#d9e3ea'));c.line(M,43,W-M,43)
 c.setFillColor(MUTED);c.setFont('Helvetica',8);c.drawString(M,27,'Chosen scenarios are not guaranteed site bounds. Validate the structural design before physical works.');c.drawRightString(W-M,27,number)
 y=H-165

def para(text,size=10,space=12):
 global y
 p=Paragraph(text,ParagraphStyle('p',parent=style,fontSize=size,leading=size*1.45));_,h=p.wrap(W-2*M,H)
 if y-h<55:raise RuntimeError(f'Page overflow: {text[:80]} y={y} h={h}')
 p.drawOn(c,M,y-h);y-=h+space

def heading(text):
 global y
 c.setFillColor(INK);c.setFont('Helvetica-Bold',12);c.drawString(M,y,text);y-=22

def table(headers,rows,widths=None,size=9):
 global y
 widths=widths or [(W-2*M)/len(headers)]*len(headers)
 st=ParagraphStyle('cell',parent=style,fontSize=size,leading=size*1.45)
 content=[[Paragraph('<b>'+e(x)+'</b>',st) for x in headers]]+[[Paragraph(e(x).replace('\n','<br/>'),st) for x in r] for r in rows]
 t=Table(content,colWidths=widths,repeatRows=1,hAlign='LEFT');t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor('#eaf1f6')),('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,0),(-1,-1),.4,HexColor('#dce6ee')),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9)]));_,h=t.wrap(W-2*M,H)
 if y-h<55:raise RuntimeError(f'Table overflow {headers} y={y} h={h}')
 t.drawOn(c,M,y-h);y-=h+18

def finish():c.showPage()

page('UK-000','Experimental basis and selected scenarios','England / UK National Annex basis / published UK supplier data')
para('<b>What this issue does:</b> compares four local first-floor joist bays, three timber headers in a proposed bearing stud wall, two steel support hypotheses, six generic cavity-lintel cases and basement load/quantity sensitivities. It appends the current geometry coordination drawings and retains links to the complete 572-element architectural register. It is not a whole-building structural design.')
para(e(d['correction']))
para(e(d['boundsMeaning']))
table(['Input / units','Lower','Reference','Higher'],[[name]+[f(s[key],digits) for s in d['scenarios']] for name,key,digits in [('Floor permanent Gk / kN/m2','floorGk',2),('Floor imposed Qk / kN/m2','floorQk',2),('Added span allowance / m','spanAllowanceM',2),('Garage-head permanent line load / kN/m','masonryLineGk',1),('Extra permanent midspan point load / kN','pointGk',1),('Assumed K0 / dimensionless','K0',2),('Surface surcharge / kPa','surchargeKPa',1),('Water head above base underside / m','waterHeadM',2)]],size=9)
para(e(d['floorLoadBasis']),9)
para('<b>Owner decisions:</b> brick outer leaf, insulated cavity and load-bearing blockwork for new external house walls; a load-bearing timber stud wall is the preferred gym partition option. Small framing/layout adjustments are acceptable. No ground investigation or structural engineer report is available.',9)
finish()

page('UK-001','Local spans and the supporting walls below','First floor / correcting the whole-wing bounding-box assumption')
svg=ROOT/'walkthrough/test-results/structural-trials-2026-10-26/span-directions.svg';drawing=svg2rlg(str(svg));scale=min((W-2*M)/drawing.width,(y-60)/drawing.height);drawing.scale(scale,scale);renderPDF.draw(drawing,c,M,58);finish()

page('UK-002','First-floor joist supplier comparisons','James Jones JJI Table 16 / conditional choices at 400 mm centres')
rows=[]
for z in d['floors']:
 for case in z['cases']:
  p=case['choices'][0]['candidate'];rows.append([z['id']+' / '+z['name'],case['scenario'],f(case['engineeringSpanM'],3)+' m',p['name'] if p else 'No table candidate',f(p['maximumEngineeringSpanMm']/1000,3)+' m' if p else '-',f(case['illustrativeBuildUpMm'],0)+' mm',f(case['reactionPerBearingKNperM'])+' kN/m'])
table(['Bay','Scenario','Engineering span','First shallow candidate','Table span limit','Build-up*','SLS end reaction / m'],rows,[260,85,130,170,125,115,229],8.5)
para('*Build-up = joist depth + 22 mm deck + 15 mm ceiling + 20 mm finish. Not a complete acoustic/fire/services specification. Existing visual floor envelope is commonly 200 mm. The floor levels, stair headroom and supporting heads must be recoordinated.',9)
para(e(d['joistConditions']),9)
para('The 2.0 kN/m2 permanent + 2.0 kN/m2 imposed stress case is outside this table. No choice is returned. Full 480/600 mm alternatives and source data are retained in trials.json. Supplier-table vibration assumptions do not establish performance in these actual rooms.',9)
finish()

page('UK-003','Preferred gym wall: load-bearing timber studs','Normal structural timber framing can retain the glazed openings; no masonry piers assumed')
para(e(d['timberWall']['loadBasis']),9)
rows=[]
for h in d['timberHeaders']:
 for case in h['cases']:
  p=case['candidate'];rows.append([h['id']+' '+h['name']+' / '+f(h['clearSpanM'])+' m',case['scenario'],p['section'] if p else 'Outside C24 shortlist',f(max(r['reactionKN'] for r in p['strengthCases']))+' kN' if p else '-',f(p['requiredDirectBearingLengthMm'],0)+' mm' if p else '-',f(p['finalDeflectionMm'])+' mm' if p else '-',f(case['extraHeightWith90MmPlateAllowance'],0)+' mm' if p else '-'])
table(['Opening','Scenario','Conditional header','ULS end reaction','Direct bearing indication','Final deflection','Extra head height*'],rows,[230,85,225,140,145,140,149],8.5)
para('*Header plus an illustrative 90 mm top-plate allowance, compared with current 200 mm window head / 267 mm door head zones. This is not a plate detail. The selected header may not fit without lowering glazing, integrating the binder, changing the header type or revising floor depth.',9)
para(e(d['timberWall']['coordination']),9)
para('<b>Not checked:</b> stud axial/buckling capacity and spacing, plate compression, connections, ply load sharing, whole-wall stability, fire and acoustic performance. Direct bearing length is an indication using kc90=1; it is not a stud-pack specification. Higher cases outside the C24 shortlist require revised framing or UK-supplied LVL design.',9)
para('<b>Below the wall:</b> '+e(d['timberWall']['supportBelow']),9)
finish()

page('UK-004','Steel screening and the limits of the result','Garage-door head / full-span gym alternative retained for comparison only')
rows=[]
for b in d['beams']:
 for case in b['cases']:
  p=case['candidate'];rows.append([b['id'],case['scenario'],p['section'] if p else 'No shortlist candidate',f(p['engineeringSpanM'],3)+' m' if p else '-',f(p['uls']['momentKNm'])+' kNm' if p else '-',f(p['uls']['reactionKN'])+' kN' if p else '-',f(p['sls']['deflectionMm'])+' mm' if p else '-'])
table(['Study','Scenario','Conditional S355 UB','Engineering span','ULS moment','ULS reaction / end','SLS deflection'],rows,size=9)
for b in d['beams']:para('<b>'+e(b['id']+' / '+b['name'])+'</b><br/>'+e(b['basis']),9)
para(e(d['steelConditions']),9)
para(e(d['steelDeflection']),9)
para(e(d['formulas']['steel']),9)
para('Bending uses elastic section modulus and class <=3 eligibility under pure bending. Shear uses the flat-web area conservatively, rejects high-shear interaction and applies a slenderness gate. Neither screen verifies lateral-torsional restraint/buckling, axial effects, load introduction or support capacity. All candidate results, including failures, are in trials.json.',9)
finish()

page('UK-005','Opening-head sensitivity and register coverage','103 architectural heads registered / 6 generic external cavity-wall comparisons')
rows=[]
for l in d['lintels']:
 if not l['cases']:continue
 low,ref,high=l['cases'];p=ref['candidate'];rows.append([l['id']+' / '+l['name'].replace('Proposal | ',''),f(l['headEnvelopeLengthM'])+' m',str(p['lengthMm'])+' mm' if p else 'Outside catalogue',str(p['swlKN'])+' kN' if p else '-',f(low['totalUnfactoredUDLKN'])+' kN',f(ref['totalUnfactoredUDLKN'])+' kN',f(high['totalUnfactoredUDLKN'])+' kN / ratio outside table'])
table(['Reference / modelled head','Proxy clear span','CG150/100 length','SWL','Lower load','Reference load','Higher load'],rows,[300,110,140,95,120,120,229],8.5)
para('Modelled head extent is only a proxy. Catalogue length comparison adds 150 mm bearing at each end, but neither actual clear opening nor bearing length/masonry strength has been verified. Do not place an order from this comparison.')
para('Generic masonry sensitivity: unit weight 20 kN/m3, outer leaf 102.5 mm, loaded masonry heights 0.6 / 1.2 / 2.4 m and inner:outer load ratios 1:1 / 3:1 / 6:1. No arching reduction or point loads. The first two ratios are explicitly listed by the supplier; 6:1 is outside this data. A load greater than the stated SWL fails even this limited comparison.')
para('Catnic SWL is total unfactored UDL, not an ultimate resistance. The comparison uses service loads. Catalogue cavity is 150-165 mm; inner leaf 100-115 mm; outer leaf is stated as 100-102 mm. Confirm suitability for the chosen 102.5 mm brick and actual wall build-up with the supplier.')
para('The other 97 heads are not automatically sized: some are internal or retained, others lack a reconciled cavity/opening/load basis. The separate timber-wall header study and garage-head steel hypothesis do not turn the architectural head register into a complete engineered lintel schedule.')
finish()

page('UK-006','Basement earth pressure and groundwater sensitivity','115.525 m2 architectural footprint / 3.05 m retained-height illustration')
rows=[]
for s,r in zip(d['scenarios'],d['basement']['cases']):rows.append([s['id'],f(s['K0']),f(s['soilGamma'])+' / '+f(s['saturatedGamma']),f(s['surchargeKPa']),f(s['waterHeadM']),f(r['basePressureKPa']),f(r['resultantKNperM']),f(r['cantileverBaseMomentKNmPerM']),f(r['upliftKN'],0)])
table(['Scenario','K0','Soil dry / sat. kN/m3','Surcharge kPa','Water head m','Base pressure kPa','Resultant kN/m','Base moment kNm/m','Buoyancy kN'],rows,size=8.5)
para(e(d['basementBasis']))
para(e(d['formulas']['retaining']))
para(e(d['formulas']['uplift']))
para('Current 250 mm base self-weight alone is '+f(d['basement']['cases'][0]['currentBaseSelfWeightOnlyKN'],0)+' kN. It excludes walls, roof slab and superstructure; no full-building flotation safety factor or pass/fail is calculated. Groundwater at or above grade, blocked drains and construction stages require separate assessment.')
para('<b>Not established:</b> soil stratigraphy, effective stress parameters, drainage conditions, clay heave/shrinkage, ground bearing capacity, settlement, adjoining foundation surcharge, wall restraint, excavation sequence, anchorage or structural continuity. Values can fall outside all three chosen cases.')
para('<b>No reinforcement or foundation dimensions issued.</b> Concrete bending/shear/punching, crack control, joints, waterstops, waterproofing coordination, flotation design and temporary works require a site-specific structural/geotechnical scheme.')
finish()

page('UK-007','Concrete volumes and masonry quantity rates','Geometric sensitivities / UK module sizes / no procurement quantities')
table(['Illustrative thickness','Base slab only','Wall shell only, 2.58 m high'],[[f(v['thicknessM']*1000,0)+' mm',f(v['baseVolumeM3'])+' m3',f(v['wallVolumeM3'])+' m3'] for v in d['basement']['concreteVolumes']])
para('Same stepped outside footprint for each case. Wall volume = (outside polygon area - inward-offset polygon area) x 2.58 m, counting corners once. No openings deducted. Slab and wall thicknesses are independent geometry cases, not paired engineering selections. Excludes basement roof slab, footings/piles, blinding, reinforcement, waste and construction allowances.',9)
q=d['quantityRates'];table(['Per 100 m2 NET leaf face','No waste','5% allowance','10% allowance'],[['215 x 102.5 x 65 mm brick',*q['brickCountsPer100M2']],['440 x 215 mm face block',*q['blockCountsPer100M2']]])
para('Using 10 mm nominal joints: 1/(0.225 x 0.075) = '+f(q['bricksPerM2'])+' bricks/m2; 1/(0.450 x 0.225) = '+f(q['blocksPerM2'])+' blocks/m2. Counts are rounded up for the stated 100 m2 example. Actual bond, returns, specials and pack sizes alter the order.',9)
para(e(q['basis']),9)
para('Whole-house brick and block totals remain unissued: the model uses a 230 mm architectural wall shell and decorative surface fragments, not a reconciled brick/cavity/block assembly. Summing those fragments would misstate the order. Establish net leaf areas, actual openings, reveals and the final wall thickness first.',9)
finish()

page('UK-008','Calculation audit, references and next design gates','Source-linked formulas / reusable input and result files / UK-T01')
para(e(d['formulas']['timber']),8.5)
para('UK sources: England Approved Documents A and C; BS EN 1990/1991/1992/1993/1995/1996/1997 with their applicable UK National Annexes. This trial uses first-generation assumptions; appointed designers must confirm editions and national choices. The Swedish Wood formulas are Eurocode educational guidance, not UK project approval.',9)
for src in d['sources']:
 para('<link href="'+e(src['url'])+'" color="#346c8c">'+e(src['id']+' / '+src['title'])+'</link>',8.5,5)
para('<b>Audit:</b> trials.json contains all inputs, rejected and passing limited screens, supplier data references and source hashes. Rebuilds reject stale source files. Unit checks cover equilibrium/units, supplier-table boundaries, unsupported load ratios, creep and independently integrated earth/water pressure.',8.5)
para('<b>Appendix:</b> the following P01 coordination sheets show current architectural structural zones, not fully designed members. Trial directions/header/stud axes are also available as an optional layer in the local structural viewer. No approved structural design or changed architectural model is implied.',8.5)
finish();c.save()

coord=ROOT/'revisions/structural-workspace-2026-10-26/Ashley-Heights-Structural-Coordination-P01.pdf'
target=OUT/'Ashley-Heights-UK-Structural-Trial-Study-T01.pdf'
w=PdfWriter()
for p in [body,coord]:
 for page_ in PdfReader(p).pages:w.add_page(page_)
w.add_metadata({'/Title':'Ashley Heights - UK Structural Trial Study T01 - Not for construction'})
with target.open('wb') as f_:w.write(f_)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
meta={'available':True,'revision':d['revision'],'trialDataSHA256':sha(DATA),'viewSHA256':sha(ROOT/'walkthrough/src/structure-trials.js'),'coordinationSHA256':sha(coord),'pdfSHA256':sha(target)}
for base in ['public','dist']:
 folder=ROOT/f'walkthrough/{base}/structure';shutil.copy2(target,folder/'trial-study.pdf');(folder/'trial-pack.json').write_text(json.dumps(meta,indent=2)+'\n')
print(str(target));print('Pages:',len(PdfReader(target).pages))
