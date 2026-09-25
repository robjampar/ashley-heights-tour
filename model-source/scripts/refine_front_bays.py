"""Continuous five-light front bays, checked against original exterior/interior photos.

Run after trim comparison (whose drawing cornice follows the flat front wall),
before surface joins. Wall centre lines, sill/head and measured room spans stay
fixed. Frame section widths and shallow cap-roof profiles remain photo estimates.
"""
import math
import bpy
import bmesh
from mathutils import Vector

PREFIX = 'Front bay correction | '


def refine_front_bays(g):
    data = g.get('g', g)
    walls = data.get('walls', data.get('wall_specs'))
    box, mesh, prism = g['box'], g['mesh'], g['prism']
    created=[]
    for ob in list(bpy.data.objects):
        if ob.name.startswith(PREFIX):
            bpy.data.objects.remove(ob, do_unlink=True)

    def mark(ob, label, basis=None):
        ob['assembly']=PREFIX+label
        ob['basis']=basis or 'Five joined white window sections and a shallow cap directly above; source listing 00/02, 2445661-2 and 2445667-0. Profiles estimated.'
        created.append(ob)
        return ob

    def clean(ob):
        bm=bmesh.new();bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data);bm.free();ob.data.update()
        return ob

    def line_offsets(points, amount):
        dirs=[(b-a).normalized() for a,b in zip(points, points[1:])]
        # Points run east to west. Right-hand normal points into the house.
        normals=[Vector((d.y,-d.x)) for d in dirs]
        result=[]
        for i,p in enumerate(points):
            if i==0:q=p+normals[0]*amount
            elif i==len(points)-1:q=p+normals[-1]*amount
            else:q=p+(normals[i-1]+normals[i])*amount/(1+normals[i-1].dot(normals[i]))
            result.append(q)
        return result

    def strip(name, points, lo, hi, z0, z1, material, layer, label):
        xy=[tuple(p) for p in line_offsets(points,lo)+list(reversed(line_offsets(points,hi)))]
        return mark(clean(prism(PREFIX+name,xy,z0,z1,material,layer)),label)

    def ceiling_outline(poly):
        result=[]
        for p,q in zip(poly,poly[1:]+poly[:1]):
            dp,dq=p[1],q[1]
            if dp>=-1e-7:result.append((p[0],max(0,dp)))
            if (dp>=0)!=(dq>=0):
                t=dp/(dp-dq);result.append((p[0]+t*(q[0]-p[0]),0))
        unique=[]
        for p in result:
            if not unique or math.dist(p,unique[-1])>1e-6:unique.append(p)
        if math.dist(unique[0],unique[-1])<1e-6:unique.pop()
        changed=True
        while changed:
            changed=False
            for i,p in enumerate(unique):
                a=unique[i-1];b=unique[(i+1)%len(unique)]
                if abs((p[0]-a[0])*(b[1]-p[1])-(p[1]-a[1])*(b[0]-p[0]))<1e-8:
                    unique.pop(i);changed=True;break
        return unique

    report=[]
    for label in ('Family','Drawing'):
        parts=sorted([w for w in walls if w['name'].startswith(label+' bay ')],key=lambda w:int(w['name'].rsplit(' ',1)[1]))
        if len(parts)!=5:raise ValueError('Expected five traced bay walls: '+label)
        original=[Vector(parts[0]['a'])]+[Vector(w['b']) for w in parts]
        sill,head=.65,2.30
        for ob in list(bpy.data.objects):
            if ob.type!='MESH':continue
            if ob.name.startswith(label+' bay ') or ob.name.startswith('Circulation detail | Cove '+label+' bay '):
                bpy.data.objects.remove(ob,do_unlink=True)
        # Below-sill masonry keeps the exact plan dimensions, including the
        # central inner face used by the independent 34-span check.
        for i,w in enumerate(parts):
            a,b=Vector(w['a']),Vector(w['b']);d=b-a;mid=(a+b)/2
            ob=box(w['name']+' | below 0',(mid.x,mid.y,sill/2),(d.length,w['thickness_m'],sill),'Warm plaster','11 Ground floor - walls',math.atan2(d.y,d.x))
            ob.data.materials.append(g['materials']['Red brown brick'])
            ob.data.polygons[3].material_index=1;mark(ob,label+' masonry sill')
            # An opening spans each traced facet. There are no masonry jambs
            # between windows; the head wall belongs to the flat main facade.
            w['openings']=[[d.length/2,d.length,sill,head,'window']]
            w['bay_window_basis']='Continuous five-light bay; no intervening masonry; upper closure is at main facade plane.'
            w['above_head_setback_m']=abs(min(p.y for p in original))
        strip(label+' continuous skirting',original,.1145,.140,0,.14,'White joinery','14 Trim',label+' masonry sill')

        # Five comparable-width lights are directly visible in 2445661-2.
        # The supplied plan's linework is a footprint, not a mullion schedule;
        # retain its endpoints and depth while evenly dividing the frame.
        x0,x1=original[0].x,original[-1].x
        frame=[Vector((x0+(x1-x0)*i/5,original[i].y)) for i in range(6)]
        dirs=[(b-a).normalized() for a,b in zip(frame,frame[1:])]
        transom=head-.33
        for rail,z0,z1 in [('lower rail',sill,sill+.060),('upper rail',head-.060,head),('vent rail',transom-.028,transom+.028)]:
            strip(label+' '+rail,frame,-.067,.067,z0,z1,'White joinery','12 Doors and windows',label+' joined glazing')
        for i,p in enumerate(frame):
            tangent=dirs[0] if i==0 else dirs[-1] if i==5 else (dirs[i-1]+dirs[i]).normalized()
            width=.065 if i in (0,5) else .070
            mark(box(PREFIX+label+f' frame junction {i+1}',(p.x,p.y,(sill+head)/2),(width,.135,head-sill),'White joinery','12 Doors and windows',math.atan2(tangent.y,tangent.x)),label+' joined glazing')
        for i,(a,b) in enumerate(zip(frame,frame[1:])):
            d=b-a;u=d.normalized();mid=(a+b)/2;angle=math.atan2(d.y,d.x)
            clear=d.length-.068
            mark(box(PREFIX+label+f' clear glass {i+1}',(mid.x,mid.y,(sill+head)/2),(clear,.016,head-sill-.09),'Glazing','12 Doors and windows',angle),label+' joined glazing')
            # Lower casement: two cross bars and one upright make six panes.
            for j in (1,2):
                z=sill+.060+(transom-.028-sill-.060)*j/3
                mark(box(PREFIX+label+f' lower horizontal glazing bar {i+1}-{j}',(mid.x,mid.y,z),(clear,.026,.014),'White joinery','12 Doors and windows',angle),label+' joined glazing')
            mark(box(PREFIX+label+f' lower vertical glazing bar {i+1}',(mid.x,mid.y,(sill+.060+transom-.028)/2),(.014,.026,transom-.028-sill-.060),'White joinery','12 Doors and windows',angle),label+' joined glazing')
            mark(box(PREFIX+label+f' vent vertical glazing bar {i+1}',(mid.x,mid.y,(transom+.028+head-.060)/2),(.014,.026,head-.060-transom-.028),'White joinery','12 Doors and windows',angle),label+' joined glazing')
            inside=Vector((u.y,-u.x));p=mid+inside*.080
            mark(box(PREFIX+label+f' vent latch {i+1}',(p.x,p.y,transom+.014),(.050,.025,.020),'White joinery','12 Doors and windows',angle),label+' joined glazing')

        # A solid shallow roof, rather than the old room ceiling at 2.60 m
        # masquerading as a projecting cap. Its underside meets the 2.30 m head.
        outer=line_offsets(frame,-.175)
        outer[0]+=dirs[0]*-.075;outer[-1]+=dirs[-1]*.075
        # Terminate against the OUTSIDE brick face. Extending to the inside
        # face made duplicate rear/underside faces with the wall and a black
        # band in literal interior renders. These closed solids now meet only
        # along their boundary, with no overlapping exposed finish planes.
        rear_y=-.115
        roof_xy=[tuple(p) for p in outer]+[(outer[-1].x,rear_y),(outer[0].x,rear_y)]
        yfront=min(p[1] for p in roof_xy);yrange=rear_y-yfront
        n=len(roof_xy)
        verts=[(x,y,head)for x,y in roof_xy]+[(x,y,head+.075+.080*(y-yfront)/yrange)for x,y in roof_xy]
        faces=[tuple(reversed(range(n))),tuple(range(n,n*2))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
        roof=mark(clean(mesh(PREFIX+label+' shallow cap roof',verts,faces,['White joinery','Slate roof'],'30 Roof',[0,1]+[0]*n)),label+' bay cap roof')
        roof['head_contact_z_m']=head
        # Fine rolled lead drip/front fascia remain white and do not add brick.
        strip(label+' fascia lower moulding',frame,-.176,-.147,head,head+.028,'White joinery','30 Roof',label+' bay cap roof')
        strip(label+' fascia upper moulding',frame,-.185,-.155,head+.064,head+.088,'White joinery','30 Roof',label+' bay cap roof')
        # Normal wall above the bay stays behind the roof at the main facade.
        xmin,xmax=min(p.x for p in original),max(p.x for p in original)
        ob=mark(box(PREFIX+label+' setback wall above bay',((xmin+xmax)/2,0,(head+2.60)/2),(xmax-xmin,.23,2.60-head),'Warm plaster','11 Ground floor - walls'),label+' bay head closure')
        ob.data.materials.append(g['materials']['Red brown brick']);ob.data.polygons[1].material_index=1
        room_name=label+' room';ceiling=bpy.data.objects.get(room_name+' | ceiling')
        if ceiling:bpy.data.objects.remove(ceiling,do_unlink=True)
        room=next(r for r in data['rooms'] if r['name']==room_name)
        ob=clean(prism(room_name+' | ceiling',ceiling_outline(room['polygon_m']),2.598,2.70,'Warm plaster','15 Ceilings'))
        ob['basis']='Main room ceiling ends at the main facade; bay cap provides lower window-recess soffit.'
        if label=='Family':
            profile=[(0,-.12),(.020,-.12)]+[(.09-.07*math.cos(t*math.pi/24),-.12+.10*math.sin(t*math.pi/24))for t in range(1,13)]+[(.10,-.02),(.10,0),(0,0)]
            verts=[(x,.115+off,2.60+dz)for x in (xmin,xmax)for off,dz in profile]
            count=len(profile);faces=[tuple(reversed(range(count))),tuple(range(count,count*2))]+[(i,(i+1)%count,(i+1)%count+count,i+count)for i in range(count)]
            ob=mark(clean(mesh(PREFIX+'Family straight front cove',verts,faces,'White joinery','14 Trim')),'Family bay head closure')
            ob['cornice_wall']='Family front bay setback';ob['cornice_side']=-1
        report.append({'bay':label,'lights':5,'sill_m':sill,'head_m':head,'masonry_posts_above_sill':0,'projecting_masonry_above_head':0,'roof_underside_m':head,'main_wall_plane_y_m':0,'frame_points_m':[list(p)for p in frame],'traced_wall_points_m':[list(p)for p in original]})
    return {'bays':report,'new_mesh_count':len(created),'basis':'Owner clarification plus original listing 00/02, Family panorama 2445661-2 and Drawing panorama 2445667-0; roof/frame profiles remain estimated.'}
