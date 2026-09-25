"""Tag house exterior surfaces for instant viewer finish choices; dormers stay tiled.

Materials are copied per role so neither furniture/interior surfaces nor the
retained original scene can be repainted by the viewer's facade controls.
"""
from exterior_exposure import ExteriorExposure

_appearance_nav = dict(nav, planRooms=list(nav.get('planRooms', [])) + list(new_rooms))
# These retained walls cross a new enclosure boundary. A single material on a
# long polygon cannot distinguish its exposed strip from the room behind it.
# Cut at the actual joins (as the planning finish pass does), without moving
# any surface. Applying the same planes again is safe on an appearance refresh.
_appearance_side_front = float(spec.get('sideWing', {}).get('front_setback_m', 0))
_appearance_joins = {
    'Garage family partition | end': [(_appearance_side_front - .115), (_appearance_side_front + .115)],
    'Exterior brick floor band First west': [(_appearance_side_front - .115), (_appearance_side_front + .115)],
    # The projecting entrance masonry returns into the original 230 mm facade.
    'House front centre | corrected wall 1': [-.115],
    'First front | corrected wall 4': [-.115],
}
for _ap_ob in list(scene.objects):
    _ap_join_name = _ap_ob.name.removeprefix('Proposal revision | ')
    if _ap_ob.type != 'MESH' or _ap_join_name not in _appearance_joins:
        continue
    if _ap_join_name.startswith(('Garage family', 'Exterior brick')) and not _appearance_side_front:
        continue
    if _ap_ob in original_objects:
        _ap_ob = revised_copy(_ap_ob, 'Separate exterior and interior finishes at enclosure joins')
    elif _ap_ob.data.users > 1:
        _ap_ob.data = _ap_ob.data.copy()
    import bmesh
    _ap_bm = bmesh.new()
    _ap_bm.from_mesh(_ap_ob.data)
    for _ap_y in _appearance_joins[_ap_join_name]:
        bmesh.ops.bisect_plane(
            _ap_bm, geom=list(_ap_bm.verts) + list(_ap_bm.edges) + list(_ap_bm.faces),
            plane_co=_ap_ob.matrix_world.inverted() @ Vector((0, _ap_y, 0)),
            plane_no=_ap_ob.matrix_world.to_3x3().transposed() @ Vector((0, 1, 0)), dist=1e-6)
    _ap_bm.to_mesh(_ap_ob.data)
    _ap_bm.free()
    _ap_ob.data.update()

_appearance_exposure = ExteriorExposure(bpy.data, scene, original, _appearance_nav, build_timer)
_appearance_materials = {}
_appearance_counts = {}
_appearance_objects = {}
_appearance_wall_names = {'Red brown brick', 'Warm plaster', plaster, white,
                          'Proposal | White internal walls'}
_appearance_interior_material = materials.get('Proposal | White internal walls')
if _appearance_interior_material is None:
    _appearance_interior_material = materials['Warm plaster'].copy()
    _appearance_interior_material.name = 'Proposal | White internal walls'
    _appearance_interior_material.diffuse_color = (.84, .84, .82, 1)
    if _appearance_interior_material.use_nodes:
        for _ap_node in _appearance_interior_material.node_tree.nodes:
            if _ap_node.type == 'BSDF_PRINCIPLED':
                _ap_node.inputs['Base Color'].default_value = (.84, .84, .82, 1)
    materials[_appearance_interior_material.name] = _appearance_interior_material
    PALETTE[_appearance_interior_material.name] = [.84, .84, .82, 1]
_appearance_roof_material = materials[nav['planningApplication']['roof_material']] if PLANNING else materials[proposal_roof_material]
_appearance_hanging_name = _appearance_roof_material.name + ' - vertical hanging'
_appearance_hanging_material = materials.get(_appearance_hanging_name)
if _appearance_hanging_material is None:
    _appearance_hanging_material = _appearance_roof_material.copy()
    _appearance_hanging_material.name = _appearance_hanging_name
    materials[_appearance_hanging_name] = _appearance_hanging_material
    PALETTE[_appearance_hanging_name] = list(_appearance_hanging_material.diffuse_color)


def _appearance_material(source, role):
    key = (source.as_pointer(), role)
    if key not in _appearance_materials:
        result = source.copy()
        result.name = 'Appearance | ' + role + ' | ' + source.name
        result['appearance_role'] = role
        result['appearance_source_material'] = source.name
        materials[result.name] = result
        PALETTE[result.name] = list(result.diffuse_color)
        _appearance_materials[key] = result
    return _appearance_materials[key]


def _appearance_dormer_panel(name):
    return (('dormer' in name and any(part in name for part in (
        'cheek', 'face pier', 'face sill', 'face head', 'face end pier',
        'dormer sill', 'window head', 'south panel', 'north panel',
        'glazing head', 'wall cladding', 'roof closure',
    ))) or name.startswith((
        'proposal | loft passage east wall cladding',
        'proposal | north east elevation closure',
        'proposal | storey edge closure | attached loft east half-width',
    )))


def _appearance_dormer_outward(name, normal):
    # These construction names fix the exterior direction. The eaves-room plan
    # extends under the adjoining pitched roof and is not an exterior boundary.
    # Still cast rays, so the parts below that roof retain their inside finish.
    for prefix, axis, direction in (
        ('original loft dormer west cheek', 'x', -1),
        ('original loft dormer east cheek', 'x', 1),
        ('loft passage east wall cladding', 'x', 1),
        ('rear dormer face', 'y', 1),
        ('wing dormer face', 'x', 1),
        ('wing dormer south cheek', 'y', -1),
        ('wing dormer north cheek', 'y', 1),
        ('wing dormer link north cheek', 'y', 1),
        ('loft garden dormer south panel', 'x', 1),
        ('loft garden dormer north panel', 'x', 1),
    ):
        if name.startswith('proposal | ' + prefix):
            return getattr(normal, axis) * direction > .7
    return False


def _appearance_constructed_side(name, point, normal):
    """Known enclosure boundaries take precedence over sampled visibility.

    Room labels include the entrance recess and the garage roof's footprint;
    neither is an interior volume above/outside the actual enclosing surfaces.
    Conversely, a glimpse through a portal must not brick its interior pier.
    None leaves the general exposure classifier in charge.
    """
    name = name.removeprefix('proposal revision | ')
    if name == 'proposal | north ground facade end pier':
        return False  # between the wing, gym and attached entrance gallery
    if name == 'proposal | entrance bay north return' and abs(normal.y) > .7:
        return normal.y > 0
    if name == 'proposal | west upper principal facade above wing roof' and abs(normal.x) > .7:
        return normal.x < 0
    if name in ('garage family partition | end', 'exterior brick floor band first west'):
        if _appearance_side_front and normal.x < -.7:
            return point.y < _appearance_side_front - .115 - 1e-4
    if name in ('house front centre | corrected wall 1', 'first front | corrected wall 4'):
        if normal.x < -.7:
            return point.y < -.115 - 1e-4
    return None


for _ap_ob in list(scene.objects):
    if _ap_ob.type != 'MESH' or not _ap_ob.data.polygons or _ap_ob.hide_render:
        continue
    if _appearance_exposure.category(_ap_ob, None) in ('out', 'veg'):
        continue
    _ap_name = _ap_ob.name.lower()
    _ap_collections = _appearance_exposure.memberships.get(_ap_ob.as_pointer(), ())
    if any(c.name.startswith(('P60', 'P70')) for c in _ap_collections):
        continue
    if any(part in _ap_name for part in ('lining', 'ceiling', 'soffit', 'skirting', 'riser', 'tread', 'handrail', 'baluster')):
        continue
    _ap_oak = _ap_name.startswith((
        'proposal | west north oak band', 'proposal | west north brick wall',
        'proposal | side wing front oak cladding', 'proposal | side wing front brick facing',
    ))
    _ap_detail = _ap_name.startswith(('proposal | northern oak cladding seam', 'proposal | side wing front oak board'))
    _ap_dormer = _appearance_dormer_panel(_ap_name)
    _ap_nm = _ap_ob.matrix_world.to_3x3().inverted().transposed()
    _ap_assignments = []
    for _ap_face in _ap_ob.data.polygons:
        _ap_mat = _ap_ob.data.materials[_ap_face.material_index] if _ap_ob.data.materials else None
        if not _ap_mat:
            continue
        _ap_mname = _ap_mat.name
        _ap_hanging = 'vertical hanging' in _ap_mname.lower()
        _ap_tiled = 'Slate roof' in _ap_mname or 'Weathered brown-grey roof tiles' in _ap_mname
        _ap_role = None
        if _ap_detail:
            _ap_role = 'oak-detail'
        elif _ap_tiled:
            _ap_role = 'dormer' if _ap_hanging or _ap_dormer else 'roof'
        elif _ap_mname in _appearance_wall_names or _ap_oak or (_ap_dormer and _ap_mname == black):
            _ap_center = _ap_ob.matrix_world @ _ap_face.center
            _ap_normal = (_ap_nm @ _ap_face.normal).normalized()
            _ap_side = _appearance_constructed_side(_ap_name, _ap_center, _ap_normal)
            if _ap_side is False:
                _ap_assignments.append((_ap_face.index, _appearance_interior_material, None))
                continue
            _ap_samples = [_ap_center]
            if _ap_face.area < .6 or _ap_dormer:
                _ap_samples += [(_ap_ob.matrix_world @ _ap_ob.data.vertices[i].co).lerp(_ap_center, .15) for i in _ap_face.vertices]
            # These two purpose-built panels explicitly identify their street-facing
            # side; the room-outline veto can otherwise swallow the recessed oak band.
            _ap_panel_front = _ap_oak and (_ap_normal.x < -.7 if 'west north' in _ap_name else _ap_normal.y < -.7)
            _ap_dormer_outward = _appearance_dormer_outward(_ap_name, _ap_normal)
            if _ap_side is True or _ap_panel_front or any(_appearance_exposure.sees_outside(q, _ap_normal, room_veto=not _ap_dormer_outward) for q in _ap_samples):
                _ap_role = 'dormer' if _ap_dormer else 'oak-panel' if _ap_oak else 'wall'
        if _ap_role:
            # A dormer face always uses a roof-tile material, even in the render/oak scheme.
            _ap_source = _appearance_hanging_material if _ap_role == 'dormer' else _ap_mat
            _ap_assignments.append((_ap_face.index, _appearance_material(_ap_source, _ap_role), _ap_role))
    if not _ap_assignments:
        continue
    if _ap_ob in original_objects:
        _ap_ob = revised_copy(_ap_ob, 'Separate house exterior finish options; original appearance retained')
    elif _ap_ob.data.users > 1:
        _ap_ob.data = _ap_ob.data.copy()
    _ap_slots = {m.as_pointer(): i for i, m in enumerate(_ap_ob.data.materials) if m}
    for _ap_index, _ap_material, _ap_role in _ap_assignments:
        if _ap_material.as_pointer() not in _ap_slots:
            _ap_slots[_ap_material.as_pointer()] = len(_ap_ob.data.materials)
            _ap_ob.data.materials.append(_ap_material)
        _ap_ob.data.polygons[_ap_index].material_index = _ap_slots[_ap_material.as_pointer()]
        if _ap_role:
            _appearance_counts[_ap_role] = _appearance_counts.get(_ap_role, 0) + 1
            _appearance_objects.setdefault(_ap_role, set()).add(_ap_ob.name)

nav['exteriorAppearance'] = {
    'scope': 'house-and-extensions',
    'defaults': {'walls': 'brick' if PLANNING else 'render-oak', 'roof': 'light' if PLANNING else 'dark'},
    'dormers': 'always-tiled',
    'faces': _appearance_counts,
    'objects': {role: sorted(names) for role, names in _appearance_objects.items()},
    'materials': {m.name: {'role': m['appearance_role'], 'source': m['appearance_source_material']}
                  for m in _appearance_materials.values()},
}
(OUT / 'exterior-appearance.json').write_text(json.dumps(nav['exteriorAppearance'], indent=2) + '\n')
print('EXTERIOR_APPEARANCE', json.dumps(_appearance_counts), flush=True)
