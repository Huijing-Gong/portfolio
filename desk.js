const viewport=document.querySelector('.scene-viewport'),world=document.querySelector('.desk-world');
for(const b of document.querySelectorAll('[data-open]'))b.addEventListener('click',()=>{document.querySelector('#'+b.dataset.open).showModal()});
for(const d of document.querySelectorAll('dialog')){d.querySelector('.dialog-close').onclick=()=>d.close();d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})}
const search=document.querySelector('#desktop-search');search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();let count=0;document.querySelectorAll('.computer-projects>a').forEach(a=>{a.hidden=!(a.dataset.terms+' '+a.textContent).toLowerCase().includes(q);if(!a.hidden)count++});document.querySelector('.empty-results').hidden=count>0});
function updateClock(){document.querySelector('#phone-time').textContent=new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false})}updateClock();setInterval(updateClock,60000);
document.querySelector('#pan-left').onclick=()=>viewport.scrollBy({left:-innerWidth*.7,behavior:'smooth'});document.querySelector('#pan-right').onclick=()=>viewport.scrollBy({left:innerWidth*.7,behavior:'smooth'});
if(innerWidth<700)requestAnimationFrame(()=>viewport.scrollLeft=Math.max(0,world.clientWidth*.42-innerWidth*.5));
if(matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){world.addEventListener('pointermove',e=>{const r=world.getBoundingClientRect();world.style.setProperty('--mouse-x',((e.clientX-r.left)/r.width-.5).toFixed(3));world.style.setProperty('--mouse-y',((e.clientY-r.top)/r.height-.5).toFixed(3))});world.addEventListener('pointerleave',()=>{world.style.setProperty('--mouse-x',0);world.style.setProperty('--mouse-y',0)})}
if(location.hash==='#apps')document.querySelector('#phone-dialog').showModal();
if(location.hash==='#computer')document.querySelector('#computer-dialog').showModal();
const turntable=document.querySelector('.desk-turntable'),transfer=document.querySelector('.album-transfer');
const musicToggle=document.querySelector('#music-toggle'),spotifyPlayer=document.querySelector('#spotify-player');
document.querySelector('#music-close')?.addEventListener('click',()=>{spotifyPlayer.hidden=true;musicToggle.setAttribute('aria-expanded','false')});

if(location.hash==='#research')document.querySelector('#research-dialog').showModal();
