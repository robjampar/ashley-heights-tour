"""Experimental structure/architecture fit, isolated to the proposed compact model.

Finishes remain independently editable. These dimensions do not select a rated
fire/acoustic/waterproofing system and are never instructions to cut real beams.
"""
import json
REVISION='structural-finish-coordination-2026-10-27'
PREFIX='Structure fit | '

def apply_structural_finishes(ns):
    import bpy,bmesh
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    from scripts.model.proposal_level_loft import subtract_box
    scene,nav,root=ns['scene'],ns['nav'],ns['ROOT']
    if scene.get('structural_finish_revision')==REVISION:return [],json.loads(scene['structural_finish_report'])
    cfg=json.loads((root/'proposal/specs/structural-finish-coordination.json').read_text())
    b=RoomBuilder(ns,'structural finish coordination',PREFIX,'P46 Coordinated structural finishes')
    ivory=bpy.data.materials['Interior | Landings warm ivory'];oak=bpy.data.materials['Interior | Landings natural oak']
    owners={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    originals={c for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name for c in s.collection.children_recursive}
    changed=[];removed=[];clones={};records=[];finish_uv_sources={}
    def mark(ob):
        if ob not in changed:changed.append(ob)
    def bounds(ob):
        vs=[ob.matrix_world@v.co for v in ob.data.vertices]
        return [min(v[i]for v in vs)for i in range(3)],[max(v[i]for v in vs)for i in range(3)]
    def editable(name):
        if name in clones:return clones[name]
        ob=scene.objects.get(name)
        if ob is None:raise ValueError('Missing named coordination target: '+name)
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            copy=ob.copy();copy.data=ob.data.copy();copy.name=PREFIX+name
            copy['source_name']=ob.get('source_name',ob.name)
            for c in tuple(ob.users_collection):
                if c in owners:
                    if c in originals:raise ValueError('Shared collection cannot be edited: '+c.name)
                    c.objects.unlink(ob);c.objects.link(copy)
            removed.append(name);clones[name]=copy;ob=copy
        # Bake existing modifiers while retaining UVs and material assignments.
        if ob not in changed:
            if ob.modifiers:
                bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get()
                mesh=bpy.data.meshes.new_from_object(ob.evaluated_get(deps),preserve_all_data_layers=True,depsgraph=deps)
            else:mesh=ob.data.copy()
            ob.modifiers.clear();ob.data=mesh;mark(ob)
        return ob
    def remap(ob,axis,old,new):
        inv=ob.matrix_world.inverted();a,c=old;u,v=new
        for vert in ob.data.vertices:
            p=ob.matrix_world@vert.co;p[axis]=u if abs(c-a)<1e-7 else u+(p[axis]-a)*(v-u)/(c-a);vert.co=inv@p
        ob.data.update();mark(ob)
    def cut_plane(ob,cut):
        # Open cosmetic sheets need polygon subtraction, not a closed-solid Boolean.
        mesh=ob.data;mesh.calc_loop_triangles();layers=list(mesh.uv_layers);polys=[]
        for tri in mesh.loop_triangles:
            p=[list(ob.matrix_world@mesh.vertices[mesh.loops[i].vertex_index].co)+[v for layer in layers for v in layer.data[i].uv]for i in tri.loops]
            for q in subtract_box(p,cut):
                if len(q)>2:polys.append((q,tri.material_index))
        inv=ob.matrix_world.inverted();vertices=[];faces=[]
        for p,_ in polys:start=len(vertices);vertices.extend(inv@Vector(v[:3])for v in p);faces.append(tuple(range(start,len(vertices))))
        me=bpy.data.meshes.new(ob.name+' finish cut');me.from_pydata(vertices,[],faces)
        for m in mesh.materials:me.materials.append(m)
        for layer in layers:me.uv_layers.new(name=layer.name)
        for face,(p,mi)in zip(me.polygons,polys):
            face.material_index=mi
            for j,loop in enumerate(face.loop_indices):
                for k,layer in enumerate(me.uv_layers):layer.data[loop].uv=p[j][3+2*k:5+2*k]
        me.update();ob.data=me;mark(ob)
    def cut_box(ob,lo,hi):
        a,c=bounds(ob)
        if any(min(c[k],hi[k])-max(a[k],lo[k])<-1e-6 for k in range(3)):return
        if c[2]-a[2]<.0001:cut_plane(ob,lo+hi);return
        cutter=b.box('temporary coordination cutter',tuple((lo[k]+hi[k])/2 for k in range(3)),tuple(hi[k]-lo[k]for k in range(3)),ivory)
        with BooleanWorkspace([cutter])as work:work.difference(ob,[cutter],'Coordinated finish clearance')
        b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True);mark(ob)
    def replace_closed_finish(ob,record):
        from mathutils.bvhtree import BVHTree
        from mathutils.geometry import barycentric_transform
        old=finish_uv_sources.get(ob.name,ob.data);old.calc_loop_triangles();oldtris=list(old.loop_triangles)
        world=[ob.matrix_world@v.co for v in old.vertices]
        tree=BVHTree.FromPolygons(world,[t.vertices for t in oldtris],all_triangles=True)
        layers=list(old.uv_layers);points=[];index={};faces=[];inv=ob.matrix_world.inverted()
        for k in range(0,len(record['triangles']),3):
            face=[]
            for p in record['triangles'][k:k+3]:
                key=tuple(p)
                if key not in index:index[key]=len(points);points.append(inv@Vector(p))
                face.append(index[key])
            faces.append(face)
        mesh=bpy.data.meshes.new(ob.name+' closed coordinated finish');mesh.from_pydata(points,[],faces)
        for m in old.materials:mesh.materials.append(m)
        for layer in layers:mesh.uv_layers.new(name=layer.name)
        mesh.update()
        # Retain the existing surface material and UV mapping using the nearest
        # authored face. No new material or texture is introduced by the repair.
        for face in mesh.polygons:
            centre=ob.matrix_world@face.center;hit,normal,ti,distance=tree.find_nearest(centre)
            if ti is None:raise ValueError('Finish material mapping failed: '+ob.name)
            source=oldtris[ti];face.material_index=source.material_index
            source_points=[world[i]for i in source.vertices]
            for li in face.loop_indices:
                p=ob.matrix_world@mesh.vertices[mesh.loops[li].vertex_index].co
                for k,layer in enumerate(layers):
                    uv=[Vector((*layer.data[i].uv,0))for i in source.loops]
                    mapped=barycentric_transform(p,*source_points,*uv);mesh.uv_layers[k].data[li].uv=mapped.xy
        ob.data=mesh;ob['closed_finish_expected_volume_m3']=record['expectedVolumeM3'];mark(ob)
    floor_names=[];ceiling_names=[]
    for op in cfg['operations']:
        ob=editable(op['objectName']);before=bounds(ob);method=op['method']
        if op['kind']=='floor-body' and not ob.get('structural_framing_reference_json'):
            # Preserve the load-bearing plate topology independently of small
            # finish/casing cuts. Explicit structural openings are applied by
            # the structural layout specification, not inferred from trim.
            ob['structural_framing_reference_json']=json.dumps({
                'vertices':[list(ob.matrix_world@v.co)for v in ob.data.vertices],
                'faces':[list(f.vertices)for f in ob.data.polygons],
                'basis':'Plate before finish-depth and column-casing cuts; structural openings and support revisions are applied separately.'})
        if method=='bounds-z':remap(ob,2,op['oldZ'],op['newZ'])
        elif method=='piecewise-z':
            old,new=op['oldLevels'],op['newLevels'];inv=ob.matrix_world.inverted()
            for vertex in ob.data.vertices:
                p=ob.matrix_world@vertex.co;z=p.z
                i=next((i for i in range(len(old)-1)if z<=old[i+1]+1e-5),len(old)-2)
                p.z=new[i]+(z-old[i])*(new[i+1]-new[i])/(old[i+1]-old[i]);vertex.co=inv@p
            ob.data.update()
        elif method=='bounds-axis':remap(ob,op['axis'],op['old'],op['new'])
        elif method=='translate-z':
            # Change vertex positions, leaving parent transforms and door hinges intact.
            lo,hi=bounds(ob);remap(ob,2,[lo[2],hi[2]],[lo[2]+op['deltaM'],hi[2]+op['deltaM']])
        elif method=='clip-bottom':
            lo,hi=bounds(ob);cut_box(ob,[lo[0]-1,lo[1]-1,lo[2]-1],[hi[0]+1,hi[1]+1,op['z']])
        elif method=='hollow-band':
            lo,hi=bounds(ob);axis=op['normal'];along=1-axis;t=op['thicknessM'];cl=list(lo);ch=list(hi)
            cl[axis]+=t;ch[axis]-=t;cl[along]+=t;ch[along]-=t;cl[2]-=.001;ch[2]+=.001
            if all(ch[k]>cl[k]for k in range(3)):cut_box(ob,cl,ch)
        else:raise ValueError(method)
        if op['kind'] in ('floor-body','basement-finish'):
            ob['structural_floor_datum']=True;floor_names.append(ob.name)
        if op['kind']in('ceiling-body','ceiling-finish'):ceiling_names.append(ob.name)
        if op['kind']in('floor-body','basement-finish','ceiling-body','ceiling-finish'):
            finish_uv_sources[ob.name]=ob.data.copy()
        records.append({'sourceObject':op['objectName'],'objectName':ob.name,'kind':op['kind'],'before':before,'after':bounds(ob)})
    # The column occupies a wall/guard junction, with a thin independent casing.
    col=cfg['columnEnclosure'];x,y=col['x'],col['y'];w=col['outsideM'];t=col['boardM'];z0,z1=col['bottomZ'],col['topZ']
    ymin,ymax=col['southY'],y+w/2;cy=(ymin+ymax)/2;depth=ymax-ymin
    for label,cx,cy,sx,sy in [('west',x-(w-t)/2,cy,t,depth),('east',x+(w-t)/2,cy,t,depth),('south',x,ymin+t/2,w-2*t,t),('north',x,ymax-t/2,w-2*t,t)]:
        ob=b.box('stair-side column '+label+' encasement',(cx,cy,(z0+z1)/2),(sx,sy,z1-z0),ivory);ob['structural_finish_detail']=True;mark(ob)
    penetration=[x-w/2,ymin,col['penetrationBottomZ']],[x+w/2,ymax,col['penetrationTopZ']]
    for name in floor_names+ceiling_names:
        ob=scene.objects[name];lo,hi=bounds(ob)
        if lo[2]<col['penetrationTopZ'] and hi[2]>col['penetrationBottomZ']:cut_box(ob,*penetration)
    # At the first-floor wall, the boxed column replaces rather than intersects
    # the local plaster body. The narrow oak trim meets its right-hand face.
    ob=editable('Proposal | Principal suite north partition pier 0');cut_box(ob,[x-w/2,-8.761,z0-.01],[x+w/2,ymax,5.164])
    # The decorative strip begins at first-floor FFL, so it cannot clash with
    # the joist below or be mistaken for another structural stud-wall segment.
    ob=b.box('stair-side column first-floor front closing strip',
             (x,(-8.76+ymin)/2,(2.8+z1)/2),(w,ymin+8.76,z1-2.8),ivory)
    ob['structural_finish_detail']=True;mark(ob)
    # Basement return is a visible extension of the wall; its structural core
    # is independently shown in the member register and excluded from this cost.
    r=cfg['basementReturn'];ob=b.box('basement entrance-pier return',tuple((r['lo'][k]+r['hi'][k])/2 for k in range(3)),tuple(r['hi'][k]-r['lo'][k]for k in range(3)),ivory);ob['structural_finish_detail']=True;mark(ob)
    for name in floor_names+ceiling_names:
        ob=scene.objects[name];lo,hi=bounds(ob)
        if lo[2]<5.35 and hi[2]>-3:
            cut_box(ob,[5.16,-5.4025,-3.001],[5.5,-4.95,5.35])
    # Collision/navigation changes retain every floor level and stair route.
    def groups(key):
        result=[nav.setdefault(key,[])];extra=ns.get('new_'+key)
        if extra is not None and all(extra is not r for r in result):result.append(extra)
        return result
    for values in groups('obstacles'):
        values.append({'name':PREFIX+'stair-side column encasement','box':[x-w/2,ymin,x+w/2,ymax],'bottom':z0,'top':z1})
        values.append({'name':PREFIX+'basement entrance-pier return','box':[5.16,-5.4025,5.5,-4.95],'bottom':-2.8,'top':0})
        for o in values:
            if o.get('name')=='Proposal | Entrance bay north return' and 'box'in o:o['box'][2]=5.5
    for values in groups('segments'):
        for s in values:
            if s.get('name')=='Proposal | Entrance bay north return':
                for end in ('a','b'):
                    if abs(s[end][0]-5.16)<.01:s[end][0]=5.5
    for d in nav.get('interactiveDoors',[]):
        if d.get('id') in ('Principal suite entrance','Principal wardrobe door','Principal bathroom door'):d['apertureHeight']=2.1
    for change in cfg['lightSources']:
        for light in nav.get('proposalLights',[]):
            if light['name']==change['name']:light['position']=change['newPosition']
    ground=cfg.get('groundDeckStrategy')
    if ground:
        # Architectural wall bodies represent the complete wall assembly;
        # finishes stop at its faces and never continue beneath a bearing wall.
        wall_boxes=[([5.16,-10.0275,-3.001],[9.45,-9.7825,-.325]),
                    ([8.975,-15.35,-3.001],[9.22,-10.85,-.325])]
        for ob in list(scene.objects):
            if ob.type!='MESH' or 'floor'not in ob.name.lower():continue
            lo,hi=bounds(ob)
            if not(-2.83<=hi[2]<=-2.77):continue
            for cl,ch in wall_boxes:
                if all(min(hi[k],ch[k])-max(lo[k],cl[k])>1e-6 for k in range(3)):
                    ob=editable(ob.name);cut_box(ob,cl,ch)
        ob=editable('Proposal | Cinema north wall')
        cut_box(ob,[9.1034,-10.015,-.4174],[9.2966,-9.7725,.001])
        for values in groups('segments'):
            for seg in values:
                name=seg.get('name','')
                if name=='Proposal | Cinema north wall':
                    seg.update(a=[5.16,-9.905],b=[9.45,-9.905],thickness=.245,top=-.325)
                elif name in ground['sourceWallNames']:
                    for end in ('a','b'):seg[end][0]=9.0975
                    seg.update(thickness=.245,top=-.325)
                elif name=='Proposal | Cinema south wall':
                    seg['b'][0]=8.975;seg['top']=-.35
        for values in groups('obstacles'):
            for ob in values:
                name=ob.get('name','')
                if name=='Cinema 01 | east lining':ob['box'][0]-=.125;ob['box'][2]-=.125
                elif name=='Cinema 01 | screen wall lining':ob['box'][2]-=.125
        for room in nav.get('planRooms',[]):
            if room.get('name')=='Basement cinema':
                for p in room.get('polygon_m',[]):p[0]=min(p[0],8.975)
        # The garage-side floor is only its finish over screed/concrete;
        # the suspended timber deck remains solely over the northern floor.
        slab=ground['geometry']['slabClearPolygon'];xmin=min(p[0]for p in slab);xmax=max(p[0]for p in slab)
        ymin=min(p[1]for p in slab);ymax=max(p[1]for p in slab)
        for name in floor_names:
            ob=scene.objects[name];lo,hi=bounds(ob)
            if abs(hi[2])<.005:cut_box(ob,[xmin,ymin,-.045],[xmax,ymax,-.022])
    stair=cfg.get('basementStairOpening')
    if stair:
        old,new=stair['old'],stair['new'];dx=new[2]-old[2]
        cutlo=[old[2]-.001,new[1],-.6];cuthi=[new[2],new[3],.1]
        for ob in list(scene.objects):
            if ob.type!='MESH' or not any(k in ob.name.lower() for k in ('floor','ceiling')):continue
            lo,hi=bounds(ob)
            if lo[2]<-.6 or hi[2]>.1 or any(min(hi[k],cuthi[k])-max(lo[k],cutlo[k])<-1e-6 for k in range(3)):continue
            ob=editable(ob.name);cut_box(ob,cutlo,cuthi)
        for ob in list(scene.objects):
            if not ob.name.startswith('Proposal | Basement stair ') or ob.type!='MESH':continue
            lo,hi=bounds(ob)
            if 'east ground guard' in ob.name:
                ob=editable(ob.name);remap(ob,0,[lo[0],hi[0]],[lo[0]+dx,hi[0]+dx])
            elif 'north ground guard' in ob.name:
                if 'newel.001' in ob.name:
                    ob=editable(ob.name);remap(ob,0,[lo[0],hi[0]],[lo[0]+dx,hi[0]+dx])
                elif 'rail'in ob.name:
                    ob=editable(ob.name);remap(ob,0,[lo[0],hi[0]],[lo[0],hi[0]+dx])
            elif ob.name=='Proposal | Basement stair landing diffuser':
                ob=editable(ob.name);remap(ob,0,[lo[0],hi[0]],[lo[0]+.6,hi[0]+.6])
        # Additional spindles retain the existing 133 mm module and 32 mm body.
        for i in range(4):
            ob=b.box('basement extended guard spindle '+str(i+1),(8.652+i*.133,-8.795,.55),(.032,.032,.98),oak);ob['structural_finish_detail']=True;mark(ob)
        fascia_bottom=float(cfg['ceilingFacesByLevel']['-1']);fascia_top=-.044
        for y in (new[1]+.01,new[3]-.01):
            ob=b.box('basement stair opening side fascia',((new[0]+new[2])/2,y,(fascia_bottom+fascia_top)/2),(new[2]-new[0],.02,fascia_top-fascia_bottom),ivory);ob['structural_finish_detail']=True;mark(ob)
        ob=b.box('basement stair opening end fascia',(new[2]-.01,(new[1]+new[3])/2,(fascia_bottom+fascia_top)/2),(.02,new[3]-new[1],fascia_top-fascia_bottom),ivory);ob['structural_finish_detail']=True;mark(ob)
        for values in groups('surfaces'):
            rebuilt=[]
            for surface in values:
                if abs(surface.get('z',99))>.05:rebuilt.append(surface);continue
                polygon=[[*p,surface['z']]for p in surface['polygon']]
                for piece in subtract_box(polygon,cutlo+cuthi):
                    if len(piece)>2:rebuilt.append({**surface,'polygon':[p[:2]for p in piece]})
            values[:]=rebuilt
        for values in groups('obstacles'):
            for ob in values:
                name=ob.get('name','')
                if 'Basement stair east ground guard'in name and 'box'in ob:ob['box'][0]+=dx;ob['box'][2]+=dx
                elif 'Basement stair north ground guard'in name and 'box'in ob:ob['box'][2]+=dx
        nav['proposalBasement']['stairVoid']=new
        nav['proposalBasement']['stair']['void_m']=new
        nav['proposalBasement']['stair']['headroom_under_slab_over_lower_treads_m']=None
        nav['proposalBasement']['stair']['structuralFinishCoordination']=stair['basis']
        for light in nav.get('proposalLights',[]):
            if 'Basement stair landing'in light['name']:light['position'][0]+=.6
    for body in cfg.get('closedFinishMeshes',[]):
        ob=editable(body['sourceObject']);replace_closed_finish(ob,body)
    for record in records:
        record['after']=bounds(scene.objects[record['objectName']])
    created=[o.name for o in b.objects];changed_names=[o.name for o in changed]
    report={'revision':REVISION,'changed':changed_names,'created':created,'removed':removed,'operations':records,'floorFFLPreserved':True,
            'columnEnclosure':col,'basementStairOpening':stair,'limits':cfg['limits'],'published':False}
    report=json.loads(json.dumps(report))
    nav['structuralFinishCoordination']=report;scene['structural_finish_revision']=REVISION;scene['structural_finish_report']=json.dumps(report)
    bpy.context.view_layer.update();return changed,report

if 'scene'in globals()and 'nav'in globals()and globals().get('VARIANT')=='compact':
    apply_structural_finishes(globals())
