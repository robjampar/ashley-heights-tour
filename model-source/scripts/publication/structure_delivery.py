"""Explicit, immutable structural runtime package for the published viewer."""
import hashlib
import json

FILES = ('index.html', 'studio.css', 'studio.js', 'model.json', 'trials.json',
         'members.json', 'member-schedule.json', 'pack.json', 'trial-pack.json',
         'coordination-pack.pdf', 'trial-study.pdf')


def package_structure(dist, model_path):
    payload = {name: (dist/'structure'/name).read_bytes() for name in FILES}
    members = json.loads(payload['members.json'])
    # Keep authored reports readable in source control. Ship the identical
    # JSON values without indentation to reduce download/parse and site cost.
    for name in FILES:
        if name.endswith('.json'):
            payload[name] = json.dumps(json.loads(payload[name]), separators=(',', ':'), ensure_ascii=False).encode()
    # The immutable package sits one directory below the stable structure URL.
    payload['index.html'] = payload['index.html'].replace(b'../?design=proposed', b'../../?design=proposed')
    token = b'../proposal-compact.glb'
    assert payload['studio.js'].count(token) == 1
    payload['studio.js'] = payload['studio.js'].replace(token, ('../../'+model_path).encode())
    hashes = {name: hashlib.sha256(data).hexdigest() for name, data in payload.items()}
    key = hashlib.sha256(json.dumps(hashes, sort_keys=True).encode()).hexdigest()[:16]
    return f'structure/{key}/', payload, members


def redirect_structure(prefix):
    target = './'+prefix.split('/')[1]+'/'
    return ('<!doctype html><html lang="en"><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            '<title>Ashley Heights | Structure</title>'
            f'<p><a href="{target}">Open structural workspace</a></p>'
            f'<script>const u=new URL({json.dumps(target)},location.href);'
            'u.search=location.search;u.hash=location.hash;location.replace(u.href);</script></html>').encode()
