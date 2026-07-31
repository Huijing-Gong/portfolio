/**
 * Homepage V2 — Background particles + Center portal 3D model
 */
import * as THREE from 'three';

// ============================================
// BACKGROUND SCENE — subtle particles
// ============================================
const bgScene = new THREE.Scene();
const bgCam = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, 0.1, 100);
bgCam.position.z = 9;

const bgR = new THREE.WebGLRenderer({canvas:document.querySelector('#bg-canvas'),antialias:true,alpha:true});
bgR.setSize(innerWidth, innerHeight);
bgR.setPixelRatio(Math.min(devicePixelRatio,2));

bgScene.add(new THREE.AmbientLight(0x222244,1));

// Particle field
const pc = 160;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(pc*3);
for(let i=0;i<pc;i++){pPos[i*3]=(Math.random()-.5)*16;pPos[i*3+1]=(Math.random()-.5)*12;pPos[i*3+2]=(Math.random()-.5)*5-1;}
pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
const pts = new THREE.Points(pGeo,new THREE.PointsMaterial({color:0xa78bfa,size:.014,transparent:true,opacity:.3,blending:THREE.AdditiveBlending,depthWrite:false}));
bgScene.add(pts);

// Few larger shapes
const fg = new THREE.Group();
const geos=[new THREE.IcosahedronGeometry(.15,0),new THREE.TorusGeometry(.12,.02,6,8),new THREE.OctahedronGeometry(.13,0)];
for(let i=0;i<6;i++){
  const m=new THREE.Mesh(geos[i%3],new THREE.MeshStandardMaterial({color:new THREE.Color().setHSL(.7+Math.random()*.08,.6,.35+Math.random()*.3),metalness:.1,roughness:.7,transparent:true,opacity:.2}));
  m.position.set((Math.random()-.5)*12,(Math.random()-.5)*8,(Math.random()-.5)*3-1);
  m.userData={ry:(Math.random()-.5)*.002,by:m.position.y,amp:Math.random()*.15+.06,spd:Math.random()*.2+.1,off:Math.random()*Math.PI*2};
  fg.add(m);
}
bgScene.add(fg);

// Mouse
const ms={x:0,y:0,tx:0,ty:0};
window.addEventListener('mousemove',e=>{ms.tx=(e.clientX/innerWidth)*2-1;ms.ty=-(e.clientY/innerHeight)*2+1;});
let sy=0;window.addEventListener('scroll',()=>{sy=scrollY;});

// ============================================
// CENTER PRODUCT 3D MODEL
// ============================================
const pStage=document.getElementById('futurProductStage');
const pCanvas=document.getElementById('productPortalCanvas');
let pScene,pCam,pR,pModel;

// Product 3D disabled — using static image instead
if(false&&pStage&&pCanvas){
  pScene=new THREE.Scene();
  pCam=new THREE.PerspectiveCamera(42,1,.1,100);pCam.position.set(0,.2,6);pCam.lookAt(0,0,0);
  pR=new THREE.WebGLRenderer({canvas:pCanvas,antialias:true,alpha:true});
  pR.setPixelRatio(Math.min(devicePixelRatio,2));pR.setClearColor(0,0);

  pScene.add(new THREE.AmbientLight(0x333355,3));
  const k=new THREE.DirectionalLight(0xffffff,5);k.position.set(5,4,6);pScene.add(k);
  const f=new THREE.DirectionalLight(0xa78bfa,2.5);f.position.set(-4,-1,2);pScene.add(f);
  const r=new THREE.DirectionalLight(0x6366f1,2.5);r.position.set(0,4,-4);pScene.add(r);

  pModel=new THREE.Group();

  // Sleek sculptural product — metallic silver with accent rings
  const bodyG=new THREE.CylinderGeometry(.45,.55,2.2,56,12);
  const bodyM=new THREE.MeshStandardMaterial({color:0xc0c0d0,metalness:.85,roughness:.18});
  pModel.add(new THREE.Mesh(bodyG,bodyM));

  // Inner core — subtle glow
  const coreG=new THREE.CylinderGeometry(.35,.45,2.0,40,1,true);
  const coreM=new THREE.MeshStandardMaterial({color:0xa78bfa,metalness:.1,roughness:.2,transparent:true,opacity:.3,emissive:0xa78bfa,emissiveIntensity:.5});
  pModel.add(new THREE.Mesh(coreG,coreM));

  // Silver rings
  for(let y=-.9;y<=.9;y+=.6){
    const rg=new THREE.TorusGeometry(.5,.02,12,48);
    const rm=new THREE.MeshStandardMaterial({color:0xe0e0f0,metalness:.95,roughness:.08});
    const ring=new THREE.Mesh(rg,rm);ring.position.y=y;ring.rotation.x=Math.PI/2;
    pModel.add(ring);
  }

  // Top cap
  const topG=new THREE.SphereGeometry(.48,40,20,0,Math.PI*2,0,Math.PI/2.8);
  pModel.add(new THREE.Mesh(topG,new THREE.MeshStandardMaterial({color:0xa8a8c0,metalness:.7,roughness:.15})));
  pModel.children[pModel.children.length-1].position.y=1.1;

  // Base
  const baseG=new THREE.CylinderGeometry(.58,.62,.18,48);
  pModel.add(new THREE.Mesh(baseG,new THREE.MeshStandardMaterial({color:0x8888a0,metalness:.8,roughness:.12})));
  pModel.children[pModel.children.length-1].position.y=-1.25;

  // Orbit dots
  const odg=new THREE.Group();
  const dotG=new THREE.SphereGeometry(.02,6,6);
  for(let i=0;i<18;i++){
    const dm=new THREE.MeshStandardMaterial({color:0xa78bfa,emissive:0xa78bfa,emissiveIntensity:.8,roughness:.1});
    const dot=new THREE.Mesh(dotG,dm);
    const a=(i/18)*Math.PI*2,rd=1.1+Math.random()*.35,hy=(Math.random()-.5)*2.6;
    dot.position.set(Math.cos(a)*rd,hy,Math.sin(a)*rd);
    dot.userData={a,rd,hy,spd:.25+Math.random()*.4};
    odg.add(dot);
  }
  pModel.add(odg);
  pModel.userData.odots=odg;
  pScene.add(pModel);

  // Drag state
  let drag=false,px=0,py=0,tRY=.4,tRX=-.2,vY=0,vX=0;

  pStage.addEventListener('mousedown',e=>{drag=true;px=e.clientX;py=e.clientY;vY=0;vX=0;});
  window.addEventListener('mousemove',e=>{if(!drag)return;const dx=e.clientX-px,dy=e.clientY-py;tRY+=dx*.008;tRX+=dy*.008;tRX=Math.max(-Math.PI/2.2,Math.min(Math.PI/2.2,tRX));vY=dx*.008;vX=dy*.008;px=e.clientX;py=e.clientY;});
  window.addEventListener('mouseup',()=>{drag=false;});
  pStage.addEventListener('touchstart',e=>{if(e.touches.length===1){drag=true;px=e.touches[0].clientX;py=e.touches[0].clientY;vY=0;vX=0;}},{passive:true});
  window.addEventListener('touchmove',e=>{if(!drag||e.touches.length!==1)return;const dx=e.touches[0].clientX-px,dy=e.touches[0].clientY-py;tRY+=dx*.008;tRX+=dy*.008;tRX=Math.max(-Math.PI/2.2,Math.min(Math.PI/2.2,tRX));px=e.touches[0].clientX;py=e.touches[0].clientY;});
  window.addEventListener('touchend',()=>{drag=false;});

  function resizeP(){
    const rect=pStage.getBoundingClientRect();
    if(rect.width===0)return;
    pR.setSize(rect.width,rect.height,false);
    pCam.aspect=rect.width/Math.max(rect.height,1);
    pCam.updateProjectionMatrix();
  }
  window.addEventListener('resize',resizeP);
  new ResizeObserver(resizeP).observe(pStage);
  // Multiple retries to ensure canvas gets sized
  setTimeout(resizeP,100);
  setTimeout(resizeP,300);
  setTimeout(resizeP,600);
  window.addEventListener('load',resizeP);

  window.__productTick=(t)=>{
    if(!drag){tRY+=vY;tRX+=vX;vY*=.94;vX*=.94;if(Math.abs(vY)<.0003)tRY+=.0015;}
    pModel.rotation.y+=(tRY-pModel.rotation.y)*.08;
    pModel.rotation.x+=(tRX-pModel.rotation.x)*.08;
    const od=pModel.userData.odots;
    if(od)for(const d of od.children){d.userData.a+=d.userData.spd*.01;d.position.x=Math.cos(d.userData.a)*d.userData.rd;d.position.z=Math.sin(d.userData.a)*d.userData.rd;}
    pR.render(pScene,pCam);
  };
}

// ============================================
// LOOP
// ============================================
const clk=new THREE.Clock();
function anim(){
  requestAnimationFrame(anim);
  const t=clk.getElapsedTime();
  ms.x+=(ms.tx-ms.x)*.03;ms.y+=(ms.ty-ms.y)*.03;
  bgCam.position.x+=(ms.x*.25-bgCam.position.x)*.02;
  bgCam.position.y+=(-ms.y*.18-sy*.0003-bgCam.position.y)*.02;
  bgCam.lookAt(0,-sy*.00015,0);
  pts.rotation.y+=.0001;
  for(const s of fg.children){s.rotation.y+=s.userData.ry;s.position.y=s.userData.by+Math.sin(t*s.userData.spd+s.userData.off)*s.userData.amp;}
  bgR.render(bgScene,bgCam);
  if(window.__productTick)window.__productTick(t);
}
anim();

// Resize
window.addEventListener('resize',()=>{bgCam.aspect=innerWidth/innerHeight;bgCam.updateProjectionMatrix();bgR.setSize(innerWidth,innerHeight);});

// Nav clock
function tick(){const e=document.getElementById('navTime');if(e)e.textContent=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false});}
tick();setInterval(tick,1000);

// Nav scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>30);});

// Page transitions
function go(href,e){
  const ov=document.getElementById('pageTransition');
  ov.style.setProperty('--tx',(e?e.clientX:innerWidth/2)+'px');
  ov.style.setProperty('--ty',(e?e.clientY:innerHeight/2)+'px');
  ov.classList.add('active');
  setTimeout(()=>{location.href=href;},800);
}
document.querySelectorAll('.portal-v2[href]').forEach(p=>{p.addEventListener('click',e=>{e.preventDefault();go(p.getAttribute('href'),e);});});
document.querySelectorAll('.nav-v2-link[href$=".html"]').forEach(l=>{l.addEventListener('click',e=>{e.preventDefault();go(l.getAttribute('href'),e);});});

console.log('%c< HG portfolio v2 />','font-family:monospace;color:#a78bfa;font-size:1.1em;');
