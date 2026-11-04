"""Complete fixed linings, planted stops and two-sided trim on all solid doors.

Fit the actual closed leaf geometry, including paired and already-open leaves.
Existing hinges do not exempt a door from receiving a complete surround.
"""
import math,json,re
from pathlib import Path


def refine_door_frames(scene, navigation):
    import bpy
    from mathutils import Matrix, Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    # Keep surround identities tied to their doors across refreshes. Removing
    # one door must not renumber every later frame and replace unrelated trim
    # in the browser overlay. Capture this before deleting superseded parts.
    labels={}
    for ob in scene.objects:
        match=re.match(r'^Frame detail \| (\d+) ',ob.name)
        doors=tuple(sorted(ob.get('frame_doors',[])))
        if match and doors:labels[doors]=match.group(1)
    used_labels=set(labels.values())
    retained={c for s in bpy.data.scenes if s!=scene for c in s.collection.children_recursive}
    def isolate(parent):
        for child in list(parent.children):
            if child in retained:
                own=child.copy();parent.children.unlink(child);parent.children.link(own);child=own
            isolate(child)
    isolate(scene.collection)
    # Linked proposal floor-edit views are selections of these same generated
    # parts. Release superseded parts there too, so Blender can reuse their
    # authored names without .001 copies in the next visual export.
    for view in bpy.data.scenes:
        if 'Proposal ·' not in view.name:continue
        for collection in view.collection.children_recursive:
            for ob in list(collection.objects):
                if ob.name.startswith('Frame detail | '):collection.objects.unlink(ob)
    ns={'ROOT':Path(__file__).resolve().parents[2],'scene':scene,'nav':navigation,'materials':{},'PALETTE':{}}
    b=RoomBuilder(ns,'door frames','Frame detail | ','Visual complete door surrounds')
    # A canonical source may already contain the surrounds. Recreate those,
    # rather than stacking a second trim over the first in the visual export.
    b.remove(())
    retired=set(json.loads(scene.get('retired_frame_objects','[]')))
    # SW02's native editor retains complete rough-opening trims. This visual
    # derivative replaces them with its measured surrounds and hinge details.
    # Retire the native counterparts explicitly instead of stacking two frames.
    if scene.get('sw02_revision'):
        # Packed jambs close the rough opening behind the lining; they remain
        # necessary after the visible frame is replaced.
        native_labels=('south jamb','north jamb','head lining','front arch','back arch','front head arch','back head arch','stop ','head stop')
        names=[o.name for o in scene.objects if any(o.name.startswith('SW02 | '+door+' '+label)for door in ('Garage','Cinema')for label in native_labels)]
        if names:b.remove(tuple(names));retired.update(names)
    by_name={o.name:o for o in scene.objects}
    candidates=[]
    for spec in navigation.get('interactiveDoors',[]):
        if spec.get('authoredCompleteFrame'):
            continue  # This measured opening carries its own native linings/stops.
        if spec.get('motion','hinged')!='hinged' or not spec.get('apertureAxis'):continue
        leaf=None;points=None
        for name in spec['members']:
            ob=by_name.get(name)
            if not ob or ob.type!='MESH' or not name.endswith((' leaf',' door open')):continue
            hinge=Vector(ob.get('door_hinge',spec['hinge']));rotation=Matrix.Rotation(spec.get('closedDelta',0),3,'Z')
            p=[hinge+rotation@(ob.matrix_world@Vector(v)-hinge) for v in ob.bound_box]
            if 1.3<max(v.z for v in p)-min(v.z for v in p)<2.7:leaf,points=ob,p;break
        if leaf is None:continue
        a=Vector((*spec['apertureAxis'],0));a*=1 if a.x+a.y>0 else -1
        n=Vector((-a.y,a.x,0))
        u=[p.dot(a) for p in points];v=[p.dot(n) for p in points]
        if not .025<max(v)-min(v)<.08:continue
        centre=sum(points,Vector())/len(points)
        opening=Matrix.Rotation(.01*(1 if spec['openDelta']-spec.get('closedDelta',0)>0 else -1),3,'Z')
        swing=1 if ((opening@(centre-hinge))-(centre-hinge)).dot(n)>0 else -1
        candidates.append({'spec':spec,'leaf':leaf,'axis':a,'normal':n,'u':[min(u),max(u)],'v':[min(v),max(v)],
                           'bottom':spec['hinge'][2],'top':max(p.z for p in points),'swing':swing,'hinge':hinge})
    groups=[]
    for item in sorted(candidates,key=lambda d:d['u'][0]):
        group=next((g for g in groups if abs(g[0]['axis'].dot(item['axis']))>.999 and
                    abs(sum(g[0]['v'])-sum(item['v']))<.05 and abs(g[0]['top']-item['top'])<.03 and
                    min(abs(item['u'][0]-max(x['u'][1] for x in g)),abs(item['u'][1]-min(x['u'][0] for x in g)))<.035),None)
        if group is None:groups.append([item])
        else:group.append(item)
    structural=[]
    for ob in scene.objects:
        name=ob.name.lower()
        if ob.type=='MESH' and any(w in name for w in ('wall','partition','pier','jamb','lining','entrance solid panel')) and not any(w in name for w in ('roof lining','skirting','lamp','light','diffuser','cabinet','shower','frame detail','detail ')):
            structural.append((ob.name,[ob.matrix_world@Vector(v) for v in ob.bound_box]))
    # Finished plaster skins may be zero-thickness meshes and are often named
    # "return", "face", "end" or "lintel". Test their actual projected faces;
    # a whole-object box can mistake a perpendicular return for wall depth.
    finish_faces=[]
    for ob in scene.objects:
        name=ob.name.lower()
        if ob.type!='MESH' or any(w in name for w in ('roof','ceiling','floor','skirting','cove','cabinet','shower','frame detail','door','light','diffuser')):continue
        mats=' '.join(m.name.lower() for m in ob.data.materials if m)
        if not any(w in mats for w in ('plaster','ivory','white joinery')):continue
        pts=[ob.matrix_world@v.co for v in ob.data.vertices]
        normal_matrix=ob.matrix_world.to_3x3().inverted().transposed()
        for face in ob.data.polygons:
            normal=(normal_matrix@face.normal).normalized()
            if abs(normal.z)>.01:continue
            finish_faces.append((ob.name,normal,[pts[i] for i in face.vertices]))
    # The side entrance's old 50 mm jambs end exactly on the leaf edges. The
    # complete surround below supplies new linings with a 3 mm reveal. Keep
    # copies in any original scenes, but retire the overlapping proposal jambs.
    if any(c['spec']['id']=='Proposal | Side entrance door' for c in candidates):
        owners=set(scene.collection.children_recursive)
        for name in ('Proposal | Side entrance door jamb','Proposal | Side entrance door jamb.001'):
            ob=scene.objects.get(name)
            if ob is None:continue
            retired.add(name)
            for collection in tuple(ob.users_collection):
                if collection in owners:collection.objects.unlink(ob)
            if not ob.users_collection:bpy.data.objects.remove(ob)
    reports=[]
    roof_tree=None
    for index,group in enumerate(groups):
        seed=group[0];axis,normal=seed['axis'],seed['normal'];lo=min(x['u'][0] for x in group)-.003;hi=max(x['u'][1] for x in group)+.003
        floor=min(x['bottom'] for x in group);head=max(x['top'] for x in group)+.003
        leaf_vmin=min(x['v'][0] for x in group);leaf_vmax=max(x['v'][1] for x in group)
        vc=(leaf_vmin+leaf_vmax)/2;vmin=vc-.0725;vmax=vc+.0725
        # Earlier opening studies left whole U-shaped casings on these same
        # apertures. Retire only a spatially matched solid-door casing; window
        # and glazed-door surrounds remain intact.
        for ob in list(scene.objects):
            # Blender truncates long legacy names before "mitred casing".
            # The complete opening bounds below, not a truncated suffix,
            # identify these U-shaped comparison surrounds safely.
            if not ob.name.startswith('Trim comparison |'):continue
            pts=[ob.matrix_world@Vector(v) for v in ob.bound_box]
            us=[p.dot(axis) for p in pts];vs=[p.dot(normal) for p in pts];zs=[p.z for p in pts]
            if (abs(min(us)-lo)<.15 and abs(max(us)-hi)<.15 and
                abs((min(vs)+max(vs))/2-vc)<.30 and abs(min(zs)-floor)<.15 and abs(max(zs)-head)<.18):
                retired.add(ob.name)
                owners=set(scene.collection.children_recursive)
                for collection in tuple(ob.users_collection):
                    if collection in owners:collection.objects.unlink(ob)
                if not ob.users_collection:bpy.data.objects.remove(ob)
        wall_spans=[];legacy_spans=[];host_names=[]
        for object_name,pts in structural:
            # Earlier groups may have retired and deleted this legacy jamb.
            # Resolve the saved name before touching a Blender RNA reference.
            ob=scene.objects.get(object_name)
            if ob is None:continue
            u=[p.dot(axis) for p in pts];v=[p.dot(normal) for p in pts];zs=[p.z for p in pts]
            if not min(zs)<head+.08 or not max(zs)>floor+.15 or not .001<max(v)-min(v)<.55:continue
            if abs((min(v)+max(v))/2-vc)>.25:continue
            distance=min(abs(max(u)-lo),abs(min(u)-hi))
            at_side=distance<.14 and min(zs)<(floor+head)/2<max(zs)
            at_head=min(zs)>head-.045 and min(zs)<head+.10 and min(u)<hi and max(u)>lo
            if not(at_side or at_head):continue
            name=ob.name.lower()
            legacy=any(w in name for w in ('jamb','lining')) and 'door' in name and (
                (at_side and max(u)-min(u)<.10 and min(zs)<floor+.05 and max(zs)>head-.05) or
                (at_head and max(zs)-min(zs)<.10 and abs(min(u)-lo)<.10 and abs(max(u)-hi)<.10))
            if legacy:
                legacy_spans.append((distance,min(v),max(v)))
                retired.add(ob.name)
                owners=set(scene.collection.children_recursive)
                for collection in tuple(ob.users_collection):
                    if collection in owners:collection.objects.unlink(ob)
                continue
            wall_spans.append((distance,min(v),max(v)));host_names.append(ob.name)
        probes=[(u,z) for u in (lo-.045,hi+.045,lo-.060,hi+.060) for z in (floor+.25,(floor+head)/2,head-.06)]
        probes += [(lo+(hi-lo)*t,head+.040) for t in (.15,.5,.85)]
        def contains(poly,x,y):
            inside=False
            for (ax,ay),(bx,by) in zip(poly,poly[1:]+poly[:1]):
                if (ay>y)!=(by>y) and x<(bx-ax)*(y-ay)/(by-ay)+ax:inside=not inside
            return inside
        for object_name,face_normal,pts in finish_faces:
            if abs(face_normal.dot(normal))<.999:continue
            face_v=sum(p.dot(normal) for p in pts)/len(pts)
            if abs(face_v-vc)>.28:continue
            polygon=[(p.dot(axis),p.z)for p in pts]
            if any(contains(polygon,u,z)for u,z in probes):
                wall_spans.append((0,face_v,face_v));host_names.append(object_name)
        if wall_spans:
            # Use both finished wall faces, including thin room linings and
            # headers. A nearby shallow legacy jamb is not the host wall.
            vmin=min(s[1] for s in wall_spans)-.002
            vmax=max(s[2] for s in wall_spans)+.002
            vmin=min(vmin,leaf_vmin-.004);vmax=max(vmax,leaf_vmax+.004)
        elif legacy_spans:
            vmin=min(s[1] for s in legacy_spans)-.002;vmax=max(s[2] for s in legacy_spans)+.002
        if seed['spec']['id']=='Proposal | Side entrance door':
            # The retired jambs no longer provide a bounding-box hint on the
            # next refresh. Use the actual host wall so repeated source/visual
            # builds retain the same full-depth lining.
            host=next(w for w in navigation['walls'] if w['name']=='Garage west')
            wall_v=Vector((*host['a'],0)).dot(normal);half=host['thickness_m']/2+.002
            vmin,vmax=wall_v-half,wall_v+half
        front=all(x['spec']['id'].startswith('Proposal | Entrance solid door ') for x in group)
        mat=(bpy.data.materials.get('Proposal | Bronze black frames') if front else None) or seed['leaf'].data.materials[0]
        key=tuple(sorted(x['spec']['id'] for x in group))
        label=labels.get(key)
        if label is None:
            number=0
            while f'{number:02d}' in used_labels:number+=1
            label=f'{number:02d}';used_labels.add(label)
        names=[]
        def box(part,u,v,z,sx,sy,sz,material=mat,owner=None):
            ob=b.box(label+' '+part,(0,0,0),(sx,sy,sz),material,.0008)
            ob.location=axis*u+normal*v+Vector((0,0,z));ob.rotation_euler.z=math.atan2(axis.y,axis.x)
            ob['detail_source']=seed['leaf'].name;ob['frame_doors']=[x['spec']['id'] for x in group]
            if owner:
                ob['door_id']=owner['spec']['id'];hinge=owner['hinge'];rot=Matrix.Rotation(-owner['spec'].get('closedDelta',0),4,'Z')
                ob.matrix_world=Matrix.Translation(hinge)@rot@Matrix.Translation(-hinge)@ob.matrix_world
            names.append(ob.name);return ob
        # The inner faces leave exactly 3 mm to the closed leaf. The lining spans
        # the wall depth; its trims overlap the plaster on BOTH room faces.
        depth=vmax-vmin;mid=(vmin+vmax)/2;height=head-floor
        for suffix,u in [('hinge',lo-.014),('latch',hi+.014)]:box(suffix+' jamb lining',u,mid,(floor+head)/2,.028,depth,height)
        box('head lining',(lo+hi)/2,mid,head+.014,hi-lo+.056,depth,.028)
        trim_width,trim_offset=(.034,.018) if seed['spec'].get('frameStyle')=='slim-metal' else (.060,.035)
        for side,v in [('front',vmax+.006),('back',vmin-.006)]:
            for edge,u in [('left',lo-trim_offset),('right',hi+trim_offset)]:box(side+' '+edge+' architrave',u,v,(floor+head+.005)/2,trim_width,.012,height+.005)
            box(side+' head architrave',(lo+hi)/2,v,head+trim_offset,hi-lo+2*trim_offset+trim_width,.012,trim_width)
        swing=seed['swing'];stop_face=leaf_vmin-.001 if swing>0 else leaf_vmax+.001
        stop_v=stop_face-swing*.008
        for edge,u in [('left',lo+.006),('right',hi-.006)]:box(edge+' planted door stop',u,stop_v,(floor+head)/2,.022,.016,height)
        box('head planted door stop',(lo+hi)/2,stop_v,head-.006,hi-lo,.016,.022)
        if len(group)==2:
            left,right=sorted(group,key=lambda x:x['u'][0]);gap=right['u'][0]-left['u'][1]
            # Wide legacy meeting gaps get fitted oak lippings, leaving a real
            # 4 mm joint. A rear rebate travels with one leaf, never blocks it.
            extension=max(0,(gap-.004)/2)
            if extension>.001:
                for door,edge,sign in [(left,left['u'][1],1),(right,right['u'][0],-1)]:
                    box('meeting stile lipping '+str(sign),edge+sign*extension/2,sum(door['v'])/2,(floor+.025+head-.003)/2,
                        extension,door['v'][1]-door['v'][0],height-.028,owner=door)
            if not front:box('rebated meeting stop',(left['u'][1]+right['u'][0])/2,stop_v,(floor+.025+head-.003)/2,max(gap+.026,.030),.016,height-.028,owner=left)
        roof=seed['spec'].get('roofScribedFrame')
        if roof:
            # Scribe only the outside of the oak trim to the actual roof.
            # The standard-height leaf and rectangular clear opening stay intact.
            bpy.context.view_layer.update()
            if roof_tree is None:
                from mathutils.bvhtree import BVHTree
                vertices=[];faces=[]
                for surface in scene.objects:
                    if surface.type!='MESH' or 'roof lining' not in surface.name.lower():continue
                    offset=len(vertices)
                    vertices.extend(surface.matrix_world@v.co for v in surface.data.vertices)
                    faces.extend(tuple(offset+i for i in face.vertices) for face in surface.data.polygons)
                roof_tree=BVHTree.FromPolygons(vertices,faces) if vertices else False
            for name in names:
                ob=scene.objects[name]
                if 'architrave' not in name:continue
                inv=ob.matrix_world.inverted()
                for vertex in ob.data.vertices:
                    p=ob.matrix_world@vertex.co
                    limit=roof['flatCeilingZ']-.006
                    if roof_tree:
                        hit,*_=roof_tree.ray_cast(Vector((p.x,p.y,floor+.001)),Vector((0,0,1)),3)
                        if hit is not None:limit=min(limit,hit.z-.006)
                    else:
                        limit=min(limit,roof['ridgeUndersideZ']-roof['pitch']*abs(p.y-roof['ridgeY'])-.006)
                    if p.z>limit:p.z=limit;vertex.co=inv@p
                ob.data.update()
        reports.append({'doors':[x['spec']['id'] for x in group],'leaves':[x['leaf'].name for x in group],
                        'axis':list(axis),'normal':list(normal),'opening':[lo,hi,floor,head],
                        'wallDepth':[vmin,vmax],'hostSurfaces':sorted(set(host_names)),'stopFace':stop_face,'swing':swing,'clearanceMetres':.003,'addedObjects':names})
    scribe_cinema_return(scene,reports)
    # A frame fitted to a leaf is not enough: many authored rough openings
    # stop exactly on the lining's exposed inner face. Cut a real pocket for
    # the 28 mm lining, then end skirting beside the outside of the trim.
    junction_objects,junctions=clear_frame_junctions(scene,reports,b,retired)
    scene.view_layers[0].update()
    scene['retired_frame_objects']=json.dumps(sorted(retired))
    return list(dict.fromkeys(b.objects+junction_objects)),{'addedObjects':[o.name for o in b.objects],'removedObjects':sorted(retired),'frames':reports,'junctions':junctions,'solidDoorCount':len(candidates)}


def clear_frame_junctions(scene,frames,builder,retired):
    """Rebate plaster around fixed linings without changing the clear opening.

    Keep original-house objects intact when a proposal reuses their skirting.
    Replacement meshes are also returned to the visual exporter, so the native
    and browser versions receive the same actual wall cuts.
    """
    import bpy
    from mathutils import Vector
    from scripts.geometry.blender_booleans import BooleanWorkspace
    owners=set(scene.collection.children_recursive)
    originals={o for s in bpy.data.scenes if 'Proposed' not in s.name and 'Proposal ·' not in s.name for o in s.objects}
    changed={};records=[]
    def retire(ob):
        retired.add(ob.name)
        for collection in tuple(ob.users_collection):
            if collection in owners:collection.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def local(ob):
        if ob not in originals:return ob
        old=ob;ob=old.copy();ob.data=old.data.copy();ob.name='Door junction | '+old.name
        ob['source_name']=old.get('source_name',old.name)
        for collection in tuple(old.users_collection):
            if collection in owners:collection.objects.link(ob)
        retire(old)
        return ob
    for frame in frames:
        # These retained garden shells have no detected clash. Keep their
        # original masonry exactly as surveyed; this is an internal-wall pass.
        if all(d.startswith('Gardenhouse 01 |') for d in frame['doors']):continue
        a,n=Vector(frame['axis']),Vector(frame['normal']);lo,hi,floor,head=frame['opening'];v0,v1=frame['wallDepth']
        modifications=[];targets=[]
        for ob in list(scene.objects):
            name=ob.name.lower()
            if ob.type!='MESH' or name.startswith(('frame detail |','detail |')):continue
            if any(t in name for t in ('door leaf','door open','cabinet','wardrobe','shower','roof','ceiling','floor','light','diffuser')):continue
            skirt='skirting' in name
            legacy=('door architrave' in name or 'classical overdoor' in name)
            wall=any(t in name for t in ('wall','partition','pier','header',' head ','cheek','return',' face','lintel','entrance solid panel'))
            if not(skirt or legacy or wall):continue
            mats=' '.join(m.name.lower() for m in ob.data.materials if m)
            if not any(t in mats for t in ('plaster','ivory','white internal','white joinery','limestone render')):continue
            pts=[ob.matrix_world@Vector(p) for p in ob.bound_box]
            us=[p.dot(a) for p in pts];vs=[p.dot(n) for p in pts];zs=[p.z for p in pts]
            margin=.067 if skirt else .030
            top_allowance=.18 if legacy else .030
            if min(us)>=hi+margin-.0001 or max(us)<=lo-margin+.0001 or min(zs)>=head+top_allowance-.0001 or max(zs)<=floor+.001:continue
            if min(vs)>=v1+.03 or max(vs)<=v0-.03:continue
            if legacy:
                if min(us)>lo-.15 and max(us)<hi+.15 and min(zs)>floor-.02 and max(zs)<head+.18:
                    modifications.append({'object':ob.name,'action':'retire duplicate casing'});retire(ob)
                continue
            # Avoid cutting furniture or unrelated walls elsewhere in a large
            # object's bounding box: exact Booleans affect the pocket only.
            signature=json.dumps([frame['doors'],[round(x,5) for x in (lo,hi,floor,head,v0,v1)],margin])
            done=json.loads(ob.get('frame_junction_pockets','[]'))
            if signature in done:continue
            targets.append((ob,margin,signature,done))
        if not targets:continue
        cutters={}
        for margin in {x[1] for x in targets}:
            cutter=builder.box('temporary lining pocket',(0,0,0),(hi-lo+2*margin,v1-v0+.064,head-floor+.04),bpy.data.materials[0])
            cutter.location=a*((lo+hi)/2)+n*((v0+v1)/2)+Vector((0,0,(floor+head+.02)/2))
            cutter.rotation_euler.z=math.atan2(a.y,a.x);cutters[margin]=cutter
        scene.view_layers[0].update()
        with BooleanWorkspace(cutters.values()) as workspace:
            for ob,margin,signature,done in targets:
                ob=local(ob)
                # Boolean-created reveal faces must inherit the room finish,
                # not an unused brick material in the host's first slot.
                used={p.material_index for p in ob.data.polygons}
                finish=next((m for i,m in enumerate(ob.data.materials) if i in used and m and any(t in m.name.lower() for t in ('plaster','ivory','white internal','white joinery'))),None)
                if finish is None:finish=ob.data.materials[next(iter(used),0)]
                cutters[margin].data.materials.clear();cutters[margin].data.materials.append(finish)
                workspace.difference(ob,[cutters[margin]],'Door lining installation pocket')
                ob['frame_junction_pockets']=json.dumps(done+[signature]);changed[ob.name]=ob
                modifications.append({'object':ob.name,'action':'trim skirting to casing' if margin>.06 else 'clear lining pocket','clearanceMetres':.002})
        for cutter in cutters.values():
            builder.objects.remove(cutter);mesh=cutter.data;bpy.data.objects.remove(cutter,do_unlink=True)
            if not mesh.users:bpy.data.meshes.remove(mesh)
        records.append({'doors':frame['doors'],'modifications':modifications})
    header=trim_covered_cinema_header(scene)
    if header:
        changed[header.name]=header
        records.append({'doors':['Proposal | Basement cinema door'],'modifications':[{'object':header.name,'action':'trim header to perpendicular wall return'}]})
    covered=retire_covered_cinema_pier(scene,retired)
    if covered:
        changed.pop(covered,None)
        records.append({'doors':['Proposal | Basement cinema door'],'modifications':[{'object':covered,'action':'retire pier wholly covered by perpendicular wall'}]})
    return list(changed.values()),records


def trim_covered_cinema_header(scene):
    """Butt the east header to the north wall, avoiding a coplanar 27 mm lap."""
    from mathutils import Vector
    header=scene.objects.get('Proposal | Cinema east wall head 1')
    wall=scene.objects.get('Proposal | Cinema north wall')
    if header is None or wall is None:return None
    scene.view_layers[0].update()
    hp=[header.matrix_world@v.co for v in header.data.vertices]
    wp=[wall.matrix_world@Vector(p)for p in wall.bound_box]
    end=min(p.y for p in wp)
    if max(p.y for p in hp)<=end+.000001:return None
    # Only trim the end contained by this full-height perpendicular wall.
    if not min(p.y for p in hp)<end<max(p.y for p in hp):return None
    for coordinate in ('x','z'):
        if min(getattr(p,coordinate)for p in hp)<min(getattr(p,coordinate)for p in wp)-.000001:return None
        if max(getattr(p,coordinate)for p in hp)>max(getattr(p,coordinate)for p in wp)+.000001:return None
    inverse=header.matrix_world.inverted()
    for vertex in header.data.vertices:
        point=header.matrix_world@vertex.co
        if point.y>end:
            point.y=end;vertex.co=inverse@point
    header.data.update()
    return header


def retire_covered_cinema_pier(scene,retired):
    """Remove the tiny residual pier when the north wall already fills it.

    The lining rebate leaves an upper fragment with an exactly coincident
    outer face. It becomes visible inside the scribed casing notch. Check its
    actual evaluated containment before retiring it; never remove an exposed
    pier merely because its name matches.
    """
    import bpy
    from mathutils import Vector
    from mathutils.bvhtree import BVHTree
    pier=scene.objects.get('Proposal | Cinema east wall end pier')
    wall=scene.objects.get('Proposal | Cinema north wall')
    if pier is None or wall is None:return None
    scene.view_layers[0].update()
    deps=bpy.context.evaluated_depsgraph_get()
    tree=BVHTree.FromObject(wall,deps)
    inverse=wall.matrix_world.inverted()
    ev=pier.evaluated_get(deps);mesh=ev.to_mesh()
    points=[inverse@(pier.matrix_world@v.co)for v in mesh.vertices]
    ev.to_mesh_clear()
    if not points:return None
    centre=sum(points,Vector())/len(points)
    for point in points+[centre]:
        # A slight inward probe disambiguates the shared outer boundary.
        probe=point.lerp(centre,.001)
        hit,normal,_,distance=tree.find_nearest(probe)
        if hit is None or normal.dot(probe-hit)>.000001:return None
    name=pier.name
    owners=set(scene.collection.children_recursive)|{scene.collection}
    for collection in tuple(pier.users_collection):
        if collection in owners:collection.objects.unlink(pier)
    if not pier.users_collection:bpy.data.objects.remove(pier)
    retired.add(name)
    return name


def scribe_cinema_return(scene,frames):
    """The cinema latch jamb meets a perpendicular wall: fit a narrow casing."""
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    scene.view_layers[0].update()
    for frame in frames:
        if frame['doors']!=['Proposal | Basement cinema door']:continue
        wall=scene.objects.get('Proposal | Cinema north wall')
        if wall is None:continue
        # The revised doorway is over a metre south of this return. Its frame
        # has an ordinary square head; the old corner scribe no longer applies.
        end=min((wall.matrix_world@Vector(p)).y for p in wall.bound_box)
        if abs(end-frame['opening'][1])>.12:continue
        axis=Vector(frame['axis']);normal=Vector(frame['normal']);lo,hi,floor,head=frame['opening'];limit=hi+.028
        for name in frame['addedObjects']:
            if 'architrave' not in name or not ('right' in name or 'head' in name):continue
            ob=scene.objects[name];inverse=ob.matrix_world.inverted()
            for vertex in ob.data.vertices:
                p=ob.matrix_world@vertex.co;excess=p.dot(axis)-limit
                if excess>0:vertex.co=inverse@(p-axis*excess)
            ob.data.update()
            if 'head' in name:
                # Above the lining pocket, the perpendicular wall continues
                # across the corner. Notch the head casing around that return
                # with a 1 mm scribe clearance; retain its lower overlap.
                points=[ob.matrix_world@v.co for v in ob.data.vertices]
                u0=min(p.dot(axis) for p in points);v0=min(p.dot(normal) for p in points);v1=max(p.dot(normal) for p in points)
                wall=scene.objects['Proposal | Cinema north wall']
                end=min((wall.matrix_world@Vector(p)).dot(axis) for p in wall.bound_box)-.001
                profile=[(u0,head+.005),(limit,head+.005),(limit,head+.029),(end,head+.029),(end,head+.065),(u0,head+.065)]
                vertices=[inverse@(axis*u+normal*v+Vector((0,0,z))) for v in (v0,v1) for u,z in profile]
                faces=[tuple(range(6)),tuple(reversed(range(6,12)))]+[(i,i+6,(i+1)%6+6,(i+1)%6) for i in range(6)]
                ob.data.clear_geometry();ob.data.from_pydata(vertices,[],faces);ob.data.update();RoomBuilder.uv(None,ob)
