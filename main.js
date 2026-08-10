/* ==========================================================================
   TRAVEL YOUR WAY — shared site behavior (nav, language menu, footer)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // Language menu
  const langCurrent = document.getElementById('langCurrent');
  const langMenu = document.getElementById('langMenu');
  if (langCurrent && langMenu) {
    langCurrent.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });
    langMenu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-lang'));
        langMenu.classList.remove('open');
      });
    });
    document.addEventListener('click', () => langMenu.classList.remove('open'));
  }

  // Active nav link highlight
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navLinks a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Footer year
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});