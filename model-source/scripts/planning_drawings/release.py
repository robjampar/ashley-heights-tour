"""Input fingerprints and integrity checks for a complete planning issue."""
import hashlib
import json
from pathlib import Path
from .context import ROOT

SHEET_IDS = {'PA-000', 'PA-001', 'PA-002', 'PA-003', 'PA-005', 'PA-010',
             'PA-011', 'PA-012', 'PA-020', 'PA-021', 'PA-022', 'PA-030',
             'PA-031', 'PA-040', 'PA-050', 'PA-051', 'PA-070', 'PA-080',
             'PA-090', 'PA-100'}


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def input_fingerprints(variant="planning"):
    paths = [ROOT / p for p in (
        'output-walkthrough/geometry.json', 'walkthrough/public/navigation.json',
        f'output-proposed-{variant}/geometry.json', f'output-proposed-{variant}/navigation.json',
        ('proposal/planning-context.json' if variant == 'planning' else 'proposal/planning-context-proposed.json'), 'proposal/street-registration/registration.json',
        'walkthrough/src/street-context-data.js', 'proposal/reference/street-site-plan.png')]
    paths += sorted((ROOT / 'scripts/planning_drawings').glob('*.py'))
    paths += sorted(p for p in (ROOT / 'source/listing-photos').iterdir() if p.is_file())
    if variant == 'planning':
        model_inputs = ROOT / 'output-proposed-planning/build-inputs.json'
        if model_inputs.exists():
            paths.append(model_inputs)
            paths += [ROOT / p for p in json.loads(model_inputs.read_text())]
    return {str(p.relative_to(ROOT)): sha(p) for p in paths}


def model_source_issues(variant):
    if variant != 'planning':
        return []
    manifest = ROOT / 'output-proposed-planning/build-inputs.json'
    if not manifest.exists():
        return ['Planning model has not been built with source tracking']
    return ['Planning model needs rebuilding: ' + name
            for name, digest in json.loads(manifest.read_text()).items()
            if not (ROOT / name).is_file() or sha(ROOT / name) != digest]


def inventory(out):
    """Hash every deliverable, including supporting documents and merged PDFs."""
    return {str(p.relative_to(out)): sha(p) for p in sorted(out.rglob('*'))
            if p.is_file() and p.suffix in ('.pdf', '.png', '.json', '.md')
            and p.name not in ('manifest.json', 'CHANGELOG.md', 'README.md')
            and 'previews' not in p.parts}


def freshness(out, current_inputs=None):
    path = out / 'manifest.json'
    if not path.exists():
        return ['No build manifest']
    manifest = json.loads(path.read_text())
    reasons = []
    if current_inputs is None:
        reasons += model_source_issues(manifest.get('variant'))
    if not manifest.get('complete_build') or manifest.get('variant') not in ('planning', 'compact'):
        reasons.append('Not a complete issue of the current proposal')
    current_inputs = current_inputs if current_inputs is not None else input_fingerprints(manifest.get("variant", "planning"))
    previous = manifest.get('source_files', {})
    reasons += ['Input changed: ' + name for name in sorted(set(previous) | set(current_inputs))
                if previous.get(name) != current_inputs.get(name)]
    have = {s['sheet'] for s in manifest.get('sheets', [])}
    if have != SHEET_IDS:
        reasons.append('Drawing register is incomplete or contains retired sheet numbers')
    artifacts = manifest.get('artifacts', {})
    if not artifacts:
        reasons.append('No deliverable checksums')
    for name, digest in artifacts.items():
        p = out / name
        if not p.is_file() or sha(p) != digest:
            reasons.append('Missing or changed output: ' + name)
    if not manifest.get('pdf_checks_pass') or not manifest.get('openings_crosscheck_pass'):
        reasons.append('Technical checks failed')
    return reasons
