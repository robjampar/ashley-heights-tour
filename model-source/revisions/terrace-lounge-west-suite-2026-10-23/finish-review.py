from pathlib import Path
import subprocess,sys
from concurrent.futures import ThreadPoolExecutor
R=Path(__file__).resolve().parents[2];D=Path(__file__).parent;py=str(R/'.venv/bin/python')
def run(label,args):
 with (R/f'logs/terrace-lounge-west-suite-{label}.log').open('w')as stream:subprocess.run(args,cwd=R,stdout=stream,stderr=subprocess.STDOUT,check=True)
 print(label,'complete',flush=True)
with ThreadPoolExecutor(max_workers=3)as pool:
 jobs=[pool.submit(run,'build-web',['make','build-web']),pool.submit(run,'web-tests',['make','test-web']),pool.submit(run,'visual-audit',[py,str(R/'scripts/audits/audit_visual_quality.py'),'--output',str(R/'walkthrough/test-results/terrace-lounge-west-suite-2026-10-23/visual-quality-audit.json')])]
 for job in jobs:job.result()
with ThreadPoolExecutor(max_workers=2)as pool:
 jobs=[pool.submit(run,'served-assets',['node',str(D/'check-served-assets.mjs')]),pool.submit(run,'browser-review',['node',str(D/'browser-review.mjs'),'after'])]
 for job in jobs:job.result()
print('BROWSER_CAPTURES_READY',flush=True)
