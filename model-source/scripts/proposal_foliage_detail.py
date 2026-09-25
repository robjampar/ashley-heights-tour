"""Adopted proposal-only ornamental cherry foliage detail.

Replaces crown/blossom cloud meshes by deterministic aggregated leaves, petals
and fine twigs INSIDE those current mesh envelopes. Never moves trunks, changes
primary branches, restores clipped foliage, or edits an original scene/object.
Integrated after existing vegetation clearance; ordinary import is inert.
"""
import hashlib, json, math, random
import bpy
from mathutils import Vector
from mathutils.bvhtree import BVHTree


def apply_ornamental_foliage(scene, original_objects, remove_object, collection, report_path=None):
    source_by_name={ob.name:ob for ob in original_objects}
    candidates=[ob for ob in list(scene.objects) if ob.type=='MESH' and not ob.hide_render]
    trunks=sorted([ob for ob in candidates if 'Garden cherry trunk' in ob.name],key=lambda ob:ob.name)
    crowns=[ob for ob in candidates if 'Garden cherry canopy' in ob.name]
    flowers=[ob for ob in candidates if 'Cherry blossom cluster' in ob.name]
    assert (len(trunks),len(crowns)) in ((3,27),(0,0)),(len(trunks),len(crowns))
    report={'status':'adopted','proposalOnly':True,'method':'Deterministic five-vertex folded leaves and fine twigs; source crown/blossom meshes are containment volumes only.',
            'seedAlgorithm':'SHA256 of current source object name; no process hash or global random seed',
            'trees':[],'removedCloudObjects':[],'originalTrunksAndPrimaryBranchesChanged':False,
            'scope':'Three existing ornamental cherry identities only; mature boundary trees and hedges unchanged.',
            'sourceEnvelopeContainment':'Every generated vertex and face centroid lies inside its corresponding current source cloud; twigs and leaves also checked at edge midpoints.',
            'nativeFilesSaved':False}
    materials=[]
    palettes=[('Deep green',(.033,.090,.018,1)),('Mid green',(.067,.151,.032,1)),('Olive new leaf',(.106,.186,.046,1)),('Small cherry petals',(.71,.69,.61,1))]
    for title,color in palettes:
        name='Proposal | Cherry detail '+title
        ma=bpy.data.materials.get(name) or bpy.data.materials.new(name)
        ma.diffuse_color=color;ma.use_nodes=True
        bs=ma.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=color;bs.inputs['Roughness'].default_value=.72
        bs.inputs['Specular IOR Level'].default_value=.24
        materials.append(ma)
    materials.append(bpy.data.materials['Dark walnut'])
    if not trunks and not crowns:   # owner (23 Sep 2026): the three garden cherries were removed from the existing site; the leaf materials above are still used by the boundary foliage
        return {'status':'no ornamental cherries in the model','proposalOnly':True,'aggregateObjectsAdded':0,'netTriangleChange':0,'trees':[]}

    def world_vertices(ob):return[ob.matrix_world@v.co for v in ob.data.vertices]
    def bounds(vv):return[min(p[k]for p in vv)for k in range(3)]+[max(p[k]for p in vv)for k in range(3)]
    def center(ob):
        bb=bounds(world_vertices(ob));return Vector([(bb[k]+bb[k+3])/2 for k in range(3)])
    trunk_xy={ob.name:center(ob) for ob in trunks}
    def nearest_trunk(ob):
        c=center(ob);return min(trunks,key=lambda t:(c.x-trunk_xy[t.name].x)**2+(c.y-trunk_xy[t.name].y)**2).name
    groups={ob.name:[]for ob in trunks}
    for ob in crowns+flowers:groups[nearest_trunk(ob)].append(ob)

    def inside_tester(vv,faces):
        # A point's closest boundary normal classifies these closed, consistently
        # oriented volumes, including non-convex Boolean-clipped source meshes.
        bvh=BVHTree.FromPolygons(vv,faces,all_triangles=False,epsilon=0.0)
        def inside(p):
            q,n,_,distance=bvh.find_nearest(p)
            return q is not None and (p-q).dot(n)<=1e-6
        return inside

    original_triangles=0;new_triangles=0;new_vertices=0
    source_count=sum(len(v)for v in groups.values())
    for tree_index,trunk in enumerate(trunks):
        vertices=[];faces=[];mindices=[];leaf_count=0;twig_count=0;flower_count=0
        source_entry=[]
        for ob in sorted(groups[trunk.name],key=lambda o:o.name):
            vv=world_vertices(ob);ff=[tuple(p.vertices)for p in ob.data.polygons]
            bb=bounds(vv);c=Vector([(bb[k]+bb[k+3])/2 for k in range(3)]);r=Vector([(bb[k+3]-bb[k])/2 for k in range(3)])
            inside=inside_tester(vv,ff)
            seed=int.from_bytes(hashlib.sha256(ob.name.encode()).digest()[:8],'little');rng=random.Random(seed)
            added_start=len(vertices);face_start=len(faces)
            def append_geometry(points,polys,mat,validate=True):
                if validate:
                    if not all(inside(p)for p in points):return False
                    # Face-centre and all edge-midpoint checks prevent crossing a
                    # clipped corner despite endpoints lying in surviving foliage.
                    for face in polys:
                        if not inside(sum((points[i]for i in face),Vector())/len(face)):return False
                        if not all(inside((points[a]+points[b])*.5)for a,b in zip(face,face[1:]+face[:1])):return False
                offset=len(vertices);vertices.extend(points);faces.extend([tuple(offset+i for i in f)for f in polys]);mindices.extend([mat]*len(polys));return True
            def random_point(radial_max=.98):
                # Uniform ellipsoid volume, with small deterministic density
                # fluctuations; leaves are subsequently clipped by the REAL mesh.
                direction=Vector((rng.gauss(0,1),rng.gauss(0,1),rng.gauss(0,1))).normalized();radius=rng.random()**(1/3)*radial_max
                return c+Vector([direction[k]*r[k]*radius for k in range(3)])
            if 'canopy' in ob.name:
                accepted=0;attempts=0
                while accepted<700 and attempts<2800:
                    attempts+=1;p=random_point();length=rng.uniform(.072,.128);width=length*rng.uniform(.37,.55)
                    a=rng.uniform(0,math.tau);slope=rng.uniform(-.72,.60)
                    axis=Vector((math.cos(a),math.sin(a),slope)).normalized();side=axis.cross(Vector((0,0,1))).normalized();normal=axis.cross(side).normalized()
                    # Gentle folded blade with a pointed tip, not a rectangular card.
                    points=[p-axis*length*.5,p-axis*length*.08+side*width*.5,p+axis*length*.5,p-axis*length*.08-side*width*.5,p+normal*length*.075]
                    mat=rng.choices([0,1,2],[.30,.52,.18])[0]
                    if append_geometry(points,[(0,1,4),(1,2,4),(2,3,4),(3,0,4)],mat):accepted+=1
                leaf_count+=accepted
                for ti in range(28):
                    endpoint=random_point(.94);start=c+(endpoint-c)*rng.uniform(.05,.3)
                    direction=(endpoint-start).normalized();perp=direction.cross(Vector((0,0,1)))
                    if perp.length<.01:perp=Vector((1,0,0))
                    perp.normalize();other=direction.cross(perp).normalized();radius=rng.uniform(.0015,.004)
                    points=[]
                    for base,rr in ((start,radius),(endpoint,radius*.33)):
                        points.extend([base+rr*(math.cos(j*math.tau/5)*perp+math.sin(j*math.tau/5)*other)for j in range(5)])
                    polys=[(j,(j+1)%5,(j+1)%5+5,j+5)for j in range(5)]
                    if append_geometry(points,polys,4):twig_count+=1
            else:
                # Tiny five-petal blossoms inherit the old cloud's position and
                # envelope. The old oversized white sphere is never retained.
                accepted=0
                for attempt in range(240):
                    if accepted>=9:break
                    p=random_point(.90);size=rng.uniform(.010,.019)*min(1,min(r)/.025);a=rng.uniform(0,math.tau)
                    normal=Vector((rng.uniform(-.6,.6),rng.uniform(-.6,.6),rng.uniform(.3,1))).normalized()
                    axis=normal.cross(Vector((0,1,0))).normalized();side=normal.cross(axis).normalized()
                    points=[p]
                    for j in range(10):
                        radius=size*(1 if j%2==0 else .50);angle=a+j*math.tau/10
                        points.append(p+axis*math.cos(angle)*radius+side*math.sin(angle)*radius)
                    polys=[(0,j+1,(j+1)%10+1)for j in range(10)]
                    if append_geometry(points,polys,3):accepted+=1
                flower_count+=accepted
            made=vertices[added_start:]
            assert made,(ob.name,'Empty source treatment')
            original_triangles+=sum(len(f)-2 for f in ff)
            source_entry.append({'sourceObject':ob.name,'sourceVertices':len(vv),'sourceBounds':bb,'replacementBounds':bounds(made),
                                 'generatedVertices':len(made),'generatedTriangles':sum(len(f)-2 for f in faces[face_start:]),
                                 'allVerticesFaceCentresAndEdgeMidpointsContained':True})
            remove_object(ob,'Proposal ornamental crown detail: original tree identity/position and current envelope retained')
            report['removedCloudObjects'].append(ob.name)
        mesh=bpy.data.meshes.new('Proposal cherry leaf aggregate %d'%(tree_index+1));mesh.from_pydata(vertices,[],faces);mesh.update()
        obj=bpy.data.objects.new('Proposal | Cherry %d leaves blossoms and fine twigs'%(tree_index+1),mesh);collection.objects.link(obj)
        for ma in materials:mesh.materials.append(ma)
        for p,mat in zip(mesh.polygons,mindices):p.material_index=mat
        obj['source_tree_identity']=trunk.name;obj['source_trunk_base_world_xy']=list(trunk_xy[trunk.name])[:2]
        obj['editing_note']='One aggregate mesh for this retained cherry; source trunk and primary branches remain unchanged.'
        obj['proposal_only_crown_detail']=True
        triangles=sum(len(f)-2 for f in faces);new_triangles+=triangles;new_vertices+=len(vertices)
        report['trees'].append({'trunkObject':trunk.name,'trunkWorldMatrix':[list(row)for row in trunk.matrix_world],
                                'newObject':obj.name,'leaves':leaf_count,'smallBlossoms':flower_count,'fineTwigs':twig_count,
                                'triangles':triangles,'vertices':len(vertices),'materials':len(materials),'sources':source_entry})
    report.update({'removedCloudObjectCount':source_count,'aggregateObjectsAdded':len(trunks),
                   'sourceTrianglesRemoved':original_triangles,'trianglesAdded':new_triangles,
                   'netTriangleChange':new_triangles-original_triangles,'verticesAdded':new_vertices,
                   'maximumUnmergedMaterialDrawGroups':len(trunks)*len(materials)})
    if report_path:report_path.write_text(json.dumps(report,indent=2)+'\n')
    return report


if all(key in globals() for key in ('scene','original_objects','remove_from_proposal','collection','S','OUT','PALETTE','g','materials','changes')):
    _fd_original_names={o.name for o in original_objects}
    def _fd_remove(ob,reason):
        if ob.name in _fd_original_names:
            remove_from_proposal(ob,reason)
        else:
            assert ob.name.startswith('Proposal revision |'),ob.name
            for col in list(ob.users_collection):
                assert col.name.startswith('P'),(ob.name,col.name)
                col.objects.unlink(ob)
            changes.append({'original':ob.get('proposal_original_object',ob.name),'action':'proposal-only crown copy replaced by aggregated leaf detail','reason':reason})
        assert ob.name not in scene.objects,ob.name
    foliage_detail_report=apply_ornamental_foliage(scene,original_objects,_fd_remove,collection(S),OUT/'foliage-detail-review.json')
    for material in bpy.data.materials:
        if material.name.startswith('Proposal | Cherry detail '):
            materials[material.name]=material
            PALETTE[material.name]=list(material.diffuse_color)
    g['proposal_foliage_detail']=foliage_detail_report
    print('PROPOSAL_FOLIAGE_DETAIL',foliage_detail_report['aggregateObjectsAdded'],foliage_detail_report['netTriangleChange'],flush=True)
