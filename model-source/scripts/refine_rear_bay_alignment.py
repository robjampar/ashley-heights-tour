"""Symmetric rear dining/balcony geometry and literal-photo glazing details.

The owner selected option B: 300 mm less projection, giving a 4.90 m dining
depth and 2.30 m balcony depth. These are explicit departures from the printed
5.20/2.60 m depths, recorded for the independent dimension audits.
"""
import math
import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube

P='Rear bay detail | '
BAY_NAMES=('Dining left return','Dining left bay','Dining rear French doors','Dining right bay','Dining right return')


def refine_rear_bay_alignment(g, projection_reduction=0.30):
    data=g.get('g',g);walls=data.get('walls',data.get('wall_specs'));rooms=data.get('rooms',g.get('rooms'))
    box,mesh,prism=[g[k] for k in ('box','mesh','prism')]
    level=data.get('level_height',g.get('LEVEL',2.8))
    if not 0<=projection_reduction<=.4:raise ValueError('Review projection outside documented range')
    for ob in list(bpy.data.objects):
        n=ob.name
        if n.startswith(P) or any(n.startswith(name) or n.startswith('Circulation detail | Cove '+name) for name in BAY_NAMES):
            bpy.data.objects.remove(ob,do_unlink=True)
        elif n in ('Dining room | floor','Dining room | ceiling','Balcony deck','Rear terrace paving'):
            bpy.data.objects.remove(ob,do_unlink=True)
        elif n.startswith(('Balcony top rail','Balcony rear top rail','Balcony middle rail','Balcony bottom rail','Balcony baluster')):
            bpy.data.objects.remove(ob,do_unlink=True)
    # The dimension-constrained side walls stay fixed. The unlabelled nose
    # shifts to their exact centre, eliminating piecewise-X-trace asymmetry.
    left,rear=next(w for w in walls if w['name']=='Kitchen rear')['b']
    right=next(w for w in walls if w['name']=='Drawing rear')['a'][0]
    cx=(left+right)/2
    front=10.48-projection_reduction;shoulder=9.49-projection_reduction
    half_front=(7.955-5.823333333333333)/2
    chain=[(left,rear),(left,shoulder),(cx-half_front,front),(cx+half_front,front),(right,shoulder),(right,rear)]
    floor_poly=[(left,5.10)]+chain[1:-1]+[(right,5.10)]
    room=next(r for r in rooms if r['name']=='Dining room');room['polygon_m']=[list(p) for p in floor_poly]
    prism('Dining room | floor',floor_poly,-.14,0,'Rose carpet','10 Ground floor - floors')
    prism('Dining room | ceiling',floor_poly,2.598,2.70,'Warm plaster','15 Ceilings')
    for i,name in enumerate(BAY_NAMES):
        w=next(w for w in walls if w['name']==name);w['a']=list(chain[i]);w['b']=list(chain[i+1]);w['thickness_m']=.23
        length=(Vector(w['b'])-Vector(w['a'])).length
        width=1.4106249677516949 if i==2 else 1.18
        w['openings']=[] if i in (0,4) else [[length/2,width,0,2.48,'french']]
        w['alignment_basis']='Owner confirms symmetric bay; centre opening and side openings centered on mirrored wall segments.'
        rebuild_wall(w,g)
        if w['openings']:french_pair(w,g)
    # A single mitered cove around the changed five-segment bay prevents seams.
    normals=[]
    for a,b in zip(chain,chain[1:]):
        u=(Vector(b)-Vector(a)).normalized();normals.append(Vector((u.y,-u.x)))
    profile=[(0,-.12),(.02,-.12)]+[(.09-.07*math.cos(t*math.pi/24),-.12+.10*math.sin(t*math.pi/24))for t in range(1,13)]+[(.10,-.02),(.10,0),(0,0)]
    vv=[]
    for i,p in enumerate(chain):
        n=normals[0] if i==0 else normals[-1] if i==len(chain)-1 else (normals[i-1]+normals[i])/(1+normals[i-1].dot(normals[i]))
        vv += [(*(Vector(p)+n*(.115+d)),2.60+z) for d,z in profile]
    count=len(profile);ff=[tuple(reversed(range(count))),tuple((len(chain)-1)*count+i for i in range(count))]
    for k in range(len(chain)-1):
        ff += [(k*count+i,k*count+(i+1)%count,(k+1)*count+(i+1)%count,(k+1)*count+i)for i in range(count)]
    closed(mesh(P+'Dining continuous cove',vv,ff,'White joinery','14 Trim'))

    # The old terrace rectangle crossed the bay carpet at exactly z=0. Cut a
    # true notch around the wall's outer skin instead of hiding the z-fighting.
    outer=offset_chain(chain,.117)
    terrace=[(-5.45,8.9),(outer[0][0],8.9)]+[tuple(p)for p in outer[1:-1]]+[(outer[-1][0],8.9),(14.4,8.9),(14.4,11.9),(-5.45,11.9)]
    closed(prism('Rear terrace paving',terrace,-.06,0,'Paving','50 Site - approximate'))

    # Balcony piers and their labelled 3.81 m clear width remain fixed.
    bx0,bx1=5.04,9.08;bc=(bx0+bx1)/2
    nose_half=(7.879473684210526-5.841465)/2
    by=10.625-projection_reduction;bshoulder=9.71-projection_reduction
    balcony=[(bx0,7.89),(bx1,7.89),(bx1,bshoulder),(bc+nose_half,by),(bc-nose_half,by),(bx0,bshoulder)]
    closed(prism('Balcony deck',balcony,level-.18,level,'Stone','23 Balcony'))
    railpoints=[(bx0,8.94),(bx0,bshoulder),(bc-nose_half,by),(bc+nose_half,by),(bx1,bshoulder),(bx1,8.94)]
    for i,(aa,bb)in enumerate(zip(railpoints,railpoints[1:])):
        a,b=Vector(aa),Vector(bb);u=(b-a).normalized();n=Vector((-u.y,u.x));distance=(b-a).length
        # Rail path runs clockwise around the exposed edge: outward is left.
        name='Balcony rear top rail' if i==2 else 'Balcony top rail'
        for elev,thick,label in [(level+1.05,.04,name),(level+.80,.028,'Balcony middle rail'),(level+.085,.028,'Balcony bottom rail')]:
            p=(a+b)/2;box(label,(*p,elev),(distance,thick,thick),'Metal','23 Balcony',math.atan2(u.y,u.x))
        intervals=math.ceil(distance/.14)
        for k in range(1,intervals):
            center=a.lerp(b,k/intervals);points=[]
            for step in range(19):
                t=step/18;z=level+.095+t*.935
                belly=.105*math.sin(math.pi*min(1,t/.79)) if t<.79 else 0
                p=center+n*belly;points.append((p.x,p.y,z))
            flat_bar(P+f'Balcony curved bar {i}-{k}',points,u,n,g)
    for i,p in enumerate(railpoints):box(P+f'Balcony post {i}',(*p,level+.56),(.035,.035,1.01),'Metal','23 Balcony')
    # Side doorway apertures already align: preserve those wall specifications
    # and replace their wrong opaque-panel/eight-pane leaf pattern only.
    for name in ('Bedroom 3 balcony door','Principal balcony door'):
        w=next(w for w in walls if w['name']==name)
        for ob in list(bpy.data.objects):
            if ob.name.startswith(name+' glazed door '):bpy.data.objects.remove(ob,do_unlink=True)
        a,b=Vector(w['a']),Vector(w['b']);u=(b-a).normalized();n=Vector((-u.y,u.x));op=w['openings'][0];center=a+u*op[0]
        rect_leaf(name.replace(' balcony door',''),center,u,n,op[1]-.018,.025,op[3]-.025,level,g,columns=3,rows=5,hinge_side=-1)
    selected_b=abs(projection_reduction-.30)<1e-9
    departures=[{'room':'Dining room','axis':1,'printed_target_m':5.20,'accepted_target_m':4.90},
                {'room':'Balcony','axis':1,'printed_target_m':2.60,'accepted_target_m':2.30}] if selected_b else []
    review={'option':'B — owner-selected 300 mm shallower' if selected_b else 'A — retain printed depths' if projection_reduction==0 else 'Unapproved projection review',
            'option_id':'B' if selected_b else 'A' if projection_reduction==0 else 'review',
            'owner_approved':selected_b,
            'owner_approval_basis':'Owner explicitly selected B from the side-by-side rear-bay depth options.' if selected_b else None,
            'owner_approved_dimension_departures':departures,
            'projection_reduction_m':projection_reduction,'dining_depth_m':5.20-projection_reduction,
            'balcony_depth_m':2.60-projection_reduction,'dining_projection_from_main_rear_m':front-rear,
            'balcony_projection_from_main_rear_m':by-rear,'dining_center_x_m':cx,'balcony_center_x_m':bc,
            'remaining_centerline_offset_m':bc-cx,'dining_polygon_m':floor_poly,'balcony_polygon_m':balcony,
            'dining_french_glazing':{'columns_per_leaf':2,'rows_per_leaf':5,'paired_left_right':True,'fanlight_spokes':3},
            'balcony_leaf_glazing':{'columns':3,'rows':5,'opaque_lower_panel_removed':True},
            'preserved':'Structural side-wall planes, upstairs balcony door apertures, heights, main roof and detached garden building.',
            'source':'Original panorama2445659-0 and2445674-0/2, original floorplan and owner symmetry correction.',
            'uncertainty':'Unlabelled frame profiles and projection depths remain estimates. Independent room constraints put upper/lower bay centres 95 mm apart. Owner-selected B intentionally departs from two printed depths; it is not a surveyed measurement.'}
    data['rear_bay_alignment_review']=review
    data['rear_bay_review']=review
    return review


def closed(ob):
    bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free();ob.data.update();return ob


def offset_chain(points,depth):
    nn=[]
    for a,b in zip(points,points[1:]):
        u=(Vector(b)-Vector(a)).normalized();nn.append(Vector((-u.y,u.x)))
    out=[]
    for i,p in enumerate(points):
        n=nn[0]if i==0 else nn[-1]if i==len(points)-1 else (nn[i-1]+nn[i])/(1+nn[i-1].dot(nn[i]))
        out.append(Vector(p)+n*depth)
    return out


def rebuild_wall(w,g):
    a,b=Vector(w['a']),Vector(w['b']);u=(b-a).normalized();n=Vector((-u.y,u.x));length=(b-a).length;t=w['thickness_m'];angle=math.atan2(u.y,u.x)
    def part(lo,hi,bottom,top,label):
        if hi-lo<.001 or top-bottom<.001:return
        p=a+u*((lo+hi)/2);ob=g['box'](w['name']+' | '+label,(*p,(bottom+top)/2),(hi-lo,t,top-bottom),'Warm plaster','11 Ground floor - walls',angle)
        ob.data.materials.append(g['materials']['Red brown brick']);ob.data.polygons[3].material_index=1
        if bottom==0:
            p-=n*(t/2+.012)
            g['box'](w['name']+' | skirting '+label+'-1',(*p,.07),(hi-lo,.025,.14),'White joinery','14 Trim',angle)
    if not w['openings']:part(0,length,0,2.60,'end');return
    c,width,sill,head,kind=w['openings'][0];lo,hi=c-width/2,c+width/2
    assert 0<lo<hi<length
    part(0,lo,0,2.60,'pier 0');part(lo,hi,head,2.60,'lintel 0');part(hi,length,0,2.60,'end')


def wall_polygon(name,poly,center,u,n,depth,mat,layer,g):
    vv=[(*(center+u*x+n*d),z)for d in (-depth/2,depth/2)for x,z in poly];count=len(poly)
    ff=[tuple(reversed(range(count))),tuple(range(count,2*count))]+[(i,(i+1)%count,(i+1)%count+count,i+count)for i in range(count)]
    return closed(g['mesh'](name,vv,ff,mat,layer))


def arch_ring(label,center,u,n,width,spring,rise,ring_width,depth,g,offset=0):
    rows=40;k=rows+1;vv=[]
    for d in (-depth/2+offset,depth/2+offset):
        for extra in (0,ring_width):
            for i in range(k):
                angle=i*math.pi/rows;x=(width/2+extra)*math.cos(angle);z=spring+(rise+extra)*math.sin(angle);vv.append((*(center+u*x+n*d),z))
    ff=[]
    for i in range(rows):ff +=[(i,i+1,k+i+1,k+i),(2*k+i,3*k+i,3*k+i+1,2*k+i+1),(i,2*k+i,2*k+i+1,i+1),(k+i,k+i+1,3*k+i+1,3*k+i)]
    ff +=[(0,k,3*k,2*k),(rows,2*k+rows,3*k+rows,k+rows)]
    return closed(g['mesh'](P+label,vv,ff,'White joinery','12 Doors and windows'))


def french_pair(w,g):
    a,b=Vector(w['a']),Vector(w['b']);u=(b-a).normalized();n=Vector((-u.y,u.x));angle=math.atan2(u.y,u.x);c,width,sill,head,kind=w['openings'][0];center=a+u*c;spring=head-.51;label={'Dining left bay':'West French','Dining rear French doors':'Centre French','Dining right bay':'East French'}[w['name']]
    # Solid brick/plaster spandrels occupy the part of the rectangular aperture
    # outside the true ellipse; no open faces or painted-on window arches.
    for side,(aa,bb)in enumerate(((math.pi,math.pi/2),(math.pi/2,0))):
        poly=[(width/2*math.cos(aa+(bb-aa)*i/24),spring+.51*math.sin(aa+(bb-aa)*i/24))for i in range(25)]
        poly.append((-width/2 if side==0 else width/2,head))
        ob=wall_polygon(w['name']+' | arch spandrel '+str(side),poly,center,u,n,.23,'Warm plaster','11 Ground floor - walls',g)
        ob.data.materials.append(g['materials']['Red brown brick']);ob.data.polygons[1].material_index=1
    arch_ring(label+' curved outer reveal',center,u,n,width-.085,spring,.450,.060,.27,g)
    arch_ring(label+' inside stepped bead',center,u,n,width-.105,spring,.4575,.010,.014,g,offset=-.141)
    # Fanlight has a thin rubber gasket border, a true curved pane and 3 spokes.
    poly=[(-width/2+.065,spring)]+[((width/2-.065)*math.cos(math.pi-i*math.pi/40),spring+.447*math.sin(math.pi-i*math.pi/40))for i in range(1,41)]
    wall_polygon(P+label+' fanlight glass',poly,center,u,n,.014,'Glazing','12 Doors and windows',g)
    for q in (math.pi/4,math.pi/2,3*math.pi/4):
        p=center+u*(width/2-.065)*math.cos(q)
        g['beam'](P+label+' fanlight spoke',(*center,spring+.005),(*p,spring+.447*math.sin(q)),.012,'White joinery','12 Doors and windows')
    for x in (-width/2+.030,width/2-.030):
        p=center+u*x;g['box'](P+label+' fixed jamb',(*p,(spring+.030)/2),(.060,.14,spring-.090),'White joinery','12 Doors and windows',angle)
    for z,hh in ((.030,.060),(spring,.060)):
        g['box'](P+label+' fixed horizontal frame',(*center,z),(width,.14,hh),'White joinery','12 Doors and windows',angle)
    leaf_width=(width-.132)/2
    for side in (-1,1):
        leaf_center=center+u*side*(leaf_width/2+.004)
        rect_leaf(label+(' left'if side<0 else' right'),leaf_center,u,n,leaf_width,.054,spring-.038,0,g,columns=2,rows=5,hinge_side=side)
    p=center+n*.08;g['box'](P+label+' projecting threshold',(*p,.007),(width+.07,.34,.014),'Stone','12 Doors and windows',angle)


def rect_leaf(label,center,u,n,width,bottom,top,floor,g,columns,rows,hinge_side):
    angle=math.atan2(u.y,u.x);layer='22 Doors and windows'if floor>1 else'12 Doors and windows';box=g['box'];mesh=g['mesh'];height=top-bottom
    hinge_xy=center+u*hinge_side*width/2
    parent=bpy.data.objects.new(P+label+' hinge',None);g['collection'](layer).objects.link(parent);parent.location=(*hinge_xy,floor+bottom);parent['closed_angle']=angle
    bpy.context.view_layer.update();before=set(bpy.data.objects)
    def part(suffix,x,z,ww,hh,dep=.070,offset=0,mat='White joinery'):
        p=center+u*x+n*offset;return box(P+label+' '+suffix,(*p,floor+z),(ww,dep,hh),mat,layer,angle)
    for x in (-width/2+.031,width/2-.031):part('leaf stile',x,(bottom+top)/2,.062,height)
    for z,hh in ((bottom+.038,.076),(top-.040,.080)):part('leaf rail',0,z,width-.124,hh)
    gl=bottom+.083;gh=top-.086;gw=width-.137
    part('clear glass',0,(gl+gh)/2,gw,gh-gl,.016,0,'Glazing')
    # Thin dark gasket is inset into the white leaf, matching the captured doors.
    for x in (-gw/2-.003,gw/2+.003):part('glazing gasket',x,(gl+gh)/2,.004,gh-gl,.020,-.013,'Metal')
    for z in (gl-.003,gh+.003):part('glazing gasket',0,z,gw+.009,.004,.020,-.013,'Metal')
    for k in range(1,columns):part('Georgian vertical',-gw/2+gw*k/columns,(gl+gh)/2,.012,gh-gl,.027,-.004)
    bar_centers=[-gw/2+gw*k/columns for k in range(1,columns)]
    spans=list(zip([-gw/2]+[x+.006 for x in bar_centers],[x-.006 for x in bar_centers]+[gw/2]))
    for k in range(1,rows):
        for lo,hi in spans:part('Georgian horizontal',(lo+hi)/2,gl+(gh-gl)*k/rows,hi-lo,.012,.027,-.004)
    handle_x=-hinge_side*(width/2-.035)
    part('handle backplate',handle_x,1.025,.018,.115,.012,-.047)
    part('lever',handle_x+hinge_side*.038,1.025,.095,.016,.020,-.065)
    part('key slot',handle_x,.972,.006,.014,.014,-.056,'Metal')
    for z in (bottom+.18,(bottom+top)/2,top-.18):
        p=center+u*hinge_side*(width/2-.010)
        g['cylinder'](P+label+' hinge barrel',(*p,floor+z),.010,.075,'White joinery',layer,16)
    for ob in set(bpy.data.objects)-before:
        ob.parent=parent;ob.matrix_parent_inverse=parent.matrix_world.inverted();ob['assembly']=P+label;ob['walkthrough_opening_leaf']=True
        ob['reference']='2445659-0'if floor==0 else'2445674-0/2'


def flat_bar(name,points,u,n,g):
    vv=[tuple(Vector(p)+Vector((u.x,u.y,0))*a+Vector((n.x,n.y,0))*b)for p in points for a,b in [(-.009,-.004),(.009,-.004),(.009,.004),(-.009,.004)]]
    ff=[(3,2,1,0),tuple((len(points)-1)*4+i for i in range(4))]
    for i in range(len(points)-1):ff +=[(4*i+j,4*i+(j+1)%4,4*(i+1)+(j+1)%4,4*(i+1)+j)for j in range(4)]
    return closed(g['mesh'](name,vv,ff,'Metal','23 Balcony'))
