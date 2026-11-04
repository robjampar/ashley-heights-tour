"""Align equal suite windows with the retained ground-floor window centre lines."""
import json

REVISION = 'front-window-alignment-2026-10-23'
PREFIX = 'Aligned front windows | '


def apply_front_window_alignment(ns):
    import bpy
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    scene, nav = ns['scene'], ns['nav']
    if scene.get('front_window_alignment_revision') == REVISION:
        return [], json.loads(scene['front_window_alignment_report'])
    cfg = json.loads((ns['ROOT'] / 'proposal/specs/front-window-alignment.json').read_text())
    owners = {c for s in bpy.data.scenes if s == scene or 'Proposal ·' in s.name for c in s.collection.children_recursive}
    def appearance_material(ob, role):
        return next((m for m in ob.data.materials if m and m.get('appearance_role')==role),ob.data.materials[0])
    exterior = appearance_material(scene.objects['Proposal | Side bedrooms front pier 0'],'wall')
    old_facing = scene.objects.get('Proposal | Side wing front oak cladding') or scene.objects['Proposal | Side wing front brick facing']
    facing = appearance_material(old_facing,'oak-panel')
    old_joint=next((o for o in scene.objects if o.name.startswith('Proposal | Side wing front oak board')),None)
    joint_material=appearance_material(old_joint,'oak-detail') if old_joint else None
    removed, changed = [], []
    prefixes = ('Proposal | Side bedrooms front ', 'Proposal | Side wing front oak board',
                'Lengthwise suite | front ', 'Lengthwise suite | bathroom window ', 'Lengthwise suite | dressing window ')
    for ob in list(scene.objects):
        if ob == old_facing or ob.name.startswith(prefixes):
            removed.append(ob.name)
            for col in tuple(ob.users_collection):
                if col in owners: col.objects.unlink(ob)
            if not ob.users_collection: bpy.data.objects.remove(ob)
    seg_groups = [nav.setdefault('segments', [])]
    if ns.get('new_segments') is not None and ns['new_segments'] is not seg_groups[0]: seg_groups.append(ns['new_segments'])
    for group in seg_groups: group[:] = [v for v in group if v.get('name') not in removed]
    segments = ns.get('new_segments', nav['segments'])
    b = RoomBuilder(ns, 'aligned front windows', PREFIX, 'P42 Aligned front suite windows')
    ivory = bpy.data.materials['Interior | Landings warm ivory']
    frame = bpy.data.materials['Proposal | Bronze black frames']
    glass = bpy.data.materials['Proposal | Clear glazing']
    stone = bpy.data.materials['Proposal | Limestone paving']
    sill, head = cfg['sillZ'], cfg['headZ']
    windows = [cfg[k] for k in ('bathroom', 'dressing')]
    def wall(label, a, c, low, high):
        ob = b.box_bounds(label, [a,.785,c,1.015], low, high, exterior)
        b.box_bounds(label+' internal plaster', [a,1.015,c,1.017], low, high, ivory)
        segments.append({'name':ob.name,'a':[a,.9],'b':[c,.9],'bottom':low,'top':high,'thickness':.23})
    for label,a,c in [('west pier',-5.18,windows[0][0]),('central pier',*cfg['pier']),('east pier',windows[1][1],0)]:
        wall(label,a,c,2.8,5.18)
    for label,(a,c) in zip(('bathroom','dressing'), windows):
        width=c-a
        wall(label+' sill wall',a,c,2.8,sill)
        wall(label+' head wall',a,c,head,5.18)
        for zz in (sill+.028,head-.028):
            b.box(label+' window horizontal frame',((a+c)/2,.9,zz),(width,.055,.056),frame,.001)
        for xx in (a+.024,(a+c)/2,c-.024):
            b.box(label+' window mullion',(xx,.9,(sill+head)/2),(.048,.048,head-sill),frame,.001)
        b.box(label+' window glass',((a+c)/2,.9,(sill+head)/2),(width-.096,.024,head-sill-.112),glass)
        b.box(label+' window cill',((a+c)/2,.90,sill-.025),(width+.04,.085,.085),stone,.003)
        b.window_reveal(label+' window','y',1.017,.9275,a+.048,c-.048,sill+.056,head-.056,ivory)
        b.window_reveal(label+' masonry return','y',1.018,.927,a,c,sill,head,ivory)
        segments.append({'name':PREFIX+label+' window glass','a':[a,.9],'b':[c,.9],'bottom':sill+.056,'top':head-.056,'thickness':.024})

    # One continuous facing, retaining the original ground-floor cuts exactly.
    openings=[(-4.43,-2.93,.55,2.30),(-2.28,-.78,.55,2.30)]+[(a,c,sill,head) for a,c in windows]
    skin=b.box_bounds('continuous '+('oak cladding' if ns['VARIANT']=='compact' else 'brick facing'),[-5.16,.769,-.02,.785],.05,5.13,facing)
    cutters=[b.box_bounds('temporary opening cutter',[a-.03,.70,c+.03,.85],s-.03,h+.03,ivory) for a,c,s,h in openings]
    bpy.context.view_layer.update()
    with BooleanWorkspace(cutters) as work: work.difference(skin,cutters)
    for ob in cutters: b.objects.remove(ob);bpy.data.objects.remove(ob,do_unlink=True)
    b.uv(skin)
    if ns['VARIANT']=='compact':
        xx=-5.10
        while xx<-.05:
            spans=[(.05,5.13)]
            for a,c,s,h in openings:
                if a-.03<xx<c+.03:
                    spans=[(u,v) for p,q in spans for u,v in ((p,min(q,s-.03)),(max(p,h+.03),q)) if v-u>.10]
            for low,high in spans:
                b.box('oak board joint',(xx,.763,(low+high)/2),(.010,.025,high-low),joint_material or frame)
            xx+=.12

    b.finish({'revision':REVISION})
    # Retain the current exterior finish controls on the replacement facade.
    appearance=nav.get('exteriorAppearance')
    if appearance:
        role_objects={};role_faces={}
        for ob in scene.objects:
            if ob.type!='MESH':continue
            for face in ob.data.polygons:
                if face.material_index>=len(ob.data.materials):continue
                mat=ob.data.materials[face.material_index]
                role=mat.get('appearance_role') if mat else None
                if role:
                    role_faces[role]=role_faces.get(role,0)+1
                    role_objects.setdefault(role,set()).add(ob.name)
        appearance['faces']=role_faces
        appearance['objects']={role:sorted(names) for role,names in role_objects.items()}
    report={'revision':REVISION,'configuration':cfg,'removed':removed,'created':[o.name for o in b.objects],
            'changed':[o.name for o in changed],'windowWidthsM':[c-a for a,c in windows],
            'centreLinesX':[(a+c)/2 for a,c in windows],'centralPierWidthM':cfg['pier'][1]-cfg['pier'][0],
            'preserved':'Accepted bedroom, walk-through wardrobe, full-length bathroom, privacy door, loft and ground-floor windows.'}
    nav['frontWindowAlignment']=report
    scene['front_window_alignment_revision']=REVISION;scene['front_window_alignment_report']=json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    apply_front_window_alignment(globals())
