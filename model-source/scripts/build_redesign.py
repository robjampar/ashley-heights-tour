"""Build an independent overnight design from a saved, immutable baseline.

Blender --background --python-exit-code 1 --python scripts/build_redesign.py -- i1
All edits are made in a new scene; original and current proposal files are read-only.
"""
import argparse, ast, copy, hashlib, json, math, os, shutil, struct, sys, time
from datetime import datetime, timezone
from pathlib import Path
import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from build_support import Timings, sha256, atomic_json, blender_identity
from redesign_support import input_paths, required_outputs
from blender_collections import collection_memberships

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('option', choices=('i1', 'i2', 'i3', 'e1', 'e2', 'e3'))
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:])
OPTION = args.option
INTERNAL = OPTION.startswith('i')
OUT = ROOT / ('output-redesign-' + OPTION)
OUT.mkdir(exist_ok=True)
(OUT/'build-report.json').unlink(missing_ok=True)
for stale in ('circulation-audit.json','stair-headroom-audit.json','stairs-navigation-audit.json','parking-audit.json','parking-paths.json','pool-navigation-audit.json','site-clearance-audit.json','walk-masks.json'):
    (OUT/stale).unlink(missing_ok=True)
PUBLIC = ROOT / 'walkthrough/public'
SPEC_PATH = ROOT / 'proposal/redesigns' / (OPTION + '.json')
spec = json.loads(SPEC_PATH.read_text())
BASE = ROOT / ('output-proposed-compact' if INTERNAL else 'output-walkthrough')
BASE_NATIVE = BASE / ('Ashley Heights — Proposed (compact).blend' if INTERNAL else 'Ashley Heights.blend')
BASE_NAV = BASE / 'navigation.json' if INTERNAL else PUBLIC / 'navigation.json'
INPUT_FILES = input_paths(ROOT, OPTION)
inputs = {str(p.relative_to(ROOT)): sha256(p) for p in INPUT_FILES}
timer = build_timer = Timings(OUT / 'build-timings.json', option=OPTION)
g = json.loads((BASE / 'geometry.json').read_text())
nav = json.loads(BASE_NAV.read_text())
original_index = {o['name']: o for o in json.loads((ROOT / 'revisions/redesigns-2026-09-25/original-object-index.json').read_text())}
base_index = {o['object_name']: o for o in g['objects']}
base_names = set(base_index)
with timer.phase('load_checkpoint'):
    bpy.ops.wm.open_mainfile(filepath=str(BASE_NATIVE))
original = bpy.data.scenes['01 Exterior']
base_scene = bpy.data.scenes['08 Proposed extensions'] if INTERNAL else original
scene = bpy.data.scenes.new('09 ' + spec['code'] + ' ' + spec['name'])
scene.world = base_scene.world.copy()
scene.unit_settings.system = 'METRIC'
bpy.context.window.scene = scene
collections, record = {}, []
materials = {m.name: m for m in bpy.data.materials}
PALETTE = {m.name: list(m.diffuse_color) for m in bpy.data.materials}

def import_functions(filename, names=None):
    tree = ast.parse((ROOT / 'scripts' / filename).read_text())
    nodes = [n for n in tree.body if isinstance(n, ast.FunctionDef) and (names is None or n.name in names)]
    exec(compile(ast.Module(body=nodes, type_ignores=[]), filename, 'exec'), globals())

import_functions('build_model.py', {'collection', 'mesh', 'box', 'prism', 'cylinder', 'beam'})
retained = collection('R00 ' + OPTION + ' retained checkpoint')
for ob in base_scene.objects:
    if ob.type in ('MESH', 'EMPTY', 'LIGHT'):
        retained.objects.link(ob)
original_objects = list(original.objects)
changes, excluded = [], set()
new_surfaces, new_obstacles, new_segments, new_rooms, new_views, new_ramps, proposed_doors = [], [], [], [], [], [], []
L, R, T = 'R10 New partitions and envelope', 'R20 Garden additions', 'R30 Loft'
P, S, F, I = 'R40 Pool', 'R50 Site', 'R60 Furniture', 'R70 Lighting'
white = 'Warm plaster'
plaster = 'Warm plaster'
stone = 'Stone'
oak = 'Oak'
black = 'Black metal'
glass = 'Glass'
fabric = 'Cream fabric'
warm = 'Warm light'

def choose_material(preferred, fallback):
    return next((x for x in preferred if x in materials), fallback)

white = choose_material(['Proposal | Limestone render', 'Warm plaster'], white)
plaster = choose_material(['Proposal | Loft plaster', 'Warm plaster'], plaster)
stone = choose_material(['Proposal | Limestone paving', 'Stone'], stone)
oak = choose_material(['Proposal | Pale oak', 'Oak', 'Oak wood', 'Wood'], next(iter(materials)))
black = choose_material(['Proposal | Bronze black frames', 'Metal', 'Black metal'], next(iter(materials)))
glass = choose_material(['Proposal | Clear glazing', 'Glazing', 'Glass'], next(iter(materials)))
fabric = choose_material(['Proposal | Oatmeal linen', 'Cream upholstery', 'Cream fabric'], plaster)
warm = choose_material(['Proposal | Warm lamps'], plaster)
import_functions('build_extension_proposal.py', {
    'mat', 'slab', 'segment', 'wall', 'glazing', 'glazed_wall', 'cut', 'cut_surface',
    'roof', 'room', 'obstacle', 'lamp', 'sofa', 'table'})
OAK_GUARDS = True
import_functions('proposal_helpers.py')

def bounds(ob):
    vv = [ob.matrix_world @ Vector(v) for v in ob.bound_box]
    return [min(v[i] for v in vv) for i in range(3)] + [max(v[i] for v in vv) for i in range(3)]

def name_of(ob):
    return str(ob.get('source_name', ob.name))

def omit(ob, reason):
    if ob.name not in scene.objects:
        return
    for col in list(ob.users_collection):
        if col in collections.values():
            col.objects.unlink(ob)
    excluded.add(ob.name)
    changes.append({'original': name_of(ob), 'action': 'omitted in this option only', 'reason': reason})

def remove_matching(predicate, reason, navigation=True):
    removed = []
    for ob in list(scene.objects):
        if predicate(ob):
            removed.append(ob.name)
            omit(ob, reason)
    if navigation:
        removed_set = set(removed)
        nav['interactiveDoors'] = [d for d in nav.get('interactiveDoors', []) if not removed_set.intersection(d.get('members', []))]
    return removed

def prefix_remove(prefixes, reason, nav_fields=('obstacles', 'segments')):
    prefixes = tuple(prefixes)
    remove_matching(lambda ob: name_of(ob).startswith(prefixes) or ob.name.startswith(prefixes), reason)
    for field in nav_fields:
        nav[field] = [v for v in nav.get(field, []) if not v.get('name', '').startswith(prefixes)]

def edited_copy(ob, reason):
    new = ob.copy()
    if ob.data:
        new.data = ob.data.copy()
    omit(ob, reason)
    prefix=spec['code']+' | '
    source=name_of(ob)
    while source.startswith(prefix):source=source[len(prefix):]
    new.name = prefix + source
    new['redesign_baseline_object']=ob.get('redesign_baseline_object',ob.name)
    new['source_name'] = new.name
    collection('R01 Local alterations').objects.link(new)
    return new

def point_in_rect(x, y, rect):
    return rect[0] <= x <= rect[2] and rect[1] <= y <= rect[3]

def is_furniture(ob):
    if ob.type != 'MESH':
        return False
    meta = base_index.get(ob.get('redesign_baseline_object',ob.name), {})
    if meta.get('layer', '').startswith(('P60', 'R60')):
        return True
    nm = name_of(ob)
    while nm.startswith('Proposal revision | '):
        nm = nm[len('Proposal revision | '):]
    origin = original_index.get(nm)
    return bool(origin and origin['layer'] in ('16 Fittings and furniture', '26 Fittings and furniture'))

def clear_furniture(rect, z, reason):
    def inside(ob):
        if not is_furniture(ob):
            return False
        b = bounds(ob)
        return point_in_rect((b[0]+b[3])/2, (b[1]+b[4])/2, rect) and z-.02 <= (b[2]+b[5])/2 < z+2.3
    remove_matching(inside, reason)
    def keep(item):
        b = item.get('box')
        if b is None:
            p = item.get('polygon', [])
            if not p:
                return True
            b = [min(v[0] for v in p), min(v[1] for v in p), max(v[0] for v in p), max(v[1] for v in p)]
        item_name=item.get('name','').lower()
        fitting=any(x in item_name for x in ('cabinet','units','worktop','desk','wardrobe'))
        structural = not fitting and any(x in item_name for x in ('chimney', 'stair', 'wall', 'pier', 'column', 'void'))
        same_floor = item.get('bottom', 0) >= z-.15 and item.get('bottom', 0) < z+2.1
        return structural or not (same_floor and point_in_rect((b[0]+b[2])/2, (b[1]+b[3])/2, rect))
    nav['obstacles'] = [o for o in nav['obstacles'] if keep(o)]

def update_room(old, name=None, polygon=None, **extra):
    r = next(r for r in nav['planRooms'] if r['name'] == old)
    if name:
        r['name'] = name
        for v in nav['rooms']:
            if v['label'].casefold()==old.casefold() or v['label'].casefold().startswith(old.casefold()+' ·'):
                v['label']=name+v['label'][len(old):]
    if polygon:
        r['polygon_m'] = polygon
    r.pop('published_dimensions_m', None)
    r.update(extra)
    r['redesign'] = True
    return r

def rect_room(name, rect, z=0, kind='living', ensuite_for=None):
    floor = -1 if z < 0 else 3 if z > 5 else 1 if z > 2 else 0
    room(name, rect, z, floor, group=spec['code'] + ' · ' + ('Ground floor' if floor == 0 else 'First floor' if floor == 1 else 'Loft' if floor == 3 else 'Cellar'))
    new_rooms[-1].update({'redesign': True, 'kind': kind})
    if ensuite_for:
        new_rooms[-1]['ensuite_for'] = ensuite_for
    return new_rooms[-1]

def rect_polygon(r):
    return [[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]]

def view(name, x, y, z=0, direction=(0,1)):
    existing=next((v for v in nav['rooms'] if v['label'].casefold()==name.casefold()),None)
    data={'id': OPTION+'-'+name.lower().replace(' ','-'), 'label': name, 'group': spec['code']+' · Highlights', 'position':[x,y,z], 'direction':list(direction)}
    if existing:existing.update(data)
    else:new_views.append(data)

def translate_assembly(prefixes, delta, reason):
    prefixes=tuple(prefixes)
    for ob in list(scene.objects):
        if name_of(ob).startswith(prefixes):
            new=edited_copy(ob,reason);new.location+=Vector(delta)
    for field in ('obstacles','segments','surfaces'):
        for item in nav.get(field,[]):
            if not item.get('name','').startswith(prefixes):continue
            if 'box'in item:
                b=item['box'];item['box']=[b[0]+delta[0],b[1]+delta[1],b[2]+delta[0],b[3]+delta[1]]
            if 'polygon'in item:item['polygon']=[[x+delta[0],y+delta[1]]for x,y in item['polygon']]
            for key in ('a','b'):
                if key in item:item[key]=[item[key][0]+delta[0],item[key][1]+delta[1]]
            for key in ('bottom','top','z'):
                if key in item:item[key]+=delta[2]

def move_gym_equipment(targets):
    for family,target in targets.items():
        prefix='Proposal | Gym '+family
        obs=[ob for ob in scene.objects if ob.type=='MESH' and name_of(ob).startswith(prefix)]
        if not obs:continue
        bb=[bounds(ob)for ob in obs]
        cx=(min(b[0]for b in bb)+max(b[3]for b in bb))/2
        cy=(min(b[1]for b in bb)+max(b[4]for b in bb))/2
        translate_assembly([prefix],[target[0]-cx,target[1]-cy,0],'Relocate existing gym equipment at its actual size')

def partition(name, a, b, z=0, door=None, height=2.55, thickness=.12):
    full = spec['code'] + ' | ' + name
    holes = [] if door is None else [[door[0],door[1],0,2.10,'door']]
    perforated_wall(full,a,b,z,z+height,holes,plaster,L,thickness)

def counter(name, rect, z=0, sink=False, hob=False, tall=False):
    x0,y0,x1,y1=rect
    h=2.20 if tall else .90
    prefix=spec['code']+' | '+name
    box(prefix+' oak cabinets',((x0+x1)/2,(y0+y1)/2,z+h/2),(x1-x0,y1-y0,h),oak,F)
    box(prefix+' stone worktop',((x0+x1)/2,(y0+y1)/2,z+h+.025),(x1-x0+.035,y1-y0+.035,.05),stone,F)
    # Door lines give scale without excessive component counts.
    long_x=x1-x0>=y1-y0
    length=(x1-x0) if long_x else (y1-y0)
    for j in range(1,max(1,round(length/.6))):
        t=j*length/max(1,round(length/.6))
        if long_x:
            box(prefix+' cabinet joint',(x0+t,y0-.006,z+h/2),(.012,.012,h-.05),black,F)
        else:
            box(prefix+' cabinet joint',(x1+.006,y0+t,z+h/2),(.012,.012,h-.05),black,F)
    if sink:
        box(prefix+' sink',((x0+x1)/2,(y0+y1)/2,z+h+.054),(.45,.55,.018),black,F)
        cylinder(prefix+' tap',((x0+x1)/2+.22,(y0+y1)/2,z+h+.18),.018,.25,black,F,12)
    if hob:
        box(prefix+' induction hob',((x0+x1)/2,(y0+y1)/2,z+h+.055),(.56,.7,.018),black,F)
        for dx in(-.15,.15):
            for dy in(-.20,.20):
                cylinder(prefix+' hob ring',((x0+x1)/2+dx,(y0+y1)/2+dy,z+h+.067),.09,.004,stone,F,24)
    obstacle(prefix,rect,z,z+h+.05)

def desk(name, rect, z=0):
    x0,y0,x1,y1=rect
    box(spec['code']+' | '+name,((x0+x1)/2,(y0+y1)/2,z+.75),(x1-x0,y1-y0,.06),oak,F)
    for x in(x0+.08,x1-.08):
        for y in(y0+.08,y1-.08):
            box(spec['code']+' | '+name+' leg',(x,y,z+.37),(.045,.045,.74),black,F)
    obstacle(spec['code']+' | '+name,rect,z,z+.8)

def ensuite(name, rect, z, door_side='south', door_position=None, owner=None, sides=('south','east','north','west')):
    x0,y0,x1,y1=rect
    for side,a,b in [('south',[x0,y0],[x1,y0]),('east',[x1,y0],[x1,y1]),('north',[x1,y1],[x0,y1]),('west',[x0,y1],[x0,y0])]:
        if side not in sides:continue
        length=math.dist(a,b)
        partition(name+' '+side,a,b,z,door=((door_position or .57),.80) if side==door_side else None,height=2.10 if z>=5.5 else 2.55)
    slab(spec['code']+' | '+name+' tiled floor',rect,z+.007,.015,stone,F,False)
    # A compact bathroom with a clear entry at the south-west: shower in the
    # far north-east corner, basin against the west wall, WC against the south.
    # Do not use the legacy fitting helper, whose shower occupies this doorway.
    tag=spec['code']+' | '+name
    width,depth=(x1-x0,y1-y0) if door_side in ('south','north') else (y1-y0,x1-x0)
    def point(u,v):
        if door_position and door_position>width/2:u=width-u
        return {'south':(x0+u,y0+v),'north':(x1-u,y1-v),'east':(x1-v,y0+u),'west':(x0+v,y1-u)}[door_side]
    def part(label,u,v,h,size,material):
        xy=point(u,v);w,d,t=size
        box(tag+' '+label,(*xy,z+h),(w,d,t) if door_side in ('south','north') else (d,w,t),material,F)
    def block(label,rect):
        points=[point(u,v)for u in(rect[0],rect[2])for v in(rect[1],rect[3])]
        obstacle(tag+' '+label,[min(p[0]for p in points),min(p[1]for p in points),max(p[0]for p in points),max(p[1]for p in points)],z,z+.9)
    part('shower tray',width-.55,depth-.55,.045,(.94,.94,.09),stone)
    glazing(tag+' shower screen',point(width-1.03,depth-.97),point(width-1.03,depth-.08),z,z+2.0,F,1)
    part('vanity',.32,depth-.42,.42,(.48,.60,.75),oak)
    part('basin',.32,depth-.42,.83,(.48,.60,.10),plaster)
    cylinder(tag+' toilet bowl',(*point(width-.40,.55),z+.24),.23,.32,plaster,F,24)
    part('cistern',width-.40,.18,.65,(.43,.18,.50),plaster)
    block('vanity',[.08,depth-.72,.56,depth-.12]);block('WC',[width-.66,.08,width-.14,.86])
    rect_room(name,[x0+.06,y0+.06,x1-.06,y1-.06],z,'ensuite',owner)

def replace_original_wall(name, openings, reason, material=None):
    data=next(w for w in nav['walls'] if w['name']==name)
    prefix_remove([name, 'Proposal revision | '+name, 'Circulation detail | Cove '+name, 'Trim comparison | '+name],reason)
    z=data['floor']*2.8
    data['openings']=openings
    perforated_wall(spec['code']+' | '+name,data['a'],data['b'],z,z+2.55,openings,material or plaster,L,data['thickness_m'])
    # New wall segments carry collision; avoid drawing/colliding the wall twice.
    nav['walls']=[w for w in nav['walls'] if w is not data]
    return data

def add_fourth_parking_bay():
    rect=[-.20,-6.0,2.40,-1.0]
    translate_assembly(['Proposal | Courtyard oak bench','Proposal | Courtyard bench','Proposal | Courtyard planter','Proposal | Courtyard raised planting','Proposal | Courtyard tree','Proposal | Courtyard grasses'],[7,-16,0],'Move the proposed courtyard seating and planter to the south garden for the fourth outside bay')
    prefix_remove(['Proposal | Forecourt north planter','Proposal | Forecourt north box','Proposal | Forecourt north olive'], 'Move new forecourt planter to make the fourth outside bay')
    # Existing planted pot names differ by assembly; spatial selection stays in landscape objects.
    remove_matching(lambda ob: ob.type=='MESH' and base_index.get(ob.name,{}).get('layer','').startswith('P50') and point_in_rect((bounds(ob)[0]+bounds(ob)[3])/2,(bounds(ob)[1]+bounds(ob)[4])/2,[2.05,-6.12,3.35,-4.95]), 'Clear the north planter from the new parking bay and pedestrian route')
    nav['obstacles']=[o for o in nav['obstacles'] if not ('planter' in o.get('name','').lower() and (lambda b:b and point_in_rect((b[0]+b[2])/2,(b[1]+b[3])/2,[2,-6.2,3.4,-4.9]))(o.get('box')))]
    for x in(rect[0],rect[2]):
        for y in(rect[1],rect[3]):
            box(spec['code']+' | Fourth parking bay inlay',(x,y,.014),(.30,.05,.018),stone,S)
    new_surfaces.append({'name':spec['code']+' | Fourth parking bay','polygon':rect_polygon(rect),'z':0})
    nav.setdefault('proposalSite',{})['parking_count']={'driveway':4,'new_double_garage':2,'old_garage_counted':0}
    nav['proposalSite']['fourth_bay']={'id':'N3','bounds_m':rect,'width_m':2.6,'length_m':5.0,'pedestrian_gap_to_entrance_m':1.21,'status':'Static fit; vehicle tracking checked separately'}
    nav['proposalSite']['bay_S2_replaced_by']='Front garden remains; fourth space is N3 beside the existing northern bays.'
    site=nav['proposalSite']
    site['pedestrianCourtyards']=[[[2.65,-4],[5.5,-4],[5.5,0],[2.65,0]],[[-.1,-.9],[2.65,-.9],[2.65,0],[-.1,0]]]
    site.setdefault('driveway_bay_bounds_m',[]).append({'id':'N3','bounds_m':rect})
    source_car=next((c for c in site.get('cars',[]) if c['bay']=='N2'),None)
    if source_car:
        car=copy.deepcopy(source_car)
        dx=(rect[0]+rect[2])/2-source_car['centre_m'][0]
        dy=(rect[1]+rect[3])/2-source_car['centre_m'][1]
        members=[]
        for name in source_car['objects']:
            ob=bpy.data.objects.get(name)
            if ob is None:continue
            duplicate=ob.copy();duplicate.name=name.replace('car N2','car N3')
            duplicate['source_name']=duplicate.name
            duplicate.location+=Vector((dx,dy,0));collection(S).objects.link(duplicate)
            members.append(duplicate.name)
        car.update({'bay':'N3','centre_m':[(rect[0]+rect[2])/2,(rect[1]+rect[3])/2],'objects':members})
        car.pop('route_validation',None);car.pop('route_direction_changes',None)
        old=car.get('actual_mesh_bounds_m')
        if old:car['actual_mesh_bounds_m']=[old[0]+dx,old[1]+dy,old[2],old[3]+dx,old[4]+dy,old[5]]
        site['cars'].append(car)
        obstacle('Proposal | Compact car N3',[1.1-.9,-3.5-2.2,1.1+.9,-3.5+2.2],0,1.5)
    rect_room('Outside parking N3',rect,0,'parking')

with timer.phase('design_layout'):
    exec(compile((ROOT/'scripts/redesign_layouts.py').read_text(),'redesign_layouts.py','exec'))

with timer.phase('export'):
    assert inputs == {str(p.relative_to(ROOT)):sha256(p) for p in INPUT_FILES}, 'Build inputs changed during build'
    nav['surfaces'].extend(new_surfaces)
    nav['obstacles'].extend(new_obstacles)
    nav['segments'].extend(new_segments)
    nav.setdefault('ramps',[]).extend(new_ramps)
    nav['planRooms'].extend(new_rooms)
    nav['rooms'].extend(new_views)
    nav['interactiveDoors'].extend(proposed_doors)
    nav['hiddenObjects']=[n for n in nav['hiddenObjects'] if n not in excluded]
    nav.update({'design':OPTION,'variant':OPTION,'designLabel':spec['code']+' · '+spec['name'],'designRevision':'R1','modelUpdatedAt':datetime.now(timezone.utc).isoformat(),'materials':PALETTE,'redesign':spec})
    nav['redesign']['changes']=changes
    nav['redesign']['baseline']='Proposed' if INTERNAL else 'Existing'
    nav['redesign']['originalPreserved']=True
    nav['floorLevels']=[{'id':-1,'z':-2.8,'label':'Cellar'},{'id':0,'z':0,'label':'Ground floor'},{'id':1,'z':2.8,'label':'First floor'},{'id':3,'z':5.55,'label':'Loft'}]
    # Remove excluded members from semantic material lists while retaining per-face roles.
    if 'exteriorAppearance' in nav:
        nav['exteriorAppearance']['objects']={role:[n for n in names if n not in excluded] for role,names in nav['exteriorAppearance'].get('objects',{}).items()}
    memberships=collection_memberships(bpy.data)
    bpy.context.view_layer.update()
    graph=bpy.context.evaluated_depsgraph_get()
    objects=[]
    for ob in scene.objects:
        if ob.type!='MESH':continue
        ev=ob.evaluated_get(graph); me=ev.to_mesh()
        prior=base_index.get(ob.name,{})
        layer=prior.get('layer') or next((c.name for c in memberships[ob.as_pointer()] if c.name.startswith('R')),memberships[ob.as_pointer()][0].name)
        objects.append({'name':name_of(ob),'object_name':ob.name,'layer':layer,'assembly':ob.get('assembly'),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),'vertices':[list(ob.matrix_world@v.co) for v in me.vertices],'faces':[list(f.vertices) for f in me.polygons],'materials':[m.get('appearance_source_material',m.name) for m in ob.data.materials],'face_materials':[f.material_index for f in me.polygons],'material_appearance':[m.get('appearance_role') for m in ob.data.materials]})
        ev.to_mesh_clear()
    (OUT/'geometry.json').write_text(json.dumps({**g,'objects':objects,'rooms':nav['planRooms'],'materials':PALETTE,'redesign':spec},separators=(',',':')))
    (OUT/'navigation.json').write_text(json.dumps(nav,separators=(',',':')))
    scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True
    scene.view_settings.view_transform='AgX';scene.view_settings.exposure=.6
    camera=bpy.data.objects.new(spec['code']+' Review camera',bpy.data.cameras.new(spec['code']+' Review camera'))
    collection('R80 Review cameras').objects.link(camera)
    camera.location=(-9,-20,12);camera.rotation_euler=(Vector((4,1,2))-camera.location).to_track_quat('-Z','Y').to_euler();camera.data.lens=28;scene.camera=camera
    native=OUT/('Ashley Heights — '+spec['code']+' '+spec['name']+'.blend')
    bpy.ops.wm.save_as_mainfile(filepath=str(native))
    glb=OUT/('redesign-'+OPTION+'.glb')
    bpy.ops.export_scene.gltf(filepath=str(glb),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
    with glb.open('rb') as f:
        f.read(12);chunk_length,_=struct.unpack('<II',f.read(8));gltf=json.loads(f.read(chunk_length))
    exported_names={n.get('name') for n in gltf['nodes']}
    missing_borrowed=[ob.name for ob in scene.objects if ob.type=='MESH' and ob.get('redesign_borrowed') and ob.visible_get() and ob.name not in exported_names]
    assert not missing_borrowed, 'Borrowed furniture missing from glTF: '+str(missing_borrowed)
    shutil.copyfile(glb,PUBLIC/glb.name)
    shutil.copyfile(OUT/'navigation.json',PUBLIC/('redesign-'+OPTION+'-navigation.json'))
    original_hashes=json.loads((ROOT/'proposal/original-preservation.json').read_text())['files']
    preserved={name:sha256(ROOT/name)==digest for name,digest in original_hashes.items()}
    assert all(preserved.values()), 'Original files changed'
    report={'cache_schema':1,'blender':blender_identity(bpy.app.binary_path),'option':OPTION,'modelUpdatedAt':nav['modelUpdatedAt'],'inputs':inputs,'native':str(native.relative_to(ROOT)),'objects':len(objects),'new_rooms':len(new_rooms),'alterations':len(changes),'original_preserved':preserved,'outputs':{str(p.relative_to(ROOT)):sha256(p) for p in required_outputs(ROOT,OPTION)}}
    assert inputs == {str(p.relative_to(ROOT)):sha256(p) for p in INPUT_FILES}, 'Build inputs changed before export finished'
    atomic_json(OUT/'build-report.json',report)
timer.write(success=True)
print('REDESIGN_SAVED',OPTION,len(objects),flush=True)
