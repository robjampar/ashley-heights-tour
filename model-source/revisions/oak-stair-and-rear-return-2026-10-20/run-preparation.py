"""Prepare, render, then export each derivative; current assets are untouched."""
from pathlib import Path
import subprocess,sys
ROOT=Path(__file__).resolve().parents[2]
REV='oak-stair-and-rear-return-2026-10-20';variant=sys.argv[1]
blender='/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender'
views=['stair-top','stair-side','kitchen-connection','exterior'] if variant=='compact' else ['stair-top']
for script,args,log in [('prepare.py',[variant],'prepare'),('render-review.py',[variant,'prepared',*views],'render'),('export.py',[variant],'export')]:
    with (ROOT/f'logs/oak-stair-return-{log}-{variant}.log').open('w')as stream:
        subprocess.run([blender,'--background','--python-exit-code','1','--python',str(ROOT/f'revisions/{REV}/{script}'),'--',*args],check=True,stdout=stream,stderr=subprocess.STDOUT)
    print(variant,script,'complete',flush=True)
