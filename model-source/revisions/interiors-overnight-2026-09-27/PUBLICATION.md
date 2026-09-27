# Overnight interior release notes

Full models and isolated studies use immutable, content-addressed assets. The
live HTML response was checked on 27 September 2026 and returns
`Cache-Control: max-age=600`. Superseded files are retained for 30 minutes,
three HTML cache lifetimes, then removed from later site deployments. Already
loaded models stay in browser memory. A very old open page may need a refresh
before switching to a model it has not loaded previously.

Repeated staging preserves each asset's original retirement time. Current
assets are never expired by this policy. Tests cover repeat staging, expiry,
legacy 24-hour deadlines and invalid future retirement timestamps.

Two old GLBs had future retirement timestamps despite being listed as previous
assets in the archived `8d12b1e` release at 2026-09-26T23:27:23Z. Their retirement
times were repaired to that documented observation. The source Git history
continues to retain the files; no current design was removed.

This limits accumulated copies of large models during frequent publication.
Check total staged site bytes before pushing against the
[GitHub Pages size limit](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
The deployment and exact live asset/page verification are recorded separately
in the publication JSON files after each successful release.
