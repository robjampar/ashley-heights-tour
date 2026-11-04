import json, hashlib, shutil, sys
from pathlib import Path
from datetime import datetime, timezone

R = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(R))
from scripts.build.build_support import native_name, source_hashes

E = R / 'walkthrough/test-results/suite-layout-and-loft-use-2026-10-22'
sha = lambda p: hashlib.file_digest(p.open('rb'), 'sha256').hexdigest()
assert 'fail 0' in (R / 'logs/suite-layout-preflight.log').read_text()
assert all(x['passed'] for x in json.loads((E / 'geometry-verification.json').read_text()))
assert all(x['equal'] for x in json.loads((E / 'native-preservation-compact-planning.json').read_text()))

for v in ('compact', 'planning'):
    name = native_name(v)
    source = R / f'outputs/output-suite-layout-loft-{v}'
    target = R / f'outputs/output-proposed-{v}'
    prior = R / f'revisions/suite-layout-and-loft-use-2026-10-22/pre-balcony-post-correction/{v}'
    report = json.loads((target / 'suite-layout-loft-refresh.json').read_text())
    before = report['files']
    fix = json.loads((source / 'balcony-post-correction.json').read_text())
    for f in before:
        assert sha(target / f) == sha(prior / f) == before[f], f
    assert json.loads((source / 'source-inputs.json').read_text()) == source_hashes(R, v)
    check = json.loads((E / f'export-check-{v}.json').read_text())
    assert not check['failures'] and check['sourceSHA256'] == sha(source / (name + '.glb'))
    assert json.loads((E / f'door-swings-{v}.json').read_text())['passed']
    assert json.loads((E / f'navigation-{v}.json').read_text())['passed']
    assert len(fix['removed']) == 6 and fix['glb']['allMeshIndexAndImageBytesUnchanged']
    for f in before:
        shutil.copyfile(source / f, target / f)
    shutil.copyfile(target / (name + '.glb'), R / f'walkthrough/public/proposal-{v}.glb')
    shutil.copyfile(target / 'navigation.json', R / f'walkthrough/public/proposal-{v}-navigation.json')
    corrections = report.get('postExportCorrections', [])
    corrections.append({
        'method': 'Retire six original metal balcony posts from proposal collections and GLB scene roots; original scenes and all binary mesh/index/image bytes retained',
        'evidence': fix,
    })
    report.update(
        updatedAt=datetime.now(timezone.utc).isoformat(),
        sourceInputs=json.loads((source / 'source-inputs.json').read_text()),
        changes=json.loads((source / 'finish-report.json').read_text()),
        files={f: sha(target / f) for f in before},
        beforeBalconyPostCorrectionFiles=before,
        postExportCorrections=corrections,
    )
    (target / 'suite-layout-loft-refresh.json').write_text(json.dumps(report, indent=2) + '\n')
    print('BALCONY_POST_CORRECTION_INSTALLED', v, flush=True)
