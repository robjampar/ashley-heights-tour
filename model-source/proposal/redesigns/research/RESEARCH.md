# Research and review approach

Checked 25 September 2026.

## Planning design basis

[Sevenoaks Residential Extensions SPD](https://www.sevenoaks.gov.uk/download/downloads/id/379/residential_extensions_spd_adopted_may_2009.pdf), especially sections 4-6: favour subordinate massing, retained gaps, compatible roof forms and materials. Rear dormers should remain below the ridge, proportionate to the roof and inset from its edges; the stated 200 mm minimum is not a guarantee of acceptable scale. New overlooking, excessive enclosure and lost neighbour light remain separate tests. Roof terraces add overlooking risk. Permeable paving and retained trees support the site strategy. Apply the SPD as guidance alongside current adopted policies, not as universal permitted-development limits. The old statutory and saved-policy references in the 2009 document require checking against current law and the adopted plan.

[Current Local Plan](https://www.sevenoaks.gov.uk/info/20069129/current_local_plan) and [adopted Allocations and Development Management Plan](https://www.sevenoaks.gov.uk/downloads/download/128/allocations_and_development_management_plan) are the policy starting point. The 2026 Regulation 19 consultation is an emerging plan, not evidence that it has replaced adopted policy.

Site designations in the existing project are partly owner-confirmed or assumed. The owner confirms this is outside the Green Belt. The study began with conservation-area, heritage, Article 4, flood and tree constraints unverified. The site-specific screening below updates conservation/Article 4 mapping, statutory heritage and river/sea flood mapping, and identifies a nearby tree order; local heritage and other flood sources remain open. Do not turn map screening into formal legal verification. A topographical/measured survey, tree survey, neighbour windows and technical design are needed before application drawings.

The [Formal Detached character assessment](https://www.sevenoaks.gov.uk/download/downloads/id/740/f_formal_detached.pdf), printed pages 273-277, explicitly places Ashley Close in **F05 Vine Avenue / Ashley Road**, not F04. It identifies detached two-storey houses, spacing, setbacks and mature planting as characteristic. The design response is to compare retained-front schemes, keep side gaps, and avoid assuming that a large new front wing is acceptable merely because its ridge is low. This is a character-area finding, not confirmation of a conservation-area designation for the property.

[Adopted residential parking guidance](https://www.sevenoaks.gov.uk/download/downloads/id/307/appendix_2_-_guidance_table_for_residential_parking.pdf) distinguishes parking provision by location and favours independent access. The owner's four outside spaces plus double garage are the design brief, not a claim that six spaces are a universal council minimum. Check each proposed bay with the others occupied, and retain a protected pedestrian route.

## Review interface research and sketch

[RoomSketcher versions](https://help.roomsketcher.com/hc/en-us/articles/360000570249-How-Can-I-Make-Different-Versions-of-a-Floor-Plan) keeps alternatives as separate projects. Its [project presentation](https://help.roomsketcher.com/hc/en-us/articles/33069938218781-What-is-a-Project-Presentation) combines plans and interactive viewing. Use the same useful separation here: preserve current designs, then group three internal and three complete alternatives. Keep floor plans at comparable scale with room names, furniture and dimensions.

User journey: open the six-option review, compare the principal trade-offs and plans, select a design, then inspect the actual 3D model with the same floor and viewpoint where possible. Return to comparison without losing selection. Show room counts and material planning limitations beside each option. Keep model/build internals out of this flow.

Initial interface sketch, before UI implementation:

```
Ashley Heights / Six new options              Current designs | 3D tour

[ Internal layouts ]                         [ Whole-house redesigns ]
I1 Garden kitchen   I2 Social east   I3 Garden principal
E1 Retained front  E2 Garden courtyard  E3 Short forecourt wing

Selected option: name + one-sentence purpose      Open 3D tour
7 bedrooms | en suites | garage + 4 outside | pool

[ Ground ] [ First ] [ Loft ] [ Cellar if any ] [ Site ]
Large dimensioned plan, retained/altered key       Room / change schedule

Why it works | Main compromise | Planning considerations
```

The card grid is for comparison; the tour retains its compact Design menu. Avoid six floating buttons over the 3D view. On a phone, stack the plan above the schedule and keep the design/floor selectors reachable.

## Site-specific map screening, 25 September 2026

The council's public ArcGIS datasets are independently accessible through its [TPO catalogue](https://www.data.gov.uk/dataset/301d7385-c9b1-4eac-9d0a-d10f4920a756/tree-preservation-orders-sdc-public), [conservation-area catalogue](https://www.data.gov.uk/dataset/f1e54aea-998c-41a9-99fe-c0d641fcd630/conservation-areas-sdc-public) and [Article 4 catalogue](https://www.data.gov.uk/dataset/e406eb68-4535-4bad-a27f-7fa82268ee8d/article-4-directions-sdc-public). Read-only queries used the existing model-to-British-National-Grid registration from the LIDAR terrain script. Query geometry, responses and the registration basis are retained locally in this research folder. These are approximate map checks, not a land-charge search or measured survey.

The reconstructed title polygon does not intersect the mapped conservation area: the nearest is The Vine, approximately 98 m away. The council's [current linked boundary PDF](https://www.sevenoaks.gov.uk/download/downloads/id/482/area_boundary.pdf), adopted 2009 and published 2019, visually corroborates Ashley Close being outside. The two nearby mapped Article 4 records, 20/009/ART4 and 20/007/ART4, do not intersect the plot (about 42 m and 89 m away respectively). This does not remove any conditions on earlier planning permissions or establish permitted-development rights.

The address-only TPO search returned no Ashley record, but a spatial search found **TPO 19 of 1987 (87/019/TPO)** beside the plot. The [council's order and plan](https://maps.sevenoaks.gov.uk/tpodocuments/87_019_TPO/87_019_TPO-Tree_Preservation_Order-TREE_PRESERVATION_ORDER.pdf), PDF pages 5-6, identifies T4 as cherry and G1 as seven lime, one beech and one birch, originally in the rear garden of 57 Hitchen Hatch Lane. The live GIS marks the order confirmed. The T4 map symbol overlaps the reconstructed east/rear title edge; the G1 map polygon lies about 1 m beyond the east side. GIS tree circles are symbols, **not measured crowns or root-protection areas**. Do not interpret the overlap as confirmation of tree ownership, stem position or legal order extent. A survey must identify the surviving trees and resolve pool excavation, paving, retaining walls, service trenches and construction access before fixing those elements.

The current [Environment Agency Flood Zones dataset](https://www.data.gov.uk/dataset/104434b0-5263-4c90-9b1e-e43b1d57c750/flood-map-for-planning-flood-zones1), queried through its linked OGC Features service, returns no Flood Zone 2 or 3 polygon within the reconstructed plot plus a 100 m margin. This supports a **Flood Zone 1 river/sea map screening**. It does not assess surface water, groundwater, sewers, reservoirs, future climate risk or basement suitability. The query and empty official response are saved locally.

The [Historic England NHLE dataset](https://historicengland.org.uk/listing/the-list/data-downloads) linked from its official Open Data Hub (item `767f279327a24845bf47dfe5eae9862b`, owner `gis_historicengland`) shows no listed-building point/polygon on the reconstructed plot. The nearest mapped listed building is [Vine View, Grade II, entry 1336376](https://historicengland.org.uk/listing/the-list/list-entry/1336376), about 269 m from the plot. No Building Preservation Notice, scheduled monument or registered park/garden was returned within the 500 m search envelope. This does not determine historic curtilage, setting effects or local listing. © Historic England 2026; contains Ordnance Survey data © Crown copyright and database right 2026.

The old local-list service denied public retrieval (403). The council's current linked Local List map loaded but requires affirmative acceptance of its terms before use; no terms were accepted. **Local-list status remains unverified.** Surface-water/groundwater risk and prior permission conditions also remain open. Green Belt status retains the owner's confirmation. Do not replace these remaining limitations with a blanket claim that all constraints are clear.

Review copy sketch before updating the interface: retain the existing Design Basis paragraphs; replace the all-unverified statement with the limited map findings, add one short paragraph linking the specific TPO and its implication for pool/groundworks, retain the parking guidance paragraph. Add a separate printed site-constraints page so the existing technical-check page remains legible.

Further review copy sketch: add one concise paragraph for river/sea and statutory-list map results, keep the local-list and other-flood-source limitations beside it, and extend the existing site-constraints PDF page without changing the comparison journey.

Natural England’s [official National Landscape/AONB dataset](https://www.data.gov.uk/dataset/8e3ae3b9-a827-47f1-b025-f08527a4e84e/areas-of-outstanding-natural-beauty-england) places the reconstructed plot outside Kent Downs, about 675 m from its mapped boundary. The complete returned polygon has a self-intersection away from the site; repairing it with Shapely make_valid gives the same minimum distance and zero plot overlap. The raw response, repair method and result are retained locally. This approximate map check does not assess development effects on its setting. © Natural England copyright; contains Ordnance Survey data © Crown copyright and database right 2026.

A further [EA surface-water spatial-planning present-day screen](https://www.data.gov.uk/dataset/dfd734fb-cc68-4229-b60d-8c0280398052/flood-map-for-planning-surface-water-spatial-planning-extents-present-day) and [2070s upper-end climate screen](https://www.data.gov.uk/dataset/9c081ecf-18c3-4c91-89b5-a3c1d0e5dbef/flood-map-for-planning-surface-water-spatial-planning-extents-climate-change) show no mapped extent across the approximate reconstructed plot. Their official WMS layers display nearby mapped extents to the north-east, providing a visible response rather than a blank service result. The 1-in-30 and combined 1-in-100/1-in-1000 layers were requested in each scenario. These are area-level screening datasets, not proof that this property or a proposed basement is safe from flooding. Groundwater, sewers, drainage changes and site-specific assessment remain open. The requests, raw map images and an approximate-title overlay are retained locally. © Environment Agency copyright and/or database right 2025. All rights reserved.
