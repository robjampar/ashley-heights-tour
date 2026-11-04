from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,json,hashlib,shutil,sys
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];D=Path(__file__).parent;sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
B='/Users/r.parker/Applications/Blender.app/Contents/MacOS/Blender'
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
def run(label,args):
    path=R/f'logs/lounge-open-entry-{label}.log'
    with path.open('w')as log:result=subprocess.run(args,cwd=R,stdout=log,stderr=subprocess.STDOUT)
    if label=='check-layout':
        assert path.read_text()==(R/'logs/terrace-lounge-west-suite-check-layout.log').read_text(),'Workspace layout findings changed'
        print('check-layout matches existing 345-finding baseline',flush=True);return
    result.check_returncode()
    print(label,'complete',flush=True)
def prepare(v):run('prepare-'+v,[B,'--background','--python-exit-code','1','--python',str(D/'prepare.py'),'--',v])
with ThreadPoolExecutor(max_workers=2)as pool:list(pool.map(prepare,['compact','planning']))
for v in ['compact','planning']:
    source=R/f'outputs/output-lounge-open-entry-{v}';target=R/f'outputs/output-proposed-{v}';original=D/'original'/f'outputs/output-proposed-{v}'
    report=json.loads((source/'change-report.json').read_text());assert report['sourceInputs']==source_hashes(R,v)
    files=[native_name(v)+'.blend',native_name(v)+'.glb','geometry.json','navigation.json']
    for f in files:assert sha(target/f)==sha(original/f)
    for f in files:shutil.copyfile(source/f,target/f)
    shutil.copyfile(target/(native_name(v)+'.glb'),R/f'walkthrough/public/proposal-{v}.glb')
    shutil.copyfile(target/'navigation.json',R/f'walkthrough/public/proposal-{v}-navigation.json')
    report.update(updatedAt=datetime.now(timezone.utc).isoformat(),files={f:sha(target/f)for f in files},published=False,method='Remove the lounge landing door and stops, retain lined opening; targeted native and GLB root update, binary mesh and image data preserved.')
    (target/'lounge-open-entry-refresh.json').write_text(json.dumps(report,indent=2)+'\n')
    print('installed',v,flush=True)
def visuals(v):
    for script,args,label in [('export_visual_refinement.py',[v],'visuals'),('bake_walkthrough_daylight.py',[v,'--samples','192'],'daylight')]:
        run(label+'-'+v,[B,'--background','--python-exit-code','1','--python',str(R/'scripts/exports'/script),'--',*args])
with ThreadPoolExecutor(max_workers=2)as pool:list(pool.map(visuals,['compact','planning']))
with ThreadPoolExecutor(max_workers=3)as pool:
    tasks=[pool.submit(run,'build-web',['make','build-web']),pool.submit(run,'web-tests',['make','test-web']),pool.submit(run,'check-layout',['make','check-layout'])]
    for t in tasks:t.result()
print('OPEN_ENTRY_READY_FOR_REVIEW',flush=True)
