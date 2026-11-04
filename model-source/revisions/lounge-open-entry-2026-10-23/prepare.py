import bpy,json,sys,hashlib,struct
from pathlib import Path
from datetime import datetime,timezone
import numpy as np
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_terrace_lounge_suite import open_lounge_entry
v=sys.argv[sys.argv.index('--')+1];name=native_name(v)
source=Path(__file__).parent/'original'/f'outputs/output-proposed-{v}'
out=R/f'outputs/output-lounge-open-entry-{v}';out.mkdir(exist_ok=True)
E=R/'walkthrough/test-results/lounge-open-entry-2026-10-23'
bpy.ops.wm.open_mainfile(filepath=str(source/(name+'.blend')))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
def signatures():
    result={};cache={}
    for s in bpy.data.scenes:
        if s==scene or 'Proposal ·'in s.name:continue
        d=hashlib.sha256()
        for o in sorted(s.objects,key=lambda ob:ob.name):
            if o.as_pointer()not in cache:
                h=hashlib.sha256();h.update(o.name.encode());h.update(str(tuple(tuple(row)for row in o.matrix_basis)).encode())
                if o.type=='MESH':
                    a=np.empty(len(o.data.vertices)*3,dtype=np.float32);o.data.vertices.foreach_get('co',a);h.update(a.tobytes());h.update(str([m.name for m in o.data.materials]).encode())
                cache[o.as_pointer()]=h.digest()
            d.update(cache[o.as_pointer()])
        result[s.name]=d.hexdigest()
    return result
before=signatures();nav=json.loads((source/'navigation.json').read_text());ns={'scene':scene,'nav':nav}
report=open_lounge_entry(ns);assert len(report['removed'])==11 and len(report['renamed'])==9,report
assert open_lounge_entry(ns)==report
assert before==signatures() and len(before)==7
assert not any(o.name.startswith(report['removedDoor'])for o in scene.objects)
assert len([o for o in scene.objects if o.get('open_passage_lining')])==9
g=json.loads((source/'geometry.json').read_text());g['objects']=[o for o in g['objects']if o['object_name']not in report['removed']]
for o in g['objects']:
    old=o['object_name']
    if old in report['renamed']:
        o['object_name']=report['renamed'][old];o['name']=report['renamed'][old]
g['proposal']['loungeOpenEntry']=report;nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat()
(out/'navigation.json').write_text(json.dumps(nav,separators=(',',':')));(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(name+'.blend')))
# Targeted scene-root removal retains every unrelated mesh and embedded image byte.
raw=(source/(name+'.glb')).read_bytes();length=struct.unpack_from('<I',raw,12)[0];doc=json.loads(raw[20:20+length]);binary=raw[20+length:]
root=doc['scenes'][doc.get('scene',0)];indices=[]
for target in report['removed']:
    matches=[i for i,n in enumerate(doc['nodes'])if n.get('name')==target];assert len(matches)==1,target
    i=matches[0];assert i in root['nodes'];indices.append(i)
root['nodes']=[i for i in root['nodes']if i not in indices]
for n in doc['nodes']:
    old=n.get('name')
    if old in report['renamed']:
        n['name']=report['renamed'][old];extras=n.setdefault('extras',{});extras['source_name']=n['name'];extras['open_passage_lining']=True
        for key in ('frame_doors','detail_source'):extras.pop(key,None)
root.setdefault('extras',{})['lounge_open_entry_report']=json.dumps(report)
blob=json.dumps(doc,separators=(',',':')).encode();blob+=b' '*((-len(blob))%4)
patched=struct.pack('<IIIII',0x46546c67,2,20+len(blob)+len(binary),len(blob),0x4e4f534a)+blob+binary
(out/(name+'.glb')).write_bytes(patched)
report.update(variant=v,originalScenes=before,originalScenesPreserved=True,binaryChunkUnchanged=True,binarySHA256=hashlib.sha256(binary).hexdigest(),sourceInputs=source_hashes(R,v))
(out/'change-report.json').write_text(json.dumps(report,indent=2)+'\n');(E/f'prepare-{v}.json').write_text(json.dumps(report,indent=2)+'\n')
print('OPEN_ENTRY_PREPARED',v,flush=True)
