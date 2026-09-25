#!/usr/bin/env python3
"""Render proposal/P8-proposal-B-cost-plan.json as an interactive page.

Every phase, task and resource line is shown. Rates and quantities are editable
in place: changing a rate updates every line that uses it and every total above
it. Edits are kept in the viewer's browser only. Run after
scripts/estimate_proposal_b_costs.py.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "proposal" / "P8-proposal-B-cost-plan.json"
DST = ROOT / "proposal" / "P8-proposal-B-cost-plan.html"

data = json.loads(SRC.read_text(encoding="utf-8"))
payload = json.dumps(data, separators=(",", ":")).replace("</", "<\\/")

HTML = r"""<title>Proposed Scheme Cost Plan</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Serif:wght@500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
:root{
  --ground:#F7F7F4; --surface:#FFFFFF; --surface-2:#EFF0EC; --ink:#1A1D21; --muted:#5E666F;
  --rule:#D9DCD8; --rule-strong:#B9BEBB; --accent:#1E4C86; --accent-ink:#FFFFFF; --accent-soft:#E4ECF7;
  --edit:#A8560B; --edit-soft:#FBEEDF; --ok:#2C6E49; --focus:#1E4C86;
  --sans:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
  --serif:"IBM Plex Serif",Georgia,"Times New Roman",serif;
  --mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --ground:#15181C; --surface:#1C2026; --surface-2:#232830; --ink:#E6E8EA; --muted:#9AA3AC;
    --rule:#2E343C; --rule-strong:#47505A; --accent:#8AB1E4; --accent-ink:#0F1A2B; --accent-soft:#1F2C40;
    --edit:#E7A257; --edit-soft:#3A2A16; --ok:#7CC29A; --focus:#8AB1E4;
  }
}
:root[data-theme="dark"]{
  --ground:#15181C; --surface:#1C2026; --surface-2:#232830; --ink:#E6E8EA; --muted:#9AA3AC;
  --rule:#2E343C; --rule-strong:#47505A; --accent:#8AB1E4; --accent-ink:#0F1A2B; --accent-soft:#1F2C40;
  --edit:#E7A257; --edit-soft:#3A2A16; --ok:#7CC29A; --focus:#8AB1E4;
}
*{box-sizing:border-box}
body{background:var(--ground);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:1.5;margin:0;padding-inline:16px;padding-block:0 64px}
.wrap{max-width:1140px;margin:0 auto}
h1,h2,h3,h4{font-family:var(--serif);font-weight:600;text-wrap:balance;margin:0}
h1{font-size:2rem;line-height:1.15}
h2{font-size:1.4rem;margin-top:2.5rem;padding-top:1.2rem;border-top:2px solid var(--rule-strong)}
h3{font-size:1.1rem}
p{max-width:68ch}
.lede{color:var(--muted);font-size:1rem;margin-top:.6rem}
.eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.num{font-family:var(--mono);font-variant-numeric:tabular-nums}
.money{font-family:var(--mono);font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
/* sticky total bar */
.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--surface);border-bottom:1px solid var(--rule);margin:0 -16px;padding:.55rem 16px}
.bar-in{max-width:1140px;margin:0 auto;display:flex;flex-wrap:wrap;gap:.4rem 1.6rem;align-items:baseline}
.bar .k{font-size:.72rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;font-family:var(--mono)}
.bar .v{font-family:var(--mono);font-weight:500;font-size:1.05rem;font-variant-numeric:tabular-nums}
.bar .delta{color:var(--edit);font-size:.85rem}
.bar .tools{margin-left:auto;display:flex;gap:.5rem;flex-wrap:wrap}
button{font:inherit;font-size:.85rem;color:var(--ink);background:var(--surface-2);border:1px solid var(--rule-strong);border-radius:4px;padding:.3rem .7rem;cursor:pointer}
button:hover{border-color:var(--accent)}
button:focus-visible,input:focus-visible,summary:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
/* summary tables */
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.2rem;margin-top:1.2rem}
table{border-collapse:collapse;width:100%;font-size:.92rem}
th,td{padding:.38rem .5rem;border-bottom:1px solid var(--rule);vertical-align:top;text-align:left}
th{font-weight:500;color:var(--muted);font-size:.78rem;text-transform:uppercase;letter-spacing:.05em;font-family:var(--mono)}
td.r,th.r{text-align:right}
tr.total td{font-weight:600;border-top:2px solid var(--rule-strong);border-bottom:none}
tr.sub td{color:var(--muted)}
.tbl{overflow-x:auto}
.card{background:var(--surface);border:1px solid var(--rule);border-radius:6px;padding:1rem 1.1rem}
.card h3{margin-bottom:.5rem}
input[type=number]{font:inherit;font-family:var(--mono);font-size:.9rem;width:6.2em;text-align:right;color:var(--ink);background:var(--surface);border:1px solid var(--rule);border-radius:3px;padding:.15rem .3rem}
input[type=number].pct{width:4.5em}
input.edited{border-color:var(--edit);background:var(--edit-soft);color:var(--edit)}
input[type=search],input[type=text]{font:inherit;color:var(--ink);background:var(--surface);border:1px solid var(--rule-strong);border-radius:4px;padding:.35rem .6rem;width:min(100%,28rem)}
/* phases */
details.phase{background:var(--surface);border:1px solid var(--rule);border-radius:6px;margin-top:.8rem}
details.phase>summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:3rem 1fr auto auto;gap:.8rem;align-items:baseline;padding:.8rem 1rem}
details.phase>summary::-webkit-details-marker{display:none}
details.phase>summary .no{font-family:var(--mono);color:var(--accent);font-weight:500}
details.phase>summary .t{font-family:var(--serif);font-weight:600;font-size:1.05rem}
details.phase>summary .w{color:var(--muted);font-size:.85rem;white-space:nowrap}
details.phase>summary .m{font-family:var(--mono);font-weight:500;font-variant-numeric:tabular-nums;white-space:nowrap}
details.phase[open]>summary{border-bottom:1px solid var(--rule)}
.phase-body{padding:.4rem 1rem 1rem}
.phase-body>p{color:var(--muted);font-size:.92rem;margin:.5rem 0 .3rem}
details.task{border-top:1px solid var(--rule);padding:.5rem 0}
details.task>summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:3.6rem 1fr auto auto;gap:.8rem;align-items:baseline}
details.task>summary .tm{font-family:var(--mono);font-size:.78rem;color:var(--muted);white-space:nowrap}
details.task>summary::-webkit-details-marker{display:none}
details.task>summary .ref{font-family:var(--mono);color:var(--muted);font-size:.85rem}
details.task>summary .t{font-weight:500}
details.task>summary .m{font-family:var(--mono);font-variant-numeric:tabular-nums;white-space:nowrap}
.basis{color:var(--muted);font-size:.88rem;margin:.25rem 0 .4rem 4.4rem;max-width:80ch}
.basis b{color:var(--ink);font-weight:500}
table.lines{margin:.2rem 0 .3rem;font-size:.88rem}
table.lines td{padding:.28rem .45rem}
table.lines td.kind{color:var(--muted);white-space:nowrap;width:8.5rem}
table.lines td.res .key{font-family:var(--mono);font-size:.72rem;color:var(--muted);margin-left:.4rem}
table.lines td.res .note{color:var(--muted)}
table.lines .uses{font-size:.72rem;color:var(--muted);font-family:var(--mono);display:block}
/* rates */
.rates-tools{display:flex;gap:.8rem;flex-wrap:wrap;align-items:center;margin:.8rem 0}
table.rates td.key{font-family:var(--mono);font-size:.8rem;color:var(--muted)}
.count{color:var(--muted);font-size:.85rem}
.card.delivery{border-color:var(--accent);grid-column:1 / -1}
.card.delivery .row{display:flex;flex-wrap:wrap;gap:.4rem .6rem;align-items:baseline;margin:.45rem 0;font-size:.92rem}
.card.delivery input[type=checkbox]{width:1.05rem;height:1.05rem;accent-color:var(--accent);flex:none;position:relative;top:.15rem}
.card.delivery .row>span:first-of-type{min-width:0}
.task-off>summary .t{color:var(--muted);text-decoration:line-through}
.task-diy>summary .t{color:var(--muted)}
.task-diy>summary .m{color:var(--edit);font-size:.85rem}
.task-off>summary .m::after{content:" not needed";font-family:var(--sans);color:var(--muted);font-size:.8rem}
.presets{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin-top:1rem}
.sv-group{margin-top:1rem}
.sv-group h3{margin-bottom:.3rem}
.sv{display:grid;grid-template-columns:1.4rem 1fr auto;gap:.5rem .7rem;align-items:baseline;padding:.4rem 0;border-bottom:1px solid var(--rule);font-size:.92rem}
.sv input{width:1.05rem;height:1.05rem;accent-color:var(--accent);position:relative;top:.15rem}
.sv .n{color:var(--muted);font-size:.82rem;grid-column:2}
.sv .amt{font-family:var(--mono);font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--ok)}
.sv.on label{font-weight:500}
.note-box{border-left:3px solid var(--accent);background:var(--accent-soft);padding:.7rem 1rem;border-radius:0 4px 4px 0;margin-top:1rem;max-width:80ch}
.note-box p{margin:.2rem 0}
@media (max-width:640px){
  h1{font-size:1.6rem}
  details.phase>summary{grid-template-columns:2.4rem 1fr;gap:.2rem .6rem}
  details.phase>summary .w{grid-column:2}
  details.phase>summary .m{grid-column:2}
  details.task>summary{grid-template-columns:3.2rem 1fr}
  details.task>summary .m{grid-column:2}
  details.task>summary .tm{grid-column:2}
  .basis{margin-left:0}
}
@media (prefers-reduced-motion:no-preference){ details.phase{transition:border-color .15s} }
</style>

<div class="bar"><div class="bar-in">
  <span><span class="k">Inc VAT</span> <span class="v" id="bar-inc">—</span> <span class="delta" id="bar-delta"></span></span>
  <span><span class="k">Ex VAT</span> <span class="v" id="bar-ex">—</span></span>
  <span><span class="k">Works</span> <span class="v" id="bar-works">—</span></span>
  <span class="tools">
    <button type="button" id="btn-expand">Expand all</button>
    <button type="button" id="btn-collapse">Collapse all</button>
    <button type="button" id="btn-reset">Reset edits</button>
  </span>
</div></div>

<div class="wrap">
<header style="padding-top:1.6rem">
  <div class="eyebrow">Ashley Heights · Proposed scheme · model saved 21 September 2026 · priced 21 September 2026</div>
  <h1 style="margin-top:.4rem">Proposed scheme cost plan, line by line</h1>
  <p class="lede">Every task is measured from the compact model and priced as materials, trade days, plant hire and waste removal. Nothing is a £/m² benchmark. If a rate or a quantity looks wrong, change it in the row — every line using that rate and every total above it recalculates. Edits stay in your browser only.</p>
</header>

<h2>Summary</h2>
<div class="presets">
  <span class="eyebrow">Presets</span>
  <button type="button" id="pre-contractor">Main contractor, as priced</button>
  <button type="button" id="pre-cash">Shell only, self-builder cash basis</button>
  <button type="button" id="pre-safe">Cash basis + all spec and site savings</button>
  <button type="button" id="pre-basic">Everything basic (shell + your materials)</button>
  <button type="button" id="pre-clear">Clear savings</button>
</div>
<div class="grid">
  <div class="card delivery">
    <h3>How the job is run</h3>
    <label class="row"><input type="checkbox" id="d-self"> <span>Self-managed — I run the site and pay trades directly (drops the site manager, contractor's surveyor, contractor's insurance and the 7% overhead and profit; adds an owner's renovation policy)</span></label>
    <label class="row"><input type="checkbox" id="d-shell"> <span>Shell only — trades build the structure and weathertight envelope; I do all internal work and all external works myself (those tasks show what you'd buy in materials)</span></label>
    <label class="row"><span>Labour discount (mates' rates)</span> <input type="number" class="pct" id="d-disc" step="5" min="0" max="60" aria-label="labour discount percent">% off every day rate</label>
    <label class="row"><span>Share of DIY-able trade days I do myself</span> <input type="number" class="pct" id="d-diy" step="5" min="0" max="100" aria-label="DIY share percent">%</label>
    <label class="row"><input type="checkbox" id="d-cash"> <span>Trades paid direct and not VAT-registered — VAT only on materials, plant, skips, surveys and fees</span></label>
    <label class="row"><span>My speed on the work I do myself, as a share of trade speed</span> <input type="number" class="pct" id="d-speed" step="5" min="20" max="100" aria-label="own speed percent">%</label>
    <label class="row"><span>Weeks on site</span> <input type="number" class="pct" id="d-weeks" step="1" min="30" max="200" aria-label="weeks on site"> (scales welfare, skips, consumables, attendance)</label>
    <p class="count" id="d-note"></p>
    <div class="tbl" id="d-own" hidden><table>
      <thead><tr><th>Your own work</th><th class="r">Materials ex VAT</th><th class="r">Materials inc VAT</th><th class="r">Plant and skips</th><th class="r">Trade days replaced</th><th class="r">Your time, working alone</th></tr></thead>
      <tbody id="d-own-body"></tbody></table></div>
  </div>
  <div class="card">
    <h3>From works to the total</h3>
    <div class="tbl"><table id="chain">
      <tr><td>Construction work, phases 0–13</td><td class="money" id="s-works"></td></tr>
      <tr><td>Preliminaries (<span id="s-weeks"></span> weeks on site)</td><td class="money" id="s-prelims"></td></tr>
      <tr class="total"><td>Subtotal</td><td class="money" id="s-sub"></td></tr>
      <tr><td>Main contractor overhead and profit <input type="number" class="pct" id="p-ohp" step="0.5" min="0" max="30" aria-label="overhead and profit percent">%</td><td class="money" id="s-ohp"></td></tr>
      <tr><td>Contingency <input type="number" class="pct" id="p-cont" step="0.5" min="0" max="40" aria-label="contingency percent">%</td><td class="money" id="s-cont"></td></tr>
      <tr><td>Professional fees <input type="number" class="pct" id="p-fees" step="0.5" min="0" max="30" aria-label="fees percent">% of works + OH&amp;P, or a fixed sum £<input type="number" id="p-feefix" step="500" min="0" aria-label="fixed fee sum"> (drawings and calcs; overrides the %)</td><td class="money" id="s-fees"></td></tr>
      <tr class="total"><td>Total excluding VAT</td><td class="money" id="s-ex"></td></tr>
      <tr><td>VAT <input type="number" class="pct" id="p-vat" step="5" min="0" max="20" aria-label="VAT percent">%</td><td class="money" id="s-vat"></td></tr>
      <tr class="total"><td>Total including VAT</td><td class="money" id="s-inc"></td></tr>
    </table></div>
  </div>
  <div class="card">
    <h3>By phase</h3>
    <div class="tbl"><table id="by-phase"></table></div>
  </div>
  <div class="card">
    <h3>By resource</h3>
    <div class="tbl"><table id="by-kind"></table></div>
    <p class="count" style="margin:.6rem 0 0">Materials are delivered prices. Labour is a person-day including employer's costs. Waste is per skip or lorry load.</p>
  </div>
  <div class="card">
    <h3>Labour by trade</h3>
    <div class="tbl"><table id="by-trade"></table></div>
  </div>
  <div class="card">
    <h3>What is being built</h3>
    <div class="tbl"><table id="built"></table></div>
  </div>
  <div class="card">
    <h3>Delivery scenarios (fixed reference, at the plan's rates)</h3>
    <div class="tbl"><table id="scen"></table></div>
  </div>
  <div class="card">
    <h3>Programme</h3>
    <div class="tbl"><table id="prog"></table></div>
  </div>
</div>
<div class="note-box">
  <p><b>Reading the numbers.</b> A task's total is the sum of its lines. A line is quantity × rate. The quantities come from the model's room polygons, wall segments, roof faces and surfaces; labour days come from the stated output (for example "two roofers at 20 m²/day"). Change a rate anywhere and the same rate changes everywhere it is used.</p>
  <p><b>Not included:</b> loose furniture, cinema seats and AV, pool table, gym equipment, CIL, finance, inflation after September 2026, asbestos removal, abnormal ground.</p>
</div>

<h2>Bring the price down</h2>
<p class="lede">Each saving is priced from the plan's own quantities. The figure beside it is what it saves on its own — on the shell cash basis for shell items, on the materials you buy for internal and external items; tick several and the totals at the top and the "your own work" table show the combined effect. Specification and site items are decisions; method items depend on what the ground investigation and trial pits find; scope items change the design.</p>
<div id="savings"></div>

<h2>Phases, tasks and every resource line</h2>
<div id="phases"></div>

<h2>All rates</h2>
<p class="lede">Every unit price used, and how many lines use it. Editing here is the same as editing in a row.</p>
<div class="rates-tools">
  <input type="search" id="rate-filter" placeholder="Filter rates (e.g. slate, electrician, skip)" aria-label="Filter rates">
  <span class="count" id="rate-count"></span>
</div>
<div class="tbl"><table class="rates" id="rates"></table></div>
</div>

<script id="plan-data" type="application/json">__DATA__</script>
<script>
(function(){
  const DATA = JSON.parse(document.getElementById('plan-data').textContent);
  const BASE_RATES = {}; for (const k in DATA.rates) BASE_RATES[k] = DATA.rates[k].rate;
  const state = { rates:{}, qty:{}, pct:{ ohp:DATA.onCosts.overheadAndProfitPct, cont:DATA.onCosts.contingencyPct, fees:DATA.onCosts.feesPct, vat:DATA.onCosts.vatPct },
                  delivery:{ self:false, shell:false, cash:false, disc:0, diy:0, speed:70, weeks:DATA.summary.siteWeeks, feeFixed:0 }, savings:[] };
  const ORIG_PCT = {...state.pct}; const ORIG_DEL = {...state.delivery};
  const DIY = new Set(DATA.delivery.diyTrades), DROPS = new Set(DATA.delivery.selfManagedDrops), WEEKSC = new Set(DATA.delivery.weekScaled), SHELL = new Set(DATA.shell.tasks);
  const EXTERNAL = t => (t.ref.startsWith('12.') && t.ref !== '12.16') || ['1.4','2.5','2.7','3.12','3.13','3.15'].includes(t.ref);
  const isOwn = t => D().shell && !SHELL.has(t.ref) && !(D().self && DROPS.has(t.ref));
  try { const s = JSON.parse(localStorage.getItem('pb-cost-plan-edits')||'null'); if (s && s.rates && s.qty && s.pct) { Object.assign(state, s); state.delivery = Object.assign({...ORIG_DEL}, s.delivery||{}); state.savings = Array.isArray(s.savings) ? s.savings : []; } } catch(e){}
  function save(){ try { localStorage.setItem('pb-cost-plan-edits', JSON.stringify(state)); } catch(e){} }

  const gbp = new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0});
  const gbp2 = new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',minimumFractionDigits:2,maximumFractionDigits:2});
  const fmt = n => gbp.format(Math.round(n));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  // give every line a stable id
  const lines = [];
  DATA.phases.forEach(ph => ph.tasks.forEach(t => t.lines.forEach((l,i) => { l.id = t.ref+'|'+i; l.task = t; l.phase = ph; lines.push(l); })));
  const uses = {}; lines.forEach(l => { uses[l.key] = (uses[l.key]||0)+1; });

  const SV = {}; DATA.savings.forEach(sv => SV[sv.id] = sv);
  const active = () => state.savings.map(id => SV[id]).filter(Boolean);
  const svRate = k => { let r = null; active().forEach(sv => { if (sv.rates && k in sv.rates) r = (r === null) ? sv.rates[k] : Math.min(r, sv.rates[k]); }); return r; };
  const svDrop = ref => active().some(sv => (sv.drop||[]).includes(ref));
  const svScale = (ref, key) => active().reduce((f, sv) => f * ((sv.scale||{})[ref] ?? 1) * (((sv.linescale||{})[ref]||{})[key] ?? 1), 1);
  const svAdd = () => active().reduce((s, sv) => s + ((sv.add && (!D().shell || sv.addTo === 'shell')) ? sv.add : 0), 0);
  const svOwnAdd = () => D().shell ? active().reduce((s, sv) => s + ((sv.add && sv.addTo === 'own') ? sv.add : 0), 0) : 0;
  const rateOf = k => { if (k in state.rates) return state.rates[k]; const o = svRate(k); return o === null ? BASE_RATES[k] : o; };
  const qtyOf = l => (l.id in state.qty) ? state.qty[l.id] : l.qty;
  const D = () => state.delivery;
  const paidQty = l => (l.kind==='Labour' && l.unit==='day' && DIY.has(l.desc)) ? qtyOf(l) * (1 - D().diy/100) : qtyOf(l);
  const lineTotal = l => {
    let v = paidQty(l) * rateOf(l.key) * svScale(l.task.ref, l.key);
    if (l.kind==='Labour' && l.unit==='day') v *= (1 - D().disc/100);
    if (WEEKSC.has(l.task.ref)) v *= D().weeks / DATA.summary.siteWeeks;
    return v;
  };
  const taskOff = t => (D().self && DROPS.has(t.ref)) || (D().shell && !SHELL.has(t.ref)) || svDrop(t.ref);
  const personDays = t => t.lines.reduce((s,l) => s + ((l.kind==='Labour' && l.unit==='day') ? qtyOf(l) : 0), 0);
  const paidDays = t => t.lines.reduce((s,l) => s + ((l.kind==='Labour' && l.unit==='day') ? paidQty(l) : 0), 0);
  const taskDays = t => { const pd = personDays(t); const crew = t.time.crew || 1; return pd > 0 ? Math.max(Math.ceil(pd / crew), (t.time.personDays>0 ? 0 : t.time.workingDays)) : t.time.workingDays; };
  const ownDays = t => personDays(t) / (D().speed/100);   // one person, at owner speed
  const rawLine = l => qtyOf(l) * rateOf(l.key);
  const ownSplit = filter => { const r = {mat:0, pw:0, days:0}; DATA.phases.forEach(ph => ph.tasks.forEach(t => { if (!isOwn(t) || !filter(t) || svDrop(t.ref)) return; t.lines.forEach(l => { const f = svScale(t.ref, l.key); if (['Materials','Specialist / supply','Survey / statutory'].includes(l.kind)) r.mat += rawLine(l) * f; else if (['Plant','Waste'].includes(l.kind)) r.pw += rawLine(l) * f; else if (l.kind==='Labour' && l.unit==='day') r.days += qtyOf(l) * f; }); })); return r; };
  const taskTotal = t => taskOff(t) ? 0 : t.lines.reduce((s,l) => s + lineTotal(l), 0);
  const phaseTotal = ph => ph.tasks.reduce((s,t) => s + taskTotal(t), 0);

  function compute(){
    const phases = DATA.phases.filter(p => p.no !== 90);
    const prelimsPh = DATA.phases.find(p => p.no === 90);
    const works = phases.reduce((s,p) => s + phaseTotal(p), 0) + svAdd();
    const prelims = phaseTotal(prelimsPh) + (state.delivery.self ? DATA.delivery.ownerInsurance : 0);
    const sub = works + prelims;
    const ohp = state.delivery.self ? 0 : sub * state.pct.ohp/100;
    const cont = sub * state.pct.cont/100;
    const fees = state.delivery.feeFixed > 0 ? state.delivery.feeFixed : (sub + ohp) * state.pct.fees/100;
    const ex = sub + ohp + cont + fees;
    let labourPaid = 0; if (state.delivery.cash) { DATA.phases.forEach(ph => ph.tasks.forEach(t => { if (taskOff(t)) return; t.lines.forEach(l => { if (l.kind==='Labour') labourPaid += lineTotal(l); }); })); }
    const vat = (ex - labourPaid) * state.pct.vat/100;
    return { works, prelims, sub, ohp, cont, fees, ex, vat, inc: ex+vat, labourPaid };
  }
  const ORIG_INC = (function(){ const c = compute(); return c.inc; })();

  // ---------- render static structure ----------
  const phasesEl = document.getElementById('phases');
  let html = '';
  DATA.phases.forEach(ph => {
    const label = ph.no === 90 ? 'P' : ph.no;
    html += `<details class="phase" data-phase="${ph.no}"${ph.no===0?' open':''}><summary><span class="no">${label}</span><span class="t">${esc(ph.title)}</span><span class="w">${ph.weeks} wk · ${ph.tasks.length} tasks · <span data-phase-days="${ph.no}"></span></span><span class="m" data-phase-total="${ph.no}"></span></summary><div class="phase-body">`;
    if (ph.summary) html += `<p>${esc(ph.summary)}</p>`;
    ph.tasks.forEach(t => {
      const qty = t.qty !== null && t.qty !== undefined ? `<b>${t.qty} ${esc(t.unit)}</b>` : '';
      html += `<details class="task" open><summary><span class="ref">${esc(t.ref)}</span><span class="t">${esc(t.title)}</span><span class="tm" data-task-time="${esc(t.ref)}"></span><span class="m" data-task-total="${esc(t.ref)}"></span></summary>`;
      if (qty || t.basis) html += `<div class="basis">${qty}${qty && t.basis ? ' — ' : ''}${esc(t.basis||'')}</div>`;
      html += `<div class="tbl"><table class="lines"><thead><tr><th>Kind</th><th>Resource</th><th class="r">Qty</th><th>Unit</th><th class="r">Rate £</th><th class="r">Total</th></tr></thead><tbody>`;
      t.lines.forEach(l => {
        const note = l.note ? ` <span class="note">(${esc(l.note)})</span>` : '';
        html += `<tr data-line="${esc(l.id)}"><td class="kind">${esc(l.kind)}</td><td class="res">${esc(l.desc)}${note}<span class="key">${esc(l.key)}</span></td>`+
          `<td class="r"><input type="number" step="any" min="0" data-qty="${esc(l.id)}" aria-label="quantity for ${esc(l.desc)}"></td>`+
          `<td>${esc(l.unit)}</td>`+
          `<td class="r"><input type="number" step="any" min="0" data-rate="${esc(l.key)}" aria-label="rate for ${esc(l.desc)}"><span class="uses">${uses[l.key]>1 ? 'used in '+uses[l.key]+' lines' : ''}</span></td>`+
          `<td class="money" data-line-total="${esc(l.id)}"></td></tr>`;
      });
      html += `</tbody></table></div></details>`;
    });
    html += `</div></details>`;
  });
  phasesEl.innerHTML = html;

  // rates table
  const ratesEl = document.getElementById('rates');
  const rateRows = Object.keys(DATA.rates).map(k => {
    const r = DATA.rates[k];
    return `<tr data-rate-row="${esc(k)}"><td class="key">${esc(k)}</td><td>${esc(r.description)}</td><td>${esc(r.unit)}</td><td class="r"><input type="number" step="any" min="0" data-rate="${esc(k)}" aria-label="rate ${esc(k)}"></td><td class="r num">${uses[k]||0}</td><td class="money" data-rate-spend="${esc(k)}"></td></tr>`;
  }).join('');
  ratesEl.innerHTML = `<thead><tr><th>Key</th><th>Description</th><th>Unit</th><th class="r">Rate £</th><th class="r">Lines</th><th class="r">Spend</th></tr></thead><tbody>${rateRows}</tbody>`;

  // savings menu
  const groups = [...new Set(DATA.savings.map(sv => sv.group))];
  document.getElementById('savings').innerHTML = groups.map(g => `<div class="sv-group"><h3>${esc(g)}</h3>` +
    DATA.savings.filter(sv => sv.group === g).map(sv => `<div class="sv" data-sv="${esc(sv.id)}"><input type="checkbox" id="sv-${esc(sv.id)}" data-saving="${esc(sv.id)}"><label for="sv-${esc(sv.id)}">${esc(sv.label)}</label><span class="amt">${sv.savingShellCash ? '−'+fmt(sv.savingShellCash)+' shell' : (sv.savingOwn ? '−'+fmt(sv.savingOwn)+' your materials' : '−'+fmt(sv.savingFull))}</span><span class="n">${esc(sv.note)} · shell cash −${fmt(sv.savingShellCash)} · your materials −${fmt(sv.savingOwn)} · full scheme −${fmt(sv.savingFull)}</span></div>`).join('') + `</div>`).join('');
  // built table
  const Q = DATA.quantities, S = DATA.summary;
  document.getElementById('built').innerHTML = [
    ['New basement, gross / internal', `${Q.bas_gross.toFixed(0)} / ${Q.bas_gia.toFixed(0)} m²`],
    ['New wing ground / first / loft', `${(Q.wing_gia+15.2).toFixed(0)} / ${Q.ff_area.toFixed(0)} / ${Q.loft_area.toFixed(0)} m²`],
    ['Three-storey link', `3 × ${Q.link_fp} m²`],
    ['Side wing new storey / re-floored ground', `${Q.sw_fp.toFixed(0)} / ${Q.sw_gf_slab.toFixed(0)} m²`],
    ['Rear garden room / roof terrace', `${Q.gr_fp.toFixed(0)} / ${Q.gr_deck.toFixed(0)} m²`],
    ['New loft floor over the original house', `${Q.loft_floor_orig.toFixed(0)} m²`],
    ['New floor area, all levels', `<b>≈ ${S.newFloorAreaM2.toFixed(0)} m²</b> (house today ≈ 290 m²)`],
    ['New slate roof', `${(Q.roof_slate_wing+Q.roof_slate_bays+Q.sw_roof).toFixed(0)} m²`],
    ['New flat roofs', `${(Q.dormer_wing_roof+Q.ld_roof+Q.gr_deck+Q.loggia_roof+Q.ws_roof).toFixed(0)} m²`],
    ['Windows, screens, glazed doors', `${(Q.win_wing+Q.win_loft_garden+Q.sw_win+Q.front_win_new+Q.family_bay+Q.win_dormer_band+Q.ld_band+Q.link_glass+Q.gr_glass+Q.entrance_glass+Q.garden_doors+Q.sw_doors_glass).toFixed(0)} m²`],
    ['Basement excavation', `${(Q.exc_plan*Q.exc_depth).toFixed(0)} m³ bank, ${Math.ceil(Q.exc_plan*Q.exc_depth*1.25/10)} lorry loads`],
    ['Resin drive / lawns / limestone paving', `${(Q.drive-Q.lawn_side).toFixed(0)} / ${Q.lawn_front.toFixed(0)} / ${(Q.paths+Q.court_paving+Q.terraces).toFixed(0)} m²`],
    ['Pool / hot tub / loggia / workshop', `8 × 3.5 m / 3.4 × 2.3 m / ${Q.loggia_roof} m² / ${Q.ws_fp} m²`],
  ].map(r => `<tr><td>${r[0]}</td><td class="r">${r[1]}</td></tr>`).join('');

  document.getElementById('prog').innerHTML = `<thead><tr><th>Phase</th><th class="r">Weeks</th><th class="r">Start</th><th class="r">Finish</th></tr></thead><tbody>` +
    DATA.programme.map(p => { const ph = DATA.phases.find(x => x.no===p.no); return `<tr><td>${p.no} ${esc(ph.title)}</td><td class="r num">${p.weeks}</td><td class="r num">${p.start}</td><td class="r num">${p.finish}</td></tr>`; }).join('') +
    `<tr class="total"><td>Site period</td><td></td><td class="r num">1</td><td class="r num">${S.siteWeeks}</td></tr></tbody>`;
  document.getElementById('s-weeks').textContent = S.siteWeeks;
  document.getElementById('scen').innerHTML = `<thead><tr><th></th><th>Scenario</th><th class="r">Ex VAT</th><th class="r">Inc VAT</th></tr></thead><tbody>` +
    DATA.scenarios.concat(DATA.shellScenarios).map(sc => `<tr><td class="num"><b>${sc.code}</b></td><td>${esc(sc.label)}</td><td class="money">${fmt(sc.totalExVat)}</td><td class="money"><b>${fmt(sc.totalIncVat)}</b></td></tr>`).join('') +
    `<tr class="sub"><td></td><td>Your materials for all internal and external work, if you do it yourself</td><td class="money">${fmt(DATA.shell.internal.materials + DATA.shell.external.materials)}</td><td class="money"><b>${fmt((DATA.shell.internal.materials + DATA.shell.external.materials)*1.2)}</b></td></tr></tbody>`;

  // ---------- live update ----------
  function setInputs(){
    document.querySelectorAll('input[data-rate]').forEach(inp => { const k = inp.dataset.rate; inp.value = rateOf(k); inp.classList.toggle('edited', k in state.rates); });
    document.querySelectorAll('input[data-qty]').forEach(inp => { const id = inp.dataset.qty; inp.value = qtyOf({id, qty: lines.find(l=>l.id===id).qty}); inp.classList.toggle('edited', id in state.qty); });
    for (const k of ['ohp','cont','fees','vat']) { const inp = document.getElementById('p-'+k); inp.value = state.pct[k]; inp.classList.toggle('edited', state.pct[k] !== ORIG_PCT[k]); }
    document.getElementById('d-self').checked = state.delivery.self;
    document.getElementById('d-shell').checked = state.delivery.shell;
    document.getElementById('d-cash').checked = state.delivery.cash;
    document.getElementById('p-feefix').value = state.delivery.feeFixed || '';
    document.getElementById('p-feefix').classList.toggle('edited', state.delivery.feeFixed > 0);
    document.getElementById('p-fees').disabled = state.delivery.feeFixed > 0;
    document.querySelectorAll('input[data-saving]').forEach(inp => { const on = state.savings.includes(inp.dataset.saving); inp.checked = on; inp.closest('.sv').classList.toggle('on', on); });
    for (const k of ['disc','diy','speed','weeks']) { const inp = document.getElementById('d-'+k); inp.value = state.delivery[k]; inp.classList.toggle('edited', state.delivery[k] !== ORIG_DEL[k]); }
    document.getElementById('p-ohp').disabled = state.delivery.self;
    document.querySelectorAll('details.task').forEach(el => { const ref = el.querySelector('.ref').textContent; el.classList.toggle('task-off', (state.delivery.self && DROPS.has(ref)) || svDrop(ref)); el.classList.toggle('task-diy', state.delivery.shell && !SHELL.has(ref) && !(state.delivery.self && DROPS.has(ref))); });
    const dn = document.getElementById('d-note');
    dn.textContent = `DIY-able trades: ${DATA.delivery.diyTrades.join(', ')} — ${DATA.delivery.diyDays.toLocaleString('en-GB')} of the plan's trade days. ` +
      (state.delivery.self ? `Self-managed keeps professional fees for drawings, calculations and building control; set the fees % to suit (6% is typical without a contractor's design coordination).` : `Tick self-managed to remove the contractor's site management and margin.`);
  }
  function update(){
    lines.forEach(l => { const el = document.querySelector(`[data-line-total="${CSS.escape(l.id)}"]`); if (el) el.textContent = fmt(lineTotal(l)); });
    DATA.phases.forEach(ph => {
      let phDays = 0, phOwn = 0;
      ph.tasks.forEach(t => {
        const te = document.querySelector(`[data-task-time="${CSS.escape(t.ref)}"]`);
        if (te) {
          const pd = personDays(t);
          if (isOwn(t)) { const od = ownDays(t); phOwn += od; te.textContent = pd > 0 ? `${pd.toLocaleString('en-GB',{maximumFractionDigits:0})} trade-days → ~${Math.ceil(od)} days of your time` : ''; }
          else if (taskOff(t)) { te.textContent = ''; }
          else { const wd = taskDays(t); phDays += wd; te.textContent = pd > 0 ? `${pd.toLocaleString('en-GB',{maximumFractionDigits:0})} person-days · crew ${t.time.crew} · ${wd} working days` : `lead time ${wd} days`; }
        }
        const el = document.querySelector(`[data-task-total="${CSS.escape(t.ref)}"]`); if (!el) return;
        if (isOwn(t)) { const m = svDrop(t.ref) ? 0 : t.lines.reduce((s,l) => s + (['Materials','Specialist / supply','Survey / statutory','Plant','Waste'].includes(l.kind) ? rawLine(l) * svScale(t.ref, l.key) : 0), 0); el.textContent = svDrop(t.ref) ? 'saved' : 'you · buy ' + fmt(m); }
        else el.textContent = fmt(taskTotal(t)); });
      const el = document.querySelector(`[data-phase-total="${ph.no}"]`); if (el) el.textContent = fmt(phaseTotal(ph));
      const de = document.querySelector(`[data-phase-days="${ph.no}"]`); if (de) de.textContent = (phDays ? `${phDays} working days if jobs run one after another` : '') + (phOwn ? `${phDays?' · ':''}~${Math.ceil(phOwn)} days of your own time` : '');
    });
    const c = compute();
    const set = (id,v) => { document.getElementById(id).textContent = fmt(v); };
    set('s-works',c.works); set('s-prelims',c.prelims); set('s-sub',c.sub); set('s-ohp',c.ohp); set('s-cont',c.cont); set('s-fees',c.fees); set('s-ex',c.ex); set('s-vat',c.vat); set('s-inc',c.inc);
    document.getElementById('s-weeks').textContent = state.delivery.weeks;
    const ownBox = document.getElementById('d-own'); ownBox.hidden = !state.delivery.shell;
    if (state.delivery.shell) {
      const i = ownSplit(t => !EXTERNAL(t)), e = ownSplit(EXTERNAL); i.mat += svOwnAdd(); const a = {mat:i.mat+e.mat, pw:i.pw+e.pw, days:i.days+e.days};
      const yrs = dys => { const od = dys / (state.delivery.speed/100); return od < 250 ? `${Math.ceil(od)} days ≈ ${(od/21.7).toFixed(1)} months` : `${Math.ceil(od).toLocaleString('en-GB')} days ≈ ${(od/225).toFixed(1)} years`; };
      const row = (n,r,b) => `<tr${b?' class="total"':''}><td>${n}</td><td class="money">${fmt(r.mat)}</td><td class="money">${fmt(r.mat*1.2)}</td><td class="money">${fmt(r.pw)}</td><td class="r num">${Math.round(r.days).toLocaleString('en-GB')}</td><td class="r num">${yrs(r.days)}</td></tr>`;
      document.getElementById('d-own-body').innerHTML = row('Internal work (fit-out, M&amp;E, finishes)', i) + row('External works (pool, drive, gate, gardens)', e) + row(`Together — plus the shell above, about ${fmt(c.inc + (a.mat + a.pw)*1.2)} inc VAT all in`, a, true);
      const sd = DATA.phases.filter(p=>p.no!==90).reduce((s,ph)=>s+ph.tasks.reduce((s2,t)=> s2 + (taskOff(t)?0:taskDays(t)),0),0);
      document.getElementById('d-note').textContent += ` Shell jobs one after another: ${sd} working days (${(sd/5).toFixed(0)} weeks); with the wing, side wing and garden room running in parallel, nearer ${Math.round(sd*0.72/5)} weeks.`;
    }
    set('bar-inc',c.inc); set('bar-ex',c.ex); set('bar-works',c.works);
    const d = c.inc - ORIG_INC; const de = document.getElementById('bar-delta');
    de.textContent = Math.abs(d) < 1 ? '' : (d>0?'+':'−') + fmt(Math.abs(d)) + ' vs plan';
    // by phase
    document.getElementById('by-phase').innerHTML = DATA.phases.map(ph => `<tr${ph.no===90?' class="sub"':''}><td>${ph.no===90?'Prelims':ph.no} ${esc(ph.title)}</td><td class="money">${fmt(phaseTotal(ph))}</td></tr>`).join('') + `<tr class="total"><td>Works + preliminaries</td><td class="money">${fmt(c.sub)}</td></tr>`;
    // by kind
    const kinds = {}; lines.forEach(l => { kinds[l.kind] = (kinds[l.kind]||0) + lineTotal(l); });
    document.getElementById('by-kind').innerHTML = Object.entries(kinds).sort((a,b)=>b[1]-a[1]).map(([k,v]) => `<tr><td>${esc(k)}</td><td class="money">${fmt(v)}</td><td class="r num">${(v/c.sub*100).toFixed(0)}%</td></tr>`).join('') + `<tr class="total"><td>Total</td><td class="money">${fmt(c.sub)}</td><td class="r num">100%</td></tr>`;
    // by trade
    const trades = {}; lines.forEach(l => { if (l.kind==='Labour' && l.unit==='day') trades[l.desc] = (trades[l.desc]||0) + paidQty(l); });
    const tt = Object.values(trades).reduce((s,v)=>s+v,0);
    document.getElementById('by-trade').innerHTML = Object.entries(trades).sort((a,b)=>b[1]-a[1]).map(([k,v]) => `<tr><td>${esc(k)}</td><td class="r num">${Math.round(v).toLocaleString('en-GB')}</td></tr>`).join('') + `<tr class="total"><td>All trades, paid person-days</td><td class="r num">${Math.round(tt).toLocaleString('en-GB')}</td></tr>`;
    // rate spend
    const spend = {}; lines.forEach(l => { spend[l.key] = (spend[l.key]||0) + lineTotal(l); });
    document.querySelectorAll('[data-rate-spend]').forEach(el => { el.textContent = fmt(spend[el.dataset.rateSpend]||0); });
  }
  setInputs(); update();

  document.addEventListener('change', e => {
    const t = e.target; if (!(t instanceof HTMLInputElement)) return;
    const v = parseFloat(t.value);
    if (t.dataset.rate) { const k = t.dataset.rate; if (isNaN(v) || v === BASE_RATES[k]) delete state.rates[k]; else state.rates[k] = v; }
    else if (t.dataset.qty) { const id = t.dataset.qty; const base = lines.find(l=>l.id===id).qty; if (isNaN(v) || v === base) delete state.qty[id]; else state.qty[id] = v; }
    else if (t.id && t.id.startsWith('p-')) { const k = t.id.slice(2); if (!isNaN(v)) state.pct[k] = v; }
    else if (t.id === 'd-shell') { state.delivery.shell = t.checked; if (t.checked) { if (!state.delivery.self) { state.delivery.self = true; if (state.pct.fees === ORIG_PCT.fees) state.pct.fees = 6; } if (state.delivery.weeks === ORIG_DEL.weeks) state.delivery.weeks = 40; } else if (state.delivery.weeks === 40) state.delivery.weeks = ORIG_DEL.weeks; }
    else if (t.id === 'd-cash') { state.delivery.cash = t.checked; }
    else if (t.id === 'p-feefix') { state.delivery.feeFixed = isNaN(v) ? 0 : v; }
    else if (t.dataset.saving) { const id = t.dataset.saving; state.savings = state.savings.filter(x => x !== id); if (t.checked) state.savings.push(id); }
    else if (t.id === 'd-self') { state.delivery.self = t.checked; if (t.checked && state.pct.fees === ORIG_PCT.fees) state.pct.fees = 6; if (!t.checked && state.pct.fees === 6) state.pct.fees = ORIG_PCT.fees; }
    else if (t.id && t.id.startsWith('d-')) { const k = t.id.slice(2); if (!isNaN(v)) state.delivery[k] = v; }
    else return;
    save(); setInputs(); update();
  });
  document.getElementById('btn-reset').addEventListener('click', () => { state.rates = {}; state.qty = {}; state.pct = {...ORIG_PCT}; state.delivery = {...ORIG_DEL}; state.savings = []; save(); setInputs(); update(); });
  const preset = (del, pct, sv) => { state.delivery = Object.assign({...ORIG_DEL}, del); state.pct = Object.assign({...ORIG_PCT}, pct); if (sv) state.savings = sv.slice(); save(); setInputs(); update(); };
  document.getElementById('pre-contractor').addEventListener('click', () => preset({}, {}, []));
  document.getElementById('pre-cash').addEventListener('click', () => preset({self:true, shell:true, cash:true, disc:20, weeks:40, feeFixed:30000}, {cont:0, fees:6}, []));
  document.getElementById('pre-safe').addEventListener('click', () => preset({self:true, shell:true, cash:true, disc:20, weeks:40, feeFixed:30000}, {cont:0, fees:6}, DATA.savingsCombos.safeIds));
  document.getElementById('pre-basic').addEventListener('click', () => preset({self:true, shell:true, cash:true, disc:20, weeks:40, feeFixed:30000}, {cont:0, fees:6}, DATA.savingsCombos.safeIds.concat(DATA.savingsCombos.ownBasicIds)));
  document.getElementById('pre-clear').addEventListener('click', () => { state.savings = []; save(); setInputs(); update(); });
  document.getElementById('btn-expand').addEventListener('click', () => document.querySelectorAll('details.phase').forEach(d => d.open = true));
  document.getElementById('btn-collapse').addEventListener('click', () => document.querySelectorAll('details.phase').forEach(d => d.open = false));
  const filter = document.getElementById('rate-filter'), countEl = document.getElementById('rate-count');
  function applyFilter(){
    const q = filter.value.trim().toLowerCase(); let n = 0;
    document.querySelectorAll('[data-rate-row]').forEach(tr => { const show = !q || tr.textContent.toLowerCase().includes(q); tr.hidden = !show; if (show) n++; });
    countEl.textContent = `${n} of ${Object.keys(DATA.rates).length} rates`;
  }
  filter.addEventListener('input', applyFilter); applyFilter();
})();
</script>
"""

DST.write_text(HTML.replace("__DATA__", payload), encoding="utf-8")
print(f"wrote {DST} ({DST.stat().st_size/1e6:.2f} MB)")
