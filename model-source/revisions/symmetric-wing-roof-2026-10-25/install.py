"""Install the checked native models and full exports locally, with guarded provenance."""
import json,hashlib,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
REV='symmetric-wing-roof-2026-10-25';E=R/'walkthrough/test-results'/REV
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
assert all(r['passed']for r in json.loads((E/'geometry-verification.json').read_text()))
assert all(r['equal']for r in json.loads((E/'native-preservation-compact-planning.json').read_text()))
for v in ('compact','planning'):
 source=R/f'outputs/output-symmetric-wing-roof-{v}';target=R/f'outputs/output-proposed-{v}';name=native_name(v)
 assert json.loads((E/f'navigation-{v}.json').read_text())['passed']
 check=json.loads((E/f'export-check-{v}.json').read_text());assert not check['failures'];assert check['sourceSHA256']==sha(source/(name+'.glb'))
 native=next(r for r in json.loads((E/'native-preservation-compact-planning.json').read_text())if r['variant']==v);assert native['candidateSHA256']==sha(source/(name+'.blend'))
 assert json.loads((source/'source-inputs.json').read_text())==source_hashes(R,v),'Source changed since preparation'
 original=R/'revisions'/REV/'original'/f'outputs/output-proposed-{v}'
 files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
 previous=json.loads((target/'symmetric-wing-roof-refresh.json').read_text())if(target/'symmetric-wing-roof-refresh.json').exists()else None
 for f in files:assert sha(target/f)==(previous['files'][f]if previous else sha(original/f)),'Current model changed during preparation: '+f
 if previous:(R/'revisions'/REV/('preceding-refresh-'+v+'.json')).write_text(json.dumps(previous,indent=2))
 for f in files:shutil.copyfile(source/f,target/f)
 shutil.copyfile(target/(name+'.glb'),R/f'walkthrough/public/proposal-{v}.glb')
 shutil.copyfile(target/'navigation.json',R/f'walkthrough/public/proposal-{v}-navigation.json')
 report={'revision':REV,'variant':v,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Symmetric main wing roof, retained north connecting roof and level gallery. Coordinated rear dormer, bedroom, eaves door and entrance pendant fixings. Full native/GLB exports; seven original scenes and all unrelated proposal objects preserved.','fullRebuildPerformed':False,'published':False,'sourceInputs':json.loads((source/'source-inputs.json').read_text()),'changes':json.loads((source/'finish-report.json').read_text()),'files':{f:sha(target/f)for f in files}}
 (target/'symmetric-wing-roof-refresh.json').write_text(json.dumps(report,indent=2))
 print('LOCAL_MODEL_INSTALLED',v,flush=True)
