"""Estimated empty former-boiler side annex, from the user's clarification.

Independent of published-plan floor area. No main-house aperture or room moves.
The external references obscure this east strip; unlabelled dimensions remain estimates.
"""
import math
import bpy,bmesh

PREFIX='Side annex | '


def refine_side_annex(g):
    data=g.get('g',g);box,mesh=g['box'],g['mesh']
    for ob in list(bpy.data.objects):
        if PREFIX in ob.name:bpy.data.objects.remove(ob,do_unlink=True)
    wall_list=data.get('walls',data.get('wall_specs'))
    if wall_list is None:raise RuntimeError('Annex requires editable wall specifications')
    wall_list[:]=[w for w in wall_list if not w['name'].startswith(PREFIX)]
    x0,x1=14.115,15.115;y0,y1=1.0,7.82;t=.115
    eave,high,roof_t=2.32,2.78,.08
    rx0,rx1=x0-.035,x1+.115;ry0,ry1=y0-.12,y1+.12;hip=.55
    base_head=2.18;door_head=2.04;opening=.78
    door_x=(x0+x1-t)/2;door_left,door_right=door_x-opening/2,door_x+opening/2
    layer='11 Ground floor - walls'
    created=[]
    def mark(ob,assembly='Empty side annex shell'):
        ob['assembly']=PREFIX+assembly
        ob['basis']='User-described former boiler side annex; approximate 1 m width and end insets; visually obscured in exterior photos.'
        ob['excluded_from_published_plan_area']=True
        created.append(ob)
        return ob
    def solid(name,vertices,faces,material,tag=layer,face_mats=None):
        ob=mesh(PREFIX+name,vertices,faces,material,tag,face_mats)
        bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free();ob.data.update()
        return mark(ob)
    def cube(name,centre,size,material='Red brown brick',tag=layer,assembly='Empty side annex shell'):
        return mark(box(PREFIX+name,centre,size,material,tag),assembly)
    # Avoid a coplanar overlap with the retained exterior side path at z=0.
    cube('Floor',((x0+x1)/2,(y0+y1)/2,-.054),(x1-x0,y1-y0,.12),'Concrete','10 Ground floor - floors')
    # Three walls use the existing main-house east wall as the fourth side.
    east=cube('East wall body',(x1-t/2,(y0+y1)/2,base_head/2),(t,y1-y0,base_head))
    ends=[]
    for label,yy in [('Front',y0+t/2),('Rear',y1-t/2)]:
        for suffix,xa,xb in [('west jamb',x0,door_left),('east jamb',door_right,x1)]:
            cube(label+' wall '+suffix,((xa+xb)/2,yy,base_head/2),(xb-xa,t,base_head))
        cube(label+' wall lintel',(door_x,yy,(door_head+base_head)/2),(opening,t,base_head-door_head))
        a,b=((x1,yy),(x0,yy)) if label=='Front' else ((x0,yy),(x1,yy))
        along=(x1-door_x) if label=='Front' else (door_x-x0)
        spec={'name':PREFIX+label+' wall','floor':0,'a':list(a),'b':list(b),'thickness_m':t,'external':True,
              'openings':[[along,opening,0,door_head,'door']], 'estimated':True,
              'ancillary_space':'Former boiler side annex','excluded_from_published_plan_area':True,
              'area_scope':'side_annex','height_m':base_head}
        wall_list.append(spec);ends.append(spec)
    wall_list.append({'name':PREFIX+'East wall','floor':0,'a':[x1-t/2,y1],'b':[x1-t/2,y0],
                      'thickness_m':t,'external':True,'openings':[],'estimated':True,
                      'ancillary_space':'Former boiler side annex','excluded_from_published_plan_area':True,
                      'area_scope':'side_annex','height_m':base_head})
    # Three genuine pitched roof planes, closed with an 80 mm underside and
    # vertical boundary faces. The house-side high edge ends short to make hips.
    top=[(rx0,ry0,eave),(rx1,ry0,eave),(rx1,ry1,eave),(rx0,ry1,eave),
         (rx0,ry0+hip,high),(rx0,ry1-hip,high)]
    verts=top+[(x,y,z-roof_t)for x,y,z in top]
    top_faces=[(0,1,4),(1,2,5,4),(2,3,5)]
    faces=top_faces+[tuple(i+6 for i in reversed(f)) for f in top_faces]
    boundary=[0,1,2,3,5,4]
    faces += [(a,b,b+6,a+6)for a,b in zip(boundary,boundary[1:]+boundary[:1])]
    solid('Hipped lean-to roof',verts,faces,['Slate roof','White joinery'],'30 Roof',[0]*3+[1]*9)
    # The wall heads follow the actual lowest of the three roof planes. Clip
    # each wall footprint at hip boundaries before extruding; no bounding-box fills.
    rise=high-eave
    planes=[(-rise/(rx1-rx0),0,eave+rise*rx1/(rx1-rx0)-roof_t),
            (0,rise/hip,eave-rise*ry0/hip-roof_t),
            (0,-rise/hip,eave+rise*ry1/hip-roof_t)]
    def clip(poly,a,b,c):
        result=[]
        for p,q in zip(poly,poly[1:]+poly[:1]):
            dp=a*p[0]+b*p[1]+c;dq=a*q[0]+b*q[1]+c
            pin,qin=dp<=1e-9,dq<=1e-9
            if pin:result.append(p)
            if pin!=qin:
                f=dp/(dp-dq);result.append((p[0]+f*(q[0]-p[0]),p[1]+f*(q[1]-p[1])))
        return result
    for name,rect in [('Front',(x0,y0,x1,y0+t)),('Rear',(x0,y1-t,x1,y1)),('East',(x1-t,y0,x1,y1))]:
        xa,ya,xb,yb=rect
        for i,(a,b,c) in enumerate(planes):
            poly=[(xa,ya),(xb,ya),(xb,yb),(xa,yb)]
            for j,(aa,bb,cc) in enumerate(planes):
                if i!=j:poly=clip(poly,a-aa,b-bb,c-cc)
                if not poly:break
            if len(poly)<3:continue
            area=abs(sum(p[0]*q[1]-q[0]*p[1]for p,q in zip(poly,poly[1:]+poly[:1])))/2
            if area<1e-8:continue
            n=len(poly);v=[(x,y,base_head)for x,y in poly]+[(x,y,a*x+b*y+c+.002)for x,y in poly]
            f=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(j,(j+1)%n,(j+1)%n+n,j+n)for j in range(n)]
            solid(name+' roof-following wall head '+str(i),v,f,'Red brown brick')
    # Plain editable end doors. Leaves open outward along the house side so
    # the narrow interior remains clear; navigation also marks them as movable.
    for label,yy,direction in [('Front',y0+t/2,-1),('Rear',y1-t/2,1)]:
        assembly=label+' door frame'
        for xx in (door_left+.0175,door_right-.0175):
            cube(label+' door frame jamb',(xx,yy,door_head/2),(.035,t+.024,door_head),'White joinery','12 Doors and windows',assembly)
        cube(label+' door frame head',(door_x,yy,door_head-.0175),(opening,t+.024,.035),'White joinery','12 Doors and windows',assembly)
        width=opening-.07;hinge_x=door_left+.035
        leaf=cube(label+' open door leaf',(hinge_x,yy+direction*width/2,(door_head-.025)/2),(.040,width,door_head-.025),'White joinery','12 Doors and windows',label+' door leaf')
        leaf['walkthrough_opening_leaf']=True
        handle=cube(label+' door handle',(hinge_x+.04,yy+direction*(width-.09),1.00),(.045,.085,.025),'Metal','12 Doors and windows',label+' door leaf')
        handle['walkthrough_opening_leaf']=True
    # Closed flashing blocks follow the high abutment and both short hips.
    for name,ya,yb,za,zb in [('front',ry0,ry0+hip,eave,high),('middle',ry0+hip,ry1-hip,high,high),('rear',ry1-hip,ry1,high,eave)]:
        v=[(x,y,z+dz)for x in (x0-.018,x0+.012)for y,z in ((ya,za),(yb,zb))for dz in (0,.11)]
        solid('House abutment flashing '+name,v,[(0,4,6,2),(1,3,7,5),(0,1,5,4),(2,6,7,3),(0,2,3,1),(4,5,7,6)],'Metal','30 Roof')
    interior=[[x0,y0+t],[x1-t,y0+t],[x1-t,y1-t],[x0,y1-t]]
    report={'revision':1,'name':'Former boiler side annex','source':'User clarification: single storey, empty, approximately 1 m wide, inset approximately 1 m at both house ends, doors at both ends, sloped roof with hips.',
            'source_photos_reviewed':['listing 00','listing 20','listing 33','2445683-3','2445688-0'],
            'photo_limit':'Planting obscures the east-side strip; profile and dimensions primarily follow user description.',
            'estimated_external_bounds_m':{'x':[x0,x1],'y':[y0,y1],'z':[-.12,high+.11]},
            'external_projection_m':x1-x0,'front_rear_insets_from_house_centrelines_m':[1,1],
            'external_footprint_area_m2':(x1-x0)*(y1-y0),'clear_interior_polygon_m':interior,
            'clear_internal_area_m2':(x1-t-x0)*(y1-y0-2*t),'clear_internal_width_m':x1-t-x0,
            'clear_internal_length_m':y1-y0-2*t,'published_plan_area_inclusion':False,
            'wall_thickness_m':t,'floor_z_m':.006,'roof_eave_top_m':eave,'roof_high_top_m':high,'roof_thickness_m':roof_t,
            'roof_overhang_m':{'east':.115,'front_rear':.12},'hip_run_m':hip,
            'door_aperture_width_m':opening,'door_frame_clear_width_m':opening-.07,'door_head_m':door_head,
            'wall_spec_names':[w['name']for w in wall_list if w['name'].startswith(PREFIX)],
            'navigation':{'floor_auto_detected':True,'door_leaf_flags':True,'wall_specs_included':True,
                          'suggested_shortcut':{'id':'side-annex','label':'Former boiler side annex','group':'Outside','position':[door_x,4.41,.006],'direction':[0,1]}},
            'empty_interior':True,'object_count':len(created)}
    data['side_annex']=report
    data['ancillary_spaces']=[s for s in data.get('ancillary_spaces',[])if s.get('name')!=report['name']]+[
        {'name':report['name'],'floor':0,'polygon_m':interior,'estimated_area_m2':report['clear_internal_area_m2'],'included_in_published_plan':False}]
    annex_collection=bpy.data.collections[layer]
    for s in bpy.data.scenes:
        if annex_collection.name not in s.collection.children:s.collection.children.link(annex_collection)
        for view_layer in s.view_layers:
            annex_layer=view_layer.layer_collection.children.get(layer)
            reference=next((c for c in view_layer.layer_collection.children if c.name.startswith('11 ')),None)
            if annex_layer and reference:annex_layer.exclude=reference.exclude
    return report
