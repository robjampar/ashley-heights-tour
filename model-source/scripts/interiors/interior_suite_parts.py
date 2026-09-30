"""Detailed suite components authored in local coordinates for measured layouts."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import math


def slim_bed(b,cfg,z,m):
    from mathutils import Vector,Matrix
    start=len(b.objects);w=cfg['frameWidth'];length=cfg['frameLength'];mw,ml=cfg['mattress']
    linen,white,taupe,dark=m['linen'],m['white'],m['taupe'],m['dark']
    b.box('wall-backed upholstered headboard',(0,.035,.68),(w,.07,1.32),linen,.03)
    b.box('bed recessed base',(0,length/2,.12),(w-.16,length-.17,.20),dark,.025)
    b.box('bed upholstered frame',(0,(length+.065)/2,.30),(w,length-.065,.29),linen,.042)
    b.box('double mattress',(0,.09+ml/2,.55),(mw,ml,.22),white,.047)
    def cover(label,x0,x1,y0,y1,height,material):
        nx,ny=32,26;vv=[]
        for i in range(nx+1):
            x=x0+(x1-x0)*i/nx
            for j in range(ny+1):
                y=y0+(y1-y0)*j/ny;edge=abs(2*i/nx-1);vv.append((x,y,height+.005*math.sin(23*x-9*y)+.004*math.sin(18*y+4*x)-.075*max(0,(edge-.9)/.1)**1.4))
        ff=[(i*(ny+1)+j,(i+1)*(ny+1)+j,(i+1)*(ny+1)+j+1,i*(ny+1)+j+1)for i in range(nx)for j in range(ny)]
        ob=b.mesh(label,vv,ff,material,True);ob.modifiers.new('Cloth thickness','SOLIDIFY').thickness=.010
    cover('draped cotton duvet',-w/2+.012,w/2-.012,.57,length-.025,.69,white)
    b.box('folded duvet edge',(0,.61,.714),(mw,.18,.065),white,.029)
    cover('woven bed throw',-w/2+.013,w/2-.013,length-.51,length-.15,.715,taupe)
    for xx in(-mw/4,mw/4):
        b.box('sleeping pillow',(xx,.34,.735),(mw/2-.025,.44,.14),white,.061)
        b.box('small linen cushion',(xx,.19,.89),(mw/2-.10,.135,.34),linen,.056)
        hw=(mw/2-.025)/2-.025
        b.tube('pillow stitched edge',[(xx-hw,.141,.735),(xx+hw,.141,.735),(xx+hw,.539,.735),(xx-hw,.539,.735),(xx-hw,.141,.735)],.0016,m['ivory'],2)
    tr=Matrix.Translation(Vector((*cfg['head'],z)))@Matrix.Rotation(math.radians(cfg['angleDegrees']),4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world;ob['suite_component']='bed'
    b.obstacle('complete upholstered double bed',cfg['envelope'],z,z+1.34)


def hollow_basin(b,bounds,z,m):
    """Recessed bowl within a rectangular ceramic top; no solid lid over the bowl."""
    a,s,c,n=bounds;cx=(a+c)/2;cy=(s+n)/2;top=z+.86;rx=(c-a)*.34;ry=(n-s)*.34
    angles=sorted(set([j*math.tau/80 for j in range(80)]+[math.atan2(y-cy,x-cx)%math.tau for x in(a,c)for y in(s,n)]));steps=len(angles);vv=[]
    for layer in range(6):
        for angle in angles:
            dx,dy=math.cos(angle),math.sin(angle)
            if layer==0:
                k=min((c-a)/2/max(abs(dx),1e-8),(n-s)/2/max(abs(dy),1e-8));x,y,height=cx+dx*k,cy+dy*k,top
            else:
                scale,height=[(1,top),(.94,top-.012),(.77,top-.11),(.16,top-.145),(.145,top-.157)][layer-1];x,y=cx+rx*scale*dx,cy+ry*scale*dy
            vv.append((x,y,height))
    ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(5)for j in range(steps)]
    vv.extend((x,y,top-.024)for x,y,_ in vv[:steps]);ff.extend((j,6*steps+j,6*steps+(j+1)%steps,(j+1)%steps)for j in range(steps))
    ob=b.mesh('hollow ceramic basin',vv,ff,m['ceramic'],True)
    for face in list(ob.data.polygons)[:steps]+list(ob.data.polygons)[5*steps:]:face.use_smooth=False
    b.cylinder('basin dark waste',(cx,cy,top-.155),.020,.003,m['dark'],sides=32)
    b.cylinder('basin bronze pop-up waste',(cx,cy,top-.15),.017,.004,m['bronze'],sides=32)
    return cx,cy


def east_facing_wc(b,pan,cistern,z,m):
    a,s,c,n=cistern;cx=(pan[0]+pan[2])/2;cy=(pan[1]+pan[3])/2
    b.box_bounds('concealed WC cistern',cistern,z+.014,z+1.05,m['stone'],.009)
    b.box('cistern stone cap',((a+c)/2,(s+n)/2,z+1.063),(c-a,n-s,.026),m['stone'],.006)
    profiles=[(.13,.09,.165),(.24,.155,.205),(.30,.200,.365),(.292,.197,.413),(.235,.147,.412),(.20,.122,.33),(.060,.044,.19),(.035,.025,.172)];steps=80
    vv=[(cx+rx*math.cos(j*math.tau/steps),cy+ry*math.sin(j*math.tau/steps),z+h)for rx,ry,h in profiles for j in range(steps)]
    ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(len(profiles)-1)for j in range(steps)]
    b.mesh('open wall-hung WC pan',vv,ff,m['ceramic'],True)
    b.box('WC concealed rear outlet',(pan[0]+.035,cy,z+.26),(.08,.21,.17),m['ceramic'],.018)
    b.cylinder('WC dark bowl outlet',(cx,cy,z+.172),.026,.003,m['dark'],sides=32)
    rings=((.302,.202,.439),(.240,.153,.439),(.240,.153,.422),(.302,.202,.422))
    vv=[(cx+rx*math.cos(j*math.tau/steps),cy+ry*math.sin(j*math.tau/steps),z+h)for rx,ry,h in rings for j in range(steps)]
    ff=[(r*steps+j,r*steps+(j+1)%steps,((r+1)%4)*steps+(j+1)%steps,((r+1)%4)*steps+j)for r in range(4)for j in range(steps)]
    b.mesh('open WC seat',vv,ff,m['ceramic'],True)
    for yy in(cy-.085,cy+.085):b.cylinder('WC seat hinge',(cx-.275,yy,z+.434),.013,.028,m['bronze'],(0,1,0),24)
    b.box('dual flush plate',(c+.006,cy,z+.90),(.012,.218,.128),m['bronze'],.009)
    for yy,w in((cy-.044,.068),(cy+.044,.046)):b.box('dual flush button',(c+.015,yy,z+.90),(.007,w,.076),m['bronze'],.007)
    b.obstacle('WC pan',pan,z,z+.444);b.obstacle('WC cistern',cistern,z,z+1.08)


def oak_door(b,ns,label,d,opening,width,z):
    from mathutils import Vector,Matrix
    m=ns['suite_materials'];start=len(b.objects);w=d['width'];hx,hy,hz=d['hinge'];ax,ay=d['axis'];height=d.get('height',2.15)
    b.box(label+' oak leaf',(w/2,0,.025+height/2),(w-.006,.038,height),m['oak'],.004)
    for zz in(.24,1.10,min(1.95,height-.20)):b.cylinder(label+' bronze hinge',(0,.023,zz),.009,.075,m['bronze'],sides=24)
    for side in(-1,1):
        b.cylinder(label+' lever rose',(w-.075,side*.024,1.06),.024,.007,m['bronze'],(0,1,0),28)
        b.tube(label+' lever',[(w-.075,side*.026,1.06),(w-.075,side*.058,1.06),(w-.165,side*.058,1.06)],.007,m['bronze'],3)
        b.cylinder(label+' key escutcheon',(w-.075,side*.023,.94),.013,.006,m['bronze'],(0,1,0),24)
    # Edge-hinged replacement leaves may put the pivot on the actual barrel,
    # rather than the centre plane of a thick leaf embedded in the wall.
    if d.get('edgeHinge'):
        offset=.022 if d['openAngle']<0 else-.022
        for ob in b.objects[start:]:
            shift=-.023 if 'bronze hinge' in ob.name else offset
            ob.matrix_world=Matrix.Translation(Vector((0,shift,0)))@ob.matrix_world
    tr=Matrix(((ax,-ay,0,hx),(ay,ax,0,hy),(0,0,1,hz),(0,0,0,1)))
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    members=[ob.name for ob in b.objects[start:]]
    ns.get('proposed_doors',ns['nav'].setdefault('interactiveDoors',[])).append({'id':b.prefix+label,'wall':b.prefix+label,'hinge':d['hinge'],'members':members,'openingCenter':[*opening,z],'apertureAxis':d['axis'],'apertureWidth':width,'closedDelta':0,'openDelta':d['openAngle'],'openDistance':1.2,'closeDistance':1.8})
