"""Prepare three cache-compatible model packages; does not deploy or retire live files.

Deploy in order. Before each subsequent stage, confirm the previous deployment
succeeded and allow at least 30 minutes for cached HTML to expire. A final full
Pages artifact validation is still required after restoring original tour files.
"""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import copy,hashlib,json,os,re,shutil,subprocess
from scripts.publication.compact_pages_stage import inventory, SECTIONS
from scripts.publication.pages_artifact import public_files, BUDGET

ROOT=Path(__file__).resolve().parents[2]
REPO=ROOT/'deployment/ashley-heights-tour'
OUT=ROOT/'outputs/output/publication-rollout'
HASHED=re.compile(r'\.[0-9a-f]{16}\.[a-z0-9]+(?:\.gz)?$|/[0-9a-f]{64}\.(png|jpg)$')


def prepare():
    env={**os.environ,'GIT_NO_LAZY_FETCH':'1'}
    def git(*args):return subprocess.check_output(['git','-C',str(REPO),*args],env=env)
    base_commit=git('rev-parse','HEAD').decode().strip()
    old=json.loads(git('show','HEAD:model/release.json'))
    new=json.loads((REPO/'model/release.json').read_text())
    old_paths=git('ls-tree','-r','--name-only','HEAD','model').decode().splitlines()
    new_paths=[p.relative_to(REPO).as_posix()for p in (REPO/'model').rglob('*')if p.is_file()]
    def group(name):
        for key,prefix in SECTIONS.items():
            if name.startswith('model/'+prefix+'/'):return key
        return 'main'
    fixed=[p for p in public_files(REPO)if not p.is_relative_to(REPO/'model')]
    fixed_bytes=sum(p.stat().st_size for p in fixed)
    tracked_original=git('ls-tree','-r','--name-only','HEAD','assets').decode().splitlines()
    missing=[n for n in tracked_original if not(REPO/n).is_file()]
    prev=old;reports=[]
    for index,changed in enumerate(({'principal_studio','interior_studio'},
                                    {'principal_studio','interior_studio','leisure_studio'},
                                    {'main',*SECTIONS}),1):
        dest=OUT/f'stage-{index}'/'model'
        if dest.exists():shutil.rmtree(dest)
        dest.mkdir(parents=True)
        manifest=copy.deepcopy(new if 'main'in changed else old)
        for key in SECTIONS:
            selected=(new if key in changed else old).get(key)
            if selected is None:manifest.pop(key,None)
            else:manifest[key]=copy.deepcopy(selected)
        manifest['shared_textures']=copy.deepcopy(new.get('shared_textures',{}))
        manifest['previous_assets']={}
        for key in SECTIONS:
            if key in manifest:manifest[key]['previous_assets']={}
        active=inventory(manifest);previous=inventory(prev)
        retained={n:v for n,v in previous.items()if n not in active}
        for name,info in retained.items():
            key=group(name);relative=name[len('model/'):]if key=='main'else name[len('model/'+SECTIONS[key]+'/'):]
            section=manifest if key=='main'else manifest[key]
            section.setdefault('previous_assets',{})[relative]={**info,'retain_until_next_confirmed_deployment':True}
        # Immutable files are verified against the selected manifest.
        for name,info in {**active,**retained}.items():
            payload=(REPO/name).read_bytes()
            if info.get('sha256') and hashlib.sha256(payload).hexdigest()!=info['sha256']:raise ValueError(name)
            target=dest/Path(name).relative_to('model');target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(payload)
        for name in sorted(set(old_paths)|set(new_paths)):
            if HASHED.search(name)or name=='model/release.json':continue
            current=group(name)in changed
            if current and name not in new_paths or not current and name not in old_paths:continue
            payload=(REPO/name).read_bytes()if current else git('show','HEAD:'+name)
            target=dest/Path(name).relative_to('model');target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(payload)
        manifest['rollout']={'stage':index,'base_commit':base_commit,'minimum_wait_after_previous_deployment_seconds':1800 if index>1 else 0}
        (dest/'release.json').write_text(json.dumps(manifest,indent=2)+'\n')
        model_bytes=sum(p.stat().st_size for p in dest.rglob('*')if p.is_file())
        if model_bytes+fixed_bytes>BUDGET:raise RuntimeError(f'Stage {index} exceeds Pages budget')
        reports.append({'stage':index,'model_directory':str(dest.relative_to(ROOT)),
                        'public_bytes_without_missing_original_files':model_bytes+fixed_bytes,
                        'budget_headroom_bytes':BUDGET-model_bytes-fixed_bytes,
                        'retained_previous_assets':len(retained),'active_assets':len(active)})
        prev=manifest
    report={'base_commit':base_commit,'stages':reports,'missing_original_tour_files':missing,
            'status':'prepared locally; not deployed',
            'requirements':['Restore original tour files and recheck actual budget.',
                            'Upload and verify brochure release downloads before stage 3.',
                            'Confirm each deployment succeeded; wait at least 1800 seconds before the next stage.',
                            'Replace only model/ with the stage model directory; retain the complete original tour.',
                            'Run pages_artifact.py before each commit and push.']}
    (OUT/'rollout.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report,indent=2))


if __name__=='__main__':prepare()
