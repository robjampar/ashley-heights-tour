"""Read-only CJ01 comparison requested after SW02; not an installed design.

Checks whether repeating the J-01 direction and extending the garage/store
bearing line is a plausible next layout. Keeps the accepted model untouched.
"""
import hashlib
import json
from pathlib import Path

from scripts.structure.beam_analysis import loaded_steel_screen

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'revisions/continuous-joist-line-2026-10-27'
MANUAL = 'https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf'


def study():
    paths = [ROOT / p for p in (
        'walkthrough/public/structure/members.json',
        'walkthrough/public/structure/model.json',
        'proposal/specs/structural-uk-catalog.json',
        'proposal/specs/structural-trials.json',
    )]
    members, model, catalog, trials = [json.loads(p.read_text()) for p in paths]
    by = {e['id']: e for e in members['elements']}
    west, east, south, line, north = 5.2325, 13.6775, -16.0035, -9.905, -3.3315
    south_span, north_span = line - south, north - line
    sections = sorted(catalog['steel'] + catalog['coordinationSteel'], key=lambda s: s['kgPerM'])
    scenarios = trials['scenarios']
    screens = {}
    # Both sides loading the new ground-floor head. The loft comparison uses
    # the larger full-width tributary as a conservative envelope: no credit
    # is taken for the entrance void or for reduced loading next to it.
    for name, span, tributary in (
        ('ground-opening-head', east - 9.455, (south_span + north_span) / 2),
        ('loft-cross-beam-envelope', east - west, (south_span + (-5.3 - line)) / 2),
    ):
        options = []
        for section in sections:
            cases = []
            for c in scenarios:
                result = loaded_steel_screen(section, span,
                    [(0, span, (c['floorGk'] + .15) * tributary)],
                    [(0, span, c['floorQk'] * tributary)])
                cases.append(dict(scenario=c['id'], **result))
            options.append(dict(section=section, cases=cases,
                                withinScreen=all(c['withinScreen'] for c in cases)))
        passing = next(o for o in options if o['withinScreen'])
        screens[name] = dict(spanM=span, tributaryM=tributary, options=options,
            lowestMassPassingShortlistSection=passing['section']['name'],
            shortlistMassKg=span * passing['section']['kgPerM'])
    joist = next(v for v in catalog['joists'] if v['name'] == 'JJI 300D')
    larger = next(v for v in catalog['joists'] if v['name'] == 'JJI 350D')
    # Existing finished ceiling and 31.5 mm lining come from the current model;
    # preserve the existing 25 mm service/installation allowance below steel.
    loft_candidate = next(o for o in screens['loft-cross-beam-envelope']['options']
        if o['section']['name'] == screens['loft-cross-beam-envelope']['lowestMassPassingShortlistSection'])
    loft_ceiling = 5.506 - loft_candidate['section']['depthMm'] / 1000 - .025 - .0315
    result = dict(id='CJ01', installed=False, approvedForConstruction=False,
        interpretation='Same I-joist direction on the main-wing floors; extend the named ground-floor wall line straight east to the rear exterior wall, bridging the open part.',
        originalJoist={k: by['M-J-01-009'][k] for k in ('id','name','axis','section','spacingMm','endSupports')},
        wall={k: by['M-BLOCK-4D5245A'][k] for k in ('id','name','bounds')},
        bearingLine=dict(yM=line, existingEndXM=9.455, proposedRearWallAxisXM=east,
                         broadOpeningApproxM=east-9.455),
        floorBays=[dict(name='Garage/utility to extended line', axisSpanM=south_span,
                       tableCandidate='JJI 300D at 400 mm centres', tableLimitM=joist['spansMm'][0]/1000),
                  dict(name='Extended line to northern gym facade', axisSpanM=north_span,
                       tableCandidate='JJI 350D at 400 mm centres', tableLimitM=larger['spansMm'][0]/1000,
                       exact300DAt400WithinTable=north_span<=joist['spansMm'][0]/1000),
                  dict(name='Loft south field', axisSpanM=south_span,
                       tableCandidate='JJI 300D at 400 mm centres', tableLimitM=joist['spansMm'][0]/1000),
                  dict(name='Loft north field to existing transfer', axisSpanM=-5.3-line,
                       tableCandidate='JJI 300D at 400 mm centres', tableLimitM=joist['spansMm'][0]/1000)],
        steelComparisons=screens,
        finishImpact=dict(currentMainWingFirstCeilingFaceM=5.1315,
                          candidateCeilingFaceM=loft_ceiling,
                          approximateLoweringMm=(5.1315-loft_ceiling)*1000,
                          reason='Maintain 31.5 mm lining and 25 mm space below the trial cross-beam; floor level unchanged.'),
        sources=[dict(url=MANUAL, location='Table 16, printed page 28; PDF page 15',
                      scope='Simply supported domestic floors under the stated uniform-load, restraint and vibration assumptions. Not approval of this building or flexible beam supports.')],
        limits=[
            'This is an uninstalled comparison, not a replacement of the approved SW02 model.',
            'Steel results are isolated, floor-only gravity envelopes using the existing project assumptions and section shortlist; they are not optimal or approved sizes.',
            'The 0.15 kPa joist allowance is a conservative assumed envelope. Actual product self-weight, partitions, baths and local concentrated loads need a supplier floor design.',
            'The wider loft beam would require traced end bearings, pier/padstone checks, lower-wall/garage-transfer and basement/foundation design. The current post cannot be removed solely on this result.',
            'Existing stair/entrance voids require local trimmers; repeated joist direction does not mean bridging openings.',
            'The east ground-floor bearing line reaches a window jamb: coordinate the padstone/return and window width rather than placing a support in glazing.',
            'The north first-floor bay exceeds the published 300D/400 mm table span. A deeper joist, another bearing or separately designed closer centres is required; no 300 mm-centre capacity is inferred.',
            'This comparison does not substitute timber for the suspended vehicle slab or retaining structure.',
        ],
        sourceHashes={str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in paths})
    return result, model


def draw(r, model):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib.patches import Rectangle, FancyArrowPatch
    fig, axes = plt.subplots(1,2,figsize=(13,9))
    fig.patch.set_facecolor('#f8f6f0')
    for ax,z,title in zip(axes,(1.2,3.7),('Ground floor · support for the first floor','First floor · support for the loft')):
        ax.set_facecolor('#f8f6f0');ax.set_aspect('equal');ax.set_xlim(4.65,14.4);ax.set_ylim(-16.8,-2.7);ax.axis('off')
        for e in model['elements']:
            a,b=e['bounds']
            if e['category']!='walls' or not a[2]<z<b[2] or a[0]>14 or b[0]<4.9 or a[1]>-3 or b[1]<-16.4:continue
            ax.add_patch(Rectangle(a[:2],b[0]-a[0],b[1]-a[1],fc='#c7cec9',ec='none'))
        ax.set_title(title,fontsize=14,color='#203d36',pad=20)
        for x in (5.8,6.8,7.8,8.8,10.2,11.2,12.2,13.2):
            for ya,yb in [(-15.7,-10.2),(-9.55,-5.5 if z>3 else -3.6)]:
                if ya>-10 and x<(7.35 if z>3 else 7.7):
                    yb=-8.85
                elif ya>-10 and z<3 and x<9.455:
                    yb=-4.6
                ax.add_patch(FancyArrowPatch((x,ya),(x,yb),arrowstyle='<->',mutation_scale=9,color='#7aadb5',lw=1.2,zorder=2))
        ax.text(4.72,-16.65,'South wall',fontsize=9,color='#586861')
        ax.text(14.1,-8.8,'Rear exterior wall',rotation=90,fontsize=9,color='#586861',ha='center')
    a=axes[0]
    a.add_patch(Rectangle((5.3275,-8.63),7.7-5.3275,3.12,fc='#f8f6f0',ec='#a07127',ls='--',lw=1.2,zorder=3))
    a.text(6.5,-7.05,'Entrance void\nabove retained',ha='center',fontsize=9,color='#8f6421',zorder=4)
    a.plot([6.15,9.455],[-9.905]*2,color='#217362',lw=7,solid_capstyle='butt',zorder=4)
    a.plot([9.455,13.6775],[-9.905]*2,color='#226f9b',lw=6,zorder=4)
    a.scatter([9.455,13.6775],[-9.905]*2,s=55,color='#253c35',zorder=5)
    a.text(7.7,-10.45,'Named wall retained',ha='center',fontsize=10,color='#217362')
    a.text(11.6,-10.5,'Wide opening below steel head\nabout 4.2 m between support axes',ha='center',fontsize=9,color='#226f9b')
    a.text(9.5,-13.3,'≈6.10 m joist bay\n300D / 400 mm table candidate',ha='center',fontsize=10,bbox=dict(fc='#f8f6f0',ec='none',alpha=.95))
    a.text(11.6,-6.6,'≈6.57 m north bay\n300D / 400 mm exceeds table\n350D / 400 mm is a candidate',ha='center',fontsize=9,bbox=dict(fc='#f8f6f0',ec='none',alpha=.95))
    a.annotate('Window jamb / bearing\nneeds coordination',xy=(13.6775,-9.905),xytext=(11.7,-8.7),ha='center',fontsize=8,arrowprops=dict(arrowstyle='->',color='#a07127'),color='#8f6421')
    a=axes[1]
    a.plot([5.2325,13.6775],[-9.905]*2,color='#226f9b',lw=6,zorder=4)
    a.scatter([5.2325,13.6775],[-9.905]*2,s=55,color='#253c35',zorder=5)
    a.plot([5.4,13.6775],[-5.3]*2,color='#7a8f88',lw=4,zorder=4)
    a.add_patch(Rectangle((5.2325,-8.63),7.35-5.2325,3.33,fc='#f8f6f0',ec='#a07127',ls='--',lw=1.2,zorder=3))
    a.text(6.3,-7,'Entrance\nvoid kept',ha='center',fontsize=9,color='#8f6421',zorder=4)
    a.text(9.5,-10.6,'Full-width cross-beam ≈8.45 m\nA substantial beam, not a standard lintel',ha='center',fontsize=10,color='#226f9b')
    a.text(9.5,-13.3,'≈6.10 m joist bay\nPreferred suite layout below retained',ha='center',fontsize=10,bbox=dict(fc='#f8f6f0',ec='none',alpha=.95))
    a.text(10.7,-7.6,'≈4.61 m joist bay',ha='center',fontsize=10,bbox=dict(fc='#f8f6f0',ec='none',alpha=.95))
    a.text(9.5,-4.65,'Existing northern transfer line',ha='center',fontsize=9,color='#586861')
    fig.suptitle('CJ01 · Repeated joists and a continuous wall / lintel line',fontsize=18,color='#203d36',y=.98)
    fig.text(.5,.045,'Schematic comparison · local trimmers omitted from diagram · uninstalled; gravity screens only',ha='center',fontsize=10,color='#775a31')
    fig.subplots_adjust(bottom=.09,top=.90,wspace=.12)
    fig.savefig(OUT/'comparison.png',dpi=150);fig.savefig(OUT/'comparison.svg');plt.close(fig)


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    r,m=study();(OUT/'study.json').write_text(json.dumps(r,indent=2)+'\n');draw(r,m)
    print(json.dumps({'baySpans':[v['axisSpanM'] for v in r['floorBays']],
                      'steel':{k:v['lowestMassPassingShortlistSection'] for k,v in r['steelComparisons'].items()},
                      'ceilingChangeMm':r['finishImpact']['approximateLoweringMm'],'installed':False}))


if __name__=='__main__':main()
