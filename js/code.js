/* Luce Design Guidelines — Code block utilities
   Prism.js integration + copy-to-clipboard */

(function () {
  'use strict';

  // Copy code snippet to clipboard
  function copySnippet(btn) {
    var block = btn.closest('.code-block');
    if (!block) return;
    var code = block.querySelector('pre code');
    if (!code) return;

    navigator.clipboard.writeText(code.textContent).then(function () {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1500);
    });
  }

  // Expose globally for inline onclick
  window.copySnippet = copySnippet;

  // Delegate click for all .code-copy buttons
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.code-copy');
    if (btn) copySnippet(btn);
  });

  // Re-highlight after DOM ready (Prism may load async)
  document.addEventListener('DOMContentLoaded', function () {
    if (window.Prism) Prism.highlightAll();
  });
})();
