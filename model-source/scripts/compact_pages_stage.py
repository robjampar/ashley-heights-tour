"""Archive obsolete staging files while protecting committed release assets.

Uncommitted, superseded build outputs were never published by this checkout.
Committed current-release assets are always protected, regardless of age.
Removed files are moved into a local recovery directory, never destroyed.
"""
from pathlib import Path
import json,os,re,shutil,subprocess,time

ROOT=Path(__file__).resolve().parents[1]
REPO=ROOT/'deployment/ashley-heights-tour'
RECOVERY=ROOT/'revisions/publication-size-2026-09-28/archived-stage'
SECTIONS={'interior_studio':'interiors/kitchen','principal_studio':'interiors/principal',
          'leisure_studio':'interiors/leisure','redesign_review':'redesigns','brochure':'brochure'}


def inventory(manifest, previous=False):
    result={};key='previous_assets' if previous else 'assets'
    result.update({'model/'+n:v for n,v in manifest.get(key,{}).items()})
    for section,prefix in SECTIONS.items():
        result.update({'model/'+prefix+'/'+n:v for n,v in manifest.get(section,{}).get(key,{}).items()})
    if not previous:result.update({'model/'+n:v for n,v in manifest.get('shared_textures',{}).items()})
    return result


def main():
    env={**os.environ,'GIT_NO_LAZY_FETCH':'1'}
    manifest_path=REPO/'model/release.json'
    current=json.loads(manifest_path.read_text())
    head=json.loads(subprocess.check_output(['git','-C',str(REPO),'show','HEAD:model/release.json'],env=env))
    tracked=set(subprocess.check_output(['git','-C',str(REPO),'ls-files'],text=True).splitlines())
    active=inventory(current);old=inventory(current,True);protected=inventory(head)
    protected.update({n:v for n,v in inventory(head,True).items() if v.get('retain_until_epoch',0)>time.time()})
    moved=[]
    hashed=re.compile(r'\.[0-9a-f]{16}\.[a-z0-9]+(?:\.gz)?$|^[0-9a-f]{64}\.(png|jpg)$')
    for file in (REPO/'model').rglob('*'):
        if not file.is_file() or not hashed.search(file.name):continue
        name=file.relative_to(REPO).as_posix()
        if name in active or name in protected:continue
        if name in tracked and old.get(name,{}).get('retain_until_epoch',0)>time.time():continue
        target=RECOVERY/name;target.parent.mkdir(parents=True,exist_ok=True)
        size=file.stat().st_size;shutil.move(file,target);moved.append({'path':name,'bytes':size})
    for section,prefix in [(None,'model'),*[(s,'model/'+p)for s,p in SECTIONS.items()]]:
        data=current if section is None else current.get(section,{})
        data['previous_assets']={n:v for n,v in data.get('previous_assets',{}).items() if (REPO/prefix/n).is_file()}
        # Preserve the actual committed release, not just earlier local drafts.
        for name,info in protected.items():
            relative=Path(name).relative_to('model')
            if section is None and len(relative.parts)!=1:continue
            if section is not None and not name.startswith(prefix+'/'):continue
            local=name[len(prefix)+1:]
            if name not in active and (REPO/name).is_file():
                data.setdefault('previous_assets',{})[local]={**info,'protected_committed_release':True}
    manifest_path.write_text(json.dumps(current,indent=2)+'\n')
    report={'archived_files':len(moved),'archived_bytes':sum(x['bytes']for x in moved),
            'recovery_directory':str(RECOVERY.relative_to(ROOT)),
            'protected_committed_assets':len(protected),'missing_committed_assets':[n for n in protected if not(REPO/n).is_file()],
            'files':moved}
    (RECOVERY.parent/'cleanup-report.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({k:v for k,v in report.items()if k!='files'},indent=2))


if __name__=='__main__':main()
