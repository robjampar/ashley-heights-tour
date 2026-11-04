import json,hashlib,sys
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
E=R/'walkthrough/test-results/front-window-alignment-2026-10-23'
read=lambda f:json.loads((E/f).read_text())
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
geometry=read('geometry-verification.json');assert all(x['passed']for x in geometry)
native=read('native-preservation-compact-planning.json');assert all(x['equal'] for x in native)
visuals=read('visual-quality-audit.json');assert all(x['nativeUnchanged']and x['navigationMatched']and x['baseModelMatched']and x['samples']==192 for x in visuals)
served=read('served-assets.json');assert all(x['passed']for x in served)
browser=read('after/checks.json');assert browser['status']=='visually reviewed';assert not browser['errors']and not browser['failed']
page=read('review-page-checks.json');assert page['imagesLoaded']==6 and not page['errors']and not page['failed']
for filename,count in [('front-window-alignment-web-tests.log',258),('front-window-alignment-preflight.log',34)]:
 text=(R/'logs'/filename).read_text();assert f'pass {count}' in text and 'fail 0' in text
assert 'Ran 107 tests' in (R/'logs/front-window-alignment-python.log').read_text() and '\nOK\n' in (R/'logs/front-window-alignment-python.log').read_text()
assert (R/'logs/front-window-alignment-check-layout.log').read_bytes()==(R/'logs/lengthwise-bathroom-check-layout.log').read_bytes()
models=[]
for v in ('compact','planning'):
 out=R/f'outputs/output-proposed-{v}';report=json.loads((out/'front-window-alignment-refresh.json').read_text());assert report['sourceInputs']==source_hashes(R,v)
 for f,h in report['files'].items():assert sha(out/f)==h
 assert next(x for x in native if x['variant']==v)['candidateSHA256']==sha(out/(native_name(v)+'.blend'))
 check=read(f'export-check-{v}.json');assert not check['failures'];assert check['sourceSHA256']==sha(out/(native_name(v)+'.glb'))
 assert read(f'navigation-{v}.json')['passed']
 models.append({'variant':v,'files':report['files'],'geometry':next(x for x in geometry if x['variant']==v),'sampledSuiteHeadroomMetres':check['minHead'],'suiteHeadroomSamples':check['headSamples']})
result={'revision':'front-window-alignment-2026-10-23','status':'passed','completedAt':datetime.now(timezone.utc).isoformat(),'models':models,'webTests':258,'pythonTests':107,'preflightTests':34,'visualSamples':192,'reviewedScreenshots':len(browser['records']),'originalScenesPreserved':len(native[0]['before']),'workspaceBaselineUnchanged':True,'published':False,'fullArchitecturalRebuildPerformed':False,'standaloneDrawingsRegenerated':False,'reviewURL':'http://127.0.0.1:8900/'}
(E/'final-validation.json').write_text(json.dumps(result,indent=2)+'\n');print('FINAL_VALIDATION_PASS')
