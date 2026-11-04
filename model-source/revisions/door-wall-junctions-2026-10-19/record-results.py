import json,re,hashlib
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/door-wall-junctions-2026-10-19'
web=(R/'logs/door-wall-final-web-tests.log').read_text();python=(R/'logs/door-wall-final-python.log').read_text();assert 'ℹ pass 194'in web and 'ℹ fail 0'in web;assert re.search(r'Ran 106 tests.*?\nOK\n',python,re.S)
native=json.loads((E/'native-preservation.json').read_text());assert all(r['equal']for r in native)
preservation=json.loads((E/'geometry-preservation.json').read_text());assert all(not r['unrelatedChanges']and r['navigationPreserved']for r in preservation)
audit=json.loads((E/'visual-quality-audit.json').read_text());assert all(r['samples']==192 for r in audit)
assert 'Offline walkthrough built in dist/'in(R/'logs/door-wall-final-web-build.log').read_text();assert '345 existing layout findings; no increase'in(R/'logs/door-wall-final-layout-baseline.log').read_text()
report={'completedAt':datetime.now(timezone.utc).isoformat(),'variants':['compact','planning'],'viewerTests':194,'pythonTests':106,'totalTests':300,'failures':0,'frameGroups':{'compact':33,'planning':32},'nativeOriginalScenesPreserved':True,'unrelatedGeometryAndNavigationPreserved':True,'daylightSamples':192,'localViewerBuilt':True,'layout':{'existingFindings':345,'newFindings':0,'rawCheckPass':False},'browserReview':{'beforeCorrectionInspected':True,'afterCorrectionCompleted':False,'reason':'Computer/browser connection became unavailable; no final screenshots claimed.'},'published':False,'currentProvenance':['door-wall-final-refresh.json','door-wall-cinema-refresh.json']}
(E/'validation-summary.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
