# Larger-car sensitivity study

25 September 2026. This supplements the issued compact-car checks; it does not replace them.

The generic larger body is 4.8 x 1.95 m with a 5.4 m centre turning radius. All other parked cars use the same larger dimensions. The study holds the issued parked headings, uses a 0.12 m search margin and checks the swept body at 0.10 m intervals with a 0.03 m body margin. Each search stops after 100,000 expansions. No particular manufacturer vehicle is represented.

| Option | Parked bodies fit | Bays with both journeys found and checked | Searches still unresolved |
| --- | --- | --- | --- |
| E1 Retained front | 6 / 6 | 3 / 6 | N2, E2 and garage G2 |
| E2 Garden courtyard | 6 / 6 | 3 / 6 | S1, N1 and N3 |
| E3 Short forecourt wing | 6 / 6 | 4 / 6 | N2 and S2 |

A missing route is an inconclusive bounded-search result, not proof that no manoeuvre exists. Body fit excludes mirrors, doors, passengers, gradients and surveyed highway geometry. These results are a reason to test the owner's actual vehicles before selecting a scheme, not a finding that the six-position layouts suit all cars. The current review therefore retains the compact-car assumption and the explicit E1 garage compromise.

The issued 4.4 x 1.8 m compact body, with 4.3 m turning radius, passes all six occupied-position arrival and departure checks in every option after correcting the spatial-cell obstacle lookup. The checker now considers the entire car body when selecting nearby walls and retains large obstacle polygons whose corners lie outside the local cell. The two small regression cases failed before that correction and pass after it. All six option checks and the full 113-test viewer suite were rerun.

Reproduction: the read-only scenario script and result remain in `revisions/redesigns-2026-09-25/parking-size-sensitivity.mjs` and `.json` in the original workspace. They do not modify the native models or issued audit files. The source snapshot preserves copies under `review-evidence/parking-sensitivity/`.
