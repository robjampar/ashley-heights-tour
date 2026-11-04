from pathlib import Path
import subprocess,sys
root=Path(__file__).resolve().parents[2];revision=Path(__file__).resolve().parent;variant=sys.argv[1]
blender='/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender'
for script,args,label in [('render-review.py',[variant,'prepared','stair-side','stair-top']+(['stair-approach']if variant=='compact'else[]),'render'),('export.py',[variant],'export')]:
 with(root/f'logs/light-oak-{label}-{variant}.log').open('w')as f:
  subprocess.run([blender,'-b','--python-exit-code','1','--python',str(revision/script),'--',*args],check=True,stdout=f,stderr=subprocess.STDOUT)
 print(variant,label,'complete',flush=True)
