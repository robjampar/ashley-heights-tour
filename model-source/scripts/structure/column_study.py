"""One explicit loft-floor column route; no whole-building stability approval."""
import math
from shapely.geometry import box

SECTION={'name':'150 x 150 x 8 SHS','family':'hot-finished SHS','widthMm':150,'thicknessMm':8,
    'kgPerM':35.1,'areaCm2':44.8,'ImajorCm4':1490,'WelmajorCm3':199,'cOverT':15.8,
    'source':'https://www.steelconstruction.info/images/b/b7/SCI_P363.pdf',
    'basis':'SCI P363 hot-finished Celsius SHS dimensional properties. S355 assumed; current availability and certificates must be checked.'}


def extend_west_pier(elements,rule,add,extrusion):
    """Continue the entrance pier onto a basement-wall buttress, away from the hip."""
    from scripts.structure.junctions import solid,cuboid,triangles,replace_geometry,rebuild_masonry_units
    by={e['id']:e for e in elements};end=rule['westPierEndX'];records=[]
    for ident in ('M-BRICK-6FBC0C0','M-BLOCK-6FBC0C0'):
        e=by[ident];lo,hi=e['bounds'];old_end=hi[0]
        extension=cuboid([old_end,lo[1],lo[2]],[end,hi[1],hi[2]])
        shape=solid(e['triangles'])+extension;replace_geometry(e,shape);rebuild_masonry_units(e,shape)
        e['areaM2']=shape.volume()/(hi[1]-lo[1]);e['cost']['quantity']=e['areaM2']
        e['architecturalCoordination']={'kind':'extend-pier','sourceObject':'Proposal | Entrance bay north return','oldEndX':old_end,'newEndX':end,
            'basis':'Extend the solid entrance return by 340 mm so the loft transfer bears inside the higher roof envelope. Both leaves continue to ground and the new RC basement buttress.'}
        e['issueIds'].append('LP02-COLUMN');records.append(e['id'])
    base=rule['raftTopZ'];west_face=by['M-RC-51B8D91']['bounds'][1][0]
    add('M-LP02-WEST-BUTTRESS','LP02 · basement wall buttress beneath extended entrance pier','rc',
        triangles(cuboid([west_face,-5.4025,base],[end,-4.95,0])),
        '217.5 mm wall return × 452.5 mm wide RC envelope',level=-1,rate='concrete',quantity=.2175*.4525*-base,
        concreteWallCoordination={'baseZ':base,'topZ':0,'capacityVerified':False},
        issueIds=['LP02-COLUMN'],supportedMemberIds=records,supportMemberIds=['M-RC-EEBF948'],capacityVerified=False,
        basis='Continuous vertical geometric route from both upper masonry leaves to the proposed raft. Dowels, reinforcement, local raft bending/punching, thermal/moisture detailing and ground resistance remain unverified.')


def axial_screen(load_kn,effective_length_m):
    """EC3 curve-a elastic-buckling sensitivity, axial action only."""
    area=SECTION['areaCm2']*100;inertia=SECTION['ImajorCm4']*1e4;fy=355;E=210000;alpha=.21
    ncr=math.pi**2*E*inertia/(effective_length_m*1000)**2
    slender=math.sqrt(area*fy/ncr);phi=.5*(1+alpha*(slender-.2)+slender**2)
    chi=min(1,1/(phi+math.sqrt(max(0,phi**2-slender**2))))
    resistance=chi*area*fy/1000
    return {'effectiveLengthM':effective_length_m,'axialULSKN':load_kn,'elasticCriticalKN':ncr/1000,
        'relativeSlenderness':slender,'bucklingCurve':'a','imperfectionFactor':alpha,'reductionFactor':chi,
        'axialBucklingResistanceKN':resistance,'axialUtilisation':load_kn/resistance,
        'withinAxialScreen':load_kn<=resistance,'approvedForConstruction':False}


def add_column(elements,rule,add,extrusion,beam_top):
    by={e['id']:e for e in elements};girder=by[rule['southGirderId']];x,y=rule['mainX'],rule['columnY']
    underside=girder['bounds'][0][2];cap_depth=.02;raft_top=rule['raftTopZ'];base_top=raft_top+.05;cap_bottom=underside-cap_depth
    width=.15;t=.008
    ring=box(x-width/2,y-width/2,x+width/2,y+width/2).difference(box(x-width/2+t,y-width/2+t,x+width/2-t,y+width/2-t))
    column=add(rule['columnId'],'LP02 · concealed stair-side loft-floor column','beams',extrusion(ring,2,base_top,cap_bottom),
        '150 x 150 x 8 mm hot-finished SHS S355 trial',level=0,rate='steel',quantity=(cap_bottom-base_top)*SECTION['kgPerM'],
        basis=rule['basis'],issueIds=['LP02-COLUMN'],material='steel',hollowProfile=SECTION,
        axis=[[x,y,base_top],[x,y,cap_bottom]],sectionSizeM=[width,width],
        supportStatus='Continuous column to a base plate on the basement raft. No intermediate lateral restraint is credited in the full-length axial screen. Floor collars, fire protection, beam joints, base anchors, raft punching/bending and construction sequence require design.')
    column['measurements']['lengthM']=cap_bottom-base_top
    def plate(ident,name,size,z0,z1,supported,support):
        volume=size*size*(z1-z0)
        return add(ident,name,'connections',extrusion(box(x-size/2,y-size/2,x+size/2,y+size/2),2,z0,z1),
            f'{size*1000:g} x {size*1000:g} x {(z1-z0)*1000:g} mm plate envelope',level=3 if z0>4 else -1,
            rate='steel',quantity=volume*7850,material='steel',connectionType='bearing-plate',issueIds=['LP02-COLUMN'],supportedMemberIds=supported,supportMemberIds=[support],
            basis='Connection envelope only. Plate bending, bolts/welds, local steel bearing, tolerances and installation access are not designed. No fabricated bolt pattern is implied.')
    plate('M-LP02-CAP','LP02 · shared girder bearing cap',.33,cap_bottom,underside,[rule['southGirderId'],rule['northGirderId']],column['id'])
    plate('M-LP02-BASE','LP02 · basement column base plate',.40,raft_top+.025,base_top,[column['id']],'M-LP02-GROUT')
    add('M-LP02-GROUT','LP02 · base levelling grout','rc',extrusion(box(x-.2,y-.2,x+.2,y+.2),2,raft_top,raft_top+.025),
        '25 mm grout allowance on the coordinated raft datum',level=-1,material='grout',issueIds=['LP02-COLUMN'],
        supportedMemberIds=['M-LP02-BASE'],supportMemberIds=['M-RC-EEBF948'],capacityVerified=False,
        basis='Raft contact is geometrically explicit. Local raft reinforcement, punching shear, ground reaction and base anchorage require design. No isolated footing capacity is assumed.')
    column['loadRoute']={'study':'LP02','key':'column','endDestinations':['M-LP02-BASE','M-RC-EEBF948'],
        'receivedFrom':[rule['southGirderId'],rule['northGirderId']],'capacityVerified':False}
    return column


def attach_screen(column,review):
    length=column['measurements']['lengthM'];own_g=length*SECTION['kgPerM']*9.81/1000;cases=[]
    for c in review['cases']:
        floor=c['externalReactions']['column'];uls=floor['ulsKN']+1.35*own_g
        cases.append({'scenario':c['scenario'],'floorReaction':floor,'columnSelfWeightKN':own_g,
            'fullLength':axial_screen(uls,length),'hypotheticalStoreyRestraint':axial_screen(uls,2.8),
            'basePlateAveragePressureMPa':uls/(.4*.4)/1000})
    column['columnScreen']={'section':SECTION,'cases':cases,'approvedForConstruction':False,
        'basis':'Floor-only gravity reactions from LP02 plus column self-weight. Full actual height is the primary effective-length assumption; the 2.8 m comparison does not claim floor restraint exists.',
        'limits':'Axial-only hot-finished S355 curve-a sensitivity, gammaM1=1.0. Combined bending, imperfections in the complete frame, sway/stability, eccentric connections, roof/additional-floor loads, fire, splices, base anchors and raft/ground design remain unverified. A passing axial check is not a column or building design.'}
    column['calculationRef']='LP02 · floor-load column axial sensitivity'
