// Ativa animacoes de reveal apenas quando JS esta rodando
document.documentElement.classList.add(`js-ready`);

// HEADER SCROLL COLLAPSE (mobile)
var headerMobile = document.querySelector(`.header-mobile`);
var lastScrollY = 0;
var collapseThreshold = 60; // px de scroll para colapsar

if (headerMobile) {
function getHeaderHeight() {
return headerMobile.getBoundingClientRect().height;
}

// Padding inicial
document.body.style.paddingTop = getHeaderHeight() + `px`;

window.addEventListener(`scroll`, function() {
var scrollY = window.scrollY || window.pageYOffset;


if (scrollY > collapseThreshold) {
  headerMobile.classList.add('collapsed');
  document.body.classList.add('header-collapsed');
} else {
  headerMobile.classList.remove('collapsed');
  document.body.classList.remove('header-collapsed');
}

lastScrollY = scrollY;

}, { passive: true });

// Atualiza padding quando transição termina
headerMobile.addEventListener(`transitionend`, function() {
document.body.style.paddingTop = getHeaderHeight() + `px`;
});
}

// NEXUS OFICINA - SCRIPT.JS

// MENU MOBILE
var menuBtn = document.getElementById(`menuBtn`);
var mobileMenu = document.getElementById(`mobileMenu`);
var closeMenuEl = document.getElementById(`closeMenu`);
var menuOverlay = document.getElementById(`menuOverlay`);
var menuLinks = document.querySelectorAll(`.mobile-menu a`);

function openMenu() {
mobileMenu.classList.add(`active`);
menuOverlay.classList.add(`active`);
menuBtn.classList.add(`active`);
document.body.style.overflow = `hidden`;
}

function closeMenuFn() {
mobileMenu.classList.remove(`active`);
menuOverlay.classList.remove(`active`);
menuBtn.classList.remove(`active`);
document.body.style.overflow = ``;
}

if (menuBtn) { menuBtn.addEventListener(`click`, openMenu); }
if (closeMenuEl) { closeMenuEl.addEventListener(`click`, closeMenuFn); }
if (menuOverlay) { menuOverlay.addEventListener(`click`, closeMenuFn); }

menuLinks.forEach(function(link) {
link.addEventListener(`click`, function() {
setTimeout(closeMenuFn, 300);
});
});

// WHATSAPP
function abrirWpp() {
window.open(`https://wa.me/5521998761020?text=Ola%2C%20vim%20pelo%20site%20e%20quero%20um%20orcamento.`, `_blank`);
}

function irParaAvaliacoes() {
document.getElementById(`avaliacoes`).scrollIntoView({ behavior: `smooth` });
}

// CARROSSEL HERO
var slidess = document.querySelectorAll(`.slidee`);
var dotss = document.querySelectorAll(`.dott`);
var heroCurrent = 0;
var heroInterval = setInterval(heroNext, 4500);

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
heroInterval = setInterval(heroNext, 4500);
});
});

slidess.forEach(function(slide) {
slide.addEventListener(`click`, function(e) {
var half = slide.clientWidth / 2;
if (e.offsetX < half) { heroPrev(); } else { heroNext(); }
clearInterval(heroInterval);
heroInterval = setInterval(heroNext, 4500);
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
heroInterval = setInterval(heroNext, 4500);
}
}, { passive: true });
}

// CARROSSEL QUEM SOMOS
var qsTrack = document.getElementById(`qsTrack`);
var qsSlides = document.querySelectorAll(`.qs-slide`);
var qsDotsContainer = document.getElementById(`qsDots`);
var qsPrevBtn = document.getElementById(`qsPrev`);
var qsNextBtn = document.getElementById(`qsNext`);
var qsIndex = 0;
var qsAutoPlay;

if (qsDotsContainer) {
qsSlides.forEach(function(slide, i) {
var dot = document.createElement(`span`);
if (i === 0) { dot.classList.add(`active`); }
dot.addEventListener(`click`, function() { qsGoTo(i); qsResetAuto(); });
qsDotsContainer.appendChild(dot);
});
}

var qsDots = qsDotsContainer ? qsDotsContainer.querySelectorAll(`span`) : [];

function qsGoTo(index) {
if (!qsTrack || qsSlides.length === 0) { return; }
qsSlides[qsIndex].classList.remove(`active`);
if (qsDots[qsIndex]) { qsDots[qsIndex].classList.remove(`active`); }
qsIndex = (index + qsSlides.length) % qsSlides.length;
qsTrack.style.transform = `translateX(-` + (qsIndex * 100) + `%)`;
qsSlides[qsIndex].classList.add(`active`);
if (qsDots[qsIndex]) { qsDots[qsIndex].classList.add(`active`); }
}

function qsNext() { qsGoTo(qsIndex + 1); }
function qsPrev() { qsGoTo(qsIndex - 1); }
function qsStartAuto() { qsAutoPlay = setInterval(qsNext, 3500); }
function qsResetAuto() { clearInterval(qsAutoPlay); qsStartAuto(); }

if (qsPrevBtn) { qsPrevBtn.addEventListener(`click`, function() { qsPrev(); qsResetAuto(); }); }
if (qsNextBtn) { qsNextBtn.addEventListener(`click`, function() { qsNext(); qsResetAuto(); }); }

if (qsTrack) {
var qsTouchStart = 0;
qsTrack.addEventListener(`touchstart`, function(e) {
qsTouchStart = e.touches[0].clientX;
clearInterval(qsAutoPlay);
}, { passive: true });
qsTrack.addEventListener(`touchend`, function(e) {
var diff = qsTouchStart - e.changedTouches[0].clientX;
if (Math.abs(diff) > 50) {
if (diff > 0) { qsNext(); } else { qsPrev(); }
}
qsResetAuto();
}, { passive: true });
}

if (qsSlides.length > 0) {
qsSlides[0].classList.add(`active`);
qsStartAuto();
}

// CARROSSEL AVALIACOES
var nx2Track = document.getElementById(`nx2Track`);
var nx2Slides = document.querySelectorAll(`.nx2-slide`);
var nx2DotsContainer = document.getElementById(`nx2Dots`);
var nx2PrevBtn = document.getElementById(`nx2Prev`);
var nx2NextBtn = document.getElementById(`nx2Next`);
var nx2Index = 0;
var nx2AutoSlide;
var nx2TouchStartX = 0;
var nx2IsDragging = false;

if (nx2DotsContainer) {
nx2Slides.forEach(function(slide, i) {
var dot = document.createElement(`span`);
if (i === 0) { dot.classList.add(`active`); }
dot.addEventListener(`click`, function() { nx2GoTo(i); nx2ResetAuto(); });
nx2DotsContainer.appendChild(dot);
});
}

var nx2Dots = nx2DotsContainer ? nx2DotsContainer.querySelectorAll(`span`) : [];

function nx2GoTo(index) {
if (!nx2Track || nx2Slides.length === 0) { return; }
nx2Slides[nx2Index].classList.remove(`active`);
if (nx2Dots[nx2Index]) { nx2Dots[nx2Index].classList.remove(`active`); }
nx2Index = (index + nx2Slides.length) % nx2Slides.length;
nx2Track.style.transition = `transform 0.45s cubic-bezier(0.4,0,0.2,1)`;
nx2Track.style.transform = `translateX(-` + (nx2Index * 100) + `%)`;
nx2Slides[nx2Index].classList.add(`active`);
if (nx2Dots[nx2Index]) { nx2Dots[nx2Index].classList.add(`active`); }
}

function nx2Next() { nx2GoTo(nx2Index + 1); }
function nx2Prev() { nx2GoTo(nx2Index - 1); }
function nx2StartAuto() { nx2AutoSlide = setInterval(nx2Next, 4000); }
function nx2ResetAuto() { clearInterval(nx2AutoSlide); nx2StartAuto(); }

if (nx2PrevBtn) { nx2PrevBtn.addEventListener(`click`, function() { nx2Prev(); nx2ResetAuto(); }); }
if (nx2NextBtn) { nx2NextBtn.addEventListener(`click`, function() { nx2Next(); nx2ResetAuto(); }); }

if (nx2Track) {
nx2Track.addEventListener(`touchstart`, function(e) {
nx2TouchStartX = e.touches[0].clientX;
nx2IsDragging = true;
clearInterval(nx2AutoSlide);
}, { passive: true });
nx2Track.addEventListener(`touchend`, function(e) {
if (!nx2IsDragging) { return; }
var diff = nx2TouchStartX - e.changedTouches[0].clientX;
nx2Track.style.transition = `transform 0.45s cubic-bezier(0.4,0,0.2,1)`;
nx2Track.style.transform = `translateX(-` + (nx2Index * 100) + `%)`;
if (Math.abs(diff) > 60) {
if (diff > 0) { nx2Next(); } else { nx2Prev(); }
} else {
nx2GoTo(nx2Index);
}
nx2IsDragging = false;
nx2ResetAuto();
}, { passive: true });
nx2Track.addEventListener(`touchmove`, function(e) {
if (!nx2IsDragging) { return; }
var dx = Math.abs(e.touches[0].clientX - nx2TouchStartX);
if (dx > 10) { e.preventDefault(); }
}, { passive: false });
}

if (nx2Slides.length > 0) {
nx2Slides[0].classList.add(`active`);
nx2StartAuto();
}

// REVEAL ANIMATION - com fallback imediato
var revealElements = document.querySelectorAll(`[data-reveal]`);

if (typeof IntersectionObserver !== `undefined`) {
var revealObserver = new IntersectionObserver(function(entries) {
entries.forEach(function(entry) {
if (entry.isIntersecting) {
var delay = entry.target.getAttribute(`data-delay`) || 0;
setTimeout(function() {
entry.target.classList.add(`revealed`);
}, parseInt(delay));
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.1 });
revealElements.forEach(function(el) { revealObserver.observe(el); });
} else {
// Fallback: mostra tudo imediatamente se IntersectionObserver nao suportado
revealElements.forEach(function(el) { el.classList.add(`revealed`); });
}