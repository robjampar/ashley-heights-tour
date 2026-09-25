#!/usr/bin/env python3
"""Bottom-up cost plan for the proposed scheme (built from design-spec-compact.json).

Every task is quantified from the saved compact model (output-proposed-compact/
navigation.json, geometry.json and proposal/design-spec-compact.json) and priced
from first principles: materials, labour (trade days at day rates), plant hire
and waste removal. No benchmark £/m² rates are used. All rates are listed in
RATES so each one can be challenged and the plan re-run.

Outputs (proposal/):
  P8-proposal-B-cost-plan.md    readable phased plan
  P8-proposal-B-cost-plan.json  every line with quantity, rate and total
  P8-proposal-B-cost-plan.csv   flat resource schedule
"""
from __future__ import annotations

import csv
import json
import math
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "proposal"

# --------------------------------------------------------------------------
# Rates library — Kent / south-east England, September 2026, excluding VAT.
# Materials are delivered-to-site prices. Labour is a cost per person per
# 8-hour day including employer's NI, holiday and insurance. Plant is hire per
# day/week excluding operator unless stated. Waste is per load or per skip.
# --------------------------------------------------------------------------
RATES: dict[str, tuple[str, str, float]] = {
    # ---- labour (per person-day) ----
    "lab": ("General labourer", "day", 170),  # was 215; Labourer £120–180/day (costestimator.co.uk, Checkatrade 2026)
    "grd": ("Groundworker", "day", 210),  # was 240; Skilled trade £180–300/day; groundworker lower-mid
    "brk": ("Bricklayer", "day", 300),  # was 305; Bricklayer SE £250–400/day typical (tradedayrates.co.uk, Sleepless Tradesman 2026)
    "cpt": ("Carpenter / joiner", "day", 260),  # was 295; Skilled trade £180–300/day (costestimator.co.uk 2026)
    "rfr": ("Roofer / slater", "day", 260),  # was 290; Skilled trade band
    "stf": ("Steel fixer / concrete finisher", "day", 250),  # was 285; Skilled trade band
    "ste": ("Steel erector", "day", 300),  # was 330; Specialist £200–350/day
    "pls": ("Plasterer / dryliner", "day", 250),  # was 280; Skilled trade band
    "rnd": ("Render specialist", "day", 260),  # was 300; Skilled trade band
    "ele": ("Electrician", "day", 300),  # was 325; Electrician SE £250–340/day (Logic4training, elec-mate 2026)
    "plm": ("Plumber / heating engineer", "day", 300),  # was 325; Plumber, same band as electrician
    "til": ("Tiler", "day", 250),  # was 285; Skilled trade band
    "pnt": ("Painter and decorator", "day", 200),  # was 230; Skilled trade, lower band
    "glz": ("Window / glazing fitter", "day", 260),  # was 295; Skilled trade band
    "flr": ("Floor layer", "day", 240),  # was 275; Skilled trade band
    "lsc": ("Landscaper / paver", "day", 200),  # was 235; Skilled trade, lower band
    "wpf": ("Waterproofing technician", "day", 280),  # was 310; Specialist band
    "opr": ("Plant operator", "day", 280),  # was 320; Specialist band
    "spm": ("Specialist installer (pool / gate / lift / AV)", "day", 320),  # was 340; Specialist £200–350/day
    "sfx": ("Scaffolder", "day", 280),
    "arb": ("Arboriculturist / tree crew", "day", 300),
    "sm":  ("Site manager", "week", 2150),
    "qs":  ("Contractor's surveyor (part time)", "week", 550),
    # ---- plant ----
    "exc8": ("8 t excavator, dry hire", "day", 290),
    "exc15": ("1.5 t mini excavator, dry hire", "day", 125),
    "dump": ("3 t dumper", "day", 95),
    "tele": ("Telehandler", "day", 230),
    "crane50": ("50 t mobile crane with driver", "day", 1450),
    "crane30": ("30 t mobile crane with driver", "day", 1150),
    "pump": ("Concrete pump with operator", "day", 880),
    "shore": ("Trench sheets / hydraulic waling frames, hire", "m-week", 6.5),
    "kingpost": ("King-post and timber lagging, supply and install", "m", 640),
    "dewater": ("Wellpoint dewatering set incl. pump, hire", "week", 620),
    "props": ("Acrow props and needles, hire", "week", 180),
    "mixer": ("Mixer / small tools", "week", 65),
    "welfare": ("Welfare cabin, toilet, drying room, hire and servicing", "week", 170),
    "tempserv": ("Temporary electricity and water consumption", "week", 80),
    "consum": ("Small tools, consumables, PPE, signage, fire points", "week", 95),
    "insurance": ("Contractor's all-risks insurance, bond and design coordination", "item", 12200),
    "ownerins": ("Owner's renovation / self-build insurance policy (self-managed only)", "item", 4200),
    "temproof": ("Temporary roof sheeting, tarpaulins and crash deck over occupied rooms", "m2", 9.5),
    "scaf": ("Scaffold, supply/erect/dismantle (independent tied, 3 lifts)", "m2", 18),  # was 24; Domestic scaffold £15–25/m² (MyBuilder, scaffoldingcostcalculator 2026)
    "scafwk": ("Scaffold extra hire beyond 10 weeks", "m2-week", 0.9),
    "edge": ("Roof edge protection", "m-week", 2.8),
    "hoist": ("Genie / material hoist", "week", 210),
    "cutsaw": ("Floor saw / breaker hire", "day", 110),
    # ---- waste ----
    "muck": ("Inert muck-away, 8-wheel grab/tipper (10 m³ loose)", "load", 330),  # was 345; 8-wheel grab/tipper inert £275–420/load (Checkatrade, The Waste Group 2026)
    "skip8": ("8-yard mixed waste skip (6 m³)", "skip", 250),  # was 335; 8-yard skip Sevenoaks from £240+VAT (skip-hire-kent.com, Mick George 2026)
    "skip12": ("12-yard skip, light builders' waste (9 m³)", "skip", 320),  # was 410; 12-yard scaled from the 8-yard Sevenoaks price
    "skipb": ("Plasterboard-only skip", "skip", 300),  # was 395; Plasterboard skip, scaled
    "wee": ("WEEE / metal recycling collection", "load", 120),
    # ---- materials: groundworks and concrete ----
    "conc30": ("Ready-mix concrete C30/37", "m3", 128),  # was 138; C30 £120–142/m³ delivered (MyBuilder, RMS Concrete 2026)
    "conc35w": ("Ready-mix concrete C35/45 waterproof (basement)", "m3", 150),  # was 158; C35 £124–145/m³ plus waterproofing admixture
    "conc15": ("Ready-mix concrete C15 blinding", "m3", 108),  # was 118; C15 blinding, below C30
    "rebar": ("Reinforcing bar, cut and bent, delivered", "t", 1300),  # was 1080; B500B T12 ≈ £1,274/t plus £50–150/t cut and bent (nextdaysteel.co.uk 2026)
    "mesh": ("A393 mesh", "m2", 7.0),  # was 5.6; A393 £68–100/sheet of 11.52 m² SE England (nextdaysteel.co.uk 2026)
    "form": ("Formwork ply/timber (3 uses) with release agent", "m2", 8),  # was 11; 18 mm ply £20.34 inc VAT = £5.7/m² ex, three uses, plus walings and release agent (buildbuddy)
    "mot1": ("MOT Type 1 sub-base", "t", 45),  # was 44; Loose tipper load; bulk bags are £59.88/850 kg inc VAT on buildbuddy.co.uk
    "gravel": ("Granular backfill / drainage stone", "t", 45),  # was 46; Loose load; bulk bag £59.88 inc VAT (buildbuddy)
    "sand": ("Sharp sand", "t", 48),  # was 50; Loose load; bulk bag £59.88 inc VAT (buildbuddy)
    "dpm": ("1200 g DPM / radon barrier", "m2", 0.5),  # was 1.9; 300 mu DPM 4 x 25 m £41.28 inc VAT = £0.34/m² ex VAT + tape (buildbuddy)
    "landdrain": ("Perforated land drain 100 mm with geotextile", "m", 9),
    "bhole": ("Cable-percussion borehole 10 m with monitoring well", "no", 1750),
    # ---- waterproofing ----
    "membext": ("External self-adhesive bitumen tanking membrane + protection board", "m2", 24),
    "cdm": ("Cavity drain membrane 8 mm studded, plugs and tape", "m2", 11),  # was 15.5; Delta MS500 2.4 x 20 m roll ≈ £8–9/m² ex VAT + plugs and tape
    "cdmfloor": ("Cavity drain floor membrane and perimeter channel", "m2", 17),
    "sump": ("Twin-pump sump station with battery back-up and alarm", "no", 3400),
    "waterbar": ("Hydrophilic waterbar at kickers", "m", 12),
    # ---- masonry ----
    "brick": ("Facing bricks (to match existing), per 1000", "1000", 850),  # was 980; Wienerberger Warnham Red stock £1.00/brick inc VAT = £833/1000 ex; range £0.78–1.54 inc (buildbuddy)
    "block": ("100 mm 7N concrete block", "m2", 15),  # was 22; Solid dense 7.3N 100 mm £1.73 inc VAT = £1.44 ex x 10/m² (buildbuddy)
    "block140": ("140 mm 7N concrete block", "m2", 21),  # was 31; Scaled from the 100 mm block price
    "mortar": ("Mortar (sand, cement, plasticiser) per m² of skin", "m2", 4.0),  # was 6.8; Building sand £59.40/850 kg + cement £5.48/25 kg inc VAT, 1:5 mix, 45 kg/m² of skin (buildbuddy)
    "ties": ("Wall ties, DPC, cavity trays, weeps", "m2", 3.4),
    "cavins": ("150 mm full-fill mineral wool cavity batts", "m2", 16),  # was 15; Knauf DriTherm 32 150 mm £43.27/2.18 m² inc VAT = £16.5/m² ex (buildbuddy)
    "lintel": ("Steel cavity lintel (average 1.8 m)", "no", 95),
    "coping": ("Stone/concrete coping", "m", 38),
    "render": ("Silicone render system: basecoat, mesh, primer, topcoat, beads", "m2", 21),
    "padstone": ("Precast padstone", "no", 42),
    # ---- structural steel and timber ----
    "steel": ("Structural steel, fabricated, primed, delivered", "t", 2300),  # was 2650; Sections £1,100–1,200/t ex-works; fabricated domestic beams ≈ £2,000–2,600/t (tradecalculator, beamsrenovation 2026)
    "intum": ("Intumescent / fire board to steel", "t", 260),
    "bolts": ("Bolts, plates, resin anchors", "t", 140),
    "ijoist": ("I-joist 300 mm (incl. hangers, blocking)", "m", 10),  # was 12.5; 300 mm I-joist ≈ £9–11/m ex VAT, joist manufacturers' price lists
    "joist": ("C24 47x225 joist", "m", 4.3),  # was 7.2; C24 47x175 4.8 m £18.88 inc VAT = £3.28/m ex; 47x225 pro rata (buildbuddy)
    "rafter": ("C24 47x200 rafter / purlin timber", "m", 3.9),  # was 6.4; C24 47x200 3 m £13.10 inc VAT = £3.64/m ex (buildbuddy)
    "cls": ("C16 47x100 CLS stud / plate", "m", 2.0),  # was 3.4; C24 47x100 4.8 m £10.79 inc VAT = £1.87/m ex; CLS 38x89 £1.26/m ex (buildbuddy)
    "ply22": ("22 mm P5 T&G chipboard flooring", "m2", 7.2),  # was 11.5; 22 mm P5 T&G 2400x600 £11.76 inc VAT = £6.8/m² ex + glue (buildbuddy)
    "osb": ("18 mm OSB3 deck", "m2", 6.0),  # was 14.5; OSB3 18 mm 2440x1220 £20.39 inc VAT = £5.7/m² ex (buildbuddy)
    "glulam": ("Glulam ridge / valley beam", "m", 68),
    "hollow": ("Precast hollowcore plank 200 mm, delivered", "m2", 72),  # was 82; Hollowcore supplied ≈ £60–75/m² (BuildHub, precast suppliers)
    "topping": ("Structural topping concrete 75 mm + mesh", "m2", 19),
    # ---- roofing ----
    "slate": ("Natural slate 500x250 (21/m² incl. waste)", "m2", 40),  # was 52; Developer 500x250 Spanish £1.73/slate (buyroofslate.co.uk) x 21/m² + 10% waste
    "batten": ("25x50 treated batten (4 m/m²)", "m2", 4.4),
    "brmem": ("Breathable roofing membrane", "m2", 1.7),  # was 1.4; Tyvek Supro 50 m² £123.83 inc VAT = £2.06/m² ex; budget membranes ≈ £1.2 (buildbuddy)
    "slatefix": ("Copper nails / hooks / ventilation", "m2", 2.1),
    "ridge": ("Dry ridge / hip system", "m", 27),
    "lead": ("Code 5 lead, valleys/flashings incl. clips", "m", 34),  # was 48; Code 4 450 mm x 3 m £75.90 inc VAT = £21/m ex; code 5 600 mm for valleys (buildbuddy)
    "valleyb": ("Valley boards and underlay", "m", 9),
    "pir120": ("PIR insulation 120 mm (warm flat roof)", "m2", 17.5),  # was 27; 120 mm PIR ≈ £58/sheet inc VAT = £17/m² ex
    "pir100": ("PIR insulation 100 mm", "m2", 15.5),  # was 22; 100 mm PIR ≈ £48–55/sheet inc VAT = £14–16/m² ex
    "pir150": ("PIR insulation 150 mm", "m2", 21),  # was 32; EcoTherm 150 mm £70.80 inc VAT = £20.5/m² ex (buildbuddy)
    "pir50": ("PIR insulation 50 mm (rafter underside)", "m2", 7.0),  # was 12; Celotex GA4050 2400x1200 £22.13 inc VAT = £6.4/m² ex (buildbuddy)
    "taper": ("Tapered PIR insulation scheme", "m2", 41),
    "singleply": ("Single-ply PVC membrane, VCL, trims, adhesive", "m2", 28),  # was 31; PVC single ply £20–50/m² materials (flatroofingsystems.co.uk 2026)
    "grp": ("GRP flat roof system (resin, mat, topcoat, trims)", "m2", 22),  # was 34; Cure It 12 m² kit £239.68 inc VAT = £16.6/m² ex + trims and bandage (buildbuddy)
    "fascia": ("Fibre-cement fascia/soffit and 230 mm white band", "m", 34),
    "gutter": ("Aluminium gutter", "m", 38),
    "downpipe": ("Aluminium downpipe with shoe", "m", 33),
    "rooflight": ("Fixed flat rooflight (approx 1.2 x 1.2 m), double glazed", "no", 1650),
    "lantern": ("Walk-on glass floor lantern 1 x 1 m, toughened laminated", "no", 2900),
    "eavesdoor": ("Eaves access door and frame", "no", 140),
    # ---- glazing, windows, doors ----
    "alwin": ("Aluminium double-glazed window, thermally broken, supply", "m2", 550),  # was 690; Aluminium windows £400–600/m² supply (expertsure, greenmatch 2026)
    "alscreen": ("Aluminium fixed glazed screen / curtain panel, supply", "m2", 650),  # was 820; Fixed aluminium screens, upper end of the window band
    "alslide": ("Aluminium sliding / French door set, supply", "m2", 950),  # was 980; Aluminium sliding doors supply ≈ £800–1,200/m² (Checkatrade 2026)
    "structglass": ("Slim-frame structural glazed gable, supply", "m2", 1500),
    "extdoor": ("External door, composite/oak, supply", "no", 1450),
    "oakpair": ("Pair of oak entrance doors, glazed, multipoint locking", "no", 5200),
    "garagedoor": ("Insulated sectional garage door 5.44 x 2.35 m with motor", "no", 5400),
    "intdoor": ("Oak internal door, frame, architrave set", "no", 430),
    "firedoor": ("FD30 fire door, frame, closer, intumescent strips", "no", 520),
    "iron": ("Ironmongery set (handles, hinges, latch)", "no", 95),
    "glassbal": ("Frameless glass balustrade 10 mm toughened laminated, channel, cap", "m", 420),
    "oakbal": ("Oak balustrade: newel posts, handrail, base rail, spindles, supply", "m", 140),
    "intglass": ("Internal glazed screen, steel-look frame, supply", "m2", 520),
    "showerscreen": ("Shower screen panel 10 mm", "no", 380),
    # ---- internal finishes ----
    "pb": ("12.5 mm plasterboard (per side) with screws and tape", "m2", 3.5),  # was 6.2; 12.5 mm wallboard £8.30–11.10 per 2.88 m² inc VAT = £2.4–3.2/m² ex + screws/tape (buildbuddy)
    "pbmr": ("Moisture-resistant / acoustic plasterboard", "m2", 6.5),  # was 8.4; MR £18.30–23.14, SoundBloc £18.41 per 2.88 m² inc VAT (buildbuddy)
    "mstud": ("Metal stud 70 mm C-section and track (per m² of partition)", "m2", 3.5),  # was 7.5; 70 mm C-stud 2.4 m £3.11, U-track 3 m £3.46 inc VAT; studs at 400 c/c (buildbuddy)
    "skim": ("Finishing plaster, beads", "m2", 1.6),  # was 2.4; Thistle MultiFinish £9.51/25 kg covers ≈ 10 m² + beads (buildbuddy)
    "mfceil": ("MF ceiling grid", "m2", 9.5),
    "mwool": ("100 mm acoustic mineral wool", "m2", 7.5),  # was 5.2; Rockwool RWA45 100 mm £26.34/2.88 m² inc VAT = £7.6/m² ex (buildbuddy)
    "paint": ("Emulsion, mist + 2 coats, filler, sundries", "m2", 1.6),
    "screed": ("75 mm sand/cement screed material", "m2", 15),
    "lscreed": ("Liquid anhydrite screed, pumped", "m2", 26),
    "oak": ("Engineered oak flooring 14/3 mm + underlay + adhesive", "m2", 48),  # was 54; Engineered oak £40–50/m² mid-range + underlay and adhesive (ecohardwood, Checkatrade 2026)
    "limestone": ("Limestone tiles 20 mm, adhesive, grout, sealer", "m2", 62),  # was 84; Limestone £36–115/m² (Topps, Floors of Stone); mid-range + adhesive, grout, sealer
    "porc": ("Porcelain tiles, adhesive, grout", "m2", 32),  # was 48; Porcelain £15–30/m² retail + adhesive and grout
    "walltile": ("Wall tiles, tanking, adhesive, grout", "m2", 62),
    "carpet": ("Carpet and underlay", "m2", 34),
    "rubber": ("Gym rubber floor tiles 20 mm", "m2", 46),
    "epoxy": ("Epoxy garage floor coating", "m2", 13),
    "skirt": ("Skirting and architrave, primed MDF/oak", "m", 5.2),
    "winboard": ("Window board", "m", 14),
    "acoustic": ("Cinema acoustic fabric panels / lining system", "m2", 95),
    # ---- joinery packages (supply) ----
    "stair": ("Oak staircase 14 risers, strings, treads, newels (supply)", "no", 6200),
    "bstair": ("Hardwood basement stair, priced as a 16-riser dogleg (0.7 = straight 13-riser flight)", "no", 7400),
    "wardrobe": ("Fitted wardrobe / dressing joinery per metre run", "m", 1150),
    "shelving": ("Fitted bookshelves / desk joinery per metre run", "m", 640),
    "winerack": ("Timber wine racking per metre run", "m", 720),
    "mediawall": ("Media wall joinery unit", "no", 3800),
    "workbench": ("Workshop bench and storage units", "no", 1600),
    "kitchen": ("Kitchen units and worktops (relocated run + new island)", "no", 14500),
    "utility": ("Utility units, sink, worktop", "no", 3200),
    # ---- sanitary and wet rooms (supply) ----
    "bathP": ("Principal shower room sanitaryware set (WC, basin, vanity, shower, taps)", "no", 3600),
    "bathS": ("Secondary shower room sanitaryware set", "no", 2400),
    "wcset": ("Cloakroom WC and basin set", "no", 900),
    "wineclim": ("Wine store climate-control unit", "no", 3800),
    # ---- M&E (supply) ----
    "elepoint": ("Electrical point (socket/switch/light) cable, back box, accessory", "no", 28),
    "downlight": ("LED downlight fitting, fire rated", "no", 32),
    "cu": ("Consumer unit / distribution board", "no", 480),
    "swa": ("SWA armoured cable 6 mm² per metre", "m", 6.5),
    "ufh": ("Wet UFH pipe, clips, manifold share", "m2", 24),
    "rad": ("Designer radiator with TRV", "no", 320),
    "ashp": ("Air-source heat pump 16 kW monobloc", "no", 5500),  # was 7800; 16 kW unit £4,550–6,000 supply only (Dwellow, Checkatrade 2026)
    "cyl": ("300 L unvented cylinder with controls", "no", 1500),
    "buffer": ("Buffer vessel, pumps, controls, pipework kit", "no", 1900),
    "mvhr": ("MVHR unit (whole-house class)", "no", 1800),  # was 2900; Whole-house MVHR unit £600–2,500 (Checkatrade, eFans 2026)
    "duct": ("MVHR semi-rigid ducting, plenums, valves", "m2", 16),
    "pipe": ("Hot/cold/waste pipework per wet room", "no", 650),
    "ev": ("EV charge point 7 kW", "no", 780),
    "alarm": ("Intruder alarm, 8 zones, panel, sensors", "no", 1600),
    "cctv": ("CCTV 6 cameras + NVR", "no", 1900),
    "intercom": ("Video entry / gate intercom", "no", 850),
    "smoke": ("Interlinked smoke/heat detector", "no", 68),
    "extlight": ("External luminaire / uplight / bollard", "no", 165),
    "3ph": ("DNO three-phase supply upgrade (quoted allowance)", "no", 5800),
    "watersup": ("Water supply and meter upgrade (pool, extra wet rooms)", "no", 1800),
    "airtest": ("Air-tightness test, SAP and EPC", "no", 950),
    "sprinkfree": ("Smoke ventilation / escape provision (basement)", "no", 2600),
    # ---- external works ----
    "resin": ("Resin-bound aggregate 18 mm, UV-stable resin", "m2", 33),
    "asphalt": ("Asphalt base repair / regulating course", "m2", 24),
    "edging": ("Aluminium / stone edging", "m", 16),
    "turf": ("Cultivated turf", "m2", 4.8),
    "topsoil": ("Screened topsoil", "t", 46),
    "hedge": ("Hedging plants 1.2 m, 3 per metre", "m", 42),
    "shrub": ("Border shrubs and perennials per m²", "m2", 38),
    "tree": ("Multi-stem tree, semi-mature 3.5–4 m, root-balled", "no", 720),
    "olive": ("Olive tree 1.8 m in planter", "no", 380),
    "box": ("Clipped box ball 50 cm", "no", 65),
    "stakes": ("Tree stakes, ties, irrigation bag, mulch", "no", 85),
    "planter": ("Blockwork planter 1.1 x 1.0 x 0.56 m rendered", "no", 620),
    "step": ("Limestone steps / stepping stone slab", "no", 58),
    "fence": ("Timber guard: posts, rails, 32 mm balusters per metre", "m", 118),
    "pavingbase": ("Concrete base 100 mm + Type 1 under paving", "m2", 21),
    "drain": ("110 mm uPVC drain with bedding per metre", "m", 13),  # was 26; 110 mm pipe 6 m £28.28 inc VAT = £3.9/m ex + pea-gravel bedding + fittings (buildbuddy)
    "manhole": ("Inspection chamber 450 mm", "no", 160),  # was 210; 450 mm chamber base/risers + 10 t cover £62.34 inc VAT (buildbuddy)
    "soak": ("Crate soakaway / attenuation cell per m³", "m3", 190),
    "gully": ("Channel drain / gully", "no", 45),  # was 95; ACO Raindrain £17.70/m inc VAT; trapped gully allowance (buildbuddy)
    # ---- pool, hot tub, gate (supply) ----
    "pooltile": ("Pool mosaic tiles, waterproof render, grout", "m2", 88),
    "poolcope": ("Pool coping stone", "m", 92),
    "poolplant": ("Filter, pump, skimmers, inlets, pipework kit", "no", 4200),
    "poolheat": ("Pool air-source heat pump 18 kW", "no", 6200),
    "pooldose": ("Automatic chlorination / pH dosing", "no", 2300),
    "poollight": ("Pool LED light", "no", 360),
    "poolcover": ("Automatic slatted safety cover, in-pool", "no", 8800),
    "poolshell": ("Plant kiosk / GRP chamber", "no", 3200),
    "hottub": ("Double-width hot tub 3.4 x 2.3 m, 7-seat, supply", "no", 16500),
    "spaplant": ("Spa plant: pump, heater, blower, filtration and dosing for a built-in spa", "no", 6800),
    "gateleaf": ("Aluminium slatted sliding gate leaf 4.95 m", "no", 6400),
    "gatemotor": ("Sliding gate motor, controls, safety edges, photocells, loop", "no", 2600),
    "gatetrack": ("Gate track, guide posts, concrete beam materials", "no", 720),
    # ---- surveys and fixed statutory (pre-construction) ----
    "msurvey": ("Measured building and topographical survey", "no", 5400),
    "asb": ("Asbestos refurbishment survey", "no", 900),
    "cctvd": ("Drainage CCTV survey", "no", 650),
    "bat": ("Bat / ecology survey (roof and chimney works)", "no", 1200),
    "tpo": ("Arboricultural survey and impact assessment", "no", 1800),
    "planfee": ("Planning application fee (householder) + pre-app", "no", 1300),
    "bcfee": ("Building control plan check and inspections", "no", 4600),
    "pwall": ("Party wall surveyor awards (2 neighbours)", "no", 5500),
    "warranty": ("Structural warranty / latent defects cover", "no", 3800),
    "cdmpd": ("CDM principal designer duties", "no", 3200),
}


def rate(key: str) -> float:
    return RATES[key][2]


def unit(key: str) -> str:
    return RATES[key][1]


def desc(key: str) -> str:
    return RATES[key][0]


# Retail check: key -> (previous rate, source note). Parsed from the "# was" comments above.
RATE_CHECK: dict[str, tuple[float, str]] = {}
for _line in open(__file__, encoding="utf-8"):
    _m = re.match(r'\s+"([a-z0-9]+)": \(.*\),\s+# was ([0-9.]+); (.*)$', _line.rstrip())
    if _m:
        RATE_CHECK[_m.group(1)] = (float(_m.group(2)), _m.group(3))

# --------------------------------------------------------------------------
# Quantities measured from the compact model (metres / m² / m³).
# --------------------------------------------------------------------------
Q = dict(
    # new wing envelope
    wing_len=12.306, wing_dep=9.05, wing_gross=111.37, wing_gia=101.8,
    bay_ent_w=4.4, bay_gar_w=6.3, bay_proj=1.67,
    wing_perim_gf=49.9, wing_perim_ff=42.7,
    wall_gf_h=2.8, wall_ff_h=2.55,
    gable_tri=9.7,                   # garage + entrance gable triangles
    openings_wing=60.0,              # garage door, entrance glazing, garden doors, windows, east door
    ff_area=122.4, loft_area=111.4,
    roof_slate_wing=123.6, roof_slate_bays=28.1,   # 22 Sept: the east slope is not carried over the original house (-11.8 m²)
    valley_len=18.0, hip_len=22.0,                  # 22 Sept: one valley fewer (the east one into the original south slope)
    dormer_wing_roof=31.8, dormer_wing_cheek=20.0,  # 22 Sept: the passage's plain east wall (5 m² exposed above the original slope)
    win_wing=19.5, win_dormer_band=9.6, win_loft_garden=7.5,
    ext_door=1, garden_doors=5.64, entrance_glass=5.6,   # 22 Sept: 0.4 m solid band above the door head
    gym_screens=5.4,
    part_gf=21.0, part_ff=50.0, part_loft=30.0, knee_wing=10.2, block_garage=28.0,
    doors_wing=12, walls_wing=520.0, ceil_wing=330.0,   # 22 Sept: + the eaves store door off the loft passage
    flr_hall_stone=47.0, flr_gym=26.6, flr_garage=49.2, flr_util=7.2,
    flr_ff_oak=81.0, flr_bath=16.6, flr_loft=25.0, flr_ensuite=8.3,   # 22 Sept: bathroom 16.6 m² (was 11.1; 7.06 before the 21 Sept widening)
    skirt_wing=300.0, wardrobe_run=4.6, loft_wardrobe_run=3.0, shelving_run=6.5,
    glassbal_wing=17.3,
    # basement
    bas_gross=111.37, bas_gia=101.8, bas_perim=41.8, bas_wall_h=3.0,
    exc_plan=129.0, exc_depth=3.35, backfill_m3=50.0,
    bas_part=36.0, bas_walls=179.0, bas_lining=107.0,
    cinema=20.26, games=72.3, cinema_walls=51.0, rack_run=6.5,
    # link and original front
    link_fp=19.3, link_perim=13.0, link_glass=34.5, link_ceil=58.0,   # 22 Sept: three link bays solid (courtyard notch; glazing centred with a solid bay each end)
    link_flr_gf=16.8, link_flr_ff=21.5, link_flr_loft=21.5, link_walls=45.0,
    front_wall_open=31.0,            # m² of 230 mm brick removed at the central front, 2 storeys
    # side wing
    sw_fp=49.0, sw_perim_new=19.2, sw_ff_h=2.38, sw_wall_net=33.0, sw_render=78.0,
    sw_roof=66.2, sw_win=12.4, sw_doors_glass=5.1, sw_part=24.0, sw_doors=3,
    sw_walls=187.0, sw_ceil=93.7, sw_flr_gf=42.5, sw_flr_ff=36.3, sw_flr_shr=4.8,
    sw_gf_slab=45.7, sw_underpin=19.2, sw_skirt=90.0,
    # rear garden room
    gr_fp=48.7, gr_perim=19.8, gr_wall_solid=13.2, gr_deck=52.2, gr_glass=35.5,
    gr_guard=19.6, gr_walls=38.0, gr_lanterns=3,
    # loft over original house
    ld_roof=46.3, ld_cheek=22.4, ld_band=15.9, loft_floor_orig=85.0,
    slopes_ins=105.0, slopes_pb=149.0, knee_orig=35.5, loft_studio=44.1,
    fire_doors=10,
    # original house
    front_render=60.0, front_win_new=6.2, family_bay=4.7, rear_joinery=25.0,
    # M&E zones (m²)
    me_bas=101.8, me_wing=330.0, me_link=58.0, me_sw=95.0, me_gr=48.7, me_loft=100.0,
    ufh=463.0, rads_area=150.0,
    # external
    drive=402.9, lawn_front=147.9, lawn_side=74.0, paths=28.0,
    court_paving=17.55, ig_steps=4.25, ig_plant=11.0, terraces=24.2,
    pool_terrace=58.3, pool_deck=30.0, pool_water=28.0, pool_perim=23.0, pool_depth=1.5,
    hottub_pav=14.8, loggia_roof=22.0, loggia_floor=22.4, outb_roof=15.1,
    ws_fp=28.1, ws_perim=21.6, ws_roof=29.7, ws_walls_h=2.44,   # 6.45 x 4.36 m from build 44 (owner: full strip width less a crawl space, 1.5x deeper)
    stepping=17, trees=3, hedge_run=28.0, border=25.0,
    gate_wall=3.0,
)


# --------------------------------------------------------------------------
# Plan structure
# --------------------------------------------------------------------------
class Task:
    def __init__(self, ref: str, title: str, qty: float | None, unit_: str, basis: str):
        self.ref, self.title, self.qty, self.unit, self.basis = ref, title, qty, unit_, basis
        self.lines: list[dict] = []

    def add(self, kind: str, key: str, qty: float, note: str = "") -> "Task":
        self.lines.append(dict(kind=kind, key=key, desc=desc(key), qty=round(qty, 2),
                               unit=unit(key), rate=rate(key), total=round(qty * rate(key), 2), note=note))
        return self

    # shorthand helpers
    def mat(self, key, qty, note=""): return self.add("Materials", key, qty, note)
    def lab(self, key, days, note=""): return self.add("Labour", key, days, note)
    def plant(self, key, qty, note=""): return self.add("Plant", key, qty, note)
    def waste(self, key, qty, note=""): return self.add("Waste", key, qty, note)
    def sub(self, key, qty, note=""): return self.add("Specialist / supply", key, qty, note)
    def fee(self, key, qty, note=""): return self.add("Survey / statutory", key, qty, note)

    @property
    def total(self): return sum(l["total"] for l in self.lines)


class Phase:
    def __init__(self, no: int, title: str, weeks: float, summary: str):
        self.no, self.title, self.weeks, self.summary = no, title, weeks, summary
        self.tasks: list[Task] = []

    def task(self, ref, title, qty, unit_, basis) -> Task:
        t = Task(f"{self.no}.{ref}", title, qty, unit_, basis)
        self.tasks.append(t)
        return t

    @property
    def total(self): return sum(t.total for t in self.tasks)


phases: list[Phase] = []


def phase(no, title, weeks, summary) -> Phase:
    p = Phase(no, title, weeks, summary)
    phases.append(p)
    return p


# ==========================================================================
# PHASE 0 — Pre-construction
# ==========================================================================
p = phase(0, "Pre-construction: surveys, investigation and consents", 14,
          "Runs before site start. The model is a photographic reconstruction, not a survey, so a "
          "measured survey and ground investigation are the first spend. Planning and party-wall "
          "lead times set the 14 weeks; design fees are in the summary, not here.")
t = p.task("1", "Measured building survey and topographical survey of the plot", 1, "item",
           "Whole house, outbuildings and 1,246 m² plot; needed before any structural design")
t.fee("msurvey", 1)
t = p.task("2", "Ground investigation for basement and pool", 3, "boreholes",
           "Three 10 m boreholes with groundwater monitoring wells, lab testing, factual and interpretive report")
t.fee("bhole", 3).lab("grd", 2, "Set-up, reinstatement").sub("cdmpd", 0.25, "GI report interpretation share")
t = p.task("3", "Condition and hazard surveys", 1, "item",
           "Asbestos refurbishment survey, drainage CCTV, bat survey for roof/chimney works, tree survey")
t.fee("asb", 1).fee("cctvd", 1).fee("bat", 1).fee("tpo", 1)
t = p.task("4", "Statutory applications and awards", 1, "item",
           "Householder planning fee and pre-app, building control, party wall awards for both neighbours, CDM, warranty")
t.fee("planfee", 1).fee("bcfee", 1).fee("pwall", 1).fee("cdmpd", 1).fee("warranty", 1)

# ==========================================================================
# PHASE 1 — Site set-up and enabling
# ==========================================================================
p = phase(1, "Site set-up, enabling works and tree protection", 2,
          "Hoarding on the front boundary, welfare, temporary power and water, tree protection to "
          "the retained trees, and the fountain island cleared so the forecourt becomes the site compound.")
t = p.task("1", "Hoarding, gates, welfare and temporary services", 1, "item",
           "Front boundary ~17 m plus side returns 40 m; cabin, toilet, drying room; builder's supply")
t.mat("cls", 180, "Hoarding framing").mat("osb", 95, "Hoarding sheets 57 m x 1.8 m").lab("cpt", 4).lab("lab", 4)
t.plant("mixer", 2, "Temporary electrics/water set-up").lab("ele", 2, "Temporary supply board").lab("plm", 1, "Standpipe")
t = p.task("2", "Tree protection fencing and ground protection", 1, "item",
           "Heras fencing round root protection areas of the retained multi-stem and boundary trees")
t.mat("cls", 60).lab("lab", 2).lab("arb", 1, "Set-out with arboriculturist")
t = p.task("3", "Remove fountain, tiered basin, pedestal, kerb and planted island", 1, "item",
           "44 modelled fountain/island objects; island ~ 5 m diameter")
t.plant("exc15", 2).plant("cutsaw", 1).lab("opr", 2).lab("lab", 4).waste("skip8", 3, "Rubble, soil, stone")
t = p.task("4", "Relocate ornamental cherry tree (root-ball transplant)", 1, "no",
           "Model moves it 4.2 m west / 0.8 m north out of the pool footprint; feasibility unverified")
t.lab("arb", 3, "Root-prune, lift, replant, stake").plant("exc15", 1).plant("tele", 1).mat("stakes", 2)

# ==========================================================================
# PHASE 2 — Demolition and soft strip
# ==========================================================================
p = phase(2, "Demolition and soft strip", 3,
          "Everything the proposal removes from the original house and site, taken down before "
          "groundworks. Central front wall comes out under temporary support; the chimney is left "
          "until the roof phase.")
t = p.task("1", "Take down porch, columns, porch roof, front door and frame, arched landing window", 1, "item",
           "Original porch A with round columns; door and fanlight; first-floor arched window")
t.lab("lab", 6).lab("cpt", 2).waste("skip8", 2)
t = p.task("2", "Open the central front wall through ground and first floors (6.04 m wide)", Q["front_wall_open"], "m2",
           "230 mm brick, both storeys, needled and propped until the goalpost steels in phase 7")
t.plant("props", 10, "Needles and props for 10 weeks").lab("cpt", 3, "Needling").lab("lab", 8, "Cut and remove brickwork")
t.plant("cutsaw", 3).waste("skip8", 3, "31 m² x 0.23 m = 7 m³ brick")
t = p.task("3", "Strip the former garage and utility", 1, "item",
           "Garage door, tracks, workbench, utility units, washer, freezer, radiator, partition, floors, flat roof and curved parapet (49 m²)")
t.lab("lab", 10).lab("rfr", 3, "Strip flat roof covering and decking").lab("cpt", 2)
t.waste("skip8", 5).waste("wee", 1)
t = p.task("4", "Remove the polygonal glazed vestibule beside the dining bay; make good", 1, "item",
           "Small glazed link; dining doors retained and re-hung to open to the terrace")
t.lab("lab", 3).lab("brk", 1).mat("mortar", 4).waste("skip8", 1)
t = p.task("5", "Demolish front piers, plinths, railings and hinged gates", 1, "item",
           "Two brick piers with globe lights, plinth walls, iron railings and gates (removed prefixes in model)")
t.lab("lab", 4).plant("exc15", 1).lab("opr", 1).waste("skip8", 2).waste("wee", 1, "Iron gates/railings")
t = p.task("6", "Break out tarmac in the new-wing, basement, pool, side-garden and rear-extension footprints", 280, "m2",
           "111 m² wing/basement + 74 m² side lawn + 35 m² pool + 60 m² rear room/terrace")
t.plant("exc8", 2).lab("opr", 2).lab("lab", 2).waste("muck", 4, "280 m² x 0.1 m = 28 m³ bulked to 35 m³")
t = p.task("7", "Open the summer house front: remove glazing and lower panels; strip outbuilding roof felt", 1, "item",
           "So the pavilion loggia reads as one space with the shed; roof tie-in to the new loggia roof")
t.lab("cpt", 2).lab("rfr", 1).waste("skip8", 1)

# ==========================================================================
# PHASE 3 — Groundworks and basement
# ==========================================================================
p = phase(3, "Groundworks, basement box and foundations", 12,
          "The basement is dug in open ground in front of the house before the wing exists, so there "
          "is no underpinning of the original house: its north wall is 4 m from the house and 3.4 m "
          "from the drawing-room bay. King-post shoring is priced on the two sides nearest the house "
          "and drive; the other two sides are battered. Foundations for every new building on the "
          "site are dug in the same phase.")
exc_m3 = Q["exc_plan"] * Q["exc_depth"]
loads = math.ceil(exc_m3 * 1.25 / 10)
t = p.task("1", "Excavate basement box and cart away", round(exc_m3), "m3",
           f"Plan 9.85 x 13.1 m with 0.4 m working space, 3.35 m to formation; bulking 25% → {loads} loads")
t.plant("exc8", 8).lab("opr", 8).lab("grd", 8).lab("lab", 8).plant("dump", 8)
t.waste("muck", loads)
t = p.task("2", "Earthwork support: king-post and lagging to north and west sides", 22, "m",
           "Sides nearest the house (north, 9.9 m) and drive (west, 13.1 m); south and east battered at 45°")
t.plant("kingpost", 22).plant("exc8", 2, "Auger/pile rig substitute").lab("opr", 2).lab("grd", 4)
t = p.task("3", "Dewatering allowance", 6, "weeks",
           "Wellpoint set on hire for the open-excavation period; groundwater level unknown until the GI")
t.plant("dewater", 6).lab("grd", 3, "Install and pull")
t = p.task("4", "Blinding and 300 mm reinforced raft slab", 129, "m2",
           "50 mm C15 blinding, DPM, 300 mm C35 waterproof concrete, 100 kg/m³ reinforcement")
t.mat("conc15", 129 * 0.05).mat("dpm", 140).mat("conc35w", 129 * 0.30).mat("rebar", 129 * 0.30 * 0.10)
t.mat("waterbar", Q["bas_perim"]).plant("pump", 2).lab("stf", 8).lab("grd", 4)
t = p.task("5", "Reinforced concrete retaining walls 250 mm, 3.0 m high", round(Q["bas_perim"] * Q["bas_wall_h"]), "m2",
           "41.8 m perimeter, both-face formwork, 120 kg/m³ reinforcement, three pours")
wall_m2 = Q["bas_perim"] * Q["bas_wall_h"]
t.mat("form", wall_m2 * 2).mat("conc35w", wall_m2 * 0.25).mat("rebar", wall_m2 * 0.25 * 0.12)
t.plant("pump", 3).lab("cpt", 22, "Formwork erect/strike 250 m² at 12 m²/day").lab("stf", 14).lab("grd", 6)
t = p.task("6", "External tanking, protection board, land drain and granular backfill", round(wall_m2), "m2",
           "Type A membrane outside, perimeter land drain to sump, 50 m³ drainage-stone backfill")
t.mat("membext", wall_m2).mat("landdrain", Q["bas_perim"]).mat("gravel", Q["backfill_m3"] * 1.7)
t.lab("wpf", 8).lab("grd", 4).plant("exc8", 2).lab("opr", 2)
t = p.task("7", "Internal cavity-drain membrane, perimeter channel and twin sump", round(wall_m2 + Q["bas_gross"]), "m2",
           "Type C system to walls and floor with pumped sump — belt and braces on a basement with unknown water table")
t.mat("cdm", wall_m2).mat("cdmfloor", Q["bas_gross"]).mat("sump", 1).lab("wpf", 9).lab("plm", 1)
t = p.task("8", "Ground-floor slab over basement: 200 mm hollowcore planks and 75 mm topping", round(Q["bas_gross"]), "m2",
           "Carries the garage and gallery; stair void 2.75 x 2.4 m formed")
t.mat("hollow", Q["bas_gross"]).mat("topping", Q["bas_gross"]).mat("steel", 0.4, "Trimmer steels round the stair void").plant("crane50", 1).lab("ste", 2).lab("stf", 3).lab("grd", 2)
t = p.task("9", "Strip foundations, entrance and garage bays", 17.4, "m",
           "Two projecting bays outside the basement box; 600 x 1000 mm trench fill")
t.plant("exc15", 2).lab("opr", 2).lab("grd", 4).mat("conc30", 17.4 * 0.6 * 1.0 + 18 * 0.15).mat("mot1", 18 * 0.15 * 2.1).mat("dpm", 20).mat("pir100", 18).mat("mesh", 18).waste("muck", 2)
t = p.task("10", "Foundations and slab, three-storey link (courtyard side)", 13, "m",
           "Three sides ~13 m beside the original front wall; insulated slab 19.3 m²")
t.plant("exc15", 2).lab("opr", 2).lab("grd", 4).mat("conc30", 13 * 0.6 * 1.0 + 19.3 * 0.15)
t.mat("mot1", 19.3 * 0.15 * 2.1).mat("dpm", 22).mat("pir100", 19.3).mat("mesh", 19.3).waste("muck", 2)
t = p.task("11", "Foundations and slab, rear garden living room", round(Q["gr_perim"]), "m",
           "19.8 m perimeter beside existing rear wall and drains; 48.7 m² insulated slab")
t.plant("exc15", 3).lab("opr", 3).lab("grd", 5).mat("conc30", 19.8 * 0.6 * 1.0 + 48.7 * 0.15)
t.mat("mot1", 48.7 * 0.15 * 2.1).mat("dpm", 55).mat("pir100", 48.7).mat("mesh", 48.7).waste("muck", 3)
t = p.task("12", "Foundations and slab, garden workshop 6.45 x 4.36 m", round(Q["ws_perim"]), "m",
           "Rear strip outbuilding; 12.9 m² slab")
t.plant("exc15", 1).lab("opr", 1).lab("grd", 2).mat("conc30", 14.6 * 0.45 * 0.6 + 12.9 * 0.15)
t.mat("mot1", 12.9 * 0.15 * 2.1).mat("dpm", 15).mat("pir100", 12.9).mat("mesh", 12.9).waste("muck", 1)
t = p.task("13", "Foundations, loggia pillars and north return; hot-tub base", 1, "item",
           "Three pad foundations under the 240 mm pillars, strip under the 2.22 m return (the sunken spa has its own basin slab)")
t.plant("exc15", 1).lab("opr", 1).lab("grd", 3).mat("conc30", 3 * 0.6 * 0.6 * 0.8 + 2.2 * 0.5 * 0.8 + 14.8 * 0.15)
t.mat("mot1", 14.8 * 0.15 * 2.1).mat("mesh", 14.8).waste("muck", 1)
t = p.task("14", "Investigate and underpin the former garage foundations for the new storey", round(Q["sw_underpin"]), "m",
           "Mass-concrete underpinning 1 m deep in 1 m bays to west, front and rear walls; contingent on trial pits")
t.lab("grd", 20, "19 bays hand dug in sequence").lab("lab", 10).mat("conc30", 19.2 * 0.6 * 1.0).waste("muck", 2)
t = p.task("15", "Pool excavation, blinding and shell base", 1, "item",
           "8.8 x 4.3 m dig to 1.9 m = 72 m³; 250 mm RC floor, walls with the shell in phase 12")
t.plant("exc8", 2).lab("opr", 2).lab("grd", 3).waste("muck", 9).mat("conc15", 38 * 0.05).mat("conc30", 38 * 0.25)
t.mat("rebar", 38 * 0.25 * 0.10).mat("mesh", 38).lab("stf", 3)

# ==========================================================================
# PHASE 4 — New wing and link superstructure
# ==========================================================================
p = phase(4, "New front wing and link: superstructure and roof", 14,
          "Three storeys over the basement: 12.3 x 9.05 m wing with the projecting entrance and garage "
          "bays, the 5 x 3.9 m glazed link to the old hall, cut roof at 29.7° with the ridge at 8.05 m "
          "running straight into the original ridge, and the 7.5 m flat dormer on the east slope.")
gross_wall = Q["wing_perim_gf"] * Q["wall_gf_h"] + Q["wing_perim_ff"] * Q["wall_ff_h"] + Q["gable_tri"]
net_wall = gross_wall - Q["openings_wing"]
brick_m2, render_m2 = 130.0, net_wall - 130.0
t = p.task("1", "External cavity walls, wing and bays", round(net_wall), "m2",
           f"Gross {gross_wall:.0f} m² less {Q['openings_wing']:.0f} m² openings; 130 m² faced in matching brick, "
           f"{render_m2:.0f} m² block for render (entrance bay, piers, garage band, recess)")
t.mat("brick", brick_m2 * 60 / 1000).mat("block", net_wall, "Inner leaf").mat("block", render_m2, "Outer leaf where rendered")
t.mat("mortar", net_wall * 2).mat("ties", net_wall).mat("cavins", net_wall).mat("lintel", 14)
t.lab("brk", brick_m2 / 5 + (net_wall + render_m2) / 10, "Facing at 5 m²/day, block at 10 m²/day")
t.lab("lab", (brick_m2 / 5 + (net_wall + render_m2) / 10) * 0.5).plant("tele", 12).plant("mixer", 8)
t = p.task("2", "Rendered entrance piers, returns and rake band", 1, "item",
           "Two 0.5 x 0.55 x 5.35 m piers, 1.79 m returns each side, 0.3 m rake band")
t.mat("block140", 2 * 2.1 * 5.35 + 2 * 1.79 * 5.35).mat("mortar", 42).mat("render", 42).lab("brk", 5).lab("lab", 2).lab("rnd", 3)
t = p.task("3", "Structural steel: garage goalpost, entrance frame, garden-door beam, floor transfers, vault", 7.0, "t",
           "Fabricated, delivered, craned in, bolted, fire protected")
t.mat("steel", 7.0).mat("intum", 7.0).mat("bolts", 7.0).mat("padstone", 18)
t.plant("crane30", 2).lab("ste", 8).lab("brk", 2, "Padstones and pockets")
t = p.task("4", "First-floor structure: 300 mm I-joists, deck, vaulted alcove floor", round(Q["ff_area"]), "m2",
           "122 m² at 400 mm centres → 2.7 m of joist per m²")
t.mat("ijoist", Q["ff_area"] * 2.7).mat("ply22", Q["ff_area"]).mat("cls", Q["ff_area"] * 0.8, "Trimmers/strutting")
t.lab("cpt", Q["ff_area"] / 20).lab("lab", Q["ff_area"] / 40)
t = p.task("5", "Loft floor structure across the full wing width", round(Q["loft_area"]), "m2",
           "111 m² so the loft runs out to the eaves behind 1.05 m knee walls")
t.mat("ijoist", Q["loft_area"] * 2.7).mat("ply22", Q["loft_area"]).mat("cls", Q["loft_area"] * 0.8)
t.lab("cpt", Q["loft_area"] / 20).lab("lab", Q["loft_area"] / 40)
slate_all = Q["roof_slate_wing"] + Q["roof_slate_bays"]
t = p.task("6", "Cut roof carcass: main hipped roof and two front gables", round(slate_all), "m2",
           "Rafters 47x200 at 400 c/c (3.2 m/m²), ridge/hip boards, purlins, wall plates; 163 m² of slope")
t.mat("rafter", slate_all * 3.2).mat("glulam", 14, "Ridge and hip beams").mat("cls", slate_all * 0.6, "Wall plates, collars, noggins")
t.lab("cpt", slate_all / 8, "Two carpenters at 16 m²/day on a hipped cut roof with two gables").lab("lab", slate_all / 24).plant("hoist", 4)
t = p.task("7", "Natural slate covering, battens, membrane, dry ridge and hips", round(slate_all), "m2",
           "Slate to match the original roof; 22 m of hip, ridge run 12 m")
t.mat("slate", slate_all).mat("batten", slate_all).mat("brmem", slate_all).mat("slatefix", slate_all).mat("ridge", 34)
t.lab("rfr", slate_all / 10, "Two roofers at 20 m²/day").lab("lab", slate_all / 20)
t = p.task("8", "Leadwork: three valleys into the original roof, abutments, hip soakers", round(Q["valley_len"]), "m",
           "Model has valleys 06, 07 and the west valley where the wing roof meets the original slopes; the east slope stops at the original front wall (owner, 22 September)")
t.mat("lead", Q["valley_len"] + 10).mat("valleyb", Q["valley_len"]).lab("rfr", 6)
t = p.task("9", "Strip and re-lay original slates at the roof junction, the loft passage wall and side-wing tie-in", 34, "m2",
           "Valley margins, the run where the new ridge meets the existing ridge, and the abutment of the passage wall to the original south slope")
t.mat("slate", 10, "Breakages").mat("batten", 34).mat("brmem", 34).lab("rfr", 4.5).lab("lab", 2).waste("skip8", 1)
t = p.task("10", "Wing east dormer: flat warm roof, cheeks, sill wall, the link over the loft bridge and its continuation along the ridge to the rear dormer", round(Q["dormer_wing_roof"]), "m2",
           "3.05 x 7.5 m plus 0.8 x 4.1 m link and 0.95 x 4.2 m passage cap (owner, 21-22 September); 7.64 m ceiling under a 7.86 m roof; the passage's east side is a plain clad wall on the rear dormer's line with a low door into the eaves store")
t.mat("joist", Q["dormer_wing_roof"] * 2.7).mat("osb", Q["dormer_wing_roof"]).mat("pir120", Q["dormer_wing_roof"]).mat("singleply", Q["dormer_wing_roof"])
t.mat("cls", Q["dormer_wing_cheek"] * 3.5, "Cheek and sill framing").mat("pir100", Q["dormer_wing_cheek"]).mat("osb", Q["dormer_wing_cheek"])
t.mat("singleply", Q["dormer_wing_cheek"], "Cheek cladding to match roof").mat("lead", 12)
t.lab("cpt", 6).lab("rfr", 5).lab("lab", 3)
t = p.task("11", "Link: upper floor structures and storey-edge closures", round(2 * Q["link_fp"]), "m2",
           "First-floor landing and loft bridge over the 19.3 m² link; 230 mm white band closures at each storey edge")
t.mat("ijoist", 2 * Q["link_fp"] * 2.7).mat("ply22", 2 * Q["link_fp"]).mat("cls", 40).lab("cpt", 4).lab("lab", 2)
t = p.task("12", "Goalpost steels to the opened original front wall (ground and first floor) and link frame", 5.5, "t",
           "Two 6.5 m beams on posts, plus link columns; padstones into the original walls; props struck after")
t.mat("steel", 5.5).mat("intum", 5.5).mat("bolts", 5.5).mat("padstone", 8).plant("crane30", 1).lab("ste", 6).lab("brk", 3)
t = p.task("13", "Fascia, soffit, 230 mm white band, aluminium gutters and downpipes", 60, "m",
           "Eaves and verges of the wing, bays and link; 6 downpipes")
t.mat("fascia", 60).mat("gutter", 60).mat("downpipe", 6 * 6).lab("cpt", 6).lab("rfr", 3)
t = p.task("14", "Scaffold to the new wing, link and original front (three lifts)", 480, "m2",
           "Perimeter ~62 m x 7.8 m; 14 weeks on the wing, extended for the render and windows")
t.plant("scaf", 480).plant("scafwk", 480 * 8).plant("edge", 60 * 6)
t = p.task("15", "Rooflights: central loft link and original loft stair (2 no.), with upstands and flashings", 2, "no",
           "Owner, 21 September: no rooflight in the dormer roof and none over the loft lounge; two remain")
t.mat("rooflight", 2).mat("cls", 12).mat("singleply", 3).lab("cpt", 2).lab("rfr", 0.75)

# ==========================================================================
# PHASE 5 — Side wing conversion
# ==========================================================================
p = phase(5, "Side wing: former garage and utility into a two-storey wing", 8,
          "Ground floor becomes open side-garden living (42.5 m²); a new storey with a bedroom, family "
          "lounge, hall and shower room sits under the original roof slopes extended west with a hipped end.")
t = p.task("1", "Steel: 4.5 m opening to the garden room, window lintels, spreader beams for the new storey; side entrance door opening cut through the west wall", 2.5, "t",
           "New storey bears on the strengthened garage walls through a ring beam; 0.9 x 2.1 m door opening in the 230 mm west wall with a lintel (owner, 22 September)")
t.mat("steel", 2.5).mat("intum", 2.5).mat("bolts", 2.5).mat("padstone", 8).mat("lintel", 5).plant("crane30", 0.5).lab("ste", 3).lab("brk", 2.5).waste("skip8", 0.25)
t = p.task("2", "New first-floor structure over the garage", round(Q["sw_fp"]), "m2", "49 m² at 400 c/c")
t.mat("ijoist", Q["sw_fp"] * 2.7).mat("ply22", Q["sw_fp"]).mat("cls", 35).lab("cpt", 3).lab("lab", 1.5)
t = p.task("3", "First-floor external cavity walls, rendered", round(Q["sw_wall_net"]), "m2",
           "19.2 m x 2.38 m less 12.6 m² of windows/doors")
t.mat("block", Q["sw_wall_net"] * 2).mat("mortar", Q["sw_wall_net"] * 2).mat("ties", Q["sw_wall_net"]).mat("cavins", Q["sw_wall_net"]).mat("lintel", 6)
t.lab("brk", Q["sw_wall_net"] * 2 / 10).lab("lab", Q["sw_wall_net"] / 10)
t = p.task("4", "Roof: extend the original slopes west with a hipped end; slate to match", round(Q["sw_roof"]), "m2",
           "Measured 66.2 m² of slope in the model (front 28.3, rear 15.7, west hip 22.2)")
t.mat("rafter", Q["sw_roof"] * 3.2).mat("glulam", 6).mat("cls", Q["sw_roof"] * 0.6)
t.mat("slate", Q["sw_roof"]).mat("batten", Q["sw_roof"]).mat("brmem", Q["sw_roof"]).mat("slatefix", Q["sw_roof"]).mat("ridge", 16).mat("lead", 10)
t.lab("cpt", Q["sw_roof"] / 8).lab("rfr", Q["sw_roof"] / 10).lab("lab", Q["sw_roof"] / 20)
t = p.task("5", "Continuous render to the side-wing west, front and rear faces", round(Q["sw_render"]), "m2",
           "Both storeys, matching the modernised original front; no projecting band")
t.mat("render", Q["sw_render"]).lab("rnd", Q["sw_render"] / 14).lab("lab", Q["sw_render"] / 28)
t = p.task("6", "Ground floor: insulated slab and screed replacing the garage floor", round(Q["sw_gf_slab"]), "m2",
           "Old garage floor removed in phase 2; 100 mm PIR, 75 mm screed with UFH pipe (UFH in phase 9)")
t.mat("mot1", Q["sw_gf_slab"] * 0.1 * 2.1).mat("conc30", Q["sw_gf_slab"] * 0.1).mat("dpm", 50).mat("pir100", Q["sw_gf_slab"]).mat("screed", Q["sw_gf_slab"])
t.lab("grd", 3).lab("flr", 2)
t = p.task("7", "Former Bedroom 5 becomes the connecting landing: 1.64 m west opening, window infill, door removed", 1, "item",
           "Opening into the side-wing hall; the west window is bricked up 0.5 x 1.35 m")
t.mat("lintel", 1).mat("block", 2).mat("brick", 0.1).mat("mortar", 4).lab("brk", 2).lab("cpt", 1).lab("lab", 2).waste("skip8", 1)
t = p.task("8", "Scaffold to the side wing (west, front and rear)", 130, "m2", "19 m x 6.8 m, 8 weeks")
t.plant("scaf", 130).plant("edge", 19 * 4)

# ==========================================================================
# PHASE 6 — Rear garden living extension and roof terrace
# ==========================================================================
p = phase(6, "Rear garden living room with roof terrace", 7,
          "Single-storey 9.4 x 5.18 m glazed room behind the kitchen and side wing; its flat roof is a "
          "stone-paved terrace off the upstairs family lounge with three walk-on glass lanterns.")
t = p.task("1", "Steel frame: columns and ring beams carrying the terrace and the glazed elevations", 4.0, "t", "")
t.mat("steel", 4.0).mat("intum", 4.0).mat("bolts", 4.0).mat("padstone", 6).plant("crane30", 1).lab("ste", 4)
t = p.task("2", "West return wall, cavity block, rendered", round(Q["gr_wall_solid"]), "m2", "5.18 x 2.55 m solid end")
t.mat("block", Q["gr_wall_solid"] * 2).mat("mortar", Q["gr_wall_solid"] * 2).mat("render", Q["gr_wall_solid"]).mat("ties", Q["gr_wall_solid"]).mat("cavins", Q["gr_wall_solid"]).lab("brk", 3).lab("lab", 1.5).lab("rnd", 1)
t = p.task("3", "Terrace deck: 200 mm hollowcore on the frame, topping, tapered insulation, single-ply, pedestal stone paving", round(Q["gr_deck"]), "m2",
           "52.2 m² roof; 47.4 m² usable terrace at 2.80 m floor level")
t.mat("hollow", Q["gr_deck"]).mat("topping", Q["gr_deck"]).mat("taper", Q["gr_deck"]).mat("singleply", Q["gr_deck"])
t.mat("limestone", Q["gr_deck"], "20 mm stone on pedestals").mat("pavingbase", 0).plant("crane30", 1).lab("ste", 2).lab("stf", 2)
t.lab("rfr", 5).lab("lsc", 6, "Pedestal paving")
t = p.task("4", "Three walk-on glass lanterns 1 x 1 m and upstands", Q["gr_lanterns"], "no", "In a row deep in the room clear of door sweeps")
t.mat("lantern", 3).mat("cls", 15).lab("cpt", 2).lab("glz", 1.5)
t = p.task("5", "Timber terrace guarding: posts, top/bottom rails, 32 mm balusters at 115 mm", round(Q["gr_guard"]), "m",
           "West 5.12, north 9.4, east 5.12 m; omitted along the existing walls")
t.mat("fence", Q["gr_guard"]).lab("cpt", 4)
t = p.task("6", "Terrace outlets, overflows and rainwater connection", 1, "item", "")
t.mat("downpipe", 8).mat("gully", 2).lab("plm", 1).lab("rfr", 1)
t = p.task("7", "Kitchen opening into the garden room (2.5 m) and flush thresholds", 1, "item",
           "Beam, forming, making good; flush limestone thresholds at the kitchen and side-living doors")
t.mat("steel", 0.6).mat("padstone", 2).lab("ste", 1).lab("brk", 2).lab("lab", 3).plant("props", 2).waste("skip8", 1).mat("limestone", 3)
t = p.task("8", "Scaffold / edge protection to the rear extension", 90, "m2", "")
t.plant("scaf", 90).plant("edge", 20 * 4)

# ==========================================================================
# PHASE 7 — Original house: loft, dormer, chimney, front modernisation
# ==========================================================================
p = phase(7, "Original house: rear dormer, loft floor, chimney and front modernisation", 9,
          "The 12.26 m garden-facing dormer runs over the removed chimney's footprint; a new "
          "independent loft floor spans the original bedrooms; the retained front is rendered and "
          "given modern windows.")
t = p.task("1", "Strip the rear slope, form the dormer opening and trimmers", 1, "item", "46 m² of slate lifted and set aside for reuse")
t.lab("rfr", 4).lab("cpt", 3).lab("lab", 2).waste("skip8", 1)
t.mat("temproof", 120, "Sheeting over the opened rear slope and crash deck over the bedrooms below").lab("lab", 3)
t = p.task("2", "Rear dormer: flat warm roof, cheeks and sill wall", round(Q["ld_roof"]), "m2",
           "12.26 x 3.6 m; ceiling 7.64 m, roof top 7.86 m")
t.mat("joist", Q["ld_roof"] * 2.7).mat("osb", Q["ld_roof"]).mat("taper", Q["ld_roof"]).mat("singleply", Q["ld_roof"])
t.mat("cls", Q["ld_cheek"] * 3.5).mat("pir100", Q["ld_cheek"]).mat("osb", Q["ld_cheek"]).mat("singleply", Q["ld_cheek"]).mat("lead", 20)
t.lab("cpt", 8).lab("rfr", 6).lab("lab", 4)
t = p.task("3", "Take down the chimney stack and breast to below the loft floor; cap and make good", 1, "item",
           "Gallows-bracket support to the retained breast below; slates made good")
t.lab("brk", 4).lab("lab", 4).mat("steel", 0.15, "Gallows brackets").mat("slate", 4).waste("skip8", 2)
t = p.task("4", "New independent loft floor over the original bedrooms and the bridge", round(Q["loft_floor_orig"]), "m2",
           "Steels bearing on original walls; joists clear of the existing ceilings")
t.mat("steel", 3.0).mat("intum", 3.0).mat("bolts", 3.0).mat("padstone", 10).mat("ijoist", Q["loft_floor_orig"] * 2.7).mat("ply22", Q["loft_floor_orig"])
t.plant("crane30", 0.5).lab("ste", 3).lab("cpt", 7).lab("lab", 3)
t = p.task("5", "Insulate the retained roof slopes; plasterboard slopes, dormer ceiling and knee walls", round(Q["slopes_pb"]), "m2",
           "PIR between and under rafters (105 m²), 149 m² of board, 35.5 m² of knee wall framed")
t.mat("pir100", Q["slopes_ins"]).mat("pir50", Q["slopes_ins"]).mat("pb", Q["slopes_pb"]).mat("skim", Q["slopes_pb"])
t.mat("cls", Q["knee_orig"] * 3.5).mat("pb", Q["knee_orig"] * 2).mat("mwool", Q["knee_orig"]).mat("eavesdoor", 4)
t.lab("cpt", 8).lab("pls", Q["slopes_pb"] / 30 + 3)
t = p.task("6", "Form the loft stair void and make good the first-floor ceiling below", 1, "item",
           "1 x 3 m opening at x 9.33–10.33; the flight rises north beside the garden glazing")
t.lab("cpt", 2).lab("pls", 1).mat("cls", 12).mat("pb", 6)
t = p.task("7", "Modernise the retained front: render finish and two new large upper windows", round(Q["front_render"]), "m2",
           "Render on the retained brick geometry; openings enlarged for 2.39 and 2.26 m windows")
t.mat("render", Q["front_render"]).lab("rnd", Q["front_render"] / 14).lab("lab", 3)
t.mat("lintel", 2).lab("brk", 3).lab("lab", 2).waste("skip8", 1)
t = p.task("8", "Brick up the west landing side light and the narrow ground-floor front window", 2, "no", "Full depth of the projected facade")
t.mat("brick", 0.3).mat("block", 4).mat("mortar", 8).lab("brk", 2).lab("lab", 1)
t = p.task("9", "Fire-strategy upgrade for the third storey: FD30 doors to rooms off the escape route", Q["fire_doors"], "no",
           "Existing first-floor and hall doors replaced or upgraded; closers")
t.mat("firedoor", Q["fire_doors"]).mat("iron", Q["fire_doors"]).lab("cpt", Q["fire_doors"] * 0.6)
t = p.task("10", "Scaffold to the rear elevation for the dormer and chimney", 110, "m2", "")
t.plant("scaf", 110).plant("edge", 15 * 6)

# ==========================================================================
# PHASE 8 — Envelope closure
# ==========================================================================
p = phase(8, "Windows, doors, glazing and external finishes", 6,
          "Everything that makes the new buildings weathertight, measured opening by opening from the model.")
win_total = Q["win_wing"] + Q["win_loft_garden"] + Q["sw_win"] + Q["front_win_new"] + Q["family_bay"]
t = p.task("1", "Aluminium windows: wing (19.5 m²), loft garden glass (7.5), side wing (12.4), original front (6.2), family bay (4.7)", round(win_total, 1), "m2",
           "37 openings in total; supply, fix, seal, trims")
t.mat("alwin", win_total).mat("winboard", 45).lab("glz", win_total / 4).lab("lab", win_total / 8)
dormer_win = 3 * 1.2 * 1.2 + 4 * 1.5 * 1.2          # three casements in the wing dormer, four in the rear dormer
dormer_infill = (Q["win_dormer_band"] + Q["ld_band"]) - dormer_win
t = p.task("2", "Dormer windows: three 1.2 x 1.2 m casements in the wing dormer, four 1.5 x 1.2 m in the rear dormer; framed insulated panels between", round(dormer_win, 1), "m2",
           f"Owner, 21 September: standard windows instead of the 7.14 m and 11.9 m glazed bands; {dormer_infill:.1f} m² of clad panel fills the rest of the band")
t.mat("alwin", dormer_win).mat("cls", dormer_infill * 3.5).mat("pir100", dormer_infill).mat("osb", dormer_infill).mat("singleply", dormer_infill, "Cladding to match the cheeks")
t.lab("glz", 3).lab("cpt", 3).lab("lab", 1)
t = p.task("3", "Link glazed screens: courtyard side 19 m², internal-garden side 26.7 m² (three storeys)", round(Q["link_glass"], 1), "m2",
           "3.88 m wide fixed screens at each level on x 9.7 and x 5.5, one continuous two-storey panel on the garden side")
t.mat("alscreen", Q["link_glass"]).plant("crane30", 0.5).lab("glz", 9).lab("lab", 4)
t = p.task("4", "Garden room glazing: north 22.9 m² and east 12.6 m² with two pairs of doors", round(Q["gr_glass"], 1), "m2", "")
t.mat("alslide", Q["gr_glass"]).lab("glz", 8).lab("lab", 3)
t = p.task("5", "Entrance gable: upper glazing above a 0.4 m solid band over the door head (trapezoid panes to the rake); solid rendered panels either side of the doors", round(Q["entrance_glass"]), "m2",
           "Owner, 21 September: less glass round the entrance; 2 x 0.85 x 2.5 m rendered panels replace the lower side glazing")
t.mat("structglass", Q["entrance_glass"]).mat("block", 5.7).mat("mortar", 11.4).mat("render", 5.7).plant("crane30", 0.5).lab("glz", 3).lab("cpt", 1).lab("brk", 1).lab("rnd", 0.5)
t = p.task("6", "Solid oak entrance doors (pair), east external door, side-wing side entrance door, internal-garden double doors, terrace doors, courtyard passage door", 1, "set", "Owner, 21 September: the front doors are solid, not glazed; 22 September: a side entrance door in the side wing's west wall")
t.mat("oakpair", 1).mat("extdoor", 2).mat("alslide", Q["garden_doors"] + Q["sw_doors_glass"]).mat("alscreen", 2.4, "Courtyard passage door and fanlight")
t.lab("glz", 4).lab("cpt", 3)
t = p.task("7", "Insulated sectional garage door 5.44 x 2.35 m, automated", 1, "no", "")
t.mat("garagedoor", 1).lab("spm", 1.5).lab("ele", 0.5)
t = p.task("8", "Render to the wing's rendered areas, entrance bay, garage band and drawing-bay walls", round(render_m2 + 20), "m2",
           "Silicone render system on block; drawing-bay walls per the model's render change")
t.mat("render", render_m2 + 20).lab("rnd", (render_m2 + 20) / 14).lab("lab", (render_m2 + 20) / 28)
t = p.task("9", "Oak cladding band beside the entrance and the 230 mm band under the new roof edges", 8, "m2", "")
t.mat("cls", 30).mat("oak", 8, "Oak boards priced as oak flooring equivalent").lab("cpt", 3)
t = p.task("10", "Refinish the retained rear joinery bronze-black; make good original facades at the junctions", round(Q["rear_joinery"]), "m2",
           "471 retained rear joinery objects recoloured in the model")
t.mat("paint", Q["rear_joinery"] * 2).lab("pnt", 6).lab("brk", 2).mat("mortar", 6)

# ==========================================================================
# PHASE 9 — First-fix M&E
# ==========================================================================
p = phase(9, "Mechanical and electrical: first fix and plant", 6,
          "Wiring, pipework, underfloor heating and ventilation before the boards go on. The house "
          "grows from about 290 m² to about 650 m², so the heat source is replaced by two heat pumps.")
me_total = Q["me_bas"] + Q["me_wing"] + Q["me_link"] + Q["me_sw"] + Q["me_gr"] + Q["me_loft"]
points = me_total * 1.1
t = p.task("1", "Electrical first fix: circuits, containment, back boxes across all new areas", round(me_total), "m2",
           f"{me_total:.0f} m² at 1.1 points/m² → {points:.0f} points; 3 distribution boards")
t.mat("elepoint", points).mat("cu", 3).mat("swa", 120).lab("ele", points / 14, "14 points per electrician-day first fix").lab("lab", 6)
t = p.task("2", "Underfloor heating (wet) to basement, wing ground/first, link, side-wing ground and garden room", round(Q["ufh"]), "m2", "")
t.mat("ufh", Q["ufh"]).lab("plm", Q["ufh"] / 45)
t = p.task("3", "Radiators to the loft and side-wing first floor", 12, "no", "")
t.mat("rad", 12).lab("plm", 4)
t = p.task("4", "Heat source: two 16 kW air-source heat pumps, buffer, two cylinders, controls, external bases", 1, "set", "")
t.mat("ashp", 2).mat("cyl", 2).mat("buffer", 1).mat("conc30", 0.5).lab("plm", 8).lab("ele", 2).plant("tele", 0.5)
t = p.task("5", "MVHR: whole-house unit for the wing/link/garden room and a separate basement unit", 2, "no", "")
t.mat("mvhr", 2).mat("duct", Q["me_wing"] + Q["me_link"] + Q["me_gr"] + Q["me_bas"]).mat("sprinkfree", 1).lab("plm", 9).lab("ele", 1)
t = p.task("6", "Plumbing first fix: hot, cold and waste to 6 wet rooms, utility and kitchen", 8, "rooms", "")
t.mat("pipe", 8).lab("plm", 20, "2.5 days per wet room")
t = p.task("7", "Three-phase supply upgrade, EV chargers, gate and pool supplies", 1, "item", "")
t.mat("3ph", 1).mat("watersup", 1).mat("ev", 2).mat("swa", 160).lab("ele", 5).lab("plm", 1).lab("grd", 2, "Ducts and trenches")
t = p.task("8", "Security, entry and data containment", 1, "item", "")
t.mat("alarm", 1).mat("cctv", 1).mat("intercom", 1).mat("elepoint", 40, "Data/AV outlets").lab("ele", 6).lab("spm", 2)

# ==========================================================================
# PHASE 10 — Internal fit-out
# ==========================================================================
p = phase(10, "Internal fit-out and finishes", 16,
          "Partitions, boarding, plaster, screeds, stairs, wet rooms, joinery, floors and decoration "
          "across the basement, wing, link, side wing, garden room and loft. Quantities are the room "
          "polygons and wall segments of the compact model.")
# partitions
part_all = Q["part_gf"] + Q["part_ff"] + Q["part_loft"] + Q["knee_wing"] + Q["sw_part"] + Q["bas_part"]
t = p.task("1", "Stud partitions, insulated and double-boarded both sides", round(part_all), "m2",
           "Wing 109 m², knee walls 10, side wing 24, basement 36 (acoustic board to the cinema)")
t.mat("mstud", part_all).mat("pb", part_all * 2).mat("pbmr", Q["bas_part"] * 2, "Acoustic upgrade").mat("mwool", part_all)
t.lab("cpt", part_all / 15).lab("pls", part_all / 40)
t = p.task("2", "Blockwork separation walls in the garage (store and east separations)", round(Q["block_garage"]), "m2", "")
t.mat("block", Q["block_garage"]).mat("mortar", Q["block_garage"]).lab("brk", 3).lab("lab", 1.5)
t = p.task("3", "Independent insulated stud lining to the basement retaining walls", round(Q["bas_lining"]), "m2", "Over the cavity-drain membrane")
t.mat("mstud", Q["bas_lining"]).mat("pir50", Q["bas_lining"]).mat("pb", Q["bas_lining"]).lab("cpt", Q["bas_lining"] / 18).lab("pls", 3)
# boarding / skim / paint
walls_all = Q["walls_wing"] + Q["link_walls"] + Q["sw_walls"] + Q["gr_walls"] + Q["bas_walls"]
ceil_all = Q["ceil_wing"] + Q["link_ceil"] + Q["sw_ceil"] + Q["gr_fp"] + Q["bas_gia"]
t = p.task("4", "Plasterboard (where not already boarded), skim and decorate walls", round(walls_all), "m2",
           "Wing 534, link 45, side wing 187, garden room 38, basement 179")
t.mat("pb", walls_all * 0.45, "Masonry walls dot-and-dab share").mat("skim", walls_all).mat("paint", walls_all)
t.lab("pls", walls_all / 30).lab("pnt", walls_all / 55).waste("skipb", 3, "Plasterboard offcuts, phases 10.1–10.5")
t = p.task("5", "Ceilings: board, skim, decorate (incl. vaulted alcove, dormer soffits, MF in the basement)", round(ceil_all), "m2", "")
t.mat("pb", ceil_all).mat("mfceil", Q["bas_gia"]).mat("skim", ceil_all).mat("paint", ceil_all)
t.lab("pls", ceil_all / 25).lab("pnt", ceil_all / 55)
# screeds
screed_all = Q["wing_gia"] + Q["link_fp"] + Q["gr_fp"] + Q["bas_gia"]
t = p.task("6", "Insulation and liquid screed over UFH: wing ground floor, link, garden room, basement", round(screed_all), "m2",
           "100 mm PIR under 60 mm anhydrite screed; upper timber floors take a dry UFH system within the UFH rate")
t.mat("pir100", screed_all).mat("lscreed", screed_all).lab("flr", screed_all / 60).lab("lab", 3)
# stairs / balustrades
t = p.task("7", "Basement stair: single straight oak flight along the garage wall (13 risers), wall handrail, oak guard on the open side", 1, "set",
           "Owner, 21 September: straight flight instead of the dogleg; 2.4 m of raked guard, 2.7 m of void guard, 2.9 m of wall handrail")
t.mat("bstair", 0.7, "Straight flight, no half landing").mat("oakbal", 5.1).mat("skirt", 3, "Wall handrail brackets and rail").lab("cpt", 4)
t = p.task("8", "First-to-loft oak stair (14 risers) and oak balustrades to the loft void, stair and arrival gallery", 1, "set",
           "17.3 m of oak balustrade on the wing/link levels (owner, 21 September: oak, not glass)")
t.mat("stair", 1).mat("oakbal", Q["glassbal_wing"]).lab("cpt", 7)
# doors
doors_all = Q["doors_wing"] + Q["sw_doors"] + 2
t = p.task("9", "Internal doors, frames, architraves and ironmongery", doors_all, "no",
           "Wing 12, side wing 3, basement 2; two FD30s from the garage into the house")
t.mat("intdoor", doors_all - 2).mat("firedoor", 2).mat("iron", doors_all).lab("cpt", doors_all * 0.5)
t = p.task("10", "Internal glazed screens to the gym (1.4 and 1.8 m) and shower screens", 1, "set", "")
t.mat("intglass", Q["gym_screens"]).mat("showerscreen", 4).lab("glz", 2)
# wet rooms
t = p.task("11", "Principal bathroom (16.6 m²): sanitaryware, tiling, twin vanity", 1, "no", "Walls 34 m², floor 16.6 m² (4.99 x 3.32 m since 22 September - half as big again). The gallery shower room is no longer a wet room (owner, 21 September): it is a nook of the suite")
t.mat("bathP", 1).mat("walltile", 34).mat("limestone", Q["flr_bath"]).lab("til", 7).lab("plm", 3).lab("ele", 0.5)
for ref, name, area in (("13", "Loft ensuite", 8.3), ("14", "Side-wing shared shower room", 4.80)):
    t = p.task(ref, f"{name} ({area} m²): sanitaryware, tiling", 1, "no", "")
    t.mat("bathS", 1).mat("walltile", 16).mat("porc", area).lab("til", 3).lab("plm", 2).lab("ele", 0.5)
t = p.task("15", "Utility room extras: 3.2 m counter run, sink, wall cupboards, washer/dryer connections (the former WC space)", 1, "no", "Owner, 21 September: no ground-floor WC")
t.mat("utility", 0.6).mat("porc", 3.23).lab("cpt", 1.5).lab("plm", 1).lab("til", 1)
t = p.task("16", "Utility/laundry: units, sink, washer and dryer connections, tall storage", 1, "no", "Laundry moved down from the first floor in proposal B")
t.mat("utility", 1).mat("porc", 3.96).lab("cpt", 2).lab("plm", 1.5).lab("til", 1)
t = p.task("17", "Kitchen re-plan: relocated sink and cabinet run clear of the garden-room opening", 1, "item",
           "Model moves the sink and cabinets away from the opening; part-new run, worktops, services")
t.mat("kitchen", 1).lab("cpt", 5).lab("plm", 2).lab("ele", 1.5).lab("til", 1)
# joinery
t = p.task("18", "Fitted joinery: dressing room, loft wardrobe, landing library, study desk, lounge storage; office dado panelling and credenza (owner, 22 September)", 1, "set", "")
t.mat("wardrobe", Q["wardrobe_run"] + Q["loft_wardrobe_run"]).mat("shelving", Q["shelving_run"] + 2.2 + 3.0, "Office dado panelling (9 m) and credenza priced as 3 m of joinery").lab("cpt", 9)
t = p.task("19", "Cinema: acoustic lining, rear seating platform, media wall; bar counter, back counter and shelf, stools, wine racking and climate unit", 1, "set",
           "Owner, 21 September: one bar and games room, no wine-store wall")
t.mat("acoustic", Q["cinema_walls"]).mat("cls", 40).mat("ply22", 4).mat("mediawall", 1).mat("winerack", Q["rack_run"]).mat("wineclim", 1)
t.mat("kitchen", 0.55, "Bar counter, back counter with fridge, glass shelf, priced as a kitchen run").mat("shelving", 2.0, "Bar stools and dartboard allowance")
t.lab("cpt", 10).lab("spm", 2).lab("ele", 1.5)
# floors
t = p.task("20", "Limestone floors: entrance gallery, hall and link ground floor", round(Q["flr_hall_stone"] + Q["link_flr_gf"]), "m2", "")
t.mat("limestone", Q["flr_hall_stone"] + Q["link_flr_gf"]).lab("til", (Q["flr_hall_stone"] + Q["link_flr_gf"]) / 9)
t = p.task("21", "Porcelain / stone floors: garden room, side-garden living, bathrooms, utility, WC", round(Q["gr_fp"] + Q["sw_flr_gf"] + Q["flr_bath"] + Q["flr_util"]), "m2", "")
t.mat("porc", Q["gr_fp"] + Q["sw_flr_gf"] + Q["flr_util"]).mat("limestone", Q["flr_bath"]).lab("til", (Q["gr_fp"] + Q["sw_flr_gf"] + Q["flr_bath"] + Q["flr_util"]) / 9)
oak_all = Q["flr_ff_oak"] + Q["link_flr_ff"] + Q["games"]
t = p.task("22", "Engineered oak: first-floor suite/library/study/gallery, link landing, basement games room", round(oak_all), "m2", "")
t.mat("oak", oak_all).lab("flr", oak_all / 25)
carpet_all = Q["flr_loft"] + Q["link_flr_loft"] + Q["loft_studio"] + Q["sw_flr_ff"] + Q["cinema"]
t = p.task("23", "Carpet: loft rooms and bridge, loft studio, side-wing bedroom/lounge/hall, cinema", round(carpet_all), "m2", "")
t.mat("carpet", carpet_all).lab("flr", carpet_all / 45)
t = p.task("24", "Gym rubber floor and garage epoxy floor", round(Q["flr_gym"] + Q["flr_garage"]), "m2", "")
t.mat("rubber", Q["flr_gym"]).mat("epoxy", Q["flr_garage"]).lab("flr", 2)
skirt_all = Q["skirt_wing"] + Q["sw_skirt"] + 60 + 80
t = p.task("25", "Skirtings, architraves and window boards throughout", round(skirt_all), "m", "")
t.mat("skirt", skirt_all).lab("cpt", skirt_all / 45).lab("pnt", skirt_all / 90)
t = p.task("26", "Eaves storage boarding and access doors in the wing loft; the two loft eaves stores off the passage and the hip store off the loft ensuite (walls and low doors); vaulted alcove window seat", 1, "item", "Owner, 22 September: east and west eaves stores under the original hips; the wing loft's hip void walled off")
t.mat("ply22", 62).mat("eavesdoor", 3).mat("intdoor", 3).mat("mstud", 22).mat("pb", 44).mat("skim", 44).mat("shelving", 1.3, "Window seat").lab("cpt", 8).lab("pls", 2.5)
t = p.task("30", "Kitchen to side garden living: take out the 0.8 m pier between the two doorways and both sets of doors for one 2.31 m opening; new lintel, reveals and making good", 1, "item",
           "Owner, 22 September")
t.mat("steel", 0.15, "Lintel over the widened opening").mat("padstone", 2).mat("pb", 8).mat("skim", 14).mat("paint", 16).mat("skirt", 3)
t.plant("props", 1).lab("lab", 1.5).lab("brk", 1).lab("pls", 1).lab("pnt", 0.5).lab("cpt", 0.5).waste("skip8", 0.5)
t = p.task("31", "New openings in the wing walls: a 2.4 x 1.4 m garage window, the gym window enlarged to 2.0 x 1.8 m; the east external door omitted", 1, "item",
           "Owner, 22 September: the east elevation is windows only")
t.mat("alwin", 2.4*1.4 + 2.0*1.8 - 1.25*1.4).mat("lintel", 3).mat("winboard", 4.4).lab("brk", 1.5).lab("glz", 1).lab("lab", 1)
t = p.task("27", "Formal dining and lounge: take out the 3.72 m dining/drawing partition (270 mm masonry) over a new beam and the east display's chamfered corner wall; make good ceilings, cornices and floors", 1, "item",
           "Owner, 21-22 September: one formal dining and lounge; the lounge doors stay; the table is furniture (excluded); the chamfered display wall (1.6 m, with its recess and shelves) goes to widen the opening")
t.mat("steel", 0.5, "4.3 m beam and padstones").mat("padstone", 2).mat("pb", 14).mat("skim", 28).mat("paint", 34).mat("skirt", 10)
t.plant("props", 2).lab("lab", 4.5, "Take down 2.6 m³ of masonry and the chamfer").lab("ste", 1).lab("brk", 2).lab("pls", 2.5).lab("pnt", 1).lab("cpt", 1).waste("skip8", 2)
t = p.task("28", "Side-wing ensuite: door moved to the bedroom wall, hall door closed, basin to the east wall; no ground-floor WC (partition and fittings omitted)", 1, "item",
           "Owner, 21 September: the shared shower room serves the south bedroom; the utility is one room")
t.mat("intdoor", 0).mat("pb", 6).mat("skim", 8).lab("cpt", 1).lab("plm", 1).lab("pls", 0.5)
t = p.task("29", "Principal WC compartment: 1.3 x 1.7 m stud enclosure, door, WC and small basin; twin basins in the bathroom", 1, "item",
           "Owner, 21 September: WC separated from the main bathroom with its own basin")
t.mat("mstud", 9).mat("pbmr", 18).mat("skim", 18).mat("intdoor", 1).mat("iron", 1).mat("wcset", 1).mat("walltile", 8).lab("cpt", 2).lab("pls", 1).lab("plm", 1.5).lab("til", 1)

# ==========================================================================
# PHASE 11 — Second-fix M&E and commissioning
# ==========================================================================
p = phase(11, "Mechanical and electrical: second fix, commissioning and certification", 4, "")
t = p.task("1", "Electrical second fix: accessories, 140 downlights, pendants, external lights, testing", round(me_total), "m2", "")
t.mat("downlight", 140).mat("extlight", 12).mat("smoke", 14).lab("ele", points / 24, "24 points per electrician-day second fix").lab("ele", 3, "Testing and certification")
t = p.task("2", "Heating and hot-water commissioning, MVHR balancing, controls", 1, "item", "")
t.lab("plm", 6).lab("ele", 2)
t = p.task("3", "Lift: re-commission and LOLER inspection after the Bedroom 5 works", 1, "item", "")
t.lab("spm", 1)

# ==========================================================================
# PHASE 12 — External works
# ==========================================================================
p = phase(12, "External works: pool, hot tub, loggia, workshop, drive, gate, gardens and drainage", 12,
          "Priced from the model's surfaces: 403 m² drive, 148 m² front lawn, 28 m² limestone paths, "
          "8 x 3.5 m pool with 88 m² of terrace, a 3.08 x 2.28 m sunken spa, 22 m² loggia, 28.1 m² workshop.")
t = p.task("1", "Pool shell: 250 mm RC walls, waterproof render, mosaic tiles, coping, skimmers/inlets", 1, "no",
           "8 x 3.5 m, 1.5 m deep: 28 m² floor, 23 m perimeter x 1.6 m walls = 37 m²")
t.mat("form", 37 * 2).mat("conc35w", 37 * 0.25).mat("rebar", 37 * 0.25 * 0.12).lab("cpt", 6).lab("stf", 5).plant("pump", 1)
t.mat("pooltile", 28 + 37).lab("til", 9).mat("poolcope", Q["pool_perim"]).lab("lsc", 2)
t = p.task("2", "Pool plant, heating, dosing, lighting, cover and plant chamber", 1, "set", "")
t.mat("poolplant", 1).mat("poolheat", 1).mat("pooldose", 1).mat("poollight", 2).mat("poolcover", 1).mat("poolshell", 1)
t.lab("spm", 10).lab("ele", 2).lab("plm", 2).plant("exc15", 1).lab("opr", 1)
t = p.task("3", "Pool terrace and poolside deck: porcelain on concrete base", round(Q["pool_terrace"] + Q["pool_deck"]), "m2", "")
a = Q["pool_terrace"] + Q["pool_deck"]
t.mat("pavingbase", a).mat("mot1", a * 0.15 * 2.1).mat("porc", a).lab("lsc", a / 8).lab("grd", 2)
t = p.task("4", "Sunken spa: excavation, RC basin (3.08 x 2.28 m, 0.95 m deep) with bench seat, waterproof render and mosaic, stone coping, spa plant and lights, paving, 32 A supply", 1, "set",
           "Owner, 22 September: built into the ground beside the pool with its own water; no packaged tub, skirt or access stair")
_spa_w = 2 * (3.08 + 2.28) * 1.15   # 12.3 m² of basin wall
t.mat("form", _spa_w * 2).mat("conc35w", (_spa_w * 0.2) + (7.0 * 0.2)).mat("rebar", ((_spa_w * 0.2) + (7.0 * 0.2)) * 0.12)
t.mat("pooltile", _spa_w + 7.0).lab("til", 4).mat("poolcope", 2 * (3.08 + 2.28) + 1.3, "0.32 m stone coping all round")
t.mat("spaplant", 1).mat("poollight", 2).mat("porc", Q["hottub_pav"]).mat("pavingbase", Q["hottub_pav"]).mat("swa", 40)
t.plant("exc15", 1).lab("opr", 1).lab("grd", 3).lab("stf", 3).lab("lsc", 3).lab("ele", 1.5).lab("plm", 1.5).waste("muck", 1)
t = p.task("5", "Loggia: flat roof with 0.9 m overhang, plaster soffit, three rendered pillars, north return, paving, lighting", round(Q["loggia_roof"]), "m2", "")
t.mat("joist", Q["loggia_roof"] * 2.7).mat("osb", Q["loggia_roof"]).mat("pir120", Q["loggia_roof"]).mat("grp", Q["loggia_roof"]).mat("pb", Q["loggia_roof"]).mat("skim", Q["loggia_roof"]).mat("paint", Q["loggia_roof"])
t.mat("block140", 3 * 0.96 * 2.4 + 2.22 * 2.39).mat("mortar", 20).mat("porc", Q["loggia_floor"]).mat("pavingbase", Q["loggia_floor"]).mat("extlight", 4)
t.lab("brk", 4).lab("cpt", 5).lab("rfr", 2).lab("pls", 2).lab("lsc", 3).lab("ele", 1).lab("rnd", 1)
t = p.task("6", "Re-cover the outbuilding flat roof where it joins the loggia; re-hang the store and WC doors", round(Q["outb_roof"]), "m2", "")
t.mat("grp", Q["outb_roof"]).lab("rfr", 1.5).lab("cpt", 1)
t = p.task("7", "Garden workshop 6.45 x 4.36 m: insulated cavity block walls, GRP flat roof, 1.2 m door, three windows, 5.3 m bench, power", 1, "no",
           "2.44 m clear ceiling; 40 m armoured supply from the house")
ws_wall = Q["ws_perim"] * Q["ws_walls_h"] - 8.4
t.mat("block", ws_wall * 2).mat("mortar", ws_wall * 2).mat("ties", ws_wall).mat("cavins", ws_wall).mat("lintel", 3)
t.mat("joist", Q["ws_roof"] * 2.7).mat("osb", Q["ws_roof"]).mat("pir120", Q["ws_roof"]).mat("grp", Q["ws_roof"]).mat("fascia", 15)
t.mat("alwin", 6.0).mat("extdoor", 1).mat("pb", ws_wall + Q["ws_fp"]).mat("skim", ws_wall + Q["ws_fp"]).mat("paint", ws_wall + Q["ws_fp"]).mat("epoxy", Q["ws_fp"]).mat("workbench", 1)
t.mat("swa", 45).mat("cu", 1).mat("elepoint", 12).mat("downlight", 6)
t.lab("brk", 11).lab("lab", 6).lab("cpt", 9).lab("rfr", 3).lab("pls", 3.5).lab("pnt", 2).lab("glz", 1.5).lab("ele", 3).lab("grd", 2, "Cable trench")
t = p.task("8", "Resin-bound forecourt over the retained drive, with 20% base repair", round(Q["drive"] - Q["lawn_side"]), "m2",
           "403 m² drive less the 74 m² returned to lawn; asphalt regulating course where the base has failed")
drive = Q["drive"] - Q["lawn_side"]
t.mat("resin", drive).mat("asphalt", drive * 0.2).mat("edging", 60).lab("lsc", drive / 40).lab("lab", drive / 60).plant("mixer", 2)
t = p.task("9", "Front boundary: new brick wall stubs with coping, make good returns, 4.8 m automated sliding gate", 1, "set",
           "Gate leaf 4.95 m sliding along the inside face of the north wing wall; 5.1 m travel")
t.mat("brick", 3.0 * 1.85 * 2 * 60 / 1000).mat("mortar", 12).mat("coping", 3.5).mat("conc30", 3.5 * 0.5 * 0.6)
t.mat("gateleaf", 1).mat("gatemotor", 1).mat("gatetrack", 1).mat("conc30", 5.5 * 0.4 * 0.5).mat("swa", 25)
t.lab("brk", 3).lab("lab", 2).lab("grd", 2).lab("spm", 3).lab("ele", 1)
t = p.task("10", "Side garden: topsoil, turf, border and hedge along the south and east boundaries, three multi-stem trees", round(Q["lawn_side"] + Q["border"]), "m2",
           "Lawn 74 m²; border ~25 m²; hedge 28 m run; trees at (3.55,-21.9), (9.2,-21.0), (14.6,-20.4)")
t.mat("topsoil", Q["lawn_side"] * 0.25 * 1.4 + Q["border"] * 0.4 * 1.4).mat("turf", Q["lawn_side"]).mat("shrub", Q["border"]).mat("hedge", Q["hedge_run"])
t.mat("tree", Q["trees"]).mat("stakes", Q["trees"]).lab("lsc", 8).plant("exc15", 2).lab("opr", 2)
t = p.task("11", "Front lawn (remainder) and stone edging", round(Q["lawn_front"] - Q["lawn_side"]), "m2", "Model's 148 m² front lawn less the side-garden share above")
t.mat("topsoil", (Q["lawn_front"] - Q["lawn_side"]) * 0.15 * 1.4).mat("turf", Q["lawn_front"] - Q["lawn_side"]).mat("edging", 30).lab("lsc", 4)
t = p.task("12", "Limestone paths (1 m wide) along the garage gable and the wing's east wall; courtyard paving; terraces", round(Q["paths"] + Q["court_paving"] + Q["terraces"]), "m2", "")
a = Q["paths"] + Q["court_paving"] + Q["terraces"]
t.mat("pavingbase", a).mat("mot1", a * 0.15 * 2.1).mat("limestone", a).lab("lsc", a / 7).lab("grd", 2)
t = p.task("13", "Internal garden (open-to-sky, 15.5 m²): four limestone steps, planting, gully and rainwater leader, lighting", 1, "item", "")
t.mat("step", 4).mat("pavingbase", Q["ig_steps"]).mat("topsoil", Q["ig_plant"] * 0.4 * 1.4).mat("shrub", Q["ig_plant"]).mat("gully", 2).mat("drain", 8).mat("extlight", 3)
t.lab("lsc", 4).lab("grd", 1).lab("ele", 0.5)
t = p.task("14", "Forecourt planters (two, rendered) with olives and clipped box; five uplights; arrival threshold", 1, "set", "")
t.mat("planter", 2).mat("olive", 2).mat("box", 6).mat("extlight", 5).mat("limestone", 4).mat("pavingbase", 4).lab("brk", 2).lab("rnd", 1).lab("lsc", 2).lab("ele", 1)
t = p.task("15", "Stepping stones: seven across the lawn to the pool, ten to the workshop", Q["stepping"], "no", "")
t.mat("step", Q["stepping"]).lab("lsc", 2)
t = p.task("16", "Drainage: foul and surface-water connections for the wing, garden room, pool backwash and terrace; new chambers; SuDS attenuation", 1, "item",
           "≈ 90 m of new drain, 6 chambers, 25 m³ of crate attenuation for the new roofs and resin")
t.mat("drain", 90).mat("manhole", 6).mat("soak", 25).mat("gravel", 30).plant("exc15", 6).lab("opr", 6).lab("grd", 10).waste("muck", 4)
t = p.task("17", "External lighting and power around the garden, pool and paths", 1, "item", "")
t.mat("extlight", 14).mat("swa", 180).mat("elepoint", 8).lab("ele", 5).lab("grd", 3)
t = p.task("18", "Reinstate lawns and beds disturbed by the works; final garden clean", 1, "item", "")
t.mat("topsoil", 20).mat("turf", 120).lab("lsc", 5)

# ==========================================================================
# PHASE 13 — Completion
# ==========================================================================
p = phase(13, "Completion, testing, cleaning and handover", 2, "")
t = p.task("1", "Builder's clean, sparkle clean, snagging, O&M manuals, EPC, Part P / Gas / BC completion certificates", 1, "item", "")
t.mat("airtest", 1).lab("lab", 10).lab("cpt", 4).lab("pnt", 4).lab("ele", 1).lab("plm", 1).waste("skip12", 2)

# ==========================================================================
# Preliminaries (built up from the programme, not a percentage)
# ==========================================================================
# Planned start week of each site phase (overlaps where the work allows)
START = {1: 1, 2: 2, 3: 4, 4: 14, 5: 16, 6: 18, 7: 24, 8: 28, 9: 33, 10: 37, 11: 51, 12: 40, 13: 55}
site_weeks = max(START[ph.no] + ph.weeks - 1 for ph in phases if ph.no >= 1)
prelims = Phase(90, "Preliminaries (site management and running costs over the build)", site_weeks,
                f"{site_weeks:.0f} weeks on site from set-up to handover on the overlapped programme below "
                f"(the phases sum to {sum(ph.weeks for ph in phases if ph.no >= 1):.0f} weeks end to end).")
t = prelims.task("1", "Site manager, full time", site_weeks, "weeks", "")
t.lab("sm", site_weeks)
t = prelims.task("2", "Contractor's surveyor, part time", site_weeks, "weeks", "")
t.lab("qs", site_weeks)
t = prelims.task("3", "Welfare cabin, toilet, drying room, hire and servicing", site_weeks, "weeks", "")
t.plant("welfare", site_weeks)
t = prelims.task("4", "Temporary electricity and water consumption", site_weeks, "weeks", "")
t.plant("tempserv", site_weeks)
t = prelims.task("5", "Telehandler on site through the superstructure phases (weeks 4–30)", 26, "weeks", "")
t.plant("tele", 26 * 5)
t = prelims.task("6", "Small tools, consumables, PPE, signage, fire points", site_weeks, "weeks", "")
t.plant("consum", site_weeks)
t = prelims.task("7", "General attendance labourer (cleaning, unloading, protection)", site_weeks, "weeks", "")
t.lab("lab", site_weeks * 3)
t = prelims.task("8", "Protection of the occupied original house: dust screens, floor protection, weekly cleans", 1, "item", "")
t.mat("osb", 60).mat("dpm", 400).lab("lab", 12)
t = prelims.task("9", "Rubbish removal not attributed to tasks (packaging, offcuts)", site_weeks / 2, "skips", "")
t.waste("skip12", site_weeks / 2)
t = prelims.task("10", "Contractor's insurance, bonds and design coordination (allowance)", 1, "item", "")
t.sub("insurance", 1)


# ==========================================================================
# Time: people on the job at once, and how long each job takes
# ==========================================================================
# Crew = people working the task at the same time. Duration = person-days / crew,
# rounded up to whole working days (5-day week). Tasks with no labour have a
# lead time instead (surveys, consents, supply-only items).
CREW_DEFAULT = 2
CREW = {
    "1.1": 3, "1.3": 3,
    "2.1": 3, "2.2": 3, "2.3": 4, "2.5": 2, "2.6": 3,
    "3.1": 4, "3.2": 3, "3.4": 4, "3.5": 4, "3.6": 3, "3.7": 3, "3.8": 4, "3.9": 2, "3.10": 3, "3.11": 3, "3.14": 3, "3.15": 3,
    "4.1": 4, "4.3": 3, "4.4": 2, "4.5": 2, "4.6": 3, "4.7": 3, "4.10": 3, "4.12": 3, "4.13": 2,
    "5.1": 3, "5.3": 3, "5.4": 3, "5.5": 2,
    "6.1": 3, "6.3": 4, "6.7": 3,
    "7.2": 3, "7.4": 3, "7.5": 3, "7.7": 3,
    "8.1": 3, "8.3": 4, "8.4": 3, "8.5": 3, "8.6": 2,
    "9.1": 3, "9.2": 2, "9.4": 3, "9.5": 2, "9.6": 2, "9.7": 3,
    "10.1": 3, "10.4": 4, "10.5": 3, "10.6": 3, "10.17": 2, "10.19": 2, "10.20": 2, "10.21": 2, "10.22": 2, "10.25": 2,
    "11.1": 3,
    "12.1": 4, "12.2": 3, "12.3": 3, "12.4": 3, "12.5": 3, "12.7": 3, "12.8": 4, "12.9": 3, "12.10": 3, "12.12": 3, "12.16": 4, "12.17": 2,
    "13.1": 4,
}
LEAD_DAYS = {"0.1": 10, "0.2": 20, "0.3": 10, "0.4": 60, "90.1": 0, "90.2": 0, "90.3": 0, "90.4": 0, "90.5": 0,
             "90.6": 0, "90.7": 0, "90.8": 0, "90.9": 0, "90.10": 0}


def task_time(tk: Task) -> dict:
    person_days = sum(ln["qty"] for ln in tk.lines if ln["kind"] == "Labour" and ln["unit"] == "day")
    crew = CREW.get(tk.ref, CREW_DEFAULT)
    if person_days > 0:
        duration = max(math.ceil(person_days / crew), LEAD_DAYS.get(tk.ref, 0))
    else:
        duration = LEAD_DAYS.get(tk.ref, 1)
    return dict(personDays=round(person_days, 1), crew=crew if person_days > 0 else 0, workingDays=duration)


for ph in phases + [prelims]:
    for tk in ph.tasks:
        tk.time = task_time(tk)

# ==========================================================================
# Summaries
# ==========================================================================
def money(x: float) -> str:
    return f"£{x:,.0f}"


construction = sum(ph.total for ph in phases)
prelims_total = prelims.total
subtotal = construction + prelims_total
ohp = subtotal * 0.07
contingency = subtotal * 0.125
fees_pct = 0.11
fees = (subtotal + ohp) * fees_pct
pre_vat = subtotal + ohp + contingency + fees
vat = pre_vat * 0.20
total = pre_vat + vat

# --------------------------------------------------------------------------
# Delivery scenarios: the owner manages the site and pays trades directly
# --------------------------------------------------------------------------
DIY_TRADES = {"General labourer", "Painter and decorator", "Landscaper / paver", "Carpenter / joiner",
              "Floor layer", "Tiler", "Plasterer / dryliner"}
SELF_MANAGED_DROPS = {"90.1", "90.2", "90.10"}          # site manager, contractor's QS, contractor's insurance
WEEK_SCALED = {"90.3", "90.4", "90.6", "90.7", "90.9"}   # welfare, temporary services, consumables, attendance, skips


# The shell: structure and weathertight envelope, plus the surveys, demolition and
# below-ground drainage it cannot start without. Everything else is internal work
# or external works.
SHELL_TASKS = {
    "0.1", "0.2", "0.3", "0.4",
    "1.1", "1.2", "1.3",
    "2.1", "2.2", "2.3", "2.4", "2.6",
    *(f"3.{i}" for i in range(1, 12)), "3.14",
    *(f"4.{i}" for i in range(1, 16)),
    *(f"5.{i}" for i in range(1, 9)),
    *(f"6.{i}" for i in range(1, 9)),
    "7.1", "7.2", "7.3", "7.4", "7.6", "7.7", "7.8", "7.10",
    *(f"8.{i}" for i in range(1, 10)),
    "12.16",
    "90.3", "90.4", "90.5", "90.6", "90.7", "90.8", "90.9",
}


def scenario(self_managed: bool, labour_discount: float, diy_share: float, weeks: float,
             fee_pct: float, cont_pct: float, only: set | None = None) -> dict:
    works = prelim = 0.0
    for ph in phases + [prelims]:
        for tk in ph.tasks:
            if self_managed and tk.ref in SELF_MANAGED_DROPS:
                continue
            if only is not None and tk.ref not in only:
                continue
            for ln in tk.lines:
                v = ln["total"]
                if tk.ref in WEEK_SCALED:
                    v *= weeks / site_weeks
                if ln["kind"] == "Labour" and ln["unit"] == "day":
                    v *= 1 - labour_discount
                    if ln["desc"] in DIY_TRADES:
                        v *= 1 - diy_share
                if ph.no == 90:
                    prelim += v
                else:
                    works += v
    if self_managed:
        prelim += rate("ownerins")
    sub = works + prelim
    o = 0.0 if self_managed else sub * 0.07
    c = sub * cont_pct
    f = (sub + o) * fee_pct
    ex = sub + o + c + f
    return dict(works=round(works), preliminaries=round(prelim), overheadAndProfit=round(o), contingency=round(c),
                professionalFees=round(f), totalExVat=round(ex), totalIncVat=round(ex * 1.2), weeks=weeks,
                labourDiscount=labour_discount, diyShare=diy_share, feePct=fee_pct, contingencyPct=cont_pct,
                selfManaged=self_managed)


scenarios = [
    ("A", "Main contractor, as priced above", scenario(False, 0.0, 0.0, site_weeks, fees_pct, 0.125)),
    ("B", "Self-managed: you run the site, trades paid directly at the listed day rates, 78 weeks",
     scenario(True, 0.0, 0.0, 78, 0.06, 0.125)),
    ("C", "B with mates' rates: every trade 20% below the listed day rate", scenario(True, 0.20, 0.0, 78, 0.06, 0.125)),
    ("D", "C and you do half of the DIY-able trade days yourself, 90 weeks", scenario(True, 0.20, 0.5, 90, 0.06, 0.125)),
    ("E", "D with contingency cut to 10%", scenario(True, 0.20, 0.5, 90, 0.06, 0.10)),
]
diy_days = sum(ln["qty"] for ph in phases + [prelims] for tk in ph.tasks for ln in tk.lines
               if ln["kind"] == "Labour" and ln["unit"] == "day" and ln["desc"] in DIY_TRADES)

shell_scenarios = [
    ("S1", "Shell only, self-managed, trades at the listed day rates, 40 weeks", scenario(True, 0.0, 0.0, 40, 0.06, 0.125, SHELL_TASKS)),
    ("S2", "S1 with mates' rates, 20% off every day rate", scenario(True, 0.20, 0.0, 40, 0.06, 0.125, SHELL_TASKS)),
    ("S3", "S2 and you do half the DIY-able trade days in the shell (labouring, carpentry)", scenario(True, 0.20, 0.5, 44, 0.06, 0.125, SHELL_TASKS)),
]
# what the owner buys for the internal work, and the trade days they replace
internal_tasks = [tk for ph in phases + [prelims] for tk in ph.tasks
                  if tk.ref not in SHELL_TASKS and tk.ref not in SELF_MANAGED_DROPS and not tk.ref.startswith("12.")
                  and tk.ref not in ("1.4", "2.5", "2.7", "3.12", "3.13", "3.15")]
external_tasks = [tk for ph in phases for tk in ph.tasks
                  if tk.ref.startswith("12.") and tk.ref != "12.16" or tk.ref in ("1.4", "2.5", "2.7", "3.12", "3.13", "3.15")]


def split(tasks):
    m = sum(ln["total"] for tk in tasks for ln in tk.lines if ln["kind"] in ("Materials", "Specialist / supply", "Survey / statutory"))
    pl = sum(ln["total"] for tk in tasks for ln in tk.lines if ln["kind"] in ("Plant", "Waste"))
    days = sum(ln["qty"] for tk in tasks for ln in tk.lines if ln["kind"] == "Labour" and ln["unit"] == "day")
    lab = sum(ln["total"] for tk in tasks for ln in tk.lines if ln["kind"] == "Labour")
    return dict(materials=round(m), plantAndWaste=round(pl), tradeDays=round(days), labour=round(lab), tasks=len(tasks))


internal = split(internal_tasks)
external = split(external_tasks)
shell_days = sum(ln["qty"] for ph in phases + [prelims] for tk in ph.tasks for ln in tk.lines
                 if tk.ref in SHELL_TASKS and ln["kind"] == "Labour" and ln["unit"] == "day")
shell_diy_days = sum(ln["qty"] for ph in phases + [prelims] for tk in ph.tasks for ln in tk.lines
                     if tk.ref in SHELL_TASKS and ln["kind"] == "Labour" and ln["unit"] == "day" and ln["desc"] in DIY_TRADES)
day_labour = sum(ln["total"] for ph in phases + [prelims] for tk in ph.tasks for ln in tk.lines
                 if ln["kind"] == "Labour" and ln["unit"] == "day")

# ==========================================================================
# Savings menu: spec, method, procurement and scope choices, each priced
# from the plan's own quantities. Applied on the page by ticking them.
# ==========================================================================
STEEL_TASKS = ["4.3", "4.12", "5.1", "6.1", "7.4"]
SAVINGS = [
    # ---- specification ----
    dict(id="upvc_windows", group="Specification", label="uPVC casement windows instead of aluminium (78 m²)",
         note="Aluminium £550/m² → uPVC ≈ £280/m² supply", rates={"alwin": 280}),
    dict(id="std_doors", group="Specification", label="Standard sliding / French doors instead of the premium aluminium sets",
         note="£950/m² → £650/m² supply", rates={"alslide": 650}),
    dict(id="plain_screens", group="Specification", label="Simpler fixed screens to the link and courtyard passage",
         note="£650/m² → £450/m² supply", rates={"alscreen": 450}),
    dict(id="std_gable", group="Specification", label="Standard aluminium curtain glazing to the entrance gable instead of slim structural glazing",
         note="£1,500/m² → £900/m² supply", rates={"structglass": 900}),
    dict(id="fibre_slate", group="Specification", label="Fibre-cement slate instead of natural slate (new roofs will not match the original)",
         note="£40/m² → £18/m²", rates={"slate": 18}),
    dict(id="one_lantern", group="Specification", label="One walk-on glass lantern in the terrace instead of three",
         note="Two fewer £2,900 lanterns", linescale={"6.4": {"lantern": 1 / 3, "cpt": 0.5, "glz": 0.5}}),
    dict(id="timber_terrace", group="Specification", label="Timber deck on joists over the garden room instead of hollowcore, tapered insulation and pedestal stone",
         note="Deck ≈ 45% of the concrete-and-stone build-up; lighter steel too", scale={"6.3": 0.45}, linescale={"6.1": {"steel": 0.85}}),
    dict(id="composite_door", group="Specification", label="Composite entrance doors instead of the oak pair",
         note="£5,200 → £1,450", rates={"oakpair": 1450}),
    dict(id="manual_garage", group="Specification", label="Manual up-and-over garage door instead of automated sectional",
         note="£5,400 → £1,200", rates={"garagedoor": 1200}),
    dict(id="upvc_doors", group="Specification", label="uPVC French doors and fixed panes to the garden room, internal garden and terrace instead of aluminium sliders",
         note="£950/m² → £450/m² supply", rates={"alslide": 450}),
    dict(id="cheap_brick", group="Specification", label="Cheaper facing brick (Wienerberger Tuscan Red Multi £0.78 inc VAT)",
         note="£850 → £650 per 1000", rates={"brick": 650}),
    dict(id="render_wing", group="Specification", label="Render the whole wing instead of facing brick on the 130 m² brick areas",
         note="Blockwork outer leaf, sand-cement render; bricklayer lays twice as fast", linescale={"4.1": {"brick": 0, "block": 1.35, "brk": 0.75, "lab": 0.75}}, add=130 * 9, addTo="shell"),
    dict(id="solid_joists", group="Specification", label="Solid C24 47x225 joists instead of I-joists (engineer to confirm spans; intermediate steel already in the plan)",
         note="£10/m → £4.30/m over ≈ 1,100 m of joist", rates={"ijoist": 4.3}),
    dict(id="basic_rooflights", group="Specification", label="Basic flat rooflights instead of premium fixed units (2 no.)",
         note="£1,650 → £700 each", rates={"rooflight": 700}),
    dict(id="no_lanterns", group="Specification", label="No walk-on glass lanterns in the terrace",
         note="Removes task 6.4", drop=["6.4"]),
    dict(id="upvc_rwg", group="Specification", label="uPVC gutters, downpipes, fascias and soffits instead of aluminium and fibre-cement",
         note="Gutter £38 → £8/m, downpipe £33 → £7/m, fascia/soffit £34 → £18/m", rates={"gutter": 8, "downpipe": 7, "fascia": 18}),
    dict(id="roof_basics", group="Specification", label="Mortar-bedded ridges, GRP valley troughs and EPDM on the flat roofs instead of dry-fix, lead valleys and PVC single-ply",
         note="Ridge £27 → £12/m, valleys £34 → £14/m, membrane £28 → £16/m²", rates={"ridge": 12, "lead": 14, "singleply": 16}),
    dict(id="sc_render", group="Specification", label="Sand-and-cement render with masonry paint instead of a silicone render system",
         note="£21 → £9/m² over ≈ 250 m²", rates={"render": 9}),
    dict(id="sc_screed", group="Specification", label="Sand-and-cement screed instead of pumped liquid screed",
         note="£26 → £15/m² over 272 m²; slower to lay", rates={"lscreed": 15}),
    # ---- basic finishes, services and externals: your own materials ----
    dict(id="softwood_stairs", group="Basic finishes (your materials)", label="Softwood and MDF painted stairs instead of hardwood and oak",
         note="Basement £7,400 → £2,800; loft £6,200 → £2,400", rates={"bstair": 2800, "stair": 2400}),
    dict(id="basic_doors", group="Basic finishes (your materials)", label="Primed four-panel internal doors and basic ironmongery instead of oak (19 doors)",
         note="£430 → £120 a door, £95 → £55 a set", rates={"intdoor": 120, "iron": 55}),
    dict(id="basic_floors", group="Basic finishes (your materials)", label="Porcelain instead of limestone, laminate instead of engineered oak",
         note="Limestone £62 → £32/m², oak £48 → £18/m²", rates={"limestone": 32, "oak": 18}),
    dict(id="basic_bathrooms", group="Basic finishes (your materials)", label="Basic sanitaryware and wall tiles in the five wet rooms",
         note="Principal £3,600 → £1,800, secondary £2,400 → £1,200, WC £900 → £500, tiles £62 → £30/m²", rates={"bathP": 1800, "bathS": 1200, "wcset": 500, "walltile": 30}),
    dict(id="basic_kitchen", group="Basic finishes (your materials)", label="Trade-range kitchen and utility units instead of the priced allowance",
         note="Kitchen £14,500 → £8,000; utility £3,200 → £1,800", rates={"kitchen": 8000, "utility": 1800}),
    dict(id="basic_joinery", group="Basic finishes (your materials)", label="Flat-pack wardrobes and shelving instead of fitted joinery",
         note="£1,150 → £350/m wardrobes, £640 → £250/m shelving", rates={"wardrobe": 350, "shelving": 250}),
    dict(id="basic_cinema", group="Basic finishes (your materials)", label="Basic cinema acoustic panels, simple media wall, plain wine racking",
         note="£95 → £30/m², £3,800 → £1,200, £720 → £250/m", rates={"acoustic": 30, "mediawall": 1200, "winerack": 250}),
    dict(id="basic_lighting", group="Basic services (your materials)", label="Basic LED downlights and external fittings",
         note="£32 → £12 a downlight, £165 → £60 an external light", rates={"downlight": 12, "extlight": 60}),
    dict(id="basic_security", group="Basic services (your materials)", label="Basic alarm, two-camera CCTV, audio intercom; one EV charger",
         note="Alarm £1,600 → £600, CCTV £1,900 → £700, intercom £850 → £300", rates={"alarm": 600, "cctv": 700, "intercom": 300}, linescale={"9.7": {"ev": 0.5}}),
    dict(id="no_mvhr", group="Basic services (your materials)", label="Extract fans and trickle vents instead of two MVHR systems",
         note="Removes the units and 539 m² of ducting; adds £900 of fans", linescale={"9.5": {"mvhr": 0, "duct": 0, "plm": 0.2, "ele": 0.5}}, add=900, addTo="own"),
    dict(id="gas_boiler", group="Basic services (your materials)", label="One large gas system boiler and cylinder instead of two air-source heat pumps (loses the heat-pump grant; check the gas supply capacity)",
         note="£11,000 of heat pumps → £2,200 boiler; half the installation days", linescale={"9.4": {"ashp": 0, "buffer": 0, "cyl": 0.5, "plm": 0.5, "ele": 0.5}}, add=2200, addTo="own"),
    dict(id="gravel_drive", group="Basic externals (your materials)", label="Gravel over the existing tarmac instead of resin-bound",
         note="£33 → £6/m² over 329 m²; no asphalt repair", rates={"resin": 6}, linescale={"12.8": {"asphalt": 0}}),
    dict(id="manual_gates", group="Basic externals (your materials)", label="Manual swing gates instead of the automated sliding gate",
         note="£9,700 of gate, motor and track → £2,500", linescale={"12.9": {"gateleaf": 0, "gatemotor": 0, "gatetrack": 0, "spm": 0.3, "ele": 0}}, add=2500, addTo="own"),
    dict(id="basic_pool", group="Basic externals (your materials)", label="Steel-panel liner pool kit with a manual roller cover instead of a tiled concrete shell with an automatic cover",
         note="Shell materials and tiling → £8,000 kit; cover £8,800 → £1,200", linescale={"12.1": {"form": 0, "conc35w": 0, "rebar": 0, "pooltile": 0, "cpt": 0.3, "stf": 0.3, "til": 0, "pump": 0}}, rates={"poolcover": 1200}, add=8000, addTo="own"),
    dict(id="basic_hottub", group="Basic externals (your materials)", label="Rendered and painted spa basin with porcelain coping instead of mosaic and stone",
         note="Mosaic £88/m² → waterproof render and pool paint; stone coping → porcelain", linescale={"12.4": {"pooltile": 0.3, "poolcope": 0.4, "til": 0.5}}, add=400, addTo="own"),
    dict(id="timber_workshop", group="Basic externals (your materials)", label="Insulated timber-frame workshop instead of cavity blockwork",
         note="Block, mortar, ties, cavity batts, lintels and bricklayer days replaced by £1,400 of studwork, OSB, PIR and membrane", linescale={"12.7": {"block": 0, "mortar": 0, "ties": 0, "cavins": 0, "lintel": 0, "brk": 0, "lab": 0.5}}, add=1400, addTo="own"),
    dict(id="basic_paving", group="Basic externals (your materials)", label="Concrete flags instead of limestone paths and porcelain terraces",
         note="£62 → £18/m² and £32 → £18/m² on ≈ 190 m² of external paving", rates={"limestone": 32, "porc": 18}),
    dict(id="smaller_trees", group="Basic externals (your materials)", label="Smaller trees and planters",
         note="£720 → £150 a tree, planters £620 → £250", rates={"tree": 150, "planter": 250}),
    # ---- method ----
    dict(id="spoil_onsite", group="Method", label="Keep 40% of the basement spoil on the plot to regrade the side garden and rear strip",
         note="22 fewer lorry loads", linescale={"3.1": {"muck": 0.6}}),
    dict(id="batter_all", group="Method", label="Batter all four sides of the basement dig instead of king-posts on two (needs the GI to allow it and the drive closed for the dig)",
         note="Removes task 3.2", drop=["3.2"]),
    dict(id="lean_steel", group="Method", label="Engineer-optimised steel: about 19 t instead of 23 t",
         note="18% off every steel line", linescale={r: {"steel": 0.82, "intum": 0.82, "bolts": 0.82} for r in STEEL_TASKS}),
    dict(id="no_dewater", group="Method", label="No dewatering (only if the boreholes show a low water table)",
         note="Removes task 3.3", drop=["3.3"]),
    dict(id="skip_underpin", group="Method", label="No underpinning of the old garage (only if trial pits show footings that can carry a storey)",
         note="Removes task 3.14", drop=["3.14"]),
    dict(id="type_c_only", group="Method", label="Cavity-drain (Type C) waterproofing only, no external tanking membrane (below best practice for a habitable basement)",
         note="Drops the external membrane and most of its labour; land drain and backfill stay", linescale={"3.6": {"membext": 0, "wpf": 0.25}}),
    # ---- procurement and running the site ----
    dict(id="telehandler_short", group="Running the site", label="Telehandler for 12 weeks, not 26",
         note="Hire it for the masonry and roof only", scale={"90.5": 12 / 26}),
    dict(id="no_welfare", group="Running the site", label="Use the house for welfare instead of a hired cabin",
         note="Removes task P.3", drop=["90.3"]),
    dict(id="neighbour_consent", group="Running the site", label="Neighbours consent to the party-wall notices, so no surveyor awards",
         note="£5,500 → £1,500 for the notices", rates={"pwall": 1500}),
    dict(id="no_warranty", group="Running the site", label="No structural warranty policy (fine if you are not selling within ten years; a lender may insist)",
         note="Removes £3,800", rates={"warranty": 0}),
    dict(id="cheap_survey", group="Running the site", label="Measured survey of the affected parts only, not the whole plot",
         note="£5,400 → £2,500", rates={"msurvey": 2500}),
    # ---- scope (design changes) ----
    dict(id="no_basement", group="Scope", label="No basement: cinema, games room and wine store go; the wing sits on strip foundations and a ground slab",
         note="Removes tasks 3.1–3.8 and adds ≈ £28k of foundations and slab", drop=[f"3.{i}" for i in range(1, 9)], add=28000, addTo="shell"),
    dict(id="solid_link", group="Scope", label="Solid-walled link with ordinary windows instead of three storeys of glazed screens",
         note="Task 8.3 at 30% plus £6k of walling", scale={"8.3": 0.3}, add=6000, addTo="shell"),
    dict(id="no_garden_room", group="Scope", label="No rear garden living room or roof terrace",
         note="Removes tasks 3.11, 6.1–6.8 and 8.4", drop=["3.11"] + [f"6.{i}" for i in range(1, 9)] + ["8.4"]),
    dict(id="no_side_storey", group="Scope", label="Side wing stays single storey (garage still becomes side-garden living)",
         note="Removes tasks 5.1–5.5, 5.8 and 3.14", drop=["5.1", "5.2", "5.3", "5.4", "5.5", "5.8", "3.14"]),
    dict(id="no_loft", group="Scope", label="No rear dormer or new loft floor over the original house",
         note="Removes tasks 7.1–7.6 and 7.10, and the rear dormer windows", drop=["7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.10"], scale={"8.2": 0.37}),
]
SAVINGS_BY_ID = {sv["id"]: sv for sv in SAVINGS}


def evaluate(only=None, self_managed=True, labour_discount=0.20, diy_share=0.0, weeks=40.0,
             fee_pct=None, fee_fixed=30000.0, cont_pct=0.0, cash_vat=True, savings=()):
    """Cost of the plan under a delivery basis with a set of savings applied."""
    applied = [SAVINGS_BY_ID[i] for i in savings]
    rate_over, drops, task_scale, line_scale, add = {}, set(), {}, {}, 0.0
    for sv in applied:
        rate_over.update(sv.get("rates", {}))
        drops.update(sv.get("drop", []))
        for r, f in sv.get("scale", {}).items():
            task_scale[r] = task_scale.get(r, 1.0) * f
        for r, keys in sv.get("linescale", {}).items():
            for k, f in keys.items():
                line_scale.setdefault(r, {})[k] = line_scale.get(r, {}).get(k, 1.0) * f
        if sv.get("add") and (only is None or sv.get("addTo") == "shell"):
            add += sv["add"]
    works = prelim = labour = 0.0
    for ph in phases + [prelims]:
        for tk in ph.tasks:
            if only is not None and tk.ref not in only:
                continue
            if self_managed and tk.ref in SELF_MANAGED_DROPS:
                continue
            if tk.ref in drops:
                continue
            for ln in tk.lines:
                r = rate_over.get(ln["key"], ln["rate"])
                v = ln["qty"] * r
                v *= task_scale.get(tk.ref, 1.0) * line_scale.get(tk.ref, {}).get(ln["key"], 1.0)
                if tk.ref in WEEK_SCALED:
                    v *= weeks / site_weeks
                if ln["kind"] == "Labour" and ln["unit"] == "day":
                    v *= 1 - labour_discount
                    if ln["desc"] in DIY_TRADES:
                        v *= 1 - diy_share
                if ln["kind"] == "Labour":
                    labour += v
                if ph.no == 90:
                    prelim += v
                else:
                    works += v
    works += add
    if self_managed:
        prelim += rate("ownerins")
    sub = works + prelim
    o = 0.0 if self_managed else sub * 0.07
    c = sub * cont_pct
    f = (sub + o) * fee_pct if fee_pct is not None else fee_fixed
    ex = sub + o + c + f
    vat = 0.2 * (ex - labour if cash_vat else ex)
    return dict(works=round(works), preliminaries=round(prelim), overheadAndProfit=round(o), contingency=round(c),
                professionalFees=round(f), totalExVat=round(ex), vat=round(vat), totalIncVat=round(ex + vat))


CASH = dict(only=SHELL_TASKS, self_managed=True, labour_discount=0.20, diy_share=0.0, weeks=40, fee_pct=None,
            fee_fixed=30000, cont_pct=0.0, cash_vat=True)
FULL = dict(only=None, self_managed=False, labour_discount=0.0, diy_share=0.0, weeks=site_weeks, fee_pct=fees_pct,
            fee_fixed=0, cont_pct=0.125, cash_vat=False)
shell_cash = evaluate(**CASH)
full_base = evaluate(**FULL)
def own_materials(savings=()):
    """Materials, plant and waste the owner buys for the non-shell tasks, with savings applied (ex VAT)."""
    applied = [SAVINGS_BY_ID[i] for i in savings]
    rate_over, drops, task_scale, line_scale, add = {}, set(), {}, {}, 0.0
    for sv in applied:
        rate_over.update(sv.get("rates", {}))
        drops.update(sv.get("drop", []))
        for r, f in sv.get("scale", {}).items():
            task_scale[r] = task_scale.get(r, 1.0) * f
        for r, keys in sv.get("linescale", {}).items():
            for k, f in keys.items():
                line_scale.setdefault(r, {})[k] = line_scale.get(r, {}).get(k, 1.0) * f
        if sv.get("add") and sv.get("addTo") == "own":
            add += sv["add"]
    tot = 0.0
    for ph in phases + [prelims]:
        for tk in ph.tasks:
            if tk.ref in SHELL_TASKS or tk.ref in SELF_MANAGED_DROPS or tk.ref in drops:
                continue
            for ln in tk.lines:
                if ln["kind"] in ("Labour",):
                    continue
                tot += ln["qty"] * rate_over.get(ln["key"], ln["rate"]) * task_scale.get(tk.ref, 1.0) * line_scale.get(tk.ref, {}).get(ln["key"], 1.0)
    return tot + add


own_base = own_materials()
for sv in SAVINGS:
    sv["savingShellCash"] = shell_cash["totalIncVat"] - evaluate(**CASH, savings=[sv["id"]])["totalIncVat"]
    sv["savingFull"] = full_base["totalIncVat"] - evaluate(**FULL, savings=[sv["id"]])["totalIncVat"]
    sv["savingOwn"] = round((own_base - own_materials([sv["id"]])) * 1.2)
SAFE = ["upvc_windows", "upvc_doors", "plain_screens", "std_gable", "one_lantern", "timber_terrace",
        "composite_door", "manual_garage", "cheap_brick", "solid_joists", "basic_rooflights", "upvc_rwg",
        "roof_basics", "sc_render", "spoil_onsite", "lean_steel", "telehandler_short", "no_welfare",
        "neighbour_consent", "no_warranty", "cheap_survey"]
OWN_BASIC = ["softwood_stairs", "basic_doors", "basic_floors", "basic_bathrooms", "basic_kitchen", "basic_joinery",
             "basic_cinema", "basic_lighting", "basic_security", "no_mvhr", "gas_boiler", "sc_screed",
             "gravel_drive", "manual_gates", "basic_pool", "basic_hottub", "timber_workshop", "basic_paving", "smaller_trees"]
CONDITIONAL = ["batter_all", "no_dewater", "skip_underpin"]
own_basic = own_materials(OWN_BASIC)
shell_cash_safe = evaluate(**CASH, savings=SAFE)
shell_cash_cond = evaluate(**CASH, savings=SAFE + CONDITIONAL)
shell_cash_nobase = evaluate(**CASH, savings=SAFE + CONDITIONAL + ["no_basement"])
shell_cash_min = evaluate(**CASH, savings=SAFE + CONDITIONAL + ["no_basement", "solid_link", "no_garden_room", "no_side_storey", "no_loft"])
own_min = own_materials(OWN_BASIC + ["no_basement", "no_garden_room", "no_side_storey", "no_loft"])

kinds = defaultdict(float)
for ph in phases + [prelims]:
    for tk in ph.tasks:
        for ln in tk.lines:
            kinds[ln["kind"]] += ln["total"]

trade_days = defaultdict(float)
for ph in phases + [prelims]:
    for tk in ph.tasks:
        for ln in tk.lines:
            if ln["kind"] == "Labour" and ln["unit"] == "day":
                trade_days[ln["desc"]] += ln["qty"]

# Areas for reporting
new_floor = Q["bas_gia"] + Q["wing_gia"] + 15.2 + Q["ff_area"] + Q["loft_area"] + 3 * Q["link_fp"] + Q["sw_fp"] + Q["gr_fp"] + Q["loft_floor_orig"]

# --------------------------------------------------------------------------
# Markdown
# --------------------------------------------------------------------------
md: list[str] = []
md.append("# Proposed scheme — phased cost plan\n")
md.append("Built up from first principles for the design saved on 19 September 2026 "
          "(`output-proposed-compact/`, spec `proposal/design-spec-compact.json`). Every task is "
          "quantified from the model — room polygons, wall segments, roof faces measured from the mesh, "
          "the surfaces list and the design spec — and priced as **materials + labour (trade days) + "
          "plant + waste**. No benchmark £/m² rates are used. Rates are September 2026, Kent, excluding "
          "VAT, and are all listed at the end so any of them can be changed and the plan re-run with "
          "`python3 scripts/estimate_proposal_b_costs.py`.\n")
md.append("This is a concept-stage plan on a photographic reconstruction, not a measured survey. The "
          "biggest unknowns are underground: the water table and soil under the basement and pool, and "
          "whether the former garage's foundations can carry a storey. Those drive the contingency.\n")

md.append("## Summary\n")
md.append("| | Amount |\n|---|---:|")
for ph in phases:
    md.append(f"| Phase {ph.no} — {ph.title} | {money(ph.total)} |")
md.append(f"| **Construction work, phases 0–13** | **{money(construction)}** |")
md.append(f"| Preliminaries ({site_weeks:.0f} weeks, built up below) | {money(prelims_total)} |")
md.append(f"| **Subtotal** | **{money(subtotal)}** |")
md.append(f"| Main contractor overhead and profit, 7% | {money(ohp)} |")
md.append(f"| Contingency, 12.5% (concept stage; ground and structure unknowns) | {money(contingency)} |")
md.append(f"| Professional fees, 11% (architect, structural and civil engineer, M&E, QS, principal designer) | {money(fees)} |")
md.append(f"| **Total excluding VAT** | **{money(pre_vat)}** |")
md.append(f"| VAT at 20% (alterations and extensions to an existing house are standard-rated) | {money(vat)} |")
md.append(f"| **Total including VAT** | **{money(total)}** |\n")

md.append(f"Range: the plan's own sensitivity is about −8% / +18% (from {money(total*0.92)} to {money(total*1.18)} "
          "including VAT). The downside is mostly in phase 3 — if the borehole shows a high water table, "
          "secant piling and longer dewatering replace king-posts and battered sides — and in phase 5 if the "
          "garage foundations need full underpinning rather than local strengthening.\n")

md.append("### Delivery options: self-managed, mates' rates and DIY\n")
md.append("The quantities and materials do not change with who runs the job; what changes is the site "
          "management, the contractor's margin, the labour rate and how many of the trade days you do "
          "yourself. Self-managed drops the site manager, contractor's surveyor and contractor's insurance "
          "from the preliminaries and the 7% overhead and profit, adds an owner's renovation policy, and "
          "keeps an architect and structural engineer for drawings, calculations and building control (6%). "
          f"Day-rate labour in the plan is {money(day_labour)}; {diy_days:,.0f} of the {sum(trade_days.values()):,.0f} "
          "trade days are in trades an able owner can do (labouring, painting, landscaping, carpentry, "
          "flooring, tiling, plastering) — the rest (groundworks, concrete, brickwork, steel, roofing, "
          "waterproofing, electrics, plumbing, glazing, pool, gate) need the trade or the certificate.\n")
md.append("| | Works | Prelims | OH&P | Contingency | Fees | Ex VAT | **Inc VAT** |\n|---|---:|---:|---:|---:|---:|---:|---:|")
for code, label, sc in scenarios:
    md.append(f"| **{code}** {label} | {money(sc['works'])} | {money(sc['preliminaries'])} | {money(sc['overheadAndProfit'])} | "
              f"{money(sc['contingency'])} | {money(sc['professionalFees'])} | {money(sc['totalExVat'])} | **{money(sc['totalIncVat'])}** |")
md.append("")
md.append("Even with all day-rate labour at zero the scheme is about "
          f"{money((subtotal - day_labour) * 1.2)} including VAT in materials, plant, waste and remaining "
          "preliminaries alone, before contingency and fees. A self-managed programme runs longer because "
          "trades are booked one after another rather than overlapped by a contractor; the week-based "
          "preliminaries (welfare, skips, consumables) are scaled to 78–90 weeks in B–E.\n")
md.append("### Shell only: trades build the structure and envelope, you do everything inside\n")
md.append("The shell is every task that makes the buildings stand up and keep the weather out — surveys and "
          "consents, demolition, the basement box and every foundation, walls, floors, steel, roofs and dormers, "
          "windows, doors and glazing, external render, rainwater goods, scaffold and the below-ground drainage "
          "the slabs sit on. It leaves out all internal work (partitions, plaster, screeds, stairs, wet rooms, "
          "kitchen, joinery, floors, decoration, all electrics, plumbing, heating and ventilation), the pool, "
          "hot tub, loggia, workshop, drive, gate and gardens. Self-managed, with an owner's policy and 6% fees "
          "for drawings, structural calculations and building control.\n")
md.append("| | Works | Prelims | Contingency | Fees | Ex VAT | **Inc VAT** |\n|---|---:|---:|---:|---:|---:|---:|")
for code, label, sc in shell_scenarios:
    md.append(f"| **{code}** {label} | {money(sc['works'])} | {money(sc['preliminaries'])} | {money(sc['contingency'])} | "
              f"{money(sc['professionalFees'])} | {money(sc['totalExVat'])} | **{money(sc['totalIncVat'])}** |")
md.append("")
md.append(f"The shell needs about {shell_days:,.0f} trade days, of which {shell_diy_days:,.0f} are labouring and carpentry an "
          "owner could take on. The rest is groundworks, concrete, brickwork, steel erection, roofing, waterproofing "
          "and glazing.\n")
own_mat = internal["materials"] + external["materials"]
own_pw = internal["plantAndWaste"] + external["plantAndWaste"]
own_days = internal["tradeDays"] + external["tradeDays"]
md.append("**What you buy for the work you do yourself** (delivered prices at the same rates, no labour):\n")
md.append("| Your own work | Materials ex VAT | Materials inc VAT | Plant and skips | Trade days replaced |\n|---|---:|---:|---:|---:|")
md.append(f"| Internal: partitions, plaster, screeds, stairs, 5 wet rooms, kitchen, joinery, floors, decoration, all M&E "
          f"({internal['tasks']} tasks) | {money(internal['materials'])} | {money(internal['materials'] * 1.2)} | "
          f"{money(internal['plantAndWaste'])} | {internal['tradeDays']:,.0f} |")
md.append(f"| External: pool shell and plant, hot tub, loggia, workshop, resin drive, gate, paths, lawns, planting, lighting "
          f"({external['tasks']} tasks) | {money(external['materials'])} | {money(external['materials'] * 1.2)} | "
          f"{money(external['plantAndWaste'])} | {external['tradeDays']:,.0f} |")
md.append(f"| **Together** | **{money(own_mat)}** | **{money(own_mat * 1.2)}** | {money(own_pw)} | **{own_days:,.0f}** |\n")
md.append(f"Those {own_days:,.0f} trade days are about {own_days / 225:.1f} years of one person's full-time work at trade "
          "speed. The heat pumps, unvented cylinders, electrics and the pool's electrical bonding need a certified "
          "installer's sign-off whoever does the labour; the gate automation and the pool concrete shell are the "
          "two external items most owners still buy in. The kitchen, sanitaryware, heat pumps, MVHR, stairs, doors, "
          "joinery, hot tub, gate leaf and pool plant are all inside the materials figures.\n")
md.append(f"**Cash cost of the whole scheme with you doing all internal and external work:** shell S2 "
          f"{money(shell_scenarios[1][2]['totalIncVat'])} plus your materials {money(own_mat * 1.2)} and plant "
          f"{money(own_pw * 1.2)} = **about {money(shell_scenarios[1][2]['totalIncVat'] + (own_mat + own_pw) * 1.2)} "
          "including VAT**, with no contingency on your own work.\n")
md.append("### Decisions adopted on 21 September\n")
md.append("- **Oak balustrades** to the basement void and stair, the loft void and stair, and the arrival gallery — "
          "oak newels, handrail and spindles (£140/m supply) instead of frameless glass (£420/m). 33 m in total.")
md.append("- **Straight basement flight** along the garage wall (13 risers of 215 mm on 240 mm goings) instead of the dogleg with a "
          "half landing in the middle of the gallery: the slab is cut only over the top ten treads, the hall-to-garage door moves "
          "to the last metre of that wall, and the cinema moves south of the flight with the wine store beside it and the games "
          "room across the north. Fewer balustrades: 2.4 m raked and 2.7 m of void guard instead of 15.7 m.")
md.append("- **No rooflight in the dormer roof** — three rooflights remain in the pitched roofs.")
md.append("- **Principal suite enlarged**: its north partition and door come forward to the entrance-void edge (0.6 m gained, "
          "one balustrade fewer) and the gallery shower room stops being a wet room — its fittings and gallery door go and it "
          "becomes a nook of the suite off the study. Four wet rooms instead of five.")
md.append("- **Loft suite redesigned**: the corridor along the dormer windows becomes bedroom, the door opens off the loft landing, "
          "the ensuite (8.3 m²) runs across the north end, the walk-in wardrobe sits on the low west side.")
md.append("- **Evening of 21 September**: solid oak front doors with solid panels either side (upper gable glass only); the dining/drawing "
          "partition out over a beam to make one formal dining and lounge; the side-wing shower room becomes the south bedroom's ensuite; "
          "no ground-floor WC (one utility room); Bedrooms 2 and 3 furnished as bedrooms with the bookcases moved to the former Bedroom 5 "
          "landing; the family room an office; the principal bathroom and dressing room enlarged (partition 1 m west) with the WC in its own "
          "compartment; the basement wine store opened into the games room as a bar; the loft suite turned round with the ensuite on the far "
          "wall and a fitted wardrobe; the loft lounge rooflight dropped; the flat dormer cap continued along the ridge to the rear dormer, "
          "east of the ridge line so the ridge runs unbroken.")
md.append("- **22 September**: the old stone step inside the entrance gallery goes and a 0.4 m solid band sits above the front door head "
          "before the gable glass (glass 7.0 → 5.6 m²); the east dining display's chamfered wall comes out to widen the dining/lounge opening; "
          "no office shelving; the principal bathroom is half as big again (16.6 m², its west wall across the bedroom's south end, the bed "
          "moved to it); the wing dormer's middle window moved clear of the loft ensuite wall. Roof: the new east slope is not carried over "
          "the original house (11.8 m² less new slate, one valley fewer); the loft passage's east side is a plain clad wall on the rear "
          "dormer's line with a door into the eaves store, and the original ridge runs through between the two flat dormers. "
          "A side entrance door in the side wing's west wall off the west side path. Later that day: the basement flight "
          "moved 0.9 m east with a landing at its top and the cinema door on the cinema's east wall; bar counter 2.0 m; "
          "the office made a proper study (desk, leather chairs, credenza, dado panelling, allowance in joinery); a west "
          "loft eaves store walled off like the east one; the connector's west eaves on the wing's line; the courtyard one "
          "glazing bay smaller (the wing's north-east rooms gain 0.97 m; 4 m² less link glass, 4 m² more render). Third batch: an "
          "oval dining table in a cleared dining room; the loft hip void walled off as a store off the ensuite; the courtyard glazing "
          "centred at all three levels (a second solid bay at each level); and the hot tub built into the ground as a sunken spa. "
          "Fourth batch: white dormer cladding; the nook wall moved to the loft stair (the library's east end and the nook join the "
          "suite); one wide kitchen/side-living opening; a fitted-out gym; a big garage window and a bigger gym window, the east "
          "external door dropped; and the courtyard wall recessed 1.2 m at ground level under a first-floor overhang on a column.")
md.append("- **Standard dormer windows**: three 1.2 × 1.2 m casements in the wing dormer and four 1.5 × 1.2 m in the rear "
          "dormer, with framed, insulated and clad panels between them, instead of the 7.14 m and 11.9 m continuous "
          "glazed bands. Glazing drops from 25.5 m² to 11.5 m². Both decisions are built into the compact model "
          "saved on 21 September (`dormerWindows` and `internalGuards` in `proposal/design-spec-compact.json`); "
          "all 32 room-access and 140 walking-route checks pass on it.\n")
md.append("### Bringing the price down: the savings menu\n")
md.append(f"Starting point: the shell on the self-builder cash basis — self-managed, mates' rates, no contingency, "
          f"£30,000 for drawings and calculations, VAT on materials and plant only — **{money(shell_cash['totalIncVat'])}**. "
          "Each line below is priced on its own against that figure (and, for reference, against the full "
          "main-contractor scheme). Spec and running-the-site items cost nothing but a decision; method items "
          "depend on what the ground investigation and trial pits show; scope items change the design.\n")
md.append("| Saving | Group | Shell cash | Your materials (inc VAT) | Full scheme | Note |\n|---|---|---:|---:|---:|---|")
for sv in SAVINGS:
    md.append(f"| {sv['label']} | {sv['group']} | −{money(sv['savingShellCash'])} | −{money(sv['savingOwn'])} | −{money(sv['savingFull'])} | {sv['note']} |")
md.append("")
md.append("| Combination (shell, cash basis) | Inc VAT |\n|---|---:|")
md.append(f"| As priced | **{money(shell_cash['totalIncVat'])}** |")
md.append(f"| All specification and running-the-site savings (no design change, no ground risk taken) | **{money(shell_cash_safe['totalIncVat'])}** |")
md.append(f"| … plus the three ground-dependent method savings, if the GI allows | **{money(shell_cash_cond['totalIncVat'])}** |")
md.append(f"| … plus no basement | **{money(shell_cash_nobase['totalIncVat'])}** |")
md.append(f"| … plus solid link, no garden room, single-storey side wing, no loft dormer (the wing alone) | **{money(shell_cash_min['totalIncVat'])}** |\n")
md.append("| Your own materials for the internal and external work (inc VAT) | |\n|---|---:|")
md.append(f"| As priced | **{money(own_base * 1.2)}** |")
md.append(f"| With every basic-finish, basic-service and basic-external choice | **{money(own_basic * 1.2)}** |")
md.append(f"| … and the wing-only scope | **{money(own_min * 1.2)}** |\n")
md.append(f"So the whole scheme built basic — shell at {money(shell_cash_safe['totalIncVat'])} plus your materials at "
          f"{money(own_basic * 1.2)} — is about **{money(shell_cash_safe['totalIncVat'] + own_basic * 1.2)}** in cash, "
          "with you doing all the internal and external work.\n")
md.append("### Where the money goes\n")
md.append("| Resource | Amount | Share |\n|---|---:|---:|")
for k in ("Materials", "Labour", "Plant", "Waste", "Specialist / supply", "Survey / statutory"):
    md.append(f"| {k} | {money(kinds[k])} | {kinds[k] / subtotal * 100:.0f}% |")
md.append(f"| **Total** | **{money(subtotal)}** | 100% |\n")

md.append("### Labour by trade (person-days)\n")
md.append("| Trade | Days |\n|---|---:|")
for name, days in sorted(trade_days.items(), key=lambda kv: -kv[1]):
    md.append(f"| {name} | {days:,.0f} |")
md.append(f"| **All trades** | **{sum(trade_days.values()):,.0f}** |\n")

md.append("### What is being built (from the model)\n")
md.append("| Element | Quantity |\n|---|---:|")
md.append(f"| New basement (gross / internal) | {Q['bas_gross']:.0f} / {Q['bas_gia']:.0f} m² |")
md.append(f"| New wing ground, first, loft (internal) | {Q['wing_gia'] + 15.2:.0f} / {Q['ff_area']:.0f} / {Q['loft_area']:.0f} m² |")
md.append(f"| Three-storey link | 3 × {Q['link_fp']:.1f} m² |")
md.append(f"| Side-wing new storey / re-floored ground | {Q['sw_fp']:.0f} / {Q['sw_gf_slab']:.0f} m² |")
md.append(f"| Rear garden living room / roof terrace | {Q['gr_fp']:.0f} / {Q['gr_deck']:.0f} m² |")
md.append(f"| New loft floor over the original house | {Q['loft_floor_orig']:.0f} m² |")
md.append(f"| **New floor area, all levels** | **≈ {new_floor:.0f} m²** |")
md.append(f"| New slate roof (wing + bays + side wing) | {slate_all + Q['sw_roof']:.0f} m² |")
md.append(f"| New flat roofs (dormers, terrace, loggia, workshop) | {Q['dormer_wing_roof'] + Q['ld_roof'] + Q['gr_deck'] + Q['loggia_roof'] + Q['ws_roof']:.0f} m² |")
md.append(f"| Windows, screens and glazed doors | {win_total + Q['win_dormer_band'] + Q['ld_band'] + Q['link_glass'] + Q['gr_glass'] + Q['entrance_glass'] + Q['garden_doors'] + Q['sw_doors_glass']:.0f} m² |")
md.append(f"| Basement excavation | {exc_m3:.0f} m³ bank, {loads} lorry loads |")
md.append(f"| Resin-bound drive / lawns / limestone paths and paving | {drive:.0f} / {Q['lawn_front']:.0f} / {Q['paths'] + Q['court_paving'] + Q['terraces']:.0f} m² |")
md.append(f"| Pool / pool terrace / hot tub / loggia / workshop | 8 × 3.5 m / {Q['pool_terrace'] + Q['pool_deck']:.0f} m² / 3.4 × 2.3 m / {Q['loggia_roof']:.0f} m² / {Q['ws_fp']:.1f} m² |\n")

md.append("## Programme\n")
md.append("| Phase | Weeks | Start | Finish | Depends on |\n|---|---:|---:|---:|---|")
deps = {0: "—", 1: "Consents (0)", 2: "1", 3: "2; GI results (0)", 4: "3 basement slab", 5: "3 underpinning; can overlap 4",
        6: "3 foundations; can overlap 4/5", 7: "4 roof junction", 8: "4–7 structure", 9: "8 weathertight",
        10: "9", 11: "10", 12: "3 pool base; runs alongside 8–11", 13: "11, 12"}
for ph in phases:
    if ph.no == 0:
        md.append(f"| {ph.no} — {ph.title} | {ph.weeks:g} | −14 | 0 | {deps[ph.no]} |")
    else:
        md.append(f"| {ph.no} — {ph.title} | {ph.weeks:g} | {START[ph.no]} | {START[ph.no] + ph.weeks - 1:g} | {deps[ph.no]} |")
md.append(f"| **Site period** | | **1** | **{site_weeks:g}** | Phases 5, 6 and 12 run alongside the wing with separate gangs |\n")
md.append("Fourteen weeks of pre-construction, then about thirteen months on site. Preliminaries are "
          "priced on this overlapped period; running the phases end to end would add roughly 40 weeks "
          "of site cost.\n")

md.append("## Every job: what it costs and how long it takes\n")
md.append("Cost is the task total at the main-contractor rates (materials, labour, plant, waste). Person-days "
          "are the trade days in the task; crew is how many people work it at once; working days is the "
          "duration on that crew (5-day weeks). Jobs without labour show a lead time instead. Owner-done "
          "work usually runs at 60–75% of trade speed.\n")
md.append("| Job | Materials | Labour | Plant + waste | Total | Person-days | Crew | Working days |\n|---|---:|---:|---:|---:|---:|---:|---:|")
for ph in phases + [prelims]:
    md.append(f"| **Phase {ph.no if ph.no != 90 else 'P'} — {ph.title}** | | | | **{money(ph.total)}** | | | |")
    for tk in ph.tasks:
        m = sum(l["total"] for l in tk.lines if l["kind"] in ("Materials", "Specialist / supply", "Survey / statutory"))
        lb = sum(l["total"] for l in tk.lines if l["kind"] == "Labour")
        pw = sum(l["total"] for l in tk.lines if l["kind"] in ("Plant", "Waste"))
        t_ = tk.time
        md.append(f"| {tk.ref} {tk.title} | {money(m)} | {money(lb)} | {money(pw)} | {money(tk.total)} | "
                  f"{t_['personDays']:g} | {t_['crew'] or '—'} | {t_['workingDays']} |")
md.append("")
md.append("## Phases, tasks and resources\n")
for ph in phases + [prelims]:
    md.append(f"### Phase {ph.no} — {ph.title}  \n**{money(ph.total)}** · {ph.weeks:g} weeks\n")
    if ph.summary:
        md.append(ph.summary + "\n")
    for tk in ph.tasks:
        qty = f"{tk.qty:g} {tk.unit}" if tk.qty is not None else ""
        md.append(f"#### {tk.ref} {tk.title} — {money(tk.total)}")
        md.append(f"*{qty}*" + (f" — {tk.basis}" if tk.basis else "") + "\n")
        md.append("| Kind | Resource | Qty | Unit | Rate | Total |\n|---|---|---:|---|---:|---:|")
        for ln in tk.lines:
            note = f" ({ln['note']})" if ln["note"] else ""
            md.append(f"| {ln['kind']} | {ln['desc']}{note} | {ln['qty']:g} | {ln['unit']} | £{ln['rate']:,.2f} | {money(ln['total'])} |")
        md.append("")

md.append("## Excluded and optional\n")
md.append("- Loose furniture and equipment: cinema seats and projector/AV (allow £22,000), pool table (£4,500), "
          "gym equipment (£14,000 for the fuller fit-out: two treadmills, bike, rower, cable station, bench, barbell and dumbbells), "
          "tasting table, loose garden furniture, loungers.")
md.append("- Design fees are the 11% above; planning conditions, CIL (Sevenoaks charges residential extensions over "
          "100 m² unless the owner-occupier claims the residential extension exemption before commencement), "
          "Section 106, legal, finance, decant or rental costs.")
md.append("- Price inflation after September 2026; abnormal ground (rock, contamination, running sand); "
          "asbestos removal if the survey finds any; alterations to the neighbours' land; lift replacement.")
md.append("- The original house's own repairs, redecoration outside the affected rooms, and the retained kitchen "
          "beyond the relocated sink run.\n")

md.append("## Retail price check, 21 September 2026\n")
md.append("Rates checked against merchant and trade-guide prices (buildbuddy.co.uk comparison of Travis Perkins, "
          "Jewson, MKM, Selco and others; buyroofslate.co.uk; nextdaysteel.co.uk; Sevenoaks skip and grab hire; "
          "2026 day-rate guides). Merchant prices are shown ex VAT (their inc-VAT price ÷ 1.2). Where the plan "
          "used a higher figure it has been brought down; where it used a lower figure it has been raised.\n")
md.append("| Key | Rate | Was | Now | Basis |\n|---|---|---:|---:|---|")
for key, (was, note) in RATE_CHECK.items():
    md.append(f"| `{key}` | {desc(key)} | £{was:g} | £{rate(key):g} | {note} |")
md.append("")
md.append("## Rates used\n")
md.append("| Key | Description | Unit | Rate |\n|---|---|---|---:|")
for k, (d, u, r) in RATES.items():
    md.append(f"| `{k}` | {d} | {u} | £{r:,.2f} |")
md.append("")

(OUT / "P8-proposal-B-cost-plan.md").write_text("\n".join(md), encoding="utf-8")

# --------------------------------------------------------------------------
# JSON + CSV
# --------------------------------------------------------------------------
payload = dict(
    design="Proposed", designRevision="P8", modelBuiltAt="2026-09-19T19:10:05Z",
    pricedAt="2026-09-20", location="Ashley Close, Sevenoaks, Kent", currency="GBP", vatIncluded=False,
    summary=dict(construction=round(construction), preliminaries=round(prelims_total), subtotal=round(subtotal),
                 overheadAndProfit=round(ohp), contingency=round(contingency), professionalFees=round(fees),
                 totalExVat=round(pre_vat), vat=round(vat), totalIncVat=round(total),
                 rangeIncVat=[round(total * 0.92), round(total * 1.18)],
                 siteWeeks=site_weeks, newFloorAreaM2=round(new_floor, 1)),
    byResource={k: round(v) for k, v in kinds.items()},
    scenarios=[dict(code=c, label=l, **sc) for c, l, sc in scenarios],
    shellScenarios=[dict(code=c, label=l, **sc) for c, l, sc in shell_scenarios],
    savings=SAVINGS,
    savingsCombos=dict(shellCash=shell_cash, safe=shell_cash_safe, conditional=shell_cash_cond,
                       noBasement=shell_cash_nobase, wingOnly=shell_cash_min, safeIds=SAFE, conditionalIds=CONDITIONAL,
                       ownBasicIds=OWN_BASIC, ownBase=round(own_base), ownBasic=round(own_basic), ownMin=round(own_min)),
    shell=dict(tasks=sorted(SHELL_TASKS), tradeDays=round(shell_days), diyDays=round(shell_diy_days),
               internal=internal, external=external),
    delivery=dict(diyTrades=sorted(DIY_TRADES), selfManagedDrops=sorted(SELF_MANAGED_DROPS),
                  weekScaled=sorted(WEEK_SCALED), ownerInsurance=rate("ownerins"), dayLabour=round(day_labour),
                  diyDays=round(diy_days, 1)),
    onCosts=dict(overheadAndProfitPct=7.0, contingencyPct=12.5, feesPct=fees_pct * 100, vatPct=20.0),
    programme=[dict(no=ph.no, weeks=ph.weeks, start=(START[ph.no] if ph.no else -14),
                    finish=(START[ph.no] + ph.weeks - 1 if ph.no else 0), dependsOn=deps[ph.no]) for ph in phases],
    tradeDays={k: round(v, 1) for k, v in trade_days.items()},
    quantities=Q,
    rates={k: dict(description=d, unit=u, rate=r, was=RATE_CHECK.get(k, (None, ""))[0], basis=RATE_CHECK.get(k, (None, ""))[1]) for k, (d, u, r) in RATES.items()},
    phases=[dict(no=ph.no, title=ph.title, weeks=ph.weeks, summary=ph.summary, total=round(ph.total),
                 tasks=[dict(ref=tk.ref, title=tk.title, qty=tk.qty, unit=tk.unit, basis=tk.basis,
                             total=round(tk.total), time=tk.time, lines=tk.lines) for tk in ph.tasks])
            for ph in phases + [prelims]],
)
(OUT / "P8-proposal-B-cost-plan.json").write_text(json.dumps(payload, indent=1), encoding="utf-8")

with (OUT / "P8-proposal-B-cost-plan.csv").open("w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["phase", "task", "task title", "kind", "resource", "qty", "unit", "rate", "total", "note"])
    for ph in phases + [prelims]:
        for tk in ph.tasks:
            for ln in tk.lines:
                w.writerow([ph.no, tk.ref, tk.title, ln["kind"], ln["desc"], ln["qty"], ln["unit"], ln["rate"], ln["total"], ln["note"]])

print(f"construction {money(construction)} | prelims {money(prelims_total)} | ex VAT {money(pre_vat)} | inc VAT {money(total)}")
print(f"site weeks {site_weeks:g} | new floor {new_floor:.0f} m2 | trade days {sum(trade_days.values()):,.0f}")
for ph in phases + [prelims]:
    print(f"  {ph.no:>2} {money(ph.total):>12}  {ph.title}")
