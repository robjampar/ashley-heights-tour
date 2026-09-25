"""G1: a gate-parallel frontage, with the original link retained in place.

Executed by build_redesign.py from the completed Proposed checkpoint. Wall,
roof, furniture and door dimensions are authored in metres; nothing is sheared.
"""
import bmesh
from mathutils import Matrix
from gate_aligned_support import layout as gate_layout, point as gate_point
GP=gate_layout(nav); JOIN=GP['join_y']; gu=GP['garage_u']; eu=GP['entrance_u']; md=GP['main_depth']
U=Vector((*GP['gate_axis'],0)); V=Vector((*GP['inward'],0))
pt=lambda u,v:gate_point(GP,u,v)
nameprefix='G1 | '
base_brief=nav['proposal']['specification']
plaster='Proposal | White internal walls'
if plaster not in materials:plaster='Proposal | Loft plaster'
white=plaster

# Exact clipping in the original model coordinates. The retained north side
# contains the existing link, its staircase, courtyard and original roof join.
def clip(poly,axis,value,greater=True):
    if not poly:return []
    result=[]
    for a,b in zip(poly,poly[1:]+poly[:1]):
        da=(a[axis]-value)*(1 if greater else -1);db=(b[axis]-value)*(1 if greater else -1)
        if da>=-1e-8:result.append(list(a))
        if (da<0)!=(db<0):
            t=da/(da-db);result.append([a[i]+t*(b[i]-a[i])for i in range(len(a))])
    return result

def wing_box(b):return b[0]>2.65 and b[3]<14.5 and b[1]<JOIN-1e-5 and b[4]>-17.2

preserved_north=[];removed_wing=[]
for ob in list(scene.objects):
    if ob.type not in ('MESH','LIGHT'):continue
    meta=base_index.get(ob.name,{});layer=meta.get('layer','')
    if ob.type=='LIGHT':
        p=ob.matrix_world.translation
        if 2.65<p.x<14.5 and -17.2<p.y<JOIN and p.z>0:omit(ob,'Relight tapered front wing')
        continue
    if not ob.data.vertices:continue
    b=bounds(ob)
    if layer.startswith(('P10','P12','P30','P60','P70')) and wing_box(b) and b[5]>-.01 and b[2]>-.3:
        if 'Loft stair' in ob.name or 'First-to-loft' in ob.name:
            preserved_north.append(ob.name);continue
        if b[4]<=JOIN+1e-5:
            removed_wing.append(ob.name);omit(ob,'Replace front wing within the gate-aligned taper')
        else:
            new=edited_copy(ob,'Retain the complete link-side geometry north of the wing junction')
            bm=bmesh.new();bm.from_mesh(new.data)
            bmesh.ops.bisect_plane(bm,geom=bm.verts[:]+bm.edges[:]+bm.faces[:],
                plane_co=new.matrix_world.inverted()@Vector((0,JOIN,0)),
                plane_no=new.matrix_world.to_3x3().transposed()@Vector((0,1,0)),
                clear_inner=True,dist=1e-7)
            bm.to_mesh(new.data);bm.free();new.data.update()
            removed_wing.append(ob.name)
    elif b[1]>=JOIN-1e-5:preserved_north.append(ob.name)

# Corresponding collision/surface clipping. Site pieces and the existing
# basement remain; car bodies and stairs are repositioned independently below.
def clip_nav_item(item):
    nm=item.get('name','')
    if any(x in nm.lower()for x in ('car ','parking','forecourt','gate','basement','loft stair','first-to-loft')):return item
    bottom=item.get('bottom',item.get('z',0))
    if bottom<-.3:return item
    poly=item.get('polygon')
    if poly is None and 'box'in item:
        q=item['box'];poly=rect_polygon(q)
    if poly is None and 'a'in item and 'b'in item:poly=[item['a'],item['b']]
    if not poly:return item
    bb=[min(p[0]for p in poly),min(p[1]for p in poly),0,max(p[0]for p in poly),max(p[1]for p in poly),1]
    if not wing_box(bb):return item
    if bb[4]<=JOIN+1e-5:return None
    if 'a'in item:
        a,b=item['a'],item['b']
        if a[1]<JOIN or b[1]<JOIN:
            t=(JOIN-a[1])/(b[1]-a[1]);p=[a[0]+t*(b[0]-a[0]),JOIN]
            item['a' if a[1]<JOIN else 'b']=p
    else:
        item.pop('box',None);item['polygon']=clip(poly,1,JOIN)
    return item
for field in ('surfaces','segments','obstacles'):
    nav[field]=[r for item in nav[field]if (r:=clip_nav_item(item)) is not None]
nav['interactiveDoors']=[d for d in nav['interactiveDoors'] if not any(n in excluded for n in d['members'])]
old_wing_rooms=set()
for r in nav['planRooms']:
    poly=r.get('polygon_m')or[]
    if r.get('floor',0)<0 or not poly:continue
    if min(p[0]for p in poly)>2.65 and min(p[1]for p in poly)<JOIN-1e-5 and max(p[1]for p in poly)<0:
        if r['name']not in ('Original loft bridge','Joined first-floor landing','Attached entrance gallery'):
            old_wing_rooms.add(r['name'])
nav['planRooms']=[r for r in nav['planRooms']if r['name']not in old_wing_rooms]
nav['rooms']=[r for r in nav['rooms']if r['label']not in old_wing_rooms and not ('Basement stair access'==r['label'])]

# Appearance materials are explicit at construction: wall interiors are white,
# exterior faces participate in the existing instant finish controls.
def appearance(source,role):
    src=materials[source];m=src.copy();m.name='Appearance | G1 '+role
    m['appearance_role']=role;m['appearance_source_material']=source
    materials[m.name]=m;PALETTE[m.name]=list(m.diffuse_color)
    nav['exteriorAppearance']['materials'][m.name]={'role':role,'source':source}
    return m.name
wallmat=appearance('Proposal | Limestone render','wall')
roof_source=next(n for n in materials if n=='Proposal | Slate roof anthracite')
roofmat=appearance(roof_source,'roof')
dormer_source=next(n for n in materials if n=='Proposal | Slate roof anthracite - vertical hanging')
dormermat=appearance(dormer_source,'dormer')
nav['exteriorAppearance']['defaults']={'walls':'render-oak','roof':'dark'}

def external(ob,outward):
    if wallmat not in [m.name for m in ob.data.materials]:ob.data.materials.append(materials[wallmat])
    slot=next(i for i,m in enumerate(ob.data.materials)if m.name==wallmat)
    nm=ob.matrix_world.to_3x3().inverted().transposed()
    for f in ob.data.polygons:
        if (nm@f.normal).dot(Vector((*outward,0)))>.5:f.material_index=slot
    return ob

def outer_wall(label,a,b,z0,z1,normal,holes=(),th=.23):
    before=set(o.name for o in scene.objects)
    perforated_wall(nameprefix+label,a,b,z0,z1,holes,plaster,L,th)
    for ob in scene.objects:
        if ob.name not in before and ob.type=='MESH' and any(m and m.name==plaster for m in ob.data.materials):external(ob,normal)


def poly_slab(label,poly,z,depth=.20,material=None,walk=True):
    poly=[list(p)for p in poly];n=len(poly)
    ob=mesh(nameprefix+label,[(*p,z-depth)for p in poly]+[(*p,z)for p in poly],
        [tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)],material or stone,L)
    if walk:new_surfaces.append({'name':nameprefix+label,'polygon':poly,'z':z})
    return ob

def poly_room(label,poly,z,kind,look=None):
    floor=3 if z>5 else 1 if z>2 else 0
    new_rooms.append({'name':label,'floor':floor,'base_z':z,'polygon_m':[list(p)for p in poly],'proposal':True,'redesign':True,'kind':kind})
    p=look or [sum(p[0]for p in poly)/len(poly),sum(p[1]for p in poly)/len(poly)]
    view(label,p[0],p[1],z)

# Keep the already-proposed cellar extent. Its roof outside the smaller wing
# becomes paved forecourt, rather than leaving an open excavation in the model.
old=list(base_brief['frontWing']);old[3]=JOIN;deck=slab(nameprefix+'Cellar roof and forecourt deck',old,0,.22,stone,L)
bayfloors=[poly_slab(label,poly,0,.22)for label,poly in [('Garage bay floor',GP['garage_bay']),('Entrance bay floor',GP['entrance_bay'])]]
# Preserve exact existing basement stair proportions and move its flight north.
DY=GP['basement_stair_translation_m'][1]
stair_prefixes=('Proposal | Basement tread','Proposal | Basement riser','Proposal | Basement final riser','Proposal | Basement stair','Proposal | Basement wall guard','Proposal | Basement open guard','Proposal | Basement low headroom under flight')
translate_assembly(stair_prefixes,[0,DY,0],'Move existing full-size basement flight into the entrance gallery')
for r in nav['ramps']:
    if r['name']=='Proposal | Entertainment basement flight':
        r['polygon']=[[x,y+DY]for x,y in r['polygon']]
        for key in ('start','end'):r[key][1]+=DY
for opening in nav.get('groundOpenings',[]):
    if opening['name']=='Proposal | Entertainment basement stair opening':opening['polygon']=[[x,y+DY]for x,y in opening['polygon']]
void=[v+DY if i in (1,3)else v for i,v in enumerate(base_brief['entertainmentBasement']['stairVoid'])]
cut(deck,void,-.4,.1)
for floor in bayfloors:cut(floor,void,-.4,.1)
translate_assembly(['Proposal | Games sofa'],[0,.70,0],'Keep the relocated cellar stair clear of the games seating')
new_surfaces[:]=[s for s in new_surfaces if s['name']!=nameprefix+'Cellar roof and forecourt deck']
for a,b in zip(sorted([old[0],void[0],void[2],old[2]]),sorted([old[0],void[0],void[2],old[2]])[1:]):
    for c,d in zip(sorted([old[1],void[1],void[3],old[3]]),sorted([old[1],void[1],void[3],old[3]])[1:]):
        if void[0]<(a+b)/2<void[2] and void[1]<(c+d)/2<void[3]:continue
        new_surfaces.append({'name':nameprefix+'Ground deck','polygon':rect_polygon([a,c,b,d]),'z':0})
prefix_remove(['Proposal | Entertainment basement ceiling'],'Replace cellar soffit with the relocated stair opening')
ceiling=slab(nameprefix+'Cellar ceiling',[old[0]+.23,old[1]+.23,old[2]-.23,old[3]-.23],-.222,.025,plaster,L,False);cut(ceiling,void,-.4,.1)
update_room('Basement stair landing',polygon=[[x,y+DY]for x,y in next(r for r in nav['planRooms']if r['name']=='Basement stair landing')['polygon_m']])
view('Basement stair access',6.25,-7.3,0,(0,-1))

# The link and stair stay fixed. Its existing ceiling lip needs a slightly
# longer opening to clear the third tread by a full 2 m.
ceiling_source=scene.objects['Proposal | Entrance upper ceiling']
link_ceiling=edited_copy(ceiling_source,'Extend the existing loft-stair ceiling opening by 230 mm for headroom')
cut(link_ceiling,[9.32,-4.11,10.34,-3.80],5.1,5.6)

# Core floors and three new external elevations. The north connection is the
# retained checkpoint geometry; no wall is placed across that opening.
core=GP['core'];upper=poly_slab('First floor',core,2.8,.20,oak)
poly_slab('Ground ceiling',core,2.595,.05,plaster,False)
poly_slab('First-floor ceiling',core,5.35,.04,plaster,False)
west_a,west_b=core[0],core[3];wa=((Vector((*west_a,0))-Vector((*GP['anchor'],0))).dot(U))
west_length=math.dist(west_a,west_b)
west_holes=[(gu-wa,6.14,0,2.60,'open'),(eu-wa,3.70,0,2.60,'open')]
outer_wall('West lower facade',west_a,west_b,0,2.60,[-V.x,-V.y],west_holes)
outer_wall('West upper facade',west_a,west_b,2.8,5.35,[-V.x,-V.y],[(eu-wa,3.70,0,2.55,'open')])
outer_wall('South lower facade',core[0],core[1],0,2.60,[0,-1],[(math.dist(core[0],core[1])-.95,.9,1.1,2.25,'window')])
outer_wall('South upper facade',core[0],core[1],2.8,5.35,[0,-1],[(math.dist(core[0],core[1])/2,1.5,.85,2.3,'window')])
east_a,east_b=core[1],core[2]
outer_wall('East lower facade',east_a,east_b,0,2.60,[1,0],[(1.0,.8,1.1,2.2,'window'),(7.3,1.8,.65,2.3,'window'),(9.8,1.1,.65,2.3,'window')])
outer_wall('East upper facade',east_a,east_b,2.8,5.35,[1,0],[(4.1,1.8,.8,2.3,'window'),(8.2,1.25,1.3,2.3,'window')])

# Exterior finish continues over the floor edge; oak floor construction must
# not show as an unrelated strip between the ground and first-floor walls.
outer_wall('West storey band',west_a,west_b,2.595,2.805,[-V.x,-V.y],[(eu-wa,3.70,0,.21,'open')])
outer_wall('South storey band',core[0],core[1],2.595,2.805,[0,-1])
outer_wall('East storey band',east_a,east_b,2.595,2.805,[1,0])

# Gate-facing garage: a real rectangular door and two unscaled compact cars.
for side,uvalue,n in [('south',gu-3.3,[-U.x,-U.y]),('north',gu+3.3,[U.x,U.y])]:
    outer_wall('Garage bay '+side,pt(uvalue,0),pt(uvalue,md+.05),0,3.0,n)
outer_wall('Garage front',pt(gu-3.3,0),pt(gu+3.3,0),0,3.0,[-V.x,-V.y],[(3.3,5.2,0,2.35,'open')])
a,b=pt(gu-2.6,0),pt(gu+2.6,0);before=len(record)
wall(nameprefix+'Double garage sectional door',a,b,.015,2.35,oak,L,.07,False)
for z in (.47,.94,1.41,1.88):beam(nameprefix+'Garage door joint',(*a,z),(*b,z),.022,black,L)
proposed_doors.append({'id':nameprefix+'Double garage door','wall':nameprefix+'Garage front','motion':'retractable-garage','hinge':[*pt(gu,0),2.35],
 'members':[r['object_name']for r in record[before:]],'openingCenter':[*pt(gu,0),0], 'rotationAxis':[U.x,U.y,0],'apertureAxis':[U.x,U.y],
 'apertureWidth':5.2,'openTranslation':[V.x*2.18,V.y*2.18,-.15],'openDelta':math.pi/2,'openDistance':3.25,'closeDistance':4.4,'responseRate':3})
# Internal garage boundaries follow a 6.0 x 5.3 m clear rectangle.
for label,ua,va,ub,vb,door_at in [('Garage south',gu-3.12,.12,gu-3.12,5.65,3.7),('Garage rear',gu-3.12,5.65,gu+3.12,5.65,None),('Garage north',gu+3.12,5.65,gu+3.12,md,.85)]:
    partition(label,pt(ua,va),pt(ub,vb),0,door=(door_at,.90)if door_at is not None else None,thickness=.12)
poly_room('New double garage',GP['garage_clear'],0,'garage',pt(gu,3.0))
angle=math.atan2(V.y,V.x)
for i,bay in enumerate(('G1','G2')):
    car=next(c for c in nav['proposalSite']['cars']if c['bay']==bay)
    target=pt(gu+(-1.5 if i==0 else 1.5),2.88);oldcentre=car['centre_m'];oldangle=car['heading_radians']
    transform=Matrix.Translation(Vector((*target,0)))@Matrix.Rotation(angle-oldangle,4,'Z')@Matrix.Translation(Vector((-oldcentre[0],-oldcentre[1],0)))
    members=[]
    for nm in car['objects']:
        ob=scene.objects.get(nm)
        if ob is None:continue
        new=edited_copy(ob,'Repark unchanged car body in the gate-aligned double garage');new.matrix_world=transform@new.matrix_world;members.append(new.name)
    car.update({'centre_m':target,'heading_radians':angle,'objects':members,'route_validation':'Pending new gate-aligned tracking check'})
    bb=[bounds(scene.objects[n])for n in members]
    car['actual_mesh_bounds_m']=[min(b[k]for b in bb)for k in range(3)]+[max(b[k+3]for b in bb)for k in range(3)]
    nav['obstacles']=[o for o in nav['obstacles']if o.get('name')!='Proposal | Compact car '+bay]
    direction=Vector((V.x,V.y));side=Vector((U.x,U.y));centre=Vector(target)
    poly=[list(centre+direction*a+side*b)for a,b in [(-2.2,-.9),(2.2,-.9),(2.2,.9),(-2.2,.9)]]
    nav['obstacles'].append({'name':'Proposal | Compact car '+bay,'polygon':poly,'bottom':0,'top':1.5})

# Full-height entrance gable, with parallel solid oak doors and side panels.
for side,uvalue,n in [('south',eu-2.2,[-U.x,-U.y]),('north',eu+2.2,[U.x,U.y])]:
    outer_wall('Entrance bay '+side,pt(uvalue,0),pt(uvalue,md+.05),0,5.35,n,th=.35)
outer_wall('Entrance south pier',pt(eu-2.2,.275),pt(eu-1.7,.275),0,5.35,[-V.x,-V.y],th=.55)
outer_wall('Entrance north pier',pt(eu+1.7,.275),pt(eu+2.2,.275),0,5.35,[-V.x,-V.y],th=.55)
outer_wall('Entrance solid panels',pt(eu-1.7,.5),pt(eu+1.7,.5),0,2.9,[-V.x,-V.y],[(1.7,1.7,0,2.45,'open')])
solid_door(nameprefix+'Entrance left',pt(eu-.85,.5),pt(eu,.5),0,2.45,oak,L,-math.pi/2)
solid_door(nameprefix+'Entrance right',pt(eu+.85,.5),pt(eu,.5),0,2.45,oak,L,math.pi/2)
glazing(nameprefix+'Entrance gable glass',pt(eu-1.7,.5),pt(eu+1.7,.5),2.9,5.35,L,2)
guard(nameprefix+'Entrance upper gallery guard',pt(eu-1.82,md+.15),pt(eu+1.82,md+.15),2.8,L,1.05)
poly_room('New entrance gallery',[pt(eu-1.95,.7),pt(eu+1.95,.7),[4.95,JOIN],[10.18,JOIN],[10.18,-7.2],pt(gu+3.24,5.65),pt(gu+3.24,md+.115),pt(eu-1.95,md+.115)],0,'circulation',[7.0,-6.0])

# Gym in the broad north/east end; utility in the southern wedge. Equipment
# is borrowed at actual size rather than squeezed with the building envelope.
gympoly=[[13.75,-12.7],[13.75,JOIN],[10.3,JOIN],[10.3,-7.25],[11.2,-7.95]]
partition('Gym gallery wall',[10.24,-7.2],[10.24,JOIN],door=(1.0,.9))
poly_room('Gym',gympoly,0,'gym',[11.4,-5.2])
# Borrow the original equipment from the checkpoint (omitted above).
for family,target in {'treadmill':[12.65,-6.25],'rower':[12.75,-9.6],'weights bench':[11.65,-7.2],'dumbbell rack':[13.30,-5.15]}.items():
    obs=[ob for ob in base_scene.objects if ob.name.startswith('Proposal | Gym '+family)]
    if not obs:continue
    bb=[bounds(ob)for ob in obs];cx=(min(b[0]for b in bb)+max(b[3]for b in bb))/2;cy=(min(b[1]for b in bb)+max(b[4]for b in bb))/2
    for ob in obs:
        new=ob.copy();new.name=nameprefix+ob.name;new['source_name']=new.name;new['redesign_borrowed']=True
        new.location+=Vector((target[0]-cx,target[1]-cy,0));collection(F).objects.link(new)
    obstacle(nameprefix+'Gym '+family,[target[0]-(max(b[3]for b in bb)-min(b[0]for b in bb))/2,target[1]-(max(b[4]for b in bb)-min(b[1]for b in bb))/2,target[0]+(max(b[3]for b in bb)-min(b[0]for b in bb))/2,target[1]+(max(b[4]for b in bb)-min(b[1]for b in bb))/2],0,1.4)
poly_room('Utility',[[10.7,-16.076],[13.75,-16.076],[13.75,-13.6],[11.0,-14.85]],0,'utility',[12.5,-15.1])
counter('Laundry and utility',[11.65,-16.0,13.65,-15.4],sink=True)

# Principal suite: a full-size bed, study, a walk-through wardrobe and bathroom.
bedpoly=[[6.25,-6.96],[8.88,-6.96],[8.88,-9.92],[13.75,-9.92],[13.75,-16.076],[10.65,-16.076],[7.62,-10.0]]
poly_room('New principal suite',bedpoly,2.8,'bedroom',[12.8,-11.4])
bed(nameprefix+'Principal bed',11.0,-11.35,2.8,1.8,2.0,math.pi,sides=(True,True))
desk('Principal study desk',[11.45,-15.75,13.25,-15.1],2.8)
poly_room('Principal study area',[[10.8,-16.0],[13.75,-16.0],[13.75,-13.85],[10.3,-13.85]],2.8,'study',[12,-14.3])
partition('Suite north wall',[8.85,-6.9],[13.86,-6.9],2.8,door=(1.15,.9))
partition('Suite hall north door',[5.94,-6.9],[8.85,-6.9],2.8,door=(1.81,.9))
partition('Dressing west',[8.94,-9.92],[8.94,-6.9],2.8)
partition('Dressing south',[8.94,-9.92],[11.15,-9.92],2.8,door=(1.10,.9))
partition('Dressing east',[11.15,-9.92],[11.15,-6.9],2.8,door=(1.6,.85))
partition('Bathroom south',[11.15,-9.92],[13.86,-9.92],2.8)
wardrobe(nameprefix+'Dressing west storage',[9.00,-9.48,9.55,-7.20],2.8)
wardrobe(nameprefix+'Dressing east storage',[10.54,-9.55,11.09,-8.92],2.8)
poly_room('Walk-through wardrobe',rect_polygon([9.0,-9.86,11.09,-6.96]),2.8,'dressing',[10.0,-8.4])
# Fixtures in an 8 m2 bathroom; its west door is already formed above.
ensuite('Principal en suite',[11.15,-9.92,13.86,-6.9],2.8,'west',1.6,'New principal suite',sides=())
poly_room('Upper gallery and library',[[6.6,-6.84],[10.1,-6.84],[10.1,JOIN],[5.16,JOIN]],2.8,'circulation',[8.1,-5.4])

poly_room('Side-wing bedroom corridor',[[-2.47,5.1],[-2.47,3.76],[-1.29,3.76],[-1.29,3.46],[-.115,3.46],[-.115,5.1]],2.8,'circulation',[-.75,4.5])
for z in (0,2.8):poly_room('Retained wing connection '+('ground'if z==0 else'upper'),rect_polygon([5.73,JOIN,9.14,-4.0]),z,'circulation',[7,-4.35])

# The lower tapered roof leaves the original loft workspace intact. Move the
# former wing loft guest bedroom to the existing side-wing family lounge,
# preserving seven bedrooms and a private bathroom without another roof mass.
clear_furniture([-5.07,5.08,-.11,8.71],2.8,'Use existing side-wing lounge for the seventh bedroom')
partition('Side guest south wall',[-5.065,5.10],[-.115,5.10],2.8,door=(4.15,.85))
bed(nameprefix+'Side guest bed',-3.65,7.32,2.8,1.5,2.0,sides=(False,False))
ensuite('Side guest en suite',[-2.15,6.60,-.17,8.65],2.8,'south',.58,'Seventh bedroom')
wardrobe(nameprefix+'Side guest storage',[-5.0,5.4,-4.40,6.3],2.8)
update_room('Upstairs family lounge','Seventh bedroom',kind='bedroom',polygon=rect_polygon([-5.065,5.16,-.115,8.705]))

# Plane intersections make a buildable tapered hip roof. The north roof
# cross-section is exactly the existing 8.05 m ridge/5.35 m eaves profile.
slope=(8.05-5.35)/(9.455-4.73);skew=-U.x/U.y
planes=[(slope,slope*skew,5.35-slope*4.73-slope*skew*JOIN),(-slope,0,5.35+slope*14.18),(0,slope,5.35-slope*(-16.506))]
roofpoly=[[4.73-skew*(-16.506-JOIN),-16.506],[14.18,-16.506],[14.18,JOIN],[4.73,JOIN]]
def h(plane,p):return plane[0]*p[0]+plane[1]*p[1]+plane[2]
def halfplane(poly,a,b,c):
    result=[]
    for p,q in zip(poly,poly[1:]+poly[:1]):
        dp=a*p[0]+b*p[1]+c;dq=a*q[0]+b*q[1]+c
        if dp<=1e-8:result.append(p)
        if (dp<0)!=(dq<0):
            t=dp/(dp-dq);result.append([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])])
    return result

def roof_piece(label,poly,height):
    if len(poly)<3:return
    n=len(poly);vs=[(*p,height(p)-.18)for p in poly]+[(*p,height(p))for p in poly]
    return mesh(nameprefix+label,vs,[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)],[plaster,roofmat],L,[0,1]+[1]*n)
storage=core
for plane in planes:storage=halfplane(storage,-plane[0],-plane[1],5.74-plane[2])
poly_slab('Wing loft storage floor',storage,5.55,.20,oak,False)
# Close the shortened dormer at the retained roof, with tiled outer cheeks.
dormer_profile=[[10.35,7.52],[12.6,h(planes[1],[12.6,JOIN])-.10],[12.6,7.64],[10.35,7.64]]
n=len(dormer_profile)
verts=[(x,y,z)for y in (JOIN-.03,JOIN+.12)for x,z in dormer_profile]
mesh(nameprefix+'Retained dormer south tiled cheek',verts,[(0,1,2,3),(7,6,5,4)]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)],[plaster,dormermat],L,[1,0]+[1]*n)

# Split polygons at exact valleys; no roof surface continues through another.
def subtract_convex(poly,inside):
    remaining=poly;outside=[]
    for a,b,c in inside:
        part=halfplane(remaining,-a,-b,-c)
        if len(part)>2:outside.append(part)
        remaining=halfplane(remaining,a,b,c)
        if not remaining:break
    return outside

def local_limits(umin,umax,vmin,vmax):
    ac=Vector((*GP['anchor'],0));du=ac.dot(U);dv=ac.dot(V)
    return [(-U.x,-U.y,umin+du),(U.x,U.y,-umax-du),(-V.x,-V.y,vmin+dv),(V.x,V.y,-vmax-dv)]

def poly_limits(poly):
    # Counterclockwise convex footprint, inside to the left of each edge.
    return [(q[1]-p[1],p[0]-q[0],-(q[1]-p[1])*p[0]-(p[0]-q[0])*p[1])for p,q in zip(poly,poly[1:]+poly[:1])]

main_patches=[]
for i,plane in enumerate(planes):
    poly=roofpoly
    for j,other in enumerate(planes):
        if i!=j:poly=halfplane(poly,*[plane[k]-other[k]for k in range(3)])
    main_patches.append((plane,poly))
gables=[]
for label,centre,width,eave,ridge in [('Garage',gu,6.6,3.0,5.199),('Entrance',eu,4.4,5.35,6.62)]:
    for side,ua,ub,sign in [('south',centre-width/2,centre,1),('north',centre,centre+width/2,-1)]:
        k=(ridge-eave)/(width/2)*sign
        pc=Vector((*GP['anchor'],0)).dot(U)
        plane=(k*U.x,k*U.y,ridge-k*(pc+centre))
        end=md+.10 if label=='Garage' else md+(ridge-5.35)/slope+1
        poly=[pt(ua,-.08),pt(ub,-.08),pt(ub,end),pt(ua,end)]
        # pt(u,v) has clockwise winding, reverse for convex halfplanes.
        poly.reverse()
        poly=clip(poly,1,JOIN,False)
        gables.append((label+' gable roof '+side,plane,poly))
for i,(plane,poly)in enumerate(main_patches):
    pieces=[poly]
    for _,gp,gpoly in gables:
        region=poly_limits(gpoly)+[tuple(plane[k]-gp[k]for k in range(3))]
        pieces=[part for piece in pieces for part in subtract_convex(piece,region)]
    for j,piece in enumerate(pieces):roof_piece('Main roof plane '+str(i)+' part '+str(j),piece,lambda p,plane=plane:h(plane,p))
for label,plane,poly in gables:
    # Beyond the main roof perimeter, retain the complete projecting gable.
    pieces=subtract_convex(poly,poly_limits(roofpoly))
    for main_plane,main_poly in main_patches:
        piece=poly
        for limit in poly_limits(main_poly):piece=halfplane(piece,*limit)
        piece=halfplane(piece,*[main_plane[k]-plane[k]for k in range(3)])
        if len(piece)>2:pieces.append(piece)
    for j,piece in enumerate(pieces):roof_piece(label+' part '+str(j),piece,lambda p,plane=plane:h(plane,p))
# Real glazed aperture in the garage gable, white on its internal face.
tri=[[gu-3.3,3.0],[gu+3.3,3.0],[gu,5.199]]
for j,poly in enumerate(subtract_convex(tri,[(-1,0,gu-.62),(1,0,-gu-.62),(0,-1,3.12),(0,1,-4.10)])):
    n=len(poly);vs=[(*pt(u,v),z)for v in (-.025,.095)for u,z in poly]
    mesh(nameprefix+'Garage gable wall '+str(j),vs,[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)],[plaster,wallmat],L,[1,0]+[0]*n)
glazing(nameprefix+'Garage gable window',pt(gu-.62,.025),pt(gu+.62,.025),3.12,4.10,L,2)
face=[(*pt(eu-2.2,.04),5.35),(*pt(eu+2.2,.04),5.35),(*pt(eu,.04),6.62)]
mesh(nameprefix+'Entrance upper gable glass',face,[(0,1,2)],glass,L)
for a,b in zip(face,face[1:]+face[:1]):beam(nameprefix+'Entrance gable frame',a,b,.065,black,L)
# Close the low roof void. The original loft stair/bridge remain outside this
# partition; the taper is storage, not a falsely labelled habitable bedroom.
for x0,x1 in [(4.93,9.0),(9.9,13.98)]:
    poly=[[x0,5.55],[x1,5.55],[x1,min(h(pl,[x1,JOIN])for pl in planes)-.18],[x0,min(h(pl,[x0,JOIN])for pl in planes)-.18]]
    poly=clip(poly,1,5.55)
    if len(poly)>2:mesh(nameprefix+'Loft storage closure',[(x,JOIN-.04,z)for x,z in poly],[tuple(range(len(poly)))],plaster,L)
wall(nameprefix+'Loft storage access panel',[9.0,JOIN-.04],[9.9,JOIN-.04],5.55,7.55,plaster,L,.10)
segment(nameprefix+'Loft storage boundary',[4.93,JOIN-.04],[13.98,JOIN-.04],5.55,8.05,.1)
poly_room('Loft stair landing',[[7.6,JOIN],[10.3,JOIN],[10.3,-4.0],[7.6,-4.0]],5.55,'circulation',[8.5,-4.2])

# Light fittings and route landmarks for the new rooms.
for label,p,z in [('Entrance',pt(eu,md+.3),2.45),('Garage',pt(gu,3),2.4),('Gym',[12,-6],2.45),('Principal',[11,-11.3],5.1),('Dressing',[10,-8.4],5.1)]:
    lamp(nameprefix+label+' light',p[0],p[1],z)
add_fourth_parking_bay()
GP['fixed_link']={'position_and_angle_unchanged':True,'join_y':JOIN,'original_loft_stair_unchanged':True}
GP['basement']={'footprint_retained':True,'stair_translation_m':[0,DY,0],'outside_roof_use':'Paved forecourt over retained cellar'}
GP['bedroom_move']='Existing side-wing family lounge becomes an en-suite seventh bedroom; original loft workspace retained.'
GP['audit_reports']=['gate-alignment-audit.json','circulation-audit.json','private-access-audit.json','ensuite-access-audit.json','stairs-navigation-audit.json','stair-headroom-audit.json','parking-audit.json','garage-access-audit.json']
GP['fixed_link']['ceiling_adjustment']='Existing loft-stair ceiling aperture extended locally for headroom; link position, angle and stair geometry unchanged.'
spec['ensuites']=5
nav['gateAlignment']=GP
spec['main_changes'].append(GP['bedroom_move'])
(OUT/'gate-alignment.json').write_text(json.dumps(GP,indent=2)+'\n')
