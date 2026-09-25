"""Second photo-review corrections: sanitary layout, ceiling and exterior."""
import bpy,math
from mathutils import Vector

def refine_review(g,h):
    box,mesh,prism,cylinder,beam,pt=[g[n] for n in ('box','mesh','prism','cylinder','beam','pt')]
    tube,sphere,roundbox,local_box,arch_strip,material=[h[n] for n in ('tube','sphere','roundbox','local_box','arch_strip','material')]
    cabinet_run,curtains=h['cabinet_run'],h['curtains'];H,L=g['HEIGHT'],g['LEVEL'];mats=g['materials']
    def delete(prefixes):
        for ob in list(bpy.data.objects):
            # A fixture prefix such as 'Bedroom 4 shower' also matches the
            # structural 'Bedroom 4 shower return'. Preserve every wall.
            if ob.type=='MESH' and not any(c.name.endswith('walls') for c in ob.users_collection) and any(ob.name.startswith(p) for p in prefixes):bpy.data.objects.remove(ob,do_unlink=True)
    # One ceiling over the entire landing removes the overlapping pieces that shadowed each other.
    delete(['Landing | ceiling','Landing full stairwell ceiling'])
    poly=[(3.78,4.53),(7.74,4.53),(7.74,5.44),(9.08,5.44),(9.08,4.53),(10.03,4.53),(10.03,3.078),(8.95,3.078),(8.95,0),(5.90,0),(5.90,3.19),(3.78,3.19)]
    prism('Landing continuous ceiling',poly,L+g['FIRST_CEILING'],L+g['FIRST_CEILING']+.10,'Warm plaster','25 Ceilings')
    # Porcelain bowls have a real cavity, rim and closed exterior shell.
    def bowl(name,x,y,z,rx,ry,depth,mat,layer):
        N=48;verts=[]
        for a,b,zz in [(rx,ry,z),(rx-.027,ry-.027,z-.012),(rx*.65,ry*.62,z-depth+.035),(rx*.70,ry*.67,z-depth)]:
            power=.38 if 'bathtub' in name else 1
            verts.extend([(x+a*math.copysign(abs(math.cos(i*math.tau/N))**power,math.cos(i*math.tau/N)),y+b*math.copysign(abs(math.sin(i*math.tau/N))**power,math.sin(i*math.tau/N)),zz) for i in range(N)])
        faces=[]
        for i in range(N):
            j=(i+1)%N
            faces.extend([(i,j,N+j,N+i),(N+i,N+j,2*N+j,2*N+i),(i,3*N+i,3*N+j,j)])
        faces.extend([tuple(range(2*N,3*N)),tuple(reversed(range(3*N,4*N)))])
        ob=mesh(name,verts,faces,mat,layer)
        for p in ob.data.polygons:p.use_smooth=len(p.vertices)==4
        return ob
    material('Cast iron',(.009,.013,.011),.35,.3)
    material('Bathroom mist glass',(.73,.80,.80,.7),.38)
    b=mats['Bathroom mist glass'].node_tree.nodes.get('Principled BSDF');b.inputs['Transmission Weight'].default_value=.5
    material('Pale bathroom tile',(.66,.70,.65),.24)
    # Tiled wall faces are selected by room interior, preserving the adjacent room's plaster face.
    def inside(x,y,poly):
        yes=False
        for a,b in zip(poly,poly[1:]+poly[:1]):
            if ((a[1]>y)!=(b[1]>y)) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:yes=not yes
        return yes
    tiled=[r for r in g['rooms'] if r['name'] in ('Bathroom','Principal en suite','Bedroom 4 en suite','Utility')]
    for ob in bpy.data.objects:
        if ob.type!='MESH' or not ob.users_collection[0].name.endswith('walls'):continue
        for r in tiled:
            floor=r['floor'];z=floor*L
            if ob.users_collection[0].name.startswith('1' if floor==1 else '2'):continue
            mat='Cream tile' if r['name'] in ('Bathroom','Principal en suite') else 'Pale bathroom tile'
            if mat not in [m.name for m in ob.data.materials]:ob.data.materials.append(mats[mat])
            mi=[m.name for m in ob.data.materials].index(mat)
            for p in ob.data.polygons:
                if abs(p.normal.z)>.1:continue
                q=p.center+p.normal*.015
                if inside(q.x,q.y,r['polygon_m']):p.material_index=mi
    for mat in ('Cream tile','Pale bathroom tile'):
        m=mats[mat];nodes=m.node_tree.nodes;links=m.node_tree.links;bs=nodes.get('Principled BSDF')
        geom=nodes.new('ShaderNodeNewGeometry');sep=nodes.new('ShaderNodeSeparateXYZ');links.new(geom.outputs['Position'],sep.inputs[0])
        add=nodes.new('ShaderNodeMath');add.operation='ADD';links.new(sep.outputs['X'],add.inputs[0]);links.new(sep.outputs['Y'],add.inputs[1])
        comb=nodes.new('ShaderNodeCombineXYZ');links.new(add.outputs[0],comb.inputs['X']);links.new(sep.outputs['Z'],comb.inputs['Y'])
        tex=nodes.new('ShaderNodeTexBrick');tex.offset=0;tex.inputs['Scale'].default_value=1;tex.inputs['Brick Width'].default_value=.30;tex.inputs['Row Height'].default_value=.30;tex.inputs['Mortar Size'].default_value=.002
        color=g['PALETTE'][mat];tex.inputs['Color1'].default_value=color;tex.inputs['Color2'].default_value=tuple(v*.95 for v in color[:3])+(1,);tex.inputs['Mortar'].default_value=(.85,.85,.77,1)
        links.new(comb.outputs[0],tex.inputs['Vector']);links.new(tex.outputs['Color'],bs.inputs['Base Color'])
        bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.15;bump.inputs['Distance'].default_value=.002;links.new(tex.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs[0],bs.inputs['Normal'])
    # Remove mislocated placeholders. Source plan fixture symbols and all four photo views agree.
    delete(['Cloakroom WC','Cloakroom vanity','Family bathroom WC','Family bathroom vanity','Family bath','Principal en suite WC','Principal en suite vanity','Principal shower','Bedroom 4 en suite WC','Bedroom 4 vanity','Bedroom 4 shower','Bed4 shower rear tile','Bathroom west tile','Bathroom east tile','Principal en suite back tile'])
    def toilet(name,x,y,floor,angle=0):
        z=floor*L;layer=f'{floor+1}6 Fittings and furniture';before=set(bpy.data.objects);c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x))
        local_box(name+' cistern',c,u,v,0,.21,z+.59,(.40,.16,.59),'Cream ceramic',layer,r=.05)
        sphere(name+' pedestal',(x,y,z+.18),(.15,.17,.20),'Cream ceramic',layer)
        p=c-v*.06;bowl(name+' hollow pan',p.x,p.y,z+.43,.205,.27,.23,'Cream ceramic',layer)
        # Elliptical seat follows the oriented bowl, with open centre.
        tube(name+' seat',[(p.x+.21*math.cos(i*math.tau/64),p.y+.275*math.sin(i*math.tau/64),z+.45) for i in range(64)],.020,'White joinery',layer,12,True)
        for ob in set(bpy.data.objects)-before:
            ob['assembly']=name
            if ob.name.startswith((name+' hollow pan',name+' seat')):
                for vv in ob.data.vertices:
                    xx,yy=vv.co.x-p.x,vv.co.y-p.y
                    vv.co.x=p.x+xx*math.cos(angle)-yy*math.sin(angle)
                    vv.co.y=p.y+xx*math.sin(angle)+yy*math.cos(angle)
    toilet('Cloakroom toilet',5.40,.45,0,math.pi)
    toilet('Family bathroom toilet',7.40,5.64,1,-math.pi/2)
    toilet('Principal en suite toilet',8.41,7.49,1,0)
    toilet('Bedroom 4 en suite toilet',4.63,1.82,1,0)
    def vanity(name,x,y,floor,w,angle,mirror=True):
        z=floor*L;layer=f'{floor+1}6 Fittings and furniture';c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x))
        cabinet_run(name,(x,y),w,.49,.80,z,angle,'White joinery',False,False,layer)
        local_box(name+' counter',c,u,v,0,0,z+.82,(w+.035,.53,.04),'Cream ceramic',layer,r=.014)
        bowl(name+' inset basin',x,y,z+.85,.255,.195,.115,'Cream ceramic',layer)
        for off in (-.09,.09):
            p=c+u*off+v*.19;tube(name+' tap',[(p.x,p.y,z+.85),(p.x,p.y,z+1.02),(p.x-v.x*.07,p.y-v.y*.07,z+1.02)],.012,'Chrome',layer)
        if mirror:local_box(name+' mirror',c,u,v,0,.27,z+1.55,(w-.02,.013,1.0),'Mirror',layer)
    vanity('Cloakroom fitted vanity',4.65,1.47,0,1.68,math.pi/2)
    vanity('Family bathroom fitted vanity',5.37,5.64,1,1.73,math.pi/2)
    vanity('Principal west-wall vanity',7.44,6.99,1,1.21,math.pi/2)
    vanity('Bedroom 4 front vanity',5.10,.42,1,1.42,math.pi,False)
    # Bath spans the north alcove beneath the bathroom window.
    x,y=6.08,7.40;layer='26 Fittings and furniture'
    bowl('Family fitted bathtub',x,y,L+.59,.94,.38,.51,'Cream ceramic',layer)
    box('Family bath front apron',(x,y-.37,L+.27),(1.88,.045,.54),'Cream ceramic',layer)
    tube('Family bath mixer',[(x+.77,y+.19,L+.59),(x+.77,y+.19,L+.81),(x+.70,y+.12,L+.88),(x+.62,y+.06,L+.85)],.016,'Chrome',layer)
    # Shower enclosures fit within their recesses, instead of intersecting the partitions.
    def shower(name,xmin,xmax,ymin,ymax,floor,front):
        z=floor*L;layer=f'{floor+1}6 Fittings and furniture';xc=(xmin+xmax)/2;yc=(ymin+ymax)/2
        roundbox(name+' tray',(xc,yc,z+.07),(xmax-xmin,ymax-ymin,.14),'Porcelain',layer,.025)
        yy=ymax if front=='north' else ymin
        box(name+' glass door',(xc,yy,z+1.13),(xmax-xmin-.08,.014,1.99),'Glazing',layer)
        for xx in (xmin+.022,xmax-.022):beam(name+' frame',(xx,yy,z+.13),(xx,yy,z+2.18),.038,'White joinery',layer)
        for zz in (z+.13,z+2.18):beam(name+' door rail',(xmin,yy,zz),(xmax,yy,zz),.037,'White joinery',layer)
        beam(name+' handle',(xmax-.13,yy-.055,z+.92),(xmax-.13,yy-.055,z+1.23),.015,'Chrome',layer)
        back=ymin+.07 if front=='north' else ymax-.07
        box(name+' electric shower unit',(xc,back,z+1.45),(.20,.10,.33),'Porcelain',layer)
        tube(name+' shower hose',[(xc,back,z+1.3),(xc-.13,back-.06,z+1.04),(xc-.23,back-.06,z+1.15),(xc-.23,back-.04,z+1.90)],.009,'Chrome',layer)
        sphere(name+' shower head',(xc-.23,back-.07,z+1.92),(.054,.020,.07),'Chrome',layer)
    shower('Principal south shower',7.88,8.96,5.52,6.29,1,'north')
    shower('Bedroom 4 recessed shower',5.14,5.82,2.25,2.96,1,'south')
    # Bathroom mirrors, towels and tile ledges occupy the photographed walls.
    for name,x,y,angle,z in [('Family towel rail',7.04,7.15,-math.pi/2,L+1.13),('Cloak towel rail',5.82,1.41,-math.pi/2,1.12)]:
        u=Vector((math.cos(angle),math.sin(angle)));a=Vector((x,y))-u*.28;b=Vector((x,y))+u*.28
        beam(name,(*a,z),(*b,z),.021,'Chrome','26 Fittings and furniture' if z>3 else '16 Fittings and furniture')
    curtains('Principal shower-room',8.30,7.68,.92,1.02,2.26,1,'Curtain floral',.20)
    curtains('Bedroom 4 shower-room',5.25,.22,.66,1.01,2.25,1,'Curtain floral',.18)
    curtains('Cloakroom',5.24,.21,.49,.99,2.19,0,'Curtain floral',.19)
    for ob in bpy.data.objects:
        if ob.type=='MESH' and ('clear glass' in ob.name) and any(ob.name.startswith(x) for x in ('Bathroom balcony','En suite balcony')):
            ob.data.materials.clear();ob.data.materials.append(mats['Bathroom mist glass'])
        if ob.type=='MESH' and ob.name.startswith(('Drawing fireplace','Fireplace ')):
            for i,m in enumerate(ob.data.materials):
                if m.name=='Metal':ob.data.materials[i]=mats['Cast iron']
    # Utility runs are on the west and rear walls, with washing machine and deep sink.
    delete(['Utility cabinets','Utility washing machine'])
    cabinet_run('Utility west units',(-2.36,6.95),1.54,.58,.85,0,math.pi/2,'White joinery',False,False,'16 Fittings and furniture')
    cabinet_run('Utility wall cupboard',(-2.47,6.79),1.17,.34,.79,1.41,math.pi/2,'White joinery',False,False,'16 Fittings and furniture')
    box('Utility rear counter',(-1.44,8.40,.88),(2.12,.58,.05),'Porcelain','16 Fittings and furniture')
    for name,x in [('Utility washer',-1.18),('Utility freezer',-1.81)]:
        roundbox(name,(x,8.4,.43),(.58,.55,.86),'Porcelain','16 Fittings and furniture',.018)
    bowl('Utility ceramic sink',-.56,8.37,.91,.32,.235,.20,'Porcelain','16 Fittings and furniture')
    # Actual brick courses, with a consistent world-space scale on every wall.
    m=mats['Red brown brick'];nodes=m.node_tree.nodes;links=m.node_tree.links;bs=nodes.get('Principled BSDF')
    geo=nodes.new('ShaderNodeNewGeometry');sep=nodes.new('ShaderNodeSeparateXYZ');links.new(geo.outputs['Position'],sep.inputs[0])
    add=nodes.new('ShaderNodeMath');add.operation='ADD';links.new(sep.outputs['X'],add.inputs[0]);links.new(sep.outputs['Y'],add.inputs[1])
    vec=nodes.new('ShaderNodeCombineXYZ');links.new(add.outputs[0],vec.inputs['X']);links.new(sep.outputs['Z'],vec.inputs['Y'])
    brick=nodes.new('ShaderNodeTexBrick');brick.inputs['Scale'].default_value=1;brick.inputs['Brick Width'].default_value=.225;brick.inputs['Row Height'].default_value=.076;brick.inputs['Mortar Size'].default_value=.004
    brick.inputs['Color1'].default_value=(.28,.105,.045,1);brick.inputs['Color2'].default_value=(.14,.049,.017,1);brick.inputs['Mortar'].default_value=(.36,.32,.25,1)
    links.new(vec.outputs[0],brick.inputs['Vector']);links.new(brick.outputs['Color'],bs.inputs['Base Color'])
    bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.32;bump.inputs['Distance'].default_value=.006;links.new(brick.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs[0],bs.inputs['Normal'])
    material('Slate roof',(.055,.060,.054),.8)
    m=mats['Slate roof'];nodes=m.node_tree.nodes;links=m.node_tree.links;bs=nodes.get('Principled BSDF')
    geo=nodes.new('ShaderNodeNewGeometry');sep=nodes.new('ShaderNodeSeparateXYZ');links.new(geo.outputs['Position'],sep.inputs[0])
    add=nodes.new('ShaderNodeMath');add.operation='ADD';links.new(sep.outputs['X'],add.inputs[0]);links.new(sep.outputs['Y'],add.inputs[1])
    vec=nodes.new('ShaderNodeCombineXYZ');links.new(add.outputs[0],vec.inputs['X']);links.new(sep.outputs['Z'],vec.inputs['Y'])
    tile=nodes.new('ShaderNodeTexBrick');tile.inputs['Scale'].default_value=1;tile.inputs['Brick Width'].default_value=.29;tile.inputs['Row Height'].default_value=.095;tile.inputs['Mortar Size'].default_value=.004
    tile.inputs['Color1'].default_value=(.065,.070,.061,1);tile.inputs['Color2'].default_value=(.13,.127,.105,1);tile.inputs['Mortar'].default_value=(.018,.02,.016,1)
    links.new(vec.outputs[0],tile.inputs['Vector']);links.new(tile.outputs['Color'],bs.inputs['Base Color'])
    bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.35;bump.inputs['Distance'].default_value=.009;links.new(tile.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs[0],bs.inputs['Normal'])
    # Replace floating front triangle with a closed gable at eaves level, and model the entrance portico.
    delete(['Entrance pediment','Pediment fascia'])
    e=g['EAVES'];apex=e+1.37
    verts=[(x,y,z) for y in (-.14,.10) for x,z in [(4.82,e),(9.35,e),(7.085,apex)]]
    mesh('Front gable brickwork',verts,[(0,2,1),(3,4,5),(0,1,4,3),(1,2,5,4),(2,0,3,5)],'Red brown brick','30 Roof')
    for a,b in [((4.76,-.22,e),(7.085,-.22,apex+.05)),((7.085,-.22,apex+.05),(9.41,-.22,e))]:beam('Front gable white fascia',a,b,.14,'White joinery','30 Roof')
    # Two roof cheeks connect the front gable to the main front pitch.
    back_y=-.28+(apex-e)*4.685/g['ROOF_RISE']
    for side,x in [('west',4.76),('east',9.41)]:
        top=[(x,-.28,e),(7.085,-.28,apex),(7.085,back_y,apex)]
        verts=top+[(x,y,z-.08) for x,y,z in top]
        mesh('Front gable roof '+side,verts,[(0,1,2),(5,4,3),(0,3,4,1),(1,4,5,2),(2,5,3,0)],'Slate roof','30 Roof')
    # Raised panels on the wide garage door, visible from the driveway.
    delete(['Garage front | garage panel moulding'])
    for col in range(8):
        x=-4.76+(col+.5)*4.58/8
        for row in range(4):
            z=.12+(row+.5)*2.10/4
            roundbox('Garage raised door panel',(x,-.055,z),(.49,.055,.43),'White joinery','12 Doors and windows',.012)
    box('Garage central door stile',(-2.47,-.09,1.17),(.055,.07,2.29),'White joinery','12 Doors and windows')
    for x in (6.12,7.76):
        box('Entrance porch column',(x,-.61,1.33),(.15,.15,2.66),'White joinery','12 Doors and windows')
        box('Entrance porch column base',(x,-.61,.11),(.24,.24,.22),'White joinery','12 Doors and windows')
        box('Entrance porch capital',(x,-.61,2.55),(.26,.27,.16),'White joinery','12 Doors and windows')
    box('Entrance porch lintel',(6.94,-.61,2.68),(2.03,.25,.13),'White joinery','12 Doors and windows')
    mesh('Entrance porch roof',[(5.87,-.83,2.70),(8.01,-.83,2.70),(6.94,-.83,3.14),(5.87,-.13,2.70),(8.01,-.13,2.70),(6.94,-.13,3.14)],[(0,3,5,2),(2,5,4,1),(0,2,1),(3,4,5),(0,1,4,3)],'Slate roof','30 Roof')
    for a,b in [((5.85,-.88,2.70),(6.94,-.88,3.17)),((6.94,-.88,3.17),(8.03,-.88,2.70))]:beam('Porch pediment white trim',a,b,.10,'White joinery','12 Doors and windows')
    box('Entrance stone step',(6.94,-.52,.025),(2.09,1.14,.05),'Stone','10 Ground floor - floors')
    # The balcony is covered by the continuous pitched main roof.
    delete(['Balcony flat roof','Main hipped roof gutter'])
    ob=bpy.data.objects.get('Main hipped roof');vs=[tuple(v.co) for v in ob.data.vertices]
    chain=[vs[4],vs[3],(4.81,9.09,vs[3][2]),(4.81,9.82,vs[3][2]),(5.88,10.87,vs[3][2]),(8.20,10.87,vs[3][2]),(9.31,9.82,vs[3][2]),(9.31,9.09,vs[3][2]),vs[2],vs[5]]
    verts=vs+[tuple((Vector(vs[4])+Vector(vs[5]))/2)]+chain
    faces=[(0,1,5,4),(1,2,5),(3,0,4)]+[(6,7+i,8+i) for i in range(len(chain)-1)]
    # Reuse the named open roof surface; its solidify modifier provides thickness.
    ob.data.clear_geometry();ob.data.from_pydata(verts,[],faces);ob.data.update()
    # Side-to-side rail span and front position remain the audited dimensions.
    for ob in bpy.data.objects:
        if ob.type=='MESH' and ob.users_collection[0].name=='23 Balcony':
            for i,m in enumerate(ob.data.materials):
                if m.name=='Metal':ob.data.materials[i]=mats['White joinery']
    # Landing mirror, radiator and scrollwork visible in the front-facing panorama.
    pass   # owner (23 Sep 2026): the landing wall mirror is removed
    box('Landing front radiator',(6.035,1.24,L+.54),(.11,1.02,.62),'White joinery','26 Fittings and furniture')
    for yy in [0.77+i*.045 for i in range(22)]:
        box('Landing radiator rib',(6.098,yy,L+.54),(.025,.018,.55),'White joinery','26 Fittings and furniture')
    for i in range(14):
        yy=1.04+i*.154
        for sign in (-1,1):
            ps=[]
            for j in range(28):
                a=j/27*math.pi*2.15;rr=.063*(1-j/35)
                ps.append((7.815,yy+sign*(.060+rr*math.cos(a)),L+.44+rr*1.9*math.sin(a)))
            tube('Landing cast scroll',ps,.009,'White joinery','24 Trim')
    # Add a few photo-observed small fruit trees, with clearly inferred crown shapes.
    # Keep them on the site tag so editing the house is uncluttered.
    for i,(x,y,height) in enumerate([(3.3,15.4,2.7),(7.2,19.4,2.4),(2.5,25.7,2.6)]):
        layer='50 Site - approximate';beam('Garden fruit tree trunk',(x,y,0),(x+.05,y,height*.62),.07,'Dark walnut',layer)
        for j in range(5):
            a=j*math.tau/5;end=(x+.9*math.cos(a),y+.9*math.sin(a),height*(.68+.12*(j%2)))
            tube('Garden fruit tree branch',[(x,y,height*.3),(x+.3*math.cos(a),y+.3*math.sin(a),height*.6),end],.022,'Dark walnut',layer)
            sphere('Garden fruit tree foliage',end,(.55,.53,.40),'Foliage',layer,12,8)
    # Painted room faces and white ceiling beneath the detached building's roof.
    # The external brickwork stays brick; these are face materials, not wall offsets.
    for room in [r for r in g['rooms'] if r['floor']==2]:
        prefix=room['name'];poly=room['polygon_m']
        for ob in list(bpy.data.objects):
            if ob.type!='MESH' or ob.users_collection[0].name!='40 Outbuildings' or not ob.name.startswith(prefix):continue
            if not any(key in ob.name for key in (' wall','front pier','front lintel')):continue
            ob.data.update();ob.data.materials.clear()
            ob.data.materials.append(mats['Red brown brick']);ob.data.materials.append(mats['Warm plaster'])
            for face in ob.data.polygons:
                q=face.center+face.normal*.015
                face.material_index=1 if inside(q.x,q.y,poly) else 0
        prism(prefix+' painted ceiling',poly,2.36,2.40,'White joinery','41 Outbuilding roof')
    # The three adjacent room boxes share partitions: retain one physical wall.
    # Duplicate coincident faces otherwise self-shadow to black in the summer room.
    delete(['Tool store west wall','Tool store east wall'])
    for name in ('Outside WC east wall','Summer house west wall'):
        ob=bpy.data.objects[name]
        ob.data.materials.clear();ob.data.materials.append(mats['Warm plaster'])
        for face in ob.data.polygons:face.material_index=0
    print('SECOND_PHOTO_REVIEW_COMPLETE',flush=True)
