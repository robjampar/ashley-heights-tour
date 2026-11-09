"""Transparent one-way strip sensitivities, not a completed RC deck design."""
import math
from scripts.structure.beam_analysis import gravity_span


def strip_sensitivities(cfg):
    from scripts.structure.garage_vehicle_brief import apply_vehicle_brief
    cfg=apply_vehicle_brief(cfg)
    g=cfg['geometry'];loads=cfg['loads'];centre=g['cinemaEastWallX']
    # Centreline spans are conservative against min(clear + effective depth,
    # support centres), without claiming the actual support fixity is known.
    supports={'west':(5.10625,centre),'east':(centre,13.80375)}
    rows=[]
    for i,label in enumerate(('lower','reference','upper')):
      for thickness in loads['slabThicknessM']:
       for bay,(start,end) in supports.items():
        L=end-start;wall_x=g.get('garagePartitionX',11.315)
        wall=wall_x-start if bay=='east' and start+1e-6<wall_x<end-1e-6 else None
        gk=loads['normalConcreteKNm3']*thickness+loads['superimposedPermanentKPa'][i]
        line=loads['garagePartitionLineKNm'][i]if wall is not None else 0
        for width in (.5,1.,1.5):
         for action in ('distributed','wheel-or-jack'):
          udls=[(0,L,1.35*gk*width)];points=[(wall,1.35*line*width)]if wall is not None else[]
          if action=='distributed':udls.append((0,L,1.5*loads['vehicleUDLKPa'][i]*width))
          else:points.append((L/2,1.5*loads['singleWheelOrJackKN'][i]))
          response=gravity_span(L,udls,points)
          # First-generation EC2 rectangular block: C30/37 and B500 assumed.
          # Forty millimetres cover and a 16 mm bar only define trial depth.
          d=thickness*1000-40-8;fcd=.85*30/1.5;fyd=500/1.15;b=width*1000
          M=response['momentKNm']*1e6;disc=d*d-2*M/(b*fcd)
          x=(d-math.sqrt(disc))/.8 if disc>=0 else None
          area=b*.8*x*fcd/fyd if x is not None else None
          rows.append({'case':label,'bay':bay,'spanM':L,'supportCoordinatesX':[start,end],
           'thicknessMm':thickness*1000,'stripWidthM':width,'loadAction':action,'gkKPa':gk,
           'vehicleUDLKPa':loads['vehicleUDLKPa'][i]if action=='distributed'else None,
           'singleWheelOrJackKN':loads['singleWheelOrJackKN'][i]if action!='distributed'else None,
           'partitionLineKNm':line,'ulsMomentKNmPerM':M/1e6/width,
           'reactionsKNPerM':[v/width for v in response['reactionsKN']],
           'effectiveDepthAssumptionMm':d,'requiredFlexuralAsMm2PerM':area/width if area is not None else None,
           'neutralAxisRatio':x/d if x is not None else None,
           'withinDuctilityAssumption':x is not None and x/d<=.45,
           'equilibriumResidualKN':response['equilibriumResidualKN']})
    return {'status':'Flexural equilibrium sensitivity only; reinforcement is NOT selected', 'vehicleBrief':cfg['vehicleBrief'],
      'supportSpanBasis':'Wall-centre to wall-centre simply supported strips. No continuity/fixity credit. A local wheel/jack is placed at midspan; vehicle axle pattern and transverse load distribution remain unresolved.',
      'materialAssumptions':{'concrete':'C30/37','reinforcement':'B500','alphaCc':.85,'gammaC':1.5,'gammaS':1.15,'coverMm':40,'trialBarDiameterMm':16},
      'cases':rows,'approvedForConstruction':False,
      'limits':'No verified effective strip width, wheel/axle/jack positions, simultaneous actions, punching/one-way shear, cracking, long-term deflection, reinforcement continuity, anchorage, fire/exposure cover, bearing or construction-stage design. Required As is not an order or fixing schedule.',
      'flexureSource':'https://www.concretecentre.com/TCC/media/TCCMediaLibrary/Events/Online%20course/CCIP_Worked_Examples_EC2.pdf#page=185'}
