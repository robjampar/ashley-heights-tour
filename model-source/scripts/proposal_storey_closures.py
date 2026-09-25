"""Close exposed first-floor edges in the proposal's opaque external walls.

Ground walls finish at Z2.60 and first-floor walls start at Z2.80.  The
main-wing slab stops at the internal faces, leaving that external wall band
empty.  Fill only those omitted wall-thickness strips.  The full-height
entrance glazing, existing slab coverage and all apertures stay unchanged.
Executed by build_extension_proposal.py after proposal_envelope_details.py.
"""

_outer = spec['frontWing']
_ox0, _oy0, _ox1, _oy1 = _outer
_inner_south = _oy0 + .23
_inner_north = _oy1 - .23
_band_bottom, _band_top = 2.60, 2.80
_storey_band_records = []


def _opaque_storey_band(label, bounds, material, reason,
                        bottom=_band_bottom, top=_band_top):
    x0, y0, x1, y1 = bounds
    # Wall endpoints stay on the exact rectangle edges; no hidden overlaps
    # with the full-height south wall or the neighbouring closure strips.
    if x1 - x0 < y1 - y0:
        a, b = [(x0 + x1) / 2, y0], [(x0 + x1) / 2, y1]
        thickness = x1 - x0
    else:
        a, b = [x0, (y0 + y1) / 2], [x1, (y0 + y1) / 2]
        thickness = y1 - y0
    name = 'Proposal | Storey edge closure | ' + label
    wall(name, a, b, bottom, top, material, L, thickness)
    _storey_band_records.append({
        'name': name, 'boundsXY': bounds,
        'bottom': bottom, 'top': top,
        'material': material, 'reason': reason,
        'volumeM3': (x1 - x0) * (y1 - y0) * (top - bottom),
    })


_opaque_storey_band(
    'west garage and store',
    [_ox0, _inner_south, _ox0 + .23, float(spec['entranceBay']['y'][0])], white,
    'Close the visible slot above the garage and store; stop at the full-height entrance pier.',
)
_opaque_storey_band(
    'west study timber',
    [_ox0, float(spec['entranceBay']['y'][1])-.20, _ox0 + .23, _inner_north], oak,
    'Continue the timber facade between its separate ground and first-floor walls.',
)
_opaque_storey_band(
    'east main wing',
    [_ox1 - .23, _inner_south, _ox1, _inner_north], white,
    'Close the opaque floor edge above service-room doors and windows without covering them.',
)
_opaque_storey_band(
    'north courtyard corner',
    [_ox0, _inner_north, 5.50, _oy1], white,
    'Close only the north strip west of the attached landing slab, including the external corner.',
)
if not (spec.get('courtyard') or {}).get('overhang_fascia'):   # with the courtyard notch this old wall line is inside; the overhang fascia closes the real edge
 _opaque_storey_band(
     'north east wing',
     [10.35, _inner_north, _ox1, _oy1], white,
     'Close only the north strip east of the attached landing slab; shared landing openings stay clear.',
 )
_csy = float((spec.get('courtyard') or {}).get('facade_y', -4.0))   # the courtyard notch's facade line (22 September)
_opaque_storey_band(
    'attached landing east half-width',
    [10.35, _csy, 10.465, -.115], white,
    'The attached floor already closes the inner half of this wall; fill only its unsupported outer half.',
)
_opaque_storey_band(
    'attached loft east half-width',
    [10.35, _csy, 10.465, -.115], white,
    'Close the recessed brown loft-deck edge above the same wall; the inner half is existing deck.',
    bottom=5.35, top=5.55,
)

_storey_closure_report = {
    'revision': spec.get('revision', 'P5'),
    'source': 'scripts/proposal_storey_closures.py',
    'proposalOnly': True,
    'bands': _storey_band_records,
    'unchanged': [
        'Full-height west entrance glazing and its door apertures.',
        'Full-height entrance piers and the already continuous south facade.',
        'Courtyard connector west edge: existing slab already reaches its external face.',
        'East ground-floor internal garden: open sky, no anteroom envelope or roof.',
        'Attached north edge: meets the preserved original house.',
    ],
    'totalAddedVolumeM3': sum(r['volumeM3'] for r in _storey_band_records),
}
(OUT / 'storey-edge-closures.json').write_text(json.dumps(_storey_closure_report, indent=2))
g['proposal_storey_edge_closures'] = _storey_closure_report
print('PROPOSAL_STOREY_EDGE_CLOSURES', len(_storey_band_records), flush=True)
