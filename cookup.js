const frame=document.getElementById('cook-prototype');
let start='5039-42942';
function loadPrototype(){const url=new URL('https://embed.figma.com/proto/RBf90SnB4KW9VO65GBpghi/cook-up');url.searchParams.set('node-id',start);url.searchParams.set('starting-point-node-id',start.replace('-',':'));url.searchParams.set('scaling','scale-down');url.searchParams.set('content-scaling','fixed');url.searchParams.set('embed-host','huijing-portfolio');frame.src=url.href;}
document.querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',()=>{start=button.dataset.start;document.querySelectorAll('[data-start]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});loadPrototype()}));
document.getElementById('restart-prototype').addEventListener('click',loadPrototype);
