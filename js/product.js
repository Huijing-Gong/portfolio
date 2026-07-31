/**
 * Product Page — Interactions
 */

// Page transitions
document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === location.pathname.split('/').pop()) return;
    e.preventDefault();
    const ov = document.getElementById('pageTransition');
    if (ov) {
      ov.style.setProperty('--tx', e.clientX + 'px');
      ov.style.setProperty('--ty', e.clientY + 'px');
      ov.classList.add('active');
    }
    setTimeout(() => { location.href = link.getAttribute('href'); }, 800);
  });
});

// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.prod-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(40px)';
  item.style.transition = `all 0.7s cubic-bezier(0.25,0.1,0.25,1) ${i * 0.15}s`;
  obs.observe(item);
});

// Board game cards — hover tilt
document.querySelectorAll('.bg-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(400px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateY(-4px)`;
    card.style.transition = 'transform 0.15s ease-out';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
});

console.log('%c< product design />%cready — 3 projects',
  'font-family:monospace;color:#a78bfa;font-size:1.1em;','color:#888;');
