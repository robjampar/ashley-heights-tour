"""Integrated oak spindle joinery for the accepted open loft stair."""
import math


def oak_grain(ob, along, across=(0,0,1)):
    """Use the landing's existing oak image, with grain along each member."""
    from mathutils import Vector
    along, across = Vector(along).normalized(), Vector(across).normalized()
    uv=ob.data.uv_layers.active
    for face in ob.data.polygons:
        for index in face.loop_indices:
            p=ob.data.vertices[ob.data.loops[index].vertex_index].co
            # pale-oak.png's grain runs in V. Real metre scale is retained.
            u=p.dot(across)
            if abs(face.normal.dot(across))>.8:
                u=p.dot(along.cross(across))
            uv.data[index].uv=(u,p.dot(along))
    ob['oak_grain_direction']=list(along)
    return ob


def build_modern_stair(b, cfg, oak, glass=None):
    """Light oak joinery; structural members are a visual design allowance."""
    import bpy,bmesh
    from mathutils import Vector
    from scripts.geometry.detail_sweep import make_tube
    base=cfg['floorZ'];rise=(cfg['loftZ']-base)/cfg['nTotal'];m=cfg['modern']
    thickness=m['treadThicknessM'];radius=m['handrailWidthM']/2
    string_depth=m['oakStringDepthM'];string_width=m['oakStringThicknessM'];offset=m['guardOffsetM']
    ivory=bpy.data.materials['Interior | Landings warm ivory'];treads,guards=[],[]
    def tag(ob,label,kind='stair'):
        ob['level_loft_part']=label;ob['level_loft_tag']=kind;ob['modern_loft_stair']=cfg['revision'];return ob
    def finish(ob,direction=(0,0,1)):
        oak_grain(ob,direction,(1,0,0)if direction==(0,0,1)else(0,0,1));return ob
    def spindle(label,x,y,bottom,top):
        w=m['spindleWidthM']
        return finish(tag(b.box(label,(x,y,(bottom+top)/2),(w,w,top-bottom),oak,.0015),'Oak spindle','stair-guard'))
    def newel(label,x,y,bottom,top):
        return finish(tag(b.box(label,(x,y,(bottom+top)/2),(m['newelWidthM'],m['newelDepthM'],top-bottom),oak,.002),'Slender oak newel','stair-guard'))
    def rail(label,points):
        controls=[Vector(p)for p in points];path=[controls[0]]
        for i,p in enumerate(controls[1:-1],1):
            previous,nxt=controls[i-1],controls[i+1];setback=min(.065,(p-previous).length*.35,(nxt-p).length*.35)
            a=p+(previous-p).normalized()*setback;c=p+(nxt-p).normalized()*setback;path.append(a)
            for j in range(1,13):
                t=j/12;path.append(a*(1-t)**2+p*2*(1-t)*t+c*t*t)
        path.append(controls[-1]);ob=make_tube(lambda name,v,f,mat,layer:b.mesh(name,v,f,mat),label,path,radius,oak,None,24)
        uv=ob.data.uv_layers.active;dist=[0]
        for a,c in zip(path,path[1:]):dist.append(dist[-1]+(c-a).length)
        for loop in ob.data.loops:
            ring,j=divmod(loop.vertex_index,24);uv.data[loop.index].uv=(j/24*math.tau*radius,dist[ring])
        ob['oak_grain_direction']=[0,1,0];ob['handrail_diameter_m']=radius*2;ob['handrail_path']=[list(p)for p in path]
        return tag(ob,'Continuous round oak handrail','stair-guard')
    def guard_record(a,c,z0,z1,height=1.05):
        guards.append({'a':a,'b':c,'bottom':min(z0,z1),'top':max(z0,z1)+height+radius,'thickness':radius*2})
    for fi,f in enumerate(cfg['flights']):
        ax,ay=f['a'];length=math.dist(f['a'],f['b']);ux,uy=(f['b'][0]-ax)/length,(f['b'][1]-ay)/length;nx,ny=-uy,ux
        going=length/(f['n']-1);low=base+f['z'];high=low+f['n']*rise
        def pt(d,s=0):return[ax+ux*d+nx*s,ay+uy*d+ny*s]
        for k in range(f['n']-1):
            z=low+(k+1)*rise;x,y=pt((k+.5)*going-.01)
            ob=tag(b.box(f'Open oak tread {fi+1}.{k+1:02d}',(x,y,z-thickness/2),(f['w'],going+.02,thickness),oak,.002),'Open oak tread')
            oak_grain(ob,(nx,ny,0),(ux,uy,0));ob['tread_top']=z;ob['open_riser_gap']=rise-thickness-m['recessedRiserNibM'];treads.append(ob)
            # Recessed 40 mm nib under the leading edge preserves the slim
            # visible nosing and keeps the effective open riser below 100 mm.
            x,y=pt(k*going+.012);nib=m['recessedRiserNibM']
            finish(tag(b.box(f'Recessed oak riser nib {fi+1}.{k+1:02d}',(x,y,z-thickness-nib/2),(f['w']-.02,.02,nib),oak,.001),'Recessed open-riser nib'),(nx,ny,0))
        for side in(-1,1):
            # Uniform slim uprights retain small clear gaps; they are housed
            # into the stepped strings, not placed as floating tread furniture.
            steps=math.ceil((length-.12)/.115)
            for j in range(steps+1):
                d=.06+(length-.12)*j/steps;k=min(f['n']-2,int((d+.02)/going));z=low+(k+1)*rise
                x,y=pt(d,side*(f['w']/2+.025));rz=low+rise+(high-low-rise)*d/length+1.05
                spindle(f'Oak spindle flight {fi+1}.{side}.{j:02d}',x,y,z-thickness-.005,rz-.020)
        profile=[]
        for k in range(f['n']-1):
            d0=k*going-.02;d1=(k+1)*going-.02;z=low+(k+1)*rise-thickness;profile.extend([(d0,z),(d1,z)])
        intercept=(thickness+string_depth-rise)*going/rise
        profile.extend([(length,high-thickness),(length,high-thickness-string_depth),(intercept,low),(-.02,low)])
        for side in(-1,1):
            centre=side*(f['w']/2+.005);half=string_width/2
            vv=[(*pt(d,centre+q),z)for q in(-half,half)for d,z in profile];n=len(profile)
            ff=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
            ob=tag(b.mesh(f'Continuous oak cut string {fi+1}.{side}',vv,ff,oak),'Housed oak string')
            bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free()
            oak_grain(ob,(ux,uy,rise/going),(nx,ny,0))
            if side==-1:
                ob.data.materials.append(ivory);outward=Vector((nx*side,ny*side,0))
                for face in ob.data.polygons:
                    if face.normal.dot(outward)>.9:face.material_index=1
            a,c=pt(0,side*(f['w']/2+offset)),pt(length,side*(f['w']/2+offset));guard_record(a,c,low+rise,high)
            for end,d,z in [('foot',0,low),('head',length,high)]:
                x,y=pt(d,side*(f['w']/2+.025));newel(f'Oak newel flight {fi+1}.{side} {end}',x,y,z,(low+rise if d==0 else high)+1.05-.015)
    turn=cfg['landings'][0];x0,y0,x1,y1=turn['box'];z=base+turn['z'];back=y0-.01
    finish(tag(b.box_bounds('Open stair half landing',[x0-.035,y0-.04,x1+.035,y1],z-thickness,z,oak,.002),'Turn oak finish'),(1,0,0))
    # A shallow framed deck and two recessed rear posts replace the solid
    # ivory plinth. Front corners bear onto the two flight string assemblies.
    for label,y in [('rear',y0+.055),('front',y1-.055)]:
        tag(b.box('Half landing concealed frame '+label,((x0+x1)/2,y,z-thickness-.04),(x1-x0,.04,.08),ivory,.002),'Open landing support frame')
    for label,x in [('west',x0+.055),('east',x1-.055)]:
        tag(b.box('Half landing concealed frame '+label,(x,(y0+y1)/2,z-thickness-.04),(.04,y1-y0-.11,.08),ivory,.002),'Open landing support frame')
        tag(b.box_bounds('Half landing slender support '+label,[x-.025,y0+.02,x+.025,y0+.09],base,z-thickness-.08,ivory,.002),'Open landing support post')
    for label,box in [('back',[x0-.035,y0-.04,x1+.035,y0-.02]),('west',[x0-.035,y0-.02,x0-.015,y1]),('east',[x1+.015,y0-.02,x1+.035,y1]),('front',[x0,y1-.02,x1,y1])]:
        finish(tag(b.box_bounds('Half landing oak apron '+label,box,z-thickness-.06,z-thickness,oak,.001),'Oak landing apron'),(1,0,0)if label in('back','front')else(0,1,0))
    halfpaths=[([x0-offset,back],[x1+offset,back]),([x0-offset,back],[x0-offset,y1]),([x1+offset,back],[x1+offset,y1])]
    for idx,(a,c)in enumerate(halfpaths):
        steps=math.ceil(math.dist(a,c)/.115)
        for j in range(1,steps):
            t=j/steps;x=a[0]+(c[0]-a[0])*t;y=a[1]+(c[1]-a[1])*t;extra=rise*max(0,(y-(y1-.26))/.26)if idx==2 else 0
            spindle(f'Oak spindle half landing {idx}.{j:02d}',x,y,z-.025,z+1.05+extra-.020)
        guard_record(a,c,z,z+rise if idx==2 else z)
    for idx,x in enumerate((x0-offset,x1+offset)):newel(f'Oak newel half landing corner {idx}',x,back,z,z+1.05-.015)
    lo,hi=cfg['flights'];xl=lo['a'][0]-lo['w']/2-offset;xr=hi['a'][0]+hi['w']/2+offset
    rail('Continuous outer oak handrail',[(xl,lo['a'][1],base+rise+1.05),(xl,y1,z+1.05),(xl,back,z+1.05),(xr,back,z+1.05),(xr,y1-.26,z+1.05),(xr,y1,z+rise+1.05),(xr,hi['b'][1],cfg['loftZ']+1.05),(8.52,hi['b'][1],cfg['loftZ']+1.05),(8.52,-1.655,cfg['loftZ']+1.05)])
    il=lo['a'][0]+lo['w']/2+offset;ir=hi['a'][0]-hi['w']/2-offset
    rail('Continuous inner oak handrail',[(il,lo['a'][1],base+rise+1.05),(il,y1,z+1.05),(il,y1+.015,z+1.05),(ir,y1+.015,z+rise+1.05),(ir,y1,z+rise+1.05),(ir,hi['b'][1],cfg['loftZ']+1.05),(7.295,hi['b'][1]+.045,cfg['loftZ']+1.05)])
    finish(tag(b.box_bounds('Top landing integrated oak apron',[7.295,-1.64,8.554,-1.60],cfg['loftZ']-.11,cfg['loftZ'],oak,.001),'Oak landing apron'),(1,0,0))
    # Close the short guard return made longer by the narrower upper flight.
    # These fine uprights continue into the existing gallery base and rail.
    for j,(x,y) in enumerate(((8.36,-1.60),(8.445,-1.60),(8.52,-1.655))):
        spindle(f'Oak spindle top return {j}',x,y,cfg['loftZ']-.005,cfg['loftZ']+1.05-.020)
    hx0,hy0,hx1,hy1=cfg['holes'][0]
    for a,c in[([hx1+.02,hy0],[hx1+.02,hy1]),([7.30,hy0],[hx1+.02,hy0])]:guard_record(a,c,cfg['loftZ'],cfg['loftZ'])
    guard_record([hi['b'][0]+hi['w']/2+offset,hy1],[8.52,hy1],cfg['loftZ'],cfg['loftZ'])
    return treads,guards


def refresh_oak_stair(ns):
    """Replace only the stair assembly in a previously coordinated proposal."""
    import bpy
    import json
    from scripts.interiors.interior_furnishing import RoomBuilder
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/loft-stair.json').read_text())
    scene,nav=ns['scene'],ns['nav']
    if scene.get('loft_stair_finish_revision')==cfg['revision']:
        return [],json.loads(scene['loft_stair_finish_report'])
    removed=[]
    for ob in list(scene.objects):
        if not ob.get('modern_loft_stair'):
            continue
        assert not any(ob.name in s.objects for s in bpy.data.scenes
                       if 'Proposed' not in s.name and 'Proposal ·' not in s.name),ob.name
        removed.append(ob.name)
        bpy.data.objects.remove(ob,do_unlink=True)
    b=RoomBuilder(ns,'level loft','Proposal | Level loft | ','P31 Level loft and return stair')
    oak=bpy.data.materials['Interior | Landings natural oak']
    treads,guards=build_modern_stair(b,cfg,oak,bpy.data.materials['Proposal | Clear glazing'])
    # The expanded bedroom replaces the two original gallery guards with walls.
    if not any(s['name']=='Proposal | Level loft | landing guard 3' for s in nav['segments']):
        for ob in list(b.objects):
            if ob.name.startswith('Proposal | Level loft | Gallery guard '):
                b.objects.remove(ob);bpy.data.objects.remove(ob,do_unlink=True)
    from scripts.model.proposal_loft_bedroom_expansion import coordinate_oak_landing_guard
    old_coordinated=[o.name for o in scene.objects if o.name.startswith('Proposal | Loft bedroom expansion | returned landing ')]
    coordinated=coordinate_oak_landing_guard(ns)
    removed.extend(n for n in old_coordinated if n not in scene.objects)
    report=nav['levelLoftStair']
    report['modern']=cfg['modern'];report['oakJoineryRevision']=cfg['revision']
    report['created']=[n for n in report['created']if n not in removed]+[o.name for o in b.objects]
    for tread,ob in zip(report['treads'],treads):
        tread['name']=ob.name
    for fi,flight in enumerate(cfg['flights']):
        ax,ay=flight['a'];length=math.dist(flight['a'],flight['b'])
        ux,uy=(flight['b'][0]-ax)/length,(flight['b'][1]-ay)/length;nx,ny=-uy,ux
        low=cfg['floorZ']+flight['z'];rise=(cfg['loftZ']-cfg['floorZ'])/cfg['nTotal'];high=low+flight['n']*rise
        for side in(-1,1):
            for i in range(20):
                item=next(s for s in nav['segments']if s['name']==f'Proposal | Level loft | flight {fi+1} guard {side} {i}')
                def point(t):return[ax+ux*t+nx*side*(flight['w']/2+cfg['modern']['guardOffsetM']),ay+uy*t+ny*side*(flight['w']/2+cfg['modern']['guardOffsetM'])]
                item.update(a=point(.05+(length-.05)*i/20),b=point(.05+(length-.05)*(i+1)/20),top=low+rise+(high-low-rise)*(i+1)/20+1.05+cfg['modern']['handrailWidthM']/2,thickness=cfg['modern']['handrailWidthM'])
    for i,guard in enumerate(guards[4:]):
        item=next((s for s in nav['segments']if s['name']==f'Proposal | Level loft | landing guard {i}'),None)
        if item is not None:item.update(guard)
    coordinate_light_stair_navigation(ns,cfg,report)
    finish={'revision':cfg['revision'],'removed':removed,'created':[o.name for o in b.objects],
            'finish':cfg['modern'],'layoutUnchanged':False,'floorRiseGoingAndLoftArrivalRetained':True,'lightened':True,'coordinated':[o.name for o in coordinated]}
    scene['loft_stair_finish_revision']=cfg['revision']
    scene['loft_stair_finish_report']=json.dumps(finish)
    scene['level_loft_report']=json.dumps(report)
    nav['loftStairFinish']=finish
    bpy.context.view_layer.update()
    return b.objects+coordinated,finish


def coordinate_light_stair_navigation(ns,cfg,report):
    """Keep movement geometry synchronized with the narrower, lighter assembly."""
    import copy
    nav=ns['nav'];prefix='Proposal | Level loft | '
    def lists(key):
        values=[nav.setdefault(key,[])];pending=ns.get('new_'+{'rooms':'views'}.get(key,key))
        if pending is not None and pending is not values[0]:values.append(pending)
        return values
    for key in ('routes','upperRoutes'):
        report[key]=copy.deepcopy(report[key])
        for name,points in report[key].items():
            if key=='routes' and name=='principal':continue
            for p in points:
                if abs(p[0]-6.6)<1e-6:p[0]=cfg['flights'][0]['a'][0]
                if abs(p[0]-7.85)<1e-6:p[0]=cfg['flights'][1]['a'][0]
                if abs(p[1]+3.97)<1e-6:p[1]=(cfg['landings'][0]['box'][1]+cfg['landings'][0]['box'][3])/2
    report['flights']=copy.deepcopy(cfg['flights']);report['flightWidthMetres']=cfg['flights'][0]['w']
    report['halfLandingBounds']=cfg['landings'][0]['box'];report['arrival']=cfg['arrival']
    rise=(cfg['loftZ']-cfg['floorZ'])/cfg['nTotal'];index=0
    for fi,f in enumerate(cfg['flights']):
        ax,ay=f['a'];length=math.dist(f['a'],f['b']);ux,uy=(f['b'][0]-ax)/length,(f['b'][1]-ay)/length;nx,ny=-uy,ux
        def point(d,q):return[ax+ux*d+nx*q,ay+uy*d+ny*q]
        polygon=[point(-.03,-f['w']/2),point(length+.03,-f['w']/2),point(length+.03,f['w']/2),point(-.03,f['w']/2)]
        low=cfg['floorZ']+f['z'];high=low+f['n']*rise;going=length/(f['n']-1)
        for group in lists('ramps'):
            for item in group:
                if item['name']==prefix+f'flight {fi+1}':item.update(polygon=polygon,start=[*f['a'],low],end=[*f['b'],high])
        for k in range(f['n']-1):
            report['treads'][index].update(centre=point((k+.5)*going,0),top=low+(k+1)*rise);index+=1
        box=[min(p[0]for p in polygon),min(p[1]for p in polygon),max(p[0]for p in polygon),max(p[1]for p in polygon)]
        if fi==0:box[3]=ay-going*2.5
        for group in lists('obstacles'):
            for item in group:
                if item['name']==prefix+f'flight {fi+1} low soffit':item['box']=box
    x0,y0,x1,y1=cfg['landings'][0]['box']
    for group in lists('surfaces'):
        for item in group:
            if item['name']==prefix+'rectangular half landing':item['polygon']=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]]
    for group in lists('obstacles'):
        for item in group:
            if item['name']==prefix+'half landing low soffit':item['box']=[x0,y0,x1,y1]
    for group in lists('rooms'):
        for item in group:
            if item['id']in('proposal-old-house-loft-stair','proposal-grand-loft-stair-approach'):item['position'][0]=cfg['flights'][0]['a'][0]
            if item['id']=='proposal-level-loft-arrival':item['position']=cfg['arrival']
    nav.setdefault('proposalVariantRoutes',{})['stair']={'layout':'return','flights':cfg['flights'],'landing':[x0,y0,x1,y1],'floorZ':cfg['loftZ']}


def repair_stairwell_linings(b,cfg,plaster):
    """Close the exposed roof void and give every cut floor edge a plaster return.

    The original front roof remains intact. These linings sit outside the clear
    rectangular shaft; the existing flat gallery and circulation stay unchanged.
    """
    x0,y0,x1,y1=cfg['holes'][0]
    a,_,c=cfg['roof']['planes'][0]
    # Production joined roof lining is 350 mm below the weathering plane here.
    roof=lambda x:a*x+c-.35
    created=[]
    def wedge(label,xa,xb,ya,yb,bottom,ta,tb):
        vv=[(x,y,z) for y in (ya,yb) for x,z in [(xa,bottom),(xb,bottom),(xb,tb),(xa,ta)]]
        ob=b.mesh(label,vv,[(0,1,2,3),(4,7,6,5),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)],plaster)
        ob['level_loft_part']=label;ob['level_loft_tag']='wall';ob['stairwell_repair']=True;created.append(ob)
    # Finished faces cover existing cut ends by 4 mm, avoiding coplanar
    # overlaps with the retained wall/ceiling edges.
    wedge('Stairwell west continuous lining',x0-.035,x0+.004,y0-.035,y1+.035,5.245,roof(x0-.035)+.006,roof(x0+.004)+.006)
    wedge('Stairwell south scribed return',x0,7.30,y0-.035,y0+.004,5.245,roof(x0)+.006,roof(7.30)+.006)
    wedge('Stairwell north scribed return',x0,7.30,y1-.004,y1+.035,5.245,roof(x0)+.006,roof(7.30)+.006)
    for label,box in [('east',[x1-.004,y0,x1+.018,y1]),('south',[7.3,y0-.018,x1,y0+.004]),('north',[7.3,y1-.004,x1,y1+.018])]:
        ob=b.box_bounds('Stair opening '+label+' plaster edge',box,5.245,5.548,plaster)
        ob['level_loft_part']='Finished stair opening edge';ob['level_loft_tag']='wall';ob['stairwell_repair']=True;created.append(ob)
    created.extend(repair_landing_cove(b))
    return created


def repair_landing_cove(b):
    """Continue the existing landing molding over the cupboard lintel."""
    source=next(o for o in b.scene.objects if o.get('source_name',o.name)=='Circulation detail | Cove Bathroom hall -1')
    points=[source.matrix_world @ v.co for v in source.data.vertices]
    start,end=min(p.x for p in points),max(p.x for p in points)
    assert abs(end-7.74)<.001
    vertices=[(7.74+(p.x-start)/(end-start)*(9.08-7.74),p.y,p.z) for p in points]
    ob=b.mesh('Landing cupboard continuous cove',vertices,[tuple(p.vertices) for p in source.data.polygons],source.data.materials[0])
    ob['level_loft_part']='Continuous landing cove';ob['level_loft_tag']='finish';ob['stairwell_repair']=True
    return [ob]
