"""Adopted proposal-only bronze-black finish on retained rear joinery.

Integrated after the facade alterations. Existing apertures, white internal
trim, masonry, panes and hinge geometry are retained. Only copied mesh material
slots are changed; never edit a shared original object or material in place.
"""
import copy as _rear_copy
import json as _rear_json


def apply_rear_finishes(original_objects, scene, nav, materials, finish_name,
                        revised_copy, excluded, report_path=None):
    finish = materials[finish_name]
    hidden = set(nav.get('hiddenObjects', []))
    report = {'option': 'Bronze-black retained rear window and French-door frames',
              'status': 'adopted', 'sourceUpdatedAt': nav.get('modelUpdatedAt'), 'changed': [],
              'skippedHiddenLegacy': [], 'maximumWorldVertexShiftM': 0.0,
              'interactiveDoors': [], 'geometryOnlyMaterialChanges': True}
    remap = {}
    source_door_specs = _rear_copy.deepcopy(nav.get('interactiveDoors', []))
    original_slots = {}

    def frame_family(name):
        if name.startswith(('Rear bay detail |', 'Drawing rear detail |')):
            return True
        if name.startswith('Kitchen comparison | Utility window'):
            return 'board' not in name.lower()
        if name.startswith('Kitchen detail | Kitchen window'):
            return 'board' not in name.lower()
        if name.startswith(('Garage rear', 'Utility rear', 'Kitchen rear',
                            'Drawing rear', 'Bedroom 3 rear', 'Principal rear',
                            'Bathroom balcony', 'En suite balcony',
                            'Bedroom 3 balcony door', 'Principal balcony door')):
            return any(token in name.lower() for token in (
                'frame jamb', 'frame rail', 'casement mullion', 'upper vent rail',
                'glazing bar', 'window latch', 'glazed door stile',
                'glazed door rail', 'glazed door lower panel'))
        return False

    for ob in original_objects:
        if ob.type != 'MESH' or not frame_family(ob.name):
            continue
        if ob.name in hidden or ob.hide_render:
            report['skippedHiddenLegacy'].append(ob.name)
            continue
        if ob.name in excluded or ob.name not in scene.objects:
            continue
        slots = [i for i, material in enumerate(ob.data.materials)
                 if material is not None and material.name == 'White joinery']
        if not slots:
            continue
        world = [ob.matrix_world @ v.co for v in ob.data.vertices]
        # Names are the primary selector; bounds stop accidental same-name
        # interior/front components entering this tightly scoped finish option.
        bounds = [min(p[i] for p in world) for i in range(3)] + [max(p[i] for p in world) for i in range(3)]
        if bounds[1] < 7.70 or bounds[4] > 10.60 or bounds[0] < -5.5 or bounds[3] > 14.2 or bounds[5] > 5.30:
            continue
        original_slots[ob.name] = [m.name if m else None for m in ob.data.materials]
        new = revised_copy(ob, 'Adopted bronze-black retained rear joinery; geometry and apertures unchanged')
        assert new.data is not ob.data, 'Rear finishing requires independent mesh data'
        for index in slots:
            new.data.materials[index] = finish
        new['rear_finish_original_name'] = ob.name
        new['editing_note'] = 'Proposal-only colour finish; original world geometry retained exactly.'
        shift = max(((new.matrix_world @ v.co) - p).length for v, p in zip(new.data.vertices, world))
        assert shift < 1e-7, (ob.name, shift)
        report['maximumWorldVertexShiftM'] = max(report['maximumWorldVertexShiftM'], shift)
        assert len(new.data.vertices) == len(ob.data.vertices)
        assert [list(p.vertices) for p in new.data.polygons] == [list(p.vertices) for p in ob.data.polygons]
        assert [p.material_index for p in new.data.polygons] == [p.material_index for p in ob.data.polygons]
        remap[ob.name] = new.name
        report['changed'].append({'original': ob.name, 'copy': new.name,
                                  'slots': slots, 'worldBounds': bounds,
                                  'vertices': len(new.data.vertices)})

    for before, door in zip(source_door_specs, nav.get('interactiveDoors', [])):
        door['members'] = [remap.get(name, name) for name in door['members']]
        assert len(door['members']) == len(before['members'])
        assert {k:v for k,v in door.items() if k != 'members'} == {k:v for k,v in before.items() if k != 'members'}
        changed = sum(a != b for a,b in zip(before['members'], door['members']))
        if changed:
            missing = [name for name in door['members'] if name not in scene.objects]
            assert not missing, (door['id'], missing)
            report['interactiveDoors'].append({'id': door['id'], 'members': len(door['members']),
                                               'remappedMembers': changed, 'missingMembers': missing,
                                               'hingeAndMotionUnchanged': True})
    for ob in original_objects:
        if ob.name in original_slots:
            assert [m.name if m else None for m in ob.data.materials] == original_slots[ob.name]
    report['changedObjects'] = len(report['changed'])
    report['remappedDoorMembers'] = sum(d['remappedMembers'] for d in report['interactiveDoors'])
    report['originalMaterialSlotsUnchanged'] = True
    if report_path:
        report_path.write_text(_rear_json.dumps(report, indent=2) + '\n')
    return report


# Compatible with the builder's existing exec-module convention, but inert on
# an ordinary import. Included in the master after proposal_facade.py.
if all(name in globals() for name in ('original_objects','scene','nav','materials','black','revised_copy','excluded','OUT')):
    rear_finish_report = apply_rear_finishes(original_objects, scene, nav, materials,
                                           black, revised_copy, excluded,
                                           OUT / 'rear-finish-review.json')
