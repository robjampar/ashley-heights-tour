"""Content for the Design & Access Statement, application form, CIL form,
report summaries and the Sevenoaks validation checklist mapping."""


def das_sections(ctx, schedule, risks, site_info, pr):
    planning = ctx.get('design_variant') == 'planning'
    ex_t = sum(r['gia_m2'] for r in schedule['existing']); pr_t = sum(r['gia_m2'] for r in schedule['proposed'])
    gb = schedule['green_belt']; d = ctx['designations']
    reds = [r for r in risks if r['verdict'] == 'red']
    return {'sections': [
        ('1. Introduction', [f"This statement accompanies a householder application for extensions and alterations at {ctx['address']} (title {ctx['title_number']}). It describes the site, the proposal and how the design responds to national policy, the Sevenoaks Local Plan and the Council's Residential Extensions SPD.",
                              'The drawings are the PA series listed on PA-000. The existing drawings are a model reconstruction validated against the published room dimensions and will be replaced by measured survey drawings before submission.']),
        ('2. Site and context', [f"The site is a {pr.site_polygon.area:,.0f} m² plot on the north side of Ashley Close, a short cul-de-sac of detached inter-war and post-war houses off Ashley Road in Sevenoaks. The house is a two-storey detached brick dwelling under a hipped {'tiled' if planning else 'slate'} roof with an attached single-storey garage to the west and a long rear garden with a summer house and a narrow strip running west behind No 3.",
                                 f"Designations assumed for this issue: Green Belt {ctx.designation_text('green_belt')}; conservation area {ctx.designation_text('conservation_area')}; listed building {ctx.designation_text('listed_building')}; TPO {ctx.designation_text('tpo')}; flood zone {ctx.designation_text('flood_zone')}. {d['basis']}",
                                 'Neighbours: No 3 to the west (two-storey detached), Marlow Court flats to the east beyond a planted boundary, No 5 across the close to the south-east. Site levels are model estimates; actual levels have not been surveyed.']),
        ('3. The proposal', [ctx['proposal_description'],
                             f"Floorspace: existing gross internal area about {ex_t:.0f} m² (excluding outbuildings); proposed about {pr_t:.0f} m² including the basement, an increase of {pr_t - ex_t:.0f} m². Garden buildings contain {sum(r['gia_m2'] for r in schedule['garden']):.0f} m² ({"retained outbuildings" if planning else "workshop and retained outbuildings; the open loggia is excluded"}).",
                             'Levels: the new wing and basement follow the existing floor levels (ground ±0.00, first +2.80, loft +5.55); the new wing ridge matches the existing ridge at +8.05 m.']),
        ('4. Amount, scale and layout', [ctx.get('front_wing_case', {}).get('summary', ''), f"The additions total {gb['B']:.0f} m² measured externally against an original dwelling of {gb['A']:.0f} m² ({gb['B'] / gb['A'] * 100:.0f}%). The largest element is the front wing, which contains the entrance, gym and garage on the ground floor, the principal suite above and a loft suite, over a basement cinema, bar and wine store.",
                                          'The wing is set to the east of the existing house and linked at ground, first-floor and loft levels beside an open courtyard, so the original front elevation remains legible between the wing and the retained side wing.',
                                          ('The side living room has a 2.40 m wide pair of glazed doors to the garden; the first-floor lounge has a rear window. Existing garden buildings and rear garden layout are retained.' if planning else 'The rear garden room is single storey with a terrace over; the workshop sits at the far end of the rear strip, 600 mm off the fences, with a flat roof 2.64 m high.')]),
        ('4a. Policy and precedent - evidence to verify', ['The case references below are retained research leads. Decision notices, approved drawings, site constraints and policy extracts have not been re-verified for this issue; obtain and check them before relying on these comparisons.', 'The Residential Extensions SPD (para 4.21) says front extensions may be acceptable where, among other things, "the extension is to a detached house, where there is no strong visual relationship with adjoining properties" or it would enhance an otherwise unexceptional street scene, and (4.23) warns against them where houses share a common building line. No 4 is detached and closes the head of the cul-de-sac, where there is no common building line. The wing follows the host\'s hipped roof form, as the SPD asks.', 'Two-storey front extensions are regularly granted in Sevenoaks town where they are subservient in scale and do not significantly erode the set-back of the street. Relevant decisions:'] + [f"{p['ref']} — {p['address']}: {p['description']} ({p['decision']}). {p['relevance']}" for p in ctx.get('precedents', [])] + ([ctx['precedents_other']] if ctx.get('precedents_other') else []) + ([ctx['policy_to_check']] if ctx.get('policy_to_check') else [])),
        ('5. Appearance and materials', [ctx['materials']['walls'] + '; ' + ctx['materials']['roof'] + '; ' + ctx['materials']['windows_doors'] + '. Dormers are ' + ctx['materials']['dormers'].lower() + '. Full details on PA-090.',
                                         ('External walls match the existing red-brown brick in colour, texture, bond and mortar. Pitched roof tiles and tile-hung dormer cheeks and front panels match the existing roof covering in material, colour, profile, size and coursing.' if planning else 'The render is intended to read as a lighter, subordinate addition against the retained brick house; the roof pitches (29.7° wing, 30° entrance bay, 34° garage bay) sit close to the existing 30° hips.')]),
        ('6. Access and parking', [f"Vehicular access is unchanged from Ashley Close through the existing gateway, with a new sliding oak gate set in a matching brick wall at the height of the existing 26-course (1.95 m) brick wall. {ctx['parking']['basis']} Visibility splays of {ctx['visibility_splays']['vehicle_x_m']} × {ctx['visibility_splays']['vehicle_y_m']} m are shown on PA-003.",
                                   'Level access and bin/cycle storage are design intentions. Survey the thresholds and resolve a storage layout clear of the two cars and doors; the current block-plan storage marker needs relocation.']),
        ('7. Neighbour amenity', [('The two-storey side-wing boundary gap and neighbour levels require survey confirmation. Flank-window glazing and opening restrictions are scheduled on PA-090.' if planning else 'The two-storey side wing is kept 1 m or more off the west boundary. The roof terrace has a 1.8 m opal laminated glass screen along its west edge in place of the balustrade, intended to reduce overlooking towards No 3; verify sightlines and neighbour levels (PA-021, PA-031, PA-005 R07). New flank windows within 12 m of a boundary are obscure-glazed below 1.7 m (PA-090).'),
                                  ('Neighbour amenity, including daylight and oblique sightlines, is to be assessed against verified surroundings.' if planning else 'The pool pavilion is an open loggia. An enclosed plant location, equipment specification and noise assessment remain to be designed; no plant room is yet demonstrated.')]),
        ('8. Trees, ecology and drainage', [ctx['trees']['basis'] + ' Trees within 15 m of the works are scheduled on PA-003.',
                                            'A preliminary ecological appraisal will be commissioned for the roof works. Proposed drainage relies on infiltration testing and confirmation of the existing foul connection; routes, outfalls and capacity are unresolved. The basement will be designed by a specialist with a basement impact assessment.']),
        ('9. Planning considerations', ['The site is not in the Green Belt (confirmed), so the SPD Appendix 2 floorspace test does not apply; it is reported on PA-080 for information only.' if not ctx.green_belt_module else f"The Green Belt floorspace test on PA-080 shows B + C = {gb['B'] + gb['C']:.0f} m² against a 50% limit of {gb['A'] * .5:.0f} m²; the proposal is inappropriate development unless very special circumstances are demonstrated.",
                                        'The main matters are the scale of the new wing and its relationship to the close, and the size of the rear dormer. ' + (ctx.get('front_wing_case', {}).get('basis', '')) + ' The risk register on PA-005 sets out the remaining adjustments available' + (': ' + '; '.join(f"{r['id']} {r['topic']}" for r in reds) if reds else '') + '.',
                                        'CIL: the net increase exceeds 100 m², so the official CIL additional information form is still required. The worksheet is provisional; establish exemption eligibility with the collecting authority before commencement.']),
    ]}


def application_form_data(ctx, schedule, site_info, pr):
    a = ctx['applicant']; g = ctx['agent']
    return [
        ('1. Applicant', [['Name', a['name'] + ' (recorded working assumption; confirm legal name)'], ['Address', a['address']], ['Contact', 'as registered on the Planning Portal']]),
        ('2. Agent', [['Name', g['name']], ['Address', g['address']]]),
        ('3. Site address', [['Address', ctx['address'] + (', ' + ctx.get('postcode', '') if ctx.get('postcode') else '')], ['Title number', ctx['title_number']], ['Site area (ha)', f'{pr.site_polygon.area / 10000:.4f}']]),
        ('4. Description of the proposal', [['Description', ctx['proposal_description']], ['Has the work started?', 'Unconfirmed - applicant to answer'], ['Pre-application advice', 'No' if not ctx.get('pre_application_advice') else 'Yes']]),
        ('5. Materials', [[k.replace('_', ' ').capitalize(), v] for k, v in ctx['materials'].items()]),
        ('6. Trees and hedges', [['Trees or hedges on or adjacent to the site?', 'Yes — see PA-003 tree schedule'], ['Trees that may be affected?', 'Possibly — arboricultural assessment to be submitted'], ['Trees to be felled?', ', '.join(t['id'] for t in pr.spec.get('removedTrees', [])) or 'None proposed']]),
        ('7. Parking', [['Existing spaces', ctx['parking'].get('existing_spaces_note', str(ctx['parking']['existing_spaces']))], ['Proposed spaces', str(ctx['parking']['proposed_spaces'])], ['Access altered?', 'No — existing access retained; new gate']]),
        ('8. Ownership certificate', [['Certificate', 'Not selected - confirm all owners and relevant interests, then complete A, B, C or D and any notices'], ['Agricultural holding', 'Unconfirmed - applicant to answer']]),
        ('9. Site visit', [['Can the site be seen from a public road?', 'Yes, in part (front elevation from Ashley Close)'], ['Contact for site visit', ctx.get('site_visit_contact', 'Applicant')]]),
        ('10. Declaration', [['Date', 'To be completed when declared'], ['Signed', 'Unsigned - applicant declaration required']]),
    ]


def report_summaries(ctx, schedule, site_info, risks, pr):
    ws = pr.nav.get('proposalWorkshop'); bb = pr.nav['proposalBasement']
    roof_covering = 'tile-roofed' if ctx.get('design_variant') == 'planning' else 'slate-roofed'
    return [
        ('Arboricultural constraints (stand-in for the BS5837 report)', [f"{len(site_info['trees'])} trees are plotted from the model on PA-003 with estimated canopy radii; their survey status, species and dimensions remain unverified. New construction closest to a retained tree is listed on PA-005 R13. A BS5837:2012 survey with root protection areas, a tree constraints plan and, if TPO trees are affected, an arboricultural method statement, is required."]),
        ('Ecology desk note (stand-in for the preliminary ecological appraisal)', [f'The roof works alter a {roof_covering} house built before 2000 with mature trees close by, which the Sevenoaks checklist treats as a bat-roost trigger. A preliminary roost assessment of the roof void and eaves, is required; works to the roof would be timed and supervised under any licence advice.']),
        ('Drainage and SuDS note', [f"Impermeable area increases with the new wing roof ({schedule['proposed'][1]['external_m2'] - schedule['existing'][0]['external_m2']:.0f} m² additional footprint) ; the forecourt is resin-bound permeable. Roof water to new soakaways sized to BRE 365 subject to infiltration tests; foul to the existing connection. Basement drainage by pumped sump."]),
        ('Basement impact note', [f"A {bb['outer_area_m2']:.0f} m² basement with a {bb['clear_height_m']:.2f} m clear height is formed beneath the new wing, wholly outside the footprint of the existing house with a nominal north wall 4 m south of the original main wall; actual foundation extents are unknown. Formation about 3.1 m below ground. A ground investigation, groundwater assessment and temporary-works design are required; the engineer must assess neighbouring foundations and any party-wall implications."]),
        *([('Noise (plant)', ['Plant type and location are unresolved; the pool pavilion is open-sided and does not contain a designed plant room. Obtain an acoustic consultant assessment of the selected equipment and nearby receptors; a 10 m distance is not a universal exemption.'])] if ws else []),
        *([('Workshop', [f"{ws['outside_size_m'][0]} × {ws['outside_size_m'][1]} m, {ws['outside_area_m2']:.1f} m² external, flat roof {ws['roof_top_m']:.2f} m, {ws['crawl_space_m']:.1f} m clear of the fences, timber boarded; no sleeping accommodation; Building Regulations exemption has not been established: the proposed timber building is only 0.6 m from the fences. Confirm fire resistance and approval requirements with Building Control."])] if ws else []),
    ]


def checklist(ctx, manifest_sheets):
    have = {m['sheet'] for m in manifest_sheets}
    def s(item, req, where, status, note=''):
        return {'item': item, 'requirement': req, 'where': where, 'status': status, 'note': note}
    L = [
        s('N1', 'Site location plan 1:1250/1:2500 on an OS base, red line, north', 'PA-001', 'deferred', 'Traced base for this issue; purchase the OS extract'),
        s('N2', 'Block/site plan 1:200 or 1:500: footprints, trees, boundaries, parking, access and splays, bins/cycles', 'PA-002, PA-003, PA-001 (1:500)', 'satisfied'),
        s('N3', 'Existing floor plans, every level incl. roof space and outbuildings', 'PA-010, PA-011', 'verify', 'Reconstruction - measured survey outstanding'),
        s('N4', 'Proposed floor plans, every level including all subterranean areas', 'PA-020, PA-021, PA-022', 'satisfied'),
        s('N5', 'Existing elevations, all sides', 'PA-012, PA-011', 'satisfied'),
        s('N6', 'Proposed elevations, all sides, basement dashed, boundaries, outbuildings', 'PA-030, PA-031, PA-022', 'satisfied'),
        s('N7', 'Existing and proposed roof plans', 'PA-010 (existing), PA-040 (proposed)', 'satisfied'),
        s('N8', 'Site sections where levels change or excavation is proposed', 'PA-050, PA-051 (proposed), PA-012 (existing)', 'satisfied'),
        s('N9', 'Scale bar on every drawing at every scale; paper size and metric scale stated', 'All sheets', 'satisfied', 'Asserted by the generator'),
        s('N10', 'Window and door sizes consistent between plans and elevations', 'PA-090 with tags on all sheets', 'satisfied', 'Cross-checked by the generator (checks/openings-crosscheck.json)'),
        s('N11', 'Street scene / context where the street frontage changes', 'PA-070', 'verify', 'Indicative neighbour heights; verify levels and sightlines'),
        s('N12', 'Design and planning statement (supporting narrative)', 'supporting/DAS.pdf', 'satisfied'),
        s('N13', 'Application form, ownership certificate, fee', 'supporting/householder-application-form.pdf', 'deferred', 'Completed online at submission'),
        s('N14', 'CIL additional information form', 'supporting/cil-form.pdf', 'deferred', 'Preparation worksheet only; official form, verified areas and lawful-use evidence outstanding'),
        s('N15', 'Photographs of the site', 'PA-100', 'deferred', 'Sales photographs used in this issue'),
        s('L1', 'Green Belt: floorspace calculation and outbuildings within 5 m', 'PA-080', 'n/a' if not ctx.green_belt_module else 'satisfied', 'Site confirmed outside the Green Belt'),
        s('L2', 'Arboricultural assessment (BS5837)', 'reports register', 'external', 'To commission'),
        s('L3', 'Preliminary ecological appraisal / bat survey', 'reports register', 'external', 'To commission'),
        s('L4', 'Flood risk assessment', '—', 'verify', 'Check river, surface-water and groundwater risks; flood zone 1 is unverified'),
        s('L5', 'Noise assessment for plant', 'reports register', 'external', 'Once plant is located'),
        s('L6', 'Heritage statement', '—', 'verify', 'Check designation and nearby heritage assets/settings; an assumption does not close this item'),
        s('L7', 'Basement impact / structural statement', 'reports register', 'external', 'To commission'),
        s('L8', 'Drainage strategy', 'reports register', 'external', 'To commission'),
    ]
    L += [
        s('L9', 'Ancient woodland and ancient/veteran tree screening', 'reports register', 'verify', 'Ask the arboriculturist to establish whether a separate impact assessment is triggered'),
        s('L10', 'Daylight/sunlight and neighbour amenity', 'PA-070 and consultant review', 'verify', 'Assess affected neighbours and whether a daylight study is needed'),
        s('L11', 'Plant specification and acoustic evidence', 'reports register', 'external', 'Resolve equipment and location; no designed plant enclosure'),
        s('P1', 'Applicant details, title interests and designations', 'planning-context.json', 'verify', 'Postcode, applicant details and all designations except owner-confirmed Green Belt status remain unverified'),
        s('P2', 'Survey and floorspace reconciliation', 'PA-080 and manifest.json', 'external', 'Measured building/topographical survey; reconcile model room and wall envelopes before CIL'),
        s('P3', 'Access, visibility and bin/cycle storage', 'PA-003', 'verify', 'Concept splays are not highway-approved; relocate storage marker into a workable garage layout'),
        s('P4', 'Decision evidence and character-area policy', 'supporting/DAS.pdf', 'verify', 'Retrieve decision notices and drawings for retained precedent leads; verify character-area policy'),
    ]
    if ctx.get('design_variant') == 'planning':
        L = [item for item in L if item['item'] not in ('L5', 'L11')]
    import re
    for item in L:
        missing = sorted(set(re.findall(r'PA-\d{3}', item['where'])) - have)
        if missing:
            item['status'] = 'missing'
            item['note'] = 'Missing referenced drawings: ' + ', '.join(missing)
    return L
