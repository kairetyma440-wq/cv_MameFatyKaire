// =========================================================
// CV — Kaire Mame Faty — interactions front-end
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Bascule thème clair / sombre, mémorisée localement ---
  const toggleBtn = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
    toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  const savedTheme = localStorage.getItem('cv-theme') || 'light';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('cv-theme', next);
  });

  // --- Bouton impression / export PDF ---
  const printBtn = document.getElementById('print-btn');
  printBtn.addEventListener('click', () => window.print());

  // --- S'assurer que tous les éléments sont visibles pour le PDF / l'impression ---
  window.addEventListener('beforeprint', () => {
    blocks.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });

  // --- Apparition progressive des sections au scroll ---
  const blocks = document.querySelectorAll('.block, .hero');
  blocks.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  blocks.forEach(el => observer.observe(el));
});
