"""Editable geometry refinements traced visually from the original 360 photographs.
No photograph is substituted for a rendered view. Small ornamental shapes are
approximations; furniture positions and joinery proportions remain inferred.
"""
import bpy, bmesh, math, random
from mathutils import Vector

def refine(g):
    box,mesh,prism,cylinder,beam,pt=[g[n] for n in ('box','mesh','prism','cylinder','beam','pt')]
    mats=g['materials'];palette=g['PALETTE'];H=g['HEIGHT'];L=g['LEVEL'];collection=g['collection']
    rng=random.Random(9414)
    def material(name,color,rough=.5,metal=0):
        if name in mats:m=mats[name]
        else:m=bpy.data.materials.new(name);m.use_nodes=True;mats[name]=m
        rgba=(*color[:3],color[3] if len(color)>3 else 1)
        m.diffuse_color=rgba;palette[name]=rgba
        b=m.node_tree.nodes.get('Principled BSDF');b.inputs['Base Color'].default_value=rgba
        b.inputs['Roughness'].default_value=rough;b.inputs['Metallic'].default_value=metal
        return m
    material('Warm plaster',(.76,.72,.59),.85)
    material('White joinery',(.91,.90,.84),.4)
    material('Blue carpet',(.22,.27,.35),.96)
    material('Rose carpet',(.47,.245,.275),.96)
    material('Green carpet',(.13,.33,.265),.96)
    material('Oak',(.17,.064,.022),.35)
    material('Honey oak',(.32,.15,.045),.3)
    material('Pine',(.39,.20,.068),.35)
    material('Dark walnut',(.095,.036,.012),.3)
    material('Polished granite',(.105,.125,.123),.26)
    material('Chrome',(.7,.73,.74),.15,.93)
    material('Brass',(.57,.38,.10),.24,.8)
    material('Mirror',(.92,.95,.96),.025,1)
    material('Black screen',(.007,.012,.016),.12)
    material('Curtain taupe',(.25,.27,.27),.95)
    material('Curtain blue',(.045,.21,.28),.95)
    material('Curtain green gold',(.39,.38,.145),.92)
    material('Curtain floral',(.16,.20,.16),.92)
    material('Rattan',(.47,.30,.13),.7)
    material('Rattan cushion',(.24,.29,.18),.93)
    material('Cream upholstery',(.46,.42,.29),.95)
    material('Burgundy leather',(.31,.06,.059),.44)
    material('Cream tile',(.69,.66,.51),.2)
    material('Cream ceramic',(.78,.72,.49),.2)
    material('Bed plaid',(.34,.35,.33),.95)
    material('Bed floral',(.28,.44,.44),.95)
    material('Lampshade',(.80,.73,.48),.7)
    material('Pink lampshade',(.51,.235,.20),.7)
    material('Picture print',(.34,.37,.28),.88)
    for i,col in enumerate([(.055,.085,.12),(.45,.055,.035),(.66,.59,.43),(.11,.24,.20),(.36,.31,.19),(.72,.73,.65),(.14,.23,.30)]):material(f'Book spine {i}',col,.8)
    # Neutral clear glass. The earlier coloured/alpha glass obscured the view.
    m=material('Glazing',(.93,.98,1,.30),.025)
    bs=m.node_tree.nodes.get('Principled BSDF');bs.inputs['Transmission Weight'].default_value=1;bs.inputs['Alpha'].default_value=1;bs.inputs['IOR'].default_value=1.45
    nodes=m.node_tree.nodes;links=m.node_tree.links
    transparent=nodes.new('ShaderNodeBsdfTransparent');glossy=nodes.new('ShaderNodeBsdfGlossy');glossy.inputs['Roughness'].default_value=.04
    mix=nodes.new('ShaderNodeMixShader');mix.inputs[0].default_value=.055
    links.new(transparent.outputs[0],mix.inputs[1]);links.new(glossy.outputs[0],mix.inputs[2]);links.new(mix.outputs[0],nodes.get('Material Output').inputs['Surface'])
    # Object-space grain/fibre, retained in the native Blender file.
    for name in ('Oak','Honey oak','Pine','Dark walnut','Blue carpet','Rose carpet','Green carpet','Polished granite'):
        m=mats[name];nodes=m.node_tree.nodes;links=m.node_tree.links;b=nodes.get('Principled BSDF')
        coord=nodes.new('ShaderNodeTexCoord');mapping=nodes.new('ShaderNodeVectorMath');mapping.operation='MULTIPLY'
        wood=name in ('Oak','Honey oak','Pine','Dark walnut');mapping.inputs[1].default_value=(32,32,2) if wood else (1,1,1)
        links.new(coord.outputs['Position'] if 'Position' in coord.outputs else coord.outputs['Generated'],mapping.inputs[0])
        noise=nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=4 if wood else 180;noise.inputs['Detail'].default_value=2
        links.new(mapping.outputs[0],noise.inputs['Vector'])
        ramp=nodes.new('ShaderNodeValToRGB');col=palette[name];ramp.color_ramp.elements[0].color=tuple(c*.65 for c in col[:3])+(1,);ramp.color_ramp.elements[1].color=tuple(min(.95,c*1.2) for c in col[:3])+(1,)
        links.new(noise.outputs['Fac'],ramp.inputs[0]);links.new(ramp.outputs[0],b.inputs['Base Color'])
        bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.2;bump.inputs['Distance'].default_value=.001 if wood else .003
        links.new(noise.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs[0],b.inputs['Normal'])
    # Keep fittings as movable assemblies while retaining individually editable parts.
    assembly_counts={}
    def assembly(fn):
        def wrapped(name,*args,**kwargs):
            before=set(bpy.data.objects)
            result=fn(name,*args,**kwargs)
            assembly_counts[name]=assembly_counts.get(name,0)+1
            label=name if assembly_counts[name]==1 else name+' '+str(assembly_counts[name])
            for ob in set(bpy.data.objects)-before:ob['assembly']=label
            return result
        return wrapped
    def delete(prefixes):
        for ob in list(bpy.data.objects):
            if ob.type=='MESH' and any(ob.name.startswith(s) for s in prefixes):bpy.data.objects.remove(ob,do_unlink=True)
    def replace_mat(ob,name):
        ob.data.materials.clear();ob.data.materials.append(mats[name])
    def roundbox(name,c,size,mat,layer,r=.03,angle=0):
        ob=box(name,c,size,mat,layer,angle)
        bm=bmesh.new();bm.from_mesh(ob.data)
        bmesh.ops.bevel(bm,geom=list(bm.edges),offset=min(r,min(size)*.44),segments=5,profile=.5,affect='EDGES',clamp_overlap=True)
        bm.normal_update();bm.to_mesh(ob.data);bm.free();ob.data.update()
        for p in ob.data.polygons:p.use_smooth=True
        # Flat main faces, rounded edge surfaces.
        for p in ob.data.polygons:
            if p.area>max(size)*max(size)*.04:p.use_smooth=False
        return ob
    def tube(name,points,r,mat,layer,sides=8,closed=False):
        pts=[Vector(p) for p in points];verts=[];n=len(pts)
        for i,p in enumerate(pts):
            if closed:d=pts[(i+1)%n]-pts[(i-1)%n]
            else:d=pts[min(i+1,n-1)]-pts[max(0,i-1)]
            d.normalize();axis=Vector((0,0,1))
            if abs(d.dot(axis))>.95:axis=Vector((0,1,0))
            u=d.cross(axis).normalized();v=d.cross(u).normalized()
            verts.extend([tuple(p+r*(u*math.cos(k*math.tau/sides)+v*math.sin(k*math.tau/sides))) for k in range(sides)])
        faces=[]
        for i in range(n if closed else n-1):
            j=(i+1)%n
            for k in range(sides):faces.append((i*sides+k,i*sides+(k+1)%sides,j*sides+(k+1)%sides,j*sides+k))
        if not closed:faces += [tuple(reversed(range(sides))),tuple((n-1)*sides+k for k in range(sides))]
        ob=mesh(name,verts,faces,mat,layer)
        for p in ob.data.polygons:p.use_smooth=True
        return ob
    def sphere(name,c,scale,mat,layer,nu=16,nv=10):
        # Single vertices at poles avoid zero-area faces.
        verts=[(c[0],c[1],c[2]+scale[2])]
        for j in range(1,nv):
            for i in range(nu):
                a=i*math.tau/nu;b=j*math.pi/nv
                verts.append((c[0]+scale[0]*math.sin(b)*math.cos(a),c[1]+scale[1]*math.sin(b)*math.sin(a),c[2]+scale[2]*math.cos(b)))
        verts.append((c[0],c[1],c[2]-scale[2]));last=len(verts)-1
        faces=[(0,1+i,1+(i+1)%nu) for i in range(nu)]
        for j in range(nv-2):
            for i in range(nu):a=1+j*nu+i;b=1+j*nu+(i+1)%nu;faces.append((a,a+nu,b+nu,b))
        faces += [(last,1+(nv-2)*nu+(i+1)%nu,1+(nv-2)*nu+i) for i in range(nu)]
        ob=mesh(name,verts,faces,mat,layer)
        for p in ob.data.polygons:p.use_smooth=True
        return ob
    def local_box(name,origin,u,v,dx,dy,z,size,mat,layer,r=0):
        p=origin+u*dx+v*dy
        fn=roundbox if r else box
        kw={'angle':math.atan2(u.y,u.x)}
        if r:kw['r']=r
        return fn(name,(p.x,p.y,z),size,mat,layer,**kw)
    def arch_strip(name,center,width,spring,rise,thickness,depth,mat,layer,angle=0,n=32):
        # An elliptical arch made as one closed editable mesh.
        u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x));verts=[]
        for y in (-depth/2,depth/2):
            for outer in (0,1):
                for i in range(n+1):
                    a=i*math.pi/n;x=(width/2+outer*thickness)*math.cos(a);z=spring+(rise+outer*thickness)*math.sin(a)
                    p=Vector(center[:2])+u*x+v*y;verts.append((p.x,p.y,z))
        k=n+1;faces=[]
        for i in range(n):
            faces += [(i,i+1,k+i+1,k+i),(2*k+i,3*k+i,3*k+i+1,2*k+i+1),
                      (i,2*k+i,2*k+i+1,i+1),(k+i,k+i+1,3*k+i+1,3*k+i)]
        faces += [(0,k,3*k,2*k),(n,2*k+n,3*k+n,k+n)]
        return mesh(name,verts,faces,mat,layer)
    # Rebuild frames and glazing using the actual opening positions. Wall dimensions stay fixed.
    for spec in g['wall_specs']:
        name=spec['name'];f=spec['floor'];z=f*L;layer=f'{f+1}2 Doors and windows'
        a=Vector(spec['a']);b=Vector(spec['b']);u=(b-a).normalized();v=Vector((-u.y,u.x));angle=math.atan2(u.y,u.x);th=spec['thickness_m']
        for oi,(distance,w,sill,head,kind) in enumerate(sorted(spec['openings'])):
            if kind not in ('window','french','entry'):continue
            # Remove only the old frame objects in this opening, never the walls.
            center=a+u*distance
            for ob in list(bpy.data.objects):
                if ob.type!='MESH' or ob.users_collection[0].name!=layer or not ob.name.startswith(name+' |'):continue
                verts=[ob.matrix_world@q.co for q in ob.data.vertices];p=sum(verts,Vector())/len(verts)
                if abs((Vector(p[:2])-center).dot(u))<=w/2+.10:bpy.data.objects.remove(ob,do_unlink=True)
            arched=kind=='entry' or name in ('Dining left bay','Dining right bay','Dining rear French doors') or (name=='First front' and 5.7<center.x<8.2)
            spring=head-(w/2 if name=='First front' else min(w/2,.51)) if arched else head
            if arched:
                # Closed wall wedges outside the arch, filling the rectangular builder opening.
                rise=head-spring;n=32;verts=[];faces=[]
                for k in range(n):
                    x1=-w/2+w*k/n;x2=-w/2+w*(k+1)/n
                    z1=spring+rise*math.sqrt(max(0,1-(2*x1/w)**2));z2=spring+rise*math.sqrt(max(0,1-(2*x2/w)**2))
                    poly=[(x1,z1),(x2,z2),(x2,head+.001),(x1,head+.001)]
                    vs=[]
                    for dep in (-th/2,th/2):
                        for x,h in poly:p=center+u*x+v*dep;vs.append((p.x,p.y,z+h))
                    off=len(verts);verts.extend(vs);faces.extend([tuple(off+j for j in face) for face in [(3,2,1,0),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]])
                mesh(name+' arched masonry infill',verts,faces,'Warm plaster',f'{f+1}1 '+('Ground' if f==0 else 'First')+' floor - walls')
                arch_strip(name+' arched reveal',(*center,0),w-.08,z+spring,head-spring-.04,.075,th+.065,'White joinery',layer,angle)
                # Fanlight glazing, extruded curved polygon in the plane of the wall.
                xy=[(-w/2+.065,spring)]+[((w/2-.065)*math.cos(math.pi-i*math.pi/32),spring+(head-spring-.055)*math.sin(math.pi-i*math.pi/32)) for i in range(33)]+[(w/2-.065,spring-.025),(-w/2+.065,spring-.025)]
                vs=[]
                for dep in (-.011,.011):
                    for x,h in xy:p=center+u*x+v*dep;vs.append((p.x,p.y,z+h))
                nn=len(xy);fs=[tuple(reversed(range(nn))),tuple(range(nn,2*nn))]+[(k,(k+1)%nn,(k+1)%nn+nn,k+nn) for k in range(nn)]
                # Drop coincident first vertex to avoid degenerate geometry.
                # The slightly lowered base keeps fanlight a closed polygon.
                if (Vector(vs[0])-Vector(vs[1])).length<1e-7:
                    xy=xy[1:];vs=[]
                    for dep in (-.011,.011):
                        for x,h in xy:p=center+u*x+v*dep;vs.append((p.x,p.y,z+h))
                    nn=len(xy);fs=[tuple(reversed(range(nn))),tuple(range(nn,2*nn))]+[(k,(k+1)%nn,(k+1)%nn+nn,k+nn) for k in range(nn)]
                mesh(name+' fanlight glass',vs,fs,'Glazing',layer)
                for angle2 in (math.pi/4,math.pi/2,3*math.pi/4):
                    p=center+u*(w/2-.07)*math.cos(angle2)
                    beam(name+' fanlight spoke',(*center,z+spring),(*p,z+spring+(head-spring-.05)*math.sin(angle2)),.018,'White joinery',layer)
            for dx in (-w/2+.035,w/2-.035):local_box(name+' frame jamb',center,u,v,dx,0,z+(sill+spring)/2,(.07,.14,spring-sill),'White joinery',layer)
            for elev in (sill+.035,spring-.035):local_box(name+' frame rail',center,u,v,0,0,z+elev,(w,.16,.07),'White joinery',layer)
            if kind=='entry':continue
            local_box(name+' clear glass',center,u,v,0,0,z+(sill+spring)/2,(w-.10,.016,spring-sill-.09),'Glazing',layer)
            if kind=='french':
                count=2 if arched else 4
                for k in range(count):
                    cx=-w/2+w*(k+.5)/count
                    for dx in (cx-w/count/2+.045,cx+w/count/2-.045):local_box(name+' door stile',center,u,v,dx,0,z+(sill+spring)/2,(.07,.145,spring-sill-.05),'White joinery',layer)
                    local_box(name+' Georgian vertical',center,u,v,cx,-.012,z+(sill+spring)/2,(.014,.025,spring-sill-.13),'White joinery',layer)
                    for h in range(1,6):local_box(name+' Georgian rail',center,u,v,cx,-.012,z+sill+(spring-sill)*h/6,(w/count-.12,.033,.014),'White joinery',layer)
                    local_box(name+' door lever',center,u,v,cx+w/count*.3,-.09,z+1.03,(.12,.035,.018),'White joinery',layer)
            else:
                if w>2.6:edges=[-w/2,-w*.30,-w*.15,w*.15,w*.30,w/2] # wide centre light in kitchen
                elif w>2:edges=[-w/2,-w/4,0,w/4,w/2]
                elif w>1.2:edges=[-w/2,-w/6,w/6,w/2]
                else:edges=[-w/2,w/2]
                if name=='En suite balcony':edges=[-w/2,0,w/2]
                if arched and name=='First front':edges=[-w/2,w/2]
                transom=spring if arched or name in ('Bathroom balcony','En suite balcony') else sill+(spring-sill)*.76
                for dx in edges[1:-1]:local_box(name+' casement mullion',center,u,v,dx,0,z+(sill+spring)/2,(.06,.15,spring-sill-.07),'White joinery',layer)
                for k,(le,ri) in enumerate(zip(edges,edges[1:])):
                    local_box(name+' upper vent rail',center,u,v,(le+ri)/2,0,z+transom,(ri-le,.155,.055),'White joinery',layer)
                    local_box(name+' glazing bar vertical',center,u,v,(le+ri)/2,-.015,z+(sill+transom)/2,(.014,.025,transom-sill-.08),'White joinery',layer)
                    for j in range(1,2 if name in ('Bathroom balcony','En suite balcony') else 4):local_box(name+' glazing bar horizontal',center,u,v,(le+ri)/2,-.015,z+sill+(transom-sill)*j/(2 if name in ('Bathroom balcony','En suite balcony') else 4),(ri-le-.06,.033,.014),'White joinery',layer)
                    local_box(name+' window latch',center,u,v,ri-.10,-.09,z+(sill+transom)/2,(.015,.03,.095),'White joinery',layer)
            local_box(name+' window board',center,u,v,0,-.03,z+sill-.025,(w+.12,th+.18,.05),'White joinery',layer)
    # Panelled doors. Preserve the designed opening and rebuild actual door leaves.
    for spec in g['wall_specs']:
        f=spec['floor'];z=f*L;name=spec['name'];layer=f'{f+1}2 Doors and windows';a=Vector(spec['a']);b=Vector(spec['b']);u=(b-a).normalized();v=Vector((-u.y,u.x));theta=math.atan2(u.y,u.x)
        for distance,w,sill,head,kind in spec['openings']:
            if kind not in ('door','double','entry'):continue
            if kind=='entry':
                head=head-min(w/2,.51)
                delete([name+' | door architrave'])
            delete([name+' | door leaf',name+' | door panel',name+' | handle'])
            center=a+u*distance;leaves=2 if kind in ('double','entry') else 1
            shut=name in ('House front centre','Family hall door','Drawing hall partition','Principal en suite east','Bathroom hall','Linen cupboard hall','Garage rear','Utility rear','Bedroom 3 balcony door','Principal balcony door')
            oak=f==0 and name not in ('Garage rear','Utility rear','Garage kitchen partition','Kitchen hall door')
            mat='Honey oak' if oak else 'White joinery'
            if name=='House front centre':mat='Dark walnut'
            for k in range(leaves):
                width=w/leaves-.035;hinge=center+u*((-w/2) if k==0 else w/2)
                angle=theta+(0 if shut else math.radians(65)) if k==0 else theta+math.pi-(0 if shut else math.radians(65))
                lu=Vector((math.cos(angle),math.sin(angle)));lv=Vector((-lu.y,lu.x));origin=hinge+lu*width/2
                if name in ('Garage rear','Utility rear','Bedroom 3 balcony door','Principal balcony door'):
                    glazed_bottom=.78 if name in ('Garage rear','Utility rear') else .30
                    local_box(name+' glazed door lower panel',origin,lu,lv,0,0,z+glazed_bottom/2,(width,.044,glazed_bottom),'White joinery',layer)
                    for dx in (-width/2+.035,width/2-.035):
                        local_box(name+' glazed door stile',origin,lu,lv,dx,0,z+head/2,(.07,.068,head-.025),'White joinery',layer)
                    for elev in (glazed_bottom,head-.04):
                        local_box(name+' glazed door rail',origin,lu,lv,0,0,z+elev,(width,.08,.065),'White joinery',layer)
                    local_box(name+' glazed door glass',origin,lu,lv,0,0,z+(glazed_bottom+head)/2,(width-.13,.015,head-glazed_bottom-.06),'Glazing',layer)
                    if name in ('Bedroom 3 balcony door','Principal balcony door'):
                        local_box(name+' glazed door central bar',origin,lu,lv,0,0,z+(glazed_bottom+head)/2,(.018,.035,head-glazed_bottom-.06),'White joinery',layer)
                        for k in range(1,4):
                            local_box(name+' glazed door cross bar',origin,lu,lv,0,0,z+glazed_bottom+(head-glazed_bottom)*k/4,(width-.10,.04,.018),'White joinery',layer)
                    p=origin+lu*(width/2-.10)-lv*.06
                    sphere(name+' glazed door handle',(*p,z+1.0),(.028,.028,.04),'Chrome',layer)
                    continue
                local_box(name+' panelled leaf',origin,lu,lv,0,0,z+head/2,(width,.042,head-.035),mat,layer)
                for side in (-1,1):
                    for xoff in (-width*.235,width*.235):
                        for zc,hh in ((head*.205,head*.28),(head*.555,head*.30),(head*.855,head*.20)):
                            local_box(name+' raised door panel',origin,lu,lv,xoff,side*.025,z+zc,(width*.40,.018,hh),mat,layer,r=.008)
                            for dx in (xoff-width*.205,xoff+width*.205):local_box(name+' panel bead',origin,lu,lv,dx,side*.037,z+zc,(.018,.018,hh+.035),mat,layer)
                            for zz in (zc-hh/2-.01,zc+hh/2+.01):local_box(name+' panel bead',origin,lu,lv,xoff,side*.037,z+zz,(width*.43,.024,.018),mat,layer)
                    p=origin+lu*(width/2-.105)+lv*(side*.065)
                    sphere(name+' brass knob',(*p,z+1.02),(.034,.03,.032),'Brass',layer)
            # Layered moulded door head seen throughout the original.
            for j in range(0 if kind=='entry' else 3):local_box(name+' classical overdoor',center,u,v,0,0,z+head+.06+j*.055,(w+.21+j*.055,spec['thickness_m']+.08+j*.025,.045),'White joinery',layer)
    delete([w['name']+' | cornice' for w in g['wall_specs']])
    # Cornices: stepped profile along the inside of each wall, instead of a single strip.
    for spec in g['wall_specs']:
        f=spec['floor'];z=f*L;layer=f'{f+1}4 Trim';a=Vector(spec['a']);b=Vector(spec['b']);u=(b-a).normalized();v=Vector((-u.y,u.x));center=(a+b)/2;length=(b-a).length
        for side in (-1,1):
            if spec['external'] and side==1:continue
            for j,(width,drop) in enumerate(((.035,.12),(.065,.085),(.095,.04))):
                local_box(spec['name']+' cornice profile',center,u,v,0,side*(spec['thickness_m']/2+width/2),z+g['CEILINGS'][f]-drop,(length,width,.035+.0006*abs(u.x)),'White joinery',layer)
    # Dining suite. Table and chairs lie around the photographer, not out of frame behind them.
    delete(['Dining table','Dining chair'])
    g['table']('Dining oval table',6.68,7.85,0,1.28,2.10,True)
    @assembly
    def dining_chair(name,x,y,angle):
        u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x));c=Vector((x,y));layer='16 Fittings and furniture'
        local_box(name+' seat',c,u,v,0,0,.45,(.45,.46,.065),'Dark walnut',layer,r=.02)
        for dx in (-.20,.20):
            for dy in (-.20,.20):local_box(name+' leg',c,u,v,dx,dy,.23,(.035,.035,.46),'Dark walnut',layer)
            local_box(name+' back post',c,u,v,dx,.21,.77,(.035,.035,.68),'Dark walnut',layer)
        local_box(name+' carved crest',c,u,v,0,.21,1.09,(.46,.06,.10),'Dark walnut',layer,r=.025)
        for dx in (-.10,0,.10):
            ps=[]
            for j in range(16):
                h=.54+j*.48/15;p=c+u*(dx+.018*math.sin(j*.4))+v*.21;ps.append((*p,h))
            tube(name+' back splat',ps,.015,'Dark walnut',layer)
    for x,y,a in [(7.03,9.03,0),(6.68,6.62,math.pi),(5.87,7.45,math.pi/2),(5.87,8.35,math.pi/2),(7.52,7.45,-math.pi/2),(7.52,8.35,-math.pi/2)]:dining_chair('Dining chair',x,y,a)
    # Raised-panel cabinetry in a U, including wall cupboards and oven tower.
    delete(['Kitchen rear cabinets','Kitchen west cabinets','Kitchen short return','Kitchen hob','Kitchen sink','Kitchen mixer','Kitchen fridge'])
    @assembly
    def cabinet_run(name,center,w,depth=.6,height=.88,z=0,angle=0,material='Honey oak',drawers=True,top=True,layer='16 Fittings and furniture'):
        c=Vector(center);u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x));count=max(1,round(w/.55))
        local_box(name+' carcass',c,u,v,0,0,z+height/2,(w,depth,height),material,layer)
        local_box(name+' plinth',c,u,v,0,-depth/2+.025,z+.055,(w,.035,.11),'Dark walnut',layer)
        if top:local_box(name+' stone worktop',c,u,v,0,0,z+height+.018,(w+.03,depth+.045,.036),'Polished granite',layer,r=.008)
        for k in range(count):
            dx=-w/2+w*(k+.5)/count;ww=w/count-.025;dy=-depth/2-.025;hh=height-.20 if drawers else height-.06;zc=z+.11+hh/2 if drawers else z+height/2
            local_box(name+' door',c,u,v,dx,dy,zc,(ww,.035,hh-.04),material,layer,r=.005)
            local_box(name+' raised panel',c,u,v,dx,dy-.024,zc,(ww-.12,.020,hh-.18),material,layer,r=.014)
            for sign in (-1,1):local_box(name+' stile',c,u,v,dx+sign*(ww/2-.037),dy-.025,zc,(.055,.02,hh-.055),material,layer)
            if drawers:local_box(name+' drawer',c,u,v,dx,dy,z+height-.07,(ww,.045,.13),material,layer,r=.005)
            p=c+u*(dx+ww*.32)+v*(dy-.045);sphere(name+' door knob',(*p,zc+hh*.32),(.017,.017,.017),'Brass',layer)
            if drawers:
                ps=[tuple(c+u*(dx+q*.07)+v*(dy-.065))+ (z+height-.07-.015*(1-q*q),) for q in (-1,-.7,0,.7,1)]
                tube(name+' drawer pull',ps,.006,'Brass',layer)
        return c,u,v
    # Rear units include the undercounter white refrigerator to the sink's right.
    cabinet_run('Kitchen sink cabinets',(2.04,8.37),2.80)
    cabinet_run('Kitchen rear right cabinet',(4.24,8.37),1.20)
    cabinet_run('Kitchen west return',(.42,7.73),1.35,angle=math.pi/2)
    cabinet_run('Kitchen east return',(4.64,7.02),2.05,angle=-math.pi/2)
    cabinet_run('Kitchen east wall cupboards',(4.79,7.02),2.05,.32,.77,1.43,-math.pi/2,drawers=False,top=False)
    cabinet_run('Kitchen west wall cupboards',(.27,7.85),1.03,.30,.73,1.45,math.pi/2,drawers=False,top=False)
    cabinet_run('Kitchen oven tower',(.45,6.73),.62,.65,2.20,0,math.pi/2,drawers=False,top=False)
    for zz in (.8,1.38):
        box('Kitchen built-in oven glass',(.79,6.73,zz),(.035,.54,.46),'Black screen','16 Fittings and furniture')
        beam('Oven horizontal handle',(.83,6.51,zz+.15),(.83,6.95,zz+.15),.025,'Chrome','16 Fittings and furniture')
    box('Undercounter fridge body',(3.42,8.38,.44),(.56,.57,.87),'Porcelain','16 Fittings and furniture')
    roundbox('Undercounter fridge front',(3.42,8.071,.46),(.54,.055,.79),'Porcelain','16 Fittings and furniture',.025)
    beam('Fridge handle',(3.24,8.032,.78),(3.58,8.032,.78),.024,'White joinery','16 Fittings and furniture')
    box('Fridge matching counter',(3.42,8.37,.91),(.60,.65,.04),'Polished granite','16 Fittings and furniture')
    # Two inset basins with a real rim and dark recessed bowls, plus drainer grooves.
    layer='16 Fittings and furniture'
    box('Kitchen sink stainless surround',(2.62,8.33,.925),(1.36,.49,.02),'Chrome',layer)
    for x,w in [(2.34,.49),(2.79,.30)]:
        roundbox('Kitchen sink recessed bowl',(x,8.32,.938),(w,.395,.012),'Metal',layer,.065)
        for yy in (8.12,8.52):roundbox('Sink rolled rim',(x,yy,.949),(w,.017,.015),'Chrome',layer,.006)
        for xx in (x-w/2,x+w/2):roundbox('Sink rolled rim',(xx,8.32,.949),(.017,.40,.015),'Chrome',layer,.006)
    for i in range(8):box('Sink drainer ridge',(3.08+i*.03,8.32,.943),(.013,.38,.012),'Chrome',layer)
    tube('Kitchen swan-neck mixer',[(2.59,8.54,.94),(2.59,8.54,1.12),(2.59,8.52,1.19),(2.59,8.46,1.22),(2.59,8.37,1.20),(2.59,8.34,1.15)],.016,'Chrome',layer,12)
    box('Kitchen gas hob',(.92,8.35,.941),(.68,.48,.027),'Chrome',layer)
    for x in (.73,1.11):
        for y in (8.21,8.49):
            cylinder('Hob gas ring',(x,y,.965),.075,.02,'Metal',layer)
            for ang in (0,math.pi/2):box('Hob pan support',(x,y,.994),(.24,.022,.018),'Metal',layer,ang)
    # Clock, kettle and crockery are separately editable rather than image cards.
    c=cylinder('Kitchen wall clock',(2.75,8.68,2.40),.14,.032,'White joinery',layer,48)
    # Rotate the horizontal cylinder into the wall plane.
    for vv in c.data.vertices:
        q=vv.co.copy()-Vector((2.75,8.68,2.40));vv.co=(2.75+q.x,8.68+q.z,2.40+q.y)
    for hand,end in [('minute',(2.78,8.655,2.49)),('hour',(2.68,8.655,2.44))]:beam('Clock '+hand,(2.75,8.655,2.40),end,.007,'Metal',layer)
    for x in (1.65,1.92,3.62,3.85):
        cylinder('Kitchen mug',(x,8.39,1.00),.039,.12,'Porcelain',layer)
        tube('Mug handle',[(x+.05+.024*math.cos(k*math.tau/16),8.39,1.0+.04*math.sin(k*math.tau/16)) for k in range(16)],.006,'Porcelain',layer,closed=True)
    sphere('Electric kettle body',(4.37,7.13,1.08),(.10,.10,.17),'Chrome',layer)
    tube('Kettle handle',[(4.39,7.22,1.20),(4.39,7.28,1.18),(4.39,7.28,1.0),(4.39,7.22,.98)],.014,'Metal',layer)
    # Pleated curtain fabric is actual closed geometry, with a pole and rings.
    @assembly
    def curtains(name,x,y,w,bottom,top,floor=0,mat='Curtain taupe',panel=.48,angle=0):
        top=min(top,g['CEILINGS'][floor]-.15)
        z=floor*L;c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x));layer=f'{floor+1}6 Fittings and furniture'
        beam(name+' curtain pole',(* (c-u*(w/2+.22)),z+top+.09),(*(c+u*(w/2+.22)),z+top+.09),.028,'Oak',layer)
        for sign in (-1,1):
            cx=sign*(w/2+.05);N=64;verts=[]
            for depth in (0,.006):
                for zz in (bottom,top):
                    for i in range(N+1):
                        dx=cx+(i/N-.5)*panel;dy=.05*math.cos(i/N*math.tau*7)+depth;p=c+u*dx+v*dy
                        verts.append((*p,z+zz+.012*math.sin(i*.7)))
            nn=N+1;faces=[]
            for i in range(N):faces.extend([(i,i+1,nn+i+1,nn+i),(2*nn+i,3*nn+i,3*nn+i+1,2*nn+i+1),(i,2*nn+i,2*nn+i+1,i+1),(nn+i,nn+i+1,3*nn+i+1,3*nn+i)])
            faces += [(0,nn,3*nn,2*nn),(N,2*nn+N,3*nn+N,nn+N)]
            ob=mesh(name+' pleated curtain',verts,faces,mat,layer)
            for p in ob.data.polygons:p.use_smooth=True
            for i in range(9):
                p=c+u*(cx+(i/8-.5)*panel)
                tube(name+' curtain ring',[(p.x,p.y+.04*math.cos(k*math.tau/12),z+top+.09+.04*math.sin(k*math.tau/12)) for k in range(12)],.007,'Oak',layer,closed=True)
    curtains('Drawing rear',11.25,8.52,3.50,.06,2.58)
    curtains('Drawing front',11.30,.30,3.02,.02,2.54)
    curtains('Family front',2.29,.30,2.94,.62,2.46,mat='Curtain blue')
    curtains('Principal rear',11.7,8.52,2.58,.66,2.37,1,'Curtain floral')
    curtains('Bedroom 4 front',2.29,.32,2.28,.67,2.36,1,'Curtain floral')
    curtains('Bedroom 3 rear',2.34,8.52,2.45,.70,2.36,1,'Curtain green gold')
    # Upholstery and rattan. All pieces are curved editable meshes.
    delete(['Drawing room seating','Drawing armchair','Drawing coffee table','Drawing fireplace','Drawing fire surround'])
    @assembly
    def upholstered(name,x,y,z,w,angle,mat,layer):
        c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x))
        for label,dx,dy,h,size,r in [('base',0,0,.28,(w,.83,.32),.11),('back',0,.28,.74,(w-.1,.28,.65),.13),('left arm',-w/2+.1,0,.60,(.22,.82,.32),.10),('right arm',w/2-.1,0,.60,(.22,.82,.32),.10)]:local_box(name+' '+label,c,u,v,dx,dy,z+h,size,mat,layer,r=r)
        n=max(1,round(w/.70))
        for i in range(n):local_box(name+' seat cushion',c,u,v,-(w-.32)/2+(w-.32)*(i+.5)/n,-.10,z+.46,((w-.34)/n-.014,.57,.19),mat,layer,r=.07)
        for dx in (-w*.32,w*.32):
            for dy in (-.29,.29):local_box(name+' wooden foot',c,u,v,dx,dy,z+.08,(.09,.09,.16),'Dark walnut',layer)
    @assembly
    def rattan(name,x,y,z,w= .70,angle=0,layer='16 Fittings and furniture'):
        c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x))
        for dx in (-w/2+.04,w/2-.04):
            for dy in (-.27,.27):
                p=c+u*dx+v*dy;beam(name+' cane leg',(*p,z+.02),(*p,z+.52),.035,'Rattan',layer)
            points=[]
            for dy,h in [(-.31,.58),(-.27,.68),(.10,.69),(.30,.84),(.31,1.02)]:p=c+u*dx+v*dy;points.append((*p,z+h))
            tube(name+' bent cane arm',points,.026,'Rattan',layer)
        local_box(name+' seat cushion',c,u,v,0,-.03,z+.45,(w-.07,.58,.16),'Rattan cushion',layer,r=.06)
        local_box(name+' back cushion',c,u,v,0,.26,z+.78,(w-.09,.13,.43),'Rattan cushion',layer,r=.055)
        for i in range(10):
            dx=-w/2+.035+i*(w-.07)/9;p=c+u*dx+v*.345
            beam(name+' woven back cane',(*p,z+.5),(*p,z+.99),.009,'Rattan',layer)
        for h in (.56,.70,.85,.98):beam(name+' woven back rail',(*(c-u*(w/2)+v*.345),z+h),(*(c+u*(w/2)+v*.345),z+h),.012,'Rattan',layer)
    upholstered('Drawing leather sofa',9.48,1.84,0,2.05,math.pi/2,'Burgundy leather',layer)
    upholstered('Drawing leather armchair',11.20,.54,0,1.00,math.pi,'Burgundy leather',layer)
    upholstered('Drawing recliner south',11.43,3.12,0,.89,math.pi/2,'Cream upholstery',layer)
    upholstered('Drawing recliner north',11.43,4.78,0,.89,math.pi/4,'Cream upholstery',layer)
    rattan('Drawing cane settee',9.52,7.26,0,1.58,math.pi/2)
    rattan('Drawing cane chair',11.19,7.79,0,.68,0)
    rattan('Drawing cane chair',12.48,7.38,0,.68,-math.pi/3)
    roundbox('Drawing upholstered footstool',(11.48,3.20,.24),(.52,.43,.46),'Rattan cushion',layer,.08)
    # Detailed black fireplace with opening, tile slips, fluted columns and mantel.
    c=Vector((13.59,4.70));u=Vector((0,-1));v=Vector((1,0))
    local_box('Drawing fireplace hearth',c,u,v,0,0,.04,(1.9,.85,.08),'Metal',layer)
    local_box('Drawing fireplace back',c,u,v,0,.19,.57,(1.58,.09,1.10),'Metal',layer)
    local_box('Drawing fireplace dark opening',c,u,v,0,-.02,.45,(.68,.14,.73),'Black screen',layer)
    for dx in (-.62,.62):
        local_box('Drawing fireplace column',c,u,v,dx,-.20,.65,(.18,.17,1.12),'Metal',layer,r=.02)
        for j in (-1,0,1):local_box('Fireplace column flute',c,u,v,dx+j*.043,-.30,.64,(.014,.022,.91),'Dark walnut',layer)
        for h in (.15,1.14):local_box('Fireplace column capital',c,u,v,dx,-.21,h,(.24,.23,.10),'Metal',layer)
    local_box('Fireplace frieze',c,u,v,0,-.15,1.14,(1.59,.22,.23),'Metal',layer,r=.01)
    local_box('Fireplace mantel shelf',c,u,v,0,-.15,1.31,(1.85,.42,.09),'Metal',layer,r=.01)
    for sign in (-1,1):
        for k in range(5):
            local_box('Fireplace ivory tile',c,u,v,sign*.43,-.245,.21+k*.16,(.14,.023,.15),'Cream ceramic',layer)
            p=c+u*(sign*.43)+v*(-.263)
            sphere('Fireplace tile motif',(*p,.21+k*.16),(.009,.007,.045),'Foliage',layer)
    for k in range(9):local_box('Fire grate bar',c,u,v,-.31+k*.077,-.30,.29,(.022,.025,.25),'Metal',layer)
    # Furniture helpers and the corrected bedroom orientation.
    @assembly
    def chest(name,x,y,z,w=.8,d=.42,h=.83,angle=0,mat='Honey oak',layer='26 Fittings and furniture'):
        c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x))
        local_box(name+' carcass',c,u,v,0,0,z+h/2,(w,d,h),mat,layer)
        local_box(name+' top',c,u,v,0,0,z+h+.02,(w+.05,d+.03,.04),mat,layer,r=.01)
        for i in range(4):
            hh=h/4;zz=z+(i+.5)*hh
            local_box(name+' drawer',c,u,v,0,-d/2-.015,zz,(w-.04,.028,hh-.024),mat,layer,r=.004)
            for dx in (-w*.3,w*.3):p=c+u*dx+v*(-d/2-.055);sphere(name+' drawer knob',(*p,zz),(.015,.015,.015),'Brass',layer)
    @assembly
    def bed(name,x,y,z,w,d,angle,mat='Bed plaid'):
        c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x));layer='26 Fittings and furniture'
        local_box(name+' frame',c,u,v,0,0,z+.25,(w+.06,d,.31),'Honey oak',layer,r=.03)
        local_box(name+' mattress',c,u,v,0,0,z+.48,(w,d,.23),'Porcelain',layer,r=.075)
        local_box(name+' duvet',c,u,v,0,-.14,z+.60,(w+.035,d-.23,.15),mat,layer,r=.07)
        for dx in (-w*.24,w*.24):local_box(name+' pillow',c,u,v,dx,d/2-.34,z+.70,(w*.44,.47,.15),'Bed linen',layer,r=.07)
        for dx in (-w/2,w/2):local_box(name+' headboard post',c,u,v,dx,d/2,z+.61,(.065,.065,1.18),'Honey oak',layer)
        local_box(name+' headboard top',c,u,v,0,d/2,z+1.17,(w+.15,.075,.10),'Honey oak',layer,r=.018)
        for i in range(13):local_box(name+' headboard spindle',c,u,v,-w/2+.08+i*(w-.16)/12,d/2,z+.90,(.035,.04,.42),'Honey oak',layer)
        # Thin woven checks have relief small enough to remain cloth-like.
        if mat=='Bed plaid':
            for i in range(9):local_box(name+' duvet woven stripe',c,u,v,-w/2+.06+i*(w-.12)/8,-.17,z+.679,(.014,d-.40,.002),'Porcelain',layer)
            for i in range(7):local_box(name+' duvet cross stripe',c,u,v,0,-d/2+.15+i*(d-.6)/6,z+.680,(w-.12,.017,.002),'Lampshade',layer)
    delete(['Principal bed ','Principal mattress','Principal headboard','Principal pillow','Principal fitted wardrobe','Bedroom 4 bed','Bedroom 4 mattress','Bedroom 4 headboard','Bedroom 4 pillow','Bedroom 4 wardrobe'])
    bed('Principal bed',11.53,5.04,L,1.52,2.03,math.pi)
    chest('Principal right drawers',10.19,4.25,L,.83,.46,.98,math.pi)
    chest('Principal left bedside',12.69,4.24,L,.55,.45,.51,math.pi)
    # East-wall pine wardrobe faces west; no horizontal worktop or incorrectly-facing fronts.
    cabinet_run('Principal pine wardrobe',(13.52,6.38),4.24,.62,2.35,L,-math.pi/2,'Pine',False,False,'26 Fittings and furniture')
    for yy in (6.06,6.58):box('Principal wardrobe mirror',(13.179,yy,L+1.28),(.015,.46,1.7),'Mirror','26 Fittings and furniture')
    bed('Bedroom 4 bed',1.27,1.64,L,1.37,1.91,math.pi/2,'Bed floral')
    chest('Bedroom 4 bedside',.57,.51,L,.67,.42,.83,math.pi/2)
    cabinet_run('Bedroom 4 wardrobe',(1.31,2.76),1.10,.56,2.15,L,0,'White joinery',False,False,'26 Fittings and furniture')
    for xx in (1.05,1.58):box('Bedroom 4 wardrobe mirror',(xx,2.458,L+1.31),(.45,.012,1.03),'Mirror','26 Fittings and furniture')
    # Simple TV stands match the source locations.
    @assembly
    def tv(name,x,y,z,angle=0,width=.98,layer='16 Fittings and furniture'):
        c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x))
        local_box(name+' black bezel',c,u,v,0,0,z+.93,(width,.055,width*.60),'Metal',layer,r=.012)
        local_box(name+' screen',c,u,v,0,-.033,z+.93,(width-.035,.009,width*.60-.03),'Black screen',layer)
        local_box(name+' stand top',c,u,v,0,0,z+.57,(width*.85,.41,.03),'Dark walnut',layer)
        local_box(name+' stand shelf',c,u,v,0,0,z+.19,(width*.85,.41,.035),'Dark walnut',layer)
        for dx in (-width*.39,width*.39):
            for dy in (-.17,.17):local_box(name+' stand leg',c,u,v,dx,dy,z+.30,(.032,.032,.58),'Chrome',layer)
    tv('Drawing television',13.62,2.91,0,-math.pi/2)
    tv('Principal television',11.73,8.02,L,0,1.20,'26 Fittings and furniture')
    chest('Drawing record cabinet',13.54,1.67,0,1.12,.43,.83,-math.pi/2,'Dark walnut','16 Fittings and furniture')
    # Bookcases face into their rooms, individual varied books rather than uniform blocks.
    delete(['Family bookshelf','Bedroom 2 library','Bedroom 3 bookshelf','Bedroom 3 sofa','Bedroom 2 armchair'])
    @assembly
    def bookcase(name,x,y,z,w,h=1.9,angle=0,layer='26 Fittings and furniture',cds=False):
        c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x));d=.27
        local_box(name+' back',c,u,v,0,d/2,z+h/2,(w,.035,h),'Honey oak',layer)
        for dx in (-w/2,w/2):local_box(name+' side',c,u,v,dx,0,z+h/2,(.04,d,h),'Honey oak',layer)
        n=9 if cds else 5
        for k in range(n+1):
            zz=z+.06+k*(h-.10)/n;local_box(name+' shelf',c,u,v,0,0,zz,(w,d,.032),'Honey oak',layer)
            if k==n:continue
            cursor=-w/2+.03
            while cursor<w/2-.04:
                ww=rng.uniform(.025,.068) if not cds else .017;hh=rng.uniform(.17,.29) if not cds else .125
                if cursor+ww>w/2-.025:break
                local_box(name+' book',c,u,v,cursor+ww/2,-.025,zz+.017+hh/2,(ww-.002,d*.75,hh),f'Book spine {rng.randrange(7)}',layer)
                cursor+=ww
    bookcase('Bedroom 3 paired shelves A',4.74,6.65,L,.85,1.80,-math.pi/2)
    bookcase('Bedroom 3 paired shelves B',4.74,7.55,L,.85,1.80,-math.pi/2)
    bookcase('Bedroom 3 south bookcase',3.4,5.91,L,.88,1.98,math.pi)
    bookcase('Bedroom 3 CD shelves',.29,6.32,L,.62,1.95,math.pi/2,cds=True)
    upholstered('Bedroom 3 leather sofa',1.68,6.13,L,1.78,math.pi,'Metal','26 Fittings and furniture')
    tv('Bedroom 3 television',.40,7.93,L,math.pi/2,.94,'26 Fittings and furniture')
    bookcase('Bedroom 5 bookcase',3.22,5.39,L,.85,2.11)
    bookcase('Bedroom 2 west shelves',9.37,1.12,L,1.66,1.92,math.pi/2)
    bookcase('Bedroom 2 north shelves',12.22,3.57,L,2.5,1.92)
    upholstered('Bedroom 2 armchair',13.31,1.17,L,.88,-math.pi/2,'Cream upholstery','26 Fittings and furniture')
    bookcase('Family east glass bookcase',4.01,1.85,0,.87,1.73,-math.pi/2,'16 Fittings and furniture')
    bookcase('Family CD bookcase',.29,2.54,0,.8,1.91,math.pi/2,'16 Fittings and furniture',True)
    rattan('Family cane chair A',.57,3.30,0,.72,0)
    rattan('Family cane chair B',3.42,.84,0,.73,-3*math.pi/4)
    rattan('Family cane chair C',.54,1.30,0,.7,math.pi/2)
    # Dining and drawing sideboards, with real projecting tops and cupboard panels.
    cabinet_run('Dining carved sideboard',(5.42,7.79),1.35,.46,.85,0,math.pi/2,'Dark walnut',True,False)
    chest('Dining writing desk',8.49,7.79,0,.91,.51,.97,-math.pi/2,'Dark walnut','16 Fittings and furniture')
    cabinet_run('Drawing bureau base',(9.25,5.00),1.06,.46,.98,0,math.pi/2,'Dark walnut',True,False)
    cabinet_run('Drawing bureau upper',(9.12,5.00),1.04,.26,.99,1.02,math.pi/2,'Dark walnut',False,False)
    for yy in (4.73,5.27):box('Drawing bureau glazed door',(9.28,yy,1.53),(.017,.46,.83),'Glazing','16 Fittings and furniture')
    bookcase('Drawing rear bookcase',13.42,7.82,0,.70,1.86,-math.pi/2,'16 Fittings and furniture')
    # Pictures and sconces with bevelled frames, placed against the correct walls.
    @assembly
    def picture(name,x,y,z,w,h,angle=0,layer='16 Fittings and furniture'):
        c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x))
        local_box(name+' backing',c,u,v,0,0,z,(w,.024,h),'Dark walnut',layer)
        local_box(name+' mount',c,u,v,0,-.016,z,(w-.04,.01,h-.04),'Porcelain',layer)
        local_box(name+' print',c,u,v,0,-.024,z,(w-.13,.008,h-.13),'Picture print',layer)
        for dx in (-w/2+.014,w/2-.014):local_box(name+' frame',c,u,v,dx,-.018,z,(.028,.035,h),'Brass',layer,r=.004)
        for zz in (-h/2+.014,h/2-.014):local_box(name+' frame',c,u,v,0,-.018,z+zz,(w,.042,.028),'Brass',layer,r=.004)
    for x,w,h in [(10.06,.24,.23),(10.71,.41,.32),(11.66,.57,.37),(12.68,.36,.34),(13.42,.39,.32)]:picture('Principal framed print',x,3.965,L+1.92,w,h,math.pi,'26 Fittings and furniture')
    picture('Fireplace landscape painting',13.82,4.75,1.96,1.10,.58,-math.pi/2)
    for y in (.87,1.42,1.94):picture('Bedroom 4 small print',.15,y,L+1.95,.27,.23,math.pi/2,'26 Fittings and furniture')
    for x in (1.50,2.25,2.79,3.29):picture('Family framed print',x,3.88,1.91,.38,.29)
    for y in (4.05,4.79):picture('Bedroom 5 framed print',.15,y,L+1.91,.65,.43,math.pi/2,'26 Fittings and furniture')
    @assembly
    def wall_light(name,x,y,z,angle=0,layer='16 Fittings and furniture'):
        c=Vector((x,y));u=Vector((math.cos(angle),math.sin(angle)));v=Vector((-u.y,u.x))
        # Opaque ivory triangular sconce bowl with light above, as photographed.
        verts=[]
        for dy in (0,-.12):
            for dx,dz in [(-.16,.075),(.16,.075),(0,-.15)]:p=c+u*dx+v*dy;verts.append((*p,z+dz))
        mesh(name+' shade',verts,[(0,2,1),(3,4,5),(0,1,4,3),(1,2,5,4),(2,0,3,5)],'Lampshade',layer)
        ld=bpy.data.lights.new(name+' warm glow','POINT');ld.energy=12;ld.color=(1,.83,.55);ld.shadow_soft_size=.12
        ob=bpy.data.objects.new(name+' warm glow',ld);collection(layer).objects.link(ob);p=c-v*.13;ob.location=(*p,z+.13)
    for x,ang in [(9.06,math.pi/2),(13.83,-math.pi/2)]:
        for y in (2.52,6.21):wall_light('Drawing wall sconce',x,y,2.11,ang)
    wall_light('Dining west sconce',5.23,7.34,2.10,math.pi/2)
    wall_light('Dining east sconce',8.73,7.05,2.10,-math.pi/2)
    # Ornamental drawing room ceiling: perimeter field, central roses and relief scrolls.
    def ceiling_ring(name,x,y,z,rx,ry,r=.018,layer='15 Ceilings'):
        tube(name,[(x+rx*math.cos(i*math.tau/96),y+ry*math.sin(i*math.tau/96),z) for i in range(96)],r,'White joinery',layer,closed=True)
    for cy in (2.46,6.57):
        for rr in (.16,.23,.34,.63,.70):ceiling_ring('Drawing ceiling rose',11.38,cy,H-.024,rr,rr,.019)
        for i in range(24):
            a=i*math.tau/24
            sphere('Drawing plaster petal',(11.38+.49*math.cos(a),cy+.49*math.sin(a),H-.023),(.047,.047,.014),'White joinery','15 Ceilings',12,6)
        poly=[(9.69,cy-1.44),(10.08,cy-1.70),(12.68,cy-1.70),(13.07,cy-1.44),(13.07,cy+1.40),(12.67,cy+1.68),(10.10,cy+1.68),(9.69,cy+1.4)]
        tube('Drawing ceiling panel moulding',[(x,y,H-.026) for x,y in poly],.023,'White joinery','15 Ceilings',closed=True)
        for cx in (10.03,12.73):
            for yy in (cy-1.25,cy+1.25):
                for sign in (-1,1):
                    points=[]
                    for i in range(36):
                        a=i/35*math.pi*2.3;r=.14*(1-i/42);points.append((cx+sign*(.12+r*math.cos(a)),yy+r*math.sin(a),H-.024))
                    tube('Drawing plaster scroll',points,.012,'White joinery','15 Ceilings')
    for x,y in [(6.90,6.7),(6.52,3.70)]:
        for r in (.11,.18,.27,.40):ceiling_ring('Ceiling rose',x,y,H-.025,r,r,.013)
    # Chandeliers, suspended actual geometry, follow dining and hall photographs.
    @assembly
    def chandelier(name,x,y,z,r=.31):
        layer='16 Fittings and furniture';beam(name+' stem',(x,y,z),(x,y,H-.035),.018,'Brass',layer)
        for i in range(3):
            a=i*math.tau/3;dx=math.cos(a);dy=math.sin(a)
            tube(name+' curved arm',[(x,y,z+.08),(x+dx*r*.5,y+dy*r*.5,z-.08),(x+dx*r,y+dy*r,z-.06),(x+dx*r,y+dy*r,z+.06)],.011,'Brass',layer)
            sphere(name+' frosted shade',(x+dx*r,y+dy*r,z+.10),(.065,.065,.10),'Lampshade',layer)
    chandelier('Dining chandelier',6.90,6.7,2.21,.29)
    chandelier('Hall chandelier',6.52,3.70,2.24,.26)
    # Cast-iron scroll balustrade and curved lower tread edges seen in the hall.
    delete(['Stair handrail','Stair baluster','Stair newel','Landing baluster'])
    x0,y0=pt(663,572);run=pt(663,438)[1]-y0;N=17
    for i in range(1,N):
        y=y0+run*i/N;zz=(i+.5)*L/N
        beam('Stair white baluster',(x0-.045,y,zz),(x0-.045,y,zz+.85),.022,'White joinery','13 Staircase')
        for sign in (-1,1):
            points=[]
            for j in range(28):
                a=j/27*math.pi*2.15;rr=.09*(1-j/35)
                points.append((x0-.045,y+sign*(.09+rr*math.cos(a)),zz+.43+rr*1.8*math.sin(a)))
            tube('Stair cast scroll',points,.011,'White joinery','13 Staircase')
        sphere('Stair baluster ornament',(x0-.045,y,zz+.44),(.033,.035,.065),'White joinery','13 Staircase')
    hand=[(x0-.045,y0+.11,L/N+.92),(x0-.045,y0+run,L+.91)]
    tube('Stair polished handrail',hand,.039,'Dark walnut','13 Staircase',12)
    for y,z in [(y0+.11,.17),(y0+run,L)]:
        cylinder('Stair turned newel',(x0-.045,y,z+.44),.062,.88,'White joinery','13 Staircase',24)
        for h,r in ((.08,.095),(.18,.073),(.67,.075),(.82,.088)):cylinder('Newel collar',(x0-.045,y,z+h),r,.065,'White joinery','13 Staircase',24)
        sphere('Newel acorn',(x0-.045,y,z+.94),(.075,.075,.11),'Dark walnut','13 Staircase')
    # Closed inclined stringer, separate from the treads and wall.
    aa=(x0-.03,y0,.02);bb=(x0-.03,y0+run,L-.08)
    beam('Stair white stringer',aa,bb,.16,'White joinery','13 Staircase')
    for ap,bp in [((1347,438),(1347,534)),((1347,534),(1326,534)),((1326,534),(1326,574))]:
        a=Vector(pt(*ap,1));b=Vector(pt(*bp,1));n=math.ceil((b-a).length/.16)
        for i in range(n+1):
            p=a.lerp(b,i/n);beam('Landing white baluster',(*p,L),(*p,L+.90),.026,'White joinery','24 Trim')
            for h in (.20,.65):sphere('Landing baluster collar',(*p,L+h),(.045,.045,.065),'White joinery','24 Trim')
    # Bathroom fixtures: model inset rims instead of solid boxes in the bowl openings.
    delete(['Family bath bath plinth','Family bath inset tub'])
    x,y=pt(1277,235,1);layer='26 Fittings and furniture'
    roundbox('Family bathtub outer shell',(x,y,L+.29),(1.72,.75,.58),'Cream ceramic',layer,.10)
    roundbox('Family bath recessed interior',(x,y,L+.585),(1.46,.58,.026),'Cream tile',layer,.14)
    tube('Family bath rim',[(x+.79*math.cos(i*math.tau/80),y+.33*math.sin(i*math.tau/80),L+.60) for i in range(80)],.035,'Cream ceramic',layer,12,True)
    tube('Bath mixer spout',[(x+.62,y+.23,L+.60),(x+.62,y+.23,L+.83),(x+.55,y+.18,L+.89),(x+.47,y+.12,L+.86)],.018,'Chrome',layer)
    # Tile lining as thin finish faces; nominal room spans are measured at plaster/wall faces.
    for name,rect in [('Bathroom west',(1222,218,1222,362)),('Bathroom east',(1317,218,1317,292)),('Principal en suite back',(1317,214,1391,214)),('Bed4 shower rear',(1223,441,1266,441))]:
        a=Vector(pt(rect[0],rect[1],1));b=Vector(pt(rect[2],rect[3],1));u=(b-a).normalized();v=Vector((-u.y,u.x));length=(b-a).length;c=(a+b)/2
        local_box(name+' tile finish',c,u,v,0,.07,L+1.33,(length,.009,2.65),'Cream tile',layer)
        for h in range(1,9):local_box(name+' tile grout horizontal',c,u,v,0,.078,L+h*.30,(length,.001,.003),'White joinery',layer)
        for j in range(1,math.ceil(length/.30)):local_box(name+' tile grout vertical',c,u,v,-length/2+j*.30,.078,L+1.33,(.003,.001,2.65),'White joinery',layer)
    # Tiny bevels catch light on joinery without changing the documented wall faces.
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        layer=ob.users_collection[0].name
        if (layer.endswith('Trim') or 'Doors and windows' in layer) and len(ob.data.polygons)==6 and len(ob.data.vertices)==8:
            mod=ob.modifiers.new('Joinery edge highlights','BEVEL');mod.width=.0015;mod.segments=2
            # Keep modifiers non-destructive; portable exports apply them.
    from refine_layout import refine_layout
    refine_layout(g,tube,sphere,arch_strip)
    from refine_review import refine_review
    refine_review(g,locals())
    print('PHOTO_REFINEMENTS_COMPLETE',sum(o.type=='MESH' for o in bpy.data.objects),flush=True)
