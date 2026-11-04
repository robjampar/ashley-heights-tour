import json
from pathlib import Path
R=Path(__file__).resolve().parents[2];p=R/'proposal/specs/bedroom4-stair-suite-components.json';a=json.loads(p.read_text());cfg=a['configuration'];s=cfg['suite']
s.update(dressingPolygon=[[-5.065,1.015],[-.115,1.015],[-.115,2.68],[-2.89,2.68],[-2.89,2.98],[-5.065,2.98]],bathroomPolygon=[[-5.065,3.1],[-2.89,3.1],[-2.89,2.8],[-.115,2.8],[-.115,4.22],[-2.94,4.22],[-2.94,5.04],[-5.065,5.04]],connection=[0,1.1,0,2.02],bathEntry=[-2.89,2.74,-1.99,2.74],wardrobes=[[-5.04,2.38,-2.95,2.98],[-1.90,2.08,-.135,2.68]],vanity=[-1.90,3.67,-.30,4.22],wc=[-4.9,3.15,-4.3,3.55],bath=None)
s['dressing']=[-5.065,1.015,-.115,2.68];s['dressingRear']=[-5.065,2.68,-2.89,2.98];s['bathroom']=[-5.065,3.1,-.115,4.22];s['bathroomFront']=[-2.89,2.8,-.115,3.1]
a['parts']=[o for o in a['parts']if not o['name'].startswith(('Suite dressing room floor','Suite bathroom floor','Combined bathroom privacy partition','Bathroom door head','Suite connecting threshold','Bathroom threshold'))]
def box(name,r,z,Z,mat,role):
 x,y,X,Y=r;v=[[x,y,z],[X,y,z],[X,Y,z],[x,Y,z],[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]];a['parts'].append({'name':name,'role':role,'color':mat,'vertices':v,'faces':[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]})
oak=[.64,.47,.29];stone=[.78,.77,.7];plaster=[.88,.87,.82]
for r in [s['dressing'],s['dressingRear']]:box('Suite dressing room floor',r,2.795,2.812,oak,'floor')
for r in [s['bathroom'],s['bathroomRear'],s['bathroomFront']]:box('Suite bathroom floor',r,2.795,2.812,stone,'floor')
for r in [[-5.065,2.98,-2.89,3.1],[-2.95,2.68,-2.89,3.1],[-1.99,2.68,-.115,2.8],[-2.88,4.22,-.115,4.34]]:box('Combined bathroom privacy partition',r,2.8,5.168,plaster,'new')
box('Bathroom door head',[-2.89,2.68,-1.99,2.8],4.881,5.168,plaster,'new')
box('Suite connecting threshold',[-.14,1.1,.14,2.02],2.795,2.812,oak,'floor');box('Bathroom threshold',[-2.89,2.68,-1.99,2.8],2.795,2.812,oak,'floor')
# Match the adjacent retained first-floor ceiling elevation exactly.
for part in a['parts']:
 if part['name']=='Restored first-floor ceiling at old stair':
  for v in part['vertices']:
   if abs(v[2]-5.237)<1e-5:v[2]=5.25
p.write_text(json.dumps(a,separators=(',',':')));(R/'revisions/bedroom4-stair-suite-2026-10-22/main-layout.json').write_text(json.dumps(cfg,indent=2))
p=R/'scripts/model/proposal_bedroom4_stair_suite.py';t=p.read_text().replace('[-.14,1.25,2.795,.14,2.30,4.95]','[-.14,1.1,2.795,.14,2.02,4.95]').replace('for y in (1.25,2.30):','for y in (1.1,2.02):').replace('(0,1.775,4.94),(.28,1.075,.024)','(0,1.56,4.94),(.28,.945,.024)')
a=t.index('    # Double vanity');e=t.index("    a,y,c,Y=s['shower']",a)
t=t[:a]+'''    # Double vanity on the solid north wall, with a clear 870 mm aisle.
    a,y,c,Y=s['vanity'];b.box_bounds('double vanity cabinet',s['vanity'],z+.30,z+.80,oak,.009)
    for xx in(-1.5,-.7):
        cx,cy=hollow_basin(b,[xx-.395,y,xx+.395,Y],z,m)
        b.tube('wall basin mixer',[(xx,4.205,z+1.06),(xx,cy,z+1.06),(xx,cy,z+1.01)],.012,bronze)
        b.cylinder('basin mixer collar',(xx,4.21,z+1.06),.03,.018,bronze,(0,-1,0))
    b.box('wide vanity mirror',(-1.1,4.207,z+1.55),(1.58,.012,.90),m['mirror'],.003)
    for xx in(-1.88,-.32):
        b.box('mirror light bronze',(xx,4.19,z+1.55),(.020,.045,.60),bronze,.005);b.box('mirror light diffuser',(xx,4.164,z+1.55),(.012,.006,.56),m['light'],.002)
    b.light('vanity face glow',(-1.1,3.85,z+1.75),.25,24,1.5);b.obstacle('double vanity',s['vanity'],z,z+.86)
    ns['nav'].setdefault('mirrors',[]).append({'name':SUITE+'wide vanity mirror','position':[-1.1,4.199,z+1.55],'normal':[0,-1,0],'width':1.58,'height':.9})
    # Low drawers sit below, rather than across, the retained front window.
    b.box_bounds('window dressing drawers',[-3.70,1.025,-1.48,1.315],z+.08,z+.62,oak,.008)
    b.box('window seat cushion',(-2.59,1.17,z+.65),(2.22,.29,.06),m['linen'],.02)
    for xx in(-3.33,-2.59,-1.85):b.box('window drawer pull',(xx,1.323,z+.45),(.22,.014,.012),bronze,.003)
    b.obstacle('low dressing window drawers',[-3.70,1.025,-1.48,1.315],z,z+.68)
''' +t[e:]
t=t.replace("Matrix.Translation(Vector((-3.25,3.47,z)))@Matrix.Rotation(math.pi/2,4,'Z')", "Matrix.Translation(Vector((-4.60,3.35,z)))")
t=t.replace("[-3.55,3.0,-2.95,3.77]", "[-5.09,3.05,-4.30,3.65]")
t=t.replace("door('bathroom entry',[-2.853,3.04,z],[1,0],[-2.44,3.04],.124,math.pi/2)", "door('bathroom entry',[-2.027,2.74,z],[-1,0],[-2.44,2.74],.124,-math.pi/2)")
t=t.replace("[1.775,1.05,0,2.15,'door']", "[1.56,.92,0,2.15,'door']").replace('[-.14,1.25,.14,2.30]','[-.14,1.1,.14,2.02]').replace('[-2.89,2.98,-1.99,3.1]','[-2.89,2.68,-1.99,2.8]').replace("'crossWallOpening':[1.25,2.30]", "'crossWallOpening':[1.1,2.02]")
t=t.replace("('suite dressing floor',s['dressing'],z+.012)","('suite dressing floor',s['dressing'],z+.012),('suite dressing rear',s['dressingRear'],z+.012)")
t=t.replace("('suite bathroom floor',s['bathroom'],z+.012)","('suite bathroom floor',s['bathroom'],z+.012),('suite bathroom front',s['bathroomFront'],z+.012)")
t=t.replace("s['bathroomPolygon']if label=='Suite bathroom'else rect(r)","s['bathroomPolygon']if label=='Suite bathroom'else s['dressingPolygon']if label=='Suite dressing room'else rect(r)")
p.write_text(t)
