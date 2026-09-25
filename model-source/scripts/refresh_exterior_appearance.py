"""Refresh only exterior material tags on a verified completed model.

Blender --background --python-exit-code 1 --python scripts/refresh_exterior_appearance.py -- planning

Refuses geometry/specification changes, modified outputs and incomplete builds.
The final native scene plus its exported geometry/navigation form the checkpoint;
no architecture or terrain modules are replayed.
"""
import argparse
import json
import math
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from build_support import (Timings, atomic_json, blender_identity, native_name,
                           output_dir, record_success, required_outputs, sha256,
                           source_hashes)

APPEARANCE_INPUTS = {'scripts/proposal_appearance.py', 'scripts/exterior_exposure.py'}


def validate_checkpoint(root, variant, binary):
    out = output_dir(root, variant)
    try:
        cached = json.loads((out / 'build-cache.json').read_text())
        previous = json.loads((out / 'build-inputs.json').read_text())
        current = source_hashes(root, variant)
        if cached.get('schema') != 1 or cached.get('variant') != variant or cached.get('inputs') != previous:
            raise ValueError('No compatible completed model')
        if cached.get('blender') != blender_identity(binary):
            raise ValueError('Blender changed')
        changed = {name for name in set(previous) | set(current) if previous.get(name) != current.get(name)}
        if changed - APPEARANCE_INPUTS:
            raise ValueError('Architecture/build inputs changed: ' + ', '.join(sorted(changed - APPEARANCE_INPUTS)))
        expected = {str(p.relative_to(root)) for p in required_outputs(root, variant)}
        if set(cached.get('outputs', {})) != expected:
            raise ValueError('Incomplete output manifest')
        for name, digest in cached['outputs'].items():
            if sha256(root / name) != digest:
                raise ValueError('Output changed: ' + name)
        return current
    except (OSError, ValueError, TypeError, AttributeError, KeyError) as error:
        raise RuntimeError(f'Cannot refresh finishes: {error}. Run a normal model build first.') from error


def main():
    import bpy
    from mathutils import Vector
    from blender_collections import collection_memberships
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('variant', choices=('planning', 'compact'))
    args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
    variant = args.variant
    out = output_dir(ROOT, variant)
    timer = Timings(out / 'appearance-refresh-timings.json', variant=variant)
    success = False
    try:
        with timer.phase('validate_checkpoint'):
            inputs = validate_checkpoint(ROOT, variant, bpy.app.binary_path)
            g = json.loads((out / 'geometry.json').read_text())
            nav = json.loads((out / 'navigation.json').read_text())
            previous_report = json.loads((out / 'build-report.json').read_text())
        with timer.phase('load_completed_model'):
            bpy.ops.wm.open_mainfile(filepath=str(out / (native_name(variant) + '.blend')))
        (out / 'build-cache.json').unlink(missing_ok=True)
        scene = bpy.data.scenes['08 Proposed extensions']
        original = bpy.data.scenes['01 Exterior']
        bpy.context.window.scene = scene
        with timer.phase('restore_source_materials'):
            tagged_names = {m.name for m in bpy.data.materials if m.get('appearance_role')}
            # Restore source finishes while preserving all geometry/transforms.
            for obj in scene.objects:
                if obj.type != 'MESH':
                    continue
                restored = False
                for index, material in enumerate(obj.data.materials):
                    if material and material.get('appearance_role'):
                        obj.data.materials[index] = bpy.data.materials[material['appearance_source_material']]
                        restored = True
                if not restored:
                    continue
                # Repeated refreshes must not accumulate duplicate source slots.
                unique, indices, remap = [], {}, {}
                for index, material in enumerate(obj.data.materials):
                    key = material.as_pointer() if material else None
                    if key not in indices:
                        indices[key] = len(unique)
                        unique.append(material)
                    remap[index] = indices[key]
                if len(unique) != len(obj.data.materials):
                    face_slots = [remap[face.material_index] for face in obj.data.polygons]
                    obj.data.materials.clear()
                    for material in unique:
                        obj.data.materials.append(material)
                    for face, index in zip(obj.data.polygons, face_slots):
                        face.material_index = index
            for material in list(bpy.data.materials):
                if material.get('appearance_role') and material.users == 0:
                    bpy.data.materials.remove(material)
            palette = {name: value for name, value in nav['materials'].items() if name not in tagged_names}
        changes = list(g['proposal']['changes'])
        excluded = {change['original'] for change in changes}
        collection_map = {c.name: c for c in bpy.data.collections}

        def collection(name):
            if name not in collection_map:
                result = bpy.data.collections.new(name)
                scene.collection.children.link(result)
                collection_map[name] = result
            return collection_map[name]

        def revised_copy(obj, reason):
            if obj.name not in excluded:
                # The final editability stage nests retained pieces in P00 children.
                for owner in tuple(obj.users_collection):
                    if owner.name.startswith('P'):
                        owner.objects.unlink(obj)
                excluded.add(obj.name)
                changes.append({'original': obj.name, 'action': 'omitted in proposal only', 'reason': reason})
            result = obj.copy()
            result.data = obj.data.copy()
            result.name = 'Proposal revision | ' + obj.name
            result['source_name'] = result.name
            collection('P01 Local roof and stair alterations').objects.link(result)
            return result

        # All upstream accumulators have already been merged into the saved nav/g.
        # Empty deltas keep the shared exporter from appending them a second time.
        state = dict(
            bpy=bpy, json=json, math=math, Vector=Vector,
            ROOT=ROOT, BASE=ROOT / 'output-walkthrough', OUT=out,
            VARIANT=variant, VARIANT_SUFFIX='-' + variant, PLANNING=variant == 'planning',
            scene=scene, original=original, original_objects=list(original.objects),
            spec=g['proposal']['brief'], g=g, nav=nav, PALETTE=palette,
            materials={m.name: m for m in bpy.data.materials},
            white='Proposal | Limestone render', plaster='Proposal | Loft plaster',
            black='Proposal | Bronze black frames', proposal_roof_material='Proposal | Slate roof anthracite',
            new_rooms=[], new_surfaces=[], new_segments=[], new_obstacles=[], new_views=[], new_ramps=[], proposed_doors=[],
            changes=changes, excluded=excluded, collection=collection, revised_copy=revised_copy,
            collection_memberships=collection_memberships, build_timer=timer, build_inputs=inputs,
            planning_source_hashes=lambda: source_hashes(ROOT, variant),
            hashlib=__import__('hashlib'),
        )
        with timer.phase('tag_exterior_surfaces'):
            path = ROOT / 'scripts/proposal_appearance.py'
            exec(compile(path.read_text(), str(path), 'exec'), state)
        # The shared exporter recreates these generated review aids.
        camera = bpy.data.objects.get('Proposal | Gate arrival review')
        if camera is not None:
            camera_data = camera.data
            bpy.data.objects.remove(camera, do_unlink=True)
            if camera_data.users == 0:
                bpy.data.cameras.remove(camera_data)
        note = bpy.data.texts.get('PROPOSED DESIGN — START HERE')
        if note is not None:
            bpy.data.texts.remove(note)
        with timer.phase('export_refreshed_model'):
            path = ROOT / 'scripts/finish_extension_proposal.py'
            exec(compile(path.read_text(), str(path), 'exec'), state)
        # Those counts describe the architecture, not this material-only delta.
        report = json.loads((out / 'build-report.json').read_text())
        for key in ('newSurfaces', 'newSegments', 'newObstacles', 'newDoors', 'newRamps'):
            report[key] = previous_report[key]
        report['refresh'] = 'exterior-appearance'
        atomic_json(out / 'build-report.json', report)
        with timer.phase('verify_and_record_outputs'):
            record_success(ROOT, variant, bpy.app.binary_path, inputs)
        success = True
    finally:
        timer.write(success)


if __name__ == '__main__':
    main()
