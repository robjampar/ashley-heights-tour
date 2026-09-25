"""P6 room programme: fitted cinema, gym, wine room and side-wing bedrooms.

All removals are proposal-only. Furniture is kept out of doorways and the
original stair remains the sole ground-to-first route.
"""

cinema_fabric=mat('Cinema ink velvet',(.043,.061,.065,1),.98)
screen_material=mat('Cinema projection screen',(.66,.72,.69,1),.86,0,.16)
rubber=mat('Gym rubber',(.075,.083,.078,1),.95)
equipment=mat('Gym graphite',(.11,.13,.12,1),.4,.65)
wine_bottle=mat('Bottle green',(.025,.085,.041,1),.22)
wine_label=mat('Wine bottle labels',(.75,.70,.52,1),.8)

def turn_cylinder(ob,centre,axis):
    # Shared primitives store world-space vertices with an origin at zero.
    # Rotate the geometry about its own centre, not about the house origin.
    pivot=Vector(centre);rotation=Vector((0,0,1)).rotation_difference(Vector(axis))
    for v in ob.data.vertices:v.co=pivot+rotation@(v.co-pivot)
    average=sum((v.co for v in ob.data.vertices),Vector())/len(ob.data.vertices)
    assert (average-pivot).length<.00002,(ob.name,list(average),centre)
    return ob


# The original family room remains shared living. P8 moves the cinema to
# the new-wing basement; its furnishing is built in proposal_basement.py.
cinema_removed=[]

# The former garage is now one open garden-facing living space. Keep the
# entire east circulation lane and cellar entrance clear of movable fittings.
sofa('Proposal | Side living sofa',-4.18,5.68,2.30,math.pi/2)
new_obstacles[-1]['box']=[-4.63,4.53,-3.73,6.83]
rounded(box('Proposal | Side living coffee table',(-2.92,5.68,.40),(.72,1.20,.075),oak,F),.04)
for xx in(-3.18,-2.66):
    for yy in(5.24,6.12):box('Proposal | Side living table foot',(xx,yy,.19),(.045,.045,.38),black,F)
obstacle('Proposal | Side living coffee table',[-3.28,5.08,-2.56,6.28],0,.45)
box('Proposal | Side living rug',(-3.20,5.68,.011),(3.30,3.45,.018),fabric,F)
# A compact gym now occupies the east side of the new entrance wing, with
# its own window. The entrance, boot-room passage and garden route stay open.
_gyn=float(WL.get('gym_north_y',-6.71));_gwx=float(WL.get('gym_west_x',10.69))+.06
box('Proposal | Gym rubber floor',((_gwx+13.73)/2,(-11.93+_gyn-.06)/2,.009),(13.73-_gwx,_gyn-.06+11.93,.018),rubber,F)
if WL['gym_south_y']<-13.5:box('Proposal | Gym rubber floor south',(12.59,-13.20,.009),(2.28,2.54,.018),rubber,F)
_gl=WL.get('gym_layout') or {}
def _gym_xy(x,y,dx,dy,a):
    ca,sa=math.cos(a),math.sin(a);return (x+dx*ca-dy*sa, y+dx*sa+dy*ca)
def _gym_obstacle(name,x,y,a,dx0,dy0,dx1,dy1,top):
    pts=[_gym_xy(x,y,px,py,a) for px,py in ((dx0,dy0),(dx1,dy0),(dx1,dy1),(dx0,dy1))]
    obstacle(name,[min(p[0] for p in pts),min(p[1] for p in pts),max(p[0] for p in pts),max(p[1] for p in pts)],0,top)
def gym_treadmill(x,y,a=0.0,suffix=''):
    # Local frame: the belt runs along -y and the console stands at +y, so the
    # user faces +y; a rotates the whole machine about its centre.
    name='Proposal | Gym treadmill'+suffix
    rounded(box(name+' chassis',(*_gym_xy(x,y,0,0,a),.19),(.91,1.87,.17),equipment,F,a),.045)
    box(name+' running belt',(*_gym_xy(x,y,0,-.04,a),.286),(.64,1.58,.016),rubber,F,a)
    for dx in(-.43,.43):
        beam(name+' upright',(*_gym_xy(x,y,dx,.65,a),.24),(*_gym_xy(x,y,dx,.50,a),1.20),.055,equipment,F)
        beam(name+' handle',(*_gym_xy(x,y,dx,.50,a),1.15),(*_gym_xy(x,y,dx,-.10,a),1.04),.045,rubber,F)
    rounded(box(name+' console',(*_gym_xy(x,y,0,.49,a),1.25),(.79,.30,.08),black,F,a),.025)
    box(name+' display',(*_gym_xy(x,y,0,.465,a),1.296),(.28,.15,.01),screen_material,F,a)
    _gym_obstacle(name,x,y,a,-.49,-.99,.49,.83,1.35)
# Owner (22 September): two treadmills face west on the entrance axis - from the
# southern one the open gym door lines up with the gallery and the front doors.
for _i,(_tx,_ty) in enumerate(_gl.get('treadmills') or [(13.08,-9.40)]):
    gym_treadmill(_tx,_ty,math.pi/2 if _gl.get('treadmills') else math.pi,'' if _i==0 else ' '+str(_i+1))
# Upright bike beside them, facing the same way.
if _gl.get('bike'):
    _bx,_by=_gl['bike'];name='Proposal | Gym exercise bike'
    beam(name+' base front',(_bx-.42,_by-.26,.06),(_bx-.42,_by+.26,.06),.09,equipment,F)
    beam(name+' base rear',(_bx+.42,_by-.26,.06),(_bx+.42,_by+.26,.06),.09,equipment,F)
    beam(name+' frame',(_bx+.40,_by,.12),(_bx-.30,_by,.98),.075,equipment,F)
    beam(name+' seat post',(_bx+.28,_by,.55),(_bx+.16,_by,.92),.055,equipment,F)
    rounded(box(name+' saddle',(_bx+.16,_by,.95),(.30,.16,.07),black,F),.03)
    rounded(box(name+' console',(_bx-.34,_by,1.12),(.12,.34,.26),black,F),.02)
    box(name+' display',(_bx-.40,_by,1.14),(.012,.24,.16),screen_material,F)
    turn_cylinder(cylinder(name+' flywheel',(_bx-.02,_by,.42),.26,.07,equipment,F,28),(_bx-.02,_by,.42),(0,1,0))
    for _s in(-.19,.19):beam(name+' crank',(_bx-.02,_by+_s,.42),(_bx+.16,_by+_s,.28),.035,black,F)
    obstacle(name,[_bx-.55,_by-.35,_bx+.55,_by+.35],0,1.25)
# Rower along the east wall, stowed upright-free with its rail running north.
if _gl.get('rower'):
    _rx,_ry=_gl['rower'];name='Proposal | Gym rower'
    beam(name+' rail',(_rx,_ry-1.05,.34),(_rx,_ry+1.05,.34),.09,equipment,F)
    rounded(box(name+' seat',(_rx,_ry-.05,.45),(.30,.26,.09),black,F),.03)
    beam(name+' front foot',(_rx-.28,_ry+1.02,.09),(_rx+.28,_ry+1.02,.09),.10,equipment,F)
    beam(name+' rear foot',(_rx-.24,_ry-1.02,.09),(_rx+.24,_ry-1.02,.09),.10,equipment,F)
    cylinder(name+' flywheel housing',(_rx,_ry+.92,.42),.23,.22,equipment,F,24)
    rounded(box(name+' footplate',(_rx,_ry+.58,.30),(.46,.30,.10),black,F),.02)
    beam(name+' handle',(_rx-.15,_ry+.44,.40),(_rx+.15,_ry+.44,.40),.035,black,F)
    obstacle(name,[_rx-.33,_ry-1.15,_rx+.33,_ry+1.15],0,.75)
# Cable station against the east wall, between the rower and the bench bay.
if _gl.get('cable'):
    _cx,_cy=_gl['cable'];name='Proposal | Gym cable station'
    for _s in(-.55,.55):
        beam(name+' column',(_cx,_cy+_s,.05),(_cx,_cy+_s,2.15),.09,equipment,F)
        beam(name+' cable',(_cx-.02,_cy+_s,2.05),(_cx-.02,_cy+_s,1.35),.012,black,F)
        rounded(box(name+' handle',(_cx-.06,_cy+_s,1.28),(.05,.16,.05),black,F),.02)
    box(name+' head beam',(_cx,_cy,2.12),(.14,1.20,.12),equipment,F)
    rounded(box(name+' weight stack',(_cx+.02,_cy,.72),(.24,1.02,1.34),black,F),.02)
    obstacle(name,[_cx-.25,_cy-.70,_cx+.16,_cy+.70],0,2.2)
# Free-weight bench and barbell rack in the south bay.
name='Proposal | Gym weights bench';x,y=_gl.get('bench') or (11.40,-9.40)
rounded(box(name+' padded seat',(x,y-.40,.48),(.46,.41,.11),rubber,F),.035)
rounded(box(name+' padded back',(x,y+.26,.49),(.46,.87,.11),rubber,F),.035)
beam(name+' frame',(x,y-.65,.32),(x,y+.65,.32),.07,equipment,F)
for yy in(y-.5,y+.5):
    beam(name+' foot',(x-.31,yy,.045),(x+.31,yy,.045),.055,equipment,F)
    beam(name+' support',(x,yy,.05),(x,yy,.42),.055,equipment,F)
obstacle(name,[x-.33,y-.77,x+.33,y+.77],0,.59)
if _gl.get('bench'):
    name='Proposal | Gym barbell rack'
    for _s in(-.62,.62):
        beam(name+' upright',(x+_s,y+.62,.05),(x+_s,y+.62,1.32),.075,equipment,F)
        beam(name+' hook',(x+_s,y+.62,1.24),(x+_s,y+.44,1.30),.05,black,F)
    beam(name+' barbell',(x-.92,y+.50,1.31),(x+.92,y+.50,1.31),.05,equipment,F)
    for _s in(-.80,-.70,.70,.80):turn_cylinder(cylinder(name+' plate',(x+_s,y+.50,1.31),.22,.055,black,F,24),(x+_s,y+.50,1.31),(1,0,0))
    obstacle(name,[x-.72,y+.30,x+.72,y+.76],0,1.35)
name='Proposal | Gym dumbbell rack';x,y=_gl.get('rack') or (12.68,-7.08)
for xx in(x-.58,x+.58):beam(name+' leg',(xx,y,.07),(xx,y,.9),.045,equipment,F)
for h in(.38,.80):
    box(name+' shelf',(x,y,h),(1.31,.40,.035),equipment,F)
    for j in range(4):
        xx=x-.45+j*.30
        beam(name+' dumbbell grip',(xx,y-.12,h+.095),(xx,y+.12,h+.095),.028,black,F)
        for yy in(y-.14,y+.14):
            ob=cylinder(name+' hex weight',(xx,yy,h+.095),.077,.07,black,F,6);turn_cylinder(ob,(xx,yy,h+.095),(0,1,0))
obstacle(name,[x-.68,y-.26,x+.68,y+.26],0,1.0)
# A mat and stability ball for floor work, out of the walking lines.
if _gl.get('mat'):
    _mx,_my=_gl['mat']
    box('Proposal | Gym exercise mat',(_mx,_my,.021),(.62,1.75,.024),rubber,F)
    _bx,_by=_gl.get('ball') or (_mx+.52,_my+1.05)   # owner: the ball can be placed on its own, clear of the courtyard doors
    cylinder('Proposal | Gym stability ball',(_bx,_by,.33),.33,.66,equipment,F,24,scale=(1,1))
    obstacle('Proposal | Gym stability ball',[_bx-.33,_by-.33,_bx+.33,_by+.33],0,.66)
# Owner: no gym mirror.

# Underground cellar: a central tasting space, full-height wine racks and
# a clear route back to the dedicated stair in the south-east corner.
def bottle(name,x,y,z):
    for suffix,r,length,yy,material in [('body',.039,.225,y,wine_bottle),('shoulder',.027,.043,y-.125,wine_bottle),('neck',.015,.09,y-.183,wine_bottle),('label',.0398,.09,y+.015,wine_label)]:
        ob=cylinder(name+' '+suffix,(x,yy,z),r,length,material,F,12);turn_cylinder(ob,(x,yy,z),(0,1,0))
    ob=cylinder(name+' capsule',(x,y-.221,z),.016,.022,black,F,12);turn_cylinder(ob,(x,y-.221,z),(0,1,0))

def wine_rack(name,x0,x1,y):
    box(name+' back',((x0+x1)/2,y+.17,1.16),(x1-x0,.027,2.15),oak,F)
    for x in(x0,x1):box(name+' upright',(x,y,1.16),(.055,.36,2.15),oak,F)
    for row in range(7):
        z=.31+row*.275
        box(name+' shelf',((x0+x1)/2,y,z-.047),(x1-x0,.37,.025),oak,F)
        for col in range(max(1,int((x1-x0-.12)/.13))):bottle(name+' bottle',x0+.12+col*.13,y-.015,z)
    obstacle(name,[x0-.03,y-.25,x1+.03,y+.20],0,2.26)

from mathutils import Matrix
# Transform both native objects and their collision boxes as one unit.
def fitted_group(build,transform):
    before={o.name for o in scene.objects};start=len(new_obstacles);build()
    bpy.context.view_layer.update()
    for ob in [o for o in scene.objects if o.name not in before]:ob.matrix_world=transform@ob.matrix_world
    for item in new_obstacles[start:]:
        a,b,c,d=item['box'];pts=[transform@Vector((xx,yy,zz)) for xx in(a,c) for yy in(b,d) for zz in(item['bottom'],item['top'])]
        item['box']=[min(v.x for v in pts),min(v.y for v in pts),max(v.x for v in pts),max(v.y for v in pts)]
        item['bottom']=min(v.z for v in pts);item['top']=max(v.z for v in pts)
if spec.get('sideWingCellar',True):
    fitted_group(lambda:wine_rack('Proposal | Wine north rack',-4.82,-.35,8.43),Matrix.Translation(Vector((0,0,-2.8))))
    fitted_group(lambda:wine_rack('Proposal | Wine west rack',-1.40,1.40,0),Matrix.Translation(Vector((-4.73,5.85,-2.8)))@Matrix.Rotation(math.pi/2,4,'Z'))
    fitted_group(lambda:wine_rack('Proposal | Wine east rack',-1.10,1.10,0),Matrix.Translation(Vector((-.45,6.25,-2.8)))@Matrix.Rotation(-math.pi/2,4,'Z'))
    fitted_group(lambda:table('Proposal | Cellar tasting table',-2.56,5.80,1.45,.82),Matrix.Translation(Vector((0,0,-2.8))))
    rounded(box('Proposal | Cellar climate unit',(-4.86,3.14,-.62),(.26,.82,.28),black,F),.025)
    for y in(2.90,3.0,3.1,3.2,3.3,3.4):box('Proposal | Cellar cooling grille',(-4.714,y,-.62),(.008,.041,.10),equipment,F)

# One bedroom remains above the former garage. The north room becomes a
# shared lounge in P7. A 1.55m frame accommodates a 1.50m mattress here.
if _side_front<.3:
    bed('Proposal | Side south bed',-3.55,1.35+_side_front,2.8,1.55,2.0,math.pi)
    for side,y0,y1 in [('south',.24+_side_front,1.91+_side_front)]:
        wardrobe('Proposal | Side '+side+' wardrobe',[-.78,y0,-.16,y1],2.8,2.20)
        wardrobe_front('Proposal | Side '+side+' wardrobe',[-.797,y0+.025],[-.797,y1-.025],2.8,2.20)
else:
    # With the front set well back the room is ~2 m deep in its west part. A 1.35 m double
    # (4 ft 6 in) stands head to the front wall in the east part, east of the bedroom door, so the
    # way from the door straight across to the ensuite is ~0.9 m clear; one bedside on its west
    # side by the front wall; the wardrobe against the ensuite wall, west of its door, clear of the
    # west window. (Owner, 24 Sep 2026: side wing set back 900 mm.)
    _ry0=_side_front+.115
    bed('Proposal | Side south bed',-.115-.07-.675,_ry0+.01+.975,2.8,1.35,1.95,math.pi,sides=(False,True))
    wardrobe('Proposal | Side south wardrobe',[-5.02,2.38,-3.62,2.935],2.8,2.20)
    wardrobe_front('Proposal | Side south wardrobe',[-5.0,2.363],[-3.64,2.363],2.8,2.20)
for ob in list(scene.objects):
    if ob.type=='MESH' and ob.name.startswith(('Proposal | Side south bed','Proposal | Side north bed')):
        if any(word in ob.name for word in('mattress','pillow','headboard')):rounded(ob,.03)
        elif 'bedside' in ob.name and 'lamp' not in ob.name:rounded(ob,.01)

for label,x,y,z,range_,intensity in[
    ('Side living',-2.8,5.8,2.25,5,.80),('Gym',12.2,-8.5,2.25,3.0,.65),
    *([('Wine cellar',-2.4,5.6,-.60,5.5,.80)] if spec.get('sideWingCellar',True) else []),
    ('Side south bedroom',-2.5,1.8,4.85,3.3,.80),
    ('Upstairs family lounge',-2.5,7.0,4.85,3.3,.80),
    ('Side shared hall',-1.4,4.42,4.82,3.0,.70),
    ('Connecting landing',2.35,3.78,4.90,3.2,.75),
]:
    nav['proposalLights'].append({'name':label,'position':[x,y,z],'range':range_,'intensity':intensity})
    ld=bpy.data.lights.new('Proposal | '+label+' ceiling light','AREA');ld.energy=32 if label=='Cinema' else 100;ld.color=(1,.88,.72);ld.shape='DISK';ld.size=.25 if label=='Upstairs family lounge' else .6
    ob=bpy.data.objects.new(ld.name,ld);collection(I).objects.link(ob);ob.location=(x,y,z+.24)
    cylinder('Proposal | '+label+' ceiling fitting',(x,y,z+.29),.17,.035,black,I,24)
    cylinder('Proposal | '+label+' ceiling diffuser',(x,y,z+.265),.145,.012,warm,I,24)

programme={
    'revision':spec['revision'],
    'cinema':{'original_room':'Family room','seats':4,'screen_m':[2.60,1.46],'original_bay_retained':True},
    'gym':{'location':'East side of the new front wing, beside entrance gallery','equipment':['treadmill','weights bench','dumbbell rack'],'clear_route':'Separate boot-room passage and unobstructed entrance axis; gym has its own east window'},
    'wine_cellar':{'location':'Underground, below the former garage footprint','floor_z_m':-2.8,'access':'Dedicated dogleg stair from side garden living','assumption':'Concept excavation, waterproofing and support; existing foundation depths and ground conditions unknown'},
    'bedrooms':{'retained_original':4,'new_front_principal':1,'new_side':1,'total':6,'loft':'Additional flexible studio/hobby space, not counted as a main bedroom'},
    'stairs':'Original ground-to-first plus new loft flight directly above; dedicated cellar access from side garden living; no staircase in new front wing',
    'cinema_removed_object_count':len(cinema_removed),
}
spec['lifestyleProgramme']=programme
((OUT if PLANNING else ROOT/'proposal')/f"{spec['revision']}-room-programme.json").write_text(json.dumps(programme,indent=2))
