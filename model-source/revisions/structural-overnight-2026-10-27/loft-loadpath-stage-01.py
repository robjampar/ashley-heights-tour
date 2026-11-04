"""Explicit loft floor load routes and shorter-span concept comparison.

The patches are reviewed rectangular tributary regions, not an overall mesh
bounding box. Missing area is reported. Roof, concentrated equipment, heavy
walls, stability and all downstream capacities are intentionally unverified.
"""
import json
from pathlib import Path
from scripts.structure.beam_analysis import loaded_steel_screen, loaded_timber_screen

ROOT=Path(__file__).resolve().parents[2]
CURRENT_MEMBERS={'opening-edge':'M-FR-3-009','opening-header':'M-FR-3-008',
    'gallery-west':'M-FR-3-025','gallery-east':'M-FR-3-022','north-bay-west':'M-FR-3-002',
    'main':'M-FR-3-001','north-transfer':'M-FR-3-010'}


def compare_scheme(catalog,scenarios,*,main_x=9.9,post_y=-9.65,max_depth_mm=370,fixed_sections=None):
    sections=catalog['steel']+catalog.get('coordinationSteel',[])
    eligible=[s for s in sections if s['depthMm']<=max_depth_mm]
    eligible.sort(key=lambda s:(s['kgPerM'],s['depthMm']))
    west,east,south,north=5.2325,13.6775,-16.0035,-5.3
    grid={
      'opening-edge':{'axis':1,'line':[[7.35,-8.63],[7.35,north]]},
      'opening-header':{'axis':0,'line':[[west,-8.63],[main_x,-8.63]]},
      'gallery-west':{'axis':1,'line':[[5.615,north],[5.615,-.115]]},
      'gallery-east':{'axis':1,'line':[[10.42,north],[10.42,-.115]]},
      'north-bay-west':{'axis':1,'line':[[10.5,north],[10.5,-3.3315]]},
      'north-transfer':{'axis':0,'line':[[west,north],[east,north]]},
    }
    if post_y is None:grid['main']={'axis':1,'line':[[main_x,south],[main_x,north]]}
    else:
        grid['main-south']={'axis':1,'line':[[main_x,south],[main_x,post_y]]}
        grid['main-north']={'axis':1,'line':[[main_x,post_y],[main_x,north]]}
    def empty():return {key:{'g':[],'q':[],'pg':[],'pq':[]} for key in grid}
    all_cases=[]
    for case in scenarios:
        gk,qk=case['floorGk'],case['floorQk'];loads=empty();external={};patches=[]
        def external_reaction(key,g,q):
            r=external.setdefault(key,{'gkKN':0.,'qkKN':0.});r['gkKN']+=g;r['qkKN']+=q
        def udl(key,a,b,g,q):
            if key=='main' and post_y is not None:
                for target,lo,hi in [('main-south',south,post_y),('main-north',post_y,north)]:
                    aa,bb=max(a,lo),min(b,hi)
                    if bb>aa:udl(target,aa,bb,g,q)
                return
            if key not in grid:external_reaction(key,g*(b-a),q*(b-a));return
            rule=grid[key];start=rule['line'][0][rule['axis']]
            loads[key]['g'].append((a-start,b-start,g));loads[key]['q'].append((a-start,b-start,q))
        def point(key,station,g,q):
            if key=='main' and post_y is not None:key='main-south' if station<post_y else 'main-north'
            if key not in grid:external_reaction(key,g,q);return
            rule=grid[key];start=rule['line'][0][rule['axis']]
            loads[key]['pg'].append((station-start,g));loads[key]['pq'].append((station-start,q))
        def patch(name,x0,x1,y0,y1,left,right,*,right_support=None):
            width=x1-x0;support_width=(right_support or x1)-x0
            # Includes the gallery cantilever through its actual first moment.
            rb=width*width/(2*support_width);ra=width-rb
            udl(left,y0,y1,ra*gk,ra*qk);udl(right,y0,y1,rb*gk,rb*qk)
            patches.append({'name':name,'polygon':[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],'areaM2':width*(y1-y0),
                'leftReceiver':left,'rightReceiver':right,'rightSupportX':right_support or x1,
                'reactionWidthM':[ra,rb]})
        patch('Main loft south / west',west,main_x,south,-8.63,'west-wall','main')
        patch('Main loft south / east',main_x,east,south,-8.63,'main','east-wall')
        patch('Entrance-void east strip',7.35,main_x,-8.63,north,'opening-edge','main')
        patch('Main loft north / east',main_x,east,-8.63,north,'main','east-wall')
        patch('North-east room',10.5,east,north,-3.3315,'north-bay-west','east-wall')
        patch('Connecting gallery south',5.615,10.42,north,-3.03,'gallery-west','gallery-east')
        patch('Connecting gallery cantilever',5.615,10.42,-3.03,-.115,'gallery-west','gallery-cantilever-bearing',right_support=9.7)
        # Dependency order is explicit: the opening header must reach the main
        # girder, otherwise the old trimmer-to-trimmer junction has no support.
        order=['opening-edge','opening-header','gallery-west','gallery-east','north-bay-west']+(['main'] if post_y is None else ['main-south','main-north'])+['north-transfer']
        results={}
        for key in order:
            rule=grid[key];axis=rule['axis'];a,b=[p[axis] for p in rule['line']];span=b-a;load=loads[key]
            choices=[fixed_sections[key]] if fixed_sections else eligible
            screens=[(loaded_timber_screen if s.get('family')=='C24' else loaded_steel_screen)(s,span,load['g'],load['q'],load['pg'],load['pq']) for s in choices]
            candidate=next((r for r in screens if r['withinScreen']),None)
            if candidate is None:
                # Keep the failure explicit while allowing downstream reactions
                # to be evaluated with the stiffest shortlisted section weight.
                fallback=choices[0] if fixed_sections else max(choices,key=lambda s:s['ImajorCm4'])
                candidate=next(r for r in screens if r['section'].startswith(fallback['name']))
            section=next(s for s in choices if candidate['section'].startswith(s['name']))
            results[key]={'key':key,**rule,**candidate,'catalogueSection':section,'shortlisted':any(r['withinScreen'] for r in screens),
                'alternatives':[{'section':r['section'],'depthMm':r['depthMm'],'deflectionMm':r['sls']['deflectionMm'],'withinScreen':r['withinScreen']} for r in screens]}
            g=candidate['permanent']['reactionsKN'];q=candidate['variable']['reactionsKN']
            if key=='opening-edge':point('opening-header',7.35,g[0],q[0]);point('north-transfer',7.35,g[1],q[1])
            elif key=='opening-header':external_reaction('west-wall',g[0],q[0]);point('main',-8.63,g[1],q[1])
            elif key in ('gallery-west','gallery-east','north-bay-west'):
                point('north-transfer',rule['line'][0][0],g[0],q[0]);external_reaction(key+'-north-support',g[1],q[1])
            elif key=='main':external_reaction('south-wall',g[0],q[0]);point('north-transfer',main_x,g[1],q[1])
            elif key=='main-south':external_reaction('south-wall',g[0],q[0]);external_reaction('column',g[1],q[1])
            elif key=='main-north':external_reaction('column',g[0],q[0]);point('north-transfer',main_x,g[1],q[1])
            elif key=='north-transfer':external_reaction('north-transfer-west',g[0],q[0]);external_reaction('north-transfer-east',g[1],q[1])
        for r in external.values():r['ulsKN']=1.35*r['gkKN']+1.5*r['qkKN']
        area=sum(p['areaM2'] for p in patches);mass=sum(r['catalogueSection']['kgPerM']*r['engineeringSpanM'] for r in results.values())
        all_cases.append({'scenario':case['id'],'floorGk':gk,'floorQk':qk,'members':results,'patches':patches,'floorAreaM2':area,
            'beamMassKg':mass,'externalReactions':external,
            'equilibriumResidualKN':sum(r['gkKN']+r['qkKN'] for r in external.values())-(area*(gk+qk)+mass*9.81/1000),
            'allWithinScreen':all(r['shortlisted'] for r in results.values())})
    return {'mainX':main_x,'columnY':post_y,'maxDepthMm':max_depth_mm,'sectionsFixed':bool(fixed_sections),'cases':all_cases,'approvedForConstruction':False,
        'basis':'Gravity-only, simply supported members with explicit reaction transfer. No continuity credit. All floor patches, supports and actual point-load stations are listed. Section choices are conditional screens, not issued member sizes.',
        'scope':'Floor load budgets include timber structure, finishes, ceilings/services and assumed lightweight partitions. Rolled-beam self-weight is additional. Roof, masonry, concentrated floor loads, baths/storage, lateral stability, support settlement and all connections, columns, bearing walls and foundations are not verified. The gallery cantilever bearing reaction is exported, not designed in this comparison.'}


def current_loft_review(model,elements,catalogue,scenarios):
    """Screen the sections actually drawn; never substitute a shortlisted size."""
    from shapely.geometry import Polygon,box
    from shapely.ops import unary_union
    from scripts.structure.build_study import footprint
    by={e['id']:e for e in elements};sections={}
    for key,ident in CURRENT_MEMBERS.items():
        e=by[ident]
        if e.get('steelProfile'):sections[key]=e['steelProfile']
        else:
            w,d=e['sectionSizeM'];sections[key]={'name':f'{w*1000:g} x {d*1000:g} mm C24 reservation','family':'C24',
                'widthMm':w*1000,'depthMm':d*1000,'kgPerM':w*d*4.2/9.81*1000}
    review=compare_scheme(catalogue,scenarios,main_x=9.455,post_y=None,fixed_sections=sections)
    review['revision']='LP01-2026-10-27';review['memberIds']=CURRENT_MEMBERS
    review['status']='Geometry-based floor gravity screen; incomplete building load path'
    review['scope']+=' Timber receivers use C24 SC1 assumptions, not an engineered timber product selection. Their displayed SLS deformation includes the assumed creep contribution. Assumed rigid supports omit transfer-beam deflection and differential movement.'
    sources=['F-084EF88','F-0CAA631','F-8559B07','F-8FC24EF','F-ADC03FC','F-9675B53','F-S-GALLERY-EAVES','F-S-GALLERY-NORTH-INFILL']
    authored=unary_union([footprint(e['triangles']) for e in model['elements'] if e['id'] in sources]).intersection(box(-99,-99,99,-.115))
    patches=unary_union([Polygon(p['polygon']) for p in review['cases'][0]['patches']])
    review['areaAudit']={'sourceIds':sources,'sourceAreaM2':authored.area,'loadedAreaM2':patches.area,
        'outsideSourceAreaM2':patches.difference(authored).area,'unassignedSourceAreaM2':authored.difference(patches).area,
        'unassignedBasis':'The 0.187 m² west wall-edge closure at X5.2325–5.5, Y−5 to −4.3025 is not part of these floor bays. Its local wall/head support remains outside this screen.'}
    if review['areaAudit']['outsideSourceAreaM2']>1e-6 or review['areaAudit']['unassignedSourceAreaM2']>.187:
        raise ValueError('Loft tributary patches no longer match the reviewed source floor geometry')
    # The key change is the full-width south opening header. Check its actual
    # axis before attaching reactions to the live register.
    header=by['M-FR-3-008'];line=header.get('receiverRevision',{}).get('line')
    if line!=[[5.2325,-8.63],[9.455,-8.63]]:raise ValueError('LP01 requires the opening header to reach the main girder')
    routes={'opening-edge':['opening-header','north-transfer'],'opening-header':['west-wall','main'],
        'gallery-west':['north-transfer','gallery-west-north-support'],
        'gallery-east':['north-transfer','gallery-east-north-support'],
        'north-bay-west':['north-transfer','north-bay-west-north-support'],
        'main':['south-wall','north-transfer'],'north-transfer':['north-transfer-west','north-transfer-east']}
    for key,ident in CURRENT_MEMBERS.items():
        member=by[ident]
        member['supportScreen']={'basis':f'LP01: {member["name"]}. Actual drawn section and support-axis span; linked floor reactions include the opening trimmers and connecting gallery.',
            'loadBasis':'Gk 0.75 / 1.00 / 1.35 kN/m²; Qk 1.50 kN/m². Explicit one-way floor patches and beam self-weight. Point reactions are applied at their actual stations, not all at midspan.',
            'limits':review['scope'],'approvedForConstruction':False,
            'cases':[{'scenario':case['scenario'],**case['members'][key]} for case in review['cases']]}
        member['loadRoute']={'study':'LP01','key':key,'endDestinations':[CURRENT_MEMBERS.get(r,r) for r in routes[key]],
            'receivedFrom':[CURRENT_MEMBERS[source] for source,destinations in routes.items() if key in destinations],
            'capacityVerified':False}
        member['calculationRef']='LP01 · linked floor gravity screen'
        member['status']='Fails linked floor-load screen; redesign required' if any(not r['withinScreen'] for r in member['supportScreen']['cases']) else 'Within linked floor-load screen only; full design unverified'
        if 'RECEIVER-SCREEN' not in member['issueIds']:member['issueIds'].append('RECEIVER-SCREEN')
    return review


def main():
    catalogue=json.loads((ROOT/'proposal/specs/structural-uk-catalog.json').read_text())
    cases=json.loads((ROOT/'proposal/specs/structural-trials.json').read_text())['scenarios']
    options={
      'no-column-shallow':compare_scheme(catalogue,cases,main_x=9.455,post_y=None,max_depth_mm=355),
      'concealed-column-shallow':compare_scheme(catalogue,cases,max_depth_mm=310),
      'concealed-column-downstands':compare_scheme(catalogue,cases,max_depth_mm=455),
      'stair-clear-column':compare_scheme(catalogue,cases,main_x=9.455,post_y=-8.63,max_depth_mm=340),
    }
    target=ROOT/'revisions/structural-overnight-2026-10-27/loft-loadpath-options.json'
    target.write_text(json.dumps(options,indent=2)+'\n')
    for name,option in options.items():
        high=option['cases'][-1]
        print(name,'mass kg',round(high['beamMassKg']), 'screen',high['allWithinScreen'],'balance',round(high['equilibriumResidualKN'],9))
        for key,r in high['members'].items():print(' ',key,r['section'],round(r['sls']['deflectionMm'],2),r['withinScreen'])
        print(' column',high['externalReactions'].get('column'))


if __name__=='__main__':main()
