"""Original-house loft conversion, executed in the proposal builder globals.

Owns the original stacked loft stair, its local ceiling opening, rear dormer,
and connector north of the new wing. It never mutates retained original
meshes. The P4 roof module owns all pitched roofs and original roof revisions;
the front-wing module owns new-wing stairs and connector south of y=-4.
"""

new_ramps = globals().setdefault('new_ramps', [])
loft_floor = float(spec['loftFloor'])
loft_ceiling = float(spec['loftCeiling'])
loft_dormer = list(spec['rearDormer'])
loft_connector_full = [7.45, -9.0, 10.35, 4.5]
loft_bridge = [loft_connector_full[0], -4.0,
               loft_connector_full[2], loft_connector_full[3]]
# Proposal B (compact): the bridge is only the ridge band with 1.9 m headroom,
# so its walkable/decked extent follows the spec instead of the full connector.
if spec.get('loftBridgeWalkX'):
    loft_bridge[0], loft_bridge[2] = float(spec['loftBridgeWalkX'][0]), float(spec['loftBridgeWalkX'][1])
loft_stair_void = list(globals().get("loftstairvoid", [9.15, -4.0, 10.15, -0.95]))
loft_chimney_core = [9.88,5.215,10.92,6.385]
loft_chimney_roof_cut = [9.94,5.275,10.86,6.325]
# Owner (proposal B): the chimney comes out and the dormer runs on over its
# footprint to the original ridge end, so its stack, cap and pots are omitted
# and nothing is boxed or flashed for it.
loft_chimney_removed = bool(spec.get('removeChimney'))
loft_report = {
    'basis': 'P8 rear studio dormer held within the ridge run between the side-wing and original hip starts; original stairs remain the only loft access; heights are inferred',
    'floor_z': loft_floor, 'ceiling_z': loft_ceiling,
    'dormer': loft_dormer, 'connector_full': loft_connector_full,
    'module_connector_ownership': loft_bridge,
    'original_first_floor_rooms_preserved': True,
    'minimum_audited_clearance_over_existing_stair_m': 2.15714,
    'roof_lining_total_vertical_allowance_m': .25,
    'stair_void': loft_stair_void,
    'pitched_roof_owner': 'root roof module; this module creates no bridge or main-hip roof',
    'bridge_cheek_nominal_top_z': 7.50,
    'connector_west_knee_height_m': 1.05,
    'connector_garden_glazing': [10.28,-4.0,-.115,6.35,7.50],
}


def _loft_poly(r):
    return [[r[0], r[1]], [r[2], r[1]], [r[2], r[3]], [r[0], r[3]]]


def _loft_patches(rectangles, holes=()):
    """Disjoint rectangle cover of union(rectangles) minus union(holes)."""
    all_rects = list(rectangles)+list(holes)
    xs = sorted({v for r in all_rects for v in (r[0], r[2])})
    ys = sorted({v for r in all_rects for v in (r[1], r[3])})
    rows = []
    for ya, yb in zip(ys, ys[1:]):
        yc = (ya+yb)/2
        spans = []
        for xa, xb in zip(xs, xs[1:]):
            xc = (xa+xb)/2
            included = any(r[0] < xc < r[2] and r[1] < yc < r[3]
                           for r in rectangles)
            excluded_here = any(r[0] < xc < r[2] and r[1] < yc < r[3]
                                for r in holes)
            if included and not excluded_here:
                if spans and abs(spans[-1][1]-xa) < 1e-8:
                    spans[-1][1] = xb
                else:
                    spans.append([xa, xb])
        rows += [[a, ya, b, yb] for a, b in spans]
    # Merge identical spans vertically to avoid an unnecessary grid of objects.
    result = []
    for r in rows:
        previous = next((p for p in result if abs(p[0]-r[0]) < 1e-8
                         and abs(p[2]-r[2]) < 1e-8
                         and abs(p[3]-r[1]) < 1e-8), None)
        if previous is None:
            result.append(r)
        else:
            previous[3] = r[3]
    return result


def _loft_contour(headroom):
    """Conservative horizontal contour inside the original four roof planes."""
    fall = 8.05-(loft_floor+headroom+.25)
    return [-1.865-fall*3.63/2.7, 4.405-fall*4.685/2.7,
            10.62+fall*3.63/2.7, 4.405+fall*4.685/2.7]


def _loft_guard(name, a, b, z0, z1):
    glazing(name, a, b, z0, z1, T, max(1, round(math.dist(a, b)/1.0)))
    beam(name+' oak cap', (*a, z1), (*b, z1), .045, oak, T)


# Revise copies only; the source scene and geometry stay intact.
for original_ob in original_objects:
    if original_ob.type != 'MESH':
        continue
    original_name = original_ob.name
    # P4 central facade and pitched-roof reconstruction are owned by their
    # dedicated modules. Keeping roof copies here would restore obsolete roof
    # faces through the new occupied link.
    pass
# Owner: the loft is reached by the new flight beside the garden-facing
# glazing (built in the front module), not by a flight stacked over the
# original stair. The original landing ceiling and guards stay as built, and
# the loft bridge floor is cut where that flight arrives.
loft_stair_void = list(globals().get('loftstairvoid', [9.15, -4.0, 10.15, -0.95]))

# Deck only the useful roof/storage envelope. The four original knee walls
# close the low eaves, while navigation uses the smaller2m headroom contour.
knee_outline = _loft_contour(1.0)
standing_outline = _loft_contour(2.0)
_loft_holes = [loft_stair_void]+([] if loft_chimney_removed else [loft_chimney_core])
physical_patches = _loft_patches([knee_outline, loft_dormer, loft_bridge], _loft_holes)
for i, patch in enumerate(physical_patches):
    slab('Proposal | Original loft deck %02d' % (i+1),
         patch, loft_floor, .20, oak, T, False)
walk_patches = _loft_patches([standing_outline, loft_dormer, loft_bridge], _loft_holes)
for i, patch in enumerate(walk_patches):
    new_surfaces.append({'name': 'Proposal | Original loft clear floor %02d' % (i+1),
                         'polygon': _loft_poly(patch), 'z': loft_floor})
loft_report['knee_wall_contour_m'] = knee_outline
loft_report['original_roof_2m_contour_m'] = standing_outline
loft_report['navigable_floor_area_m2_north_of_new_wing'] = sum(
    (r[2]-r[0])*(r[3]-r[1]) for r in walk_patches)

def _loft_knee_edge(name, axis, fixed, start, end):
    # Do not carry an eaves wall through either new full-height roof opening.
    intervals = [(start, end)]
    for opening in (loft_dormer, loft_bridge):
        if axis == 'x':
            crosses = opening[0] <= fixed <= opening[2]
            lo, hi = opening[1], opening[3]
        else:
            crosses = opening[1] <= fixed <= opening[3]
            lo, hi = opening[0], opening[2]
        if not crosses:
            continue
        trimmed = []
        for a, b in intervals:
            if b <= lo or a >= hi:
                trimmed.append((a, b))
            else:
                if a < lo:
                    trimmed.append((a, lo))
                if b > hi:
                    trimmed.append((hi, b))
        intervals = trimmed
    # Over the side wing (x < 0) the front roof comes back with the wing's front setback, so the
    # front knee wall there steps back with it instead of standing through the lower slope
    # (owner, 24 Sep 2026, with the 900 mm setback).
    _sb=float(spec.get('sideWingFrontSetback_m',0)) if name.endswith('front knee wall') and axis=='y' else 0
    if _sb:
        split=[]
        for a, b in intervals:
            if a < 0 < b:split += [(a, 0.0), (0.0, b)]
            else:split.append((a, b))
        intervals = split
    for i, (a, b) in enumerate(intervals):
        if b-a < .02:
            continue
        f = fixed+_sb if (_sb and b <= 0) else fixed
        pa, pb = ([f, a], [f, b]) if axis == 'x' else ([a, f], [b, f])
        wall(name+' '+str(i+1), pa, pb, loft_floor, loft_floor+1.0, plaster, T, .10)
        if _sb and b == 0.0:   # a short return joins the two lines at the side wing's edge
            wall(name+' step', [0.0, fixed], [0.0, fixed+_sb], loft_floor, loft_floor+1.0, plaster, T, .10)

_loft_knee_edge('Proposal | Original loft west knee wall', 'x', knee_outline[0], knee_outline[1], knee_outline[3])
_loft_knee_edge('Proposal | Original loft east knee wall', 'x', knee_outline[2], knee_outline[1], knee_outline[3])
_loft_knee_edge('Proposal | Original loft front knee wall', 'y', knee_outline[1], knee_outline[0], knee_outline[2])
_loft_knee_edge('Proposal | Original loft rear knee wall', 'y', knee_outline[3], knee_outline[0], knee_outline[2])

# P8 rear dormer. It ends where the roof starts to slope on the end hips: the
# side-wing ridge start (x -1.865) and the original ridge end (x 10.62). The
# retained chimney (x 9.94..10.86) straddles the east hip start, so the east
# cheek stops 250 mm clear of it and the original stack is kept as built.
loft_hip_starts = [-1.865, 10.62]
dx0, dy0, dx1, dy1 = loft_dormer
assert loft_hip_starts[0]-.001 <= dx0 and dx1 <= loft_hip_starts[1]+.001, 'Dormer must stay within the ridge run between the hip starts'
assert loft_chimney_removed or dx1 <= loft_chimney_roof_cut[0]-.25 or dx0 >= loft_chimney_roof_cut[2]+.25, 'Dormer cheeks must stay clear of the retained chimney'
_dorm_t = white if (spec.get('dormerFinish') or {}).get('cladding')=='white' else black   # owner (22 September): white dormers
_wd_pw = spec['wingDormer'].get('passage_wall') if spec['wingDormer'].get('link_extension') else None
# Original ridge at y 4.405; the two slopes' underside either side of it.
_pitch = 2.7/4.685; _ry = 4.405
_zu = lambda y: 8.05-.25-_pitch*abs(y-_ry)
# Owner (22 September, later): both eaves-store doors moved 0.8 m north, which
# puts them inside the rear dormer's cheeks rather than the passage wall south
# of it. The cheeks then carry the openings; the head follows the original
# slope over the store, 100 mm below whichever is lower, slope or ceiling.
_door_in_cheek = bool(_wd_pw) and _wd_pw['door_y'][0] >= dy0-.001
if _door_in_cheek:
    _pdy = _wd_pw['door_y']; _gap = float(_wd_pw.get('head_gap_m', .10))
    _cdh = min(loft_ceiling, _zu(_pdy[0]), _zu(_pdy[1]))-loft_floor-_gap
    _chole = (dy1-(_pdy[0]+_pdy[1])/2, _pdy[1]-_pdy[0], 0, _cdh, 'open')
    perforated_wall('Proposal | Original loft dormer west cheek', [dx0+.09, dy1], [dx0+.09, dy0],
                    loft_floor, loft_ceiling, [_chole], _dorm_t, T, .18)
    perforated_wall('Proposal | Original loft dormer east cheek', [dx1-.09, dy1], [dx1-.09, dy0],
                    loft_floor, loft_ceiling, [_chole], _dorm_t, T, .18)
    solid_door('Proposal | Loft west store door', [dx0+.09, _pdy[1]], [dx0+.09, _pdy[0]], loft_floor, _cdh, oak, T, -math.pi/2)   # hinged north, swings west into the store
    solid_door('Proposal | Loft passage east wall door 0', [dx1-.09, _pdy[1]], [dx1-.09, _pdy[0]], loft_floor, _cdh, oak, T, math.pi/2)   # hinged north, swings east into the store
else:
    wall('Proposal | Original loft dormer west cheek', [dx0+.09, dy0], [dx0+.09, dy1],
         loft_floor, loft_ceiling, _dorm_t, T, .18)
    wall('Proposal | Original loft dormer east cheek', [dx1-.09, dy0], [dx1-.09, dy1],
         loft_floor, loft_ceiling, _dorm_t, T, .18)
if _wd_pw:
    # Owner (22 September): the east cheek carries on south along the loft
    # passage to the link's glazed face - a plain clad wall on the rear
    # dormer's line, with a low door at its north end into the eaves store
    # under the retained original hip. Below the passage cap it stands on the
    # original south slope, so at its south end it starts below the loft
    # floor, inside the eaves over the original front wall.
    _pwx = dx1-.09; _pdy = _wd_pw['door_y']; _gap = float(_wd_pw.get('head_gap_m', .10))
    _pdh = _cdh if _door_in_cheek else loft_ceiling-loft_floor-_gap   # full height, stopping short of the flat ceiling
    _pws = float(spec['wingDormer']['link_bounds'][3])-.12   # butts against the link glazing's north end
    # Owner (22 September): clad outside, plastered white on the passage side.
    _phole = (dy0-(_pdy[0]+_pdy[1])/2, _pdy[1]-_pdy[0], 0, _pdh)
    _pholes = [] if _door_in_cheek else [_phole]   # the door is in the cheek once it sits north of dy0
    perforated_wall('Proposal | Loft passage east wall cladding', [_pwx+.06, dy0], [_pwx+.06, _pws], loft_floor, loft_ceiling,
                    [h+('open',) for h in _pholes], _dorm_t, T, .06)
    perforated_wall('Proposal | Loft passage east wall', [_pwx-.03, dy0], [_pwx-.03, _pws], loft_floor, loft_ceiling,
                    [h+('door',) for h in _pholes], plaster, T, .12)   # hinged north, swings into the store
    wall('Proposal | Loft passage east wall base', [_pwx, -.115], [_pwx, .35], loft_floor-.35, loft_floor, black, T, .18)
    # Between the passage cap's end and the rear dormer the original ridge
    # runs over the wall: a wedge follows the two slopes' underside there.
    _wy0 = max(float(spec['wingDormer']['link_extension'][3]), _ry-(8.05-.25-loft_ceiling)/_pitch)
    if dy0 > _wy0+.02:
        _wys = [_wy0, _ry, dy0] if _wy0 < _ry < dy0 else [_wy0, dy0]
        _pv = [(x, y, loft_ceiling-.04) for x in (_pwx-.09, _pwx+.09) for y in _wys]
        _pv += [(x, y, _zu(y)) for x in (_pwx-.09, _pwx+.09) for y in _wys]
        n = len(_wys); b0, b1, t0, t1 = 0, n, 2*n, 3*n
        _faces = []
        for i in range(n-1):
            _faces.append((t0+i, t1+i, t1+i+1, t0+i+1))            # top strips
            _faces.append((b0+i, t0+i, t0+i+1, b0+i+1))            # west face
            _faces.append((b1+i+1, t1+i+1, t1+i, b1+i))            # east face
        _faces.append((b0, b1, t1, t0)); _faces.append((b0+n-1, t0+n-1, t1+n-1, b1+n-1))   # ends
        _faces.append(tuple(range(b0, b0+n))+tuple(reversed(range(b1, b1+n))))                   # bottom
        mesh('Proposal | Loft passage east wall ridge head', _pv, _faces, plaster, T)
    # The eaves store: the boarded loft beyond the wall, under the original
    # south slope and east hip, between the front and rear knee walls.
    _st = [dx1+.0, max(knee_outline[1]+.05, 2.29), min(knee_outline[2]-.05, 12.25), min(knee_outline[3], 6.57)]
    new_surfaces.append({'name': 'Proposal | Loft east eaves store floor', 'polygon': _loft_poly(_st), 'z': loft_floor})
    room('Loft east eaves store', _st, loft_floor, 3, 'Proposal · Loft', [_st[0]+.45, _pdy[0]+.2, loft_floor, .55, .8])
    loft_report['passage_east_wall'] = {'x': _pwx, 'door_y': _pdy, 'door_height_m': _pdh, 'store': _st}
    # Owner (22 September): the same on the west - the west cheek carried on
    # south to the front knee wall under the original south slope (its top
    # follows the slope's underside), with a matching low door into the west
    # eaves store between the cheek line and the west knee wall.
    _wwx = dx0+.09; _wy1 = knee_outline[1]
    def _raked_wall(name, x, ya, yb, z0, zfn, th=.18, material=plaster, collision=True):
        v = [(x-th/2, ya, z0), (x+th/2, ya, z0), (x+th/2, yb, z0), (x-th/2, yb, z0),
             (x-th/2, ya, zfn(ya)), (x+th/2, ya, zfn(ya)), (x+th/2, yb, zfn(yb)), (x-th/2, yb, zfn(yb))]   # box vertex order
        mesh(name, v, [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)], material, T)
        if collision: segment(name, [x, ya], [x, yb], z0, max(zfn(ya), zfn(yb)), th)
    _wdh = min(_zu(_pdy[0]), _zu(_pdy[1]))-loft_floor-_gap   # under the slope, same 100 mm gap
    if _door_in_cheek:   # the cheek itself carries the door; the raked wall runs solid to it
        _raked_wall('Proposal | Loft west store wall south', _wwx, _wy1-.05, dy0, loft_floor, _zu)
        _wdh = _cdh
    else:
        _raked_wall('Proposal | Loft west store wall south', _wwx, _wy1-.05, _pdy[0], loft_floor, _zu)
        _raked_wall('Proposal | Loft west store wall door head', _wwx, _pdy[0], _pdy[1], loft_floor+_wdh, _zu, collision=False)
        _raked_wall('Proposal | Loft west store wall north', _wwx, _pdy[1], dy0, loft_floor, _zu)
        solid_door('Proposal | Loft west store door', [_wwx, _pdy[1]], [_wwx, _pdy[0]], loft_floor, _wdh, oak, T, -math.pi/2)   # hinged north, swings west into the store
    _sw = [max(knee_outline[0]+.05, -3.5), max(knee_outline[1]+.05, 2.29), _wwx-.09, min(knee_outline[3], 6.57)]
    new_surfaces.append({'name': 'Proposal | Loft west eaves store floor', 'polygon': _loft_poly(_sw), 'z': loft_floor})
    room('Loft west eaves store', _sw, loft_floor, 3, 'Proposal · Loft', [_sw[2]-.45, _pdy[0]+.2, loft_floor, -.55, .8])
    loft_report['west_store_wall'] = {'x': _wwx, 'door_y': _pdy, 'door_height_m': _wdh, 'store': _sw}
_dwr = spec.get('dormerWindows', {}).get('rear')
if _dwr:
    # Owner (21 September): standard casements, evenly spaced, with framed,
    # insulated, clad panels between them instead of the continuous band.
    _n = int(_dwr['count']); _L = dx1-dx0
    _holes = [(_L*(i+.5)/_n, float(_dwr['width']), float(_dwr['sill']),
               float(_dwr['sill'])+float(_dwr['height']), 'window') for i in range(_n)]
    perforated_wall('Proposal | Rear dormer face', [dx0, dy1-.09], [dx1, dy1-.09],
                    loft_floor, loft_ceiling, _holes, _dorm_t, T, .18)
else:
    wall('Proposal | Original loft dormer sill', [dx0, dy1-.09], [dx1, dy1-.09],
         loft_floor, loft_floor+.60, black, T, .18)
    glazing('Proposal | Rear dormer window band', [dx0+.18, dy1-.055], [dx1-.18, dy1-.055],
            loft_floor+.60, loft_ceiling-.04, T, max(6,round((dx1-dx0-.36)/1.20)))
    wall('Proposal | Rear dormer window head', [dx0, dy1-.09], [dx1, dy1-.09],
         loft_ceiling-.045, loft_ceiling, black, T, .18)

# The flat rear dormer remains the original rear-reference conversion feature.
# P4's central connector now has a pitched roof owned by the roof module.
dormer_roof = [dx0-.10, dy0-.10, dx1+.10, dy1+.12]
slab('Proposal | Original rear dormer flat roof',
     dormer_roof, loft_ceiling+.22, .22, black, T, False)

# Low eaves edges open the loft into the continuous roof volume. Roof-module
# cheek closures seal only the actual external steps above adjoining slopes;
# a full-height opaque corridor wall is not required inside that envelope.
# Owner: the bridge's edge walls stop where the rear loft's own front knee
# wall line begins, so they no longer run on into that room.
_bridge_knee_end=min(3.54,knee_outline[1])
wall('Proposal | Original loft bridge west knee wall', [loft_bridge[0]+.07, -4.0],
     [loft_bridge[0]+.07, _bridge_knee_end], loft_floor, loft_floor+1.05, plaster, T, .14)
if not _wd_pw:   # with the passage's full-height east wall there is no knee wall
    wall('Proposal | Original loft bridge east north knee wall', [loft_bridge[2]-.07, -.115],
         [loft_bridge[2]-.07, _bridge_knee_end], loft_floor, loft_floor+1.05, plaster, T, .14)
# The four-metre external join overlooks the new open garden. Its lower
# sill and fixed glazing retain a closed weather envelope without a dark tube.
_loft_garden_side = loft_bridge[2] > 10.0   # the band reaches the courtyard glazing line
_loft_link_dormer = bool(spec['wingDormer'].get('link_bounds'))   # proposal B: the dormer's glazed face stands here instead
if not _loft_link_dormer:
    wall('Proposal | Original loft bridge garden sill', [loft_bridge[2]-.07, -4.0],
     [loft_bridge[2]-.07, -.115], loft_floor, loft_floor+(.80 if _loft_garden_side else 1.05), white if _loft_garden_side else plaster, T, .14)
_loft_wing_eave_x0=spec['frontWing'][0]-.20
_loft_wing_eave_x1=spec['frontWing'][2]+.20
_loft_main_ridge_x=(_loft_wing_eave_x0+_loft_wing_eave_x1)/2
_loft_main_slope=(float(spec['newWingRoof']['ridge'])-float(spec['newWingRoof']['eave']))/((_loft_wing_eave_x1-_loft_wing_eave_x0)/2)
_loft_garden_head=float(spec['newWingRoof']['ridge'])-abs(loft_bridge[2]-_loft_main_ridge_x)*_loft_main_slope-.35-.028
loft_report['bridge_cheek_nominal_top_z']=_loft_garden_head
loft_report['connector_garden_glazing'][-1]=_loft_garden_head
if _loft_garden_side and not _loft_link_dormer and _loft_garden_head>loft_floor+.95:
    glazing('Proposal | Loft garden-side glazing',[loft_bridge[2]-.07,-4.0],
        [loft_bridge[2]-.07,-.115],loft_floor+.80,_loft_garden_head,T,4)

# Close the narrow head above that glazing to the actual pitched soffit.
# The north cross-landing stays open into the rear dormer.
bridge_ridge_x = _loft_main_ridge_x
bridge_pitch = _loft_main_slope
def _loft_bridge_soffit(x):
    return float(spec['newWingRoof']['ridge'])-abs(x-bridge_ridge_x)*bridge_pitch-.35

for side, xa, xb in ([('east garden', loft_bridge[2]-.14, loft_bridge[2])] if _loft_garden_side and not _loft_link_dormer else []):
    verts = [(x,y,z) for y in (-4.0,-.115)
             for x,z in [(xa,_loft_garden_head-.015),(xb,_loft_garden_head-.015),
                         (xb,_loft_bridge_soffit(xb)),(xa,_loft_bridge_soffit(xa))]]
    mesh('Proposal | Loft link '+side+' pitched soffit closure',verts,
         [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),
          (2,3,7,6),(3,0,4,7)],white,T)

# The stacked flight over the original stair is withdrawn (owner); see the
# front module for the loft flight beside the garden-facing glazing.
# The chimney stays exactly as built: outside the dormer, its stack still
# rises through the original rear slope beside the east hip start. Below the
# roof the shaft is boxed in plaster up to the roof lining inside the low
# eaves storage zone, so no open flue face reaches the loft.
loft_chimney_inside_dormer = not (loft_chimney_core[2] <= dx0 or loft_chimney_core[0] >= dx1)
assert loft_chimney_removed or not loft_chimney_inside_dormer, 'Chimney must not be enclosed by the dormer'
def _loft_rear_slope_lining_z(y):
    # Original rear slope (ridge 8.05 at y 4.405, eave 5.35 at y 9.09) less
    # the 250 mm roof package; governs across the whole chimney footprint.
    return 8.05-(y-4.405)*2.7/4.685-.25
_loft_chimney_objects=[]
if loft_chimney_removed:
    for _o in original_objects:
        if _o.name in ('Chimney','Chimney cap') or _o.name.startswith('Chimney pot'):
            remove_from_proposal(_o,'Owner (proposal B): chimney removed so the rear dormer and loft use its footprint');_loft_chimney_objects.append(_o.name)
else:
    cx0,cy0,cx1,cy1=loft_chimney_core
    _core_top=lambda y:_loft_rear_slope_lining_z(y)+.06
    mesh('Proposal | Loft chimney core',
         [(cx0,cy0,loft_floor),(cx1,cy0,loft_floor),(cx1,cy1,loft_floor),(cx0,cy1,loft_floor),
          (cx0,cy0,_core_top(cy0)),(cx1,cy0,_core_top(cy0)),(cx1,cy1,_core_top(cy1)),(cx0,cy1,_core_top(cy1))],
         [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)],plaster,T)
    obstacle('Proposal | Loft retained chimney core',loft_chimney_core,loft_floor,8.05)

room('Loft studio and lounge',loft_dormer,loft_floor,3,'Proposal · Loft',
     [8.0,4.95,loft_floor,-1,.35])
room('Original loft bridge',loft_bridge,loft_floor,3,'Proposal · Loft',
     [8.4 if loft_bridge[2]>10.0 else (loft_bridge[0]+loft_bridge[2])/2,-.7,loft_floor,0,-1])
_v0,_v1,_v2,_v3=loft_stair_void
new_rooms[-1]['polygon_m']=([[7.45,-4.0],[10.35,-4.0],[10.35,_v1],[_v0,_v1],[_v0,_v3],[10.35,_v3],[10.35,4.5],[7.45,4.5]] if _v1>-4.0   # the void sits inside the bridge (flight rising north)
    else [[7.45,-4.0],[_v0,-4.0],[_v0,_v3],[10.35,_v3],[10.35,4.5],[7.45,4.5]])
new_views.extend([
 {'id':'proposal-loft-creative-studio','label':'Loft · creative workbench','group':'Proposal · Loft','position':[1.20,5.00,loft_floor],'direction':[-.55,.85]},
 {'id':'proposal-loft-shared-lounge','label':'Loft · shared lounge','group':'Proposal · Loft','position':[6.7,5.1,loft_floor],'direction':[-1,.45]},
 {'id':'proposal-loft-quiet-work','label':'Loft · quiet work area','group':'Proposal · Loft','position':[7.90,6.30,loft_floor],'direction':[1,.15]},
])

# Three shared-use zones along the 11.5 m room leave an uninterrupted southern
# gallery from the stair arrival. No rear-loft bedroom is generated.
sofa('Proposal | Loft shared sofa',4.30,7.30,3.15,0,loft_floor)
box('Proposal | Loft shared coffee table top',(4.30,6.12,loft_floor+.43),(1.38,.64,.07),oak,F)
for xx in(3.78,4.82):
 for yy in(5.93,6.31):beam('Proposal | Loft shared coffee table leg',(xx,yy,loft_floor+.035),(xx,yy,loft_floor+.395),.042,black,F)
obstacle('Proposal | Loft shared coffee table',[3.61,5.80,4.99,6.44],loft_floor,loft_floor+.47)
box('Proposal | Loft creative workbench top',(.55,7.52,loft_floor+.76),(2.90,.66,.075),oak,F)
obstacle('Proposal | Loft creative workbench',[-.90,7.19,2.00,7.85],loft_floor,loft_floor+.81)
# The quiet desk stands against the east cheek wherever that ends.
box('Proposal | Loft quiet desk top',(dx1-.48,6.60,loft_floor+.76),(.60,1.85,.075),oak,F)
obstacle('Proposal | Loft quiet desk',[dx1-.78,5.675,dx1-.18,7.525],loft_floor,loft_floor+.81)
# Storage follows the low front slope. Handles are reachable from the clear
# gallery; the room-height floor is never claimed under the low roof.
box('Proposal | Loft eaves archive storage',(2.65,3.55,loft_floor+.39),(5.50,.52,.78),oak,F)
obstacle('Proposal | Loft eaves archive storage',[-.10,3.29,5.40,3.81],loft_floor,loft_floor+.80)
box('Proposal | Loft studio supplies storage',(-1.29,6.05,loft_floor+.75),(.54,1.58,1.50),oak,F)
obstacle('Proposal | Loft studio supplies storage',[-1.56,5.26,-1.02,6.84],loft_floor,loft_floor+1.52)
loft_report['rear_dormer']={
 'hip_starts_x_m':loft_hip_starts,
 'clear_room_bounds_m':[dx0+.18,dy0,dx1-.18,dy1-.18],
 'gross_clear_area_m2':(dx1-dx0-.36)*(dy1-dy0-.18),
 'chimney_core_area_m2':0.0,
 'nominal_clear_height_m':loft_ceiling-loft_floor,
 'zones':['West creative workbench and supplies','Central shared lounge','East quiet work area','Front low-eaves archive storage'],
 'bedrooms_added':0,'floor_structure':'New loft floor over existing rooms and side wing; support design is not inferred from the model',
 'chimney':{'removed':True,'omitted_original_objects':_loft_chimney_objects,'basis':'Owner (proposal B): chimney removed; the dormer runs on to the original ridge end over its footprint'} if loft_chimney_removed else {'retained_plan_m':[10.04,5.375,10.76,6.225],'core_m':loft_chimney_core,'inside_dormer':False,'cheek_clearance_m':round(loft_chimney_roof_cut[0]-dx1,3),'stack':'Original chimney unchanged; boxed below the roof lining within the eaves storage zone','allowance':'Flue clearance to the new dormer cheek and lining remains a specialist check'},
}
# Routes enter the dormer west of the east cheek, which now stands at x 9.51.
# Routes start where the bridge band arrives; the compact band is narrower.
_loft_arrival=[9.55,3.90,loft_floor] if loft_bridge[2]>10.0 else [loft_bridge[2]-.45,4.10,loft_floor]
loft_report['clear_routes_m']={
 'loft_to_west_studio':[_loft_arrival,[9.10,4.10,loft_floor],[9.10,4.84,loft_floor],[6.70,4.84,loft_floor],[-.30,4.84,loft_floor],[-.30,6.60,loft_floor]],
 'loft_to_lounge':[_loft_arrival,[9.10,4.10,loft_floor],[9.10,4.84,loft_floor],[5.50,4.84,loft_floor],[5.50,5.65,loft_floor],[5.50,6.45,loft_floor]],
 'loft_to_east_work':[_loft_arrival,[9.10,4.10,loft_floor],[9.10,4.84,loft_floor],[dx1-1.99,4.84,loft_floor],[dx1-1.99,6.60,loft_floor]],
 'archive_access':[[6.70,4.84,loft_floor],[3.05,4.10,loft_floor]],
}
loft_report['stair_ramp_name']=globals().get('loftstairramp')
loft_report['removed_navigation_segments']=[]
globals()['proposal_loft_report']=loft_report
nav['proposalLoft']=loft_report
spec['loftProgramme']=loft_report['rear_dormer']
(OUT/'loft-review.json').write_text(json.dumps(loft_report,indent=2)+'\n')
