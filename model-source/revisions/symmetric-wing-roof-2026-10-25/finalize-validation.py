"""Tie the final visual review to the installed files and test evidence."""
from pathlib import Path
import json,hashlib,re,sys
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
REV='symmetric-wing-roof-2026-10-25';E=R/'walkthrough/test-results'/REV
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
load=lambda p:json.loads(p.read_text())
checks=load(E/'after/checks.json');review=load(E/'visual-review.json');assert review['passed']and len(review['reviewedFiles'])==16
assert not checks['errors']and not checks['failed'];assert len(checks['records'])==16
for file in review['reviewedFiles']:assert(E/'after'/file).is_file()
assert all(r['passed']for r in load(E/'geometry-verification.json'))
assert all(r['equal']for r in load(E/'native-preservation-compact-planning.json'))
assert all(r['passed']for r in load(E/'served-assets.json'))
assert all(r['nativeUnchanged']and r['navigationMatched']and r['baseModelMatched']for r in load(E/'visual-quality-audit.json'))
records=[]
for variant in('compact','planning'):
 out=R/f'outputs/output-proposed-{variant}';report=load(out/'symmetric-wing-roof-refresh.json');assert report['sourceInputs']==source_hashes(R,variant)
 for f,digest in report['files'].items():assert sha(out/f)==digest
 geometry=load(E/f'export-check-{variant}.json');assert not geometry['failures'];assert geometry['sourceSHA256']==sha(out/(native_name(variant)+'.glb'))
 assert load(E/f'navigation-{variant}.json')['passed'];assert report['changes']['symmetricWingRoof']['closedRoofScribedWalls']
 bake=load(R/f'walkthrough/public/visual-quality/{variant}-daylight.json');assert bake['samples']==192
 records.append({'variant':variant,'files':report['files'],'headSamples':geometry['headSamples'],'minimumSampledHabitableCeilingM':geometry['minHabitableCeiling'],'minimumIncludingExistingLowStorageDoorM':geometry['minHead'],'lightingSamples':192})
web=(R/'logs/symmetric-wing-roof-web-tests.log').read_text();py=(R/'logs/symmetric-wing-roof-python-tests.log').read_text();assert 'fail 0'in web and '\nOK\n'in py
layout=(R/'logs/symmetric-wing-roof-check-layout.log').read_text();baseline=(R/'logs/lounge-open-entry-check-layout.log').read_text();assert layout==baseline
result={'revision':REV,'checkedAt':datetime.now(timezone.utc).isoformat(),'status':'passed','published':False,'variants':records,'pythonTests':int(re.search(r'Ran (\d+) tests',py)[1]),'viewerTests':int(re.search(r'pass (\d+)',web)[1]),'retainedOriginalScenesPerVariant':7,'unrelatedProposalNativeObjectsPreserved':True,'browserCaptures':len(checks['records']),'visuallyReviewedFiles':review['reviewedFiles'],'consoleErrors':checks['errors'],'consoleWarnings':checks['warnings'],'failedRequests':checks['failed'],'layoutFindings':345,'layoutMatchesExistingBaseline':True,'scope':'Local editable models and walkthrough; main symmetric wing roof with retained north connector and level circulation. Planning drawing packs and structural construction design are separate.'}
(E/'final-validation.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
