"""Guarded local installation of the reviewed experimental finish candidate."""
import json,hashlib,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
REV='structural-overnight-2026-10-27';E=R/'walkthrough/test-results'/REV
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
source=R/'outputs/output-structural-fit-compact';target=R/'outputs/output-proposed-compact'
original=R/'revisions'/REV/'original/outputs/output-proposed-compact';name=native_name('compact')
check=json.loads((E/'native-geometry-check.json').read_text())
assert check['passed']and check['geometrySHA256']==sha(source/'geometry.json')
assert all(c['passed']for c in check['closedFinishMeshes'])
preserved=json.loads((E/'native-preservation-compact.json').read_text())[0]
assert preserved['equal']and preserved['candidateSHA256']==sha(source/(name+'.blend'))
headroom=json.loads((E/'stair-headroom.json').read_text())
assert not headroom['failures']and headroom['sourceSHA256']==sha(source/(name+'.glb'))
browser=json.loads((E/'native-browser-check.json').read_text())
assert not browser['errors']
for f,h in browser['sourceHashes'].items():assert sha(source/f)==h,('Browser evidence stale',f)
assert json.loads((source/'source-inputs.json').read_text())==source_hashes(R,'compact')
candidate=json.loads((source/'structure/members.json').read_text())
assert candidate['coveringFit']['sourceGeometrySHA256']==sha(source/'geometry.json')
assert candidate['supportAudit']['unmappedJoistEnds']==0
files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
previous=target/'structural-finish-refresh.json'
expected=json.loads(previous.read_text())['files']if previous.exists()else{f:sha(original/f)for f in files}
for f in files:assert sha(target/f)==expected[f],('Active model changed during preparation',f)
for f in files:shutil.copyfile(source/f,target/f)
shutil.copyfile(target/(name+'.glb'),R/'walkthrough/public/proposal-compact.glb')
shutil.copyfile(target/'navigation.json',R/'walkthrough/public/proposal-compact-navigation.json')
report={'revision':REV,'variant':'compact','updatedAt':datetime.now(timezone.utc).isoformat(),
 'method':'Experimental floor/ceiling coordination and G01 vehicle-deck architectural fit. Full native/GLB export; original scenes preserved. Expanded roof/wall/pad finish conflicts remain explicitly open.',
 'fullRebuildPerformed':False,'published':False,'approvedForConstruction':False,
 'sourceInputs':json.loads((source/'source-inputs.json').read_text()),
 'files':{f:sha(target/f)for f in files},'changes':json.loads((source/'finish-report.json').read_text())}
(target/'structural-finish-refresh.json').write_text(json.dumps(report,indent=2)+'\n')
print('LOCAL_MODEL_INSTALLED compact; visual assets must be regenerated before normal web build',flush=True)
