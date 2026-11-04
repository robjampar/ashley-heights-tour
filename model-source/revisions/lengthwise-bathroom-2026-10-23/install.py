"""Install checked local native/GLB pairs; never publish or rewrite old build reports."""
import json,hashlib,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
REV='lengthwise-bathroom-2026-10-23';E=ROOT/'walkthrough/test-results'/REV
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
assert all(r['passed']for r in json.loads((E/'geometry-verification.json').read_text()))
assert all(r['equal']for r in json.loads((E/'native-preservation-compact-planning.json').read_text()))
assert 'fail 0' in (ROOT/'logs/lengthwise-bathroom-preflight.log').read_text()
for v in ('compact','planning'):
 source=ROOT/f'outputs/output-lengthwise-bathroom-{v}';target=ROOT/f'outputs/output-proposed-{v}';name=native_name(v)
 check=json.loads((E/f'export-check-{v}.json').read_text());assert not check['failures'];assert check['sourceSHA256']==sha(source/(name+'.glb'))
 assert json.loads((E/f'door-swings-{v}.json').read_text())['passed']
 assert json.loads((E/f'navigation-{v}.json').read_text())['passed']
 assert json.loads((source/'source-inputs.json').read_text())==source_hashes(ROOT,v),'Source changed since preparation'
 original=ROOT/'revisions'/REV/'original'/f'outputs/output-proposed-{v}'
 files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
 previous=json.loads((target/'lengthwise-bathroom-refresh.json').read_text()) if (target/'lengthwise-bathroom-refresh.json').exists() else None
 for f in files:assert sha(target/f)==(previous['files'][f] if previous else sha(original/f)),'Current model changed: '+f
 for f in files:shutil.copyfile(source/f,target/f)
 shutil.copyfile(target/(name+'.glb'),ROOT/f'walkthrough/public/proposal-{v}.glb')
 shutil.copyfile(target/'navigation.json',ROOT/f'walkthrough/public/proposal-{v}-navigation.json')
 report={'revision':REV,'variant':v,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Reorient the bathroom front-to-back with a new longitudinal partition, a walk-through wardrobe, relocated complete vanity and bathroom door, coordinated floors and split front windows. Retain the bedroom, loft stair, fitted eaves storage and matching balcony rails. Complete GLB exports.','fullRebuildPerformed':False,'published':False,'previousIterationFiles':previous['files'] if previous else None,'sourceInputs':json.loads((source/'source-inputs.json').read_text()),'changes':json.loads((source/'finish-report.json').read_text()),'files':{f:sha(target/f)for f in files}}
 (target/'lengthwise-bathroom-refresh.json').write_text(json.dumps(report,indent=2))
 print('LOCAL_MODEL_INSTALLED',v,flush=True)
