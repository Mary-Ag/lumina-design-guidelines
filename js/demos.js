/* Luce Design Guidelines — Interactive component demos
   Event delegation from .component-section parents */

(function () {
  'use strict';

  // ─── Segmented Controls ───
  function initSegmentedControls() {
    document.querySelectorAll('.alu-manettino').forEach(function (ctrl) {
      var segments = ctrl.querySelectorAll('.segment');
      var slider = ctrl.querySelector('.slider-bg');
      if (!slider || !segments.length) return;

      function update(idx) {
        segments.forEach(function (s, i) {
          s.classList.toggle('active', i === idx);
        });
        var seg = segments[idx];
        slider.style.left = seg.offsetLeft + 'px';
        slider.style.width = seg.offsetWidth + 'px';
      }

      segments.forEach(function (seg, i) {
        seg.addEventListener('click', function () { update(i); });
      });

      // Initial position
      var active = ctrl.querySelector('.segment.active');
      if (active) {
        var idx = Array.from(segments).indexOf(active);
        requestAnimationFrame(function () { update(idx); });
      }
    });
  }

  // ─── Toggles ───
  function initToggles() {
    document.addEventListener('click', function (e) {
      var toggle = e.target.closest('.alu-toggle:not(.disabled)');
      if (!toggle) return;
      toggle.classList.toggle('on');
    });
  }

  // ─── Sliders ───
  function initSliders() {
    document.querySelectorAll('input.alu-slider').forEach(function (slider) {
      var wrap = slider.closest('.alu-slider-wrap');
      if (!wrap) return;
      var display = wrap.querySelector('.alu-slider-value');
      if (!display) return;
      var unit = display.dataset.unit || '';

      function update() {
        display.textContent = slider.value + unit;
      }

      slider.addEventListener('input', update);
      update();
    });
  }

  // ─── Button Bars ───
  function initButtonBars() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.alu-btn-bar .btn');
      if (!btn) return;
      var bar = btn.closest('.alu-btn-bar');
      bar.querySelectorAll('.btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  }

  // ─── Radio Groups ───
  function initRadios() {
    document.addEventListener('click', function (e) {
      var radio = e.target.closest('.alu-radio');
      if (!radio) return;
      var group = radio.closest('.alu-radio-group');
      if (!group) return;
      group.querySelectorAll('.alu-radio').forEach(function (r) {
        r.classList.remove('active');
      });
      radio.classList.add('active');
    });
  }

  // ─── Bar Gauges (Animated fill on scroll) ───
  function initBarGauges() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateBars(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.bars-row').forEach(function (row) {
      observer.observe(row);
    });
  }

  function animateBars(container) {
    var fills = container.querySelectorAll('.bar-fill');
    fills.forEach(function (fill, i) {
      fill.style.height = '0%';
      setTimeout(function () {
        fill.style.height = fill.dataset.height || '0%';
      }, 100 + i * 100);
    });
  }

  // ─── Replay buttons for bar gauges ───
  function initReplayButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.demo-replay');
      if (!btn) return;
      var panel = btn.closest('.demo-panel');
      if (!panel) return;
      var barsRow = panel.querySelector('.bars-row');
      if (barsRow) animateBars(barsRow);
      // LED channels
      var leds = panel.querySelectorAll('.led-bar-fill');
      if (leds.length) {
        leds.forEach(function (fill) {
          var w = fill.dataset.width;
          fill.style.width = '0%';
          setTimeout(function () { fill.style.width = w || '0%'; }, 100);
        });
      }
      // Day counter progress
      var prog = panel.querySelector('.day-progress-fill');
      if (prog) {
        var w = prog.dataset.width;
        prog.style.width = '0%';
        setTimeout(function () { prog.style.width = w || '0%'; }, 100);
      }
    });
  }

  // ─── Login Demo (5-step rifle-bolt ceremony) ───
  function initLoginDemo() {
    document.querySelectorAll('.login-demo-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = btn.closest('.demo-panel');
        if (!panel) return;
        var logo = panel.querySelector('.login-logo');
        var ripple = panel.querySelector('.login-ripple');
        var dials = panel.querySelector('.login-dials');
        var dialCircles = panel.querySelectorAll('.login-mini-dial');
        var form = panel.querySelector('.login-form');
        var loginBtn = panel.querySelector('.login-btn');

        // Reset
        if (logo) { logo.classList.remove('visible'); }
        if (ripple) { ripple.classList.remove('animate'); }
        if (dials) { dials.classList.remove('visible'); }
        dialCircles.forEach(function (d) { d.classList.remove('powered'); });
        if (form) { form.classList.remove('visible'); }

        // Step 1: Logo appears (200ms)
        setTimeout(function () {
          if (logo) logo.classList.add('visible');
        }, 200);

        // Step 2: Gold ripple (600ms)
        setTimeout(function () {
          if (ripple) {
            ripple.classList.remove('animate');
            void ripple.offsetWidth;
            ripple.classList.add('animate');
          }
        }, 600);

        // Step 3: Mini dials appear (1000ms)
        setTimeout(function () {
          if (dials) dials.classList.add('visible');
        }, 1000);

        // Step 4: Dials power up (1400ms)
        setTimeout(function () {
          dialCircles.forEach(function (d) { d.classList.add('powered'); });
        }, 1400);

        // Step 5: Form slides up (1800ms)
        setTimeout(function () {
          if (form) form.classList.add('visible');
        }, 1800);

        // Rifle-bolt on login btn
        if (loginBtn) {
          loginBtn.onclick = function () {
            loginBtn.classList.remove('rifle-bolt-click');
            void loginBtn.offsetWidth;
            loginBtn.classList.add('rifle-bolt-click');
          };
        }
      });
    });
  }

  // ─── Expandable Metrics ───
  function initExpandableMetrics() {
    document.addEventListener('click', function (e) {
      var card = e.target.closest('.metric-card.expandable');
      if (!card) return;
      var grid = card.closest('.readings-grid');
      var wasExpanded = card.classList.contains('expanded');

      // Collapse all in grid
      if (grid) {
        grid.querySelectorAll('.metric-card.expanded').forEach(function (c) {
          c.classList.remove('expanded');
        });
        grid.classList.remove('has-expanded');
      }

      // Toggle
      if (!wasExpanded) {
        card.classList.add('expanded');
        if (grid) grid.classList.add('has-expanded');
      }
    });
  }

  // ─── Relay Toggles ───
  function initRelayToggles() {
    document.addEventListener('click', function (e) {
      var pill = e.target.closest('.relay-pill');
      if (!pill) return;
      pill.classList.toggle('on');
      pill.classList.toggle('off');
    });
  }

  // ─── Activity Filters ───
  function initActivityFilters() {
    document.addEventListener('click', function (e) {
      var filter = e.target.closest('.activity-filter');
      if (!filter) return;
      filter.classList.toggle('active');
    });
  }

  // ─── Theme Toggle ───
  function initThemeToggle() {
    var stored = localStorage.getItem('luce-theme');
    if (stored === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
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
      // Update icon
      updateThemeIcons();
    });
  }

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

  // ─── LED Channel Animation ───
  function initLEDChannels() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.led-bar-fill').forEach(function (fill, i) {
            var w = fill.dataset.width || '0%';
            fill.style.width = '0%';
            setTimeout(function () { fill.style.width = w; }, 100 + i * 80);
          });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('#led-channels .demo-panel').forEach(function (panel) {
      observer.observe(panel);
    });
  }

  // ─── Init All ───
  document.addEventListener('DOMContentLoaded', function () {
    initSegmentedControls();
    initToggles();
    initSliders();
    initButtonBars();
    initRadios();
    initBarGauges();
    initReplayButtons();
    initLoginDemo();
    initExpandableMetrics();
    initRelayToggles();
    initActivityFilters();
    initThemeToggle();
    initLEDChannels();
    updateThemeIcons();
  });
})();
