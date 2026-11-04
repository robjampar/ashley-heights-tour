import json,re,hashlib
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2]
E=ROOT/'walkthrough/test-results/door-wall-junctions-2026-10-19'
web=(ROOT/'logs/door-wall-corner-web-tests.log').read_text()
python=(ROOT/'logs/door-wall-corner-python-tests.log').read_text()
assert 'ℹ pass 196' in web and 'ℹ fail 0' in web
assert re.search(r'Ran 106 tests.*?\nOK\n',python,re.S)
assert all(r['equal']for r in json.loads((E/'native-preservation.json').read_text()))
assert all(not r['unrelatedChanges']and r['navigationPreserved']for r in json.loads((E/'geometry-preservation.json').read_text()))
assert all(r['samples']==192 for r in json.loads((E/'corner-visual-quality-audit.json').read_text()))
assert 'Offline walkthrough built in dist/' in (ROOT/'logs/door-wall-corner-web-build.log').read_text()
assert '345 existing layout findings; no increase' in (ROOT/'logs/door-wall-corner-layout-baseline.log').read_text()
for variant in ('compact','planning'):
    manifest=json.loads((E/f'native-review/{variant}-corrected-manifest.json').read_text())
    source=ROOT/manifest['source']
    assert hashlib.file_digest(source.open('rb'),'sha256').hexdigest()==manifest['sourceSHA256']
    assert len(manifest['views'])==4
    assert all((E/'native-review'/view['image']).exists()for view in manifest['views'])
report=json.loads((E/'validation-summary.json').read_text())
report.update(completedAt=datetime.now(timezone.utc).isoformat(),viewerTests=196,pythonTests=106,totalTests=302,failures=0)
report['currentProvenance']=['door-wall-final-refresh.json','door-wall-cinema-refresh.json','door-wall-cinema-pier-refresh.json','door-wall-cinema-header-refresh.json']
report['nativeReview']={
    'completed':True,'currentViews':24,'totalImagesIncludingSupersededViews':40,
    'rooms':['family bathroom','cloakroom','prep kitchen','cinema','principal suite entrance','loft store'],
    'variants':['compact','planning'],'bothSides':True,
    'finding':'Cinema end pier was wholly inside north wall, and the adjacent header overlapped it by 27 mm, producing a dark coplanar patch exposed by the scribed head. Removed the covered pier, trimmed the header and rerendered both variants.',
    'geometryReview':'Visible frame junctions reviewed in neutral native diagnostic renders; no wall/frame penetration observed in the selected views.',
    'limitations':'Isolated native geometry and neutral inspection lighting, with leaves/furniture omitted. Not browser screenshots; browser rendering and room lighting review remain pending.',
    'gallery':'native-review/index.html',
}
(E/'validation-summary.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
