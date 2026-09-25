"""Reject stale review photographs before assembling the comparison/PDF."""
import hashlib
import json


def verify_captures(root, option, model_updated_at):
    folder = root / 'walkthrough/public/redesigns/images'
    for view in ('front', 'rear', 'interior'):
        script = 'capture-redesign-interiors.mjs' if view == 'interior' else 'capture-redesigns.mjs'
        names = {
            f'walkthrough/public/redesign-{option}.glb',
            f'walkthrough/public/redesign-{option}-navigation.json',
            f'walkthrough/dist/redesign-{option}.glb',
            f'walkthrough/dist/redesign-{option}-navigation.json',
            'walkthrough/dist/app.js', 'walkthrough/dist/style.css', 'walkthrough/dist/index.html', f'walkthrough/tests/{script}',
            'walkthrough/tools/review-captures.mjs',
        }
        image = folder / f'{option}-{view}.jpg'
        record = json.loads(image.with_suffix('.jpg.capture.json').read_text())
        state = record['state']
        assert state['schema'] == 1 and state['option'] == option
        assert state['modelUpdatedAt'] == model_updated_at, f'{option} {view} capture issue is stale'
        assert set(state['inputs']) == names, f'{option} {view} capture input record is incomplete'
        for name, expected in state['inputs'].items():
            with (root / name).open('rb') as handle:
                actual = hashlib.file_digest(handle, 'sha256').hexdigest()
            assert actual == expected, f'{option} {view} capture is stale: {name}'
        assert hashlib.sha256(image.read_bytes()).hexdigest() == record['imageSHA256'], f'{option} {view} image changed'
