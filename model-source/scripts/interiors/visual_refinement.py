"""Deterministic upholstery and finish refinements; positions and layouts stay authored.

Used by the optional visual-quality export, on copies of the completed models.
The returned objects replace their namesakes in the browser, without rebuilding
the accepted furniture or changing navigation/collision volumes.
"""
import math
import re


def refine_scene(scene):
    import bpy
    import numpy as np
    from mathutils import Vector
    changed = []
    report = []
    for ob in list(scene.objects):
        if ob.type != 'MESH' or ob.get('visual_refinement_version') == 1:
            continue
        name = ob.name.lower()
        mats = ' '.join(m.name.lower() for m in ob.data.materials if m)
        textile = any(t in mats for t in ('linen', 'upholstery', 'bedding', 'fabric', 'cotton'))
        pillow = textile and bool(re.search(r'pillow|(?:seat|back|scatter|lumbar|linen|ivory|small).*cushion', name))
        pillow = pillow and not any(t in name for t in ('welt', 'piping', 'stitched', 'seam', 'box', 'stored'))
        duvet = textile and 'duvet' in name and 'edge' not in name and len(ob.data.vertices) < 100
        car = 'compact car' in name and ('sculpted body' in name or 'roof and pillars' in name)
        stone = name.startswith('garden limestone | course')
        arm = textile and 'sofa' in name and 'arm' in name and len(ob.data.vertices) < 100
        if not (pillow or duvet or car or arm or stone):
            continue
        # Each refinement owns its mesh; original scenes may share source data.
        materials = list(ob.data.materials)
        coords = np.array([v.co[:] for v in ob.data.vertices], dtype=float)
        center = coords.mean(axis=0)
        if pillow and len(coords) < 300:
            # Recover the original furniture axes, including rotated cushions.
            _, axes = np.linalg.eigh(np.cov((coords-center).T))
            axes = axes[:, ::-1]
            if np.linalg.det(axes) < 0: axes[:, 2] *= -1
            local = (coords-center) @ axes
            lo, hi = local.min(axis=0), local.max(axis=0)
            origin = center + axes @ ((lo+hi)/2)
            half = (hi-lo)/2
            rings, segments = 20, 48
            verts = []
            def signed_power(v, e): return math.copysign(abs(v)**e, v)
            seed = sum(map(ord, ob.name))*.013
            for j in range(rings+1):
                latitude = -math.pi/2 + math.pi*j/rings
                for i in range(segments):
                    longitude = 2*math.pi*i/segments
                    u = signed_power(math.cos(latitude), .42)*signed_power(math.cos(longitude), .32)
                    v = signed_power(math.cos(latitude), .42)*signed_power(math.sin(longitude), .32)
                    w = signed_power(math.sin(latitude), .52)
                    # Restrained tension wrinkles near the stitched edge.
                    edge = (abs(u)**8+abs(v)**8)/2
                    wrinkle = .018*math.sin(28*u+5*v+seed)*edge*math.sin(latitude)
                    p = origin + axes @ (half*np.array([u, v, w+wrinkle]))
                    verts.append(p.tolist())
            faces = [(j*segments+i,j*segments+(i+1)%segments,(j+1)*segments+(i+1)%segments,(j+1)*segments+i)
                     for j in range(rings) for i in range(segments)]
            mesh = bpy.data.meshes.new(ob.name+' tailored mesh');mesh.from_pydata(verts, [], faces);mesh.update()
            ob.data = mesh;ob.modifiers.clear()
            for m in materials: mesh.materials.append(m)
            for face in mesh.polygons: face.use_smooth = True
            uv = mesh.uv_layers.new(name='UVMap')
            for face in mesh.polygons:
                for loop in face.loop_indices:
                    p = (np.array(mesh.vertices[mesh.loops[loop].vertex_index].co[:])-origin) @ axes
                    uv.data[loop].uv = (p[0]/.32, p[1]/.32)
            kind = 'tailored cushion'
        elif duvet:
            lo, hi = coords.min(axis=0), coords.max(axis=0)
            sx, sy = hi[0]-lo[0], hi[1]-lo[1]
            nx, ny = 48, 52
            verts = []
            for j in range(ny+1):
                v = j/ny; y = lo[1]+sy*v
                for i in range(nx+1):
                    u = i/nx; x = lo[0]+sx*u
                    envelope = math.sin(math.pi*u)**.6*math.sin(math.pi*v)**.6
                    folds = .013*math.sin(13*u+3*v)+.008*math.sin(29*u-9*v)+.005*math.sin(47*u+11*v)
                    edge_drop = .045*(abs(2*u-1)**16+.55*abs(2*v-1)**16)
                    z = hi[2]-.018 + folds*envelope-edge_drop
                    verts.append((x,y,z))
            faces = [(j*(nx+1)+i,j*(nx+1)+i+1,(j+1)*(nx+1)+i+1,(j+1)*(nx+1)+i)
                     for j in range(ny) for i in range(nx)]
            mesh = bpy.data.meshes.new(ob.name+' draped mesh');mesh.from_pydata(verts, [], faces);mesh.update()
            ob.data=mesh;ob.modifiers.clear()
            for m in materials:mesh.materials.append(m)
            for f in mesh.polygons:f.use_smooth=True
            uv=mesh.uv_layers.new(name='UVMap')
            for loop in mesh.loops:
                p=mesh.vertices[loop.vertex_index].co;uv.data[loop.index].uv=(p.x/.32,p.y/.32)
            solid=ob.modifiers.new('Quilted cloth thickness','SOLIDIFY');solid.thickness=.009
            kind='draped duvet'
        elif stone:
            ob.data=ob.data.copy()
            for face in ob.data.polygons:face.use_smooth=True
            kind='continuous limestone normals'
        elif car or arm:
            ob.data=ob.data.copy()
            bevel=next((m for m in ob.modifiers if m.type=='BEVEL'),None)
            if not bevel:bevel=ob.modifiers.new('Manufactured eased edges','BEVEL')
            bevel.width=.018 if car else .045;bevel.segments=5
            if car:bevel.limit_method='ANGLE';bevel.angle_limit=.45
            for face in ob.data.polygons:face.use_smooth=True
            normal=next((m for m in ob.modifiers if m.type=='WEIGHTED_NORMAL'),None)
            if not normal:normal=ob.modifiers.new('Weighted surface normals','WEIGHTED_NORMAL')
            normal.keep_sharp=True;normal.weight=40
            kind='car body finish' if car else 'softened upholstery'
        else:
            continue
        ob['visual_refinement_version']=1
        changed.append(ob);report.append({'name':ob.name,'kind':kind,'vertices':len(ob.data.vertices)})
    return changed, report
