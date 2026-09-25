"""Second matched-photo review: balcony surfaces and entrance proportions."""
import bpy,math
from mathutils import Vector

def refine_photo_feedback(g):
 box,mesh,cylinder,beam=[g[n]for n in ('box','mesh','cylinder','beam')];materials=g['materials'];walls=g['wall_specs']
 for ob in list(bpy.data.objects):
  if ob.type!='MESH':continue
  if ob.name.startswith('Balcony brick pier'):ob.location.y-=.79
  if ob.name.startswith(('Bathroom balcony |','En suite balcony |'))and ob.users_collection[0].name.endswith('walls'):
   for i,m in enumerate(ob.data.materials):
    if m.name=='Red brown brick':ob.data.materials[i]=materials['White joinery']
  if ob.name.startswith('First front arched masonry infill'):
   ob.data.materials.append(materials['Red brown brick'])
   for p in ob.data.polygons:
    if max((ob.matrix_world@ob.data.vertices[i].co).y for i in p.vertices)<-.32:p.material_index=len(ob.data.materials)-1
  if ob.name.startswith(('Entrance porch','Entrance stone step','Porch pediment','House front centre glazing bar')):bpy.data.objects.remove(ob,do_unlink=True)
 # Porch widths fitted to the agent's close front-door photograph, image 02.
 layer='12 Doors and windows'
 for x in(5.72,8.16):
  box('Entrance porch square plinth',(x,-.89,.095),(.48,.48,.19),'White joinery',layer)
  cylinder('Entrance porch round column',(x,-.89,1.40),.17,2.34,'White joinery',layer,40)
  for z,r,d in[(.23,.22,.08),(.29,.185,.04),(2.55,.21,.08)]:cylinder('Entrance porch column collar',(x,-.89,z),r,d,'White joinery',layer,40)
  box('Entrance porch capital',(x,-.89,2.63),(.43,.43,.12),'White joinery',layer)
 # Thin sloping roof shell, white boarded soffit underneath and slate over it.
 for a,b,side in[((5.30,2.72),(6.94,3.30),'left'),((6.94,3.30),(8.58,2.72),'right')]:
  vs=[(x,y,z+dz)for dz in(0,.08)for y in(-1.20,-.34)for x,z in(a,b)]
  ob=mesh('Entrance porch pitched roof '+side,vs,[(0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5)],['White joinery','Slate roof'],'30 Roof',[0,1,0,0,0,0])
  beam('Porch pediment white trim',(a[0],-1.23,a[1]),(b[0],-1.23,b[1]),.12,'White joinery',layer)
 box('Entrance stone step',(6.94,-.89,.035),(3.17,1.40,.07),'Stone','10 Ground floor - floors')
 # Continuous brick infill at the floor slab edge; carpet does not wrap outside.
 for w in walls:
  if not w['external']or w['floor']!=1:continue
  a,b=Vector(w['a']),Vector(w['b']);u=(b-a).normalized();L=(b-a).length;cuts=[0,L]
  if w.get('projected_x_span'):
   for x in w['projected_x_span']:
    t=(x-a.x)/u.x
    if 0<t<L:cuts.append(t)
  cuts.sort()
  for l,r in zip(cuts,cuts[1:]):
   p=a+u*(l+r)/2;proj=w.get('front_projection_m',0)if w.get('projected_x_span')and w['projected_x_span'][0]<p.x<w['projected_x_span'][1]else 0
   ob=box('Exterior brick floor band '+w['name'],(p.x,p.y-proj/2,2.70),(r-l,w['thickness_m']+proj,.20),'Red brown brick','11 Ground floor - walls',math.atan2(u.y,u.x))
   ob.data.materials.clear();ob.data.materials.append(materials['Warm plaster']);ob.data.materials.append(materials['Red brown brick'])
   for face in ob.data.polygons:face.material_index=1 if face.index==3 else 0
 # Curved front parapet behind the garage: flat roof remains flat below it.
 poly=[(-5.4,2.78),(.02,2.78),(.02,4.07)]
 poly += [(-.02-1.15*t,2.99+1.08*(1-t)**3)for t in[i/24 for i in range(25)]]
 poly +=[(-5.4,2.99)]
 vs=[(x,y,z)for y in(-.22,-.02)for x,z in poly];n=len(poly)
 mesh('Garage front curved parapet',vs,[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)],'Red brown brick','30 Roof')
 top=[(-5.4,-.23,3.03)]+[(-1.17+1.15*t,-.23,3.03+1.08*t**3)for t in[i/24 for i in range(25)]]
 for a,b in zip(top,top[1:]):beam('Garage parapet white coping',a,b,.075,'White joinery','30 Roof')
 for w in walls:
  if w['name']not in('Bathroom balcony','En suite balcony'):continue
  xa,xb=sorted([w['a'][0],w['b'][0]])
  for j in range(15):
   z=2.8+(j+.5)*2.45/15;spans=[(xa,xb)]
   for d,width,sill,head,kind in w['openings']:
    if not sill+2.8-.035<z<head+2.8+.035:continue
    direction=1 if w['b'][0]>w['a'][0]else-1;cx=w['a'][0]+direction*d
    spans=[(a,b)for l,r in spans for a,b in[(l,min(r,cx-width/2-.06)),(max(l,cx+width/2+.06),r)]if b-a>.03]
   for l,r in spans:box('Balcony horizontal cladding seam',((l+r)/2,8.014,z),(r-l,.018,.010),'Warm plaster','23 Balcony')
 box('Balcony inner eaves soffit',(7.06,8.91,5.265),(4.04,.35,.055),'White joinery','30 Roof')
 for ob in bpy.data.objects:
  if ob.type=='MESH'and ob.name.startswith('Balcony baluster'):
   inv=ob.matrix_world.inverted()
   for v in ob.data.vertices:
    p=ob.matrix_world@v.co;t=(p.z-2.9)/.95
    if 0<t<1:p.y+=.13*math.sin(t*math.pi*1.25)
    v.co=inv@p
