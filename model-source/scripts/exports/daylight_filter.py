"""Condition sparse irradiance measurements without crossing room boundaries."""
import numpy as np


def filter_daylight(probes, measured):
    luminance = np.sum(measured * np.array([.2126, .7152, .0722]), axis=2, keepdims=True)
    result = .35 * measured + .65 * luminance
    for room_name in {p['room'] for p in probes}:
        ids = [i for i, p in enumerate(probes) if p['room'] == room_name]
        values = result[ids].copy()
        level = values.mean(axis=(1, 2))
        median = max(.02, float(np.median(level)))
        values *= np.clip(level, median * .5, median * 2)[:, None, None] / np.maximum(level[:, None, None], 1e-5)
        positions = np.array([probes[i]['position'] for i in ids])
        distances = np.sum((positions[:, None, :] - positions[None, :, :]) ** 2, axis=2)
        weights = np.exp(-distances / (2 * 1.25 ** 2))
        weights[distances > 2.8 ** 2] = 0
        weights /= weights.sum(axis=1, keepdims=True)
        result[ids] = np.einsum('ij,jkl->ikl', weights, values)
    return result
