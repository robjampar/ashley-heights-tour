"""Physical floorboard joints and textile edging on editable visual copies.

Original floor heights, boundaries, oak images and UV scale are retained.
Board seams are geometry, not a replacement wood texture or lighting atlas.
"""
import math


def signed_plan_area(poly):
    if len(poly)<3:return 0.0
    x,y=poly[0][:2]
    return sum((a[0]-x)*(b[1]-y)-(b[0]-x)*(a[1]-y)
               for a,b in zip(poly,poly[1:]+poly[:1]))/2


def clip_polygon(poly, axis, edge, keep_greater):
    """Clip a convex 3D polygon against one vertical half-plane."""
    result = []
    for a, b in zip(poly, poly[1:] + poly[:1]):
        da, db = a[axis]-edge, b[axis]-edge
        ina, inb = (da >= -1e-9, db >= -1e-9) if keep_greater else (da <= 1e-9, db <= 1e-9)
        if ina:
            result.append(a)
        if ina != inb:
            t = da/(da-db)
            result.append(tuple(a[i]+t*(b[i]-a[i]) for i in range(3)))
    return result


def clipped(poly, bounds):
    for axis, edge, greater in ((0,bounds[0],True),(0,bounds[2],False),(1,bounds[1],True),(1,bounds[3],False)):
        if not poly:
            break
        poly = clip_polygon(poly, axis, edge, greater)
    # A triangle touching a board only along a line/point can retain three
    # repeated vertices after clipping. It has no floor area: using its zero
    # half-planes to clip bevels would incorrectly admit an entire board.
    return poly if abs(signed_plan_area(poly))>1e-10 else []


def refine_joinery_textiles(scene, upholstery_report):
    import bpy
    import numpy as np
    from mathutils import Matrix, Vector
    changed, report, additions = [], [], []
    collection = bpy.data.collections.new('Visual joinery and textile details')
    scene.collection.children.link(collection)

    def plain_material(name, color):
        mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
        mat.diffuse_color = (*color, 1)
        mat.use_nodes = True
        bsdf = mat.node_tree.nodes.get('Principled BSDF')
        bsdf.inputs['Base Color'].default_value = (*color, 1)
        bsdf.inputs['Roughness'].default_value = .88
        return mat

    seam = plain_material('Detail | recessed oak board joint', (.15,.12,.085))
    thread = plain_material('Detail | natural linen piping', (.52,.49,.43))

    def curve(source, label, points, radius, material):
        data = bpy.data.curves.new(label, 'CURVE')
        data.dimensions = '3D'
        data.resolution_u = 1
        data.bevel_depth = radius
        data.bevel_resolution = 2
        spline = data.splines.new('POLY')
        spline.points.add(len(points)-1)
        for point, value in zip(spline.points, points):
            point.co = (*value, 1)
        spline.use_cyclic_u = True
        ob = bpy.data.objects.new('Textile detail | '+source.name+' | '+label, data)
        ob['detail_source'] = source.name
        data.materials.append(material)
        collection.objects.link(ob)
        changed.append(ob);additions.append(ob.name)
        report.append({'name':ob.name,'kind':label,'source':source.name,'radiusMetres':radius})

    for ob in list(scene.objects):
        if ob.type != 'MESH' or 'floor' not in ob.name.lower() or not ob.data.materials:
            continue
        material = ob.data.materials[0]
        if not material or not any(w in material.name.lower() for w in ('natural oak','pale oak')):
            continue
        vertices = np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices])
        lo, hi = vertices.min(axis=0), vertices.max(axis=0)
        if hi[2]-lo[2] > .0001 or min(hi[:2]-lo[:2]) < .1 or not ob.data.uv_layers.active:
            continue
        # Recover the authored planar UV mapping, and reject non-planar maps.
        original_uv = ob.data.uv_layers.active.data
        points = np.array([vertices[loop.vertex_index] for loop in ob.data.loops])
        uv = np.array([tuple(x.uv) for x in original_uv])
        design = np.column_stack((points[:,:2],np.ones(len(points))))
        mapping = np.linalg.lstsq(design,uv,rcond=None)[0]
        assert np.max(np.abs(design @ mapping-uv)) < .001, ob.name
        ob.data.calc_loop_triangles()
        triangles = [[tuple(vertices[i]) for i in tri.vertices] for tri in ob.data.loop_triangles]
        triangles = [tri for tri in triangles if abs(signed_plan_area(tri))>1e-10]
        for tri in triangles:
            if sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(tri,tri[1:]+tri[:1]))<0:tri.reverse()
        out_vertices, faces, face_materials = [], [], []
        def face(poly, material_index):
            if len(poly)<3:
                return
            area = sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(poly,poly[1:]+poly[:1]))/2
            if abs(area)<1e-10:
                return
            if area<0:
                poly=list(reversed(poly))
            start=len(out_vertices);out_vertices.extend(poly)
            faces.append(tuple(range(start,start+len(poly))));face_materials.append(material_index)
        # A shallow dark substrate stops gaps from exposing a slab underneath.
        for tri in triangles:
            face([(x,y,z-.0012) for x,y,z in tri],1)
        width, length, joint, bevel = .18, 1.8, .0009, .0006
        board_count = 0
        for col in range(math.floor(lo[0]/width),math.ceil(hi[0]/width)):
            x0,x1=col*width+joint/2,(col+1)*width-joint/2
            stagger = (0,.64,1.19,.31,.96)[col%5]
            for row in range(math.floor((lo[1]-stagger)/length),math.ceil((hi[1]-stagger)/length)):
                y0,y1=row*length+stagger+joint/2,(row+1)*length+stagger-joint/2
                # Inner face plus a 0.6 mm bevel around the actual board edge.
                z=float(lo[2]);a,b,c,d=x0+bevel,y0+bevel,x1-bevel,y1-bevel
                pieces=[([(a,b,z),(c,b,z),(c,d,z),(a,d,z)],0),
                    ([(x0,y0,z-.00045),(x1,y0,z-.00045),(c,b,z),(a,b,z)],0),
                    ([(x1,y0,z-.00045),(x1,y1,z-.00045),(c,d,z),(c,b,z)],0),
                    ([(x1,y1,z-.00045),(x0,y1,z-.00045),(a,d,z),(c,d,z)],0),
                    ([(x0,y1,z-.00045),(x0,y0,z-.00045),(a,b,z),(a,d,z)],0)]
                # Clip each floor triangle to the board first. Top polygons
                # then clip to each convex bevel piece without diagonal seams.
                count_before=len(faces)
                for tri in triangles:
                    part=clipped(tri,[x0,y0,x1,y1])
                    if len(part)<3:
                        continue
                    for piece, mat_index in pieces:
                        polygon=piece
                        for start,end in zip(part,part[1:]+part[:1]):
                            result=[]
                            for u,v in zip(polygon,polygon[1:]+polygon[:1]):
                                du=(end[0]-start[0])*(u[1]-start[1])-(end[1]-start[1])*(u[0]-start[0])
                                dv=(end[0]-start[0])*(v[1]-start[1])-(end[1]-start[1])*(v[0]-start[0])
                                if du>=-1e-10:result.append(u)
                                if (du>=0)!=(dv>=0):
                                    t=du/(du-dv);result.append(tuple(u[k]+t*(v[k]-u[k]) for k in range(3)))
                            polygon=result
                            if not polygon:break
                        face(polygon,mat_index)
                board_count += len(faces)>count_before
        mesh=bpy.data.meshes.new(ob.name+' jointed floorboards')
        assert board_count>0, 'No boards generated: '+ob.name
        def area(poly):
            return abs(sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(poly,poly[1:]+poly[:1]))/2)
        source_area=sum(area(tri) for tri in triangles)
        board_area=sum(area([out_vertices[i] for i in f]) for f,m in zip(faces,face_materials) if m==0)
        assert .97<board_area/source_area<1.00001,(ob.name,source_area,board_area)
        mesh.from_pydata(out_vertices,[],faces);mesh.update()
        mesh.materials.append(material);mesh.materials.append(seam)
        layer=mesh.uv_layers.new(name='UVMap')
        for poly,index in zip(mesh.polygons,face_materials):poly.material_index=index
        for loop in mesh.loops:
            p=mesh.vertices[loop.vertex_index].co
            layer.data[loop.index].uv=np.array([p.x,p.y,1]) @ mapping
        ob.data=mesh;ob.matrix_world=Matrix.Identity(4);ob.modifiers.clear()
        changed.append(ob)
        report.append({'name':ob.name,'kind':'jointed oak boards','boards':board_count,'boardWidth':width,
                       'jointMetres':joint,'sourceArea':source_area,'boardArea':board_area,
                       'originalTextureAndUVScalePreserved':True})

    # Use the tailored cushion's own local axes so a rotated sofa cushion
    # receives a sewn edge in its plane, not a horizontal ring in space.
    for item in upholstery_report:
        if item.get('kind') != 'tailored cushion':continue
        ob=bpy.data.objects.get(item['name'])
        coords=np.array([v.co[:] for v in ob.data.vertices]);center=coords.mean(axis=0)
        _,axes=np.linalg.eigh(np.cov((coords-center).T));axes=axes[:,::-1]
        local=(coords-center)@axes;lo,hi=local.min(axis=0),local.max(axis=0)
        half=(hi-lo)/2;origin=center+axes@((hi+lo)/2)
        points=[]
        for i in range(128):
            angle=math.tau*i/128
            u=math.copysign(abs(math.cos(angle))**.32,math.cos(angle))
            v=math.copysign(abs(math.sin(angle))**.32,math.sin(angle))
            points.append(tuple(ob.matrix_world@Vector(origin+axes@np.array([half[0]*u,half[1]*v,0]))))
        curve(ob,'stitched cushion piping',points,.0014,thread)
    return changed,report,{'addedObjects':additions,'floorObjects':[x['name'] for x in report if x['kind']=='jointed oak boards']}
