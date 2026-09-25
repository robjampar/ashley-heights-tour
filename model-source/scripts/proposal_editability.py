"""Centred editable parts and named assemblies; world geometry must not move."""
from mathutils import Matrix
import re
bpy.context.view_layer.update()
light_snapshots={ob.name:ob.matrix_world.copy() for ob in scene.objects if ob.type=='LIGHT'}
edit_report={'centred_new_meshes':0,'assemblies':[],'maximum_vertex_shift_m':0.,'maximum_light_transform_shift':0.,'retained_original_objects_modified':0}
new_meshes=[ob for ob in scene.objects if ob.type=='MESH' and ob.name.startswith('Proposal |') and len(ob.data.vertices)]
snapshots={ob.name:[ob.matrix_world@v.co for v in ob.data.vertices] for ob in new_meshes}
centres={}
for ob in new_meshes:
 world=snapshots[ob.name]
 centre=Vector(tuple((min(v[i]for v in world)+max(v[i]for v in world))/2 for i in range(3)))
 for v,p in zip(ob.data.vertices,world):v.co=p-centre
 ob.parent=None;ob.matrix_world=Matrix.Translation(centre)
 centres[ob.name]=centre.copy()
 ob['proposal_design']=spec['revision'];ob['editing_note']='Centred origin; move this part, or select its named parent assembly to move the whole item.'
 edit_report['centred_new_meshes']+=1

assigned=set()
def assembly(label,members,pivot=None):
 members=[o for o in members if o.name not in assigned]
 if not members:return
 vv=[p for ob in members for p in snapshots[ob.name]]
 centre=Vector(pivot) if pivot else Vector(tuple((min(v[i]for v in vv)+max(v[i]for v in vv))/2 for i in range(3)))
 parent=bpy.data.objects.new(label,None);members[0].users_collection[0].objects.link(parent)
 parent.empty_display_type='PLAIN_AXES';parent.empty_display_size=.20;parent.location=centre
 parent['editing_note']='Select this parent to move or rotate the complete assembly; child meshes stay independently editable.'
 for ob in members:
  ob.parent=parent;ob.matrix_parent_inverse=Matrix.Translation(-centre);ob.matrix_basis=Matrix.Translation(centres[ob.name]);ob['assembly']=label;assigned.add(ob.name)
 edit_report['assemblies'].append({'name':label,'parts':len(members),'pivot_m':list(centre)})

# Door parents use hinges; static furniture/vehicles use their actual centres.
for door in proposed_doors:
 assembly('Editable door | '+door['id'].replace('Proposal | ',''),[o for o in new_meshes if o.name in door['members']],door['hinge'])
for prefix in('Kitchen east working run','Kitchen fridge','Kitchen hob','Kitchen sink','Kitchen island','Side living sofa','Side living coffee table','Garden sofa','Garden dining','Garden coffee table','Pavilion sofa','Principal bed','Principal sitting sofa','Loft studio sofa bed','Rear loft bed','Ground to first lower','Ground to first upper','First to loft lower','First to loft upper','Courtyard tree','Cinema seat 11','Cinema seat 12','Cinema seat 13','Cinema seat 21','Cinema seat 22','Cinema seat 23','Side bathroom shower','Side bathroom WC','Side bathroom vanity','Side bathroom basin','Laundry Washer','Laundry Dryer','Laundry sink','Gym treadmill','Gym rower','Gym weights bench','Gym dumbbell rack','Wine north rack','Wine east rack','Wine west rack','Cellar tasting table','Side south bed','Side north bed','Side south wardrobe','Family lounge sofa','Family lounge coffee table','Family lounge storage','Family lounge work table','Family lounge chair 1','Games pool table','Games sofa','Games media console','Terrace café table','Terrace café chair1','Terrace café chair2','Pool hot tub','Hot tub access stair','Workshop workbench','Workshop storage','Loft shared sofa','Loft shared coffee table','Loft creative workbench','Loft quiet desk','Loft eaves archive storage','Loft studio supplies storage','Loft chimney core','Dormer chimney'):
 assembly('Editable assembly | '+prefix,[o for o in new_meshes if o.name.startswith('Proposal | '+prefix) and not o.get('proposal_light_fixture')])
for prefix in('Study desk','Landing library desk','Loft studio desk','Rear loft writing desk','Principal dressing east','Principal dressing north','Boot tall storage','Boot short west storage','Landing linen storage','Workshop bench'):
 assembly('Editable fitting | '+prefix,[o for o in new_meshes if o.name.startswith('Proposal | '+prefix)])
for prefix in('Principal bathroom','Guest bathroom'):
 assembly('Editable fitting | '+prefix+' washstand',[o for o in new_meshes if o.name.startswith('Proposal | '+prefix+' basin') or o.name=='Proposal | '+prefix+' vanity'])
 assembly('Editable fitting | '+prefix+' shower',[o for o in new_meshes if o.name.startswith('Proposal | '+prefix+' shower') or o.name=='Proposal | '+prefix+' rainfall head'])
for prefix in('Principal bathroom','Guest bathroom','Ground WC'):
 assembly('Editable fitting | '+prefix+' WC',[o for o in new_meshes if o.name.startswith('Proposal | '+prefix+' toilet') or o.name=='Proposal | '+prefix+' ceramic WC bowl and seat'])
assembly('Editable fitting | Principal bath',[o for o in new_meshes if o.name in('Proposal | Principal freestanding bath','Proposal | Principal bath filler','Proposal | Principal bath spout')])
# Visible bedside fixtures and their native lights move together when the bed
# is moved. Light objects are omitted from GLB, but retained for native edits.
for prefix in('Principal bed','Loft studio sofa bed','Rear loft bed','Side south bed','Side north bed'):
 parent=bpy.data.objects.get('Editable assembly | '+prefix)
 if parent is None:continue
 for light in [ob for ob in scene.objects if ob.type=='LIGHT' and ob.name.startswith('Proposal | '+prefix)]:
  before=light.matrix_world.copy();light.parent=parent;light.matrix_parent_inverse=Matrix.Translation(-parent.location);light.matrix_basis=before
for bay in('N1','N2','S1','S2','G1','G2'):
 assembly('Editable car | '+bay,[o for o in new_meshes if o.get('proposal_vehicle_bay')==bay])
for index,yy in enumerate((17.5,20.0,22.5)):
 assembly('Editable lounger | '+str(index+1),[o for o in new_meshes if o.name.startswith('Proposal | Pool lounger') and abs(o.matrix_world.translation.y-yy)<1.05])

# Move the physical fixture and its native sources together when editing.
for label in sorted({o.get('proposal_light_fixture')for o in new_meshes if o.get('proposal_light_fixture')}):
 assembly('Editable light | '+label,[o for o in new_meshes if o.get('proposal_light_fixture')==label])
 parent=bpy.data.objects.get('Editable light | '+label)
 for light in [ob for ob in scene.objects if ob.type=='LIGHT' and ob.get('proposal_light_fixture')==label]:
  before=light.matrix_world.copy();light.parent=parent;light.matrix_parent_inverse=Matrix.Translation(-parent.location);light.matrix_basis=before

# Useful collection groups within the proposal; original scenes are untouched.
children={}
def subcollection(parent,label):
 key=(parent.name,label)
 if key not in children:
  c=bpy.data.collections.new(parent.name+' / '+label);parent.children.link(c);children[key]=c
 return children[key]
for name in(L,T):
 parent=collections[name]
 for ob in list(parent.objects):
  n=ob.name.lower()
  roof_part=any(s in n for s in('joined roof','rooflight','roof shoulder','gable glass','upper sloping frame')) or re.search(r'\bridge\b',n) or ('eaves' in n and not any(s in n for s in('hatch','panel','pull')))
  if roof_part:label='Roof and rooflights'
  elif any(s in n for s in('stair','ground to first','first to loft','loft flight','cross landing','turning landing','well guard')):label='Stairs and guards'
  elif any(s in n for s in('loft','dormer','bridge')):label='Loft rooms'
  elif any(s in n for s in('principal','guest','upper','first floor','first ceiling','landing','library')):label='First floor'
  else:label='Ground floor and envelope'
  subcollection(parent,label).objects.link(ob);parent.objects.unlink(ob)
# Each retained object is linked to a proposal-only child of P00. Its original
# collection membership and data stay exactly as they were in the source file.
for ob in list(retained.objects):
 old=[c.name for c in ob.users_collection if c!=retained and not c.name.startswith('P')]
 source=old[0] if old else 'Other retained pieces'
 label='Roof and ceilings' if any(t in source.lower()for t in('roof','ceiling')) else 'First floor' if source.startswith(('20','21','22','23','24','25')) else 'Ground floor' if source.startswith(('10','11','12','13','14','15','16','17','18')) else 'Garden and site'
 subcollection(retained,label).objects.link(ob);retained.objects.unlink(ob)
bpy.context.view_layer.update()
for ob in new_meshes:
 shift=max((ob.matrix_world@v.co-p).length for v,p in zip(ob.data.vertices,snapshots[ob.name]))
 edit_report['maximum_vertex_shift_m']=max(edit_report['maximum_vertex_shift_m'],shift)
assert edit_report['maximum_vertex_shift_m']<.00002,edit_report
for name,before in light_snapshots.items():
 after=bpy.data.objects[name].matrix_world
 shift=max(abs(after[i][j]-before[i][j]) for i in range(4) for j in range(4))
 edit_report['maximum_light_transform_shift']=max(edit_report['maximum_light_transform_shift'],shift)
assert edit_report['maximum_light_transform_shift']<.00002,edit_report
(OUT/'editability-check.json').write_text(json.dumps(edit_report,indent=2))
print('PROPOSAL_EDITABILITY',edit_report['centred_new_meshes'],len(edit_report['assemblies']),edit_report['maximum_vertex_shift_m'],flush=True)
