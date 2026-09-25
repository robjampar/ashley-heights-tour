"""P8: convert the north side bedroom to a shared family lounge.

Retain the room envelope and door; fit furniture around its two windows and
the landing approach. All furniture is independently editable in Blender.
"""
z=2.8
sofa('Proposal | Family lounge sofa',-3.30,5.68,2.60,math.pi,z)
new_obstacles[-1]['box']=[-4.63,5.22,-1.97,6.14]

name='Proposal | Family lounge coffee table'
rounded(box(name+' top',(-2.65,6.97,z+.42),(.90,.55,.045),oak,F),.045)
for x in(-2.98,-2.32):
    for y in(6.80,7.14):
        rounded(box(name+' foot',(x,y,z+.20),(.045,.045,.40),black,F),.008)
obstacle(name,[-3.10,6.695,-2.20,7.245],z,z+.45)

# Shallow east-wall storage: two full-height cupboards flank books/games
# shelving and a low shared cabinet. The front faces into the room (west).
name='Proposal | Family lounge storage'
x0,x1,y0,y1=-.715,-.215,6.34,8.54
box(name+' back',(-.227,7.44,z+1.05),(.024,2.20,2.10),oak,F)
for y in(y0+.012,6.96,7.92,y1-.012):
    box(name+' upright',(-.465,y,z+1.05),(.50,.024,2.10),oak,F)
for h in(.055,2.085):
    box(name+' full shelf',(-.465,7.44,z+h),(.50,2.20,.03),oak,F)
for ya,yb in((6.364,6.948),(7.932,8.516)):
    box(name+' cupboard front',(-.708,(ya+yb)/2,z+1.07),(.018,yb-ya-.012,1.98),plaster,F)
    beam(name+' pull',(-.737,yb-.055,z+.95),(-.737,yb-.055,z+1.19),.015,black,F)
for h in(.76,1.18,1.60):
    box(name+' open shelf',(-.465,7.44,z+h),(.48,.948,.028),oak,F)
for ya,yb in((6.978,7.43),(7.45,7.902)):
    box(name+' low door',(-.708,(ya+yb)/2,z+.408),(.018,yb-ya,.655),plaster,F)
    beam(name+' low pull',(-.737,yb-.045,z+.51),(-.737,yb-.045,z+.66),.015,black,F)
book_materials=[oak,cinema_fabric,fabric,plaster]
for i in range(8):
    h=.22+(i%3)*.035
    box(name+' book',(-.53,7.08+i*.062,z+1.195+h/2),(.26,.047,h),book_materials[i%4],F)
for i in range(3):
    box(name+' board game',(-.52,7.49,z+.795+i*.060),(.31,.55,.048),book_materials[(i+1)%4],F)
obstacle(name,[-.747,y0,-.215,y1],z,z+2.10)

# The rear window becomes terrace doors. Move the work table under the west
# window, with its chair facing west and a400mm eastward pullback envelope.
name='Proposal | Family lounge work table'
rounded(box(name+' top',(-4.735,7.30,3.51),(.55,1.60,.04),oak,F),.018)
for x in(-4.925,-4.545):
    for y in(6.61,7.99):
        box(name+' leg',(x,y,z+.345),(.045,.045,.69),black,F)
obstacle(name,[-5.01,6.50,-4.46,8.10],z,3.53)
name='Proposal | Family lounge chair 1'
rounded(box(name+' cushion',(-3.99,7.10,z+.445),(.47,.47,.09),fabric,F),.035)
rounded(box(name+' back',(-3.775,7.10,z+.72),(.065,.47,.47),fabric,F),.03)
for x in(-4.18,-3.80):
    for y in(6.91,7.29):
        box(name+' leg',(x,y,z+.21),(.03,.03,.42),oak,F)
obstacle(name,[-4.245,6.845,-3.725,7.355],z,z+.98)

for view in new_views:
    if view['label']=='Upstairs family lounge':
        view.update(position=[-1.30,6.35,z],direction=[-.70,.70,0])

programme['upstairs_family_lounge']={
    'location':'Garden-facing first-floor room over the former garage',
    'previous_use':'North side-wing bedroom',
    'clear_area_m2':17.54775,'clear_size_m':[4.95,3.545],
    'sofa_width_m':2.60,'storage_length_m':2.20,'storage_depth_m':.50,
    'work_table_m':[1.60,.55],'worktop_to_window_sill_clearance_m':.12,
    'use':'Shared family sitting, reading, homework and books/games storage',
    'rear_window_changed_to_terrace_doors':True,'west_work_table_window_unchanged':True,
}
nav['proposalSharedLounge']={
    **programme['upstairs_family_lounge'],
    'room_name':'Upstairs family lounge','floor_z_m':z,
    'clear_routes_m':{
        'storage':[[-1,5.5,z],[-1.3,6.25,z],[-1.3,8.2,z]],
        'work_table':[[-1.3,6.25,z],[-1.65,6.65,z],[-1.80,7.70,z],[-2.60,7.70,z],[-3.20,7.60,z]],
        'sofa':[[-1.3,6.25,z],[-1.5,6.45,z],[-2.3,6.425,z],[-3.4,6.425,z]],
    },
    'chair_pullback_m':.40,'chair_pullback_axis':'east',
}
(OUT/'shared-lounge-review.json').write_text(json.dumps(nav['proposalSharedLounge'],indent=2))
print('PROPOSAL_SHARED_LOUNGE',json.dumps(programme['upstairs_family_lounge']),flush=True)
