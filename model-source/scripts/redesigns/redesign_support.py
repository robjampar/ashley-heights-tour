"""Shared input inventory and verified reuse for independent design studies."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json
from pathlib import Path
from scripts.build.build_support import sha256, blender_identity

OPTIONS = ('i1', 'i2', 'i3', 'e1', 'e2', 'e3')


def input_paths(root, option):
    internal = option.startswith('i') or option == 'g1'
    base = 'outputs/output-proposed-compact' if internal else 'outputs/output-walkthrough'
    stem = 'Ashley Heights — Proposed (compact)' if internal else 'Ashley Heights'
    names = {
        f'{base}/{stem}.blend', f'{base}/geometry.json',
        f'{base}/navigation.json' if internal else 'walkthrough/public/navigation.json',
        f'proposal/redesigns/{option}.json', 'proposal/specs/original-preservation.json',
        'scripts/build/build_redesign.py', 'scripts/redesigns/redesign_support.py',
        'scripts/redesigns/redesign_layouts.py', 'scripts/model/build_model.py',
        'scripts/build/build_extension_proposal.py', 'scripts/model/proposal_helpers.py',
        'scripts/build/build_support.py', 'scripts/geometry/blender_collections.py',
        'revisions/redesigns-2026-09-25/original-object-index.json',
    }
    if option == 'g1':
        names.update({'scripts/redesigns/gate_aligned_layout.py', 'scripts/redesigns/gate_aligned_support.py'})
    if not internal:
        names.update({
            'scripts/redesigns/redesign_external.py', 'scripts/redesigns/redesign_site.py',
            'scripts/redesigns/redesign_roof_join.py', 'scripts/redesigns/redesign_levels.py',
            'scripts/redesigns/redesign_appearance.py', 'scripts/geometry/exterior_exposure.py',
            'scripts/model/proposal_roofs.py', 'scripts/model/proposal_loft.py',
            'proposal/redesigns/original-drive-outline.json',
            'outputs/output-proposed-compact/Ashley Heights — Proposed (compact).blend',
            'outputs/output-proposed-compact/navigation.json',
            'revisions/redesigns-2026-09-25/compact-object-index.json',
        })
        if option in ('e2', 'e3'):
            names.add(f'scripts/redesigns/redesign_{option}.py')
    return [Path(root) / name for name in sorted(names)]


def input_hashes(root, option):
    return {str(path.relative_to(root)): sha256(path) for path in input_paths(root, option)}


def required_outputs(root, option):
    root = Path(root)
    spec = json.loads((root / 'proposal/redesigns' / (option + '.json')).read_text())
    out = root / ('outputs/output-redesign-' + option)
    return [out / ('Ashley Heights — ' + spec['code'] + ' ' + spec['name'] + '.blend'),
            out / ('redesign-' + option + '.glb'), out / 'navigation.json', out / 'geometry.json',
            root / 'walkthrough/public' / ('redesign-' + option + '.glb'),
            root / 'walkthrough/public' / ('redesign-' + option + '-navigation.json')]


def current_redesign(root, option, binary):
    try:
        report = json.loads((root / ('outputs/output-redesign-' + option) / 'build-report.json').read_text())
        if report.get('cache_schema') != 1 or report.get('option') != option:
            return False, 'no compatible completed build'
        if report.get('blender') != blender_identity(binary):
            return False, 'Blender changed'
        if report.get('inputs') != input_hashes(root, option):
            return False, 'design inputs changed'
        expected = {str(path.relative_to(root)) for path in required_outputs(root, option)}
        if set(report.get('outputs', {})) != expected:
            return False, 'incomplete output manifest'
        for name, digest in report['outputs'].items():
            if sha256(root / name) != digest:
                return False, 'output changed: ' + name
        if not report.get('original_preserved') or not all(report['original_preserved'].values()):
            return False, 'original preservation not verified'
    except (OSError, ValueError, TypeError, KeyError, AttributeError):
        return False, 'missing or unreadable completed build/input/output'
    return True, 'inputs and output checksums match'
