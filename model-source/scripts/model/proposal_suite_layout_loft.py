"""Refine the combined suite, furnish the recovered loft and unify balcony joinery."""
import json,math,re
REVISION='suite-layout-and-loft-use-2026-10-22'
PREFIX='Suite refinement | '
OLD='Proposal | Original house loft stair | '
FURN='Combined suite 01 | '

def apply_suite_layout_loft(ns):
    import bpy,bmesh
    from mathutils import Vector,Matrix
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.model.proposal_level_loft import subtract_box
    from scripts.model.modern_loft_stair import oak_grain
    from scripts.geometry.blender_booleans import BooleanWorkspace
    scene,nav=ns['scene'],ns['nav']
    if scene.get('suite_layout_loft_revision')==REVISION:return [],json.loads(scene['suite_layout_loft_report'])
    cfg=json.loads((ns['ROOT']/'proposal/specs/suite-layout-loft-use.json').read_text())
    b=RoomBuilder(ns,'suite layout and loft',PREFIX,'P39 Suite layout loft and balcony')
    owners=set(scene.collection.children_recursive);removed=[];changed=[];replacements={}
    def bounds(ob):
        p=[ob.matrix_world@Vector(v)for v in ob.bound_box]
        return [min(q[k]for q in p)for k in range(3)]+[max(q[k]for q in p)for k in range(3)]
    def retire(ob):
        removed.append(ob.name)
        for col in tuple(ob.users_collection):
            if col in owners:col.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def trim(ob,cut):
        old=ob
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            world=old.matrix_world.copy();ob=old.copy();ob.data=old.data.copy();ob.name='Proposal revision | '+old.name;ob['source_name']=ob.name;ob.parent=None;ob.matrix_world=world
            for col in tuple(old.users_collection):
                if col in owners:col.objects.unlink(old);col.objects.link(ob)
            replacements[old.name]=ob.name
        else:ob.data=ob.data.copy()
        deps=bpy.context.evaluated_depsgraph_get();ev=ob.evaluated_get(deps);me=ev.to_mesh();bm=bmesh.new();bm.from_mesh(me);solid=bool(bm.faces)and all(e.is_manifold for e in bm.edges);bm.free()
        mats=[s.material for s in ob.material_slots]
        if solid:
            result=bpy.data.meshes.new_from_object(ev,preserve_all_data_layers=True,depsgraph=deps);ev.to_mesh_clear();ob.modifiers.clear();ob.data=result
            for i,m in enumerate(mats):result.materials[i]=m
            x,y,z,X,Y,Z=cut;v=[(x,y,z),(X,y,z),(X,Y,z),(x,Y,z),(x,y,Z),(X,y,Z),(X,Y,Z),(x,Y,Z)]
            mesh=bpy.data.meshes.new('Suite opening cutter');mesh.from_pydata(v,[],[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]);mesh.update();tool=bpy.data.objects.new(mesh.name,mesh)
            try:
                with BooleanWorkspace([tool])as w:w.difference(ob,[tool],'Wider internal suite connection')
            finally:
                bpy.data.objects.remove(tool,do_unlink=True)
                if not mesh.users:bpy.data.meshes.remove(mesh)
        else:
            me.calc_loop_triangles();uv=list(me.uv_layers);world=ob.matrix_world;polys=[]
            for tri in me.loop_triangles:
                p=[list(world@me.vertices[me.loops[i].vertex_index].co)+[v for layer in uv for v in layer.data[i].uv]for i in tri.loops]
                polys.extend((q,tri.material_index)for q in subtract_box(p,cut)if len(q)>2)
            names=[layer.name for layer in uv];ev.to_mesh_clear();inv=world.inverted();vs=[];fs=[]
            for p,mi in polys:
                a=len(vs);vs.extend(inv@Vector(v[:3])for v in p);fs.append(tuple(range(a,len(vs))))
            result=bpy.data.meshes.new(ob.name+' refined');result.from_pydata(vs,[],fs)
            for m in mats:result.materials.append(m)
            for name in names:result.uv_layers.new(name=name)
            for face,(p,mi)in zip(result.polygons,polys):
                face.material_index=mi
                for j,i in enumerate(face.loop_indices):
                    for k,layer in enumerate(result.uv_layers):layer.data[i].uv=p[j][3+k*2:5+k*2]
            result.update();ob.modifiers.clear();ob.data=result
        if not ob.data.polygons:retire(ob);return
        ob['suite_layout_loft_revision']=REVISION;changed.append(ob)
    def groups(key,pending=None):
        result=[nav.setdefault(key,[])];other=ns.get(pending or 'new_'+key)
        if other is not None and all(other is not x for x in result):result.append(other)
        return result
    def add(key,item,pending=None):ns.get(pending or 'new_'+key,nav.setdefault(key,[])).append(item)
    m={k:bpy.data.materials['Interior | Sidebed '+name]for k,name in {'oak':'natural oak','stone':'honed limestone','ivory':'warm ivory','white':'cotton bedding','linen':'ivory upholstery','taupe':'woven taupe','carpet':'warm wool carpet','ceramic':'ivory ceramic','bronze':'satin bronze','dark':'recess and drain','mirror':'mirror glass','light':'warm diffuser'}.items()}
    ivory=bpy.data.materials['Interior | Landings warm ivory'];oak=m['oak'];z=2.8
    # Retain the bed, its lighting, the entrance door and the relocated stair.
    for ob in list(scene.objects):
        n=ob.name
        if n.startswith(FURN) and not any(n.startswith(FURN+t)for t in ('wall-backed','bed ','double mattress','draped cotton','folded duvet','woven bed','sleeping pillow','small linen','pillow stitched','floating bedside','bedside','reading ','suite entry')):
            retire(ob);continue
        if n.startswith(OLD):
            label=n[len(OLD):];bb=bounds(ob)
            if label.startswith(('Suite dressing room flo','Suite bathroom floor','Suite connecting thres','Bathroom','Suite connection oak')) or label.startswith('Combined bathroom priva')and bb[1]<4:
                retire(ob)
    # The retained suite-entry stops sit 1 mm behind the closed leaf.
    for ob in scene.objects:
        if ob.name.startswith(FURN+'suite entry') and ('rebated stop' in ob.name or 'head stop' in ob.name):
            ob.matrix_world.translation+=Vector((0,.0075,0));ob['door_stop_clearance_m']=.001;changed.append(ob)
    # Widen the internal opening only; the original external setback below it remains.
    cut=[-.145,1.10,2.795,.145,3.05,4.95]
    for ob in list(scene.objects):
        if ob.type!='MESH':continue
        bb=bounds(ob)
        if bb[0]<cut[3] and bb[3]>cut[0] and bb[1]<cut[4] and bb[4]>cut[1] and bb[2]<cut[5] and bb[5]>cut[2]:
            if bb[3]-bb[0]<.40 and bb[5]>2.85 and bb[2]<5.20:trim(ob,cut)
    # Plain plaster-lined, wide opening makes the two former bedrooms read as one.
    for y in(1.10,3.05):b.box('wide connection plaster jamb',(0,y+(.003 if y==1.1 else-.003),3.875),(.29,.006,2.15),ivory)
    b.box('wide connection plaster head',(0,2.075,4.947),(.29,1.95,.006),ivory)
    def wall(label,r,low=2.8,high=5.168):
        ob=b.box_bounds(label,r,low,high,ivory);x,y,X,Y=r
        a,c,th=([(x+X)/2,y],[(x+X)/2,Y],X-x)if X-x<Y-y else([x,(y+Y)/2],[X,(y+Y)/2],Y-y)
        add('segments',{'name':ob.name,'a':a,'b':c,'bottom':low,'top':high,'thickness':th});return ob
    wall('bathroom south wall',[-5.065,2.28,-2.245,2.40])
    wall('bathroom entry south pier',[-2.365,2.40,-2.245,2.70])
    wall('bathroom entry north pier',[-2.365,3.60,-2.245,4.22])
    wall('bathroom entry head',[-2.365,2.70,-2.245,3.60],4.881)
    # No coplanar rugs or layered finish panels: tile and carpet meet at one joint.
    for label,r,mat in [('sitting carpet',[-5.065,1.015,-.115,2.28],m['carpet']),('dressing carpet',[-2.245,2.28,-.115,4.22],m['carpet']),('bathroom stone',[-5.065,2.4,-2.365,4.22],m['stone']),('bathroom rear stone',[-5.065,4.22,-2.94,5.04],m['stone']),('bathroom threshold',[-2.365,2.70,-2.245,3.60],m['stone']),('connection carpet',[-.115,1.1,.115,3.05],m['carpet'])]:
        ob=b.box_bounds(label,r,z,z+.012,mat);add('surfaces',{'name':ob.name,'polygon':[[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]],'z':z+.012})
    # Base trim sits proud of plaster, and ends before every door surround.
    for label,r in [('bath south',[ -5.055,2.264,-2.25,2.28]),('bath east south',[-2.245,2.40,-2.229,2.64]),('bath east north',[-2.245,3.66,-2.229,4.21])]:b.box_bounds(label+' skirting',r,z+.014,z+.094,oak,.002)
    # Rebuild furniture at useful proportions with 600 mm deep fitted storage.
    for i,w in enumerate(cfg['suite']['wardrobes']):wardrobe(b,'fitted wardrobe '+str(i),w['bounds'],w['angle'],z,m)
    seat(b,'window banquette',(-3.45,1.35),1.9,.61,0,z,m)
    chair(b,'bedroom lounge chair',(-1.6,2.25),155,z,m)
    table(b,'bedroom drinks table',(-1.88,1.67),.22,z,m)
    bathroom(b,ns,cfg['suite'],m)
    complete_door(b,ns,'bathroom entry',cfg['suite']['bathroomDoor'],.124,z,m)
    for i,(x,y,ceil)in enumerate([(1.1,1.3,5.237),(3.3,1.4,5.237),(-1.0,1.6,5.168),(-3.65,1.7,5.168),(-1.2,3.15,5.168),(-3.4,3.2,5.168),(-4.4,4.55,5.168),(6.55,1.7,5.237)]):
        b.cylinder('recessed trim '+str(i),(x,y,ceil-.005),.042,.006,ivory);b.cylinder('ceiling diffuser '+str(i),(x,y,ceil-.010),.033,.004,m['light']);b.light('ceiling light '+str(i),(x,y,ceil-.1),.25,20,2.6)
    # Furnish the old stair pocket; the east gallery remains a through route.
    b.prefix='Loft reading nook | ';lz=5.55;r=cfg['loft']['daybed']
    b.box_bounds('recessed plinth',[r[0]+.04,r[1]+.04,r[2]-.04,r[3]-.04],lz+.025,lz+.12,m['dark'])
    b.box_bounds('oak storage daybed',r,lz+.10,lz+.37,oak,.008)
    b.box_bounds('daybed tailored cushion',[r[0]+.025,r[1]+.025,r[2]-.025,r[3]-.025],lz+.37,lz+.49,m['linen'],.055)
    b.box_bounds('daybed upholstered back',[r[0]+.015,r[1]+.025,r[0]+.11,r[3]-.025],lz+.41,lz+.97,m['linen'],.035)
    for yy in (r[1]+.40,r[3]-.38):b.box('daybed back cushion',(r[0]+.13,yy,lz+.68),(.20,.67,.40),m['taupe'],.06)
    b.obstacle('storage daybed',r,lz,lz+.90)
    r=cfg['loft']['bookcase'];a,y,c,Y=r
    b.box_bounds('low bookcase back',[a,y,a+.018,Y],lz+.02,lz+.92,oak)
    for h in(.08,.46,.90):b.box_bounds('bookcase shelf',r,lz+h,lz+h+.025,oak,.002)
    for yy in(y,y+(Y-y)/2,Y):b.box('bookcase side',((a+c)/2,yy,lz+.48),(c-a,.018,.88),oak,.002)
    for i in range(16):
        yy=y+.10+i*.085;h=.19+(i%4)*.019;b.box('book spine',(c-.07,yy,lz+.47+h/2),(.14,.028,h),[m['taupe'],ivory,m['stone'],m['dark']][i%4],.001)
    b.obstacle('low bookcase',r,lz,lz+.93)
    chair(b,'reading chair',cfg['loft']['chair'],-90,lz,m,.94);table(b,'reading side table',cfg['loft']['table'],.18,lz,m)
    x,y=7.85,-2.15;b.cylinder('reading floor lamp base',(x,y,lz+.025),.13,.035,m['bronze']);b.cylinder('reading lamp stem',(x,y,lz+.62),.012,1.2,m['bronze']);b.lathe('reading lamp shade',(x,y,lz+1.10),[(.16,0),(.16,.015),(.11,.23)],m['linen']);b.cylinder('reading lamp diffuser',(x,y,lz+1.108),.14,.006,m['light']);b.light('reading lamp glow',(x,y,lz+1.09),.15,12,1.8)
    b.prefix=PREFIX
    balcony_report=match_balcony(b,ns,cfg['balcony'],retire)
    b.finish({'revision':REVISION})
    # Retire stale collision, door, lamp and mirror records along with their meshes.
    for key,pending in [('segments',None),('obstacles',None),('surfaces',None),('interactiveDoors','proposed_doors'),('proposalLights',None),('mirrors',None)]:
        for values in groups(key,pending):
            values[:]=[v for v in values if v.get('name',v.get('id'))not in removed and not(v.get('name','').startswith(FURN) and not any(v.get('name','').startswith(FURN+t)for t in('complete upholstered','bedside','suite entry')))]
            if key in('surfaces','segments'):
                values[:]=[v for v in values if not(v.get('name','').startswith(OLD)and any(t in v['name'].lower()for t in('suite dressing floor','suite bathroom floor','suite bathroom rear floor','bathroom threshold','suite connecting threshold')))]
    for values in groups('interactiveDoors','proposed_doors'):
        values[:]=[v for v in values if v['id']!=FURN+'bathroom entry']
    for values in groups('segments'):
        values[:]=[v for v in values if v['name']!='Balcony rail']
    # Remove old furniture obstacles whose descriptive names differ from meshes.
    for values in groups('obstacles'):
        values[:]=[v for v in values if not(v['name'].startswith(FURN)and not v['name'].startswith(FURN+'complete upholstered'))]
    for values in groups('segments'):
        for w in values:
            if 'Suite cross-wall closure' in w['name']:w['a'][1]=3.05
    for values in groups('walls'):
        for w in values:
            if w['name']=='First west'and w.get('floor')==1:
                w['openings']=[o for o in w['openings']if not(o[0]-o[1]/2<3.05 and o[0]+o[1]/2>1.1)]+[[2.075,1.95,0,2.15,'open']]
    for values in groups('planRooms','new_rooms'):
        values[:]=[r for r in values if r['name']not in('Combined bedroom suite','Suite dressing room','Suite bathroom')]
    for label,poly in [('Combined bedroom and sitting room',cfg['suite']['bedroomAndSittingPolygon']),('Suite bathroom',cfg['suite']['bathroomPolygon'])]:add('planRooms',{'name':label,'floor':1,'base_z':z,'polygon_m':poly,'proposal':True},'new_rooms')
    for values in groups('rooms','new_views'):
        for v in values:
            if v['label']=='Combined bedroom suite':v.update(position=[3.43,.65,z],direction=[-1,.5,-.25])
            elif v['label']=='Suite dressing room':v.update(label='Suite sitting and dressing',position=[.60,1.6,z],direction=[-1,.1,-.25])
            elif v['label']=='Suite bathroom':v.update(position=[-2.98,3.15,z],direction=[-1,.5,-.25])
    add('rooms',{'id':'proposal-loft-reading-nook','label':'Loft reading nook','position':[9,-.1,lz],'direction':[-.8,-1,-.35],'floor':2},'new_views')
    add('rooms',{'id':'proposal-original-balcony','label':'Original balcony · matching railing','position':[7.1,9.6,z],'direction':[0,1,-.15],'floor':1},'new_views')
    report={'revision':REVISION,'configuration':cfg,'removed':removed,'changed':[o.name for o in changed],'created':[o.name for o in b.objects],'replacements':replacements,'balcony':balcony_report,'scope':cfg['suite']['structuralNote'],'doorStopClearanceM':.001}
    nav['suiteLayoutLoft']=report;scene['suite_layout_loft_revision']=REVISION;scene['suite_layout_loft_report']=json.dumps(report)
    bpy.context.view_layer.update();return changed+b.objects,report


def wardrobe(b,label,r,angle,z,m):
    from mathutils import Matrix
    a,y,c,Y=r;length=(c-a)if angle==0 else(Y-y);depth=.60;start=len(b.objects);oak=m['oak'];n=math.ceil(length/.55)
    b.box(label+' plinth',(0,depth/2,z+.06),(length-.06,depth-.06,.10),m['dark'])
    b.box(label+' back',(0,depth-.009,z+1.18),(length,.018,2.24),oak)
    for j in range(n+1):b.box(label+' upright',(-length/2+j*length/n,depth/2,z+1.18),(.018,depth,2.24),oak)
    for h in(.12,2.28):b.box(label+' shelf',(0,depth/2,z+h),(length,depth,.024),oak)
    ceiling=5.168 if angle==0 else 5.237
    b.box(label+' top filler',(0,depth/2,(z+2.30+ceiling-.006)/2),(length,depth,ceiling-.006-z-2.30),oak,.002)
    b.box(label+' front frieze',(0,0,z+2.255),(length,.025,.05),oak,.002)
    for j in range(n):
        x=-length/2+(j+.5)*length/n;b.box(label+' door',(x,0,z+1.18),(length/n-.004,.025,2.10),oak,.003);b.box(label+' pull',(x+length/n*.34,-.023,z+1.12),(.012,.018,.23),m['bronze'],.003)
    centre=((a+c)/2,y)if angle==0 else(a,(y+Y)/2)
    tr=Matrix.Translation((*centre,0))@Matrix.Rotation(math.radians(angle),4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    b.obstacle(label,r,z,z+2.30)


def seat(b,label,centre,width,depth,angle,z,m):
    from mathutils import Matrix
    start=len(b.objects)
    for x in(-width/2+.1,width/2-.1):
        for y in(-depth/2+.1,depth/2-.1):b.box(label+' leg',(x,y,z+.19),(.045,.045,.34),m['oak'],.005)
    b.box(label+' seat',(0,0,z+.44),(width,depth,.16),m['linen'],.065)
    b.box(label+' back',(0,-depth/2+.04,z+.65),(width,.11,.42),m['linen'],.048)
    tr=Matrix.Translation((*centre,0))@Matrix.Rotation(math.radians(angle),4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    b.obstacle(label,[centre[0]-width/2,centre[1]-depth/2,centre[0]+width/2,centre[1]+depth/2],z,z+.90)


def chair(b,label,centre,angle,z,m,scale=1):
    from mathutils import Matrix
    start=len(b.objects)
    for x in(-.25,.25):
        for y in(-.24,.24):b.box(label+' oak leg',(x,y,z+.215),(.035,.035,.40),m['oak'],.004)
    b.box(label+' upholstered seat',(0,0,z+.46),(.64,.62,.14),m['linen'],.065)
    vv=[];N=40
    for h,r in((.43,.33),(.82,.35),(.82,.31),(.43,.29)):
        for i in range(N+1):t=math.pi*i/N;vv.append((r*math.cos(t),-r*math.sin(t),z+h))
    faces=[(k*(N+1)+i,k*(N+1)+i+1,((k+1)%4)*(N+1)+i+1,((k+1)%4)*(N+1)+i)for k in range(4)for i in range(N)]
    faces.extend([(0,41,82,123),(163,122,81,40)]);b.mesh(label+' curved back',vv,faces,m['linen'],True)
    b.tube(label+' seam',[(.35*math.cos(math.pi*i/N),-.35*math.sin(math.pi*i/N),z+.816)for i in range(N+1)],.002,m['taupe'])
    tr=Matrix.Translation((*centre,z))@Matrix.Rotation(math.radians(angle),4,'Z')@Matrix.Diagonal((scale,scale,1,1))@Matrix.Translation((0,0,-z))
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    half=.37*scale;b.obstacle(label,[centre[0]-half,centre[1]-half,centre[0]+half,centre[1]+half],z,z+.83)


def table(b,label,centre,r,z,m):
    x,y=centre;b.cylinder(label+' base',(x,y,z+.025),r*.70,.035,m['bronze']);b.cylinder(label+' stem',(x,y,z+.255),.022,.46,m['bronze']);b.cylinder(label+' top',(x,y,z+.50),r,.035,m['stone'],sides=64)
    b.lathe(label+' cup',(x,y,z+.519),[(.035,0),(.04,.07),(.036,.075),(.031,.068),(.029,.01)],m['ceramic'])
    b.obstacle(label,[x-r,y-r,x+r,y+r],z,z+.60)


def bathroom(b,ns,s,m):
    import bpy
    from mathutils import Matrix
    from scripts.interiors.interior_suite_parts import hollow_basin,east_facing_wc
    z=2.8;a,y,c,Y=s['vanity'];cx=(a+c)/2;cy=(y+Y)/2
    b.box_bounds('vanity carcass',s['vanity'],z+.26,z+.66,m['oak'],.009)
    for x in(a,c-.018):b.box_bounds('vanity side',[x,y,x+.018,Y],z+.26,z+.836,m['oak'],.003)
    for h in(.43,.68):
        b.box('vanity drawer front',(cx,Y+.012,z+h),(c-a-.015,.025,.235),m['oak'],.004);b.box('vanity pull',(cx,Y+.031,z+h+.065),(.26,.018,.013),m['bronze'],.003)
    hollow_basin(b,s['vanity'],z,m)
    b.tube('basin wall mixer',[(cx,y+.012,z+1.07),(cx,cy,z+1.07),(cx,cy,z+1.02)],.012,m['bronze'])
    b.box('vanity mirror',(cx,2.413,z+1.52),(1.16,.012,.90),m['mirror'],.004)
    for x in(a+.03,c-.03):b.box('vanity light',(x,2.425,z+1.53),(.018,.018,.62),m['light'],.003)
    b.light('vanity face glow',(cx,2.75,z+1.76),.25,24,1.5);b.obstacle('vanity',s['vanity'],z,z+.86)
    ns['nav'].setdefault('mirrors',[]).append({'name':b.prefix+'vanity mirror','position':[cx,2.421,z+1.52],'normal':[0,1,0],'width':1.16,'height':.90})
    a,y,c,Y=s['shower'];glass=bpy.data.materials['Interior | Sidebed clear shower glass'];b.box_bounds('level shower tray',s['shower'],z+.012,z+.028,m['stone'],.005)
    b.box('shower fixed screen',(c,(y+Y)/2,z+1.05),(.012,Y-y,2.04),glass,.001)
    b.box('shower channel drain',((a+c)/2,Y-.075,z+.029),(.75,.035,.003),m['dark'])
    b.tube('shower riser',[(a+.6,5.015,z+1.05),(a+.6,5.015,z+2.12),(a+.6,4.65,z+2.12)],.013,m['bronze']);b.cylinder('shower head',(a+.6,4.65,z+2.10),.12,.025,m['bronze'])
    for x in(a+.52,a+.68):b.cylinder('shower control',(x,5.005,z+1.08),.025,.03,m['bronze'],(0,-1,0))
    start=len(b.objects);east_facing_wc(b,[-.30,-.20,.30,.20],[-.49,-.30,-.30,.30],0,m);tr=Matrix.Translation((*s['wcCentre'],z))@Matrix.Rotation(-math.pi/2,4,'Z')
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    ns['new_obstacles'][:]=[o for o in ns['new_obstacles']if not(o['name'].startswith(b.prefix+'WC')and o['bottom']==0)]
    b.obstacle('WC pan and cistern',[-3.70,4.20,-3.10,4.99],z,z+1.08)


def complete_door(b,ns,label,d,depth,z,m):
    from mathutils import Vector,Matrix
    from scripts.interiors.interior_suite_parts import oak_door
    ns['suite_materials']=m;info={**d,'width':.826,'height':2.032,'bottomGap':.022,'edgeHinge':True}
    oak_door(b,ns,label,info,d['centre'],.83,z);record=ns.get('proposed_doors',ns['nav']['interactiveDoors'])[-1];record['authoredCompleteFrame']=True
    for ob in b.objects:
        if ob.name in record['members']:ob['door_id']=record['id'];ob['door_hinge']=d['hinge'];ob['authored_complete_frame']=True
    a=Vector((*d['axis'],0));n=Vector((-a.y,a.x,0));x,y=d['centre'];world=Matrix(((a.x,n.x,0,x),(a.y,n.y,0,y),(0,0,1,z),(0,0,0,1)));start=len(b.objects)
    hinge_offset=(Vector(d['hinge'])-Vector((x,y,z))).dot(n)
    stop_y=hinge_offset+(.022+.019+.001+.0125 if d['openAngle']<0 else-.022-.019-.001-.0125)
    for xx in(-.431,.431):
        b.box(label+' jamb',(xx,0,1.0405),(.038,depth,2.081),m['oak'],.002);b.box(label+' stop',(xx+(.020 if xx<0 else-.020),stop_y,1.034),(.014,.025,2.068),m['oak'],.001)
        for yy in(-depth/2-.008,depth/2+.008):b.box(label+' architrave',(xx+(-.025 if xx<0 else.025),yy,1.067),(.055,.014,2.134),m['oak'],.002)
    b.box(label+' head',(0,0,2.069),(.9,depth,.024),m['oak'],.002);b.box(label+' head stop',(0,stop_y,2.055),(.85,.025,.014),m['oak'],.001)
    for yy in(-depth/2-.008,depth/2+.008):b.box(label+' head architrave',(0,yy,2.09),(.972,.014,.055),m['oak'],.002)
    for ob in b.objects[start:]:
        ob.matrix_world=world@ob.matrix_world
        if 'stop' in ob.name:ob['door_stop_clearance_m']=.001


def match_balcony(b,ns,cfg,retire):
    import bpy
    from mathutils import Vector,Matrix
    from scripts.model.modern_loft_stair import oak_grain
    scene=ns['scene'];oldprefix=b.prefix;b.prefix='Original balcony | '
    wood=next((m for m in bpy.data.materials if m.name in('Proposal | Terrace timber balustrade','Terrace timber balustrade')),None)
    if wood is None:
        # Planning omits the new terrace, but shares the accepted railing finish.
        wood=b.material('Terrace timber balustrade',(.36,.24,.13,1),.68)
    for ob in list(scene.objects):
        if re.match(r'^(?:Proposal revision \| )?Balcony (?:top rail|rear top rail|middle rail|bottom rail|baluster)',ob.name)or ob.name.startswith(('Rear bay detail | Balcony curved bar','Rear bay detail | Balcony post ')):retire(ob)
    path=cfg['path'];stations=[];z=cfg['floorZ'];N=len(path);post_positions=[]
    def beam(label,a,c,width,low,high):
        A=Vector(a);C=Vector(c);mid=(A+C)/2;d=C-A;ob=b.box(label,(0,0,(low+high)/2),(d.length,width,high-low),wood,.002)
        ob.matrix_world=Matrix.Translation((mid.x,mid.y,0))@Matrix.Rotation(math.atan2(d.y,d.x),4,'Z');oak_grain(ob,(1,0,0));return ob
    # Rails stop at each post face; one post owns each angled corner.
    for i,p in enumerate(path):
        angle=math.atan2(path[min(i+1,N-1)][1]-path[max(0,i-1)][1],path[min(i+1,N-1)][0]-path[max(0,i-1)][0])
        ob=b.box('corner post '+str(i),(0,0,z+.55),(.09,.09,1.10),wood,.002);ob.matrix_world=Matrix.Translation((*p,0))@Matrix.Rotation(angle,4,'Z');oak_grain(ob,(0,0,1),(1,0,0));post_positions.append(p)
    gaps=[]
    for i,(a,c)in enumerate(zip(path,path[1:])):
        A=Vector(a);C=Vector(c);d=C-A;length=d.length;u=d/length;bays=math.ceil(length/cfg['maxPostCentresM']);ts=[j*length/bays for j in range(bays+1)]
        for j,t in enumerate(ts[1:-1],1):
            p=A+u*t;ob=b.box('intermediate post '+str(i)+' '+str(j),(0,0,z+.55),(.09,.09,1.10),wood,.002);ob.matrix_world=Matrix.Translation((p.x,p.y,0))@Matrix.Rotation(math.atan2(u.y,u.x),4,'Z');oak_grain(ob,(0,0,1),(1,0,0));post_positions.append(list(p))
        for j,(s,t)in enumerate(zip(ts,ts[1:])):
            beam('top rail '+str(i)+' '+str(j),A+u*(s+.045),A+u*(t-.045),.09,3.83,3.92)
            beam('bottom rail '+str(i)+' '+str(j),A+u*(s+.045),A+u*(t-.045),.06,2.89,2.95)
            clear=t-s-.09;n=max(1,math.ceil((clear+.032)/.115)-1);gap=(clear-n*.032)/(n+1);gaps.append(gap)
            for k in range(n):
                at=s+.045+gap+k*(gap+.032)+.016;p=A+u*at
                ob=b.box('baluster '+str(i)+' '+str(j)+' '+str(k),(0,0,(2.95+3.83)/2),(.032,.032,3.83-2.95),wood,.0015);ob.matrix_world=Matrix.Translation((p.x,p.y,0))@Matrix.Rotation(math.atan2(u.y,u.x),4,'Z');oak_grain(ob,(0,0,1),(1,0,0))
        ns.get('new_segments',ns['nav']['segments']).append({'name':b.prefix+'guard '+str(i),'a':a,'b':c,'bottom':z,'top':3.92,'thickness':.09})
    b.prefix=oldprefix
    return {'path':path,'heightM':1.12,'postSectionM':.09,'balusterSectionM':.032,'maximumClearGapM':max(gaps),'material':wood.name,'preserved':'Original deck footprint, brick piers, roof and glazing'}

if 'scene'in globals()and 'nav'in globals()and globals().get('VARIANT')in('compact','planning'):
    apply_suite_layout_loft(globals())
