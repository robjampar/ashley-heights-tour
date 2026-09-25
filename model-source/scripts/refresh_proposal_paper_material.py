"""Refresh only the proposal pendant's exportable opaque shader branch.

Run only after the coordinated native build/export has finished. This saves
the proposed .blend and re-exports its GLB; original files and all navigation
and geometry JSON remain untouched. No model-generation modules are run.
"""
import bpy,json,hashlib,struct,shutil,datetime
from pathlib import Path
from array import array

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output-proposed'
NATIVE=OUT/'Ashley Heights — Proposed.blend'
GLB=OUT/'Ashley Heights — Proposed.glb'
PUBLIC=ROOT/'walkthrough/public/proposal.glb'
REPORT=ROOT/'proposal/P6-paper-material-refresh.json'
MATERIAL='Proposal | Kitchen translucent paper shade'
stamp=lambda:datetime.datetime.now(datetime.timezone.utc).isoformat()
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
baseline=json.loads((ROOT/'proposal/original-preservation.json').read_text())['files']
def original_checks():return {name:digest(ROOT/name)==expected for name,expected in baseline.items()}
assert all(original_checks().values()),'Original-file baseline already differs; material refresh stopped'
untouched=[OUT/'geometry.json',OUT/'navigation.json',OUT/'build-report.json',ROOT/'walkthrough/public/proposal-navigation.json']
unchanged={str(p.relative_to(ROOT)):digest(p)for p in untouched}
report={'startedAt':stamp(),'operation':'Only paper-shade opaque shader converted to Principled for native/GLB agreement','scriptSHA256':digest(Path(__file__)),'nativeBeforeSHA256':digest(NATIVE),'unchangedDerivedFilesBefore':unchanged}
bpy.ops.wm.open_mainfile(filepath=str(NATIVE))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
bpy.context.view_layer.update()

def geometry_digest():
    """Geometry, topology, world transforms, material slots and light settings."""
    h=hashlib.sha256();counts={'objects':0,'meshes':0,'vertices':0,'lights':0}
    for ob in sorted(scene.objects,key=lambda o:o.name):
        h.update(ob.name.encode());h.update(ob.type.encode());counts['objects']+=1
        h.update(struct.pack('<16d',*[float(c)for row in ob.matrix_world for c in row]))
        if ob.type=='MESH':
            counts['meshes']+=1;counts['vertices']+=len(ob.data.vertices)
            co=array('f',[0.])*len(ob.data.vertices)*3;ob.data.vertices.foreach_get('co',co);h.update(co.tobytes())
            loops=array('i',[0])*len(ob.data.loops);ob.data.loops.foreach_get('vertex_index',loops);h.update(loops.tobytes())
            for attribute in ('loop_start','loop_total','material_index'):
                values=array('i',[0])*len(ob.data.polygons);ob.data.polygons.foreach_get(attribute,values);h.update(values.tobytes())
            h.update(json.dumps([m.name if m else None for m in ob.data.materials]).encode())
        elif ob.type=='LIGHT':
            counts['lights']+=1
            h.update(json.dumps([ob.data.type,ob.data.energy,list(ob.data.color),ob.hide_render]).encode())
    return {'sha256':h.hexdigest(),**counts}

report['geometryBefore']=geometry_digest()
material=bpy.data.materials.get(MATERIAL)
assert material and material.use_nodes,'Expected proposal paper shade material is missing'
users=[o.name for o in scene.objects if o.type=='MESH'and material.name in o.data.materials]
assert users==['Proposal | Kitchen retained paper pendant luminous shade'],('Unexpected paper material users',users)
nodes=material.node_tree.nodes;links=material.node_tree.links
trans=[n for n in nodes if n.type=='BSDF_TRANSLUCENT']
mix=[n for n in nodes if n.type=='MIX_SHADER']
assert len(trans)==len(mix)==1 and abs(mix[0].inputs[0].default_value-.70)<1e-6,'Unexpected native paper shader structure'
assert len(mix[0].inputs[1].links)==len(mix[0].inputs[2].links)==1
assert mix[0].inputs[2].links[0].from_node==trans[0],'Paper diffusion branch changed'
opaque=mix[0].inputs[1].links[0].from_node
report['opaqueBranchBefore']=opaque.bl_idname
if opaque.type=='BSDF_DIFFUSE':
    colour=tuple(opaque.inputs['Color'].default_value)
    roughness=opaque.inputs['Roughness'].default_value
    replacement=nodes.new('ShaderNodeBsdfPrincipled');replacement.name='Paper opaque finish'
    replacement.location=opaque.location
    replacement.inputs['Base Color'].default_value=colour
    replacement.inputs['Roughness'].default_value=roughness
    replacement.inputs['Metallic'].default_value=0
    links.new(replacement.outputs['BSDF'],mix[0].inputs[1])
    nodes.remove(opaque);opaque=replacement
elif opaque.type=='BSDF_PRINCIPLED':
    assert opaque.inputs['Metallic'].default_value==0,'Existing paper Principled branch is unexpectedly metallic'
else:raise AssertionError('Unsupported opaque paper branch: '+opaque.type)
assert tuple(opaque.inputs['Base Color'].default_value)==tuple(trans[0].inputs['Color'].default_value)
report['opaqueBranchAfter']=opaque.bl_idname
report['translucentMixFactor']=mix[0].inputs[0].default_value
bpy.context.view_layer.update()
report['geometryAfter']=geometry_digest()
assert report['geometryBefore']==report['geometryAfter'],'Unexpected geometry, transform, material assignment or light change'
assert all(digest(ROOT/name)==sha for name,sha in unchanged.items()),'Derived geometry/navigation files changed'
assert all(original_checks().values()),'Original source changed before native save'
bpy.ops.wm.save_as_mainfile(filepath=str(NATIVE))
report['nativeAfterSHA256']=digest(NATIVE)
report['nativeSavedAt']=datetime.datetime.fromtimestamp(NATIVE.stat().st_mtime,datetime.timezone.utc).isoformat()
report['status']='native saved; GLB export pending'
REPORT.write_text(json.dumps(report,indent=2)+'\n')
print('PAPER_MATERIAL_NATIVE_SAVED',json.dumps({'savedUTC':report['nativeSavedAt'],'sha256':report['nativeAfterSHA256'],'geometryUnchanged':True}),flush=True)

temporary=OUT/'.Ashley Heights — Proposed.material-refresh.glb'
bpy.ops.export_scene.gltf(filepath=str(temporary),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
blob=temporary.read_bytes();magic,version,total=struct.unpack_from('<III',blob,0)
assert magic==0x46546c67 and version==2 and total==len(blob),'Invalid exported GLB header'
json_length,json_kind=struct.unpack_from('<II',blob,12)
assert json_kind==0x4e4f534a
gltf=json.loads(blob[20:20+json_length])
paper=[m for m in gltf.get('materials',[])if m.get('name')==MATERIAL]
assert len(paper)==1,('Missing exported paper material',len(paper))
pbr=paper[0].get('pbrMetallicRoughness',{})
assert pbr.get('metallicFactor',1)==0,('Paper exported as metal',pbr)
assert max(abs(a-b)for a,b in zip(pbr.get('baseColorFactor',[1,1,1,1]),(.78,.73,.62,1)))<.00001,('Paper colour mismatch',pbr)
temporary.replace(GLB)
public_tmp=PUBLIC.with_name('.proposal.material-refresh.glb');shutil.copyfile(GLB,public_tmp);public_tmp.replace(PUBLIC)
report['exportedPaperMaterial']=paper[0]
report['glbSHA256']=digest(GLB);report['publicGlbMatches']=digest(PUBLIC)==report['glbSHA256']
report['originalPreservation']=original_checks()
report['unchangedDerivedFilesAfter']={str(p.relative_to(ROOT)):digest(p)for p in untouched}
report['status']='complete';report['finishedAt']=stamp()
REPORT.write_text(json.dumps(report,indent=2)+'\n')
assert report['publicGlbMatches']and all(report['originalPreservation'].values())
assert report['unchangedDerivedFilesAfter']==unchanged
print('PAPER_MATERIAL_REFRESH_COMPLETE',json.dumps({'geometryUnchanged':True,'originalsPreserved':True,'nativeSHA256':report['nativeAfterSHA256'],'glbSHA256':report['glbSHA256']}),flush=True)
