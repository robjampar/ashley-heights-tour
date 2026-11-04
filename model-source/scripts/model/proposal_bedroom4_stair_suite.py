"""Relocate the loft stair into Bedroom 4's ensuite and join the two bedrooms.

This is a developed architectural model. Floor trimming and the opening in the
original cross-wall require structural design; the retained roof is not edited.
"""
import json,math,re
REVISION='bedroom4-stair-suite-2026-10-22'
PREFIX='Proposal | Original house loft stair | '
SUITE='Combined suite 01 | '


def superseded_suite_partition(name):
    return bool(re.match(r'^(?:Proposal revision \| )?(?:Bedroom 4 (?:hall|en suite|shower)|Linen cupboard)',name)) and not re.search(r'\| (?:floor|ceiling)',name)


def hobby_floor_overlap_cut(scene):
    """Retain the small south edge; the bridge decks already finish the rest."""
    from mathutils import Vector
    deck=scene.objects['Hobby 01 | bridge oak deck.003']
    south=min((deck.matrix_world@Vector(p)).y for p in deck.bound_box)
    return [-20,south,5.54,20,20,5.56]


def housed_string_profile(rise):
    """The stepped underside and enclosure meet at the same riser lines."""
    lower=[]
    for k in range(12):
        start=1.31+k*.27;h=2.8+(k+4)*rise-.05
        lower.extend([(start-.02 if k==0 else start,h),(start+.27,h)])
    return lower+[(4.55,5.59),(1.29,3.51)]


def apply_bedroom4_stair_suite(ns):
    import bpy,bmesh
    from mathutils import Vector,Matrix
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.model.proposal_level_loft import subtract_box
    from scripts.model.modern_loft_stair import oak_grain
    from scripts.geometry.blender_booleans import BooleanWorkspace
    from scripts.geometry.detail_sweep import make_tube
    scene,nav=ns['scene'],ns['nav'];root=ns['ROOT']
    if scene.get('bedroom4_stair_suite_revision')==REVISION:return [],json.loads(scene['bedroom4_stair_suite_report'])
    asset=json.loads((root/'proposal/specs/bedroom4-stair-suite-components.json').read_text());cfg=asset['configuration'];suite=cfg['suite']
    b=RoomBuilder(ns,'original house loft stair',PREFIX,'P38 Original house loft staircase and suite')
    owners=set(scene.collection.children_recursive);removed=[];changed=[];replacements={}
    ivory=bpy.data.materials['Interior | Landings warm ivory'];oak=bpy.data.materials['Interior | Landings natural oak']
    stone=bpy.data.materials['Interior | Sidebed honed limestone'];carpet=bpy.data.materials['Interior | Sidebed warm wool carpet']
    mats={'plaster':ivory,'oak':oak,'carpet':carpet,'stone':stone}
    def bounds(ob):
        p=[ob.matrix_world@Vector(v)for v in ob.bound_box]
        return [min(q[k]for q in p)for k in range(3)]+[max(q[k]for q in p)for k in range(3)]
    def overlap(a,c):return all(a[k]<c[k+3]-1e-6 and a[k+3]>c[k]+1e-6 for k in range(3))
    def retire(ob):
        removed.append(ob.name)
        for col in tuple(ob.users_collection):
            if col in owners:col.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def isolate(ob):
        # Do not change any original-scene object, even when its data is shared.
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            old=ob;world=old.matrix_world.copy();ob=old.copy();ob.data=old.data.copy();ob.name='Proposal revision | '+old.name;ob['source_name']=ob.name;ob.parent=None;ob.matrix_world=world
            for col in tuple(old.users_collection):
                if col in owners:col.objects.unlink(old);col.objects.link(ob)
            replacements[old.name]=ob.name
        else:ob.data=ob.data.copy()
        return ob
    def trim(ob,cutters):
        ob=isolate(ob);materials=[s.material for s in ob.material_slots];deps=bpy.context.evaluated_depsgraph_get();ev=ob.evaluated_get(deps);me=ev.to_mesh();bm=bmesh.new();bm.from_mesh(me);solid=bool(bm.faces)and all(e.is_manifold for e in bm.edges);bm.free()
        if solid:
            result=bpy.data.meshes.new_from_object(ev,preserve_all_data_layers=True,depsgraph=deps);ev.to_mesh_clear();ob.modifiers.clear();ob.data=result
            for i,mat in enumerate(materials):result.materials[i]=mat
            tools=[]
            for r in cutters:
                x,y,z,X,Y,Z=r;v=[(x,y,z),(X,y,z),(X,Y,z),(x,Y,z),(x,y,Z),(X,y,Z),(X,Y,Z),(x,Y,Z)]
                m=bpy.data.meshes.new('Temporary suite cut');m.from_pydata(v,[],[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]);m.update();tools.append(bpy.data.objects.new(m.name,m))
            try:
                with BooleanWorkspace(tools)as w:w.difference(ob,tools,'New internal stair and suite opening')
            finally:
                for tool in tools:
                    data=tool.data;bpy.data.objects.remove(tool,do_unlink=True)
                    if not data.users:bpy.data.meshes.remove(data)
        else:
            me.calc_loop_triangles();uv=list(me.uv_layers);world=ob.matrix_world;polys=[]
            for tri in me.loop_triangles:
                p=[list(world@me.vertices[me.loops[i].vertex_index].co)+[v for layer in uv for v in layer.data[i].uv]for i in tri.loops];parts=[p]
                for cut in cutters:parts=[q for part in parts for q in subtract_box(part,cut)]
                polys.extend((p,tri.material_index)for p in parts if len(p)>2)
            names=[layer.name for layer in uv];ev.to_mesh_clear();inv=world.inverted();vs=[];fs=[]
            for p,mi in polys:
                a=len(vs);vs.extend(inv@Vector(v[:3])for v in p);fs.append(tuple(range(a,len(vs))))
            result=bpy.data.meshes.new(ob.name+' UV-preserved opening');result.from_pydata(vs,[],fs)
            for mat in materials:result.materials.append(mat)
            for name in names:result.uv_layers.new(name=name)
            for face,(p,mi)in zip(result.polygons,polys):
                face.material_index=mi
                for j,i in enumerate(face.loop_indices):
                    for k,layer in enumerate(result.uv_layers):layer.data[i].uv=p[j][3+k*2:5+k*2]
            result.update();ob.modifiers.clear();ob.data=result
        if not ob.data.polygons:retire(ob);return
        ob['bedroom4_stair_suite_cut']=REVISION;changed.append(ob)
    # Current retained windows and their blinds remain in exactly their positions.
    retired=set(asset['retired']);keep=re.compile(r'window internal|Roman blind',re.I)
    for ob in list(scene.objects):
        n=ob.name;source=ob.get('source_name',n)
        if superseded_suite_partition(n):
            retire(ob);continue
        if n.startswith('Bedroom 4 small print'):
            retire(ob);continue
        if keep.search(n)and n.startswith(('Bedroom4 01 |','Sidebed 01 |')):continue
        if (n in retired and not n.endswith((' | floor',' | ceiling',' | ceiling.001'))) or (source in retired and not source.endswith((' | floor',' | ceiling',' | ceiling.001'))) or ob.get('modern_loft_stair') or n.startswith(('Bedroom4 01 |','Sidebed 01 |')):
            retire(ob)
    # Remove complete superseded surrounds by door membership, including hardware.
    for ob in list(scene.objects):
        if any(str(x).startswith(('Bedroom4 01 |','Sidebed 01 |'))for x in ob.get('frame_doors',[])):retire(ob)
    hole=[4.53,.28,5.10,5.57,4.55,5.64]
    common=[[0,3.1,2.795,5.83,3.28,5.25],[-2.88,4.20,2.795,0,4.36,5.17],[3.65,3.125,2.79,3.91,4.53,5.05],
            [.12,.12,2.795,5.83,3.125,5.245],[-5.06,1.02,2.795,-.12,4.22,5.17],[-5.06,3.1,2.795,-2.94,5.04,5.17]]
    for ob in list(scene.objects):
        if ob.type!='MESH':continue
        bb=bounds(ob);n=ob.name;cuts=[]
        if re.search(r'roof|fascia|soffit|^Bedroom 4 radiator',n,re.I):continue
        if bb[2]>5.1 and bb[5]<5.65 and overlap(bb,hole):cuts.append(hole)
        if n=='Hobby 01 | oak hobby floor':cuts.append(hobby_floor_overlap_cut(scene))
        if 'Original loft front knee wall' in n:cuts.append([4.53,2.1,5.54,5.57,2.4,7.3])
        if re.search(r'^Hobby 01 \|.*archive',n,re.I):cuts.append([4.48,3.2,5.5,5.6,3.95,6.6])
        if bb[0]<.13 and bb[3]>-.13 and bb[5]>2.79 and bb[2]<5.17:cuts.append([-.14,1.1,2.795,.14,2.02,4.95])
        # Retain the full original outer envelope and source roof, even when an
        # interior cut meets the finished face. Only real intersections execute.
        cuts.extend(c for c in common if overlap(bb,c))
        cuts=[c for c in cuts if overlap(bb,c)]
        if cuts:trim(ob,cuts)
    # Install only newly authored architectural parts, never cropped context.
    colors={'oak':[.64,.47,.29],'carpet':[.65,.62,.55],'stone':[.78,.77,.7]}
    for part in asset['parts']:
        label=part['name'];vertices=[list(v)for v in part['vertices']];faces=part['faces']
        if label in ('Suite entrance head','Bathroom door head'):
            for v in vertices:
                if abs(v[2]-4.95)<1e-5:v[2]=4.881
        if label in ('Bedroom former ensuite infill floor','Under-stair cupboard side','Under-stair cupboard north end'):continue
        if label.startswith(('Ivory housed string','Continuous oak rail','Oak stair spindle')):continue
        mat=next((mats[key]for key,col in colors.items()if col==part['color']),ivory)
        ob=b.mesh(label,vertices,faces,mat);ob['bedroom4_stair_suite']=REVISION;ob['stair_suite_role']=part['role']
        # Welding duplicate triangle corners prevents split shading on the new solids.
        bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=1e-6);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free();b.uv(ob)
        if mat==oak:oak_grain(ob,(0,0,1),(1,0,0))if any(t in label.lower()for t in('spindle','newel'))else oak_grain(ob,(0,1,0)if 'rail'in label.lower()else(1,0,0))
    # The former ensuite floor was part of its retired assembly, so reinstate
    # the structural deck as well as its surface. No floating thin floor patch.
    b.box_bounds('Oak floor in former ensuite',[4.6,.115,5.90,3.125],2.8,2.802,oak)
    b.box_bounds('Oak at former ensuite wall',[4.5,3.125,5.835,3.28],2.8,2.802,oak)
    removed.extend(finish_stair_arrival(ns,b))
    # Proper pitched joinery: an ivory external face, oak nosings and rounded rail.
    rise=(cfg['loftZ']-cfg['floorZ'])/16
    def beam(label,a,c,width,mat):
        A=Vector(a);C=Vector(c);d=C-A;ob=b.box(label,(0,0,0),(width,width,d.length),mat,.002);ob.rotation_euler=d.to_track_quat('Z','Y').to_euler();ob.location=(A+C)/2;return ob
    # Close the enclosure exactly to the tread undersides, with a solid side
    # instead of the earlier open triangular patch.
    upper=[]
    for k in range(8):
        a=1.31+k*.27;end=min(3.30,a+.27)
        if a>=end:continue
        h=2.8+(k+4)*rise-.05
        upper.extend([(a,h),(end,h)])
    profile=[(1.31,2.8),(3.30,2.8)]+list(reversed(upper));N=len(profile)
    vv=[(x,y,h)for x in(5.51,5.53)for y,h in profile]
    ff=[tuple(range(N-1,-1,-1)),tuple(range(N,2*N))]+[(i,(i+1)%N,(i+1)%N+N,i+N)for i in range(N)]
    ob=b.mesh('Fitted under-stair enclosure side',vv,ff,ivory)
    bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free();b.uv(ob)
    b.box_bounds('Fitted under-stair enclosure end',[4.53,3.3,5.53,3.36],2.8,2.8+11*rise-.05,ivory)
    for side,x in [('west',4.59),('east',5.51)]:
        # Side-mounted housed string: the stepped underside stays flush with
        # each tread underside, preserving the passage below. Its structural
        # core and connections are design allowances for the stair fabricator.
        profile=housed_string_profile(rise);N=len(profile)
        vv=[(x+off,y,h)for off in(-.02,.02)for y,h in profile]
        ff=[tuple(range(N-1,-1,-1)),tuple(range(N,2*N))]+[(i,(i+1)%N,(i+1)%N+N,i+N)for i in range(N)]
        string=b.mesh('Housed ivory stair string '+side,vv,ff,ivory)
        bm=bmesh.new();bm.from_mesh(string.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(string.data);bm.free();b.uv(string)
        string['support_detail']='Side-mounted housed support; core, anchorage and floor trimming require structural design'

        railx=4.605 if side=='west'else x
        pts=[(railx,1.31,4.44),(railx,4.44,6.43),(4.53 if side=='west'else 5.57,4.55,6.57)]
        ob=make_tube(lambda label,v,f,m,layer:b.mesh(label,v,f,m),'Rounded oak ascent handrail '+side,pts,.025,oak,None,24);oak_grain(ob,(0,1,.636))
        for i in range(30):
            y=1.31+3.24*i/29;top=2.8+(min(11,int((y-1.31)/.27))+4)*rise
            if side=='west'and top<5.237:continue
            ztop=4.44+2.06*i/29
            ob=b.box('Fine oak spindle '+side,(x,y,(top-.049+ztop)/2),(.022,.022,ztop-top+.049),oak,.0015);oak_grain(ob,(0,0,1),(1,0,0))
    # Closed winders keep the short inside turn continuous and remove large
    # triangular open-riser gaps. Straight treads retain the recessed oak nib.
    for i,part in enumerate(p for p in asset['parts']if p['name'].startswith('Quarter winder')):
        top=2.8+(i+1)*rise;verts=[list(v)for v in part['vertices']]
        for v in verts:
            if abs(v[2]-(top-.05))<1e-5:v[2]=2.8+i*rise
        ob=b.mesh('Closed winder oak riser '+str(i+1),verts,part['faces'],oak);b.uv(ob)
        # The thicker replacement takes the original tread's place.
        old=next(o for o in b.objects if o.name==PREFIX+part['name']);b.objects.remove(old);bpy.data.objects.remove(old,do_unlink=True)
    # New side and head reveals close the cross-wall opening; plaster is set
    # behind the oak so it cannot flicker through the joinery.
    for y in (1.1,2.02):b.box('Suite connection oak jamb',(0,y,3.865),(.28,.025,2.13),oak,.002)
    b.box('Suite connection oak head',(0,1.56,4.94),(.28,.945,.024),oak,.002)
    close_suite_crosswall(ns,b)
    furniture=build_suite_furniture(ns,b,cfg)
    b.finish({'revision':REVISION})
    nav_report=coordinate_navigation(ns,cfg,removed,replacements,b.objects)
    report={'revision':REVISION,'configuration':cfg,'removed':removed,'changed':[o.name for o in changed],'created':[o.name for o in b.objects],'replacements':replacements,'navigation':nav_report,'sourceComponentHash':asset['sourceStudyBufferSHA256'],'scope':'Developed spatial model. Structural opening, stair support and floor trimming remain design allowances, not engineering certification.'}
    scene['level_loft_report']=json.dumps(nav['levelLoftStair']);scene['loft_stair_finish_revision']=REVISION;scene['loft_stair_finish_report']=json.dumps(nav['loftStairFinish'])
    scene['bedroom4_stair_suite_revision']=REVISION;scene['bedroom4_stair_suite_report']=json.dumps(report);nav['bedroom4StairSuite']=report
    bpy.context.view_layer.update();return changed+b.objects,report


def finish_stair_arrival(ns,b):
    """Clear the former work mat from the arrival and finish the old wall corner."""
    import bpy
    scene=ns['scene'];owners=set(scene.collection.children_recursive);removed=[]
    ob=scene.objects.get('Hobby 01 | soft flexible floor rug')
    if ob:
        removed.append(ob.name)
        for col in tuple(ob.users_collection):
            if col in owners:col.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    b.box_bounds('Oak at former wall corner',[5.835,3.125,5.9,3.19],2.8,2.802,bpy.data.materials['Interior | Landings natural oak'])
    return removed


def close_suite_crosswall(ns,b):
    """Close the superseded side-bedroom entrance and finish its shared wall."""
    import bpy
    ob=b.box_bounds('Suite cross-wall closure and plaster',[-.121,2.02,.121,4.34],2.8,5.237,bpy.data.materials['Interior | Landings warm ivory'])
    ob['stair_suite_role']='new';ob['bedroom4_stair_suite']=REVISION
    for wall in ns['nav']['walls']:
        if wall['name']=='First west' and wall.get('floor')==1:
            revised=[]
            for opening in wall['openings']:
                centre,width,*rest=opening;a=centre-width/2;c=centre+width/2
                if a<4.34 and c>2.02:
                    if a<2.02:revised.append([(a+2.02)/2,2.02-a,*rest])
                    if c>4.34:revised.append([(4.34+c)/2,c-4.34,*rest])
                else:revised.append(opening)
            wall['openings']=revised
    return ob


def build_suite_furniture(ns,b,cfg):
    import bpy
    from mathutils import Matrix,Vector
    from scripts.interiors.interior_suite_parts import slim_bed,hollow_basin,east_facing_wc,oak_door
    m={k:bpy.data.materials['Interior | Sidebed '+name]for k,name in {'oak':'natural oak','stone':'honed limestone','ivory':'warm ivory','white':'cotton bedding','linen':'ivory upholstery','taupe':'woven taupe','carpet':'warm wool carpet','ceramic':'ivory ceramic','bronze':'satin bronze','dark':'recess and drain','mirror':'mirror glass','light':'warm diffuser'}.items()}
    original_prefix=b.prefix;b.prefix=SUITE;z=cfg['floorZ'];s=cfg['suite'];oak=m['oak'];ivory=m['ivory'];bronze=m['bronze'];stone=m['stone']
    slim_bed(b,{'frameWidth':1.96,'frameLength':2.10,'mattress':[1.8,2.0],'head':[2,3.08],'angleDegrees':180,'envelope':s['bed']},z,m)
    for x in(.55,3.1):
        b.box_bounds('floating bedside drawer',[x,2.65,x+.4,3.08],z+.31,z+.52,oak,.012);b.box('bedside stone top',(x+.2,2.865,z+.535),(.4,.43,.03),stone,.006)
        b.cylinder('reading light backplate',(x+.2,3.10,z+1.18),.035,.018,bronze,(0,-1,0));b.tube('reading light arm',[(x+.2,3.09,z+1.18),(x+.2,2.94,z+1.18),(x+.2,2.90,z+1.08)],.01,bronze)
        b.cylinder('reading shade',(x+.2,2.90,z+1.045),.029,.07,bronze);b.cylinder('reading lens',(x+.2,2.90,z+1.008),.023,.004,m['light']);b.light('bedside glow',(x+.2,2.90,z+.98),.17,12,1.5)
    for row,r in enumerate(s['wardrobes']):
        a,y,c,Y=r;front=y;back=Y;w=(c-a)/5
        b.box_bounds('wardrobe recessed plinth',[a+.025,y+.03,c-.025,Y-.03],z+.014,z+.10,m['dark'])
        b.box('wardrobe back',((a+c)/2,back-.009,z+1.18),(c-a,.018,2.23),oak)
        for j in range(6):b.box('wardrobe upright',(a+j*w,(y+Y)/2,z+1.18),(.018,Y-y,2.23),oak)
        for zz in(z+.112,z+2.225):b.box('wardrobe base or top',((a+c)/2,(y+Y)/2,zz),(c-a,Y-y,.024),oak)
        for j in range(5):
            x=a+(j+.5)*w;b.box('wardrobe oak door',(x,front,z+1.17),(w-.004,.025,2.11),oak,.003)
            b.box('wardrobe bronze pull',(x+w*.35,front-.022,z+1.08),(.012,.018,.24),bronze,.003)
            b.box('wardrobe internal shelf',(x,(y+Y)/2,z+1.90),(w-.02,.55,.018),oak)
            b.cylinder('wardrobe rail',(x,(y+Y)/2,z+1.75),.012,w-.025,bronze,(1,0,0))
        b.obstacle('fitted dressing wardrobe '+str(row),r,z,z+2.25)
    # Double vanity on the solid north wall, with a clear 870 mm aisle.
    a,y,c,Y=s['vanity'];b.box_bounds('double vanity lower carcass',[a+.018,y+.024,c-.018,Y],z+.30,z+.66,oak,.009)
    b.box_bounds('double vanity drawer fronts',[a,y,c,y+.024],z+.30,z+.836,oak,.005)
    for xx in (a,c-.018):b.box_bounds('double vanity side',[xx,y+.024,xx+.018,Y],z+.30,z+.836,oak,.003)
    for xx in(-1.5,-.7):
        cx,cy=hollow_basin(b,[xx-.395,y,xx+.395,Y],z,m)
        b.tube('wall basin mixer',[(xx,4.205,z+1.06),(xx,cy,z+1.06),(xx,cy,z+1.01)],.012,bronze)
        b.cylinder('basin mixer collar',(xx,4.21,z+1.06),.03,.018,bronze,(0,-1,0))
    b.box('wide vanity mirror',(-1.1,4.207,z+1.55),(1.58,.012,.90),m['mirror'],.003)
    for xx in(-1.88,-.32):
        b.box('mirror light bronze',(xx,4.19,z+1.55),(.020,.045,.60),bronze,.005);b.box('mirror light diffuser',(xx,4.164,z+1.55),(.012,.006,.56),m['light'],.002)
    b.light('vanity face glow',(-1.1,3.85,z+1.75),.25,24,1.5);b.obstacle('double vanity',s['vanity'],z,z+.86)
    ns['nav'].setdefault('mirrors',[]).append({'name':SUITE+'wide vanity mirror','position':[-1.1,4.199,z+1.55],'normal':[0,-1,0],'width':1.58,'height':.9})
    # Low drawers sit below, rather than across, the retained front window.
    b.box_bounds('window dressing drawers',[-3.70,1.025,-1.48,1.295],z+.08,z+.62,oak,.008)
    b.box('window seat cushion',(-2.59,1.16,z+.65),(2.22,.27,.06),m['linen'],.02)
    for xx in(-3.33,-2.59,-1.85):b.box('window drawer pull',(xx,1.303,z+.45),(.22,.014,.012),bronze,.003)
    b.obstacle('low dressing window drawers',[-3.70,1.025,-1.48,1.295],z,z+.68)
    a,y,c,Y=s['shower'];glass=bpy.data.materials['Interior | Sidebed clear shower glass'];b.box_bounds('level shower tray',s['shower'],z+.012,z+.028,stone,.005)
    b.box('shower south screen',((a+c)/2,y,z+1.06),(c-a,.012,2.05),glass,.001)
    # Clear eastern shower entrance; its screen is across the southern side.
    b.box('shower linear drain',((a+c)/2,Y-.08,z+.029),(.75,.035,.003),m['dark'])
    b.tube('rain shower riser',[(-4.5,5.015,z+1.05),(-4.5,5.015,z+2.12),(-4.5,4.65,z+2.12)],.013,bronze)
    b.cylinder('rain shower head',(-4.5,4.65,z+2.1),.12,.025,bronze)
    for xx in(-4.58,-4.42):b.cylinder('shower control',(xx,5.005,z+1.08),.025,.03,bronze,(0,-1,0))
    # WC faces into the clear aisle; original north wall conceals its cistern.
    start=len(b.objects);east_facing_wc(b,[-.30,-.20,.30,.20],[-.49,-.30,-.30,.30],0,m)
    tr=Matrix.Translation(Vector((-4.60,3.35,z)))
    for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
    # Remove the temporary local-coordinate collision boxes created by the helper.
    ns['new_obstacles'][:]=[o for o in ns['new_obstacles']if not(o['name'].startswith(SUITE+'WC')and o['bottom']==0)]
    b.obstacle('WC pan and cistern',[-5.09,3.05,-4.30,3.65],z,z+1.08)
    # Real 826 mm leaves, jambs, stops, architraves and edge hardware.
    ns['suite_materials']=m
    def door(label,hinge,axis,centre,wall_depth,angle):
        d={'width':.826,'height':2.032,'hinge':hinge,'axis':axis,'openAngle':angle,'bottomGap':.022}
        if label=='bathroom entry':d['edgeHinge']=True
        oak_door(b,ns,label,d,centre,.83,z);record=ns.get('proposed_doors',ns['nav']['interactiveDoors'])[-1];record['authoredCompleteFrame']=True
        for ob in b.objects:
            if ob.name in record['members']:ob['door_id']=record['id'];ob['door_hinge']=hinge;ob['authored_complete_frame']=True
        a=Vector((*axis,0));n=Vector((-axis[1],axis[0],0));origin=Vector((*centre,z));world=Matrix(((a.x,n.x,0,origin.x),(a.y,n.y,0,origin.y),(0,0,1,z),(0,0,0,1)))
        start=len(b.objects)
        stop_y=.025 if label=='bathroom entry'else-.025
        for x in(-.431,.431):
            b.box(label+' oak jamb',(x,0,1.0405),(.038,wall_depth,2.081),oak,.002)
            b.box(label+' rebated stop',(x+(.020 if x<0 else-.020),stop_y,1.034),(.014,.025,2.068),oak,.001)
            for yy in(-wall_depth/2-.008,wall_depth/2+.008):b.box(label+' architrave',(x+(-.025 if x<0 else.025),yy,1.067),(.055,.014,2.134),oak,.002)
        b.box(label+' oak head',(0,0,2.069),(.90,wall_depth,.024),oak,.002)
        b.box(label+' head stop',(0,stop_y,2.055),(.85,.025,.014),oak,.001)
        for yy in(-wall_depth/2-.008,wall_depth/2+.008):b.box(label+' head architrave',(0,yy,2.09),(.972,.014,.055),oak,.002)
        for ob in b.objects[start:]:ob.matrix_world=world@ob.matrix_world
    door('suite entry',[4.463,3.19,z],[-1,0],[4.05,3.19],.134,math.pi/2)
    door('bathroom entry',[-2.853,2.81,z],[1,0],[-2.44,2.74],.124,math.radians(165))
    for i,(x,y,ceiling)in enumerate([(1.1,1.3,5.237),(3.3,1.4,5.237),(-1.5,1.7,5.168),(-3.7,1.7,5.168),(-1.1,3.65,5.168),(-3.2,4.0,5.168),(-4.35,4.6,5.168),(6.55,1.7,5.237)]):
        b.cylinder('recessed ceiling trim '+str(i),(x,y,ceiling-.005),.042,.006,ivory);b.cylinder('ceiling diffuser '+str(i),(x,y,ceiling-.01),.033,.004,m['light']);b.light('ceiling glow '+str(i),(x,y,ceiling-.10),.25,20,2.6)
    b.prefix=original_prefix
    return b.objects


def coordinate_navigation(ns,cfg,removed,replacements,objects):
    from scripts.model.proposal_level_loft import subtract_box
    from mathutils import Vector
    nav=ns['nav'];z=cfg['floorZ'];loft=cfg['loftZ'];s=cfg['suite'];rise=(loft-z)/16
    def groups(key,pending=None):
        a=[nav.setdefault(key,[])];other=ns.get(pending or 'new_'+key)
        if other is not None and all(other is not v for v in a):a.append(other)
        return a
    def append(key,item,pending=None):(ns.get(pending or 'new_'+key,nav.setdefault(key,[]))).append(item)
    oldprefix=('Bedroom4 01 |','Sidebed 01 |','Proposal | Loft bedroom expansion | returned landing')
    def retired(name):
        return name in removed or name.startswith(oldprefix) or bool(re.search(r'Bedroom 4 (?:hall|en suite|shower)|Linen cupboard|^Landing radiator|^Landings 01 \| hall artwork',name,re.I)) or name.startswith('Proposal | Level loft | ')and any(t in name.lower()for t in('flight ','half landing','landing guard','stairwell','stair opening'))
    for key,pending in [('segments',None),('obstacles',None),('ramps',None),('interactiveDoors','proposed_doors'),('proposalLights',None),('mirrors',None)]:
        for values in groups(key,pending):values[:]=[o for o in values if not retired(o.get('name',o.get('id','')))]
    for walls in groups('walls'):
        walls[:]=[w for w in walls if not retired(w['name']) and w['name']!='Bedroom 5 to 4']
        for w in walls:
            if w['name']=='First west' and w.get('floor')==1:w['openings'].append([1.56,.92,0,2.15,'door'])
            if w['name']=='Bedroom 5 hall':w['openings']=[[w['a'][1]-(3.125+4.53)/2,4.53-3.125,0,2.25,'open']]
    for obstacles in groups('obstacles'):
        for o in obstacles:
            if o['name']=='Hobby 01 | eaves archive':o['box'][2]=4.48
    # The viewer must have exactly the same new hole as the visible floor.
    for surfaces in groups('surfaces'):
        result=[]
        for surf in surfaces:
            if retired(surf['name']) and abs(surf['z']-z)>.03:continue
            if abs(surf['z']-loft)<.10:
                result.extend({**surf,'polygon':p}for p in subtract_box(surf['polygon'],[4.53,.28,5.57,4.55],2))
            else:result.append(surf)
        surfaces[:]=result
    def rect(r):return[[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]]
    for label,r,height in [('recovered mezzanine loft floor',[7.3,-4.58,8.47,-1.6],loft),('suite sleeping floor',s['sleeping'],z+.012),('suite dressing floor',s['dressing'],z+.012),('suite bathroom floor',s['bathroom'],z+.012),('suite bathroom rear floor',s['bathroomRear'],z+.012),('suite connecting threshold',[-.14,1.1,.14,2.02],z+.012),('former ensuite floor',[4.28,.115,5.835,3.29],z),('suite entry threshold',[3.6,3.09,4.5,3.29],z+.012),('bathroom threshold',[-2.89,2.68,-1.99,2.8],z+.012),('landing opening',[3.63,3.125,3.93,4.53],z)]:append('surfaces',{'name':PREFIX+label,'polygon':rect(r),'z':height})
    # Twelve shallow radial sectors give a continuous walking surface over
    # the bottom quarter turn without any change to general viewer behaviour.
    for i in range(12):
        a=-math.pi/2-i*math.pi/24;c=a-math.pi/24
        def at(t,r):return[5.6+r*math.cos(t),1.31+r*math.sin(t)]
        outer=lambda t:at(t,1/max(abs(math.cos(t)),abs(math.sin(t))))
        append('ramps',{'name':PREFIX+'bottom winder '+str(i),'polygon':[at(a+.0001,.1),outer(a+.0001),outer(c-.0001),at(c-.0001,.1)],'start':[*at(a,.55),z+3*rise*i/12],'end':[*at(c,.55),z+3*rise*(i+1)/12]})
    append('ramps',{'name':PREFIX+'straight flight','polygon':rect([4.6,1.31,5.5,4.555]),'start':[5.05,1.31,z+3*rise],'end':[5.05,4.55,loft]})
    # Blocking records follow the rebuilt wall faces and the actual guards.
    for ob in objects:
        if ob.type!='MESH' or ob.get('stair_suite_role')!='new':continue
        pts=[ob.matrix_world@Vector(p)for p in ob.bound_box];r=[min(p[k]for p in pts)for k in range(3)]+[max(p[k]for p in pts)for k in range(3)]
        if r[3]-r[0]<r[4]-r[1]:a,c=[(r[0]+r[3])/2,r[1]],[(r[0]+r[3])/2,r[4]];th=r[3]-r[0]
        else:a,c=[r[0],(r[1]+r[4])/2],[r[3],(r[1]+r[4])/2];th=r[4]-r[1]
        append('segments',{'name':ob.name,'a':a,'b':c,'bottom':r[2],'top':r[5],'thickness':th})
    append('obstacles',{'name':PREFIX+'under-stair cupboard','box':[4.53,1.31,5.57,3.36],'bottom':z,'top':4.45,'maxFootZ':2.95})
    append('obstacles',{'name':PREFIX+'winder newel','box':[5.505,1.215,5.695,1.405],'bottom':z,'top':4.44})
    for x in(4.53,5.57):append('segments',{'name':PREFIX+'loft opening guard','a':[x,2.4],'b':[x,4.55],'bottom':loft,'top':6.60,'thickness':.05})
    for i in range(24):
        a=1.31+3.24*i/24;c=1.31+3.24*(i+1)/24
        for x in(4.59,5.51):append('segments',{'name':PREFIX+'pitched stair guard','a':[x,a],'b':[x,c],'bottom':z+3*rise+13*rise*i/24-.04,'top':z+3*rise+13*rise*(i+1)/24+1.05,'thickness':.05})
    for plans in groups('planRooms','new_rooms'):
        plans[:]=[r for r in plans if r['name']not in('Bedroom 4','Bedroom 4 en suite','Side wing south bedroom','Side south ensuite')]
    for label,r in [('Combined bedroom suite',s['sleeping']),('Suite dressing room',s['dressing']),('Suite bathroom',s['bathroom'])]:append('planRooms',{'name':label,'floor':1,'base_z':z,'polygon_m':s['bathroomPolygon']if label=='Suite bathroom'else s['dressingPolygon']if label=='Suite dressing room'else rect(r),'proposal':True},'new_rooms')
    positions={'proposal-old-house-loft-stair':('Loft staircase',[6.6,.65,z],[-1,.4,.1]),'2445676-0':('Combined bedroom suite',[3.95,1.7,z],[-1,.2,-.05]),'2445677-0':('Suite dressing room',[-1.1,1.7,z],[0,1,-.05]),'proposal-level-loft-stair-approach':('Loft staircase · approach',[6.6,.65,z],[-1,.4,.1]),'proposal-level-loft-stair-top':('Loft staircase · top landing',[5.05,5.2,loft],[0,-1,-.3])}
    for views in groups('rooms','new_views'):
        for v in views:
            if v['id']in positions:v['label'],v['position'],v['direction']=positions[v['id']]
            elif 'side' in v['id'] and 'bed' in v['id'] or v['label']=='Side wing south bedroom':v.update(label='Suite dressing room',position=[-1.1,1.7,z],direction=[0,1,-.05])
            elif v['label']=='Side south ensuite':v.update(label='Suite bathroom',position=[-2.5,3.6,z],direction=[-1,.2,-.04])
            elif v['label']=='Loft staircase · approach':v.update(position=[6.6,.65,z],direction=[-1,.4,.1])
            elif v['label']=='Loft staircase · top landing':v.update(position=[5.05,5.2,loft],direction=[0,-1,-.3])
    nav['loftStairFinish']={'revision':REVISION,'arrangement':'single straight flight with three bottom winders','widthM':.9,'material':'natural oak treads, round oak rails and fine oak spindles with ivory strings'}
    nav['levelLoftStair']={**nav['levelLoftStair'],'revision':REVISION,'rises':16,'riserMetres':rise,'goingMetres':.27,'flightWidthMetres':.9,'openings':[[4.53,.28,5.57,4.55]],'flights':[{'a':[5.05,1.31],'b':[5.05,4.55],'n':13,'w':.9,'z':3*rise}],'bottomWinders':{'centre':[5.6,1.31],'risers':3,'innerRadius':.1,'outerRadius':1},'treads':[{'name':PREFIX+'Straight oak tread '+str(k+4),'centre':[5.05,1.31+(k+.5)*.27],'top':z+(k+4)*rise}for k in range(12)],'arrival':[5.05,4.55,loft],'routes':{'principal':[[7.25,.3,z],[6.65,.3,z],[6.65,-.65,z],[8.8,-.85,z],[8.8,-4.75,z]]},'upperRoutes':{'suite':[[5.05,4.75,loft],[5.05,5.05,loft],[9,5.05,loft],[9,.3,loft],[9,-2.6,loft]],'hobby':[[5.05,5.05,loft],[5.05,6.2,loft]]}}
    for old_key in ('landingZ','halfLandingBounds','bottomLanding','modern','stairShiftY'):
        nav['levelLoftStair'].pop(old_key,None)
    nav['levelLoftStair']['bottomLanding']=cfg['stair']['bottomLanding']
    nav['interiorRooms'].pop('bedroom4',None);nav['interiorRooms'].pop('sidebed',None);nav['interiorRooms']['combined suite']={'revision':REVISION,'status':'developed concept'}
    return {'newFloorOpening':[4.53,.28,5.57,4.55],'winderSectors':12,'straightFlight':True,'crossWallOpening':[1.1,2.02]}


if 'scene'in globals()and 'nav'in globals()and globals().get('VARIANT')in('compact','planning'):
    apply_bedroom4_stair_suite(globals())
