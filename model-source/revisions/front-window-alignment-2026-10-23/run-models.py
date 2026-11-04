from pathlib import Path
import subprocess,sys
R=Path(__file__).resolve().parents[2];variant=sys.argv[1]
for stage in ['prepare','export']:
 with (R/f'logs/front-window-alignment-{stage}-{variant}.log').open('w') as log:
  subprocess.run(['/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender','--background','--python-exit-code','1','--python',str(Path(__file__).parent/(stage+'.py')),'--',variant],stdout=log,stderr=subprocess.STDOUT,check=True)
 print(variant,stage,'complete',flush=True)
