"""Owner changes to the original house's rooms (proposal B, 21 September).

- The drawing room and dining room become one formal dining and lounge: the
  partition between them comes out over a new beam, and a long table runs
  east-west across the old wall line. The lounge's doors and everything else
  stay; the cane settee and bureau that stood against that wall are omitted.
  The kitchen, garden living and side garden living are the informal side.
- Bedrooms 2 and 3 are furnished as bedrooms instead of the photographed
  sitting room and TV room; Bedroom 2's bookcases move to the north wall of
  the former Bedroom 5 landing (one side only).
- The family room is a full office/study.
Original objects are omitted or copied, never edited: the baseline stays intact.
"""
_fr=spec.get('formalRoom');_ob=spec.get('originalBedrooms');_of=spec.get('office')

def _bb(ob):
    vs=[ob.matrix_world@v.co for v in ob.data.vertices]
    return [min(v[i] for v in vs) for i in range(3)]+[max(v[i] for v in vs) for i in range(3)]

if _fr:
    _frw=next(w for w in nav['walls'] if w['name']==_fr['partition'])
    (ax,ay),(bx,by)=_frw['a'],_frw['b'];_frx=(ax+bx)/2;_fry0,_fry1=sorted((ay,by))
    _fr_reason='Owner (proposal B): drawing room and dining room made one formal dining and lounge; partition removed over a new beam'
    for ob in list(original_objects):
        if ob.type!='MESH':continue
        n=ob.name;b=_bb(ob)
        on_wall=abs((b[0]+b[3])/2-_frx)<.22 and b[1]>_fry0-.05 and b[4]<_fry1+.05 and b[5]<2.7
        if (n.startswith(_fr['partition']+' |') or (on_wall and n.startswith(('Dining detail | Cornice','Trim comparison | Drawing frieze')))
            or n.startswith(('Circulation detail | Drawing bureau','Drawing cane settee','Dining oval table','Dining chair'))):
            remove_from_proposal(ob,_fr_reason)
    # A plaster-cased beam marks the structural line at ceiling level.
    box('Proposal | Formal room beam casing',(_frx,(_fry0+_fry1)/2,2.60-.125),(.32,_fry1-_fry0,.25),plaster,L)
    _frw['openings']=[[(_fry1-_fry0)/2,_fry1-_fry0,0,2.35,'open']]
    nav['obstacles']=[o for o in nav['obstacles'] if not o.get('name','').startswith(('Circulation detail | Drawing bureau','Drawing cane settee'))]
    if _fr.get('remove_east_display'):
        # Owner (22 September): the east display's chamfered corner wall goes
        # as well, so the opening between the two ends is wider. Its recess,
        # shelves, sill, skirting and the cornice reliefs along the chamfer are
        # omitted; the continuous mitred cornice is squared into the corner.
        _ed_reason='Owner (proposal B): east dining display chamfered wall removed to widen the opening into the lounge end'
        _ecx,_ecy=8.745,5.165   # the squared corner
        def _on_east_chamfer(x,y):return 7.55<x<8.85 and 5.1<y<6.4 and abs((y-5.165)-(x-7.63))<.16
        for ob in list(original_objects):
            if ob.type!='MESH':continue
            n=ob.name;b=_bb(ob)
            if 'East dining display' in n:remove_from_proposal(ob,_ed_reason);continue
            if n.startswith('Dining detail | Cornice') and _on_east_chamfer((b[0]+b[3])/2,(b[1]+b[4])/2):remove_from_proposal(ob,_ed_reason);continue
            if n=='Dining detail | Continuous mitred cornice':
                c=revised_copy(ob,_ed_reason);mw=c.matrix_world;inv=mw.inverted()
                for v in c.data.vertices:
                    w=mw@v.co
                    if _on_east_chamfer(w.x,w.y):
                        d=((w.y-5.165)-(w.x-7.63))/math.sqrt(2)   # depth into the room off the chamfer face
                        v.co=inv@type(w)((_ecx-d,_ecy+d,w.z))
        nav['obstacles']=[o for o in nav['obstacles'] if o.get('name')!='Owner interior detail | East dining display chamfered wall']
    if _fr.get('remove_writing_desk'):   # owner (22 September)
        for ob in list(original_objects):
            if ob.type=='MESH' and ob.name.startswith('Dining writing desk'):remove_from_proposal(ob,'Owner (proposal B): dining writing desk omitted')
    # The original navigation blocks for the omitted furniture go with it.
    nav['obstacles']=[o for o in nav['obstacles'] if not (o.get('name','').startswith(('Dining chair','Dining oval table'))
                      or (_fr.get('remove_writing_desk') and o.get('name','').startswith('Dining writing desk')))]
    if _fr.get('clear_room_furniture'):
        # Owner (22 September): the dining room is cleared - the carved
        # sideboard on its west wall goes with it, so the oval table has room.
        _cf_reason='Owner (proposal B): dining room cleared for the oval table'
        for _o in list(original_objects):
            if _o.type=='MESH' and _o.name.startswith('Dining wall v2 | Sideboard'):remove_from_proposal(_o,_cf_reason)
        nav['obstacles']=[o for o in nav['obstacles'] if o.get('name')!='Dining carved sideboard']
    if _fr.get('oval_table'):
        # Owner (22 September): an oval table centred in the dining room, on twin
        # turned pedestals, with the chandelier moved over its centre.
        _ot=_fr['oval_table'];_ocx,_ocy=_ot['center'];_oa=float(_ot['long_m'])/2;_osb=float(_ot['short_m'])/2
        _osc=(_osb/_oa,1)
        cylinder('Proposal | Formal dining oval table top',(_ocx,_ocy,.755),_oa,.05,oak,F,64,scale=_osc)
        cylinder('Proposal | Formal dining oval table frieze',(_ocx,_ocy,.705),_oa-.035,.06,oak,F,64,scale=_osc)
        for _dy in(-.56,.56):
            cylinder('Proposal | Formal dining table pedestal',(_ocx,_ocy+_dy,.40),.075,.62,oak,F,16)
            cylinder('Proposal | Formal dining table pedestal collar',(_ocx,_ocy+_dy,.70),.11,.06,oak,F,16)
            cylinder('Proposal | Formal dining table pedestal foot',(_ocx,_ocy+_dy,.055),.42,.11,oak,F,28,scale=(.62,1))
        obstacle('Proposal | Formal dining table',[_ocx-_osb,_ocy-_oa,_ocx+_osb,_ocy+_oa],0,.80)
        for _i,(_sx,_sy,_sa) in enumerate([(_ocx-_osb-.34,_ocy-.55,-math.pi/2),(_ocx-_osb-.34,_ocy+.55,-math.pi/2),
                                           (_ocx+_osb+.34,_ocy-.55,math.pi/2),(_ocx+_osb+.34,_ocy+.55,math.pi/2),
                                           (_ocx,_ocy-_oa-.34,0),(_ocx,_ocy+_oa+.34,math.pi)]):
            _nm='Proposal | Formal dining chair '+str(_i+1)
            rounded(box(_nm+' seat',(_sx,_sy,.46),(.46,.45,.095),fabric,F,_sa),.025)
            rounded(box(_nm+' back',(_sx+.20*math.sin(_sa),_sy-.20*math.cos(_sa),.74),(.46,.085,.48),oak,F,_sa),.025)
            for _dx in(-.17,.17):
                for _dy in(-.16,.16):
                    _lx=_sx+_dx*math.cos(_sa)-_dy*math.sin(_sa);_ly=_sy+_dx*math.sin(_sa)+_dy*math.cos(_sa)
                    beam(_nm+' leg',(_lx,_ly,.025),(_lx,_ly,.43),.036,black,F)
            obstacle(_nm,[_sx-.255,_sy-.255,_sx+.255,_sy+.255],0,1.0)
        # The chandelier hangs over the table's centre, not its old position.
        _chx=[_o for _o in original_objects if _o.type=='MESH' and _o.name.startswith('Dining chandelier')]
        if _chx:
            _cb=[_bb(_o) for _o in _chx]
            _cdx=_ocx-(min(b[0] for b in _cb)+max(b[3] for b in _cb))/2;_cdy=_ocy-(min(b[1] for b in _cb)+max(b[4] for b in _cb))/2
            for _o in _chx:
                _c=revised_copy(_o,'Owner (proposal B): the dining chandelier moves over the centre of the new oval table')
                _c.location=(_c.location[0]+_cdx,_c.location[1]+_cdy,_c.location[2])
    else:
        # One long table across the old wall line, chairs down both sides.
        tx,ty,tw,td=_fr['table']
        table('Proposal | Formal dining table',tx,ty,tw,td)
    # One room record in place of two; both original viewpoints keep their ids.
    dining=next(r for r in nav['planRooms'] if r['name']=='Dining room');drawing=next(r for r in nav['planRooms'] if r['name']=='Drawing room')
    dining['name']='Formal dining and lounge';dining['published_dimensions_m']=None
    dining['polygon_m']=[[5.05,5.1],[5.05,9.19],[5.899166819254557,10.18],[8.030833485921224,10.18],[8.88,9.19],[8.88,8.82]]+[list(q) for q in drawing['polygon_m'][1:]]+[[8.88,5.1]]
    nav['planRooms']=[r for r in nav['planRooms'] if r is not drawing]
    for v in nav['rooms']:
        if v['label']=='Dining Room':v['label']='Formal dining and lounge · dining end';v['position']=[6.2,9.6,0];v['direction']=[.35,-1]   # in the bay, clear of the north-side chairs, looking down the oval table
        if v['label']=='Drawing Room':v['label']='Formal dining and lounge · lounge end'
    changes.append({'original':'Dining room / Drawing room','action':'merged in proposal only','reason':_fr['basis']})

if _ob:
    _ob_reason='Owner (proposal B): Bedrooms 2 and 3 furnished as bedrooms; bookcases moved to the former Bedroom 5 landing'
    _bk=_ob.get('bookcases_to_landing')
    for ob in list(original_objects):
        if ob.type!='MESH':continue
        n=ob.name
        if n.startswith('Upstairs photo detail | Bedroom 2 north case') and _bk:
            c=revised_copy(ob,_ob_reason);c.location=(c.location[0]+_bk['dx'],c.location[1]+_bk['dy'],c.location[2])
        elif n.startswith(('Bedroom 3 CD shelves','Bedroom 3 south bookcase','Bedroom 3 paired shelves','Bedroom 3 television','Bedroom 3 leather sofa',
                           'Upstairs photo detail | Bedroom 2 west open','Bedroom 2 armchair','Upstairs photo detail | Bedroom 2 north case')):
            remove_from_proposal(ob,_ob_reason)
    if _bk:obstacle('Proposal | Landing bookcases',_bk['obstacle'],2.8,4.66)
    nav['obstacles']=[o for o in nav['obstacles'] if not o.get('name','').startswith(('Bedroom 3 CD shelves','Bedroom 3 leather sofa','Bedroom 3 paired shelves','Bedroom 3 south bookcase','Bedroom 3 television','Bedroom 2 armchair','Upstairs photo detail | Bedroom 2 north case','Upstairs photo detail | Bedroom 2 west open'))]
    b3=_ob['bedroom3'];b2=_ob['bedroom2']
    bed('Proposal | Bedroom 3 bed',b3['bed'][0],b3['bed'][1],2.8,b3['bed'][2],b3['bed'][3],angle=math.pi)   # head to the south wall
    wardrobe('Proposal | Bedroom 3 wardrobe',b3['wardrobe'],2.8)
    bed('Proposal | Bedroom 2 bed',b2['bed'][0],b2['bed'][1],2.8,b2['bed'][2],b2['bed'][3],angle=-math.pi/2)   # head to the east wall
    wardrobe('Proposal | Bedroom 2 wardrobe',b2['wardrobe'],2.8)
    for v in nav['rooms']:
        if v['label']=='Bedroom 2':v['position']=[10.8,1.5,2.8];v['direction']=[1,0]
        if v['label']=='Bedroom 3':v['position']=[3.6,7.3,2.8];v['direction']=[-1,0]
    changes.append({'original':'Bedroom 2 / Bedroom 3 furniture','action':'replaced in proposal only','reason':_ob['basis']})

if _of and _of.get('enabled'):
    _of_reason='Owner (proposal B): the family room is a full office/study'
    _fancy=bool(_of.get('fancy'))
    for ob in list(original_objects):
        if ob.type=='MESH' and (ob.name.startswith('Family cane chair') or (_fancy and ob.name.startswith('Family photo detail | Small wooden chair'))):remove_from_proposal(ob,_of_reason)
    nav['obstacles']=[o for o in nav['obstacles'] if not (o.get('name','').startswith('Family cane chair') or (_fancy and o.get('name','').startswith('Family photo detail | Small wooden chair')))]
    if _fancy:
        # Owner (22 September): a fancy office. A walnut pedestal desk with a
        # leather top faces the room with the bay behind the chair; two leather
        # visitor chairs; a credenza with decanters on the kitchen wall; oak
        # dado panelling, pictures, a rug and a floor lamp.
        walnut=mat('Dark walnut',(.20,.11,.06,1),.48);leather=mat('Oxblood leather',(.28,.07,.06,1),.42);brass=mat('Antique brass',(.55,.42,.20,1),.35,.8)
        office_rug=mat('Office rug navy',(.13,.15,.22,1),.95);green_shade=mat('Banker lamp green',(.08,.30,.16,1),.3,0,.35)
        box('Proposal | Office rug',(2.40,1.75,.006),(3.20,2.50,.012),office_rug,F)
        dx_,dy_=2.40,1.55
        rounded(box('Proposal | Office desk top',(dx_,dy_,.755),(2.00,.95,.05),walnut,F),.006)
        box('Proposal | Office desk leather top',(dx_,dy_,.783),(1.62,.62,.006),leather,F)
        for sx in(-.70,.70):
            rounded(box('Proposal | Office desk pedestal',(dx_+sx,dy_,.365),(.52,.86,.73),walnut,F),.006)
            for i in range(3):box('Proposal | Office desk drawer pull',(dx_+sx,dy_+.44,.16+i*.22),(.14,.012,.018),brass,F)
        box('Proposal | Office desk modesty panel',(dx_,dy_-.30,.42),(.90,.03,.60),walnut,F)
        obstacle('Proposal | Office desk',[dx_-1.0,dy_-.475,dx_+1.0,dy_+.475],0,.80)
        # Banker's lamp, blotter, pen tray on the desk.
        cylinder('Proposal | Office banker lamp base',(dx_+.72,dy_-.22,.80),.075,.03,brass,F,20)
        beam('Proposal | Office banker lamp stem',(dx_+.72,dy_-.22,.81),(dx_+.72,dy_-.22,1.12),.014,brass,F)
        rounded(box('Proposal | Office banker lamp shade',(dx_+.72,dy_-.18,1.15),(.27,.14,.11),green_shade,F),.03)
        box('Proposal | Office desk blotter',(dx_-.15,dy_-.10,.787),(.60,.42,.004),black,F)
        box('Proposal | Office pen tray',(dx_-.75,dy_-.28,.795),(.22,.09,.02),leather,F)
        # High-back leather chair with its back to the bay.
        cx_,cy_=dx_,dy_-.72
        cylinder('Proposal | Office chair post',(cx_,cy_,.22),.03,.30,black,F,12)
        for k in range(5):
            a=k*2*math.pi/5;beam('Proposal | Office chair star',(cx_,cy_,.05),(cx_+.30*math.cos(a),cy_+.30*math.sin(a),.04),.03,black,F)
        rounded(box('Proposal | Office chair seat',(cx_,cy_,.50),(.56,.54,.12),leather,F),.03)
        rounded(box('Proposal | Office chair back',(cx_,cy_-.24,.92),(.54,.12,.76),leather,F),.03)
        for sx in(-.30,.30):rounded(box('Proposal | Office chair arm',(cx_+sx,cy_-.02,.68),(.06,.42,.05),walnut,F),.01)
        obstacle('Proposal | Office desk chair',[cx_-.32,cy_-.34,cx_+.32,cy_+.30],0,1.3)
        # Two leather visitor chairs facing the desk.
        for vx in(1.72,3.08):
            rounded(box('Proposal | Office visitor chair seat',(vx,2.55,.24),(.66,.66,.44),leather,F),.03)
            rounded(box('Proposal | Office visitor chair back',(vx,2.82,.62),(.66,.14,.40),leather,F),.03)
            for sx in(-.27,.27):rounded(box('Proposal | Office visitor chair arm',(vx+sx,2.50,.56),(.12,.60,.20),leather,F),.03)
            obstacle('Proposal | Office visitor chair',[vx-.34,2.20,vx+.34,2.90],0,.85)
        # Credenza with decanters on the kitchen wall, west of the door.
        rounded(box('Proposal | Office credenza',(1.95,3.66,.42),(1.60,.46,.84),walnut,F),.006)
        for i in range(3):box('Proposal | Office credenza door pull',(1.45+i*.50,3.425,.45),(.012,.012,.14),brass,F)
        box('Proposal | Office drinks tray',(2.35,3.66,.855),(.46,.32,.015),brass,F)
        cylinder('Proposal | Office decanter',(2.25,3.62,.97),.055,.22,glass,F,16);cylinder('Proposal | Office decanter neck',(2.25,3.62,1.13),.02,.10,glass,F,12)
        for gx in(2.42,2.50):cylinder('Proposal | Office tumbler',(gx,3.70,.905),.035,.085,glass,F,12)
        obstacle('Proposal | Office credenza',[1.15,3.43,2.75,3.90],0,.86)
        # Oak dado panelling and rail on the west, north and east walls, clear of the bookcases and the door.
        for label,a,b in(('west',[.155,.25],[.155,2.95]),('north',[.50,3.885],[3.60,3.885]),('east south',[4.245,.25],[4.245,.82]),('east middle',[4.245,1.86],[4.245,2.50])):
            wall('Proposal | Office dado panelling '+label,a,b,.14,1.05,oak,F,.03,False)
            beam('Proposal | Office dado rail '+label,(*a,1.06),(*b,1.06),.045,oak,F)
        # Pictures over the dado and a floor lamp in the west corner.
        box('Proposal | Office picture west',(.17,1.55,1.75),(.03,.80,.58),black,F);box('Proposal | Office picture west canvas',(.19,1.55,1.75),(.005,.74,.52),fabric,F)
        box('Proposal | Office picture north',(2.05,3.885,1.95),(1.10,.03,.70),black,F);box('Proposal | Office picture north canvas',(2.05,3.865,1.95),(1.04,.005,.64),fabric,F)
        cylinder('Proposal | Office floor lamp base',(.48,.55,.015),.16,.03,brass,F,20);beam('Proposal | Office floor lamp stem',(.48,.55,.03),(.48,.55,1.55),.018,brass,F)
        cylinder('Proposal | Office floor lamp shade',(.48,.55,1.62),.19,.24,fabric,F,20);lamp('Proposal | Office floor lamp',.48,.55,1.45)
        obstacle('Proposal | Office floor lamp',[.30,.37,.66,.73],0,1.9)
    else:
        # Desk facing the bay, chair behind it, shelving along the kitchen wall, filing cabinet by the door.
        box('Proposal | Office desk',(2.40,1.50,.75),(1.80,.80,.05),oak,F)
        for dx in(-.82,.82):
            for dy in(-.32,.32):beam('Proposal | Office desk leg',(2.40+dx,1.50+dy,0),(2.40+dx,1.50+dy,.72),.04,black,F)
        obstacle('Proposal | Office desk',[1.50,1.10,3.30,1.90],0,.78)
        desk_details('Proposal | Office desk',2.40,1.50,0,1.80,.80,2.40,2.22,math.pi)
        if _of.get('shelving',True):   # owner (22 September): no shelving run
            rounded(box('Proposal | Office shelving',(2.75,3.79,1.05),(2.30,.36,2.10),oak,F),.01)
            for i in range(4):box('Proposal | Office shelf',(2.75,3.79,.30+i*.48),(2.22,.32,.025),oak,F)
            obstacle('Proposal | Office shelving',[1.60,3.61,3.90,3.97],0,2.1)
        rounded(box('Proposal | Office filing cabinet',(.38,1.55,.66),(.46,.62,1.32),black,F),.01)
        box('Proposal | Office printer',(.38,1.55,1.42),(.42,.36,.20),black,F)
        obstacle('Proposal | Office filing cabinet',[.15,1.24,.61,1.86],0,1.62)
    for r in nav['planRooms']:
        if r['name']=='Family room':r['name']='Office'
    for v in nav['rooms']:
        if v['label']=='Family Room':v['label']='Office';v['position']=[3.8,3.0,0];v['direction']=[-.8,-.5]
    changes.append({'original':'Family room furniture','action':'replaced in proposal only','reason':_of['basis']})
