"""Owner-confirmed flat garden roof, retaining the agreed 900 mm overhang."""
import bpy


def refine_garden_flat_roof(g):
    data=g.get('g',g)
    roof=bpy.data.objects.get('Outbuilding flat roof') or bpy.data.objects['Outbuilding shallow curved roof']
    vv=[roof.matrix_world@v.co for v in roof.data.vertices]
    xa,xb=min(v.x for v in vv),max(v.x for v in vv)
    ya,yb=min(v.y for v in vv),max(v.y for v in vv)
    # Previous curved infill and segmented fascias must go with the old shell.
    # The new closed slab bears directly on the existing2.40m wall heads.
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and any(c.name=='41 Outbuilding roof'for c in ob.users_collection):
            bpy.data.objects.remove(ob,do_unlink=True)
    name='Garden roof membrane'
    mat=bpy.data.materials.get(name)or bpy.data.materials.new(name)
    color=(.048,.053,.046,1);mat.diffuse_color=color;mat.use_nodes=True
    bs=mat.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=color;bs.inputs['Roughness'].default_value=.88
    g['materials'][name]=mat;g['PALETTE'][name]=list(color)
    underside,top=2.40,2.51
    ob=g['box']('Outbuilding flat roof',((xa+xb)/2,(ya+yb)/2,(underside+top)/2),
                (xb-xa,yb-ya,top-underside),'White joinery','41 Outbuilding roof')
    ob.data.materials.append(mat)
    for face in ob.data.polygons:
        if face.normal.z>.9:face.material_index=1
    ob['assembly']='Garden building flat roof'
    ob['basis']='Owner confirms flat roof;900mm garden-facing overhang. Roof height/thickness estimated; wall footprint retained.'
    review={'profile':'Flat','underside_m':underside,'top_m':top,'overall_depth_m':xb-xa,
            'overall_length_m':yb-ya,'front_overhang_m':.90,
            'basis':'Owner confirmed flat profile and about900mm overhang; retained1.76m interior dimension. Roof height/thickness estimated.'}
    data.setdefault('exterior_owner_review',{}).update(garden_roof_profile='flat',garden_roof_top_m=top)
    data['garden_flat_roof_review']=review
    return review
