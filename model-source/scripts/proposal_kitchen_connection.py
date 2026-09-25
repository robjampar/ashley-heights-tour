"""Proposal-only kitchen connection to the new rear garden dining room.

Execute after proposal_side_wing.py (and rear finishes), before editability.
The existing window jambs and lintel define the opening: only the sill and
joinery are removed. Original scene objects/data remain unchanged. Geometry,
furniture collisions and the existing wall aperture are revised together.
"""
import copy as _kc_copy

_kc_wall = next(w for w in nav['walls'] if w['name'] == 'Kitchen rear')
_kc_old_opening = list(_kc_wall['openings'][0])
_kc_center, _kc_width, _kc_sill, _kc_head, _kc_kind = _kc_old_opening
assert _kc_kind == 'window' and abs(_kc_head-2.1) < .001, _kc_old_opening
_kc_left = _kc_wall['a'][0] + _kc_center-_kc_width/2
_kc_right = _kc_left+_kc_width
_kc_y = _kc_wall['a'][1]
_kc_meta = {v['object_name']:v for v in g['objects']}
_kc_removed = []
_kc_removed_assemblies = set()
_kc_reason = 'Direct kitchen–garden dining connection; retained rear-window jambs and lintel, new kitchen working run'


def _kc_bounds(ob):
    points = [ob.matrix_world @ Vector(p) for p in ob.bound_box]
    return [min(p[i] for p in points) for i in range(3)]+[max(p[i] for p in points) for i in range(3)]


def _kc_source_selected(ob):
    if ob.type != 'MESH':
        return False
    meta = _kc_meta.get(ob.name, {})
    name = meta.get('name', ob.get('source_name', ob.name))
    assembly = meta.get('assembly') or ob.get('assembly', '')
    if 'Through-floor lift' in name or assembly == 'Kitchen oven tower':
        return False
    b = _kc_bounds(ob)
    # Exact structural components: do not cut, shorten or remove either pier
    # or the original lintel. Their world-space source vertices are retained.
    if name in ('Kitchen rear | below 0', 'Kitchen rear | skirting below 0-1'):
        return True
    window_family = (name.startswith('Kitchen rear ') and not name.startswith('Kitchen rear |')) or name.startswith('Kitchen detail | Kitchen window')
    if window_family and b[0] > .85 and b[3] < 4.5 and b[1] > 8.5 and b[4] < 9.05 and b[5] < 2.11:
        return True
    if assembly.startswith(('Kitchen sink cabinets', 'Kitchen comparison | Inset sink',
                            'Kitchen comparison | Continuous rear worktop',
                            'Photo detail | Kitchen rear corner infill',
                            'Photo detail | Kitchen east ', 'Breakfast chair', 'Breakfast table')):
        return b[0] > .74 and b[3] < 5.01 and b[1] > 5.10 and b[4] < 8.72 and b[5] < 2.3
    # Small ungrouped kettle, mugs, taps, hob rings, drainer and fridge hardware
    # have generic names. Combine fittings provenance with a bounded volume;
    # do not rely on words such as "handle" shared by doors elsewhere.
    fitting = meta.get('layer', '').startswith('16 ') or any(c.name.startswith('16 ') for c in ob.users_collection)
    rear_fitting = b[0] >= .773 and b[3] <= 4.335 and b[1] >= 7.79 and b[4] <= 8.71 and b[2] >= -.01 and b[5] < 1.50
    east_fitting = b[0] >= 4.24 and b[3] <= 4.98 and b[1] >= 5.10 and b[4] <= 8.71 and b[2] >= -.01 and b[5] < 2.31
    return fitting and (rear_fitting or east_fitting)


for _kc_ob in original_objects:
    if not _kc_source_selected(_kc_ob):
        continue
    _kc_removed.append(_kc_ob.name)
    _kc_assembly = _kc_meta.get(_kc_ob.name, {}).get('assembly') or _kc_ob.get('assembly')
    if _kc_assembly:
        _kc_removed_assemblies.add(_kc_assembly)
    remove_from_proposal(_kc_ob, _kc_reason)

_kc_removed_set = set(_kc_removed)
_kc_revised_removed = []
for _kc_ob in list(scene.objects):
    # Rear-frame colour variants are independent copies made earlier in the
    # pipeline. Their explicit provenance survives Blender's name truncation.
    if _kc_ob.get('rear_finish_original_name') not in _kc_removed_set:
        continue
    _kc_revised_removed.append(_kc_ob.name)
    for _kc_collection in list(_kc_ob.users_collection):
        if _kc_collection.name.startswith('P'):
            _kc_collection.objects.unlink(_kc_ob)
    excluded.add(_kc_ob.name)

_kc_collision_names = _kc_removed_set | _kc_removed_assemblies
_kc_collision_removed = {}
for _kc_key in ('obstacles', 'segments'):
    _kc_collision_removed[_kc_key] = [v['name'] for v in nav[_kc_key] if v['name'] in _kc_collision_names]
    nav[_kc_key][:] = [v for v in nav[_kc_key] if v['name'] not in _kc_collision_names]
_kc_wall['openings'][0] = [_kc_center, _kc_width, 0, _kc_head, 'open']
_kc_wall['external'] = False
_kc_wall['proposal_note'] = 'Existing window width/head retained; sill removed into garden dining addition'

K = 'P17 Kitchen garden connection'
_kc_counter = mat('Kitchen honed warm quartz', (.67,.65,.59,1), .45)
_kc_metal = mat('Kitchen brushed stainless', (.46,.49,.48,1), .30, .8)
_kc_hob = mat('Kitchen induction glass', (.024,.029,.031,1), .19, .1)
_kc_ring = mat('Kitchen induction markings', (.22,.24,.24,1), .4)


def _kc_round(ob, width=.006):
    bevel = ob.modifiers.new('Kitchen eased edges', 'BEVEL')
    bevel.width = width
    bevel.segments = 2
    return ob


def _kc_front(name, x, y0, y1, z0, z1):
    _kc_round(box(name+' oak front', (x,(y0+y1)/2,(z0+z1)/2), (.026,y1-y0-.006,z1-z0-.006),oak,F))
    # Recessed dark finger grip remains inside the modeled cabinet bounds.
    box(name+' finger pull',(x-.014,(y0+y1)/2,z1-.026),(.012,min(.25,y1-y0-.05),.012),black,F)


# A flush piece fills the former cavity/sill, meeting both existing and new
# floor slabs. No raised threshold or invisible navigation-only bridge.
slab('Proposal | Kitchen garden flush threshold',[_kc_left,8.69,_kc_right,8.97],0,.14,stone,K)

# East galley: fridge, induction cooking, preparation, dishwasher and sink.
# Preserve the serving hatch at Y6.41..7.19; no new high cabinet covers it.
box('Proposal | Kitchen east working run recessed plinth',(4.68,7.21,.065),(.50,2.96,.13),black,F)
box('Proposal | Kitchen east working run cabinet carcass',(4.655,7.21,.505),(.57,2.96,.75),oak,F)
_kc_top = box('Proposal | Kitchen east working run quartz worktop',(4.635,7.21,.925),(.67,2.96,.05),_kc_counter,F)
cut(_kc_top,[4.425,7.52,4.835,8.12],.87,1.0)
_kc_round(_kc_top,.004)
# Carcass has the same true sink recess, leaving space below the basin.
_kc_carcass = next(o for o in scene.objects if o.get('source_name') == 'Proposal | Kitchen east working run cabinet carcass')
cut(_kc_carcass,[4.405,7.50,4.855,8.14],.70,1.0)
for _kc_i, (_kc_ya,_kc_yb) in enumerate(((5.73,6.45),(6.45,7.09),(7.09,7.69),(7.69,8.69))):
    if _kc_i == 0:
        for _kc_j, (_kc_z0,_kc_z1) in enumerate(((.14,.38),(.38,.62),(.62,.88))):
            _kc_front('Proposal | Kitchen east working run pan drawer '+str(_kc_j),4.327,_kc_ya,_kc_yb,_kc_z0,_kc_z1)
    else:
        _kc_front('Proposal | Kitchen east working run base door '+str(_kc_i),4.327,_kc_ya,_kc_yb,.14,.88)
obstacle('Proposal | Kitchen east working run',[4.30,5.73,4.97,8.69],0,.95)

box('Proposal | Kitchen fridge housing',(4.655,5.43,1.12),(.57,.60,2.24),oak,F)
_kc_front('Proposal | Kitchen fridge freezer',4.327,5.13,5.73,.14,.73)
_kc_front('Proposal | Kitchen fridge upper',4.327,5.13,5.73,.73,2.22)
box('Proposal | Kitchen fridge recessed plinth',(4.68,5.43,.065),(.50,.60,.13),black,F)
obstacle('Proposal | Kitchen fridge',[4.30,5.13,4.94,5.73],0,2.24)

# Four induction outlines and a central downdraft slot; low profile keeps the
# old hatch usable and views through the new rear opening unobstructed.
_kc_round(box('Proposal | Kitchen hob glass',(4.627,6.12,.961),(.54,.66,.022),_kc_hob,F),.014)
for _kc_x in (4.49,4.765):
    for _kc_yh in (5.96,6.28):
        _kc_radius=.090
        _kc_vertices=[(_kc_x+math.cos(i*math.tau/32)*r,_kc_yh+math.sin(i*math.tau/32)*r,.973) for r in (_kc_radius-.003,_kc_radius) for i in range(32)]
        mesh('Proposal | Kitchen hob induction ring',_kc_vertices,[(i,(i+1)%32,(i+1)%32+32,i+32) for i in range(32)],_kc_ring,F)
box('Proposal | Kitchen hob downdraft slot',(4.627,6.12,.974),(.028,.43,.004),black,F)

# A real recessed stainless bowl, not a filled rectangle over the countertop.
for _kc_suffix,_kc_c,_kc_d in (
    ('base',(4.63,7.82,.724),(.43,.62,.025)),
    ('west side',(4.4175,7.82,.82),(.025,.62,.19)),
    ('east side',(4.8425,7.82,.82),(.025,.62,.19)),
    ('south side',(4.63,7.5125,.82),(.43,.025,.19)),
    ('north side',(4.63,8.1275,.82),(.43,.025,.19))):
    box('Proposal | Kitchen sink '+_kc_suffix,_kc_c,_kc_d,_kc_metal,F)
for _kc_suffix,_kc_c,_kc_d in (
    ('west rim',(4.414,7.82,.954),(.024,.648,.014)),
    ('east rim',(4.846,7.82,.954),(.024,.648,.014)),
    ('south rim',(4.63,7.501,.954),(.456,.024,.014)),
    ('north rim',(4.63,8.139,.954),(.456,.024,.014))):
    box('Proposal | Kitchen sink '+_kc_suffix,_kc_c,_kc_d,_kc_metal,F)
cylinder('Proposal | Kitchen sink drain',(4.63,7.82,.739),.030,.004,black,F,20)
beam('Proposal | Kitchen sink mixer riser',(4.901,7.82,.95),(4.901,7.82,1.23),.030,_kc_metal,F)
beam('Proposal | Kitchen sink mixer spout',(4.901,7.82,1.23),(4.65,7.82,1.23),.030,_kc_metal,F)
beam('Proposal | Kitchen sink mixer nozzle',(4.65,7.82,1.23),(4.65,7.82,1.18),.030,_kc_metal,F)

# A compact work/storage island replaces the crowded breakfast table. Main
# family dining is immediately through the new opening, without extra stools
# narrowing either west-door approach or the 1.85m east circulation aisle.
box('Proposal | Kitchen island recessed plinth',(1.925,6.55,.065),(.80,1.35,.13),black,F)
_kc_round(box('Proposal | Kitchen island oak cabinet',(1.925,6.55,.505),(.95,1.50,.75),oak,F),.006)
_kc_round(box('Proposal | Kitchen island quartz top',(1.925,6.55,.925),(1.05,1.60,.05),_kc_counter,F),.007)
for _kc_i,(_kc_ya,_kc_yb) in enumerate(((5.80,6.55),(6.55,7.30))):
    for _kc_j,(_kc_za,_kc_zb) in enumerate(((.14,.38),(.38,.63),(.63,.88))):
        # East-facing fronts and pulls match the galley but face the work aisle.
        _kc_round(box('Proposal | Kitchen island drawer '+str(_kc_i)+'-'+str(_kc_j),(2.406,(_kc_ya+_kc_yb)/2,(_kc_za+_kc_zb)/2),(.026,_kc_yb-_kc_ya-.008,_kc_zb-_kc_za-.008),oak,F))
        box('Proposal | Kitchen island recessed grip',(2.422,(_kc_ya+_kc_yb)/2,_kc_zb-.026),(.008,.25,.012),black,F)
obstacle('Proposal | Kitchen island',[1.40,5.75,2.45,7.35],0,.95)

# Native kitchen fixtures: the retained paper pendant was an unlit opaque
# shell. Keep its shape and position; only the proposal gets translucent paper
# and a lamp. Surface downlights fit below the measured 2.598m ceiling without
# cutting retained structure, and their AREA sources sit below the lenses.
_kc_light_report={'ceiling_underside_m':2.598,'task_fixtures':[]}
_kc_lens=mat('Kitchen warm opal lens',(.94,.83,.63,1),.4,0,2.8)
for _kc_label,_kc_lx,_kc_ly,_kc_watts in (
    ('south working run',3.90,6.25,28),
    ('north working run',3.90,7.80,28),
    ('island',1.65,6.55,22),
):
    _kc_tag='Kitchen '+_kc_label+' ceiling light'
    _kc_light_parts=[
        cylinder('Proposal | '+_kc_tag+' housing',(_kc_lx,_kc_ly,2.571),.085,.046,plaster,I,24),
        cylinder('Proposal | '+_kc_tag+' lens',(_kc_lx,_kc_ly,2.543),.065,.009,_kc_lens,I,24),
    ]
    _kc_ld=bpy.data.lights.new('Proposal | '+_kc_tag,'AREA')
    _kc_ld.energy=_kc_watts;_kc_ld.color=(1,.88,.73);_kc_ld.shape='DISK';_kc_ld.size=.12
    _kc_lo=bpy.data.objects.new(_kc_ld.name,_kc_ld);collection(I).objects.link(_kc_lo)
    _kc_lo.location=(_kc_lx,_kc_ly,2.531)
    for _kc_part in [*_kc_light_parts,_kc_lo]:_kc_part['proposal_light_fixture']=_kc_tag
    _kc_light_report['task_fixtures'].append({'name':_kc_tag,'position_m':list(_kc_lo.location),'power_W':_kc_watts,'diffuser_clearance_m':.0075})

_kc_original_shade=scene.objects.get('Kitchen detail | Kitchen paper pendant shell')
assert _kc_original_shade is not None,'Retained kitchen pendant missing'
_kc_paper=bpy.data.materials.new('Proposal | Kitchen translucent paper shade');_kc_paper.use_nodes=True
_kc_nodes=_kc_paper.node_tree.nodes;_kc_links=_kc_paper.node_tree.links
_kc_nodes.clear()
_kc_trans=_kc_nodes.new('ShaderNodeBsdfTranslucent');_kc_trans.inputs['Color'].default_value=(.78,.73,.62,1)
_kc_diff=_kc_nodes.new('ShaderNodeBsdfPrincipled');_kc_diff.inputs['Base Color'].default_value=(.78,.73,.62,1);_kc_diff.inputs['Roughness'].default_value=.8;_kc_diff.inputs['Metallic'].default_value=0
_kc_mix=_kc_nodes.new('ShaderNodeMixShader');_kc_mix.inputs[0].default_value=.70
_kc_out=_kc_nodes.new('ShaderNodeOutputMaterial')
_kc_links.new(_kc_diff.outputs[0],_kc_mix.inputs[1]);_kc_links.new(_kc_trans.outputs[0],_kc_mix.inputs[2]);_kc_links.new(_kc_mix.outputs[0],_kc_out.inputs['Surface'])
_kc_paper.diffuse_color=(.78,.73,.62,1);materials[_kc_paper.name]=_kc_paper;PALETTE[_kc_paper.name]=(.78,.73,.62,1)
_kc_shade=revised_copy(_kc_original_shade,'Retained pendant shape; translucent paper and a real light source in proposal only')
_kc_shade.name='Proposal | Kitchen retained paper pendant luminous shade';_kc_shade['source_name']=_kc_shade.name
_kc_shade.data.materials.clear();_kc_shade.data.materials.append(_kc_paper)
_kc_pendant_tag='Kitchen retained paper pendant light'
_kc_shade['proposal_light_fixture']=_kc_pendant_tag
_kc_centre=(2.635,5.440370,2.17)
# A small closed, emissive bulb sits inside the retained shade. Its point
# source represents the same emitter, so this bulb does not shadow that source.
_kc_bulb_v=[]
for _kc_j in range(9):
    _kc_theta=math.pi*_kc_j/8
    for _kc_i in range(20):
        _kc_a=math.tau*_kc_i/20
        _kc_bulb_v.append((_kc_centre[0]+.029*math.sin(_kc_theta)*math.cos(_kc_a),_kc_centre[1]+.029*math.sin(_kc_theta)*math.sin(_kc_a),_kc_centre[2]+.040*math.cos(_kc_theta)))
_kc_bulb=mesh('Proposal | Kitchen retained pendant bulb',_kc_bulb_v,[(j*20+i,j*20+(i+1)%20,(j+1)*20+(i+1)%20,(j+1)*20+i)for j in range(8)for i in range(20)],_kc_lens,I)
_kc_bulb.visible_shadow=False;_kc_bulb['proposal_light_fixture']=_kc_pendant_tag
for _kc_poly in _kc_bulb.data.polygons:_kc_poly.use_smooth=True
_kc_ld=bpy.data.lights.new('Proposal | Kitchen retained pendant source','POINT');_kc_ld.energy=18;_kc_ld.color=(1,.86,.68);_kc_ld.shadow_soft_size=.027
_kc_lo=bpy.data.objects.new(_kc_ld.name,_kc_ld);collection(I).objects.link(_kc_lo);_kc_lo.location=_kc_centre;_kc_lo['proposal_light_fixture']=_kc_pendant_tag
_kc_light_report['pendant']={'position_m':list(_kc_centre),'power_W':18,'original_shade_preserved_in_original':True,'proposal_shade_translucent':True}
# Register after proposal_envelope_details has initialized the viewer lights.
_kc_browser_light_candidates=[
    {'name':'Kitchen working run','position':[3.75,7.10,2.32],'range':3.4,'intensity':.65},
    {'name':'Kitchen island and pendant','position':[1.9,6.25,2.28],'range':2.7,'intensity':.50},
]
# End native kitchen fixtures.

_kc_retained = ('Kitchen rear | pier 0','Kitchen rear | end','Kitchen rear | lintel 0')
assert all(n in scene.objects for n in _kc_retained), 'Kitchen jamb or lintel inadvertently removed'
assert not any(n in scene.objects for n in _kc_removed), 'Removed kitchen original still linked to proposal'
assert not any(o.get('rear_finish_original_name') in _kc_removed_set for o in scene.objects), 'Floating colour-variant joinery'
_kc_report = {'revision':spec['revision'],'opening_bounds_m':[_kc_left,8.705,0,_kc_right,8.935,_kc_head],
    'opening_width_m':_kc_width,'retained_jambs_lintel':list(_kc_retained),
    'removed_original_meshes':_kc_removed,'removed_colour_variant_meshes':_kc_revised_removed,
    'removed_navigation':_kc_collision_removed,'new_collisions':[v for v in new_obstacles if v['name'].startswith('Proposal | Kitchen')],
    'clear_aisles_m':{'east_working_aisle':1.85,'island_to_rear_opening':8.705-7.35,'west_side':1.40-.115},
    'original_oven_retained':True,'original_through_floor_lift_retained':True,
    'existing_serving_hatch_preserved':True,'roof_changed':False,'lighting':_kc_light_report,
    'source_status':'Proposal-only source geometry; isolated native aperture and route audit runs separately'}
spec['kitchenGardenConnection'] = {k:v for k,v in _kc_report.items() if k not in ('removed_original_meshes','removed_colour_variant_meshes','removed_navigation')}
(OUT/'kitchen-connection-review.json').write_text(json.dumps(_kc_report,indent=2)+'\n')
print('PROPOSAL_KITCHEN_CONNECTION',json.dumps({'widthM':_kc_width,'originalMeshesOmitted':len(_kc_removed),'revisedFramesOmitted':len(_kc_revised_removed)}),flush=True)
