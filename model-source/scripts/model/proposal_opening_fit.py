"""Coordinate opening assemblies with the deeper floor zones, Compact only."""
import json

REVISION='structural-opening-fit-2026-10-27'
PREFIX='Opening fit | '


def apply_opening_fit(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    from scripts.model.proposal_level_loft import subtract_box
    scene,nav,root=ns['scene'],ns['nav'],ns['ROOT']
    if scene.get('opening_fit_revision')==REVISION:return [],json.loads(scene['opening_fit_report'])
    cfg=json.loads((root/'proposal/specs/structural-opening-fit.json').read_text())
    b=RoomBuilder(ns,'opening fit',PREFIX,'P47 Coordinated opening heads')
    owners={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    originals={c for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name for c in s.collection.children_recursive}
    changed=[];removed=[];clones={};records=[]
    def bounds(ob):
        v=[ob.matrix_world@p.co for p in ob.data.vertices]
        return [[min(p[i]for p in v)for i in range(3)],[max(p[i]for p in v)for i in range(3)]]
    def editable(name):
        if name in clones:return clones[name]
        ob=scene.objects.get(name)
        if ob is None:raise ValueError('Missing opening coordination target: '+name)
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            copy=ob.copy();copy.data=ob.data.copy();copy.name=PREFIX+name;copy['source_name']=ob.get('source_name',ob.name)
            for c in tuple(ob.users_collection):
                if c in owners:
                    if c in originals:raise ValueError('Shared collection cannot be edited: '+c.name)
                    c.objects.unlink(ob);c.objects.link(copy)
            removed.append(name);clones[name]=copy;ob=copy
        if ob in changed:return ob
        if ob.modifiers:
            bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get()
            mesh=bpy.data.meshes.new_from_object(ob.evaluated_get(deps),preserve_all_data_layers=True,depsgraph=deps)
        else:mesh=ob.data.copy()
        ob.modifiers.clear();ob.data=mesh;changed.append(ob);return ob
    def cut_box(ob,lo,hi):
        a,c=bounds(ob)
        if any(min(c[k],hi[k])-max(a[k],lo[k])<-1e-6 for k in range(3)):return
        if c[2]-a[2]<1e-6:
            old=ob.data;old.calc_loop_triangles();layers=list(old.uv_layers);polygons=[]
            for tri in old.loop_triangles:
                points=[list(ob.matrix_world@old.vertices[old.loops[i].vertex_index].co)+[v for uv in layers for v in uv.data[i].uv]for i in tri.loops]
                for part in subtract_box(points,lo+hi):
                    if len(part)>2:polygons.append((part,tri.material_index))
            inv=ob.matrix_world.inverted();vertices=[];faces=[]
            for points,_ in polygons:
                start=len(vertices);vertices.extend(inv@Vector(p[:3])for p in points);faces.append(tuple(range(start,len(vertices))))
            mesh=bpy.data.meshes.new(ob.name+' coordinated sheet edge');mesh.from_pydata(vertices,[],faces)
            for material in old.materials:mesh.materials.append(material)
            for layer in layers:mesh.uv_layers.new(name=layer.name)
            for face,(points,mi)in zip(mesh.polygons,polygons):
                face.material_index=mi
                for j,li in enumerate(face.loop_indices):
                    for k,uv in enumerate(mesh.uv_layers):uv.data[li].uv=points[j][3+2*k:5+2*k]
            mesh.update();ob.data=mesh;return
        cutter=b.box('temporary opening fit cutter',tuple((lo[i]+hi[i])/2 for i in range(3)),tuple(hi[i]-lo[i]for i in range(3)),ob.data.materials[0])
        with BooleanWorkspace([cutter])as work:work.difference(ob,[cutter],'Opening / floor edge coordination')
        b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
    def rebuild_mapped_mesh(ob,replacement):
        # Map authored materials and per-corner UVs onto an approved closed
        # replacement without duplicating coincident native vertices.
        from mathutils.bvhtree import BVHTree
        from mathutils.geometry import barycentric_transform
        old=ob.data;old.calc_loop_triangles();world=[ob.matrix_world@v.co for v in old.vertices]
        groups={};normal_matrix=ob.matrix_world.to_3x3().inverted().transposed()
        def normal_key(n):
            axis=max(range(3),key=lambda k:abs(n[k]));return axis,1 if n[axis]>=0 else -1
        for t in old.loop_triangles:groups.setdefault(normal_key(normal_matrix@t.normal),[]).append(t)
        trees={k:BVHTree.FromPolygons(world,[t.vertices for t in ts],all_triangles=True)for k,ts in groups.items()}
        all_triangles=list(old.loop_triangles);fallback=BVHTree.FromPolygons(world,[t.vertices for t in all_triangles],all_triangles=True)
        inv=ob.matrix_world.inverted();mesh=bpy.data.meshes.new(ob.name+' coordinated closed body')
        vertices=[];faces=[];indices={}
        for face in replacement['faces']:
            mapped=[]
            for index in face:
                point=replacement['vertices'][index];key=tuple(point)
                if key not in indices:indices[key]=len(vertices);vertices.append(inv@Vector(point))
                mapped.append(indices[key])
            faces.append(mapped)
        mesh.from_pydata(vertices,[],faces);mesh.update()
        for material in old.materials:mesh.materials.append(material)
        for uv in old.uv_layers:mesh.uv_layers.new(name=uv.name)
        for face in mesh.polygons:
            key=normal_key(normal_matrix@face.normal);tree=trees.get(key,fallback);ts=groups.get(key,all_triangles)
            _,_,ti,_=tree.find_nearest(ob.matrix_world@face.center)
            if ti is None:raise ValueError('Complete deck material mapping failed')
            t=ts[ti];face.material_index=t.material_index
            for li in face.loop_indices:
                point=ob.matrix_world@mesh.vertices[mesh.loops[li].vertex_index].co
                for ui,uv in enumerate(old.uv_layers):
                    source_uv=[Vector((*uv.data[i].uv,0))for i in t.loops]
                    mapped=barycentric_transform(point,*[world[i]for i in t.vertices],*source_uv)
                    mesh.uv_layers[ui].data[li].uv=mapped.xy
        ob.data=mesh
    for op in cfg['operations']:
        ob=editable(op['objectName']);before=bounds(ob);old=op['oldBounds'];new=op['newBounds']
        if max(abs(before[k][i]-old[k][i])for k in range(2)for i in range(3))>.002:
            raise ValueError('Opening source bounds changed; review required: '+op['objectName'])
        inv=ob.matrix_world.inverted()
        for vertex in ob.data.vertices:
            p=ob.matrix_world@vertex.co
            for i in range(3):
                d=old[1][i]-old[0][i]
                if abs(d)>1e-9:p[i]=new[0][i]+(p[i]-old[0][i])*(new[1][i]-new[0][i])/d
            vertex.co=inv@p
        ob.data.update();ob['opening_fit_kind']=op['kind']
        records.append({'sourceObject':op['objectName'],'objectName':ob.name,'kind':op['kind'],'before':before,'after':bounds(ob)})
    floor_records=[]
    for r in cfg.get('floorCuts',[]):
        ob=editable(r['objectName']);before=bounds(ob)
        if r.get('physicalReplacement'):rebuild_mapped_mesh(ob,r['physicalReplacement'])
        else:
            for lo,hi in r['boxes']:cut_box(ob,lo,hi)
        if r.get('framingReference'):ob['structural_framing_reference_json']=json.dumps(r['framingReference'])
        floor_records.append({**r,'before':before,'after':bounds(ob)})
    reveal_records=[]
    for r in cfg.get('revealPockets',[]):
        ob=editable(r['objectName']);before=bounds(ob);cut_box(ob,r['low'],r['high'])
        reveal_records.append({**r,'before':before,'after':bounds(ob)})
    closed_replacements={r['objectName']:r for r in cfg.get('closedBodyReplacements',[])}
    for name,replacement in closed_replacements.items():rebuild_mapped_mesh(editable(name),replacement)
    pocket_records=[]
    for p in cfg.get('retainedBearingPockets',[]):
        from mathutils.bvhtree import BVHTree
        from mathutils.geometry import barycentric_transform
        ob=editable(p['sourceObject']);before=bounds(ob);source_mesh=ob.data.copy();source_mesh.calc_loop_triangles()
        source_tris=list(source_mesh.loop_triangles);source_world=[ob.matrix_world@v.co for v in source_mesh.vertices]
        tree=BVHTree.FromPolygons(source_world,[t.vertices for t in source_tris],all_triangles=True)
        lo,hi=p['low'],p['high'];mat=ob.data.materials[0]
        cut_boxes=p.get('cutBoxes',[[lo,hi]])
        if p['sourceObject']not in closed_replacements:
            for low,high in cut_boxes:cut_box(ob,low,high)
        proxy_names=[]
        for r in p['proxies']:
            verts=[];faces=[];indices={}
            for k in range(0,len(r['triangles']),3):
                face=[]
                for xyz in r['triangles'][k:k+3]:
                    key=tuple(xyz)
                    if key not in indices:indices[key]=len(verts);verts.append(xyz)
                    face.append(indices[key])
                faces.append(face)
            proxy=b.mesh(r['name'][len(PREFIX):],verts,faces,mat)
            for material in list(source_mesh.materials)[1:]:proxy.data.materials.append(material)
            for layer in list(proxy.data.uv_layers):proxy.data.uv_layers.remove(layer)
            for uv in source_mesh.uv_layers:proxy.data.uv_layers.new(name=uv.name)
            for face in proxy.data.polygons:
                _,_,ti,_=tree.find_nearest(face.center)
                if ti is None:raise ValueError('Retained bearing material mapping failed')
                src=source_tris[ti];face.material_index=src.material_index
                for li in face.loop_indices:
                    point=proxy.data.vertices[proxy.data.loops[li].vertex_index].co
                    for ui,uv in enumerate(source_mesh.uv_layers):
                        source_uv=[Vector((*uv.data[i].uv,0))for i in src.loops]
                        mapped=barycentric_transform(point,*[source_world[i]for i in src.vertices],*source_uv)
                        proxy.data.uv_layers[ui].data[li].uv=mapped.xy
            proxy['structural_finish_detail']=True;proxy['structural_proxy_id']=r['id'];changed.append(proxy);proxy_names.append(proxy.name)
        pocket_records.append({'sourceObject':p['sourceObject'],'objectName':ob.name,'beamId':p['beamId'],'before':before,'after':bounds(ob),'low':lo,'high':hi,'cutBoxes':cut_boxes,'proxyNames':proxy_names,'basis':p['basis']})
    for material_spec in cfg.get('newMaterials',[]):
        mat=bpy.data.materials.get(material_spec['name'])or bpy.data.materials.new(material_spec['name'])
        mat.use_nodes=True;mat.diffuse_color=material_spec['colour'];shader=mat.node_tree.nodes.get('Principled BSDF')
        shader.inputs['Base Color'].default_value=material_spec['colour'];shader.inputs['Roughness'].default_value=material_spec['roughness'];shader.inputs['Metallic'].default_value=material_spec['metallic']
    for r in cfg['boxes']:
        lo,hi=r['bounds'];mat=bpy.data.materials.get(r['material'])
        if mat is None:raise ValueError('Opening finish material missing: '+r['material'])
        ob=b.box(r['objectName'][len(PREFIX):],tuple((lo[i]+hi[i])/2 for i in range(3)),tuple(hi[i]-lo[i]for i in range(3)),mat)
        ob['structural_finish_detail']=True;ob['opening_fit_kind']=r['kind'];changed.append(ob)
    # Preserve floor surfaces, walking routes, door hinges and hardware.
    # Named static envelopes follow their changed visible bodies where present.
    by_name={o.name:o for o in changed}
    for values in (nav.get('obstacles',[]),ns.get('new_obstacles',[])):
        for obstacle in values:
            if obstacle.get('name')not in by_name:continue
            lo,hi=bounds(by_name[obstacle['name']]);obstacle.update(box=[lo[0],lo[1],hi[0],hi[1]],bottom=lo[2],top=hi[2])
    if removed:
        for door in nav.get('interactiveDoors',[]):door['members']=[clones[n].name if n in clones else n for n in door['members']]
    # Only the approved outboard strip and closed corner pier footprint leave
    # the walking surfaces. Every other surface and level stays as authored.
    def poly_key(poly):return sorted(tuple(round(float(v),5)for v in p)for p in poly)
    for surfaces in (nav.get('surfaces',[]),ns.get('new_surfaces',[])):
        updated=[]
        for s in surfaces:
            rule=next((r for r in cfg.get('navigationCuts',[])if r['name']==s.get('name')and abs(r['z']-s['z'])<1e-5 and poly_key(r['oldPolygon'])==poly_key(s['polygon'])),None)
            if rule:updated.extend({**s,'polygon':p}for p in rule['newPolygons'])
            else:updated.append(s)
        surfaces[:]=updated
    report={'revision':REVISION,'changed':[o.name for o in changed],'created':[o.name for o in b.objects],
            'removed':removed,'operations':records,'details':cfg['boxes'],'limits':cfg['limits'],
            'retainedBearingPockets':pocket_records,'floorEdgeCuts':floor_records,'revealPockets':reveal_records,'closedBodyReplacements':list(closed_replacements),
            'navigationCuts':cfg.get('navigationCuts',[]),'floorDatumsPreserved':True,'doorHingesPreserved':True,'published':False,'approvedForConstruction':False}
    nav['structuralOpeningFit']=report;scene['opening_fit_revision']=REVISION;scene['opening_fit_report']=json.dumps(report)
    bpy.context.view_layer.update();return changed,report


if 'scene'in globals() and 'nav'in globals() and globals().get('VARIANT')=='compact':
    apply_opening_fit(globals())
