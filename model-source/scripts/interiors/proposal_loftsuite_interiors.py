"""Measured king-bed suite within the retained dormer and pitched-roof lining."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.interiors.interior_suite_parts import slim_bed, hollow_basin, east_facing_wc, oak_door

REPLACED=('Proposal | Loft bed','Proposal | Loft wardrobe','Proposal | Loft ensuite shower','Proposal | Loft ensuite toilet','Proposal | Loft ensuite sanitary','Proposal | Loft ensuite vanity','Proposal | Loft ensuite basin','Proposal | Loft ensuite linen','Proposal | Loft suite entry wall door','Proposal | Loft ensuite north wall door','Proposal | Loft hip store door')

def apply_loftsuite(ns):
    from mathutils import Vector,Matrix
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/loftsuite.json').read_text());nav=ns['nav'];z=cfg['floorZ']
    b=RoomBuilder(ns,'loftsuite','Loftsuite 01 | ','P75 Loft bedroom and ensuite');b.remove(REPLACED)
    for key in('proposalLights','mirrors'):
        nav[key]=[v for v in nav.get(key,[])if not v['name'].startswith((b.prefix,'Proposal | Loft bed','Proposal | Loft ensuite'))]
    for doors in(nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):
        doors[:]=[d for d in doors if not d['id'].startswith((b.prefix,'Proposal | Loft suite entry wall door','Proposal | Loft ensuite north wall door','Proposal | Loft hip store door'))]
    tex='proposal/interiors/kitchen/textures/'
    m={'oak':b.material('natural oak',(.60,.57,.50,1),.57,texture=tex+'pale-oak.png'),
       'stone':b.material('honed limestone',(.83,.79,.70,1),.62,texture=tex+'warm-limestone.png'),
       'ivory':b.material('warm ivory',(.90,.875,.825,1),.86),'white':b.material('cotton bedding',(.95,.93,.87,1),.94),
       'linen':b.material('ivory upholstery',(.91,.88,.81,1),.97,texture=tex+'cream-upholstery.png'),
       'taupe':b.material('woven taupe',(.58,.54,.45,1),1,texture=tex+'cream-upholstery.png'),
       'carpet':b.material('warm wool carpet',(.73,.70,.62,1),1,texture=tex+'cream-upholstery.png'),
       'ceramic':b.material('ivory ceramic',(.96,.945,.90,1),.23),
       'bronze':b.material('satin bronze',(.32,.255,.17,1),.33,.78),
       'dark':b.material('recess and drain',(.027,.031,.026,1),.76),
       'mirror':b.material('mirror glass',(.88,.91,.91,1),.03,1),
       'light':b.material('warm diffuser',(1,.84,.65,1),.55,emission=1.4)}
    ns['suite_materials']=m;oak,stone,ivory,linen,bronze,dark=[m[k]for k in('oak','stone','ivory','linen','bronze','dark')]
    glass=b.material('clear shower glass',(.91,.97,.95,1),.035);shader=glass.node_tree.nodes.get('Principled BSDF');shader.inputs['Transmission Weight'].default_value=1;shader.inputs['IOR'].default_value=1.45
    def plane(label,poly,height,mat):
        vv=[Vector((x,y,height))for x,y in poly];idx={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(v if isinstance(v,int)else idx[tuple(v)]for v in tri)for tri in tessellate_polygon([vv])]
        return b.mesh(label,vv,ff,mat)
    plane('bedroom wool floor',cfg['bedroomPolygon'],z+.014,m['carpet']);plane('ensuite limestone floor',cfg['bathroomPolygon'],z+.012,stone);plane('hip store oak floor',cfg['storePolygon'],z+.014,oak)
    # All existing roof lining, solid suite-entry wall and window openings remain.
    b.box('oak headwall',(10.02,-9.342,z+.80),(2.84,.014,1.57),oak,.003)
    for xx in(8.62,9.18,9.74,10.30,10.86,11.41):b.box('headwall fine joint',(xx,-9.333,z+.80),(.002,.002,1.54),dark)
    slim_bed(b,cfg['bed'],z,m)
    for j,bb in enumerate(cfg['bedsides']):
        a,s,c,n=bb;cx=(a+c)/2;cy=(s+n)/2
        b.box_bounds('floating bedside '+str(j),bb,z+.36,z+.53,oak,.011)
        b.box('bedside limestone top',(cx,cy,z+.543),(c-a,n-s,.025),stone,.006)
        b.box('bedside finger recess',(cx,n+.001,z+.485),(c-a-.03,.002,.012),dark)
        b.obstacle('bedside '+str(j),bb,z,z+.56)
        b.cylinder('bedside reading backplate',(cx,-9.321,z+1.19),.033,.014,bronze,(0,1,0),28)
        b.tube('bedside reading arm',[(cx,-9.31,z+1.19),(cx,-9.19,z+1.19),(cx,-9.14,z+1.09)],.009,bronze,3)
        b.cylinder('bedside reading shade',(cx,-9.14,z+1.055),.027,.065,bronze,sides=28)
        b.cylinder('bedside reading lens',(cx,-9.14,z+1.021),.022,.003,m['light'],sides=24)
        b.box('bedside control plate',(cx,-9.319,z+.83),(.072,.012,.105),bronze,.007)
        for xx in(cx-.016,cx+.016):b.cylinder('bedside switch',(xx,-9.309,z+.846),.007,.006,dark,(0,1,0),20)
        b.box('bedside USB C slot',(cx,-9.310,z+.808),(.014,.003,.004),dark,.001)
        b.light('bedside glow '+str(j),(cx,-9.09,z+1.02),.16,10,1.7)
    # Sliding wardrobe on the full-height entrance wall. The 515 mm internal
    # depth accommodates standard 420 mm hangers, without a door-swing aisle.
    a,s,c,n=cfg['wardrobe'];width=c-a;mid=(a+c)/2;cy=(s+n)/2;height=1.99
    b.box_bounds('wardrobe recessed plinth',[a+.025,s+.035,c-.025,n-.02],z+.014,z+.10,dark)
    b.box('wardrobe back',(mid,n-.009,z+1.04),(width,.018,1.90),oak)
    for xx in(a+.009,mid,c-.009):b.box('wardrobe upright',(xx,cy,z+1.04),(.018,n-s,1.90),oak)
    for zz in(z+.112,z+height):b.box('wardrobe carcass horizontal',(mid,cy,zz),(width,n-s,.024),oak)
    for j in range(2):
        xx=a+(j+.5)*width/2
        b.box('wardrobe upper shelf',(xx,cy,z+1.75),(width/2-.022,n-s-.045,.018),oak)
        b.cylinder('wardrobe hanging rail',(xx,cy,z+1.63),.012,width/2-.060,bronze,(1,0,0),28)
        for k in range(5):
            x=xx-.30+k*.13
            b.tube('wooden clothes hanger',[(x,cy,z+1.59),(x,cy-.21,z+1.44),(x,cy+.21,z+1.44),(x,cy,z+1.59)],.009,oak,2)
            b.tube('hanger hook',[(x,cy,z+1.59),(x,cy,z+1.67),(x,cy+.02,z+1.69),(x,cy+.04,z+1.67)],.003,bronze,2)
        for zz in(z+.32,z+.53):b.box('wardrobe lower shelf',(xx,cy,zz),(width/2-.025,n-s-.05,.018),oak)
        for k in range(2):b.box('folded wardrobe linen',(xx,cy,z+.57+k*.044),(.45,.36,.043),m['white'],.017)
        yy=s+.014+j*.025;b.box('sliding wardrobe front',(xx,yy,z+1.045),(width/2+.006,.022,1.87),oak if j==0 else ivory,.004)
        b.box('wardrobe recessed bronze pull',(xx+width/4-.040,yy-.014,z+1.06),(.017,.005,.30),bronze,.003)
    b.obstacle('full-depth wardrobe',cfg['wardrobe'],z,z+2.01)
    # Owner review: remove the low eaves storage as well as hip-store shelves.
    # Retained north-wall basin position, now a floating oak cabinet with a
    # genuinely hollow bowl and sliding storage fronts.
    a,s,c,n=cfg['vanity'];cx=(a+c)/2;cy=(s+n)/2
    b.box('vanity back',(cx,n-.009,z+.56),(c-a,.018,.53),oak)
    for xx in(a+.009,c-.009):b.box('vanity end',(xx,cy,z+.56),(.018,n-s,.53),oak,.003)
    b.box('vanity bottom',(cx,cy,z+.30),(c-a,n-s,.022),oak,.003)
    for xx in(a+.009,c-.009):b.box('vanity top side rail',(xx,cy,z+.820),(.018,n-s,.030),oak,.002)
    for yy in(s+.009,n-.009):b.box('vanity top front rail',(cx,yy,z+.820),(c-a-.036,.018,.030),oak,.002)
    for j in range(2):
        xx=a+(j+.5)*(c-a)/2;yy=s+.012+j*.023
        b.box('sliding vanity front',(xx,yy,z+.56),((c-a)/2+.003,.020,.50),oak,.005)
        b.box('vanity recessed pull',(xx+.13,s-.001,z+.60),(.015,.003,.16),bronze,.003)
    hollow_basin(b,cfg['vanity'],z,m)
    b.tube('basin trap',[(cx,cy,z+.703),(cx,cy,z+.62),(cx,cy+.04,z+.605),(cx,cy+.08,z+.63),(cx,n+.007,z+.63)],.017,ivory,4)
    b.cylinder('basin mixer backplate',(cx,n+.006,z+1.055),.032,.015,bronze,(0,-1,0),32)
    b.tube('basin mixer spout',[(cx,n-.005,z+1.055),(cx,cy+.04,z+1.055),(cx,cy,z+1.025),(cx,cy,z+.998)],.012,bronze,4)
    b.cylinder('basin mixer aerator',(cx,cy,z+.997),.009,.004,dark,sides=24)
    b.cylinder('basin mixer control',(cx+.31,n-.005,z+1.045),.024,.034,bronze,(0,-1,0),28)
    b.box('basin mixer index',(cx+.31,n-.023,z+1.069),(.007,.003,.002),dark,.0005)
    b.box('vanity limestone wall',(cx,-9.455,z+1.02),(1.16,.008,2.01),stone)
    b.box('mirror bronze frame',(cx,-9.468,z+1.50),(.88,.024,.81),bronze,.012)
    b.box('basin mirror',(cx,-9.482,z+1.50),(.85,.002,.78),m['mirror'],.004)
    nav['mirrors'].append({'name':b.prefix+'basin mirror','position':[cx,-9.484,z+1.50],'normal':[0,-1,0],'width':.85,'height':.78})
    for xx in(cx-.46,cx+.46):
        b.box('mirror bronze light',(xx,-9.472,z+1.50),(.018,.035,.47),bronze,.006)
        b.box('mirror diffuser',(xx,-9.493,z+1.50),(.010,.004,.43),m['light'],.003)
    b.light('basin face glow',(cx,-9.78,z+1.72),.20,15,1.6)
    b.obstacle('floating vanity',cfg['vanity'],z,z+.87)
    # Rotate the actual open ceramic WC assembly to face north, retaining the
    # existing southern service position. Its collision footprints follow too.
    start=len(b.objects);oi=len(b.obstacles)
    east_facing_wc(b,[.18,-.205,.79,.205],[0,-.35,.17,.35],z,m)
    tr=Matrix.Translation(Vector((10.4,-11.49,0)))@Matrix.Rotation(math.pi/2,4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    for o in b.obstacles[oi:]:
        a,s,c,n=o['box'];pts=[tr@Vector((x,y,z))for x in(a,c)for y in(s,n)];o['box']=[min(p.x for p in pts),min(p.y for p in pts),max(p.x for p in pts),max(p.y for p in pts)]
    b.tube('paper holder',[(10.84,-11.40,z+.68),(10.84,-11.28,z+.68),(10.84,-11.12,z+.68)],.007,bronze,3)
    b.cylinder('paper roll',(10.84,-11.18,z+.68),.041,.10,m['white'],(0,1,0),36)
    # Lower shower fittings are deliberately sized to the 2.09 m dormer height.
    a,s,c,n=cfg['shower'];b.box_bounds('low limestone shower tray',cfg['shower'],z+.012,z+.028,stone,.004)
    ns['new_surfaces'].append({'name':b.prefix+'shower tray','polygon':[[a,s],[c,s],[c,n],[a,n]],'z':z+.028})
    b.box('shower drain',(11.84,-11.40,z+.0282),(.64,.034,.0004),dark,.003)
    for k in range(15):b.box('shower drain slot',(11.57+k*.038,-11.40,z+.0285),(.002,.025,.0002),bronze)
    b.box('shower north glass',((a+c)/2,n,z+.971),(c-a,.01,1.88),glass,.001)
    b.box('shower west fixed return',(a,-11.33,z+.971),(.01,.32,1.88),glass,.001)
    b.box('shower west short north return',(a,-10.4235,z+.971),(.01,.057,1.88),glass,.001)
    b.box('shower north west channel',(a,n,z+.973),(.025,.028,1.89),bronze,.003)
    b.box('shower west south channel',(a,s,z+.973),(.021,.020,1.89),bronze,.003)
    for label,aa,bb in(('shower north glass',[a,n],[c,n]),('shower west fixed glass',[a,s],[a,-11.17])):
        ns['new_segments'].append({'name':b.prefix+label,'a':aa,'b':bb,'bottom':z+.03,'top':z+1.92,'thickness':.01})
    d=cfg['showerDoor'];hx,hy,hz=d['hinge'];w=d['width'];start=len(b.objects)
    b.box('shower door glass',(hx,hy-w/2,hz+.942),(.010,w,1.855),glass,.001)
    for zz in(hz+.33,hz+1.53):b.box('shower door hinge',(hx,hy,zz),(.035,.045,.061),bronze,.004)
    for sign in(-1,1):b.tube('shower door handle',[(hx+sign*.006,hy-w+.10,hz+.84),(hx+sign*.043,hy-w+.10,hz+.84),(hx+sign*.043,hy-w+.10,hz+1.08),(hx+sign*.006,hy-w+.10,hz+1.08)],.006,bronze,3)
    b.box('shower door bottom seal',(hx,hy-w/2,hz+.011),(.01,w,.014),ivory,.002)
    ns.get('proposed_doors',nav.setdefault('interactiveDoors',[])).append({'id':b.prefix+'shower door','wall':b.prefix+'shower door','hinge':d['hinge'],'members':[ob.name for ob in b.objects[start:]],'openingCenter':[hx,hy-w/2,z],'apertureAxis':d['axis'],'apertureWidth':w,'closedDelta':0,'openDelta':d['openAngle'],'openDistance':.75,'closeDistance':1.1})
    b.box('south limestone shower wall',(11.85,-11.510,z+1.045),(1.12,.008,2.07),stone)
    # The existing dormer window remains usable with waterproof sill/returns.
    b.box('shower window sill wall',(12.414,-10.745,z+.365),(.008,1.49,.715),stone)
    b.box('shower window head wall',(12.414,-10.745,7.575),(.008,1.49,.13),stone)
    for yy,span in((-11.35,.30),(-9.9,.20)):b.box('shower window pier',(12.414,yy,6.90),(.008,span,1.20),stone)
    b.window_reveal('bathroom dormer window','x',12.409,12.51,-11.2,-10.0,6.30,7.50,stone)
    b.box('shower mixer plate',(11.90,-11.497,z+1.02),(.24,.017,.085),bronze,.008)
    for xx in(11.83,11.97):
        b.cylinder('shower mixer knob',(xx,-11.48,z+1.02),.022,.023,bronze,(0,1,0),28)
        b.box('shower mixer index',(xx,-11.466,z+1.04),(.006,.002,.002),dark)
    b.tube('shower riser',[(11.90,-11.474,z+1.02),(11.90,-11.474,z+1.98),(11.90,-11.00,z+1.98)],.012,bronze,3)
    b.cylinder('rain shower head',(11.90,-11.00,z+1.966),.105,.022,bronze,sides=48)
    for ix in range(-4,5):
        for iy in range(-4,5):
            if ix*ix+iy*iy<20:b.cylinder('rain nozzle',(11.90+ix*.02,-11+iy*.02,z+1.953),.002,.003,dark,sides=12)
    b.cylinder('hand shower outlet',(11.62,-11.492,z+1.04),.023,.020,bronze,(0,1,0),28)
    hose=[Vector((11.62+.06*math.sin(t*math.pi),-11.462,z+1.04-.34*math.sin(t*math.pi)+.20*t))for t in[j/48 for j in range(49)]]
    b.tube('hand shower hose',hose,.006,bronze,4)
    for j in range(1,48):b.cylinder('hand shower hose rib',hose[j],.007,.002,bronze,hose[j+1]-hose[j-1],14)
    b.cylinder('hand shower handle',(11.62,-11.44,z+1.31),.014,.17,bronze,sides=28)
    b.cylinder('hand shower head',(11.62,-11.43,z+1.425),.033,.019,bronze,(0,1,0),36)
    for j in range(12):b.cylinder('hand shower nozzle',(11.62+.022*math.cos(j*math.tau/12),-11.418,z+1.425+.022*math.sin(j*math.tau/12)),.002,.003,dark,(0,1,0),12)
    b.box('bath towel rail back',(11.03,-9.463,z+1.04),(.15,.016,.028),bronze,.005)
    b.tube('bath towel rail',[(10.97,-9.477,z+1.04),(10.97,-9.55,z+1.04),(11.30,-9.55,z+1.04),(11.30,-9.477,z+1.04)],.007,bronze,3)
    b.box('folded bath hand towel',(11.11,-9.564,z+.84),(.26,.02,.39),linen,.009)
    for zz in(z+.66,z+.67,z+.68):b.box('towel woven hem',(11.11,-9.576,zz),(.24,.002,.002),ivory)
    # Owner review: leave the hip-store floor free of the two shelving units.
    for label,key,opening,width in(('hall door','hallDoor',[11.8,-5.35],.90),('ensuite door','bathDoor',[11.85,-9.4],.80),('hip store door','hipDoor',[9.35,-11.6],.80)):
        oak_door(b,ns,label,cfg[key],opening,width,z)
    # Linen blinds fold above the useful glass; no pendants reduce headroom.
    for label,s,n in(('bedroom south',-9.25,-8.05),('bedroom north',-6.9,-5.7)):
        b.window_reveal(label+' dormer window','x',12.418,12.51,s,n,6.30,7.50,ivory)
        for k in range(4):b.box(label+' Roman blind fold',(12.402,(s+n)/2,7.35+k*.033),(.027,n-s-.09,.038),linen,.012)
    for k in range(4):b.box('bathroom privacy blind fold',(12.395,-10.6,7.35+k*.033),(.03,1.10,.038),linen,.012)
    # A restrained green accent on the solid pier between the two bed windows.
    leaf=b.material('soft green leaves',(.18,.25,.15,1),.80);px,py=12.16,-7.61
    b.lathe('window pier ceramic planter',(px,py,z+.014),[(.12,0),(.145,.02),(.16,.29),(.147,.315),(.134,.297),(.12,.05)],ivory,40)
    b.cylinder('planter soil',(px,py,z+.297),.133,.012,dark,sides=36)
    for j in range(7):
        angle=j*2.4;tx=px+.08*math.cos(angle);ty=py+.08*math.sin(angle);tz=z+.57+j*.078
        b.tube('plant stem',[(px,py,z+.31),(tx,ty,tz)],.004,bronze,3)
        for k in range(3):
            a=angle+k*2.1;vx=.12*math.cos(a);vy=.12*math.sin(a);h=tz-k*.065
            b.mesh('plant leaf',[(tx,ty,h),(tx+vx*.5-vy*.27,ty+vy*.5+vx*.27,h+.06),(tx+vx,ty+vy,h+.035),(tx+vx*.5+vy*.27,ty+vy*.5-vx*.27,h+.025)],[(0,1,2),(0,2,3)],leaf,True)
    b.obstacle('window pier planter',[12.0,-7.77,12.32,-7.45],z,z+1.13)
    for xx,yy in((10.25,-6.65),(11.65,-8.10),(10.83,-10.25),(11.79,-10.98)):
        b.cylinder('ceiling light trim',(xx,yy,7.635),.040,.006,ivory,sides=28)
        b.cylinder('ceiling light diffuser',(xx,yy,7.630),.032,.004,m['light'],sides=28)
        b.light('ceiling glow '+str(xx)+' '+str(yy),(xx,yy,7.52),.23,18,2.6)
    b.box('hip store wall light',(9.31,-11.676,7.425),(.20,.035,.045),bronze,.005)
    b.box('hip store wall diffuser',(9.31,-11.697,7.425),(.17,.004,.025),m['light'],.004)
    b.light('hip store glow',(9.31,-11.90,7.38),.13,8,1.8)
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
        if r['id']=='proposal-loft-ensuite':r.update(position=[10.8,-10.32,z],direction=[.7,-.8,-.06])
    for ob in b.objects:
        if ob.type=='MESH'and any(m[k].name in ob.data.materials for k in('linen','white')):
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=6
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    return b.finish(cfg)
