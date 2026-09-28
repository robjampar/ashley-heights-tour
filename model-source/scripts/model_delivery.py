"""Lossless transport compression for model files on static hosting."""
from pathlib import Path
import gzip
import hashlib
import json
import os
import tempfile


CACHE = Path(__file__).resolve().parents[1] / 'walkthrough/.cache/delivery'


def atomic_write(path, payload):
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as handle:
        temporary = Path(handle.name)
        handle.write(payload)
    try:
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


def compressed_model(payload, cache_dir):
    source_sha = hashlib.sha256(payload).hexdigest()
    cache_dir = Path(cache_dir)
    cache_dir.mkdir(parents=True, exist_ok=True)
    base = cache_dir / ('gzip6-v1-' + source_sha)
    packed_path, metadata_path = base.with_suffix('.gz'), base.with_suffix('.json')
    try:
        metadata = json.loads(metadata_path.read_text())
        packed = packed_path.read_bytes()
        if (metadata['source_sha256'] == source_sha and
                metadata['packed_sha256'] == hashlib.sha256(packed).hexdigest()):
            return packed
    except (OSError, ValueError, KeyError, TypeError):
        pass
    packed = gzip.compress(payload, compresslevel=6, mtime=0)
    if gzip.decompress(packed) != payload:
        raise ValueError('Model compression round-trip failed')
    atomic_write(packed_path, packed)
    atomic_write(metadata_path, json.dumps({'source_sha256': source_sha,
                 'packed_sha256': hashlib.sha256(packed).hexdigest()}).encode())
    return packed


def delivery_asset(name, payload, cache_dir=CACHE):
    relative = Path(name)
    if relative.suffix == '.glb':
        payload = compressed_model(payload, cache_dir)
        suffix = '.glb.gz'
    else:
        suffix = relative.suffix
    digest = hashlib.sha256(payload).hexdigest()
    target = relative.with_name(relative.stem + '.' + digest[:16] + suffix)
    return target, payload
