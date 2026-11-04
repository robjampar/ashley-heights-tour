"""Verify the small post-build corrections without rewriting build history."""
from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import source_hashes,sha256
preserved=Path(__file__).parent/'pre-finish-inventory'
changes={
 'scripts/model/proposal_level_loft.py':'proposal_level_loft.full-build.py',
 'scripts/interiors/door_frame_details.py':'door_frame_details.full-build.py',
}
reports=[]
for variant in ('compact','planning'):
 cache=json.loads((ROOT/f'outputs/output-proposed-{variant}/build-cache.json').read_text())
 for source,before in changes.items():assert sha256(preserved/before)==cache['inputs'][source],source
 current=source_hashes(ROOT,variant)
 assert {p for p,v in current.items() if v!=cache['inputs'].get(p)}==set(changes)
 output_changes=[p for p,v in cache['outputs'].items() if sha256(ROOT/p)!=v]
 expected=[f'outputs/output-proposed-{variant}/navigation.json',f'walkthrough/public/proposal-{variant}-navigation.json']
 assert set(output_changes)==set(expected),output_changes
 reports.append({'variant':variant,'sourceChanges':[{'path':p,'fullBuildSHA256':cache['inputs'][p],'currentSHA256':current[p]} for p in changes],
                 'outputChanges':output_changes,'nativeAndGeometryUnchangedSinceFullBuild':True})
report={'scope':'Post-build source corrections split the Planning mixed-finish inventory, place the joined-landing shortcut on clear floor and retain frame names by doorway during visual refreshes. Frame naming changes only repeated regeneration; the original full-build frames remain intact. Current navigation records the inventory and shortcut changes. All native and base GLB outputs still match actual full-build hashes. Historical caches are untouched.',
        'reports':reports,'visualFixtureSourceSHA256':sha256(ROOT/'scripts/interiors/fixture_refinement.py')}
(ROOT/'walkthrough/test-results/level-loft-integration-2026-10-19/final-provenance.json').write_text(json.dumps(report,indent=2)+'\n')
print('PROVENANCE_PASS')
