function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('theme-toggle');

  const isDark = body.classList.toggle('dark-mode');

  if (btn) {
    btn.textContent = isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre';
  }

  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // ignore storage errors
  }
}

function loadTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {
    saved = null;
  }
  const body = document.body;
  const btn = document.getElementById('theme-toggle');

  if (saved === 'dark') {
    body.classList.add('dark-mode');
    if (btn) btn.textContent = '☀️ Mode Clair';
  } else {
    body.classList.remove('dark-mode');
    if (btn) btn.textContent = '🌙 Mode Sombre';
  }
}


document.addEventListener('DOMContentLoaded', function () {
  loadTheme();

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
});
