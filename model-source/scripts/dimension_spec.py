"""Coordinates constrained by the 34 printed metric dimensions on the plan.

Coordinates are wall centre lines, in metres. The labelled dimensions are clear
room spans between the finished wall planes, across the arrowed part of each room.
Undimensioned wall thicknesses are assumptions, not measurements.
"""
X = {
    0: [(65,-5.18),(182,-2.74),(303,0),(501,4.32),(534,5.05),
        (579,5.92),(707,8.88),(936,13.98)],
    1: [(990,0),(1166,3.78),(1187,4.28),(1222,5.04),(1223,5.061),
        (1266,5.90),(1317,7.12),(1346,7.74),(1347,7.82),
        (1385,8.95),(1391,9.08),(1436,10.03),(1618,13.98)],
}
Y = {
    0: [(103,10.48),(149,9.49),(181,8.82),(314,5.94),(347,5.10),
        (400,3.995),(438,3.10),(461,2.59),(579,0),(592,-.24),(598,-.33)],
    1: [(88,10.625),(130,9.71),(168,8.82),(214,7.89),(297,6.10),
        (317,5.68),(329,5.44),(367,4.53),(395,3.835),(427,3.19),
        (438,3.10),(439,3.078),(441,3.035),(481,2.19),(534,.97),(579,0)],
}
THICKNESS = {
    'Garage kitchen partition':.23,
    'Kitchen dining partition':.27,
    'Dining drawing partition':.27,
    'Drawing hall partition':.27,
    'Kitchen family partition':.16,
    'Principal bedroom 2':.16,
}

def interpolate(v,knots):
    for i in range(len(knots)-1):
        if v<=knots[i+1][0]:break
    a,b=knots[i],knots[i+1]
    return a[1]+(v-a[0])/(b[0]-a[0])*(b[1]-a[1])

def point(x,y,floor=0):
    return interpolate(x,X[floor]),interpolate(y,Y[floor])

# Each check names two actual mesh groups and the interior face to measure.
# axis 0 = x width; axis 1 = y depth. Positive-side wall uses its minimum face.
CHECKS=[]
def check(room,axis,target,negative,positive,note=''):
    CHECKS.append(dict(room=room,axis=axis,target_m=target,
        negative_wall=negative,positive_wall=positive,note=note))
check('Garage',0,4.95,'Garage west','Garage family partition')
check('Garage',1,5.76,'Garage front','Utility south','Main rectangle below utility; excludes rear side extension')
check('Utility',0,2.56,'Garage utility partition','Garage kitchen partition')
check('Utility',1,2.70,'Utility south','Utility rear')
check('Kitchen breakfast room',0,4.80,'Garage kitchen partition','Kitchen dining partition','Across wider northern section')
check('Kitchen breakfast room',1,4.63,'Kitchen family partition','Kitchen rear')
check('Dining room',0,3.56,'Kitchen dining partition','Dining drawing partition')
check('Dining room',1,5.20,'Dining hall doors','Dining rear French doors','Reference wall planes extended across door openings')
check('Drawing room',0,4.85,'Drawing hall partition','Drawing east')
check('Drawing room',1,8.92,'Drawing bay 2','Drawing rear','Includes front bay; rear wall plane extended across glazing')
check('Family room',0,4.14,'Garage family partition','Family cloakroom partition')
check('Family room',1,4.13,'Family bay 2','Kitchen family partition','Includes front bay')
check('Cloakroom',0,1.47,'Family cloakroom partition','Cloakroom east')
check('Cloakroom',1,2.41,'House front centre','Cloakroom hall door')
check('Bedroom 3',0,4.86,'First west','Bathroom bedroom 3')
check('Bedroom 3',1,2.96,'Bedroom 3 to 5','Bedroom 3 rear','Main rectangle; excludes entrance recess')
check('Bedroom 5',0,3.60,'First west','Bedroom 5 hall')
check('Bedroom 5',1,2.36,'Bedroom 5 to 4','Bedroom 3 to 5')
check('Bedroom 4',0,4.10,'First west','Bedroom 4 en suite divider')
check('Bedroom 4',1,3.01,'First front','Bedroom 5 to 4')
check('Bedroom 4 en suite',0,1.49,'Bedroom 4 en suite divider','Bedroom 4 en suite hall')
check('Bedroom 4 en suite',1,2.01,'First front','Bedroom 4 en suite jog','Main rectangle; excludes shower recess')
check('Bathroom',0,2.57,'Bathroom bedroom 3','Bathroom east','Across wider southern section')
check('Bathroom',1,3.18,'Bathroom hall','Bathroom balcony')
check('Principal bedroom',0,4.72,'Principal en suite east','First east')
check('Principal bedroom',1,4.79,'Principal bedroom 2','Principal rear')
check('Bedroom 2',0,4.85,'Bedroom 2 stair partition','First east')
check('Bedroom 2',1,3.64,'First front','Principal bedroom 2')
check('Balcony',0,3.81,'Balcony brick pier left','Balcony brick pier right','Clear distance between piers; no overall building width is labelled')
check('Balcony',1,2.60,'Bathroom balcony','Balcony rear top rail','Rear wall outside face to inside face of front rail')
check('Outside WC',0,1.57,'Outside WC west wall','Outside WC east wall')
check('Outside WC',1,1.80,'Outside WC front pier','Outside WC rear wall')
check('Summer house',0,3.78,'Summer house west wall','Summer house east wall')
check('Summer house',1,1.76,'Summer house front pier','Summer house rear wall')

# The source outbuilding plan is a detached inset. Actual garden orientation is
# rotated -90 degrees. Keep printed dimension order independent of world axes.
for c in CHECKS:
    c['display_axis']=c['axis']
    if c['room'] in ('Outside WC','Summer house'):
        c['axis']=1-c['axis']
        if c['display_axis']==0:
            c['negative_wall'],c['positive_wall']=c['positive_wall'],c['negative_wall']
