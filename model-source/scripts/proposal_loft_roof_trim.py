# Loft walls never rise through the roof (owner, 25 Sep 2026: Original loft front knee wall 2 and the
# loft west store wall poked through the tiles). Every loft partition, knee wall and store wall is cut
# away above the underside of the roof over it: each roof panel becomes a prism from its underside
# upwards. Dormer walls, cheeks, gables and closures are meant to stand above the roof line and are
# left alone. Runs after the roofs and their weathering.
from blender_booleans import BooleanWorkspace
_lt_skip=('dormer','cheek','gable','closure','face ','rooflight','lantern','chimney')
_lt_targets=[o for o in scene.objects if o.type=='MESH' and o.name.startswith(('Proposal | Loft','Proposal | Original loft'))
             and 'wall' in o.name.lower() and not any(k in o.name.lower() for k in _lt_skip)]
_lt_cutters=[]
for _p in roof_panels:
    poly=list(_p['poly'])
    if len(poly)<3:continue
    if _roof_area(poly)<0:poly=list(reversed(poly))
    a,b,c=_p['plane'];t=float(_p.get('thickness',.25))
    lo=[(x,y,a*x+b*y+c-t+.005) for x,y in poly];hi=[(x,y,a*x+b*y+c+5.0) for x,y in poly]
    n=len(poly);me=bpy.data.meshes.new('loft roof trim cutter')
    me.from_pydata(lo+hi,[],[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(k,(k+1)%n,(k+1)%n+n,k+n) for k in range(n)]);me.update()
    ob=bpy.data.objects.new('loft roof trim cutter',me);scene.collection.objects.link(ob);ob.hide_render=True
    xs=[p[0] for p in poly];ys=[p[1] for p in poly];zmin=min(p[2] for p in lo)
    _lt_cutters.append((ob,(min(xs),min(ys),max(xs),max(ys)),zmin))
_lt_trimmed=[]
with BooleanWorkspace(c for c,_,_ in _lt_cutters) as _lt_workspace:
    for ob in _lt_targets:
        ws=[ob.matrix_world@v.co for v in ob.data.vertices]
        if not ws:continue
        bx=(min(p.x for p in ws),min(p.y for p in ws),max(p.x for p in ws),max(p.y for p in ws));top=max(p.z for p in ws)
        hits=[c for c,cb,zmin in _lt_cutters if cb[0]<bx[2] and bx[0]<cb[2] and cb[1]<bx[3] and bx[1]<cb[3] and zmin<top]
        if not hits:continue
        _lt_workspace.difference(ob,hits,'Loft roof trim')
        new_top=max(((ob.matrix_world@v.co).z for v in ob.data.vertices),default=top)
        if new_top<top-.01:_lt_trimmed.append({'object':ob.name,'top_before':round(top,3),'top_after':round(new_top,3)})
for c,_,_ in _lt_cutters:
    me=c.data;bpy.data.objects.remove(c,do_unlink=True)
    if me.users==0:bpy.data.meshes.remove(me)
print('LOFT_ROOF_TRIM',json.dumps({'checked':len(_lt_targets),'trimmed':_lt_trimmed}),flush=True)
