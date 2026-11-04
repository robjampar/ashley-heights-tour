"""Read-only section comparison against CJ02's saved gravity cases.

Run with .venv/bin/python revisions/beam-size-review-2026-10-28/compare.py.
Writes only this study's JSON. No member, model or design limit is changed.
"""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from scripts.structure.beam_analysis import loaded_steel_screen

MEMBERS = ROOT / 'walkthrough/public/structure/members.json'
CATALOG = ROOT / 'proposal/specs/structural-uk-catalog.json'


def digest(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def main():
    inputs = [MEMBERS, CATALOG, ROOT / 'scripts/structure/beam_analysis.py',
              ROOT / 'scripts/structure/trial_calculations.py']
    hashes = {str(p.relative_to(ROOT)): digest(p) for p in inputs}
    members = json.loads(MEMBERS.read_text())
    catalog = json.loads(CATALOG.read_text())
    sections = catalog['steel'] + catalog['coordinationSteel']
    output = []
    for ident in ('M-FR-3-001', 'M-FR-3-010', 'M-CJ01-GROUND-HEAD', 'M-GABLE-FLOOR-BLOCK'):
        member = next(e for e in members['elements'] if e['id'] == ident)
        cases = member['supportScreen']['cases'] + member['supportScreen'].get('patternCases', [])
        rows = []
        for section in sections:
            results = []
            for case in cases:
                loads = case['loads']
                permanent = [list(v) for v in loads['permanentUDL']]
                own = [0, case['engineeringSpanM'], case['selfWeightKNm']]
                assert all(abs(permanent[-1][i] - own[i]) < 1e-8 for i in range(3))
                result = loaded_steel_screen(section, case['engineeringSpanM'], permanent[:-1],
                    loads['variableUDL'], loads['permanentPoints'], loads['variablePoints'])
                # Reproduce the saved reference before interpreting alternatives.
                if section['name'] == member['steelProfile']['name']:
                    assert abs(result['sls']['deflectionMm'] - case['sls']['deflectionMm']) < 1e-7
                    assert abs(result['uls']['momentKNm'] - case['uls']['momentKNm']) < 1e-7
                results.append(result)
            failures = sorted({k for r in results for k, passed in r['checks'].items() if not passed})
            rows.append({
                'section': section['name'], 'family': section.get('family', 'UB'),
                'depthMm': section['depthMm'], 'widthMm': section['widthMm'],
                'massKgPerM': section['kgPerM'],
                'physicalLengthMassKg': section['kgPerM'] * member['measurements']['lengthM'],
                'maxTotalDeflectionMm': max(r['sls']['deflectionMm'] for r in results),
                'maxVariableDeflectionMm': max(r['variableDeflectionMm'] for r in results),
                'maxElasticBendingUtilisation': max(r['uls']['momentKNm'] / r['elasticMomentResistanceKNm'] for r in results),
                'failedScreenChecks': failures, 'withinExistingGravityScreen': not failures,
                'approvedForConstruction': False,
            })
        output.append({'id': ident, 'name': member['name'],
            'installedSection': member['steelProfile']['name'],
            'supportCentreSpanM': cases[0]['engineeringSpanM'],
            'physicalLengthM': member['measurements']['lengthM'],
            'caseCount': len(cases), 'existingTotalDeflectionTargetMm': cases[0]['totalDeflectionLimitMm'],
            'comparisons': rows})
    assert hashes == {str(p.relative_to(ROOT)): digest(p) for p in inputs}
    report = {
        'createdAt': datetime.now(timezone.utc).isoformat(),
        'sourceRevision': members['revision'], 'installed': False, 'approvedForConstruction': False,
        'method': 'Replay every saved low/reference/high and variable-pattern case, retaining upstream reactions and replacing only the candidate beam self-weight. Simply supported members on rigid seats. The four beams are compared independently, not simultaneously resized.',
        'scope': 'Four main beams implicated in the current discussion; not a whole-building optimisation or a search of the full UK section range.',
        'limits': 'No complete lateral stability, vibration, support settlement, roof-load, masonry, connection, fire, or construction-stage assessment. Deflection targets are unchanged. Passing isolated checks is not a compliant design. Relaxing the 10 mm total target requires specific finish, glazing and cumulative movement assessment; no alternative target has been adopted.',
        'referenceReproduced': True, 'sourceHashes': hashes,
        'references': [
            'https://www.gov.uk/government/publications/structure-approved-document-a',
            'https://steelconstruction.info/topics/design/design-codes-and-standards',
            'https://www.steelconstruction.info/images/0/0d/SCI_P449.pdf',
            'https://www.britishsteel.co.uk/wp-content/uploads/2026/03/British-Steel-product-brochure-03.03.26-3.pdf',
        ],
        'members': output,
    }
    target = Path(__file__).with_name('comparison.json')
    target.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps({'written': str(target.relative_to(ROOT)), 'members': len(output),
                      'sectionComparisons': sum(len(r['comparisons']) for r in output),
                      'referenceReproduced': True, 'modelChanged': False}))


if __name__ == '__main__':
    main()
