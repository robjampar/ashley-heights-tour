"""Planning risk and opportunity rules evaluated against the two models.
Each rule returns a dict; adding a rule is one function appended to RULES."""
import math, re
from shapely.geometry import Polygon, box, Point, LineString
from shapely.ops import unary_union
from . import footprints as fp
from . import site as site_mod

SPD = 'Residential Extensions SPD (2009)'
GB = 'Development in the Green Belt SPD (2015)'


def _r(id, topic, policy, measured, threshold, verdict, fix, keys):
    return {'id': id, 'topic': topic, 'policy': policy, 'measured': measured, 'threshold': threshold, 'verdict': verdict, 'fix': fix, 'spec_keys': keys}


def _boundary_lines(model):
    return {s['name']: LineString([s['a'], s['b']]) for s in model.site.get('boundary_segments', [])}


def evaluate(ctx, ex, pr, schedule):
    """Every threshold below is quoted from the Sevenoaks Residential Extensions SPD (2009),
    the GPDO or a named standard; where a document gives no number the rule says so."""
    R = []
    site = pr.site_polygon; bl = _boundary_lines(pr)
    ex_gf, _ = fp.room_envelope(ex, 0.0); pr_gf, _ = fp.room_envelope(pr, 0.0); pr_ff, _ = fp.room_envelope(pr, 2.8)
    spec = pr.spec; nav = pr.nav
    gb = schedule['green_belt']
    west = bl.get('Western house boundary wall')
    # R01 Basement
    bb = box(*nav['proposalBasement']['outerBounds'])
    inside = bb.intersection(ex_gf).area / bb.area if bb.area else 0
    R.append(_r('R01', 'Basement beneath the new wing', GB + ' GB2 — applies only in the Green Belt', f'{bb.area:.0f} m² basement, {inside * 100:.0f}% within the original footprint; wholly below ground, no external openings',
                'Green Belt only. The Residential Extensions SPD has no basement policy.', 'red' if ctx.green_belt_module else 'green',
                'Not in the Green Belt (confirmed): an engineering matter for the basement impact assessment.', ['entertainmentBasement.outerBounds']))
    # R02 Scale
    R.append(_r('R02', 'Overall scale of the additions', SPD + ' 4.21–4.23 and the front-extension summary: "the scale should respect the scale of the building to which it is attached"',
                f"External floor area {gb['A']:.0f} m² existing, +{gb['B']:.0f} m² proposed ({gb['B'] / gb['A'] * 100:.0f}%)",
                'No numerical limit outside the Green Belt (the 50% figure in SPD chapter 3 applies to Green Belt sites only); a judgement on scale and character', 'amber',
                'Present the wing as the house\'s new principal elevation with the same eaves and ridge as the host (R03); assess the continued side-wing roof separately (R05).', ['newWing', 'sideWing', 'rearDormer', 'wingDormer']))
    # R03 Front extension
    fwd = ex_gf.bounds[1] - pr_gf.bounds[1]
    south = bl.get('Front south boundary wall'); d_road = pr_gf.distance(south) if south is not None else 0
    case = ctx.get('front_wing_case', {})
    R.append(_r('R03', 'New wing towards Ashley Close', SPD + ' 4.21: front extensions "may be acceptable" where e.g. "the extension is to a detached house, where there is no strong visual relationship with adjoining properties", or it would enhance an unexceptional street scene; 4.23: unduly prominent where houses share "a common building line"',
                f'Wing gable {fwd:.1f} m forward of the existing front wall, {d_road:.1f} m behind the front boundary wall, at the head of the cul-de-sac; detached house; no common building line across the turning head',
                'SPD 4.21 criteria (any may apply); roof "of the same form as the existing building" (front-extension summary)', 'amber',
                (case.get('summary') or '') + ' The SPD\'s own criteria support this: detached house, no strong visual relationship with a building line at the head of the close. Precedent: 23/01491/HOUSE (54 Hitchen Hatch Lane) was granted on the test of not "significantly lessen[ing] the set-back" of the street. The hipped roof matches the host form.',
                ['newWing.bounds', 'entranceBay.projection_m', 'frontage', 'forecourt']))
    # R04 Rear dormer — SPD 4.31, 4.35, 4.36, 4.45
    rd = spec.get('rearDormer') or [-1.75, 4.45, 10.505, 8.05]
    rd = rd.get('bounds', [-1.75, 4.45, 10.505, 8.05]) if isinstance(rd, dict) else rd
    hip_starts = (-1.865, 10.62)       # where the original ridge meets each hip (proposal_loft.py)
    side_gap = min(rd[0] - hip_starts[0], hip_starts[1] - rd[2])
    top = float((spec.get('wingDormer') or {}).get('roof_top_z', 7.86)); ridge = 8.05
    ok_ridge = top < ridge; ok_side = side_gap >= .20
    R.append(_r('R04', 'Rear dormer', SPD + ' 4.35: "proportionate in scale to the roof plane", "in line with existing doors and windows", "below … the ridgeline", "set back a minimum of 20 centimetres from the eaves and sides"; 4.36: disproportionate dormers "will not be allowed"; 4.31: must "not create the appearance of an extra storey"',
                f'{rd[2] - rd[0]:.1f} m wide; roof {top:.2f} m vs ridge {ridge:.2f} m ({"below" if ok_ridge else "NOT below"} the ridge); cheeks {side_gap * 1000:.0f} mm in from where the hips start',
                'Below the ridge; ≥ 200 mm from eaves and sides; proportionate (judgement); windows aligned with those below', 'amber' if ok_ridge else 'red',
                ('Meets the ridge test. ' if ok_ridge else 'Drop the dormer roof below the ridge. ') + ('' if ok_side else f'Pull each cheek in by {max(0, .20 - side_gap) * 1000:.0f} mm to reach the 200 mm side set-back. ') + 'Its full width is the judgement point under 4.31/4.36 (reads as an extra storey from the garden); breaking it into two dormers or setting the cheeks further in would answer that. Align the dormer windows with the first-floor windows (4.35, 4.45).',
                ['rearDormer.bounds', 'dormerWindows.rear']))
    # R05 Side wing roof
    R.append(_r('R05', 'Side wing and new wing roof heights', SPD + ' 4.20: a side extension "should not dominate the original building … introducing a lower roof on the extension"; 4.31: roof height increases "should be avoided"',
                'New wing ridge 8.05 m = original 8.05 m; the original roof is extended over the former-garage side wing. The 5.20 m ridge belongs to the separate projecting garage bay, not the side wing.',
                'No numerical set-down in the SPD; assess whether the side addition remains subordinate', 'amber',
                'Subordination needs a planning judgement. Precedent: 21/02393/HOUSE (60 Hitchen Hatch Lane) — committee accepted an extension "not set down from the ridge height of the main house" because it "would incorporate the existing roof form". If the officer still finds the wing dominant, lowering its ridge is the lever.', ['newWingRoof.ridge', 'garageBay.ridge_z']))
    # R06 Side gap
    d_west = pr_ff.distance(west) if west is not None else 9
    R.append(_r('R06', 'Two-storey side wing and the gap to No 3', SPD + ' 4.19: "a minimum of 1 metre between the side wall of a two storey side extension and the boundary for the full height"',
                f'First floor {d_west:.2f} m from the west boundary', '≥ 1.0 m', 'green' if d_west >= 1.0 else 'red',
                'Complies.' if d_west >= 1.0 else 'Move the first-floor side wall to ≥ 1 m from the boundary.', ['sideWing']))
    # R07 Terrace
    rt = nav.get('proposalRoofTerrace', {}).get('usable_bounds_m')
    if rt:
        rtb = box(*rt); d_rt = rtb.distance(west) if west is not None else 9
        screens = (nav.get('proposalRoofTerrace') or {}).get('privacy_screens') or (spec.get('roofTerrace') or {}).get('privacy_screens') or []
        ws = next((sc for sc in screens if sc.get('edge') == 'west'), None)
        R.append(_r('R07', 'Roof terrace and No 3', SPD + ' 5.4 and summary: roof terraces "should not directly overlook the windows or private amenity space of any adjoining dwelling"; 5.3: screen walls/fences may provide privacy',
                    f'Terrace {rtb.area:.0f} m² at +2.80, {d_rt:.1f} m from the west boundary; ' + (f"{ws['height_m']:.1f} m opal glass screen on the west edge" if ws else 'west edge open'),
                    'No direct overlooking; no numerical screen height in the SPD (1.7 m is its obscure-glazing height for windows, 5.3)', 'amber' if ws else 'red',
                    'Screen provided; verify oblique sightlines, neighbour levels and the effect of the screen itself.' if ws else 'Add a solid or obscure screen to the west edge.', ['roofTerrace.privacy_screens']))
    # R08 Spa and plant
    east = bl.get('Eastern planted boundary'); ht = nav.get('proposalHotTub', {}).get('external_bounds_m')
    if ht and east is not None:
        d_ht = box(*ht).distance(east)
        R.append(_r('R08', 'Spa, pool plant and Marlow Court', 'Sevenoaks ADMP EN2 (amenity); BS4142 for plant noise', f'Sunken spa {d_ht:.1f} m from the east boundary; plant location not yet drawn',
                    'No fixed distance; judged on amenity. A plant noise assessment is on the Sevenoaks validation list where plant is near neighbours', 'amber',
                    'Show the plant room (pavilion or basement) on the drawings and commission the noise assessment.', ['hotTub', 'pool']))
    # R09 Coverage
    bldg = fp.building_footprints(pr); ex_bldg = fp.building_footprints(ex)
    R.append(_r('R09', 'Garden retained', SPD + ' 4.39 (corner plots) / general amenity — no numerical coverage limit', f'Buildings {bldg.area / site.area * 100:.0f}% of the {site.area:.0f} m² plot (existing {ex_bldg.area / site.area * 100:.0f}%)',
                'No SPD figure; a large rear garden is retained', 'green', 'None needed.', []))
    # R10 Workshop
    if nav.get('proposalWorkshop'):
        ws_ = nav['proposalWorkshop']
        R.append(_r('R10', 'Garden workshop', 'GPDO 2015 Sch.2 Part 1 Class E(e): max 2.5 m high within 2 m of a boundary (benchmark only — it is part of this application); ' + SPD + ' garages and outbuildings summary: "subservient in scale and position"',
                    f"{ws_['outside_area_m2']:.1f} m², flat roof {ws_['roof_top_m']:.2f} m, {ws_['crawl_space_m']:.1f} m from both fences, at the far end of the garden",
                    '≤ 2.5 m within 2 m of a boundary meets the Class E height benchmark only; other limitations still apply', 'amber',
                    'Lower the roof to 2.5 m (ceiling 2.3 m) to meet that height benchmark; establish all other Class E criteria separately.', ['gardenWorkshopPlan', 'proposal_workshop.py']))
    # R11 Front wall
    # Existing front wall and No 3's adjoining wall: 26 brick courses = 1.95 m (owner count).
    wall_top = float((spec.get('frontage') or {}).get('wall_top_z', 1.95)); existing_top = 1.95
    R.append(_r('R11', 'Front boundary wall and gate', 'GPDO 2015 Sch.2 Part 2 Class A: walls adjacent to a highway ≤ 1 m without permission; ' + SPD + ' Boundaries section',
                f"Matching brick wall {wall_top:.2f} m with a sliding gate; existing brick wall {existing_top:.2f} m (26 courses), as No 3's",
                'Over 1 m adjacent to the highway needs permission (included in this application); judged on street character against the existing wall',
                'green' if wall_top <= existing_top + .01 else 'amber',
                'Keep the wall at the existing height and confirm the brick and mortar match.', ['frontage.wall_top_z', 'frontage.gate']))
    # R12 Parking
    R.append(_r('R12', 'Parking', 'ADMP Appendix 2 (parking standards)', f"{ctx['parking']['proposed_spaces']} spaces (existing {ctx['parking']['existing_spaces']}); permeable resin-bound surface",
                '4+ bedroom dwelling in a suburban location: 2 spaces (ADMP Appendix 2, as applied in 21/02393/HOUSE)', 'green', 'None needed.', ['forecourt']))
    # R13 Trees
    tr = [t for t in site_mod.trees(pr) if not t['new']]; near = []
    for t in tr:
        rpa = max(2.0, t['radius'] * 1.2); d = bldg.distance(Point(t['x'], t['y']))
        if d < rpa: near.append(f"{t['id']} ({t['kind']}, {d:.1f} m)")
    R.append(_r('R13', 'Trees and root protection', 'BS5837:2012 (RPA = 12 × stem diameter); ADMP EN1; TPO status unknown', 'Building footprints near modelled canopy buffers (not surveyed RPAs): ' + (', '.join(near) if near else 'none'),
                'No construction within an RPA without an arboricultural method statement', 'amber', 'Commission the BS5837 survey. The canopy-based proximity screen does not calculate a BS5837 RPA; it also includes retained footprints.', ['vegetation']))
    # R14 Materials
    if ctx.get('design_variant') == 'planning':
        R.append(_r('R14', 'Materials', SPD + ' Materials and Detailing (4.47 onwards)',
                    'Matching red-brown facing brick; slate roof; dark-framed glazing',
                    'Matching or clearly complementary', 'green',
                    'Approve brick, bond and mortar samples against the retained house.', ['materials']))
    else:
        # R14 Materials
        R.append(_r('R14', 'Materials', SPD + ' Materials and Detailing (4.47 onwards): extensions should normally match or complement the original', 'Limestone render on the new wing against the retained red-brown brick; slate roof',
                    'Matching or clearly complementary', 'amber', 'Precedent: 18/03527/HOUSE (41 Brattle Wood) — officers found "the new rendered finish" appropriate when re-facing a house in a Residential Character Area. Justify render as the finish of the new principal elevation, or face the wing in matching brick.', ['materials']))
    # R15 Porch / front character
    R.append(_r('R15', 'Porch, chimney and arched window removed', SPD + ' Porches (4.25 onwards): porches "have an important effect on the appearance of a dwelling"', 'Porch, arched landing window, central front wall and chimney removed; entrance moves to the new wing',
                'Judgement on the character of the host', 'amber', 'Explain in the DAS that the entrance moves to the new principal elevation; retain the chimney if the officer resists.', ['entranceBay', 'loftChimneyRemoved']))
    # R16 Windows to neighbours
    obscure = 'obscure' in (ctx.get('materials', {}).get('privacy', '') or '').lower()
    R.append(_r('R16', 'Flank windows towards neighbours', SPD + ' 5.3: overlooking may be resolved by "obscure glazed or non-opening windows (unless the parts … which can be opened are more than 1.7 metres above the floor)"',
                'East windows face Marlow Court; side-wing west windows face No 3' + ('; specified obscure-glazed below 1.7 m (PA-090)' if obscure else ''),
                'No direct overlooking of neighbours\' windows or private amenity space; officers also apply a 21 m back-to-back distance (21/02393/HOUSE) — it is not in the SPD', 'amber',
                'Identify each affected opening and its opening restriction in PA-090; verify remaining sightlines.' if obscure else 'Obscure-glaze below 1.7 m.', ['materials.privacy']))
    return R
