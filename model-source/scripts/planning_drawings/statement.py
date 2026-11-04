"""Content for the Design & Access Statement, application form, CIL form,
report summaries and the Sevenoaks validation checklist mapping."""


def das_sections(ctx, schedule, risks, site_info, pr):
    from .evidence import policy_paragraphs, CASES
    planning = ctx.get('design_variant') == 'planning'
    ex_t = sum(r['gia_m2'] for r in schedule['existing'])
    pr_t = sum(r['gia_m2'] for r in schedule['proposed'])
    setback = pr.nav.get('proposal', {}).get('specification', {}).get('sideWingFrontSetback_m')
    return {'sections': [
        ('1. Purpose and scope', [
            f"Review statement for extensions and alterations at {ctx['address']}, {ctx.get('postcode', '')}, title {ctx['title_number']}. This issue tests the current envelope; it is not a submitted application or a finding that permission will be granted.",
            ('The current planning model is the agreed scope. Pool, spa and loggia are excluded; existing garden buildings remain. The house envelope is unchanged by this review.' if planning else 'This is the separate full-design variant; use the planning variant for the agreed application scope.'),
            'The drawings are generated from saved geometry and navigation exports. Existing dimensions, levels, neighbouring buildings and boundaries remain reconstructed estimates. Source/model differences are disclosed in manifest.json and REQUIRED-ACTIONS.md; these exports have not been represented as a fresh native-model build.'
        ]),
        ('2. Site and constraints', [
            f"The modelled plot is {pr.site_polygon.area:,.0f} m² at the head of Ashley Close. The existing house is detached, two storeys, with a hipped roof, side garage and rear garden. Its original construction date and alteration history have not been established.",
            ctx['designations']['basis'],
            'No.3 is to the west, flats including Marlow Court are to the east, and No.5 is across the close. Their actual windows, ground levels and roof heights require verification. Local character is assessed under F05 Vine Avenue / Ashley Road.'
        ]),
        ('3. Proposal and quantities', [
            ctx['proposal_description'],
            f"Model GIA estimates: existing house {ex_t:.1f} m²; proposed house {pr_t:.1f} m², including basement and roof accommodation; increase {pr_t-ex_t:.1f} m² ({(pr_t/ex_t-1)*100:.1f}%). Retained outbuildings are scheduled separately. These are not certified survey or CIL quantities.",
            f"The model uses ground floor ±0.00, first floor +2.80 m, loft +5.55 m, eaves +5.35 m and main ridge +8.05 m. Side-wing front setback in the saved navigation: {setback if setback is not None else 'not recorded'} m. Confirm all against measured drawings.",
            'The former storey-area-based volume estimate has been withdrawn because it double counted roof accommodation and mixed basement with visible mass. A separate external-envelope calculation above and below ground is required if volume is relied on.'
        ]),
        ('4. Scale, layout and townscape case', [
            ctx.get('front_wing_case', {}).get('summary', ''),
            'Matching ridge height and materials are supporting features, not conclusive tests. The front projection, depth of roof, gaps and combined dormers must be judged together. The broad rear dormer remains a material risk even where its roof is below the ridge. No claim of subordination is made solely from a minimum setback.',
            'PA-070 is a schematic common-datum comparison; it omits real depth, topography and parts of the surrounding street. It must not be used as proof of a harmless street presence. Replace it with survey-controlled street and oblique views before relying on that conclusion.'
        ]),
        ('4a. Policy and decision evidence', policy_paragraphs() + [
            'The site is outside the mapped Green Belt. No Green Belt percentage limit is used to assess this urban householder proposal. Current national footprint and curtilage provisions must be tested separately from GIA.',
            *[f"{c['address']} ({c['ref']}): {c['outcome']}. {c['finding']} Key distinction: {c['difference']} Source: {c['source']}" for c in CASES[:4]],
            'The accompanying planning-evidence.pdf provides replacement-house cases, adverse decisions and the qualified No.3 Ashley Close recommendation. The examples are not a statistical sample and do not establish a likelihood of consent. Keeping the house remains the working route; demolition offers no automatic additional size entitlement.'
        ]),
        ('5. Materials and retained character', [
            ctx['materials']['walls'] + ' ' + ctx['materials']['roof'] + ' Dormers: ' + ctx['materials']['dormers'] + '.',
            'PA-090 records openings and the proposed finish. Verify material samples against the retained house. The effect of removing the porch, arched landing window and chimney must be assessed as part of the whole composition, not omitted from the comparison.'
        ]),
        ('6. Access, parking and servicing', [
            ctx['parking']['basis'] + ' These spaces require dimensional and manoeuvring verification, including clear garage space after bin/cycle storage.',
            ctx['visibility_splays']['basis'],
            'Access thresholds, pedestrian routes, the sliding gate and bin/cycle storage require a coordinated layout. The old unverified storage marker has been omitted. No highway acceptance is implied.'
        ]),
        ('7. Neighbour amenity', [
            'Assess daylight and sunlight, oppressive outlook, and direct/oblique overlooking independently at No.3, No.5 and the affected flats. Record habitable-room uses and single-aspect windows where ascertainable. A 45-degree check is a screening aid, not an overall pass.',
            'The retained 2018 drawings for No.3 show a landing window on the nearest east flank; east-facing glazing on its western extension must not be mistaken for that closest flank. Verify the present as-built arrangement.',
            'The proposed flank-window privacy treatment in PA-090 is an intention, not a completed sightline assessment. Define each restriction by opening tag and assess its effect on the room it serves. Test details within the envelope first; report unresolved harm rather than declaring compliance.'
        ]),
        ('8. Trees, ecology, heritage and drainage', [
            ctx['trees']['basis'],
            'Commission arboricultural, ecology, basement/retention and drainage evidence. Verify TPO 19/1987 against surveyed trees. Assess nearby heritage settings, including locally listed 3 Vine Avenue. River/sea Flood Zone 1 screening does not establish groundwater or basement suitability.',
            'Infiltration, foul capacity, basement pumping and temporary works remain design questions for the relevant specialists. No soakaway performance, structural adequacy or ecological absence is assumed.'
        ]),
        ('9. Preparation and decision gates', [
            'The evidence supports a reasoned assessment of the current envelope, not a no-risk conclusion. Preserve the envelope during the initial assessment. If harm is established, identify its specific cause and test proportionate details; any envelope reduction is a later owner decision.',
            'The accompanying pre-application-draft.pdf is an unsent request focused on street context, roof mass, amenity, retention and validation. Pre-application advice is without prejudice.',
            'The net area increase exceeds 100 m². Complete official CIL information using verified areas, demolition and lawful-use evidence. Confirm eligibility and obtain any applicable exemption before commencing; the preparation worksheet is not an exemption claim. Applicant declarations and ownership certificates remain unsigned.'
        ]),
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
    from .evidence import BRIEFS
    return [(title, [brief]) for title, brief in BRIEFS]


def checklist(ctx, manifest_sheets):
    have = {m['sheet'] for m in manifest_sheets}
    def s(item, req, where, status, note=''):
        return {'item': item, 'requirement': req, 'where': where, 'status': status, 'note': note}
    L = [
        s('N1', 'Site location plan 1:1250/1:2500 on an OS base, red line, north', 'PA-001', 'deferred', 'Traced base for this issue; purchase the OS extract'),
        s('N2', 'Block/site plan 1:200 or 1:500: footprints, trees, boundaries, parking, access and splays, bins/cycles', 'PA-002, PA-003, PA-001 (1:500)', 'verify', 'Survey, storage and access layout outstanding'),
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
        s('L4', 'Flood risk assessment', '—', 'verify', 'River/sea Zone 1 map screening available; assess surface-water, groundwater and basement risk'),
        s('L5', 'Noise assessment for plant', 'reports register', 'external', 'Once plant is located'),
        s('L6', 'Heritage statement', '—', 'verify', 'Check designation and nearby heritage assets/settings; an assumption does not close this item'),
        s('L7', 'Basement impact / structural statement', 'reports register', 'external', 'To commission'),
        s('L8', 'Drainage strategy', 'reports register', 'external', 'To commission'),
    ]
    L += [
        s('L9', 'Ancient woodland and ancient/veteran tree screening', 'reports register', 'verify', 'Ask the arboriculturist to establish whether a separate impact assessment is triggered'),
        s('L10', 'Daylight/sunlight and neighbour amenity', 'PA-070 and consultant review', 'verify', 'Assess affected neighbours and whether a daylight study is needed'),
        s('L11', 'Plant specification and acoustic evidence', 'reports register', 'external', 'Resolve equipment and location; no designed plant enclosure'),
        s('P1', 'Applicant details, title interests and designations', 'specs/planning-context.json', 'verify', 'Map screening is recorded in the statement; verify legal interests, boundaries and applicant declarations'),
        s('P2', 'Survey and floorspace reconciliation', 'PA-080 and manifest.json', 'external', 'Measured building/topographical survey; reconcile model room and wall envelopes before CIL'),
        s('P3', 'Access, visibility and bin/cycle storage', 'PA-003', 'verify', 'Concept splays are not highway-approved; establish workable garage storage before adding its marker'),
        s('P4', 'Decision evidence and character-area policy', 'supporting/DAS.pdf', 'verify', 'F05 verified; evidence register separates decisions and recommendations. Obtain formal No.3 notice and approved drawings before promoting it to a granted comparator'),
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
