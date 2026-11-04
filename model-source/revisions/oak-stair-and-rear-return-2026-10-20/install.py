"""Install the locally checked native/GLB pair with separate revision provenance."""
import json,hashlib,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
evidence=ROOT/'walkthrough/test-results/oak-stair-and-rear-return-2026-10-20'
assert all(g['passed'] for g in json.loads((evidence/'geometry-verification.json').read_text()))
assert all(p['equal'] for p in json.loads((evidence/'native-preservation.json').read_text()))
headroom=json.loads((evidence/'geometry-review.json').read_text())['reports']
assert all(not r['failures'] and not r['floorFailures'] and not r['stairBodyConflicts']
           and all(not c['conflicts'] for c in r['circulation'].values()) for r in headroom)
assert 'fail 0' in (ROOT/'logs/oak-stair-return-preflight.log').read_text()
for v in ('compact','planning'):
 source=ROOT/f'outputs/output-oak-stair-return-{v}';target=ROOT/f'outputs/output-proposed-{v}';name=native_name(v)
 assert next(r['sourceSHA256'] for r in headroom if r['variant']==v)==sha(source/(name+'.glb'))
 original=ROOT/f'revisions/oak-stair-and-rear-return-2026-10-20/original/outputs/output-proposed-{v}'
 assert json.loads((source/'source-inputs.json').read_text())==source_hashes(ROOT,v),'Source changed since preparation'
 files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
 for filename in files:assert sha(target/filename)==sha(original/filename),'Current model changed: '+filename
 for filename in files:shutil.copyfile(source/filename,target/filename)
 shutil.copyfile(target/(name+'.glb'),ROOT/f'walkthrough/public/proposal-{v}.glb')
 shutil.copyfile(target/'navigation.json',ROOT/f'walkthrough/public/proposal-{v}-navigation.json')
 report={'revision':'oak-stair-and-rear-return-2026-10-20','variant':v,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Targeted native oak stair joinery in both variants; Compact additional 100 mm garden-room inset and 200 mm opening reduction. Complete GLB exports.','fullRebuildPerformed':False,'sourceInputs':json.loads((source/'source-inputs.json').read_text()),'changes':json.loads((source/'finish-report.json').read_text()),'files':{f:sha(target/f)for f in files}}
 (target/'oak-stair-return-refresh.json').write_text(json.dumps(report,indent=2))
 print('LOCAL_MODEL_INSTALLED',v,flush=True)
