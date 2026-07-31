/**
 * Main.js — Homepage interactions
 * Nav scroll · Portal transitions · Frame canvas interaction
 */

// ============================================
// NAV CLOCK
// ============================================

function updateTime() {
  const el = document.getElementById('navTime');
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}
updateTime();
setInterval(updateTime, 1000);

// ============================================
// NAV SCROLL BACKGROUND
// ============================================

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ============================================
// PAGE TRANSITION — circular clip reveal
// ============================================

function transitionToPage(href, event) {
  const overlay = document.getElementById('pageTransition');
  if (event) {
    overlay.style.setProperty('--tx', event.clientX + 'px');
    overlay.style.setProperty('--ty', event.clientY + 'px');
  } else {
    overlay.style.setProperty('--tx', '50%');
    overlay.style.setProperty('--ty', '50%');
  }
  overlay.classList.add('active');
  setTimeout(() => { window.location.href = href; }, 800);
}

// Apply to all portal links
document.querySelectorAll('.portal[href]').forEach((portal) => {
  portal.addEventListener('click', (e) => {
    e.preventDefault();
    transitionToPage(portal.getAttribute('href'), e);
  });
});

// Also nav links that point to other pages
document.querySelectorAll('.nav-link[href$=".html"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    transitionToPage(link.getAttribute('href'), e);
  });
});

// ============================================
// FRAME CANVAS — interactive mouse tracking
// ============================================

const frameCanvas = document.getElementById('frameCanvas');
if (frameCanvas) {
  frameCanvas.addEventListener('mousemove', (e) => {
    const rect = frameCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Shift the art layers based on mouse position
    const layer1 = frameCanvas.querySelector('.layer-1');
    const layer2 = frameCanvas.querySelector('.layer-2');
    if (layer1) layer1.style.transform = `translate(${(x - 0.5) * 6}px, ${(y - 0.5) * 6}px) scale(1.05)`;
    if (layer2) layer2.style.transform = `translate(${(x - 0.5) * -8}px, ${(y - 0.5) * -8}px) scale(1.05)`;
  });

  frameCanvas.addEventListener('mouseleave', () => {
    const layer1 = frameCanvas.querySelector('.layer-1');
    const layer2 = frameCanvas.querySelector('.layer-2');
    if (layer1) layer1.style.transform = '';
    if (layer2) layer2.style.transform = '';
  });
}

// ============================================
// REVEAL PORTALS ON LOAD
// ============================================

const portals = document.querySelectorAll('.portal');
portals.forEach((portal, i) => {
  portal.style.opacity = '0';
  portal.style.transform = 'translateY(30px)';
  portal.style.transition = `all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) ${0.3 + i * 0.12}s`;
});

// Trigger after a small delay
setTimeout(() => {
  portals.forEach((p) => {
    p.style.opacity = '1';
    p.style.transform = 'translateY(0)';
  });
}, 200);

console.log('%c< portfolio />%cready — three portals await',
  'font-family: monospace; color: #a78bfa; font-size: 1.2em;', 'color: #888;');
