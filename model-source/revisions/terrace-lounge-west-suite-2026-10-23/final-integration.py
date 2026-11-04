from pathlib import Path
import subprocess,sys
from concurrent.futures import ThreadPoolExecutor
R=Path(__file__).resolve().parents[2];D=Path(__file__).parent;py=str(R/'.venv/bin/python');blender='/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender'
def run(label,args):
 with (R/f'logs/terrace-lounge-west-suite-{label}.log').open('w')as stream:subprocess.run(args,cwd=R,stdout=stream,stderr=subprocess.STDOUT,check=True)
 print(label,'complete',flush=True)
run('geometry',[py,str(D/'check-geometry.py')])
with ThreadPoolExecutor(max_workers=2)as pool:
 jobs=[pool.submit(run,'original-scenes',[blender,'--background','--python-exit-code','1','--python',str(D/'check-original-scenes.py'),'--','compact','planning']),pool.submit(run,'preflight-run',[py,str(D/'run-preflight.py')])]
 for job in jobs:job.result()
run('installation',[py,str(D/'install.py')])
with ThreadPoolExecutor(max_workers=3)as pool:
 jobs=[pool.submit(run,'visual-build-'+v,[py,str(D/'run-visuals.py'),v])for v in ('compact','planning')]
 jobs.append(pool.submit(run,'python-tests',[py,'-m','unittest','discover','-s','tests']))
 for job in jobs:job.result()
subprocess.run([py,str(D/'finish-review.py')],cwd=R,check=True)
