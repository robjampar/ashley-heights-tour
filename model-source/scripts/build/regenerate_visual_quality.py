"""Rebuild the proposal furnishing overlays and directional daylight caches.

Native sources and navigation remain read-only. Run make build-web afterwards.
"""
import argparse
import json
from pathlib import Path
import subprocess
import time

ROOT=Path(__file__).resolve().parents[2]


def main():
    p=argparse.ArgumentParser();p.add_argument('--variant',choices=['compact','planning','both'],default='both')
    p.add_argument('--samples',type=int,default=192);args=p.parse_args()
    blender=next((b for b in [Path.home()/'Applications/Blender.app/Contents/MacOS/Blender',Path('/Applications/Blender.app/Contents/MacOS/Blender')] if b.is_file()),None)
    if blender is None:raise SystemExit('Blender is required for visual quality regeneration')
    report=[]
    for variant in (['compact','planning'] if args.variant=='both' else [args.variant]):
        out=ROOT/f'outputs/output-visual-realism-{variant}';out.mkdir(parents=True,exist_ok=True)
        for label,script,extra in [('furnishings','scripts/exports/export_visual_refinement.py',[]),('daylight','scripts/exports/bake_walkthrough_daylight.py',['--samples',str(args.samples)])]:
            start=time.time();log=out/(label+'.log')
            with log.open('w') as stream:
                subprocess.run([str(blender),'--background','--python-exit-code','1','--python',script,'--',variant,*extra],cwd=ROOT,stdout=stream,stderr=subprocess.STDOUT,check=True)
            report.append({'variant':variant,'stage':label,'seconds':round(time.time()-start,2),'log':str(log.relative_to(ROOT))})
            print(variant,label,'complete',flush=True)
    (ROOT/'logs/visual-quality-build.json').write_text(json.dumps(report,indent=2)+'\n')


if __name__=='__main__':main()
