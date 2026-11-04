# Walkthrough structure and foundation assumptions — 26 October 2026

Implemented as M12 and delivered with the subsequent M13 west-extension wall-band correction. Local review only; no publication or native architectural rebuild.

## Shared viewer

Open `http://127.0.0.1:8765/?design=proposed&structure=1`, or select **Structure** in the Proposed walkthrough. Walking, flying, room shortcuts and the existing collision/navigation model remain available. **Panels** expands the view; clicking a member opens its full inspector. **Focus in 3D** moves to a flying inspection position. Finishing the structural review restores the original architectural materials.

`structure-studio.js` is now a reusable factory used by the standalone orbit entry and `structure-walkthrough.js`. They share the exact member renderer, filters, inspector, drawings, register, calculation panels, costs and exports. The walkthrough uses its existing camera/renderer and already-loaded architecture; no second architectural GLB is loaded. Shadow DOM isolates the studio controls/styles. The architectural context and structural members have independent cut planes. Architecture is drawn first, then the structural layer, to prevent cumulative translucent room surfaces from obscuring members. Hidden structural meshes are excluded from the normal architectural object picker. Keyboard shortcuts respect focused inputs inside the structural controls.

Only the full Proposed design has this structural register. Existing/Planning and other variants retain their normal walkthrough and do not receive a mismatched structural model. The standalone `/structure/` orbit workspace remains available.

## F01 reference foundations

The reference is an explicit experimental choice, **not a measured site average**. Ground-floor model FFL is 0.000 m; adjacent ground is assumed at -0.150 m.

| Component | Displayed reference |
| --- | --- |
| Garage and garden perimeter strip | 600 mm wide × 300 mm thick |
| Strip underside | 1.00 m below assumed ground; model Z -1.150 m |
| Wall above strip | 352.5 mm-wide foundation-masonry envelope, 850 mm high to FFL |
| House-side terrace-post pad | Existing 800 mm square envelope; concentrated reactions unverified |
| Garden floor | 150 mm ground-bearing slab, separate from wall/post foundations |
| Basement | 300 mm continuous RC raft allowance at Z -3.100 to -2.800 m |
| Basement formation layers | 50 mm blinding and 150 mm sub-base allowances |

The former tall concrete stems become foundation-grade masonry volume allowances; product, bond, moisture treatment, earth-pressure resistance and post bearing pads are not selected. These bodies deliberately have no invented brick/block unit counts. Concrete and masonry use separate editable cost rates; the latter is an unquoted £350/£450/£650 per m³ budget sensitivity. Formation layers remain unpriced. Slab/raft figures are spatial and budget allowances, not calculated reinforced-concrete thicknesses.

`proposal/specs/structural-foundations.json` records all assumed loads, soil bearing values, ground/water datums, sources and exclusions. `scripts/structure/foundations.py` generates the model changes and arithmetic. The **Foundations** tab and member inspector show the result in both viewers.

The garage reference 45 kN/m load budget plus foundation/cover weights produces **97.39 kPa** gross pressure on the 600 mm strip, compared with an assumed 100 kPa allowable bearing. The heavier/weaker case produces **148.64 kPa**, exceeding its assumed 75 kPa; the garden strip and house-post pad also exceed that weaker-case assumption. These are concentric, unfactored pressure screens, not Eurocode 7 verification, settlement checks or a completed load takedown.

The basement raft follows the corrected retaining-wall footprint, approximately **115.64 m²** (the earlier architectural room polygon is 115.53 m²). All six wall bases meet it. No automatic extra strip footings are added below the raft. At reference groundwater Z -1.60 m, uplift is approximately **1,701.60 kN**, versus **1,934.32 kN** modelled empty-box dead weight. At assumed ground-level water, uplift is **3,346.47 kN**: the empty-box shortfall is approximately **1,412.15 kN**. Even adding the illustrative, unverified 800 kN permanent building contribution leaves approximately **612.15 kN** shortfall. These are unfactored sensitivities, not stability passes. Pumps, beneficial wall friction or unknown house mass are not credited.

Raft/wall reinforcement, local thickening, bending/punching/crack control, waterstops, waterproofing, tree/clay effects, drains, settlement, adjacent foundations and excavation/temporary works still need design before work starts. The workshop foundation remains outside F01. The older UK-T01 generic basement table is explicitly labelled as its earlier 250 mm/2.58 m illustration; it does not claim to represent the new raft.

Reference guidance reviewed: [LABC Warranty foundations manual v10](https://info.labcwarranty.co.uk/hubfs/Technical%20Manual%20v10%20Files%20and%20Images/Manual%20Sections/Section%203%20Foundations.pdf), [LABC raft basics](https://www.labc.co.uk/news/raft-foundation-basics), and [NHBC 2024 chapters 4.3/5.4](https://nhbcprod.blob.core.windows.net/shared/CC2981-NHBC-Standards-2024-aw-digital-version-lr-151223.pdf). These references inform the study; they do not establish the site's founding depth or compliance.

## Verification and recovery

- Recovery copies of M11 implementation/specification files are under `original/`. The M12 member register is additionally preserved in the subsequent wall-band revision's `original/` directory.
- 77 Python structural tests and all 311 web tests passed for M12. The M13 follow-up adds wall-band tests and reruns the structural checks.
- Browser review covers camera preservation, actual walking/flying, member clicking, composable filters, independent cuts, drawings, foundations, costs, input focus, restoration of architectural materials, direct links, narrow screens and the standalone viewer. Screenshots and the exact final results are under `walkthrough/test-results/structural-walkthrough-foundations-2026-10-26/`.
- Browser request diagnostics include `net::ERR_ABORTED` events for GLB streams even when the main house, refined furnishings and all three detailed vehicles finish loading. The cause is not established; raw events are retained separately from the asset-presence and interaction assertions. No blanket zero-network-error claim is made.
- `make check-layout` returns the same 345 pre-existing findings as `logs/garden-workshop-check-layout.log`.
- Native proposed geometry/navigation hashes remain `3fb81b911061a35f7b4903f8f7d867fd5aeafc029de295dd7e00dc152f7b87b7` and `e816f662ef4bd70111ff2543a4440ac27d7b11c29d223793cc26988cbe0b21b4` respectively. Source fingerprints are checked by the build; no prior native-build hashes were rewritten.
