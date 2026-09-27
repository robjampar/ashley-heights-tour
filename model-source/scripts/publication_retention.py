"""Retain superseded immutable files while cached review HTML expires."""

# GitHub Pages currently serves these HTML pages with max-age=600. Three cache
# lifetimes allow for a deployment overlap without retaining hours of large GLBs.
RETAIN_SECONDS = 30 * 60


def retirement(info, now):
    # Older manifests recorded only a 24-hour deadline. Never reset the clock
    # when an unchanged candidate is staged repeatedly.
    retired = info.get('retired_at_epoch', info.get('retain_until_epoch', now + 86400) - 86400)
    retired = min(retired, now)
    return {**info, 'retired_at_epoch': retired,
            'retain_until_epoch': retired + RETAIN_SECONDS}
