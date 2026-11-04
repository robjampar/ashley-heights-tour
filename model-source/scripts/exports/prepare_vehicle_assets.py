"""Prepare the licensed Tesla at real scale, retaining the original source."""
from pathlib import Path
import bpy,hashlib,json
from mathutils import Matrix,Vector
ROOT=Path(__file__).resolve().parents[2]
source=ROOT/'source/assets/vehicles/tesla-model-3-2024-original.glb'
out=ROOT/'walkthrough/public/vehicles';out.mkdir(exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world@Vector(p) for o in objects for p in o.bound_box]
lo=Vector([min(p[i] for p in points) for i in range(3)]);hi=Vector([max(p[i] for p in points) for i in range(3)])
scale=4.72/(hi.x-lo.x);center=(hi+lo)/2
transform=Matrix.Scale(scale,4)@Matrix.Translation((-center.x,-center.y,-lo.z))
for o in objects:
 world=o.matrix_world.copy();o.parent=None;o.matrix_world=Matrix.Identity(4);o.data.transform(transform@world)
 # Keep the source normals and all material boundaries/texture coordinates.
 o.name='Tesla Model 3 | '+o.name
for m in list(bpy.data.materials):
 if not m.use_nodes:continue
 p=next((n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED'),None)
 if not p:continue
 name=m.name
 if name in ('Geohoodsub00021Mtl','Georimblurlfsub01Mtl'):
  p.inputs['Base Color'].default_value=(.14,.16,.18,1);p.inputs['Metallic'].default_value=.38;p.inputs['Roughness'].default_value=.58;p.inputs['Coat Weight'].default_value=.10;p.inputs['Coat Roughness'].default_value=.50
  m.name='Tesla | satin gunmetal paint | '+name
 elif name=='Tire1Mtl':
  p.inputs['Metallic'].default_value=0;p.inputs['Roughness'].default_value=.88;m.name='Tesla | tyre rubber'
 elif name=='Georimblurlfsub021Mtl':
  p.inputs['Metallic'].default_value=.85;p.inputs['Roughness'].default_value=.25;m.name='Tesla | alloy wheels'
 elif name=='Geohoodsub00031Mtl':
  p.inputs['Metallic'].default_value=.9;p.inputs['Roughness'].default_value=.22;m.name='Tesla | polished trim'
 elif any(s in name for s in ('window','Geodoorl2sub31','Geodoorr2sub31')):
  p.inputs['Base Color'].default_value=(.07,.095,.12,.30);p.inputs['Alpha'].default_value=.30;p.inputs['Metallic'].default_value=.3;p.inputs['Roughness'].default_value=.07;m.name='Tesla | tinted glass | '+name
 elif name=='Geodoorlintsub400251Mtl':
  p.inputs['Base Color'].default_value=(.025,.028,.032,1);p.inputs['Roughness'].default_value=.7;m.name='Tesla | dashboard textile'
 elif name=='Geocockpithrsub1031Mtl':
  p.inputs['Base Color'].default_value=(.018,.019,.022,1);p.inputs['Roughness'].default_value=.95;m.name='Tesla | carpet'
 else:m.name='Tesla | '+name
# The export shares a dark shell material between body panels and small rim
# pieces. Assign only low outboard wheel faces their own dark alloy material.
rim=bpy.data.materials.new('Tesla | dark wheel inserts');rim.diffuse_color=(.045,.05,.06,1);rim.use_nodes=True
p=rim.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=rim.diffuse_color;p.inputs['Metallic'].default_value=.75;p.inputs['Roughness'].default_value=.3
for o in objects:
 if not any('Georimblurlfsub01Mtl' in m.name for m in o.data.materials):continue
 slot=len(o.data.materials);o.data.materials.append(rim)
 for face in o.data.polygons:
  c=face.center
  if c.z<.67 and abs(c.y)>.68 and (abs(c.x-1.49)<.5 or abs(c.x+1.385)<.5):face.material_index=slot
bpy.ops.object.select_all(action='DESELECT')
for o in objects:o.select_set(True)
bpy.context.view_layer.objects.active=objects[0]
bpy.ops.export_scene.gltf(filepath=str(out/'tesla-model-3.glb'),export_format='GLB',use_selection=True,export_extras=True,export_copyright='2024 Tesla Model 3 by RBLXSupercars; uploader brandonleong28. CC BY 4.0. See CREDITS.md.')
native=ROOT/'outputs/output-vehicle-assets';native.mkdir(exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(native/'Tesla Model 3 — walkthrough.blend'))
report={'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'sourceBytes':source.stat().st_size,'length':4.72,'width':round((hi.y-lo.y)*scale,5),'height':round((hi.z-lo.z)*scale,5),'forward':'+X','up':'+Y in glTF','ground':0,'triangles':sum(len(o.data.loop_triangles) for o in objects),'materials':len(bpy.data.materials)}
(out/'tesla-model-3.json').write_text(json.dumps(report,indent=2)+'\n');print('VEHICLE',report,flush=True)

# Nissan NV200: retain the detailed LOD only. The source includes all three
# overlapping LODs, which must never be displayed together.
import bmesh,math
bpy.ops.wm.read_factory_settings(use_empty=True)
source=ROOT/'source/assets/vehicles/nissan-nv200-decoded.glb'
bpy.ops.import_scene.gltf(filepath=str(source))
for o in list(bpy.context.scene.objects):
 if o.type!='MESH' or o.name!='LOD0':bpy.data.objects.remove(o,do_unlink=True)
o=bpy.data.objects['LOD0'];o.data.transform(o.matrix_world);o.matrix_world=Matrix.Identity(4)
# Remove connected rooftop taxi signs and their supports, above the van roof.
bm=bmesh.new();bm.from_mesh(o.data);seen=set();remove=[]
for v in bm.verts:
 if v in seen:continue
 component={v};todo=[v];seen.add(v)
 while todo:
  for e in todo.pop().link_edges:
   for n in e.verts:
    if n not in seen:seen.add(n);component.add(n);todo.append(n)
 if min(v.co.z for v in component)>1.84:remove.extend(component)
bmesh.ops.delete(bm,geom=remove,context='VERTS');bm.to_mesh(o.data);bm.free()
paint=bpy.data.materials['taxinv200_paint'];p=paint.node_tree.nodes.get('Principled BSDF')
for link in list(p.inputs['Base Color'].links):paint.node_tree.links.remove(link)
p.inputs['Base Color'].default_value=(.72,.73,.71,1);p.inputs['Metallic'].default_value=.08;p.inputs['Roughness'].default_value=.62;p.inputs['Coat Weight'].default_value=.05;p.inputs['Coat Roughness'].default_value=.55
paint.name='Nissan NV200 | white paint'
# Glazed rear windows become body-colour panels; retain the cab glazing.
for f in o.data.polygons:
 if f.material_index==2 and f.center.y>.15:f.material_index=0
for m in list(bpy.data.materials):
 if m!=paint:m.name='Nissan NV200 | '+m.name
# Source is front -Y / up Z; normalize to the viewer's front +X.
points=[v.co for v in o.data.vertices];lo=Vector([min(p[i] for p in points) for i in range(3)]);hi=Vector([max(p[i] for p in points) for i in range(3)]);center=(hi+lo)/2
scale=4.73/(hi.y-lo.y)
o.data.transform(Matrix.Rotation(math.pi/2,4,'Z')@Matrix.Scale(scale,4)@Matrix.Translation((-center.x,-center.y,-lo.z)))
o.name='Nissan NV200 | compact panel van'
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=str(out/'nissan-nv200.glb'),export_format='GLB',export_extras=True,export_copyright='Dhl delivery van by memoov, adapted by M. K. Turkcan / Valdrada and Ashley Heights. CC BY 4.0. See CREDITS.md.')
bpy.ops.wm.save_as_mainfile(filepath=str(native/'Nissan NV200 — walkthrough.blend'))
report={'sourceSHA256':hashlib.sha256((ROOT/'source/assets/vehicles/nissan-nv200-original.glb').read_bytes()).hexdigest(),'length':4.73,'width':round((hi.x-lo.x)*scale,5),'height':round((hi.z-lo.z)*scale,5),'forward':'+X','up':'+Y in glTF','ground':0,'triangles':len(o.data.polygons),'adaptations':['LOD0 only','taxi signs removed','white body paint','rear window panels']}
(out/'nissan-nv200.json').write_text(json.dumps(report,indent=2)+'\n');print('VEHICLE',report,flush=True)

# Modern Fiat 500 Abarth. Use transformed vertices, not transformed object
# bounding boxes: the source has rotated detail meshes whose boxes overestimate
# its length/height substantially.
bpy.ops.wm.read_factory_settings(use_empty=True)
source=ROOT/'source/assets/vehicles/fiat-500-original.glb'
bpy.ops.import_scene.gltf(filepath=str(source))
objects=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world@v.co for o in objects for v in o.data.vertices]
lo=Vector([min(p[i] for p in points) for i in range(3)]);hi=Vector([max(p[i] for p in points) for i in range(3)]);center=(hi+lo)/2
scale=3.66/(hi.y-lo.y);transform=Matrix.Rotation(math.pi/2,4,'Z')@Matrix.Scale(scale,4)@Matrix.Translation((-center.x,-center.y,-lo.z))
for o in objects:
 world=o.matrix_world.copy();o.parent=None;o.matrix_world=Matrix.Identity(4);o.data.transform(transform@world);o.name='Fiat 500 | '+o.name
for m in list(bpy.data.materials):
 if not m.use_nodes:continue
 p=m.node_tree.nodes.get('Principled BSDF');name=m.name
 if name=='Car_Paint':
  p.inputs['Metallic'].default_value=.15;p.inputs['Roughness'].default_value=.55;p.inputs['Coat Weight'].default_value=.10;p.inputs['Coat Roughness'].default_value=.50
 elif name=='Glass_Windscreen':
  p.inputs['Alpha'].default_value=.32;p.inputs['Metallic'].default_value=.1;p.inputs['Roughness'].default_value=.06
 elif name=='Glass':
  p.inputs['Alpha'].default_value=.12;p.inputs['Metallic'].default_value=.15;p.inputs['Roughness'].default_value=.04
 elif name=='Tyre':p.inputs['Roughness'].default_value=.88
 m.name='Fiat 500 | '+name
bpy.ops.object.select_all(action='DESELECT')
for o in objects:o.select_set(True)
bpy.context.view_layer.objects.active=objects[0]
# Preserve the full-detail editable derivative. Only repeated tyre tread and
# largely hidden brake geometry are simplified for the real-time GLB.
bpy.ops.wm.save_as_mainfile(filepath=str(native/'Fiat 500 — walkthrough.blend'))
for o in objects:
 ratio=.14 if 'Pneumatico' in o.name else .2 if any(x in o.name for x in ['Pinza_Freno','Disco_Freno']) else None
 if ratio is None:continue
 bpy.context.view_layer.objects.active=o
 modifier=o.modifiers.new('Browser tyre and brake detail','DECIMATE');modifier.ratio=ratio;modifier.use_collapse_triangulate=True
 bpy.ops.object.modifier_apply(modifier=modifier.name)
bpy.ops.export_scene.gltf(filepath=str(out/'fiat-500.glb'),export_format='GLB',use_selection=True,export_extras=True,export_copyright='Fiat 500 Abarth by attix84work, CC BY 4.0. Adapted by Ashley Heights. See CREDITS.md.')
report={'sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'length':3.66,'width':round((hi.x-lo.x)*scale,5),'height':round((hi.z-lo.z)*scale,5),'forward':'+X','up':'+Y in glTF','ground':0,'triangles':sum(len(o.data.polygons) for o in objects),'materials':len(bpy.data.materials)}
(out/'fiat-500.json').write_text(json.dumps(report,indent=2)+'\n');print('VEHICLE',report,flush=True)
