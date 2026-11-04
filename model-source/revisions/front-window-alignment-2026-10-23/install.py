"""Install the locally checked pair. Historical provenance is retained."""
import json,hashlib,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
REV='front-window-alignment-2026-10-23';E=R/'walkthrough/test-results'/REV
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
assert all(r['passed']for r in json.loads((E/'geometry-verification.json').read_text()))
assert all(r['equal']for r in json.loads((E/'native-preservation-compact-planning.json').read_text()))
assert 'fail 0' in (R/'logs/front-window-alignment-preflight.log').read_text()
for v in ('compact','planning'):
 source=R/f'outputs/output-front-window-alignment-{v}';target=R/f'outputs/output-proposed-{v}';name=native_name(v)
 assert json.loads((E/f'navigation-{v}.json').read_text())['passed']
 check=json.loads((E/f'export-check-{v}.json').read_text());assert not check['failures'];assert check['sourceSHA256']==sha(source/(name+'.glb'))
 native=next(r for r in json.loads((E/'native-preservation-compact-planning.json').read_text()) if r['variant']==v);assert native['candidateSHA256']==sha(source/(name+'.blend'))
 assert json.loads((source/'source-inputs.json').read_text())==source_hashes(R,v),'Source changed since preparation'
 original=R/'revisions'/REV/'original'/f'outputs/output-proposed-{v}'
 files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
 previous=json.loads((target/'front-window-alignment-refresh.json').read_text()) if (target/'front-window-alignment-refresh.json').exists() else None
 for f in files:assert sha(target/f)==(previous['files'][f] if previous else sha(original/f)),'Current model changed: '+f
 for f in files:shutil.copyfile(source/f,target/f)
 shutil.copyfile(target/(name+'.glb'),R/f'walkthrough/public/proposal-{v}.glb')
 shutil.copyfile(target/'navigation.json',R/f'walkthrough/public/proposal-{v}-navigation.json')
 report={'revision':REV,'variant':v,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Equal upper front windows centred over existing lower windows; coordinated wider pier, wall, facing, trim and glass. Accepted suite and original scenes preserved. Complete GLB export.','previousIterationFiles':previous['files'] if previous else None,'fullRebuildPerformed':False,'published':False,'sourceInputs':json.loads((source/'source-inputs.json').read_text()),'changes':json.loads((source/'finish-report.json').read_text()),'files':{f:sha(target/f)for f in files}}
 (target/'front-window-alignment-refresh.json').write_text(json.dumps(report,indent=2))
 print('LOCAL_MODEL_INSTALLED',v,flush=True)
