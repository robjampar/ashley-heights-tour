"""Build stages, complete input fingerprints, verified output reuse and timings.

    Kept independent of Blender so the command-line runner and tests use the same
    dependency inventory as the model builder.
"""
from contextlib import contextmanager
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import time

MODULES = (
    'proposal_helpers.py', 'proposal_materials.py', 'proposal_front.py',
    'proposal_rear.py', 'proposal_loft.py', 'proposal_site.py',
    'proposal_frontage.py', 'proposal_facade.py', 'proposal_rear_finishes.py',
    'proposal_side_wing.py', 'proposal_kitchen_connection.py', 'proposal_roofs.py',
    'proposal_envelope_details.py', 'proposal_storey_closures.py',
    'proposal_roof_weathering.py', 'proposal_loft_roof_trim.py',
    'proposal_vegetation_clearance.py', 'proposal_foliage_detail.py',
    'proposal_boundary_foliage.py', 'proposal_courtyard.py',
    'proposal_forecourt.py', 'proposal_interior_details.py',
    'proposal_surface_junctions.py', 'proposal_architectural_lighting.py',
    'proposal_lifestyle.py', 'proposal_shared_lounge.py', 'proposal_housekeeping.py',
    'proposal_side_bathroom.py', 'proposal_original_rooms.py', 'proposal_basement.py',
    'proposal_roof_terrace.py', 'proposal_workshop.py', 'proposal_garden_levels.py',
    'proposal_appearance.py', 'proposal_kitchen_interiors.py', 'proposal_editability.py', 'proposal_edit_views.py', 'finish_extension_proposal.py',
)
PLANNING_OMISSIONS = {
    'proposal_rear.py', 'proposal_kitchen_connection.py',
    'proposal_roof_terrace.py', 'proposal_workshop.py',
}


def modules_for(variant):
    for module in MODULES:
        if variant == 'planning':
            if module in PLANNING_OMISSIONS:
                continue
            if module == 'proposal_appearance.py':
                yield 'proposal_planning.py'
        yield module


def sha256(path):
    with Path(path).open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def source_hashes(root, variant):
    paths = {
        'output-walkthrough/Ashley Heights.blend', 'output-walkthrough/geometry.json',
        'walkthrough/public/navigation.json', 'proposal/design-spec.json',
        'proposal/site-terrain.json', 'proposal/P4_site-feasibility.json',
        'proposal/P4_parking-validated.json', 'proposal/original-preservation.json',
        'scripts/build_model.py', 'scripts/build_extension_proposal.py',
        'scripts/build_support.py', 'scripts/blender_collections.py', 'scripts/blender_booleans.py', 'scripts/exterior_exposure.py',
    }
    if variant:
        paths.add(f'proposal/design-spec-{variant}.json')
    if variant == 'planning':
        paths.add('proposal/design-spec-compact.json')
    paths.update('scripts/' + name for name in modules_for(variant))
    paths.update(str(p.relative_to(root)) for p in (root / 'proposal/interiors/kitchen').rglob('*')
                 if p.is_file() and p.suffix in ('.json', '.png'))
    # These are optional in legacy reconstructions. Their appearance/disappearance
    # still changes the mapping and therefore invalidates the build.
    for name in ('proposal/P5_internal-garden-area.json',
                 'proposal/neighbours/site-trees.json',
                 'proposal/reference/roof-tile-colour-reference.png'):
        if (root / name).is_file():
            paths.add(name)
    baseline = json.loads((root / 'proposal/original-preservation.json').read_text())
    paths.update(baseline['files'])
    return {name: sha256(root / name) for name in sorted(paths)}


def atomic_json(path, value):
    path = Path(path)
    temporary = path.with_name(path.name + f'.{os.getpid()}.tmp')
    try:
        temporary.write_text(json.dumps(value, indent=2) + '\n')
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)


def blender_identity(binary):
    binary = Path(binary).resolve()
    stat = binary.stat()
    return {'path': str(binary), 'size': stat.st_size, 'mtime_ns': stat.st_mtime_ns}


def native_name(variant):
    if variant == 'planning':
        return 'Ashley Heights — Proposed (planning application)'
    return 'Ashley Heights — Proposed' + (f' ({variant})' if variant else '')


def output_dir(root, variant):
    return root / ('output-proposed-' + variant if variant else 'output-proposed')


def required_outputs(root, variant):
    out = output_dir(root, variant)
    stem = native_name(variant)
    suffix = '-' + variant if variant else ''
    return [out / name for name in (
        stem + '.blend', stem + '.glb', 'geometry.json', 'navigation.json',
        'build-report.json', 'build-inputs.json', 'original-preservation-check.json',
    )] + [root / f'walkthrough/public/proposal{suffix}.glb',
          root / f'walkthrough/public/proposal{suffix}-navigation.json']


def record_success(root, variant, binary, inputs):
    if source_hashes(root, variant) != inputs:
        raise RuntimeError('Inputs changed during the build; rebuild from current sources.')
    outputs = {str(p.relative_to(root)): sha256(p) for p in required_outputs(root, variant)}
    atomic_json(output_dir(root, variant) / 'build-cache.json', {
        'schema': 1, 'variant': variant, 'blender': blender_identity(binary),
        'inputs': inputs, 'outputs': outputs,
    })


def current_build(root, variant, binary):
    """Never infer freshness from timestamps or the existence of a .blend alone."""
    try:
        cached = json.loads((output_dir(root, variant) / 'build-cache.json').read_text())
        if not isinstance(cached, dict):
            return False, 'invalid build record'
        if cached.get('schema') != 1 or cached.get('variant') != variant:
            return False, 'no compatible successful build'
        if cached.get('blender') != blender_identity(binary):
            return False, 'Blender changed'
        if cached.get('inputs') != source_hashes(root, variant):
            return False, 'model inputs changed'
        expected = {str(p.relative_to(root)) for p in required_outputs(root, variant)}
        if set(cached.get('outputs', {})) != expected:
            return False, 'incomplete output manifest'
        for name, digest in cached['outputs'].items():
            if sha256(root / name) != digest:
                return False, 'output changed: ' + name
    except (OSError, ValueError, TypeError, KeyError):
        return False, 'missing or unreadable build record/input/output'
    return True, 'inputs and output checksums match'


class Timings:
    def __init__(self, path, **metadata):
        self.path = Path(path)
        self.metadata = metadata
        self.started = self.last = time.perf_counter()
        self.started_at = datetime.now(timezone.utc).isoformat()
        self.events = []
        self.stack = []

    def _add(self, name, started, depth, success=True):
        elapsed = time.perf_counter() - started
        self.events.append({'stage': name, 'seconds': round(elapsed, 4),
                            'depth': depth, 'success': success})
        print(f'STAGE_TIME {name} {elapsed:.3f}s', flush=True)
        self.last = time.perf_counter()

    def lap(self, name):
        self._add(name, self.last, len(self.stack))

    @contextmanager
    def phase(self, name):
        started = time.perf_counter()
        depth = len(self.stack)
        self.stack.append(name)
        success = False
        print('STAGE_START', name, flush=True)
        try:
            yield
            success = True
        finally:
            self.stack.pop()
            self._add(name, started, depth, success)

    def write(self, success):
        atomic_json(self.path, dict(self.metadata, started_at=self.started_at,
                    total_seconds=round(time.perf_counter() - self.started, 4),
                    success=success, stages=self.events))
