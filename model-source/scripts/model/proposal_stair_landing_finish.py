"""Close the reported first-floor joins without moving the approved stair routes."""
import json
REVISION='oak-spindle-stair-2026-10-21'
PREFIX='Proposal | Stair landing finish | '


def repair_stair_landing_floor(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    scene,nav=ns['scene'],ns['nav']
    if scene.get('stair_landing_floor_revision')==REVISION:
        return [],json.loads(scene['stair_landing_floor_report'])
    b=RoomBuilder(ns,'landing junction',PREFIX,'P37 Stair landing floor joins')
    oak=bpy.data.materials['Interior | Landings natural oak']
    changed=[];retired=[]
    def mark(ob):
        ob['stair_landing_floor_revision']=REVISION
        if ob not in changed:changed.append(ob)
    def owned(ob):
        assert not any(ob.name in s.objects for s in bpy.data.scenes if 'Proposed'not in s.name and 'Proposal ·'not in s.name),ob.name
    def split(poly,k,value,greater):
        result=[]
        for a,c in zip(poly,poly[1:]+poly[:1]):
            ai=a[k]>=value if greater else a[k]<=value;ci=c[k]>=value if greater else c[k]<=value
            if ai:result.append(a)
            if ai!=ci:
                t=(value-a[k])/(c[k]-a[k]);result.append([a[j]+t*(c[j]-a[j])for j in range(len(a))])
        return result
    def subtract(poly,rect):
        pieces=[];inside=poly
        for k,value,greater in[(0,rect[0],True),(0,rect[2],False),(1,rect[1],True),(1,rect[3],False)]:
            if not inside:break
            outside=split(inside,k,value,not greater)
            if len(outside)>2:pieces.append(outside)
            inside=split(inside,k,value,greater)
        return pieces
    # A real oak floor layer spans the original wall head. Remove only the
    # overlapping finish triangles, retaining their UV coordinates by linear
    # interpolation at the cut; no doubled finish or stretched oak texture.
    bridge=[5.80,-.115,8.89,.115]
    trimmed=[]
    stair_head=[7.3124141693,.115,7.9200000763,1.01]
    for ob in list(scene.objects):
        if ob.type!='MESH'or not ob.name.startswith('Landings 01 | continuous oak landing floor'):continue
        world=ob.matrix_world.copy();verts=[world@v.co for v in ob.data.vertices]
        if not verts or max(p.z for p in verts)<2.801 or min(p.z for p in verts)>2.803:continue
        cuts=[bridge]+([stair_head]if ob.name=='Landings 01 | continuous oak landing floor'else[])
        if all(min(p.x for p in verts)>=r[2]-1e-7 or max(p.x for p in verts)<=r[0]+1e-7 or min(p.y for p in verts)>=r[3]-1e-7 or max(p.y for p in verts)<=r[1]+1e-7 for r in cuts):continue
        owned(ob);old=ob.data;old.calc_loop_triangles();uv=old.uv_layers.active
        newverts=[];newfaces=[];newuv=[];mats=[]
        for tri in old.loop_triangles:
            poly=[list(verts[old.loops[i].vertex_index])+list(uv.data[i].uv)for i in tri.loops]
            pieces=[poly]
            for rect in cuts:pieces=[part for piece in pieces for part in subtract(piece,rect)]
            for piece in pieces:
                area=abs(sum(p[0]*q[1]-q[0]*p[1]for p,q in zip(piece,piece[1:]+piece[:1])))/2
                if area<1e-10:continue
                off=len(newverts);newverts.extend(p[:3]for p in piece);newuv.extend(p[3:]for p in piece)
                newfaces.append(tuple(range(off,off+len(piece))));mats.append(old.polygons[tri.polygon_index].material_index)
        if not newfaces:
            retired.append(ob.name);bpy.data.objects.remove(ob,do_unlink=True);continue
        mesh=bpy.data.meshes.new(ob.name+' finished seam');mesh.from_pydata([world.inverted()@Vector(p)for p in newverts],[],newfaces);mesh.update()
        for mat in old.materials:mesh.materials.append(mat)
        layer=mesh.uv_layers.new(name='UVMap')
        for face,matindex in zip(mesh.polygons,mats):
            face.material_index=matindex
            for idx in face.loop_indices:layer.data[idx].uv=newuv[mesh.loops[idx].vertex_index]
        ob.data=mesh;mark(ob);trimmed.append(ob.name)
    lintel=scene.objects['Proposal | Original ground junction lintel'];owned(lintel)
    lintel.data=lintel.data.copy();world=lintel.matrix_world.copy();inverse=world.inverted()
    for vertex in lintel.data.vertices:
        p=world@vertex.co;p.z=min(p.z,2.77);vertex.co=inverse@p
    lintel.data.update();mark(lintel)
    b.box_bounds('oak threshold over recessed original lintel',bridge,2.77,2.802,oak)

    # The 400 mm strip stops 659 mm before the wing slab at the courtyard
    # pier. Give that whole connection a closed substrate and matching finish.
    junction=[9.30,-4.23,9.70,-2.60]
    slab=scene.objects['Proposal | Entrance first floor continuation'];owned(slab)
    source_materials=list(slab.data.materials)
    cutter=b.box_bounds('temporary junction ownership cut',[junction[0],junction[1],junction[2]+.001,junction[3]],2.599,2.803,oak)
    with BooleanWorkspace([cutter])as work:work.difference(slab,[cutter],'Replace obsolete courtyard floor notch')
    b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True);mark(slab)
    support=b.box_bounds('courtyard junction closed floor slab',junction,2.60,2.80,source_materials[0])
    if len(source_materials)>1:
        support.data.materials.append(source_materials[1])
        for face in support.data.polygons:
            if face.normal.x>.9:face.material_index=1
    b.box_bounds('courtyard junction continuous oak finish',junction,2.80,2.802,oak)
    for poly,name in [(bridge,'original junction oak threshold'),(junction,'courtyard floor join')]:
        x0,y0,x1,y1=poly
        ns.get('new_surfaces',nav.setdefault('surfaces',[])).append({'name':PREFIX+name,'polygon':[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],'z':2.8})
    for ob in b.objects:ob['stair_landing_floor_revision']=REVISION
    report={'revision':REVISION,'finishedFloorZ':2.802,'lintelTopZ':2.77,'oakThresholdBounds':bridge,'courtyardJoinBounds':junction,'stairHeadFinishOwnership':stair_head,'changed':[o.name for o in changed],'retired':retired,'added':[o.name for o in b.objects],'trimmedFloorFinishes':trimmed,'layoutUnchanged':True}
    nav['stairLandingFloorFinish']=report;scene['stair_landing_floor_revision']=REVISION;scene['stair_landing_floor_report']=json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects,report


if 'scene'in globals()and 'nav'in globals()and globals().get('VARIANT')in('compact','planning'):
    repair_stair_landing_floor(globals())
