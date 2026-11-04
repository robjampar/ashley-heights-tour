import json,re,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/loft-dormer-alignment-2026-10-19';prefix=R/'logs'
web=(prefix/'loft-dormer-alignment-final-web-tests-2026-10-19.log').read_text();python=(prefix/'loft-dormer-alignment-final-python-2026-10-19.log').read_text()
assert re.search(r'fail\s+0(?:\n|\r)',web);assert '\nOK\n' in python
native=json.loads((E/'native-preservation.json').read_text());assert all(r['equal']for r in native)
geo=json.loads((E/'geometry-review.json').read_text());assert all(not r['failures']and not r['floorFailures']and not r['stairBodyConflicts']and all(not c['conflicts']for c in r['circulation'].values())for r in geo['reports'])
preservation=json.loads((E/'targeted-preservation.json').read_text());assert all(not r['unexpected']and not r['exteriorChanged']for r in preservation)
layout=json.loads((E/'layout-comparison.json').read_text());assert layout['unchanged']
report={'webTests':{'passed':int(re.search(r'pass\s+(\d+)',web)[1]),'failed':0,'log':'logs/loft-dormer-alignment-final-web-tests-2026-10-19.log'},'pythonTests':{'passed':int(re.search(r'Ran (\d+) tests',python)[1]),'failed':0,'log':'logs/loft-dormer-alignment-final-python-2026-10-19.log'},'geometryReview':'geometry-review.json','nativePreservation':'native-preservation.json','targetedPreservation':'targeted-preservation.json','visualQualityAudit':'visual-quality-audit.json','eavesFrameRoofCheck':'eaves-frame-roof-check.json','layout':'layout-comparison.json','sourceSHA256':{str(p):hashlib.file_digest((R/p).open('rb'),'sha256').hexdigest()for p in ['scripts/model/proposal_loft_bedroom_expansion.py','proposal/interiors/leisure/loft-bedroom-expansion.json','proposal/interiors/leisure/loftsuite.json','proposal/interiors/leisure/loft-stair.json']},'published':False}
(E/'validation-summary.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
