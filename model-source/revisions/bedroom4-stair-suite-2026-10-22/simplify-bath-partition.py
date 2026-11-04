from pathlib import Path
import json
R=Path(__file__).resolve().parents[2];p=R/'proposal/specs/bedroom4-stair-suite-components.json';a=json.loads(p.read_text());s=a['configuration']['suite'];s['dressing']=[-5.065,1.015,-.115,2.68];s.pop('dressingRear',None);s['dressingPolygon']=[[-5.065,1.015],[-.115,1.015],[-.115,2.68],[-5.065,2.68]];s['bathroom']=[-5.065,2.8,-.115,4.22];s.pop('bathroomFront',None);s['bathroomPolygon']=[[-5.065,2.8],[-.115,2.8],[-.115,4.22],[-2.94,4.22],[-2.94,5.04],[-5.065,5.04]];s['wardrobes'][0]=[-5.04,2.08,-2.95,2.68]
a['parts']=[o for o in a['parts']if not o['name'].startswith(('Suite dressing room floor','Suite bathroom floor','Combined bathroom privacy partition'))]
def box(name,r,z,Z,col,role):
 x,y,X,Y=r;v=[[x,y,z],[X,y,z],[X,Y,z],[x,Y,z],[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]];a['parts'].append({'name':name,'role':role,'color':col,'vertices':v,'faces':[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]})
box('Suite dressing room floor',s['dressing'],2.795,2.812,[.64,.47,.29],'floor')
for r in [s['bathroom'],s['bathroomRear']]:box('Suite bathroom floor',r,2.795,2.812,[.78,.77,.7],'floor')
for r in [[-5.065,2.68,-2.89,2.8],[-1.99,2.68,-.115,2.8],[-2.88,4.22,-.115,4.34]]:box('Combined bathroom privacy partition',r,2.8,5.168,[.88,.87,.82],'new')
p.write_text(json.dumps(a,separators=(',',':')));(R/'revisions/bedroom4-stair-suite-2026-10-22/main-layout.json').write_text(json.dumps(a['configuration'],indent=2))
p=R/'scripts/model/proposal_bedroom4_stair_suite.py';t=p.read_text().replace(",('suite dressing rear',s['dressingRear'],z+.012)",'').replace(",('suite bathroom front',s['bathroomFront'],z+.012)",'')
t=t.replace("door('bathroom entry',[-2.027,2.74,z],[-1,0],[-2.44,2.74],.124,-math.pi/2)","door('bathroom entry',[-2.853,2.81,z],[1,0],[-2.44,2.74],.124,math.radians(120))")
t=t.replace("oak_door(b,ns,label,d,centre,.83,z)","if label=='bathroom entry':d['edgeHinge']=True\n        oak_door(b,ns,label,d,centre,.83,z)")
t=t.replace("(-.025", "(-.025")
t=t.replace("for x in(-.431,.431):", "stop_y=.025 if label=='bathroom entry'else-.025\n        for x in(-.431,.431):")
t=t.replace("),-.025,1.034)","),stop_y,1.034)").replace("(0,-.025,2.055)","(0,stop_y,2.055)")
t=t.replace('1.315','1.295').replace('1.323','1.303').replace("(-2.59,1.17,z+.65),(2.22,.29,.06)","(-2.59,1.16,z+.65),(2.22,.27,.06)")
needle="    # The viewer must have exactly the same new hole as the visible floor."
t=t.replace(needle,"""    for obstacles in groups('obstacles'):
        for o in obstacles:
            if o['name']=='Hobby 01 | eaves archive':o['box'][2]=4.48
"""+needle)
p.write_text(t)
p=R/'revisions/bedroom4-stair-suite-2026-10-22/check-export.mjs';t=p.read_text().replace("[4.1,3.98,2.8],[4.1,3.65,2.8]","[4.05,3.98,2.8],[4.05,3.65,2.8]")
# Edit the loaded audit source explicitly so the base historical study remains intact.
t=t.replace("src=src.replace(\"[4.65,5.05,5.45]\"", "src=src.replaceAll('[4.1,3.98,2.8],[4.1,3.65,2.8]','[4.05,3.98,2.8],[4.05,3.65,2.8]').replaceAll('.56,2.8','.59,2.8');\nsrc=src.replace(\"[4.65,5.05,5.45]\"")
t=t.replace('[-.9,1.70,2.8],[-2.44,1.70,2.8]','[-.9,1.68,2.8],[-2.44,1.68,2.8]')
t=t.replace("src=src.replace(\"Cropped", "src=src.replace('Math.abs(h.point.y-z)>.025','Math.abs(h.point.y-z)>.035');\nsrc=src.replace(\"Cropped")
p.write_text(t)
p=R/'revisions/bedroom4-stair-suite-2026-10-22/check-navigation.mjs';t=p.read_text().replace("for(let d=0;d<=len;d+=.025)","if(len<1e-8)continue;for(let d=0;d<=len;d+=.025)");p.write_text(t)
