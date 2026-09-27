import unittest
from scripts.publication_retention import retirement


class PublicationRetentionTests(unittest.TestCase):
    def test_repeated_staging_does_not_extend_retirement(self):
        original = {'bytes': 100, 'sha256': 'known'}
        first = retirement(original, 10000)
        self.assertEqual(first['retain_until_epoch'], 11800)
        self.assertEqual(retirement(first, 11799), first)
        self.assertLessEqual(retirement(first, 11801)['retain_until_epoch'], 11801)
        self.assertEqual(original, {'bytes': 100, 'sha256': 'known'})

    def test_legacy_deadline_preserves_original_retirement(self):
        result = retirement({'retain_until_epoch': 10000 + 86400}, 11000)
        self.assertEqual(result['retired_at_epoch'], 10000)
        self.assertEqual(result['retain_until_epoch'], 11800)

    def test_future_timestamp_starts_one_bounded_window(self):
        first = retirement({'retired_at_epoch': 99999}, 10000)
        self.assertEqual(first['retired_at_epoch'], 10000)
        self.assertEqual(retirement(first, 11000)['retain_until_epoch'], 11800)
