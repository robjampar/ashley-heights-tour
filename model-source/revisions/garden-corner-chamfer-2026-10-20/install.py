"""Install the checked local derivative; retain historical full-build reports."""
import json,hashlib,shutil,sys,re
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
REV='garden-corner-chamfer-2026-10-20';E=ROOT/f'walkthrough/test-results/{REV}'
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
assert json.loads((E/'geometry-verification.json').read_text())['passed']
assert all(p['equal']for p in json.loads((E/'native-preservation.json').read_text()))
assert re.search(r'(?:#|ℹ) fail 0\b',(ROOT/'logs/garden-chamfer-preflight.log').read_text())
assert len(list((E/'native-review').glob('compact-prepared-*.png')))==4
source=ROOT/'outputs/output-garden-chamfer-compact';target=ROOT/'outputs/output-proposed-compact';name=native_name('compact')
original=ROOT/f'revisions/{REV}/original/outputs/output-proposed-compact'
assert json.loads((source/'source-inputs.json').read_text())==source_hashes(ROOT,'compact'),'Source changed since preparation'
files=[name+'.blend',name+'.glb','geometry.json','navigation.json']
for f in files:assert sha(target/f)==sha(original/f),'Current model changed: '+f
for f in files:shutil.copyfile(source/f,target/f)
shutil.copyfile(target/(name+'.glb'),ROOT/'walkthrough/public/proposal-compact.glb')
shutil.copyfile(target/'navigation.json',ROOT/'walkthrough/public/proposal-compact-navigation.json')
report={'revision':REV,'variant':'compact','updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Targeted native 2 m northeast garden corner chamfer with roof terrace, railing, fixed glazing, drainage and coordinated furniture. Full GLB export.','fullRebuildPerformed':False,'sourceInputs':json.loads((source/'source-inputs.json').read_text()),'changes':json.loads((source/'finish-report.json').read_text()),'files':{f:sha(target/f)for f in files}}
(target/'garden-chamfer-refresh.json').write_text(json.dumps(report,indent=2))
print('LOCAL_CHAMFER_INSTALLED',flush=True)
