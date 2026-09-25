"""Write native editable .skp using the C API bundled with installed SketchUp.

Uses SUGeometryInput / SUEntitiesFill to merge each mesh's shared edges correctly.
No SketchUp GUI automation, plugins, account changes, or licensing changes.
"""
import ctypes as C
import json, math, sys
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/__import__('os').environ.get('ASHLEY_OUTPUT','output-final')
sys.path.insert(0,str(ROOT/'scripts'))
from dimension_spec import CHECKS
from dimension_allowances import accepted_target,classify_dimension
api=C.CDLL('/Applications/SketchUp 2026/SketchUp.app/Contents/Frameworks/SketchUpAPI.framework/SketchUpAPI')
class Ref(C.Structure):_fields_=[('ptr',C.c_void_p)]
class Point(C.Structure):_fields_=[('x',C.c_double),('y',C.c_double),('z',C.c_double)]
class BoundingBox(C.Structure):_fields_=[('min_point',Point),('max_point',Point)]
class UV(C.Structure):_fields_=[('x',C.c_double),('y',C.c_double)]
class Color(C.Structure):_fields_=[('r',C.c_ubyte),('g',C.c_ubyte),('b',C.c_ubyte),('a',C.c_ubyte)]
class MaterialInput(C.Structure):
    _fields_=[('num_uv_coords',C.c_size_t),('uv_coords',UV*4),('vertex_indices',C.c_size_t*4),('material',Ref)]
P=C.POINTER;S=C.c_size_t;D=C.c_double;B=C.c_bool;I=C.c_int;T=C.c_char_p

def bind(name,args,ret=I):
    f=getattr(api,name);f.argtypes=args;f.restype=ret;return f
def call(name,*args):
    result=getattr(api,name)(*args)
    if result !=0:raise RuntimeError(f'{name}: SUResult={result}; object={globals().get("ob",{}).get("name")}')
for name,args in {
    'SUModelCreate':[P(Ref)],'SUModelRelease':[P(Ref)],'SUModelGetEntities':[Ref,P(Ref)],
    'SUModelSetName':[Ref,T],'SUModelSaveToFile':[Ref,T],'SUModelCreateFromFile':[P(Ref),T],
    'SUGroupCreate':[P(Ref)],'SUGroupSetName':[Ref,T],'SUGroupGetEntities':[Ref,P(Ref)],
    'SUEntitiesAddGroup':[Ref,Ref],'SUEntitiesFill':[Ref,Ref,B],
    'SUGeometryInputCreate':[P(Ref)],'SUGeometryInputRelease':[P(Ref)],
    'SUGeometryInputSetVertices':[Ref,S,P(Point)],'SUGeometryInputAddFace':[Ref,P(Ref),P(S)],
    'SUGeometryInputFaceSetFrontMaterial':[Ref,S,P(MaterialInput)],
    'SUGeometryInputFaceSetBackMaterial':[Ref,S,P(MaterialInput)],
    'SULoopInputCreate':[P(Ref)],'SULoopInputAddVertexIndex':[Ref,S],
    'SUMaterialCreate':[P(Ref)],'SUMaterialSetName':[Ref,T],'SUMaterialSetColor':[Ref,P(Color)],
    'SUMaterialSetOpacity':[Ref,D],'SUMaterialSetUseOpacity':[Ref,B],
    'SUModelAddMaterials':[Ref,S,P(Ref)],'SULayerCreate':[P(Ref)],'SULayerSetName':[Ref,T],
    'SULayerSetVisibility':[Ref,B],'SUModelAddLayers':[Ref,S,P(Ref)],
    'SUDrawingElementSetLayer':[Ref,Ref],'SUCameraCreate':[P(Ref)],
    'SUCameraSetOrientation':[Ref,P(Point),P(Point),P(Point)],
    'SUCameraSetOrthographicFrustumHeight':[Ref,D],'SUModelSetCamera':[Ref,P(Ref)],
    'SUSceneCreate':[P(Ref)],'SUSceneSetName':[Ref,T],'SUSceneSetDescription':[Ref,T],
    'SUSceneSetCamera':[Ref,Ref],'SUSceneSetUseCamera':[Ref,B],
    'SUSceneSetUseHiddenLayers':[Ref,B],'SUSceneAddLayer':[Ref,Ref],
    'SUModelAddScenes':[Ref,S,P(Ref)],'SUModelSetActiveScene':[Ref,Ref],
    'SUEntitiesGetNumGroups':[Ref,P(S)],'SUEntitiesGetGroups':[Ref,S,P(Ref),P(S)],
    'SUEntitiesGetNumFaces':[Ref,P(S)],'SUModelGetNumScenes':[Ref,P(S)],
    'SUModelGetOptionsManager':[Ref,P(Ref)],'SUOptionsManagerGetOptionsProviderByName':[Ref,T,P(Ref)],
    'SUOptionsProviderSetValue':[Ref,T,Ref],'SUTypedValueCreate':[P(Ref)],
    'SUTypedValueSetInt32':[Ref,C.c_int32],'SUTypedValueSetDouble':[Ref,D],
    'SUTypedValueRelease':[P(Ref)],
    'SUGroupGetName':[Ref,P(Ref)],'SUStringCreate':[P(Ref)],'SUStringRelease':[P(Ref)],
    'SUStringGetUTF8Length':[Ref,P(S)],'SUStringGetUTF8':[Ref,S,C.c_void_p,P(S)],
    'SUDrawingElementGetBoundingBox':[Ref,P(BoundingBox)],
}.items():bind(name,args)
bind('SUGroupToDrawingElement',[Ref],Ref)
bind('SUInitialize',[],None);bind('SUTerminate',[],None)

def create(name):
    ref=Ref();call(name,C.byref(ref));return ref
def get(name,parent):
    ref=Ref();call(name,parent,C.byref(ref));return ref
def group(parent,name):
    g=create('SUGroupCreate');call('SUGroupSetName',g,name.encode());call('SUEntitiesAddGroup',parent,g)
    return g,get('SUGroupGetEntities',g)
def camera(eye,target,height):
    cam=create('SUCameraCreate')
    call('SUCameraSetOrientation',cam,C.byref(Point(*[v/.0254 for v in eye])),C.byref(Point(*[v/.0254 for v in target])),C.byref(Point(0,0,1)))
    call('SUCameraSetOrthographicFrustumHeight',cam,height/.0254)
    return cam

api.SUInitialize()
model=create('SUModelCreate')
call('SUModelSetName',model,b'Ashley Heights - editable reconstruction')
root=get('SUModelGetEntities',model)
data=json.loads((OUT/'geometry.json').read_text())
materials={}
for name,rgba in data['materials'].items():
    mat=create('SUMaterialCreate');call('SUMaterialSetName',mat,name.encode())
    def srgb(x):return 12.92*x if x<=.0031308 else 1.055*x**(1/2.4)-.055
    color=Color(*[round(srgb(v)*255) for v in rgba[:3]],255)
    call('SUMaterialSetColor',mat,C.byref(color))
    if rgba[3]<1:call('SUMaterialSetOpacity',mat,rgba[3]);call('SUMaterialSetUseOpacity',mat,True)
    call('SUModelAddMaterials',model,1,(Ref*1)(mat));materials[name]=mat
layers={};parents={}
for name in sorted({ob['layer'] for ob in data['objects']}):
    layer=create('SULayerCreate');call('SULayerSetName',layer,name.encode())
    call('SUModelAddLayers',model,1,(Ref*1)(layer));call('SULayerSetVisibility',layer,True)
    layers[name]=layer;g,entities=group(root,name)
    call('SUDrawingElementSetLayer',api.SUGroupToDrawingElement(g),layer);parents[name]=entities

assembly_entities={}
for n,ob in enumerate(data['objects']):
    owner=parents[ob['layer']]
    if ob.get('assembly'):
        key=(ob['layer'],ob['assembly'])
        if key not in assembly_entities:
            ag,ae=group(owner,ob['assembly']);assembly_entities[key]=ae
        owner=assembly_entities[key]
    g,entities=group(owner,f"{n:05d} | {ob.get('object_name',ob['name'])}" if data.get('proposal') else ob['name'])
    if not ob['vertices'] or not ob['faces']:
        continue
    geom=create('SUGeometryInputCreate')
    points=(Point*len(ob['vertices']))(*[Point(*(c/.0254 for c in v)) for v in ob['vertices']])
    call('SUGeometryInputSetVertices',geom,len(points),points)
    for f,indices in enumerate(ob['faces']):
        loop=create('SULoopInputCreate')
        for idx in indices:call('SULoopInputAddVertexIndex',loop,idx)
        index=S();call('SUGeometryInputAddFace',geom,C.byref(loop),C.byref(index))
        inp=MaterialInput();inp.material=materials[ob['materials'][ob['face_materials'][f]]]
        call('SUGeometryInputFaceSetFrontMaterial',geom,index.value,C.byref(inp))
        call('SUGeometryInputFaceSetBackMaterial',geom,index.value,C.byref(inp))
    call('SUEntitiesFill',entities,geom,True);call('SUGeometryInputRelease',C.byref(geom))
    if n%250==0:print(f'{n}/{len(data["objects"])} editable groups',flush=True)

# Metres displayed in SketchUp; C API geometry uses inches internally.
manager=get('SUModelGetOptionsManager',model);provider=Ref()
call('SUOptionsManagerGetOptionsProviderByName',manager,b'UnitsOptions',C.byref(provider))
for name,value in [('LengthUnit',4),('LengthFormat',0),('LengthPrecision',3)]:
    v=create('SUTypedValueCreate');call('SUTypedValueSetInt32',v,value)
    call('SUOptionsProviderSetValue',provider,name.encode(),v);call('SUTypedValueRelease',C.byref(v))

views=[
    ('01 Exterior',(27,-30,22),(4,5,2),29,()),
    ('02 Ground floor',(24,-24,30),(4,4.7,0),20,('2','30','35','15','50')),
    ('03 First floor',(24,-24,32),(6.5,4.7,2.80),17,('1','30','35','25','4','50')),
    ('04 Whole house',(27,-30,22),(4,5,2),29,('15','25','30','41','50')),
    ('05 Ground plan',(4,4.5,40),(4,4.5,0),18,('2','30','35','15','50','4')),
    ('07 Garden layout',(40,60,45),(-5,8,0),68,()),
    ('06 First plan',(6.5,4.5,40),(6.5,4.5,0),14,('1','30','35','25','4','50')),
]
if data.get('proposal'):
    views=[('01 '+data['proposal']['brief'].get('variantLabel','Proposed'),(35,-44,30),(1,2,2),64,()),
           ('02 Rear garden',(32,40,25),(0,6,2),64,()),
           ('03 Site plan',(0,2,65),(0,2,0),72,())]
saved=[]
for name,eye,target,height,hide in views:
    s=create('SUSceneCreate');call('SUSceneSetName',s,name.encode())
    call('SUModelAddScenes',model,1,(Ref*1)(s))
    cam=camera(eye,target,height) if 'plan' not in name else camera((eye[0],eye[1]-.001,eye[2]),target,height)
    call('SUSceneSetCamera',s,cam);call('SUSceneSetUseCamera',s,True)
    call('SUSceneSetUseHiddenLayers',s,True)
    for lname,layer in layers.items():
        if lname.startswith(hide):call('SUSceneAddLayer',s,layer)
    call('SUSceneSetDescription',s,b'Reconstructed from the published floorplan and original 360 photographs. Heights, roof, fittings and site are approximate. Not a measured survey.')
    saved.append(s)
cam=camera(views[0][1],views[0][2],views[0][3]);call('SUModelSetCamera',model,C.byref(cam))
call('SUModelSetActiveScene',model,saved[0])
label=data.get('proposal',{}).get('brief',{}).get('variantLabel')
path=OUT/('Ashley Heights — '+label+'.skp' if label else 'Ashley Heights.skp')
call('SUModelSaveToFile',model,str(path).encode());call('SUModelRelease',C.byref(model))

# Reopen the exported model and count geometry recursively.
model=Ref();call('SUModelCreateFromFile',C.byref(model),str(path).encode())
counts={'groups':0,'faces':0,'scenes':0}
saved_bounds=[]
def name_of(group):
    string=create('SUStringCreate');call('SUGroupGetName',group,C.byref(string))
    n=S();call('SUStringGetUTF8Length',string,C.byref(n))
    buffer=C.create_string_buffer(n.value+1);got=S()
    call('SUStringGetUTF8',string,n.value+1,buffer,C.byref(got))
    call('SUStringRelease',C.byref(string));return buffer.value.decode()
def count_entities(entities,layer=None):
    n=S();call('SUEntitiesGetNumFaces',entities,C.byref(n));counts['faces']+=n.value
    call('SUEntitiesGetNumGroups',entities,C.byref(n));counts['groups']+=n.value
    if n.value:
        groups=(Ref*n.value)();got=S();call('SUEntitiesGetGroups',entities,n.value,groups,C.byref(got))
        for g in groups[:got.value]:
            name=name_of(g)
            if layer is not None:
                bbox=BoundingBox();call('SUDrawingElementGetBoundingBox',api.SUGroupToDrawingElement(g),C.byref(bbox))
                saved_bounds.append({'name':name,'layer':layer,'min':[v*.0254 for v in (bbox.min_point.x,bbox.min_point.y,bbox.min_point.z)],'max':[v*.0254 for v in (bbox.max_point.x,bbox.max_point.y,bbox.max_point.z)]})
            count_entities(get('SUGroupGetEntities',g),layer or name)
count_entities(get('SUModelGetEntities',model))
n=S();call('SUModelGetNumScenes',model,C.byref(n));counts['scenes']=n.value
assert counts['groups']==len(data['objects'])+len(layers)+len(assembly_entities),counts
assert counts['faces']>9000,counts
assert counts['scenes']==len(views),counts
def boundary(name,axis,side):
    values=[b[side][axis] for b in saved_bounds if (b['name']==name or b['name'].startswith(name+' |')) and (b['layer'].endswith('walls') or b['layer'] in ('23 Balcony','40 Outbuildings'))]
    assert values,name
    return min(values) if side=='min' else max(values)
dimension_checks=[]
for c in ([] if data.get('proposal') else CHECKS):
    span=boundary(c['positive_wall'],c['axis'],'min')-boundary(c['negative_wall'],c['axis'],'max')
    assert abs(span-accepted_target(c,data))<.001,(c,span)
    dimension_checks.append({'room':c['room'],'axis':c['axis'],'target_m':c['target_m'],'actual_m':span,
                             **classify_dimension(c,span,data)})
if data.get('proposal'):
    import numpy as np
    by_key={(v['layer'],v['name'].strip()):v for v in saved_bounds}
    errors=[]
    for n,obj in enumerate(data['objects']):
        if not obj['vertices'] or not obj['faces']:continue
        actual=by_key[(obj['layer'],f"{n:05d} | {obj.get('object_name',obj['name'])}".strip())]
        used=sorted({i for face in obj['faces'] for i in face})
        vertices=np.array(obj['vertices'])[used]
        error=max(abs(np.array(actual['min'])-vertices.min(axis=0)).max(),abs(np.array(actual['max'])-vertices.max(axis=0)).max())
        assert error<.001,(obj['name'],error)
        errors.append(float(error))
    counts['source_mesh_extents_verified']=len(errors)
    counts['maximum_mesh_extent_error_m']=max(errors)
counts['dimension_checks_from_reopened_skp']=len(dimension_checks)
counts['printed_dimension_matches']=sum(c['printed_match'] for c in dimension_checks)
counts['owner_approved_dimension_departures']=sum(c['status']=='OWNER_APPROVED_DEPARTURE' for c in dimension_checks)
counts['accepted_dimension_checks']=sum(c['accepted_match'] for c in dimension_checks)
(OUT/'sketchup-dimensions.json').write_text(json.dumps(dimension_checks,indent=2))
(OUT/'sketchup-validation.json').write_text(json.dumps(counts,indent=2))
call('SUModelRelease',C.byref(model));api.SUTerminate()
print('SKETCHUP_COMPLETE',path,counts)
