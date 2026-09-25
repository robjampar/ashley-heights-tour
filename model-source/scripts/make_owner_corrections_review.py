"""Record applied owner corrections and the remaining measurable disagreements."""
import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough'
g=json.loads((OUT/'geometry.json').read_text())
e=g['exterior_owner_review'];s=g['stair_dining_owner_review']
audit=json.loads((OUT/'dimension-audit.json').read_text())
area=audit['area_checks'][-1]['model_internal_envelope_m2']
stamp=datetime.fromtimestamp((OUT/'Ashley Heights.blend').stat().st_mtime,ZoneInfo('Europe/London')).strftime('%d September %Y, %H:%M %Z')
text=f'''# Owner correction review

Native model saved **{stamp}**. The editable Blender, SketchUp and local walkthrough
are regenerated from the same geometry. Source photographs remain unchanged.

| Correction | Applied geometry / basis |
|---|---|
| Garden-room roof | Flat slab on the wall heads, with no curved crown. |
| Garden-room depth | Plan interior1.76m retained after owner clarified approximately1.7m. Garden-facing roof overhang {e['garden_front_overhang_m']:.2f} m; roof depth {e['garden_roof_total_depth_m']:.3f} m including walls and estimated rear eave. |
| Eastern boundary | Vegetation and trees, without a brick wall. |
| Extended rear garden | Timber fencing around the strip behind the neighbours; main rear niche wall retained from photos. |
| Gate approach | Curved open iron connectors and terminal piers replace the two solid returns. Main gatepost coordinates and4.03m clear opening retained; curved returns flare out toward an approximately {g['site']['gate_road_clear_width_m']:.2f} m road opening. |
| Outer gate piers | Both stone oval finials restored from the outside-gate photos; turned bases and shallow flutes modelled with estimated dimensions. |
| Front bays | Five joined window sections, no masonry posts between them or projecting masonry above. Shallow cap roofs rest at2.30m window heads. |
| Garage front | Parapet face aligns with the wall below; flat-roof edge is behind the brickwork. Overlapping wall-head face trimmed at parapet base. |
| Entrance porch | Owner selected A: canopy and support heights retained. Photo-refined width {g['porch_width_review']['roof_width_m']:.2f} m exposes the side lights. |
| Entrance doors | Taller leaves and revised panel rows, approximately {g['entrance_height_review']['leaf_height_m']:.2f} m high. Fanlight ellipse retained; shallow local ceiling reveal clears the raised crown. Heights remain photo estimates. |
| Landing arch | Head raised to {g['front_arch_review']['landing_head_m']:.3f} m with a local ceiling reveal; four columns by three rows beneath the curved fanlight. |
| Balcony | Side railings terminate beyond the doors at Y={e['balcony_side_rail_start_y_m']:.2f} m. |
| Rear service doors | Flat exterior surrounds replace inappropriate decorative crowns. |
| Stair enclosure | Flat wall face aligns with upstairs; tread width {s['stair_width_m']:.2f} m estimated from owner/photo evidence. Hollow underside and full-height cupboard door. |
| Landing airing cupboard | Six-panel door beside the main bathroom, separate from the existing linen cupboard. Closed cupboard doors remain visible in walkthrough. |
| Dining bay / balcony | Owner selected B: both projections reduced 300 mm, dining depth 4.90 m and balcony depth 2.30 m. Symmetry and refined glazing retained. These two depths intentionally differ from the printed plan. |
| Drawing-room rear doors | Six visible hinged leaves in three pairs. The nearest pair opens independently; the other four leaves remain closed. |
| Garage door | Complete rigid up-and-over assembly opens and closes with approach; applied panels centred on its backing and fixed tracks stay in place. |
| Kitchen oven | Complete tower faces south in its photographed corner; adjoining worktop and cupboard no longer overlap it. |
| Dining doorway | Two shell-headed display recesses with glass shelves on chamfered corner walls; scalloped shell edges and shallow oval/swag cornice relief added from source photos. |
| Bedroom4 shower | Missing return wall restored. Fixture cleanup now protects structural walls. |
| Plans | Lift footprint/downstairs cabin, upstairs floor hatch, both cupboards and garden roof outline shown. |

## Evidence

- [Interactive originals/render overlays](../photo-review/decisions/rooms.html?mode=overlay).
- [Fresh alignment sheets](Alignment%20overlays.pdf).
- [Front-bay detail](../photo-review/front-bay-proof/Front%20bay%20comparisons.pdf).
- [Entrance detail](../photo-review/entrance-exterior-after/Entrance%20exterior%20photo%20comparison.pdf).
- [Rear bay depth choices](../photo-review/rear-bay-alignment-proof/Rear%20bay%20symmetry%20and%20projection%20options.pdf).
- [Porch height choices](../photo-review/front-arch-proof/Porch%20A%20and%20B.pdf).
- [Gate connectors](../photo-review/gate-wings-after/Gate%20connector%20photo%20comparison.pdf).
- [Outer gate finials](../photo-review/gate-finials-after/Gate%20outer%20finials%20comparison.pdf).
- [Dimensioned floorplan](Dimensioned%20floorplan%201-100%20A3.pdf).

## Remaining differences

The photos and plan do not establish exact heights, wall thicknesses, recess depths,
joinery profiles, vegetation or finishes. Small camera-pose errors affect overlays.
Porch A is selected. Taller entrance leaves improve exterior alignment, while the retained hall camera and estimated ceiling height still produce some interior differences. The gate endpoint/photo mismatch remains visible. Dining and balcony centre lines remain 95 mm apart under the printed room-width constraints. Owner-selected B deliberately changes two labelled depths; the audit distinguishes 32 printed matches from two approved departures.
The final dining review still identifies a missing serving hatch and a small chair/sideboard overlap; these remain visible rather than being certified as resolved. Doorway-threshold checks do not certify all furniture intersections.
Bedroom4's combined short-window/exterior-top interpretation conflicts with the
current estimated storey/ceiling datum and is still under review.

The area comparison is {area:.2f} m² versus the plan's approximate290m² (excluding
the separately added5.83m² side annex). The clear map suggests9.30m body depth
versus9.05m from the room-based reconstruction. The site is1,246m² /0.308acres,
consistent with the owner's approximate0.3acres. These are documented differences,
not a claim of photographic or survey equivalence.
'''
# Keep technical prose readable when combining measured values with units.
for old,new in [('interior1.76m','interior 1.76 m'),('approximately1.7m','approximately 1.7 m'),('at2.30m','at 2.30 m'),('and4.03m','and 4.03 m'),('Bedroom4','Bedroom 4'),('remains294.93m²','remains 294.93 m²'),('approximate290m²','approximate 290 m²'),('added5.83m²','added 5.83 m²'),('suggests9.30m','suggests 9.30 m'),('versus9.05m','versus 9.05 m'),('is1,246m² /0.308acres','is 1,246 m² / 0.308 acres'),('approximate0.3acres','approximate 0.3 acres')]:text=text.replace(old,new)
(OUT/'Owner corrections.md').write_text(text)
print('OWNER_CORRECTIONS_REVIEW_SAVED',stamp)
