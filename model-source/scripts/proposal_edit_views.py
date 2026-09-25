"""Linked, roof-free native review scenes for straightforward floor editing.

These are display selections of the real proposal objects, not flattened
copies. Editing a linked object updates the main proposal scene too.
"""
import re
main_proposal_scene=scene
_edit_views=[]
_hidden_for_views=set(nav.get('hiddenObjects',[]))
_candidates=[]
for ob in list(main_proposal_scene.objects):
 if ob.type!='MESH' or not len(ob.data.vertices):continue
 if ob.name in _hidden_for_views or ob.get('source_name','') in _hidden_for_views:continue
 name=ob.name.lower()
 if any(word in name for word in('roof','gutter','fascia','flashing','hip cap','tree','foliage','blossom','hedge','grasses','grass blade','canopy','ceiling')):continue
 # 'bridge' is occupied floor and wall geometry, not a roof ridge.
 if re.search(r'\bridge\b',name):continue
 if 'eaves' in name and not any(word in name for word in('hatch','panel','pull')):continue
 points=[ob.matrix_world@Vector(v)for v in ob.bound_box]
 bounds=[min(v[i]for v in points)for i in range(3)]+[max(v[i]for v in points)for i in range(3)]
 if bounds[3]<-5.7 or bounds[0]>14.7 or bounds[4]<-20.9 or bounds[1]>14.7:continue
 _candidates.append((ob,bounds))

for title,zmin,zmax,focus,scale in[
 ('12 Proposal · Basements',-3.0,-.24,(4.34,-1.63),30.5),
 ('09 Proposal · Ground floor',-.20,2.515,(4.5,-3.15),38.5),
 ('10 Proposal · First floor',2.605,5.245,(6.0,-5.7),33.0),
 ('11 Proposal · Loft',5.405,7.70,(7.9,-6.2),32.0),
]:
 view=bpy.data.scenes.new(title);view.unit_settings.system='METRIC';view.unit_settings.length_unit='METERS'
 view.world=main_proposal_scene.world.copy();view.world.color=(.8,.8,.8)
 group=bpy.data.collections.new('Review selection | '+title);view.collection.children.link(group)
 members=[ob for ob,b in _candidates if b[2]<zmax and b[5]>zmin]
 seen=set()
 for ob in members:
  current=ob
  while current is not None:
   if current.name not in seen:group.objects.link(current);seen.add(current.name)
   current=current.parent
 camera=bpy.data.objects.new(title+' camera',bpy.data.cameras.new(title+' camera'))
 group.objects.link(camera);camera.location=(*focus,45);camera.rotation_euler=(0,0,0);camera.data.type='ORTHO';camera.data.ortho_scale=scale;view.camera=camera
 view.render.engine='BLENDER_WORKBENCH';view.render.resolution_x=1500;view.render.resolution_y=2100;view.render.resolution_percentage=100
 view.display.shading.light='STUDIO';view.display.shading.color_type='MATERIAL';view.display.shading.show_shadows=False;view.display.shading.show_cavity=True;view.display.shading.cavity_type='BOTH';view.display.shading.background_type='WORLD'
 view['editing_note']='Linked real proposal parts. Edit these objects here and the main proposed design updates too. This is a roof-free display view, not a separate design.'
 _edit_views.append({'scene':title,'meshes':len(members),'rangeZ':[zmin,zmax],'linkedToMainProposal':True})
bpy.context.window.scene=main_proposal_scene
(OUT/'native-edit-views.json').write_text(json.dumps(_edit_views,indent=2))
print('PROPOSAL_EDIT_VIEWS',_edit_views,flush=True)
