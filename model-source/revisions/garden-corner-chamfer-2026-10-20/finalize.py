"""Record completed local checks without changing historical provenance."""
import hashlib,json,re,urllib.request
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];REV='garden-corner-chamfer-2026-10-20';E=ROOT/f'walkthrough/test-results/{REV}'
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
geometry=json.loads((E/'geometry-verification.json').read_text());assert geometry['passed']
preservation=json.loads((E/'native-preservation.json').read_text());assert all(p['equal']for p in preservation)
planning=json.loads((E/'planning-preservation.json').read_text());assert all(planning.values())
visual=json.loads((E/'visual-quality-audit.json').read_text());assert {v['variant']for v in visual}=={'compact','planning'}
assert all(v['samples']==192 and v['nativeUnchanged'] and v['navigationMatched'] and v['baseModelMatched']for v in visual)
web=(ROOT/'logs/garden-chamfer-web-tests.log').read_text();assert re.search(r'(?:#|ℹ) fail 0\b',web)
count=int(re.search(r'(?:#|ℹ) tests (\d+)',web).group(1));assert count==234
python=(ROOT/'logs/garden-chamfer-python-tests.log').read_text();assert 'Ran 107 tests' in python and '\nOK\n' in python
assert 'Offline walkthrough built in dist/' in (ROOT/'logs/garden-chamfer-web-build.log').read_text()
assert (ROOT/'logs/garden-chamfer-workspace-check.log').read_text()==(ROOT/'logs/oak-stair-return-workspace-check.log').read_text()
images=sorted((E/'native-review').glob('compact-prepared-*.png'));assert len(images)==4
http=[]
for variant in ('compact','planning'):
 current=json.loads((ROOT/f'walkthrough/public/proposal-{variant}-navigation.json').read_text())
 with urllib.request.urlopen(f'http://127.0.0.1:8765/proposal-{variant}-navigation.json')as response:served=json.load(response);status=response.status
 assert served['modelUpdatedAt']==current['modelUpdatedAt']
 assert served['loftStairFinish']==current['loftStairFinish']
 if variant=='compact':assert served['rearGardenRoomChamfer']==current['rearGardenRoomChamfer']
 with urllib.request.urlopen(urllib.request.Request(f'http://127.0.0.1:8765/proposal-{variant}.glb',method='HEAD'))as response:
  length=int(response.headers['Content-Length']);assert length==(ROOT/f'walkthrough/dist/proposal-{variant}.glb').stat().st_size
 http.append({'variant':variant,'status':status,'modelUpdatedAt':served['modelUpdatedAt'],'servedModelBytes':length})
files={}
for p in [ROOT/'outputs/output-proposed-compact/Ashley Heights — Proposed (compact).blend',ROOT/'walkthrough/public/proposal-compact.glb',ROOT/'walkthrough/public/proposal-compact-navigation.json',ROOT/'walkthrough/public/visual-quality/compact-furnishings.glb',ROOT/'walkthrough/public/visual-quality/compact-daylight.json']:
 files[str(p.relative_to(ROOT))]=sha(p)
result={'revision':REV,'completedAt':datetime.now(timezone.utc).isoformat(),'nativeGeometry':geometry,'originalScenesPreserved':True,'planningPreserved':planning,'pythonTests':107,'viewerTests':count,'visualAudits':visual,'layoutCheck':{'passed':False,'unchangedBaselineFindings':345},'nativeImagesReviewed':[str(p.relative_to(ROOT))for p in images],'browserScreenshotReview':{'completed':False,'reason':'Connected browser inventory is empty; Chrome application access returned timeoutReached. Native renders and exported-model tests were reviewed.'},'localBuild':True,'http':http,'publicationPerformed':False,'fullModelRebuildPerformed':False,'drawingPackRegenerated':False,'files':files}
(E/'final-validation.json').write_text(json.dumps(result,indent=2)+'\n')
p=ROOT/f'revisions/{REV}/README.md';s=p.read_text();summary='\nFinal verification: 234 viewer tests and 107 Python tests pass. Exported mesh geometry, native scene preservation and both 192-sample daylight audits pass. The local server serves the current model. The layout check has exactly its 345 pre-existing findings. Four native views were reviewed; browser screenshot review remains unavailable. No publication.\n'
if summary not in s:p.write_text(s+summary)
print(json.dumps({'viewerTests':count,'pythonTests':107,'http':http,'localBuild':True,'published':False},indent=2))
