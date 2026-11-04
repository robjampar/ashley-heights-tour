"""SW02: retain the accepted principal suite; align supports below it."""
import json
from pathlib import Path
from shapely.geometry import box
from scripts.structure.simple_stacked_wall_study import ROOT, study, draw

OUT=ROOT/'revisions/simple-structure-retained-suite-2026-10-27'
SPEC='proposal/specs/simple-structure-retained-suite.json'


def retained_suite_study():
    r,m=study(SPEC);s=r['spec'];p=s['concealedPost'];panel=box(*p['finishedEndPanelBounds']);pad=box(*p['baseBearingEnvelope'])
    bed=r['acceptedSuite']['bedroom'];bath=r['acceptedSuite']['ensuite']
    fixed={**bath['fixtures'],'desk':bed['desk']['bounds'],'desk-return':bed['desk']['return_bounds']}
    for name in ('bed','sofa','coffee_table'):
        obj=bed[name];x,y=obj['center'];w,d=obj.get('frame_m',obj.get('size_m'));fixed[name]=[x-w/2,y-d/2,x+w/2,y+d/2]
    x,y=p['centre'];door=s['primaryDoorY'];doorbox=box(x-.1225,door[0],x+.1225,door[1])
    r['suiteCoordination']={
        'layoutSource':'Accepted compact principal bedroom revision 4 and ensuite revision 3, checked against live model furniture positions.',
        'bedroomWardrobeBathroomPolygonsRetained':True,
        'endPanelExtensionM':9.9-p['finishedEndPanelBounds'][0],
        'panelFurnitureIntersections':[name for name,b in fixed.items() if panel.intersection(box(*b)).area>1e-9],
        'sofaSideAisleM':p['finishedEndPanelBounds'][0]-(bed['sofa']['center'][0]+bed['sofa']['size_m'][0]/2),
        'wardrobeDoorSwingEnvelopeClearanceM':-10.725-p['finishedEndPanelBounds'][3],
        'postPadstoneOverDoor':pad.intersection(doorbox).area>1e-9,
        'padstoneToDoorJambPlanClearanceM':pad.bounds[1]-door[1],
        'minimumGirderBottomZ':5.506-.318,
        'girderTopZ':5.506,
        'addedDepthComparedWithPreviousMainGirderMm':0,
        'maximumLoftPostGravityULSKN':max(c['walls']['suite-concealed-post']['ulsKN'] for c in r['floorRoute']['cases']),
        'postBucklingPadstoneMasonryAndFoundationCapacityVerified':False,
        'threeDClashAuditPerformed':False,
    }
    r['limitations'].append('SW02 retains the suite but needs a roughly 565 mm partition-end extension with a concealed one-storey post. The 100 kN gravity reaction is an input for design, not a verified post, baseplate, padstone or masonry capacity.')
    return r,m


if __name__=='__main__':
    OUT.mkdir(exist_ok=True);r,m=retained_suite_study();(OUT/'study.json').write_text(json.dumps(r,indent=2)+'\n');draw(r,m,OUT)
    print(json.dumps({'suite':r['suiteCoordination'],'areaAudit':r['areaAudit'],'routePass':all(c['allWithinIsolatedGravityScreen'] for c in r['floorRoute']['cases'])}))
