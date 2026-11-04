from pathlib import Path
p=Path('scripts/model/proposal_bedroom4_stair_suite.py');s=p.read_text();start=s.index('def coordinate_navigation(');end=s.index("\n\nif 'scene'",start)
s=s[:start]+'''def coordinate_navigation(ns,cfg,removed,replacements,objects):
    from scripts.model.proposal_level_loft import subtract_box
    from mathutils import Vector
    nav=ns['nav'];z=cfg['floorZ'];loft=cfg['loftZ'];s=cfg['suite'];rise=(loft-z)/16
    def groups(key,pending=None):
        a=[nav.setdefault(key,[])];other=ns.get(pending or 'new_'+key)
        if other is not None and all(other is not v for v in a):a.append(other)
        return a
    def append(key,item,pending=None):(ns.get(pending or 'new_'+key,nav.setdefault(key,[]))).append(item)
    oldprefix=('Bedroom4 01 |','Sidebed 01 |','Proposal | Loft bedroom expansion | returned landing')
    def retired(name):
        return name in removed or name.startswith(oldprefix) or bool(re.search(r'Bedroom 4 (?:hall|en suite|shower)|Linen cupboard|^Landing radiator|^Landings 01 \\| hall artwork',name,re.I)) or name.startswith('Proposal | Level loft | ')and any(t in name.lower()for t in('flight ','half landing','landing guard','stairwell','stair opening'))
    for key,pending in [('segments',None),('obstacles',None),('ramps',None),('interactiveDoors','proposed_doors'),('proposalLights',None),('mirrors',None)]:
        for values in groups(key,pending):values[:]=[o for o in values if not retired(o.get('name',o.get('id','')))]
    for walls in groups('walls'):
        walls[:]=[w for w in walls if not retired(w['name']) and w['name']!='Bedroom 5 to 4']
        for w in walls:
            if w['name']=='First west' and w.get('floor')==1:w['openings'].append([2.10,1.05,0,2.15,'door'])
            if w['name']=='Bedroom 5 hall':w['openings']=[[w['a'][1]-(3.125+4.53)/2,4.53-3.125,0,2.25,'open']]
    # The viewer must have exactly the same new hole as the visible floor.
    for surfaces in groups('surfaces'):
        result=[]
        for surf in surfaces:
            if retired(surf['name']) and abs(surf['z']-z)>.03:continue
            if abs(surf['z']-loft)<.10:
                result.extend({**surf,'polygon':p}for p in subtract_box(surf['polygon'],[4.53,.28,5.57,4.55],2))
            else:result.append(surf)
        surfaces[:]=result
    def rect(r):return[[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]]
    for label,r,height in [('recovered mezzanine loft floor',[7.3,-4.58,8.47,-1.6],loft),('suite sleeping floor',s['sleeping'],z+.012),('suite dressing floor',s['dressing'],z+.012),('suite bathroom floor',s['bathroom'],z+.012),('suite connecting threshold',[-.14,1.575,.14,2.625],z+.012),('former ensuite floor',[4.28,.115,5.835,3.29],z),('suite entry threshold',[3.6,3.09,4.5,3.29],z+.012),('bathroom threshold',[-2.94,2.25,-2.82,3.15],z+.012),('landing opening',[3.63,3.125,3.93,4.53],z)]:append('surfaces',{'name':PREFIX+label,'polygon':rect(r),'z':height})
    # Twelve shallow radial sectors give a continuous walking surface over
    # the bottom quarter turn without any change to general viewer behaviour.
    for i in range(12):
        a=-math.pi/2-i*math.pi/24;c=a-math.pi/24
        def at(t,r):return[5.6+r*math.cos(t),1.31+r*math.sin(t)]
        outer=lambda t:at(t,1/max(abs(math.cos(t)),abs(math.sin(t))))
        append('ramps',{'name':PREFIX+'bottom winder '+str(i),'polygon':[at(a,.1),outer(a),outer(c),at(c,.1)],'start':[*at(a,.55),z+3*rise*i/12],'end':[*at(c,.55),z+3*rise*(i+1)/12]})
    append('ramps',{'name':PREFIX+'straight flight','polygon':rect([4.6,1.31,5.5,4.555]),'start':[5.05,1.31,z+3*rise],'end':[5.05,4.55,loft]})
    # Blocking records follow the rebuilt wall faces and the actual guards.
    for ob in objects:
        if ob.type!='MESH' or ob.get('stair_suite_role')!='new':continue
        pts=[ob.matrix_world@Vector(p)for p in ob.bound_box];r=[min(p[k]for p in pts)for k in range(3)]+[max(p[k]for p in pts)for k in range(3)]
        if r[3]-r[0]<r[4]-r[1]:a,c=[(r[0]+r[3])/2,r[1]],[(r[0]+r[3])/2,r[4]];th=r[3]-r[0]
        else:a,c=[r[0],(r[1]+r[4])/2],[r[3],(r[1]+r[4])/2];th=r[4]-r[1]
        append('segments',{'name':ob.name,'a':a,'b':c,'bottom':r[2],'top':r[5],'thickness':th})
    append('obstacles',{'name':PREFIX+'under-stair cupboard','box':[4.53,1.31,5.57,3.36],'bottom':z,'top':4.45,'maxFootZ':2.95})
    append('obstacles',{'name':PREFIX+'winder newel','box':[5.505,1.215,5.695,1.405],'bottom':z,'top':4.44})
    for x in(4.53,5.57):append('segments',{'name':PREFIX+'loft opening guard','a':[x,2.4],'b':[x,4.55],'bottom':loft,'top':6.60,'thickness':.05})
    for i in range(24):
        a=1.31+3.24*i/24;c=1.31+3.24*(i+1)/24
        for x in(4.56,5.54):append('segments',{'name':PREFIX+'pitched stair guard','a':[x,a],'b':[x,c],'bottom':z+3*rise+13*rise*i/24-.04,'top':z+3*rise+13*rise*(i+1)/24+1.05,'thickness':.05})
    for plans in groups('planRooms','new_rooms'):
        plans[:]=[r for r in plans if r['name']not in('Bedroom 4','Bedroom 4 en suite','Side wing south bedroom','Side south ensuite')]
    for label,r in [('Combined bedroom suite',s['sleeping']),('Suite dressing room',s['dressing']),('Suite bathroom',s['bathroom'])]:append('planRooms',{'name':label,'floor':1,'base_z':z,'polygon_m':rect(r),'proposal':True},'new_rooms')
    positions={'2445676-0':('Combined bedroom suite',[3.95,1.7,z],[-1,.2,-.05]),'2445677-0':('Suite dressing room',[-1.35,2.35,z],[0,1,-.05]),'proposal-level-loft-stair-approach':('Loft staircase · approach',[6.6,.65,z],[-1,.4,.1]),'proposal-level-loft-stair-top':('Loft staircase · top landing',[5.05,5.2,loft],[0,-1,-.3])}
    for views in groups('rooms','new_views'):
        for v in views:
            if v['id']in positions:v['label'],v['position'],v['direction']=positions[v['id']]
            elif 'side' in v['id'] and 'bed' in v['id'] or v['label']=='Side wing south bedroom':v.update(label='Suite dressing room',position=[-1.35,2.35,z],direction=[0,1,-.05])
            elif v['label']=='Side south ensuite':v.update(label='Suite bathroom',position=[-3.5,2.7,z],direction=[-1,.1,-.04])
            elif v['label']=='Loft staircase · approach':v.update(position=[6.6,.65,z],direction=[-1,.4,.1])
            elif v['label']=='Loft staircase · top landing':v.update(position=[5.05,5.2,loft],direction=[0,-1,-.3])
    nav['loftStairFinish']={'revision':REVISION,'arrangement':'single straight flight with three bottom winders','widthM':.9,'material':'natural oak treads, round oak rails and fine oak spindles with ivory strings'}
    nav['levelLoftStair']={**nav['levelLoftStair'],'revision':REVISION,'rises':16,'riserMetres':rise,'goingMetres':.27,'flightWidthMetres':.9,'openings':[[4.53,.28,5.57,4.55]],'flights':[{'a':[5.05,1.31],'b':[5.05,4.55],'n':13,'w':.9,'z':3*rise}],'bottomWinders':{'centre':[5.6,1.31],'risers':3,'innerRadius':.1,'outerRadius':1},'treads':[{'name':PREFIX+'Straight oak tread '+str(k+4),'centre':[5.05,1.31+(k+.5)*.27],'top':z+(k+4)*rise}for k in range(12)],'arrival':[5.05,4.55,loft],'routes':{},'upperRoutes':{}}
    nav['interiorRooms'].pop('bedroom4',None);nav['interiorRooms'].pop('sidebed',None);nav['interiorRooms']['combined suite']={'revision':REVISION,'status':'developed concept'}
    return {'newFloorOpening':[4.53,.28,5.57,4.55],'winderSectors':12,'straightFlight':True,'crossWallOpening':[1.575,2.625]}
''' +s[end:]
s=s.replace("def door(label,hinge,axis,centre,wall_depth):", "def door(label,hinge,axis,centre,wall_depth,angle):")
s=s.replace("'openAngle':-math.pi/2,'bottomGap':.022,'edgeHinge':True", "'openAngle':angle,'bottomGap':.022")
s=s.replace("for x in(-.435,.435):", "for x in(-.431,.431):").replace("(x,0,1.055),(.024,wall_depth,2.11)","(x,0,1.0405),(.038,wall_depth,2.081)")
s=s.replace("(x+(.012 if x<0 else-.012),-.025,1.055),(.014,.025,2.11)","(x+(.020 if x<0 else-.020),-.025,1.034),(.014,.025,2.068)")
s=s.replace("(0,0,2.10),(.894,wall_depth,.024)","(0,0,2.069),(.90,wall_depth,.024)").replace("(0,-.025,2.08)","(0,-.025,2.055)")
s=s.replace("(0,yy,2.145)","(0,yy,2.09)")
s=s.replace("door('suite entry',[4.463,3.29,z],[-1,0],[4.05,3.19],.134)","door('suite entry',[4.463,3.19,z],[-1,0],[4.05,3.19],.134,math.pi/2)")
s=s.replace("door('bathroom entry',[-2.80,3.113,z],[0,-1],[-2.88,2.70],.124)","door('bathroom entry',[-2.88,3.113,z],[0,-1],[-2.88,2.70],.124,-math.pi/2)")
s=s.replace("label=part['name'];vertices=part['vertices'];faces=part['faces']", "label=part['name'];vertices=[list(v)for v in part['vertices']];faces=part['faces']\n        if label in ('Suite entrance head','Bathroom door head'):\n            for v in vertices:\n                if abs(v[2]-4.95)<1e-5:v[2]=4.881")
p.write_text(s)
