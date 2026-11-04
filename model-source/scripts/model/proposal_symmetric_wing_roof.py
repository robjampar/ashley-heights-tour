"""Regular main-wing roof, separate retained gallery roof and fitted loft interior."""
import json,math,re
from scripts.geometry.symmetric_roof import envelope,soffit,z_at,half,inside
REVISION='symmetric-wing-roof-2026-10-25'
PREFIX='Symmetric wing | '

def finish_symmetric_wing_solids(ns,panels):
    """Closed wall solids at the new slope and an unbroken old-door infill."""
    import bpy,bmesh
    from mathutils import Vector
    scene,nav=ns['scene'],ns['nav'];cfg=json.loads((ns['ROOT']/'proposal/specs/symmetric-wing-roof.json').read_text())
    ivory=bpy.data.materials['Interior | Landings warm ivory']
    roofmat=scene.objects[PREFIX+'roof 00 west slope'].data.materials[0]
    hanging=next(m for m in bpy.data.materials if m.get('appearance_role')=='dormer'and m.get('appearance_source_material','').startswith(roofmat['appearance_source_material']))
    def solid(name,cells,materials):
        ob=scene.objects[name];vertices=[];faces=[];indices=[]
        for x0,x1,y0,y1,bottom,top,tile_back in cells:
            raw=[(x,y,level[i])for level in(bottom,top)for y in(y0,y1)for i,x in enumerate((x0,x1))]
            unique=[];mapped=[]
            for p in raw:
                key=tuple(round(x,7)for x in p)
                if key not in unique:unique.append(key)
                mapped.append(len(vertices)+unique.index(key))
            vertices.extend(unique)
            for i,face in enumerate(((0,2,3,1),(4,5,7,6),(0,1,5,4),(2,6,7,3),(0,4,6,2),(1,3,7,5))):
                f=list(dict.fromkeys(mapped[v]for v in face))
                if len(f)>=3:faces.append(f);indices.append(1 if tile_back and i==2 else 0)
        inv=ob.matrix_world.inverted();me=bpy.data.meshes.new(name+' closed roof-scribed solid');me.from_pydata([inv@Vector(p)for p in vertices],[],faces)
        for m in materials:me.materials.append(m)
        me.update();uv=me.uv_layers.new(name='UVMap')
        for face,mi in zip(me.polygons,indices):
            face.material_index=mi;normal=face.normal;axes=(0,1)if abs(normal.z)>.6 else(1,2)if abs(normal.x)>abs(normal.y)else(0,2)
            for i in face.loop_indices:
                p=me.vertices[me.loops[i].vertex_index].co;uv.data[i].uv=(p[axes[0]],p[axes[1]])
        ob.modifiers.clear();ob.data=me;return ob
    top=lambda x,y:min(cfg['finishedCeilingZ'],soffit(panels,x,y))
    floor=cfg['floorZ'];wall=solid('Proposal | Loft knee wall 1',[(7.46,7.58,-11.6,-5.3,[floor,floor],[top(7.46,-8),top(7.58,-8)],False)],[ivory])
    s=(cfg['ridgeZ']-cfg['eaveZ'])/(cfg['ridgeX']-cfg['eavesX'][0]);ceiling=cfg['finishedCeilingZ'];meet=cfg['ridgeX']+(cfg['ridgeZ']-ceiling)/s
    outer=lambda x:cfg['ridgeZ']-s*(x-cfg['ridgeX'])
    # One concave extrusion, with the doorway open at its bottom. Touching
    # disconnected cells confuse the subsequent door-rebate boolean pass.
    cheek=scene.objects['Proposal | Wing dormer south cheek']
    apex=cfg['ridgeX']-(cfg['ridgeZ']-cfg['roofThickness']-ceiling)/s
    profile=[(7.48,floor),(9.284,floor),(9.284,7.366),(10.116,7.366),(10.116,floor),(12.6,floor),(12.6,ceiling),(apex,ceiling),(7.48,top(7.48,-11.6))]
    count=len(profile);inv=cheek.matrix_world.inverted()
    vertices=[inv@Vector((x,y,z))for y in(-11.695,-11.515)for x,z in profile]
    faces=[tuple(range(count)),tuple(reversed(range(count,2*count)))]+[(i,i+count,(i+1)%count+count,(i+1)%count)for i in range(count)]
    me=bpy.data.meshes.new(cheek.name+' continuous roof-scribed solid');me.from_pydata(vertices,[],faces);me.materials.append(ivory);me.materials.append(hanging);me.update()
    bm=bmesh.new();bm.from_mesh(me)
    normal=cheek.matrix_world.to_3x3().transposed()@Vector((s,0,1))
    bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=inv@Vector((cfg['ridgeX'],0,cfg['ridgeZ'])),plane_no=normal,dist=1e-7)
    bm.normal_update()
    for face in bm.faces:
        centre=cheek.matrix_world@face.calc_center_median();face.material_index=1 if face.normal.y<-.9 and centre.z>outer(centre.x)+1e-5 else 0
    assert all(len(edge.link_faces)==2 for edge in bm.edges),'Cheek must remain a closed solid'
    bm.to_mesh(me);bm.free();me.update();uv=me.uv_layers.new(name='UVMap')
    for face in me.polygons:
        normal=face.normal;axes=(0,1)if abs(normal.z)>.6 else(1,2)if abs(normal.x)>abs(normal.y)else(0,2)
        for i in face.loop_indices:
            p=me.vertices[me.loops[i].vertex_index].co;uv.data[i].uv=(p[axes[0]],p[axes[1]])
    cheek.modifiers.clear();cheek.data=me
    # At the connector, tile belongs only above the adjacent exterior roof.
    # The part below it is an interior reveal, including the narrow underside.
    # Assigning one material to the entire face exposed dark tile strips inside.
    abutments=[];old=nav['levelLoftStair']['roof'];a,c=cfg['eavesX'];cx=cfg['ridgeX'];rz=cfg['ridgeZ'];ez=cfg['eaveZ']
    def old_top(x):
        if old['capX']<=x<=cfg['dormerEastX']:return cfg['dormerRoofZ']
        return rz-(rz-ez)*((old['ridgeX']-x)/(old['ridgeX']-a)if x<old['ridgeX']else(x-old['ridgeX'])/(c-old['ridgeX']))
    def new_top(x):
        if cfg['dormerWestX']<=x<=cfg['dormerEastX']:return cfg['dormerRoofZ']
        return rz-s*abs(x-cx)
    for ob in scene.objects:
        if not ob.name.startswith(PREFIX+'tiled north abutment '):continue
        inv=ob.matrix_world.inverted();points=[ob.matrix_world@v.co for v in ob.data.vertices];x0=min(p.x for p in points);x1=max(p.x for p in points)
        bm=bmesh.new();bm.from_mesh(ob.data)
        for height in(old_top,new_top):
            z0,z1=height(x0+1e-6),height(x1-1e-6);gradient=(z1-z0)/(x1-x0)
            normal=ob.matrix_world.to_3x3().transposed()@Vector((-gradient,0,1))
            bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),plane_co=inv@Vector((x0,0,z0)),plane_no=normal,dist=1e-7)
        bm.normal_update()
        for face in bm.faces:
            p=ob.matrix_world@face.calc_center_median();ys=[(ob.matrix_world@v.co).y for v in face.verts]
            vertical_side=max(ys)-min(ys)<1e-5
            exterior=vertical_side and p.z>(old_top(p.x)if p.y>cfg['mainNorthY']else new_top(p.x))+1e-5
            face.material_index=0 if exterior else 1
        bm.to_mesh(ob.data);bm.free();ob.data.update();abutments.append(ob)
    # Planning material inventories describe the active meshes, including the
    # newly coordinated roof, rather than retired source-stage panels.
    if 'planningApplication'in nav:
        plan=nav['planningApplication']
        for key,role in(('matching_roof_objects','roof'),('tile_hung_dormer_objects','dormer')):
            names={n for n in plan[key]if n in scene.objects}
            names.update(o.name for o in scene.objects if o.type=='MESH'and o.name.startswith(PREFIX)and any(m.get('appearance_role')==role for m in o.data.materials))
            plan[key]=sorted(names)
        scene['planning_report']=json.dumps(plan)
    bpy.context.view_layer.update();return [wall,cheek,*abutments]

def apply_symmetric_wing_roof(ns):
    import bpy
    from mathutils import Vector,Matrix
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.model.proposal_level_loft import subtract_box
    scene,nav,root=ns['scene'],ns['nav'],ns['ROOT']
    if scene.get('symmetric_wing_revision')==REVISION:return [],json.loads(scene['symmetric_wing_report'])
    bpy.context.view_layer.update()
    cfg=json.loads((root/'proposal/specs/symmetric-wing-roof.json').read_text());spec=ns['spec'];panels=envelope(spec,cfg)
    b=RoomBuilder(ns,'symmetrical wing roof',PREFIX,'P44 Symmetrical wing roof and loft')
    owners={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    removed=[];changed=[];north=cfg['mainNorthY'];floor=cfg['floorZ'];ceiling=cfg['finishedCeilingZ']
    ivory=bpy.data.materials['Interior | Landings warm ivory'];oak=bpy.data.materials['Interior | Loftsuite natural oak']
    roof_seed=next(o for o in scene.objects if o.name.startswith('Proposal | Joined roof ')and 'New main hip 1'in o.name)
    roofmat=next(m for m in roof_seed.data.materials if m.get('appearance_role')=='roof')
    hanging=next(m for m in bpy.data.materials if m.get('appearance_role')=='dormer'and m.get('appearance_source_material','').startswith(roofmat['appearance_source_material']))
    flatmat=bpy.data.materials['Proposal | Bronze black frames'];zinc=bpy.data.materials['Proposal | Patinated zinc flashings']
    def bounds(ob):
        p=[ob.matrix_world@Vector(v)for v in ob.bound_box];return [min(v[k]for v in p)for k in range(3)]+[max(v[k]for v in p)for k in range(3)]
    def retire(ob):
        removed.append(ob.name)
        for col in tuple(ob.users_collection):
            if col in owners:col.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def mark(ob):
        if ob not in changed:changed.append(ob)
    def groups(key):
        values=[nav.setdefault(key,[])];other=ns.get('new_'+key)
        if other is not None and all(other is not v for v in values):values.append(other)
        return values
    def valid(p):
        if len(p)<3:return False
        a=Vector(p[0][:3]);return any((Vector(p[i][:3])-a).cross(Vector(p[i+1][:3])-a).length>1e-9 for i in range(1,len(p)-1))
    def clip(p,plane):
        out=[]
        for a,c in zip(p,p[1:]+p[:1]):
            da=sum(a[k]*plane[k]for k in range(3))+plane[3];dc=sum(c[k]*plane[k]for k in range(3))+plane[3]
            if da>=-1e-8:out.append(a)
            if (da>=-1e-8)!=(dc>=-1e-8):
                t=max(0.,min(1.,da/(da-dc)));out.append([x+t*(y-x)for x,y in zip(a,c)])
        return out if valid(out)else []
    def roof_clip(p):
        result=[]
        for panel in panels:
            q=p
            poly=panel['poly']
            for a,c in zip(poly,poly[1:]+poly[:1]):
                dx=c[0]-a[0];dy=c[1]-a[1];q=clip(q,[-dy,dx,0,dy*a[0]-dx*a[1]])
                if not q:break
            if q:
                aa,bb,cc=panel['plane'];q=clip(q,[aa,bb,-1,cc-panel['thickness']])
                if q:result.append(q)
        return result
    def edit_polygons(ob,fn):
        assert not any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name),ob.name
        before=bounds(ob)
        deps=bpy.context.evaluated_depsgraph_get();ev=ob.evaluated_get(deps);mesh=ev.to_mesh();mesh.calc_loop_triangles();layers=list(mesh.uv_layers);names=[l.name for l in layers];mats=list(ob.data.materials);polys=[]
        for tri in mesh.loop_triangles:
            p=[list(ob.matrix_world@mesh.vertices[mesh.loops[i].vertex_index].co)+[v for l in layers for v in l.data[i].uv]for i in tri.loops]
            polys.extend((q,tri.material_index)for q in fn(p)if valid(q))
        ev.to_mesh_clear()
        if not polys:retire(ob);return
        assert all(before[k]-.0001<=v[k]<=before[k+3]+.0001 for p,_ in polys for v in p for k in range(3)),('Clipping expanded a mesh',ob.name)
        inv=ob.matrix_world.inverted();vertices=[];faces=[]
        for p,mi in polys:a=len(vertices);vertices.extend(inv@Vector(v[:3])for v in p);faces.append(tuple(range(a,len(vertices))))
        me=bpy.data.meshes.new(ob.name+' roof coordinated');me.from_pydata(vertices,[],faces)
        for m in mats:me.materials.append(m)
        for name in names:me.uv_layers.new(name=name)
        for face,(p,mi)in zip(me.polygons,polys):
            face.material_index=mi
            for j,i in enumerate(face.loop_indices):
                for k,l in enumerate(me.uv_layers):l.data[i].uv=p[j][3+2*k:5+2*k]
        me.update();ob.modifiers.clear();ob.data=me;mark(ob)
    def north_only(p):return [q]if(q:=clip(p,[0,1,0,-north]))else []
    # Rebuild the main body and entrance gable, preserving all north/link and
    # original/low-garage roof geometry. Retained materials/UVs stay authored.
    for ob in list(scene.objects):
        if ob.type!='MESH':continue
        n=ob.name;bb=bounds(ob)
        if bb[1]>=north-.0001:continue
        roof_part=n.startswith('Proposal | Joined roof ')and any(t in n for t in ('New main hip','Gate gable','Wing east dormer'))
        detail=n in ('Proposal | New main ridge','Proposal | Gate gable ridge')or n.startswith('Proposal | Roof weathering | ')and bb[2]>5.3
        if roof_part or detail:edit_polygons(ob,north_only)
    # A regular roof package: all principal rafters have equal pitch/span.
    for i,p in enumerate(panels):
        poly=p['poly'];plane=p['plane'];size=len(poly)
        def shell(label,top_drop,thickness,mat):
            vv=[(x,y,z_at(plane,x,y)-top_drop)for x,y in poly]+[(x,y,z_at(plane,x,y)-top_drop-thickness)for x,y in poly]
            return b.mesh(label,vv,[tuple(range(size)),tuple(reversed(range(size,2*size)))]+[(j,(j+1)%size,(j+1)%size+size,j+size)for j in range(size)],mat)
        outer=.12 if p['kind']=='pitched'else .20
        shell('roof %02d '%i+p['label'],0,outer,roofmat if p['kind']=='pitched'else flatmat)
        shell('lining %02d '%i+p['label'],outer,p['thickness']-outer,ivory)
        # Cap the narrow apex at the existing finished ceiling datum.
        if p['kind']=='pitched':
            high=half(poly,plane[0],plane[1],plane[2]-p['thickness']-ceiling)
            if high:b.mesh('flat apex ceiling %02d'%i,[(x,y,ceiling)for x,y in high],[tuple(reversed(range(len(high))))],ivory)
    # Strip any earlier flat loft ceiling from the new roof volume. Scribe
    # retained partitions, knee walls and trims to the real roof underside.
    body=[4.72,cfg['southEaveY']-.001,floor,14.19,north,20]
    for ob in list(scene.objects):
        if ob.type!='MESH' or ob in b.objects or ob in changed:continue
        n=ob.name;bb=bounds(ob)
        if bb[0]>=14.19 or bb[3]<=4.72 or bb[1]>=north or bb[4]<=body[1]or bb[5]<=floor+.001:continue
        if n.startswith('Proposal | Joined roof ')or 'Roof weathering'in n or 'Roof drainage'in n:continue
        ceiling_mesh='ceiling'in n.lower() and bb[2]>7.4 and not any(t in n.lower()for t in ('light','diffuser','trim'))
        structure=any(t in n.lower()for t in ('wall','partition','closure','lining','cheek','pier','skirting','headwall'))and not any(t in n.lower()for t in ('bed oak wall','headwall fine','cupboard','wardrobe'))
        if not(ceiling_mesh or structure):continue
        if ob.get('suite_component')=='bed' or n.startswith('Loftsuite 01 | ')and not ceiling_mesh:continue
        # Furniture, window/door frames and remaining external glazing are
        # fitted separately, not accidentally clipped as structural walls.
        if any(t in n.lower()for t in ('window','glass','door','frame detail')):continue
        def cut(p):
            outside=subtract_box(p,body);q=p
            for k in range(3):q=clip(q,[1 if i==k else 0 for i in range(3)]+[-body[k]]);q=clip(q,[-1 if i==k else 0 for i in range(3)]+[body[k+3]])
            return outside+([]if ceiling_mesh or not q else roof_clip(q))
        edit_polygons(ob,cut)
    # Straight, tiled roof abutment. It separates repeatable main-wing rafters
    # from the retained connector and never passes across the walking route.
    old=nav['levelLoftStair']['roof'];oldcx=old['ridgeX'];a,c=cfg['eavesX'];cx=cfg['ridgeX'];rz=cfg['ridgeZ'];ez=cfg['eaveZ'];s=(rz-ez)/(cx-a)
    def old_top(x):
        if old['capX']<=x<=cfg['dormerEastX']:return cfg['dormerRoofZ']
        return rz-(rz-ez)*((oldcx-x)/(oldcx-a)if x<oldcx else(x-oldcx)/(c-oldcx))
    def new_top(x):
        if cfg['dormerWestX']<=x<=cfg['dormerEastX']:return cfg['dormerRoofZ']
        return rz-s*abs(x-cx)
    xs=sorted(set([a,c,oldcx,old['capX'],cx,cfg['dormerWestX'],cfg['dormerEastX']]))
    for x0,x1 in list(zip(xs,xs[1:])):
        d0=old_top(x0+1e-6)-new_top(x0+1e-6);d1=old_top(x1-1e-6)-new_top(x1-1e-6)
        if d0*d1<0:xs.append(x0+(x1-x0)*d0/(d0-d1))
    xs=sorted(xs)
    for i,(x0,x1)in enumerate(zip(xs,xs[1:])):
        p0,p1=x0+1e-6,x1-1e-6;oldz=[old_top(p0),old_top(p1)];newz=[new_top(p0),new_top(p1)]
        if max(abs(x-y)for x,y in zip(oldz,newz))<.002:continue
        low=[min(x,y)-cfg['roofThickness'] for x,y in zip(oldz,newz)];high=[max(x,y)for x,y in zip(oldz,newz)]
        vv=[(x,y,z)for y in(north-.025,north+.025)for x,z in((x0,low[0]),(x1,low[1]),(x1,high[1]),(x0,high[0]))]
        abutment=b.mesh('tiled north abutment %02d'%i,vv,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],hanging)
        abutment.data.materials.append(ivory)
        abutment.data.polygons[1 if sum(oldz)>sum(newz)else 0].material_index=1
        b.tube('north abutment weathering %02d'%i,[(x0,north,high[0]+.01),(x1,north,high[1]+.01)],.018,zinc,2)
    # Ridges and hip caps follow the rebuilt planes exactly.
    sy=cfg['southEaveY']+(c-a)/2
    for label,p0,p1 in [('main ridge',(cx,sy,rz+.015),(cx,north,rz+.015)),('south west hip',(a,cfg['southEaveY'],ez+.015),(cx,sy,rz+.015)),('south east hip',(c,cfg['southEaveY'],ez+.015),(cx,sy,rz+.015))]:b.tube(label,[p0,p1],.038,roofmat,3)
    bay=spec['entranceBay'];mid=sum(bay['y'])/2;meet=a+(bay['ridge_z']-ez)/s
    front=spec['frontWing'][0]-bay['projection_m']-bay['verge_overhang_m']
    b.tube('entrance gable ridge',[(front,mid,bay['ridge_z']+.015),(meet,mid,bay['ridge_z']+.015)],.038,roofmat,3)
    for j,yy in enumerate(bay['y']):b.tube('entrance valley '+str(j),[(a,yy,ez+.012),(meet,mid,bay['ridge_z']+.012)],.024,zinc,2)
    b.tube('dormer west flashing',[(cfg['dormerWestX'],cfg['dormerSouthY']-.10,cfg['dormerRoofZ']+.012),(cfg['dormerWestX'],north,cfg['dormerRoofZ']+.012)],.022,zinc,2)
    b.tube('dormer south drip',[(cfg['dormerWestX'],cfg['dormerSouthY']-.10,cfg['dormerRoofZ']+.012),(cfg['dormerEastX'],cfg['dormerSouthY']-.10,cfg['dormerRoofZ']+.012)],.018,zinc,2)
    x0,x1=cfg['dormerWestX'],cfg['dormerEastX'];yy=cfg['dormerSouthY']-.08
    # The south cheek's apron follows the main east roof pitch, with a short
    # upstand against the vertical tiled cheek and no strip across a rooflight.
    z0,z1=new_top(x0-.00001),rz-s*(x1-cx)
    b.mesh('dormer south cheek apron',[(x0,yy-.13,z0+.016),(x1,yy-.13,z1+.016),(x1,yy,z1+.016),(x0,yy,z0+.016)],[(0,1,2,3)],zinc)
    b.mesh('dormer south cheek upstand',[(x0,yy,z0+.016),(x1,yy,z1+.016),(x1,yy,z1+.13),(x0,yy,z0+.13)],[(0,1,2,3)],zinc)
    b.mesh('dormer west upstand',[(x0+.003,yy,cfg['dormerRoofZ']-.012),(x0+.003,north,cfg['dormerRoofZ']-.012),(x0+.003,north,z0+.025),(x0+.003,yy,z0+.025)],[(0,1,2,3)],zinc)
    # The entrance pendants keep their accepted hanging heights, with their
    # ceiling plates and suspension cables fitted to the new lower slopes.
    bronze=scene.objects['Arrival 01 | pendant ceiling canopy'].data.materials[0]
    cablemat=scene.objects['Arrival 01 | pendant suspension cable'].data.materials[0]
    for ob in list(scene.objects):
        if ob.name.startswith(('Arrival 01 | pendant ceiling canopy','Arrival 01 | pendant canopy fixing','Arrival 01 | pendant suspension cable')):retire(ob)
    for j,(xx,yy,zz)in enumerate(((6.37,-7.62,3.17),(6.73,-7.10,3.60),(6.42,-6.48,4.02))):
        p=max((p for p in panels if inside(xx,yy,p['poly'])),key=lambda p:z_at(p['plane'],xx,yy))
        aa,bb,_=p['plane'];normal=Vector((aa,bb,-1)).normalized();hit=Vector((xx,yy,soffit(panels,xx,yy)))
        canopy=hit+normal*.014;tangent=Vector((1,0,aa)).normalized()
        b.cylinder('entrance pendant ceiling canopy '+str(j),canopy,.055,.026,bronze,normal,40)
        b.tube('entrance pendant suspension '+str(j),[canopy+normal*.015,Vector((xx,yy,zz+.177))],.002,cablemat,2)
        for k,dx in enumerate((-.032,.032)):b.cylinder('entrance pendant fixing %d %d'%(j,k),canopy+tangent*dx+normal*.015,.004,.005,bronze,normal,16)
    # Relocate the bed and its complete headwall/bedside assemblies into the
    # rear dormer's standing-height zone, leaving the window desk in place.
    tr=Matrix.Translation((*cfg['bedHead'],0))@Matrix.Rotation(math.pi/2,4,'Z')@Matrix.Translation((-7.61,7.35,0))
    moved=[]
    fitting=('bed oak wall panel','headwall fine joint','bedside','reading backplate','reading arm','reading shade','reading lens')
    for ob in scene.objects:
        if ob.get('suite_component')=='bed'and ob.name.startswith('Loftsuite 01 | ')or ob.name.startswith('Loft finish | ')and any(ob.name.startswith('Loft finish | '+p)for p in fitting):
            ob.matrix_world=tr@ob.matrix_world;mark(ob);moved.append(ob.name)
    def rect_transform(r):
        pts=[tr@Vector((x,y,0))for x,y in [(r[0],r[1]),(r[2],r[1]),(r[2],r[3]),(r[0],r[3])]];return[min(p.x for p in pts),min(p.y for p in pts),max(p.x for p in pts),max(p.y for p in pts)]
    for values in groups('obstacles'):
        for ob in values:
            if ob['name']=='Loftsuite 01 | complete upholstered double bed'or ob['name'].startswith('Loft finish | bedside cabinet'):ob['box']=rect_transform(ob['box'])
    for ob in nav.get('proposalLights',[]):
        if ob['name']in moved:ob['position']=list(tr@Vector(ob['position']))
    panel=scene.objects['Loft finish | bed oak wall panel']
    edit_polygons(panel,lambda p:[q]if(q:=clip(p,[-1,0,0,11.33]))else [])
    b.box('headboard panel end',(11.329,-9.315,6.295),(.002,.024,1.46),oak)
    # Keep the low furniture under the western eaves, freeing the standing
    # route beside the bed and preserving the window desk.
    def move_fitting(prefixes,transform,obstacle_names=()):
        names=[]
        for ob in scene.objects:
            if any(ob.name.startswith(p)for p in prefixes):
                ob.matrix_world=transform@ob.matrix_world;mark(ob);names.append(ob.name)
        for values in groups('obstacles'):
            for ob in values:
                if ob['name']in obstacle_names:
                    r=ob['box'];points=[transform@Vector((x,y,0))for x,y in((r[0],r[1]),(r[2],r[1]),(r[2],r[3]),(r[0],r[3]))]
                    ob['box']=[min(p.x for p in points),min(p.y for p in points),max(p.x for p in points),max(p.y for p in points)]
        for ob in nav.get('proposalLights',[]):
            if ob['name']in names:ob['position']=list(transform@Vector(ob['position']))
        return names
    move_fitting(('Loft finish | dresser','Loft finish | vase branch'),Matrix.Translation((8.05,-7.7,0))@Matrix.Rotation(-math.pi/2,4,'Z')@Matrix.Translation((-8.82,9.115,0)),('Loft finish | dresser',))
    move_fitting(('Loft finish | window reading chair',),Matrix.Translation((0,3.42,0)),('Loft finish | window reading chair',))
    move_fitting(('Loft finish | reading side table','Loft finish | reading cup'),Matrix.Translation((0,2.85,0)),('Loft finish | reading side table',))
    move_fitting(('Loft finish | desk chair',),Matrix.Translation((0,.20,0)),('Loft finish | desk chair',))
    move_fitting(('Loftsuite 01 | window pier ceramic planter','Loftsuite 01 | planter soil','Loftsuite 01 | plant stem','Loftsuite 01 | plant leaf'),Matrix.Translation((-4.21,1.71,0)),('Loftsuite 01 | window pier planter',))
    for ob in list(scene.objects):
        if ob.name.startswith(('Loft finish | oak artwork','Loft finish | artwork')):retire(ob)
    art=bpy.data.materials['Interior | Loft Finish muted olive artwork']
    b.box('bed artwork oak frame',(10.0,-9.325,7.29),(1.20,.035,.38),oak,.004)
    b.box('bed artwork ivory mount',(10.0,-9.303,7.29),(1.15,.004,.33),ivory)
    b.box('bed artwork colour field',(10.0,-9.300,7.29),(.91,.002,.21),art)
    # Move the complete storage door into the high part of the south hip.
    # Its smaller leaf remains appropriate to eaves storage; all fixed jambs,
    # architraves, stops and animated hardware move as one assembly.
    door_id='Loftsuite 01 | hip store door';door=next(d for d in nav['interactiveDoors']if d['id']==door_id)
    doorway=[]
    for ob in scene.objects:
        if ob.name.startswith(door_id+' ')or door_id in ob.get('frame_doors',[]):
            ob.matrix_world.translation.x+=1.5
            if 'door_hinge'in ob:ob['door_hinge']=[ob['door_hinge'][0]+1.5,*list(ob['door_hinge'])[1:]]
            mark(ob);doorway.append(ob.name)
    door['hinge'][0]+=1.5;door['openingCenter'][0]+=1.5
    aperture=[9.284,-11.91,floor-.03,10.116,-11.49,7.366]
    for ob in list(scene.objects):
        if ob.type=='MESH'and ob.name.startswith('Proposal | Wing dormer south cheek'):
            edit_polygons(ob,lambda p:subtract_box(p,aperture))
    for values in groups('segments'):
        values[:]=[v for v in values if not v['name'].startswith('Proposal | Wing dormer south cheek')]
        for suffix,x0,x1 in(('west',7.48,9.3),('east',10.1,12.6)):
            values.append({'name':'Proposal | Wing dormer south cheek '+suffix,'a':[x0,-11.605],'b':[x1,-11.605],'bottom':floor,'top':7.60,'thickness':.18})
    move_fitting(('Loftsuite 01 | hip store wall light','Loftsuite 01 | hip store wall diffuser','Loftsuite 01 | hip store glow'),Matrix.Translation((1.5,0,0)))
    move_fitting(('Loftsuite 01 | concealed WC','Loftsuite 01 | cistern','Loftsuite 01 | open wall-hung WC','Loftsuite 01 | WC ','Loftsuite 01 | open WC','Loftsuite 01 | dual flush','Loftsuite 01 | toilet roll'),Matrix.Translation((.25,0,0)),('Loftsuite 01 | WC pan','Loftsuite 01 | WC cistern'))
    # Update all current route/view records together; legacy route snapshots
    # remain documentation only.
    bedroom_route=[*cfg['suiteRoute'],[10.35,-6.80,floor],[11.40,-6.80,floor],[11.40,-7.60,floor],[11.82,-7.60,floor],[11.82,-9.0,floor],[11.82,-9.40,floor],[11.82,-9.95,floor],[11.20,-9.95,floor],[10.9,-10.30,floor],[10.65,-10.35,floor]]
    nav['loftBedroomFinish']['route']=bedroom_route;nav['loftBedroomExpansion']['route']=bedroom_route
    nav['loftBedroomFinish']['roofRevision']=REVISION
    for view in nav['rooms']:
        if view.get('id')=='proposal-loft-hip-store':view.update(position=[9.70,-11.96,floor],direction=[0,-1,-.30])
    # Record the north-end turn rather than directing the visitor under the
    # lower western slope. The unchanged stair remains in the original house.
    report={'revision':REVISION,'configuration':cfg,'mainRoofPitchDegrees':math.degrees(math.atan(s)),'ridgeX':cx,'ridgeZ':rz,'connectorRoofRetained':True,'frontDormerAdded':False,'floorLevelChanged':False,'courtyardFacadeChanged':False,'removed':removed,'changed':[o.name for o in changed],'created':[o.name for o in b.objects],'movedBedAssembly':moved,'roofPanels':panels,'suiteRoute':cfg['suiteRoute'],'published':False}
    nav['symmetricWingRoof']=report;nav['levelLoftStair']['upperRoutes']['suite']=[*nav['levelLoftStair']['upperRoutes']['suite'][:-1],*cfg['suiteRoute']]
    for key in ['segments','obstacles','surfaces','proposalLights']:
        for values in groups(key):values[:]=[o for o in values if o.get('name')not in removed]
    b.finish(report)
    for ob in finish_symmetric_wing_solids(ns,panels):mark(ob)
    report['changed']=[o.name for o in changed];report['closedRoofScribedWalls']=True
    scene['symmetric_wing_revision']=REVISION;scene['symmetric_wing_report']=json.dumps(report)
    bpy.context.view_layer.update();return changed+b.objects,report

if 'scene'in globals()and 'nav'in globals()and globals().get('VARIANT')in('compact','planning'):
    apply_symmetric_wing_roof(globals())
