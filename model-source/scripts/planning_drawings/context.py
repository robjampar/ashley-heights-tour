"""Planning-pack inputs that the model does not know: address, designations,
north, revision. Everything comes from proposal/planning-context.json so a
rebuild after a model change carries the same context unchanged."""
import json, math, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTEXT_FILE = ROOT / 'proposal' / 'planning-context.json'
OUT = ROOT / 'proposal' / 'planning'

REQUIRED = ['project', 'address', 'title_number', 'lpa', 'north_bearing_of_model_y_deg',
            'designations', 'drawing_revision', 'issue_date', 'sheet_status', 'materials']


class Context(dict):
    def __init__(self, path=CONTEXT_FILE):
        super().__init__(json.loads(Path(path).read_text()))
        missing = [k for k in REQUIRED if k not in self]
        assert not missing, 'planning-context.json is missing ' + ', '.join(missing)
        self.path = Path(path)

    @property
    def north_deg(self):
        return float(self['north_bearing_of_model_y_deg'])

    @property
    def north_vector(self):
        """Unit vector of true north in model x/y (model +y bears north_deg)."""
        # Model +y bears b, so true north lies (360-b) degrees clockwise of +y,
        # i.e. slightly towards +x when b is just under 360.
        a = math.radians(360.0 - self.north_deg)
        return (math.sin(a), math.cos(a))

    @property
    def north_rotation_deg(self):
        """Clockwise rotation of the north arrow from page-up on a plan drawn with model +y up."""
        return 360.0 - self.north_deg

    def designation(self, key):
        v = self['designations'].get(key)
        return v

    def designation_text(self, key):
        v = self['designations'].get(key)
        conf = key in (self['designations'].get('confirmed') or [])
        tail = ' (confirmed)' if conf else ' (assumed — verify)'
        if v is None:
            return 'TO BE CONFIRMED'
        if v is False:
            return 'No' + tail
        if v is True:
            return 'Yes' + tail
        return str(v) + tail

    @property
    def green_belt_module(self):
        """Green Belt sheets/tests are produced when the site is or may be Green Belt."""
        return not (self['designations'].get('green_belt') is False and
                    'green_belt' in (self['designations'].get('confirmed') or []))

    @property
    def issue_date_text(self):
        d = datetime.date.fromisoformat(self['issue_date'])
        return d.strftime('%d %b %Y').lstrip('0')

    @property
    def revision(self):
        return self['drawing_revision']

    def replace_before_submission(self):
        """The mocked inputs a real submission must replace, for PA-000."""
        items = [
            ('OS location plan base', 'PA-001 uses the reference OS-style extract registered to the model. Purchase a licensed OS extract (Planning Portal / OS partner) and overlay the same red line at 1:1250.'),
            ('Existing drawings', self['existing_drawings_basis']),
            ('Levels', self['levels_basis']),
            ('Neighbour buildings', 'Footprints traced from the reference plan; heights estimated from photographs. Street scene is indicative.'),
            ('Trees', self['trees']['basis']),
            ('Designations', self['designations']['basis']),
            ('Postcode / applicant details', self['postcode_basis']),
        ]
        return items
