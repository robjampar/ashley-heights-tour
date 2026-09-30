"""Restore absent committed tour files from Git, without overwriting local edits.

Run again after connectivity is restored to fetch missing promisor objects.
"""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import argparse,json,os,subprocess
from scripts.publication.compact_pages_stage import inventory


def recover(repo, fetch=False):
    env={**os.environ,'GIT_NO_LAZY_FETCH':'0' if fetch else '1'}
    def git(*args,**kwargs):
        return subprocess.check_output(['git','-C',str(repo),*args],env=env,**kwargs)
    manifest=json.loads(git('show','HEAD:model/release.json'))
    required=set(inventory(manifest))
    tree={line.split('\t',1)[1]:line.split()[2] for line in git('ls-tree','-r','HEAD',text=True).splitlines()}
    required.update(name for name in tree if name.startswith('assets/'))
    restored=[];missing=[]
    for name in sorted(required):
        path=repo/name
        if path.is_file():continue
        oid=tree[name]
        exists=git('cat-file','--batch-check',input=oid+'\n',text=True).strip()
        if exists.endswith(' missing') and not fetch:
            missing.append(name);continue
        try:payload=git('cat-file','blob',oid,stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            missing.append(name);continue
        path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(payload);restored.append(name)
    return {'restored':restored,'missing':missing}


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path,required=True)
    parser.add_argument('--fetch',action='store_true',help='Permit Git to fetch missing original objects')
    args=parser.parse_args();result=recover(args.repo,args.fetch);print(json.dumps(result,indent=2))
    raise SystemExit(bool(result['missing']))
