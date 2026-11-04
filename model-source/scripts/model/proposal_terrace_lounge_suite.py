"""Bedroom 3 terrace lounge, one west-wing suite and a private landing ensuite."""
import json,math
REVISION='terrace-lounge-west-suite-2026-10-23'
PREFIX='Terrace suites | '
OLD='Proposal | Original house loft stair | '


def open_lounge_entry(ns):
    """Keep the landing opening and its lining, without a door or planted stops."""
    import bpy
    scene,nav=ns['scene'],ns['nav'];key='lounge_open_entry_report'
    if scene.get(key):
        report=json.loads(scene[key]);nav['loungeOpenEntry']=report;return report
    door_id='Bedroom3 01 | entrance door'
    owners={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    removed=[];renamed={}
    for ob in list(scene.objects):
        owned=door_id in ob.get('frame_doors',[])
        if ob.name.startswith(door_id) or (owned and 'planted door stop' in ob.name):
            removed.append(ob.name)
            for col in tuple(ob.users_collection):
                if col in owners:col.objects.unlink(ob)
            if not ob.users_collection:bpy.data.objects.remove(ob)
        elif owned:
            assert not any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name)
            old=ob.name;ob.name='Terrace lounge opening | '+old.split(' | ',1)[1].split(' ',1)[1]
            ob['source_name']=ob.name;ob['open_passage_lining']=True
            for prop in ('frame_doors','detail_source'):
                if prop in ob:del ob[prop]
            renamed[old]=ob.name
    for values in (nav.get('interactiveDoors',[]),ns.get('proposed_doors',[])):
        values[:]=[d for d in values if d['id']!=door_id]
    report={'revision':'lounge-open-entry-2026-10-23','removedDoor':door_id,'removed':removed,'renamed':renamed,'openingCenter':[4.3788,4.53,2.8],'clearWidthM':.734,'linedOpeningRetained':True}
    nav['loungeOpenEntry']=report;scene[key]=json.dumps(report)
    return report


def apply_terrace_lounge_suite(ns):
    import bpy,bmesh
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    from scripts.model.proposal_level_loft import subtract_box
    from scripts.model.proposal_suite_layout_loft import complete_door
    from scripts.interiors.terrace_suite_furnishings import furnish
    scene,nav=ns['scene'],ns['nav']
    open_lounge_entry(ns)
    if scene.get('terrace_lounge_suite_revision')==REVISION:return [],json.loads(scene['terrace_lounge_suite_report'])
    cfg=json.loads((ns['ROOT']/'proposal/specs/terrace-lounge-west-suite.json').read_text())
    owners={c for s in bpy.data.scenes if s==scene or 'Proposal ·'in s.name for c in s.collection.children_recursive}
    b=RoomBuilder(ns,'terrace suites',PREFIX,'P43 Terrace lounge and bedroom suites')
    removed=[];changed=[];z=cfg['floorZ']
    def bounds(ob):
        ps=[ob.matrix_world@Vector(p)for p in ob.bound_box]
        return [min(p[i]for p in ps)for i in range(3)]+[max(p[i]for p in ps)for i in range(3)]
    def retire(ob):
        removed.append(ob.name)
        for col in tuple(ob.users_collection):
            if col in owners:col.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def groups(key,pending=None):
        result=[nav.setdefault(key,[])];other=ns.get(pending or 'new_'+key)
        if other is not None and all(other is not x for x in result):result.append(other)
        return result
    def add(key,value,pending=None):ns.get(pending or 'new_'+key,nav.setdefault(key,[])).append(value)
    def trim(ob,cut):
        # Never mutate meshes belonging to the seven retained original scenes.
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            old=ob;world=old.matrix_world.copy();ob=old.copy();ob.data=old.data.copy();ob.parent=None;ob.matrix_world=world;ob.name='Proposal revision | '+old.name;ob['source_name']=ob.name
            for col in tuple(old.users_collection):
                if col in owners:col.objects.unlink(old);col.objects.link(ob)
        else:ob.data=ob.data.copy()
        deps=bpy.context.evaluated_depsgraph_get();ev=ob.evaluated_get(deps);mesh=ev.to_mesh();bm=bmesh.new();bm.from_mesh(mesh);solid=bool(bm.faces)and all(e.is_manifold for e in bm.edges);bm.free();mats=list(ob.data.materials)
        if solid:
            result=bpy.data.meshes.new_from_object(ev,preserve_all_data_layers=True,depsgraph=deps);ev.to_mesh_clear();ob.modifiers.clear();ob.data=result
            for i,m in enumerate(mats):result.materials[i]=m
            x,y,zz,X,Y,Z=cut;tool=b.box_bounds('temporary aperture',[x,y,X,Y],zz,Z,mats[0])
            bpy.context.view_layer.update()
            with BooleanWorkspace([tool])as work:work.difference(ob,[tool])
            b.objects.remove(tool);bpy.data.objects.remove(tool,do_unlink=True)
        else:
            mesh.calc_loop_triangles();layers=list(mesh.uv_layers);world=ob.matrix_world;polys=[]
            for tri in mesh.loop_triangles:
                p=[list(world@mesh.vertices[mesh.loops[i].vertex_index].co)+[v for layer in layers for v in layer.data[i].uv]for i in tri.loops]
                polys.extend((q,tri.material_index)for q in subtract_box(p,cut)if len(q)>2)
            names=[layer.name for layer in layers];ev.to_mesh_clear();vs=[];fs=[];inv=world.inverted()
            for p,mi in polys:a=len(vs);vs.extend(inv@Vector(v[:3])for v in p);fs.append(tuple(range(a,len(vs))))
            result=bpy.data.meshes.new(ob.name+' revised');result.from_pydata(vs,[],fs)
            for m in mats:result.materials.append(m)
            for name in names:result.uv_layers.new(name=name)
            for face,(p,mi)in zip(result.polygons,polys):
                face.material_index=mi
                for j,i in enumerate(face.loop_indices):
                    for k,layer in enumerate(result.uv_layers):layer.data[i].uv=p[j][3+k*2:5+k*2]
            result.update();ob.modifiers.clear();ob.data=result
        if not ob.data.polygons:retire(ob);return
        changed.append(ob)
    m={k:bpy.data.materials['Interior | Sidebed '+name]for k,name in {'oak':'natural oak','stone':'honed limestone','ivory':'warm ivory','white':'cotton bedding','linen':'ivory upholstery','taupe':'woven taupe','carpet':'warm wool carpet','ceramic':'ivory ceramic','bronze':'satin bronze','dark':'recess and drain','mirror':'mirror glass','light':'warm diffuser'}.items()}
    m['ivory']=bpy.data.materials['Interior | Landings warm ivory'];m['glass']=bpy.data.materials['Interior | Sidebed clear shower glass']
    def inside(bb,r):return bb[0]>=r[0]-.001 and bb[1]>=r[1]-.001 and bb[3]<=r[2]+.001 and bb[4]<=r[3]+.001
    # Remove the old room fittings but keep complete external glazing and entrance doors.
    for ob in list(scene.objects):
        n=ob.name;bb=bounds(ob)if ob.type in('MESH','CURVE')else None
        discard=n.startswith('Lengthwise suite | ')
        if n.startswith('Combined suite 01 | ')and not n.startswith('Combined suite 01 | suite entry'):discard=True
        if n.startswith('Family 01 | '):
            discard=not n.startswith(tuple('Family 01 | '+t for t in('north west pier','north east pier','north head','west window','north doors','west recessed','west linen','west blind','north recessed','terrace ')))
        if n.startswith('Bedroom3 01 | '):
            keep=('entrance door','ivory ceiling finish','oak doorway transition')
            if ns['VARIANT']=='planning':keep+=('north window','folded Roman blind','blind concealed')
            discard=not n.startswith(tuple('Bedroom3 01 | '+t for t in keep))
        if n.startswith('Landings 01 | ')and bb and bb[2]>=2.79 and bb[5]<5.10 and inside(bb,[0,3.19,3.78,5.68]):discard=True
        if n.startswith('Open suite | dressing open '):discard=True
        if n.startswith(OLD+'Suite retained ceil')and bb and bb[3]<0:discard=True
        if n.startswith(OLD+'Suite connecting thres'):discard=True
        if n.startswith(OLD+'Combined bathroom priv')and bb and bb[3]<0:discard=True
        if ns['VARIANT']=='compact'and n.startswith('Bedroom 3 radiator'):discard=True
        if n.startswith(('Proposal | Side shared bathroom north','Proposal | Side shared hall ceiling')):discard=True
        if discard:retire(ob)
    # Retire ancillary data using the same spatial ownership as the affected rooms.
    def stale(v,key):
        n=v.get('name',v.get('id',''))
        if n in removed:return True
        if n.startswith(('Lengthwise suite | ','Family 01 | ')):return key!='interactiveDoors'
        if n.startswith('Combined suite 01 | ')and not n.startswith('Combined suite 01 | suite entry'):return True
        if n.startswith('Bedroom3 01 | ')and not n.startswith('Bedroom3 01 | entrance door'):return True
        if n.startswith(OLD)and any(t in n.lower()for t in('suite dressing floor','suite bathroom floor','suite bathroom rear floor','bathroom threshold','suite connecting threshold')):return True
        if n.startswith('Landings 01 | '):
            r=v.get('box');p=v.get('position')
            if r and r[0]>=0 and r[1]>=3.19 and r[2]<=3.78 and r[3]<=5.68:return True
            if p and 0<p[0]<3.78 and 3.19<p[1]<5.68 and 2.8<p[2]<5.25:return True
        return False
    for key,pending in [('segments',None),('surfaces',None),('obstacles',None),('interactiveDoors','proposed_doors'),('proposalLights',None),('mirrors',None)]:
        for values in groups(key,pending):values[:]=[v for v in values if not stale(v,key)]
    def wall(label,r,low=z,high=5.237):
        ob=b.box_bounds(label,r,low,high,m['ivory']);x,y,X,Y=r
        a,c,th=([(x+X)/2,y],[(x+X)/2,Y],X-x)if X-x<Y-y else([x,(y+Y)/2],[X,(y+Y)/2],Y-y)
        add('segments',{'name':ob.name,'a':a,'b':c,'bottom':low,'top':high,'thickness':th});return ob
    def floor(label,r,mat,polygon=None):
        p=polygon or [[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]]
        ob=b.mesh(label,[[x,y,z+.012]for x,y in p],[tuple(range(len(p)))],mat)
        add('surfaces',{'name':ob.name,'polygon':p,'z':z+.012});return ob
    # Seal the old through-wardrobe opening and public west-wing connection.
    wall('old bedroom connection infill',[-.115,1.10,.115,2.02],z,4.95)
    wall('old landing connection infill',[-.115,4.34,.115,5.544],z,5.05)
    # Continuous thin plaster finishes level the retained wall and its infill faces.
    b.box_bounds('original bedroom west continuous plaster',[.122,.115,.125,3.125],z,5.237,m['ivory'])
    b.box_bounds('original ensuite west continuous plaster',[.122,3.255,.125,5.615],z,5.237,m['ivory'])
    for label,y,Y,low in [('south',1.015,6.0,z),('north',6.9,8.705,z),('door head',6.0,6.9,4.881)]:
        b.box_bounds('west wing east plaster '+label,[-.126,y,-.123,Y],low,5.138,m['ivory'])
    # New 900 mm structural aperture, cut through every existing finish layer.
    cut=[-.30,6.0,2.795,.30,6.9,4.881]
    for ob in list(scene.objects):
        if ob.type!='MESH' or ob in b.objects:continue
        bb=bounds(ob)
        if bb[0]<cut[3]and bb[3]>cut[0]and bb[1]<cut[4]and bb[4]>cut[1]and bb[2]<cut[5]and bb[5]>cut[2]and bb[3]-bb[0]<.65:trim(ob,cut)
    for values in groups('segments'):
        for v in list(values):
            if 'First west' in v['name']and v['bottom']<4.881 and max(v['a'][1],v['b'][1])>6 and min(v['a'][1],v['b'][1])<6.9:
                values.remove(v)
                for a,c,low in [(min(v['a'][1],v['b'][1]),6,v['bottom']),(6.9,max(v['a'][1],v['b'][1]),v['bottom']),(6,6.9,4.881)]:
                    if c>a:values.append({**v,'name':v['name']+' revised '+str(a),'a':[v['a'][0],a],'b':[v['b'][0],c],'bottom':low})
    # West wing: two front service rooms, one full-width bedroom behind them.
    wall('west bedroom south wall',[-5.065,3.76,-1.95,3.88],z,5.14)
    wall('west wardrobe opening east pier',[-.95,3.76,-.115,3.88],z,5.14)
    wall('west wardrobe opening head',[-1.95,3.76,-.95,3.88],4.95,5.14)
    wall('west ensuite front pier',[-2.94,1.015,-2.82,1.30],z,5.14)
    wall('west ensuite rear pier',[-2.94,2.20,-2.82,3.76],z,5.14)
    wall('west ensuite door head',[-2.94,1.30,-2.82,2.20],4.881,5.14)
    for label,r,mat in [('west bedroom oak floor',cfg['westBedroom'],m['oak']),('west dressing oak floor',cfg['westDressing'],m['oak']),('west ensuite stone floor',cfg['westBathroom'],m['stone']),('wardrobe opening threshold',[-1.95,3.76,-.95,3.88],m['oak']),('west ensuite threshold',[-2.94,1.30,-2.82,2.20],m['stone']),('lounge suite threshold',[-.115,6,.115,6.9],m['oak']),('original ensuite stone floor',cfg['landingEnsuite'],m['stone']),('remaining public landing oak',[3.60,3.19,3.78,5.68],m['oak'])]:floor(label,r,mat)
    floor('lounge oak floor',None,m['oak'],cfg['loungePolygon'])
    b.box_bounds('west wing continuous ceiling',[-5.065,1.015,-.115,8.705],5.138,5.14,m['ivory'])
    # A private shower room replaces the redundant connecting landing.
    wall('ensuite public passage wall',[3.48,3.255,3.60,5.615])
    cut=[2.5,3.09,2.795,3.4,3.29,4.881]
    for ob in list(scene.objects):
        if ob.type!='MESH' or ob in b.objects:continue
        bb=bounds(ob)
        if bb[0]<cut[3]and bb[3]>cut[0]and bb[1]<cut[4]and bb[4]>cut[1]and bb[2]<cut[5]and bb[5]>cut[2]and bb[4]-bb[1]<.40:trim(ob,cut)
    for values in groups('segments'):
        for v in list(values):
            if v['name'].startswith(OLD+'Suite north partition'):
                values.remove(v)
                for a,c,low in[(0,2.5,z),(3.4,3.6,z),(2.5,3.4,4.881)]:values.append({**v,'name':v['name']+' revised '+str(a),'a':[a,3.19],'b':[c,3.19],'bottom':low})
    floor('original ensuite threshold',[2.5,3.125,3.4,3.255],m['stone'])
    complete_door(b,ns,'lounge to west bedroom',cfg['westSuiteDoor'],.234,z,m)
    complete_door(b,ns,'west ensuite privacy',cfg['westBathroomDoor'],.124,z,m)
    complete_door(b,ns,'original ensuite privacy',cfg['landingBathroomDoor'],.134,z,m)
    # New reveals and base trims stop before the complete door frames.
    for label,r in [('bedroom south west',[-5.055,3.88,-2.0,3.896]),('bedroom south east',[-.90,3.88,-.125,3.896]),('dressing head west',[-2.79,3.744,-2.0,3.76]),('dressing head east',[-.90,3.744,-.125,3.76]),('passage east',[3.60,3.26,3.616,5.61])]:b.box_bounds(label+' skirting',r,z+.014,z+.094,m['oak'],.002)
    # Compact has the roof terrace. Planning must retain a safe exterior window.
    terrace=[]
    if ns['VARIANT']=='compact':
        planter=cfg['terracePlanter'];delta=Vector((planter['to'][0]-planter['from'][0],planter['to'][1]-planter['from'][1],0))
        for ob in scene.objects:
            if ob.name.startswith('Terrace 01 | ')and ob.get('terrace_component')==planter['component']:
                assert not any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name)
                ob.matrix_world.translation+=delta;changed.append(ob)
        for values in groups('obstacles'):
            for item in values:
                if item['name']=='Terrace 01 | '+planter['component']:
                    item['box']=[item['box'][i]+delta[i%2]for i in range(4)]
        a,y,_,c,Y,head=cfg['terraceOpening'];mid=(a+c)/2
        for ob in list(scene.objects):
            n=ob.name
            if n.startswith('Proposal revision | Bedroom 3 rear ') and not any(t in n for t in('lintel 0','pier 0','end')) or n.startswith(('Bedroom 3 rear clear glass','Bedroom 3 rear window board','Bedroom 3 rear | skirting below')):retire(ob)
        for values in groups('segments'):
            values[:]=[v for v in values if v.get('name')not in removed and not('Bedroom 3 rear' in v['name']and ('window' in v['name'].lower()or 'glass' in v['name'].lower()or 'below 0' in v['name']))]
        frame=bpy.data.materials['Proposal | Bronze black frames'];glass=bpy.data.materials['Proposal | Clear glazing']
        for xx in(a+.025,c-.025):b.box('terrace door fixed jamb',(xx,8.82,(z+head)/2),(.05,.09,head-z),frame,.001)
        b.box('terrace door fixed head',(mid,8.82,head-.025),(c-a,.09,.05),frame,.001)
        b.box('terrace door sill',(mid,8.82,z+.013),(c-a,.25,.026),frame,.002)
        b.window_reveal('terrace door','y',8.704,8.774,a+.05,c-.05,z+.026,head-.05,m['ivory'])
        floor('terrace door floor threshold',[a,8.705,c,8.935],m['stone'])
        for side,(hx,end,delta)in enumerate([(a+.054,mid-.003,math.pi/2),(c-.054,mid+.003,-math.pi/2)]):
            label='terrace lounge door '+('left'if side==0 else'right');start=len(b.objects);lo,hi=sorted([hx,end]);bottom=z+.03;top=head-.054
            for xx in(lo+.025,hi-.025):b.box(label+' stile',(xx,8.82,(bottom+top)/2),(.05,.055,top-bottom),frame,.001)
            for zz in(bottom+.026,top-.026):b.box(label+' rail',((lo+hi)/2,8.82,zz),(hi-lo,.055,.052),frame,.001)
            b.box(label+' glass',((lo+hi)/2,8.82,(bottom+top)/2),(hi-lo-.10,.018,top-bottom-.104),glass)
            for zz in(z+.22,z+1.08,head-.23):b.cylinder(label+' hinge',(hx,8.858,zz),.011,.085,frame)
            handleX=end+(-.10 if side==0 else.10)
            for yy in(8.777,8.863):
                b.box(label+' handle rose',(handleX,yy,z+1.04),(.035,.012,.12),m['bronze'],.004)
                b.tube(label+' handle',[(handleX,yy,z+1.04),(handleX,yy+(-.045 if yy<8.82 else.045),z+1.04),(handleX+(-.10 if side==0 else.10),yy+(-.045 if yy<8.82 else.045),z+1.04)],.008,m['bronze'])
            members=[o.name for o in b.objects[start:]];door={'id':PREFIX+label,'wall':'Bedroom 3 rear','members':members,'hinge':[hx,8.858,z],'openingCenter':[(lo+hi)/2,8.82,z],'apertureAxis':[1 if side==0 else-1,0],'apertureWidth':hi-lo,'closedDelta':0,'openDelta':delta,'openDistance':1.25,'closeDistance':2.0,'authoredCompleteFrame':True,'structuralOpening':cfg['terraceOpening']}
            for ob in b.objects[start:]:ob['door_id']=door['id'];ob['door_hinge']=door['hinge'];ob['authored_complete_frame']=True;ob['walkthrough_opening_leaf']=True
            add('interactiveDoors',door,'proposed_doors');terrace.append(door['id'])
    if ns['VARIANT']=='compact':
        b.box('lounge vertical radiator backing',(4.94,5.94,3.65),(.055,.45,1.30),m['ivory'],.006)
        for i in range(9):b.box('lounge radiator flute',(4.902,5.74+i*.05,3.65),(.025,.036,1.27),m['ivory'],.006)
        b.obstacle('lounge radiator',[4.885,5.715,4.975,6.165],2.99,4.31)
    furnish(b,ns,cfg,m)
    b.finish({'revision':REVISION,'layout':cfg})
    # Update wall metadata and selectors alongside actual geometry and collisions.
    for values in groups('walls'):
        for v in values:
            if v['name']=='First west'and v.get('floor')==1:v['openings']=[[6.45,.9,0,2.081,'door']]
            if v['name']=='Bedroom 3 rear'and ns['VARIANT']=='compact':v['openings']=[[(cfg['terraceOpening'][0]+cfg['terraceOpening'][3])/2,cfg['terraceOpening'][3]-cfg['terraceOpening'][0],0,2.18,'door']]
    retire_rooms={'Bedroom 3','Combined bedroom suite','Suite dressing room','Suite bathroom','Upstairs family lounge','Side-wing connecting landing','Bedroom 4'}
    rooms=[('Terrace lounge',cfg['loungePolygon']),('West wing bedroom',cfg['westBedroom']),('West wing walk-through wardrobe',cfg['westDressing']),('West wing ensuite',cfg['westBathroom']),('Original bedroom suite',cfg['originalBedroom']),('Original bedroom ensuite',cfg['landingEnsuite']),('Stair passage',cfg['publicPassage'])]
    for values in groups('planRooms','new_rooms'):
        values[:]=[r for r in values if not(r.get('name')in retire_rooms and r.get('base_z',r.get('floor',0)*2.8)>2)]
    for label,r in rooms:
        poly=r if isinstance(r[0],list)else[[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]]
        add('planRooms',{'id':'terrace-suite-'+label.lower().replace(' ','-'),'name':label,'floor':1,'base_z':z,'polygon_m':poly},'new_rooms')
    labels={'2445679-0':('Terrace lounge',[4.20,6.98,z],[-1,.20,0]),'2445676-0':('Original bedroom suite',[3.20,2.65,z],[-1,-.6,0]),'2445677-0':('West wing walk-through wardrobe',[-1.48,2.68,z],[0,-1,0]),'proposal-side-wing-south-bedroom':('West wing walk-through wardrobe',[-1.48,2.68,z],[0,-1,0]),'proposal-upstairs-family-lounge':('West wing bedroom',[-1.45,6.65,z],[-1,-.5,0]),'proposal-side-south-ensuite':('West wing ensuite',[-3.38,2.4,z],[-1,0,0])}
    for values in groups('rooms','new_views'):
        for view in values:
            if view.get('id')in labels:label,p,d=labels[view['id']];view.update(label=label,position=p,direction=d)
    add('rooms',{'id':'proposal-original-bedroom-ensuite','label':'Original bedroom ensuite','group':'First floor','position':[2.40,3.87,z],'direction':[-.5,1,0]},'new_views')
    # All retired geometry, including the previous rear-window obstruction, leaves navigation.
    for key,pending in [('segments',None),('obstacles',None),('surfaces',None),('proposalLights',None),('mirrors',None)]:
        for values in groups(key,pending):values[:]=[v for v in values if v.get('name')not in removed]
    report={'revision':REVISION,'configuration':cfg,'removed':removed,'changed':[o.name for o in changed],'created':[o.name for o in b.objects],'terraceDoorIds':terrace,'privateDoorIds':[PREFIX+t for t in('lounge to west bedroom','west ensuite privacy','original ensuite privacy')],'westBedroomAreaM2':(cfg['westBedroom'][2]-cfg['westBedroom'][0])*(cfg['westBedroom'][3]-cfg['westBedroom'][1]),'landingEnsuiteAreaM2':(3.48-.115)*(5.615-3.255),'publicPassageWidthM':.93,'sourceLanding':'Landings 01 | continuous oak landing floor.001','sourceBedroomFloor':OLD+'Suite bedroom floor','published':False}
    nav['terraceLoungeSuite']=report;scene['terrace_lounge_suite_revision']=REVISION;scene['terrace_lounge_suite_report']=json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects,report

if 'scene'in globals()and 'nav'in globals()and globals().get('VARIANT')in('compact','planning'):
    apply_terrace_lounge_suite(globals())
