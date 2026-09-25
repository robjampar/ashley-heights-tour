"""Measured gate-aligned envelope; no changes to the original entrance link."""
import math


def layout(navigation):
    spec=navigation['proposal']['specification']
    gate=next(d for d in navigation['interactiveDoors'] if d['id']=='Proposal | Front sliding gate')
    ux,uy=gate['apertureAxis'];length=math.hypot(ux,uy);u=(ux/length,uy/length)
    if u[1]<0:u=(-u[0],-u[1])
    v=(u[1],-u[0])
    x0,y0,x1,y1=spec['frontWing']
    # Keep the complete existing loft stair and its landing at the fixed link.
    join_y=y1-.70
    projection=spec['entranceBay']['projection_m']
    anchor=(x0-projection,join_y)
    def point(along,depth):return [anchor[0]+u[0]*along+v[0]*depth,anchor[1]+u[1]*along+v[1]*depth]
    def rect(a,b,c,d):return [point(a,b),point(c,b),point(c,d),point(a,d)]
    garage_u=(-12.94-join_y)/u[1]
    entrance_u=(-7.3-join_y)/u[1]
    main_v=projection*v[0]
    west_south=x0+u[0]/u[1]*(y0-join_y)
    core=[[west_south,y0],[x1,y0],[x1,join_y],[x0,join_y]]
    garage=rect(garage_u-3.3,0,garage_u+3.3,main_v+.10)
    entrance=rect(entrance_u-2.2,0,entrance_u+2.2,main_v+.10)
    return dict(gate_axis=list(u),inward=list(v),angle_degrees=math.degrees(math.atan2(-u[0],u[1])),
                anchor=list(anchor),join_y=join_y,front_wing=spec['frontWing'],core=core,
                garage_bay=garage,entrance_bay=entrance,main_depth=main_v,
                garage_u=garage_u,entrance_u=entrance_u,
                garage_clear=rect(garage_u-3,.23,garage_u+3,5.53),
                garage_clear_dimensions_m=[6.,5.3],
                roof={'eave':5.35,'maximum_ridge':8.05,'north_join_preserved':True},
                basement_stair_translation_m=[0,1.5,0])


def point(plan,along,depth):
    return [plan['anchor'][i]+plan['gate_axis'][i]*along+plan['inward'][i]*depth for i in range(2)]
