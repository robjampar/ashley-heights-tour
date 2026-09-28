# Local design review — 28 September 2026

Publication is held for your review and approval. The working copies remain local.

- [Explore all room studies](http://127.0.0.1:8765/interiors/leisure/)
- [Walk through Proposed](http://127.0.0.1:8765/?design=proposed)
- [Walk through Proposed · planning application](http://127.0.0.1:8765/?design=planning)
- [House brochure and photographic views](http://127.0.0.1:8765/brochure/)

The room studies offer preset views, an orbitable model, a measured plan and a link into the complete house. Where a room exists in both proposals, the design selector lets you compare them.

## What is included

Twenty-four developed study areas accompany the accepted kitchen/TV lounge and principal suite. Twenty-one apply to both proposals; the roof terrace, pool garden and workshop apply to Proposed only, preserving the existing differences between the two schemes.

| Area | Design to review |
| --- | --- |
| Formal lounge and dining | Fireplace sitting group, six everyday dining places, stored extension leaves and chairs for eight to ten, oak and limestone drinks cabinet |
| Bedrooms and bathrooms | Garden guest suite; Bedrooms 2, 3 and 4; family bathroom; side-wing suite; bedroom and ensuite above the principal suite |
| Loft | Flexible hobby tables, reading lounge, eaves storage, restored solid bedroom wall and finished connecting landings |
| Shared living | Upstairs family lounge, original office, cinema, wine bar and games room |
| Arrival and service spaces | Main entrance and halls, upper landings/library, cloakroom, utility, gym and double garage |
| Garden | Roof terrace, pool and hot-tub setting, pavilion seating, summer/changing room, outside WC, tool store and workshop |

Warm oak, limestone, ivory upholstery and bronze fittings carry through the rooms. Modelled details include appliance controls, keys and buttons, furniture seams, drawer interiors, handles, hinges, sockets, desk accessories and workshop fittings.

The double garage retains two cars and the forecourt has four outdoor parking spaces. The narrow existing balcony stays clear; its routes are retained alongside the furnished roof terrace. The accepted side garden TV lounge is preserved with the kitchen scheme.

## Your latest corrections

- **Gym:** both treadmills face the front gates again. The hall door moves 300 mm south and the adjacent internal window 200 mm south; the skirting follows the new doorway. Equipment positions preserve the two treadmill rear safety zones and the routes to the courtyard and utility. The bike, stored rower, dumbbells and bench remain. The extra cable tower stays omitted.
- **Entrance:** 320 mm-deep coat storage and a matching key/bag return wrap the wall corner. Hanging is end-on to suit the shallow depth.
- **Reading corner:** the chair and side table sit beneath the adjacent loft stair. Measured clearance is 2.03 m over the seat area and 2.47 m in front; the lamp is cordless on the table.
- **Original staircase:** oak treads, ivory risers/stringer and slim bronze balusters. A single continuous oak handrail now joins the flight, turn and landing; 34 original tread, winder, nosing and structural stair copies remain exact.
- **Side bedroom and ensuite:** revised internal partitions give 940/835 mm bedside spaces and a 665 mm bed-foot passage, with two bedside tables. The hall entrance moves north and the ensuite partition moves 350 mm west. Family-lounge seating remains.
- **Pool:** all three sun loungers rotate 180 degrees in their existing positions.
- **Workshop:** the approach stepping stones are removed; the existing garden strip path remains.
- **Hall doors:** the kitchen leaf, both family-room leaves and the cloakroom leaf share the modern flush oak/bronze treatment, with operating handles and hinges. Their existing structural openings and interactive IDs are preserved.
- **Exterior:** the Proposed entrance roof covers the masonry rake bands. The West recess upper facade follows the exterior finish selection outside and remains white inside.
- **Formal dining:** a 1.16 m-wide, 430 mm-deep drinks cabinet provides a limestone counter, lit display shelves, glassware, decanters, bottle cooler and closed storage; the six-, eight- and ten-place arrangements retain their routes.
- **Principal suite:** both fixed televisions are 1.882 × 1.059 m (85-inch class). The sofa screen is raised and offset 50 mm to clear the sofa and the full-house pendant when viewed from the desk. The larger 1.90 × 0.90 m sculptural limestone bath has coordinated bronze fittings, oak tray and a matching pedestal. The actual bath/shower gap is 775 mm, with a 740 mm checked walking band.
- **Loft suite:** hip-store shelves, their contents and the low eaves cupboards are removed. The normal entrance wardrobe remains.

## Expanded 97-page brochure

The owner selected **Proposed with brick facades**, not the Planning variant. The current edition contains 63 presentation images, 27 room-group plans and breakdowns, four whole-floor plans, four elevations and two site/context plans. Ten additional exterior views show the approach, road, neighbours, side and rear facades, outward views and aerials. Dark grey roof tiles and tiled dormer faces and cheeks accompany the brick finish.

The latest feedback is applied: formal lounge and office return to their earlier neutral schemes; Bedroom 2 keeps the oak bed wall and ivory headboard. Its only new accent is a subdued throw. The cinema, selected other bedrooms and pool-table room retain their accepted studies. The bar removes green upholstery and wall finishes in favour of ivory/stone fabric, light natural oak, limestone and bronze.

The images explore finishes and light with the built-in image-generation tool; plans and elevations show current exported model geometry. Neighbour context includes estimated heights and detail. **The new decoration studies are not yet integrated into the 3D model.** Blender currently fails during Metal startup. Source geometry and native files are unchanged, and nothing has been published.

The local gallery provides photographs, full-size drawings, links to their PDF pages and separate image/drawing downloads. Sources, prompts, selections and verification are recorded in `../brochure-spatial-2026-09-28/`. The previous 50-page edition is archived there. Separate planning drawing packs have not been reissued.

## Points to consider in your review

- The retained loft bridge has approximately **1.78–1.90 m headroom** along the tested walking line. Furnishing does not resolve that existing roof constraint.
- Cinema seating is **four generous places**. The room notes show the trade-off from the earlier six-seat arrangement.
- Several retained bedrooms, compact bathrooms and activity areas have single-file routes. The room plans distinguish ordinary use from occupied chairs, open drawers and equipment in use.
- All four garage front car doors cannot remain fully open while someone walks the entire garage. Closing a door restores the passing route.
- The garden rooms have intermediate steps to their raised floors. The workshop retains the existing 880 mm garden strip path.
- Proposed Planning retains its existing scope: it does not gain the Proposed pool garden, shared roof terrace or workshop through this interiors update.

These are developed design concepts for review. The existing drawing PDFs have not been reissued as part of the furniture and walkthrough work.

## Verification

Both complete models pass the native comparison against all 24/21 room studies. All 945 principal-suite meshes match the accepted suite exactly in each model; all 25 TV and nine privacy rays pass per variant. The revised gym, arrival, formal dining and loft-suite doors and use routes pass in both designs. The preservation audit reports zero unexpected changes.

The existing full tours, seven affected study areas and principal-suite studies passed the earlier desktop/mobile browser checks. All 112 exterior-face checks, 116 viewer unit tests and 83 Python tests passed for that model revision. Evidence is recorded in `review-round-2/verification-summary.json`.

The current 97-page PDF has been rendered and visually inspected. Final checks include the restored headboard, lighter bar and corrected garage, landing and roof-terrace plans. Text bounds, paragraph spacing, contents links, gallery file references, downloads and source-model preservation are recorded in `../brochure-spatial-2026-09-28/qa/verification.json`. Browser access remains unavailable after denied navigation, so the updated gallery has not been tested live in a browser. The existing server was observed listening on port 8765.

## Architectural photography and editorial refinement

The current edition includes four full-width photographic elevations, each followed by its unchanged model-derived reference drawing. Across the entrance courtyard uses a new roof correction against its exact model camera. The entrance-gallery page now pairs the complete front door and gable window with a view through the glazed link towards the original hall.

Repeated decoration disclaimers in the main captions have been replaced with useful room-specific notes; the image labels still identify visual studies. Each room photograph in the local gallery links directly to its room plan, and each photographic elevation links to its reference drawing. Image dimensions are intrinsic so the tall entrance picture remains uncropped.

Current count: 97 pages, 63 selected images and 37 drawings. All pages were rendered and visually reviewed, with full-page checks of the photographic elevation, courtyard and entrance pages. PDF navigation, 916 local file references, 48 room-plan links, four elevation-reference links, archive integrity and unchanged model hashes pass. Detailed receipts and prompt history are in `revisions/brochure-spatial-2026-09-28/corrections/`; canonical verification is updated at `qa/verification.json`. Browser access was not retried. Nothing has been published, and the native model remains unchanged.
