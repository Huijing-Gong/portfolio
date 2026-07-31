/**
 * Art Page — 3D Paint Palette (Three.js)
 * Realistic palette with clickable paint blobs
 */
import * as THREE from 'three';

const stage = document.getElementById('palette3dStage');
const canvas = document.getElementById('paletteCanvas');
if (!stage || !canvas) throw new Error('Missing palette stage');

// ============================================
// SCENE SETUP
// ============================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
camera.position.set(0, 1.5, 7);
camera.lookAt(0, -0.3, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Lighting
scene.add(new THREE.AmbientLight(0x444455, 2.5));

const key = new THREE.DirectionalLight(0xfff8f0, 8);
key.position.set(4, 6, 5);
key.castShadow = true;
key.shadow.mapSize.set(512, 512);
key.shadow.camera.near = 0.5;
key.shadow.camera.far = 30;
key.shadow.camera.left = -8;
key.shadow.camera.right = 8;
key.shadow.camera.top = 8;
key.shadow.camera.bottom = -8;
key.shadow.bias = -0.0001;
scene.add(key);

const fill = new THREE.DirectionalLight(0xaabbdd, 3);
fill.position.set(-3, 2, 3);
scene.add(fill);

const rim = new THREE.DirectionalLight(0x8899cc, 2);
rim.position.set(0, 3, -3);
scene.add(rim);

// ============================================
// PALETTE GROUP (rotatable)
// ============================================
const paletteGroup = new THREE.Group();
scene.add(paletteGroup);

// --- Wooden palette board ---
const boardShape = new THREE.Shape();
// Bean-shaped palette
boardShape.moveTo(0, 1.6);
boardShape.bezierCurveTo(1.8, 1.6, 2.4, 0.6, 2.0, -0.2);
boardShape.bezierCurveTo(1.6, -0.8, 0.4, -0.8, -0.2, -0.2);
boardShape.bezierCurveTo(-0.8, 0.6, -0.4, 1.6, 0, 1.6);

const extrudeSettings = { steps: 1, depth: 0.2, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 3 };
const boardGeo = new THREE.ExtrudeGeometry(boardShape, extrudeSettings);
boardGeo.translate(0, 0, -0.1);
const boardMat = new THREE.MeshStandardMaterial({
  color: 0xc49464,
  metalness: 0.05,
  roughness: 0.55,
});
const board = new THREE.Mesh(boardGeo, boardMat);
board.castShadow = true;
board.receiveShadow = true;
board.rotation.x = -0.6;
paletteGroup.add(board);

// --- Thumb hole ---
const holeGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.25, 32);
const hole = new THREE.Mesh(holeGeo, new THREE.MeshStandardMaterial({ color: 0x050508, roughness: 1, metalness: 0 }));
hole.position.set(-1.5, 0.25, 0.65);
paletteGroup.add(hole);

// --- Paint blobs ---
const blobData = [
  { pos: [0.8, 0.15, 0.12], color: 0x6366f1, name: '空间世界设计', type: 'Spatial World Design', key: 'spatial' },
  { pos: [0.1, 0.15, 0.12], color: 0xdc2626, name: 'Dual Guardians', type: '游戏网站设计', key: 'game' },
  { pos: [-0.6, 0.15, 0.12], color: 0xd97706, name: '平面设计', type: 'Graphic Design', key: 'graphic' },
  { pos: [0.45, -0.35, 0.12], color: 0x0d9488, name: 'Zirma 3D渲染', type: '3D Modeling & Rendering', key: 'render' },
];

const blobs = [];
const blobMeshes = [];

blobData.forEach((data, i) => {
  // Main color blob
  const blobGeo = new THREE.SphereGeometry(0.2, 32, 16);
  // Flatten to look like dollop of paint
  const positions = blobGeo.attributes.position;
  for (let j = 0; j < positions.count; j++) {
    const y = positions.getY(j);
    if (y > 0) positions.setY(j, y * 0.45);
    if (y < -0.05) positions.setY(j, y * 1.2);
  }
  blobGeo.computeVertexNormals();

  const blobMat = new THREE.MeshStandardMaterial({
    color: data.color,
    metalness: 0.05,
    roughness: 0.2,
  });

  const blob = new THREE.Mesh(blobGeo, blobMat);
  blob.position.set(data.pos[0], data.pos[1], data.pos[2]);
  blob.castShadow = true;
  blob.userData = { ...data, index: i, isBlob: true };
  blob.scale.set(1, 1, 1);

  paletteGroup.add(blob);
  blobs.push(blob);
  blobMeshes.push(blob);

  // Subtle highlight dot on top
  const hlGeo = new THREE.SphereGeometry(0.06, 16, 8);
  const hlMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.1,
    transparent: true,
    opacity: 0.5,
  });
  const hl = new THREE.Mesh(hlGeo, hlMat);
  hl.position.set(data.pos[0] + 0.04, data.pos[1] + 0.12, data.pos[2] + 0.1);
  paletteGroup.add(hl);
});

// --- Paint brush ---
const brushGroup = new THREE.Group();

// Handle
const handleGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.8, 16);
const handleMat = new THREE.MeshStandardMaterial({ color: 0x8b6914, metalness: 0.1, roughness: 0.6 });
const handle = new THREE.Mesh(handleGeo, handleMat);
handle.rotation.z = 0.4;
handle.position.set(1.2, 0.15, 0.45);
handle.castShadow = true;
brushGroup.add(handle);

// Ferrule
const ferruleGeo = new THREE.CylinderGeometry(0.055, 0.04, 0.2, 16);
const ferruleMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.9, roughness: 0.2 });
const ferrule = new THREE.Mesh(ferruleGeo, ferruleMat);
ferrule.rotation.z = 0.4;
ferrule.position.set(2.0, 0.55, 0.48);
ferrule.castShadow = true;
brushGroup.add(ferrule);

// Bristles
const bristleGeo = new THREE.CylinderGeometry(0.035, 0.05, 0.45, 12);
const bristleMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, metalness: 0, roughness: 0.5 });
const bristles = new THREE.Mesh(bristleGeo, bristleMat);
bristles.rotation.z = 0.4;
bristles.position.set(2.25, 0.72, 0.49);
bristles.castShadow = true;
brushGroup.add(bristles);

paletteGroup.add(brushGroup);

// ============================================
// INTERACTION — Drag rotate + hover/click blobs
// ============================================

let dragging = false;
let prevX = 0, prevY = 0;
let targetRotY = 0.3, targetRotX = -0.5;
let velY = 0, velX = 0;

const raycaster = new THREE.Raycaster();
const mouseNDC = new THREE.Vector2();
let hoveredBlob = null;

// Mouse down
stage.addEventListener('mousedown', (e) => {
  dragging = true;
  prevX = e.clientX;
  prevY = e.clientY;
  velY = 0; velX = 0;
});

// Mouse move
window.addEventListener('mousemove', (e) => {
  if (dragging) {
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    targetRotY += dx * 0.006;
    targetRotX += dy * 0.006;
    targetRotX = Math.max(-1.2, Math.min(0.2, targetRotX));
    velY = dx * 0.006;
    velX = dy * 0.006;
    prevX = e.clientX;
    prevY = e.clientY;
  }

  // Hover detection (raycasting) — only when not dragging
  if (!dragging) {
    const rect = stage.getBoundingClientRect();
    mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouseNDC, camera);
    const intersects = raycaster.intersectObjects(blobMeshes);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (obj.userData.isBlob && hoveredBlob !== obj) {
        // Reset prev
        if (hoveredBlob) {
          hoveredBlob.scale.set(1, 1, 1);
          stage.style.cursor = 'grab';
        }
        hoveredBlob = obj;
        hoveredBlob.scale.set(1.15, 1.15, 1.15);
        stage.style.cursor = 'pointer';
        // Show project info
        showProjectInfo(obj.userData);
      }
    } else if (hoveredBlob) {
      hoveredBlob.scale.set(1, 1, 1);
      hoveredBlob = null;
      stage.style.cursor = 'grab';
      // Reset to placeholder
      resetProjectInfo();
    }
  }
});

// Mouse up
window.addEventListener('mouseup', () => {
  dragging = false;
});

// Click on blob → navigate
stage.addEventListener('click', (e) => {
  if (hoveredBlob && !dragging) {
    const key = hoveredBlob.userData.key;
    const ov = document.getElementById('pageTransition');
    if (ov) {
      ov.style.setProperty('--tx', e.clientX + 'px');
      ov.style.setProperty('--ty', e.clientY + 'px');
      ov.classList.add('active');
    }
    setTimeout(() => { location.href = `project-art-${key}.html`; }, 800);
  }
});

// Touch support
stage.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    dragging = true;
    prevX = e.touches[0].clientX;
    prevY = e.touches[0].clientY;
    velY = 0; velX = 0;
  }
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  if (!dragging || e.touches.length !== 1) return;
  const dx = e.touches[0].clientX - prevX;
  const dy = e.touches[0].clientY - prevY;
  targetRotY += dx * 0.006;
  targetRotX += dy * 0.006;
  targetRotX = Math.max(-1.2, Math.min(0.2, targetRotX));
  prevX = e.touches[0].clientX;
  prevY = e.touches[0].clientY;
});

window.addEventListener('touchend', () => { dragging = false; });

// ============================================
// PROJECT INFO PANEL
// ============================================

const artProjectData = {
  spatial: {
    name: '空间世界设计',
    summary: '以空间为主题的视觉设计项目，探索三维空间与二维平面的关系。通过手绘草稿、色彩元素填充和数字渲染，构建具有深度感与沉浸感的视觉世界。包含大量手绘探索与最终数字产出。',
    tags: ['空间设计','手绘','数字渲染','视觉探索'],
    href: 'project-art-spatial.html',
  },
  game: {
    name: 'Dual Guardians — 游戏网站设计',
    summary: '为一款原创游戏概念设计官方网站，包含角色展示、世界观介绍和互动元素。从插画抠图到网页布局，完整呈现游戏的视觉风格与叙事氛围。融合北非部落美学与奇幻世界观。',
    tags: ['网页设计','游戏美术','视觉叙事','插画'],
    href: 'project-art-game.html',
  },
  graphic: {
    name: '平面设计合集',
    summary: '涵盖字体设计、实体书设计、黑胶专辑封面设计等多媒介平面作品。从字母的形态探索到完整的装帧设计，每件作品都是对形式、材质与信息传达的实验。',
    tags: ['字体设计','书籍装帧','专辑设计','品牌'],
    href: 'project-art-graphic.html',
  },
  render: {
    name: 'Zirma — 3D建模渲染',
    summary: '根据文学作品中的城市描述进行的3D建模与渲染创作。从文字中提取空间意象，转化为可感知的三维视觉。包含建模过程、材质探索与最终渲染图。',
    tags: ['3D建模','渲染','材质','空间转译'],
    href: 'project-art-render.html',
  },
};

function showProjectInfo(data) {
  const placeholder = document.getElementById('artProjectPlaceholder');
  const content = document.getElementById('artProjectContent');
  const name = document.getElementById('artProjectName');
  const type = document.getElementById('artProjectType');
  const summary = document.getElementById('artProjectSummary');
  const tags = document.getElementById('artProjectTags');
  const cta = document.getElementById('artProjectCta');

  const projData = artProjectData[data.key];
  if (!projData || !name) return;

  if (placeholder) placeholder.style.display = 'none';
  if (content) content.classList.add('visible');
  name.textContent = projData.name;
  type.textContent = data.type;
  summary.textContent = projData.summary;
  tags.innerHTML = projData.tags.map((t) => `<span class="art-project-tag">${t}</span>`).join('');
  cta.href = projData.href;
}

function resetProjectInfo() {
  const placeholder = document.getElementById('artProjectPlaceholder');
  const content = document.getElementById('artProjectContent');
  if (placeholder) placeholder.style.display = '';
  if (content) content.classList.remove('visible');
}

// ============================================
// RESIZE
// ============================================
function resize() {
  const rect = stage.getBoundingClientRect();
  if (rect.width === 0) return;
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / Math.max(rect.height, 1);
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
new ResizeObserver(resize).observe(stage);
setTimeout(resize, 150);

// ============================================
// ANIMATION LOOP
// ============================================
function animate() {
  requestAnimationFrame(animate);

  // Auto-rotate when not dragging
  if (!dragging) {
    targetRotY += velY;
    targetRotX += velX;
    velY *= 0.94;
    velX *= 0.94;
    if (Math.abs(velY) < 0.0002) {
      targetRotY += 0.0015; // slow auto-rotate
    }
  }

  // Smooth palette rotation
  paletteGroup.rotation.y += (targetRotY - paletteGroup.rotation.y) * 0.07;
  paletteGroup.rotation.x += (targetRotX - paletteGroup.rotation.x) * 0.07;

  renderer.render(scene, camera);
}
animate();

// ============================================
// PAGE TRANSITIONS
// ============================================
document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  if (link.id === 'artProjectCta') return; // handled separately via click
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

console.log('%c< art palette 3D />%cready — drag to rotate, hover blobs',
  'font-family:monospace;color:#ec4899;font-size:1.1em;','color:#888;');
