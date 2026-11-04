"""Uninstalled column-free comparison at the current LP02 girder axis."""
import json
from pathlib import Path
from scripts.structure.loft_loadpath import compare_scheme, CURRENT_MEMBERS

ROOT = Path(__file__).resolve().parents[2]


def study():
    catalog = json.loads((ROOT/'proposal/specs/structural-uk-catalog.json').read_text())
    cases = json.loads((ROOT/'proposal/specs/structural-trials.json').read_text())['scenarios']
    members = json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
    by = {e['id']: e for e in members['elements']}
    sections = {k: by[v]['steelProfile'] for k,v in CURRENT_MEMBERS.items()}
    sections.pop('main-south'); sections.pop('main-north')
    # Published British Steel UB dimensional properties. Added to this study
    # only; these do not replace sections in the live register.
    source = 'https://www.britishsteel.co.uk/wp-content/uploads/2026/02/british-steel-universal-beams-datasheet-190724.pdf'
    rows = [
        ('533x210x122',122,544.5,211.9,12.7,21.3,12.7,476.5,76043,3388),
        ('610x229x113',113,607.6,228.2,11.1,17.3,20,533,88936,3437),
        ('610x229x125',125.1,612.2,229,11.9,19.6,20,533,100228,3935),
        ('610x305x149',149.2,612.4,304.8,11.8,19.7,20,533,126738,9309)]
    for name,mass,depth,width,web,flange,root,flat,ix,iy in rows:
        catalog['coordinationSteel'].append(dict(name=name,family='UB',kgPerM=mass,
            depthMm=depth,widthMm=width,webMm=web,flangeMm=flange,rootMm=root,flatWebMm=flat,
            ImajorCm4=ix,IminorCm4=iy,WelMajorCm3=20*ix/depth,areaCm2=mass/.785,source=source))
    options=[]
    for name in ['305x305x129','305x305x240','533x210x122','610x229x113','610x229x125','610x305x149']:
        section=next(s for s in catalog['steel']+catalog['coordinationSteel'] if s['name']==name)
        fixed={**sections,'main':section}
        # Compare both the currently drawn transfer and a heavier transfer;
        # removing the column transfers its load into the end supports.
        for transfer in ['305x305x107','305x305x198']:
            fixed['north-transfer']=next(s for s in catalog['coordinationSteel'] if s['name']==transfer)
            result=compare_scheme(catalog,cases,main_x=8.32,post_y=None,fixed_sections=fixed,
                                  north_west_support=5.4,edge_supported=True)
            # Keep calculation samples in the evidence, not console output.
            result.update(mainSection=name,transferSection=transfer,
                additionalDownstandMm=section['depthMm']-318,
                beamUndersideZ=5.506-section['depthMm']/1000,
                installed=False)
            options.append(result)
    return dict(options=options,approvedForConstruction=False,installed=False,
        source=source,scope='Current floor loads and geometry only. No roof loads, concentrated equipment, dynamic floor response, lateral stability, joints, bearing masonry, foundations or support settlement are verified. Main-beam relative deflection omits movement of the supporting north transfer. The 10 mm total-deflection target is a study criterion, not a universal statutory limit.')


if __name__=='__main__':
    result=study();out=ROOT/'revisions/structural-bearing-openings-2026-10-27/column-removal.json'
    out.write_text(json.dumps(result,indent=2)+'\n')
    for o in result['options']:
        c=o['cases'][-1]
        print(o['mainSection'],o['transferSection'],c['allWithinScreen'],
              [(k,round(c['members'][k]['sls']['deflectionMm'],2),c['members'][k]['withinScreen'])for k in ('main','north-transfer')])
