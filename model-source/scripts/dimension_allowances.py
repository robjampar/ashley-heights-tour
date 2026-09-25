"""Strict owner-approved departures; original printed dimensions stay intact."""

OWNER_SELECTED_B = {
    ('Dining room', 1): (5.20, 4.90),
    ('Balcony', 1): (2.60, 2.30),
}


def approved_departure(check, data):
    """Return only the two explicitly selected B targets, never arbitrary edits."""
    review = data.get('rear_bay_review', data.get('rear_bay_alignment_review', {}))
    if not (review.get('owner_approved') is True and review.get('option_id') == 'B'
            and abs(review.get('projection_reduction_m', 0) - .30) < 1e-9):
        return None
    expected = OWNER_SELECTED_B.get((check['room'], check['axis']))
    if expected is None or abs(check['target_m'] - expected[0]) > 1e-9:
        return None
    matches = [entry for entry in review.get('owner_approved_dimension_departures', [])
               if entry.get('room') == check['room'] and entry.get('axis') == check['axis']]
    if len(matches) != 1:
        return None
    entry = matches[0]
    if (abs(entry.get('printed_target_m', -999) - expected[0]) > 1e-9
            or abs(entry.get('accepted_target_m', -999) - expected[1]) > 1e-9):
        return None
    return entry


def accepted_target(check, data):
    departure = approved_departure(check, data)
    return departure['accepted_target_m'] if departure else check['target_m']


def classify_dimension(check, actual_m, data, tolerance_m=.001):
    departure = approved_departure(check, data)
    accepted = accepted_target(check, data)
    printed_error = actual_m - check['target_m']
    accepted_error = actual_m - accepted
    printed_match = abs(printed_error) <= tolerance_m
    accepted_match = abs(accepted_error) <= tolerance_m
    status = ('PASS' if printed_match else 'OWNER_APPROVED_DEPARTURE') if accepted_match else 'FAIL'
    return {'printed_target_m': check['target_m'], 'accepted_target_m': accepted,
            'printed_error_mm': round(printed_error * 1000, 4),
            'accepted_error_mm': round(accepted_error * 1000, 4),
            'printed_match': printed_match, 'accepted_match': accepted_match,
            'owner_approved_departure': bool(departure), 'status': status}
