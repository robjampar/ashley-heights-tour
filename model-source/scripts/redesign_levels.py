"""Explicit concept groundworks beneath the six-space forecourt layouts."""


def in_polygon(x,y,poly):
    inside=False
    for a,b in zip(poly,poly[1:]+poly[:1]):
        if(a[1]>y)!=(b[1]>y)and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:inside=not inside
    return inside


outline=json.loads((ROOT/'proposal/redesigns/original-drive-outline.json').read_text())['coordinates'][0]
level_changes=[]
for ob in list(scene.objects):
    if ob.type!='MESH' or 'circular driveway - tarmac'not in name_of(ob).lower():continue
    revised=edited_copy(ob,'Regrade the existing paved forecourt for flush parking, garage access and the retained entrance')
    matrix=revised.matrix_world;inverse=matrix.inverted_safe()
    for vertex in revised.data.vertices:
        p=matrix@vertex.co;old_ground=surveyed_ground(p.x,p.y);level_changes.append(old_ground)
        # Original drive is a 115 mm closed slab with top 15 mm below its
        # terrain datum. Keep those two strata, including prior footprint cuts.
        p.z=-.13 if p.z-old_ground<-.07 else -.015
        vertex.co=inverse@p
    revised.data.update()
for ob in list(scene.objects):
    if ob.type!='MESH' or 'plot ground - title plan'not in name_of(ob).lower():continue
    revised=edited_copy(ob,'Excavate or fill beneath the regraded existing forecourt')
    cut_surface(revised,[-7.37,-23.38,17.15,.305],-3,3)
terrain=nav.get('terrain')
if terrain:
    for iy in range(terrain['ny']):
        y=terrain['y0']+iy*terrain['step']
        for ix in range(terrain['nx']):
            x=terrain['x0']+ix*terrain['step']
            if in_polygon(x,y,outline):terrain['z'][iy*terrain['nx']+ix]=0
apron=nav.get('approachSurface',{}).get('polygon',[])
retaining_count=0
for edge,(a,b)in enumerate(zip(outline,outline[1:]+outline[:1])):
    length=math.dist(a,b)
    if length<.01:continue
    n=math.ceil(length/.60)
    for i in range(n):
        p=[a[k]+(b[k]-a[k])*i/n for k in(0,1)];q=[a[k]+(b[k]-a[k])*(i+1)/n for k in(0,1)]
        x,y=(p[0]+q[0])/2,(p[1]+q[1])/2
        if abs(a[1]-.30)<.01 and abs(b[1]-.30)<.01 and -5.35<x<15.25:continue
        if apron and in_polygon(x,y,apron):continue
        if x<0 and -19.2<y<-11.4:continue # existing entrance and gate apron
        h=max(.04,surveyed_ground(*p)+.04,surveyed_ground(*q)+.04)
        wall(spec['code']+' | Forecourt retaining kerb '+str(edge)+' '+str(i),p,q,-.40,h,stone,S,.16,False)
        if h>.15:segment(spec['code']+' | Forecourt retaining edge '+str(edge)+' '+str(i),p,q,0,h,.16)
        retaining_count+=1
nav['proposalSite']['groundworks']={'finished_datum_m':0,'surface':'Existing paved footprint regraded; permeable parking pads','maximum_cut_from_terrain_m':round(max(level_changes,default=0),3),'maximum_fill_from_terrain_m':round(-min(level_changes,default=0),3),'retaining_segments':retaining_count,'basis':'Concept level forecourt and retaining kerbs. Earthworks quantities, gate/road tie-in, drainage falls and foundation levels require a measured survey; parking tracking is at this proposed datum.'}
