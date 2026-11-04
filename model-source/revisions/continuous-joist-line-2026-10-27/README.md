# CJ01 — repeated joists and extended wall/lintel line

The owner asked whether joists like `M-J-01-009` could continue through the rear and upper floors, and requested extending `M-BLOCK-4D5245A` to the rear with wide lintels where the wall is absent.

The named joist is **JJI 300D**, 97 mm wide and 300 mm deep at 400 mm centres. Its modelled cut length is 5.956 m, with receiving members at each end. The named wall is the garage/store division at Y−9.905 m, currently ending at X9.455 m. This comparison interprets extension as continuing that same line east to the rear exterior wall, X13.6775 m.

`scripts/structure/continuous_joist_line_study.py` reads the current model without modifying it. `study.json` records source hashes, assumptions and isolated section comparisons. `comparison.png` and `.svg` show the proposed line, broad opening and repeated joist direction. Local trimmers and connection details are not drawn in that schematic.

## Findings

- The proposed southern joist bay is about **6.10 m** between assumed wall bearing axes. The northern gym bay is about **6.57 m**; exact hanger/bearing positions will refine both numbers.
- The [supplier's Table 16](https://www.jamesjones.co.uk/assets/uploads/assets/downloads/brochures/jji-joist-technical-manual-nov-23.pdf) gives **6.286 m for 300D at 400 mm centres** and **6.817 m for 350D at 400 mm centres**, subject to its domestic floor assumptions. Therefore identical 300D/400 mm joists are not justified throughout this same-direction arrangement. Closer centres need a separate supplier design; no table interpolation is treated as approval.
- A roughly **4.22 m support-axis span** across the open ground-floor portion has a **UB254 × 146 × 31** candidate in the limited floor-load screen. That does not include an upper bearing wall or roof reaction. Actual clear opening, end bearings and masonry/padstones need design.
- Repeating the same joist direction above the retained open suite would need a cross-beam about **8.45 m** long unless another vertical support is introduced. The lowest-mass passing section in this limited shortlist is **UC356 × 368 × 177**, roughly **1.5 tonnes** before end allowances, plates and connections. It is not an optimised or approved selection. The current post cannot be removed based on this isolated screen.
- Keeping the existing 31.5 mm ceiling lining and 25 mm allowance below that trial beam would lower the principal-suite ceiling by about **50 mm**, without raising the floor. The north first-floor 350 mm joist option also needs ceiling/window-head coordination.
- The rear end of the new ground support line meets a window jamb; a proper return/padstone must be coordinated with that opening. Existing entrance/stair voids are preserved and still need local trimmers.

## Status and limits

**Uninstalled comparison.** The approved SW02 native model and live structural arrangement remain unchanged. A clarification is pending: does the owner want the same joist direction at each level, or the same I-joist product family with directions chosen by bay? These imply different supporting steel and ceiling changes.

The arithmetic uses the existing low/reference/high floor assumptions, an explicit 0.15 kPa joist allowance and conservative full-width tributary envelope for the loft beam. It does not verify complete load routes, concentrated bath/partition loads, flexible-support vibration, connection/fire/stability details, masonry capacity, lower garage transfers, basement reinforcement or foundations. The vehicle slab and retaining structure remain concrete.
