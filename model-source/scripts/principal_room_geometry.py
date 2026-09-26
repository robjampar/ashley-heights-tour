"""Measured principal-room geometry shared by native generation and plan drawing."""
import math

def desk_outline():
    """Equal 1.8 m sides, 700 mm worktops, 300 mm inner and 250 mm outer corner."""
    points=[]
    def arc(cx,cy,r,start,end,n=16):
        points.extend((cx+r*math.cos(math.radians(start+(end-start)*i/n)),cy+r*math.sin(math.radians(start+(end-start)*i/n))) for i in range(n+1))
    points.append((5.65,-15.86));arc(7.10,-15.76,.10,-90,0)
    arc(7.10,-15.26,.10,0,90);arc(6.40,-14.86,.30,-90,-180)
    arc(6.00,-14.16,.10,0,90);arc(5.50,-14.16,.10,90,180)
    arc(5.65,-15.61,.25,180,270)
    return points[:-1]  # last point repeats the first

def revise_east_windows(shell,collection):
    """Move complete assemblies and rebuild adjoining solid wall cells, without booleans."""
    from mathutils import Vector
    prefix='Proposal | New wing east upper '
    def name(ob):return ob.get('source_name',ob.name)
    def bounds(ob):
        p=[ob.matrix_world@Vector(v) for v in ob.bound_box]
        return [min(v[i]for v in p)for i in range(3)]+[max(v[i]for v in p)for i in range(3)]
    def remap(ob,axis,lo,hi):
        b=bounds(ob);oldlo,oldhi=b[axis],b[axis+3];inv=ob.matrix_world.inverted()
        for v in ob.data.vertices:
            p=ob.matrix_world@v.co;p[axis]=lo+(p[axis]-oldlo)*(hi-lo)/(oldhi-oldlo);v.co=inv@p
        ob.data.update()
    for ob in shell:
        n=name(ob)
        if any(n.startswith(prefix+'window '+str(i)+' ') or n==prefix+'window cill '+str(i) or n in(prefix+'sill '+str(i),prefix+'head '+str(i)) for i in (1,2)):
            ob.matrix_world.translation.y-=.75
    remap(next(o for o in shell if name(o)==prefix+'pier 1'),1,-13.875,-12.87)
    remap(next(o for o in shell if name(o)==prefix+'pier 2'),1,-11.27,-9.64)
    end=next(o for o in shell if name(o)==prefix+'end pier')
    template=end.copy();template.data=end.data.copy()
    for label,ya,yb,za,zb in(('bath end pier',-3.4,-3.144,2.8,5.35),('sill 3',-5.2,-3.4,2.8,3.9),('head 3',-5.2,-3.4,5.05,5.35)):
        ob=template.copy();ob.data=template.data.copy();ob.name=prefix+label;ob['source_name']=prefix+label;collection.objects.link(ob);remap(ob,1,ya,yb);remap(ob,2,za,zb);shell.append(ob)
    remap(end,1,-7.84,-5.2)
    for original in list(shell):
        n=name(original)
        if not(n.startswith(prefix+'window 2 ') or n==prefix+'window cill 2'):continue
        ob=original.copy();ob.data=original.data.copy();ob.name=n.replace('window 2','window 3').replace('cill 2','cill 3');ob['source_name']=ob.name;collection.objects.link(ob)
        ob.matrix_world.translation.y+=4.44
        if 'glass' in n:remap(ob,2,3.955,4.995)
        elif 'mullion' in n:remap(ob,2,3.9,5.05)
        elif 'cill' in n or bounds(ob)[5]<4:ob.matrix_world.translation.z+=.35
        shell.append(ob)
