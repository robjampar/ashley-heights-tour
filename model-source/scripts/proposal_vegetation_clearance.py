"""Conceptual canopy clearance in the proposal only; original trees stay intact.

Trim foliage/thin branches against the actual new roof/building envelope plus
100mm. Trunks and substantial branches are never cut. Approximate source tree
geometry cannot establish acceptable pruning, root impacts or tree retention.
"""
from mathutils.geometry import tessellate_polygon as _vc_tessellate

_vc_gap=.10
_vc_report={'proposalOnly':True,'clearanceM':_vc_gap,'trimmed':[],
            'trunkOrSubstantialBranchConflicts':[], 'originalTreesModified':False,
            'basis':'Approximate source tree canopies clipped only against new building/roof volumes; conceptual tree impact, requiring measured tree assessment.',
            'limits':['Does not assess root protection, tree condition, actual branch structure or whether pruning is acceptable.',
                      'Retained trunks and source tree positions are unchanged.']}
_vc_temp=bpy.data.collections.new('Temporary canopy clearance cutters');scene.collection.children.link(_vc_temp)
_vc_cutters=[]

def _vc_bounds(ob):
    vv=[ob.matrix_world@Vector(v)for v in ob.bound_box]
    return[min(v[k]for v in vv)for k in range(3)]+[max(v[k]for v in vv)for k in range(3)]

def _vc_overlap(a,b):return all(a[k]<b[k+3] and b[k]<a[k+3]for k in range(3))

def _vc_offset(poly,amount):
    # Convex polygon miter offset; cap very acute miters at twice the gap.
    if _roof_area(poly)<0:poly=list(reversed(poly))
    lines=[]
    for a,b in zip(poly,poly[1:]+poly[:1]):
        dx=b[0]-a[0];dy=b[1]-a[1];ln=math.hypot(dx,dy)
        if ln<1e-8:continue
        aa=-dy/ln;bb=dx/ln;cc=-aa*a[0]-bb*a[1]+amount
        lines.append((aa,bb,cc,a))
    points=[]
    for previous,current in zip(lines[-1:]+lines[:-1],lines):
        a,b,c,_=previous;d,e,f,p=current;det=a*e-b*d
        if abs(det)<1e-8:continue
        q=[(b*f-c*e)/det,(c*d-a*f)/det]
        distance=math.dist(q,p)
        if distance>2*amount:q=[p[k]+(q[k]-p[k])*2*amount/distance for k in(0,1)]
        points.append(q)
    return _roof_clean(points)

def _vc_cutter(label,poly,plane):
    poly=_vc_offset(poly,_vc_gap)
    if len(poly)<3:return
    n=len(poly);vv=[(x,y,-.25)for x,y in poly]+[(x,y,plane[0]*x+plane[1]*y+plane[2]+_vc_gap)for x,y in poly]
    faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(j,(j+1)%n,(j+1)%n+n,j+n)for j in range(n)]
    me=bpy.data.meshes.new(label);me.from_pydata(vv,[],faces);me.update();ob=bpy.data.objects.new(label,me);_vc_temp.objects.link(ob)
    ob.hide_render=True;_vc_cutters.append((ob,_vc_bounds(ob)))

# Roof domains, not a giant bounding box, keep foliage which is genuinely
# above the pitched roof. Main original roof is outside this alteration scope.
for i,panel in enumerate(roof_panels):
    if panel['kind']=='original':continue
    plane=panel['plane'][:]
    if panel['kind']=='dormer':
        # Include the new tapered finish membrane, not just the old flat skin.
        span=dormer_roof_rect[3]-dormer_roof_rect[1]
        plane=[0,-.045/span,8.021+.045*dormer_roof_rect[3]/span]
    _vc_cutter('Canopy cutter roof %03d'%i,panel['poly'],plane)

for ob in list(scene.objects):
    if ob.type!='MESH' or ob.name not in('Proposal | Rear flat roof','Proposal | Dining link glass canopy','Proposal | Pavilion extended flat roof'):continue
    vv=[ob.matrix_world@v.co for v in ob.data.vertices];z=max(p.z for p in vv)
    for face in ob.data.polygons:
        points=[vv[k]for k in face.vertices]
        if min(p.z for p in points)<z-.001:continue
        for tri in _vc_tessellate([points]):
            coordinates=[points[p]if isinstance(p,int)else p for p in tri]
            _vc_cutter('Canopy cutter '+ob.name,[[p.x,p.y]for p in coordinates],[0,0,z])

def _vc_volume(ob):
    ob.data.calc_loop_triangles();vol=0
    origin=ob.data.vertices[0].co if ob.data.vertices else Vector((0,0,0))
    for t in ob.data.loop_triangles:
        a,b,c=[[float(ob.data.vertices[k].co[j])-float(origin[j])for j in range(3)]for k in t.vertices]
        vol+=(a[0]*(b[1]*c[2]-b[2]*c[1])+a[1]*(b[2]*c[0]-b[0]*c[2])+a[2]*(b[0]*c[1]-b[1]*c[0]))/6
    return abs(vol*ob.matrix_world.to_3x3().determinant())

def _vc_branch_diameter(ob):
    # Source branches are narrow rectangular beams; distinguish their two
    # cross-section edges from the long branch axis using real world lengths.
    vv=[ob.matrix_world@v.co for v in ob.data.vertices]
    if len(vv)!=8:return None
    lengths=sorted((vv[j]-vv[0]).length for j in(1,3,4))
    return lengths[1]

def _vc_kind(ob):
    name=ob.name.lower()
    if 'trunk'in name:return'trunk'
    if 'branch'in name:
        dia=_vc_branch_diameter(ob)
        return'thin branch'if dia is not None and dia<=.12 else'substantial branch'
    mats=' '.join(m.name.lower()for m in ob.data.materials if m)
    if any(s in name for s in('foliage','blossom','tree canopy','tree crown'))or('hedge'in mats and not name.startswith('proposal |')):
        return'foliage'
    return None

_vc_candidates=[]
for ob in list(scene.objects):
    if ob.type!='MESH' or ob.name.startswith(('Canopy cutter','Proposal |')):continue
    kind=_vc_kind(ob)
    if kind is None:continue
    bb=_vc_bounds(ob);cutters=[c for c,cb in _vc_cutters if _vc_overlap(bb,cb)]
    if cutters:_vc_candidates.append((ob,kind,bb,cutters))

_vc_source_original={o.name for o in original_objects}
for ob,kind,bounds,cutters in _vc_candidates:
    print('CANOPY_CLEARANCE_CHECK',ob.name,kind,len(cutters),flush=True)
    original_volume=_vc_volume(ob)
    if original_volume<1e-7:continue
    working=ob.copy();working.data=ob.data.copy();working.name='Temporary canopy clip '+ob.name;working.parent=None;working.matrix_world=ob.matrix_world.copy();_vc_temp.objects.link(working)
    # Difference only the nearby convex roof prisms. Temporary work is thrown
    # away for non-intersections and all trunk/substantial-branch cases.
    for cutter in cutters:
        if not working.data.vertices:break
        bpy.context.view_layer.objects.active=working
        mod=working.modifiers.new('Concept canopy clearance','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
        bpy.ops.object.modifier_apply(modifier=mod.name)
    remaining=_vc_volume(working)if working.data.vertices else 0
    removed=max(0,original_volume-remaining)
    if removed>max(1e-6,original_volume*1e-6):
        entry={'sourceObject':ob.name,'kind':kind,'boundsBefore':bounds,
               'approximateVolumeRemovedM3':round(removed,6),
               'approximateFractionRemoved':round(removed/original_volume,6)}
        if kind=='trunk':
            entry['action']='Unchanged: tree/building conflict requires assessment.'
            _vc_report['trunkOrSubstantialBranchConflicts'].append(entry)
        else:
            # branches too, thin or substantial (owner, 24 Sep 2026: M1's branches went into the house);
            # substantial ones are recorded as pruning for the tree assessment
            if kind=='substantial branch':_vc_report['trunkOrSubstantialBranchConflicts'].append({**entry,'action':'Pruned back to the building in the proposal; requires arboricultural assessment'})
            reason='Conceptual canopy clearance from proposed building; source tree unchanged; measured tree assessment required'
            if ob.name in _vc_source_original:
                if remaining<1e-7 or not working.data.vertices:
                    remove_from_proposal(ob,reason);entry['action']='Overlapping foliage/branch piece omitted in proposal only'
                else:
                    edited=revised_copy(ob,reason);old_mesh=edited.data;edited.data=working.data.copy()
                    if old_mesh.users==0:bpy.data.meshes.remove(old_mesh)
                    edited['proposal_tree_impact']='Conceptual canopy trimming; assess real tree before design commitment'
                    edited['proposal_original_object']=ob.name;entry['proposalObject']=edited.name;entry['boundsAfter']=_vc_bounds(edited);entry['action']='Proposal copy clipped only against building and100mm clearance'
            elif ob.name.startswith('Proposal revision |'):
                # A tree previously relocated for the pool is already a unique
                # proposal copy. Its baseline object and source mesh stay intact.
                old_mesh=ob.data;ob.data=working.data.copy()
                if old_mesh.users==0:bpy.data.meshes.remove(old_mesh)
                ob['proposal_tree_impact']='Conceptual canopy trimming; assess real tree before design commitment'
                entry['proposalObject']=ob.name;entry['boundsAfter']=_vc_bounds(ob);entry['action']='Existing proposal-only copy clipped'
            _vc_report['trimmed'].append(entry)
    work_mesh=working.data;bpy.data.objects.remove(working,do_unlink=True)
    if work_mesh.users==0:bpy.data.meshes.remove(work_mesh)

for ob,_ in _vc_cutters:
    me=ob.data;bpy.data.objects.remove(ob,do_unlink=True)
    if me.users==0:bpy.data.meshes.remove(me)
bpy.data.collections.remove(_vc_temp)
_vc_report['candidateCount']=len(_vc_candidates)
_vc_report['roofVolumeCount']=len(_vc_cutters)
(OUT/'vegetation-clearance-review.json').write_text(json.dumps(_vc_report,indent=2))
g['proposal_vegetation_clearance']=_vc_report
print('PROPOSAL_VEGETATION_CLEARANCE',len(_vc_report['trimmed']),len(_vc_report['trunkOrSubstantialBranchConflicts']),flush=True)
