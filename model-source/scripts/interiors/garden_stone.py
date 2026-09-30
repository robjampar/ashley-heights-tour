"""Deterministic modelled limestone veneer, shared by native and web exports."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import random,math,json
from pathlib import Path
PREFIX='Garden limestone | '
COLORS=[(.67,.625,.53,1),(.73,.68,.585,1),(.61,.585,.52,1),(.76,.71,.61,1),(.65,.60,.49,1),(.69,.66,.59,1)]
def parts(config):
 r=random.Random(config['seed']);x=config['x'];y0,y1=config['y'];z0,z1=config['z'];out=[];z=z0;row=0
 while z<z1-.025:
  h=min(r.uniform(.23,.36),z1-z);y=y0;col=0
  while y<y1-.035:
   w=min(r.uniform(.25,.69),y1-y)
   if y1-(y+w)<.14:w=y1-y
   gap=.012;ya,yb=y+gap/2,y+w-gap/2;za,zb=z+gap/2,z+h-gap/2;cy,cz=(ya+yb)/2,(za+zb)/2
   bevel=min(w,h)*r.uniform(.04,.14)
   outline=[(ya+bevel,za),(yb-bevel,za),(yb,za+bevel),(yb,zb-bevel),(yb-bevel,zb),(ya+bevel,zb),(ya,zb-bevel),(ya,za+bevel)]
   # Rough bevel perimeter, inset face ring and irregular triangulated relief.
   outline=[(max(ya,min(yb,yy+r.uniform(-.022,.022))),max(za,min(zb,zz+r.uniform(-.018,.018)))) for yy,zz in outline]
   vs=[(x+.003,yy,zz) for yy,zz in outline]
   depth=r.uniform(.023,.040)
   vs += [(x+depth+r.uniform(-.006,.006),cy+(yy-cy)*r.uniform(.89,.96),cz+(zz-cz)*r.uniform(.86,.96)) for yy,zz in outline]
   vs += [(x+min(config['maxProjectionM'],depth+r.uniform(.003,.012)),cy+r.uniform(-w*.07,w*.07),cz+r.uniform(-h*.07,h*.07))]
   fs=[]
   for k in range(8):fs.extend([(k,(k+1)%8,8+(k+1)%8,8+k),(8+k,8+(k+1)%8,16)])
   # Subdivide each rough face into chipped, non-planar triangles.
   triangles=[]
   for f in fs:
    for k in range(1,len(f)-1):triangles.append((f[0],f[k],f[k+1]))
   for level in range(2):
    mids={};refined=[]
    def mid(a,b):
     key=tuple(sorted((a,b)))
     if key not in mids:
      va,vb=vs[a],vs[b];px=(va[0]+vb[0])/2
      if px>x+.01:px=max(x+.007,min(x+config['maxProjectionM'],px+r.uniform(-.007,.007)))
      mids[key]=len(vs);vs.append((px,(va[1]+vb[1])/2,(va[2]+vb[2])/2))
     return mids[key]
    for a,b,c in triangles:
     ab,bc,ca=mid(a,b),mid(b,c),mid(c,a);refined.extend([(a,ab,ca),(ab,b,bc),(ca,bc,c),(ab,bc,ca)])
    triangles=refined
   fs=[]
   for a,b,c in triangles:
    u=[vs[b][i]-vs[a][i] for i in range(3)];v=[vs[c][i]-vs[a][i] for i in range(3)]
    cross=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
    if sum(q*q for q in cross)>1e-18:fs.append((a,b,c))
   out.append({'name':PREFIX+f'course {row+1} stone {col+1}','vertices':vs,'faces':fs,'material':r.randrange(len(COLORS))});y+=w;col+=1
  z+=h;row+=1
 return out

def apply_native(scene,root):
 import bpy
 from mathutils import Vector
 cfg=json.loads((Path(root)/'proposal/interiors/garden-stone.json').read_text())
 walls=[o for o in scene.objects if o.type=='MESH' and o.get('source_name',o.name).startswith(cfg['object'])]
 if not walls:return {'applied':False,'reason':'Named garden return absent in this design'}
 for ob in list(scene.objects):
  if ob.name.startswith(PREFIX):bpy.data.objects.remove(ob,do_unlink=True)
 def material(name,color):
  m=bpy.data.materials.get(name)or bpy.data.materials.new(name);m.diffuse_color=color;m.use_nodes=True;bs=m.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=color;bs.inputs['Roughness'].default_value=.91
  noise=m.node_tree.nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=18;noise.inputs['Detail'].default_value=3
  bump=m.node_tree.nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.65;bump.inputs['Distance'].default_value=.006;m.node_tree.links.new(noise.outputs['Fac'],bump.inputs['Height']);m.node_tree.links.new(bump.outputs['Normal'],bs.inputs['Normal'])
  ramp=m.node_tree.nodes.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].position=.2;ramp.color_ramp.elements[0].color=tuple(v*.60 for v in color[:3])+(1,);ramp.color_ramp.elements[1].position=.8;ramp.color_ramp.elements[1].color=color;m.node_tree.links.new(noise.outputs['Fac'],ramp.inputs[0]);m.node_tree.links.new(ramp.outputs['Color'],bs.inputs['Base Color']);return m
 mortar=material('Garden limestone | recessed lime mortar',(.69,.65,.56,1));mats=[material(PREFIX+'pale stone '+str(i+1),c) for i,c in enumerate(COLORS)]
 for wall in walls:
  wall.data=wall.data.copy();wall.data.materials.append(mortar);index=len(wall.data.materials)-1
  for f in wall.data.polygons:
   if (wall.matrix_world.to_3x3()@f.normal).x>.8:f.material_index=index
 collection=bpy.data.collections.get('Garden limestone feature wall')or bpy.data.collections.new('Garden limestone feature wall')
 if collection.name not in scene.collection.children:scene.collection.children.link(collection)
 for p in parts(cfg):
  mesh=bpy.data.meshes.new(p['name']);mesh.from_pydata(p['vertices'],[],p['faces']);mesh.update();ob=bpy.data.objects.new(p['name'],mesh);collection.objects.link(ob);mesh.materials.append(mats[p['material']]);ob['source_name']=p['name'];ob['finish_owner']=cfg['object'];ob['review_reference']=cfg['reference']
 return {'applied':True,'stones':len(parts(cfg)),'face':cfg['face'],'source':'proposal/interiors/garden-stone.json'}
