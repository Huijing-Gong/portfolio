/**
 * Project Page — Book Flip + 3D Cards + Page Transitions
 */

// ============================================
// BOOK FLIP
// ============================================

const flipbook = document.getElementById('flipbook');
const pages = Array.from(flipbook.querySelectorAll('.flip-page'));
const prevBtn = document.getElementById('flipPrev');
const nextBtn = document.getElementById('flipNext');
const dots = Array.from(document.querySelectorAll('.flip-dot'));

let currentPage = 0;
let isFlipping = false;
const totalPages = pages.length;

function updatePages(newIndex, direction) {
  if (isFlipping) return;
  if (newIndex === currentPage) return;
  if (newIndex < 0 || newIndex >= totalPages) return;

  isFlipping = true;
  const oldPage = pages[currentPage];
  const newPage = pages[newIndex];

  if (direction === 'next') {
    oldPage.classList.remove('active');
    oldPage.classList.add('flipping-out-left');
    newPage.classList.add('flipping-in-from-right');
  }

  if (direction === 'prev') {
    oldPage.classList.remove('active');
    oldPage.classList.add('flipping-out-right');
    newPage.classList.add('flipping-in-from-left');
  }

  setTimeout(() => {
    // Clean all animation classes
    pages.forEach((p) => {
      p.classList.remove(
        'flipping-out-left', 'flipping-in-from-right',
        'flipping-out-right', 'flipping-in-from-left',
        'active'
      );
    });

    newPage.classList.add('active');
    currentPage = newIndex;
    updateControls();
    isFlipping = false;
  }, 550);
}

function updateControls() {
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === totalPages - 1;

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === currentPage);
  });
}

// Button listeners
prevBtn.addEventListener('click', () => updatePages(currentPage - 1, 'prev'));
nextBtn.addEventListener('click', () => updatePages(currentPage + 1, 'next'));

// Dot clicks
dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const target = parseInt(dot.dataset.dot) - 1;
    const direction = target > currentPage ? 'next' : 'prev';
    updatePages(target, direction);
  });
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') { e.preventDefault(); updatePages(currentPage + 1, 'next'); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); updatePages(currentPage - 1, 'prev'); }
});

// Touch swipe
let touchStartX = 0, touchStartY = 0;

flipbook?.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

flipbook?.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < 0) updatePages(currentPage + 1, 'next');
    else updatePages(currentPage - 1, 'prev');
  }
});

// ============================================
// 3D CARD TILT
// ============================================

document.querySelectorAll('.card-3d[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const inner = card.querySelector('.card-3d-inner');
    inner.style.transform = `rotateY(${x * 25}deg) rotateX(${-y * 25}deg) translateZ(12px)`;
  });

  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.card-3d-inner');
    inner.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    inner.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
  });

  card.addEventListener('mouseenter', () => {
    const inner = card.querySelector('.card-3d-inner');
    inner.style.transition = 'transform 0.1s ease-out';
  });
});

// ============================================
// PAGE TRANSITION (back to home)
// ============================================

function transitionToPage(href, event) {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  if (event) {
    overlay.style.setProperty('--tx', event.clientX + 'px');
    overlay.style.setProperty('--ty', event.clientY + 'px');
  } else {
    overlay.style.setProperty('--tx', '50%');
    overlay.style.setProperty('--ty', '50%');
  }

  overlay.classList.add('active');

  setTimeout(() => {
    window.location.href = href;
  }, 800);
}

// Back to home links
document.querySelectorAll('a[href="index.html"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    transitionToPage('index.html', e);
  });
});

// ============================================
// REVEAL ANIMATIONS
// ============================================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.card-3d, .section-header').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${(i % 4) * 0.1}s`;
  revealObserver.observe(el);
});

// ============================================
// LAPTOP MOCKUP TILT
// ============================================

const laptop = document.querySelector('.mockup-laptop');
if (laptop) {
  document.querySelector('.mockup-stage')?.addEventListener('mousemove', (e) => {
    const rect = laptop.parentElement.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    laptop.style.transform = `rotateX(${3 - y * 8}deg) rotateY(${x * 8}deg)`;
    laptop.style.transition = 'transform 0.15s ease-out';
  });

  document.querySelector('.mockup-stage')?.addEventListener('mouseleave', () => {
    laptop.style.transform = 'rotateX(3deg) rotateY(0deg)';
    laptop.style.transition = 'transform 0.6s ease';
  });
}

console.log('%c< project detail />%cready — use ← → to flip pages',
  'font-family: monospace; color: #a78bfa; font-size: 1.1em;',
  'color: #888;');
