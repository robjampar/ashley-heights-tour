"""R5 site from user title-plan/TPO outline and original tour photographs.
All site positions are estimates. No legal boundary determination is implied.
"""
import bpy,math,random,json
from pathlib import Path
from mathutils import Vector


# Digitised TPO screenshot points, clockwise. Its 10 m bar spans approximately
# 190 px in the 2309px original. Raster/map scaling and plan alignment are approximate.
PIXEL_OUTLINE=[(667,442),(1447,350),(1595,1277),(1280,1290),(1099,1031),(1021,517),(677,532)]
SITE_NE=(15.65,28.50)
GATE_FRACTION=.64
def site_outline():
 registration=Path(__file__).resolve().parents[1]/'output-walkthrough/site-registration.json'
 if registration.exists():return json.loads(registration.read_text())['outline_m']
 a,b=Vector(PIXEL_OUTLINE[0]),Vector(PIXEL_OUTLINE[1]);u=(b-a).normalized();v=Vector((u.y,-u.x))
 return [(SITE_NE[0]+(Vector(p)-b).dot(u)/19.0,SITE_NE[1]+(Vector(p)-b).dot(v)/19.0)for p in PIXEL_OUTLINE]

def refine_site(g):
 box,mesh,prism,cylinder,beam=[g[n]for n in ('box','mesh','prism','cylinder','beam')]
 layer='50 Site - approximate';mats=g['materials'];rnd=random.Random(2026)
 for ob in list(bpy.data.objects):
  if ob.type=='MESH' and ob.users_collection[0].name==layer:bpy.data.objects.remove(ob,do_unlink=True)
 def material(name,rgba,rough=.85):
  if name not in mats:
   m=bpy.data.materials.new(name);m.diffuse_color=rgba;m.use_nodes=True;bs=m.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=rgba;bs.inputs['Roughness'].default_value=rough;mats[name]=m
  g['PALETTE'][name]=rgba
 material('Tarmac',(.105,.112,.108,1));material('Planting soil',(.13,.105,.072,1));material('Fountain stone',(.46,.41,.31,1));material('Fountain water',(.15,.25,.21,.78),.18);material('Hedge dark green',(.09,.18,.06,1));material('White blossom',(.85,.84,.74,1));material('Paving',(.46,.43,.36,1))
 material('Weathered fence timber',(.29,.23,.16,1))
 outline=site_outline();plot=outline
 annotation_file=Path(__file__).resolve().parents[1]/'output-walkthrough/annotated-aerial-registration.json'
 annotation=json.loads(annotation_file.read_text())if annotation_file.exists()else None
 def clip(poly,rect):
  for axis,bound,sign in [(0,rect[0],1),(0,rect[2],-1),(1,rect[1],1),(1,rect[3],-1)]:
   new=[]
   for a,b in zip(poly,poly[1:]+poly[:1]):
    ina=(a[axis]-bound)*sign>=0;inb=(b[axis]-bound)*sign>=0
    if ina:new.append(a)
    if ina!=inb:
     t=(bound-a[axis])/(b[axis]-a[axis]);new.append(tuple(a[i]+t*(b[i]-a[i]) for i in range(2)))
   poly=new
  return poly
 def polygon_prism(name,shape,z1,z2,mat):
  if len(shape)>=3:prism(name,shape,z1,z2,mat,layer)
 polygon_prism('Plot ground - title plan approximate',plot,-.24,-.12,'Grass')
 polygon_prism('Circular driveway - tarmac',clip(plot,(-30,-30,30,.3)),-.13,-.015,'Tarmac')
 # Patio and narrow perimeter paths.
 polygon_prism('Rear terrace paving',clip(plot,(-5.45,8.9,14.4,11.9)),-.06,.0,'Paving')
 box('Garage side path',(-6.08,3.6,-.055),(1.24,15.0,.11),'Paving',layer)
 box('East house side path',(14.80,5.7,-.055),(1.20,13.0,.11),'Paving',layer)
 out_rooms=[r for r in g.get('g',g).get('rooms',[])if r['floor']==2]
 out_points=[p for r in out_rooms for p in r['polygon_m']]
 front_x=min(p[0]for p in out_points)if out_points else 14.28
 north_y=max(p[1]for p in out_points)if out_points else 26.28
 south_y=min(p[1]for p in out_points)if out_points else 19.59
 box('Outbuilding path - faces lawn',(front_x-1.255,(north_y+south_y)/2,-.055),(2.50,north_y-south_y+.86,.11),'Paving',layer)
 # Join the two paths edge-to-edge; overlapping top faces caused a black patch.
 path_start=-6.35;path_end=front_x-2.505
 box('Rear wall garden path',((path_start+path_end)/2,25.85,-.045),(path_end-path_start,1.04,.09),'Paving',layer)
 # Walls along the map outline. Front western diagonal contains the gated opening.
 segments=[]
 def wall(name,a,b,h=1.85,th=.23):
  d=Vector(b)-Vector(a);p=(Vector(a)+Vector(b))/2
  box(name,(*p,h/2),(d.length,th,h),'Red brown brick',layer,math.atan2(d.y,d.x))
  box(name+' coping',(*p,h+.035),(d.length+.04,th+.07,.07),'Stone',layer,math.atan2(d.y,d.x))
  segments.append({'name':name,'a':list(a),'b':list(b),'thickness':th,'bottom':0,'top':h,'construction':'brick'})
 def fence(name,a,b,h=1.8):
  d=Vector(b)-Vector(a);u=d.normalized();normal=Vector((-u.y,u.x));angle=math.atan2(d.y,d.x)
  n=max(1,math.ceil(d.length/2.4));span=d.length/n
  for i in range(n+1):
   p=Vector(a)+u*(span*i)
   box(name+' timber post',(*p,(h+.09)/2),(.10,.10,h+.09),'Weathered fence timber',layer,angle)
  boards=max(1,math.ceil(d.length/.145));pitch=d.length/boards
  for i in range(boards):
   p=Vector(a)+u*(pitch*(i+.5))
   box(name+' vertical board',(*p,h/2),(pitch-.003,.028,h),'Weathered fence timber',layer,angle)
  for z in(.3,h-.25):
   p=(Vector(a)+Vector(b))/2+normal*.032
   box(name+' rail',(*p,z),(d.length,.045,.075),'Weathered fence timber',layer,angle)
  segments.append({'name':name,'a':list(a),'b':list(b),'thickness':.10,'bottom':0,'top':h,'construction':'timber fence'})
 A,B,C,D,E,F,G=map(Vector,outline)
 # Owner confirms a planted eastern divide and timber fences around the
 # extension behind the neighbours. Retain the photographed main rear niche wall.
 rear_split=A.lerp(B,(F.x-A.x)/(B.x-A.x))
 fence('Rear strip north fence',A,rear_split)
 wall('Main rear garden niche wall',rear_split,B,1.65)
 segments.append({'name':'Eastern planted boundary','a':list(B),'b':list(C),'thickness':.60,'bottom':0,'top':2.8,'construction':'vegetation'})
 wall('Front south boundary wall',C,D,1.88)  # owner: 26 courses to coping top (1.95 m)
 wall('Western house boundary wall',E,F,1.65)
 fence('Rear strip neighbour fence',F,G)
 fence('Rear strip west fence',G,A)
 # Set a 4.6m gate opening into the angled western approach. Two brick piers with globes.
 # Tour entrance viewpoint is beside the southern end of this diagonal.
 # The earlier midpoint placement put a solid wing wall across that view.
 boundary_mid=D.lerp(E,GATE_FRACTION);u=(E-D).normalized();inward=Vector((u.y,-u.x));setback=1.8
 mid=boundary_mid+inward*setback;gate_a=mid-u*2.3;gate_b=mid+u*2.3
 opening_a=boundary_mid-u*2.3;opening_b=boundary_mid+u*2.3
 if annotation:
  gate_a,gate_b=map(Vector,annotation['gate_endpoints_m']);mid=(gate_a+gate_b)/2
  boundary_u=(E-D).normalized()
  opening_a=D+boundary_u*(gate_a-D).dot(boundary_u)
  opening_b=D+boundary_u*(gate_b-D).dot(boundary_u)
  setback=((gate_a-opening_a).length+(gate_b-opening_b).length)/2
  u=(gate_b-gate_a).normalized()
 # Owner confirms the curved iron returns flare towards the road. Keep the
 # annotated inner gateposts fixed and move only the road-side connections
 # along the registered frontage. Splay amount is an estimated650mm per side.
 road_axis=(E-D).normalized();splay=.65
 opening_a-=road_axis*splay;opening_b+=road_axis*splay
 wall('Drive entrance south wing',D,opening_a,1.88);wall('Drive entrance north wing',opening_b,E,1.88)  # 26 courses
 wall('Drive gate south return',opening_a,gate_a,1.85);wall('Drive gate north return',gate_b,opening_b,1.85)
 def lathe(name,cx,cy,profile,mat,n=48):
  # End profile radii are nonzero to avoid collapsed faces. Cap both ends.
  vs=[(cx+r*math.cos(i*math.tau/n),cy+r*math.sin(i*math.tau/n),z)for r,z in profile for i in range(n)]
  fs=[tuple(reversed(range(n))),tuple(range((len(profile)-1)*n,len(profile)*n))]
  for k in range(len(profile)-1):
   for i in range(n):j=(i+1)%n;fs.append((k*n+i,k*n+j,(k+1)*n+j,(k+1)*n+i))
  ob=mesh(name,vs,fs,mat,layer)
  for p in ob.data.polygons:p.use_smooth=len(p.vertices)==4
  return ob
 def sphere(name,c,scale,mat,n=12):
  # Low-poly clustered vegetation remains individually editable.
  prof=[(.005,-1)]+[(math.cos(a),math.sin(a))for a in[-math.pi/2+math.pi*j/9 for j in range(1,9)]]+[(.005,1)]
  ob=lathe(name,c[0],c[1],[(r,c[2]+h*scale[2])for r,h in prof],mat,n)
  for v in ob.data.vertices:v.co.x=c[0]+(v.co.x-c[0])*scale[0];v.co.y=c[1]+(v.co.y-c[1])*scale[1]
  return ob
 for i,p in enumerate((gate_a,gate_b)):
  box('Entrance gate brick pier '+str(i+1),(*p,1.18),(.62,.62,2.36),'Red brown brick',layer)
  box('Entrance gate pier cap '+str(i+1),(*p,2.41),(.75,.75,.12),'Stone',layer)
  lathe('Gate lantern stone base',*p,[(.17,2.46),(.12,2.56)],'Stone',24)
  sphere('Gate lantern globe',(*p,2.70),(.17,.17,.17),'White joinery',20)
 # Two wrought-iron gates shown open to allow walking in. Local x from each hinge.
 gate_clear=(gate_b-gate_a).length-.62
 for side,hinge,base_dir in [(0,gate_a+u*.31,u),(1,gate_b-u*.31,-u)]:
  ang=math.atan2(base_dir.y,base_dir.x)+(-1 if side==0 else 1)*math.radians(90)
  d=Vector((math.cos(ang),math.sin(ang)));width=gate_clear/2-.035
  def pt(t,z):return (*(hinge+d*t),z)
  for z in(.18,1.05,1.90):beam('Open gate horizontal rail',pt(0,z),pt(width,z),.042,'Metal',layer)
  for i in range(16):
   t=width*i/15;top=2.20+.18*math.sin(i/15*math.pi)
   beam('Open gate vertical bar',pt(t,.1),pt(t,top),.026,'Metal',layer)
   sphere('Gate finial',pt(t,top+.045),(.037,.037,.075),'Metal',8)
   # Scrolls above and below the centre rail.
   for z in(.50,1.25):
    prev=None
    for k in range(15):
     a=k/14*math.tau;rr=.07*(1-k/20);p=pt(t+rr*math.cos(a),z+rr*1.5*math.sin(a))
     if prev:beam('Gate iron scroll',prev,p,.015,'Metal',layer)
     prev=p
 # Garden wall with display niches, observed behind the cherry trees.
 # Niche surrounds are a recessed white face; rear retaining masonry stays intact.
 # The clear plan places the niche wall on the rear boundary itself.
 # Do not add a second parallel wall across the narrow rear garden strip.
 for i,x in enumerate([-5.1,-1.3,2.5,6.3,10.1]):
  box('Garden niche inset', (x,26.394,1.02),(.49,.018,.57),'Warm plaster',layer)
  # Arched upper edge and sill, matching the repeated light-coloured niches.
  for j in range(16):
   a=j/16*math.pi;b=(j+1)/16*math.pi
   beam('Garden niche arched surround',(x+.275*math.cos(a),26.37,1.30+.275*math.sin(a)),(x+.275*math.cos(b),26.37,1.30+.275*math.sin(b)),.07,'White joinery',layer)
  for dx in(-.275,.275):box('Garden niche side',(x+dx,26.37,1.02),(.07,.075,.57),'White joinery',layer)
  box('Garden niche sill',(x,26.33,.72),(.68,.20,.08),'Stone',layer)
  sphere('Garden niche light',(x,26.30,1.07),(.07,.06,.1),'White joinery',8)
 # Passage into the strip behind the neighbouring house.
 polygon_prism('Rear strip path',clip(plot,(-26.4,22.96,-6.4,23.84)),-.07,0,'Paving')
 # Central planting island with a three-tier carved-stone fountain.
 cx,cy=9.6,-10.4
 if annotation:cx,cy=annotation['fountain_center_m']
 cylinder('Fountain island soil',(cx,cy,.005),3.05,.04,'Planting soil',layer,72,scale=(1,.85))
 lathe('Fountain circular kerb',cx,cy,[(1.48,.025),(1.49,.18),(1.35,.22),(1.33,.09)],'Fountain stone',72)
 cylinder('Fountain basin water',(cx,cy,.108),1.33,.025,'Fountain water',layer,64)
 lathe('Fountain pedestal',cx,cy,[(.48,.14),(.48,.23),(.33,.29),(.22,.51),(.17,.76),(.29,.83)],'Fountain stone')
 lathe('Fountain lower bowl',cx,cy,[(.27,.78),(.55,.84),(.92,.97),(1.00,1.08),(.98,1.14),(.87,1.11),(.57,.96),(.27,.91)],'Fountain stone',64)
 lathe('Fountain middle stem',cx,cy,[(.19,.92),(.16,1.16),(.12,1.43),(.20,1.49)],'Fountain stone')
 lathe('Fountain middle bowl',cx,cy,[(.16,1.43),(.42,1.48),(.64,1.62),(.66,1.70),(.56,1.70),(.32,1.56),(.15,1.53)],'Fountain stone',64)
 lathe('Fountain upper stem',cx,cy,[(.12,1.52),(.10,1.82),(.15,1.87)],'Fountain stone')
 lathe('Fountain upper bowl',cx,cy,[(.10,1.83),(.34,1.88),(.39,1.99),(.33,2.02),(.16,1.93),(.09,1.92)],'Fountain stone')
 lathe('Fountain finial',cx,cy,[(.07,1.96),(.11,2.08),(.035,2.24)],'Fountain stone',32)
 for i in range(34):
  a=i*math.tau/34;r=2.45+rnd.uniform(-.25,.23)
  sphere('Fountain island planting',(cx+r*math.cos(a),cy+r*.85*math.sin(a),.23),(.43,.38,.27),'Foliage')
 # Dense boundary shrubs and approximate mature trees. TPO symbols are reference
 # locations only; they do not establish a surveyed trunk position or ownership.
 for start,end in [(B,C),(C,D),(E,F),(A,B),(F,G)]:
  n=max(2,round((end-start).length/1.65))
  for i in range(n):
   p=start.lerp(end,(i+.5)/n);p.x+=.5 if start==B else -.4
   zc=1.8+rnd.uniform(-.2,.35)
   if start==B:sphere('Boundary hedge',(p.x,p.y,zc*1.75),(.85,.90,zc*1.75),'Hedge dark green')   # owner (22 Sep 2026): the east boundary hedge is about twice as tall, no wider, down to the ground
   else:sphere('Boundary hedge',(p.x,p.y,zc),(.85,.90,1.10),'Hedge dark green')
 # Positions and sizes reconciled against a registered Google 3D top view
 # (proposal/neighbours/site-trees.json); crown extent is about 1.13 r.
 _st=Path(__file__).resolve().parents[1]/'proposal/neighbours/site-trees.json'
 import sys;sys.path.insert(0,str(Path(__file__).resolve().parent));from site_tree_forms import build_site_tree
 for t in (json.loads(_st.read_text()) if _st.exists() else []):
  for ob in build_site_tree(t,mesh,layer):ob['site_tree_id']=t['id']
 # Owner (23 Sep 2026): the three ornamental garden cherries are not on the site.
 for x,y,h in []:
  beam('Garden cherry trunk',(x,y,0),(x+.1,y,h*.75),.08,'Dark walnut',layer)
  for j in range(9):
   a=j*math.tau/9;xx=x+.95*math.cos(a);yy=y+.95*math.sin(a);zz=h*(.65+.12*(j%3))
   beam('Garden cherry branch',(x,y,h*.35),(xx,yy,zz),.03,'Dark walnut',layer)
   sphere('Garden cherry canopy',(xx,yy,zz),(.55,.50,.33),'Foliage')
   for k in range(4):sphere('Cherry blossom cluster',(xx+rnd.uniform(-.5,.5),yy+rnd.uniform(-.5,.5),zz+rnd.uniform(-.2,.2)),(.13,.12,.1),'White blossom',8)
 return {'outline_m':outline,'area_m2':abs(sum(a[0]*b[1]-b[0]*a[1]for a,b in zip(plot,plot[1:]+plot[:1])))/2,'map_scale_px_per_m':24.474731148,'site_alignment':'Uniform registration of the unobscured user site plan to four main-house corners; see site-registration.json. Supersedes the TPO outline/alignment.',
 'user_area_reference_acres':.3,'area_reference_note':'User confirms the whole site is about 0.3 acres. Model is about 0.308 acres; retain plan shape rather than force a fit to a rounded area.',
 'source_files':['site-plan-clear.png','aerial-clear.png','aerial-boundary-annotated.png','2026-04-30_title_plan_K568939_GOV.UK.pdf','tpo.png'],
 'fountain_center_m':[cx,cy],'gate_center_m':list(mid),'gate_endpoints_m':[list(gate_a),list(gate_b)],'gate_clear_width_m':gate_clear,'gate_pier_centres_span_m':(gate_b-gate_a).length,'gate_setback_m':setback,'gate_road_endpoints_m':[list(opening_a),list(opening_b)],'gate_road_clear_width_m':(opening_b-opening_a).length-.47,'gate_return_splay_per_side_m':splay,'gate_return_basis':'Owner confirms entrance widens towards road; outer connections splayed650mm each along frontage, amount estimated. Inner annotated gatepost positions retained.','gate_position_basis':'Blue gate span and red fountain centre in user annotated aerial, registered to clear site-plan boundary. See annotated-aerial-registration.json.'if annotation else 'Inferred from entrance panorama and aerial.','boundary_segments':segments,
 'boundary_material_basis':'Owner confirmed right/east divide is greenery/trees without brick wall; fences around rear extension behind neighbours are timber. Main rear niche wall retained from photos. Fence height/panel design estimated.',
 'limitations':'Title plan shows general boundaries; map scale, house alignment, wall heights, planting, fountain sizes and gate positions are inferred. TPO symbols are not a surveyed tree inventory.'}
