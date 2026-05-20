/* ═══════════════════════════════════════
   NEXVG — script.js
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Header scroll ── */
  const header = document.getElementById('header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* ── Hamburger / Mobile Nav ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  let navOpen = false;

  function openNav() {
    navOpen = true;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    navOpen ? closeNav() : openNav();
  });

  // Close on link click
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navOpen) closeNav();
  });

  /* ── Reveal on scroll ── */
  const revealEls = document.querySelectorAll('[data-reveal], .reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Hero reveal on load ── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('.hero [data-reveal]').forEach(el => {
        el.classList.add('visible');
      });
    }, 80);
  });

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h')) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
// ── Testimonial Carousel
(function() {
  const track = document.getElementById('tcTrack');
  const dotsWrap = document.getElementById('tcDots');
  const btnPrev = document.getElementById('tcPrev');
  const btnNext = document.getElementById('tcNext');
  const progressBar = document.getElementById('tcProgress');
  if (!track) return;

  const slides = track.querySelectorAll('.tc-slide');
  const total = slides.length;
  let current = 0;
  let autoTimer = null;
  let progressTimer = null;
  const AUTO_DELAY = 5000; // ms

  // Build dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'tc-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i+1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function updateUI() {
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsWrap.querySelectorAll('.tc-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    btnPrev.disabled = false;
    btnNext.disabled = false;
  }

  function goTo(idx) {
    current = (idx + total) % total;
    updateUI();
    resetAuto();
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // Progress bar
  function startProgress() {
    clearInterval(progressTimer);
    let elapsed = 0;
    const step = 50;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressTimer = setInterval(() => {
        elapsed += step;
        progressBar.style.transition = 'width ' + step + 'ms linear';
        progressBar.style.width = ((elapsed / AUTO_DELAY) * 100) + '%';
        if (elapsed >= AUTO_DELAY) clearInterval(progressTimer);
      }, step);
    }, 20);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startProgress();
    autoTimer = setInterval(() => goTo(current + 1), AUTO_DELAY);
  }

  // Touch / drag support
  let dragStartX = 0;
  let isDragging = false;
  const viewport = track.parentElement;

  viewport.addEventListener('mousedown', e => { isDragging = true; dragStartX = e.clientX; });
  viewport.addEventListener('mousemove', e => { if (!isDragging) return; });
  viewport.addEventListener('mouseup', e => {
    if (!isDragging) return; isDragging = false;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 40) goTo(diff < 0 ? current + 1 : current - 1);
  });
  viewport.addEventListener('mouseleave', () => { isDragging = false; });

  viewport.addEventListener('touchstart', e => { dragStartX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (Math.abs(diff) > 40) goTo(diff < 0 ? current + 1 : current - 1);
  });

 // Pause on hover
      viewport.addEventListener('mouseenter', () => { clearInterval(autoTimer); clearInterval(progressTimer); });
      viewport.addEventListener('mouseleave', () => resetAuto());

      resetAuto();
    })();

    // ── FAQ accordion
    document.querySelectorAll('.faq-item').forEach(item => {
      item.querySelector('.faq-question').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    // ── Busca de segmentos
const segSearch = document.getElementById('segSearch');
const segClear  = document.getElementById('segClear');
const segEmpty  = document.getElementById('segEmpty');
const segCards  = document.querySelectorAll('.seg-card');

segSearch.addEventListener('input', () => {
  const q = segSearch.value.toLowerCase().trim();
  segClear.style.display = q ? 'block' : 'none';
  let found = 0;
  segCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(q) || q === '') {
      card.classList.remove('hidden');
      found++;
    } else {
      card.classList.add('hidden');
    }
  });
  segEmpty.style.display = found === 0 ? 'block' : 'none';
});

segClear.addEventListener('click', () => {
  segSearch.value = '';
  segClear.style.display = 'none';
  segEmpty.style.display = 'none';
  segCards.forEach(c => c.classList.remove('hidden'));
  segSearch.focus();
});