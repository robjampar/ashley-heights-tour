"""Stage only the public walkthrough with content-addressed cache-safe assets."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'walkthrough/dist'
DEST = ROOT / 'deployment/ashley-heights-tour/model'
OUT = ROOT / 'output-walkthrough'
sha = lambda data: hashlib.sha256(data).hexdigest()

assets = {}
redesign_ids = ('i1', 'i2', 'i3', 'e1', 'e2', 'e3')
model_files = ('house.glb', 'navigation.json', 'proposal-compact.glb', 'proposal-compact-navigation.json',
               'proposal-planning.glb', 'proposal-planning-navigation.json') + tuple(
                   name for option in redesign_ids for name in (f'redesign-{option}.glb', f'redesign-{option}-navigation.json'))
for name in (*model_files, 'style.css'):
    data = (DIST / name).read_bytes()
    stem, suffix = name.rsplit('.', 1)
    assets[name] = (f'{stem}.{sha(data)[:16]}.{suffix}', data)

app = (DIST / 'app.js').read_text()
for name in model_files:
    # The asset registry contains bare filenames; the loader adds './' at runtime.
    old = json.dumps(name)
    assert app.count(old) == 1, (name, app.count(old))
    app = app.replace(old, json.dumps(assets[name][0]))
app = re.sub(r'\n?//# sourceMappingURL=.*', '', app)
data = app.encode()
assets['app.js'] = (f'app.{sha(data)[:16]}.js', data)
html = (DIST / 'index.html').read_text()
for name in ('app.js', 'style.css'):
    assert html.count('./' + name) == 1, name
    html = html.replace('./' + name, './' + assets[name][0])

DEST.mkdir(parents=True, exist_ok=True)
# Keep superseded assets for a day while cached HTML ages out. Re-staging an
# unchanged candidate must not evict the still-published generation.
manifest_path = DEST / 'release.json'
previous = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
new_names = {name for name, _ in assets.values()}
now = datetime.now(timezone.utc).timestamp()
retained = {}
for name, info in {**previous.get('previous_assets', {}), **previous.get('assets', {})}.items():
    assert Path(name).name == name
    if name in new_names:
        continue
    expiry = info.get('retain_until_epoch', now + 86400)
    if expiry > now:
        retained[name] = {**info, 'retain_until_epoch': expiry}
    else:
        (DEST / name).unlink(missing_ok=True)
for name, data in assets.values():
    (DEST / name).write_bytes(data)
(DEST / 'index.html').write_text(html)
(DEST / 'THREE-LICENSE.txt').write_bytes((DIST / 'THREE-LICENSE.txt').read_bytes())
if (DIST / 'MESHOPT-LICENSE.txt').exists():
    (DEST / 'MESHOPT-LICENSE.txt').write_bytes((DIST / 'MESHOPT-LICENSE.txt').read_bytes())
# The comparison ships with immutable drawings, images, data and code too.
# Cached review HTML therefore cannot mix one model's plans with another issue.
review_source = DIST / 'redesigns'
review_dest = DEST / 'redesigns'
review_dest.mkdir(exist_ok=True)
review_options = json.loads((review_source / 'options.json').read_text())['options']
assert {option['id'] for option in review_options} == set(redesign_ids)
for option in review_options:
    candidate_nav = json.loads((DIST / ('redesign-' + option['id'] + '-navigation.json')).read_text())
    assert option['modelUpdatedAt'] == candidate_nav['modelUpdatedAt'], option['id'] + ' review/model issue mismatch'
review_map, review_manifest = {}, {}
review_files = {'review.css', 'options.json', 'six-options.pdf'}
for option in review_options:
    ident = option['id']
    review_files.update(f'images/{ident}-{camera}.jpg' for camera in ('front', 'rear', 'interior'))
    review_files.add(f'plans/{ident}/manifest.json')
    for plan in option['plans']:
        review_files.update(f'plans/{ident}/{plan[key]}' for key in ('file', 'detail'))
for name in sorted(review_files):
    source = (review_source / name).resolve()
    assert source.is_relative_to(review_source.resolve()), 'Review asset outside its directory: '+name
    relative = source.relative_to(review_source.resolve())
    data = source.read_bytes()
    target = relative.with_name(relative.stem + '.' + sha(data)[:16] + relative.suffix)
    review_map[relative.as_posix()] = target.as_posix()
    destination = review_dest / target
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(data)
    review_manifest[target.as_posix()] = {'bytes': len(data), 'sha256': sha(data)}
review_js = (review_source / 'review.js').read_text()
assert review_js.count('const asset=path=>path;') == 1
review_js = review_js.replace('const asset=path=>path;', 'const assets='+json.dumps(review_map)+';const asset=path=>assets[path]??path;')
review_name = 'review.' + sha(review_js.encode())[:16] + '.js'
(review_dest / review_name).write_text(review_js)
review_manifest[review_name] = {'bytes': len(review_js.encode()), 'sha256': sha(review_js.encode())}
# Apply the same cache-age window to review files. Only referenced assets are
# issued; editor duplicates and superseded sheets never enter a new release.
review_retained = {}
prior_review = previous.get('redesign_review', {})
for name, info in {**prior_review.get('previous_assets', {}), **prior_review.get('assets', {})}.items():
    candidate = (review_dest / name).resolve()
    assert candidate.is_relative_to(review_dest.resolve()), name
    if name in review_manifest:
        continue
    expiry = info.get('retain_until_epoch', now + 86400)
    if expiry > now:
        review_retained[name] = {**info, 'retain_until_epoch': expiry}
    else:
        candidate.unlink(missing_ok=True)
review_html = (review_source / 'index.html').read_text().replace('src="review.js"', 'src="'+review_name+'"')
for name in ('review.css', 'six-options.pdf'):
    assert name in review_map, 'Missing review asset: '+name
    review_html = review_html.replace('href="'+name+'"', 'href="'+review_map[name]+'"')
(review_dest / 'index.html').write_text(review_html)
easter_dest = DEST.parent / 'easter'
easter_dest.mkdir(exist_ok=True)
easter_html = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=../model/"><title>Ashley Heights</title><p><a href="../model/">Open the unified house tour</a></p><script>location.replace(new URL("../model/",location.href).href)</script></html>'
(easter_dest / 'index.html').write_text(easter_html)
nav = json.loads((DIST / 'navigation.json').read_text())
compact_nav = json.loads((DIST / 'proposal-compact-navigation.json').read_text())
planning_nav = json.loads((DIST / 'proposal-planning-navigation.json').read_text())
manifest = {
    'published_utc': datetime.now(timezone.utc).isoformat(),
    'model_updated_at': nav.get('modelUpdatedAt'),
    'source_native_sha256': sha((OUT / 'Ashley Heights.blend').read_bytes()),
    'source_geometry_sha256': sha((OUT / 'geometry.json').read_bytes()),
    'assets': {name: {'bytes': len(data), 'sha256': sha(data)} for name, data in assets.values()},
    'previous_assets': retained,
    'easter': {'path': '../easter/', 'delay_active_seconds': 0, 'trigger': 'house entry after automatic walk-over garden shed bow pickup', 'spawn_visibility': 'whole body outside current camera frustum with edge margin', 'game': 'unified tour with optional wave survival', 'weapons': {'bow': 1, 'pistol': 3, 'shotgun': 5, 'carbine': 7}, 'enemy_types': ['shambler', 'runner', 'brute', 'flanker'], 'concurrent_cap': {'desktop': 12, 'touch': 7}, 'html_sha256': sha(easter_html.encode())},
    # All three current designs; ?design=compact remains an alias of Proposed.
    'designs': {'existing':'./','proposed':'./?design=proposed','planning':'./?design=planning','proposal_label':compact_nav.get('designLabel'),
                'proposal_revision':compact_nav.get('designRevision'),'proposal_updated_at':compact_nav.get('modelUpdatedAt'),
                'proposal_native_sha256':sha((ROOT/'output-proposed-compact'/'Ashley Heights — Proposed (compact).blend').read_bytes()),
                'proposal_geometry_sha256':sha((ROOT/'output-proposed-compact'/'geometry.json').read_bytes()),
                'planning_label':planning_nav.get('designLabel'),'planning_updated_at':planning_nav.get('modelUpdatedAt'),
                'planning_native_sha256':sha((ROOT/'output-proposed-planning'/'Ashley Heights — Proposed (planning application).blend').read_bytes()),
                'planning_geometry_sha256':sha((ROOT/'output-proposed-planning'/'geometry.json').read_bytes())},
    'exterior_finishes': {'scope':'house-and-extensions','walls':['render-oak','brick'],
                         'roof':['dark','light'],'dormers':'always-tiled','per_design_preferences':True},
    'redesign_review': {'path': './redesigns/', 'options': {
        option: {'path': './?design='+option,
                 'model_updated_at': json.loads((DIST / ('redesign-'+option+'-navigation.json')).read_text())['modelUpdatedAt']}
        for option in redesign_ids}, 'assets': review_manifest, 'previous_assets': review_retained},
    'interactive_door_leaves': len(nav['interactiveDoors']),
    'optional_street_context': {'setting': 'Settings → Street & neighbours', 'default': 'off',
        'preference_shared_between_designs': True, 'walk_distance_beyond_gates_m': 50,
        'basis': 'Approximate road and low-detail neighbouring buildings from supplied site images'},
    'accuracy_note': 'Photo and plan reconstruction; unmeasured details remain estimates.'
}
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps(manifest, indent=2))
