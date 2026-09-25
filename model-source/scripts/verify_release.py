"""Ensure the local viewer, editable exports and comparison pages are current."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import subprocess
import fitz

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'output-walkthrough'
native = OUT/'Ashley Heights.blend'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
geometry = json.loads((OUT/'geometry.json').read_text())
render_geometry_mtime=native.stat().st_mtime
organization_path=OUT/'assembly-organization.json'
if organization_path.exists():
    organization=json.loads(organization_path.read_text())
    if organization['geometry_sha256']==sha(OUT/'geometry.json'):
        assert organization['max_world_vertex_change_m']<1e-5
        render_geometry_mtime=organization['render_geometry_native_mtime']
checks = json.loads((OUT/'validation.json').read_text())
assert checks['status'] == 'passed'
assert checks['mesh_objects'] == len(geometry['objects'])
assert checks['dimension_checks_from_reopened_blend'] == 34
assert checks['printed_dimension_matches']==32 and checks['owner_approved_dimension_departures']==2
assert checks['closed_meshes'] == checks['mesh_objects']
circulation = json.loads((OUT/'circulation-current.json').read_text())
assert circulation['geometry_sha256'] == sha(OUT/'geometry.json')
assert circulation['threshold_intrusion_count'] == 0
routes = json.loads((OUT/'walking-routes.json').read_text())
expected_routes=40 if geometry.get('side_annex') else 36
assert routes['passed'] and len(routes['routes']) == expected_routes
assert routes['navigation_sha256'] == sha(ROOT/'walkthrough/public/navigation.json')
roof = json.loads((OUT/'roof-join-audit.json').read_text())
assert roof['geometry_sha256'] == sha(OUT/'geometry.json')
assert roof['unfilled_wall_head_samples'] == 0
if geometry.get('garden_flat_roof_review'):
    assert roof['garden_flat_roof_joins'] and roof['garden_flat_roof_unfilled_samples']==0
if geometry.get('side_annex'):
    assert len(roof['side_annex_joins'])==3 and roof['side_annex_unfilled_samples']==0
assert all(p['passes'] for p in roof['porch_column_supports'])
sketchup = json.loads((OUT/'sketchup-validation.json').read_text())
assert sketchup['dimension_checks_from_reopened_skp'] == 34
glbs = [OUT/'Ashley Heights.glb',ROOT/'walkthrough/public/house.glb']
assert len({sha(p) for p in glbs}) == 1, 'Outdated original source model'
# Native and public baseline assets remain untouched. Only generated dist GLBs
# change storage format; validate their decoded bytes instead of raw-file SHA.
baseline=json.loads((ROOT/'proposal/original-preservation.json').read_text())
for path,expected_sha in baseline['files'].items():
    assert sha(ROOT/path)==expected_sha, f'Original baseline changed: {path}'
assert sha(ROOT/'output-proposed-compact/Ashley Heights — Proposed (compact).glb')==sha(ROOT/'walkthrough/public/proposal-compact.glb'), 'Outdated proposed source model'
compression_check=subprocess.run(
    ['node',str(ROOT/'walkthrough/tools/verify-compressed-glbs.mjs')],
    cwd=ROOT/'walkthrough',capture_output=True,text=True,check=True)
compression_verified=json.loads(compression_check.stdout)
assert all(asset['byteExact'] and asset['checkedBufferViews']>0 for asset in compression_verified.values())
assert sha(ROOT/'walkthrough/public/navigation.json') == sha(ROOT/'walkthrough/dist/navigation.json')
assert sha(ROOT/'walkthrough/public/proposal-navigation.json') == sha(ROOT/'walkthrough/dist/proposal-navigation.json')
assert sha(ROOT/'output-proposed/navigation.json') == sha(ROOT/'walkthrough/public/proposal-navigation.json')
photos = json.loads((OUT/'photo-review-validation.json').read_text())
with fitz.open(OUT/'Photo comparison.pdf') as pdf:
    assert len(pdf) == photos['pages'] == len(json.loads((ROOT/'photo-review/views.json').read_text()))
for key in photos['views']:
    render = ROOT/'photo-review/walkthrough'/f'{key}.png'
    assert render.stat().st_mtime > render_geometry_mtime, f'Stale photo render: {key}'
browser = json.loads((ROOT/'walkthrough/tests/browser-results.json').read_text())
assert not browser['errors']
doors = json.loads((ROOT/'walkthrough/tests/doors/results.json').read_text())
assert not doors['errors']
assert doors['assemblies'] == 23 and doors['openings'] == 11
assert (ROOT/'walkthrough/tests/doors/results.json').stat().st_mtime > render_geometry_mtime
screenshots = list((ROOT/'walkthrough/tests/viewpoints').glob('*.jpg'))
nav=json.loads((ROOT/'walkthrough/public/navigation.json').read_text())
assert len(nav['interactiveDoors']) == doors['assemblies']
lighting = json.loads((ROOT/'photo-review/walkthrough-lighting/after/validation.json').read_text())
assert not lighting['errors'] and len(lighting['views']) == 5
assert (ROOT/'photo-review/walkthrough-lighting/after/validation.json').stat().st_mtime > render_geometry_mtime
expected_screenshots=len(nav['rooms'])*4+4
assert len(screenshots) == expected_screenshots
assert min(p.stat().st_mtime for p in screenshots) > render_geometry_mtime
rendered = json.loads((OUT/'rendered-walkthrough-validation.json').read_text())
assert rendered['status'] == 'passed'
assert rendered['source_native_sha256'] == sha(native)
assert rendered['source_geometry_sha256'] == sha(OUT/'geometry.json')
assert rendered['rendered_walkthrough_sha256'] == sha(OUT/'Ashley Heights Rendered Walkthrough.blend')
assert rendered['mesh_count'] == checks['mesh_objects']
assert rendered['maximum_world_coordinate_difference_m'] == 0
assert rendered['lighting_matches_render_photo_views']
assert rendered['renderer'] == 'CYCLES' and rendered['launcher_restores_rendered_shading']
overlays = json.loads((ROOT/'photo-review/alignment-overlays/overlay-validation.json').read_text())
assert overlays['overlays'] == photos['pages']
with fitz.open(OUT/'Alignment overlays.pdf') as pdf:
    assert len(pdf) == overlays['review_pages']
assert (OUT/'Alignment overlays.pdf').stat().st_mtime > render_geometry_mtime
artifacts = ['Ashley Heights.blend','Ashley Heights.skp','Ashley Heights.glb','Ashley Heights.usdz',
             'Ground floor.usdz','First floor.usdz','Ashley Heights Rendered Walkthrough.blend',
             'Photo comparison.pdf','Alignment overlays.pdf','Depth and area review.pdf',
             'Annotated aerial registration.pdf','Site plan registration.pdf','Site plan estimates.pdf']
files = {name:{'bytes':(OUT/name).stat().st_size,'sha256':sha(OUT/name)} for name in artifacts}
for name in ['Ashley Heights.skp','Ashley Heights.glb','Ashley Heights.usdz','Ground floor.usdz','First floor.usdz']:
    assert (OUT/name).stat().st_mtime >= render_geometry_mtime, f'Stale export: {name}'
report = {'verified_utc':datetime.now(timezone.utc).isoformat(),'revision':'R5',
          'native_meshes':checks['mesh_objects'],'native_dimension_checks':34,
          'printed_dimension_matches':checks['printed_dimension_matches'],
          'owner_approved_dimension_departures':checks['owner_approved_dimension_departures'],
          'sketchup_dimension_checks':34,'fresh_photo_comparisons':photos['pages'],
          'fresh_browser_viewpoints':expected_screenshots,'viewer_model_matches_export':True,
          'viewer_compression':compression_verified,'original_baseline_preserved':True,
          'proposal_viewer_matches_export':True,
          'alignment_overlays':overlays['overlays'],'selected_overlay_sheets':overlays['review_pages'],
          'door_threshold_intrusions':0,'walking_routes_passed':expected_routes,
          'unfilled_sampled_roof_joins':0,'roof_join_samples':roof['total_wall_head_samples'],
          'browser_errors':browser['errors'],'files':files,
          'interactive_door_leaves':doors['assemblies'],'interactive_door_openings':doors['openings'],
          'cycles_walkthrough_matches_native_geometry_and_photo_lighting':True,
          'cycles_launcher_interactively_tested':rendered['gui_launcher_interactively_tested'],
          'accuracy_note':'File consistency and geometry checks passed. Photographic equivalence is not claimed. The area and map-depth discrepancies remain documented.'}
(OUT/'release-validation.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='files'},indent=2))
