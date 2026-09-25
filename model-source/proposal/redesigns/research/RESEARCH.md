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

## Extension-guidance check against the final concepts

The [Residential Extensions SPD](https://www.sevenoaks.gov.uk/download/downloads/id/379/residential_extensions_spd_adopted_may_2009.pdf), paragraphs 4.12–4.20 and 4.35–4.37, guides roof form, rear depth, side gaps and dormers. Flat roofs need a locally supported case. A 1 m side-wall gap is a guide, with context potentially requiring more. Rear depth depends on neighbours and levels; 4 m is general guidance for detached houses close to neighbours. Dormer scale, roof insets and privacy still matter. These are not automatic approval thresholds.

Model comparison: E1 has a 3.8 m rear addition; E2 has a 3.2 m side rear projection and a much longer low leisure wing; E3 has a 3.2 m rear addition but a significant front wing. E1–E3 side-roof eaves are approximately 1.3–1.4 m inside the reconstructed boundary. Their low flat rear roofs remain a design-justification issue; retained original flat-roof parts do not themselves prove a favourable planning decision. E1/E2 dormer geometry is below the original ridge and inset from eaves, but massing, alignment and overlooking remain unverified.

## Historic permissions and property flags, 25 September 2026

The council's [property history](https://pa.sevenoaks.gov.uk/online-applications/propertyDetails.do?activeTab=relatedCases&keyVal=000VKWBKLI000) associates four historic planning records with Ashley Heights. The current address index is not proof that each decision concerns the present house or its exact title. The notices were read in Chrome from the council's public document links; approved site drawings were not available in the listed document sets.

- [76/01087/HIST](https://pa.sevenoaks.gov.uk/online-applications/applicationDetails.do?activeTab=summary&keyVal=ZZZZZSBKXC197), granted 25 November 1976, concerns two detached houses with garages on the southern part of the former 61 Hitchen Hatch Lane site. The register associates four present properties, including 4 Ashley Close. Its [decision](https://pa.sevenoaks.gov.uk/online-applications/files/9C9EBF3259E08803F805DCDFF9A99B9B/pdf/76_01087_HIST-DECISION-185573.pdf) includes retained-tree protection, landscaping, turning-head details and external-material approval. This is a relevant original-development lead, not a confirmed identification of the approved Ashley Heights footprint. Obtain approved drawings, amendments and discharge records to resolve its application today. The historic tree-protection wording is not a modern root-protection design.
- [83/01218/HIST](https://pa.sevenoaks.gov.uk/online-applications/applicationDetails.do?activeTab=summary&keyVal=ZZZZZGBKXC754), granted 16 November 1983, is an outline permission for a detached house and double garage. The [notice](https://pa.sevenoaks.gov.uk/online-applications/files/0F31D1958F1352380B470CA360B7F1EA/pdf/83_01218_HIST-DECISION-197825.pdf) describes land adjoining Ashley Heights. It addresses reserved matters, materials, landscaping, retained parking/access and drainage. Do not attribute those conditions to the current house solely from the address link.
- [84/00546/HIST](https://pa.sevenoaks.gov.uk/online-applications/applicationDetails.do?activeTab=summary&keyVal=ZZZZZEBKXC193), granted 16 July 1984, approves reserved matters pursuant to the 1983 outline condition. Its [notice](https://pa.sevenoaks.gov.uk/online-applications/files/7EE27B6C26644F055A80E951212A4C7E/pdf/84_00546_HIST-DECISION-198894.pdf) also describes adjoining land. It is not evidence that the present Ashley Heights house was approved in 1984.
- [83/01336/HIST](https://pa.sevenoaks.gov.uk/online-applications/applicationDetails.do?activeTab=summary&keyVal=ZZZZZFBKXC620), refused 7 December 1983, concerns a chalet bungalow, garage and access on adjoining land. The [refusal](https://pa.sevenoaks.gov.uk/online-applications/files/D716AC06408129746DCDC0525EC553AA/pdf/83_01336_HIST-DECISION-197948.pdf) objects to the design, scale and mass in the street, and excessive building floor area for the plot. It is useful historical context, not a contemporary decision on alterations to Ashley Heights.

The [property constraints page](https://pa.sevenoaks.gov.uk/online-applications/propertyDetails.do?activeTab=constraints&keyVal=000VKWBKLI000) explicitly flags Sevenoaks Urban Confines, an Aquifer Protection Zone with code AQCZ/08, and an Airfield Safeguarding Zone. The code does not identify an Environment Agency source-protection category. Groundwater, drainage, pool excavation and basement feasibility therefore remain separate technical investigations. Absence of a TPO or local-list row on this page is not evidence of absence; the separate map and order checks still apply.

Design inference: this history strengthens the reason to start with E1's retained front and to resolve tree, groundworks and neighbour constraints early. It does not establish permitted-development rights, discharge historic conditions or predict permission. A targeted request for the approved original drawings and current land-charge/condition checks is a next step for the owner's planning adviser; no request or paid search has been submitted.

Review-copy sketch before editing: keep the existing comparison and option selection unchanged. Add a short property-history paragraph and an aquifer flag beside the existing planning-basis notes; put the four-record explanation on a separate final printed page so the map-screening sheet remains legible. The reader can compare the six options first and investigate the specific records only when developing a preferred scheme.
