"""Targeted source refresh; retains historical full-build provenance untouched."""
import hashlib,json,shutil,sys
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name


def main():
    import bpy
    import numpy as np
    from scripts.interiors.proposal_accepted_bar import integrate_bar
    from scripts.interiors.proposal_prep_kitchen import apply_prep_kitchen
    from scripts.interiors.door_frame_details import refine_door_frames
    from scripts.model.proposal_envelope_repairs import repair_envelope
    from scripts.model.proposal_courtyard_stair_junction import fit_courtyard_stair_junction
    from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
    args=sys.argv[sys.argv.index('--')+1:]
    variant=args[0];assert variant in ('compact','planning')
    out=ROOT/f'outputs/output-proposed-{variant}';native=out/(native_name(variant)+'.blend')
    revision_name=args[1] if len(args)>1 else 'main-model-integration-2026-10-16'
    assert '/' not in revision_name and '..' not in revision_name
    revision=ROOT/'revisions'/revision_name
    for path in [native,native.with_suffix('.blend1'),out/'geometry.json',out/'navigation.json',out/(native_name(variant)+'.glb')]:
        if path.exists():
            target=revision/'original'/path.relative_to(ROOT);target.parent.mkdir(parents=True,exist_ok=True)
            if not target.exists():shutil.copy2(path,target)
    bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
    already_integrated=bool(scene.get('accepted_bar_fitout'))
    def preserved_scenes():
        cache={};result={}
        for other in bpy.data.scenes:
            if other==scene or 'Proposal ·' in other.name:continue
            digest=hashlib.sha256()
            for ob in sorted(other.objects,key=lambda o:o.name):
                if ob.as_pointer() not in cache:
                    d=hashlib.sha256();d.update(ob.name.encode());d.update(str(tuple(tuple(r)for r in ob.matrix_world)).encode())
                    if ob.type=='MESH':
                        a=np.empty(len(ob.data.vertices)*3,dtype=np.float32);ob.data.vertices.foreach_get('co',a);d.update(a.tobytes())
                        d.update(str([m.name for m in ob.data.materials]).encode())
                    cache[ob.as_pointer()]=d.digest()
                digest.update(cache[ob.as_pointer()])
            result[other.name]=digest.hexdigest()
        return result
    before=preserved_scenes()
    # Original comparison scenes share some collections. Give the proposal its
    # own collection links before retiring legacy casing objects; the original
    # scene must keep those objects and their original collection membership.
    retained_collections={c for s in bpy.data.scenes if s!=scene for c in s.collection.children_recursive}
    def isolate_collections(parent):
        for child in list(parent.children):
            if child in retained_collections:
                own=child.copy();parent.children.unlink(child);parent.children.link(own);child=own
            isolate_collections(child)
    isolate_collections(scene.collection)
    nav=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text())
    ns={'ROOT':ROOT,'OUT':out,'scene':scene,'nav':nav,'materials':{},'PALETTE':dict(g['materials']),'new_obstacles':[],'new_segments':[]}
    bar_objects,bar=integrate_bar(ns)
    prep_objects,prep=apply_prep_kitchen(ns)
    spec=json.loads((ROOT/'proposal/specs/design-spec.json').read_text())
    spec.update(json.loads((ROOT/'proposal/specs/design-spec-compact.json').read_text()))
    if variant=='planning':spec.update(json.loads((ROOT/'proposal/specs/design-spec-planning.json').read_text()))
    ns.update(spec=spec,VARIANT=variant)
    junction_objects,junction=fit_courtyard_stair_junction(ns)
    envelope_objects,envelope=repair_envelope(scene,nav,spec)
    frames,frame_details=refine_door_frames(scene,nav)
    # Floor-edit scenes intentionally link the current proposal. Add the new
    # fit-out there and drop objects retired from the main proposal selection.
    from mathutils import Vector
    for title,zmin,zmax in [('12 Proposal · Basements',-3,-.24),('09 Proposal · Ground floor',-.20,2.515),('10 Proposal · First floor',2.605,5.245),('11 Proposal · Loft',5.405,7.70)]:
        view=bpy.data.scenes.get(title)
        if not view:continue
        group=next(iter(view.collection.children))
        for ob in list(group.objects):
            if ob.type=='MESH' and ob.name not in scene.objects:group.objects.unlink(ob)
        for ob in [*bar_objects,*prep_objects,*frames,*junction_objects]:
            if ob.type!='MESH' or 'ceiling' in ob.name.lower() or ob.name in view.objects:continue
            zs=[(ob.matrix_world@Vector(v)).z for v in ob.bound_box]
            if min(zs)<zmax and max(zs)>zmin:group.objects.link(ob)
    for key,pending in [('obstacles',ns['new_obstacles']),('segments',ns['new_segments'])]:
        names={o['name']for o in pending};nav[key]=[o for o in nav[key]if o['name']not in names]+pending
    after=preserved_scenes()
    assert after==before,'A retained original scene changed; aborting before source save: '+str([k for k in before if before[k]!=after[k]])
    print('SCENE_READY',variant,'retired casings',len(frame_details['removedObjects']),flush=True)
    bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get();objects=[]
    previous={o['object_name']:o for o in g['objects']};rebuilt={o.name for o in [*prep_objects,*frames,*envelope_objects,*junction_objects]}
    for ob in scene.objects:
        if ob.type!='MESH':continue
        if already_integrated and ob.name in previous and ob.name not in rebuilt:
            objects.append(previous[ob.name]);continue
        ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
        objects.append({'name':ob.get('source_name',ob.name),'object_name':ob.name,'layer':next((c.name for c in ob.users_collection if c.name.startswith('P')),ob.users_collection[0].name),'assembly':ob.get('assembly'),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),'vertices':[list(ob.matrix_world@v.co)for v in mesh.vertices],'faces':[list(f.vertices)for f in mesh.polygons],'materials':[m.get('appearance_source_material',m.name)for m in ob.data.materials],'face_materials':[f.material_index for f in mesh.polygons],'material_appearance':[m.get('appearance_role')for m in ob.data.materials]})
        ev.to_mesh_clear()
        for mat in ob.data.materials:ns['PALETTE'][mat.get('appearance_source_material',mat.name)]=list(mat.diffuse_color)
    g.update(objects=objects,materials=ns['PALETTE'],rooms=nav['planRooms'])
    if junction.get('applied'):
        nav['proposal']['specification']['loftStairOpeningStartOffsetM']=.44
        g['proposal']['brief']['loftStairOpeningStartOffsetM']=.44
    stamp=datetime.now(timezone.utc).isoformat();nav.update(materials=ns['PALETTE'],modelUpdatedAt=stamp)
    nav['targetedRefresh']={'revision':revision_name,'updatedAt':stamp,'changes':['accepted Parisian Art Deco bar','fixed door surrounds',prep['revision'],envelope['revision'],junction['revision']]}
    scene['owner_targeted_refresh']=json.dumps(nav['targetedRefresh'])
    bpy.context.preferences.filepaths.save_version=0
    bpy.ops.wm.save_as_mainfile(filepath=str(native))
    export_quiet_oak_gltf(filepath=str(out/(native_name(variant)+'.glb')),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
    shutil.copy2(out/(native_name(variant)+'.glb'),ROOT/f'walkthrough/public/proposal-{variant}.glb')
    (out/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
    for path in [out/'navigation.json',ROOT/f'walkthrough/public/proposal-{variant}-navigation.json']:path.write_text(json.dumps(nav,separators=(',',':')))
    report={'variant':variant,'kind':'targeted refresh; historical full-build report, inputs and cache unchanged','updatedAt':stamp,'originalScenesPreserved':before,'barDetails':bar,'frameDetails':frame_details,'prepKitchen':prep,'envelopeRepairs':envelope,'courtyardStairJunction':junction,'nativeSHA256':hashlib.file_digest(native.open('rb'),'sha256').hexdigest(),'meshObjects':len(objects)}
    (out/'owner-model-integration.json').write_text(json.dumps(report,indent=2)+'\n')
    print('OWNER_MODEL_INTEGRATED',variant,'bar',len(bar_objects),'prep',len(prep_objects),'frames',len(frames),'retired casings',len(frame_details['removedObjects']),flush=True)


if __name__=='__main__':main()
