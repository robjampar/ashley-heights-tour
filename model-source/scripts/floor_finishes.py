"""Keep carpet on the walking surface, with plaster below the upper slabs."""
import bpy

def apply_floor_finishes():
    plaster=bpy.data.materials['Warm plaster']
    for ob in bpy.data.objects:
        if ob.type!='MESH' or not any(c.name=='20 First floor - floors' for c in ob.users_collection):continue
        names=[m.name for m in ob.data.materials]
        if plaster.name not in names:ob.data.materials.append(plaster)
        index=[m.name for m in ob.data.materials].index(plaster.name)
        for face in ob.data.polygons:
            if face.normal.z<.5:face.material_index=index
