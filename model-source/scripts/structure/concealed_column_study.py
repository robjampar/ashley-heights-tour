"""LP03: uninstalled wall-line column with an orthogonal loft transfer.

Floor-gravity feasibility only. Wall linings, steel connections, masonry and
raft capacities are not selected or verified by this study.
"""
import hashlib
import json
from pathlib import Path

import numpy as np
from numpy.polynomial import Polynomial as P
from shapely.geometry import box

from scripts.structure.beam_analysis import loaded_steel_screen
from scripts.structure.column_study import SECTION, axial_screen
from scripts.structure.loft_loadpath import CURRENT_MEMBERS, compare_scheme
from scripts.structure.build_study import footprint
from scripts.structure.junctions import cuboid, solid

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'revisions/concealed-column-2026-10-27'
X, Y, EAST, MAIN, TOP = 5.4, -9.67, 13.6775, 8.32, 5.486
STEEL_SOURCE = 'https://www.britishsteel.co.uk/wp-content/uploads/2026/02/british-steel-universal-columns-datasheet-100723.pdf'
FIRE_SOURCE = 'https://www.british-gypsum.com/documents/technical-specification/british-gypsum-ts-d120001-l-en.pdf'


def displacement_segments(member, end_mm=(0., 0.)):
    """Exact SLS bending plus linear support movements, piecewise in metres.

    Applied only to the simply supported members in this statically determinate
    load route. Settlement does not imply any continuity or frame restraint.
    """
    length = member['engineeringSpanM']
    loads = member['loads']
    udls = loads['permanentUDL'] + loads['variableUDL']
    pts = loads['permanentPoints'] + loads['variablePoints']
    left = member['sls']['reactionsKN'][0]
    inertia = member['catalogueSection']['ImajorCm4'] * 1e4
    ei = 210000 * inertia / 1e9
    def numerator(x):
        return (left*x**3/6 - sum(p*max(0., x-a)**3/6 for a,p in pts)
                - sum(q*(max(0., x-a)**4-max(0., x-b)**4)/24 for a,b,q in udls))
    constant = -numerator(length)/length
    stations = sorted({0., length, *[a for a,p in pts], *[v for a,b,q in udls for v in (a,b)]})
    result = []
    for start,end in zip(stations, stations[1:]):
        x = P([0, 1]); mid = (start+end)/2
        expression = left*x**3/6 + constant*x
        for a,p in pts:
            if a < mid: expression -= p*(x-a)**3/6
        for a,b,q in udls:
            if a < mid: expression -= q*(x-a)**4/24
            if b < mid: expression += q*(x-b)**4/24
        expression = -expression/ei*1000 + end_mm[0] + (end_mm[1]-end_mm[0])*x/length
        result.append((start,end,expression))
    return result


def displacement_at(segments, x):
    for start,end,p in segments:
        if start-1e-8 <= x <= end+1e-8: return float(p(x))
    raise ValueError('Station outside beam')


def displacement_peak(segments):
    values = []
    for start,end,p in segments:
        stations = [start,end,*[float(r.real) for r in p.deriv().roots()
                    if abs(r.imag)<1e-8 and start<r.real<end]]
        values.extend((abs(float(p(x))),x) for x in stations)
    value,station = max(values)
    return {'deflectionMm': value, 'stationM': station}


def geometry_audit(model, members, section):
    depth,width,tw,tf = [section[k]/1000 for k in ('depthMm','widthMm','webMm','flangeMm')]
    z0 = TOP-depth
    transfer = (cuboid([X-.075,Y-width/2,TOP-tf],[EAST+.05,Y+width/2,TOP])
                + cuboid([X-.075,Y-width/2,z0],[EAST+.05,Y+width/2,z0+tf])
                + cuboid([X-.075,Y-tw/2,z0+tf],[EAST+.05,Y+tw/2,TOP-tf]))
    column = cuboid([X-.075,Y-.075,-2.95],[X+.075,Y+.075,z0-.02]) - cuboid([X-.067,Y-.067,-2.95],[X+.067,Y+.067,z0-.02])
    results = []
    for label,shape,bounds in [('transfer',transfer,[[X-.075,Y-width/2,z0],[EAST+.05,Y+width/2,TOP]]),
                               ('column',column,[[X-.075,Y-.075,-2.95],[X+.075,Y+.075,z0-.02]])]:
        collisions=[];unmeasured=[]
        for e in [*model['elements'], *members['elements']]:
            lo,hi = e['bounds']; a,b = bounds
            if any(hi[i]<=a[i]+1e-7 or lo[i]>=b[i]-1e-7 for i in range(3)): continue
            try: volume = (shape ^ solid(e['triangles'])).volume()
            except (ValueError,RuntimeError): unmeasured.append({'id':e['id'],'name':e['name']}); continue
            if volume>1e-8: collisions.append({'id':e['id'],'name':e['name'],'category':e['category'],'overlapM3':volume})
        results.append({'part':label,'bounds':bounds,'intersectionsBeforeCoordination':collisions,'unmeasured':unmeasured})
    by={e['id']:e for e in members['elements']}
    raft=footprint(by['M-RC-EEBF948']['triangles'])
    base=box(X-.2,Y-.2,X+.2,Y+.2)
    casing=box(X-.105,Y-.105,X+.105,Y+.105)
    opening_hits=[]
    for e in model['elements']:
        a,b=e['bounds']
        if e['category']=='openings' and b[2]>-2.8 and a[2]<z0-.02:
            area=casing.intersection(footprint(e['triangles'])).area
            if area>1e-8: opening_hits.append({'id':e['id'],'name':e['name'],'planOverlapM2':area})
    return {'parts':results,'baseUncoveredByRaftM2':base.difference(raft).area,
            'casingOpeningIntersections':opening_hits,
            'basePlatePocketIntoRetainingWallMm':max(0,by['M-RC-51B8D91']['bounds'][1][0]-(X-.2))*1000,
            'columnSteelClearOfWestRetainingWallM':X-.075-by['M-RC-51B8D91']['bounds'][1][0],
            'casingClearOfWestRetainingWallM':X-.105-by['M-RC-51B8D91']['bounds'][1][0],
            'roofSolidIntersections':[c for r in results for c in r['intersectionsBeforeCoordination'] if c['category']=='roof'],
            'basis':'Actual closed-solid intersections before redesigning joints, joists, finishes and wall linings. Expected crossings are reported, never treated as completed connections.'}


def study():
    paths={k:ROOT/p for k,p in [('model','walkthrough/public/structure/model.json'),('members','walkthrough/public/structure/members.json')]}
    model=json.loads(paths['model'].read_text());members=json.loads(paths['members'].read_text())
    by={e['id']:e for e in members['elements']}
    catalog=json.loads((ROOT/'proposal/specs/structural-uk-catalog.json').read_text())
    scenarios=json.loads((ROOT/'proposal/specs/structural-trials.json').read_text())['scenarios']
    sections={s['name']:s for s in catalog['steel']+catalog['coordinationSteel']}
    fixed={k:by[v]['steelProfile'] for k,v in CURRENT_MEMBERS.items()}
    options=[]
    for name in ('305x305x198','305x305x240'):
        section=sections[name];cases=[]
        for pattern in ('all-loaded','gallery-south-only','gallery-north-only','gallery-north-isolated'):
            run=compare_scheme(catalog,scenarios,main_x=MAIN,post_y=Y,fixed_sections=fixed,
                               north_west_support=5.4,edge_supported=True,variable_pattern=pattern)
            for case in run['cases']:
                reaction=case['externalReactions']['column']
                cross=loaded_steel_screen(section,EAST-X,permanent_points=[(MAIN-X,reaction['gkKN'])],variable_points=[(MAIN-X,reaction['qkKN'])])
                cross['catalogueSection']=section
                length=TOP-section['depthMm']/1000-.02-(-2.95)
                own=length*SECTION['kgPerM']*9.81/1000
                load=cross['uls']['reactionsKN'][0]+1.35*own
                axial=axial_screen(load,length)
                # Column elastic shortening; no intermediate restraint credited.
                shortening=(cross['sls']['reactionsKN'][0]+own/2)*1000*length*1000/(210000*SECTION['areaCm2']*100)
                cross_line=displacement_segments(cross,(shortening,0.))
                d_cross=displacement_at(cross_line,MAIN-X)
                north=case['members']['north-transfer']
                d_north=displacement_at(displacement_segments(north),MAIN-5.4)
                south_line=displacement_segments(case['members']['main-south'],(0.,d_cross))
                north_line=displacement_segments(case['members']['main-north'],(d_cross,d_north))
                d_header=displacement_at(north_line,-8.63-Y)
                header_line=displacement_segments(case['members']['opening-header'],(0.,d_header))
                d_edge=displacement_at(header_line,7.35-5.2325)
                d_edge_north=displacement_at(displacement_segments(north),7.35-5.4)
                edge_line=displacement_segments(case['members']['opening-edge'],(d_edge,d_edge_north))
                absolute={k:displacement_peak(v) for k,v in [('transfer',cross_line),('main-south',south_line),('main-north',north_line),('opening-header',header_line),('opening-edge',edge_line)]}
                case.update(newTransfer=cross,columnAxial=axial,columnShorteningMm=shortening,
                            combinedVerticalMovement=absolute,
                            combinedMovementWithin10mm=all(v['deflectionMm']<=10 for v in absolute.values()),
                            westBaseULSKN=load,eastAdditionalFloorReactionULSKN=cross['uls']['reactionsKN'][1],
                            transferEquilibriumResidualKN=sum(cross['uls']['reactionsKN'])-reaction['ulsKN']-1.35*cross['selfWeightKNm']*(EAST-X))
                cases.append(case)
        options.append({'section':section,'cases':cases,'maxCombinedMovementMm':max(v['deflectionMm'] for c in cases for v in c['combinedVerticalMovement'].values()),
                        'allWithinLimitedFloorScreen':all(c['allWithinScreen'] and c['newTransfer']['withinScreen'] and c['columnAxial']['withinAxialScreen'] and c['combinedMovementWithin10mm'] for c in cases),
                        'crossBeamMassKg':(EAST+.05-(X-.075))*section['kgPerM'],
                        'extraSteelDepthMm':section['depthMm']-318})
    chosen=options[0]
    result={'id':'LP03','installed':False,'approvedForConstruction':False,
            'ownerBrief':'Keep a column, relocate it into a wall through every storey. Reject LW01 media wall.',
            'columnCentre':[X,Y],'oldColumnCentre':[8.32,-8.63],
            'finishedWallFaceX':5.505,'wallLiningYByStorey':{'basement':[-9.78,-9.0475],'ground':[-9.78,-9.0475],'first':[-9.78,-8.64]},
            'casingOutsideMm':210,'additionalDepthBeyondExistingInnerBlockFaceMm':222.5,
            'wallTreatment':'Continue the wall lining as one flat face across the short west recess segment on each storey, rather than boxing a free-standing post. This is a thickened wall, not a fit inside the existing 100 mm block leaf.',
            'transferAxis':[[X,Y],[EAST,Y]],'beamTopZ':TOP,'options':options,
            'preferredStudySection':chosen['section']['name'],
            'crossBeamTopBelowMainTopMm':20,
            'crossBeamUndersideBelowCurrentGirderMm':41.9,
            'eastPierProposal':{'currentNorthEndY':-9.64,'proposedNorthEndY':-9.50,'windowNarrowingMm':140,'installed':False},
            'rejectedTrial':{'centre':[5.4,-9.755],'reason':'Column intercepted the garage door head and cinema north bearing wall; move 85 mm north to clear those bodies.'},
            'geometry':geometry_audit(model,members,chosen['section']),
            'sourceHashes':{k:hashlib.file_digest(p.open('rb'),'sha256').hexdigest() for k,p in paths.items()},
            'sources':[STEEL_SOURCE,FIRE_SOURCE,SECTION['source']],
            'limits':'Experimental floor-only gravity comparison. The 10 mm movement target is a project study criterion, not a statutory limit. Column shortening and main/north-transfer movement are included for the stated simple-joint idealisation. Masonry/raft settlement, roof and masonry loads, heavy items, dynamics, global stability, lateral torsional buckling, connection eccentricity, wall/raft capacity, fire design and construction sequence remain unverified. Additional reactions at the east pier require a complete bearing/load-path design. The existing 400 mm base envelope needs an 82.5 mm internal pocket in the proposed retaining wall, or a redesigned base; reinforcement, anchors and waterproofing must be coordinated. Do not infer structural adequacy from the elastic screen.'}
    return result,model


def draw(result,model):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.patches import Rectangle
    fig=plt.figure(figsize=(16,9.4),facecolor='#faf9f5')
    gs=fig.add_gridspec(2,3,height_ratios=[1,.65],left=.04,right=.98,top=.84,bottom=.16,hspace=.32,wspace=.16)
    green='#187d69';blue='#357da3';orange='#bc7651'
    for i,(z,label) in enumerate([(-1.5,'Basement'),(1.3,'Ground floor'),(4.,'First floor · principal suite')]):
        ax=fig.add_subplot(gs[0,i]);ax.set_facecolor('#faf9f5')
        for e in model['elements']:
            a,b=e['bounds']
            if e['category'] not in ('walls','concrete') or not a[2]<z<b[2]:continue
            if a[0]<14 and b[0]>4.7 and a[1]<-7.8 and b[1]>-12.2:
                ax.add_patch(Rectangle(a[:2],b[0]-a[0],b[1]-a[1],fc='#c9cdc9',ec='#9fa7a2',lw=.5))
        if i==0: ax.add_patch(Rectangle((4.93,-12.2),.3525,4.4,fc='#aeb7b9'))
        ax.add_patch(Rectangle((5.2825,-9.78),.2225,1.14 if i==2 else .7325,fc=green,alpha=.32))
        ax.add_patch(Rectangle((X-.105,Y-.105),.21,.21,fc=green,zorder=6))
        ax.scatter([8.32],[-8.63],marker='x',s=55,color=orange,zorder=6)
        if i==2:
            ax.plot([X,EAST],[Y,Y],color=blue,lw=5,alpha=.7)
            ax.plot([MAIN,MAIN],[-12.2,-7.8],color=blue,lw=2,ls='--')
            ax.add_patch(Rectangle((13.6275,-9.64),.1,.14,fc=orange,zorder=6))
            ax.text(9.1,-10.25,'New cross-beam above',fontsize=9,color=blue,ha='center')
            ax.annotate('Column within\nthickened wall',xy=(X,Y),xytext=(5.9,-11.35),fontsize=9,color=green,
                        arrowprops={'arrowstyle':'->','color':green})
            ax.text(10.1,-9.1,'Existing wardrobe /\nensuite layout retained',fontsize=8,color='#666')
        else:
            ax.annotate('Same column position',xy=(X,Y),xytext=(7.5,-11.6),fontsize=9,color=green,
                        arrowprops={'arrowstyle':'->','color':green})
        ax.text(8.45,-8.55,'Old position',fontsize=8,color=orange)
        ax.set(xlim=(4.7,14.1),ylim=(-12.2,-7.8),aspect='equal',title=label)
        ax.set_xticks([]);ax.set_yticks([])
    sec=fig.add_subplot(gs[1,:2]);sec.set_facecolor('#faf9f5')
    # Elevation, compressed vertical scale intentionally labelled.
    sec.add_patch(Rectangle((4.93,-3.3),9.05,.3,fc='#b7bdc0'))
    sec.add_patch(Rectangle((4.93,-3),.3525,3,fc='#b7bdc0'))
    sec.add_patch(Rectangle((13.6275,-3),.3525,3,fc='#b7bdc0'))
    sec.add_patch(Rectangle((5.2825,-2.8),.2225,7.9,fc=green,alpha=.22))
    sec.add_patch(Rectangle((X-.075,-2.95),.15,8.0761,fc=green))
    sec.add_patch(Rectangle((X-.2,-2.975),.4,.025,fc=green))
    sec.add_patch(Rectangle((X-.075,5.1461),EAST+.05-(X-.075),.3399,fc=blue))
    sec.plot([EAST,EAST],[0,5.15],color='#a2aaa6',lw=10)
    for z,label in [(0,'Ground'),(2.8,'First'),(5.55,'Loft')]:
        sec.axhline(z,color='#aaa',ls=':',lw=.7);sec.text(14.05,z,label,fontsize=8,va='center')
    sec.annotate('Loft girder joins the cross-beam\nin the floor zone · joints to design',xy=(MAIN,5.33),xytext=(7.5,3.55),fontsize=9,color=blue,
                 arrowprops={'arrowstyle':'->','color':blue})
    sec.annotate('Column continues to raft\nbehind a flat wall finish',xy=(X,1),xytext=(7,-1.4),fontsize=9,color=green,
                 arrowprops={'arrowstyle':'->','color':green})
    sec.text(11.1,1.2,'East masonry bearing\ncapacity unverified',fontsize=8,color='#646c68')
    sec.set(xlim=(4.7,14.5),ylim=(-3.7,6.4),title='Load path across the wing · schematic elevation')
    sec.set_xticks([]);sec.set_yticks([])
    notes=fig.add_subplot(gs[1,2]);notes.axis('off')
    notes.text(0,1,'What changes',fontsize=14,weight='bold',va='top')
    notes.text(0,.82,'• Column hidden in a thicker wall.\n• About 220 mm added internally\n  along 0.73–1.14 m wall sections.\n• Cross-beam: 8.3 m span, 340 mm\n  deep and about 1.7 tonnes.\n• Cross-beam underside 42 mm lower.\n• East window pier extends 140 mm.\n• Bedroom remains open.',fontsize=10,va='top',linespacing=1.4)
    fig.text(.04,.95,'Concealed column · west wall proposal',fontsize=23,weight='bold')
    fig.text(.04,.9,'One straight column behind a continuous wall finish, from basement to loft support',fontsize=13,color='#58635d')
    fig.text(.04,.07,'UNINSTALLED CONCEPT · Initial floor-only checks; not a complete structural design.\nNew joints, joist/ceiling changes, east bearing and a base-plate pocket need design. Wall/raft capacities and full loading remain unverified.',fontsize=10,color='#6f6256')
    fig.savefig(OUT/'concealed-column.png',dpi=150,facecolor=fig.get_facecolor())
    fig.savefig(OUT/'concealed-column.svg',facecolor=fig.get_facecolor())
    plt.close(fig)


if __name__=='__main__':
    OUT.mkdir(exist_ok=True)
    result,model=study();(OUT/'study.json').write_text(json.dumps(result,indent=2)+'\n');draw(result,model)
    print(json.dumps({'options':[{k:o[k] for k in ('allWithinLimitedFloorScreen','maxCombinedMovementMm','crossBeamMassKg','extraSteelDepthMm')} for o in result['options']],
                      'roofIntersections':result['geometry']['roofSolidIntersections'],
                      'parts':[{k:p[k] for k in ('part','unmeasured')} for p in result['geometry']['parts']]}))
