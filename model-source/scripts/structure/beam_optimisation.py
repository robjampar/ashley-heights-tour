"""UK01 preliminary sections with explicit, unverified movement assumptions."""
import json
from pathlib import Path

SPEC = Path(__file__).resolve().parents[2] / 'proposal/specs/beam-optimisation.json'


def configure(floor, cj, sw02):
    cfg = json.loads(SPEC.read_text())
    assert cfg['approvedForConstruction'] is False
    entries = cfg['members']
    for row in floor['receiverRevisions']:
        if row['id'] in entries:
            row['section'] = entries[row['id']]['section']
    cj['loftCrossSection'] = entries['M-FR-3-001']['section']
    cj['northTransferSection'] = entries['M-FR-3-010']['section']
    cj['groundHeadSection'] = entries['M-CJ01-GROUND-HEAD']['section']
    cj['serviceabilityPolicies'] = {key: row['serviceability'] for key, row in entries.items()}
    sw02['westTransferSection'] = entries['M-GABLE-FLOOR-BLOCK']['section']
    return cfg


def annotate(elements, cfg):
    by = {e['id']: e for e in elements}
    for ident, rule in cfg['members'].items():
        e = by[ident]
        if e['steelProfile']['name'] != rule['section']:
            raise ValueError('UK01 drawn and assessed section differ: ' + ident)
        screen = e['supportScreen']
        cases = screen['cases'] + screen.get('patternCases', [])
        within = all(c['withinScreen'] for c in cases)
        e['status'] = ('Within provisional gravity checks; compliance not demonstrated' if within
                       else 'Fails provisional gravity checks; redesign required')
        e['basis'] = cfg['basis']
        e['approvedForConstruction'] = False
        e['buildingRegulationsReview'] = {
            'revision': cfg['revision'], 'status': cfg['buildingRegulationsCompliance'],
            'role': rule['role'], 'previousSection': rule['previousSection'],
            'candidateSection': rule['section'], 'serviceability': rule['serviceability'],
            'outstanding': cfg['outstanding'], 'references': cfg['references'],
            'modelledGravityChecksWithinLimits': within,
            'approvedForConstruction': False,
        }
        screen['serviceability'] = rule['serviceability']
        screen['buildingRegulationsCompliance'] = 'not-demonstrated'
        e.setdefault('issueIds', []).append('UK01')
