"""Record completed checks after actual browser images have been inspected."""
import json,hashlib,re,sys
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import source_hashes
rev='garden-workshop-envelope-2026-10-26';E=R/'walkthrough/test-results'/rev;P=R/'outputs/output-proposed-compact';C=R/'outputs/output-garden-workshop-envelope-compact'
read=lambda p:json.loads(p.read_text())
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
refresh=read(P/'garden-workshop-envelope-refresh.json')
assert refresh['sourceInputs']==source_hashes(R,'compact')
assert all(sha(P/name)==digest for name,digest in refresh['files'].items())
assert all(sha(C/name)==digest for name,digest in refresh['files'].items())
recovery=read(R/'revisions'/rev/'recovery.json');assert all(sha(R/name)==digest for name,digest in recovery['planning'].items())
n=read(P/'navigation.json');g=read(P/'geometry.json');old=read(R/'revisions'/rev/'original/outputs/output-proposed-compact/geometry.json');report=n['gardenWorkshopEnvelope']
excluded=set(report['changed']+report['removed']+report['created'])
original={o['object_name']:o for o in old['objects']if o['object_name']not in excluded};current={o['object_name']:o for o in g['objects']if o['object_name']not in excluded};assert original==current
geometry={'passed':True,'geometrySHA256':sha(P/'geometry.json'),'unrelatedUnchanged':len(original),'internalAreaM2':report['internalAreaM2'],'finishedHeightM':report['heightAboveAdjacentFinishedGroundM'],'originalGroundHeightM':report['heightAboveHighestOriginalAdjacentGroundM'],'roofAndGutterToModelledFenceM':report['roofAndGutterToModelledFenceM']}
(E/'geometry-verification.json').write_text(json.dumps(geometry,indent=2))
export=read(E/'export-check-compact.json');assert export['passed'] and export['sourceSHA256']==refresh['files']['Ashley Heights — Proposed (compact).glb']
native=read(E/'native-preservation-compact.json')[0];assert native['equal'] and native['candidateSHA256']==refresh['files']['Ashley Heights — Proposed (compact).blend']
visual=read(E/'visual-quality-audit.json');assert all(v['nativeUnchanged']and v['navigationMatched']and v['baseModelMatched']and v['samples']==192 for v in visual)
served=read(E/'served-assets.json');assert all(v['passed']for v in served)
browser=read(E/'after/checks.json');assert not browser['errors']and not browser['warnings']and not browser['failed'];assert len(browser['records'])==7
for item in browser['records']:assert (E/'after'/item['file']).is_file()
browser['status']='Seven final Chrome captures visually inspected: fixed brick exterior, matte roof, clean cappings, fitted storage/bench, closed and open door, retained Planning roof. No foliage inside the workshop.'
(E/'after/checks.json').write_text(json.dumps(browser,indent=2))
python=(R/'logs/garden-workshop-python.log').read_text();web=(R/'logs/garden-workshop-web-tests.log').read_text();assert 'Ran 114 tests'in python and '\nOK\n'in python;assert 'tests 279'in web and 'fail 0'in web
lines=lambda p:[x for x in p.read_text().splitlines()if x.startswith(('Implementation needs a package:','Current JSON specs belong','Test logs belong'))]
layout=lines(R/'logs/garden-workshop-check-layout.log');assert len(layout)==345 and layout==lines(R/'logs/lounge-open-entry-check-layout.log')
result={'revision':rev,'completedAt':datetime.now(timezone.utc).isoformat(),'status':'complete; local only','published':False,'pythonTests':114,'viewerTests':279,'browserScreenshotsReviewed':7,'browserErrors':[],'browserWarnings':[],'failedRequests':[],'originalScenesPreserved':7,'unrelatedProposalObjectsPreserved':len(original),'planningNativeOutputsUnchanged':True,'export':export,'geometry':geometry,'visualQuality':visual,'servedAssets':served,'workspaceLayout':{'existingFindings':345,'matchesBaseline':True},'files':refresh['files'],'constructionStatus':'Architectural concept; full substantially non-combustible assembly and surveyed levels need confirmation before construction.'}
(E/'final-validation.json').write_text(json.dumps(result,indent=2));print('FINAL_VALIDATION',json.dumps({k:result[k]for k in('status','pythonTests','viewerTests','browserScreenshotsReviewed','planningNativeOutputsUnchanged')}))
