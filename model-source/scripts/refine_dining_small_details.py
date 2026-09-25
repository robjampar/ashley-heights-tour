"""Dining cornice and shell-head relief visible in2445659-3/-2.

Keep the existing wall faces, niche recesses and glass shelves. Decorative
profile sizes and fine sculptural relief are photo estimates. Run after the
stair/dining owner helper and the selected rear-bay correction.
"""
import math
import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube

PREFIX='Dining detail | '


def refine_dining_small_details(g):
    data=g.get('g',g);walls={w['name']:w for w in data.get('walls',data.get('wall_specs'))}
    mesh=g['mesh'];layer='14 Trim'
    replaced={'Circulation detail | Cove Dining drawing partition -1',
              'Circulation detail | Cove Dining hall doors 1',
              'Circulation detail | Cove Kitchen dining partition 1',
              'Rear bay detail | Dining continuous cove',
              'Owner interior detail | West dining display head cornice',
              'Owner interior detail | East dining display head cornice'}
    for ob in list(bpy.data.objects):
        if ob.name.startswith(PREFIX) or ob.name in replaced:
            bpy.data.objects.remove(ob,do_unlink=True)

    def clean(ob):
        bm=bmesh.new();bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
        bm.to_mesh(ob.data);bm.free();ob.data.update()
        ob['basis']='Original2445659-3/-2; shallow relief dimensions inferred'
        return ob

    def tube(name,points,r=.002,closed=False):
        return make_tube(mesh,PREFIX+name,points,r,'White joinery',layer,8,closed)

    def bounds(name):
        ob=bpy.data.objects[name];v=[ob.matrix_world@p.co for p in ob.data.vertices]
        return [min(p[i]for p in v)for i in range(3)],[max(p[i]for p in v)for i in range(3)]

    # The existing chamfered faces supply the exact front corners; the rear
    # plane comes from the selected bay wall records rather than an old depth.
    west_lo,west_hi=bounds('Owner interior detail | West dining display chamfered wall')
    east_lo,east_hi=bounds('Owner interior detail | East dining display chamfered wall')
    front_w=Vector((west_hi[0],west_lo[1]));side_w=Vector((west_lo[0],west_hi[1]))
    front_e=Vector((east_lo[0],east_lo[1]));side_e=Vector((east_hi[0],east_hi[1]))

    def inner_line(name):
        wall=walls[name];a,b=Vector(wall['b']),Vector(wall['a'])
        u=(b-a).normalized();normal=Vector((-u.y,u.x));d=wall['thickness_m']/2
        return a+normal*d,b+normal*d

    def cross(a,b):return a.x*b.y-a.y*b.x
    def meet(first,second):
        a,b=first;c,d=second;u=b-a;v=d-c;den=cross(u,v)
        if abs(den)<1e-9:raise ValueError('Unexpected parallel dining cornice corner')
        return a+u*(cross(c-a,v)/den)

    right=inner_line('Dining right bay');rear=inner_line('Dining rear French doors');left=inner_line('Dining left bay')
    points=[front_w,front_e,side_e,
            meet((side_e,side_e+Vector((0,1))),right),meet(right,rear),
            meet(rear,left),meet(left,(side_w,side_w+Vector((0,-1)))),side_w]
    # A continuous mitred band removes the old plain pieces above the two
    # front chamfers as well as the three straight room-facing wall runs.
    n=len(points);directions=[(points[(i+1)%n]-points[i]).normalized()for i in range(n)]
    normals=[Vector((-u.y,u.x))for u in directions]
    def ring(offset):
        return [meet((points[(i-1)%n]+normals[(i-1)%n]*offset,
                      points[i]+normals[(i-1)%n]*offset),
                     (points[i]+normals[i]*offset,
                      points[(i+1)%n]+normals[i]*offset))for i in range(n)]
    profile=[(0,.150),(.015,.150),(.022,.144),(.028,.138),(.028,.055),
             (.036,.045),(.058,.025),(.091,.013),(.110,.009),(.110,0),(0,0)]
    ceiling=2.60
    vertices=[(*p,ceiling-drop)for offset,drop in profile for p in ring(offset)]
    faces=[]
    for j in range(len(profile)):
        j2=(j+1)%len(profile)
        for i in range(n):faces.append((j*n+i,j*n+(i+1)%n,j2*n+(i+1)%n,j2*n+i))
    clean(mesh(PREFIX+'Continuous mitred cornice',vertices,faces,'White joinery',layer))
    run=ring(.030);motifs=0
    for i in range(n):
        a,b=run[i],run[(i+1)%n];u=(b-a).normalized();length=(b-a).length
        if length<.28:continue
        count=max(1,int((length-.16)/.38));spacing=(length-.16)/count
        for k in range(count):
            c=a+u*(.08+(k+.5)*spacing);z=ceiling-.097
            tube('Cornice oval relief',[(*(c+u*(.016*math.cos(j*math.tau/32))),z+.028*math.sin(j*math.tau/32))for j in range(32)],.002,True)
            for sign in (-1,1):
                tube('Cornice oval inner relief',[(*(c+u*(sign*(.004+.004*math.sin(j*math.pi/20)))),z-.021+j*.042/20)for j in range(21)],.0017)
            if k+1<count:
                c2=c+u*spacing/2
                for dz in (0,.009):
                    tube('Cornice shallow swag',[(*(c2+u*(-.054+j*.108/24)),z+.018+dz-.042*math.sin(j*math.pi/24))for j in range(25)])
            motifs+=1

    # The original shell heads have scalloped transverse edges in addition to
    # their existing radial fan ribs. Add only that missing shallow relief.
    niches=data['stair_dining_owner_review']['dining_recesses'];shells=[]
    for spec in niches:
        west=spec['name'].startswith('West')
        u=((front_w-side_w)if west else(side_e-front_e)).normalized()
        normal=Vector((-u.y,u.x));origin=Vector(spec['front_origin_xy_m'])
        half=spec['width_m']/2;spring=spec['top_m']-half;depth=spec['recess_depth_m']
        for label,radius,amplitude,tube_r in [('outer',.980,.065,.0055),('inner',.760,.040,.0045)]:
            path=[]
            for k in range(241):
                angle=math.pi*k/240;r=radius-amplitude*abs(math.sin(10*angle))
                d=-depth*math.sqrt(1-r*r)+.009
                p=origin+u*(half*r*math.cos(angle))+normal*d
                path.append((p.x,p.y,spring+half*r*math.sin(angle)))
            ob=tube(spec['name']+' '+label+' scalloped shell edge',path,tube_r)
            ob['assembly']=spec['name']+' shell relief'
        shells.append(spec['name'])
    return {'sources':['2445659-3','2445659-2'],'cornice_drop_m':.150,'cornice_projection_m':.110,
            'ornament_relief_m':.004,'oval_motif_count':motifs,'shell_heads':shells,
            'replaced_trim_names':sorted(replaced),'preserved':'Wall spans, door apertures, niche sizes/positions, original shell ribs and glass shelves',
            'estimates':'Fine oval/swag sculpture, ten shell scallops and all shallow relief dimensions are inferred from photographs.'}
