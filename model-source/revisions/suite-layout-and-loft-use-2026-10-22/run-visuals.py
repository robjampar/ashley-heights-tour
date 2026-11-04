from pathlib import Path
import subprocess,sys
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[1]
blender='/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender'
for script,args,label in [('export_visual_refinement.py',[variant],'visuals'),('bake_walkthrough_daylight.py',[variant,'--samples','192'],'daylight')]:
    with (ROOT/f'logs/suite-layout-{label}-{variant}.log').open('w')as stream:
        subprocess.run([blender,'--background','--python-exit-code','1','--python',str(ROOT/f'scripts/exports/{script}'),'--',*args],check=True,stdout=stream,stderr=subprocess.STDOUT)
    print(variant,label,'complete',flush=True)
