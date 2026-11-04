import json,sys,shutil,subprocess,os,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name
E=R/'walkthrough/test-results/terrace-lounge-west-suite-2026-10-23';assets=E/'preflight';assets.mkdir(exist_ok=True)
for v in ('compact','planning'):
 p=R/f'outputs/output-terrace-lounge-west-suite-{v}'
 shutil.copyfile(p/(native_name(v)+'.glb'),assets/f'proposal-{v}.glb')
 shutil.copyfile(p/'navigation.json',assets/f'proposal-{v}-navigation.json')
 subprocess.run(['node',str(Path(__file__).parent/'check-export.mjs'),v],check=True)
with (R/'logs/terrace-lounge-west-suite-preflight.log').open('w') as stream:
 subprocess.run(['node','--test','walkthrough/tests/suite-layout-loft.test.mjs','walkthrough/tests/modern-loft-stair.test.mjs','walkthrough/tests/terrace-suite-layout.test.mjs'],cwd=R,env={**os.environ,'OAK_STAIR_ASSET_DIR':str(assets)},stdout=stream,stderr=subprocess.STDOUT,check=True)
print('TERRACE_SUITE_PREFLIGHT_PASS',flush=True)
