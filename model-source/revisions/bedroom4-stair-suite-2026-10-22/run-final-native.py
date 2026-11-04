from pathlib import Path
import subprocess,sys
R=Path(__file__).resolve().parents[2];v=sys.argv[1];B='/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender';D=R/'revisions/bedroom4-stair-suite-2026-10-22'
jobs=[]
if v=='compact':jobs.append(('render-integrated.py',[v,'prepared','approach','arrival'],'render-'+v))
else:
 jobs.append(('check-original-scenes.py',['compact','planning'],'original-scenes'))
 jobs.append(('render-integrated.py',[v,'prepared','arrival'],'render-'+v))
jobs.append(('export.py',[v],'export-'+v))
for script,args,label in jobs:
 with (R/f'logs/bedroom4-{label}.log').open('w')as stream:
  subprocess.run([B,'--background','--python-exit-code','1','--python',str(D/script),'--',*args],stdout=stream,stderr=subprocess.STDOUT,check=True)
 print('COMPLETE',v,label,flush=True)
