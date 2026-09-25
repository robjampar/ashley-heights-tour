"""Disjoint paving at shared levels: retain actual levels, remove coincident faces."""
from mathutils.geometry import tessellate_polygon

def _top_triangles(ob,z):
 result=[]
 for face in ob.data.polygons:
  vv=[ob.matrix_world@ob.data.vertices[i].co for i in face.vertices]
  if len(vv)<3 or not all(abs(v.z-z)<.00003 for v in vv):continue
  if (vv[1]-vv[0]).cross(vv[2]-vv[0]).z<=0:continue
  for tri in tessellate_polygon([vv]):
   coords=[vv[v] if isinstance(v,int) else v for v in tri]
   p=_roof_clean([[v.x,v.y] for v in coords])
   if p:result.append(p)
 return result

def _disjoint_slab(ob,z,previous,copy_original=False):
 original_parts=_top_triangles(ob,z)
 if not original_parts:return []
 parts=original_parts
 for mask in previous:
  mx0=min(p[0] for p in mask);mx1=max(p[0] for p in mask);my0=min(p[1] for p in mask);my1=max(p[1] for p in mask)
  next_parts=[]
  for part in parts:
   if max(p[0]for p in part)<=mx0+1e-8 or min(p[0]for p in part)>=mx1-1e-8 or max(p[1]for p in part)<=my0+1e-8 or min(p[1]for p in part)>=my1-1e-8:next_parts.append(part)
   else:next_parts.extend(_roof_subtract(part,mask))
  parts=next_parts
 before=sum(abs(_roof_area(p))for p in original_parts);after=sum(abs(_roof_area(p))for p in parts)
 if before-after<1e-7:return original_parts
 source=ob.name
 if copy_original:ob=revised_copy(ob,'Reconcile paving at unchanged finished level around proposed floors and terraces; eliminate overlapping opaque surfaces')
 bottom=min((ob.matrix_world@v.co).z for v in ob.data.vertices)
 vv=[];ff=[]
 for part in parts:
  n=len(part);offset=len(vv);vv.extend([(x,y,bottom)for x,y in part]+[(x,y,z)for x,y in part])
  ff.extend([tuple(offset+i for i in reversed(range(n))),tuple(offset+i for i in range(n,2*n))])
  ff.extend([(offset+i,offset+(i+1)%n,offset+(i+1)%n+n,offset+i+n)for i in range(n)])
 old=ob.data;me=bpy.data.meshes.new(ob.name+' disjoint footprint');me.from_pydata(vv,[],ff);me.update()
 for m in old.materials:me.materials.append(m)
 ob.data=me;ob.matrix_world=Matrix.Identity(4)
 audit.append({'object':source,'retainedAreaM2':after,'removedCoincidentAreaM2':before-after,'z':z,'proposalOnly':True})
 if not parts:bpy.data.objects.remove(ob,do_unlink=True)
 return parts

from mathutils import Matrix
audit=[]
# Interior floors take priority, then terraces, then the pre-existing site paving.
prefixes=[
 'Proposal | New wing ground floor','Proposal | Attached entrance link floor',
 'Proposal | Side wing ground floor','Proposal | Side living garden threshold','Proposal | Kitchen garden flush threshold',
 'Proposal | Garden room floor','Proposal | Pavilion expanded floor',
 'Proposal | Open courtyard limestone paving','Proposal | New arrival threshold terrace',
 'Proposal | Drawing terrace','Proposal | Rear living terrace','Proposal | Pool terrace',
 'Proposal | Pavilion poolside deck','Proposal | Lawn stepping stone',
]
owned=[]
# The existing internal room floors remain intact at the junctions. Only
# new overlapping threshold material is trimmed back to those original edges.
for ob in original_objects:
 if ob.type=='MESH' and ob.name not in excluded and ob.name in scene.objects and any(c.name=='10 Ground floor - floors'for c in ob.users_collection):owned.extend(_top_triangles(ob,0))
prefixes.insert(2,'Proposal | Ground entrance junction threshold')
for prefix in prefixes:
 for ob in list(scene.objects):
  if ob.type=='MESH' and ob.name.startswith(prefix):owned.extend(_disjoint_slab(ob,0,owned))
for name in('Rear terrace paving','Outbuilding path - faces lawn'):
 ob=next((o for o in original_objects if o.name==name),None)
 if ob and ob.name not in excluded:_disjoint_slab(ob,0,owned,True)

# The bridge slab overlaps the wing along its attachment and the original
# landing slightly. Keep a single visible finish at each interface.
ff_owned=[]
for ob in original_objects:
 if ob.type=='MESH' and any(c.name=='20 First floor - floors'for c in ob.users_collection):ff_owned.extend(_top_triangles(ob,2.8))
for prefix in('Proposal | Principal bathroom stone floor','Proposal | Guest bathroom stone floor','Proposal | Entrance first floor continuation','Proposal | First landing junction threshold','Proposal | Wing first floor','Proposal | Ground to first cross landing'):
 for ob in list(scene.objects):
  if ob.type=='MESH' and ob.name.startswith(prefix):ff_owned.extend(_disjoint_slab(ob,2.8,ff_owned))
loft_owned=[]
for prefix in('Proposal | Original loft deck','Proposal | Wing loft floor','Proposal | Loft bridge junction deck','Proposal | First to loft cross landing'):
 for ob in list(scene.objects):
  if ob.type=='MESH' and ob.name.startswith(prefix):loft_owned.extend(_disjoint_slab(ob,5.55,loft_owned))
(OUT/'surface-junctions.json').write_text(json.dumps(audit,indent=2))
print('PROPOSAL_SURFACE_JUNCTIONS',len(audit),flush=True)
