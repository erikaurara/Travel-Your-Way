/* ==========================================================================
   TRAVEL YOUR WAY — results.html rendering
   ========================================================================== */

let currentRequest = null;
let currentResult = null;
let easyMode = false;
let rainState = []; // per-day boolean: showing rain plan?

document.addEventListener('DOMContentLoaded', () => {
  const raw = localStorage.getItem('tywTripRequest');
  if (!raw) {
    document.getElementById('emptyState').style.display = 'block';
    return;
  }
  currentRequest = JSON.parse(raw);
  document.getElementById('resultsRoot').style.display = 'block';
  regenerate();

  document.getElementById('dayList').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-day]');
    if (!btn) return;
    const dayIdx = parseInt(btn.getAttribute('data-day'), 10);
    rainState[dayIdx] = btn.getAttribute('data-mode') === 'rain';
    renderDay(dayIdx);
  });
});

function regenerate() {
  currentResult = generateTrip(currentRequest, easyMode);
  if (rainState.length !== currentResult.itinerary.length) {
    rainState = new Array(currentResult.itinerary.length).fill(false);
  }
  renderHead();
  renderDayList();
  renderEffortTicket();
}

function styleLabel(s) { return { relaxed: 'Relaxed', balanced: 'Balanced', adventure: 'Adventure' }[s] || s; }
function walkToleranceLabel(w) { return { minimal: 'minimal', moderate: 'moderate', 'a lot': 'a lot of' }[w] || w; }
function crowdsLabel(c) { return { popular: 'famous spots', mix: 'a mix of popular & hidden spots', avoid: 'avoiding crowds' }[c] || c; }

function fmtMoney(n, currency) {
  return currency + Math.round(n).toLocaleString();
}

function renderHead() {
  const r = currentResult;
  document.getElementById('resultsTitle').textContent = `Your ${r.days}-Day ${r.destinationLabel} Trip`;
  document.getElementById('resultsMeta').textContent =
    `${styleLabel(currentRequest.style)} pace · ${walkToleranceLabel(currentRequest.walking)} walking · ${crowdsLabel(currentRequest.crowds)}` +
    (r.easyMode ? ' · simplified version' : '');

  document.getElementById('statDays').textContent = r.days;
  document.getElementById('statSpend').textContent = fmtMoney(r.totalSpending, r.currency);

  const budgetLabels = { under: 'Under budget', on: 'On budget', over: 'Over budget', unknown: 'No budget set' };
  document.getElementById('statBudget').textContent = budgetLabels[r.budgetStatus];

  document.getElementById('statEffort').textContent = r.effort.score + '/10';

  document.getElementById('genericNote').style.display = r.isGeneric ? 'flex' : 'none';
}

function renderDayList() {
  const container = document.getElementById('dayList');
  container.innerHTML = currentResult.itinerary.map((day, idx) => dayCardHtml(day, idx)).join('');
}

function renderDay(idx) {
  const day = currentResult.itinerary[idx];
  const el = document.getElementById('day-card-' + idx);
  if (el) el.outerHTML = dayCardHtml(day, idx);
}

function dayCardHtml(day, idx) {
  const rain = rainState[idx];
  const currency = currentResult.currency;
  const view = rain ? {
    activities: day.rain.activities,
    walking: day.rain.walking,
    spending: day.rain.spending,
    areaNote: day.rain.area
  } : {
    activities: day.activities,
    walking: day.walking,
    spending: day.spending,
    areaNote: day.area
  };

  const transferNote = day.transferMin > 0
    ? `<div>Travel time: <b>~${day.transferMin >= 60 ? (day.transferMin / 60).toFixed(1) + ' hrs' : day.transferMin + ' min'}</b></div>`
    : '';

  return `
    <div class="day-card" id="day-card-${idx}">
      <div class="day-card-head">
        <div class="day-title">
          <span class="day-num">DAY ${day.dayNum}</span>
          <h3>${day.area.split('—')[1] ? day.area.split('—')[1].trim() : day.area}</h3>
        </div>
        <div class="plan-toggle">
          <button type="button" data-day="${idx}" data-mode="normal" class="${!rain ? 'active normal' : ''}">☀ Normal Plan</button>
          <button type="button" data-day="${idx}" data-mode="rain" class="${rain ? 'active rain' : ''}">🌧 Rain Plan</button>
        </div>
      </div>
      <div class="day-card-body ${rain ? 'rain-mode' : ''}">
        <ul class="stop-list">
          ${view.activities.map(a => `<li>${a}</li>`).join('')}
        </ul>
        <div class="day-facts">
          <div>Walking: <b>${walkingLabel(view.walking)}</b></div>
          ${transferNote}
          <div>Est. spending: <b>${fmtMoney(view.spending, currency)}</b></div>
        </div>
      </div>
    </div>
  `;
}

function renderEffortTicket() {
  const e = currentResult.effort;
  const html = `
    <div class="stub-top">
      <div class="stub-eyebrow"><span>Travel Effort</span><span>TYW-${String(currentResult.days).padStart(2, '0')}</span></div>
      <div class="effort-score-row">
        <span class="score">${e.score}</span>
        <span class="of10">/ 10</span>
      </div>
      <span class="effort-label ${e.label}">${e.label.charAt(0).toUpperCase() + e.label.slice(1)}</span>
    </div>
    <div class="ticket-perf"></div>
    <div class="stub-bottom">
      <div class="effort-rows">
        <div class="effort-row"><span class="name">Walking</span><span class="stars">${starString(e.walkingStars)}</span></div>
        <div class="effort-row"><span class="name">Transportation</span><span class="stars">${starString(e.transportStars)}</span></div>
        <div class="effort-row"><span class="name">Early mornings</span><span class="stars">${starString(e.earlyMorningStars)}</span></div>
        <div class="effort-row"><span class="name">Transfers</span><span class="stars">${starString(e.transferStars)}</span></div>
      </div>
      <div class="ticket-actions">
        <button class="btn ${currentResult.easyMode ? 'btn-secondary' : 'btn-ghost-teal'} btn-block" id="easyToggleBtn">
          ${currentResult.easyMode ? 'Show Original Plan' : 'Make My Trip Easier'}
        </button>
        <p class="ticket-note">${currentResult.easyMode ? 'Showing a lighter version of this trip' : 'Fewer stops, less walking, fewer transfers'}</p>
      </div>
    </div>
  `;
  document.getElementById('effortTicket').innerHTML = html;
  document.getElementById('easyToggleBtn').addEventListener('click', () => {
    easyMode = !currentResult.easyMode;
    regenerate();
    window.scrollTo({ top: document.getElementById('effortTicket').offsetTop - 100, behavior: 'smooth' });
  });
}