"""Trim the subordinate side hip against the retained roof's real control planes."""
import bmesh


def roof_volume(name,vertices):
    # Six upper hip controls and four bottom corners form a closed cutter.
    lower=[(x,y,4.0)for x,y,z in vertices[:4]]
    faces=[(0,1,5,4),(1,2,5),(2,3,4,5),(3,0,4),(9,8,7,6),
           (0,6,7,1),(1,7,8,2),(2,8,9,3),(3,9,6,0)]
    data=bpy.data.meshes.new(name);data.from_pydata(vertices+lower,[],faces);data.update()
    bm=bmesh.new();bm.from_mesh(data);bmesh.ops.recalc_face_normals(bm,faces=bm.faces[:]);bm.to_mesh(data);bm.free()
    ob=bpy.data.objects.new(name,data);collection('R90 Temporary roof cutters').objects.link(ob)
    return ob


def difference_roof(ob,cutter):
    bpy.context.view_layer.objects.active=ob
    mod=ob.modifiers.new('Local roof valley trim','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
    bpy.ops.object.modifier_apply(modifier=mod.name)


original_controls=[(-.27,-.28,5.35),(14.25,-.28,5.35),(14.25,9.09,5.35),(-.27,9.09,5.35),(3.36,4.405,8.05),(10.62,4.405,8.05)]
side=nav['redesignRoofs']['side'];x0,y0,x1,y1=side['bounds_m'];cx=(x0+x1)/2;inset=(x1-x0)/2
# roof_volume expects ridge controls ordered west-to-east for a long x roof.
# A long y roof uses the corresponding face connectivity instead.
side_controls=[(x0,y0,5.4),(x1,y0,5.4),(x1,y1,5.4),(x0,y1,5.4),(cx,y0+inset,7.05),(cx,y1-inset,7.05)]
main_cutter=roof_volume('Temporary retained hip volume',original_controls)
side_cutter=roof_volume('Temporary side hip volume',side_controls)
# Replace the upper faces for the y-oriented side ridge; lower walls unchanged.
data=side_cutter.data
data.clear_geometry();data.from_pydata(side_controls+[(x,y,4.0)for x,y,z in side_controls[:4]],[],[(0,1,4),(1,2,5,4),(2,3,5),(3,0,4,5),(9,8,7,6),(0,6,7,1),(1,7,8,2),(2,8,9,3),(3,9,6,0)]);data.update()
bm=bmesh.new();bm.from_mesh(data);bmesh.ops.recalc_face_normals(bm,faces=bm.faces[:]);bm.to_mesh(data);bm.free()
bpy.context.view_layer.update()
trimmed=[]
for ob in list(scene.objects):
    if ob.type!='MESH':continue
    name=name_of(ob)
    if 'Subordinate side roof plane' in name:
        difference_roof(ob,main_cutter);trimmed.append(ob.name)
    elif ob.get('redesign_baseline_object')=='Main hipped roof' or 'Original loft roof lining'in name:
        difference_roof(ob,side_cutter);trimmed.append(ob.name)
for ob in(main_cutter,side_cutter):bpy.data.objects.remove(ob,do_unlink=True)
nav['redesignRoofs']['join']={'method':'Exact subtraction of the overlapping closed hip volumes, retaining the upper roof envelope','trimmed_objects':trimmed,'original_ridge_m':8.05,'side_ridge_m':7.05,'status':'Concept valley geometry; flashing, gutters and structure require detailed design.'}
print('ROOF_JOIN',len(trimmed),'objects trimmed',flush=True)
