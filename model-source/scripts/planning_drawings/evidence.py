"""Research-backed content shared by the planning statement and review brief.

Outcomes distinguish council committee decisions, inspector decisions and
recommendations. Historical cases explain reasoning; they do not predict consent.
"""
import html
import json
from . import docs

SPD = 'https://www.sevenoaks.gov.uk/download/downloads/id/379/residential_extensions_spd_adopted_may_2009.pdf'
F05 = 'https://www.sevenoaks.gov.uk/download/downloads/id/740/f_formal_detached.pdf'
L2 = 'https://www.gov.uk/guidance/national-planning-policy-framework-chapter-12-making-effective-use-of-land-l1-3'
VALIDATION = 'https://www.sevenoaks.gov.uk/download/downloads/id/4896/1_application_for_householder_planning_permission_validation_checklist.pdf'
MANSELL = 'https://www.bailii.org/ew/cases/EWCA/Civ/2017/1314.html'

CASES = [
    dict(ref='25/03306/HOUSE', address='26 Vine Court Road, Sevenoaks',
         outcome='Committee grant, 12 March 2026', status='committee_decision',
         finding='Extensive remodelling, extensions, roof accommodation and basement works were accepted while retaining the house.',
         difference='Conservation-area site with a generous plot. Officer report records approximately 10 m front setback, compared with approximately 5.3 m to the front boundary wall in Ashley\'s model. Approved dormers were described as modest.',
         source='https://sevenoaks.moderngov.co.uk/mgAi.aspx?ID=27388&J=1',
         report='https://sevenoaks.moderngov.co.uk/documents/g3530/Public%20reports%20pack%2012th-Mar-2026%2019.00%20Development%20Management%20Committee.pdf?J=1&T=10',
         locator='Report printed pp.33-46, particularly paragraphs 38, 43, 56, 58, 71-78'),
    dict(ref='21/02393/HOUSE', address='Meadowfield, 60 Hitchen Hatch Lane',
         outcome='Committee grant, 21 October 2021', status='committee_decision',
         finding='An extension without a lowered ridge was accepted because the integrated roof form and surrounding context were suitable.',
         difference='Screening, the open western plot and separation from neighbours mattered. The decision does not establish that matching ridge height alone makes a large front wing acceptable.',
         source='https://sevenoaks.moderngov.co.uk/mgAi.aspx?ID=14745&J=1',
         report='https://sevenoaks.moderngov.co.uk/documents/s45386/4.2%20-%2021-02393%20-%20dcc%2021.10.21%20final%20-%20formatted.pdf?J=1',
         locator='Officer report paragraphs 14-16 and neighbour assessment'),
    dict(ref='22/03572/HOUSE; APP/G2245/D/23/3328771', address='72 Brattle Wood',
         outcome='Appeal dismissed, 31 January 2024', status='inspector_decision',
         finding='A deep front garage projection dominated the house and disrupted the street relationship despite a matching roof pitch. Screening did not overcome the harm.',
         difference='The regular White Hart Wood frontage differs from Ashley\'s cul-de-sac head. Demonstrate that distinction with measured context rather than simply asserting it.',
         source='https://acp.planninginspectorate.gov.uk/ViewDocument.aspx?fileid=55875980', locator='Character and appearance assessment'),
    dict(ref='23/01976/HOUSE; APP/G2245/D/23/3330895', address='Dene Cottage, Knockholt Road, Halstead',
         outcome='Appeal dismissed, 7 February 2024', status='inspector_decision',
         finding='Street character was acceptable, but the extension would harm outlook from a neighbour\'s sole bedroom windows. Acceptable daylight and privacy did not cure oppressive outlook.',
         difference='Different house form and window arrangement. The transferable lesson is to assess outlook separately, especially from single-aspect habitable rooms.',
         source='https://acp.planninginspectorate.gov.uk/ViewDocument.aspx?fileid=55970938', locator='Paragraphs 12-15 and conclusions'),
    dict(ref='17/00330/FUL; APP/G2245/W/17/3189529', address='Summerhill, Seal Hollow Road',
         outcome='Replacement-house appeal allowed, 5 April 2018', status='inspector_decision',
         finding='A significantly larger and taller replacement was accepted because its siting, lower hipped eaves, gaps and angled relationship avoided unacceptable effects.',
         difference='Large plots and a backland setting differ from Ashley\'s visible frontage. This is evidence of context-dependent acceptance, not an allowance for equivalent enlargement.',
         source='https://acp.planninginspectorate.gov.uk/ViewDocument.aspx?fileid=26385845', locator='Paragraphs 4-8 and 17'),
    dict(ref='21/01058/FUL; APP/G2245/W/22/3292870', address='Lyndhurst Cottage, Holly Bush Lane',
         outcome='Replacement-house appeal dismissed, 25 August 2022', status='inspector_decision',
         finding='The inspector accepted massing and modern design but rejected privacy effects associated with windows and raised outdoor areas.',
         difference='The subsequent 22/02482/FUL committee approval followed window changes while retaining the bulk and form. This supports testing targeted amenity measures before assuming wholesale reduction is necessary.',
         source='https://acp.planninginspectorate.gov.uk/ViewDocument.aspx?fileid=48940710',
         report='https://sevenoaks.moderngov.co.uk/documents/s50892/4.1%20-%2022-02482%20-%20FINAL-%20FORMATTED.pdf?J=1',
         decision_followup='https://sevenoaks.moderngov.co.uk/documents/s51104/221215%20-%2015%20December%202022%20-%20minutes%20DRAFT.pdf?J=1',
         locator='Appeal paragraphs 14-19; later report paragraphs 40 and 60-62; committee minutes p.3'),
    dict(ref='11/03230/FUL', address='Bucklers, The Coppice, Lower Bitchet',
         outcome='Committee grant, 24 May 2012', status='committee_decision',
         finding='A replacement dwelling was accepted against a substantial certified permitted-development fallback and its particular design advantages.',
         difference='Green Belt and protected landscape: not Ashley\'s designation context. It demonstrates a mechanism for comparison, not a general demolition bonus or an applicable percentage allowance.',
         source='https://sevenoaks.moderngov.co.uk/mgAi.aspx?ID=1615&J=1',
         report='https://sevenoaks.moderngov.co.uk/documents/s5992/5.05%2011-03230.pdf?J=11', locator='Fallback and very special circumstances assessment'),
    dict(ref='22/03178/FUL; APP/G2245/W/23/3319396', address='Greengates, Rosemary Lane, Hodsoll Street',
         outcome='Replacement-house appeal dismissed, 13 December 2023', status='inspector_decision',
         finding='The replacement had less floorspace, footprint and slightly less volume than its fallback but greater upper-level massing and visual harm. A credible fallback did not compel approval.',
         difference='Green Belt case. Do not import its Green Belt enlargement tests into Ashley\'s urban site; use only to explain why aggregate area or volume cannot replace visual assessment.',
         source='https://acp.planninginspectorate.gov.uk/ViewDocument.aspx?fileid=55254423', locator='Paragraphs 20-21 and 25-26'),
    dict(ref='18/00772/HOUSE', address='3 Ashley Close',
         outcome='Officer recommendation to grant, 3 May 2018; formal notice not verified', status='recommendation_only',
         finding='The officer accepted substantial additional width on balance, considering roof design, gaps and the particular relationships with neighbouring houses.',
         difference='The upper front projection was about 1 m, compared with about 16 m beyond Ashley\'s original frontage. Proposed drawings are not proof of the present as-built arrangement.',
         source='proposal/neighbours/planning/P58CNHBKLL900/18_00772_HOUSE-OFFICER_REPORT-1918841.pdf', locator='Retained officer report p.3 and proposed 2018 drawings; obtain decision notice'),
]

def policy_paragraphs():
    return [
        'Research checked 3 October 2026. Apply adopted Core Strategy SP1, ADMP EN1 (design and context), EN2 (amenity), EN4 (heritage), the made Sevenoaks Town Neighbourhood Plan including C4, and current national policy. The emerging Regulation 19 Local Plan is not adopted; its weight must be assessed separately.',
        'The correct character area is F05 Vine Avenue / Ashley Road, not F04. Its account of detached houses, gaps, building lines and planting is the starting point. The cul-de-sac-head exception requires evidence of the actual relationship. Source: ' + F05 + ' (printed pp.273-277).',
        'The Residential Extensions SPD allows some additions larger than the original house where townscape is enhanced (4.10). Front extensions remain subject to context and building-line assessment (4.21-4.23); the usual boundary gap is not a complete acceptability test (4.19). Dormers must be proportionate and should not read as an extra storey (4.31, 4.35-4.36). Source: ' + SPD,
        'Current national policy L2(1)(d) gives substantial weight to benefits from additional homes or floorspace through sensitive development within settlement plots. Street-scene consistency and acceptable daylight, sunlight, privacy and external amenity remain necessary. Its curtilage provisions concern twice the footprint of all existing buildings and retention of at least half the existing non-developed area, with specified exceptions; they do not mean twice the internal floor area. Verify the publication-date building baseline and curtilage surfaces. Source: ' + L2,
    ]

def case_paragraphs():
    return [f"{c['ref']} - {c['address']}. {c['outcome']}. {c['finding']} Ashley comparison: {c['difference']} Evidence: {c['source']}. {c['locator']}." for c in CASES]

BRIEFS = [
    ('SURV - measured building, site and neighbours', 'Provide a common surveyed datum; existing ridge/eaves and finished/ground levels; legal boundary evidence distinguished from physical fences; all relevant neighbouring windows and room uses where ascertainable; street geometry, roof forms, setbacks and gaps. Survey hard/soft surfaces and outbuildings for the national policy L2 baseline. Reconcile every model dimension and GIA floor schedule; record inaccessible assumptions.'),
    ('VIS - street presence and roof mass', 'Prepare matched existing/proposed eye-level views from the entrance to the close, turning head and oblique approaches, plus site sections. Use identical camera position and lens with surveyed control. Show opaque neighbouring buildings, visible roof depth and winter conditions. Provide an unscreened assessment; do not rely on proposed or off-site planting to hide mass. Assess the front wing and both dormers together.'),
    ('AMEN - neighbours', 'Map receptors at No.3, No.5 and affected flats. Confirm the closest No.3 east-facing landing window and distinguish it from east-facing windows on its western extension; check as-built conditions. Test daylight/sunlight, oppressive outlook, direct and oblique privacy separately. A passing 45-degree test is not a permission guarantee. Identify any glazing or opening restrictions by drawing tag; assess their effect on Ashley\'s own room amenity.'),
    ('STR / BIA - retention and basement', 'Mark exactly which foundations, walls, floors and roof elements remain or are demolished. Confirm the retained structure can accommodate the proposed works. Investigate ground conditions, groundwater, excavation, neighbouring foundations, temporary works, waterproofing and drainage. Do not describe file-hash preservation as evidence of physical retention.'),
    ('ARB / ECO / HER - landscape and constraints', 'Commission BS5837 tree survey with consistent survey IDs and stem-based RPAs; verify TPO 19/1987 and surviving T4/G1 trees. Assess roof/bat potential and any seasonal survey requirements. Evaluate setting effects on locally listed 3 Vine Avenue and other affected assets proportionately. Mapped separation is not proof of no heritage impact.'),
    ('DRAIN / ACCESS / CIL - implementation', 'Resolve runoff, infiltration feasibility, foul capacity and any basement pumping; do not assume soakaways work. Verify five usable parking spaces, manoeuvring, garage storage and access splays. Establish official application and CIL form answers from verified ownership, lawful use, demolition and area evidence; do not infer signatures or exemptions. Add acoustic evidence if plant is selected.'),
]

PREAPP = [
    'Please assess the enclosed current house envelope, excluding pool, spa and loggia. No reduction or replacement dwelling is proposed in this request.',
    'Does the surveyed relationship at the cul-de-sac head support the proposed new principal frontage under F05 and SPD 4.21-4.23? If not, identify the particular views, building lines or relationships causing concern.',
    'Is the combined roof mass, including the side wing and broad rear dormer, acceptable under EN1, current national policy and SPD 4.31/4.35/4.36? Please distinguish height, depth, dormer proportion and visible third-storey effects.',
    'Which neighbouring receptors require further daylight/sunlight, outlook or privacy evidence? Can any identified privacy harm be resolved by specific window details while retaining the envelope?',
    'Please confirm the appropriate application route against the structural retention/demolition plan and the relevant validation requirements, including trees, basement/drainage and heritage setting.',
    'Please confirm the interpretation of national policy L2 for this proposal, including the dated footprint baseline and retained non-developed area. The application does not claim additional dwellings or an automatic right to double floorspace.',
    'Advice is requested on the particular proposal, not on whether cited historic decisions create an entitlement. The comparison schedule includes both approvals and adverse appeal decisions.'
]

def write_documents(ctx, schedule, out):
    """Generate review evidence and an unsent pre-application draft with live links."""
    def paragraphs(items):
        return ''.join('<p>' + html.escape(p) + '</p>' for p in items)
    body = docs.header(ctx, 'RESEARCH', 'Planning evidence and unchanged-envelope strategy')
    body += paragraphs([
        'Scope agreed 3 October 2026: preserve the current planning-model house envelope; exclude the pool, spa and loggia. This research is not a measured survey, consultant assessment or prediction of approval.',
        'Conclusion: bulk and neighbour relationships can justify refusal. Demolition does not automatically permit a larger house. Assess and strengthen the current retained-house case first.',
        f"Model estimates: existing GIA {schedule['cil']['existing_gia']:.1f} m²; proposed GIA {schedule['cil']['proposed_gia']:.1f} m²; increase {schedule['cil']['increase']:.1f} m². Floorspace includes basement and loft; it is not a direct measure of visible bulk. External volume is not established. All figures require survey reconciliation.",
    ])
    body += '<h2>Policy basis</h2>' + paragraphs(policy_paragraphs())
    body += '<h2>Historical decisions: reasoning and limits</h2>'
    for index, c in enumerate(CASES):
        page_break = ' style="page-break-before:always"' if index == 3 else ''
        body += '<h3' + page_break + '>' + html.escape(c['address'] + ' - ' + c['ref']) + '</h3>'
        body += paragraphs([c['outcome'], c['finding'], 'Comparison limit: ' + c['difference'], 'Locator: ' + c['locator']])
        for label, key in [('Outcome / primary record', 'source'), ('Officer report', 'report'), ('Subsequent decision', 'decision_followup')]:
            if key in c:
                url = c[key]
                body += '<p class="small">' + label + ': ' + (f'<a href="{html.escape(url, quote=True)}">{html.escape(url)}</a>' if url.startswith('https:') else html.escape(url)) + '</p>'
    body += '<h2 style="page-break-before:always">Extension versus replacement</h2>' + paragraphs([
        'Retaining the house is the working route. A replacement can reorganise the architecture, but still has to satisfy street character and amenity tests. Compare the same intended envelope under both routes only if structural retention or policy advice makes the distinction material.',
        'A realistic permitted-development fallback can be a material consideration. Mansell v Tonbridge and Malling BC [2017] EWCA Civ 1314, paragraph 27, explains that the prospect must be real rather than merely theoretical; weight remains a planning judgment. A certificate is useful evidence, not a universal legal prerequisite. Source: ' + MANSELL,
        'There is no verified Ashley fallback in this pack. Establish original-house history, planning conditions and applicable rights before drawing or valuing one. Permission to demolish is not permission to erect a replacement. Do not demolish in reliance on the current householder concept.',
        'Cases are selected comparisons, not a statistical sample. No approval probability or claim that proposals of this scale are routinely granted is supported. Unverified draft leads have been removed from the affirmative case.',
    ])
    body += '<h2>Evidence to commission; envelope held fixed</h2>'
    for title, brief in BRIEFS:
        body += '<h3>' + html.escape(title) + '</h3>' + paragraphs([brief])
    body += '<h2>Acceptance gate</h2>' + paragraphs([
        'A complete review has one scope, consistent dimensions and revision, measured context, separate amenity tests, a realistic structural retention plan, and source-labelled precedents. Unresolved harm is reported explicitly. Envelope reduction is a fallback requiring a later owner decision, not an instruction in this issue.',
        'Before submission: satisfy the current householder validation requirements, obtain official forms and declarations, and resolve consultant findings. Draft brief notes are not substitutes for those reports. Source: ' + VALIDATION,
        'Nearby local heritage evidence: 3 Vine Avenue, local-list reference 10172, is an Arts and Crafts house recorded in the Kent Historic Environment Record. Approximate plot-to-asset separation is 42.5 m from GIS screening; setting needs assessment. Source: https://heritage.kent.gov.uk/Monument/MKE114805',
    ])
    docs.html_to_pdf(body, out / 'supporting/planning-evidence.pdf', rect=docs.A4)
    pre = docs.header(ctx, 'PRE-APP', 'Draft pre-application request - not sent')
    pre += '<h2>Proposal</h2>' + paragraphs([ctx['proposal_description']])
    pre += '<h2>Questions for Sevenoaks District Council</h2>' + paragraphs([f'{i}. {p}' for i, p in enumerate(PREAPP, 1)])
    pre += '<h2>Attachments and readiness</h2>' + paragraphs([
        'Attach the consistent PA drawing set, design/planning statement and evidence comparison. Replace indicative context with measured evidence and include available consultant findings before seeking a reliable view. Clearly identify any remaining assumptions.',
        'This draft has not been sent, booked or paid for. Pre-application advice is without prejudice and is not planning permission. Applicant details and declarations remain to be confirmed.',
    ])
    docs.html_to_pdf(pre, out / 'supporting/pre-application-draft.pdf', rect=docs.A4)
    (out / 'supporting/evidence-register.json').write_text(json.dumps({'checked_on': '2026-10-03', 'cases': CASES, 'policy': {'SPD': SPD, 'F05': F05, 'NPPF_L2': L2, 'validation': VALIDATION, 'fallback_case_law': MANSELL}}, indent=2) + '\n')
