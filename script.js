(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var navLinks = document.querySelectorAll('.nav-link');
  var heroBg = document.querySelector('.hero-bg-img');
  var hero = document.querySelector('.hero');
  var homeLink = document.querySelector('.nav-link[href="#home"]');
  var navIds = ['home', 'experience', 'projects', 'skills', 'contact'];

  function getAbsoluteTop(el) {
    var rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  }

  function onScroll() {
    var pastHero = hero && window.scrollY > hero.offsetHeight - 80;

    nav.classList.toggle('scrolled', pastHero);

    var isMobile = window.innerWidth <= 768;
    if (homeLink) {
      if (isMobile) {
        homeLink.style.display = 'none';
      } else {
        homeLink.style.display = pastHero ? '' : 'none';
      }
    }

    if (heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = 'translate3d(0,' + (window.scrollY * 0.12) + 'px,0)';
    }

    var scrollPos = window.scrollY + 160;
    var activeId = navIds[0];

    for (var i = 0; i < navIds.length; i++) {
      var el = document.getElementById(navIds[i]);
      if (el && scrollPos >= getAbsoluteTop(el)) {
        activeId = navIds[i];
      }
    }

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();
