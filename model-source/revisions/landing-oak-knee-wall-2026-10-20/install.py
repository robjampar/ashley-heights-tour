"""Install the locally checked native/GLB pair with separate revision provenance."""
import json,hashlib,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
for v in ('compact','planning'):
 source=ROOT/f'outputs/output-landing-oak-{v}';target=ROOT/f'outputs/output-proposed-{v}';name=native_name(v)
 original=ROOT/f'revisions/landing-oak-knee-wall-2026-10-20/original/outputs/output-proposed-{v}'
 assert json.loads((source/'source-inputs.json').read_text())==source_hashes(ROOT,v),'Source changed since preparation'
 files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
 for filename in files:assert sha(target/filename)==sha(original/filename),'Current model changed: '+filename
 for filename in files:shutil.copyfile(source/filename,target/filename)
 shutil.copyfile(target/(name+'.glb'),ROOT/f'walkthrough/public/proposal-{v}.glb')
 shutil.copyfile(target/'navigation.json',ROOT/f'walkthrough/public/proposal-{v}-navigation.json')
 report={'revision':'landing-oak-knee-wall-2026-10-20','variant':v,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Targeted native material restoration and knee-wall trim, followed by complete GLB export.','fullRebuildPerformed':False,'sourceInputs':json.loads((source/'source-inputs.json').read_text()),'changes':json.loads((source/'finish-report.json').read_text()),'files':{f:sha(target/f)for f in files}}
 (target/'landing-oak-knee-wall-refresh.json').write_text(json.dumps(report,indent=2))
 print('LOCAL_MODEL_INSTALLED',v,flush=True)
