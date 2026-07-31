/**
 * Three.js — Background particles + Center portal 3D product model
 */
import * as THREE from 'three';

// ============================================
// SCENE 1: BACKGROUND PARTICLES
// ============================================

const bgScene = new THREE.Scene();
const bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
bgCamera.position.z = 10;

const bgRenderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg-canvas'),
  antialias: true,
  alpha: true,
});
bgRenderer.setSize(window.innerWidth, window.innerHeight);
bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Ambient
bgScene.add(new THREE.AmbientLight(0x222244, 1));

// Particles
const pGeo = new THREE.BufferGeometry();
const pCount = 150;
const pPositions = new Float32Array(pCount * 3);
for (let i = 0; i < pCount; i++) {
  pPositions[i * 3] = (Math.random() - 0.5) * 18;
  pPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
  pPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
}
pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
const pMat = new THREE.PointsMaterial({
  color: 0xa78bfa,
  size: 0.018,
  transparent: true,
  opacity: 0.4,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const particles = new THREE.Points(pGeo, pMat);
bgScene.add(particles);

// A few floating shapes
const floatGroup = new THREE.Group();
const geos = [
  new THREE.IcosahedronGeometry(0.2, 0),
  new THREE.TorusGeometry(0.18, 0.03, 8, 12),
  new THREE.OctahedronGeometry(0.18, 0),
];
for (let i = 0; i < 8; i++) {
  const geo = geos[i % geos.length];
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.7 + Math.random() * 0.1, 0.6, 0.4 + Math.random() * 0.3),
    metalness: 0.1,
    roughness: 0.7,
    transparent: true,
    opacity: 0.25,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 4 - 1);
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  mesh.userData = {
    rx: (Math.random() - 0.5) * 0.002,
    ry: (Math.random() - 0.5) * 0.003,
    baseY: mesh.position.y,
    amp: Math.random() * 0.2 + 0.08,
    spd: Math.random() * 0.25 + 0.12,
    off: Math.random() * Math.PI * 2,
  };
  floatGroup.add(mesh);
}
bgScene.add(floatGroup);

// Mouse tracking for BG
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
});
let scrollY = 0;
window.addEventListener('scroll', () => { scrollY = window.scrollY; });

// ============================================
// SCENE 2: PRODUCT 3D MODEL (center portal)
// ============================================

let productRenderer, productScene, productCamera, productModel;
const productStage = document.getElementById('product3dStage');

if (productStage) {
  productScene = new THREE.Scene();

  productCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  productCamera.position.set(0, 0.3, 6);
  productCamera.lookAt(0, 0, 0);

  productRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  productRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  productRenderer.setClearColor(0x000000, 0);
  productStage.appendChild(productRenderer.domElement);
  productRenderer.domElement.style.display = 'block';
  productRenderer.domElement.style.width = '100%';
  productRenderer.domElement.style.height = '100%';

  // Lights
  productScene.add(new THREE.AmbientLight(0x333355, 3));

  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(5, 4, 6);
  productScene.add(key);

  const fill = new THREE.DirectionalLight(0xa78bfa, 2);
  fill.position.set(-3, -1, 2);
  productScene.add(fill);

  const rim = new THREE.DirectionalLight(0x6366f1, 3);
  rim.position.set(0, 3, -4);
  productScene.add(rim);

  // Build product model — sculptural object (like a designed vase/lamp)
  productModel = new THREE.Group();

  // Main body — lathe-like shape using stacked tori
  const bodyGeo = new THREE.CylinderGeometry(0.5, 0.7, 2.2, 48, 8, true);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x3a3050,
    metalness: 0.4,
    roughness: 0.3,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  productModel.add(body);

  // Inner glow core
  const coreGeo = new THREE.CylinderGeometry(0.35, 0.5, 2.0, 32, 1, true);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xa78bfa,
    metalness: 0.1,
    roughness: 0.2,
    transparent: true,
    opacity: 0.4,
    emissive: 0xa78bfa,
    emissiveIntensity: 0.5,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  productModel.add(core);

  // Accent rings
  for (let y = -0.9; y <= 0.9; y += 0.6) {
    const ringGeo = new THREE.TorusGeometry(0.55, 0.03, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc4b5fd,
      metalness: 0.8,
      roughness: 0.15,
      emissive: 0x333366,
      emissiveIntensity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = y;
    ring.rotation.x = Math.PI / 2;
    productModel.add(ring);
  }

  // Top cap
  const topGeo = new THREE.SphereGeometry(0.52, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3);
  const topMat = new THREE.MeshStandardMaterial({
    color: 0x4a3a60,
    metalness: 0.5,
    roughness: 0.2,
  });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = 1.1;
  productModel.add(top);

  // Bottom base
  const baseGeo = new THREE.CylinderGeometry(0.72, 0.78, 0.2, 48);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x2a2040,
    metalness: 0.6,
    roughness: 0.25,
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -1.2;
  productModel.add(base);

  // Floating particles around the product
  const orbitParticles = new THREE.Group();
  const orbitGeo = new THREE.SphereGeometry(0.03, 8, 8);
  for (let i = 0; i < 20; i++) {
    const oMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      emissive: 0xa78bfa,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    const dot = new THREE.Mesh(orbitGeo, oMat);
    const angle = (i / 20) * Math.PI * 2;
    const radius = 1.2 + Math.random() * 0.4;
    const height = (Math.random() - 0.5) * 2.8;
    dot.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
    dot.userData = { angle, radius, height, speed: 0.3 + Math.random() * 0.5 };
    orbitParticles.add(dot);
  }
  productModel.add(orbitParticles);
  productModel.userData.orbitParticles = orbitParticles;

  productScene.add(productModel);

  // Drag rotation state
  let isDragging = false;
  let prevMouse = { x: 0, y: 0 };
  let rotVelocity = { x: 0, y: 0 };
  let targetRot = { x: -0.3, y: 0.5 };

  productStage.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouse.x = e.clientX;
    prevMouse.y = e.clientY;
    rotVelocity.x = 0;
    rotVelocity.y = 0;
    productStage.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    targetRot.y += dx * 0.01;
    targetRot.x += dy * 0.01;
    targetRot.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRot.x));
    rotVelocity.y = dx * 0.01;
    rotVelocity.x = dy * 0.01;
    prevMouse.x = e.clientX;
    prevMouse.y = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    if (productStage) productStage.style.cursor = 'grab';
  });

  // Touch support
  productStage.addEventListener('touchstart', (e) => {
    isDragging = true;
    prevMouse.x = e.touches[0].clientX;
    prevMouse.y = e.touches[0].clientY;
    rotVelocity.x = 0;
    rotVelocity.y = 0;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - prevMouse.x;
    const dy = e.touches[0].clientY - prevMouse.y;
    targetRot.y += dx * 0.01;
    targetRot.x += dy * 0.01;
    targetRot.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRot.x));
    rotVelocity.y = dx * 0.01;
    rotVelocity.x = dy * 0.01;
    prevMouse.x = e.touches[0].clientX;
    prevMouse.y = e.touches[0].clientY;
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Size product renderer
  function resizeProduct() {
    if (!productStage || !productRenderer) return;
    const rect = productStage.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w === 0 || h === 0) return;
    productRenderer.setSize(w, h, false);
    productCamera.aspect = w / Math.max(h, 1);
    productCamera.updateProjectionMatrix();
  }

  // Store for animation
  window.__productTick = (time) => {
    if (!productModel || !productRenderer || !productScene || !productCamera) return;

    // Inertia
    if (!isDragging) {
      targetRot.y += rotVelocity.y;
      targetRot.x += rotVelocity.x;
      rotVelocity.y *= 0.95;
      rotVelocity.x *= 0.95;
    }

    // Smooth rotation
    productModel.rotation.y += (targetRot.y - productModel.rotation.y) * 0.08;
    productModel.rotation.x += (targetRot.x - productModel.rotation.x) * 0.08;

    // Auto-rotate when not dragging
    if (!isDragging && Math.abs(rotVelocity.y) < 0.0005) {
      productModel.rotation.y += 0.002;
      targetRot.y = productModel.rotation.y;
    }

    // Animate orbit particles
    const particles = productModel.userData.orbitParticles;
    if (particles) {
      for (const dot of particles.children) {
        dot.userData.angle += dot.userData.speed * 0.01;
        const a = dot.userData.angle;
        const r = dot.userData.radius;
        dot.position.x = Math.cos(a) * r;
        dot.position.z = Math.sin(a) * r;
        dot.position.y += Math.sin(time * 2 + a) * 0.002;
      }
    }

    productRenderer.render(productScene, productCamera);
  };
}

// ============================================
// ANIMATION LOOP
// ============================================

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Smooth mouse
  mouse.x += (mouse.tx - mouse.x) * 0.03;
  mouse.y += (mouse.ty - mouse.y) * 0.03;

  // BG camera
  bgCamera.position.x += (mouse.x * 0.3 - bgCamera.position.x) * 0.02;
  bgCamera.position.y += (-mouse.y * 0.2 - scrollY * 0.0004 - bgCamera.position.y) * 0.02;
  bgCamera.lookAt(0, -scrollY * 0.0002, 0);

  // Animate BG
  particles.rotation.y += 0.0001;
  for (const shape of floatGroup.children) {
    const d = shape.userData;
    shape.rotation.x += d.rx;
    shape.rotation.y += d.ry;
    shape.position.y = d.baseY + Math.sin(t * d.spd + d.off) * d.amp;
  }

  bgRenderer.render(bgScene, bgCamera);

  // Product model
  if (window.__productTick) {
    window.__productTick(t);
  }
}

// Handle resize
window.addEventListener('resize', () => {
  bgCamera.aspect = window.innerWidth / window.innerHeight;
  bgCamera.updateProjectionMatrix();
  bgRenderer.setSize(window.innerWidth, window.innerHeight);

  // Resize product renderer
  if (productStage && productRenderer) {
    const rect = productStage.getBoundingClientRect();
    productRenderer.setSize(rect.width, rect.height, false);
    productCamera.aspect = rect.width / Math.max(rect.height, 1);
    productCamera.updateProjectionMatrix();
  }
});

// Initial product resize
setTimeout(() => {
  if (productStage && productRenderer) {
    const rect = productStage.getBoundingClientRect();
    if (rect.width > 0) {
      productRenderer.setSize(rect.width, rect.height, false);
      productCamera.aspect = rect.width / Math.max(rect.height, 1);
      productCamera.updateProjectionMatrix();
    }
  }
}, 200);

// Observe product stage size changes
if (productStage && window.ResizeObserver) {
  new ResizeObserver(() => {
    if (!productStage || !productRenderer) return;
    const rect = productStage.getBoundingClientRect();
    if (rect.width > 0) {
      productRenderer.setSize(rect.width, rect.height, false);
      productCamera.aspect = rect.width / Math.max(rect.height, 1);
      productCamera.updateProjectionMatrix();
    }
  }).observe(productStage);
}

animate();
