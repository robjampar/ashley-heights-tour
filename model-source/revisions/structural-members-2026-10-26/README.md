# M01 — detailed structural member coordination

Local experimental issue, 26 October 2026. Open http://127.0.0.1:8765/structure/ or `launchers/Open Structural Workspace.command`.

This is a detailed **review model**, not a completed structural design, fabrication package or construction issue. Geometry is intentionally visible where it conflicts with the architectural envelope. No native house model or published site was changed.

## Scope and retained structure

- The existing house remains grey context. Its hidden framing and foundations have not been surveyed, so no invented existing joist/steel inventory is presented or priced as a new build.
- New additions and alterations have separate scope labels and filters.
- Original garage demolition/rebuild is an optional scenario, off by default. It adds the ground-level brick/block shell and indicative footing reservations. New upper-storey members are common to both scenarios. Existing walls/foundations must be investigated; this is not a decision to demolish.
- The original-house loft-floor strengthening/replacement study is also optional, off by default. The new western-extension loft floor and new stair trimmers remain in the base scope. A survey may support retaining, supplementing or replacing existing joists.

## What is drawn

The M01 generator creates individually referenced I-profile floor joists, folded hanger reservations, British Steel UB flange/web profiles, ridge/edge reservations, roof rafters/joists, roof-opening/perimeter trimmers, wall studs/plates, timber headers, lintel spaces, brick/block courses and concrete bodies. Member selection is shared by 3D, drawings and the register.

`Steel only`, `Joists + hangers`, `Roof framing`, `Hangers only`, `Wall structure` and `Concrete` isolate systems. Select a member to read its dimensions, status, scope, source references and open checks. Focus or isolate an individual assembly. Enable the architectural overlay and cutaway to compare it with floors and rooms. Brick/block pieces are visible; selecting a piece inspects its wall-leaf assembly. Drawings use the exact assembly outline, not thousands of projected mortar joints.

Floor joists follow actual exported polygons and voids, using local bay directions rather than the 8.59 m overall mesh width. The rear dormer and garden-room flat-roof members run across the shorter north-south depth, independently of the orthogonal main-wing dormer. Original roof portions remain retained context. A generic hanger at a clipped end does **not** establish a receiver or bearing.

The four assessed floor bays and B01 use reference-case UK-T01 candidates. Elsewhere dimensions explicitly reserve space and have not been calculated. UB fillets are omitted from the visual profile; catalogue mass is used. Hangers are generic connection reservations, not selected Simpson products or fixing schedules. Lintels are dimensional placeholders, not fabricated Catnic profiles. Columns, bolt/anchor patterns and reinforcing bars are not invented where no load-path/connection design exists.

## Known engineering and coordination gaps

See **Fit & issues**. These are known issues, not an exhaustive clash detector or certification:

- Trial joist build-ups exceed several current 200 mm architectural floor envelopes. Levels, ceilings and stair headroom need reconciliation.
- Some architectural floor fragments stop inside a bay or omit occupied finish areas. Member clipping does not prove support. No floor is silently added across a void.
- The long ridge/roof support path is unresolved; its drawn UB is not an adequate single-span beam claim. Supports, splices, hips, valleys, uplift, restraint and connections need engineering.
- The proposed gym bearing wall requires revised head/plate/stud-pack space, design of studs and fixings, and a load path through the basement.
- A 352.5 mm brick/cavity/block study can encroach inward by 122.5 mm against a 230 mm architectural envelope. Leaf orientation on ambiguous fragments is an assumption; bearings, corner bonding and ties remain incomplete.
- Basement concrete thicknesses/volumes are architectural only. Reinforcement, groundwater, foundations, waterproofing, temporary works and underpinning remain unresolved.
- Workshop visual steel bars are unselected; no actual section/mass or steel price is asserted for them.

The engineer and specialist suppliers must validate design **before** demolition, excavation, fabrication or construction. Low/reference/high scenarios are selected sensitivities, not guaranteed bounds.

## Quantities and costs

**Costs** provides editable low/reference/high GBP ex-VAT unit allowances and a per-member CSV. Retained members, disabled optional works and unpriced elements are excluded. The subtotal includes uncalculated reservations; it is **not the total shell build cost**. Quantities describe modelled components, without procurement rounding/waste or complete connection/junction detailing. Rates are owner-study assumptions, not supplier quotes. The garage increment is not the full rebuild premium.

Unpriced work is listed explicitly: demolition, propping/temporary retention, excavation/disposal, ground remediation, reinforcement/formwork, basement waterproofing/drainage, unresolved additional supports/connections, insulation/ties/trays/fire protection, design/fees, access/preliminaries, contingency and VAT, as applicable.

## Files and rebuild

- Inputs: `proposal/specs/structural-members.json`, existing UK-T01 specification/catalogue, current architectural registry/navigation.
- Generator: `scripts/structure/build_members.py`.
- Outputs: `walkthrough/public/structure/members.json` and `member-schedule.json`; shared browser geometry and cost/inspection code in `walkthrough/src/structure-*.js`.
- `make build-structure` regenerates the registry, UK trial calculations and M01 member study, validates source hashes and bundles `/structure/`.
- Earlier P01/UK-T01 PDFs remain preserved in their dated revision folders. They do not include M01 detail; the viewer disables stale PDF links rather than presenting them as a current issue.
- Before-state source files are under `original/`. Architectural source geometry/native files were not modified. No publication was performed.

## Validation

Meaningful geometry/scope checks cover exact floor footprints and stair voids, joist direction/depth, hanger-to-parent alignment, real UB dimensions/mass, non-duplicated B01 pricing, cavity face positions, retained-roof exclusion, garage-option separation, optional loft strengthening and shared drawing IDs. Browser review covers system isolation, close-up steel/joist/hanger/masonry views, drawings, options, editable costs and mobile layout.

Evidence: `walkthrough/test-results/structural-members-2026-10-26/`. Build/test logs: `logs/structural-members-2026-10-26-*`. The workspace layout check has the same 345 pre-existing findings as `logs/garden-workshop-check-layout.log`; it does not pass, and no new findings were added.

Final verification: 1,708 member/assembly references, 18,547 visible masonry pieces and 22 open coordination items. 18 relevant Python checks and 290 web-suite checks passed; the final targeted web checks (11) and 19-view browser review passed without page errors. Real canvas picking, optional scope toggles, architecture cutaway, rate edits and CSV download were exercised. Display batching reduced the reviewed full-model draw calls from 3,982 to 109 while retaining member IDs; the architecture overlay is also merged and excludes landscape/furniture clutter. This is a rendering check, not an engineering approval.
