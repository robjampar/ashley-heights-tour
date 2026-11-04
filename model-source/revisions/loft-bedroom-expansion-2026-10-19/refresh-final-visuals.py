import subprocess,json,time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parents[2];blender=str(Path.home()/'Applications/Blender.app/Contents/MacOS/Blender')
def variant(v):
 report=[]
 for label,script,extra in [('furnishings','scripts/exports/export_visual_refinement.py',[]),('daylight','scripts/exports/bake_walkthrough_daylight.py',['--samples','192'])]:
  log=ROOT/f'logs/loft-bedroom-final-{v}-{label}-head-finish-2026-10-19.log';start=time.time()
  with log.open('w')as f:subprocess.run([blender,'--background','--python-exit-code','1','--python',script,'--',v,*extra],cwd=ROOT,stdout=f,stderr=subprocess.STDOUT,check=True)
  report.append({'variant':v,'stage':label,'seconds':round(time.time()-start,2),'log':str(log.relative_to(ROOT))});print(v,label,'complete',flush=True)
 return report
with ThreadPoolExecutor(max_workers=2)as pool:report=[item for batch in pool.map(variant,['compact','planning'])for item in batch]
(ROOT/'walkthrough/test-results/loft-bedroom-expansion-2026-10-19/final-visual-build.json').write_text(json.dumps(report,indent=2)+'\n')
