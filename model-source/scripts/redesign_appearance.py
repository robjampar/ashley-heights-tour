"""Exterior-only finish roles for independent redesigns; original scene stays immutable."""
from exterior_exposure import ExteriorExposure
exposure=ExteriorExposure(bpy.data,scene,original,{**nav,'planRooms':nav['planRooms']+new_rooms},build_timer)
roles={};counts={};object_roles={};slots={}
wall_materials={'Red brown brick','Warm plaster',white,plaster}
roof_source=materials[roofmat]
hanging=roof_source.copy();hanging.name=spec['code']+' | Roof tiles - vertical hanging';materials[hanging.name]=hanging;PALETTE[hanging.name]=list(hanging.diffuse_color)

def role_material(source,role):
    key=(source.as_pointer(),role)
    if key not in slots:
        m=source.copy();m.name='Appearance | '+role+' | '+source.name
        m['appearance_role']=role;m['appearance_source_material']=source.name
        slots[key]=m;materials[m.name]=m;PALETTE[m.name]=list(m.diffuse_color)
    return slots[key]

for ob in list(scene.objects):
    if ob.type!='MESH' or not ob.data.polygons or ob.hide_render:continue
    name=name_of(ob).lower();owners=[c.name for c in ob.users_collection]
    if exposure.category(ob,None)in('out','veg')or is_furniture(ob)or any(c.startswith(('R40','R50','R60','R70'))for c in owners):continue
    if any(t in name for t in ('lining','ceiling','soffit','skirting','riser','tread','handrail','baluster','stair','worktop','cabinet','desk','bed frame','shelf','basin','toilet')):continue
    dormer='dormer'in name and('cheek'in name or 'face'in name)
    normal_matrix=ob.matrix_world.to_3x3().inverted().transposed();assign=[]
    for face in ob.data.polygons:
        if not ob.data.materials:continue
        source=ob.data.materials[face.material_index]
        if not source:continue
        role=None;normal=(normal_matrix@face.normal).normalized();centre=ob.matrix_world@face.center
        if dormer and(source.name in wall_materials or source.name==roofmat):
            # Known outward sides are used only after an actual exposure ray
            # check, so the buried cheek portions do not become exterior tiles.
            outward=('west cheek'in name and normal.x<-.7)or('east cheek'in name and normal.x>.7)or('face'in name and normal.y>.7)
            samples=[centre]+[(ob.matrix_world@ob.data.vertices[i].co).lerp(centre,.15)for i in face.vertices]
            if outward and any(exposure.sees_outside(p,normal,room_veto=False)for p in samples):role='dormer';source=hanging
            elif not outward:
                # Cheeks were constructed as solid tile-coloured boxes. Their
                # room-facing surfaces need plaster even before a viewer override.
                role='interior-dormer'
        elif source.name==roofmat:role='roof'
        elif source.name in wall_materials:
            samples=[centre]
            if face.area<.6:samples +=[(ob.matrix_world@ob.data.vertices[i].co).lerp(centre,.15)for i in face.vertices]
            if any(exposure.sees_outside(p,normal)for p in samples):
                # A restrained oak accent on the subordinate side-storey front;
                # the brick preset restores matching masonry on the same faces.
                role='oak-panel' if 'side first south' in name and normal.y<-.7 else 'wall'
            elif source.name=='Red brown brick'and any(c.startswith(('R10','R20','R30'))for c in owners):role='interior-wall'
        if role:assign.append((face.index,materials[plaster]if role.startswith('interior-')else role_material(source,role),role))
    if not assign:continue
    if ob in original_objects:ob=edited_copy(ob,'Independent finish controls for exposed house surfaces')
    elif ob.data.users>1:ob.data=ob.data.copy()
    indices={m.as_pointer():i for i,m in enumerate(ob.data.materials)if m}
    for face_index,material,role in assign:
        if material.as_pointer()not in indices:indices[material.as_pointer()]=len(ob.data.materials);ob.data.materials.append(material)
        ob.data.polygons[face_index].material_index=indices[material.as_pointer()]
        if role.startswith('interior-'):continue
        counts[role]=counts.get(role,0)+1;object_roles.setdefault(role,set()).add(ob.name)
nav['exteriorAppearance']={'scope':'house-and-extensions','defaults':{'walls':'brick','roof':'light'},'dormers':'always-tiled','faces':counts,'objects':{r:sorted(ns)for r,ns in object_roles.items()},'materials':{m.name:{'role':m['appearance_role'],'source':m['appearance_source_material']}for m in slots.values()}}
(OUT/'exterior-appearance.json').write_text(json.dumps(nav['exteriorAppearance'],indent=2)+'\n')
print('REDESIGN_APPEARANCE',counts,flush=True)
