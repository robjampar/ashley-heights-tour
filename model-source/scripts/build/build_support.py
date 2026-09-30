"""Build stages, complete input fingerprints, verified output reuse and timings.

    Kept independent of Blender so the command-line runner and tests use the same
    dependency inventory as the model builder.
"""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from contextlib import contextmanager
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import time

MODULES = (
    'model/proposal_helpers.py', 'model/proposal_materials.py', 'model/proposal_front.py',
    'model/proposal_rear.py', 'model/proposal_loft.py', 'model/proposal_site.py',
    'model/proposal_frontage.py', 'model/proposal_facade.py', 'model/proposal_rear_finishes.py',
    'model/proposal_side_wing.py', 'model/proposal_kitchen_connection.py', 'model/proposal_roofs.py',
    'model/proposal_envelope_details.py', 'model/proposal_storey_closures.py',
    'model/proposal_roof_weathering.py', 'model/proposal_loft_roof_trim.py',
    'model/proposal_vegetation_clearance.py', 'model/proposal_foliage_detail.py',
    'model/proposal_boundary_foliage.py', 'model/proposal_courtyard.py',
    'model/proposal_forecourt.py', 'interiors/proposal_interior_details.py',
    'model/proposal_surface_junctions.py', 'model/proposal_architectural_lighting.py',
    'model/proposal_lifestyle.py', 'model/proposal_shared_lounge.py', 'model/proposal_housekeeping.py',
    'model/proposal_side_bathroom.py', 'model/proposal_original_rooms.py', 'model/proposal_basement.py',
    'model/proposal_roof_terrace.py', 'model/proposal_workshop.py', 'model/proposal_garden_levels.py',
    'model/proposal_appearance.py', 'interiors/proposal_kitchen_interiors.py', 'interiors/proposal_principal_interiors.py', 'interiors/proposal_leisure_interiors.py', 'model/proposal_garden_stone.py', 'model/proposal_editability.py', 'model/proposal_edit_views.py', 'build/finish_extension_proposal.py',
)
PLANNING_OMISSIONS = {
    'model/proposal_rear.py', 'model/proposal_kitchen_connection.py',
    'model/proposal_roof_terrace.py', 'model/proposal_workshop.py',
}


def modules_for(variant):
    for module in MODULES:
        if variant == 'planning':
            if module in PLANNING_OMISSIONS:
                continue
            if module == 'model/proposal_appearance.py':
                yield 'model/proposal_planning.py'
        yield module


def sha256(path):
    with Path(path).open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def source_hashes(root, variant):
    paths = {
        'outputs/output-walkthrough/Ashley Heights.blend', 'outputs/output-walkthrough/geometry.json',
        'walkthrough/public/navigation.json', 'proposal/specs/design-spec.json',
        'proposal/specs/site-terrain.json', 'proposal/studies/p4/P4_site-feasibility.json',
        'proposal/studies/p4/P4_parking-validated.json', 'proposal/specs/original-preservation.json',
        'scripts/model/build_model.py', 'scripts/build/build_extension_proposal.py',
        'scripts/build/build_support.py', 'scripts/interiors/garden_stone.py', 'scripts/interiors/linen_baskets.py', 'proposal/interiors/garden-stone.json', 'scripts/geometry/blender_collections.py', 'scripts/geometry/blender_booleans.py', 'scripts/geometry/exterior_exposure.py',
    }
    if variant:
        paths.add(f'proposal/specs/design-spec-{variant}.json')
    if variant == 'planning':
        paths.add('proposal/specs/design-spec-compact.json')
    paths.update('scripts/' + name for name in modules_for(variant))
    paths.update(str(p.relative_to(root)) for p in (root / 'proposal/interiors/kitchen').rglob('*')
                 if p.is_file() and p.suffix in ('.json', '.png'))
    if variant in ('compact', 'planning'):
        paths.update(('scripts/interiors/interior_furnishing.py','scripts/interiors/proposal_bar_interiors.py','scripts/interiors/proposal_gym_interiors.py','scripts/interiors/proposal_utility_interiors.py','scripts/interiors/proposal_guest_interiors.py','scripts/interiors/proposal_guestbath_interiors.py','scripts/interiors/proposal_family_interiors.py','scripts/interiors/proposal_cloakroom_interiors.py','scripts/interiors/proposal_bedroom2_interiors.py','scripts/interiors/proposal_bedroom3_interiors.py','scripts/interiors/proposal_familybath_interiors.py','scripts/interiors/proposal_bedroom4_interiors.py','scripts/interiors/proposal_formal_interiors.py','scripts/interiors/proposal_sidebed_interiors.py','scripts/interiors/proposal_loftsuite_interiors.py','scripts/interiors/proposal_hobby_interiors.py','scripts/interiors/proposal_arrival_interiors.py','scripts/interiors/proposal_landings_interiors.py','scripts/interiors/proposal_garage_interiors.py','scripts/interiors/proposal_gardenhouse_interiors.py','scripts/interiors/proposal_office_interiors.py','scripts/interiors/garden_level_steps.py','scripts/interiors/interior_suite_parts.py'))
        paths.update('proposal/interiors/leisure/'+name+'.json'for name in ('cinema','bar','gym','utility','guest','guestbath','family','cloakroom','bedroom2','bedroom3','familybath','bedroom4','formal','sidebed','loftsuite','hobby','arrival','landings','garage','gardenhouse','office'))
        paths.add('proposal/interiors/principal/accepted/manifest.json')
        paths.update(('scripts/interiors/principal_gable_wall.py', 'proposal/interiors/principal/gable-wall.json'))
        paths.update(str(p.relative_to(root)) for p in (root / 'proposal/interiors/principal/accepted' / variant).glob('*') if p.is_file())
    if variant == 'compact':
        paths.update(('scripts/interiors/proposal_terrace_interiors.py','proposal/interiors/leisure/terrace.json','scripts/interiors/proposal_poolgarden_interiors.py','proposal/interiors/leisure/poolgarden.json','scripts/interiors/proposal_workshop_interiors.py','proposal/interiors/leisure/workshop.json'))
    # These are optional in legacy reconstructions. Their appearance/disappearance
    # still changes the mapping and therefore invalidates the build.
    for name in ('proposal/studies/p5/P5_internal-garden-area.json',
                 'proposal/neighbours/site-trees.json',
                 'proposal/reference/roof-tile-colour-reference.png'):
        if (root / name).is_file():
            paths.add(name)
    baseline = json.loads((root / 'proposal/specs/original-preservation.json').read_text())
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
    return root / ('outputs/output-proposed-' + variant if variant else 'outputs/output-proposed')


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
        self.path.parent.mkdir(parents=True, exist_ok=True)
        atomic_json(self.path, dict(self.metadata, started_at=self.started_at,
                    total_seconds=round(time.perf_counter() - self.started, 4),
                    success=success, stages=self.events))
