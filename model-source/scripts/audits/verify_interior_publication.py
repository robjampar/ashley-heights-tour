"""Verify the deployed room-review pages and exact content-addressed model bytes."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen,Request
from urllib.parse import quote
import argparse,hashlib,json
ROOT=Path(__file__).resolve().parents[2]
parser=argparse.ArgumentParser();parser.add_argument('--commit',required=True);parser.add_argument('--pages-run',type=int,required=True);parser.add_argument('--output',type=Path,required=True)
args=parser.parse_args();site='https://robjampar.github.io/ashley-heights-tour/model/';local=ROOT/'deployment/ashley-heights-tour/model';release=json.loads((local/'release.json').read_text())

def get(path,cache_bust=False):
    url=site+quote(path,safe='/')+('?v='+args.commit if cache_bust else'')
    with urlopen(Request(url,headers={'User-Agent':'Ashley-Heights-publication-check'}),timeout=90)as response:return response.read()
def digest(data):return hashlib.sha256(data).hexdigest()
assert digest(get('release.json',True))==digest((local/'release.json').read_bytes()),'Deployed release manifest differs'
selected={name:info for name,info in release['assets'].items()if name.startswith(('proposal-compact.','proposal-compact-navigation.','proposal-planning.','proposal-planning-navigation.','app.'))}
studio=release['leisure_studio'];selected.update({'interiors/leisure/'+name:info for name,info in studio['assets'].items()})
def check(item):
    name,info=item;data=get(name);sha=digest(data)
    assert len(data)==info['bytes']and sha==info['sha256'],name
    return {'asset':name,'bytes':len(data),'sha256':sha}
with ThreadPoolExecutor(max_workers=4)as pool:downloads=list(pool.map(check,selected.items()))
pages=[]
for name in ['index.html']+['interiors/leisure/'+name for name in studio['pages']]:
    body=get(name,True);sha=digest(body);assert sha==digest((local/name).read_bytes()),name
    pages.append({'page':name,'sha256':sha})
report={'status':'PASS','commit':args.commit,'pages_run':args.pages_run,'live_downloads':downloads,'live_pages':pages}
args.output.write_text(json.dumps(report,indent=2)+'\n');print('PASS live publication:',len(downloads),'assets and',len(pages),'pages')
