"""Owner-confirmed stair/cupboard corrections and photographed dining recesses.

Call after hall fittings, stair ironwork, and door/trim helpers. All edits are
repeatable. Dimensions not printed on the plan remain estimates.
"""
import ast
import math
from pathlib import Path

import bpy
import bmesh
from mathutils import Vector
from detail_sweep import make_tube

PREFIX = 'Owner interior detail | '


def refine_stair_dining_owner(g):
    data = g.get('g', g)
    walls = data.get('walls', g.get('wall_specs', []))
    box, mesh, prism = [g[k] for k in ('box', 'mesh', 'prism')]
    level = data.get('level_height', g.get('LEVEL', 2.8))
    for ob in list(bpy.data.objects):
        if ob.name.startswith(PREFIX) or ob.name.startswith(('Under-stair cupboard door', 'Under-stair front return', 'Airing cupboard hall |')):
            bpy.data.objects.remove(ob, do_unlink=True)

    def world_edit(ob, fn):
        inv = ob.matrix_world.inverted()
        for v in ob.data.vertices:
            v.co = inv @ Vector(fn(ob.matrix_world @ v.co))
        ob.data.update()

    # The room-facing finish remains x=9.015. The hall/stair face becomes
    # continuous with the upstairs wall, removing the erroneous 140 mm ledge.
    wall = next(w for w in walls if w['name'] == 'Drawing hall partition')
    old_center = wall['a'][0]
    old_half = wall['thickness_m']/2
    new_center, new_half = 8.95, .065
    delta_center = new_center-old_center
    delta_face = (new_center-new_half)-(old_center-old_half)
    if abs(delta_face) > .001:
        for ob in bpy.data.objects:
            if ob.type != 'MESH':
                continue
            n = ob.name
            if n.startswith('Drawing hall partition |'):
                # Native wall, skirting and original casing retain their room face.
                world_edit(ob, lambda p: (p.x+delta_face if p.x<old_center-.02 else p.x, p.y, p.z))
            elif n.startswith('Circulation detail | Cove Drawing hall partition -1'):
                world_edit(ob, lambda p: (p.x+delta_face, p.y, p.z))
            elif n.startswith('Trim comparison | Drawing hall partition'):
                if 'side -1' in n:
                    world_edit(ob, lambda p: (p.x+delta_face, p.y, p.z))
            elif n.startswith('Drawing door photo |'):
                world_edit(ob, lambda p: (p.x+delta_center, p.y, p.z))
        wall['a'][0] = new_center
        wall['b'][0] = new_center
        wall['thickness_m'] = 2*new_half
    # No ground-floor cornice crosses the open stairwell. Its former full
    # length created a false horizontal ledge on the stair wall.
    for ob in list(bpy.data.objects):
        if ob.type == 'MESH' and ob.name.startswith('Circulation detail | Cove Drawing hall partition -1'):
            world_edit(ob, lambda p: (p.x,max(3.56,p.y),p.z))
    box(PREFIX+'Stair wall flush floor-zone infill',(8.95,1.78,2.70),(.13,3.56,.20),'Warm plaster','11 Ground floor - walls')
    wall['owner_flat_stair_face'] = True
    wall['thickness_basis'] = 'Owner confirms flat stair wall; room face retained and hall face aligned to upstairs stair wall.'

    # Wider flight; never alter tread heights, going or the three-winder exit.
    x0, x1 = 7.845, 8.885
    for ob in bpy.data.objects:
        if ob.type != 'MESH':
            continue
        n = ob.name
        if n.startswith(('Stair tread ', 'Stair winder ', 'Stair nosing ')):
            if not ob.get('owner_stair_widened'):
                world_edit(ob, lambda p: (x0+(p.x-7.92)/(8.815-7.92)*(x1-x0), p.y, p.z))
                ob['owner_stair_widened'] = True
            if n.startswith(('Stair tread ', 'Stair winder ')):
                # Replace ground-filled blocks with closed, structurally thick
                # step solids. A continuous sloped soffit closes the underside.
                zz = max((ob.matrix_world@v.co).z for v in ob.data.vertices)
                world_edit(ob, lambda p: (p.x, p.y, max(p.z, zz-.205)))
        elif n == 'Stair plastered side wall':
            # Hall niche restoration can replace its mesh from a saved pre-shift solid.
            delta = (x0-.10)-min((ob.matrix_world@v.co).x for v in ob.data.vertices)
            if abs(delta)>.00001:
                world_edit(ob, lambda p: (p.x+delta,p.y,p.z))
            ob['owner_stair_shifted'] = True
        elif (ob.users_collection and ob.users_collection[0].name == '13 Staircase') or n.startswith('Hall photo fitting | Entrance stair shell niche'):
            if not ob.get('owner_stair_shifted'):
                world_edit(ob, lambda p: (p.x-.075, p.y, p.z))
                ob['owner_stair_shifted'] = True
    # White closed soffit follows the stair pitch, leaving usable cupboard space.
    y0, y1 = 1.01, 3.56
    z0, z1 = 14*level/17-.205, -.035
    vv = [(x,y,z-d) for d in (0,.06) for x,y,z in [(x0,y0,z0),(x1,y0,z0),(x1,y1,z1),(x0,y1,z1)]]
    mesh(PREFIX+'Stair closed sloping soffit', vv,
         [(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)],
         'Warm plaster','13 Staircase')

    box(PREFIX+'Winder white soffit',(8.365,.565,2.205),(1.04,.91,.075),'Warm plaster','13 Staircase')

    # South-facing understair cupboard, visible to the right on entering.
    xa, xb, yy, head = x0-.06, x1, 1.02, 1.98
    door_left, door_right = 7.94, 8.63
    for label,a,b,zlo,zhi in [('west jamb',xa,door_left,0,2.105),
                              ('east jamb',door_right,xb,0,2.105),
                              ('lintel',door_left,door_right,head,2.105)]:
        box(PREFIX+'Understair '+label,((a+b)/2,yy,(zlo+zhi)/2),(b-a,.09,zhi-zlo),'Warm plaster','11 Ground floor - walls')
    cupboard_door('Understair', door_left,door_right,yy-.052,0,head,6, g, PREFIX)
    # Repeated hinged display leaves stay visible in the local walk-through.
    specs = {'stair_width_m':x1-x0, 'stair_bounds_x_m':[x0,x1],
             'stair_hall_side_x_m':x0-.10, 'stair_wall_face_x_m':x1,
             'understair_door':{'front_y_m':yy,'leaf_y_m':yy-.052,'jambs_x_m':[door_left,door_right],'bottom_m':0,'head_m':head},
             'references':['2445657-1','2445658-3','2445659-2','2445669-0']}

    # Airing cupboard is between the bathroom and principal bedroom, distinct
    # from the narrow linen cupboard beside Bedroom 4.
    a,b,y = 7.74,9.08,4.53
    dl,dr=8.02,8.74
    for label,l,r,zlo,zhi in [('west jamb',a,dl,level,level+2.45),
                              ('east jamb',dr,b,level,level+2.45),
                              ('lintel',dl,dr,level+2.1,level+2.45)]:
        box('Airing cupboard hall | '+label,((l+r)/2,y,(zlo+zhi)/2),(r-l,.13,zhi-zlo),'Warm plaster','21 First floor - walls')
    cupboard_door('Airing cupboard',dl,dr,y-.073,level,2.1,6,g,PREFIX,hinge='right')
    if not any(w['name']=='Airing cupboard hall' for w in walls):
        walls.append({'name':'Airing cupboard hall','floor':1,'a':[a,y],'b':[b,y],
                              'thickness_m':.13,'external':False,'openings':[[(dl+dr)/2-a,dr-dl,0,2.1,'door']],
                              'owner_confirmed':True,'excluded_from_plan':True,
                              'basis':'Original 2445669-0 and owner confirmation; aperture size estimated.'})
    specs['airing_cupboard']={'front_y_m':y,'leaf_y_m':y-.073,'jambs_x_m':[dl,dr],'bottom_m':level,'head_m':2.1,'hinge':'right when facing the cupboard from landing','handle':'left','handle_rose_x_m':dl+.085,'basis':'Owner and original 2445669-0'}

    # Keep the existing separate linen cupboard door visible too.
    for ob in bpy.data.objects:
        if ob.name.startswith('Linen cupboard hall') and ob.users_collection and ob.users_collection[0].name.endswith('Doors and windows'):
            ob['walkthrough_keep_visible'] = True

    # Reuse the existing physically closed shell-niche construction, including
    # its true recess Boolean, moulded arch, scallop ribs and projecting sill.
    layer='16 Fittings and furniture'
    env=dict(g, bpy=bpy,bmesh=bmesh,math=math,Vector=Vector,box=box,mesh=mesh,
             prefix=PREFIX,layer=layer,g=g,mats=g['materials'],palette=g['PALETTE'],assembly_counts={})
    tree=ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    body=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='refine').body
    exec(compile(ast.Module(body=[n for n in body if isinstance(n,ast.FunctionDef) and n.name=='sphere'],type_ignores=[]),'<owner-sphere>','exec'),env)
    env['tube']=lambda name,points,r,mat,layer,sides=8,closed=False:make_tube(mesh,name,points,r,mat,layer,sides,closed)
    tree=ast.parse(Path(__file__).with_name('refine_hall_fittings.py').read_text())
    body=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='refine_hall_fittings').body
    exec(compile(ast.Module(body=[n for n in body if isinstance(n,ast.FunctionDef) and n.name in {'closed_surface','niche'}],type_ignores=[]),'<dining-shell-niches>','exec'),env)
    niche=env['niche']; ns=[]
    for label,poly,facea,faceb in [
        ('West dining display',[(5.185,5.165),(6.00,5.165),(5.185,5.98)],(5.185,5.98),(6.00,5.165)),
        ('East dining display',[(7.63,5.165),(8.745,5.165),(8.745,6.28)],(7.63,5.165),(8.745,6.28))]:
        name=PREFIX+label+' chamfered wall'
        prism(name,poly,0,2.60,'Warm plaster','11 Ground floor - walls')
        fa,fb=Vector(facea),Vector(faceb);along=(fb-fa).normalized();normal=Vector((-along.y,along.x));origin=(fa+fb)/2
        ns.append(niche(label,origin,along,normal,name,.72,.86,2.05,.36,.19,'vase'))
        # Two thin clear shelves follow the curved recess back. Glass remains
        # true geometry; the originals show no bulky opaque shelf fronts.
        for z in (1.31,1.77):
            points=[]
            for k in range(25):
                t=-math.pi/2+math.pi*k/24
                p=origin+along*(.344*math.sin(t))-normal*(.172*math.cos(t))
                points.append((p.x,p.y))
            prism(PREFIX+label+' glass shelf',points,z,z+.008,'Glazing',layer)
            edge=[origin-along*.344,origin+along*.344]
            make_tube(mesh,PREFIX+label+' fine glass shelf edge',[(p.x,p.y,z+.004) for p in edge],.003,'Metal',layer,8)
        # Continuous lower skirting and top cove along the corner face.
        for label2,z,h,d in [('skirting',.07,.14,.025),('head cornice',2.55,.10,.07)]:
            p=origin+normal*d/2
            box(PREFIX+label+' '+label2,(p.x,p.y,z),((fb-fa).length,d,h),'White joinery','14 Trim',math.atan2(along.y,along.x))
    specs['dining_recesses']=ns
    specs['uncertainty']='Unprinted cupboard sizes, chamfer extent, recess depth and staircase width are photo/owner estimates; room-facing structural lines and floor levels retained.'
    from refine_stair_trim import refine_stair_trim
    specs['unsupported_trim_review'] = refine_stair_trim(g, (x0, x1))
    return specs


def cupboard_door(label, dl, dr, y, floor, height, panels, g, prefix, hinge='left'):
    """Closed six-panel white leaf with independent editable hinge parent."""
    box,mesh=g['box'],g['mesh'];layer='22 Doors and windows' if floor>1 else '12 Doors and windows'
    width=dr-dl
    parent=bpy.data.objects.new(prefix+label+' door hinge',None)
    g['collection'](layer).objects.link(parent);parent.location=(dr if hinge=='right' else dl,y,floor)
    parent['hinge_side']=hinge
    bpy.context.view_layer.update()
    before=set(bpy.data.objects)
    # All parts share a hinge, with world geometry preserved during parenting.
    box(prefix+label+' door leaf backing',((dl+dr)/2,y,floor+height/2),(width-.014,.035,height-.02),'White joinery',layer)
    for col in range(2):
        x=dl+.055+(width-.11)*(col+.5)/2
        for bottom,top in ((.10,.64),(.75,1.53),(1.65,height-.105)):
            if top<=bottom:continue
            ww=(width-.11)/2-.045
            box(prefix+label+' recessed panel',(x,y-.025,floor+(bottom+top)/2),(ww,.016,top-bottom),'White joinery',layer)
            pts=[(x-ww/2,y-.039,floor+bottom),(x+ww/2,y-.039,floor+bottom),(x+ww/2,y-.039,floor+top),(x-ww/2,y-.039,floor+top)]
            make_tube(mesh,prefix+label+' panel moulding',pts,.007,'White joinery',layer,8,True)
    for x in (dl-.028,dr+.028):box(prefix+label+' fixed casing',(x,y-.013,floor+height/2),(.062,.026,height+.07),'White joinery',layer)
    box(prefix+label+' fixed head casing',((dl+dr)/2,y-.013,floor+height+.028),(width+.12,.026,.066),'White joinery',layer)
    g['cylinder'](prefix+label+' brass handle rose',(dl+.085 if hinge=='right' else dr-.085,y-.045,floor+1.0),.022,.025,'Brass',layer,n=20)
    box(prefix+label+' brass handle',(dl+.12 if hinge=='right' else dr-.12,y-.070,floor+1.0),(.11,.014,.014),'Brass',layer)
    for ob in set(bpy.data.objects)-before:
        ob['walkthrough_keep_visible']=True
        ob['assembly']=prefix+label+' door'
        if 'fixed' not in ob.name:
            ob.parent=parent;ob.matrix_parent_inverse=parent.matrix_world.inverted()
            ob['cupboard_closed_leaf']=True
    return parent
