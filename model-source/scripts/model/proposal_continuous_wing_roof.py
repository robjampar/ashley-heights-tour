"""Owner-directed continuous wing roof and restored loft courtyard projection."""
import json,math,re
from scripts.geometry.continuous_roof import envelope,soffit
from scripts.geometry.symmetric_roof import half,inside,z_at
REVISION='continuous-wing-roof-2026-10-26'
PREFIX='Continuous wing | '

def apply_continuous_wing_roof(ns):
    import bpy,bmesh
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.model.proposal_level_loft import subtract_box
    scene,nav,root=ns['scene'],ns['nav'],ns['ROOT']
    if scene.get('continuous_wing_revision')==REVISION:return [],json.loads(scene['continuous_wing_report'])
    bpy.context.view_layer.update()
    cfg=json.loads((root/'proposal/specs/continuous-wing-roof.json').read_text());panels=envelope(cfg);closed=envelope(cfg,False)
    b=RoomBuilder(ns,'continuous wing roof',PREFIX,'P45 Continuous wing roof and loft overhang')
    ivory=bpy.data.materials['Interior | Landings warm ivory'];oak=bpy.data.materials['Interior | Landings natural oak']
    roofmat=scene.objects['Symmetric wing | roof 00 west slope'].data.materials[0]
    flat=bpy.data.materials['Proposal | Bronze black frames'];zinc=bpy.data.materials['Proposal | Patinated zinc flashings']
    owners={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    changed=[];removed=[];moved=[]
    def bounds(ob):
        p=[ob.matrix_world@Vector(v)for v in ob.bound_box];return[min(v[k]for v in p)for k in range(3)]+[max(v[k]for v in p)for k in range(3)]
    def mark(ob):
        if ob not in changed:changed.append(ob)
    def retire(ob):
        removed.append(ob.name)
        for c in tuple(ob.users_collection):
            if c in owners:c.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def groups(key):
        values=[nav.setdefault(key,[])];other=ns.get('new_'+key)
        if other is not None and all(other is not v for v in values):values.append(other)
        return values
    def uv_mesh(ob,vertices,faces,materials):
        assert not any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name),ob.name
        inv=ob.matrix_world.inverted();me=bpy.data.meshes.new(ob.name+' continuous roof fit');me.from_pydata([inv@Vector(v)for v in vertices],[],faces)
        for mat in materials:me.materials.append(mat)
        me.update();bm=bmesh.new();bm.from_mesh(me);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(me);bm.free();me.update()
        uv=me.uv_layers.new(name='UVMap')
        for face in me.polygons:
            n=face.normal;axes=(0,1)if abs(n.z)>.6 else(1,2)if abs(n.x)>abs(n.y)else(0,2)
            for loop in face.loop_indices:
                p=ob.matrix_world@me.vertices[me.loops[loop].vertex_index].co;uv.data[loop].uv=(p[axes[0]],p[axes[1]])
        ob.modifiers.clear();ob.data=me;mark(ob);return ob
    def extrude(ob,poly,z0,z1,mat):
        count=len(poly);return uv_mesh(ob,[(x,y,z)for z in(z0,z1)for x,y in poly],[tuple(reversed(range(count))),tuple(range(count,2*count))]+[(i,(i+1)%count,(i+1)%count+count,i+count)for i in range(count)],[mat])
    def valid(p):
        if len(p)<3:return False
        a=Vector(p[0][:3]);return any((Vector(p[i][:3])-a).cross(Vector(p[i+1][:3])-a).length>1e-9 for i in range(1,len(p)-1))
    def clip(p,plane):
        result=[]
        for a,c in zip(p,p[1:]+p[:1]):
            da=sum(a[k]*plane[k]for k in range(3))+plane[3];dc=sum(c[k]*plane[k]for k in range(3))+plane[3]
            if da>=-1e-8:result.append(a)
            if(da>=-1e-8)!=(dc>=-1e-8):
                t=max(0.,min(1.,da/(da-dc)));result.append([x+t*(y-x)for x,y in zip(a,c)])
        return result if valid(result)else[]
    def edit(ob,fn):
        assert not any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name),ob.name
        bb=bounds(ob);deps=bpy.context.evaluated_depsgraph_get();ev=ob.evaluated_get(deps);mesh=ev.to_mesh();mesh.calc_loop_triangles();layers=list(mesh.uv_layers);names=[l.name for l in layers];materials=list(ob.data.materials);polys=[]
        for tri in mesh.loop_triangles:
            p=[list(ob.matrix_world@mesh.vertices[mesh.loops[i].vertex_index].co)+[v for l in layers for v in l.data[i].uv]for i in tri.loops]
            polys.extend((q,tri.material_index)for q in fn(p)if valid(q))
        ev.to_mesh_clear()
        if not polys:retire(ob);return
        assert all(bb[k]-.0001<=v[k]<=bb[k+3]+.0001 for p,_ in polys for v in p for k in range(3)),('Clipping expanded mesh',ob.name)
        inv=ob.matrix_world.inverted();vertices=[];faces=[]
        for p,_ in polys:start=len(vertices);vertices.extend(inv@Vector(v[:3])for v in p);faces.append(tuple(range(start,len(vertices))))
        me=bpy.data.meshes.new(ob.name+' continuous roof trimmed');me.from_pydata(vertices,[],faces)
        for mat in materials:me.materials.append(mat)
        for name in names:me.uv_layers.new(name=name)
        for face,(p,mi)in zip(me.polygons,polys):
            face.material_index=mi
            for j,i in enumerate(face.loop_indices):
                for k,l in enumerate(me.uv_layers):l.data[i].uv=p[j][3+2*k:5+2*k]
        me.update();ob.modifiers.clear();ob.data=me;mark(ob)
    def move(ob,dx=0,dy=0):
        ob.matrix_world.translation+=Vector((dx,dy,0));mark(ob);moved.append(ob.name)
        if 'door_hinge'in ob:ob['door_hinge']=[ob['door_hinge'][0]+dx,ob['door_hinge'][1]+dy,ob['door_hinge'][2]]
        for values in groups('proposalLights'):
            for light in values:
                if light['name']==ob.name:light['position'][0]+=dx;light['position'][1]+=dy
    # Reuse the two complete rooflights at the new flat-cap position.
    light_names=[]
    for ob in list(scene.objects):
        n=ob.name
        if re.match(r'Proposal \| Level loft \| \d+ Retained rooflight [01] ',n)or n.startswith(('Proposal | Roof weathering | Central loft link ','Proposal | Roof weathering | Original loft stair ')):
            move(ob,cfg['rooflightShiftX']);light_names.append(n)
    # Rebuild the old offset connector, including the original roof portions
    # revealed by the centred ridge. The measured original-house planes stay.
    cutbox=[4.73,-5.,4.9,14.25,cfg['ridgeEndY'],9.0]
    for ob in list(scene.objects):
        if ob.type!='MESH'or ob.name in light_names:continue
        n=ob.name;bb=bounds(ob)
        if n.startswith(('Symmetric wing | tiled north abutment','Symmetric wing | north abutment weathering'))or n=='Proposal | New main ridge':retire(ob);continue
        if n.startswith('Proposal | Roof weathering | valley ')and bb[4]>-5 and bb[0]<10:retire(ob);continue
        if n.startswith('Proposal | Roof weathering | full dormer front apron ')and bb[0]>4.73 and bb[3]<10.52:retire(ob);continue
        target=n.startswith('Proposal | Joined roof ')or n.startswith(('Proposal | Roof weathering | wing dormer','Proposal | Roof weathering | Wing dormer north drip'))
        if target and all(bb[k]<cutbox[k+3]-1e-7 and bb[k+3]>cutbox[k]+1e-7 for k in range(3)):
            edit(ob,lambda p:subtract_box(p,cutbox))
    for i,p in enumerate(panels):
        poly=p['poly'];count=len(poly);outer=.20 if p['kind']=='flat'else .13 if p['kind']=='original'else .12
        for label,drop,thickness,mat in(('roof',0,outer,flat if p['kind']=='flat'else roofmat),('lining',outer,p['thickness']-outer,ivory)):
            vertices=[(x,y,z_at(p['plane'],x,y)-drop-d)for d in(0,thickness)for x,y in poly]
            ob=b.mesh(label+' %02d '%i+p['label'],vertices,[tuple(range(count)),tuple(reversed(range(count,2*count)))]+[(j,(j+1)%count,(j+1)%count+count,j+count)for j in range(count)],mat)
        if p['kind']!='flat':
            high=half(poly,p['plane'][0],p['plane'][1],p['plane'][2]-p['thickness']-cfg['ceilingZ'])
            if high:b.mesh('flat ceiling %02d'%i,[(x,y,cfg['ceilingZ'])for x,y in high],[tuple(reversed(range(len(high))))],ivory)
    b.tube('continuous main ridge',[(cfg['ridgeX'],-5,cfg['ridgeZ']+.015),(cfg['ridgeX'],cfg['ridgeEndY'],cfg['ridgeZ']+.015)],.038,roofmat,3)
    # A single straight valley joins the retained original front roof.
    s=(cfg['ridgeZ']-cfg['eaveZ'])/(cfg['ridgeX']-cfg['eavesX'][0]);orig=cfg['originalRoofTop'];q=(orig[4][2]-orig[0][2])/(orig[4][1]-orig[0][1])
    x0=cfg['eavesX'][0];x1=cfg['ridgeX'];y0=orig[0][1];y1=cfg['ridgeEndY']
    b.tube('original roof west valley',[(x0,y0,cfg['eaveZ']+.014),(x1,y1,cfg['ridgeZ']+.014)],.025,zinc,2)
    b.tube('aligned dormer west weathering',[(9.55,-5,7.875),(9.55,cfg['capNorthY'],7.875)],.022,zinc,2)
    b.tube('aligned dormer east drip',[(cfg['capEastX'],-2.829,7.875),(cfg['capEastX'],cfg['capNorthY'],7.875)],.018,zinc,2)
    b.tube('dormer north return drip',[(cfg['capEastX'],-2.829,7.875),(12.72,-2.829,7.875)],.018,zinc,2)
    b.box('dormer to original ridge upstand',((cfg['dormerWestX']+cfg['capEastX'])/2,cfg['capNorthY'],(cfg['dormerRoofZ']+cfg['ridgeZ'])/2),(cfg['capEastX']-cfg['dormerWestX'],.03,cfg['ridgeZ']-cfg['dormerRoofZ']),zinc)
    # Only the top storey projects. Lower glazing and accepted gym stay put.
    dx=cfg['facadeX']-cfg['previousFacadeX'];facade=[]
    for ob in list(scene.objects):
        n=ob.name;bb=bounds(ob)if ob.type=='MESH'else None
        if bb and n.startswith('Proposal | Level loft | ')and 'Flush courtyard'in n and bb[2]>5.54:
            move(ob,dx);facade.append(n)
        elif n=='Proposal | Level loft | 071 Flush storey closure':move(ob,dx);facade.append(n)
        elif n=='Proposal | Level loft | 072 North loft return':retire(ob)
    # The old return and rainwater run occupied the reinstated gallery.
    # Keep the cheek outside the new face and reconnect to the existing gully.
    for ob in list(scene.objects):
        n=ob.name
        if n in ('Proposal | North east elevation closure 0','Proposal | Wing dormer north cheek storey band'):
            edit(ob,lambda p:[clip(p,[1,0,0,-cfg['facadeX']])])
        if n in ('Proposal | Roof drainage | wing dormer link east gutter','Proposal | Roof drainage | garden high connector outlet hopper','Proposal | Roof drainage | garden high connector pipe 00','Proposal | Roof drainage | garden high connector pipe 01'):move(ob,dx)
        if n=='Proposal | Roof drainage | garden high connector pipe 02':
            mat=ob.data.materials[0];retire(ob)
            b.tube('garden connector offset',[(10.55,-2.979,2.43),(10.62,-2.969,2.43)],.0375,mat,12)
    for values in groups('segments'):
        for v in values:
            if v['name']in('Proposal | Wing dormer north cheek','Proposal | Wing dormer north cheek storey band'):v['a'][0]=cfg['facadeX']
    # Retained slab names remain editable, with a single closed outline.
    outline=[[8.47,-5.3],[10.5,-5.3],[10.5,-3.03],[10.42,-3.03],[10.42,-.115],[10.5,-.115],[10.5,4.95],[8.47,4.95]]
    extrude(scene.objects['Proposal | Level loft | 027 Same-level loft deck'],outline,5.35,5.55,oak)
    extrude(scene.objects['Proposal | Level loft | 031 Retained first-floor ceiling elevat'],outline,5.25,5.35,ivory)
    # Fill the widened gallery floor in navigation at its original datum.
    for values in groups('surfaces'):
        values.append({'name':PREFIX+'restored loft overhang','polygon':[[9.7,-3.03],[10.42,-3.03],[10.42,-.115],[9.7,-.115]],'z':5.55})
    for values in groups('planRooms'):
        values.append({'name':'Restored loft gallery','floor':3,'base_z':5.55,'polygon_m':[[9.7,-3.03],[10.42,-3.03],[10.42,-.115],[9.7,-.115]],'proposal':True})
    for values in groups('segments'):
        for v in values:
            if v['name']=='Proposal | Level loft | flush courtyard facade'and v['bottom']>5.5:
                v['a'][0]+=dx;v['b'][0]+=dx
    # Remove the obsolete wide flat ceiling; keep its part over the original
    # north room. The new slopes/cap provide their own continuous lining.
    ceilingcut=[4.73,-5,7.4,14.25,cfg['ridgeEndY'],8.3]
    for ob in list(scene.objects):
        n=ob.name
        if n=='Proposal | Level loft | 000 Continuous 2.05 m flat loft ceiling'or n=='Loft finish | gallery ceiling east plaster closure':edit(ob,lambda p:subtract_box(p,ceilingcut))
    # Scribe existing local partitions to the roof while retaining closed
    # solids. A shared grid makes roof-plane transitions continuous.
    def roof_fit_box(ob,bb):
        x0,y0,z0,x1,y1,z1=bb;xs={x0,x1};ys={y0,y1}
        for p in closed:
            for x,y in p['poly']:
                if x0<x<x1:xs.add(x)
                if y0<y<y1:ys.add(y)
        for x in(x0,x1):
            yy=(cfg['ridgeZ']-s*(cfg['ridgeX']-x)-.35+.25-orig[0][2])/q+orig[0][1]
            if y0<yy<y1:ys.add(yy)
        xs=sorted(xs);ys=sorted(ys);ny=len(ys);nx=len(xs);vertices=[]
        def top(x,y):
            roof=closed if y>=cfg['southY']else nav['symmetricWingRoof']['roofPanels']
            h=soffit(roof,x,min(y,cfg['ridgeEndY']-1e-6));return max(z0+.001,min(z1,h if h is not None else z1))
        for upper in(False,True):vertices.extend((x,y,top(x,y)if upper else z0)for x in xs for y in ys)
        total=nx*ny;faces=[]
        for i in range(nx-1):
            for j in range(ny-1):
                a=i*ny+j;quad=[a,a+ny,a+ny+1,a+1];faces.extend([tuple(reversed(quad)),tuple(v+total for v in quad)])
        perimeter=[i*ny for i in range(nx)]+[(nx-1)*ny+j for j in range(1,ny)]+[i*ny+ny-1 for i in reversed(range(nx-1))]+[j for j in reversed(range(1,ny-1))]
        faces.extend((a,c,c+total,a+total)for a,c in zip(perimeter,perimeter[1:]+perimeter[:1]))
        return uv_mesh(ob,vertices,faces,list(ob.data.materials))
    roof_walls=[]
    old_heads={
        'Proposal | Continued roof old front west return head 0',
        'Proposal | North west elevation closure 0',
        'Proposal | Courtyard upper wall pitched head',
        'Proposal | Junction finish | eaves pocket continuous plaster fa',
        'Proposal | Junction finish | stair to eaves scribed plaster ret',
    }
    for ob in list(scene.objects):
        if ob.type!='MESH':continue
        n=ob.name;bb=bounds(ob)
        if n=='Proposal | North west elevation closure 1':retire(ob);continue
        if n in old_heads or (n.startswith('Proposal | Level loft | ')and 'Scribed west loft lining'in n)or n in('Proposal | Loft bedroom expansion | stair-side bedroom partitio','Proposal | Loft bedroom expansion | bedroom south shaft return'):
            roof_fit_box(ob,bb);roof_walls.append(n)
    # Retain the six-door eaves store as low, fitted cabinetry. Every carcass
    # panel follows the new pitch; the usable gallery stays beside it.
    def box(ob,bb):return extrude(ob,[(bb[0],bb[1]),(bb[3],bb[1]),(bb[3],bb[4]),(bb[0],bb[4])],bb[2],bb[5],ob.data.materials[0])
    def cabinet_top(x):return soffit(closed,x,-2.0)-.025
    for ob in list(scene.objects):
        if ob.type!='MESH'or not ob.name.startswith('Eaves storage | '):continue
        n=ob.name;bb=bounds(ob);x0,y0,z0,x1,y1,z1=bb
        if 'oak back'in n or 'scribed oak side'in n:
            roof_fit_box(ob,[x0,y0,z0,x1,y1,z1]);me=ob.data
            for v in me.vertices:
                p=ob.matrix_world@v.co
                if p.z>z0+.002:p.z-=.025;v.co=ob.matrix_world.inverted()@p
        elif 'sloping oak lid'in n:
            vertices=[(x,y,cabinet_top(x)-d)for d in(.018,0)for x,y in((x0,y0),(x1,y0),(x1,y1),(x0,y1))]
            uv_mesh(ob,vertices,[(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],list(ob.data.materials))
        elif 'adjustable oak shelf'in n:
            level=min(range(3),key=lambda i:abs(z0-(6.01+i*.46)));z0=5.83+.20*level;z1=z0+.018
            x0=max(6.218,cfg['ridgeX']-(cfg['ridgeZ']-.35-z1-.035)/s)
            box(ob,[x0,y0,z0,x1,y1,z1])
        elif 'flush ivory door'in n:box(ob,[x0,y0,z0,x1,y1,6.405])
        elif 'concealed hinge plate'in n:
            old=(z0+z1)/2;level=min(range(3),key=lambda i:abs(old-(5.78+i*.815)));new=[5.78,6.0225,6.285][level]
            ob.matrix_world.translation.z+=new-old;mark(ob)
        elif 'top scribed frieze'in n:box(ob,[x0,y0,6.408,x1,y1,6.425])
        elif 'end filler'in n:box(ob,[x0,y0,z0,x1,y1,6.425])
    for values in groups('obstacles'):
        for v in values:
            if v['name']=='Eaves storage | built-in eaves cupboards':v['top']=6.44
    # Shift the complete suite doorway into the full-height strip. The closed
    # cross-wall incorporates the former opening and a real new aperture.
    door=next(d for d in nav['interactiveDoors']if d['id']=='Proposal | Level loft | suite door');door_dx=cfg['suiteDoorX']-door['openingCenter'][0];door_objects=[]
    for ob in list(scene.objects):
        n=ob.name
        if re.match(r'Proposal \| Loft bedroom expansion \| 0(7[3-9]|8[0-9]) ',n)or door['id']in ob.get('frame_doors',[]):move(ob,door_dx);door_objects.append(n)
        elif n.startswith('Proposal | Loft bedroom expansion | ')and any(v in n for v in('entrance left pier','entrance right pier','entrance dormer junction','entrance lintel','oak skirting right pier')):retire(ob)
    door['hinge'][0]+=door_dx;door['openingCenter'][0]+=door_dx
    left,right=9.405,10.295;top_at=lambda x:min(7.64,soffit(closed,x,-3.22));apex=cfg['ridgeX']-(cfg['ridgeZ']-.35-7.64)/s
    profile=[(8.49,5.55),(left,5.55),(left,7.631),(right,7.631),(right,5.55),(10.42,5.55),(10.42,7.64),(apex,7.64),(8.49,top_at(8.49))]
    count=len(profile);vertices=[(x,y,z)for y in(-3.27,-3.17)for x,z in profile];faces=[tuple(reversed(range(count))),tuple(range(count,2*count))]+[(i,(i+1)%count,(i+1)%count+count,i+count)for i in range(count)]
    entry=b.mesh('suite entrance continuous partition',vertices,faces,ivory);uv_mesh(entry,vertices,faces,[ivory])
    for values in groups('segments'):
        values[:]=[v for v in values if not v['name'].startswith('Proposal | Loft bedroom expansion | entrance ')]
        for label,x0,x1 in(('west',8.49,left),('east',right,10.42)):values.append({'name':PREFIX+'suite entry '+label,'a':[x0,-3.22],'b':[x1,-3.22],'bottom':5.55,'top':7.64,'thickness':.10})
    for label,x0,x1 in(('west',8.55,left-.05),('east',right+.05,10.42)):
        b.box('entry skirting '+label,((x0+x1)/2,-3.282,5.604),(x1-x0,.024,.08),oak)
    for ob in list(scene.objects):
        n=ob.name;bb=bounds(ob)if ob.type=='MESH'else None
        if bb and((n.startswith('Loftsuite 01 | ')and bb[0]>9.9 and bb[1]>-3.9 and bb[4]<-3.25)or n=='Loft finish | wardrobe fitted ceiling filler'):move(ob,cfg['wardrobeShiftX'])
        if n.startswith('Proposal | Loft bedroom expansion | ceiling light ')and n.endswith(' 0'):move(ob,cfg['galleryRouteX']-9.08)
        if n=='Proposal | Loft bedroom expansion | ceiling glow 0':move(ob,cfg['galleryRouteX']-9.08)
    for values in groups('obstacles'):
        for v in values:
            if 'wardrobe'in v['name'].lower()and v['name'].startswith('Loftsuite 01 | '):v['box'][0]+=.4;v['box'][2]+=.4
    for values in groups('proposalLights'):
        for v in values:
            if v['name']=='Proposal | Loft bedroom expansion | ceiling glow 0':v['position'][0]=cfg['galleryRouteX']
    for d in nav['interactiveDoors']:
        if d['id']=='Hobby 01 | east eaves door':d['openDelta']=math.pi/2
    # All active circulation and saved views follow the shifted, level route.
    route=[[5.05,4.75,5.55],[5.05,5.05,5.55],[9.74,5.05,5.55],[9.74,.3,5.55],[9.74,-2.6,5.55],[9.85,-3.6,5.55],[9.85,-4.35,5.55],[10.35,-4.35,5.55],[10.35,-6.6,5.55]]
    nav['levelLoftStair']['upperRoutes']['suite']=route
    for key in('loftBedroomFinish','loftBedroomExpansion'):
        oldroute=nav[key]['route'];tail=next(i for i,p in enumerate(oldroute)if p[1]<=-6.8);nav[key]['route']=route[3:]+oldroute[tail:]
    for r in nav['rooms']:
        if r.get('id')in('proposal-loft-level-gallery','proposal-original-loft-bridge'):r.update(position=[9.74,1.1,5.55],direction=[0,-1,-.05])
        if r.get('id')=='proposal-new-loft-landing':r.update(position=[9.74,-2.4,5.55],direction=[0,-1,-.04])
        if r.get('id')=='proposal-eaves-storage':r.update(position=[9.74,-2.1,5.55],direction=[-1,0,-.35])
    for key in('segments','obstacles','surfaces','proposalLights'):
        for values in groups(key):values[:]=[v for v in values if v.get('name')not in removed]
    changed_names=[o.name for o in changed]
    junction_changed,junction_removed,junction_created=finish_continuous_wing_junctions(ns)
    changed[:]=[scene.objects[n]for n in changed_names if n in scene.objects]
    for ob in junction_changed:mark(ob)
    removed.extend(junction_removed);b.objects.extend(junction_created)
    if 'planningApplication'in nav:
        for key,role in(('matching_roof_objects','roof'),('tile_hung_dormer_objects','dormer')):
            nav['planningApplication'][key]=sorted({n for n in nav['planningApplication'][key]if n in scene.objects}|{o.name for o in b.objects if o.type=='MESH'and any(m.get('appearance_role')==role for m in o.data.materials)})
        scene['planning_report']=json.dumps(nav['planningApplication'])
    report={'revision':REVISION,'configuration':cfg,'roofPanels':panels,'closedRoofPanels':closed,'pitchDegrees':math.degrees(math.atan(s)),'ridgeX':cfg['ridgeX'],'ridgeEndY':cfg['ridgeEndY'],'loftOverhangM':dx,'loftFacadeX':cfg['facadeX'],'floorLevelChanged':False,'lowerGlazingChanged':False,'stairChanged':False,'frontDormerAdded':False,'connectorStepRemoved':True,'suiteRoute':route,'movedRooflights':light_names,'movedFacade':facade,'movedDoor':door_objects,'roofFittedWalls':roof_walls,'changed':[o.name for o in changed],'removed':removed,'created':[o.name for o in b.objects],'published':False}
    nav['continuousWingRoof']=report;b.finish(report);scene['continuous_wing_revision']=REVISION;scene['continuous_wing_report']=json.dumps(report)
    bpy.context.view_layer.update();return changed+b.objects,report

def finish_continuous_wing_junctions(ns):
    """Close the retained ceiling seam and finish the restored slab edge."""
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.model.proposal_level_loft import subtract_box
    scene=ns['scene']
    if scene.get('continuous_wing_junctions_finished'):return [],[],[]
    b=RoomBuilder(ns,'continuous wing junctions',PREFIX,'P45 Continuous wing roof and loft overhang')
    ivory=bpy.data.materials['Interior | Landings warm ivory'];metal=bpy.data.materials['Proposal | Bronze black frames']
    changed=[];removed=[];owners={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    def retire(ob):
        removed.append(ob.name)
        for c in tuple(ob.users_collection):
            if c in owners:c.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    cut=[7.3,4.40500020980835,7.59,10.42,4.95,7.63]
    for ob in list(scene.objects):
        if ob.type!='MESH':continue
        if ob.name in ('Proposal | Level loft | 027 Same-level loft deck','Proposal | Level loft | 031 Retained first-floor ceiling elevat'):
            inv=ob.matrix_world.inverted()
            for v in ob.data.vertices:
                p=ob.matrix_world@v.co;p.x=min(p.x,10.42);v.co=inv@p
            changed.append(ob)
        if not(ob.name.startswith('Proposal | Joined roof lining')or ob.name in ('Proposal | Level loft | 000 Continuous 2.05 m flat loft ceiling','Loft finish | gallery ceiling east plaster closure')):continue
        points=[ob.matrix_world@Vector(v)for v in ob.bound_box];lo=[min(p[k]for p in points)for k in range(3)];hi=[max(p[k]for p in points)for k in range(3)]
        if lo[2]<7.59 or hi[2]>7.63 or any(lo[k]>=cut[k+3]-1e-7 or hi[k]<=cut[k]+1e-7 for k in range(3)):continue
        assert not any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name)
        ev=ob.evaluated_get(bpy.context.evaluated_depsgraph_get());mesh=ev.to_mesh();mesh.calc_loop_triangles();layers=list(mesh.uv_layers);names=[l.name for l in layers];materials=list(ob.data.materials);polys=[]
        for tri in mesh.loop_triangles:
            p=[list(ob.matrix_world@mesh.vertices[mesh.loops[i].vertex_index].co)+[v for l in layers for v in l.data[i].uv]for i in tri.loops]
            for q in subtract_box(p,cut):
                if len(q)>=3 and any((Vector(q[i][:3])-Vector(q[0][:3])).cross(Vector(q[i+1][:3])-Vector(q[0][:3])).length>1e-9 for i in range(1,len(q)-1)):polys.append((q,tri.material_index))
        ev.to_mesh_clear()
        if not polys:retire(ob);continue
        inv=ob.matrix_world.inverted();vs=[];faces=[]
        for p,_ in polys:start=len(vs);vs.extend(inv@Vector(v[:3])for v in p);faces.append(tuple(range(start,len(vs))))
        me=bpy.data.meshes.new(ob.name+' clean ceiling join');me.from_pydata(vs,[],faces)
        for mat in materials:me.materials.append(mat)
        for name in names:me.uv_layers.new(name=name)
        for face,(p,mi)in zip(me.polygons,polys):
            face.material_index=mi
            for j,i in enumerate(face.loop_indices):
                for k,l in enumerate(me.uv_layers):l.data[i].uv=p[j][3+2*k:5+2*k]
        me.update();ob.modifiers.clear();ob.data=me;changed.append(ob)
    b.box('north ceiling continuous plaster',(8.86,(4.40500020980835+4.95)/2,7.61),(3.12,4.95-4.40500020980835,.02),ivory)
    b.box('courtyard bronze slab fascia',(10.431,(-3.03-.115)/2,5.45),(.022,3.03-.115,.20),metal)
    for y in(-3.03,-.115):b.box('courtyard bronze fascia return',(10.405,y,5.45),(.074,.018,.20),metal)
    scene['continuous_wing_junctions_finished']=True
    bpy.context.view_layer.update();return changed,removed,b.objects

if 'scene'in globals()and 'nav'in globals()and globals().get('VARIANT')in('compact','planning'):
    apply_continuous_wing_roof(globals())
