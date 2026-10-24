(()=>{
 const world=document.querySelector('.desk-world'),background=world?.querySelector('.room-background');if(!world||!background)return;
 const root='assets/desk/motion/',cleanplate=root+'room-cleanplate.png';
 // True alpha sprites over an independently repaired background. No pixel warping or filters.
 const host=document.createElement('div');host.className='desk-independent-objects';host.setAttribute('aria-hidden','true');
 host.innerHTML=`<svg class="object-plant" viewBox="20 350 300 205" focusable="false"><defs><clipPath id="plant-pot"><path d="M117 481Q120 471 157 471Q185 472 196 480L193 526Q189 534 155 534Q122 534 120 527Z"/></clipPath></defs><image href="assets/desk/unified-room-v13.png" width="1672" height="941" clip-path="url(#plant-pot)"/><g class="plant-foliage"><image href="${root}foliage.png" x="17.44" y="334.68" width="282.27" height="261.14" preserveAspectRatio="none"/></g></svg>
 <svg class="object-shelf-book" viewBox="113 550 90 170" focusable="false"><path class="shelf-book-backing" d="M142 554H179L184 574L167 578L191 699H150L127 570Z" fill="#806629"/><path d="M143 555H178" fill="none" stroke="#292c20" stroke-width="2"/><g class="green-book-slide"><image href="${root}green-book.png" x="31.38" y="484.59" width="292.65" height="275.22" preserveAspectRatio="none"/></g></svg>
 <svg class="object-pencil" viewBox="508 820 210 88" focusable="false"><g class="pencil-roll"><image href="${root}pencil.png" x="506.3" y="803.7" width="475.4" height="180.7" preserveAspectRatio="none"/></g></svg>`;
 Promise.all([cleanplate,root+'foliage.png',root+'green-book.png',root+'pencil.png'].map(src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=resolve;i.onerror=reject;i.src=src}))).then(()=>{world.append(host);background.src=cleanplate}).catch(()=>host.remove());
})();
