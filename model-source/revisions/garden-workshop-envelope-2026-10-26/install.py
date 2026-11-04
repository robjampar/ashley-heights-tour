"""Install the checked compact proposal locally; preserve planning and originals."""
import json,hashlib,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
REV='garden-workshop-envelope-2026-10-26';E=R/'walkthrough/test-results'/REV
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
source=R/'outputs/output-garden-workshop-envelope-compact';target=R/'outputs/output-proposed-compact';name=native_name('compact')
check=json.loads((E/'export-check-compact.json').read_text());assert check['passed'];assert check['sourceSHA256']==sha(source/(name+'.glb'))
native=json.loads((E/'native-preservation-compact.json').read_text())[0];assert native['equal'];assert native['candidateSHA256']==sha(source/(name+'.blend'))
assert json.loads((source/'source-inputs.json').read_text())==source_hashes(R,'compact')
recovery=json.loads((R/'revisions'/REV/'recovery.json').read_text())
for path,digest in recovery['planning'].items():assert sha(R/path)==digest
original=R/'revisions'/REV/'original/outputs/output-proposed-compact'
files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
previous=target/'garden-workshop-envelope-refresh.json'
expected=json.loads(previous.read_text())['files'] if previous.exists() else {f:sha(original/f)for f in files}
for f in files:assert sha(target/f)==expected[f],f
for f in files:shutil.copyfile(source/f,target/f)
shutil.copyfile(target/(name+'.glb'),R/'walkthrough/public/proposal-compact.glb')
shutil.copyfile(target/'navigation.json',R/'walkthrough/public/proposal-compact-navigation.json')
report={'revision':REV,'variant':'compact','updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Targeted native masonry workshop revision and complete GLB export with matching native/GLB roof-capping offsets. Retained original scenes and unrelated proposal geometry checked.','fullRebuildPerformed':False,'published':False,'sourceInputs':json.loads((source/'source-inputs.json').read_text()),'changes':json.loads((source/'finish-report.json').read_text()),'files':{f:sha(target/f)for f in files}}
(target/'garden-workshop-envelope-refresh.json').write_text(json.dumps(report,indent=2))
print('LOCAL_MODEL_INSTALLED compact; Planning unchanged')
