"""P6 shared bathroom fittings in the reused west side-wing hall.

Execute after proposal_lifestyle.py and before editability/export. Architecture
and room polygons are in proposal_side_wing.py. All objects are proposal-only.
The shower opens east, the WC faces east, and the basin occupies the south wall;
the inward-opening bathroom door stays clear of every fixture through its swing.
"""
_bath_z=2.8
_bath_tile=mat('Side bathroom pale porcelain',(.60,.63,.59,1),.48)
_bath_privacy=mat('Side bathroom opal glass',(.68,.75,.71,.90),.68)
_privacy_shader=materials[_bath_privacy].node_tree.nodes.get('Principled BSDF')
_privacy_shader.inputs['Transmission Weight'].default_value=.20
_privacy_shader.inputs['Roughness'].default_value=.68
_privacy_windows=[]
for ob in scene.objects:
 if ob.type=='MESH' and ob.get('source_name',ob.name)=='Proposal | Side bedrooms west window 1 glass':
  for index in range(len(ob.data.materials)):ob.data.materials[index]=materials[_bath_privacy]
  ob['editing_note']='Obscure bathroom glazing in the existing proposed middle west-window aperture.'
  _privacy_windows.append(ob.name)
assert len(_privacy_windows)==1,('Missing side bathroom privacy pane',_privacy_windows)

# A thin finish uses the existing first-floor deck; no separate overlapping
# room or navigation floor is introduced.
slab('Proposal | Side bathroom porcelain floor',[-5.065,3.10,-2.59,5.04],2.812,.014,_bath_tile,SW,False)

# North-west shower: south fixed screen and a short north return leave an
# 800mm east-facing entry. The tray is walkable; only glass blocks movement.
_tray=rounded(box('Proposal | Side bathroom shower tray',(-4.54,4.52,_bath_z+.039),(.99,1.0,.074),plaster,F),.018)
glazing('Proposal | Side bathroom shower south screen',[-5.035,4.01],[-4.015,4.01],_bath_z+.075,_bath_z+2.13,F,1)
glazing('Proposal | Side bathroom shower east return',[-4.015,4.87],[-4.015,5.02],_bath_z+.075,_bath_z+2.13,F,1)
box('Proposal | Side bathroom shower mixer',(-4.53,5.019,_bath_z+1.05),(.29,.038,.10),black,F)
beam('Proposal | Side bathroom shower riser',(-4.53,5.012,_bath_z+1.02),(-4.53,5.012,_bath_z+2.02),.026,black,F)
beam('Proposal | Side bathroom shower arm',(-4.53,5.012,_bath_z+2.02),(-4.53,4.63,_bath_z+2.02),.026,black,F)
cylinder('Proposal | Side bathroom rain head',(-4.53,4.63,_bath_z+2.0),.105,.035,black,F,24)
box('Proposal | Side bathroom shower drain',(-4.90,4.52,_bath_z+.079),(.035,.70,.007),black,F)

# West cistern and east-facing pan keep the approach in the central dry zone,
# instead of putting the user's knees against the shower's south screen.
rounded(box('Proposal | Side bathroom WC cistern',(-4.94,3.50,_bath_z+.67),(.19,.46,.68),plaster,F),.025)
cylinder('Proposal | Side bathroom WC pedestal',(-4.64,3.50,_bath_z+.23),.26,.46,plaster,F,32,scale=(1.25,.78))
cylinder('Proposal | Side bathroom WC seat',(-4.59,3.50,_bath_z+.475),.27,.055,plaster,F,40,scale=(1.34,.84))
obstacle('Proposal | Side bathroom toilet',[-5.035,3.245,-4.18,3.755],_bath_z,_bath_z+1.04)

# Basin faces north from the south wall; its actual bowl is recessed.
if _swe:
 # Ensuite layout: the basin faces west from the east wall, clear of the door leaf.
 rounded(box('Proposal | Side bathroom vanity',(-2.855,4.30,_bath_z+.46),(.43,.60,.74),oak,F),.012)
 _basin=rounded(box('Proposal | Side bathroom basin',(-2.87,4.30,_bath_z+.87),(.46,.66,.13),plaster,F),.018)
 cut(_basin,[-3.02,4.075,-2.72,4.525],_bath_z+.84,_bath_z+.98)
 beam('Proposal | Side bathroom basin tap',(-2.664,4.30,_bath_z+.91),(-2.664,4.30,_bath_z+1.08),.027,black,F)
 beam('Proposal | Side bathroom basin spout',(-2.664,4.30,_bath_z+1.08),(-2.80,4.30,_bath_z+1.08),.025,black,F)
 box('Proposal | Side bathroom mirror frame',(-2.622,4.30,_bath_z+1.55),(.035,.76,.89),black,F)
 box('Proposal | Side bathroom mirror',(-2.646,4.30,_bath_z+1.55),(.012,.70,.83),mirror,F)   # over the basin, not across the doorway
else:
 rounded(box('Proposal | Side bathroom vanity',(-3.12,3.355,_bath_z+.46),(.60,.43,.74),oak,F),.012)
 _basin=rounded(box('Proposal | Side bathroom basin',(-3.12,3.37,_bath_z+.87),(.66,.46,.13),plaster,F),.018)
 cut(_basin,[-3.345,3.23,-2.895,3.53],_bath_z+.84,_bath_z+.98)
 beam('Proposal | Side bathroom basin tap',(-3.12,3.164,_bath_z+.91),(-3.12,3.164,_bath_z+1.08),.027,black,F)
 beam('Proposal | Side bathroom basin spout',(-3.12,3.164,_bath_z+1.08),(-3.12,3.30,_bath_z+1.08),.025,black,F)
 box('Proposal | Side bathroom mirror frame',(-3.12,3.122,_bath_z+1.55),(.76,.035,.89),black,F)
 box('Proposal | Side bathroom mirror',(-3.12,3.146,_bath_z+1.55),(.70,.012,.83),mirror,F)
obstacle('Proposal | Side bathroom basin',[-3.07,4.00,-2.64,4.60] if _swe else [-3.45,3.14,-2.79,3.60],_bath_z,_bath_z+1.10)

_lamp_name='Proposal | Side shared bathroom ceiling'
_light_parts=[cylinder(_lamp_name+' frame',(-3.50,4.42,5.115),.17,.035,black,I,24),
 cylinder(_lamp_name+' diffuser',(-3.50,4.42,5.093),.145,.012,warm,I,24)]
_light=bpy.data.lights.new(_lamp_name,'AREA');_light.energy=70;_light.color=(1,.88,.72);_light.shape='DISK';_light.size=.50
_light_ob=bpy.data.objects.new(_lamp_name,_light);collection(I).objects.link(_light_ob);_light_ob.location=(-3.50,4.42,5.06)
for _part in [*_light_parts,_light_ob]:_part['proposal_light_fixture']='Side shared bathroom ceiling'
nav['proposalLights'].append({'name':'Side shared bathroom','position':[-3.50,4.42,4.88],'range':2.6,'intensity':.65})

_shared_bath_report={'revision':spec['revision'],'floor_bounds_m':[-5.065,3.10,-2.59,5.04],
 'fixture_approaches_m':{'shower':[[-3.50,4.43,2.8],[-3.75,4.43,2.8],[-4.26,4.43,2.8]],
 'WC':[[-3.60,4.35,2.8],[-3.65,4.05,2.8],[-3.73,3.77,2.8],[-3.78,3.52,2.8]],
 'basin':[[-3.40,4.35,2.8],[-3.12,3.89,2.8]]},
 'shower_entry_width_m':.80,'privacy_window_objects':_privacy_windows,
 'bathroom_door_opens_inward_from_north_hinge':True,'original_window_aperture_changed':False,
 'source_status':'Prepared; actual saved-native door-sweep and fixture approaches pending coordinated build'}
proposal_side_wing_report['shared_bathroom']['fittings']=_shared_bath_report
spec['sideWing']['sharedBathroom']['fittings']=_shared_bath_report
(OUT/'side-bathroom-review.json').write_text(json.dumps(_shared_bath_report,indent=2)+'\n')
print('PROPOSAL_SIDE_BATHROOM',json.dumps({'clearAreaM2':4.8015,'privacyPaneCount':len(_privacy_windows),'showerEntryM':.80}),flush=True)
