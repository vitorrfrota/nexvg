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

  // ── HERO CARROSSEL ──
  (function() {
    var track   = document.getElementById('hcTrack');
    var fill    = document.getElementById('hcFill');
    var dotsWrap= document.getElementById('hcDots');
    var btnPrev = document.getElementById('hcPrev');
    var btnNext = document.getElementById('hcNext');
    if (!track) return;

    var slides  = track.querySelectorAll('.hc-slide');
    var total   = slides.length;
    var current = 0;
    var INTERVAL= 5000; // ms por slide
    var timer, fillTimer;

    function buildDots() {
      dotsWrap.innerHTML = '';
      slides.forEach(function(_, i) {
        var d = document.createElement('button');
        d.className = 'hc-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Slide ' + (i + 1));
        d.addEventListener('click', function() { goTo(i); resetAuto(); });
        dotsWrap.appendChild(d);
      });
    }

    function goTo(idx) {
      slides[current].classList.remove('active');
      dotsWrap.querySelectorAll('.hc-dot')[current].classList.remove('active');
      current = (idx + total) % total;
      slides[current].classList.add('active');
      dotsWrap.querySelectorAll('.hc-dot')[current].classList.add('active');
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      startFill();
    }

    function startFill() {
      clearInterval(fillTimer);
      fill.style.transition = 'none';
      fill.style.width = '0%';
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          fill.style.transition = 'width ' + INTERVAL + 'ms linear';
          fill.style.width = '100%';
        });
      });
    }

    function resetAuto() {
      clearInterval(timer);
      timer = setInterval(function() { goTo(current + 1); }, INTERVAL);
    }

    btnNext.addEventListener('click', function() { goTo(current + 1); resetAuto(); });
    btnPrev.addEventListener('click', function() { goTo(current - 1); resetAuto(); });

    // swipe
    var tx = 0;
    track.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function(e) {
      var diff = tx - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
    });

    buildDots();
    startFill();
    resetAuto();
  })();

  // ── MODAL DE BIKE ──
  (function() {
    var overlay  = document.getElementById('bikeModalOverlay');
    var closeBtn = document.getElementById('bikeModalClose');
    var mainImg  = document.getElementById('modalMainImg');
    var thumbsEl = document.getElementById('modalThumbs');
    var countEl  = document.getElementById('modalImgCount');
    var gallery  = [];
    var current  = 0;

    function setMainImg(idx) {
      current = idx;
      mainImg.classList.add('switching');
      setTimeout(function() {
        mainImg.src = gallery[idx];
        mainImg.classList.remove('switching');
      }, 180);
      countEl.textContent = (idx + 1) + ' / ' + gallery.length;
      thumbsEl.querySelectorAll('.bike-modal-thumb').forEach(function(t, i) {
        t.classList.toggle('active', i === idx);
      });
    }

    function buildGallery(imgs) {
      gallery = imgs;
      thumbsEl.innerHTML = '';
      imgs.forEach(function(url, i) {
        var t = document.createElement('div');
        t.className = 'bike-modal-thumb' + (i === 0 ? ' active' : '');
        t.innerHTML = '<img src="' + url + '" alt="Foto ' + (i+1) + '" loading="lazy" />';
        t.addEventListener('click', function() { setMainImg(i); });
        thumbsEl.appendChild(t);
      });
      // esconde thumbs se só tiver 1 foto
      thumbsEl.style.display = imgs.length > 1 ? 'flex' : 'none';
      countEl.style.display  = imgs.length > 1 ? '' : 'none';
    }

    function openBikeModal(btn) {
      var specs = JSON.parse(btn.dataset.specs    || '[]');
      var feats = JSON.parse(btn.dataset.features || '[]');
      var imgs  = JSON.parse(btn.dataset.gallery  || '[]');
      // fallback: usa data-img se não tiver gallery
      if (!imgs.length && btn.dataset.img) imgs = [btn.dataset.img];

      document.getElementById('modalBadge').textContent = btn.dataset.badge || '';
      document.getElementById('modalTitle').textContent = btn.dataset.name  || '';
      document.getElementById('modalDesc').textContent  = btn.dataset.desc  || '';
      document.getElementById('modalPrice').textContent = btn.dataset.price || '';

      document.getElementById('modalSpecs').innerHTML = specs.map(function(s) {
        return '<div class="bike-modal-spec"><div class="bike-modal-spec-label">' + s[0] + '</div><div class="bike-modal-spec-val">' + s[1] + '</div></div>';
      }).join('');

      document.getElementById('modalFeatures').innerHTML = feats.map(function(f) {
        return '<div class="bike-modal-feat-item">' + f + '</div>';
      }).join('');

      buildGallery(imgs);
      mainImg.src = imgs[0] || '';
      current = 0;

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    window.closeBikeModal = function() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeBikeModal);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeBikeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeBikeModal();
      if (e.key === 'ArrowRight' && overlay.classList.contains('open')) setMainImg((current + 1) % gallery.length);
      if (e.key === 'ArrowLeft'  && overlay.classList.contains('open')) setMainImg((current - 1 + gallery.length) % gallery.length);
    });

    document.querySelectorAll('.open-modal').forEach(function(btn) {
      btn.addEventListener('click', function() { openBikeModal(this); });
    });
  })();

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

 // WhatsApp: sobe quando chega no footer
// WhatsApp: sobe quando chega no footer
var waFloat = document.querySelector('.whatsapp-float');
var footer = document.querySelector('footer');

window.addEventListener('scroll', function() {
  var footerTop = footer.getBoundingClientRect().top;
  var windowH = window.innerHeight;
  if (footerTop < windowH) {
    var overlap = windowH - footerTop;
    waFloat.style.bottom = (32 + overlap) + 'px';
  } else {
    waFloat.style.bottom = '32px';
  }
});