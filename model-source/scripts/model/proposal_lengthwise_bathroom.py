"""Turn the combined suite bathroom through ninety degrees, retaining its route."""
import json
import math

REVISION = 'lengthwise-bathroom-2026-10-23'
PREFIX = 'Lengthwise suite | '
FURN = 'Combined suite 01 | '
OLD = 'Proposal | Original house loft stair | '


def apply_lengthwise_bathroom(ns):
    import bpy
    from mathutils import Matrix, Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.model.proposal_suite_layout_loft import complete_door

    scene, nav = ns['scene'], ns['nav']
    if scene.get('lengthwise_bathroom_revision') == REVISION:
        return [], json.loads(scene['lengthwise_bathroom_report'])
    cfg = json.loads((ns['ROOT'] / 'proposal/specs/lengthwise-bathroom.json').read_text())
    owners = {c for s in bpy.data.scenes if s == scene or 'Proposal ·' in s.name for c in s.collection.children_recursive}
    removed, changed = [], []
    def retire(ob):
        removed.append(ob.name)
        for col in tuple(ob.users_collection):
            if col in owners:
                col.objects.unlink(ob)
        if not ob.users_collection:
            bpy.data.objects.remove(ob)
    def groups(key, pending=None):
        result = [nav.setdefault(key, [])]
        other = ns.get(pending or 'new_' + key)
        if other is not None and all(other is not v for v in result):
            result.append(other)
        return result
    def add(key, value, pending=None):
        ns.get(pending or 'new_' + key, nav.setdefault(key, [])).append(value)
    def bounds(ob):
        pts = [ob.matrix_world @ Vector(v) for v in ob.bound_box]
        return [min(p[i] for p in pts) for i in range(3)] + [max(p[i] for p in pts) for i in range(3)]

    # Retire only the crosswise divider, its finishes, cupboards and bathroom door.
    # Sleeping furniture, WC, shower, all loft work and the suite entrance remain.
    for ob in list(scene.objects):
        n = ob.name
        if n.startswith(tuple(FURN + t for t in ('wardrobe ', 'window dressing', 'window seat', 'window drawer', 'bathroom entry'))):
            retire(ob)
        elif n.startswith('Open suite | wardrobe '):
            retire(ob)
        elif n.startswith(OLD) and (n[len(OLD):].startswith(('Suite dressing room flo', 'Suite bathroom floor', 'Bathroom')) or n[len(OLD):].startswith('Combined bathroom priva') and bounds(ob)[1] < 4):
            retire(ob)
        elif n.startswith(('Proposal | Side bedrooms front window ', 'Sidebed 01 | bedroom front window internal ')):
            retire(ob)

    old_surfaces = ('suite dressing floor', 'suite bathroom floor', 'suite bathroom rear floor', 'bathroom threshold')
    old_obstacles = ('fitted dressing wardrobe ', 'double vanity', 'low dressing window drawers')
    for key, pending in [('segments', None), ('surfaces', None), ('obstacles', None), ('interactiveDoors', 'proposed_doors')]:
        for values in groups(key, pending):
            values[:] = [v for v in values if v.get('name', v.get('id')) not in removed
                         and not (key == 'surfaces' and any(v.get('name', '').startswith(OLD + t) for t in old_surfaces))
                         and not (key == 'obstacles' and any(v.get('name', '').startswith(FURN + t) for t in old_obstacles))
                         and not (key == 'interactiveDoors' and v['id'] == FURN + 'bathroom entry')]

    m = {k: bpy.data.materials['Interior | Sidebed ' + name] for k, name in {
        'oak': 'natural oak', 'stone': 'honed limestone', 'ivory': 'warm ivory',
        'linen': 'ivory upholstery', 'bronze': 'satin bronze', 'dark': 'recess and drain',
        'mirror': 'mirror glass', 'light': 'warm diffuser'}.items()}
    ivory = bpy.data.materials['Interior | Landings warm ivory']
    b = RoomBuilder(ns, 'lengthwise bathroom', PREFIX, 'P41 Lengthwise bathroom and dressing')
    z, ceiling = cfg['floorZ'], cfg['ceilingZ']
    def wall(label, r, low=z, high=ceiling):
        ob = b.box_bounds(label, r, low, high, ivory)
        x, y, X, Y = r
        a, c, th = ([(x+X)/2, y], [(x+X)/2, Y], X-x) if X-x < Y-y else ([x, (y+Y)/2], [X, (y+Y)/2], Y-y)
        add('segments', {'name': ob.name, 'a': a, 'b': c, 'bottom': low, 'top': high, 'thickness': th})
        return ob
    x, y, X, Y = cfg['partition']; door_start, door_end = cfg['door']['openingY']
    wall('bathroom south pier', [x, y, X, door_start])
    wall('bathroom north pier', [x, door_end, X, Y])
    wall('bathroom door head', [x, door_start, X, door_end], z+2.081)
    def floor(label, r, material):
        ob = b.box_bounds(label, r, z-.005, z+.012, material)
        a, s, c, n = r
        add('surfaces', {'name': ob.name, 'polygon': [[a,s],[c,s],[c,n],[a,n]], 'z': z+.012})
    floor('bathroom limestone floor', cfg['bathroom'], m['stone'])
    floor('dressing oak floor', cfg['dressing'], m['oak'])
    floor('bathroom threshold', [x, door_start, X, door_end], m['stone'])

    # Turn the complete existing double vanity, including its lights and mirror.
    tr = Matrix.Translation((*cfg['vanityCentre'], 0)) @ Matrix.Rotation(-math.pi/2, 4, 'Z') @ Matrix.Translation((1.1, -3.945, 0))
    vanity_labels = ('double vanity ', 'hollow ceramic basin', 'basin dark waste', 'basin bronze pop-up waste', 'wall basin mixer', 'basin mixer collar', 'wide vanity mirror', 'mirror light ', 'vanity face glow')
    for ob in scene.objects:
        if ob.name.startswith(tuple(FURN + t for t in vanity_labels)):
            assert not any(ob.name in s.objects for s in bpy.data.scenes if s != scene and 'Proposal ·' not in s.name), ob.name
            ob.matrix_world = tr @ ob.matrix_world
            changed.append(ob)
    for values in groups('proposalLights'):
        for light in values:
            if light['name'] == FURN + 'vanity face glow':
                light['position'] = list(tr @ Vector(light['position']))
    for values in groups('mirrors'):
        for mirror in values:
            if mirror['name'] == FURN + 'wide vanity mirror':
                mirror['position'] = list(tr @ Vector(mirror['position']))
                mirror['normal'] = list(tr.to_3x3() @ Vector(mirror['normal']))
    b.obstacle('double vanity', cfg['vanity'], z, z+.86)

    # Opposed wardrobes form a real walk-through, with about 1.46 m between pulls.
    for row, w in enumerate(cfg['wardrobes']):
        a, s, c, n = w['bounds']; front = w['frontX']; east = w['faces'] == 'east'
        back = a if east else c; direction = 1 if east else -1
        length = n-s; count = math.ceil(length/.55)
        b.box_bounds('wardrobe plinth '+str(row), [a+.025,s+.02,c-.025,n-.02], z+.014,z+.10,m['dark'])
        b.box('wardrobe back '+str(row), (back+direction*.009,(s+n)/2,z+1.18),(.018,length,2.24),m['oak'])
        for j in range(count+1):
            b.box('wardrobe upright', ((a+c)/2,s+j*length/count,z+1.18),(c-a,.018,2.24),m['oak'])
        for h in (.12,2.28):
            b.box('wardrobe shelf',((a+c)/2,(s+n)/2,z+h),(c-a,length,.024),m['oak'])
        b.box_bounds('wardrobe ceiling filler '+str(row), w['bounds'],z+2.292,ceiling-.003,m['oak'])
        b.box('wardrobe flush frieze '+str(row),(front,(s+n)/2,(z+2.23+ceiling-.003)/2),(.025,length,ceiling-.003-z-2.23),m['oak'],.001)
        for j in range(count):
            yy=s+(j+.5)*length/count
            b.box('wardrobe oak door',(front,yy,z+1.18),(.025,length/count-.004,2.10),m['oak'],.003)
            b.box('wardrobe bronze pull',(front+direction*.023,yy+length/count*.32,z+1.12),(.018,.012,.23),m['bronze'],.003)
            b.box('wardrobe upper shelf',((a+c)/2,yy,z+1.90),(.55,length/count-.02,.018),m['oak'])
            b.cylinder('wardrobe hanging rail',((a+c)/2,yy,z+1.75),.012,length/count-.025,m['bronze'],(0,1,0))
        b.obstacle('fitted wardrobe '+str(row),w['bounds'],z,ceiling)
    r=cfg['windowSeat'];a,s,c,n=r
    b.box_bounds('window dressing drawers',r,z+.08,z+.62,m['oak'],.008)
    b.box('window seat cushion',((a+c)/2,(s+n)/2,z+.65),(c-a,n-s,.06),m['linen'],.02)
    for xx in (a+(c-a)*.25,a+(c-a)*.75):
        b.box('window drawer pull',(xx,n+.008,z+.45),(.22,.014,.012),m['bronze'],.003)
    b.obstacle('low dressing window drawers',r,z,z+.68)

    b.prefix=FURN
    complete_door(b,ns,'bathroom entry',cfg['door'],.124,z,m)
    b.prefix=PREFIX
    # Continuous trim stops clear of the casing; no overlapping wall/door faces.
    for label, r in [('bath south skirting',[x-.014,y,x,door_start-.04]),('bath north skirting',[x-.014,door_end+.04,x,Y]),('dressing north skirting',[X,door_end+.04,X+.014,cfg['dressing'][3]])]:
        b.box_bounds(label,r,z+.014,z+.094,m['oak'],.002)

    # Two independent front windows join a solid pier aligned with the partition.
    w=cfg['frontWindows'];pa,pc=w['pier'];sill,head=w['sillZ'],w['headZ']
    exterior = scene.objects['Proposal | Side bedrooms front pier 0'].data.materials[0]
    b.box_bounds('front window dividing pier',[pa,.785,pc,1.015],sill,head,exterior)
    b.box_bounds('front pier internal plaster',[pa,1.015,pc,1.017],sill,head,ivory)
    cladding = scene.objects.get('Proposal | Side wing front oak cladding')
    if cladding:
        b.box_bounds('front pier oak cladding',[pa,.769,pc,.785],sill,head,cladding.data.materials[0])
    add('segments',{'name':PREFIX+'front window dividing pier','a':[pa,.9],'b':[pc,.9],'bottom':sill,'top':head,'thickness':.23})
    frame=bpy.data.materials['Proposal | Bronze black frames'];glass=bpy.data.materials['Proposal | Clear glazing'];stone=bpy.data.materials['Proposal | Limestone paving']
    for label in ('bathroom','dressing'):
        a,c=w[label];width=c-a
        for zz in (sill+.028,head-.028):
            b.box(label+' window horizontal frame',((a+c)/2,.9,zz),(width,.055,.056),frame,.001)
        for xx in (a+.024,c-.024):
            b.box(label+' window jamb',(xx,.9,(sill+head)/2),(.048,.048,head-sill),frame,.001)
        b.box(label+' window glass',((a+c)/2,.9,(sill+head)/2),(width-.096,.024,head-sill-.112),glass)
        if label=='dressing':
            b.box(label+' window mullion',((a+c)/2,.9,(sill+head)/2),(.048,.048,head-sill),frame,.001)
        b.box(label+' window cill',((a+c)/2,.90,sill-.025),(width+.04,.085,.085),stone,.003)
        b.window_reveal(label+' window','y',1.017,.9275,a+.048,c-.048,sill+.056,head-.056,ivory)
        add('segments',{'name':PREFIX+label+' window glass','a':[a,.9],'b':[c,.9],'bottom':sill+.056,'top':head-.056,'thickness':.024})

    for values in groups('planRooms','new_rooms'):
        for room in values:
            if room['name'] in ('Suite dressing room','Suite bathroom'):
                r=cfg['dressing' if room['name']=='Suite dressing room' else 'bathroom'];a,s,c,n=r
                room['polygon_m']=[[a,s],[c,s],[c,n],[a,n]]
    for values in groups('rooms','new_views'):
        for view in values:
            if view['label']=='Suite dressing room':
                view.update(position=[-1.45,1.7,z],direction=[-.2,1,-.12])
            elif view['label']=='Suite bathroom':
                view.update(position=[-3.66,3.32,z],direction=[-.25,-1,-.15])
    b.finish({'revision':REVISION})
    report={'revision':REVISION,'configuration':cfg,'removed':removed,'changed':[o.name for o in changed],
            'created':[o.name for o in b.objects],'bathroomLengthM':cfg['bathroom'][3]-cfg['bathroom'][1],
            'bathroomWidthM':cfg['bathroom'][2]-cfg['bathroom'][0],
            'wardrobeFrontageM':sum(w['bounds'][3]-w['bounds'][1] for w in cfg['wardrobes']),
            'dressingClearBetweenPullsM':1.459,'bedroomConnectionOpen':True,'bathroomDoorRetained':True,
            'frontWindowSplit':True,'preserved':'Sleeping room, suite entrance, loft stair, fitted eaves storage, exterior balcony and all other external openings.'}
    nav['lengthwiseBathroom']=report
    scene['lengthwise_bathroom_revision']=REVISION;scene['lengthwise_bathroom_report']=json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    apply_lengthwise_bathroom(globals())
