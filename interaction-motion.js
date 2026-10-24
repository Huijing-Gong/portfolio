(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const enter=(node)=>{if(!node||reduced.matches)return;node.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.2,.7,.2,1)'});};
 window.portfolioMotion={enter};
 const view=document.querySelector('#project-view');if(view)enter(view);
 const reveal=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){enter(e.target);reveal.unobserve(e.target)}},{threshold:.12});
 document.querySelectorAll('.process-chapter,.process-title,.research-metrics,.project-heading').forEach(e=>reveal.observe(e));
 document.addEventListener('toggle',e=>{if(e.target.matches('details[open]')){for(const c of e.target.children)if(c.tagName!=='SUMMARY')enter(c)}if(e.target.matches('dialog[open]'))enter(e.target)},true);
 document.addEventListener('pointerdown',e=>{const b=e.target.closest('button,.app-launcher a,.computer-projects a');if(b&&!b.disabled&&!reduced.matches)b.animate([{scale:1},{scale:.97},{scale:1}],{duration:220,easing:'ease-out'})});
 const mutation=new MutationObserver(records=>{for(const r of records){if(r.type==='attributes'&&r.attributeName==='hidden'&&!r.target.hidden)enter(r.target);if(r.type==='childList'&&r.target.matches('.evidence-image,.flow-canvas,.site-screen,.render-result'))enter(r.target)}});
 if(view)mutation.observe(view,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']});
})();
