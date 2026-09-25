"""Shared physical construction for the three complete alternative designs.

Executed in build_redesign's namespace. Original objects are never mutated.
"""
from mathutils import Matrix

# New materials belong only to this option; source materials remain untouched.
white=mat('Redesign warm white render',(.80,.79,.73,1),.85)
plaster=mat('Redesign interior plaster',(.84,.82,.76,1),.85)
oak=mat('Redesign natural oak',(.45,.29,.14,1),.65)
black=mat('Redesign dark bronze',(.04,.047,.043,1),.42,.25)
glass=mat('Redesign clear glazing',(.55,.72,.77,.13),.1)
fabric=mat('Redesign oatmeal fabric',(.61,.58,.50,1),.95)
stone=mat('Redesign limestone',(.59,.57,.50,1),.85)
water=mat('Redesign pool water',(.06,.35,.44,.72),.16)
pooltile=mat('Redesign pool lining',(.24,.42,.46,1),.35)
gravel=mat('Redesign permeable gravel',(.36,.34,.29,1),.96)
brick='Red brown brick'
roofmat='Slate roof'
flatroof=mat('Redesign grey single-ply roof',(.17,.19,.20,1),.91)

ROOF_EPS=1e-8
import_functions('proposal_roofs.py',{'_roof_area','_roof_clean','_roof_clip','_roof_subtract','_roof_rect','_roof_plane','_roof_z','_roof_inside','_roof_rects_overlap','_roof_shell'})
import_functions('proposal_loft.py',{'_loft_patches'})


def original_wall_removed(name,reason):
    prefix_remove([name,'Proposal revision | '+name,'Circulation detail | Cove '+name,'Trim comparison | '+name,'Roof join | '+name+' masonry head'],reason)
    nav['walls']=[w for w in nav['walls'] if w['name']!=name]


def delete_room(name):
    nav['planRooms']=[r for r in nav['planRooms']if r['name']!=name]
    nav['rooms']=[r for r in nav['rooms']if r['label'].casefold()!=name.casefold()]


def new_floor(name,rect,z=0,material=None,thickness=.18):
    ob=slab(spec['code']+' | '+name,rect,z,thickness,material or oak,L)
    if z==0:new_surfaces[-1]['overridesTerrain']=True
    return ob


def ceiling(name,rect,z):
    return slab(spec['code']+' | '+name,rect,z+.06,.06,plaster,L,False)


def external_wall(name,a,b,z=0,holes=(),top=None,layer=None):
    perforated_wall(spec['code']+' | '+name,a,b,z,top if top is not None else z+2.60,list(holes),brick,layer or L,.23)


def carve_existing(rect,z0,z1,layers,reason,surface=False):
    for ob in list(scene.objects):
        if ob.type!='MESH':continue
        meta=base_index.get(ob.get('redesign_baseline_object',ob.name),{})
        if not any(meta.get('layer','').startswith(v)for v in layers):continue
        if surface and not any(term in name_of(ob).lower()for term in ('plot ground','circular driveway','rear terrace paving')):continue
        b=bounds(ob)
        if b[0]>=rect[2]or b[3]<=rect[0]or b[1]>=rect[3]or b[4]<=rect[1]or b[2]>=z1 or b[5]<=z0:continue
        new=edited_copy(ob,reason)
        (cut_surface if surface else cut)(new,rect,z0,z1)


def original_roof_height(x,y):
    return min(8.05,5.35+(x+.27)*2.7/3.63,5.35+(14.25-x)*2.7/3.63,5.35+(y+.28)*2.7/4.685,5.35+(9.09-y)*2.7/4.685)


def borrow_objects(names,layer):
    path=ROOT/'output-proposed-compact/Ashley Heights — Proposed (compact).blend'
    with bpy.data.libraries.load(str(path),link=False)as(src,dst):
        dst.objects=[n for n in names if n in src.objects]
    result=[]
    for ob in dst.objects:
        if ob is None:continue
        collection(layer).objects.link(ob);result.append(ob)
        for m in ob.data.materials if ob.type=='MESH' else []:
            if m:materials[m.name]=m;PALETTE[m.name]=list(m.diffuse_color)
    bpy.context.view_layer.update()
    # Appended parts can retain an assembly parent that was not linked into this
    # scene. glTF walks scene roots, so those parts silently disappear on export.
    # Flatten the borrowed assembly while preserving its evaluated placement.
    for ob in result:
        world=ob.matrix_world.copy()
        ob.parent=None
        ob.matrix_world=world
        ob['redesign_borrowed']=True
    bpy.context.view_layer.update()
    return result


def borrowed_gym(targets):
    index=json.loads((ROOT/'revisions/redesigns-2026-09-25/compact-object-index.json').read_text())
    source=json.loads((ROOT/'output-proposed-compact/navigation.json').read_text())
    for family,target in targets.items():
        prefix='Proposal | Gym '+family
        names=[o['object_name']for o in index if o['name'].startswith(prefix)and o['layer'].startswith('P60')]
        obs=borrow_objects(names,F)
        if not obs:continue
        bb=[bounds(ob)for ob in obs]
        cx=(min(b[0]for b in bb)+max(b[3]for b in bb))/2;cy=(min(b[1]for b in bb)+max(b[4]for b in bb))/2
        dx,dy=target[0]-cx,target[1]-cy
        angle=target[2]if len(target)>2 else 0
        transform=Matrix.Translation(Vector((target[0],target[1],0)))@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(Vector((-cx,-cy,0)))
        for ob in obs:
            ob.matrix_world=transform@ob.matrix_world;ob.name=spec['code']+' | '+name_of(ob);ob['source_name']=ob.name
        for item in source['obstacles']:
            if not item.get('name','').startswith(prefix):continue
            v=copy.deepcopy(item);v['name']=spec['code']+' | '+v['name']
            poly=rect_polygon(v.pop('box'))if'box'in v else v.get('polygon',[])
            if poly:v['polygon']=[list((transform@Vector((x,y,0)))[:2])for x,y in poly]
            new_obstacles.append(v)


plain_stair_flight=stair_flight
def stair_flight(name,start,end,width,steps,bottom,top,layer=L):
    plain_stair_flight(name,start,end,width,steps,bottom,top,layer)
    remove_matching(lambda ob:ob.name.startswith(name+' baluster'),'Use the specified oak stair balustrades',False)
    length=math.dist(start,end);nx=-(end[1]-start[1])/length;ny=(end[0]-start[0])/length
    for side in(-1,1):
        offset=side*(width/2+.055)
        a=[start[0]+nx*offset,start[1]+ny*offset];b=[end[0]+nx*offset,end[1]+ny*offset]
        raked_oak_guard(name+' oak guard '+str(side),a,b,bottom+(top-bottom)/steps,top,layer,.95)
        segment(name+' flight guard '+str(side),a,b,bottom+(top-bottom)/steps,top+1.05,.035)


def new_cinema(rect,z=0,seats=4):
    x0,y0,x1,y1=rect;cx=(x0+x1)/2
    box(spec['code']+' | Cinema screen',(cx,y1-.09,z+1.5),(min(2.7,x1-x0-.4),.07,1.5),black,F)
    sofa(spec['code']+' | Cinema front row',cx,y1-1.65,min(2.30,x1-x0-1.05),math.pi,z)
    sofa(spec['code']+' | Cinema back row',cx,y1-3.15,min(2.30,x1-x0-1.05),math.pi,z)
    slab(spec['code']+' | Cinema acoustic carpet',rect,z+.01,.015,fabric,F,False)


def make_loft(workspace_only=False):
    # The stair is in the former fifth bedroom. Its original door and main
    # staircase are retained; adjacent bedroom walls move by small amounts.
    clear_furniture([.1,2.65,4.98,6.24],2.8,'Form the side connection and a real dogleg loft stair')
    original_wall_removed('Bedroom 5 hall','Open the former fifth bedroom to the new stair approach')
    original_wall_removed('Bedroom 3 to 5','Move this partition 470 mm to clear the new stair')
    original_wall_removed('Bedroom 5 to 4','Move this partition 390 mm to provide a metre-wide side passage')
    original_wall_removed('Bedroom 3 hall door','Existing doorway becomes the open stair approach')
    partition('Bedroom 3 revised south wall',[0,6.15],[5.04,6.15],2.8,door=(4.35,.86))
    partition('Bedroom 4 revised north wall',[0,2.80],[3.78,2.80],2.8)
    partition('Bedroom 4 short north return',[3.78,2.80],[3.78,3.19],2.8)
    replace_original_wall('First west',[[3.39,.98,0,2.1,'open']],'One opening connects the existing landing to the side extension')
    update_room('Bedroom 3',polygon=rect_polygon([0,6.21,5.04,8.82]),kind='bedroom')
    update_room('Bedroom 4',polygon=[[0,2.74],[3.84,2.74],[3.84,3.19],[5.061,3.19],[5.061,2.19],[4.28,2.19],[4.28,0],[0,0]],kind='bedroom')
    update_room('Bedroom 5','Side connection and loft stair',polygon=rect_polygon([.02,2.86,5.0,6.09]),kind='circulation')
    clear_furniture([.1,.1,4.22,2.76],2.8,'Refit Bedroom 4 to the adjusted partition')
    bed(spec['code']+' | Bedroom 4 bed',2.10,1.34,2.8,1.50,2.0,angle=math.pi/2,sides=(False,False))
    wardrobe(spec['code']+' | Bedroom 4 wardrobe',[.18,.16,.78,1.3],2.8)
    clear_furniture([.1,6.2,4.98,8.72],2.8,'Refit Bedroom 3 within its retained garden window')
    bed(spec['code']+' | Bedroom 3 bed',2.50,7.45,2.8,1.50,2.0,angle=math.pi/2,sides=(False,False))
    wardrobe(spec['code']+' | Bedroom 3 wardrobe',[.15,6.25,.75,7.65],2.8)
    # The midlanding fits below the original west hip, with >2 m theoretical
    # clearance including a 250 mm roof/lining allowance. Audit the real mesh.
    void=[1.27,3.86,4.10,6.06]
    carve_existing(void,5.0,5.70,['25 Ceilings'],'Local ceiling opening for the new loft stair')
    stair_flight(spec['code']+' | Loft stair lower flight',[4.0,5.505],[2.32,5.505],1.0,7,2.8,4.175,T)
    slab(spec['code']+' | Loft stair half landing',[1.32,3.905,2.32,6.005],4.175,.18,oak,T)
    stair_flight(spec['code']+' | Loft stair upper flight',[2.32,4.405],[4.0,4.405],1.0,7,4.175,5.55,T)
    # Slab overlaps end risers by a small construction allowance.
    slab(spec['code']+' | Loft top landing',[3.98,3.905,5.15,4.905],5.55,.18,oak,T)
    oak_guard(spec['code']+' | Loft half-landing west guard',[1.32,3.905],[1.32,6.005],4.175,T)
    oak_guard(spec['code']+' | Loft half-landing south guard',[1.32,3.905],[2.32,3.905],4.175,T)
    oak_guard(spec['code']+' | Loft half-landing north guard',[1.32,6.005],[2.32,6.005],4.175,T)
    # Low-headroom parts underneath the flights cannot be used as passage.
    obstacle(spec['code']+' | Stair undercroft low headroom',[1.27,3.86,3.28,6.06],2.8,4.85)
    new_obstacles[-1]['maxFootZ']=2.95
    loft_rect=[2.0,2.2,12.0,8.0];chimney=[9.97,5.30,10.84,6.30]
    for i,r in enumerate(_loft_patches([loft_rect],[void,chimney])):
        slab(spec['code']+' | Loft physical deck '+str(i),r,5.55,.20,oak,T,False)
    standing=[3.0239,3.9712,10.9561,4.8388]
    for i,r in enumerate(_loft_patches([standing] if workspace_only else [standing,spec['rearDormer']],[void,chimney])):
        new_surfaces.append({'name':spec['code']+' | Loft standing floor '+str(i),'polygon':rect_polygon(r),'z':5.55})
    rect_room('Loft landing',[4.0,3.9712,9.60,4.8388],5.55,'circulation')
    rect_room('Loft workspace',[9.60,3.20,11.40,4.8388],5.55,'study')
    desk('Loft workspace desk',[9.68,3.13,10.88,3.74],5.55)
    d=spec['rearDormer'];x0,y0,x1,y1=d
    # Copy the original roof; cut only the dormer and workspace rooflight.
    main=next(o for o in scene.objects if name_of(o)=='Main hipped roof')
    revised=edited_copy(main,'Local rear dormer and rooflight openings; keep original roof control geometry')
    if not workspace_only:cut(revised,[x0+.03,y0+.02,x1-.03,y1-.02],5.50,8.20)
    rooflight=[9.70,2.90,10.90,3.65]
    cut(revised,rooflight,5.60,8.20)
    lining=revised.copy();lining.data=revised.data.copy();lining.name=spec['code']+' | Original loft roof lining';lining['source_name']=lining.name
    lining.location.z-=.14;lining.data.materials.clear();lining.data.materials.append(materials[plaster]);collection(T).objects.link(lining)
    for face in lining.data.polygons:face.material_index=0
    # The rooflight follows the existing south pitch; glass and frame sit above
    # the opening instead of being painted onto an opaque roof.
    points=[(x,y,original_roof_height(x,y)+.025)for x,y in rect_polygon(rooflight)]
    mesh(spec['code']+' | Loft workspace rooflight glass',points,[(0,1,2,3)],glass,T)
    for i in range(4):beam(spec['code']+' | Loft rooflight frame',points[i],points[(i+1)%4],.065,black,T)
    if workspace_only:
        new_rooms[-2]['name']='Loft workspace and landing'
        desk('Loft second workspace',[6.3,3.12,8.3,3.73],5.55)
        view('Loft workspace',8.7,4.40,5.55,(-1,-.3))
        view('Loft stair',4.5,4.4,5.55,(-1,0))
        view('Bedroom 3',4.3,7.0,2.8,(-1,.2));view('Bedroom 4',3.6,2.4,2.8,(-1,-.5))
        view('Side connection and loft stair',2.8,3.36,2.8,(1,.5))
        nav['loftHeadroom']={'floor_z':5.55,'roof_allowance_m':.25,'two_metre_contour':standing,'stair_void':void,'stair_risers':14,'riser_m':2.75/14,'going_m':.28,'flight_width_m':1.0,'original_ridge_z':8.05,'basis':'Workspace under the retained hip roof. Low eaves are not counted as standing space; no additional dormer.'}
        return
    # Cheeks are closed down to the deck; inner linings preserve a plaster room.
    for label,x in [('west',x0),('east',x1)]:
        wall(spec['code']+' | Dormer '+label+' cheek',[x,y0],[x,y1],5.55,7.65,roofmat,T,.16)
    external_wall('Dormer face',[x0,y1],[x1,y1],5.55,[[1.50,2.00,.70,2.03,'window'],[4.25,1.10,1.12,2.03,'window']],7.65,T)
    slab(spec['code']+' | Dormer single-ply roof',[x0-.08,y0-.08,x1+.08,y1+.10],7.85,.20,flatroof,T,False)
    ceiling('Dormer ceiling',[x0+.08,y0+.08,x1-.08,y1-.08],7.65)
    partition('Loft guest entrance',[x0+.08,5.02],[x1-.08,5.02],5.55,door=(.55,.90),height=2.10)
    ensuite('Loft guest en suite',[7.52,5.75,9.48,7.88],5.55,'west',.65,'Loft guest bedroom',sides=('west','south'))
    guest=rect_room('Loft guest bedroom',[x0+.08,5.08,9.48,7.92],5.55,'bedroom')
    guest['polygon_m']=[[x0+.08,5.08],[9.48,5.08],[9.48,5.69],[7.46,5.69],[7.46,7.92],[x0+.08,7.92]]
    bed(spec['code']+' | Loft guest bed',5.91,6.83,5.55,1.50,2.0,sides=(False,False))
    wardrobe(spec['code']+' | Loft guest wardrobe',[7.63,5.14,9.33,5.69],5.55,1.95)
    view('Loft guest bedroom',5.00,5.53,5.55,(.4,1))
    view('Loft workspace',10.20,4.28,5.55,(0,-1))
    view('Loft stair',4.5,4.4,5.55,(-1,0))
    view('Bedroom 3',4.3,7.0,2.8,(-1,.2));view('Bedroom 4',3.6,2.4,2.8,(-1,-.5))
    view('Side connection and loft stair',2.8,3.36,2.8,(1,.5))
    nav['loftHeadroom']={'floor_z':5.55,'roof_allowance_m':.25,'two_metre_contour':standing,'dormer_clear_height_m':2.10,'dormer':d,'stair_void':void,'stair_risers':14,'riser_m':2.75/14,'going_m':.28,'flight_width_m':1.0,'original_ridge_z':8.05,'dormer_roof_z':7.85,'basis':'Geometric concept dimensions; measured roof construction and a Building Regulations fire/structure strategy remain necessary.'}


def side_envelope(rear):
    # Foundations and new upper-floor loads need an engineer's design. Main
    # house front windows, entrance, stair and original roof ridge stay put.
    prefix_remove(['Garage flat roof','Garage front curved parapet','Roof join | Garage continuous parapet coping','Roof join | Garage rear fascia','Roof join | Garage rear soffit','Roof join | Garage west fascia','Roof join | Garage west soffit'], 'Replace the garage roof locally for a subordinate upper storey')
    new_floor('Side first floor',[-5.18,.9,0,rear],2.8)
    ceiling('Side first-floor ceiling',[-5.18,.9,0,rear],5.15)
    external_wall('Side first south',[-5.18,.9],[0,.9],2.8,[[1.33,1.25,1.60,2.18,'window'],[3.83,1.70,.82,2.18,'window']] if OPTION=='e2' else [[2.60,2.40,.82,2.18,'window']],5.4)
    external_wall('Side first west',[-5.18,.9],[-5.18,rear],2.8,[[3.48,.80,1.76,2.18,'window']],5.4)
    external_wall('Side first north',[-5.18,rear],[0,rear],2.8,[[2.60,2.60,.82,2.18,'window']],5.4)
    if rear>8.82:external_wall('Side first east return',[0,8.82],[0,rear],2.8,[],5.4)
    # A hip roof below the original ridge, with an abutment to the existing
    # west roof. Exact roof unions are reviewed separately after construction.
    hip_roof(spec['code']+' | Subordinate side roof',[-5.43,.63,.10,rear+.27],5.4,7.05,L,roofmat,.25)
    nav.setdefault('redesignRoofs',{})['side']={'bounds_m':[-5.43,.63,.10,rear+.27],'eave_m':5.4,'ridge_m':7.05}
    beam(spec['code']+' | Side roof west gutter',(-5.44,.63,5.34),(-5.44,rear+.27,5.34),.10,black,L)
    beam(spec['code']+' | Side roof front gutter',(-5.43,.63,5.34),(.1,.63,5.34),.10,black,L)
    slab(spec['code']+' | Side entrance canopy',[-5.25,-.07,.05,.95],2.82,.16,flatroof,L,False)
    if OPTION=='e1':
        update_room('Garage','Retained double garage',kind='garage')
        translate_assembly(['Photo detail | Garage west workbench'],[0,2.35,0],'Move the garage bench behind the two parking spaces')
        clear_furniture([-5.1,.1,-.1,5.8],0,'Clear the retained garage front for two compact cars')
        clear_furniture([.05,4.05,5.0,8.7],0,'Refit the original kitchen around a family-sized island')
        update_room('Kitchen breakfast room','Family kitchen',kind='kitchen')
        counter('Kitchen sink run',[.15,4.12,3.35,4.77],0,sink=True)
        counter('Kitchen tall units',[4.30,5.60,4.94,8.40],0,tall=True)
        counter('Kitchen island',[1.45,6.0,2.55,7.9],0,hob=True)
        view('Family kitchen',3.30,5.35,0,(-.5,1))
        return
    replace_original_wall('Garage front',[[2.59,3.90,.60,2.30,'window']],'Convert the existing garage opening to a living-room window',brick)
    original_wall_removed('Garage utility partition','Remove two utility partitions to open the former garage as family living')
    original_wall_removed('Utility south','Relocate the utility to the existing kitchen services area')
    clear_furniture([-5.1,.08,-.05,8.73],0,'Refit the former garage as family living')
    delete_room('Utility')
    update_room('Garage','Open-plan family living',polygon=rect_polygon([-5.065,.115,-.115,8.705]),kind='living')
    replace_original_wall('Garage kitchen partition',[[2.45,3.55,0,2.30,'open']],'Beam-supported opening joins the old kitchen and former garage')
    update_room('Kitchen breakfast room','Prep kitchen and utility',kind='utility')
    clear_furniture([.05,4.05,5.0,8.7],0,'Refit prep kitchen and utility around the wide family-living opening')
    counter('Prep kitchen sink',[4.30,5.55,4.94,8.40],0,sink=True)
    counter('Utility laundry cupboards',[.15,7.63,1.95,8.54],0,tall=True)
    sofa(spec['code']+' | Family living sofa',-2.60,2.80,2.65,0)
    box(spec['code']+' | Family living low table',(-2.6,1.60,.34),(1.25,.65,.06),oak,F)
    obstacle(spec['code']+' | Family living low table',[-3.225,1.275,-1.975,1.925],0,.4)
    desk('Family living media cabinet',[-4.65,.30,-.50,.70])
    box(spec['code']+' | Family living television',(-2.60,.20,1.25),(1.75,.07,1.0),black,F)
    view('Open-plan family living',-1.05,4.35,0,(-.45,-1))


def rear_kitchen(rect):
    x0,y0,x1,y1=rect
    carve_existing(rect,-2,3.3,['50 Site'], 'Ground footprint of the new rear addition',True)
    new_floor('Rear family kitchen floor',rect,0,oak)
    ceiling('Rear family kitchen ceiling',rect,2.72)
    slab(spec['code']+' | Rear addition flat roof',[x0-.15,y0,x1+.18,y1+.18],3.02,.24,flatroof,R,False)
    external_wall('Rear addition west',[x0,y0],[x0,y1],0,[],2.80,R)
    external_wall('Rear addition north',[x0,y1],[x1,y1],0,[[2.0,2.65,.90,2.40,'window'],[7.48,2.80,0,2.45,'glassdoor']],2.80,R)
    external_wall('Rear addition east',[x1,y0],[x1,y1],0,[[1.9,2.50,.55,2.4,'window']],2.80,R)
    if OPTION=='e1':
        replace_original_wall('Garage rear',[],'Infill the old garage rear openings to separate it from the new living room')
        replace_original_wall('Kitchen rear',[[2.66,3.36,0,2.30,'open']],'Lower the existing rear kitchen window to connect to the family room')
        sofa(spec['code']+' | Garden living sofa',-2.90,10.90,2.60,0)
        desk('Garden media cabinet',[-4.65,9.03,-2.10,9.52])
        box(spec['code']+' | Garden television',(-3.70,8.99,1.45),(1.80,.07,1.02),black,F)
        box(spec['code']+' | Garden living low table',(-2.90,9.92,.33),(1.15,.60,.07),oak,F)
        obstacle(spec['code']+' | Garden living low table',[-3.475,9.62,-2.325,10.22],0,.4)
        table(spec['code']+' | Family dining',1.65,10.95,2.60,1.0)
        rect_room('Garden living and dining',[x0+.115,y0+.04,x1-.115,y1-.115],0,'living')
    else:
        replace_original_wall('Garage rear',[[1.22,1.95,0,2.30,'open']],'Widen the existing rear garage opening to the family kitchen')
        replace_original_wall('Utility rear',[[1.37,2.10,0,2.30,'open']],'Open the former utility rear wall to the new kitchen')
        replace_original_wall('Kitchen rear',[[2.66,3.36,0,2.30,'open']],'Lower the existing rear kitchen window to connect to the addition')
        counter('Main kitchen west cabinets',[x0+.18,y0+.30,x0+.83,y1-.23],0,sink=True)
        counter('Main kitchen tall storage',[x0+1.08,y0+.15,x0+2.90,y0+.79],0,tall=True)
        counter('Main kitchen island',[-2.88,9.69,-1.72,11.90],0,hob=True)
        table(spec['code']+' | Family dining',1.65,10.95,2.60,1.0)
        rect_room('Garden kitchen and dining',[x0+.115,y0+.04,x1-.115,y1-.115],0,'kitchen')
    # New upper side floor bears onto a designed rear beam; the column is in
    # the plan and collision model, not hidden by the kitchen label.
    if OPTION=='e1':
        box(spec['code']+' | Side-floor rear beam',(-2.59,9.82,2.65),(5.18,.25,.30),plaster,L)
        box(spec['code']+' | Side-floor rear column',(-.12,9.82,1.25),(.24,.24,2.50),plaster,L)
        obstacle(spec['code']+' | Side-floor rear column',[-.24,9.70,0,9.94],0,2.80)
    view('Garden living' if OPTION=='e1' else 'Garden kitchen',-.10,11.0,0,(-1,.15))


def original_principal_suite():
    clear_furniture([9.02,.12,13.86,3.72],2.8,'Original Bedroom 2 becomes principal study and walk-through wardrobe')
    replace_original_wall('Principal bedroom 2',[[1.72,.95,0,2.10,'door']],'Single new doorway from principal dressing into the bedroom')
    replace_original_wall('Principal hall entrance',[],'Private principal entry runs through its dressing room')
    partition('Principal dressing entry vestibule',[10.05,.12],[10.05,3.075],2.8,door=(1.05,1.15))
    wardrobe(spec['code']+' | Principal west wardrobe',[10.15,1.8,10.75,3.23],2.8)
    wardrobe(spec['code']+' | Principal east wardrobe',[13.15,1.8,13.75,3.23],2.8)
    desk('Principal window study',[11.55,.28,13.48,.98],2.8)
    clear_furniture([9.13,3.96,13.86,8.70],2.8,'Keep the new dressing-room doorway clear')
    bed(spec['code']+' | Garden principal bed',11.55,7.15,2.8,1.8,2.0,sides=(True,True))
    update_room('Bedroom 2','Principal study and walk-through dressing',kind='dressing')
    update_room('Principal bedroom','Garden principal bedroom',kind='bedroom')
    update_room('Principal en suite',kind='ensuite',ensuite_for='Garden principal bedroom')
    view('Garden principal bedroom',10.1,5.0,2.8,(.5,1))
    view('Principal study and walk-through dressing',11.7,1.35,2.8,(0,1))


def side_guest_rooms():
    # Eastern circulation stem connects the original first-floor landing to
    # two private rooms. The rear room projects only one metre beyond the old house.
    partition('Side bedroom east hall wall',[-1.29,2.90],[-1.29,5.63],2.8,door=(1.60,.90),height=2.35)
    partition('Side bedrooms cross wall',[-5.18,5.63],[0,5.63],2.8,door=(4.50,.90),height=2.35)
    ensuite('Side south en suite',[-5.04,3.40,-3.06,5.45],2.8,'east',.65,'Side south bedroom')
    south=rect_room('Side south bedroom',[-5.065,1.015,-1.35,5.57],2.8,'bedroom')
    south['polygon_m']=[[-5.065,1.015],[-.115,1.015],[-.115,2.84],[-1.35,2.84],[-1.35,5.57],[-3.0,5.57],[-3.0,3.34],[-5.065,3.34]]
    bed(spec['code']+' | Side south bed',-4.0,2.10,2.8,1.5,2.0,angle=math.pi,sides=(False,False))
    wardrobe(spec['code']+' | Side south wardrobe',[-1.98,1.18,-1.35,2.74],2.8)
    rect_room('Side connecting corridor',[-1.23,2.90,-.115,5.57],2.8,'circulation')
    ensuite('Side north en suite',[-5.04,5.72,-3.06,7.82],2.8,'east',.65,'Side north bedroom')
    rect_room('Side north bedroom',[-5.065,5.69,-.115,9.705],2.8,'bedroom')
    bed(spec['code']+' | Side north bed',-1.56,8.40,2.8,1.5,2.0,sides=(False,False))
    wardrobe(spec['code']+' | Side north wardrobe',[-4.95,8.95,-3.30,9.56],2.8)
    view('Side south bedroom',-2.15,4.80,2.8,(-.5,-1))
    view('Side north bedroom',-1.8,6.8,2.8,(0,1))


def e1_ground_rooms():
    clear_furniture([.05,-.28,4.25,3.9],0,'Original family room becomes the cinema')
    update_room('Family room','Cinema',kind='cinema');new_cinema([.15,.02,4.17,3.83])
    clear_furniture([9.01,-.28,13.86,8.73],0,'Divide the existing drawing room into gym, cross-hall and guest suite')
    delete_room('Drawing room')
    partition('Gym north wall',[8.95,3.78],[13.98,3.78],0,door=(3.05,.95))
    partition('Ground guest south wall',[8.95,4.91],[13.98,4.91],0,door=(3.15,.95))
    rect_room('Gym',[9.015,-.20,13.865,3.72],0,'gym')
    rect_room('East cross-hall',[9.015,3.84,13.865,4.85],0,'circulation')
    rect_room('Ground guest bedroom',[9.015,4.97,13.865,8.705],0,'bedroom')
    ensuite('Ground guest en suite',[9.05,5.05,11.15,7.15],0,'east',.65,'Ground guest bedroom')
    bed(spec['code']+' | Ground guest bed',12.60,7.25,0,1.5,2.0,sides=(False,False))
    wardrobe(spec['code']+' | Ground guest wardrobe',[9.15,7.4,9.75,8.50],0)
    borrowed_gym({'treadmill 2':[12.90,2.735,math.pi/2],'rower':[10.15,1.50],'dumbbell rack':[10.20,3.20],'weights bench':[11.40,.90]})
    clear_furniture([5.13,5.2,8.78,10.08],0,'Refit the original dining room as the separate wine bar')
    update_room('Dining room','Wine bar room',kind='wine-bar')
    counter('Wine bar wall',[5.18,6.10,5.83,9.00],0,sink=True)
    table(spec['code']+' | Wine tasting table',7.27,7.10,1.45,.80)
    counter('Wine storage cabinet',[7.75,8.90,8.55,9.48],0,tall=True)
    view('Cinema',3.65,1.50,0,(-.5,1))
    view('Gym',11.50,2.50,0,(.6,-1))
    view('Ground guest bedroom',11.75,5.52,0,(.5,1))
    view('Wine bar room',6.4,5.8,0,(0,1))
