"""Install the reviewed local model pair without changing publication or old build claims."""
import json,hashlib,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
for variant in ('compact','planning'):
 source=ROOT/f'outputs/output-basement-roof-{variant}';target=ROOT/f'outputs/output-proposed-{variant}';name=native_name(variant)
 assert json.loads((source/'source-inputs.json').read_text())==source_hashes(ROOT,variant),'Source changed since preparation'
 files=[name+'.blend',name+'.glb','geometry.json','navigation.json','entertainment-basement-review.json']
 for filename in files:shutil.copyfile(source/filename,target/filename)
 shutil.copyfile(target/(name+'.glb'),ROOT/f'walkthrough/public/proposal-{variant}.glb')
 shutil.copyfile(target/'navigation.json',ROOT/f'walkthrough/public/proposal-{variant}-navigation.json')
 report={'revision':'basement-roof-corrections-2026-10-20','variant':variant,'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Targeted native shell, roof and junction correction with complete GLB re-export.','fullRebuildPerformed':False,'sourceInputs':json.loads((source/'source-inputs.json').read_text()),'changes':json.loads((source/'finish-report.json').read_text()),'files':{f:sha(target/f)for f in files}}
 (target/'basement-roof-refresh.json').write_text(json.dumps(report,indent=2))
 print('LOCAL_MODEL_INSTALLED',variant,flush=True)
