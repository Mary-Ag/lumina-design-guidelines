/* Sidebar navigation — collapsible groups, theme toggle, active tracking */

(function () {
  'use strict';

  var sidebar = document.querySelector('.docs-sidebar');
  var hamburger = document.querySelector('.hamburger');
  var overlay = document.querySelector('.sidebar-overlay');

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

  /* ─── Current page detection ─── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  /* ─── Auto-expand current page's group + mark as current ─── */
  sidebar.querySelectorAll('.sidebar-group').forEach(function (group) {
    var page = group.getAttribute('data-page');
    if (page === currentPage) {
      group.setAttribute('open', '');
      group.classList.add('current');
    }
  });

  /* ─── Animated expand/collapse ─── */
  sidebar.querySelectorAll('.sidebar-group').forEach(function (group) {
    var summary = group.querySelector('summary');
    var linksWrap = group.querySelector('.sidebar-group-links');

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      var page = group.getAttribute('data-page');

      // If clicking a group for a different page, navigate there
      if (page !== currentPage) {
        window.location.href = page;
        return;
      }

      // Same page — toggle open/closed with animation
      if (group.hasAttribute('open')) {
        // Collapse: animate grid-template-rows 1fr → 0fr, then remove open
        linksWrap.style.gridTemplateRows = '0fr';
        linksWrap.addEventListener('transitionend', function handler() {
          linksWrap.removeEventListener('transitionend', handler);
          group.removeAttribute('open');
          linksWrap.style.gridTemplateRows = '';
        });
      } else {
        // Expand: set open, then animate 0fr → 1fr
        group.setAttribute('open', '');
        // Force layout so the 0fr state is rendered first
        linksWrap.offsetHeight;
        linksWrap.style.gridTemplateRows = '1fr';
        linksWrap.addEventListener('transitionend', function handler() {
          linksWrap.removeEventListener('transitionend', handler);
          linksWrap.style.gridTemplateRows = '';
        });
      }
    });
  });

  /* ─── Active section tracking (IntersectionObserver) ─── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = sidebar.querySelectorAll('.sidebar-sub-link');

  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href && href.endsWith('#' + id)) {
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

  /* ─── Theme Toggle ─── */
  function updateThemeIcons() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      var sun = btn.querySelector('.icon-sun');
      var moon = btn.querySelector('.icon-moon');
      if (sun) sun.style.display = isLight ? 'none' : 'block';
      if (moon) moon.style.display = isLight ? 'block' : 'none';
      var label = btn.querySelector('.theme-label');
      if (label) label.textContent = isLight ? 'Dark mode' : 'Light mode';
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    var html = document.documentElement;
    var isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
      html.removeAttribute('data-theme');
      localStorage.setItem('luce-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('luce-theme', 'light');
    }
    updateThemeIcons();
  });

  updateThemeIcons();

  /* ─── Resource Viewer ─── */
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function showResource(filename, href, content) {
    var main = document.querySelector('.docs-main');

    var old = main.querySelector('.resource-viewer');
    if (old) old.remove();

    var desc = filename.endsWith('.json')
      ? 'Luce design tokens in JSON format'
      : 'Luce design tokens as CSS custom properties';

    // Pretty-print JSON
    if (filename.endsWith('.json')) {
      try { content = JSON.stringify(JSON.parse(content), null, 2); } catch (e) {}
    }

    var viewer = document.createElement('div');
    viewer.className = 'resource-viewer';
    viewer.innerHTML =
      '<div class="page-header">' +
        '<h1>' + escapeHtml(filename) + '</h1>' +
        '<p>' + desc + '</p>' +
      '</div>' +
      '<div class="code-block resource-code-block">' +
        '<button class="code-copy">Copy</button>' +
        '<pre>' + escapeHtml(content) + '</pre>' +
      '</div>';

    main.appendChild(viewer);
    main.classList.add('showing-resource');
    window.scrollTo(0, 0);

    var copyBtn = viewer.querySelector('.code-copy');
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(content).then(function () {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(function () {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });

    sidebar.querySelectorAll('[data-resource]').forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('href') === href);
    });
  }

  function hideResource() {
    var main = document.querySelector('.docs-main');
    if (!main.classList.contains('showing-resource')) return;
    main.classList.remove('showing-resource');
    var viewer = main.querySelector('.resource-viewer');
    if (viewer) viewer.remove();
    sidebar.querySelectorAll('[data-resource]').forEach(function (l) {
      l.classList.remove('active');
    });
  }

  sidebar.querySelectorAll('[data-resource]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var href = link.getAttribute('href');
      var filename = href.split('/').pop();
      fetch(href)
        .then(function (r) { return r.text(); })
        .then(function (text) { showResource(filename, href, text); });
    });
  });

  // Hide resource viewer when clicking non-resource sidebar links or group titles
  sidebar.addEventListener('click', function (e) {
    if (e.target.closest('[data-resource]')) return;
    if (e.target.closest('a') || e.target.closest('summary')) hideResource();
  });
})();
