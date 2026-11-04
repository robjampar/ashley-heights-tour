"""Record completed local checks without replacing historical build provenance."""
import hashlib,json,re,urllib.request
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2]
E=ROOT/'walkthrough/test-results/oak-stair-and-rear-return-2026-10-20'
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
geometry=json.loads((E/'geometry-verification.json').read_text());assert all(g['passed']for g in geometry)
preservation=json.loads((E/'native-preservation.json').read_text());assert all(p['equal']for p in preservation)
visual=json.loads((E/'visual-quality-audit.json').read_text());assert {v['variant']for v in visual}=={'compact','planning'}
assert all(v['samples']==192 and v['nativeUnchanged'] and v['navigationMatched'] and v['baseModelMatched']for v in visual)
web=(ROOT/'logs/oak-stair-return-web-tests.log').read_text();assert re.search(r'(?:#|ℹ) fail 0\b',web)
count=int(re.search(r'(?:#|ℹ) tests (\d+)',web).group(1));assert count>=229
assert 'Ran 107 tests' in (ROOT/'logs/oak-stair-return-python-tests.log').read_text()
assert '\nOK\n' in (ROOT/'logs/oak-stair-return-python-tests.log').read_text()
assert 'Offline walkthrough built in dist/' in (ROOT/'logs/oak-stair-return-web-build.log').read_text()
assert (ROOT/'logs/oak-stair-return-workspace-check.log').read_text()==(ROOT/'logs/loft-junction-workspace-check.log').read_text()
images=sorted((E/'native-review').glob('compact-prepared-*.png'));assert len(images)==4
headroom=json.loads((E/'geometry-review.json').read_text())
assert all(not r['failures'] and not r['floorFailures'] and not r['stairBodyConflicts'] and all(not c['conflicts']for c in r['circulation'].values())for r in headroom['reports'])
http=[]
for variant in ('compact','planning'):
    current=json.loads((ROOT/f'walkthrough/public/proposal-{variant}-navigation.json').read_text())
    url=f'http://127.0.0.1:8765/proposal-{variant}-navigation.json'
    with urllib.request.urlopen(url)as response:served=json.load(response);status=response.status
    assert served['modelUpdatedAt']==current['modelUpdatedAt']
    assert served['loftJunctionCleanup']==current['loftJunctionCleanup']
    assert served['loftStairFinish']==current['loftStairFinish']
    if variant=='compact':assert served['rearGardenRoomInset']==current['rearGardenRoomInset']
    with urllib.request.urlopen(urllib.request.Request(f'http://127.0.0.1:8765/proposal-{variant}.glb',method='HEAD'))as response:
        length=int(response.headers['Content-Length']);assert length==(ROOT/f'walkthrough/dist/proposal-{variant}.glb').stat().st_size
    http.append({'variant':variant,'status':status,'modelUpdatedAt':served['modelUpdatedAt'],'servedModelBytes':length})
files={}
for variant,native in [('compact','Ashley Heights — Proposed (compact)'),('planning','Ashley Heights — Proposed (planning application)')]:
    for p in [ROOT/f'outputs/output-proposed-{variant}/{native}.blend',ROOT/f'walkthrough/public/proposal-{variant}.glb',ROOT/f'walkthrough/public/proposal-{variant}-navigation.json',ROOT/f'walkthrough/public/visual-quality/{variant}-furnishings.glb',ROOT/f'walkthrough/public/visual-quality/{variant}-daylight.json']:
        files[str(p.relative_to(ROOT))]=sha(p)
result={'revision':'oak-stair-and-rear-return-2026-10-20','completedAt':datetime.now(timezone.utc).isoformat(),'includesEarlierRevision':'loft-junction-cleanup-2026-10-20','nativeGeometry':geometry,'circulationAndHeadroom':headroom,'originalScenesPreserved':True,'pythonTests':107,'viewerTests':count,'visualAudits':visual,'layoutCheck':{'passed':False,'unchangedBaselineFindings':345},'nativeImagesReviewed':[str(p.relative_to(ROOT))for p in images],'browserScreenshotReview':{'completed':False,'reason':'The connected browser inventory is empty. Native rendered inspection and exported-model tests were used.'},'localBuild':True,'http':http,'publicationPerformed':False,'fullModelRebuildPerformed':False,'drawingPackRegenerated':False,'files':files}
(E/'final-validation.json').write_text(json.dumps(result,indent=2)+'\n')

print(json.dumps({'viewerTests':count,'pythonTests':107,'http':http,'localBuild':True,'published':False},indent=2))
p=ROOT/'revisions/oak-stair-and-rear-return-2026-10-20/README.md'
p.write_text(p.read_text()+'\nFinal verification: 107 Python tests and '+str(count)+' viewer tests pass. Full exported-model headroom/circulation checks and retained-scene comparisons pass; both 192-sample daylight audits pass. The local build serves the current models. The workspace check has exactly its 345 baseline findings. Native images were inspected; live browser screenshot review is unavailable. No publication. See the corresponding final-validation.json.\n')
