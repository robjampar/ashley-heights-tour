"""Remove floor skirting/cornice that incorrectly crosses the open stairwell.

Only simple, closed longitudinal trim prisms are cut. Structural walls, opening
jambs, staircase treads and their elevations are never changed.
"""
import bpy
from mathutils import Vector


def refine_stair_trim(g=None, stair_bounds=(7.845, 8.885)):
    left, right = stair_bounds
    removed, clipped, finish_changes = [], [], []

    def bounds(ob):
        points=[ob.matrix_world@v.co for v in ob.data.vertices]
        return [(min(p[i]for p in points),max(p[i]for p in points))for i in range(3)]

    def trim_ends(ob, lo, hi):
        """Move the two complete end rings; preserve their closed end caps."""
        bb=bounds(ob); xs=sorted(set(round((ob.matrix_world@v.co).x,5)for v in ob.data.vertices))
        if len(xs)!=2:
            raise ValueError('Expected closed two-ended trim prism: '+ob.name)
        if hi-lo<.001:
            raise ValueError('Refusing collapsed stair trim: '+ob.name)
        inv=ob.matrix_world.inverted()
        middle=(bb[0][0]+bb[0][1])/2
        for vertex in ob.data.vertices:
            p=ob.matrix_world@vertex.co
            p.x=lo if p.x<middle else hi
            vertex.co=inv@p
        ob.data.update()
        ob['stair_trim_clipped']=True
        ob['basis']='Unsupported trim removed over owner-confirmed open staircase; walls and floor heights retained.'

    for ob in list(bpy.data.objects):
        if ob.type!='MESH':continue
        if ob.name.startswith('Bedroom 2 stair partition | skirting end-1'):
            removed.append(ob.name);bpy.data.objects.remove(ob,do_unlink=True);continue
        n=ob.name
        front_skirting=n.startswith('First front | skirting ')
        front_cove=n.startswith('Circulation detail | Cove House front centre -1')
        if not(front_skirting or front_cove):continue
        bb=bounds(ob)
        # Only the inside front-wall skirting, not exterior trim.
        if front_skirting and not(.09<=bb[1][0]<=.16 and 2.79<=bb[2][0]<=2.81):continue
        lo,hi=bb[0]
        if hi<=left+.00001 or lo>=right-.00001:continue
        if lo>=left-.00001 and hi<=right+.00001:
            removed.append(n);bpy.data.objects.remove(ob,do_unlink=True)
        elif lo<left and hi>right:
            # Preserve both closed outer segments when a single cove spans
            # the whole front wall. Repeated application leaves these alone.
            east_name='Stair trim retained | Front cove east'
            previous=bpy.data.objects.get(east_name)
            if previous is not None:bpy.data.objects.remove(previous,do_unlink=True)
            east=ob.copy();east.data=ob.data.copy();east.name=east_name
            for collection in ob.users_collection:collection.objects.link(east)
            east['source_name']=east_name
            trim_ends(east,right,hi);trim_ends(ob,lo,left)
            clipped.extend([n,east_name])
        elif lo<left:
            trim_ends(ob,lo,left);clipped.append(n)
        else:
            trim_ends(ob,right,hi);clipped.append(n)
    # The old drawing-room ceiling was authored to the partition centreline.
    # Its edge stood 5 mm proud of the corrected stair face. End it at the
    # unchanged drawing-room plaster face, wholly inside the partition.
    ceiling=bpy.data.objects.get('Drawing room | ceiling')
    if ceiling is not None and bounds(ceiling)[0][0]<9.015-.00001:
        trim_ends(ceiling,9.015,bounds(ceiling)[0][1])
        ceiling['basis']='Ceiling finishes at drawing-room inner plaster face; no exposed edge into open staircase.'
        clipped.append(ceiling.name)
    # Carpeted treads retain the exact rise and navigation datum. Recess the
    # separate nosing finish by 1 mm to remove duplicate coplanar top faces.
    for ob in bpy.data.objects:
        if ob.type=='MESH' and ob.name.startswith('Stair nosing ') and not ob.get('stair_nosing_finish_separated'):
            inv=ob.matrix_world.inverted()
            for vertex in ob.data.vertices:
                p=ob.matrix_world@vertex.co;p.z-=.001;vertex.co=inv@p
            ob.data.update();ob['stair_nosing_finish_separated']=True
            finish_changes.append(ob.name)
    return {'stair_void_x_m':[left,right],
            'removed_objects':removed,'clipped_objects':clipped,'nosing_finish_recess_m':.001,'nosing_finish_changes':finish_changes,
            'basis':'No upper-floor skirting or ground-floor cornice spans an open staircase; trim retained over real landing/room floors.'}
