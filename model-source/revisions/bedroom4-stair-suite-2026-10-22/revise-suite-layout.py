import json
from pathlib import Path
R=Path(__file__).resolve().parents[2];p=R/'proposal/specs/bedroom4-stair-suite-components.json';a=json.loads(p.read_text());cfg=a['configuration'];s=cfg['suite']
s.update(dressing=[-5.065,1.015,-.115,2.98],bathroom=[-5.065,3.1,-.115,4.22],bathroomRear=[-5.065,4.22,-2.94,5.04],bathroomPolygon=[[-5.065,3.1],[-.115,3.1],[-.115,4.22],[-2.94,4.22],[-2.94,5.04],[-5.065,5.04]],connection=[0,1.25,0,2.30],bathEntry=[-2.89,3.04,-1.99,3.04],wardrobes=[[-5.04,2.38,-2.95,2.98],[-1.90,2.38,-.135,2.98]],bath=[-1.9,3.30,-.2,4.10],vanity=[-5.02,3.13,-3.62,3.68],wc=[-3.55,3.12,-2.95,3.82])
a['parts']=[o for o in a['parts']if not o['name'].startswith(('Suite dressing room floor','Suite bathroom floor','Dressing north partition','Bathroom east privacy partition','Bathroom door head','Suite connecting threshold','Bathroom threshold'))]
def box(name,r,z,Z,mat,role):
 x,y,X,Y=r;v=[[x,y,z],[X,y,z],[X,Y,z],[x,Y,z],[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]];a['parts'].append({'name':name,'role':role,'color':mat,'vertices':v,'faces':[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]})
oak=[.64,.47,.29];stone=[.78,.77,.7];plaster=[.88,.87,.82]
box('Suite dressing room floor',s['dressing'],2.795,2.812,oak,'floor')
for r in [s['bathroom'],s['bathroomRear']]:box('Suite bathroom floor',r,2.795,2.812,stone,'floor')
for r in [[-5.065,2.98,-2.89,3.1],[-1.99,2.98,-.115,3.1],[-2.88,4.22,-.115,4.34]]:box('Combined bathroom privacy partition',r,2.8,5.168,plaster,'new')
box('Bathroom door head',[-2.89,2.98,-1.99,3.1],4.881,5.168,plaster,'new')
box('Suite connecting threshold',[-.14,1.25,.14,2.30],2.795,2.812,oak,'floor')
box('Bathroom threshold',[-2.89,2.98,-1.99,3.1],2.795,2.812,oak,'floor')
p.write_text(json.dumps(a,separators=(',',':')))
(R/'revisions/bedroom4-stair-suite-2026-10-22/main-layout.json').write_text(json.dumps(cfg,indent=2))
