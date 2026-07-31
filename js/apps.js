/**
 * Apps Page — Phone tilt + hover info panel
 * Real project data from PDFs
 */

const wrap = document.getElementById('phone3dWrap');
const phone = document.getElementById('phone3dV2');
const screen = document.getElementById('phoneScreen');
const apps = document.querySelectorAll('.ph-app');
const placeholder = document.getElementById('appInfoPlaceholder');
const content = document.getElementById('appInfoContent');
const infoName = document.getElementById('appInfoName');
const infoSummary = document.getElementById('appInfoSummary');
const infoTags = document.getElementById('appInfoTags');
const infoIcon = document.getElementById('appInfoIcon');
const infoCta = document.getElementById('appInfoCta');
const panel = document.getElementById('appInfoPanel');

// ---- Real project data from PDFs ----
const projectData = {
  dogo: {
    name: 'Dogo',
    nameCN: '鼓励遛狗 · 狗友友好地点指南',
    summary: '一款鼓励主人多遛狗的应用。通过在地图上收集虚拟骨头并兑换实物奖励的方式，激励主人带狗狗外出探索新地点。同时提供宠物友好地点搜索（AI + 筛选）和本地宠物社群活动，让遛狗变得更有动力、更有趣。',
    tags: ['宠物友好地图','骨头收集','奖励兑换','AI搜索','社群活动'],
    iconBg: '#fff',
    iconSvg: '<img src="images/dogo/icon.png" alt="Dogo" style="width:100%;height:100%;object-fit:contain;">',
    href: 'project-dogo.html',
  },
  meow: {
    name: 'Meow Smart',
    nameCN: '猫咪身心健康智能家居系统',
    summary: '以猫咪为核心主体的智能家居交互系统。通过可穿戴设备与智能家居联动，全方位监测猫咪身心健康。研究发现市场缺乏关注猫咪心理状态的集成化系统。包含健康监测、智能家居控制和社区交流三大模块。104份问卷 + 情境调查 + 竞品分析驱动设计。',
    tags: ['可穿戴设备','智能家居','问卷调查','竞品分析','社区设计'],
    iconBg: '#fff',
    iconSvg: '<img src="images/meow/icon.png" alt="Meow Smart" style="width:100%;height:100%;object-fit:contain;">',
    href: 'project-meow.html',
  },
};

// ---- Phone 3D tilt ----
wrap.addEventListener('mousemove', (e) => {
  const rect = wrap.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  phone.style.transform = `perspective(1000px) rotateY(${x*20}deg) rotateX(${-y*20}deg)`;
});
wrap.addEventListener('mouseleave', () => {
  phone.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  phone.style.transition = 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
});
wrap.addEventListener('mouseenter', () => {
  phone.style.transition = 'transform 0.12s ease-out';
});

// ---- App hover → update info panel ----
apps.forEach((app) => {
  const key = app.dataset.app;
  const data = projectData[key];
  if (!data) return;

  app.addEventListener('mouseenter', () => {
    // Brighten screen
    if (screen) screen.style.background = '#08082a';

    // Hide placeholder, show content
    if (placeholder) placeholder.style.display = 'none';
    if (content) {
      content.classList.add('visible');
      infoName.textContent = data.nameCN;
      infoSummary.textContent = data.summary;
      infoTags.innerHTML = data.tags.map(t => `<span class="app-info-tag">${t}</span>`).join('');
      infoIcon.style.background = data.iconBg;
      infoIcon.innerHTML = data.iconSvg;
      infoCta.href = data.href;
    }
    if (panel) panel.classList.add('has-content');
  });

  app.addEventListener('mouseleave', () => {
    if (screen) screen.style.background = '';
  });

  // Click → page transition
  app.addEventListener('click', (e) => {
    e.preventDefault();
    const ov = document.getElementById('pageTransition');
    if (ov) {
      ov.style.setProperty('--tx', e.clientX + 'px');
      ov.style.setProperty('--ty', e.clientY + 'px');
      ov.classList.add('active');
    }
    setTimeout(() => { location.href = data.href; }, 800);
  });
});

// ---- Reset info when mouse leaves the whole phone area ----
wrap.addEventListener('mouseleave', () => {
  // Don't reset immediately—let user move to info panel
  // Only reset if mouse leaves both
  setTimeout(() => {
    if (!wrap.matches(':hover') && !panel.matches(':hover')) {
      if (placeholder) placeholder.style.display = '';
      if (content) content.classList.remove('visible');
      if (panel) panel.classList.remove('has-content');
    }
  }, 300);
});

// ---- Page transitions for nav links ----
document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  if (link.classList.contains('ph-app')) return; // already handled
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

console.log('%c< apps />%cready — Dogo + Meow Smart',
  'font-family:monospace;color:#a78bfa;font-size:1.1em;','color:#888;');
