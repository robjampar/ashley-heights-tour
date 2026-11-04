def build_modern_stair(b, cfg, oak, glass=None):
    """Open oak flights with the lower stair's rounded rails and ivory sides."""
    import bpy
    import bmesh
    from mathutils import Vector
    from scripts.geometry.detail_sweep import make_tube
    base=cfg['floorZ'];rise=(cfg['loftZ']-base)/cfg['nTotal']
    thickness=cfg['modern']['treadThicknessM'];radius=.034
    ivory=bpy.data.materials['Interior | Landings warm ivory']
    treads,guards=[],[]
    def tag(ob,label,kind='stair'):
        ob['level_loft_part']=label;ob['level_loft_tag']=kind
        ob['modern_loft_stair']=cfg['revision'];return ob
    def finish(ob,direction=(0,0,1),material=oak):
        if material==oak:oak_grain(ob,direction,(1,0,0)if direction==(0,0,1)else(0,0,1))
        return ob
    def spindle(label,x,y,bottom,top):
        return finish(tag(b.box(label,(x,y,(bottom+top)/2),(.028,.028,top-bottom),oak,.0015),'Oak spindle','stair-guard'))
    def newel(label,x,y,bottom,top):
        return finish(tag(b.box(label,(x,y,(bottom+top)/2),(.09,.09,top-bottom),oak,.003),'Square oak newel','stair-guard'))
    def rail(label,points):
        # Round each change of direction into a single continuous swept rail,
        # following the same 68 mm profile as the ground-to-first stair.
        controls=[Vector(p)for p in points];path=[controls[0]]
        for i,p in enumerate(controls[1:-1],1):
            previous,nxt=controls[i-1],controls[i+1]
            setback=min(.075,(p-previous).length*.35,(nxt-p).length*.35)
            a=p+(previous-p).normalized()*setback;c=p+(nxt-p).normalized()*setback
            path.append(a)
            for j in range(1,13):
                t=j/12;path.append(a*(1-t)**2+p*2*(1-t)*t+c*t*t)
        path.append(controls[-1])
        ob=make_tube(lambda name,v,f,mat,layer:b.mesh(name,v,f,mat),label,path,radius,oak,None,24)
        # Tube UV: grain follows the swept timber, including the eased turns.
        uv=ob.data.uv_layers.active;dist=[0]
        for a,c in zip(path,path[1:]):dist.append(dist[-1]+(c-a).length)
        for loop in ob.data.loops:
            ring,j=divmod(loop.vertex_index,24)
            uv.data[loop.index].uv=(j/24*math.tau*radius,dist[ring])
        ob['oak_grain_direction']=[0,1,0];ob['handrail_diameter_m']=.068
        ob['handrail_path']=[list(p)for p in path]
        tag(ob,'Continuous round oak handrail','stair-guard');return ob
    def guard_record(a,c,z0,z1,height=1.05):
        guards.append({'a':a,'b':c,'bottom':min(z0,z1),'top':max(z0,z1)+height+radius,'thickness':.09})
    for fi,f in enumerate(cfg['flights']):
        ax,ay=f['a'];length=math.dist(f['a'],f['b']);ux,uy=(f['b'][0]-ax)/length,(f['b'][1]-ay)/length;nx,ny=-uy,ux
        going=length/(f['n']-1);low=base+f['z'];high=low+f['n']*rise
        def pt(d,s=0):return[ax+ux*d+nx*s,ay+uy*d+ny*s]
        for k in range(f['n']-1):
            z=low+(k+1)*rise;x,y=pt((k+.5)*going-.01)
            size=(f['w'],going+.02,thickness)if abs(uy)>.5 else(going+.02,f['w'],thickness)
            ob=tag(b.box(f'Open oak tread {fi+1}.{k+1:02d}',(x,y,z-thickness/2),size,oak,.003),'Open oak tread')
            oak_grain(ob,(nx,ny,0),(ux,uy,0));ob['tread_top']=z;ob['open_riser_gap']=rise-thickness;treads.append(ob)
            for side in(-1,1):
                for t in(.25,.75):
                    d=(k+t)*going;x,y=pt(d,side*(f['w']/2+.024))
                    # Spindles are housed into the wider oak strings, without
                    # the former glass clamps or exposed metal fixing blocks.
                    rail_z=low+rise+(high-low-rise)*d/length+1.05
                    spindle(f'Oak spindle flight {fi+1}.{side}.{k+1}.{int(t*4)}',x,y,z-.045,rail_z-.025)
        profile=[]
        for k in range(f['n']-1):
            d0=k*going-.02 if k else-.02;d1=(k+1)*going-.02;z=low+(k+1)*rise-thickness
            profile.extend([(d0,z),(d1,z)])
        intercept=(thickness+.26-rise)*going/rise
        profile.extend([(length,high-thickness),(length,high-thickness-.26),(intercept,low),(-.02,low)])
        for side in(-1,1):
            centre=side*f['w']/2
            vv=[(*pt(d,centre+q),z)for q in(-.055,.055)for d,z in profile];n=len(profile)
            ff=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
            ob=tag(b.mesh(f'Continuous oak cut string {fi+1}.{side}',vv,ff,oak),'Housed oak string')
            bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free()
            oak_grain(ob,(ux,uy,rise/going),(nx,ny,0))
            # The outward face follows the lower stair's ivory side finish.
            # The housed tread bearings and inner oak faces remain visible.
            exterior=(fi==0 and side==-1)or(fi==1 and side==-1)
            if exterior:
                ob.data.materials.append(ivory)
                outward=Vector((nx*side,ny*side,0))
                for face in ob.data.polygons:
                    if face.normal.dot(outward)>.9:face.material_index=1
            a,c=pt(0,side*(f['w']/2+.024)),pt(length,side*(f['w']/2+.024))
            guard_record(a,c,low+rise,high)
            for end,d,z in [('foot',0,low),('head',length,high)]:
                # Heads over the half landing share its posts; upper heads
                # meet the finished gallery edge and surrounding walls.
                x,y=pt(d,side*(f['w']/2+.024));newel(f'Oak newel flight {fi+1}.{side} {end}',x,y,z, (low+rise if d==0 else high)+1.05-.018)
    turn=cfg['landings'][0];x0,y0,x1,y1=turn['box'];z=base+turn['z']
    oak_grain(tag(b.box_bounds('Open stair half landing',[x0-.055,y0-.055,x1+.055,y1],z-thickness,z,oak,.003),'Turn oak finish'),(1,0,0),(0,1,0))
    # Built-in ivory landing base replaces the four-legged platform. It
    # sits wholly beneath the landing, clear of both flights and passage.
    tag(b.box_bounds('Half landing integrated ivory base',[x0-.055,y0-.055,x1+.055,y1-.055],base,z-thickness,ivory,.002),'Integrated ivory landing base')
    for label,box in [('back',[x0-.055,y0-.055,x1+.055,y0]),('west',[x0-.055,y0,x0,y1]),('east',[x1,y0,x1+.055,y1]),('front',[x0,y1-.055,x1,y1])]:
        finish(tag(b.box_bounds('Half landing oak apron '+label,box,z-thickness-.10,z-thickness,oak,.002),'Oak landing apron'),(1,0,0)if label in('back','front')else(0,1,0))
    halfpaths=[([x0-.024,y0],[x1+.024,y0]),([x0-.024,y0],[x0-.024,y1]),([x1+.024,y0],[x1+.024,y1])]
    for idx,(a,c)in enumerate(halfpaths):
        length=math.dist(a,c);steps=math.ceil(length/.115)
        for j in range(1,steps):
            t=j/steps;x=a[0]+(c[0]-a[0])*t;y=a[1]+(c[1]-a[1])*t
            extra=rise*max(0,(y-(y1-.30))/.30)if idx==2 else0
            spindle(f'Oak spindle half landing {idx}.{j}',x,y,z-.025,z+1.05+extra-.025)
        guard_record(a,c,z,z+rise if idx==2 else z)
    for idx,x in enumerate((x0-.024,x1+.024)):
        newel(f'Oak newel half landing corner {idx}',x,y0,z,z+1.05-.018)
    lo=cfg['flights'][0];hi=cfg['flights'][1];offset=.524
    xl,xr=lo['a'][0]-offset,hi['a'][0]+offset
    rail('Continuous outer oak handrail',[(xl,lo['a'][1],base+rise+1.05),(xl,y1,z+1.05),(xl,y0,z+1.05),(xr,y0,z+1.05),(xr,y1-.30,z+1.05),(xr,y1,z+rise+1.05),(xr,hi['b'][1],cfg['loftZ']+1.05),(8.52,hi['b'][1],cfg['loftZ']+1.05),(8.52,-1.655,cfg['loftZ']+1.05)])
    il,ir=lo['a'][0]+offset,hi['a'][0]-offset
    rail('Continuous inner oak handrail',[(il,lo['a'][1],base+rise+1.05),(il,y1,z+1.05),(il,y1-.16,z+1.05),(ir,y1-.16,z+rise+1.05),(ir,y1,z+rise+1.05),(ir,hi['b'][1],cfg['loftZ']+1.05),(7.295,hi['b'][1]+.045,cfg['loftZ']+1.05)])
    # A short housed oak fascia joins the top tread/string assembly to the
    # floor edge. It also meets the landing's returned oak base rail.
    finish(tag(b.box_bounds('Top landing integrated oak apron',[7.295,-1.64,8.554,-1.60],cfg['loftZ']-.19,cfg['loftZ'],oak,.002),'Oak landing apron'),(1,0,0))
    # Retain navigation record order used by the full builder; the later
    # bedroom expansion removes these two now-walled gallery guards.
    hx0,hy0,hx1,hy1=cfg['holes'][0]
    for a,c in[([hx1+.02,hy0],[hx1+.02,hy1]),([7.30,hy0],[hx1+.02,hy0])]:guard_record(a,c,cfg['loftZ'],cfg['loftZ'])
    guard_record([hi['b'][0]+hi['w']/2+.024,hy1],[8.52,hy1],cfg['loftZ'],cfg['loftZ'])
    return treads,guards
