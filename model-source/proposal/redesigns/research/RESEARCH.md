# Research and review approach

Checked 25 September 2026.

## Planning design basis

[Sevenoaks Residential Extensions SPD](https://www.sevenoaks.gov.uk/download/downloads/id/379/residential_extensions_spd_adopted_may_2009.pdf), especially sections 4-6: favour subordinate massing, retained gaps, compatible roof forms and materials. Rear dormers should remain below the ridge, proportionate to the roof and inset from its edges; the stated 200 mm minimum is not a guarantee of acceptable scale. New overlooking, excessive enclosure and lost neighbour light remain separate tests. Roof terraces add overlooking risk. Permeable paving and retained trees support the site strategy. Apply the SPD as guidance alongside current adopted policies, not as universal permitted-development limits. The old statutory and saved-policy references in the 2009 document require checking against current law and the adopted plan.

[Current Local Plan](https://www.sevenoaks.gov.uk/info/20069129/current_local_plan) and [adopted Allocations and Development Management Plan](https://www.sevenoaks.gov.uk/downloads/download/128/allocations_and_development_management_plan) are the policy starting point. The 2026 Regulation 19 consultation is an emerging plan, not evidence that it has replaced adopted policy.

Site designations in the existing project are partly owner-confirmed or assumed. The owner confirms this is outside the Green Belt. The study began with conservation-area, heritage, Article 4, flood and tree constraints unverified. The site-specific screening below updates conservation/Article 4 mapping and identifies a nearby tree order; the other checks remain open. Do not turn map screening into formal legal verification. A topographical/measured survey, tree survey, neighbour windows and technical design are needed before application drawings.

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

The local-list service denied public retrieval (403), so listed/local heritage checks remain open; flood risk also remains unverified. Green Belt status retains the owner's confirmation. Do not replace these remaining limitations with a blanket claim that all constraints are clear.

Review copy sketch before updating the interface: retain the existing Design Basis paragraphs; replace the all-unverified statement with the limited map findings, add one short paragraph linking the specific TPO and its implication for pool/groundworks, retain the parking guidance paragraph. Add a separate printed site-constraints page so the existing technical-check page remains legible.
