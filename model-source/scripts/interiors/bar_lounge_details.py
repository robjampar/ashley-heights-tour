"""Owner-selected Parisian Art Deco wine bar, matched to concept 04.

A reversible visual derivative. Accepted island, three stools, activity layouts
and collision volumes stay in place; authored source proposals remain untouched.
"""
import json, math, random
from pathlib import Path


def refine_bar_lounge(scene):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    if scene.get('accepted_bar_fitout'):
        accepted=json.loads(scene['accepted_bar_fitout'])
        names=accepted['sourceObjects']
        missing=[name for name in names if scene.objects.get(name) is None]
        if missing:raise RuntimeError('Accepted bar is incomplete: '+str(missing[:5]))
        details=dict(accepted['details'])
        # A later accepted shell revision can replace floor modules/panelling.
        # Its source inventory is authoritative; do not export old additions
        # as though those retired objects still existed in the current fit-out.
        retired=set(details.get('addedObjects',[]))-set(names)
        details['addedObjects']=[name for name in details.get('addedObjects',[]) if name in names]
        details['removedObjects']=sorted(set(details.get('removedObjects',[]))|retired)
        if retired:details['supersededBySourceRevision']=sorted(retired)
        return [scene.objects[name] for name in names],details
    root=Path(__file__).resolve().parents[2]
    cfg=json.loads((root/'proposal/interiors/leisure/bar.json').read_text());z=cfg['floorZ'];ceiling=cfg['ceilingZ']-.02
    ns={'ROOT':root,'scene':scene,'nav':{'obstacles':[],'rooms':[]},'new_obstacles':[],'materials':{},'PALETTE':{},'OUT':root/'tmp'}
    b=RoomBuilder(ns,'bar Art Deco','Bar detail | ','Visual Parisian Art Deco wine bar')
    changed=[];removed=[];relocated=[];rng=random.Random(41016)
    tex='proposal/interiors/kitchen/textures/'
    oak=b.material('walnut veneer',(.28,.21,.14,1),.34,texture='source/assets/materials/polyhaven/walnut_veneer/walnut_veneer_diff_2k.jpg')
    bronze=b.material('satin brass',(.55,.34,.13,1),.25,.88)
    shadow=b.material('recessed shadow',(.012,.010,.008,1),.85)
    velvet=b.material('burgundy velvet upholstery',(.070,.004,.009,1),.80)
    cream=b.material('ivory linen upholstery',(.70,.62,.49,1),.88,texture=tex+'cream-upholstery.png')
    ivory=b.material('cream lacquer fluting',(.72,.64,.52,1),.39)
    plaster=b.material('warm cream plaster',(.67,.61,.52,1),.84)
    ceilingmat=b.material('cream ceiling',(.76,.71,.63,1),.90)
    stone=b.material('Calacatta Oro marble',(.88,.84,.75,1),.23,texture='proposal/interiors/leisure/textures/calacatta-oro.png')
    floorstone=b.material('beige limestone slabs',(.63,.53,.40,1),.53,texture=tex+'warm-limestone.png')
    grout=b.material('limestone grout',(.31,.27,.22,1),.87)
    darkstone=b.material('black marble',(.027,.022,.018,1),.24,texture='proposal/interiors/leisure/textures/calacatta-oro.png')
    mirror=b.material('antique bronze Mirror',(.40,.31,.20,1),.14,.97)
    diffuser=b.material('warm filament',(1,.70,.38,1),.31,emission=3.0)
    led=b.material('concealed warm LED',(1,.77,.47,1),.45,emission=1.8)
    crystal=b.material('crystal glass',(.85,.87,.81,.26),.09,.32)
    ribglass=b.material('reeded glass',(.83,.76,.60,.35),.12,.38)
    for mat,alpha in [(crystal,.22),(ribglass,.30)]:
        shader=mat.node_tree.nodes.get('Principled BSDF')
        shader.inputs['Alpha'].default_value=alpha
        shader.inputs['Transmission Weight'].default_value=.82
        mat.surface_render_method='DITHERED'
    green=b.material('green bottle glass',(.012,.024,.009,1),.18)
    amber=b.material('wine bottle amber glass',(.045,.026,.006,1),.19)
    winefill=b.material('red wine',(.045,.004,.008,1),.20)
    paper=b.material('bottle paper',(.72,.65,.50,1),.86)
    ink=b.material('label ink',(.035,.025,.016,1),.85)
    lime=b.material('lime peel',(.16,.25,.018,1),.59)
    leaf=b.material('olive foliage',(.045,.085,.013,1),.66)
    leaf2=b.material('young foliage',(.10,.16,.025,1),.72)
    branch=b.material('botanical stem',(.12,.08,.025,1),.75)
    wax=b.material('candle wax',(.85,.73,.53,1),.68)
    art_light=b.material('art linen ground',(.62,.54,.40,1),.90)
    art_red=b.material('art burgundy',(.16,.022,.019,1),.91)
    art_ink=b.material('art charcoal',(.012,.014,.012,1),.94)

    def area(name,position,direction,power,sx,sy):
        data=bpy.data.lights.new('Bar detail | '+name,'AREA');data.energy=power;data.color=(1,.84,.65);data.shape='RECTANGLE';data.size=sx;data.size_y=sy
        ob=bpy.data.objects.new(data.name,data);b.collection.objects.link(ob);ob.location=position;ob.rotation_euler=Vector(direction).to_track_quat('-Z','Y').to_euler()
        ob['source_fixture']='Art Deco '+name

    def assign(ob,mat,scale=1):
        ob.data=ob.data.copy();ob.data.materials.clear();ob.data.materials.append(mat)
        if ob.type=='MESH':b.uv(ob,scale)
        if ob not in changed:changed.append(ob)

    def retire(ob):
        removed.append(ob.name);bpy.data.objects.remove(ob,do_unlink=True)

    # Replace only superseded fittings; the accepted island/stool geometry and
    # navigation remain. Distinct material names avoid stale room palette tints.
    for ob in list(scene.objects):
        name=ob.name
        if name.startswith('Proposal | Cinema east wall door 0') and ob.type in ('MESH','CURVE'):
            assign(ob,bronze if 'handle' in name else oak,1.5)
        if name.startswith('Bar 01 | ') and ob.type=='LIGHT':
            if 'bar work light' in name:ob.data.energy=24
            elif 'bar social light' in name:ob.data.energy=18
        if not name.startswith('Bar 01 | ') or ob.type not in ('MESH','CURVE'):continue
        if any(s in name for s in ('bar pendant','bar small appliance','bar appliance','stone coaster','display wine','upper display','display stem glass','serving tray','ready stem glass','skirting')):
            retire(ob);continue
        if 'stool ' in name:
            assign(ob,velvet if 'upholstered' in name else bronze)
            for mod in ob.modifiers:
                if mod.type=='BEVEL':mod.segments=8
        elif any(s in name for s in ('bar oak front panel','bar main carcass')):assign(ob,ivory)
        elif any(s in name for s in ('bar limestone top','back run limestone worktop','back bar limestone splashback','media coffee table stone')):assign(ob,stone,2.0)
        elif 'limestone floor finish' in name:assign(ob,grout)
        elif 'ivory ceiling lining' in name:assign(ob,ceilingmat)
        elif 'skirting' in name:assign(ob,ivory)
        elif any(s in name for s in ('oak','cabinet','bar host drawer','bar recessed plinth','back run recessed plinth')) and not any(s in name for s in ('dart','cue')):assign(ob,oak,1.5)
        elif any(s in name for s in ('footrail','cooler handle','cooler door stile','cooler door rail')):assign(ob,bronze)
        elif 'paper band' in name:assign(ob,paper)
        elif 'bottle' in name:assign(ob,green)

    # Owner-requested games regrouping. Retire the old located nodes and add
    # explicitly named replacements, keeping isolated and full models aligned.
    darts_y=-8.65
    for ob in list(scene.objects):
        if not ob.name.startswith('Bar 01 | '):continue
        name=ob.name;dy=None
        if any(s in name for s in ('dartboard','outer bull','inner bull','darts throw line')):dy=darts_y-cfg['darts']['face'][1]
        elif any(s in name for s in ('cue rack','stored two-piece cue','cue dark butt')):dy=1.34
        if dy is None:continue
        removed.append(name);ob.name='Bar detail | relocated '+name.split(' | ',1)[1]
        ob['source_name']=ob.name;ob.location.y+=dy;b.objects.append(ob)
        if ob in changed:changed.remove(ob)
        relocated.append({'original':name,'replacement':ob.name,'translation':[0,dy,0]})

    # Limestone modules have fine actual joints, rather than painted grid lines.
    for col in range(15):
        x0=5.16+col*.60;x1=min(13.75,x0+.60)
        if x0>=13.75:continue
        for row in range(11):
            y0=-16.076+row*1.20;y1=min(-4.23,y0+1.20)
            if y0>=-4.23:continue
            xa=max(x0,9.22) if y0 < -8.845 else x0
            if y0 < -8.845 < y1 and x0<9.22:
                if x1>9.22:b.box_bounds(f'limestone slab {col}-{row} rear',[9.221,y0+.001,x1-.001,-8.846],z+.0125,z+.018,floorstone,.0008)
                y0=-8.845;xa=x0
            if x1-xa>.003:b.box_bounds(f'limestone slab {col}-{row}',[xa+.001,y0+.001,x1-.001,y1-.001],z+.0125,z+.018,floorstone,.0008)

    # A continuous walnut crown and three antique mirrored bays.
    for k,(left,right) in enumerate(((10.22,11.30),(11.34,12.43),(12.47,13.58))):
        cx=(left+right)/2
        b.box(f'back bar mirror {k+1}',(cx,-15.957,z+1.67),(right-left,.008,1.44),mirror,.002)
        for xx in(left-.009,right+.009):b.box(f'back bar {k+1} brass pilaster',(xx,-15.90,z+1.67),(.018,.13,1.48),bronze,.002)
        for h in(.94,2.40):b.box(f'back bar {k+1} brass crossrail',(cx,-15.90,z+h),(right-left+.036,.13,.018),bronze,.002)
        for h in(1.445,1.945,2.37):
            b.box(f'display bay {k+1} concealed LED {h}',(cx,-15.74,z+h),(right-left-.05,.018,.008),led,.002)
            area(f'display bay {k+1} shelf wash {h}',(cx,-15.72,z+h-.012),(0,-.3,-1),4.5,right-left-.08,.06)
    b.box('back bar walnut crown',(11.90,-15.85,z+2.47),(3.51,.34,.12),oak,.006)
    b.box('crown brass inlay',(11.90,-15.672,z+2.433),(3.44,.007,.008),bronze,.001)
    for h in(1.47,1.97):b.box('shelf brass nosing',(11.90,-15.67,z+h),(3.41,.008,.024),bronze,.002)

    # Convex cream flutes wrap the island, with a brass base and original rail.
    for i in range(57):
        x=10.568+i*1.964/56
        b.cylinder(f'counter cream flute {i:02d}',(x,-13.574,z+.591),.0173,.916,ivory,sides=24)
    for side,x in [('left',10.549),('right',12.551)]:
        for i in range(12):b.cylinder(f'counter {side} return flute {i}',(x,-14.013+i*.0348,z+.591),.0173,.916,ivory,sides=24)
    b.box('island brass plinth',(11.55,-13.569,z+.112),(2.02,.042,.028),bronze,.003)
    b.box('island brass top bead',(11.55,-13.561,z+1.052),(2.02,.037,.012),bronze,.002)
    b.box('counter underlip diffuser',(11.55,-13.50,z+1.049),(1.88,.016,.010),led,.002)
    area('counter knee wash',(11.55,-13.48,z+1.034),(0,.4,-1),4,1.85,.04)
    for i,(x,y) in enumerate(cfg['stoolCenters']):
        # Wraparound brass follows the lower upholstered back, with sockets.
        pts=[(x-.218,y-.10,z+.755),(x-.230,y+.14,z+.795)]
        pts += [(x+.230*math.cos(a),y+.14+.09*math.sin(a),z+.795) for a in [math.pi-j*math.pi/24 for j in range(25)]]
        pts += [(x+.218,y-.10,z+.755)]
        b.tube(f'stool {i+1} wraparound brass back rail',pts,.009,bronze)
        for dx in(-.17,.17):
            b.tube(f'stool {i+1} side foot rest',[(x+dx,y-.163,z+.31),(x+dx,y+.163,z+.31)],.009,bronze)
            for dy in(-.162,.162):b.cylinder(f'stool {i+1} floor glide',(x+dx, y+dy,z+.021),.015,.014,shadow,sides=20)

    def reeded(label,center,radius,height):
        # Real rounded flutes, not a striped colour texture.
        x,y,zz=center;n=192;verts=[]
        profile=[(.86,-height/2),(.98,-height/2+.012),(1,-height/2+.026),(1,height/2-.026),(.98,height/2-.012),(.86,height/2)]
        for scale,h in profile:
            for j in range(n):
                a=math.tau*j/n;r=(radius+.0018*math.cos(a*48))*scale
                verts.append((x+r*math.cos(a),y+r*math.sin(a),zz+h))
        faces=[(k*n+j,k*n+(j+1)%n,(k+1)*n+(j+1)%n,(k+1)*n+j) for k in range(len(profile)-1) for j in range(n)]
        b.mesh(label+' reeded glass shade',verts,faces,ribglass,True)
        for h in(-height/2,height/2):b.ring(label+' brass rim',(x,y,zz+h),radius*.89,radius*.76,.008,bronze,64)
        b.cylinder(label+' glowing bulb',(x,y,zz-.015),radius*.23,height*.40,diffuser,sides=32)
        b.cylinder(label+' lamp holder',(x,y,zz+height*.27),radius*.26,.045,bronze,sides=32)

    for i,x in enumerate((11.05,12.05)):
        reeded(f'pendant {i+1}',(x,-13.83,z+1.99),.080,.25)
        b.cylinder(f'pendant {i+1} brass stem',(x,-13.83,(ceiling+z+2.13)/2),.006,ceiling-(z+2.13),bronze,sides=24)
        b.cylinder(f'pendant {i+1} ceiling rose',(x,-13.83,ceiling-.012),.036,.024,bronze,sides=40)
        area(f'pendant {i+1} island pool',(x,-13.83,z+1.87),(0,0,-1),10,.13,.13)
        area(f'pendant {i+1} ceiling bounce',(x,-13.83,z+2.12),(0,0,1),3,.10,.10)
    for i,x in enumerate((10.0,13.1)):
        b.ring(f'recessed ceiling downlight {i} trim',(x,-12.05,ceiling-.002),.033,.025,.005,ivory,40)
        b.cylinder(f'recessed ceiling downlight {i} lens',(x,-12.05,ceiling-.004),.024,.003,led,sides=40)
        area(f'recessed ceiling downlight {i}',(x,-12.05,ceiling-.012),(0,0,-1),3,.05,.05)

    # Follow actual wall faces to architectural ends. The previous two short
    # strips stopped behind the new high table, leaving raw cornice/dado ends.
    # Runs are directed with the room on their left; mitres share the same
    # corner point at every profile depth. Door cutouts include their surrounds.
    panel_runs=[]
    profile=[('skirting',.105,.024,.18),('skirting cap',.205,.030,.018),
             ('dado',.82,.027,.025),('dado bead',.85,.020,.012),
             ('cornice lower',2.43,.030,.025),('cornice middle',2.46,.043,.025),
             ('cornice crown',2.49,.057,.032)]
    def lining_run(label,start,end,panels,openings=(),mitres=(True,True),base_gaps=()):
        a=Vector((*start,0));d=Vector((*end,0))-a;length=d.length;t=d.normalized();n=Vector((-t.y,t.x,0))
        reports=[]
        def strip(part,lo,hi,bottom,top,depth,mat,mitre=True):
            if hi-lo<.001:return
            # A 45-degree end, rather than two overlapping rectangular trims.
            p=a+t*lo;q=a+t*hi
            pa=p+n*depth+(t*depth*mitres[0] if mitre and abs(lo)<.0001 else Vector())
            qa=q+n*depth-(t*depth*mitres[1] if mitre and abs(hi-length)<.0001 else Vector())
            verts=[tuple(v+Vector((0,0,z+h))) for h in(bottom,top) for v in(p,q,qa,pa)]
            ob=b.mesh(f'panelling {label} {part}',verts,[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],mat)
            mod=ob.modifiers.new('Fine painted edge','BEVEL');mod.width=.0007;mod.segments=2
            mod=ob.modifiers.new('Painted face normals','WEIGHTED_NORMAL');mod.keep_sharp=True
            return ob
        def clear_ranges(bottom,top,extra=()):
            ranges=[(0,length)]
            for lo,hi,head in [*openings,*extra]:
                if bottom>=head:continue
                ranges=[(x,y) for a0,b0 in ranges for x,y in [(a0,min(lo,b0)),(max(hi,a0),b0)] if y-x>.001]
            return ranges
        # Split liners vertically at the opening heads, retaining the wall
        # above each door and leaving the leaf/architrave aperture untouched.
        heights=sorted(set([.018,ceiling-z]+[o[2] for o in openings]))
        for bottom,top in zip(heights,heights[1:]):
            for lo,hi in clear_ranges(bottom,top):strip('cream wall lining',lo,hi,bottom,top,.006,plaster)
        for part,h,depth,height in profile:
            extra=[(lo,hi,3) for lo,hi in base_gaps] if h<1 else []
            for lo,hi in clear_ranges(h-height/2,h+height/2,extra):
                strip(part,lo,hi,h-height/2,h+height/2,depth,ivory)
                reports.append({'part':part,'from':lo,'to':hi,'bottom':h-height/2,'top':h+height/2,'depth':depth})
        for center,width in panels:
            for bottom,top in[(.29,.72),(.96,2.32)]:
                for lo in(center-width/2,center+width/2):strip('picture moulding stile',lo-.011,lo+.011,bottom,top,.022,ivory,False)
                for h in(bottom,top):strip('picture moulding rail',center-width/2-.011,center+width/2+.011,h-.011,h+.011,.022,ivory,False)
        panel_runs.append({'name':label,'start':start,'end':end,'openings':list(openings),'mitredEnds':list(mitres),'profiles':reports})
        return strip,length

    east_panels=[(-15.15,.80),(-13.50,1.42),(-11.78,1.10),(-10.05,1.55),(-8.65,1.05),(-7.45,.95),(-5.55,1.95)]
    lining_run('east bar and games',(13.749,-16.075),(13.749,-4.231),[(yy+16.075,w) for yy,w in east_panels])
    lining_run('north games',(13.749,-4.231),(5.161,-4.231),[(13.749-x,w) for x,w in[(11.25,3.36),(8.75,1.36),(6.63,2.34)]])
    # The existing walnut media panel is a deliberate insert, framed with
    # terminal stiles. Its own plinth stays visible, free of crossing dado.
    media_strip,media_length=lining_run('west media',(5.161,-4.231),(5.161,-8.845),[(.42,.48),(4.17,.52)],mitres=(True,True),base_gaps=[(.869,3.669)])
    for lo,hi in[(.822,.869),(3.669,3.716),(media_length-.055,media_length)]:
        media_strip('full height finishing stile',lo,hi,.018,2.418,.047,ivory,False)
    # The terminal mitre returns each profile into the wall, without a second
    # coplanar cap laid over the moulding.
    lining_run('south back bar',(9.221,-16.075),(13.749,-16.075),[])

    # West cinema wall: the two apertures are taken from the authored leaves,
    # expanded to the OUTSIDE of the existing 60 mm architraves. Keep 3 mm
    # shadow joints where the painted treatment meets walnut door surrounds.
    west_start=-9.907;west_end=-16.075
    door_openings=[(west_start-(-9.932),west_start-(-10.918),2.218),
                   (west_start-(-15.282),west_start-(-16.018),2.118)]
    west_panels=[(-14.16,.46),(-12.98,1.38),(-11.56,.60)]
    west_strip,west_length=lining_run('west bar',(9.221,west_start),(9.221,west_end),[(west_start-yy,w) for yy,w in west_panels],door_openings,mitres=(-1,True))
    # Door plinth blocks give the deeper skirting a proper abutment. The
    # continuous cornice passes over both doors and turns onto the end wall.
    for lo,hi,head in door_openings:
        for pos in(lo,hi):west_strip('door plinth block',max(0,pos-.030),min(west_length,pos+.030),.018,.235,.033,ivory,False)
    # A short finished return wraps onto the real north wall at the cinema
    # door/stair junction, keeping the open stair approach untouched.
    return_strip,_=lining_run('cinema corner return',(9.098,-9.907),(9.221,-9.907),[],mitres=(False,-1))
    return_strip('full height finishing stile',0,.022,.018,2.418,.030,ivory,False)

    def wallbox(label,side,yy,h,w,thick,height,mat):
        x=13.749 if side=='east' else 9.221;sign=-1 if side=='east' else 1
        return b.box(label,(x+sign*thick/2,yy,z+h),(thick,w,height),mat,.002)
    for side,yy in [('east',-14.60),('east',-11.92),('west',-14.22)]:
        sign=-1 if side=='east' else 1;x=13.735 if side=='east' else 9.235;cx=x+sign*.083
        wallbox(side+' sconce brass backplate',side,yy,1.68,.10,.025,.36,bronze)
        reeded(f'{side} wall sconce {yy}',(cx,yy,z+1.68),.041,.30)
        for direction,hh in[((sign*.3,0,1),1.84),((sign*.3,0,-1),1.52)]:area(f'{side} sconce wall wash {yy}-{hh}',(cx,yy,z+hh),direction,4,.075,.06)

    def bottle(label,x,y,zz,h=.30,mat=green):
        s=h/.30
        b.lathe(label+' wine bottle',(x,y,zz),[(r*s,d*s)for r,d in[(0,0),(.034,0),(.037,.012),(.037,.20),(.030,.222),(.013,.243),(.013,.295),(.014,.30),(0,.30)]],mat,40)
        b.cylinder(label+' paper label',(x,y,zz+.123*s),.0373*s,.081*s,paper,sides=40)
        b.cylinder(label+' capsule',(x,y,zz+.277*s),.014*s,.041*s,bronze if rng.random()<.3 else art_red,sides=32)
        # Fine horizontal printing and an oval crest, visible at close range.
        for h2,w in[(.10,.028),(.113,.036),(.13,.022)]:b.box(label+' label typography',(x,y+.0375*s,zz+h2*s),(w*s,.0004,.0014),ink)
        b.cylinder(label+' label crest',(x,y+.0376*s,zz+.145*s),.008*s,.0005,ink,(0,1,0),24)
    def goblet(label,x,y,zz,filled=False):
        profile=[(0,0),(.033,0),(.034,.004),(.008,.009),(.003,.015),(.003,.080),(.015,.083),(.037,.106),(.043,.14),(.035,.187),(.030,.207),(.028,.207),(.033,.187),(.041,.14),(.035,.108),(.014,.087),(0,.087)]
        b.lathe(label+' wineglass',(x,y,zz),profile,crystal,48)
        if filled:b.lathe(label+' wine',(x,y,zz),[(0,.086),(.014,.086),(.033,.104),(.039,.128),(0,.128)],winefill,40)
    def plant(label,x,y,zz,scale=1):
        b.lathe(label+' dark vase',(x,y,zz),[(0,0),(.060*scale,0),(.078*scale,.055*scale),(.071*scale,.14*scale),(.042*scale,.17*scale),(.039*scale,.18*scale),(.033*scale,.18*scale),(.034*scale,.16*scale)],darkstone,48)
        for stem in range(13):
            angle=rng.random()*math.tau;reach=rng.uniform(.13,.24)*scale;h=rng.uniform(.26,.42)*scale
            tip=Vector((x+reach*math.cos(angle),y+reach*math.sin(angle),zz+h));base=Vector((x,y,zz+.13*scale))
            points=[base.lerp(tip,t) for t in(0,.35,.72,1)]
            b.tube(label+f' branch {stem}',points,.0014*scale,branch,1)
            for k in range(3,9):
                origin=base.lerp(tip,k/9);a=angle+(1 if k%2 else -1)*1.05
                forward=Vector((math.cos(a),math.sin(a),.35)).normalized();across=Vector((-math.sin(a),math.cos(a),0));length=rng.uniform(.035,.055)*scale;width=length*.26
                vs=[origin,origin+forward*length*.48-across*width,origin+forward*length+Vector((0,0,.004*scale)),origin+forward*length*.48+across*width,origin+forward*length*.48+Vector((0,0,.005*scale))]
                b.mesh(label+f' leaf {stem}-{k}',[tuple(p)for p in vs],[(0,1,4),(1,2,4),(2,3,4),(3,0,4)],leaf if k%3 else leaf2,True)
    # Densely stocked but curated wine shelves, with varied labels and glassware.
    for shelf,hh in enumerate((1.488,1.989)):
        xs=([10.40,10.54,10.69,10.84,10.99,11.15,11.31,11.48,11.67,12.53,12.70,12.86,13.02,13.19,13.36] if shelf==0 else [10.48,10.65,10.82,11.04,11.21,11.39,11.58,11.77,12.18,12.36,12.55,12.74,12.93])
        for i,x in enumerate(xs):bottle(f'display {shelf}-{i}',x,-15.82,z+hh,.28+(i%3)*.012,amber if i%5==0 else green)
    for i,x in enumerate((11.90,12.04,12.18,12.32)):goblet(f'display stemware {i}',x,-15.78,z+1.488)
    # Sculptural black ring on a small stone book stack.
    for j in range(2):b.box('sculpture plinth book',(12.01,-15.82,z+2.00+j*.025),(.24,.18,.022),art_light,.003)
    b.tube('black ring sculpture',[(12.01+.105*math.cos(j*math.tau/64),-15.82,z+2.14+.13*math.sin(j*math.tau/64))for j in range(65)],.025,darkstone,3)
    plant('upper shelf greenery',13.35,-15.81,z+1.989,.72)
    for i,x in enumerate((12.55,12.83,13.10)):
        for dx in(-.034,.034):b.tube(f'stemware rack {i} runner',[(x+dx,-15.94,z+1.93),(x+dx,-15.67,z+1.93)],.003,bronze,2)
        for j,y in enumerate((-15.84,-15.70)):
            ob=b.lathe(f'hanging wineglass {i}-{j}',(x,y,z+1.735),[(0,0),(.025,.004),(.039,.05),(.034,.09),(.005,.108),(.003,.16),(.032,.175),(.032,.179),(0,.179)],crystal,40)

    top=z+1.105
    # Reference arrangement: wine on the left, central tray, greenery, citrus.
    bottle('island selected wine',12.12,-13.69,top,.32)
    goblet('island poured wine',12.30,-13.66,top,True)
    b.cylinder('round brass serving tray',(11.48,-13.73,top+.013),.235,.012,bronze,sides=64)
    b.ring('serving tray raised rim',(11.48,-13.73,top+.022),.236,.231,.025,bronze,64)
    plant('island olive arrangement',11.40,-13.77,top+.02,.95)
    b.cylinder('island candle holder',(11.64,-13.66,top+.066),.036,.090,crystal,sides=48)
    b.cylinder('island candle wax',(11.64,-13.66,top+.058),.030,.070,wax,sides=40)
    b.sphere('island candle flame',(11.64,-13.66,top+.105),.006,diffuser)
    b.lathe('citrus bowl',(10.75,-13.72,top),[(0,0),(.06,0),(.115,.05),(.110,.058),(.055,.012),(0,.012)],darkstone,48)
    for dx,dy in[(-.04,0),(.02,-.025),(.035,.035),(-.01,.035)]:b.sphere('fresh green citrus',(10.75+dx,-13.72+dy,top+.055),.034,lime)
    # Worktop styling uses real depth, avoiding a flat backdrop.
    # The reference's small brass mixer sits over an actual undermount opening.
    worktop=next(o for o in scene.objects if o.name=='Bar 01 | back run limestone worktop')
    cutter=b.box('temporary sink opening',(11.96,-15.72,z+.89),(.38,.25,.14),shadow,.018)
    scene.view_layers[0].update();bpy.context.view_layer.objects.active=worktop
    cut=worktop.modifiers.new('Undermount bar sink opening','BOOLEAN');cut.operation='DIFFERENCE';cut.solver='EXACT';cut.object=cutter
    bpy.ops.object.modifier_apply(modifier=cut.name);b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
    b.box('undermount sink bottom',(11.96,-15.72,z+.75),(.39,.26,.014),bronze,.015)
    for xx in(11.766,12.154):b.box('undermount sink side',(xx,-15.72,z+.82),(.012,.26,.15),bronze,.004)
    for yy in(-15.849,-15.591):b.box('undermount sink end',(11.96,yy,z+.82),(.40,.012,.15),bronze,.004)
    b.cylinder('bar sink waste',(11.96,-15.72,z+.759),.022,.003,shadow,sides=32)
    b.cylinder('bar mixer base',(11.96,-15.91,z+.921),.025,.024,bronze,sides=40)
    tap=[(11.96,-15.91,z+.925),(11.96,-15.91,z+1.10)]
    tap += [(11.96,-15.83-.08*math.cos(a),z+1.10+.08*math.sin(a))for a in [j*math.pi/24 for j in range(25)]]
    tap += [(11.96,-15.75,z+1.07)]
    b.tube('arched brass bar mixer',tap,.010,bronze,4)
    b.tube('bar mixer lever',[(11.99,-15.91,z+.97),(12.045,-15.91,z+1.01)],.006,bronze,3)
    plant('back counter foliage',10.54,-15.76,z+.91,.70)
    b.lathe('back counter marble ice bucket',(13.26,-15.76,z+.91),[(0,0),(.07,0),(.09,.16),(.083,.17),(.063,.015),(0,.015)],darkstone,48)
    for j in range(3):b.box('back counter stacked book',(11.65,-15.83,z+.93+j*.025),(.24-j*.018,.16,.023),paper,.002)

    # Shallow walnut console, stacked books and black marble / linen table lamp.
    b.box('west library recessed plinth',(9.39,-13.10,z+.08),(.27,1.62,.12),shadow,.008)
    b.box('west library walnut console',(9.40,-13.10,z+.52),(.31,1.66,.79),oak,.008)
    b.box('west library marble top',(9.40,-13.10,z+.929),(.33,1.70,.028),stone,.006)
    for yy in(-13.66,-13.10,-12.54):
        b.box('library inset walnut door',(9.563,yy,z+.52),(.018,.54,.76),oak,.003)
        b.box('library brass pull',(9.584,yy-.19,z+.59),(.017,.014,.16),bronze,.003)
    b.obstacle('west library console',[9.225,-13.95,9.58,-12.25],z,z+.95)
    for j in range(4):
        hh=z+.954+j*.032
        b.box(f'library horizontal book {j}',(9.42,-13.55,hh),(.225,.35-j*.018,.029),paper if j%2 else art_light,.002)
        for zz in(-.014,.014):b.box(f'book {j} bound cover',(9.42,-13.55,hh+zz),(.23,.357-j*.018,.003),art_ink,.0005)
    plant('console botanical arrangement',9.41,-13.55,z+1.066,.72)
    b.lathe('console black marble lamp base',(9.40,-12.55,z+.945),[(0,0),(.065,0),(.086,.06),(.079,.18),(.043,.24),(0,.24)],darkstone,48)
    b.cylinder('console lamp brass collar',(9.4,-12.55,z+1.195),.032,.03,bronze,sides=40)
    b.lathe('console ivory linen lamp shade',(9.40,-12.55,z+1.21),[(.17,0),(.14,.24),(.132,.24),(.162,0)],cream,64)
    b.cylinder('console lamp glowing bulb',(9.40,-12.55,z+1.31),.020,.08,diffuser,sides=32)
    area('console lamp lower pool',(9.40,-12.55,z+1.205),(0,0,-1),5,.19,.19)
    area('console lamp wall wash',(9.40,-12.55,z+1.45),(0,0,1),3,.18,.18)
    b.lathe('console brass votive',(9.43,-12.94,z+.945),[(0,0),(.035,0),(.037,.08),(.032,.083),(.030,.01),(0,.01)],bronze,40)

    # Matted geometric prints: burgundy half-disc, charcoal bar and linen ground.
    for side,x,yy in [('west',9.263,-13.08),('east',13.707,-13.48)]:
        sign=1 if side=='west' else -1
        b.box(side+' artwork walnut frame',(x,yy,z+1.68),(.026,.73,1.02),oak,.005)
        b.box(side+' artwork ivory mat',(x+sign*.017,yy,z+1.68),(.008,.705,.995),ivory,.001)
        b.box(side+' artwork printed ground',(x+sign*.023,yy,z+1.68),(.002,.53,.79),art_light)
        b.box(side+' artwork black vertical',(x+sign*.025,yy+.13,z+1.69),(.002,.12,.73),art_ink)
        center=(yy-.10,z+1.83);pts=[(x+sign*.027,center[0],center[1])]
        pts += [(x+sign*.027,center[0]+.23*math.cos(a),center[1]+.23*math.sin(a)) for a in [math.pi/2+j*math.pi/64 for j in range(65)]]
        b.mesh(side+' artwork burgundy semicircle',pts,[(0,j,j+1)for j in range(1,len(pts)-1)],art_red)
        b.cylinder(side+' artwork sand circle',(x+sign*.026,yy-.10,z+1.43),.10,.002,paper,(sign,0,0),64)

    # A second high table occupies the former darts position, with two seats
    # facing one another. It leaves the west route and the island stools clear.
    tx,ty=13.02,-10.95
    b.box('salon high table marble top',(tx,ty,z+1.085),(.70,1.16,.04),stone,.020)
    b.box('salon high table walnut apron',(tx,ty,z+1.035),(.62,1.08,.06),oak,.012)
    for yy in(ty-.31,ty+.31):
        b.box('salon high table brass pedestal',(tx,yy,z+.53),(.038,.038,1.0),bronze,.008)
        b.box('salon high table brass foot',(tx,yy,z+.04),(.54,.23,.035),bronze,.009)
    b.obstacle('salon high table',[tx-.35,ty-.58,tx+.35,ty+.58],z,z+1.105)
    templates=[o for o in list(scene.objects) if o.name.startswith('Bar 01 | stool 1 ')]
    templates += [o for o in b.objects if o.name.startswith('Bar detail | stool 1 ')]
    from mathutils import Matrix
    for i,(yy,angle) in enumerate(((ty-.96,math.pi),(ty+.96,0))):
        transform=Matrix.Translation(Vector((tx,yy,0)))@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(Vector((-10.90,12.83,0)))
        for template in templates:
            ob=template.copy();ob.data=template.data.copy();ob.name=f'Bar detail | salon high stool {i+1} '+template.name.split('stool 1 ',1)[1]
            ob['source_name']=ob.name;b.collection.objects.link(ob);ob.matrix_world=transform@template.matrix_world;b.objects.append(ob)
        b.obstacle(f'salon high stool {i+1}',[tx-.24,yy-.24,tx+.24,yy+.24],z,z+1.10)
    goblet('salon table wineglass one',tx-.12,ty-.18,z+1.105)
    goblet('salon table wineglass two',tx+.12,ty+.18,z+1.105)
    b.cylinder('salon table brass candle',(tx,ty,z+1.15),.035,.085,bronze,sides=40)
    b.sphere('salon table candle flame',(tx,ty,z+1.20),.006,diffuser)
    # Two upholstered club chairs complete the existing media lounge. Their
    # envelopes stay clear of the sofa, table, pool cue space and main route.
    for i,(x,y,angle) in enumerate(((6.30,-8.14,0),(6.30,-4.77,math.pi))):
        start=len(b.objects)
        for dx in(-.26,.26):
            for dy in(-.25,.25):b.box(f'club chair {i} bronze foot',(dx,dy,z+.105),(.035,.035,.18),bronze,.006)
        b.box(f'club chair {i} upholstered seat cushion',(0,0,z+.43),(.67,.65,.18),velvet,.075)
        b.box(f'club chair {i} upholstered back cushion',(0,-.29,z+.72),(.70,.17,.66),velvet,.075)
        for dx in(-.33,.33):b.box(f'club chair {i} upholstered arm',(dx,-.025,z+.56),(.13,.68,.35),velvet,.06)
        b.box(f'club chair {i} small linen cushion',(0,-.17,z+.64),(.42,.14,.27),cream,.06)
        from mathutils import Matrix
        tr=Matrix.Translation(Vector((x,y,0)))@Matrix.Rotation(angle,4,'Z')
        for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
        b.obstacle(f'club chair {i}',[x-.40,y-.39,x+.40,y+.39],z,z+1.06)
        tx=x+.69;ty=y
        b.cylinder(f'lounge side table {i} base',(tx,ty,z+.045),.18,.045,bronze,sides=40)
        b.cylinder(f'lounge side table {i} stem',(tx,ty,z+.27),.024,.44,bronze,sides=32)
        b.cylinder(f'lounge side table {i} stone top',(tx,ty,z+.49),.24,.036,stone,sides=48)
        b.cylinder(f'lounge table {i} coaster',(tx+.05,ty,z+.513),.047,.006,oak,sides=32)
        b.lathe(f'lounge table {i} glass',(tx+.05,ty,z+.518),[(0,0),(.033,0),(.036,.09),(.032,.092),(.030,.012),(0,.012)],crystal,32)
        b.obstacle(f'lounge side table {i}',[tx-.25,ty-.25,tx+.25,ty+.25],z,z+.53)
    # Tag additions for the isolated room overlay; originals are replacements.
    for ob in b.objects:
        ob['detail_source']='Bar 01 | limestone floor finish'
        if ob.type=='MESH' and ob.data.materials and ob.data.materials[0] in (stone,darkstone):b.uv(ob,2)
    scene.view_layers[0].update();changed.extend(b.objects)
    extra={'obstacles':ns['new_obstacles'],'removeObstacles':[],'mirrors':[{'name':'Bar detail | antique back bar mirror','position':[11.90,-15.95,z+1.67],
           'normal':[0,1,0],'width':3.36,'height':1.44,'antique':True}]}
    return changed,{'addedObjects':[o.name for o in b.objects if o.type!='LIGHT'],'navigationExtras':extra,
                   'removedObjects':removed,'openRoom':True,'retainedBarIsland':True,'barHeightMetres':1.105,'retainedHighStools':3,
                   'cabinetAccessMetres':1.30,'addedClubChairs':2,'addedDiningChairs':0,'selectedConcept':'04-parisian-art-deco',
                   'addedHighTables':1,'addedHighStools':2,'relocatedObjects':relocated,
                   'panelling':{'runs':panel_runs,'doorJointMetres':.003,'extendsThroughGames':True},
                   'darts':{'face':[13.669,darts_y,-1.058],'ocheX':11.299,'activityBounds':[10.15,-9.45,13.70,-7.85],'sharedWithPool':True},
                   'referenceImage':'revisions/wine-bar-concepts-2026-10-16/04-parisian-art-deco.png',
                   'retainedActivities':['pool','darts','media sofa'],
                   'finish':'cream fluting, Calacatta Oro marble, walnut, burgundy velvet, satin brass and reeded glass'}
