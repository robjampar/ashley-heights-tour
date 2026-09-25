"""P2 native-model helpers, executed in the proposal builder namespace."""

def solid_door(name,a,b,z0=0,height=2.30,material=oak,layer=L,angle=math.pi/2):
 before=len(record);length=math.dist(a,b);u=[(b[k]-a[k])/length for k in (0,1)]
 wall(name+' leaf',a,b,z0+.025,z0+height,material,layer,.048,False)
 for z in (z0+.2,z0+height-.15):beam(name+' face rail',(*a,z),(*b,z),.025,material,layer)
 p=[a[k]+(b[k]-a[k])*.86 for k in (0,1)]
 cylinder(name+' handle',(*p,z0+1.03),.035,.045,black,layer,12)
 proposed_doors.append({'id':name,'wall':name,'hinge':[*a,z0],'members':[v['object_name'] for v in record[before:]],'openingCenter':[(a[0]+b[0])/2,(a[1]+b[1])/2,z0],'apertureAxis':u,'apertureWidth':length,'openDelta':angle,'openDistance':1.5,'closeDistance':2.0})

def perforated_wall(name,a,b,z0,z1,holes,material=white,layer=L,th=.20):
 """Real wall apertures. holes=[alongCenter,width,sill,head,type] relative to z0."""
 length=math.dist(a,b);u=[(b[k]-a[k])/length for k in (0,1)];p=lambda t:[a[k]+u[k]*t for k in (0,1)]
 prev=0
 for i,(center,width,sill,head,kind) in enumerate(sorted(holes)):
  left,right=center-width/2,center+width/2
  if left>prev+.001:wall(name+' pier '+str(i),p(prev),p(left),z0,z1,material,layer,th)
  if sill>0:wall(name+' sill '+str(i),p(left),p(right),z0,z0+sill,material,layer,th)
  if z0+head<z1:wall(name+' head '+str(i),p(left),p(right),z0+head,z1,material,layer,th)
  if kind=='window':
   glazing(name+' window '+str(i),p(left),p(right),z0+sill,z0+head,layer,max(1,round(width/.8)))
   beam(name+' window cill '+str(i),(*p(left-.07),z0+sill-.025),(*p(right+.07),z0+sill-.025),.085,stone,layer)
  elif kind=='door':solid_door(name+' door '+str(i),p(left),p(right),z0,head,oak,layer)
  elif kind=='glassdoor':glazing(name+' glazed door '+str(i),p(left),p(right),z0,z0+head,layer,1,True)
  prev=right
 if prev<length-.001:wall(name+' end pier',p(prev),b,z0,z1,material,layer,th)


def hip_roof(name,r,eave,ridge,layer=L,material='Slate roof',th=.20):
 x0,y0,x1,y1=r;cx=(x0+x1)/2;cy=(y0+y1)/2
 if y1-y0>=x1-x0:
  inset=(x1-x0)/2;v=[(x0,y0,eave),(x1,y0,eave),(x1,y1,eave),(x0,y1,eave),(cx,y0+inset,ridge),(cx,y1-inset,ridge)];faces=[(0,1,4),(1,2,5,4),(2,3,5),(3,0,4,5)]
 else:
  inset=(y1-y0)/2;v=[(x0,y0,eave),(x1,y0,eave),(x1,y1,eave),(x0,y1,eave),(x0+inset,cy,ridge),(x1-inset,cy,ridge)];faces=[(0,1,5,4),(1,2,5),(2,3,4,5),(3,0,4)]
 obs=[]
 for i,face in enumerate(faces):
  vv=[v[k] for k in face];n=len(vv);vv +=[(x,y,z-th) for x,y,z in vv]
  ff=[tuple(range(n)),tuple(reversed(range(n,2*n)))]+[(k,(k+1)%n,(k+1)%n+n,k+n) for k in range(n)]
  obs.append(mesh(name+' plane '+str(i),vv,ff,material,layer))
 return obs

def oak_guard(name,a,b,z,layer=L,height=1.05):
 """Owner (21 September): internal balustrades are oak, not glass. Newel posts
 at 1.8 m or closer, a 65 mm handrail, a base rail and 32 mm spindles at
 130 mm centres, so no gap exceeds 100 mm."""
 length=math.dist(a,b)
 if length<.05:return
 ux,uy=(b[0]-a[0])/length,(b[1]-a[1])/length;angle=math.atan2(uy,ux)
 bays=max(1,math.ceil(length/1.80))
 for i in range(bays+1):
  t=i*length/bays;x,y=a[0]+ux*t,a[1]+uy*t
  box(name+' newel',(x,y,z+(height+.08)/2),(.09,.09,height+.08),oak,layer,angle)
 beam(name+' handrail',(*a,z+height-.03),(*b,z+height-.03),.065,oak,layer)
 beam(name+' base rail',(*a,z+.09),(*b,z+.09),.05,oak,layer)
 count=max(1,round(length/.13))
 for i in range(1,count):
  t=i*length/count;x,y=a[0]+ux*t,a[1]+uy*t
  box(name+' spindle',(x,y,z+height/2),(.032,.032,height-.12),oak,layer,angle)
 # Navigation follows the spindle line, as the flight guards already do; the
 # 90 mm newels are visual (a shoulder brushing a corner post is not a wall).
 segment(name,a,b,z,z+height,.035)

def raked_oak_guard(name,a,b,z_a,z_b,layer=L,height=1.0):
 """Oak spindles and newels along a flight: a and b are the plan ends, z_a
 and z_b the tread-line heights at each end."""
 length=math.dist(a,b)
 if length<.05:return
 ux,uy=(b[0]-a[0])/length,(b[1]-a[1])/length;angle=math.atan2(uy,ux)
 for t in (0.0,1.0):
  x,y=a[0]+ux*length*t,a[1]+uy*length*t;h=z_a+(z_b-z_a)*t
  box(name+' newel',(x,y,h+(height+.08)/2),(.09,.09,height+.08),oak,layer,angle)
 count=max(1,round(length/.13))
 for i in range(1,count):
  t=i/count;x,y=a[0]+ux*length*t,a[1]+uy*length*t;h=z_a+(z_b-z_a)*t
  box(name+' spindle',(x,y,h+height/2-.02),(.032,.032,height-.10),oak,layer,angle)

OAK_GUARDS=spec.get('internalGuards',{}).get('material')=='oak'

def guard(name,a,b,z,layer=L,height=1.05):
 if OAK_GUARDS:oak_guard(name,a,b,z,layer,height);return
 glazing(name+' glass',a,b,z,z+height,layer,max(1,math.ceil(math.dist(a,b)/1.2)))
 beam(name+' rail',(*a,z+height),(*b,z+height),.055,oak,layer)

def raked_guard(name,a,b,z_a,z_b,layer=L,height=1.0,glass_inset=.06):
 """Flight guard: oak spindles when the spec says oak, otherwise the glass
 panel with dark posts used before."""
 if OAK_GUARDS:raked_oak_guard(name,a,b,z_a,z_b,layer,height);return
 mesh(name+' glass',[(*a,z_a+glass_inset),(*b,z_b+glass_inset),(*b,z_b+height-.02),(*a,z_a+height-.02)],[(0,1,2,3)],glass,layer)
 for i in range(8):
  t=i/7;x=a[0]+(b[0]-a[0])*t;y=a[1]+(b[1]-a[1])*t;h=z_a+(z_b-z_a)*t
  beam(name+' post',(x,y,h),(x,y,h+height),.032,black,layer)

def bed(name,x,y,z=0,width=1.8,length=2.0,angle=0,sides=(True,True)):
 def point(dx,dy,h):return(x+dx*math.cos(angle)-dy*math.sin(angle),y+dx*math.sin(angle)+dy*math.cos(angle),z+h)
 def bounds(rect):
  corners=[point(a,b,0)for a in(rect[0],rect[2])for b in(rect[1],rect[3])]
  return[min(p[0]for p in corners),min(p[1]for p in corners),max(p[0]for p in corners),max(p[1]for p in corners)]
 box(name+' base',point(0,0,.23),(width,length,.35),oak,F,angle)
 for dx in(-width/2+.12,width/2-.12):
  for dy in(-length/2+.12,length/2-.12):box(name+' recessed foot',point(dx,dy,.04),(.065,.065,.08),black,F,angle)
 box(name+' mattress',point(0,0,.47),(width-.05,length-.04,.25),fabric,F,angle)
 box(name+' headboard',point(0,length/2,.74),(width+.12,.12,1.22),fabric,F,angle)
 for dx in(-width*.25,width*.25):box(name+' pillow',point(dx,length*.32,.64),(width*.43,.48,.13),plaster,F,angle)
 obstacle(name,bounds([-width/2-.06,-length/2,width/2+.06,length/2+.07]),z,z+1.3)
 for dx,keep in zip((-width/2-.38,width/2+.38),sides):
  if not keep:continue
  box(name+' bedside',point(dx,length*.28,.34),(.48,.46,.6),oak,F,angle)
  box(name+' bedside plinth',point(dx,length*.28,.03),(.42,.40,.06),black,F,angle)
  lamp(name+' bedside lamp',*point(dx,length*.28,.68))
  obstacle(name+' bedside',bounds([dx-.24,length*.28-.23,dx+.24,length*.28+.23]),z,z+.64)

def wardrobe(name,r,z=0,height=2.3):
 x0,y0,x1,y1=r;box(name,((x0+x1)/2,(y0+y1)/2,z+height/2),(x1-x0,y1-y0,height),oak,F)
 obstacle(name,r,z,z+height)

def bath_fittings(name,r,z=0,shower_east=False,basin_center_y=None,toilet_offset_y=0):
 x0,y0,x1,y1=r
 sx=x1-.55 if shower_east else x0+.55
 box(name+' shower tray',(sx,y0+.55,z+.045),(1.0,1.0,.09),stone,F)
 screenx=x1-1.08 if shower_east else x0+1.08
 if shower_east:glazing(name+' shower north screen',[x1-1.08,y0+1.05],[x1-.03,y0+1.05],z,z+2.0,F,1)
 else:glazing(name+' shower north screen',[x0+.03,y0+1.05],[x0+1.08,y0+1.05],z,z+2.0,F,1)
 by=y1-.52 if basin_center_y is None else basin_center_y
 box(name+' basin',(x1-.35,by,z+.82),(.56,.80,.16),plaster,F)
 box(name+' vanity',(x1-.35,by,z+.43),(.56,.80,.7),oak,F)
 cylinder(name+' toilet pedestal',(x0+.4,y1-.5+toilet_offset_y,z+.20),.23,.40,plaster,F,24)
 box(name+' toilet cistern',(x0+.4,y1-.22+toilet_offset_y,z+.60),(.42,.18,.48),plaster,F)
 obstacle(name+' sanitary fittings',[x0+.13,y1-.82+toilet_offset_y,x0+.67,y1-.08+toilet_offset_y],z,z+.85)
 obstacle(name+' vanity',[x1-.64,by-.435,x1-.07,by+.435],z,z+1.0)

def stair_flight(name,start,end,width,steps,bottom,top,layer=L):
 """Straight stair, start/end in plan at landing edges; every riser real, nav continuous."""
 ax,ay=start;bx,by=end;run=math.dist(start,end);u=((bx-ax)/run,(by-ay)/run);v=(-u[1],u[0]);rise=(top-bottom)/steps;going=run/(steps-1)
 # steps-1 treads, final riser arrives onto landing.
 for i in range(steps-1):
  t=(i+.5)*going;x=ax+u[0]*t;y=ay+u[1]*t;z=bottom+(i+1)*rise
  box(name+' tread '+str(i+1),(x,y,z-.025),(going+.008,width,.05),oak,layer,math.atan2(u[1],u[0]))
  wall(name+' riser '+str(i+1),[x-u[0]*going/2-v[0]*width/2,y-u[1]*going/2-v[1]*width/2],[x-u[0]*going/2+v[0]*width/2,y-u[1]*going/2+v[1]*width/2],z-rise,z,white,layer,.025,False)
 vv=[]
 for side in(-1,1):
  for x,y,z in[(ax,ay,bottom-.05),(bx,by,top-rise-.05),(bx,by,top-rise-.21),(ax,ay,bottom-.21)]:vv.append((x+side*v[0]*width/2,y+side*v[1]*width/2,z))
 mesh(name+' structural waist',vv,[(0,1,2,3),(7,6,5,4),(0,4,5,1),(3,2,6,7),(1,5,6,2),(0,3,7,4)],white,layer)
 poly=[[ax-v[0]*width/2,ay-v[1]*width/2],[bx-v[0]*width/2,by-v[1]*width/2],[bx+v[0]*width/2,by+v[1]*width/2],[ax+v[0]*width/2,ay+v[1]*width/2]]
 new_ramps.append({'name':name,'polygon':poly,'start':[ax,ay,bottom+rise],'end':[bx,by,top]})
 wall(name+' final riser',[bx-v[0]*width/2,by-v[1]*width/2],[bx+v[0]*width/2,by+v[1]*width/2],top-rise,top,white,layer,.025,False)
 for side in(-1,1):
  beam(name+' handrail',(ax+side*v[0]*(width/2+.02),ay+side*v[1]*(width/2+.02),bottom+rise+.95),(bx+side*v[0]*(width/2+.02),by+side*v[1]*(width/2+.02),top+.95),.044,oak,layer)
  for i in range(23):
   t=i/22;x=ax+(bx-ax)*t+side*v[0]*(width/2+.02);y=ay+(by-ay)*t+side*v[1]*(width/2+.02);z=bottom+rise+(top-bottom-rise)*t
   beam(name+' baluster',(x,y,z),(x,y,z+.95),.022,black,layer)
