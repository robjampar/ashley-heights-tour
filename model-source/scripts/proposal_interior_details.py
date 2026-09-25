"""Buildable-looking room fittings inside the checked proposal envelopes.

Finishes reuse actual wall faces, so the audited clear widths/headroom stay
unchanged. Furniture remains independently editable, with physical supports.
"""

# Dormer cladding is external. Finish the room-facing sides of those same
# meshes in plaster rather than adding a second shell over the clear room.
def face_finish(name, predicate, finish):
    ob=bpy.data.objects.get(name)
    assert ob is not None, name
    ob.data.materials.append(materials[finish]);index=len(ob.data.materials)-1
    count=0
    for poly in ob.data.polygons:
        if predicate(poly):poly.material_index=index;count+=1
    assert count, 'No interior faces found: '+name

def face_finish_prefix(prefix, predicate, finish):
    """Finish every piece of a perforated dormer face (piers, sills, heads)."""
    names=[ob.name for ob in bpy.data.objects if ob.name.startswith(prefix) and ob.type=='MESH' and 'window' not in ob.name]
    assert names, prefix
    for name in names:face_finish(name, predicate, finish)

face_finish_prefix('Proposal | Original loft dormer west cheek',lambda p:p.normal.x>.8,plaster)   # whole wall, or its door piers and head
face_finish_prefix('Proposal | Original loft dormer east cheek',lambda p:p.normal.x<-.8,plaster)

if bpy.data.objects.get('Proposal | Original loft dormer sill'):
    face_finish('Proposal | Original loft dormer sill',lambda p:p.normal.y<-.8 or p.normal.z>.8,plaster)
    face_finish('Proposal | Rear dormer window head',lambda p:p.normal.y<-.8 or p.normal.z<-.8,plaster)
else:
    # Proposal B: standard windows in a clad face; its room side and reveals are plastered.
    face_finish_prefix('Proposal | Rear dormer face',lambda p:p.normal.y<-.8 or abs(p.normal.z)>.8,plaster)
# The wing's east dormer faces the studio the same way.
face_finish('Proposal | Wing dormer south cheek',lambda p:p.normal.y>.8,plaster)
face_finish('Proposal | Wing dormer north cheek',lambda p:p.normal.y<-.8,plaster)
face_finish('Proposal | Wing dormer south cheek head',lambda p:p.normal.y>.8,plaster)
if bpy.data.objects.get('Proposal | Wing dormer north cheek head'):face_finish('Proposal | Wing dormer north cheek head',lambda p:p.normal.y<-.8,plaster)
if bpy.data.objects.get('Proposal | Wing dormer link north cheek'):face_finish('Proposal | Wing dormer link north cheek',lambda p:p.normal.y<-.8,plaster)
if bpy.data.objects.get('Proposal | Wing dormer sill'):
    face_finish('Proposal | Wing dormer sill',lambda p:p.normal.x<-.8 or p.normal.z>.8,plaster)
    face_finish('Proposal | Wing dormer window head',lambda p:p.normal.x<-.8 or p.normal.z<-.8,plaster)
else:
    face_finish_prefix('Proposal | Wing dormer face',lambda p:p.normal.x<-.8 or abs(p.normal.z)>.8,plaster)
# The upper-envelope roof module already supplies separate plaster roof lining.

def rounded(ob,width=.018,segments=3):
    if any(m.type=='BEVEL' for m in ob.modifiers):return ob
    mod=ob.modifiers.new('Rounded joinery edge','BEVEL');mod.width=width;mod.segments=segments
    return ob

def desk_details(name,x,y,z,w,d,chair_x,chair_y,angle=0):
    # Desktop location/dimensions already exist in the room programme.
    for dx in(-w/2+.075,w/2-.075):
        for dy in(-d/2+.075,d/2-.075):
            rounded(box(name+' support',(x+dx,y+dy,z+.355),(.042,.042,.71),black,F),.004)
    # Local chair faces +Y; rotate the components around its own centre.
    def point(dx,dy,h):return(chair_x+dx*math.cos(angle)-dy*math.sin(angle),chair_y+dx*math.sin(angle)+dy*math.cos(angle),z+h)
    rounded(box(name+' chair seat',point(0,0,.46),(.46,.45,.095),fabric,F,angle),.025)
    rounded(box(name+' chair back',point(0,-.20,.74),(.46,.085,.48),oak,F,angle),.025)
    for dx in(-.17,.17):
        for dy in(-.16,.16):beam(name+' chair leg',point(dx*1.1,dy*1.1,.025),point(dx,dy,.43),.036,black,F)
    obstacle(name+' chair',[chair_x-.255,chair_y-.255,chair_x+.255,chair_y+.255],z,z+1.0)
    # A thin writing pad and closed notebook give the working surface scale.
    rounded(box(name+' writing pad',(x,y,z+.793),(min(w-.12,.55),min(d-.12,.4),.009),fabric,F),.01)

desk_details('Proposal | Study desk',6.45,-4.68,0,1.8,.7,6.45,-5.38)
if WL['library_desk']:desk_details('Proposal | Landing library desk',6.15,-5.6,2.8,.65,1.8,6.88,-5.6,math.pi/2)
if not globals().get('_lsu_open'):desk_details('Proposal | Loft studio desk',loft_desk[0],loft_desk[1],5.55,*((1.6,.62) if loft_desk[5] else (.62,1.6)),loft_desk[2],loft_desk[3],loft_desk[4])
# Loft furniture details follow the pieces placed in proposal_loft.py, which
# now sit inside the dormer held between the hip starts.
desk_details('Proposal | Loft creative workbench',.55,7.52,loft_floor,2.90,.66,.55,6.60)
if WL.get('study'):
 _sdy=float(WL['study']['desk_y']);_sdx=x1u-.115-.33
 desk_details('Proposal | Principal study desk',_sdx,_sdy,ff,.62,1.6,_sdx-.65,_sdy,-math.pi/2)
_qdx=float(spec['rearDormer'][2])-.48   # the quiet desk stands against the rear dormer's east cheek
desk_details('Proposal | Loft quiet desk',_qdx,6.60,loft_floor,.60,1.85,_qdx-.65,6.60,-math.pi/2)
# Real low-eaves cabinet fronts and reachable pulls for the archive run
# under the front slope; the tall supplies cupboard stands against the west
# cheek with its doors facing into the room.
for i in range(9):
 xa=-.10+5.50*i/9+.012;xb=-.10+5.50*(i+1)/9-.012;yy=3.822
 wall('Proposal | Loft eaves archive storage door',[xa,yy],[xb,yy],loft_floor+.04,loft_floor+.78-.025,oak,F,.018,False)
 beam('Proposal | Loft eaves archive storage pull',(xb-.09,yy+.014,loft_floor+.54),(xb-.09,yy+.014,loft_floor+.66),.014,black,F)
for i in range(3):
 ya=5.26+1.58*i/3+.012;yb=5.26+1.58*(i+1)/3-.012;xx=-1.02+.009
 wall('Proposal | Loft studio supplies storage door',[xx,ya],[xx,yb],loft_floor+.04,loft_floor+1.50-.025,oak,F,.018,False)
 beam('Proposal | Loft studio supplies storage pull',(xx+.014,yb-.09,loft_floor+.89),(xx+.014,yb-.09,loft_floor+1.01),.014,black,F)
# A restrained collection of work supplies makes the west bench legible as
# shared creative space while its tabletop remains available for editing.
for i in range(4):
 box('Proposal | Loft creative sketchbook',(-.55+i*.025,7.58,loft_floor+.815+i*.018),(.42,.30,.018),fabric if i%2 else plaster,F)
box('Proposal | Loft quiet desk monitor',(_qdx+.19,6.60,loft_floor+1.09),(.045,.53,.34),black,F)
box('Proposal | Loft quiet desk monitor foot',(_qdx+.11,6.60,loft_floor+.817),(.23,.28,.027),black,F)

for ob in list(scene.objects):
    if ob.type!='MESH' or not ob.name.startswith('Proposal |'):continue
    n=ob.name.lower()
    if any(word in n for word in('mattress','pillow','headboard','rear loft bed head')):rounded(ob,.028)
    elif any(word in n for word in('desk','bedside')) and not any(word in n for word in('lamp','leg','support','pad')):rounded(ob,.010)

# Actual lever handles / pull handles on the new doors. These meshes belong
# to their leaves in the exported animation, including the hinge parent.
for door in proposed_doors:
    if door.get('motion'):continue
    names=door['members']
    solid=any(n.endswith(' leaf') for n in names)
    if solid:
        old=bpy.data.objects.get(door['id']+' handle')
        if old is not None:
            door['members'].remove(old.name);bpy.data.objects.remove(old,do_unlink=True)
    x,y,z=door['hinge'];ux,uy=door['apertureAxis'];vx,vy=-uy,ux
    reach=max(.10,door['apertureWidth']-.13)
    cx,cy=x+ux*reach,y+uy*reach
    before=len(record)
    for side in(-1,1):
        px,py=cx+vx*side*.058,cy+vy*side*.058
        if solid:
            beam(door['id']+' lever rose',(cx+vx*side*.026,cy+vy*side*.026,z+1.03),(px,py,z+1.03),.034,black,L)
            beam(door['id']+' lever',(px,py,z+1.03),(px-ux*.10,py-uy*.10,z+1.03),.018,black,L)
        else:
            beam(door['id']+' pull grip',(px,py,z+.91),(px,py,z+1.21),.021,black,L)
            for h in(.93,1.19):beam(door['id']+' pull fixing',(cx+vx*side*.018,cy+vy*side*.018,z+h),(px,py,z+h),.016,black,L)
    door['members'].extend(v['object_name'] for v in record[before:])

# The original reconstruction's fixtures remain untouched; only new rooms
# receive shaped ceramic fittings, taps, mirrors and shower equipment.
ceramic=mat('White ceramic',(.82,.83,.81,1),.19)
mirror=mat('Bathroom mirror',(.73,.76,.77,1),.025,1)
def basin_details(name,cx,cy,z,w,d,wall_x):
    ob=bpy.data.objects.get(name)
    assert ob is not None,name
    # Replace the simple rectangular basin with one counter/bowl mesh.
    verts=[];n=48
    for ring in range(4):
        for i in range(n):
            a=math.tau*i/n;co,si=math.cos(a),math.sin(a)
            if ring in(0,3):
                scale=min((w/2)/max(abs(co),1e-9),(d/2)/max(abs(si),1e-9));xx,yy=co*scale,si*scale
            else:xx,yy=co*w*(.34 if ring==1 else .26),si*d*(.36 if ring==1 else .28)
            h=(.90,.90,.775,.74)[ring];verts.append((cx+xx,cy+yy,z+h))
    faces=[]
    for ra,rb in((0,1),(1,2),(3,0)):
        for i in range(n):faces.append((ra*n+i,ra*n+(i+1)%n,rb*n+(i+1)%n,rb*n+i))
    faces.extend([tuple(range(2*n,3*n)),tuple(reversed(range(3*n,4*n)))])
    bpy.data.objects.remove(ob,do_unlink=True)
    made=mesh(name,verts,faces,ceramic,F)
    # The shaped bowl dips into the cabinet. Remove the concealed top of the
    # solid vanity so timber cannot pass through the ceramic bowl floor.
    vanity=bpy.data.objects.get(name.replace(' basin',' vanity'))
    assert vanity is not None,name
    cut(vanity,[cx-w*.35,cy-d*.37,cx+w*.35,cy+d*.37],z+.735,z+.91)
    cylinder(name+' waste',(cx,cy,z+.779),.018,.007,black,F,16)
    tx=cx+w*.35
    beam(name+' mixer',(tx,cy,z+.90),(tx,cy,z+1.08),.022,black,F)
    beam(name+' spout',(tx,cy,z+1.08),(cx+.02,cy,z+1.08),.024,black,F)
    rounded(box(name+' mirror frame',(wall_x-.019,cy,z+1.60),(.028,d+.08,1.00),black,F),.015)
    box(name+' mirror face',(wall_x-.035,cy,z+1.60),(.008,d+.02,.94),mirror,F)

if not WL.get('suite_east_x'):basin_details('Proposal | Principal bathroom basin',ex_(12.88),WL['basin_y'],2.8,.56,.80,ex_(13.25))
_GSR=WL.get('gallery_shower_room',True)   # proposal B: the room is part of the principal suite, no fittings
_PBW=WL.get('suite_east_x') is not None   # proposal B builds its own principal bathroom fittings
if _GSR:basin_details('Proposal | Guest bathroom basin',ex_(12.88),-4.70,2.8,.56,.80,ex_(13.25))
for prefix,cx,cy,z in ([] if _PBW else [('Principal bathroom',ex_(11.42),WL['bath_fittings'][1]-.5+.18,2.8)])+([('Guest bathroom',ex_(11.85),-4.68,2.8)] if _GSR else [])+([('Ground WC',12.02,-17.58+WL['wc_dy'],0)] if WL.get('ground_wc',True) else []):
 verts=[];n=40
 for rx,ry,h in[(.225,.29,.405),(.225,.29,.455),(.165,.225,.455),(.105,.15,.31)]:
  for i in range(n):
   a=i*math.tau/n;verts.append((cx+rx*math.cos(a),cy+ry*math.sin(a),z+h))
 faces=[]
 for ring in range(3):
  for i in range(n):faces.append((ring*n+i,ring*n+(i+1)%n,(ring+1)*n+(i+1)%n,(ring+1)*n+i))
 faces.append(tuple(range(3*n,4*n)))
 ob=mesh('Proposal | '+prefix+' ceramic WC bowl and seat',verts,faces,ceramic,F)
 for face in ob.data.polygons:face.use_smooth=len(face.vertices)==4
# Shower controls fit the existing trays and don't narrow the open entries.
for prefix,cx,cy,z,east in([] if _PBW else [
    ('Principal bathroom',ex_(11.57),WL['bath_fittings'][0]+.55,2.8,False),
])+([('Guest bathroom',ex_(12.68),-5.95,2.8,True)] if _GSR else []):
    wallx=ex_(13.20) if east else ex_(10.94)
    beam('Proposal | '+prefix+' shower riser',(wallx,cy,z+1.05),(wallx,cy,z+2.08),.025,black,F)
    beam('Proposal | '+prefix+' shower arm',(wallx,cy,z+2.08),(cx,cy,z+2.08),.025,black,F)
    cylinder('Proposal | '+prefix+' rainfall head',(cx,cy,z+2.06),.11,.028,black,F,24)
    box('Proposal | '+prefix+' shower control',(wallx,cy,z+1.08),(.055,.16,.10),black,F)

# Rear studio: actual ceiling fixtures and native emitters follow all three
# occupied zones across the dormer held between the hip starts. Sources sit
# below their lenses; fixture tags preserve world transforms through editable
# assembly grouping.
for index,(x,y)in enumerate((x,y)for x in(-.20,2.60,5.40,8.20)for y in(5.25,7.30)):
 tag='Rear dormer downlight %02d'%(index+1)
 parts=[cylinder('Proposal | '+tag+' trim',(x,y,loft_ceiling-.015),.068,.020,black,I,20),
        cylinder('Proposal | '+tag+' lens',(x,y,loft_ceiling-.029),.054,.010,warm,I,20)]
 ld=bpy.data.lights.new('Proposal | '+tag,'AREA');ld.energy=20;ld.color=(1,.88,.74);ld.shape='DISK';ld.size=.10
 ob=bpy.data.objects.new(ld.name,ld);collection(I).objects.link(ob);ob.location=(x,y,loft_ceiling-.049)
 ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False
 for part in [*parts,ob]:part['proposal_light_fixture']=tag
nav['proposalLights'].extend([
 {'name':'Loft creative studio','position':[-.10,6.15,7.26],'range':3.6,'intensity':.95},
 {'name':'Loft shared lounge','position':[4.30,6.10,7.26],'range':4.0,'intensity':.95},
 {'name':'Loft east work area','position':[8.40,6.40,7.26],'range':3.0,'intensity':.85},
])

# Use one consistent assembly name for the complete table, including its legs.
for ob in list(scene.objects):
    if ob.name.startswith('Proposal | Coffee table leg'):ob.name=ob.name.replace('Coffee table leg','Garden coffee table leg')
    if ob.name=='Proposal | Rear loft mattress':ob.name='Proposal | Rear loft bed mattress'

# Fitted storage has actual door divisions and pulls. The cabinets themselves
# retain the audited footprints and never project across door apertures.
def wardrobe_front(name,a,b,z,height):
    length=math.dist(a,b);ux,uy=(b[0]-a[0])/length,(b[1]-a[1])/length
    count=max(1,math.ceil(length/.65))
    for i in range(count):
        start=(i+.015)*length/count;end=(i+.985)*length/count
        aa=[a[0]+ux*start,a[1]+uy*start];bb=[a[0]+ux*end,a[1]+uy*end]
        wall(name+' cabinet door',aa,bb,z+.06,z+height-.04,oak,F,.014,False)
        t=(i+.80)*length/count;x,y=a[0]+ux*t,a[1]+uy*t
        beam(name+' cabinet pull',(x,y,z+1.01),(x,y,z+1.18),.016,black,F)

wardrobe_front('Proposal | Principal dressing east',[ex_(12.59),WL['wardrobe_east'][0]],[ex_(12.59),WL['wardrobe_east'][1]],2.8,2.3)
wardrobe_front('Proposal | Principal dressing north',[ex_(11.02),WL['wardrobe_north'][0]-.01],[ex_(12.97),WL['wardrobe_north'][0]-.01],2.8,2.3)
# Boot-room cabinets withdrawn with the enlarged gym (owner); no fronts here.
if WL['linen']:wardrobe_front('Proposal | Landing linen storage',[ex_(12.37),WL['laundry_south_y']+.733],[ex_(13.08),WL['laundry_south_y']+.733],2.8,2.3)

# Flush removable eaves access panels are storage hatches, not walk-through
# doors. No standing support is added behind the knee walls.
_hy=WL['loft_south_edge']+1.25
for side,x in ([('west',lb0+.064),('east',lb1-.064)] if WL['loft_plan']=='full' else []):
    box('Proposal | Loft '+side+' eaves hatch reveal',(x,_hy,6.03),(.012,.67,.81),black,L)
    box('Proposal | Loft '+side+' removable eaves panel',(x+(.009 if side=='west' else -.009),_hy,6.03),(.016,.65,.79),plaster,L)
    beam('Proposal | Loft '+side+' eaves recessed pull',(x+(.021 if side=='west' else -.021),_hy+.17,6.00),(x+(.021 if side=='west' else -.021),_hy+.17,6.10),.013,black,L)

# Modest actual ceiling fittings provide light in rooms whose windows face
# away from the sun; these are saved in the native model, not a render trick.
for label,points,ceiling,energy in[
 ('Principal bedroom',[(x,y) for y in WL['downlights']['bedroom_y'] for x in (6.6,min(9.1,ex_(10.79)-.5,(float(WL['bath_west_x'])-.9) if WL.get('bath_west_x') and y<WL['bath_partition_y'] else 99))],5.27,26),   # the east row stays clear of the wider bathroom (22 September)
 ('Principal bathroom',[(x,y) for x in ([ex_(12.35)]+([float(WL['bath_west_x'])+.9] if WL.get('bath_west_x') else [])) for y in WL['downlights']['bathroom_y']],5.27,24),   # a second row over the wider west half (22 September)
 ('Guest bathroom' if _GSR else 'Principal nook',[(ex_(12.4),-5.25)],5.27,24),
 ('Dressing',[(ex_(12.3),WL['downlights']['dressing_y'])],5.27,18),
 ('Study',[(6.4,WL['downlights']['study_y']),(8.2,WL['downlights']['study_y'])],2.53,18),
 ('Library',[(x,-5.5) for x in WL['downlights']['library_x']],5.27,18),
 ('Boot room',[(12.5,WL['downlights']['boot_y'])],2.53,18),
 ('Utility',[(12.6,WL['downlights']['utility_y'])],2.53,18),
 ('Ground WC' if WL.get('ground_wc',True) else 'Utility south',[(12.6,WL['downlights']['wc_y'])],2.53,14),
]:
 for x,y in points:
  cylinder('Proposal | '+label+' downlight trim',(x,y,ceiling-.006),.065,.016,black,I,20)
  cylinder('Proposal | '+label+' downlight lens',(x,y,ceiling-.016),.052,.010,warm,I,20)
  ld=bpy.data.lights.new('Proposal | '+label+' downlight','AREA');ld.energy=energy;ld.color=(1,.88,.74);ld.shape='DISK';ld.size=.15
  ob=bpy.data.objects.new(ld.name,ld);collection(I).objects.link(ob);ob.location=(x,y,ceiling-.025)
nav['proposalLights'].extend([
 {'name':'Principal bedroom','position':[7.8,WL['nav_lights']['bedroom_y'],4.85],'range':5.6,'intensity':.85},
 {'name':'Principal bathroom','position':[ex_(12.3),WL['nav_lights']['bathroom_y'],4.85],'range':3.0,'intensity':.85},
 {'name':'New study','position':[7.3,-5.4,2.15],'range':2.5,'intensity':.65},
 {'name':'Library landing','position':[8.0,-5.2,4.8],'range':3.2,'intensity':.60},
])

# Simple utility battens make the enclosed garage and workshop usable after
# dark. The narrow diffuser is the visible fitting; its native area light
# does not appear as a second, oversized luminous rectangle in glazing.
utility_diffuser=mat('Utility light diffuser',(.86,.92,.95,1),.28,0,2.2)
for label,x,y,length,power in[
 ('Garage north',8.25,WL['battens']['garage_north_y'],1.5,48),
 ('Garage south',8.25,WL['battens']['garage_south_y'],1.5,48),
 ('Workshop west',7.15,WL['battens']['workshop_y'],1.2,26),
 ('Workshop east',10.40,WL['battens']['workshop_y'],1.2,26),
]:
 box('Proposal | '+label+' ceiling batten housing',(x,y,2.48),(length+.06,.11,.055),white,I)
 box('Proposal | '+label+' ceiling batten diffuser',(x,y,2.447),(length,.072,.016),utility_diffuser,I)
 ld=bpy.data.lights.new('Proposal | '+label+' batten light','AREA');ld.energy=power;ld.color=(.91,.95,1);ld.shape='RECTANGLE';ld.size=length;ld.size_y=.075;ld.specular_factor=0;ld.transmission_factor=0
 ob=bpy.data.objects.new(ld.name,ld);collection(I).objects.link(ob);ob.location=(x,y,2.434);ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False

# A shallow workshop bench leaves the store's north aisle and doorway clear.
# The compact wing's garage has no room for it beside its two cars.
if WL.get('garage_bench',True):
 rounded(box('Proposal | Workshop bench top',(7.2,-19.82,.91),(2.75,.59,.08),oak,F),.012)
 for x in(5.95,8.45):
  for y in(-20.02,-19.62):box('Proposal | Workshop bench leg',(x,y,.445),(.075,.075,.89),black,F)
 box('Proposal | Workshop tool backboard',(7.2,-20.14,1.47),(2.75,.035,.86),oak,F)
 for x in(6.3,6.65,7.0,7.35,7.7,8.05):beam('Proposal | Workshop tool hook',(x,-20.10,1.55),(x,-20.0,1.55),.014,black,F)
 obstacle('Proposal | Workshop bench',[5.825,-20.115,8.575,-19.525],0,1.0)
