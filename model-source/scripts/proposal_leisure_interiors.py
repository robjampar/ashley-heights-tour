"""Developed leisure-room furnishings, also callable in isolated native previews."""
import json,math
from interior_furnishing import RoomBuilder
from proposal_bar_interiors import apply_bar
from proposal_gym_interiors import apply_gym
from proposal_utility_interiors import apply_utility
from proposal_guest_interiors import apply_guest
from proposal_guestbath_interiors import apply_guestbath
from proposal_family_interiors import apply_family
from proposal_cloakroom_interiors import apply_cloakroom


def apply_cinema(ns):
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/cinema.json').read_text())
    b=RoomBuilder(ns,'cinema','Cinema 01 | ','P63 Cinema — warm oak and acoustic fabric')
    b.remove(tuple('Proposal | '+s for s in (
        'Cinema carpet','Cinema screen','Cinema projection','Cinema speaker',
        'Cinema rear seating platform','Cinema seat ','Cinema west acoustic',
        'Cinema east acoustic','Cinema projector','Cinema aisle light',
        'Basement cinema light','Basement cinema diffuser')))
    nav=ns['nav'];nav['proposalLights']=[p for p in nav.get('proposalLights',[]) if not p['name'].startswith(('Basement cinema','Cinema 01 | '))]
    textures='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.55,.52,.46,1),.55,texture=textures+'pale-oak.png')
    smoked=b.material('smoked oak',(.16,.13,.10,1),.68,texture=textures+'pale-oak.png')
    fabric=b.material('warm taupe upholstery',(.48,.42,.35,1),.95,texture=textures+'cream-upholstery.png')
    felt=b.material('charcoal acoustic fabric',(.036,.030,.025,1),1,texture=textures+'cream-upholstery.png')
    carpet=b.material('warm charcoal woven carpet',(.060,.052,.043,1),1,texture=textures+'cream-upholstery.png')
    plaster=b.material('warm charcoal ceiling',(.055,.048,.04,1),.94)
    stone=b.material('honed limestone',(.79,.74,.66,1),.63,texture=textures+'warm-limestone.png')
    shadow=b.material('shadow joint',(.009,.009,.009,1),.85)
    metal=b.material('satin dark bronze',(.12,.10,.075,1),.35,.7)
    black=b.material('AV graphite',(.015,.017,.018,1),.45,.15)
    silver=b.material('AV control edge',(.25,.27,.28,1),.3,.7)
    screen=b.material('projection surface',(.31,.33,.33,1),.98)
    opal=b.material('warm concealed diffuser',(1,.72,.39,1),.5,emission=1.3)
    indicator=b.material('standby amber',(.9,.38,.08,1),.5,emission=.6)
    seam=b.material('taupe stitch',(.25,.215,.17,1),.95)
    z=cfg['floorZ'];x0,y0,x1,y1=cfg['bounds'];ceiling=cfg['ceilingZ']-.033
    b.box_bounds('fitted carpet',[x0+.005,y0+.005,x1-.005,y1-.005],z+.002,z+.014,carpet)
    b.box_bounds('acoustic ceiling lining',[x0+.005,y0+.005,x1-.005,y1-.005],ceiling,ceiling+.03,plaster)
    # Continuous fabric ground with quiet vertical oak divisions; east opening stays free.
    b.box('screen wall fabric backing',((x0+x1)/2,y0+.018,z+1.27),(x1-x0-.015,.025,2.52),felt)
    b.box('west acoustic lining',(x0+.020,(y0+y1)/2,z+1.27),(.035,y1-y0-.015,2.52),felt)
    b.box('east acoustic lining',(x1-.020,(y0-10.91)/2,z+1.27),(.035,-10.91-y0,2.52),felt)
    b.box('rear acoustic lining',((x0+8.26)/2,y1-.019,z+1.27),(8.26-x0,.035,2.52),felt)
    # Thin dark finishes complete the doorway without occupying the leaf's sweep.
    # The deep rear acoustic lining stops before the fully open retained door.
    b.box('rear doorway dark wall finish',((8.26+x1-.005)/2,y1-.0015,z+1.27),(x1-.005-8.26,.002,2.52),plaster)
    b.box('east doorway head finish',(x1-.0015,(-10.91+y1)/2,z+2.31),(.002,y1+10.91,.42),plaster)
    b.box('east doorway south return finish',(x1-.0015,(-10.91-10.85)/2,z+1.05),(.002,.06,2.10),plaster)
    for label,bounds in [('west lining',[x0,y0,x0+.052,y1]),('east lining',[x1-.052,y0,x1,-10.91]),('rear lining',[x0,y1-.04,8.26,y1]),('screen wall lining',[x0,y0,x1,y0+.033])]:b.obstacle(label,bounds,z,z+2.52)
    for side,x in [('west',x0+.041),('east',x1-.041)]:
        for panel,(a,d) in enumerate(((-14.74,-13.80),(-13.50,-12.56),(-12.25,-11.31))):
            b.box(f'{side} acoustic pad {panel}',(x,(a+d)/2,z+1.32),(.018,d-a,1.78),felt,.007)
            for yy in (a-.014,d+.014):b.box(f'{side} oak panel joint {panel}',(x,yy,z+1.32),(.018,.016,1.80),smoked,.003)
        # Low warm guidance light is recessed behind a shallow cover, below the image.
        b.box(f'{side} skirting', (x,(y0-10.95)/2,z+.055),(.018,-10.95-y0,.09),smoked,.003)
        for yy in (-14.4,-12.9,-11.4):
            b.box(f'{side} aisle light recess',(x,yy,z+.18),(.017,.23,.05),metal,.006)
            b.box(f'{side} aisle light opal',(x+(.010 if side=='west' else -.010),yy,z+.171),(.006,.18,.013),opal,.002)
    # Dark, narrow framing keeps the front wall centred on the occupied seats.
    sx,sy,sz=cfg['screen']['center'];sw,sh=cfg['screen']['size']
    b.box('screen shadow surround',(sx,sy-.028,sz),(sw+.10,.065,sh+.10),shadow,.018)
    b.box('fixed projection screen',(sx,sy+.009,sz),(sw,.006,sh),screen,.002)
    b.obstacle('screen surround',[sx-sw/2-.05,sy-.061,sx+sw/2+.05,sy+.013],sz-sh/2-.05,sz+sh/2+.05)
    for xx in (5.31,8.25):
        b.box('front speaker cabinet',(xx,y0+.18,z+.57),(.16,.19,1.12),black,.014)
        b.box('front speaker plinth',(xx,y0+.18,z+.033),(.20,.23,.04),metal,.009)
        b.obstacle('front speaker',[xx-.10,y0+.065,xx+.10,y0+.30],z,z+1.14)
        for h,r in ((.35,.049),(.66,.049),(.94,.025)):
            b.cylinder('front speaker driver trim',(xx,y0+.28,z+h),r+.009,.012,metal,(0,1,0))
            b.cylinder('front speaker driver cone',(xx,y0+.288,z+h),r,.009,shadow,(0,1,0))
            b.cylinder('front speaker dust cap',(xx,y0+.294,z+h),r*.37,.009,black,(0,1,0),24)
    b.box('centre speaker cabinet',(sx,y0+.18,z+.455),(.57,.17,.16),black,.014)
    for xx in (sx-.18,sx,sx+.18):b.cylinder('centre speaker driver',(xx,y0+.273,z+.455),.043,.010,shadow,(0,1,0),28)
    b.box('subwoofer cabinet',(8.66,-14.79,z+.235),(.35,.38,.44),black,.025)
    b.cylinder('subwoofer driver',(8.66,-14.588,z+.235),.12,.015,shadow,(0,1,0),40)
    b.obstacle('subwoofer',[8.48,-14.985,8.84,-14.585],z,z+.46)
    # Four full-width places, low backs and useful controls/charging in the middle.
    a,c,d,e=cfg['sofa']['bounds'];cy=(c+e)/2
    b.box_bounds('sofa recessed plinth',[a+.09,c+.10,d-.09,e-.10],z+.03,z+.17,shadow,.025)
    b.box_bounds('sofa upholstered base',[a,c,d,e],z+.15,z+.29,fabric,.065)
    for i,x in enumerate([p[0]for p in cfg['eyes']]):
        b.box(f'seat {i+1} cushion',(x,-12.265,z+.365),(.604,.99,.17),fabric,.060)
        back=b.box(f'seat {i+1} back cushion',(x,-11.70,z+.735),(.604,.20,.61),fabric,.070)
        for vertex in back.data.vertices:vertex.co.y+=(vertex.co.z-(z+.735))*.18
        back.data.update()
        b.box(f'seat {i+1} lumbar cushion',(x,-11.93,z+.57),(.53,.16,.24),fabric,.065)
        b.tube(f'seat {i+1} front piping',[(x-.25,-12.763,z+.38),(x+.25,-12.763,z+.38)],.002,seam,1)
        b.tube(f'seat {i+1} back seam',[(x-.25,-11.814,z+.69),(x+.25,-11.814,z+.69)],.0016,seam,1)
    for x in(a+.05,d-.05):
        b.box('sofa outer arm',(x,cy,z+.43),(.10,e-c-.02,.42),fabric,.04)
        b.box('sofa arm oak tray',(x,cy-.12,z+.647),(.083,.34,.025),oak,.008)
    b.box('centre console carcass',(6.68,cy,z+.39),(.176,1.16,.50),smoked,.015)
    b.box('centre console stone top',(6.68,cy,z+.650),(.179,1.16,.025),stone,.01)
    for yy in(-12.45,-12.16):
        b.ring('centre console cup rim',(6.68,yy,z+.667),.044,.037,.01,metal)
        b.cylinder('centre console cup well',(6.68,yy,z+.667),.036,.006,shadow)
    b.box('centre console charging pad',(6.68,-11.84,z+.671),(.12,.16,.008),black,.01)
    for yy in(-11.865,-11.82):b.box('USB-C port',(6.68,yy,z+.676),(.030,.008,.004),shadow,.001)
    b.obstacle('four-place sofa',[a,c,d,e],z,z+1.055)
    # No footrests across the seat approach. A low rounded table leaves 650 mm.
    table=cfg['coffeeTable'];tx=(table[0]+table[2])/2;ty=(table[1]+table[3])/2
    b.box('coffee table recessed support',(tx,ty,z+.145),(table[2]-table[0]-.26,table[3]-table[1]-.20,.265),smoked,.085)
    b.box_bounds('coffee table limestone top',table,z+.275,z+.335,stone,.028)
    b.box('coffee table leather tray',(tx-.26,ty,z+.344),(.38,.25,.018),smoked,.035)
    b.box('remote control',(tx-.26,ty,z+.367),(.052,.17,.020),black,.009)
    b.cylinder('remote dial',(tx-.26,ty+.045,z+.380),.013,.004,metal,sides=24)
    for dx in(-.012,.012):
        for dy in(-.035,-.012,.012):b.cylinder('remote button',(tx-.26+dx,ty+dy,z+.380),.004,.003,silver,sides=10)
    b.obstacle('low coffee table',table,z,z+.38)
    # Tidy rear cabinet holds blankets and accessories; door swing is clear.
    cabinet=cfg['rearCabinet'];ca,cb,cc,cd=cabinet;front=cb
    b.box_bounds('rear storage carcass',cabinet,z+.08,z+.67,smoked,.012)
    width=(cc-ca)/4
    for i in range(4):
        xx=ca+width*(i+.5)
        b.box(f'rear storage drawer {i}',(xx,front-.008,z+.37),(width-.006,.020,.52),oak,.005)
        b.box(f'rear storage finger pull {i}',(xx,front-.021,z+.603),(width-.05,.011,.016),shadow,.002)
    b.box('rear storage limestone top',((ca+cc)/2,(cb+cd)/2,z+.689),(cc-ca+.02,cd-cb+.02,.03),stone,.009)
    b.obstacle('rear storage',[ca,cb-.03,cc,cd],z,z+.71)
    # Discreet surrounds and two ceiling positions; final acoustic setup is separate.
    for x in(5.23,9.03):
        b.box('surround speaker',(x,-11.26,z+1.24),(.085,.28,.36),black,.016)
        b.box('surround woven grille',(x+(.048 if x<7 else -.048),-11.26,z+1.24),(.010,.25,.33),felt,.008)
    for x in(5.79,7.59):
        b.cylinder('ceiling speaker bezel',(x,-12.0,ceiling-.013),.096,.020,metal,sides=40)
        b.cylinder('ceiling speaker grille',(x,-12.0,ceiling-.025),.084,.008,felt,sides=40)
    px,py,pz=6.76,-10.69,ceiling-.17
    b.box('projector body',(px,py,pz),(.36,.32,.13),black,.025)
    b.cylinder('projector lens rim',(px+.075,py-.166,pz),.042,.022,metal,(0,-1,0),40)
    b.cylinder('projector lens glass',(px+.075,py-.180,pz),.032,.011,black,(0,-1,0),40)
    for i in range(11):b.box('projector vent',(px-.157+i*.026,py+.165,pz),(.011,.007,.047),shadow,.002)
    b.cylinder('projector status LED',(px-.113,py-.164,pz+.01),.004,.005,indicator,(0,-1,0),12)
    b.box('projector mounting plate',(px,py,ceiling-.013),(.14,.10,.018),metal,.007)
    b.cylinder('projector mounting stem',(px,py,ceiling-.059),.018,.078,metal,sides=20)
    for yy in(-14.5,-10.55):
        b.box('ceiling concealed light rail',(6.73,yy,ceiling-.023),(2.72,.035,.04),metal,.009)
        b.box('ceiling concealed light opal',(6.73,yy,ceiling-.047),(2.60,.016,.008),opal,.003)
    b.light('front soft wash',(6.75,-14.55,z+2.24),.24,24,3.0)
    b.light('rear soft wash',(6.75,-10.61,z+2.24),.32,35,3.4)
    view=cfg['view']
    for values in(nav['rooms'],ns.get('new_views',[])):
        for item in values:
            if item['id']==view['id']:item.update(position=view['position'],direction=view['direction'])
    return b.finish(cfg)


def apply_leisure(ns,areas=('cinema','bar','gym','utility','guest','guestbath','family','cloakroom')):
    if ns.get('VARIANT') not in ('compact','planning'):return {}
    return {area:{'cinema':apply_cinema,'bar':apply_bar,'gym':apply_gym,'utility':apply_utility,'guest':apply_guest,'guestbath':apply_guestbath,'family':apply_family,'cloakroom':apply_cloakroom}[area](ns)for area in areas}


if 'scene' in globals() and 'nav' in globals():
    leisure_interior_report=apply_leisure(globals())
