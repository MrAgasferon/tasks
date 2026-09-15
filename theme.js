(function () {
  const KEY = 'trackerTheme';

  function current() {
    return localStorage.getItem(KEY) || 'dark';
  }

  function apply(theme) {
    // на <html>, а не <body> — применяется до отрисовки body, без "вспышки" не той темы
    document.documentElement.classList.toggle('light', theme === 'light');
  }

  apply(current());

  window.toggleTheme = function () {
    const next = current() === 'light' ? 'dark' : 'light';
    localStorage.setItem(KEY, next);
    apply(next);
    updateButton();
  };

  function updateButton() {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.textContent = current() === 'light' ? '🌙' : '☀️';
  }

  document.addEventListener('DOMContentLoaded', updateButton);
})();
