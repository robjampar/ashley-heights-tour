import bpy, sys, json, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.interiors.door_frame_details import retire_covered_cinema_pier
variant=sys.argv[sys.argv.index('--')+1]
out=ROOT/f'outputs/output-door-wall-junctions-{variant}'
records=[]
for kind,source in [('base',ROOT/f'outputs/output-proposed-{variant}'/(native_name(variant)+'.blend')),('visual',ROOT/f'outputs/output-visual-realism-{variant}'/(native_name(variant)+' — visual refinement.blend'))]:
    before=hashlib.file_digest(source.open('rb'),'sha256').hexdigest()
    bpy.ops.wm.open_mainfile(filepath=str(source));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
    retired=set(json.loads(scene.get('retired_frame_objects','[]')))
    name=retire_covered_cinema_pier(scene,retired)
    assert name=='Proposal | Cinema east wall end pier',(variant,kind,name)
    scene['retired_frame_objects']=json.dumps(sorted(retired))
    bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(source))
    records.append({'kind':kind,'source':str(source.relative_to(ROOT)),'previousSHA256':before,'updatedSHA256':hashlib.file_digest(source.open('rb'),'sha256').hexdigest(),'removedObject':name})
    print('CINEMA_PIER_REMOVED',variant,kind,flush=True)
path=ROOT/f'outputs/output-proposed-{variant}/geometry.json';geometry=json.loads(path.read_text());prior=len(geometry['objects']);geometry['objects']=[o for o in geometry['objects']if o['object_name']!=name];assert len(geometry['objects'])==prior-1;path.write_text(json.dumps(geometry,separators=(',',':')))
(out/'cinema-pier-native-refresh.json').write_text(json.dumps({'variant':variant,'records':records,'sourceInputs':source_hashes(ROOT,variant)},indent=2))
