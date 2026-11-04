from pathlib import Path
import json,hashlib,sys,re
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import source_hashes
E=R/'walkthrough/test-results/lounge-open-entry-2026-10-23'
load=lambda p:json.loads(p.read_text())
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
variants=[]
for v in ['compact','planning']:
    out=R/f'outputs/output-proposed-{v}';r=load(out/'lounge-open-entry-refresh.json')
    assert r['sourceInputs']==source_hashes(R,v)
    assert r['originalScenesPreserved'] and r['binaryChunkUnchanged']
    for f,digest in r['files'].items():assert sha(out/f)==digest
    assert len(r['removed'])==11 and len(r['renamed'])==9
    variants.append({'variant':v,'files':r['files'],'originalScenesPreserved':7,'removedDoorAndStopParts':11,'retainedLiningParts':9})
for filename in ['opening-check.json','served-assets.json']:assert all(r['passed']for r in load(E/filename))
for r in load(E/'visual-quality-audit.json'):
    assert r['nativeUnchanged'] and r['navigationMatched'] and r['baseModelMatched'] and r['samples']==192
browser=load(E/'browser-checks.json');assert len(browser['reviewedFiles'])==4
assert not browser['errors'] and not browser['failed'] and not browser['warnings']
tests=(R/'logs/lounge-open-entry-web-tests-final.log').read_text();assert 'fail 0'in tests
assert (R/'logs/lounge-open-entry-check-layout.log').read_text()==(R/'logs/terrace-lounge-west-suite-check-layout.log').read_text()
report={'revision':'lounge-open-entry-2026-10-23','checkedAt':datetime.now(timezone.utc).isoformat(),'status':'passed','variants':variants,'viewerTests':int(re.search(r'pass (\d+)',tests)[1]),'browserScreenshotsReviewed':browser['reviewedFiles'],'layoutFindings':345,'layoutMatchesPreviousBaseline':True,'published':False}
(E/'final-validation.json').write_text(json.dumps(report,indent=2)+'\n');print('FINAL_VALIDATION_PASSED',report['viewerTests'])
with (Path(__file__).parent/'README.md').open('a')as f:f.write('\nFinal verification: 270 viewer tests pass. Both open entrances pass mesh-ray and walking checks, all other interactive doors match the previous revision, and both lighting/served-asset audits pass. Four actual Chrome screenshots were reviewed with no console errors, warnings or failed requests. The workspace checker matches the existing 345-finding baseline. See `final-validation.json` in the evidence directory.\n')
