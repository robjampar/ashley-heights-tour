"""Finish the planning variant after shared architecture, before export.

The builder inherits the current compact specification. Garden additions are
not executed; this module completes the side wing and applies matching finishes.
It never opens or writes the full Proposed output or edits shared source meshes.
"""
# The garden doors: French pairs across the opening set by sideRearDoor (owner, 24 Sep 2026:
# four glazed leaves across the full width of the side extension, no pier either side).
_sr=spec['sideRearDoor'];_W=float(_sr['width_m']);_n=int(_sr.get('leaves',2));_x0,_x1=-2.59-_W/2,-2.59+_W/2
_pairs=max(1,_n//2);_pw=_W/_pairs
_names=[('left','right')] if _pairs==1 else [('left','centre left'),('centre right','right')] if _pairs==2 else [('pair %d left'%(k+1),'pair %d right'%(k+1)) for k in range(_pairs)]
for _k in range(_pairs):
    _pa=_x0+_k*_pw;_pb=_pa+_pw;_mid=(_pa+_pb)/2
    for _label,_a,_b,_delta in ((_names[_k][0],[_pa+.04,8.82],[_mid-.025,8.82],-math.pi/2),(_names[_k][1],[_pb-.04,8.82],[_mid+.025,8.82],math.pi/2)):
        glazing('Proposal | Side living rear '+_label+' glazed leaf',_a,_b,0,float(_sr.get('leaf_height_m',2.20)),SW,1,True)
        proposed_doors[-1].update(openDelta=_delta,openDistance=1.75,closeDistance=2.25,structuralOpening=[_x0,8.705,0,_x1,8.935,float(_sr['height_m'])])
for x in [_x0-.013,_x1+.013]+[_x0+_k*_pw for _k in range(1,_pairs)]:
    box('Proposal | Side living rear fixed jamb',(x,8.82,float(_sr['height_m'])/2),(.034,.07,float(_sr['height_m'])),black,SW)
box('Proposal | Side living rear fixed head',(-2.59,8.82,float(_sr['height_m'])-.017),(_W,.07,.034),black,SW)

# Brick is the same material as the retained house. All replacement meshes
# are independent; never change an original object's shared material slots.
brick_material=materials['Red brown brick']
roof_material=materials['Slate roof'].copy()
roof_material.name='Proposal | Weathered brown-grey roof tiles'
appearance=spec['roofTileAppearance']
roof_material.diffuse_color=tuple(appearance['base_linear_rgb'])+(1,)
roof_shader=roof_material.node_tree.nodes.get('Principled BSDF')
roof_shader.inputs['Base Color'].default_value=roof_material.diffuse_color
for node in roof_material.node_tree.nodes:
    if node.bl_idname=='ShaderNodeTexBrick':
        node.inputs['Color1'].default_value=tuple(appearance['tile_dark_linear_rgb'])+(1,)
        node.inputs['Color2'].default_value=tuple(appearance['tile_light_linear_rgb'])+(1,)
        node.inputs['Mortar'].default_value=tuple(appearance['joint_linear_rgb'])+(1,)
materials[roof_material.name]=roof_material
PALETTE[roof_material.name]=list(roof_material.diffuse_color)
# Match the owner's close-up of the existing tiles. Keep the source house
# material untouched, and use the same finish on the dormer's vertical faces.
hanging_material=roof_material.copy()
hanging_material.name='Proposal | Weathered brown-grey roof tiles - vertical hanging'
materials[hanging_material.name]=hanging_material
PALETTE[hanging_material.name]=PALETTE[roof_material.name]
# Select wall finishes only; glazing, internal plaster, flashings and the flat
# membrane caps retain their purpose-specific materials.
def _dormer_wall(ob):
    return ('dormer' in ob.name.lower() or ob.name.startswith('Proposal | Loft passage east wall cladding'))
roof_finish_objects=[]
dormer_finish_objects=[]
for ob in list(scene.objects):
    if ob.type!='MESH' or not ob.name.startswith('Proposal'):continue
    if ob.name.startswith(('Proposal | Northern oak cladding seam','Proposal | Side wing front oak board')):
        bpy.data.objects.remove(ob,do_unlink=True);continue
    for i,m in enumerate(ob.data.materials):
        if m and m.name==proposal_roof_material:
            ob.data.materials[i]=roof_material
            roof_finish_objects.append(ob.name)
        if m and (m.name==white or (m.name==oak and ob.name.startswith(('Proposal | West north oak band','Proposal | Side wing front oak cladding')))):
            ob.data.materials[i]=hanging_material if _dormer_wall(ob) else brick_material
            if _dormer_wall(ob):dormer_finish_objects.append(ob.name)
        elif m and m.name==black and _dormer_wall(ob) and any(part in ob.name.lower() for part in ('cheek','face pier','face sill','face head','face end pier','dormer sill','window head','dormer south panel','dormer north panel','dormer glazing head','wall cladding')):
            ob.data.materials[i]=hanging_material
            dormer_finish_objects.append(ob.name)
    if ob.name.startswith('Proposal | West north oak band'):
        ob.name='Proposal | West north brick wall';ob['source_name']=ob.name
    if ob.name.startswith('Proposal | Side wing front oak cladding'):
        ob.name='Proposal | Side wing front brick facing';ob['source_name']=ob.name

# Paint room-facing wall surfaces without changing the wall geometry or its
# external brick finish. Original house meshes are copied only when needed.
import bmesh
if _side_front:
    # The original west wall is newly exposed ahead of the recessed side wing.
    # Separate that strip from the internal partition behind the new front wall.
    for ob in list(scene.objects):
        if ob.type!='MESH' or not ob.data.vertices:continue
        if not any(m and m.name in ('Red brown brick','Warm plaster',plaster) for m in ob.data.materials):continue
        points=[ob.matrix_world@v.co for v in ob.data.vertices]
        if min(v.x for v in points)<-.131 or max(v.x for v in points)>.131:continue
        if min(v.y for v in points)>=_side_front+.115 or max(v.y for v in points)<=-.12:continue
        if ob in original_objects:ob=revised_copy(ob,'Exposed original wall at side-wing setback')
        bm=bmesh.new();bm.from_mesh(ob.data)
        for yy in (_side_front-.115,_side_front+.115):
            bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),
                plane_co=ob.matrix_world.inverted()@Vector((0,yy,0)),
                plane_no=ob.matrix_world.to_3x3().transposed()@Vector((0,1,0)),dist=1e-6)
        bm.to_mesh(ob.data);bm.free();ob.data.update()
        index=next((i for i,m in enumerate(ob.data.materials)if m==brick_material),None)
        if index is None:ob.data.materials.append(brick_material);index=len(ob.data.materials)-1
        normals=ob.matrix_world.to_3x3().inverted().transposed()
        for face in ob.data.polygons:
            p=ob.matrix_world@face.center;n=normals@face.normal
            if n.x<-.5 and p.y<_side_front-.115 and -.05<p.z<5.4:face.material_index=index
internal_white=mat('White internal walls',(.84,.84,.82,1),.86)
interior_material=materials[internal_white]
_rooms=[]
for r in nav.get('planRooms',[])+new_rooms:
    # Floor 2 denotes outdoor/garden spaces, even when their base is 0 m.
    if r.get('floor')==2 or r['name'] in ('Outside WC','Tool store','Summer house'):continue
    poly=r.get('polygon_m')
    if not poly:continue
    # Navigation labels can include wall thickness or an entrance recess.
    # Finish volumes follow the enclosed inner faces instead.
    if r['name']=='New double garage':
        gx0,gy0,gx1,gy1=spec['frontWing']
        bay=spec['garageBay'];bx=gx0-bay['projection_m'];th=bay['wall_thickness_m']
        poly=[[bx+th,bay['y'][0]+th],[gx0+.23,bay['y'][0]+th],
              [gx0+.23,gy0+.23],[max(p[0] for p in poly),gy0+.23],
              [max(p[0] for p in poly),bay['y'][1]-th],[bx+th,bay['y'][1]-th]]
    if r['name']=='New entrance gallery':
        bay=spec['entranceBay'];fx=spec['frontWing'][0];bx=fx-bay['projection_m']
        ymin=min(p[1] for p in poly);ymax=max(p[1] for p in poly);xmax=max(p[0] for p in poly)
        sy,ny=bay['y'][0]+bay['wall_thickness_m'],bay['y'][1]-bay['wall_thickness_m']
        poly=[[bx+bay['glass_inset_m'],sy],[fx+.23,sy],[fx+.23,ymin],
              [xmax,ymin],[xmax,ymax],[fx+.23,ymax],[fx+.23,ny],
              [bx+bay['glass_inset_m'],ny]]
    base=float(r.get('base_z',{-1:-2.8,0:0,1:2.8,3:spec['loftFloor']}.get(r.get('floor',0),0)))
    top=2.8 if base<.1 else spec['loftFloor'] if base<3 else 8.05
    if base<0:top=-.20
    _rooms.append((poly,base-.04,top))
# The entrance is a single vaulted volume above its ground-floor room label.
_eb=spec['entranceBay'];_ex=spec['frontWing'][0]-_eb['projection_m']
# The recessed glass divides each pier reveal into exterior brick and interior
# plaster. Split there so one long face cannot carry brick behind the glass.
for side in ('south','north'):
    ob=bpy.data.objects['Proposal | West entrance '+side+' pier']
    bm=bmesh.new();bm.from_mesh(ob.data)
    plane=ob.matrix_world.inverted()@Vector((_ex+_eb['glass_inset_m'],0,0))
    normal=ob.matrix_world.to_3x3().transposed()@Vector((1,0,0))
    bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),
                          plane_co=plane,plane_no=normal,dist=1e-6)
    bm.to_mesh(ob.data);bm.free();ob.data.update()
_rooms.append(([[_ex+_eb['glass_inset_m'],_eb['y'][0]+_eb['wall_thickness_m']],
                [spec['frontWing'][0]+.3,_eb['y'][0]+_eb['wall_thickness_m']],
                [spec['frontWing'][0]+.3,_eb['y'][1]-_eb['wall_thickness_m']],
                [_ex+_eb['glass_inset_m'],_eb['y'][1]-_eb['wall_thickness_m']]],0,6.62))
def _room_contains(point):
    x,y,z=point
    # Eaves stores are bounded by the pitched roof, not a rectangular volume
    # extending through it. Exposed dormer cheeks must retain their tiles.
    if z>5.35:
        roof_z=_roof_height(x,y)
        if roof_z is None or z>roof_z-.06:return False
    for poly,low,high in _rooms:
        if not low<=z<=high:continue
        inside=False
        for a,b in zip(poly,poly[1:]+poly[:1]):
            if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:inside=not inside
        if inside:return True
    return False
# Which side of a wall is inside is decided physically, not from the room list: from just in
# front of a face, rays go up and out across the half-space it faces. In a room (listed or not:
# landings, stairs, cupboards) they all meet the building - walls, glass, ceilings, roofs. Outside,
# some escape to open air, including above a lower roof (the wall above the garage-wing vault,
# which a room outline cannot tell from the vault beneath it). Two escapes make a face external,
# so a hairline gap between meshes never turns an internal wall to brick. (23 Sep 2026, owner:
# the vault wall was white outside and there was brick on many internal walls.)
from mathutils.bvhtree import BVHTree
# Which side of a wall is outside is decided by what it can see (24 Sep 2026, owner: white reveals,
# wall ends and courtyard faces visible from outside, brick closures above the eaves). From points
# spread over each face, rays go out over the whole hemisphere it faces. A ray that reaches the sky,
# the garden, the drive, planting or the outbuildings sees outside; a ray that meets glass or the
# building stops. A face that sees outside (3+ rays) takes the external finish - brick, or the
# roof's hanging tiles above the eaves - and one that does not is plastered. Window and door reveals
# see out through their openings; courtyard walls see its sky and paving; linings and ceilings are
# not walls and keep their finish.
_bv=[];_bp=[];_cat=[]
# site pieces (garden walls, fences, paths) and their proposal copies are outside, never house walls
_planning_memberships=collection_memberships(bpy.data)
_site_names={o.name for o in original_objects if _planning_memberships.get(o.as_pointer()) and _planning_memberships[o.as_pointer()][0].name.startswith(('50','40','41'))}
def _is_site(o):
    n=o.name[len('Proposal revision | '):] if o.name.startswith('Proposal revision | ') else o.name
    return n in _site_names or n.split('.00')[0] in _site_names
def _is_roof(o):
    import re as _re
    n=o.name.lower()
    return ('roof' in n or _re.search(r'\bridge\b',n) is not None) and not any(k in n for k in ('lining','ceiling','soffit','wall','closure','weathering'))
def _category(o):
    cols=[c.name for c in _planning_memberships.get(o.as_pointer(),())];n=o.name.lower()
    # trees and hedges are transparent to this test: a wall behind a canopy is still outside
    if any(k in n for k in ('foliage','tree','hedge','branch','trunk','blossom','crown','leaf','shrub','bush')):return 'veg'
    if _is_site(o):return 'out'
    # furniture and lights (P60, P70) stand in the rooms too: they block, they are not outside
    # by original layer (_is_site) or new garden collection - the 'P00 ... / Garden and site' group also
    # holds the retained house's furniture, so its name is no guide
    if any(c.startswith(('P40','P42','P45','P50','40 ','41 ','50 ')) for c in cols):return 'out'
    if any(k in n for k in ('plot ground','driveway','lawn')):return 'out'
    if any(m and any(k in m.name.lower() for k in ('glass','glazing')) for m in o.data.materials):return 'glass'
    return 'bld'
for _o in scene.objects:
    if _o.type!='MESH' or not _o.data.polygons:continue
    _c=_category(_o)
    if _c=='veg':continue
    if _c=='bld' and _is_roof(_o):_c='roof'
    _mw=_o.matrix_world;_off=len(_bv)
    _bv.extend(_mw@v.co for v in _o.data.vertices)
    for f in _o.data.polygons:
        _bp.append([_off+i for i in f.vertices]);_cat.append(_c if _c!='glass' else ('glass' if any(k in (_o.data.materials[f.material_index].name.lower() if _o.data.materials and _o.data.materials[f.material_index] else '') for k in ('glass','glazing')) else 'bld'))
build_timer.lap('planning.prepare_ray_geometry')
with build_timer.phase('planning.build_bvh'):
    _bvh=BVHTree.FromPolygons(_bv,_bp)
import math as _mm
_HEMI=[]
for _k in range(48):   # Fibonacci directions over a hemisphere about +z, rotated onto each face normal
    _zz=1-(_k+.5)/48;_r=(1-_zz*_zz)**.5;_ph=_k*2.399963
    _HEMI.append(Vector((_r*_mm.cos(_ph),_r*_mm.sin(_ph),_zz)))
_TG=nav.get('terrain')
def _ground(x,y):
    if not _TG:return 0.0
    t=_TG;fx=min(max((x-t['x0'])/t['step'],0),t['nx']-1.001);fy=min(max((y-t['y0'])/t['step'],0),t['ny']-1.001);j,i=int(fx),int(fy);a_,b_=fx-j,fy-i
    z=lambda r,c:t['z'][r*t['nx']+c]
    return z(i,j)*(1-a_)*(1-b_)+z(i,j+1)*a_*(1-b_)+z(i+1,j)*(1-a_)*b_+z(i+1,j+1)*a_*b_
def _sees_outside(q,n):
    if _room_face(q,n):return False
    if q.z<_ground(q.x,q.y)-.27:return False   # buried (below the lawn, which lies 0.12 under the grid level)
    if n.z<-.7 and q.z<_ground(q.x,q.y)+.1:return False   # a wall's underside sits on its foundation
    rot=Vector((0,0,1)).rotation_difference(n)
    o=q+n*.03;seen=0
    for d in _HEMI:
        d_=rot@d
        if d_.z<-.95:continue
        loc,nn,idx,dist=_bvh.ray_cast(o,d_,80)
        # the garden only counts when a ray lands on its top side, not from beneath the lawn
        if idx is None or (_cat[idx] in ('out','roof') and nn.dot(d_)<0 and (_cat[idx]=='out' or nn.z>.2)):   # the top of a roof is outside too
            seen+=1
            if seen>=3:return True   # ~6% of the view: the back of a deep recess, not a gap round a pane
    return False
_EAVES=5.40
# Room veto: a face whose front is inside a listed room with building directly overhead is a room
# face, however much of the outside it glimpses through a door or window gap.
_veto_rooms=[]
for _r in list(nav.get('planRooms',[]))+list(new_rooms):
    if _r.get('floor')==2 or len(_r.get('polygon_m') or [])<3:continue
    _b=float(_r.get('base_z',{-1:-2.8,0:0,1:2.8,3:5.55}.get(_r.get('floor',0),0)))
    _veto_rooms.append((_r['polygon_m'],_b-.05,_b+(2.4 if _r.get('floor')==3 else 6.62 if 'entrance' in _r['name'].lower() else 2.75)))   # the entrance is one vaulted volume
def _room_base(q):
    for poly,lo,hi in _veto_rooms:
        if not lo<q.z<hi:continue
        c=False
        for k in range(len(poly)):
            (x1,y1),(x2,y2)=poly[k],poly[(k+1)%len(poly)]
            if (y1>q.y)!=(y2>q.y) and q.x<(x2-x1)*(q.y-y1)/(y2-y1)+x1:c=not c
        if c:return lo+.05
    return None
def _room_face(q,n):
    # in a room: inside its outline and, straight below, its floor (or something standing on it) -
    # not a lower roof, which is what lies under a wall face above the garage wing roof
    f=q+n*.15;base=_room_base(f)
    if base is None or _room_base(q+n*.6) is None:return False
    hit=_bvh.ray_cast(f,Vector((0,0,-1)),12.0)
    # the room's floor (or something on it) - never the top of a lower roof
    return hit[0] is not None and hit[0].z<=base+1.2 and _cat[hit[2]]!='roof'
interior_finish_report=[];exterior_tile_report=[]
def _slice_grid(ob,step=.5):
    # cut a wall into 0.5 m pieces so each part is finished by its own exposure
    import bmesh as _bm,math as _mt
    me=ob.data;mw=ob.matrix_world;inv=mw.inverted_safe();nrm=inv.to_3x3().transposed().inverted_safe();ws=[mw@v.co for v in me.vertices]
    b=_bm.new();b.from_mesh(me)
    for axis in(0,1,2):
        lo=min(p_[axis] for p_ in ws);hi=max(p_[axis] for p_ in ws);k=_mt.floor(lo/step)+1
        while k*step<hi-1e-4:
            co=Vector((0,0,0));co[axis]=k*step;no=Vector((0,0,0));no[axis]=1
            _bm.ops.bisect_plane(b,geom=b.verts[:]+b.edges[:]+b.faces[:],plane_co=inv@co,plane_no=(nrm@no).normalized());k+=1
    b.to_mesh(me);b.free();me.update()
def _classify(ob,force_internal):
    faces=[];tiles=[];bricks=[];mixed=False
    normal_matrix=ob.matrix_world.to_3x3().inverted().transposed()
    ob.data.calc_loop_triangles();_face_tris={}
    for t in ob.data.loop_triangles:
        vs=[ob.matrix_world@ob.data.vertices[i].co for i in t.vertices];area=((vs[1]-vs[0]).cross(vs[2]-vs[0])).length/2
        m01,m12,m20=(vs[0]+vs[1])/2,(vs[1]+vs[2])/2,(vs[2]+vs[0])/2
        pts=[(vs[0]+vs[1]+vs[2])/3] if area<.3 else [(vs[0]+m01+m20)/3,(vs[1]+m12+m01)/3,(vs[2]+m20+m12)/3,(m01+m12+m20)/3]
        for q in pts:_face_tris.setdefault(t.polygon_index,[]).append((q,area/len(pts)))
    for face in ob.data.polygons:
        material=ob.data.materials[face.material_index]
        if not material or material.name not in ('Red brown brick',plaster,'Warm plaster',hanging_material.name):continue
        p=ob.matrix_world@face.center;n=(normal_matrix@face.normal).normalized()
        if force_internal:faces.append(face.index);continue
        if face.area<.6:
            # wall ends and reveals: half can be buried against the adjoining wall and half show
            # outside (a white corner) - any exposed part makes the face external
            pts=[p]+[(ob.matrix_world@ob.data.vertices[i].co).lerp(p,.15) for i in face.vertices]
            outside=any(_sees_outside(q,n) for q in pts)
        else:
            samples=_face_tris.get(face.index) or [(p,1.0)]
            seen=[_sees_outside(q,n) for q,a_ in samples]
            if any(seen) and not all(seen):mixed=True   # part inside, part outside: slice and look again
            outside=sum(a_ for (q,a_),v in zip(samples,seen) if v)>.5*sum(a_ for q,a_ in samples)
        if not outside:faces.append(face.index)
        elif material.name=='Red brown brick' and abs(n.z)<.7 and p.z>_EAVES and ob.name.startswith('Proposal |') and 'closure' in ob.name.lower():tiles.append(face.index)   # roof-zone closures above the eaves are tile-hung; gables, bands and piers stay brick
        elif material.name!='Red brown brick' and material.name!=hanging_material.name:(tiles if _dormer_wall(ob) else bricks).append(face.index)   # a plastered end, reveal or sill top that shows outside is brick (tile-hung on a dormer)
    return faces,tiles,bricks,mixed
build_timer.lap('planning.prepare_classification')
_sliced=[]
for ob in list(scene.objects):
    if ob.type!='MESH' or not ob.data.polygons:continue
    if not any(m and m.name in ('Red brown brick',plaster,'Warm plaster',hanging_material.name) for m in ob.data.materials):continue
    if any(c.name in ('40 Outbuildings','41 Outbuilding roof') for c in _planning_memberships.get(ob.as_pointer(),())):continue
    if any(k in ob.name.lower() for k in ('lining','ceiling','soffit')) or _is_site(ob):continue   # not house walls
    force_internal=ob.name.startswith(('Proposal | Garage north store separation','Proposal | Garage east separation')) or 'ceiling batten housing' in ob.name
    faces,tiles,bricks,mixed=_classify(ob,force_internal)
    if mixed:
        # a face that is partly inside and partly outside (a wall running past an annex, a porch or a
        # courtyard) is cut into 0.5 m pieces, each finished by its own exposure (owner, 24 Sep 2026)
        if ob in original_objects:ob=revised_copy(ob,'Wall finish by exposure: plaster inside, brick outside')
        if ob.data.users>1:ob.data=ob.data.copy()
        _slice_grid(ob);_sliced.append(ob.name)
        faces,tiles,bricks,mixed=_classify(ob,force_internal)
    if not faces and not tiles and not bricks:continue
    if ob in original_objects:ob=revised_copy(ob,'Wall finish by exposure: plaster inside, brick outside')
    if bricks:
        index=next((i for i,m in enumerate(ob.data.materials) if m==brick_material),None)
        if index is None:ob.data.materials.append(brick_material);index=len(ob.data.materials)-1
        for i in bricks:ob.data.polygons[i].material_index=index
    if faces:
        ob.data.materials.append(interior_material);index=len(ob.data.materials)-1
        for i in faces:ob.data.polygons[i].material_index=index
        interior_finish_report.append({'object':ob.name,'white_faces':len(faces)})
    if tiles:
        index=next((i for i,m in enumerate(ob.data.materials) if m==hanging_material),None)
        if index is None:ob.data.materials.append(hanging_material);index=len(ob.data.materials)-1
        for i in tiles:ob.data.polygons[i].material_index=index
        exterior_tile_report.append({'object':ob.name,'tile_faces':len(tiles)})
build_timer.lap('planning.classify_and_assign')
print('PLANNING_FINISH',json.dumps({'plastered_objects':len(interior_finish_report),'tile_hung_objects':len(exterior_tile_report),'sliced_for_mixed_exposure':len(_sliced)}),flush=True)
(OUT/'interior-wall-finish-check.json').write_text(json.dumps({'finish':'White painted plaster; no exposed internal brick','objects':interior_finish_report},indent=2)+'\n')

# Follow the shared surveyed/concept terrain for the new forecourt and its
# furnishings. The existing garden, outbuildings and terrain remain intact.
_terrain=None   # the ground work (levels, regrade round the buildings, paths) now runs in proposal_garden_levels.py for both designs
if _terrain:
    def _planning_level(x,y):
        t=_terrain;fx=min(max((x-t['x0'])/t['step'],0),t['nx']-1.001);fy=min(max((y-t['y0'])/t['step'],0),t['ny']-1.001)
        j,i=int(fx),int(fy);a,b=fx-j,fy-i
        z=lambda row,col:t['z'][row*t['nx']+col]
        return z(i,j)*(1-a)*(1-b)+z(i,j+1)*a*(1-b)+z(i+1,j)*(1-a)*b+z(i+1,j+1)*a*b
    def _planning_inside(x,y):
        from mathutils.geometry import intersect_point_tri_2d
        from mathutils import Vector
        for r in new_rooms:
            if r.get('floor',0) not in (0,-1):continue
            p=r['polygon_m'];v=Vector((x,y))
            # Winding ray test supports the non-convex courtyard/wing rooms.
            inside=False
            for k in range(len(p)):
                x1,y1=p[k];x2,y2=p[(k+1)%len(p)]
                if (y1>y)!=(y2>y) and x<(x2-x1)*(y-y1)/(y2-y1)+x1:inside=not inside
            if inside:return True
        return False
    for ob in scene.objects:
        if ob.type!='MESH' or not any(c.name.startswith(('P50','P60','P70')) for c in ob.users_collection):continue
        pts=[ob.matrix_world@v.co for v in ob.data.vertices]
        if not pts:continue
        xs=[p.x for p in pts];ys=[p.y for p in pts];zs=[p.z for p in pts];x,y=sum(xs)/len(xs),sum(ys)/len(ys)
        if min(zs)>1.2 or _planning_inside(x,y):continue
        if max(max(xs)-min(xs),max(ys)-min(ys))<3 and max(zs)-min(zs)>.3:
            ob.location.z+=_planning_level(x,y)
        else:
            inv=ob.matrix_world.inverted()
            for v,p in zip(ob.data.vertices,pts):p.z+=_planning_level(p.x,p.y);v.co=inv@p
            ob.data.update()
    for items in (new_surfaces,new_obstacles,new_segments):
        for item in items:
            p=item.get('polygon')
            if not p and item.get('box'):
                a,b,c,d=item['box'];p=[[a,b],[c,d]]
            if not p and 'a' in item:p=[item['a'],item['b']]
            if not p:continue
            x=sum(q[0] for q in p)/len(p);y=sum(q[1] for q in p)/len(p)
            bottom=item.get('z',item.get('bottom',0))
            if bottom>1.2 or _planning_inside(x,y):continue
            if not item['name'].startswith(('Proposal | Parking','Proposal | Compact car','Proposal | Front','Proposal | Arrival','Proposal | Boundary','Proposal | Forecourt','Proposal | Internal garden','Proposal | Open courtyard','Proposal | New arrival')):continue
            dz=_planning_level(x,y)
            for k in ('z','bottom','top'):
                if k in item:item[k]+=dz

# Export only the actual application specification, without narrative from
# the inherited design history or unbuilt garden features.
for key in ('rearGardenRoom','pavilion','pavilionBasis','pool','hotTub','roofTerrace','terraceWalkOnLanterns','gardenWorkshop','gardenWorkshopPlan','variantBasis','refinementBrief','bedroomBrief','roofBrief','structuralChanges','lifestyleProgramme'):
    spec.pop(key,None)
def _current_parameters(value):
    if isinstance(value,dict):
        return {k:_current_parameters(v) for k,v in value.items() if not any(w in k.lower() for w in ('basis','previous','brief','source','note'))}
    if isinstance(value,list):return [_current_parameters(v) for v in value]
    return value
spec=_current_parameters(spec)
spec['structuralChanges']='New front wing and basement; side-wing upper storey and roof; loft conversion and dormers; entrance, window, door and forecourt alterations.'
nav['proposalSideWing']['rear_ground_door']={'width_m':_W,'height_m':float(_sr['height_m']),'leaves':2*_pairs}
nav['proposalSideWing']['rear_upper_window']={'width_m':2.4,'sill_m':.8,'head_m':2.25}
nav['proposalSideWing']['programme']='Ground-floor family living; bedroom, shared lounge and shower room above.'
nav['proposalSideWing']['wine_room_basis']='Basement beneath the new front wing.'
if 'proposalSharedLounge' in nav:
    nav['proposalSharedLounge']['rear_window_changed_to_terrace_doors']=False
for key in list(g):
    if key.startswith('proposal_'):del g[key]
for c in changes:
    c['reason']='Local alteration for the proposed house and forecourt.'
# Export checks protect the omissions against later shared-module changes.
for ob in scene.objects:
    if ob.name.startswith('Proposal | Workshop') and (max((ob.matrix_world@v.co).y for v in ob.data.vertices) if ob.type == 'MESH' else ob.matrix_world.translation.y) < 0:
        ob.name=ob.name.replace('Proposal | Workshop','Proposal | Garage storage');ob['source_name']=ob.name
    assert not ob.name.startswith(('Proposal | Pool','Proposal | Hot tub','Proposal | Pavilion','Proposal | Workshop','Proposal | Garden north glazing','Proposal | Terrace ')),ob.name
nav['planningApplication']={'wall_finish':spec['externalWallFinish'],'internal_wall_finish':spec['internalWallFinish'],'internal_wall_material':internal_white,'roof_finish':spec['roofFinish'],'dormer_finish':spec['dormerFinish']['description'],'roof_material':roof_material.name,'dormer_material':hanging_material.name,'matching_roof_objects':sorted(set(roof_finish_objects)),'tile_hung_dormer_objects':sorted(set(dormer_finish_objects)),'rear_door_width_m':2.4,'rear_door_height_m':2.25,'existing_outbuildings_retained':True}
assert roof_finish_objects and dormer_finish_objects
for ob in scene.objects:
    if ob.type=='MESH' and ob.name.startswith('Proposal') and _dormer_wall(ob):
        assert brick_material not in list(ob.data.materials),ob.name
(OUT/'planning-scope-check.json').write_text(json.dumps(nav['planningApplication'],indent=2)+'\n')
print('PLANNING_SCOPE_COMPLETE',flush=True)
