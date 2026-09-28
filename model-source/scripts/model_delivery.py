"""Lossless transport compression for model files on static hosting."""
from pathlib import Path
import gzip
import hashlib


def delivery_asset(name, payload):
    relative = Path(name)
    if relative.suffix == '.glb':
        packed = gzip.compress(payload, compresslevel=6, mtime=0)
        if gzip.decompress(packed) != payload:
            raise ValueError('Model compression round-trip failed')
        payload = packed
        suffix = '.glb.gz'
    else:
        suffix = relative.suffix
    digest = hashlib.sha256(payload).hexdigest()
    target = relative.with_name(relative.stem + '.' + digest[:16] + suffix)
    return target, payload
