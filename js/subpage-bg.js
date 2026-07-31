/**
 * Subpage Background — subtle particle field
 * Used by apps.html, art.html
 */
import * as THREE from 'three';

const canvas = document.querySelector('#bg-canvas');
if (!canvas) throw new Error('No bg-canvas found');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 9;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(new THREE.AmbientLight(0x222244, 1));

// Particles
const count = 120;
const geo = new THREE.BufferGeometry();
const pos = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  pos[i * 3] = (Math.random() - 0.5) * 16;
  pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
  pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
}
geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const mat = new THREE.PointsMaterial({
  color: 0xa78bfa,
  size: 0.016,
  transparent: true,
  opacity: 0.35,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const pts = new THREE.Points(geo, mat);
scene.add(pts);

// Mouse
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
});

let sy = 0;
window.addEventListener('scroll', () => { sy = window.scrollY; });

function animate() {
  requestAnimationFrame(animate);
  mouse.x += (mouse.tx - mouse.x) * 0.03;
  mouse.y += (mouse.ty - mouse.y) * 0.03;
  camera.position.x += (mouse.x * 0.25 - camera.position.x) * 0.02;
  camera.position.y += (-mouse.y * 0.2 - sy * 0.0003 - camera.position.y) * 0.02;
  camera.lookAt(0, -sy * 0.0002, 0);
  pts.rotation.y += 0.00012;
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
