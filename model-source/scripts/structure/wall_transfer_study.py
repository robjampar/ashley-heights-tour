"""Uninstalled load-bearing media-wall option with a continuous loft girder."""
import hashlib,json
from pathlib import Path
import numpy as np
from scripts.structure.loft_loadpath import compare_scheme,CURRENT_MEMBERS
from scripts.structure.build_study import footprint
from shapely.geometry import box

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'revisions/structural-bearing-openings-2026-10-27'


def study():
    paths={n:ROOT/p for n,p in [('model','walkthrough/public/structure/model.json'),
           ('members','walkthrough/public/structure/members.json'),('geometry','outputs/output-proposed-compact/geometry.json')]}
    model=json.loads(paths['model'].read_text());members=json.loads(paths['members'].read_text())
    by={e['id']:e for e in members['elements']}
    catalog=json.loads((ROOT/'proposal/specs/structural-uk-catalog.json').read_text())
    scenarios=json.loads((ROOT/'proposal/specs/structural-trials.json').read_text())['scenarios']
    sections={k:by[v]['steelProfile']for k,v in CURRENT_MEMBERS.items()}
    sections['main']=sections.pop('main-south');sections.pop('main-north')
    cases=[]
    for pattern in ('all-loaded','main-south-only','main-north-only','gallery-south-only','gallery-north-only','gallery-north-isolated'):
        run=compare_scheme(catalog,scenarios,main_x=8.32,post_y=None,continuous_main_support_y=-9.905,
            fixed_sections=sections,north_west_support=5.4,edge_supported=True,variable_pattern=pattern)
        cases+=run['cases']
    wall=box(6.15,-10.0125,8.82,-9.7975)
    supports=[]
    for ident in ('M-G01-GARAGE-SLAB','M-G01-CINEMA-NORTH','M-BLOCK-4D5245A'):
        plane=footprint(by[ident]['triangles'])
        supports.append(dict(id=ident,coveredAreaM2=wall.intersection(plane).area,
            uncoveredAreaM2=wall.difference(plane).area,capacityVerified=False))
    max_reaction=max(c['externalReactions']['bearing-wall']['ulsKN']for c in cases)
    result=dict(id='LW01',installed=False,approvedForConstruction=False,
        title='Continuous loft girder over an aligned media wall',
        coreBounds=[[6.15,-10.0125,2.8],[8.82,-9.7975,4.963]],
        padBounds=[[8.02,-10.0125,4.963],[8.62,-9.7975,5.178]],
        groutBounds=[[8.166,-10.0125,5.178],[8.474,-9.7975,5.188]],
        wallCoreMm=215,finishedThicknessMm=245,girderDepthMm=318,
        girderSupportY=[-16.0035,-9.905,-5.3],floorLevelsM=[0,2.8,5.55],
        supportAudit=supports,cases=cases,maxFloorReactionULSKN=max_reaction,
        maxMainHoldDownSensitivityKN=max(c['members']['main']['upliftSensitivity']['holdDownDemandKN']for c in cases),
        nominalPadAveragePressureMPa=max_reaction/(.6*.215)/1000,
        pressureBasis='Floor-only reaction divided by the proposed gross pad base area. This is not masonry bearing resistance or a verified pressure distribution.',
        wallSelfWeightCases=[dict(densityKNm3=d,upperWallGkKN=2.67*.215*2.163*d,
                                 lowerWallStripGkKN=2.67*.215*2.875*d,
                                 additionalLowerWallGkKN=2.67*(.215*2.875-.1*2.6)*d)for d in (17,20,22)],
        layout=dict(mainEastClearWidthM=1.005,secondaryWestClearWidthM=.8525,
                    entranceOpenLeafToWallM=.1325,sofaShiftM=[.5,-.9,0],
                    existingNorthPartitionAndDoorRetained=True),
        requiredChanges=[
          'Use one continuous girder over the media wall; remove the column, cap/base and casing only after the complete alternative is coordinated.',
          'Add the first-floor media wall; move the TV, sofa, rug and coffee-table group together, keeping the principal entrance and dressing-room route.',
          'Locally widen the 2.67 m ground garage/store block-wall portion from 100 to 215 mm and continue it through the first-floor zone. It bears at slab top Z-0.075, not on the finish. Do not widen the unsupported eastern remainder without a separate slab design.',
          'Retain the aligned215mm cinema wall below the250mm RC slab; verify the local slab compression, cinema wall and raft with all coincident loads.',
          'Move FR1-007 and attached floor edges/hangers clear of the widened wall; coordinate the FR1-026 masonry pad without loading timber with the new wall.',
          'Restore floor/ceiling sheets at the removed column penetrations; keep all floor levels and girder depth.',
          'Design the wall/pad, negative-moment beam restraint, end joints and foundations, including ground/first floors, wall self-weight and any roof reactions.'],
        limits='Experimental geometry and linked floor-gravity study only. Rigid supports omit wall/transfer/raft movement. Dynamic response, roof loads, concentrated fixtures, wall capacity/slenderness, restraint, connections, fire protection and complete foundations remain unverified. The concept is not installed.',
        sourceHashes={k:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()for k,p in paths.items()})
    return result,model


def draw(result,model):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.patches import Rectangle
    plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10})
    fig,(ax,sec)=plt.subplots(1,2,figsize=(16,8.2),gridspec_kw={'width_ratios':[1,1.18]})
    fig.patch.set_facecolor('#faf9f5');green='#19836b';blue='#357ba5';orange='#bb7045'
    for e in model['elements']:
        a,b=e['bounds']
        if e['category']=='walls' and a[2]<4<b[2] and a[0]<14 and b[0]>5 and a[1]<-8.4 and b[1]>-16.4:
            ax.add_patch(Rectangle(a[:2],b[0]-a[0],b[1]-a[1],fc='#bcc1bd',ec='#949d98',lw=.5))
    ax.add_patch(Rectangle((6.135,-10.0275),2.7,.245,fc=green,zorder=5))
    ax.plot([8.32,8.32],[-16.0035,-5.3],color=blue,lw=3,alpha=.7,label='Loft girder above')
    ax.scatter([8.32],[-8.63],marker='x',s=90,color=orange,lw=2,zorder=6)
    ax.annotate('Current column removed',xy=(8.32,-8.63),xytext=(10.0,-8.54),fontsize=9,arrowprops={'arrowstyle':'-','color':orange},color=orange)
    ax.add_patch(Rectangle((6.415,-12.45),2.13,.8,fc='#d7c4ae',ec='#8d7662',lw=1))
    ax.text(7.48,-12.05,'Sofa repositioned',ha='center',va='center',fontsize=9)
    ax.add_patch(Rectangle((6.529,-10.045),1.912,.025,fc='#283934',zorder=6))
    ax.add_patch(Rectangle((10.13,-15.926),2.04,2.08,fc='#ebe2d7',ec='#aa9d90'))
    ax.text(11.15,-14.9,'Existing bed',ha='center',va='center')
    ax.add_patch(Rectangle((5.4,-15.86),1.8,1.8,fc='#e9dfce',ec='#b2a58e',alpha=.7))
    ax.text(6.3,-14.95,'Existing\ndesk area',ha='center',va='center')
    ax.annotate('New bearing media wall\n2.67 m long · 245 mm finished',xy=(7.3,-9.905),xytext=(5.25,-9.12),color=green,fontsize=10,arrowprops={'arrowstyle':'-','color':green})
    ax.annotate('',xy=(9.3,-10.45),xytext=(9.3,-8.93),arrowprops={'arrowstyle':'->','lw':2,'color':green})
    ax.text(9.45,-10.08,'1.00 m\nmain route',fontsize=9,color=green)
    ax.text(5.72,-10.6,'0.85 m',fontsize=9,color=green,ha='center')
    ax.text(11.5,-9.5,'Existing dressing\nroom / ensuite',ha='center',color='#666')
    ax.set(xlim=(4.75,14.2),ylim=(-16.6,-8.15),aspect='equal',title='Principal suite · layout option')
    ax.set_xlabel('Model X · metres');ax.set_ylabel('Model Y · metres');ax.grid(alpha=.12)
    # Section along the girder, with true floor/support levels.
    sec.add_patch(Rectangle((-16.306,-3.3),13.277,.3,fc='#b7bdc0',ec='#7e878d'))
    sec.add_patch(Rectangle((-10.0125,-3),.215,2.675,fc=green))
    sec.add_patch(Rectangle((-16.1035,-.325),6.306,.25,fc='#b7bdc0',ec='#7e878d'))
    sec.add_patch(Rectangle((-10.0125,-.075),.215,5.038,fc=green))
    sec.add_patch(Rectangle((-10.0125,4.963),.215,.215,fc='#839089',ec='#46594f'))
    sec.add_patch(Rectangle((-16.0535,5.188),10.7535,.318,fc=blue))
    for z,label in [(0,'Ground FFL 0.00'),(2.8,'First floor 2.80'),(5.55,'Loft FFL 5.55')]:
        sec.axhline(z,color='#777',ls=':',lw=.8);sec.text(-5.03,z+.05,label,fontsize=9)
    sec.plot([-8.63,-8.63],[-2.95,5.188],ls='--',color=orange,lw=1.6)
    sec.text(-8.48,1,'Column\nremoved',color=orange,fontsize=9)
    sec.annotate('215 mm bearing wall\ncontinuous through floor zone',xy=(-9.905,2.8),xytext=(-15.7,3.45),color=green,arrowprops={'arrowstyle':'->','color':green})
    sec.annotate('Widen existing garage/store wall',xy=(-9.905,1.25),xytext=(-15.7,1.6),color=green,arrowprops={'arrowstyle':'->','color':green})
    sec.annotate('Aligned cinema wall below',xy=(-9.905,-1.7),xytext=(-15.7,-1.4),color=green,arrowprops={'arrowstyle':'->','color':green})
    sec.annotate('250 mm RC slab\ndirectly over the wall',xy=(-10.0,-.2),xytext=(-7.8,-1.6),fontsize=9,arrowprops={'arrowstyle':'->','color':'#777'})
    sec.text(-12.8,5.75,'6.10 m span',ha='center',color=blue);sec.text(-7.6,5.75,'4.61 m span',ha='center',color=blue)
    sec.text(-13.1,4.7,'318 mm girder depth retained',color=blue)
    sec.scatter([-16.0035,-5.3],[5.15,5.15],marker='^',s=55,color='#535d61')
    sec.text(-16.0,4.72,'South\nwall seat',fontsize=8,ha='center',color='#535d61')
    sec.text(-4.8,4.72,'North transfer\nsteel connection',fontsize=8,ha='center',color='#535d61')
    sec.text(-15.7,-2.8,'Existing proposed basement raft · whole load path still to be designed',fontsize=9)
    sec.set(xlim=(-16.6,-2.1),ylim=(-3.6,6.2),aspect='equal',title='Section along girder · same floor and ceiling levels')
    sec.set_xlabel('Model Y · metres');sec.set_ylabel('Model Z · metres');sec.grid(alpha=.1)
    fig.suptitle('Wall-supported loft option  |  no deeper beam and no stair-side column',fontsize=18,x=.05,ha='left',y=.98)
    fig.text(.05,.035,'UNINSTALLED CONCEPT · Current floor-load patterns pass the limited gravity screen. Maximum wall reaction ≈125 kN before wall/roof and other-storey loads.\nPadstone, wall capacity, beam restraint, slab/wall/raft actions and full construction details remain to be verified.',fontsize=10,color='#635f58')
    fig.subplots_adjust(top=.9,bottom=.14,wspace=.16)
    fig.savefig(OUT/'wall-transfer-option.png',dpi=150,facecolor=fig.get_facecolor())
    fig.savefig(OUT/'wall-transfer-option.svg',facecolor=fig.get_facecolor())
    plt.close(fig)


if __name__=='__main__':
    OUT.mkdir(exist_ok=True);result,model=study()
    (OUT/'wall-transfer-option.json').write_text(json.dumps(result,indent=2)+'\n')
    draw(result,model)
    print(json.dumps({'installed':False,'cases':len(result['cases']),'pass':all(c['allWithinScreen']for c in result['cases']),
                      'maxWallULSKN':result['maxFloorReactionULSKN'],'supportAudit':result['supportAudit']}))
