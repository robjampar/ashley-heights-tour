"""Separate coincident finish faces that render as black bay-ceiling/sill seams."""
import bpy,bmesh
from mathutils import Vector

def refine_surface_joins(g=None):
    data=(g or {}).get('g',g or {})
    walls=data.get('walls',data.get('wall_specs',[]))
    ceilings=[]; boards=[]
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        if ob.name.endswith(' | ceiling') and ob.users_collection[0].name=='15 Ceilings':
            inverse=ob.matrix_world.inverted(); changed=False
            for vertex in ob.data.vertices:
                point=ob.matrix_world@vertex.co
                # Main upper-floor perimeter band starts at the same 2.600 m
                # plane. A 2 mm plaster finish below it avoids duplicate faces.
                if abs(point.z-2.600)<.003:
                    point.z=2.598;vertex.co=inverse@point;changed=True
            if changed:ob.data.update();ceilings.append(ob.name)
        if 'window board' in ob.name and not ob.get('sill_finish_separated'):
            inverse=ob.matrix_world.inverted()
            for vertex in ob.data.vertices:
                point=ob.matrix_world@vertex.co;point.z+=.003;vertex.co=inverse@point
            ob.data.update();ob['sill_finish_separated']=True;boards.append(ob.name)
    # The five independent boards had both overlapping top faces and triangular
    # holes at angled joins. A single mitred strip follows the actual bay walls.
    for label in ('Drawing','Family'):
        parts=[w for w in walls if w['name'].startswith(label+' bay ')]
        if len(parts)!=5:continue
        parts.sort(key=lambda w:int(w['name'].rsplit(' ',1)[1]))
        for ob in list(bpy.data.objects):
            if ob.type=='MESH' and 'window board' in ob.name and ob.name.startswith((label+' bay ','Surface join | '+label+' bay')):
                bpy.data.objects.remove(ob,do_unlink=True)
        points=[Vector(parts[0]['a'])]+[Vector(w['b']) for w in parts]
        vectors=[(b-a).normalized() for a,b in zip(points,points[1:])]
        normals=[Vector((u.y,-u.x)) for u in vectors]
        def offset(distance):
            result=[]
            for i,p in enumerate(points):
                if i==0:q=p+normals[0]*distance-vectors[0]*.03
                elif i==len(points)-1:q=p+normals[-1]*distance+vectors[-1]*.03
                else:q=p+(normals[i-1]+normals[i])*distance/(1+normals[i-1].dot(normals[i]))
                result.append(tuple(q))
            return result
        outline=offset(-.175)+list(reversed(offset(.235)))
        sill=parts[0]['openings'][0][2];n=len(outline)
        vertices=[(x,y,z) for z in (sill-.047,sill+.003) for x,y in outline]
        faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]
        faces +=[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
        name='Surface join | '+label+' bay continuous window board'
        mesh=bpy.data.meshes.new(name);mesh.from_pydata(vertices,[],faces);mesh.update()
        bm=bmesh.new();bm.from_mesh(mesh);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(mesh);bm.free()
        ob=bpy.data.objects.new(name,mesh);bpy.data.collections['12 Doors and windows'].objects.link(ob)
        mesh.materials.append(bpy.data.materials['White joinery']);ob['sill_finish_separated']=True
        ob['basis']='Continuous mitred board following the five bay wall segments; inferred 120 mm internal projection.'
    return {'ceiling_finish_below_coincident_band_m':.002,'sill_finish_above_wall_cap_m':.003,
            'ceilings':ceilings,'window_boards_changed':boards,
            'basis':'Separate overlapping finish faces; wall/aperture widths and heights retained.'}
