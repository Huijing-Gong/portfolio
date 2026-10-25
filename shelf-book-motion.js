(()=>{
 const world=document.querySelector('.desk-world');if(!world)return;
 function setup(){const book=world.querySelector('.object-shelf-book');if(!book)return false;
 const grip=document.createElement('button');grip.className='shelf-book-grip';grip.setAttribute('aria-label','轻轻抽出书架上的绿色书');world.append(grip);
 function peek(){book.classList.add('is-peeking')}
 function putBack(){book.classList.remove('is-peeking')}
 grip.addEventListener('pointerenter',peek);grip.addEventListener('pointerleave',putBack);grip.addEventListener('focus',peek);grip.addEventListener('blur',putBack);
 grip.addEventListener('click',()=>{peek();setTimeout(putBack,1200)});return true}
 if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(world,{childList:true})}
})();
