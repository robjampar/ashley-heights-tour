from pathlib import Path
R=Path(__file__).resolve().parents[2];D=Path(__file__).parent;old=R/'revisions/bedroom4-stair-suite-2026-10-22'
for file in ('prepare.py','export.py','check-original-scenes.py','render-integrated.py','run-visuals.py','check-served-assets.mjs'):
 s=(old/file).read_text().replace('bedroom4-stair-suite-2026-10-22','suite-layout-and-loft-use-2026-10-22').replace('output-bedroom4-stair-suite-','output-suite-layout-loft-')
 if file=='prepare.py':
  s=s.replace('from scripts.model.proposal_bedroom4_stair_suite import apply_bedroom4_stair_suite','from scripts.model.proposal_suite_layout_loft import apply_suite_layout_loft').replace('apply_bedroom4_stair_suite(ns)','apply_suite_layout_loft(ns)').replace("g['proposal']['loftStairFinish']=stair","g['proposal']['loftStairFinish']=nav['loftStairFinish']\ng['proposal']['suiteLayoutLoft']=nav['suiteLayoutLoft']")
 if file=='export.py':s=s.replace("scene['bedroom4_stair_suite_revision']","scene['suite_layout_loft_revision']")
 if file=='render-integrated.py':
  a=s.index('views=[');c=s.index('\nout=ROOT',a)
  s=s[:a]+"views=[('bedroom',[3.38,.68,4.38],[1.35,2.45,3.75]),('sitting',[.65,1.65,4.38],[-3.65,1.65,3.65]),('dressing',[-.7,2.5,4.38],[-1.3,3.85,3.85]),('bathroom',[-2.92,3.15,4.38],[-4.3,3.9,3.8]),('loft',[9,-.1,7.15],[7.8,-2.8,6.2]),('balcony',[10.8,12.2,5],[6.9,9.8,3.45]),('terraces',[4.5,16.2,6.2],[3,10.4,3.2])]"+s[c:]
 (D/file).write_text(s)
