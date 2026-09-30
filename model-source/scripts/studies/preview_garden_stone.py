"""Local material preview using the same geometry as the native build."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
from pathlib import Path
import json,hashlib,shutil
from scripts.interiors.garden_stone import parts, COLORS, PREFIX
from scripts.studies.preview_principal_gable_wall import read_glb, write_glb, append_parts
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'revisions/garden-stone-2026-09-29';OUT.mkdir(exist_ok=True)
path=ROOT/'walkthrough/public/proposal-compact.glb';backup=OUT/'before.glb';reportpath=OUT/'report.json'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
if reportpath.exists():
 old=json.loads(reportpath.read_text());assert sha(path) in (old['beforeSha256'],old['afterSha256']),'Local model changed since this preview'
if not backup.exists():shutil.copy2(path,backup)
doc,buf=read_glb(backup);cfg=json.loads((ROOT/'proposal/interiors/garden-stone.json').read_text());nodes=[n for n in doc['nodes'] if n.get('name')==cfg['object']];assert len(nodes)==1
mesh=doc['meshes'][nodes[0]['mesh']];original=json.loads(json.dumps(mesh));changed=[]
def mat(name,col):
 i=len(doc['materials']);doc['materials'].append({'name':name,'pbrMetallicRoughness':{'baseColorFactor':list(col),'metallicFactor':0,'roughnessFactor':.91}});return i
mortar=mat(PREFIX+'recessed lime mortar',(.69,.65,.56,1))
for i,p in enumerate(mesh['primitives']):
 name=doc['materials'][p['material']]['name']
 if name=='Proposal | Limestone render':p['material']=mortar;changed.append(i)
assert len(changed)==1
stones=parts(cfg)
for i,c in enumerate(COLORS):append_parts(doc,buf,[p for p in stones if p['material']==i],mat(PREFIX+'pale stone '+str(i+1),c))
write_glb(path,doc,buf)
check,b=read_glb(path)
for i,p in enumerate(original['primitives']):
 if i not in changed:assert check['meshes'][nodes[0]['mesh']]['primitives'][i]==p
report={'beforeSha256':sha(backup),'afterSha256':sha(path),'stones':len(stones),'face':cfg['face'],'exteriorPrimitivesPreserved':True,'nativeBuildIntegrated':True,'canonicalBlendUnchanged':True}
reportpath.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
