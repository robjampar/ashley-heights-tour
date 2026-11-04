"""Oak split staircase, with real risers, guarded openings and three walk ramps."""
import json,math


def apply_grand_loft_stair(ns):
    import bpy
    from mathutils import Vector
    from mathutils.bvhtree import BVHTree
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    from scripts.model.grand_stair_returns import finish_grand_stair_returns
    scene,nav=ns['scene'],ns['nav'];cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/loft-stair.json').read_text())
    if scene.get('grand_loft_stair'):
        nav.setdefault('grandLoftStair',json.loads(scene['grand_loft_stair']))
        objects,_=finish_grand_stair_returns(ns)
        return objects,nav['grandLoftStair']
    b=RoomBuilder(ns,'loft stair','Proposal | Grand loft stair | ','P31 Grand loft staircase')
    # Retire the straight flight and its old guard/collision geometry together.
    b.remove(('Proposal | Loft stair ',))
    for values in (nav.get('ramps',[]),ns.get('new_ramps',[])):
        values[:]=[r for r in values if r['name']!='Proposal | First-to-loft stair beside garden glazing']
    oak=bpy.data.materials.get('Interior | Landings natural oak') or bpy.data.materials['Proposal | Pale oak']
    plaster=bpy.data.materials.get('Interior | Landings warm ivory') or bpy.data.materials['Proposal | Loft plaster']
    z0,z1=cfg['floorZ'],cfg['loftZ'];rise=(z1-z0)/cfg['risers'];zm=z0+cfg['mainRisers']*rise
    holes=cfg['openings'];changed=[]
    def bounds(ob):
        vv=[ob.matrix_world@Vector(v) for v in ob.bound_box]
        return [min(v[k] for v in vv) for k in range(3)]+[max(v[k] for v in vv) for k in range(3)]
    # Imported ceilings and the old knee wall also have to open over the stair.
    for j,(a,s,c,n) in enumerate(holes):
        bpy.ops.mesh.primitive_cube_add(size=1,location=((a+c)/2,(s+n)/2,6.35))
        cutter=bpy.context.object;cutter.dimensions=(c-a,n-s,2.30);bpy.context.view_layer.update()
        candidates=[]
        for ob in scene.objects:
            if ob.type!='MESH' or not ob.name.startswith(('Proposal |','Hobby 01 |','Bedroom 02 |')):continue
            if not any(t in ob.name.lower() for t in ('ceiling','deck','floor','knee wall')):continue
            bb=bounds(ob)
            if 5.19<bb[2]<5.57 and bb[5]<6.61 and bb[0]<c-1e-5 and bb[3]>a+1e-5 and bb[1]<n-1e-5 and bb[4]>s+1e-5:candidates.append(ob)
        with BooleanWorkspace([cutter]) as ws:
            for ob in candidates:
                ob.data=ob.data.copy();ws.difference(ob,[cutter],'Grand loft stair opening');changed.append(ob)
        bpy.data.objects.remove(cutter,do_unlink=True)
    # Polygon subtraction keeps support consistent with every actual opening.
    def clip(poly,k,v,greater):
        result=[]
        for a,c in zip(poly,poly[1:]+poly[:1]):
            ai=a[k]>=v if greater else a[k]<=v;ci=c[k]>=v if greater else c[k]<=v
            if ai:result.append(a)
            if ai!=ci:
                t=(v-a[k])/(c[k]-a[k]);result.append([a[q]+t*(c[q]-a[q]) for q in (0,1)])
        return result
    def area(p):return abs(sum(a[0]*c[1]-c[0]*a[1] for a,c in zip(p,p[1:]+p[:1])))/2
    for items in (nav['surfaces'],ns.get('new_surfaces',[])):
        for a,s,c,n in holes:
            result=[]
            for item in items:
                if abs(item['z']-z1)>.015:result.append(item);continue
                inside=item['polygon'];outside=[]
                for k,v,g in ((0,a,True),(0,c,False),(1,s,True),(1,n,False)):
                    part=clip(inside,k,v,not g)
                    if len(part)>2 and area(part)>1e-7:outside.append(part)
                    inside=clip(inside,k,v,g)
                    if not inside:break
                if len(inside)<3 or area(inside)<1e-7:result.append(item);continue
                result.extend({**item,'name':item['name']+' | grand trim '+str(j),'polygon':p} for j,p in enumerate(outside))
            items[:]=result
    for items in (nav['segments'],ns.get('new_segments',[])):
        result=[]
        for item in items:
            if item['name']=='Proposal | Original loft bridge west knee wall':
                a,c=sorted((item['a'][1],item['b'][1]));x=item['a'][0]
                for i,(s,n) in enumerate(((a,holes[0][1]),(holes[0][3],c))):
                    if n>s:result.append({**item,'name':item['name']+' | grand trim '+str(i),'a':[x,s],'b':[x,n]})
            else:result.append(item)
        items[:]=result
    def prism(label,poly,low,high,mat,bevel=0):
        count=len(poly);vv=[(x,y,z) for z in (low,high) for x,y in poly]
        ff=[tuple(reversed(range(count))),tuple(range(count,count*2))]+[(i,(i+1)%count,(i+1)%count+count,i+count) for i in range(count)]
        ob=b.mesh(label,vv,ff,mat)
        if bevel:
            mod=ob.modifiers.new('Eased oak nosing','BEVEL');mod.width=bevel;mod.segments=3
            mod=ob.modifiers.new('Joinery face normals','WEIGHTED_NORMAL');mod.keep_sharp=True
        return ob
    steps=[]
    def flight(label,start,end,width,count,low,high):
        ax,ay=start;cx,cy=end;length=math.dist(start,end);u=((cx-ax)/length,(cy-ay)/length);v=(-u[1],u[0]);going=length/(count-1)
        def p(t,q):return [ax+u[0]*t+v[0]*q,ay+u[1]*t+v[1]*q]
        for i in range(count-1):
            z=low+(i+1)*(high-low)/count;w=width+(.20*(1-i/2) if label=='main' and i<2 else 0)
            poly=[p(i*going-.018,-w/2),p((i+1)*going,-w/2),p((i+1)*going,w/2),p(i*going-.018,w/2)]
            ob=prism(label+' oak tread %02d'%(i+1),poly,z-.035,z,oak,.003)
            ob['stair_tread']=True;ob['stair_flight']=label
            prism(label+' ivory riser block %02d'%(i+1),[p(i*going,-w/2+.006),p((i+1)*going,-w/2+.006),p((i+1)*going,w/2-.006),p(i*going,w/2-.006)],z-rise-.035,z-.035,plaster)
            steps.append({'name':ob.name,'flight':label,'polygon':poly,'top':z,'centre':p((i+.5)*going,0)})
        # A final solid riser meets the landing/deck without a gap.
        poly=[p(length-.022,-width/2),p(length+.022,-width/2),p(length+.022,width/2),p(length-.022,width/2)]
        prism(label+' final ivory riser',poly,high-rise-.035,high-.003,plaster)
        # Continuous white stair soffit closes the underside between treads.
        vv=[(*p(t,q),z) for q in (-width/2,width/2) for t,z in ((0,low-.035),(length,high-rise-.035),(length,high-rise-.20),(0,low-.20))]
        b.mesh(label+' plaster soffit',vv,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],plaster)
        poly=[p(-.03,-width/2),p(length+.03,-width/2),p(length+.03,width/2),p(-.03,width/2)]
        ns.get('new_ramps',nav.setdefault('ramps',[])).append({'name':b.prefix+label+' flight','polygon':poly,'start':[*start,low],'end':[*end,high]})
        # Keep the first-floor circulation out from under the low flight.
        box=[min(q[0] for q in poly),min(q[1] for q in poly),max(q[0] for q in poly),max(q[1] for q in poly)]
        if label=='main':
            box[0]=ax+going*3.0
            ns.get('new_obstacles',nav['obstacles']).append({'name':b.prefix+'main low soffit','box':box,'bottom':z0,'top':zm,'maxFootZ':z0+.24})
        return p
    def beam(label,a,c,size,mat=oak):
        a,c=Vector(a),Vector(c);d=c-a;mid=(a+c)/2
        ob=b.box(label,(0,0,0),(size,size,d.length),mat,.002)
        ob.location=mid;ob.rotation_mode='QUATERNION';ob.rotation_quaternion=Vector((0,0,1)).rotation_difference(d)
        return ob
    def rail(label,a,c,za,zc,height=1.0):
        length=math.dist(a,c);count=max(1,math.ceil(length/.12))
        beam(label+' handrail',(*a,za+height),(*c,zc+height),.060)
        beam(label+' base rail',(*a,za+.075),(*c,zc+.075),.042)
        for i in range(count+1):
            t=i/count;x=a[0]+(c[0]-a[0])*t;y=a[1]+(c[1]-a[1])*t;z=za+(zc-za)*t
            if i in (0,count):b.box(label+' newel '+str(i),(x,y,z+.53),(.085,.085,1.10),oak,.004)
            else:b.box(label+' spindle '+str(i),(x,y,z+.51),(.027,.027,.91),oak,.0015)
        # Short collision segments follow the rake, rather than forming a tall wall.
        for i in range(count):
            t=i/count;u=(i+1)/count;p=[a[k]+(c[k]-a[k])*t for k in (0,1)];q=[a[k]+(c[k]-a[k])*u for k in (0,1)];z=za+(zc-za)*t
            ns.get('new_segments',nav['segments']).append({'name':b.prefix+label+' '+str(i),'a':p,'b':q,'bottom':z,'top':max(z,za+(zc-za)*u)+height,'thickness':.035})
    p=flight('main',cfg['mainStart'],cfg['mainEnd'],cfg['mainWidth'],cfg['mainRisers'],z0,zm)
    for side,sign in (('right',-1),('left',1)):
        rail('main '+side,p(.10,sign*.76),p(math.dist(cfg['mainStart'],cfg['mainEnd']),sign*.76),z0+rise,zm)
    a,s,c,n=cfg['landing'];prism('split landing oak deck',[(a,s),(c,s),(c,n),(a,n)],zm-.035,zm,oak,.003)
    prism('split landing ivory fascia',[(a,s),(c,s),(c,n),(a,n)],zm-.20,zm-.035,plaster)
    ns.get('new_surfaces',nav['surfaces']).append({'name':b.prefix+'split landing','polygon':[[a,s],[c,s],[c,n],[a,n]],'z':zm})
    ns.get('new_obstacles',nav['obstacles']).append({'name':b.prefix+'landing low soffit','box':[a,s,c,n],'bottom':z0,'top':zm,'maxFootZ':z0+.24})
    bx0,bx1=cfg['branchX'];cx=(bx0+bx1)/2
    for label,sy,ey in [('left',n,cfg['northEndY']),('right',s,cfg['southEndY'])]:
        flight(label,(cx,sy),(cx,ey),bx1-bx0,cfg['risers']-cfg['mainRisers'],zm,z1)
        limit=sy+(.45 if ey>sy else -.45)
        ns.get('new_obstacles',nav['obstacles']).append({'name':b.prefix+label+' low soffit','box':[bx0,min(sy,limit),bx1,max(sy,limit)],'bottom':z0,'top':zm+.35,'maxFootZ':z0+.24})
        for edge,x in [('inner',bx0-.01),('outer',bx1-.01)]:rail(label+' '+edge,(x,sy),(x,ey),zm+rise,z1)
    rail('landing window side',(c,s),(c,n),zm,zm)
    # Loft floor edges: leave both branch exits open. Low roof-edge trims are
    # scribed in height, retaining the existing eaves rather than raising a roof.
    roofs=[]
    for ob in scene.objects:
        if ob.type=='MESH' and any(t in ob.name.lower() for t in ('roof lining','joined roof','dormer ceiling')):
            vv=[ob.matrix_world@v.co for v in ob.data.vertices]
            if vv:roofs.append(BVHTree.FromPolygons(vv,[list(f.vertices) for f in ob.data.polygons]))
    def roof_z(x,y):
        levels=[]
        for tree in roofs:
            p,*_=tree.ray_cast(Vector((x,y,z1+.001)),Vector((0,0,1)),3)
            if p is not None:levels.append(p.z)
        return min(levels,default=7.64)
    edges=[((8.62,-4.32),(8.62,-3.13)),((8.62,-1.47),(8.62,-.28)),((holes[0][0],-3.17),(8.66,-3.17)),((holes[0][0],-1.43),(8.66,-1.43)),((8.62,-4.35),(9.0,-4.35)),((8.62,-.25),(9.0,-.25))]
    for j,(a,c) in enumerate(edges):
        count=max(1,math.ceil(math.dist(a,c)/.12));last=None
        for i in range(count+1):
            t=i/count;x=a[0]+(c[0]-a[0])*t;y=a[1]+(c[1]-a[1])*t;h=min(1.05,roof_z(x,y)-z1-.07)
            if h<.12:continue
            b.box('loft edge '+str(j)+' spindle '+str(i),(x,y,z1+h/2),(.035,.035,h),oak,.001)
            if last:beam('loft edge '+str(j)+' handrail '+str(i),last,(x,y,z1+h),.055)
            last=(x,y,z1+h)
        ns.get('new_segments',nav['segments']).append({'name':b.prefix+'loft edge '+str(j),'a':list(a),'b':list(c),'bottom':z1,'top':z1+1.05,'thickness':.035})
    views={'proposal-old-house-loft-stair':([6.0,-2.3,z0],[1,0,.32],'Grand loft staircase'),
           'proposal-new-loft-landing':([9.65,-4.85,z1],[0,1,-.28],'Loft stair · suite landing'),
           'proposal-original-loft-bridge':([9.65,.30,z1],[0,-1,-.28],'Loft stair · hobby landing')}
    for items in (nav['rooms'],ns.get('new_views',[])):
        for room in items:
            if room['id'] in views:
                p,d,label=views[room['id']];room.update(position=p,direction=d,label=label)
    ns.get('new_views',nav['rooms']).append({'id':'proposal-grand-loft-stair-approach','label':'Grand loft staircase · approach','group':'Proposal · First floor','position':[6.0,-4.6,z0],'direction':[2.9,2.3,.75]})
    report={**cfg,'landingZ':zm,'riserMetres':rise,'treads':steps,'mainGoingMetres':math.dist(cfg['mainStart'],cfg['mainEnd'])/(cfg['mainRisers']-1),'branchGoingMetres':.25,'lowerFlightFaces':'east','leftBranch':'hobby bridge','rightBranch':'loft suite'}
    nav['grandLoftStair']=report;nav.setdefault('proposalLoft',{}).update(stair_void=holes[1],stair_voids=holes,stair_ramp_name=b.prefix+'main flight')
    nav.setdefault('proposalVariantRoutes',{})['stair']={'layout':'split','main_start':cfg['mainStart'],'main_end':cfg['mainEnd'],'landing':cfg['landing'],'branch_x':cfg['branchX'],'north_end_y':cfg['northEndY'],'south_end_y':cfg['southEndY']}
    scene['grand_loft_stair']=json.dumps(report)
    returns,_=finish_grand_stair_returns(ns)
    return changed+b.objects+returns,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning') and spec.get('loftGrandStair'):
    apply_grand_loft_stair(globals())
