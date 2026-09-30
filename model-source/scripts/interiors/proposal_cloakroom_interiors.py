"""Compact downstairs cloakroom, retaining the existing shell and WC service wall."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder
REPLACED=('Cloakroom fitted vanity','Cloakroom toilet','Cloakroom curtain','Cloakroom pleated curtain','Photo detail | Cloakroom visible mirror','Photo detail | Cloakroom mirror')

def apply_cloakroom(ns):
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/cloakroom.json').read_text());nav=ns['nav'];z=cfg['floorZ'];b=RoomBuilder(ns,'cloakroom','Cloakroom 01 | ','P70 Cloakroom — limestone and oak');b.remove(REPLACED)
    nav['proposalLights']=[l for l in nav.get('proposalLights',[])if not l['name'].startswith(b.prefix)];nav['mirrors']=[m for m in nav.get('mirrors',[])if not m['name'].startswith(b.prefix)]
    t='proposal/interiors/kitchen/textures/';oak=b.material('natural oak',(.60,.57,.50,1),.57,texture=t+'pale-oak.png');stone=b.material('honed limestone',(.83,.79,.70,1),.62,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory',(.90,.875,.825,1),.86);ceramic=b.material('ivory ceramic',(.96,.945,.90,1),.23);bronze=b.material('satin bronze',(.32,.255,.17,1),.33,.78);linen=b.material('ivory towels',(.91,.88,.81,1),.97,texture=t+'cream-upholstery.png');dark=b.material('recess and drain',(.027,.031,.026,1),.76);mirror=b.material('mirror glass',(.88,.91,.91,1),.03,1);light=b.material('warm diffuser',(1,.84,.65,1),.55,emission=1.5);paper=b.material('soft white paper',(.96,.94,.88,1),.90)
    a,s,c,n=cfg['bounds'];b.box_bounds('limestone floor',cfg['bounds'],z+.002,z+.010,stone);b.box_bounds('ivory ceiling',cfg['bounds'],cfg['ceilingZ']-.014,cfg['ceilingZ']-.006,ivory)
    # The original window is already bricked up in both full proposals. A thin
    # interior finish covers its old reveal without altering the external wall.
    b.box('south ivory wall finish',((a+c)/2,s+.003,1.30),(c-a,.005,2.58),ivory)
    b.box('west limestone vanity wall',(a+.003,(s+n)/2,1.30),(.005,n-s,2.58),stone)
    a,s,c,n=cfg['vanity'];cy=(s+n)/2;cx=4.635;top=.86
    b.box('vanity back',(a+.015,cy,.56),(.025,n-s,.49),oak,.004)
    for yy in(s+.011,n-.011):b.box('vanity end',((a+c-.027)/2,yy,.56),(c-a-.027,.022,.50),oak,.005)
    b.box('vanity base',((a+c)/2,cy,.32),(c-a,n-s,.024),oak,.004)
    for j in range(2):
        start=len(b.objects);zz=.450 if j==0 else .696
        b.box('vanity drawer front '+str(j),(c-.012,cy,zz),(.024,n-s-.032,.213 if j==0 else .260),oak,.008)
        b.box('vanity finger recess '+str(j),(c+.001,cy,zz+(.104 if j==0 else .126)),(.001,n-s-.065,.010),dark,.002)
        if j==1:
            # U-shaped drawer clears the basin waste and compact trap.
            for y0,y1 in((s+.038,cy-.26),(cy+.26,n-.038)):
                b.box('upper drawer bottom wing',((a+c)/2+.012,(y0+y1)/2,.582),(c-a-.070,y1-y0,.012),oak,.003)
                b.box('upper drawer divided back',(a+.047,(y0+y1)/2,.662),(.013,y1-y0,.16),oak,.002)
            b.box('upper drawer front bridge',(c-.048,cy,.582),(.065,.52,.012),oak,.003)
            for yy in(s+.038,n-.038):b.box('upper drawer side',((a+c)/2+.012,yy,.662),(c-a-.070,.013,.16),oak,.002)
            for yy in(cy-.264,cy+.264):b.box('drawer service cutout side',((a+c)/2-.032,yy,.65),(c-a-.15,.009,.125),oak,.002)
            for ob in b.objects[start:]:ob['cloakroom_pullout']='upper drawer'
    # Open elliptical basin through the ceramic top, with a real recessed bowl.
    angles=sorted(set([j*math.tau/80 for j in range(80)]+[math.atan2(yy-cy,xx-cx)%math.tau for xx in(a,c)for yy in(s,n)]));steps=len(angles);vv=[]
    for layer in range(6):
        for j in range(steps):
            angle=angles[j];dx=math.cos(angle);dy=math.sin(angle)
            if layer==0:
                k=min(((c-cx)if dx>=0 else(cx-a))/max(abs(dx),1e-8),((n-cy)if dy>=0 else(cy-s))/max(abs(dy),1e-8));xx=cx+dx*k;yy=cy+dy*k;zz=top
            else:
                rx,ry,zz=[(.132,.285,top),(.122,.274,top-.012),(.098,.221,top-.11),(.022,.025,top-.145),(.020,.023,top-.157)][layer-1];xx=cx+rx*dx;yy=cy+ry*dy
            vv.append((xx,yy,zz))
    ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(5)for j in range(steps)]
    vv.extend((x,y,top-.024)for x,y,_ in vv[:steps]);ff.extend((j,6*steps+j,6*steps+(j+1)%steps,(j+1)%steps)for j in range(steps))
    basin=b.mesh('hollow ceramic basin',vv,ff,ceramic,True)
    for face in list(basin.data.polygons)[:steps]+list(basin.data.polygons)[5*steps:]:face.use_smooth=False
    b.cylinder('basin dark waste',(cx,cy,top-.155),.020,.003,dark,sides=32);b.cylinder('basin bronze pop-up waste',(cx,cy,top-.150),.017,.004,bronze,sides=32)
    b.tube('basin compact trap',[(cx,cy,.702),(cx,cy,.631),(cx-.022,cy,.612),(cx-.047,cy,.630),(4.417,cy,.630)],.017,ivory,4)
    b.cylinder('waste wall collar',(4.409,cy,.630),.028,.022,ivory,(1,0,0),32)
    b.cylinder('mixer backplate',(4.400,cy,1.057),.036,.020,bronze,(1,0,0),36)
    b.tube('curved basin mixer',[(4.41,cy,1.057),(4.58,cy,1.057),(4.621,cy,1.030),(4.621,cy,1.007)],.012,bronze,4);b.cylinder('mixer aerator',(4.621,cy,1.004),.009,.006,dark,sides=24)
    b.cylinder('mixer control backplate',(4.401,cy+.224,1.043),.027,.020,bronze,(1,0,0),32);b.cylinder('mixer control knob',(4.421,cy+.224,1.043),.018,.024,bronze,(1,0,0),32);b.box('mixer control index',(4.434,cy+.224,1.062),(.002,.007,.002),dark,.0005)
    b.obstacle('floating vanity',cfg['vanity'],z,top+.004)
    # Mirror, face lighting and a small hand towel, without a wide cabinet overhead.
    b.box('mirror bronze edge',(4.420,cy,1.65),(.025,.84,.94),bronze,.018);b.box('basin mirror',(4.434,cy,1.65),(.002,.81,.91),mirror,.004)
    nav['mirrors'].append({'name':b.prefix+'basin mirror','position':[4.436,cy,1.65],'normal':[1,0,0],'width':.81,'height':.91})
    for yy in(cy-.45,cy+.45):
        b.box('mirror light bronze',(4.416,yy,1.65),(.044,.022,.53),bronze,.009);b.box('mirror light diffuser',(4.440,yy,1.65),(.006,.012,.49),light,.004)
    b.light('basin face glow',(4.73,cy,1.78),.20,17,1.4)
    b.tube('hand towel rail',[(4.402,.71,1.02),(4.471,.71,1.02),(4.471,.91,1.02),(4.402,.91,1.02)],.007,bronze,3)
    b.box('folded hand towel',(4.480,.81,.84),(.021,.175,.34),linen,.010)
    for zz in(.701,.712,.723):b.box('hand towel woven hem',(4.492,.81,zz),(.002,.162,.003),ivory,.001)
    b.lathe('soap dispenser ceramic body',(4.628,1.82,.862),[(.030,0),(.037,.008),(.036,.109),(.022,.127)],ivory,40);b.cylinder('soap dispenser collar',(4.628,1.82,.998),.018,.020,bronze,sides=32);b.tube('soap pump spout',[(4.628,1.82,1.011),(4.671,1.82,1.011),(4.677,1.82,1.006)],.0045,bronze,3)
    # Keep the WC on the south wall, within the original service position.
    a,s,c,n=cfg['wc']['cistern'];b.box_bounds('concealed WC cistern',cfg['wc']['cistern'],.02,1.05,stone,.010);b.box('cistern limestone cap',((a+c)/2,(s+n)/2,1.063),(c-a+.006,n-s+.006,.026),stone,.008)
    a,s,c,n=cfg['wc']['panBounds'];pcx=(a+c)/2;pcy=(s+n)/2;steps=80
    profiles=[(.11,.14,.165),(.168,.227,.205),(.20,.270,.365),(.194,.264,.413),(.148,.210,.412),(.127,.19,.330),(.038,.060,.19),(.022,.029,.172)]
    vv=[(pcx+rx*math.cos(j*math.tau/steps),pcy+ry*math.sin(j*math.tau/steps),zz)for rx,ry,zz in profiles for j in range(steps)];ff=[(r*steps+j,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,(r+1)*steps+j)for r in range(len(profiles)-1)for j in range(steps)];b.mesh('open wall-hung WC pan',vv,ff,ceramic,True)
    b.box('WC concealed rear outlet',(pcx,.319,.263),(.22,.074,.17),ceramic,.021);b.cylinder('WC dark bowl outlet',(pcx,pcy,.172),.027,.003,dark,sides=36)
    vv=[(pcx+rx*math.cos(j*math.tau/steps),pcy+ry*math.sin(j*math.tau/steps),zz)for rx,ry,zz in((.197,.269,.439),(.15,.221,.439),(.15,.221,.422),(.197,.269,.422))for j in range(steps)];ff=[(r*steps+j,r*steps+(j+1)%steps,((r+1)%4)*steps+(j+1)%steps,((r+1)%4)*steps+j)for r in range(4)for j in range(steps)];b.mesh('open WC seat',vv,ff,ceramic,True)
    for xx in(pcx-.084,pcx+.084):b.cylinder('WC seat hinge',(xx,.325,.431),.013,.030,bronze,(1,0,0),28)
    b.box('dual flush plate',(pcx,.310,.90),(.218,.014,.128),bronze,.009)
    for xx,w in((pcx-.044,.068),(pcx+.044,.046)):b.box('dual flush button',(xx,.321,.90),(w,.009,.076),bronze,.008)
    b.obstacle('WC pan',cfg['wc']['panBounds'],0,.446);b.obstacle('cistern',cfg['wc']['cistern'],0,1.08)
    b.tube('paper holder',[(5.849,.665,.675),(5.786,.665,.675),(5.786,.815,.675)],.007,bronze,3)
    b.lathe('hollow paper roll',(5.786,.683,.675),[(.018,0),(.052,0),(.052,.115),(.018,.115)],paper,48,(0,1,0))
    b.box('paper hanging end',(5.731,.748,.58),(.003,.11,.17),paper,.001)
    b.lathe('toilet brush pot',(5.755,.45,.015),[(.043,0),(.044,.26),(.036,.27),(.033,.252),(.032,.02)],ivory,40);b.cylinder('toilet brush handle',(5.755,.45,.34),.006,.27,bronze,sides=24)
    b.box('south oak relief frame',(5.13,.128,1.72),(.72,.021,.79),oak,.014);b.box('south ivory relief panel',(5.13,.141,1.72),(.681,.007,.751),ivory,.010)
    for k in range(3):b.tube('relief sculpted line',[(4.87+j*.011,.147,1.59+k*.13+.055*math.sin(j*.14+k))for j in range(48)],.003,stone,3)
    for yy in(.72,2.06):
        b.cylinder('ceiling light trim',(5.21,yy,2.576),.048,.006,ivory,sides=36);b.cylinder('ceiling light diffuser',(5.21,yy,2.570),.035,.004,light,sides=32);b.light('ceiling glow '+str(yy),(5.21,yy,2.49),.19,18,2.0)
    for ob in b.objects:
        if ob.type=='LIGHT':ob.visible_glossy=False;ob.visible_camera=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for r in nav['planRooms']:
        if r['name']==cfg['room']:
            a,s,c,n=cfg['bounds'];r['polygon_m']=[[a,s],[c,s],[c,n],[a,n]]
    return b.finish(cfg)
