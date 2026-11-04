import unittest
import numpy as np
from scripts.exports.daylight_filter import filter_daylight


class DaylightFilterTests(unittest.TestCase):
    def test_nearby_room_does_not_receive_another_rooms_light(self):
        probes = [{'room': room, 'position': [x, 0, 1.5]} for room, x in [('bright', 0), ('dark', .1)]]
        values = np.array([np.full((6, 3), 2.), np.full((6, 3), .1)])
        filtered = filter_daylight(probes, values)
        np.testing.assert_allclose(filtered, values)

    def test_fixture_spike_is_removed_but_daylight_gradient_survives(self):
        probes = [{'room': 'bedroom', 'position': [x, 0, 1.5]} for x in range(7)]
        values = np.array([np.full((6, 3), v) for v in [.2, .25, .3, 80, .4, .45, .5]])
        filtered = filter_daylight(probes, values)
        self.assertTrue(np.isfinite(filtered).all())
        self.assertLess(filtered.max(), .8)
        self.assertLess(filtered[0].mean(), filtered[-1].mean())
        self.assertEqual(values[3, 0, 0], 80)

    def test_neutral_daylight_stays_neutral_and_orange_spill_is_restrained(self):
        probes = [{'room': 'room', 'position': [0, 0, 1.5]}]
        orange = np.tile([1., .4, .1], (1, 6, 1))
        result = filter_daylight(probes, orange)
        self.assertLess(result[0, 0, 0] / result[0, 0, 2], 2.2)
        neutral = np.full((1, 6, 3), .3)
        np.testing.assert_allclose(filter_daylight(probes, neutral), neutral)
