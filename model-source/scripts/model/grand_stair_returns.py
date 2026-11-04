"""Continuous short handrail returns at the split stair's intermediate landing."""
import json,math
REVISION='grand-stair-landing-returns-2026-10-17'


def finish_grand_stair_returns(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    scene,nav=ns['scene'],ns['nav']
    if scene.get('grand_stair_guard_returns'):return [],json.loads(scene['grand_stair_guard_returns'])
    cfg=nav['grandLoftStair'];z=cfg['landingZ'];rise=cfg['riserMetres'];a,s,c,n=cfg['landing'];end=cfg['branchX'][0]-.01
    b=RoomBuilder(ns,'loft stair','Proposal | Grand loft stair | ','P31 Grand loft staircase')
    oak=bpy.data.materials.get('Interior | Landings natural oak') or bpy.data.materials['Proposal | Pale oak']
    def beam(label,start,finish,size):
        start,finish=Vector(start),Vector(finish);delta=finish-start
        ob=b.box(label,(0,0,0),(size,size,delta.length),oak,.002)
        ob.location=(start+finish)/2;ob.rotation_mode='QUATERNION';ob.rotation_quaternion=Vector((0,0,1)).rotation_difference(delta)
    records=[]
    for side,y,dy in [('left',n,.01),('right',s,-.01)]:
        start=[a,y+dy,z];finish=[end,y,z+rise]
        beam('landing '+side+' return handrail',[start[0],start[1],start[2]+1],[finish[0],finish[1],finish[2]+1],.060)
        beam('landing '+side+' return base rail',[start[0],start[1],start[2]+.075],[finish[0],finish[1],finish[2]+.075],.042)
        for i in (1,2):
            t=i/3;p=[start[k]+(finish[k]-start[k])*t for k in range(3)]
            b.box('landing '+side+' return spindle '+str(i),(p[0],p[1],p[2]+.51),(.027,.027,.91),oak,.0015)
        ns.get('new_segments',nav['segments']).append({'name':b.prefix+'landing '+side+' return','a':start[:2],'b':finish[:2],'bottom':z,'top':z+rise+1,'thickness':.035})
        records.append({'side':side,'start':start,'end':finish,'spanMetres':math.dist(start[:2],finish[:2])})
    report={'revision':REVISION,'returns':records,'addedObjects':[o.name for o in b.objects]}
    cfg['landingGuardReturns']=report;scene['grand_loft_stair']=json.dumps(cfg);scene['grand_stair_guard_returns']=json.dumps(report)
    return b.objects,report
