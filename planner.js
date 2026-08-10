/* ==========================================================================
   TRAVEL YOUR WAY — plan.html form logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('planForm');
  if (!form) return;

  // Prefill destination from a query param (used by the homepage "Japan" / "Italy" cards)
  const params = new URLSearchParams(window.location.search);
  const prefillDest = params.get('destination');
  if (prefillDest) document.getElementById('destination').value = prefillDest;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const destination = document.getElementById('destination').value.trim();
    const days = document.getElementById('days').value;
    const budget = document.getElementById('budget').value;
    const errorEl = document.getElementById('formError');

    if (!destination || !days || parseInt(days, 10) < 1) {
      errorEl.style.display = 'block';
      window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
      return;
    }
    errorEl.style.display = 'none';

    const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(el => el.value);
    const style = (form.querySelector('input[name="style"]:checked') || {}).value || 'balanced';
    const walking = (form.querySelector('input[name="walking"]:checked') || {}).value || 'moderate';
    const crowds = (form.querySelector('input[name="crowds"]:checked') || {}).value || 'mix';

    const request = { destination, days, budget, interests, style, walking, crowds };
    localStorage.setItem('tywTripRequest', JSON.stringify(request));
    window.location.href = 'results.html';
  });
});