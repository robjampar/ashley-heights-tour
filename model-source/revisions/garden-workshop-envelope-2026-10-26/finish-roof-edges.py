"""Separate roof cappings in native and matching GLB transforms; no mesh bytes changed."""
import bpy,sys,json,struct,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.model.proposal_garden_workshop_envelope import finish_roof_edges
from scripts.build.build_support import native_name,source_hashes
p=R/'outputs/output-garden-workshop-envelope-compact';name=native_name('compact')
bpy.ops.wm.open_mainfile(filepath=str(p/(name+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
offsets=finish_roof_edges(scene);assert len(offsets)==4
g=json.loads((p/'geometry.json').read_text());n=json.loads((p/'navigation.json').read_text())
for o in g['objects']:
    if o['object_name'] in offsets:
        delta=offsets[o['object_name']];o['vertices']=[[v[k]+delta[k]for k in range(3)]for v in o['vertices']]
report=n['gardenWorkshopEnvelope'];report['roofFasciaOffsetsM']=offsets
g['proposal']['gardenWorkshopEnvelope']=report
scene['garden_workshop_envelope_report']=json.dumps(report)
raw=(p/(name+'.glb')).read_bytes();size=struct.unpack_from('<I',raw,12)[0];data=json.loads(raw[20:20+size]);tail=raw[20+size:];nodes=[]
for node in data['nodes']:
    if node.get('name')in offsets:
        assert 'matrix'not in node and 'rotation'not in node and 'scale'not in node
        dx,dy,dz=offsets[node['name']];v=node.get('translation',[0,0,0]);node['translation']=[v[0]+dx,v[1]+dz,v[2]-dy];nodes.append(node['name'])
assert set(nodes)==set(offsets)
body=json.dumps(data,separators=(',',':')).encode();body+=b' '*((-len(body))%4)
result=struct.pack('<III',0x46546c67,2,20+len(body)+len(tail))+struct.pack('<II',len(body),0x4e4f534a)+body+tail
(p/(name+'.glb')).write_bytes(result)
(p/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(p/'navigation.json').write_text(json.dumps(n,separators=(',',':')))
finish=json.loads((p/'finish-report.json').read_text());finish['gardenWorkshopEnvelope']=report
finish['roofEdgeTransformCorrection']={'offsets':offsets,'beforeGLBSHA256':hashlib.sha256(raw).hexdigest(),'afterGLBSHA256':hashlib.sha256(result).hexdigest(),'binaryChunkUnchanged':True}
(p/'finish-report.json').write_text(json.dumps(finish,indent=2));(p/'source-inputs.json').write_text(json.dumps(source_hashes(R,'compact'),indent=2))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(p/(name+'.blend')))
print('ROOF_CAPPINGS_SEPARATED',offsets,flush=True)
