"""Adopted bounded east-boundary foliage detail, after crown-clearance review.

Retains actual reconstructed boundary positions, all existing trees/trunks and
current hedge crown envelopes. Aggregate opaque leaf geometry remains porous;
no billboard, textured wall, changed boundary or visual masking mesh is used.
A few low stems/leaves may be added inside the existing east planting strip,
separately reported and checked against buildings and actual paved surfaces.
"""
import bpy, hashlib, random, math, json
from mathutils import Vector
from mathutils.bvhtree import BVHTree


def apply_boundary_foliage(scene,nav,remove_object,collection,report_path=None,dense_core=True):
    def world(ob):return[ob.matrix_world@v.co for v in ob.data.vertices]
    def bounds(vv):return[min(v[k]for v in vv)for k in range(3)]+[max(v[k]for v in vv)for k in range(3)]
    candidates=[]
    for ob in list(scene.objects):
        if ob.type!='MESH' or ob.hide_render or 'Boundary hedge'not in ob.name:continue
        bb=bounds(world(ob));c=Vector([(bb[k]+bb[k+3])/2 for k in range(3)])
        if ob.name in {'Boundary hedge.%03d'%i for i in range(9,16)}:candidates.append((ob,bb,c))
    mats=[bpy.data.materials['Proposal | Cherry detail '+n]for n in('Deep green','Mid green','Olive new leaf')]+[bpy.data.materials['Dark walnut']]
    groups={};report={'status':'adopted','scope':'Seven actual visible east-side hedge crowns: Boundary hedge.009 through .015, confirmed by camera ray picks; all other hedge/mature-tree crowns unchanged.',
                     'sourceObjects':[],'aggregateObjects':[],'understory':[],'denseCore':dense_core,'originalTreesOrBoundaryChanged':False,
                     'currentCrownContainment':'All generated crown leaf/core vertices, edge midpoints and face centres remain in their current source cloud mesh. Six extremal leaf tips preserve each exact source crown bounding box.',
                     'understoryBasis':'Small visual shrub stems/leaves inside eastern reconstructed planting strip only, separately checked against structural obstacles, wall segments and paved paths. Excludes retained shed/outside WC area.'}
    outline=nav['site']['outline_m']
    def in_poly(p,poly):
        x,y=p[:2];inside=False
        for a,b in zip(poly,poly[1:]+poly[:1]):
            if (a[1]>y)!=(b[1]>y)and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:inside=not inside
        return inside
    paved=[s for s in nav['surfaces']if any(t in s['name'].lower()for t in('path','patio','terrace','paving','stepping stone'))]
    def segment_distance(p,a,b):
        dx=b[0]-a[0];dy=b[1]-a[1];t=max(0,min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy)))
        return math.hypot(p[0]-a[0]-dx*t,p[1]-a[1]-dy*t)
    def understory_safe(p):
        if not in_poly(p,outline):return False
        if not 0.10<p.y<18.20:return False
        # Keep the planting entirely in the outer 400mm strip, leaving the lawn
        # and walking routes open. Boundary itself never moves.
        xb=16.488534425422507+(26.560031819132586-p.y)*(.652773617752513/48.07072469842882)
        if not xb-.40<p.x<xb-.055:return False
        for s in paved:
            if in_poly(p,s['polygon']):return False
        for o in nav['obstacles']:
            bb=o.get('box');bot=o.get('bottom',0);top=o.get('top',3)
            if bb and bot-.08<=p.z<=top+.08 and bb[0]-.10<p.x<bb[2]+.10 and bb[1]-.10<p.y<bb[3]+.10:return False
        for wall in nav['segments']:
            if wall.get('construction')=='vegetation':continue
            if wall.get('bottom',0)-.08<=p.z<=wall.get('top',3)+.08 and segment_distance(p,wall['a'],wall['b'])<wall.get('thickness',.16)/2+.10:return False
        return True
    nav_fingerprint_before=hashlib.sha256(json.dumps(nav,sort_keys=True).encode()).hexdigest()
    original_triangles=0;new_triangles=0;understory_triangles=0;count=0
    for ob,bb,c in sorted(candidates,key=lambda item:item[0].name):
        group='East'if c.x>16 else'Rear line'if c.y>25 else'West'if c.x>-8 else'Rear return'
        store=groups.setdefault(group,{'vertices':[],'faces':[],'materials':[],'smooth':[]})
        vv=world(ob);ff=[tuple(p.vertices)for p in ob.data.polygons];bvh=BVHTree.FromPolygons(vv,ff,all_triangles=False)
        def inside(p):
            q,n,_,_=bvh.find_nearest(p);return q is not None and(p-q).dot(n)<=1e-6
        def add(points,faces,material,test,smooth=False):
            if not all(test(p)for p in points):return False
            for f in faces:
                if not test(sum((points[i]for i in f),Vector())/len(f)):return False
                if not all(test((points[a]+points[b])*.5)for a,b in zip(f,f[1:]+f[:1])):return False
            k=len(store['vertices']);store['vertices'].extend(points);store['faces'].extend([tuple(k+i for i in f)for f in faces]);store['materials'].extend([material]*len(faces));store['smooth'].extend([smooth]*len(faces));return True
        rng=random.Random(int.from_bytes(hashlib.sha256(('rear-boundary '+ob.name).encode()).digest()[:8],'little'))
        r=Vector([(bb[k+3]-bb[k])/2 for k in range(3)]);start=len(store['vertices']);face_start=len(store['faces']);accepted=0
        for attempt in range(3000):
            if accepted>=560:break
            u=Vector((rng.gauss(0,1),rng.gauss(0,1),rng.gauss(0,1))).normalized();rho=rng.random()**(1/3)*.985
            p=c+Vector([u[k]*r[k]*rho for k in range(3)])
            angle=rng.uniform(0,math.tau);axis=Vector((math.cos(angle),math.sin(angle),rng.uniform(-.8,.7))).normalized();side=axis.cross(Vector((0,0,1))).normalized();normal=axis.cross(side).normalized()
            length=rng.uniform(.125,.245);width=length*rng.uniform(.38,.65)
            # A two-triangle pointed folded leaf keeps distant border cost low.
            points=[p-axis*length*.50,p+axis*length*.5,p-axis*length*.06+side*width*.5+normal*length*.09,p-axis*length*.06-side*width*.5+normal*length*.09]
            if add(points,[(0,2,1),(0,1,3)],rng.choices([0,1,2],[.45,.44,.11])[0],inside):accepted+=1
        # Exact six-axis envelope anchors are real pointed leaves whose tips
        # touch source mesh extrema. The crown limits stay unchanged, rather
        # than shrinking by the random sampler's chance edge coverage.
        for dimension in range(3):
            for pick in (min,max):
                tip=pick(vv,key=lambda v:v[dimension]);axis=(tip-c).normalized();side=axis.cross(Vector((0,0,1)))
                if side.length<.01:side=axis.cross(Vector((0,1,0)))
                side.normalize();base=tip-axis*.12;middle=tip-axis*.075
                assert add([base,tip,middle+side*.028,middle-side*.028],[(0,2,1),(0,1,3)],0,inside),(ob.name,dimension)
        if dense_core:
            # Small uneven inner foliage mass, completely contained by the
            # original crown. It is vegetation volume, not a fence/billboard.
            phase=(int.from_bytes(hashlib.sha256(ob.name.encode()).digest()[:2],'little')%1000)*math.tau/1000
            core=[]
            for v in vv:
                d=v-c;az=math.atan2(d.y,d.x);nz=d.z/max(r.z,.001)
                scale=.655+.035*math.sin(3*az+phase)+.025*math.cos(5*az+2*nz+phase)+.02*math.sin(4*nz-phase)
                core.append(c+d*scale)
            assert add(core,ff,0,inside,True),ob.name
        # Twenty fine twig segments per source crown remain within that same
        # volume. Existing mature tree trunks/branches are never selected.
        twig_count=0
        for attempt in range(30):
            direction=Vector((rng.uniform(-1,1),rng.uniform(-1,1),rng.uniform(-1,1))).normalized();a=c+Vector([direction[k]*r[k]*.05 for k in range(3)]);b=c+Vector([direction[k]*r[k]*rng.uniform(.45,.87)for k in range(3)])
            axis=(b-a).normalized();side=axis.cross(Vector((0,0,1))).normalized();normal=axis.cross(side).normalized();radius=rng.uniform(.002,.006)
            points=[p+radius*scale*(math.cos(j*math.tau/4)*side+math.sin(j*math.tau/4)*normal)for p,scale in((a,1),(b,.25))for j in range(4)]
            if add(points,[(j,(j+1)%4,(j+1)%4+4,j+4)for j in range(4)],3,inside):twig_count+=1
        source_triangles=sum(len(f)-2 for f in ff);original_triangles+=source_triangles
        made=store['vertices'][start:];assert max(abs(a-b)for a,b in zip(bb,bounds(made)))<1e-6,(ob.name,bb,bounds(made));crown_triangles=sum(len(f)-2 for f in store['faces'][face_start:]);new_triangles+=crown_triangles
        report['sourceObjects'].append({'sourceObject':ob.name,'sourceBounds':bb,'replacementBounds':bounds(made),'leaves':accepted,'twigs':twig_count,'crownTriangles':crown_triangles,'allTestedPointsContained':True})
        remove_object(ob,'Proposal-only leaf-edged boundary planting; boundary and current crown limits retained')
        # Explicit proposed understory grounds the visible east-side shrubs; it never
        # adds a fence/wall or changes an existing trunk. Only safe points pass.
        if group=='East' and .10<c.y<18.20:
            xb=16.488534425422507+(26.560031819132586-c.y)*(.652773617752513/48.07072469842882);base=Vector((xb-.22,c.y,.04));u_start=len(store['vertices']);u_faces=len(store['faces'])
            accepted_low=0
            for attempt in range(250):
                if accepted_low>=75:break
                p=base+Vector((rng.uniform(-.13,.13),rng.uniform(-.55,.55),rng.uniform(.08,.92)))
                a=rng.uniform(0,math.tau);axis=Vector((math.cos(a),math.sin(a),rng.uniform(-.7,.7))).normalized();side=axis.cross(Vector((0,0,1))).normalized();length=rng.uniform(.09,.17)
                points=[p-axis*length*.5,p+axis*length*.5,p+side*length*.27+Vector((0,0,.012)),p-side*length*.27+Vector((0,0,.012))]
                if add(points,[(0,2,1),(0,1,3)],rng.choice([0,0,1,2]),understory_safe):accepted_low+=1
            for attempt in range(5):
                a=base+Vector((rng.uniform(-.035,.035),rng.uniform(-.08,.08),0));b=base+Vector((rng.uniform(-.055,.055),rng.uniform(-.37,.37),rng.uniform(1.35,2.05)))
                axis=(b-a).normalized();side=axis.cross(Vector((0,0,1))).normalized();normal=axis.cross(side).normalized();radius=rng.uniform(.007,.013)
                points=[p+radius*scale*(math.cos(j*math.tau/5)*side+math.sin(j*math.tau/5)*normal)for p,scale in((a,1),(b,.2))for j in range(5)]
                add(points,[(j,(j+1)%5,(j+1)%5+5,j+5)for j in range(5)],3,understory_safe)
            u_v=store['vertices'][u_start:];u_tri=sum(len(f)-2 for f in store['faces'][u_faces:]);understory_triangles+=u_tri
            if u_v:report['understory'].append({'associatedSourceCrown':ob.name,'rootPosition':list(base),'bounds':bounds(u_v),'triangles':u_tri,'lowLeaves':accepted_low,'allVerticesFaceCentresAndEdgeMidpointsSafe':True})
    for label,store in groups.items():
        me=bpy.data.meshes.new('Proposal boundary foliage aggregate '+label);me.from_pydata(store['vertices'],[],store['faces']);me.update()
        ob=bpy.data.objects.new('Proposal | Boundary leaf detail '+label,me);collection.objects.link(ob)
        for ma in mats:me.materials.append(ma)
        for p,index,smooth in zip(me.polygons,store['materials'],store['smooth']):p.material_index=index;p.use_smooth=smooth
        ob['proposal_only_boundary_detail']=True;ob['editing_note']='Aggregated leaves inside existing reconstructed crown limits; boundary and mature tree trunks unchanged.'
        report['aggregateObjects'].append({'name':ob.name,'vertices':len(store['vertices']),'triangles':sum(len(f)-2 for f in store['faces']),'materialGroups':4})
    report.update({'sourceCloudObjectsRemoved':len(candidates),'aggregateObjectsAdded':len(groups),'sourceTrianglesRemoved':original_triangles,'crownTrianglesAdded':new_triangles,'understoryTrianglesAdded':understory_triangles,'netTriangleChange':new_triangles+understory_triangles-original_triangles,'newSharedMaterials':0,'additionalStaticMaterialBatches':0})
    assert nav_fingerprint_before==hashlib.sha256(json.dumps(nav,sort_keys=True).encode()).hexdigest()
    report['completeNavigationUnchangedSha256']=nav_fingerprint_before
    report['sourceCrownBoundsMaximumShiftM']=max(abs(a-b)for source in report['sourceObjects']for a,b in zip(source['sourceBounds'],source['replacementBounds']))
    if report_path:report_path.write_text(json.dumps(report,indent=2)+'\n')
    return report


if all(key in globals() for key in ('scene','nav','_fd_remove','collection','S','OUT','g')):
    boundary_foliage_report=apply_boundary_foliage(scene,nav,_fd_remove,collection(S),OUT/'boundary-foliage-review.json',dense_core=True)
    g['proposal_boundary_foliage']=boundary_foliage_report
    print('PROPOSAL_BOUNDARY_FOLIAGE',boundary_foliage_report['sourceCloudObjectsRemoved'],boundary_foliage_report['netTriangleChange'],flush=True)
