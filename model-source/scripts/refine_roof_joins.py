"""Close evidenced envelope gaps with wall heads, soffits and proper roof ties."""
import math
import bpy, bmesh
from mathutils import Vector
from mathutils.bvhtree import BVHTree

def refine_roof_joins(g):
    data=g.get('g',g);walls=data.get('walls',data.get('wall_specs'))
    box,mesh=g['box'],g['mesh'];prefix='Roof join | '
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and (ob.name.startswith(prefix) or ob.name.startswith('Garage parapet white coping')):
            bpy.data.objects.remove(ob,do_unlink=True)
    def closed(name,verts,faces,material,layer='30 Roof',face_mats=None):
        ob=mesh(prefix+name,verts,faces,material,layer,face_mats)
        bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free()
        ob['basis']='Envelope closure checked against actual roof surfaces and source photographs; heights estimated'
        return ob
    def wall_head(w,low,high,mat='Red brown brick'):
        a,b=Vector(w['a']),Vector(w['b']);u=(b-a).normalized();length=(b-a).length;cuts=[0,length]
        if w.get('projected_x_span'):
            cuts += [(x-a.x)/u.x for x in w['projected_x_span'] if 0<(x-a.x)/u.x<length]
        cuts.sort()
        for lo,hi in zip(cuts,cuts[1:]):
            p=a+u*(lo+hi)/2;projection=0
            if w.get('projected_x_span') and w['projected_x_span'][0]<p.x<w['projected_x_span'][1]:projection=w['front_projection_m']
            box(prefix+w['name']+' masonry head',(p.x,p.y-projection/2,(low+high)/2),
                (hi-lo,w['thickness_m']+projection,high-low),mat,'30 Roof',math.atan2(u.y,u.x))

    # Solidify was only a Blender modifier; baking it makes portable native mesh
    # geometry carry the same roof thickness as Blender and the glTF export.
    roof=bpy.data.objects['Main hipped roof']
    for mod in list(roof.modifiers):
        if mod.type=='SOLIDIFY':
            with bpy.context.temp_override(object=roof,active_object=roof):bpy.ops.object.modifier_apply(modifier=mod.name)
    roof['portable_closed_shell']=True

    garage_names={'Garage west','Garage rear','Utility rear','Garage front','Garage utility partition','Utility south','Garage kitchen partition'}
    for w in walls:
        if w['floor']==0 and w['name'] in garage_names:
            wall_head(w,2.60,2.80 if w['name']=='Garage front' else 2.725)
        elif w['floor']==1 and w['external']:
            wall_head(w,5.25,5.35,'White joinery' if w['name'] in ('Bathroom balcony','En suite balcony') else 'Red brown brick')

    # Gable masonry continues directly from the projected facade. Correct the
    # stray 25 mm offset on the front face, retaining the documented 215 mm bay.
    ob=bpy.data.objects['Front gable brickwork'];inv=ob.matrix_world.inverted()
    for v in ob.data.vertices:
        p=ob.matrix_world@v.co
        if p.y<-.32:p.y=-.33
        v.co=inv@p
    ob.data.update()

    # Re-intersect the two gable valleys after the forward facade shift. Merely
    # shifting the old triangles had left their ridge/valley edges above the hip.
    eave,apex=5.35,6.72;front_y=-.495;main_front=-.28
    ridge_y=main_front+(apex-eave)*4.685/2.70
    for side,edge in [('west',4.615),('east',9.265)]:
        old=bpy.data.objects.get('Front gable roof '+side)
        if old:bpy.data.objects.remove(old,do_unlink=True)
        top=[(edge,front_y,eave),(6.94,front_y,apex),(6.94,ridge_y,apex),(edge,main_front,eave)]
        verts=top+[(x,y,z-.08)for x,y,z in top]
        ob=closed('Front gable roof '+side,verts,[(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)],
                  ['Slate roof','White joinery'],face_mats=[0,1,1,0,0,0])
        # Keep the original source name so export and seam audits can locate it.
        ob.name='Front gable roof '+side;ob['source_name']=ob.name

    # White fascia and enclosed overhangs visible in the agent's front/rear photos.
    # Two square-cut sloping bars left a small triangular hole at each apex.
    # A single mitred ribbon keeps the visible profile closed right to the tip.
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and ob.name.startswith(('Front gable white fascia','Porch pediment white trim')):
            bpy.data.objects.remove(ob,do_unlink=True)
    def apex_fascia(name,left,right,base,peak,y,thickness,layer):
        mid=(left+right)/2;dx=mid-left;dz=peak-base;length=math.hypot(dx,dz)
        nx=-dz/length*thickness/2;nz=dx/length*thickness/2
        vertical=thickness/2*length/dx
        path=[(left+nx,base+nz),(mid,peak+vertical),(right-nx,base+nz),
              (right+nx,base-nz),(mid,peak-vertical),(left-nx,base-nz)]
        vv=[(x,yy,z) for yy in(y-thickness/2,y+thickness/2) for x,z in path]
        ff=[tuple(reversed(range(6))),tuple(range(6,12))]
        ff += [(i,(i+1)%6,(i+1)%6+6,i+6) for i in range(6)]
        return closed(name,vv,ff,'White joinery',layer)
    apex_fascia('Continuous front gable fascia',4.615,9.265,5.35,6.77,-.435,.14,'30 Roof')
    apex_fascia('Continuous porch fascia',5.30,8.58,2.72,3.30,-1.23,.12,'12 Doors and windows')
    for side,x1,x2 in [('west',-.30,4.675),('east',9.205,14.28)]:
        box(prefix+'Front fascia '+side,((x1+x2)/2,-.285,5.245),(x2-x1,.095,.23),'White joinery','30 Roof')
        sx1,sx2=(.03,4.675) if side=='west' else (9.205,13.95)
        box(prefix+'Front soffit '+side,((sx1+sx2)/2,-.20,5.245),(sx2-sx1,.24,.055),'White joinery','30 Roof')
    for name,x in [('West',-.27),('East',14.25)]:
        box(prefix+name+' fascia',(x,4.405,5.245),(.095,9.37,.23),'White joinery','30 Roof')
        inner=.0 if name=='West' else 13.98
        box(prefix+name+' soffit',((x+inner)/2,4.405,5.245),(abs(x-inner)+.06,9.47,.055),'White joinery','30 Roof')
    box(prefix+'Rear fascia',(6.99,9.09,5.245),(14.58,.095,.23),'White joinery','30 Roof')
    for xa,xb in[(.03,5.04),(9.08,13.95)]:box(prefix+'Rear soffit',((xa+xb)/2,8.925,5.245),(xb-xa,.43,.055),'White joinery','30 Roof')
    old=bpy.data.objects.get('Balcony inner eaves soffit')
    if old:bpy.data.objects.remove(old,do_unlink=True)
    box(prefix+'Balcony inner boarded soffit',(7.06,8.50,5.245),(4.04,1.28,.055),'White joinery','30 Roof')
    for i in range(29):
        box(prefix+'Balcony soffit board seam',(5.01+i*.145,8.475,5.215),(.003,1.23,.002),'Warm plaster','30 Roof')

    # Flat garage edge: wall heads meet the slab; a continuous coping sits on
    # the parapet instead of separate floating beam segments.
    box(prefix+'Garage west fascia',(-5.385,4.44,2.735),(.065,9.30,.15),'White joinery','30 Roof')
    box(prefix+'Garage rear fascia',(-2.67,9.065,2.735),(5.46,.065,.15),'White joinery','30 Roof')
    box(prefix+'Garage west soffit',(-5.34,4.44,2.715),(.15,9.30,.035),'White joinery','30 Roof')
    box(prefix+'Garage rear soffit',(-2.67,8.99,2.715),(5.46,.22,.035),'White joinery','30 Roof')
    line=[(-5.4,2.99),(-1.17,2.99)]+[(-1.17+1.15*i/24,2.99+1.08*(i/24)**3)for i in range(1,25)]+[(.02,4.07)]
    verts=[(x,y,z+dz)for y in(-.25,.035)for dz in(-.005,.072)for x,z in line];n=len(line);faces=[]
    for i in range(n-1):
        faces +=[(i,i+1,n+i+1,n+i),(2*n+i,3*n+i,3*n+i+1,2*n+i+1),
                  (i,2*n+i,2*n+i+1,i+1),(n+i,n+i+1,3*n+i+1,3*n+i)]
    faces +=[(0,n,3*n,2*n),(n-1,3*n-1,4*n-1,2*n-1)]
    closed('Garage continuous parapet coping',verts,faces,'White joinery')

    # White side boxes shown above both porch columns in listing image 02.
    for label,x1,x2 in [('left',5.505,5.935),('right',7.945,8.375)]:
        def porch_z(x):return 3.30-abs(x-6.94)*.58/1.64
        section=[(x1,2.675),(x2,2.675),(x2,porch_z(x2)+.006),(x1,porch_z(x1)+.006)]
        verts=[(x,y,z)for y in(-1.205,-.315)for x,z in section]
        closed('Porch '+label+' boxed support',verts,[(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],'White joinery')
    for ob in bpy.data.objects:
        if ob.type=='MESH' and ob.name.startswith('Entrance porch pitched roof'):
            inv=ob.matrix_world.inverted()
            for v in ob.data.vertices:
                p=ob.matrix_world@v.co
                if p.y>-.35:p.y=-.315
                v.co=inv@p

    # The detached building has the same issue at a smaller scale. Follow its
    # actual curved underside, rather than filling up to one arbitrary height.
    out_roof=bpy.data.objects.get('Outbuilding flat roof') or bpy.data.objects['Outbuilding shallow curved roof']
    verts=[out_roof.matrix_world@v.co for v in out_roof.data.vertices]
    xmin,xmax=min(v.x for v in verts),max(v.x for v in verts);ymin,ymax=min(v.y for v in verts),max(v.y for v in verts)
    bvh=BVHTree.FromPolygons(verts,[list(p.vertices)for p in out_roof.data.polygons])
    rows=sorted(set(round(v.y,6)for v in verts))
    def under(x,y):
        x=max(xmin+.0001,min(xmax-.0001,x));y=max(ymin+.0001,min(ymax-.0001,y))
        hit=bvh.ray_cast(Vector((x,y,-10)),Vector((0,0,1)))[0]
        assert hit is not None,(x,y)
        return hit.z
    for ob in list(bpy.data.objects):
        if ob.type!='MESH' or ob.users_collection[0].name!='40 Outbuildings':continue
        if not ('wall' in ob.name or 'front pier' in ob.name or 'front lintel' in ob.name):continue
        v=[ob.matrix_world@v.co for v in ob.data.vertices];lo=[min(p[i]for p in v)for i in range(3)];hi=[max(p[i]for p in v)for i in range(3)]
        if abs(hi[2]-2.4)>.015:continue
        ys=[lo[1]]+[y for y in rows if lo[1]<y<hi[1]]+[hi[1]]
        for j,(ya,yb)in enumerate(zip(ys,ys[1:])):
            xy=[(lo[0],ya),(hi[0],ya),(hi[0],yb),(lo[0],yb)]
            vv=[(x,y,2.395)for x,y in xy]+[(x,y,under(x,y)+.005)for x,y in xy]
            closed('Garden building wall head '+ob.name+f' {j}',vv,[(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],'White joinery','41 Outbuilding roof')
    # A continuous white underside only within the existing roof outline.
    xmin,xmax=min(v.x for v in verts),max(v.x for v in verts);ymin,ymax=min(v.y for v in verts),max(v.y for v in verts)
    # Recess the underside 5 mm above the fascia base: coincident underside
    # faces produced a black seam even though the solids enclosed the edge.
    box(prefix+'Garden building white soffit',((xmin+xmax)/2,(ymin+ymax)/2,2.420),(xmax-xmin,ymax-ymin,.035),'White joinery','41 Outbuilding roof')
    for x in(xmin+.012,xmax-.012):
        for i,(ya,yb)in enumerate(zip(rows,rows[1:])):
            xy=[(x-.022,ya),(x+.022,ya),(x+.022,yb),(x-.022,yb)]
            vv=[(xx,y,2.3975)for xx,y in xy]+[(xx,y,under(max(xmin+.001,min(xmax-.001,xx)),y)+.045)for xx,y in xy]
            closed('Garden building fascia '+str(round(x,2))+f' {i}',vv,[(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],'White joinery','41 Outbuilding roof')
    for y in(ymin+.012,ymax-.012):box(prefix+'Garden building end fascia',((xmin+xmax)/2,y,2.435),(xmax-xmin,.05,.075),'White joinery','41 Outbuilding roof')
    return {'garage_wall_gap_closed_m':.12,'front_gable_gap_closed_m':.10,
            'porch_support_gap_closed_m':.179,'gable_valley_ridge_y_m':ridge_y,
            'portable_main_roof_closed':True,'outer_balcony_stays_open':True}
