"""Practical garage fittings around retained vehicles, doors and envelope."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import json,math
from scripts.interiors.interior_furnishing import RoomBuilder
REPLACED=('Proposal | Garage north ceiling','Proposal | Garage south ceiling','Proposal | Workshop west ceiling','Proposal | Workshop east ceiling')

def apply_garage(ns):
    import bpy
    from mathutils import Vector,Matrix
    from mathutils.geometry import tessellate_polygon
    cfg=json.loads((ns['ROOT']/'proposal/interiors/leisure/garage.json').read_text());nav=ns['nav'];b=RoomBuilder(ns,'garage','Garage 01 | ','P80 Double garage');b.remove(REPLACED)
    nav['proposalLights']=[p for p in nav.get('proposalLights',[])if not p['name'].startswith(b.prefix)and not p['name'].startswith(('Garage north','Garage south','Workshop west','Workshop east'))]
    # Reposition complete existing car assemblies, idempotently, with exact declarations.
    site=nav['proposalSite'];transforms=[]
    # Add the new parked car after wall-finish classification. A transient car
    # must not change which retained masonry faces are inside or outside.
    if '_proposal_compact_car'in ns and not any(c['bay']=='N3'for c in site['cars']):
        fourth=cfg['fourthBay'];bay={**next(c for c in ns['_site_spec']['bays']if c['id']=='N2'),'id':fourth['id'],'bounds_m':fourth['bounds_m'],'long_axis_m':4.8,'width_m':2.5,'vehicle_heading_radians':fourth['heading'],'validation':'Current-model tracking and pedestrian route checks in revisions/interiors-overnight-2026-09-27/garage/'}
        ns['_proposal_compact_car'](bay,5)
        a,s,c,n=bay['bounds_m']
        for sx,x in((1,a),(-1,c)):
            for sy,y in((1,s),(-1,n)):
                ns['box']('Proposal | Parking N3 limestone corner',(x+sx*.155,y,0),(.31,.045,.018),ns['stone'],ns['S'])
                ns['box']('Proposal | Parking N3 limestone return',(x,y+sy*.155,0),(.045,.31,.018),ns['stone'],ns['S'])
        ns['new_surfaces'].append({'name':'Proposal | Parking N3 support','polygon':[[a,s],[c,s],[c,n],[a,n]],'z':0})
        site['driveway_bay_bounds_m'].append({'id':'N3','bounds_m':bay['bounds_m']})
        site['parking_count']['driveway']=4;site['fourth_outdoor_bay']=fourth;site['path_proof']='revisions/interiors-overnight-2026-09-27/garage/'
    for setting in cfg['cars']:
        car=next(c for c in site['cars']if c['bay']==setting['id']);old=car['centre_m'];target=setting['center'];dx,dy=target[0]-old[0],target[1]-old[1];names=set(car['objects']);found=[]
        tr=Matrix.Translation(Vector((dx,dy,0)))
        for ob in ns['scene'].objects:
            if ob.name in names or ob.get('source_name',ob.name)in names:
                ob.matrix_world=tr@ob.matrix_world;found.append(ob.name)
        assert len(found)==len(names),(setting['id'],len(found),len(names))
        for values in(nav['obstacles'],ns.get('new_obstacles',[])):
            for o in values:
                if o['name']=='Proposal | Compact car '+setting['id']:
                    a,s,c,n=o['box'];o['box']=[a+dx,s+dy,c+dx,n+dy]
        bb=car['actual_mesh_bounds_m'];car['actual_mesh_bounds_m']=[bb[0]+dx,bb[1]+dy,bb[2],bb[3]+dx,bb[4]+dy,bb[5]];car['centre_m']=target
        car['route_validation']='Staggered garage position; front-door use and walking routes checked separately from outside drive tracking.'
        base=setting['baselineCenter'];transforms.append({'object_names':car['objects'],'rotation_z':0,'centre':[0,0,0],'translation':[target[0]-base[0],target[1]-base[1],0]})
    site['new_garage_clear_bounds_m']=cfg['bounds'];site['new_garage_clear_polygon_m']=cfg['polygon'];site['garage_car_door_check_degrees']=cfg['frontDoorCheckDegrees']
    if 'proposal_site_review'in ns:ns['proposal_site_review'].update(site)
    if 'g'in ns:ns['g']['proposal_site_review']=site
    (ns['OUT']/'site-review.json').write_text(json.dumps(site,indent=2)+'\n')
    for r in nav['planRooms']+ns.get('new_rooms',[]):
        if r['name']=='New double garage':r['polygon_m']=cfg['polygon']
    t='proposal/interiors/kitchen/textures/'
    oak=b.material('natural oak',(.60,.57,.50,1),.58,texture=t+'pale-oak.png');stone=b.material('warm stone worktop',(.81,.79,.72,1),.50,texture=t+'warm-limestone.png')
    ivory=b.material('warm ivory',(.91,.885,.825,1),.85);grey=b.material('warm grey cabinet',(.55,.56,.52,1),.50);floor=b.material('warm grey resin',(.60,.60,.565,1),.58);rubber=b.material('rubber and shadow',(.037,.043,.037,1),.87);bronze=b.material('satin bronze',(.32,.255,.17,1),.35,.78);steel=b.material('satin steel',(.48,.49,.46,1),.31,.82)
    light=b.material('warm diffuser',(1,.86,.72,1),.55,emission=1.6);green=b.material('charger status',(.24,.72,.42,1),.45,emission=.6);blue=b.material('muted tool handles',(.18,.26,.27,1),.76)
    def plane(label,poly,z,mat,down=False):
        vv=[Vector((x,y,z))for x,y in poly];index={tuple(v):i for i,v in enumerate(vv)};ff=[tuple(v if isinstance(v,int)else index[tuple(v)]for v in tri)for tri in tessellate_polygon([vv])]
        ob=b.mesh(label,vv,[tuple(reversed(f))for f in ff]if down else ff,mat);return ob
    plane('continuous resin floor',cfg['polygon'],.002,floor)
    plane('ivory garage ceiling',[[5.16,-16.076],[11.20,-16.076],[11.20,-10.02],[5.16,-10.02]],2.544,ivory,True)
    plane('ivory garage wing ceiling',[[3.49,-15.86],[5.16,-15.86],[5.16,-10.02],[3.49,-10.02]],2.534,ivory,True)
    for a,s,c,n in((5.16,-16.075,11.19,-16.060),(3.49,-15.859,5.16,-15.844),(6.17,-10.036,11.19,-10.021),(11.185,-16.06,11.199,-13.87),(11.185,-12.93,11.199,-10.035)):
        b.box_bounds('durable grey skirting',[a,s,c,n],.003,.143,grey,.003)
    # East-wall storage is beside the southern car's front, away from both doors.
    a,s,c,n=cfg['storage'];cx=(a+c)/2;cy=(s+n)/2;split=cfg['tallSouthY'];w=split-s
    b.box_bounds('storage recessed plinth',[a+.035,s+.025,c-.025,n-.025],.002,.085,rubber)
    b.box('storage cabinet back',(c-.010,cy,.46),(.020,n-s,.76),ivory,.003)
    for yy in(s+.013,split,n-.013):b.box('storage base upright',(cx+.0375,yy,.46),(c-a-.075,.026,.76),oak,.003)
    for hh in(.098,.828):b.box('storage base horizontal',(cx+.0375,cy,hh),(c-a-.075,n-s,.026),oak,.004)
    # Tall cupboard has sliding fronts and adjustable shelves, not an aisle-wide leaf.
    b.box('tall cupboard back',(c-.010,(s+split)/2,1.51),(.020,w,1.33),ivory,.003)
    for yy in(s+.013,split-.013):b.box('tall cupboard upright',(cx+.0375,yy,1.50),(c-a-.075,.026,1.35),oak,.003)
    for hh in(1.10,1.54,2.19):b.box('tall cupboard shelf',(cx+.032,(s+split)/2,hh),(c-a-.064,w,.024),oak,.004)
    for j in range(2):
        yy=s+(j+.5)*w/2;xx=a+.013+j*.026;b.box('tall sliding front',(xx,yy,1.147),(.022,w/2+.009,2.050),grey,.004)
        b.box('tall recessed pull',(xx-.012,yy+(w/2-.07)/2,1.18),(.004,.016,.22),bronze,.004)
    # Two complete drawers under a stone worktop.
    cyb=(split+n)/2;bw=n-split-.042
    for row,(low,high)in enumerate(((.13,.44),(.475,.788))):
        start=len(b.objects);b.box('bench drawer bottom',(cx+.001,cyb,low+.011),(c-a-.048,bw-.026,.016),oak)
        for yy in(split+.036,n-.036):b.box('bench drawer side',(cx+.001,yy,(low+high)/2),(c-a-.048,.016,high-low),oak)
        b.box('bench drawer back',(c-.042,cyb,(low+high)/2),(.017,bw-.026,high-low),oak)
        b.box('bench drawer front',(a+.014,cyb,(low+high)/2),(.024,bw,high-low+.02),grey,.004)
        b.box('bench drawer recessed pull',(a+.0005,cyb,high-.040),(.005,bw-.10,.014),bronze,.003)
        for ob in b.objects[start:]:ob['garage_pullout']=row
        for yy in(split+.030,n-.030):b.box('bench fixed drawer runner',(cx+.022,yy,low+.04),(c-a-.07,.010,.025),steel)
    b.box('honed stone worktop',(cx-.010,cyb,.8735),(c-a+.02,n-split,.065),stone,.013)
    # Recessed task panel and a compact set of useful hand tools.
    b.box('worktop oak splash panel',(c-.027,cyb,1.274),(.033,n-split-.04,.735),oak,.007)
    b.box('worktop concealed diffuser',(c-.062,cyb,1.640),(.012,n-split-.12,.010),light,.003)
    for yy in(cyb-.40,cyb-.18):
        b.box('worktop socket plate',(c-.048,yy,1.13),(.010,.13,.085),bronze,.004)
        for d in(-.038,.038):
            for zz in(1.119,1.144):b.box('worktop socket aperture',(c-.054,yy+d,zz),(.002,.012,.008),rubber,.001)
    for k in range(3):
        yy=cyb-.32+k*.16;b.cylinder('tool rail peg',(c-.077,yy,1.46),.005,.066,steel,(-1,0,0),20)
        b.box('screwdriver grip',(c-.100,yy,1.373),(.036,.039,.117),blue,.012)
        b.cylinder('screwdriver shaft',(c-.100,yy,1.260),.0038,.112,steel,sides=16)
        b.box('screwdriver slotted tip',(c-.100,yy,1.201),(.0025,.007,.012),steel,.001)
    b.box('closed tool case',(cx,cyb+.20,.9535),(.35,.48,.095),grey,.019)
    for yy in(cyb+.065,cyb+.335):b.box('tool case latch',(a+.12,yy,.9475),(.024,.034,.036),bronze,.004)
    b.tube('tool case handle',[(cx+.10,cyb+.11,1.0015),(cx+.10,cyb+.11,1.0395),(cx+.10,cyb+.29,1.0395),(cx+.10,cyb+.29,1.0015)],.008,rubber,3)
    b.obstacle('complete bench and cupboard',[a-.02,s,c,n],0,2.22)
    # Wall-mounted chargers keep their parked cables off the walking surface.
    for label,xx,yy,sign in(('south',4.13,-15.815,1),('north',4.13,-10.065,-1)):
        b.box(label+' charger body',(xx,yy,1.17),(.225,.090,.36),ivory,.032)
        b.box(label+' charger dark face',(xx,yy+sign*.046,1.17),(.179,.004,.296),rubber,.023)
        b.box(label+' charger status lens',(xx,yy+sign*.050,1.282),(.074,.003,.008),green,.003)
        b.box(label+' charger button',(xx,yy+sign*.050,1.187),(.031,.003,.031),bronze,.011)
        for j in range(2):
            points=[(xx+.12*math.cos(k*math.tau/64),yy+sign*(.077+j*.011),.78+.14*math.sin(k*math.tau/64))for k in range(65)]
            b.tube(label+' coiled charge cable',points,.010,rubber,3)
        b.tube(label+' charger cable tail',[(xx,yy+sign*.052,.997),(xx,yy+sign*.075,.91),(xx+.12,yy+sign*.080,.78)],.010,rubber,3)
        b.box(label+' charge connector grip',(xx+.18,yy+sign*.050,.82),(.046,.068,.13),rubber,.017)
        b.cylinder(label+' charge connector cap',(xx+.18,yy+sign*.051,.895),.025,.025,ivory,sides=32)
        for j in range(5):b.cylinder(label+' charge connector contact',(xx+.18+.012*math.cos(j*math.tau/5),yy+sign*.051+.012*math.sin(j*math.tau/5),.909),.0025,.005,bronze,sides=12)
    # New ceiling fittings are fixed above the cars, beyond the overhead-door travel.
    for xx,yy in((6.90,-14.38),(8.30,-11.72)):
        b.box('linear ceiling housing',(xx,yy,2.510),(1.65,.095,.065),grey,.016)
        b.box('linear ceiling diffuser',(xx,yy,2.475),(1.58,.073,.007),light,.011)
        for dx in(-.60,.60):b.cylinder('ceiling housing fixing',(xx+dx,yy,2.468),.005,.005,bronze,sides=20)
        b.light('parking task light '+str(yy),(xx,yy,2.37),.45,45,3.3)
    b.light('workbench light',(10.94,cyb,1.56),.32,23,1.8)
    b.light('garage approach fill',(4.3,-12.9,2.31),.30,32,3.0)
    for r in nav['rooms']+ns.get('new_views',[]):
        if r['id']==cfg['view']['id']:r.update(position=cfg['view']['position'],direction=cfg['view']['direction'])
    for ob in b.objects:
        if ob.type=='MESH':
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=5
        if ob.type=='LIGHT':ob.visible_camera=False;ob.visible_glossy=False;ob.visible_transmission=False;ob.data.specular_factor=0;ob.data.transmission_factor=0
    record=b.finish(cfg);record['declared_transforms']=transforms;(ns['OUT']/'garage-interior-report.json').write_text(json.dumps(record,indent=2)+'\n');return record
