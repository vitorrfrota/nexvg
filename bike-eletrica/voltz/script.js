// Custom Cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
    }, 60);
  });

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ── TESTIMONIALS CAROUSEL ──
  (function() {
    var track = document.getElementById('testiTrack');
    var dotsWrap = document.getElementById('testiDots');
    var btnPrev = document.getElementById('testiPrev');
    var btnNext = document.getElementById('testiNext');
    if (!track) return;

    var cards = track.querySelectorAll('.testi-card');
    var total = cards.length;
    var current = 0;
    var perView = 3;
    var autoTimer;

    function getPerView() {
      if (window.innerWidth <= 580) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function maxIndex() { return Math.max(0, total - getPerView()); }

    function buildDots() {
      dotsWrap.innerHTML = '';
      var count = maxIndex() + 1;
      for (var i = 0; i < count; i++) {
        var d = document.createElement('button');
        d.className = 'testi-dot' + (i === current ? ' active' : '');
        d.setAttribute('aria-label', 'Slide ' + (i+1));
        (function(idx) { d.addEventListener('click', function() { goTo(idx); }); })(i);
        dotsWrap.appendChild(d);
      }
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIndex()));
      var pv = getPerView();
      var cardW = track.parentElement.offsetWidth / pv;
      track.style.transform = 'translateX(-' + (current * cardW) + 'px)';
      // update dots
      var dots = dotsWrap.querySelectorAll('.testi-dot');
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    function next() { goTo(current >= maxIndex() ? 0 : current + 1); }
    function prev() { goTo(current <= 0 ? maxIndex() : current - 1); }

    btnNext.addEventListener('click', function() { next(); resetAuto(); });
    btnPrev.addEventListener('click', function() { prev(); resetAuto(); });

    function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(next, 5000); }

    // touch/swipe
    var touchStartX = 0;
    track.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAuto(); }
    });

    window.addEventListener('resize', function() {
      buildDots();
      goTo(Math.min(current, maxIndex()));
    });

    buildDots();
    goTo(0);
    resetAuto();
  })();

  // Newsletter button feedback
  document.querySelector('.newsletter-form button').addEventListener('click', function() {
    const input = document.querySelector('.newsletter-form input');
    if (input.value.includes('@')) {
      this.textContent = '✓ Inscrito!';
      this.style.background = '#4CAF50';
      input.value = '';
      setTimeout(() => { this.textContent = 'Inscrever'; this.style.background = ''; }, 3000);
    } else {
      input.style.borderColor = '#C9A84C';
      input.placeholder = 'Digite um e-mail válido';
    }
  });

  // CARROSSEL HERO
var slidess = document.querySelectorAll(`.slidee`);
var dotss = document.querySelectorAll(`.dott`);
var heroCurrent = 0;
var heroInterval = setInterval(heroNext, 5500);

function showHeroSlide(index) {
slidess.forEach(function(s) { s.classList.remove(`activee`); });
dotss.forEach(function(d) { d.classList.remove(`activee`); });
slidess[index].classList.add(`activee`);
dotss[index].classList.add(`activee`);
heroCurrent = index;
}

function heroNext() {
heroCurrent = (heroCurrent + 1) % slidess.length;
showHeroSlide(heroCurrent);
}

function heroPrev() {
heroCurrent = (heroCurrent - 1 + slidess.length) % slidess.length;
showHeroSlide(heroCurrent);
}

dotss.forEach(function(dot) {
dot.addEventListener(`click`, function(e) {
var idx = parseInt(e.target.getAttribute(`data-index`));
showHeroSlide(idx);
clearInterval(heroInterval);
heroInterval = setInterval(heroNext, 5500);
});
});

slidess.forEach(function(slide) {
slide.addEventListener(`click`, function(e) {
var half = slide.clientWidth / 2;
if (e.offsetX < half) { heroPrev(); } else { heroNext(); }
clearInterval(heroInterval);
heroInterval = setInterval(heroNext, 5500);
});
});

var heroTouchStart = 0;
var heroEl = document.querySelector(`.carousel`);
if (heroEl) {
heroEl.addEventListener(`touchstart`, function(e) {
heroTouchStart = e.touches[0].clientX;
}, { passive: true });
heroEl.addEventListener(`touchend`, function(e) {
var diff = heroTouchStart - e.changedTouches[0].clientX;
if (Math.abs(diff) > 50) {
if (diff > 0) { heroNext(); } else { heroPrev(); }
clearInterval(heroInterval);
heroInterval = setInterval(heroNext, 5500);
}
}, { passive: true });
}