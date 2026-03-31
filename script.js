// ── Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Trigger hero reveals immediately
setTimeout(() => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
}, 100);

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