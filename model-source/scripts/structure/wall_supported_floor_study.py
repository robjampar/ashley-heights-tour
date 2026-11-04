"""WF01: wall-line loft-floor alternative; no added internal walls or posts.

Not a construction design. Separates joist feasibility, load distribution and
unverified supporting masonry/heads/roof/foundation work.
"""
import hashlib
import json
import math
from itertools import product
from pathlib import Path

import numpy as np
from shapely.geometry import box, LineString
from shapely.ops import unary_union

from scripts.structure.beam_analysis import loaded_steel_screen
from scripts.structure.continuous_beam import loaded_continuous_steel_screen
from scripts.structure.build_members import floor_footprint
from scripts.structure.build_study import footprint

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'revisions/wall-supported-floor-2026-10-27'
WEST,EAST,SOUTH,VOID_X,VOID_Y,HEADER_Y,NORTH=5.2325,13.6775,-16.0035,7.35,-8.63,-9.1,-5.3


def joist_screen(section,span,spacing,scenarios):
    cases=[]
    for c in scenarios:
        for action in ('distributed','point'):
            g=[(0,span,c['floorGk']*spacing)]
            q=[(0,span,c['floorQk']*spacing)] if action=='distributed' else []
            pq=[] if action=='distributed' else [(span/2,2.)]
            r=loaded_steel_screen(section,span,g,q,[],pq)
            # Single-member modal indicator, not a floor response-factor check.
            mass=(c['floorGk']+.3)*spacing*1000/9.81+section['kgPerM']
            hz=math.pi/(2*span**2)*math.sqrt(210e9*section['ImajorCm4']*1e-8/mass)
            cases.append({**r,'scenario':c['id'],'action':action,
                          'singleMemberFrequencyHz':hz,'frequencyIndicatorAbove8Hz':hz>=8,
                          'pointLoadSharingAssumed':False})
    return {'section':section,'spanM':span,'spacingM':spacing,'cases':cases,
            'allWithinStaticScreen':all(c['withinScreen'] for c in cases),
            'minimumSingleMemberFrequencyHz':min(c['singleMemberFrequencyHz'] for c in cases),
            'limits':'No composite action or point-load sharing. The 8 Hz comparison is an indicative single-member screen; whole-floor modes, response factors, damping, deck stiffness, support movement and comfort are not verified.'}


def floor_route(catalog,scenarios):
    sections={s['name']:s for s in catalog['steel']+catalog['coordinationSteel']}
    grid={
      'void-edge':{'axis':1,'line':[[VOID_X,HEADER_Y],[VOID_X,NORTH]],'section':'305x165x40'},
      'south-header':{'axis':0,'line':[[WEST,HEADER_Y],[EAST,HEADER_Y]],'section':'305x305x97'},
      'gallery-west':{'axis':1,'line':[[5.615,NORTH],[5.615,-.115]],'section':'305x165x40'},
      'gallery-east':{'axis':1,'line':[[10.32,NORTH],[10.32,0]],'section':'305x305x97'},
      'north-header':{'axis':0,'line':[[5.4,NORTH],[EAST,NORTH]],'section':'305x305x107'},
    }
    # Full-area rectangles follow the existing void, not a bounding box across it.
    patches=[
      ('Principal room',WEST,EAST,SOUTH,HEADER_Y,'west-wall','east-wall','305x165x40',.5,None),
      ('South of void / west',WEST,VOID_X,HEADER_Y,VOID_Y,'west-wall','void-edge','203x133x30',.5,None),
      ('East of entrance void',VOID_X,EAST,HEADER_Y,NORTH,'void-edge','east-wall','203x133x30',.5,None),
      ('Gallery south',5.615,10.32,NORTH,-3.3315,'gallery-west','gallery-east',None,None,None),
      ('North-east room',10.32,EAST,NORTH,-3.3315,'gallery-east','east-wall',None,None,None),
      ('Gallery projection',5.615,10.42,-3.3315,-.115,'gallery-west','gallery-east',None,None,10.32),
    ]
    cases=[]
    for c,pattern in product(scenarios,('all-loaded','gallery-south-only','gallery-north-only','gallery-north-isolated')):
        loads={k:{'g':[],'q':[],'pg':[],'pq':[]} for k in grid};walls={};area=0.;area_g=0.;area_q=0.;records=[]
        def add_udl(key,a,b,g,q):
            if key not in grid:
                r=walls.setdefault(key,{'gkKN':0.,'qkKN':0.,'lineLoads':[],'points':[]})
                r['gkKN']+=g*(b-a);r['qkKN']+=q*(b-a);r['lineLoads'].append({'from':a,'to':b,'gkKNm':g,'qkKNm':q});return
            start=grid[key]['line'][0][grid[key]['axis']]
            loads[key]['g'].append((a-start,b-start,g));loads[key]['q'].append((a-start,b-start,q))
        def add_point(key,station,g,q):
            if key not in grid:
                r=walls.setdefault(key,{'gkKN':0.,'qkKN':0.,'lineLoads':[],'points':[]})
                r['gkKN']+=g;r['qkKN']+=q;r['points'].append({'station':station,'gkKN':g,'qkKN':q});return
            start=grid[key]['line'][0][grid[key]['axis']]
            loads[key]['pg'].append((station-start,g));loads[key]['pq'].append((station-start,q))
        for name,x0,x1,y0,y1,left,right,joist,spacing,right_axis in patches:
            width=x1-x0;support=(right_axis or x1)-x0
            rb=width*width/(2*support);ra=width-rb
            actual_spacing=(y1-y0)/math.ceil((y1-y0)/spacing) if joist else None
            own=sections[joist]['kgPerM']*9.81/1000/actual_spacing if joist else 0.
            factor=1.
            if pattern=='gallery-south-only' and name=='Gallery projection':factor=0.
            elif pattern=='gallery-north-only' and name in ('Gallery south','North-east room'):factor=0.
            elif pattern=='gallery-north-isolated' and name!='Gallery projection':factor=0.
            g,q=c['floorGk']+own,c['floorQk']*factor;a=width*(y1-y0)
            add_udl(left,y0,y1,ra*g,ra*q);add_udl(right,y0,y1,rb*g,rb*q)
            area+=a;area_g+=a*g;area_q+=a*q
            records.append({'name':name,'bounds':[x0,y0,x1,y1],'areaM2':a,'steelSelfWeightKNm2':own,
                            'joistSpacingM':actual_spacing,'variableLoadFactor':factor,'left':left,'right':right})
        results={}
        for key in ('void-edge','gallery-west','gallery-east','south-header','north-header'):
            rule=grid[key];axis=rule['axis'];span=rule['line'][1][axis]-rule['line'][0][axis];s=sections[rule['section']];l=loads[key]
            if key=='gallery-east':
                r=loaded_continuous_steel_screen(s,span,[0,-3.3315-NORTH,span],l['g'],l['q'],l['pg'],l['pq'])
            else:r=loaded_steel_screen(s,span,l['g'],l['q'],l['pg'],l['pq'])
            results[key]={**r,**rule,'catalogueSection':s};g=r['permanent']['reactionsKN'];q=r['variable']['reactionsKN']
            if key=='void-edge':
                add_point('south-header',VOID_X,g[0],q[0]);add_point('north-header',VOID_X,g[1],q[1])
            elif key=='gallery-west':
                add_point('north-header',5.615,g[0],q[0]);add_point('gallery-front-west-wall',-.115,g[1],q[1])
            elif key=='gallery-east':
                add_point('north-header',10.32,g[0],q[0]);add_point('gallery-middle-wall',-3.3315,g[1],q[1]);add_point('retained-front-pier',0,g[2],q[2])
            else:
                add_point('west-wall' if key=='south-header' else 'north-west-pier',rule['line'][0][1],g[0],q[0])
                add_point('east-wall',rule['line'][0][1],g[1],q[1])
        own=sum(r['selfWeightKNm']*r['engineeringSpanM'] for r in results.values())
        for w in walls.values():w['ulsKN']=1.35*w['gkKN']+1.5*w['qkKN']
        cases.append({'scenario':c['id'],'pattern':pattern,'members':results,'walls':walls,'patches':records,'areaM2':area,
                      'floorGkTotalKN':area_g,'floorQkTotalKN':area_q,'secondarySteelGkKN':own,
                      'equilibriumResidualKN':sum(w['gkKN']+w['qkKN'] for w in walls.values())-(area_g+area_q+own),
                      'allWithinIsolatedMemberScreen':all(r['withinScreen'] for r in results.values()),
                      'combinedFloorMovementVerified':False})
    return {'cases':cases,'grid':grid,'approvedForConstruction':False,
            'scope':'Distributed floor loads plus steel joist self-weight, with explicit reactions through void trimmer and gallery beams to wall lines. No central girder, internal post or new room wall. Wall lines include openings requiring engineered heads. Full floor/support movement, masonry/roof actions and foundations are not verified.'}


def study():
    paths={k:ROOT/p for k,p in [('model','walkthrough/public/structure/model.json'),('members','walkthrough/public/structure/members.json'),
                              ('catalog','proposal/specs/structural-uk-catalog.json'),('scenarios','proposal/specs/structural-trials.json')]}
    model=json.loads(paths['model'].read_text());members=json.loads(paths['members'].read_text())
    by={e['id']:e for e in members['elements']}
    cat=json.loads((ROOT/'proposal/specs/structural-uk-catalog.json').read_text());ss={s['name']:s for s in cat['steel']+cat['coordinationSteel']}
    scenarios=json.loads((ROOT/'proposal/specs/structural-trials.json').read_text())['scenarios']
    joists=[joist_screen(ss['305x165x40'],EAST-WEST,.5,scenarios),joist_screen(ss['203x133x30'],EAST-VOID_X,.5,scenarios),
            joist_screen(ss['356x171x57'],EAST-WEST,1.,scenarios)]
    route=floor_route(cat,scenarios)
    lower=[]
    for section in ('305x165x40','305x305x97','305x305x129','305x305x198'):
        cases=[];length=16.0035-9.74
        for i,c in enumerate(scenarios):
            actual_spacing=(HEADER_Y-SOUTH)/math.ceil((HEADER_Y-SOUTH)/.5)
            floor_g=(EAST-WEST)/2*(c['floorGk']+ss['305x165x40']['kgPerM']*9.81/1000/actual_spacing)
            floor_q=(EAST-WEST)/2*c['floorQk']
            wall_g=(4.,7.,10.)[i];roof_g=(2.,3.,4.)[i];roof_q=(.5,1.,1.5)[i]
            r=loaded_steel_screen(ss[section],length,[(0,length,floor_g+wall_g+roof_g)],[(0,length,floor_q+roof_q)])
            cases.append({**r,'scenario':c['id'],'assumedWallGkKNm':wall_g,'unverifiedRoofGkKNm':roof_g,'unverifiedRoofQkKNm':roof_q})
        lower.append({'section':section,'cases':cases,'allWithinIsolatedScreen':all(c['withinScreen'] for c in cases)})
    walls=[]
    for ident,label,kind in [('M-BLOCK-98197AC','West wall above garage','transfer-below'),('M-BLOCK-393739F','West recess wall','stacked-masonry'),
                             ('M-BLOCK-02FFCDC','East facade pier','openings-below'),('M-BLOCK-0B061C8','East north pier','openings-below')]:
        if ident not in by:continue
        e=by[ident];walls.append({'id':ident,'name':label,'bounds':e['bounds'],'route':kind,'capacityVerified':False})
    floor_model={e['id']:e for e in model['elements']}
    actual=floor_footprint(floor_model['F-084EF88']).intersection(box(WEST,SOUTH,EAST,NORTH))
    patch_union=unary_union([box(*p['bounds']) for p in route['cases'][0]['patches'][:3]])
    # Secondary frame is a proposal, not changes to the live member register.
    lines=[];spacings=[]
    for tag,a,b,y0,y1,s in [('south',WEST,EAST,SOUTH,HEADER_Y,'305x165x40'),
                           ('void-west',WEST,VOID_X,HEADER_Y,VOID_Y,'203x133x30'),
                           ('void-east',VOID_X,EAST,HEADER_Y,NORTH,'203x133x30')]:
        count=math.ceil((y1-y0)/.5);step=(y1-y0)/count;spacings.append(step)
        for i in range(count):
            y=y0+(i+.5)*step
            lines.append({'id':f'WF01-{tag}-J{i+1:02}','axis':[[a,y],[b,y]],'section':s,'lengthAxisM':b-a,
                          'massExcludingEndAllowancesKg':(b-a)*ss[s]['kgPerM']})
    retained=members['retainedWallBearingStudy']
    return {'id':'WF01','installed':False,'approvedForConstruction':False,
            'strategy':'Rebuild the affected loft-floor load path around wall lines already in the layout; avoid new room walls and internal columns.',
            'retiredOnlyInThisAlternative':['M-FR-3-001','M-LP02-NORTH','M-LP02-COLUMN','M-LP02-CAP','M-LP02-BASE','M-LP02-GROUT'],
            'bayClearWidthM':13.6275-5.2825,'bayWallAxisSpanM':EAST-WEST,
            'joistTrials':joists,'floorRoute':route,'lowerWestTransferTrials':lower,'wallAudit':walls,
            'joists':lines,'maximumNominalSpacingM':max(spacings),'joistAxisMassKg':sum(j['massExcludingEndAllowancesKg'] for j in lines),
            'deeperOption':{'additionalDepthMm':54.6,'longBaySteelSavingBeforeConnectionsKg':
                           sum(j['massExcludingEndAllowancesKg'] for j in lines if j['section']=='305x165x40')-
                           math.ceil((HEADER_Y-SOUTH)/1.)*(EAST-WEST)*ss['356x171x57']['kgPerM'],
                           'secondaryTimberDeckSupportsRequired':True,'installed':False},
            'areaAudit':{'actualAffectedWingM2':actual.area,'trialAffectedWingM2':patch_union.area,
                         'uncoveredM2':actual.difference(patch_union).area,'outsideM2':patch_union.difference(actual).area},
            'existingHouse':{'alreadyUsesWallCandidates':retained['enabled'],'surveyRequired':True,
                             'joistsWithoutIdentifiedIntermediateWall':[j['joistId'] for j in retained['joists'] if not j['wallIds']],
                             'longestUnresolvedClearRunM':max(j['maximumClearRunM'] for j in retained['joists'])},
            'sourceHashes':{k:hashlib.file_digest(p.open('rb'),'sha256').hexdigest() for k,p in paths.items()},
            'limitations':['Side wall heads need designed bearing and continuity at every opening; a line in plan is not a continuous masonry support.',
                           'The west upper wall sits over a garage transfer. The currently drawn 305x165x40 fails the new load sensitivity and must not be retained without redesign.',
                           'The south void header lands at the west entrance return and the east window-head line. The east connection is to an engineered head, not a padstone in the window opening.',
                           'Total movement including window heads, lower transfer, wall compression and foundation movement is not checked. Individual passing members do not establish floor adequacy.',
                           'No complete roof loads, masonry design, stability, steel connections, fire, acoustic build-up, restraint, robustness, services or foundations are verified.',
                           'The 356 mm joists are an alternative with lower steel mass per area, but secondary deck supports and a lower ceiling would require additional design. It is not the depicted default.'],
            'sources':['https://www.britishsteel.co.uk/wp-content/uploads/2026/02/british-steel-universal-beams-datasheet-190724.pdf',
                       'https://www.steelconstruction.info/images/3/38/SCI_P301.pdf',
                       'https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf']},model,members


def draw(result,model,members):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.patches import Rectangle,Polygon
    fig,(whole,detail)=plt.subplots(1,2,figsize=(16,10),gridspec_kw={'width_ratios':[1,1.15]})
    fig.patch.set_facecolor('#faf9f5');blue='#27779c';green='#247762';amber='#c38235';grey='#bdc4bf'
    retained=set(members['retainedIds'])
    wall_ids={e['sourceIds'][0] for e in members['elements'] if e['category']=='masonry' and e.get('sourceIds')}
    for ax in (whole,detail):
        ax.set_facecolor('#faf9f5')
        for e in model['elements']:
            a,b=e['bounds']
            if e['category']=='floors' and a[2]>5 and b[0]>-6 and a[0]<14:
                p=floor_footprint(e)
                for g in [p] if p.geom_type=='Polygon' else p.geoms:
                    if g.geom_type=='Polygon':ax.add_patch(Polygon(g.exterior.coords,fc='#eaf0ed',ec='none',zorder=0))
            if e['category']=='walls' and a[2]<4<b[2]:
                color=green if e['id'] in retained else (grey if e['id'] in wall_ids else '#e1c59f')
                ax.add_patch(Rectangle(a[:2],b[0]-a[0],b[1]-a[1],fc=color,ec='none',zorder=2))
        ax.set_aspect('equal');ax.set_xticks([]);ax.set_yticks([])
    whole.set(xlim=(-5.7,14.6),ylim=(-16.7,9.3))
    whole.set_title('Walls beneath the loft floor',fontsize=14,pad=16)
    whole.text(-4.9,7.9,'Original house',color=green,fontsize=11,weight='bold')
    whole.text(-4.9,6.8,'Retained walls are already bearing candidates.\nMaterial, openings and foundations need survey.',fontsize=9,color='#4b6258')
    whole.add_patch(Rectangle((WEST,SOUTH),EAST-WEST,NORTH-SOUTH,fill=False,ec=blue,lw=2))
    whole.text(-4.9,-12.9,'Affected wing →\nReconsider the floor system\nfrom the wall lines.',fontsize=11,color=blue)
    whole.text(-4.9,-15.7,'Green: retained wall candidates\nGrey: proposed masonry already in the layout\nSand: partitions; bearing not established',fontsize=9,color='#555')
    for j in result['joists']:
        a,b=j['axis'];detail.plot([a[0],b[0]],[a[1],b[1]],color=blue,lw=1.5,zorder=3)
    for key,r in result['floorRoute']['grid'].items():
        a,b=r['line'];detail.plot([a[0],b[0]],[a[1],b[1]],color='#1b536c',lw=4,zorder=4)
    detail.plot([WEST,WEST],[SOUTH,HEADER_Y],color=amber,lw=5,zorder=5)
    detail.plot([EAST,EAST],[SOUTH,NORTH],color=amber,lw=4,zorder=5)
    detail.add_patch(Rectangle((WEST,VOID_Y),VOID_X-WEST,NORTH-VOID_Y,fc='#faf9f5',zorder=1))
    detail.scatter([8.32],[-8.63],marker='x',s=90,c='#b5634a',zorder=6)
    detail.annotate('Central column and girder\nomitted in this alternative',xy=(8.32,-8.63),xytext=(9.0,-7.75),fontsize=9,color='#a3533f',
                    arrowprops={'arrowstyle':'->','color':'#a3533f'})
    detail.text(6.2,-6.75,'Existing\nentrance\nvoid',ha='center',fontsize=10,color='#666')
    detail.text(9.4,-12.2,'Wall-to-wall joists\n8.35 m clear / 8.445 m axes\n303 mm steel trial at ≤500 mm centres',ha='center',va='center',fontsize=10,color=blue,
                bbox={'facecolor':'#faf9f5','alpha':.95,'edgecolor':'none','pad':7})
    detail.annotate('Existing wall over garage:\ncheck / upgrade beam below',xy=(WEST,-13.7),xytext=(6.0,-15.4),color='#936425',fontsize=9,
                    arrowprops={'arrowstyle':'->','color':'#936425'},bbox={'facecolor':'#faf9f5','edgecolor':'none','alpha':.9})
    detail.annotate('Local trimmers at void',xy=(7.35,-6.4),xytext=(8.4,-4.75),fontsize=9,color='#1b536c',arrowprops={'arrowstyle':'->','color':'#1b536c'})
    detail.text(11.7,-15.7,'Amber: wall heads /\nload path still to design',fontsize=9,color='#936425',ha='center',bbox={'facecolor':'#faf9f5','edgecolor':'none'})
    detail.set(xlim=(4.7,14.4),ylim=(-16.7,-3.5));detail.set_title('WF01 · wall-supported framing trial',fontsize=14,pad=16)
    fig.suptitle('Use the walls already in the layout',x=.045,y=.97,ha='left',fontsize=23,weight='bold')
    fig.text(.045,.92,'Change the floor framing first. Add support only where the existing load path genuinely cannot work.',fontsize=12,color='#54645c')
    fig.text(.045,.07,'UNINSTALLED STUDY · No new internal wall or column is proposed in WF01. The stair / entrance void remains.\nIndividual joist checks pass; the complete floor, perimeter heads, wall capacities, roof loads and foundations are not yet verified.',fontsize=10,color='#6f6256')
    fig.subplots_adjust(left=.045,right=.97,top=.86,bottom=.15,wspace=.12)
    fig.savefig(OUT/'wall-supported-floor.png',dpi=150,facecolor=fig.get_facecolor());fig.savefig(OUT/'wall-supported-floor.svg',facecolor=fig.get_facecolor());plt.close(fig)


if __name__=='__main__':
    OUT.mkdir(exist_ok=True);result,model,members=study()
    (OUT/'study.json').write_text(json.dumps(result,indent=2)+'\n');draw(result,model,members)
    print(json.dumps({'area':result['areaAudit'],'joistCount':len(result['joists']),'joistMassKg':result['joistAxisMassKg'],
                      'joistChecks':[{'section':j['section']['name'],'span':j['spanM'],'static':j['allWithinStaticScreen'],'frequencyHz':j['minimumSingleMemberFrequencyHz']} for j in result['joistTrials']],
                      'floorRoute':[{'case':c['scenario'],'equilibrium':c['equilibriumResidualKN'],'isolatedMembers':c['allWithinIsolatedMemberScreen']} for c in result['floorRoute']['cases']]}))
