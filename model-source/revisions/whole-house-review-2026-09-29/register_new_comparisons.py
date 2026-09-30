import json,hashlib
from pathlib import Path
from datetime import datetime,timezone
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1]
p=HERE/'proposals.json';d=json.loads(p.read_text());by={x['id']:x for x in d['items']}
base='revisions/whole-house-review-2026-09-29/model-comparisons/'
by['AH-014']['plan']=base+'AH-014/plan.svg';by['AH-014']['planCaption']='Proposed round-table plan from the preview coordinates. Eight dining chair positions and 400 mm pullback outlines; 1 m scale bar. Concept, not measured survey.'
for ident in ['AH-014','AH-058']:
 path=base+ident+'/clearances.json'
 if path not in by[ident]['sources']:by[ident]['sources'].append(path)
for x in d['items']:
 x.pop('proposalHash',None);x['proposalHash']=hashlib.sha256(json.dumps(x,sort_keys=True,ensure_ascii=False).encode()).hexdigest()
p.write_text(json.dumps(d,indent=2,ensure_ascii=False)+'\n')
cpath=HERE/'comparisons.json';comp=json.loads(cpath.read_text())
captions={
 'AH-014':'Owner-requested 1.70 m round oak pedestal table with eight chairs at the dining bay centre; pendant re-centred. Existing lounge, doors, windows and drinks cabinet retained. West-side serving access is tight: see the proposed plan and clearance record.',
 'AH-058':'Pool table moves into the west bay and sofa onto the north wall of the east bay. The separate TV/console is removed; bar and darts retained. The pool pendant moves with the table. Full cue rectangle fits, but simultaneous darts/circulation still needs review.',
 'AH-062':'Stacked machines replace the north tall cupboard, keeping both windows clear. The former machine bays become folding drawers and the former hamper becomes a ventilated drying cupboard. Sink and doors retained. Trade-off: broom/ironing storage and hamper are displaced; manufacturer stacking and ventilation details remain to be checked.'}
for ident,caption in captions.items():
 folder=HERE/'model-comparisons'/ident;manifest=json.loads((folder/'manifest.json').read_text());assert manifest['sourceUnchanged']
 manifest.update(status='visually-reviewed-local-design-study',proposalHash=by[ident]['proposalHash'],validationLimit='Concept study, not construction approval; further checks described in proposal')
 (folder/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
 comp['items'][ident]={'status':'ready',**{k:base+ident+'/'+file for k,file in [('before','before.png'),('after','after.png'),('manifest','manifest.json'),('preview','preview.blend')]},'caption':caption,'baseline':'Identified isolated native room study. Matched camera and render settings; original source file unchanged.','afterLabel':'After · separate 3D proposal'}
cpath.write_text(json.dumps(comp,indent=2)+'\n')
coverage={'updatedAt':datetime.now(timezone.utc).isoformat(),'ready':len(comp['items']),'total':100,'items':[{'id':x['id'],'title':x['title'],'status':'ready' if x['id'] in comp['items'] else 'preview modelling and matched renders pending','proposalHash':x['proposalHash'],'sources':x['sources']} for x in d['items']]}
(HERE/'model-comparisons/coverage.json').write_text(json.dumps(coverage,indent=2)+'\n')
lines=['# 20 substantial alternatives','', 'Local proposals for owner review. No accepted designs or publication changed.','']
for x in d['items']:
 if x.get('substantial'):lines += [f"## {x['id']} · {x['title']}",'',x['proposal'],'',f"Trade-off: {x['tradeoff']}",'',f"Check: {x['validation']}",'']
(HERE/'SUBSTANTIAL-OPTIONS.md').write_text('\n'.join(lines))
print('Registered',len(comp['items']),'native comparison pairs; all 100 proposals retained.')
