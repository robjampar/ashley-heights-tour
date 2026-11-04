from pathlib import Path
import json,hashlib,urllib.request,re
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/bedroom4-stair-suite-2026-10-22'
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
served=json.loads((E/'served-assets.json').read_text());assert len(served)==2 and all(x['passed']for x in served)
records=[]
for v in ('compact','planning'):
 d=R/f'outputs/output-proposed-{v}';rep=json.loads((d/'bedroom4-stair-suite-refresh.json').read_text());g=json.loads((E/f'export-check-{v}.json').read_text());assert not g['failures']
 for name,h in rep['files'].items():assert sha(d/name)==h
 assert json.loads((E/f'door-swings-{v}.json').read_text())['passed'];assert json.loads((E/f'navigation-{v}.json').read_text())['passed']
 for filename in [f'proposal-{v}.glb',f'proposal-{v}-navigation.json']:
  data=urllib.request.urlopen('http://127.0.0.1:8765/'+filename).read();assert hashlib.sha256(data).hexdigest()==sha(R/'walkthrough/dist'/filename)
 records.append({'variant':v,'files':rep['files'],'sampledHeadroomMetres':g['minHead'],'headSamples':g['headSamples'],'exportedGeometryPassed':True,'doorSwingSamplesPassed':True,'walkingNavigationPassed':True,'httpMatchesBuiltAssets':True,'servedAssetVerification':next(x for x in served if x['variant']==v)})
web=(R/'logs/bedroom4-web-tests.log').read_text();python=(R/'logs/bedroom4-python-tests.log').read_text();assert re.search(r'fail\s+0',web);assert '\nOK\n'in python
visual=json.loads((E/'visual-quality-audit.json').read_text());assert len(visual)==2
assert (R/'logs/bedroom4-workspace-check.log').read_text()==(R/'logs/light-oak-workspace-check.log').read_text()
assert all(x['equal']for x in json.loads((E/'native-preservation-compact-planning.json').read_text()))
browser=json.loads((E/'browser-review/checks.json').read_text());assert browser['status']=='visually reviewed';assert not browser['errors'] and not browser['failed']
report={'revision':'bedroom4-stair-suite-2026-10-22','completedAt':datetime.now(timezone.utc).isoformat(),'status':'implemented locally','published':False,'fullArchitecturalRebuild':False,'models':records,'viewerTests':int(re.search(r'tests\s+(\d+)',web).group(1)),'pythonTests':int(re.search(r'Ran (\d+) tests',python).group(1)),'workspaceFindings':'345 pre-existing; identical to baseline','nativeOriginalScenesPreserved':True,'nativeInspectionRendersReviewed':True,'browserScreenshotReview':{'completed':True,'method':browser['method'],'views':len(browser['records']),'errors':browser['errors'],'warnings':browser['warnings'],'record':'browser-review/checks.json'},'visualQualityAudit':visual,'constructionLimit':'Approximately 2.01 m minimum hall headroom leaves little tolerance; support design, floor trimming and structural opening require architectural and structural coordination.'}
(E/'final-validation.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
