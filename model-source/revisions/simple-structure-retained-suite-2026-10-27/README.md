# SW02 — keep the previous principal suite

27 October 2026. The owner accepted the other SW01 layout changes but strongly preferred the previous principal suite. SW02 replaces the active review, keeping its accepted bed, sitting area, corner desk, walk-through wardrobe, bathroom, fixtures and entrance positions. **No new wall divides that bedroom. This remains an uninstalled feasibility proposal; the live walkthrough already retains the previous suite.**

## The limited suite change

Extend the west end of the existing media/wardrobe partition by approximately **565 mm**, with a roughly 240 mm finished local enclosure. A single-storey concealed post at **X9.455, Y−11.01** supports the loft girders. This is an explicit local change, not a claim that the entire new support fits within the unchanged partition.

The former bedroom plan's furniture and bathroom/wardrobe configurations are read from their accepted source reports, not redrawn in new positions. The end enclosure does not intersect their furniture envelopes. The aisle beside the sofa remains approximately **1.205 m**, and the existing wardrobe-door swing envelope clears the enclosure by approximately **165 mm**. These are 2D coordination checks; door hardware, linings, fire enclosure and tolerances still need the 3D integration.

Instead of a first-floor bearing wall, use two ceiling-level girders, **4.9935 m and 5.71 m**, meeting over the concealed post. Both use UB305×165×54 as a gravity-trial section. The north transfer is trialled as UC305×305×129: the previous UC305×305×107 failed the revised high-load deflection screen. At 318 mm maximum steel depth, this remains within the previous LP02 main-girder depth; no additional ceiling downstand is proposed. Actual hanger, connection, fireboard and ceiling-fit geometry has not been rebuilt.

The post is approximately one storey high, not a new shaft through all the rooms. It bears on the aligned ground-floor wall, then basement wall and raft. A **215 × 450 × 200 mm padstone envelope** is reserved beneath it for coordination only. Its capacity, bearing stress, load dispersion, post buckling, baseplate, anchors, cap and lateral restraint are not designed by this study.

## Keep the accepted changes below

The proposed cinema east wall still moves **357.5 mm east**, and the garage division still moves **1.86 m west**, both onto X9.455. The van retains **495 mm at either end**, the bar island/stools remain, and relocating the bar wall console keeps the **932.5 mm west aisle**.

Shift the aligned primary basement and ground-floor door openings to **Y−12.4…−11.45**, south of the new post's bearing. The padstone envelope is then **215 mm clear of the nearest jamb in plan**; it does not bridge the door opening. The cinema's existing sofa remains, with approximately 1.22 m beside it; hinge the revised cinema door at its southern jamb so that the entry path towards the rear of the sofa stays clear. Final leaf/frame geometry remains to be checked. Retain the garage's existing north doorway at **X5.25…6.15**.

## Calculations and unresolved work

- Keep the equal **4.2225 m** loft spans and **72 × 245 mm actual C24 at ≤400 mm centres** as the timber gravity candidate. The same six uniform/point-load cases pass, subject to the limitations in SW01.
- Twelve linked floor/gallery load cases balance and pass the individual member gravity screens. The concealed support's largest floor-only ULS reaction is approximately **100.2 kN**, excluding post/base self-weight, roof loads and other actions. This is a demand, **not an approved bearing capacity**.
- The uniform basement wall envelope is reduced because there is no new first-floor masonry spine. The loft reaction is now explicitly a separate concentrated post action, not double-counted as a uniform load along that wall.
- The garage transfer under the west upper wall still needs redesign. The current UB305×165×40 fails its sensitivity screen. Exterior opening heads, the separate brick leaf support, masonry continuity and restraint remain unresolved.
- Whole-floor movement through the girders/north transfer, vibration, heavy wet-room loads, fire/acoustic performance, structural connections, masonry, slab joints and raft/ground design remain unverified. No completed 3D clash audit or construction approval is claimed.

The original SW01 proposal and review remain preserved at `revisions/simple-stacked-wall-2026-10-27/`. Its first-floor replan is withdrawn as the recommendation. SW02's live model/source registry is still unchanged.

Generate with `.venv/bin/python -m scripts.structure.retained_suite_floor_study`.
Test with `.venv/bin/python -m unittest tests.test_retained_suite_floor_study`.
The JSON contains reactions, assumptions, source hashes and limits. Primary references remain the [JJI manual](https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf), [actual-section UK C24 listing](https://www.stoketimber.com/product/75-x-250-72-x-245mm-finished-sizes-treated-c16-c24-grade-timber-joists/), [Simpson hanger instructions](https://pim.strongtie.eu/api/v1/public/download/gb/en/product/400/SFH.pdf) and [NHBC design requirements](https://www.nhbc.co.uk/homeowners/standards-technical-requirements).
