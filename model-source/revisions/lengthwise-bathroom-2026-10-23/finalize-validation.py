from pathlib import Path
import json,hashlib,urllib.request,re
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/lengthwise-bathroom-2026-10-23'
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
served=json.loads((E/'served-assets.json').read_text());assert len(served)==2 and all(x['passed']for x in served)
records=[]
for v in ('compact','planning'):
 d=R/f'outputs/output-proposed-{v}';rep=json.loads((d/'lengthwise-bathroom-refresh.json').read_text());g=json.loads((E/f'export-check-{v}.json').read_text());assert not g['failures']
 for name,h in rep['files'].items():assert sha(d/name)==h
 assert json.loads((E/f'door-swings-{v}.json').read_text())['passed'];assert json.loads((E/f'navigation-{v}.json').read_text())['passed']
 for filename in [f'proposal-{v}.glb',f'proposal-{v}-navigation.json']:
  data=urllib.request.urlopen('http://127.0.0.1:8765/'+filename).read();assert hashlib.sha256(data).hexdigest()==sha(R/'walkthrough/dist'/filename)
 records.append({'variant':v,'files':rep['files'],'sampledSuiteHeadroomMetres':g['minHead'],'geometryCheckScope':g['scope'],'headSamples':g['headSamples'],'exportedGeometryPassed':True,'doorSwingSamplesPassed':True,'walkingNavigationPassed':True,'httpMatchesBuiltAssets':True,'servedAssetVerification':next(x for x in served if x['variant']==v)})
web=(R/'logs/lengthwise-bathroom-test-web.log').read_text();python=(R/'logs/lengthwise-bathroom-test-python.log').read_text();assert re.search(r'fail\s+0',web);assert '\nOK\n'in python
visual=json.loads((E/'visual-quality-audit.json').read_text());assert len(visual)==2 and all(v['nativeUnchanged'] and v['navigationMatched'] and v['baseModelMatched'] and v['samples']==192 for v in visual)
assert (R/'logs/lengthwise-bathroom-check-layout.log').read_text()==(R/'logs/light-oak-workspace-check.log').read_text()
assert all(x['equal']for x in json.loads((E/'native-preservation-compact-planning.json').read_text()))
browser=json.loads((E/'browser-review/checks.json').read_text());assert browser['status']=='visually reviewed';assert not browser['errors'] and not browser['warnings'] and not browser['failed']
report={'revision':'lengthwise-bathroom-2026-10-23','completedAt':datetime.now(timezone.utc).isoformat(),'status':'implemented locally','published':False,'fullArchitecturalRebuild':False,'models':records,'viewerTests':int(re.search(r'tests\s+(\d+)',web).group(1)),'pythonTests':int(re.search(r'Ran (\d+) tests',python).group(1)),'workspaceFindings':'345 pre-existing; identical to baseline','nativeOriginalScenesPreserved':True,'visualVerification':'actual Chrome walkthrough screenshots','browserScreenshotReview':{'completed':True,'method':browser['method'],'views':len(browser['records']),'errors':browser['errors'],'warnings':browser['warnings'],'record':'browser-review/checks.json'},'visualQualityAudit':visual,'constructionLimit':'Targeted architectural visualization; the previously accepted staircase, loft storage platform and their recorded construction allowances are unchanged.'}
(E/'final-validation.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
