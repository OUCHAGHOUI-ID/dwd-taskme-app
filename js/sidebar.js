// Sidebar open/close logic
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const openBtn = document.getElementById('open-sidebar');
  const main = document.querySelector('.main-content');

  if (!sidebar || !openBtn) return;

  openBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    sidebar.classList.add('open');
    if (main) main.classList.add('open');
  });

  // Close when clicking on main content
  if (main) {
    main.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        main.classList.remove('open');
      }
    });
  }
});
