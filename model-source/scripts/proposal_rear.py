"""P2 rear addition, fixed-location pavilion expansion and pool in front of shed."""
r=spec['rearGardenRoom'];r=[r[0],8.92,r[2],r[3]]
slab('Proposal | Garden room floor',r,0,.20,stone,R)
# P8: a continuous roof substrate is retained below a level first-floor
# terrace. Its reserved 250mm roof/deck package is described by the terrace
# module, which also cuts the owner's three flush walk-on glass lanterns
# through it; there is no stairwell or open hole in the garden-room ceiling.
_garden_head=2.55
_garden_door_head=2.50
wall('Proposal | Garden west return',[-4.9,8.92],[-4.9,14.1],0,_garden_head,white,R,.23)
glazed_wall('Proposal | Garden north glazing',[-4.78,14.1],[4.5,14.1],0,_garden_door_head,R,door_at=4.98,door_width=1.8)   # starts at the west return's inner face (was buried 0.12 m in it)
glazed_wall('Proposal | Garden east glazing',[4.5,14.1],[4.5,8.92],0,_garden_door_head,R,door_at=3.55,door_width=1.55)
# A50mm space above a2.50m door cannot take the standard110mm combined
# glazing margins. Close it with a solid header, not an inverted tiny pane.
wall('Proposal | Garden north glazing fixed upper header',[-4.78,14.1],[4.5,14.1],_garden_door_head,_garden_head,black,R,.055)
wall('Proposal | Garden east glazing fixed upper header',[4.5,14.1],[4.5,8.92],_garden_door_head,_garden_head,black,R,.055)
slab('Proposal | Rear flat roof',[-5.02,8.935,4.68,14.32],2.775,.225,black,R,False)
slab('Proposal | Garden living plaster ceiling',[-4.785,8.935,4.475,14.075],2.55,.025,plaster,R,False)
for a,b in[([-5.02,14.32],[4.68,14.32]),([4.68,14.32],[4.68,8.935])]:wall('Proposal | Garden fascia',a,b,2.55,2.775,black,R,.10,False)
# The retained dining bay opens directly outside. Keep the new rear addition
# rectangular: no secondary glass vestibule between it and the dining bay.
room('Garden living and dining',r,view=[3.6,12.7,0,-1,-.3,0])
sofa('Proposal | Garden sofa',-2.7,12.25,2.6)
box('Proposal | Garden lounge rug',(-2.5,11.3,.012),(3.6,2.4,.016),fabric,F)
box('Proposal | Garden coffee table',(-2.7,11.14,.40),(1.30,.66,.075),oak,F)
for xx in(-3.20,-2.20):
 for yy in(10.92,11.36):box('Proposal | Coffee table leg',(xx,yy,.18),(.055,.055,.36),black,F)
obstacle('Proposal | Garden coffee table',[-3.35,10.81,-2.05,11.47],0,.45)
table('Proposal | Garden dining',1.70,12.25,2.0,.9)
# The wide side-living opening stays visually and physically clear.
for x in(-4.3,-1.7,1.2,3.9):lamp('Proposal | Garden edge light',x,14.24,.12)
# Outside terrace sits level with the preserved floor, with a clear lawn route to pool.
slab('Proposal | Rear living terrace',[-4.7,14.20,4.70,15.45],0,.12,stone,S)
slab('Proposal | Drawing terrace',[8.45,9.02,14.3,11.15],0,.12,stone,S)
# Original outbuilding row remains exactly at x14.32...16.25: summer house
# y19.59...23.52, tool store to 24.56 and outside WC to 26.28. Owner: the
# glazed pavilion runs the full length of that brickwork and projects 2.22 m
# in front of it, so the store and WC doors now open into it.
x0,y0,x1,y1=spec['pavilion'];slab('Proposal | Pavilion expanded floor',spec['pavilion'],0,.14,stone,P)
# Owner (19 September): no glass round the garden room. It is an open loggia
# in front of the outbuildings: the paved floor, the flat roof with its
# 900 mm overhang towards the pool, a plaster soffit under the whole roof,
# and rendered pillars carrying the roof's outer edge. The north return stays
# as the masonry end wall.
wall('Proposal | Pavilion north return',[x0,y1],[x1,y1],0,2.39,white,P,.18)
# Join two flat roofs;900mm overhang on the new pool-facing edge.
slab('Proposal | Pavilion extended flat roof',[x0-.90,y0-.18,x1,y1+.18],2.51,.12,black,P,False)
slab('Proposal | Pavilion plaster ceiling',[x0-.88,y0-.16,x1,y1+.16],2.393,.025,plaster,P,False)
_pvx=x0-.90+.24   # pillar centres 120 mm in from the roof's pool edge
_pvz0=.10          # they stand on the poolside deck
for _i,_py in enumerate((y0+.06,(y0+y1)/2,y1-.06)):
 box('Proposal | Pavilion pillar %d'%(_i+1),(_pvx,_py,(_pvz0+2.39)/2),(.24,.24,2.39-_pvz0),white,P)
 obstacle('Proposal | Pavilion pillar %d'%(_i+1),[_pvx-.12,_py-.12,_pvx+.12,_py+.12],0,2.39)
for o in original_objects:
 if o.type!='MESH':continue
 if any(c.name=='41 Outbuilding roof' for c in o.users_collection):
  n=revised_copy(o,'Join expanded pavilion roof to retained outbuilding roof at same height along its full length')
  cut(n,[10.50,y0-.18,14.319,y1+.18],2.2,2.8)
 # Existing3.57m-wide glazed front opens fully into the added pavilion. Retain lintel/jambs.
 if o.name.startswith(('Summer house glazed light','Summer house horizontal frame','Summer house vertical frame','Summer house lower panel')):
  remove_from_proposal(o,'Remove non-masonry shed glazing within existing opening to join pavilion expansion')
# Match navigation opening to preserved existing structural opening.
for w in nav['walls']:
 if 'Summer house front' in w['name']:w['openings']=[[1.965,3.57,0,2.22,'open']]
room('Expanded garden pavilion',[x0,y0,16.25,y1],0,2,'Proposal · Garden',[12.2,21.6,0,-1,0,0])
# The pavilion is the glazed strip plus the opened summer house; the tool
# store and WC keep their own rooms behind their doors.
new_rooms[-1]['polygon_m']=[[x0,y0],[16.25,y0],[16.25,23.52],[14.32,23.52],[14.32,y1],[x0,y1]]
sofa('Proposal | Pavilion sofa',14.7,22.95,2.3)
box('Proposal | Pavilion drinks counter',(15.79,20.7,.92),(.48,1.72,.08),stone,F)
box('Proposal | Pavilion drinks cabinet',(15.79,20.7,.46),(.48,1.72,.84),oak,F)
obstacle('Proposal | Pavilion counter',[15.53,19.84,16.05,21.56],0,1.0)
slab('Proposal | Pavilion poolside deck',[10.16,19.15,14.24,y1+.22],0,.10,stone,S)
# Pool8×3.5m, directly in front (west) of the existing shed/pavilion.
x0,y0,x1,y1=spec['pool'];slab('Proposal | Pool bottom',spec['pool'],-1.35,.20,pooltile,P,False)
for suffix,a,b in [('west',[x0,y0],[x0,y1]),('east',[x1,y0],[x1,y1]),('south',[x0,y0],[x1,y0]),('north',[x0,y1],[x1,y1])]:
 wall('Proposal | Pool shell '+suffix,a,b,-1.35,-.02,pooltile,P,.20,False)
# Four mitred coping pieces meet without overlapping top faces or leaving
# the outside160mm corner quadrants empty.
for suffix,poly in [
 ('west',[[x0-.16,y0-.16],[x0+.16,y0+.16],[x0+.16,y1-.16],[x0-.16,y1+.16]]),
 ('east',[[x1-.16,y0+.16],[x1+.16,y0-.16],[x1+.16,y1+.16],[x1-.16,y1-.16]]),
 ('south',[[x0-.16,y0-.16],[x1+.16,y0-.16],[x1-.16,y0+.16],[x0+.16,y0+.16]]),
 ('north',[[x0+.16,y1-.16],[x1-.16,y1-.16],[x1+.16,y1+.16],[x0-.16,y1+.16]])
]:prism('Proposal | Pool coping '+suffix,poly,-.03,.035,stone,P)
box('Proposal | Pool water',((x0+x1)/2,(y0+y1)/2,-.105),(x1-x0-.12,y1-y0-.12,.025),water,P)
obstacle('Proposal | Swimming pool exclusion',[x0-.16,y0-.16,x1+.16,y1+.16],-1.5,.15)
for i in range(4):slab('Proposal | Pool underwater step '+str(i),[x0+.2,y0+.2+i*.30,x1-.2,y0+.5+i*.30],-.25-i*.27,.14,pooltile,P,False)
# Owner: the west surround is 2.5 m deep so the loungers sit on it.
for rr in [[x0-2.5,y0-.9,x1+1.3,y0-.16],   # owner review (23 Sep): the south strip runs the full width of the surround, no corner notches
           [x0-.9,y1+.16,x1+.9,y1+.9],[x0-2.5,y0-.16,x0-.16,y1+.16],[x1+.16,y0-.16,x1+1.3,y1+.16]]:slab('Proposal | Pool terrace',rr,0,.10,stone,S)
# Ground surface copies receive the actual pool excavation; original stays unchanged.
for o in original_objects:
 if o.type=='MESH' and o.name=='Plot ground - title plan approximate':
  n=revised_copy(o,'Pool excavation in proposal only');cut_surface(n,[x0+.04,y0+.04,x1-.04,y1-.04],-2,2.0)
# Loungers sit on the deep western surround, turned to face the pool
# (owner): heads to the west, feet towards the water, clear of the shed
# access aisle on the east.
from mathutils import Matrix
for yy in (17.5,20.0,22.5):
 xx=5.25
 box('Proposal | Pool lounger timber frame',(xx,yy,.28),(1.9,.72,.09),oak,F)
 for dx in(-.72,.72):
  for dy in(-.27,.27):box('Proposal | Pool lounger foot',(xx+dx,yy+dy,.12),(.055,.055,.24),black,F)
 box('Proposal | Pool lounger cushion',(xx+.20,yy,.39),(1.43,.67,.13),fabric,F)
 ob=box('Proposal | Pool lounger raised back',(xx-.65,yy,.59),(.55,.67,.12),fabric,F);
 pivot=Vector((xx-.65,yy,.59));rotation=Matrix.Rotation(math.radians(25),3,'Y')
 for v in ob.data.vertices:v.co=pivot+rotation@(v.co-pivot)
 obstacle('Proposal | Pool lounger',[xx-.95,yy-.36,xx+.95,yy+.36],0,.90)
# A small planting strip edges the deep surround; geometry avoids the clear deck and doors.
for i in range(20):
 xx=3.72+.08*math.sin(i*3);yy=16.3+i*.39
 for j in range(3):beam('Proposal | Pool border ornamental grass',(xx,yy,.025),(xx+.16*math.cos(j*2.1),yy+.13*math.sin(j*2.1),.38+.08*math.sin(i)),.018,leaves,S)
for xx,yy in [(6.05,15.40),(10.65,15.4),(6.05,24.55),(10.65,24.55),(10.80,19.2),(10.80,23.9),(10.80,26.2)]:lamp('Proposal | Garden pool bollard',xx,yy,.30)
# Ground-level stepping route retains the garden's reconstructed level, not invented steps.
# Owner review (23 Sep): the old lawn stepping stones ran across the pool terrace and coping; removed.
room('Pool terrace',[5.3,15.1,11.25,24.9],0,2,'Proposal · Garden',[10.85,17.0,0,0,1,0])
new_views.append({'id':'proposal-rear-garden','label':'Rear garden overview','group':'Proposal · Garden','position':[3.8,23.0,0],'direction':[.12,-1,0]})
