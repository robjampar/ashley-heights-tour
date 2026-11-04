"""Export the canonical G01 sensitivity with current support coordinates."""
import json,sys
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.structure.vehicle_deck_study import strip_sensitivities
from scripts.structure.beam_analysis import loaded_steel_screen
cfg=json.loads((R/'proposal/specs/structural-floor-layout.json').read_text())['groundDeckStrategy']
cat=json.loads((R/'proposal/specs/structural-uk-catalog.json').read_text());section=next(s for s in cat['steel']+cat['coordinationSteel']if s['name']=='356x171x67')
cases=[]
for i,label in enumerate(('lower','reference','upper')):
 g=(.75,1,1.35)[i]*8.375+(.25,.5,.75)[i];q=(1.5,1.5,2)[i]*8.375
 cases.append({'scenario':label,'permanentLineKNm':g,'variableLineKNm':q,'screen':loaded_steel_screen(section,5.6525,[(0,5.6525,g)],[(0,5.6525,q)])})
study=strip_sensitivities(cfg)
out={**cfg,'mainGirderCases':cases,'slabStripStudy':study}
Path(__file__).with_name('ground-floor-option.json').write_text(json.dumps(cfg,indent=2)+'\n')
Path(__file__).with_name('ground-floor-calculations.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({'girderCases':len(cases),'stripCases':len(study['cases']),'spans':sorted(set(round(c['spanM'],5)for c in study['cases']))}))
