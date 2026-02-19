/* Sidebar navigation — toggle, active tracking, smooth scroll */

(function () {
  'use strict';

  const sidebar = document.querySelector('.docs-sidebar');
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.sidebar-overlay');

  /* ─── Mobile toggle ─── */
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }

  if (hamburger) hamburger.addEventListener('click', function () {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  if (overlay) overlay.addEventListener('click', closeSidebar);

  /* Close sidebar on link click (mobile) */
  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

  /* ─── Active section tracking ─── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = sidebar.querySelectorAll('.sidebar-link, .sidebar-sub-link');

  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href && href.includes('#' + id)) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ─── Highlight current page in sidebar ─── */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  sidebar.querySelectorAll('.sidebar-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && (href === currentPath || href.split('#')[0] === currentPath)) {
      link.classList.add('active');
    }
  });
})();
