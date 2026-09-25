"""Shared input inventory and verified reuse for independent design studies."""
import json
from pathlib import Path
try:
    from .build_support import sha256, blender_identity
except ImportError:
    from build_support import sha256, blender_identity

OPTIONS = ('i1', 'i2', 'i3', 'e1', 'e2', 'e3')


def input_paths(root, option):
    internal = option.startswith('i')
    base = 'output-proposed-compact' if internal else 'output-walkthrough'
    stem = 'Ashley Heights — Proposed (compact)' if internal else 'Ashley Heights'
    names = {
        f'{base}/{stem}.blend', f'{base}/geometry.json',
        f'{base}/navigation.json' if internal else 'walkthrough/public/navigation.json',
        f'proposal/redesigns/{option}.json', 'proposal/original-preservation.json',
        'scripts/build_redesign.py', 'scripts/redesign_support.py',
        'scripts/redesign_layouts.py', 'scripts/build_model.py',
        'scripts/build_extension_proposal.py', 'scripts/proposal_helpers.py',
        'scripts/build_support.py', 'scripts/blender_collections.py',
        'revisions/redesigns-2026-09-25/original-object-index.json',
    }
    if not internal:
        names.update({
            'scripts/redesign_external.py', 'scripts/redesign_site.py',
            'scripts/redesign_roof_join.py', 'scripts/redesign_levels.py',
            'scripts/redesign_appearance.py', 'scripts/exterior_exposure.py',
            'scripts/proposal_roofs.py', 'scripts/proposal_loft.py',
            'proposal/redesigns/original-drive-outline.json',
            'output-proposed-compact/Ashley Heights — Proposed (compact).blend',
            'output-proposed-compact/navigation.json',
            'revisions/redesigns-2026-09-25/compact-object-index.json',
        })
        if option in ('e2', 'e3'):
            names.add(f'scripts/redesign_{option}.py')
    return [Path(root) / name for name in sorted(names)]


def input_hashes(root, option):
    return {str(path.relative_to(root)): sha256(path) for path in input_paths(root, option)}


def required_outputs(root, option):
    root = Path(root)
    spec = json.loads((root / 'proposal/redesigns' / (option + '.json')).read_text())
    out = root / ('output-redesign-' + option)
    return [out / ('Ashley Heights — ' + spec['code'] + ' ' + spec['name'] + '.blend'),
            out / ('redesign-' + option + '.glb'), out / 'navigation.json', out / 'geometry.json',
            root / 'walkthrough/public' / ('redesign-' + option + '.glb'),
            root / 'walkthrough/public' / ('redesign-' + option + '-navigation.json')]


def current_redesign(root, option, binary):
    try:
        report = json.loads((root / ('output-redesign-' + option) / 'build-report.json').read_text())
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
