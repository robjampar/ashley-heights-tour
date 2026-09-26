"""Publish the small room review independently of native house rebuilds."""
from pathlib import Path
import hashlib
import json
import re


def stage_studio(source, destination, previous, now, retirement, authored, room='kitchen'):
    destination.mkdir(parents=True, exist_ok=True)
    sha = lambda value: hashlib.sha256(value).hexdigest()
    asset_map, manifest = {}, {}
    options = json.loads((source / 'options.json').read_text())
    assert len(options['options']) == 10
    selected_images={path for option in options['options'] for path in option['images'].values()}
    declared={p.relative_to(authored).as_posix() for p in authored.rglob('*') if p.is_file()}|{'room-model.js','studio.js','studio.css'}
    for option in options['options']:
        for design in ('proposed', 'planning'):
            assert (source / option['images'][design]).is_file()
    for path in sorted(source.rglob('*')):
        if not path.is_file() or path.name in ('index.html', 'model.html', 'plans.html', 'arrangements.html', 'studio.js'):
            continue
        if path.suffix not in ('.png', '.jpg', '.webp', '.svg', '.css', '.json', '.glb', '.js'):
            continue
        relative = path.relative_to(source)
        if relative.as_posix() not in declared:
            continue
        if relative.parts[0]=='images' and relative.as_posix() not in selected_images:
            continue
        payload = path.read_bytes()
        target = relative.with_name(relative.stem + '.' + sha(payload)[:16] + relative.suffix)
        asset_map[relative.as_posix()] = target.as_posix()
        dest = destination / target
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(payload)
        manifest[target.as_posix()] = {'source': relative.as_posix(), 'bytes': len(payload), 'sha256': sha(payload)}
    code = (source / 'studio.js').read_text()
    assert code.count('const asset=path=>path;') == 1
    code = code.replace('const asset=path=>path;', 'const assets=' + json.dumps(asset_map) + ';const asset=path=>assets[path]??path;')
    code_name = 'studio.' + sha(code.encode())[:16] + '.js'
    (destination / code_name).write_text(code)
    manifest[code_name] = {'source': 'studio.js', 'bytes': len(code.encode()), 'sha256': sha(code.encode())}
    html = (source / 'index.html').read_text().replace('src="studio.js"', 'src="' + code_name + '"')
    for name in ('studio.css', 'prompts.json'):
        html = html.replace('href="' + name + '"', 'href="' + asset_map[name] + '"')
    (destination / 'index.html').write_text(html)
    model_html = None
    if (authored / 'model.html').is_file():
        model_html = (source / 'model.html').read_text()
        for name in ('studio.css', 'room-model.js'):
            model_html = model_html.replace('="' + name + '"', '="' + asset_map[name] + '"')
        model_html = model_html.replace('<script type="module"', '<script>window.INTERIOR_ASSETS=' + json.dumps(asset_map) + ';</script><script type="module"')
        (destination / 'model.html').write_text(model_html)
    if (authored / 'bedroom.html').is_file():
        bedroom_html = (source / 'bedroom.html').read_text()
        for name in ('studio.css', 'room-model.js'):
            bedroom_html = bedroom_html.replace('="' + name + '"', '="' + asset_map[name] + '"')
        bedroom_html = bedroom_html.replace('<script type="module"', '<script>window.INTERIOR_ASSETS=' + json.dumps(asset_map) + ';</script><script type="module"')
        (destination / 'bedroom.html').write_text(bedroom_html)
    retained = {}
    for name, info in {**previous.get('previous_assets', {}), **previous.get('assets', {})}.items():
        candidate = (destination / name).resolve()
        assert candidate.is_relative_to(destination.resolve())
        if info.get('source') not in declared and re.search(r' \d+\.',info.get('source','')):
            candidate.unlink(missing_ok=True)
            continue
        if info.get('source','').startswith('images/') and info['source'] not in selected_images:
            candidate.unlink(missing_ok=True)
            continue
        if name in manifest:
            continue
        retired = retirement(info, now)
        if retired['retain_until_epoch'] > now:
            retained[name] = retired
        else:
            candidate.unlink(missing_ok=True)
    result = {'path': './interiors/'+room+'/', 'session': options['session'], 'options': len(options['options']),
              'images': len(selected_images), 'engine': 'Built-in image_gen', 'html_sha256': sha(html.encode()),
              'assets': manifest, 'previous_assets': retained}
    if model_html is not None: result['model_html_sha256'] = sha(model_html.encode())
    if (authored / 'bedroom.html').is_file(): result['bedroom_html_sha256'] = sha(bedroom_html.encode())
    if (authored / 'plans.html').is_file():
        plans_html = (source / 'plans.html').read_text().replace('src="studio.js"', 'src="'+code_name+'"')
        plans_html = plans_html.replace('href="studio.css"', 'href="'+asset_map['studio.css']+'"')
        (destination / 'plans.html').write_text(plans_html)
        result['plans_html_sha256'] = sha(plans_html.encode())
        floorplans = json.loads((source / 'floorplans/options.json').read_text())
        assert len(floorplans['options']) == 5
        result['floorplans'] = {'path': 'plans.html', 'options': 5, 'session': floorplans['session'], 'method': 'Measured model-based SVG floorplans'}
    if (authored / 'arrangements.html').is_file():
        arrangements_html = (source / 'arrangements.html').read_text().replace('src="studio.js"', 'src="'+code_name+'"')
        arrangements_html = arrangements_html.replace('href="studio.css"', 'href="'+asset_map['studio.css']+'"')
        (destination / 'arrangements.html').write_text(arrangements_html)
        result['arrangements_html_sha256'] = sha(arrangements_html.encode())
        arrangements = json.loads((source / 'arrangements/options.json').read_text())
        withdrawn = arrangements.get('reviewStatus') == 'withdrawn'
        result['arrangements'] = {'path': 'arrangements.html', 'options': 0 if withdrawn else len(arrangements['options']),
                                  'working_studies': len(arrangements['options']), 'status': arrangements.get('reviewStatus', 'review'),
                                  'session': arrangements['session'], 'method': 'Measured furniture studies; separate design review required'}
    return result
