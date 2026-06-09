/* ── NAV SCROLL ── */
const mainNav=document.getElementById("mainNav");
window.addEventListener("scroll",()=>{if(window.scrollY>60){mainNav.classList.add("nav-scrolled");}else{mainNav.classList.remove("nav-scrolled");}},{passive:true});

/* ── REVEAL + COUNTER ── */
const kRevealEls=document.querySelectorAll(".k-reveal");
const kRevObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("k-visible");kRevObserver.unobserve(e.target);}});},{threshold:0.12});
kRevealEls.forEach(el=>kRevObserver.observe(el));

const counters=document.querySelectorAll("[data-count]");
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;
    const target=Number(el.dataset.count);
    const suffix=target===50?"K+":target===100?"%":"+";
    const start=performance.now();
    const duration=1200;
    function tick(now){const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,3);el.textContent=`${Math.round(target*eased)}${suffix}`;if(progress<1)requestAnimationFrame(tick);}
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:0.55});
counters.forEach(counter=>counterObserver.observe(counter));

/* ── CART ── */
let cart=[];
const cartSidebar=document.getElementById("cartSidebar");
const cartOverlay=document.getElementById("cartOverlay");
const cartItemsEl=document.getElementById("cartItems");
const cartEmptyEl=document.getElementById("cartEmpty");
const cartFooterEl=document.getElementById("cartFooter");
const cartTotalEl=document.getElementById("cartTotal");
const cartBadge=document.getElementById("cartBadge");

function openCart(){cartSidebar.classList.add("open");cartOverlay.classList.add("open");document.body.style.overflow="hidden";}
function closeCart(){cartSidebar.classList.remove("open");cartOverlay.classList.remove("open");document.body.style.overflow="";}
document.getElementById("navCartBtn").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
cartOverlay.addEventListener("click",closeCart);

function addToCart(name,price,image){const existing=cart.find(i=>i.name===name);if(existing){existing.qty+=1;}else{cart.push({name,price:parseFloat(price),image,qty:1});}renderCart();showToast(`<i class="fa-solid fa-circle-check"></i> ${name} added to cart`);}

function renderCart(){
  const total=cart.reduce((s,i)=>s+i.qty,0);
  if(total>0){cartBadge.style.display="flex";cartBadge.textContent=total>99?"99+":total;}else{cartBadge.style.display="none";}
  cartItemsEl.innerHTML="";
  if(cart.length===0){cartItemsEl.appendChild(cartEmptyEl);cartEmptyEl.style.display="block";cartFooterEl.style.display="none";return;}
  cartEmptyEl.style.display="none";cartFooterEl.style.display="block";
  cart.forEach((item,idx)=>{
    const row=document.createElement("div");row.className="cart-item";
    row.innerHTML=`<img class="cart-item-img" src="${item.image}" alt="${item.name}"><div class="cart-item-body"><div class="cart-item-name">${item.name}</div><div class="cart-item-price">₹${(item.price*item.qty).toFixed(2)}</div><div class="cart-qty"><button class="qty-btn" data-idx="${idx}" data-action="dec">&#8722;</button><span class="qty-num">${item.qty}</span><button class="qty-btn" data-idx="${idx}" data-action="inc">&#43;</button></div></div><button class="cart-item-remove" data-idx="${idx}" aria-label="Remove"><i class="fa-solid fa-xmark"></i></button>`;
    cartItemsEl.appendChild(row);
  });
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  cartTotalEl.textContent=`₹${subtotal.toFixed(2)}`;
  cartItemsEl.querySelectorAll(".qty-btn").forEach(btn=>{btn.addEventListener("click",()=>{const idx=+btn.dataset.idx;if(btn.dataset.action==="inc"){cart[idx].qty+=1;}else{cart[idx].qty-=1;if(cart[idx].qty<=0)cart.splice(idx,1);}renderCart();});});
  cartItemsEl.querySelectorAll(".cart-item-remove").forEach(btn=>{btn.addEventListener("click",()=>{const idx=+btn.dataset.idx;cart.splice(idx,1);renderCart();});});
}

document.addEventListener("click",e=>{
  const btn=e.target.closest(".add-to-cart-btn");
  if(btn){addToCart(btn.dataset.name,btn.dataset.price,btn.dataset.image);openCart();}
});

const heroAddCartBtn=document.getElementById("heroAddCart");
if(heroAddCartBtn){
  heroAddCartBtn.addEventListener("click",()=>{addToCart(heroAddCartBtn.dataset.name,heroAddCartBtn.dataset.price,heroAddCartBtn.dataset.image);openCart();});
}

/* ── AUTH ── */
function getCSRF(){return document.querySelector('meta[name="csrf-token"]')?.content||'';}
let pendingCheckout=false;

const authModal=document.getElementById("authModal");
const authOverlay=document.getElementById("authOverlay");
function openAuth(tab){authModal.classList.add("open");authOverlay.classList.add("open");document.body.style.overflow="hidden";if(tab)switchAuthTab(tab);}
function closeAuth(){authModal.classList.remove("open");authOverlay.classList.remove("open");document.body.style.overflow="";}
function switchAuthTab(tab){document.querySelectorAll(".auth-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===tab));document.getElementById("loginForm").style.display=tab==="login"?"block":"none";document.getElementById("registerForm").style.display=tab==="register"?"block":"none";}
const navLoginBtn=document.getElementById("navLoginBtn");
const navSignupBtn=document.getElementById("navSignupBtn");
if(navLoginBtn)navLoginBtn.addEventListener("click",()=>openAuth("login"));
if(navSignupBtn)navSignupBtn.addEventListener("click",()=>openAuth("register"));

/* Profile dropdown (server-rendered logged-in state) */
(function(){
  const wrap=document.getElementById("navProfileWrap");
  if(!wrap)return;
  const btn=document.getElementById("navProfileBtn");
  const logoutBtn=document.getElementById("navLogoutBtn");
  btn.addEventListener("click",e=>{e.stopPropagation();wrap.classList.toggle("open");});
  document.addEventListener("click",()=>wrap.classList.remove("open"));
  wrap.querySelector(".nav-profile-drop").addEventListener("click",e=>e.stopPropagation());
  if(logoutBtn)logoutBtn.addEventListener("click",async()=>{
    await fetch("/api/logout/",{method:"POST",headers:{"X-CSRFToken":getCSRF()}});
    window.location.reload();
  });
})();
document.getElementById("authClose").addEventListener("click",closeAuth);
authOverlay.addEventListener("click",closeAuth);
document.querySelectorAll(".auth-tab").forEach(tab=>{tab.addEventListener("click",()=>switchAuthTab(tab.dataset.tab));});
document.querySelectorAll(".switch-link").forEach(link=>{link.addEventListener("click",e=>{e.preventDefault();switchAuthTab(link.dataset.switch);});});

function updateNavAfterLogin(name){
  const loginBtn=document.getElementById("navLoginBtn");
  const signupBtn=document.getElementById("navSignupBtn");
  if(loginBtn)loginBtn.style.display="none";
  if(signupBtn)signupBtn.style.display="none";
  if(!document.getElementById("navProfileWrap")){
    const navActions=document.querySelector(".nav-actions");
    if(navActions){
      const initial=name.charAt(0).toUpperCase();
      const first=name.split(" ")[0];
      const wrap=document.createElement("div");
      wrap.id="navProfileWrap";wrap.className="nav-profile-wrap";
      wrap.innerHTML=`<button class="nav-profile-btn" id="navProfileBtn"><span class="nav-profile-avatar">${initial}</span><span class="nav-profile-name">${first}</span><i class="fa-solid fa-chevron-down nav-profile-caret"></i></button><div class="nav-profile-drop"><div class="npd-header"><div class="npd-avatar-lg">${initial}</div><div class="npd-info"><div class="npd-name">${name}</div></div></div><div class="npd-divider"></div><a href="/orders/" class="npd-item"><i class="fa-solid fa-bag-shopping"></i> My Orders</a><div class="npd-divider"></div><button class="npd-item npd-logout" id="_dynLogout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button></div>`;
      const ham=document.getElementById("navHamburger");
      if(ham)navActions.insertBefore(wrap,ham);else navActions.appendChild(wrap);
      document.getElementById("navProfileBtn").addEventListener("click",e=>{e.stopPropagation();wrap.classList.toggle("open");});
      wrap.querySelector(".nav-profile-drop").addEventListener("click",e=>e.stopPropagation());
      document.addEventListener("click",()=>wrap.classList.remove("open"));
      document.getElementById("_dynLogout").addEventListener("click",async()=>{
        await fetch("/api/logout/",{method:"POST",headers:{"X-CSRFToken":getCSRF()}});
        window.location.reload();
      });
    }
  }
  const mobLogin=document.getElementById("mobLoginBtn");
  const mobSignup=document.getElementById("mobSignupBtn");
  if(mobLogin)mobLogin.style.display="none";
  if(mobSignup)mobSignup.style.display="none";
}

function onAuthSuccess(name){
  window.MALOLA_AUTH={authenticated:true,name};
  updateNavAfterLogin(name);
  closeAuth();
  showToast(`<i class="fa-solid fa-circle-check"></i> Welcome, ${name.split(" ")[0]}! 🎉`);
  if(pendingCheckout){pendingCheckout=false;setTimeout(buildCheckoutModal,300);}
}

async function submitAuth(url,payload,btn,errEl){
  const orig=btn.innerHTML;btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';errEl.textContent="";
  try{
    const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":getCSRF()},body:JSON.stringify(payload)});
    const d=await r.json();
    if(d.success){onAuthSuccess(d.name);}else{errEl.textContent=d.error||"Something went wrong";}
  }catch(err){errEl.textContent="Connection error. Try again.";}
  btn.disabled=false;btn.innerHTML=orig;
}

(function(){
  const lf=document.getElementById("loginForm");
  const le=Object.assign(document.createElement("p"),{style:"color:#c62828;font-size:.8rem;font-weight:700;margin:8px 0 0;text-align:center;min-height:18px"});
  lf.appendChild(le);
  lf.addEventListener("submit",e=>{
    e.preventDefault();
    const email=lf.querySelector('input[type="email"]').value.trim();
    const password=lf.querySelector('input[type="password"]').value;
    if(!email){le.textContent="Please enter your email address";return;}
    if(!password){le.textContent="Please enter your password";return;}
    submitAuth("/api/login/",{email,password},lf.querySelector(".auth-submit"),le);
  });

  const rf=document.getElementById("registerForm");
  const re=Object.assign(document.createElement("p"),{style:"color:#c62828;font-size:.8rem;font-weight:700;margin:8px 0 0;text-align:center;min-height:18px"});
  rf.appendChild(re);
  rf.addEventListener("submit",e=>{
    e.preventDefault();
    const inputs=rf.querySelectorAll("input");
    const name=inputs[0].value.trim();
    const email=inputs[1].value.trim();
    const password=inputs[2].value;
    if(!name){re.textContent="Please enter your full name";return;}
    if(!email){re.textContent="Please enter your email address";return;}
    if(!password||password.length<6){re.textContent="Password must be at least 6 characters";return;}
    submitAuth("/api/register/",{name,email,password},rf.querySelector(".auth-submit"),re);
  });
})();

/* ── CHECKOUT ── */
function buildCheckoutModal(){
  const existing=document.getElementById('checkoutModal');if(existing)existing.remove();
  if(cart.length===0){showToast('<i class="fa-solid fa-basket-shopping"></i> Your cart is empty!');return;}
  const itemsHtml=cart.map(item=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px dashed rgba(21,101,192,.15)"><span style="font-weight:700;font-size:.88rem;color:var(--cd);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:12px">${item.name} <span style="color:rgba(13,43,107,.4)">×${item.qty}</span></span><span style="font-family:'Fredoka One',cursive;font-size:1rem;color:var(--aqua2);flex-shrink:0">₹${(item.price*item.qty).toFixed(0)}</span></div>`).join('');
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const modal=document.createElement('div');modal.id='checkoutModal';
  modal.style.cssText='position:fixed;inset:0;z-index:3500;display:flex;align-items:center;justify-content:center;background:rgba(10,31,94,.55);backdrop-filter:blur(6px);padding:16px';
  modal.innerHTML=`<div style="background:#fff;border-radius:28px;padding:32px 28px;max-width:460px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,.3)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:22px"><h2 style="font-family:'Fredoka One',cursive;font-size:1.7rem;color:var(--cd);margin:0"><i class="fa-solid fa-basket-shopping" style="color:var(--aqua2);margin-right:10px"></i>Your Order</h2><button id="coClose" style="background:rgba(13,43,107,.08);border:none;width:36px;height:36px;border-radius:50%;font-size:1.1rem;cursor:pointer;color:var(--cd);display:flex;align-items:center;justify-content:center">&times;</button></div><div style="margin-bottom:18px;max-height:200px;overflow-y:auto">${itemsHtml}</div><div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;margin-bottom:22px;border-top:2.5px solid var(--yellow)"><span style="font-weight:800;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:rgba(13,43,107,.5)">Total</span><span style="font-family:'Fredoka One',cursive;font-size:2rem;color:var(--cd)">₹${total.toFixed(0)}</span></div><form id="coForm"><div style="margin-bottom:12px"><input type="text" id="coName" placeholder="Full Name *" required style="width:100%;padding:13px 16px;border:2px solid rgba(21,101,192,.2);border-radius:14px;font-size:.9rem;font-family:'Nunito',sans-serif;font-weight:700;outline:none;box-sizing:border-box;transition:border-color .2s" onfocus="this.style.borderColor='var(--aqua2)'" onblur="this.style.borderColor='rgba(21,101,192,.2)'"></div><div style="margin-bottom:12px"><input type="tel" id="coPhone" placeholder="Phone Number *" required style="width:100%;padding:13px 16px;border:2px solid rgba(21,101,192,.2);border-radius:14px;font-size:.9rem;font-family:'Nunito',sans-serif;font-weight:700;outline:none;box-sizing:border-box;transition:border-color .2s" onfocus="this.style.borderColor='var(--aqua2)'" onblur="this.style.borderColor='rgba(21,101,192,.2)'"></div><div style="margin-bottom:20px"><textarea id="coAddress" placeholder="Delivery Address *" required rows="3" style="width:100%;padding:13px 16px;border:2px solid rgba(21,101,192,.2);border-radius:14px;font-size:.9rem;font-family:'Nunito',sans-serif;font-weight:700;outline:none;resize:none;box-sizing:border-box;transition:border-color .2s" onfocus="this.style.borderColor='var(--aqua2)'" onblur="this.style.borderColor='rgba(21,101,192,.2)'"></textarea></div><button type="submit" style="width:100%;height:56px;background:var(--yellow);border:none;border-radius:999px;font-family:'Fredoka One',cursive;font-size:1.15rem;color:var(--cd);cursor:pointer;box-shadow:0 8px 28px rgba(254,207,10,.45);transition:transform .2s,box-shadow .2s" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 16px 40px rgba(254,207,10,.5)'" onmouseout="this.style.transform='';this.style.boxShadow='0 8px 28px rgba(254,207,10,.45)'">Place Order &nbsp;<i class="fa-solid fa-check-circle"></i></button></form></div>`;
  document.body.appendChild(modal);document.body.style.overflow='hidden';
  document.getElementById('coClose').addEventListener('click',closeCheckoutModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeCheckoutModal();});
  document.getElementById('coForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const name=document.getElementById('coName').value.trim();
    const phone=document.getElementById('coPhone').value.trim();
    const address=document.getElementById('coAddress').value.trim();
    if(!name||!phone||!address)return;
    const btn=e.target.querySelector('button[type="submit"]');
    btn.disabled=true;btn.innerHTML='Placing Order… <i class="fa-solid fa-spinner fa-spin"></i>';
    const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
    const payload={name,phone,address,items:cart.map(i=>({name:i.name,price:i.price,qty:i.qty,image:i.image})),total};
    try{
      const resp=await fetch('/api/place-order/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await resp.json();
      if(data.success){
        cart=[];renderCart();closeCart();closeCheckoutModal();
        window.location.href=data.redirect;
      } else { throw new Error(data.error||'Order failed'); }
    }catch(err){
      btn.disabled=false;btn.innerHTML='Place Order &nbsp;<i class="fa-solid fa-check-circle"></i>';
      showToast('<i class="fa-solid fa-circle-exclamation"></i> '+(err.message||'Something went wrong. Try again.'),3000);
    }
  });
}
function closeCheckoutModal(){const m=document.getElementById('checkoutModal');if(m)m.remove();document.body.style.overflow='';}
document.addEventListener('click',e=>{
  if(!e.target.closest('.checkout-btn'))return;
  if(!window.MALOLA_AUTH||!window.MALOLA_AUTH.authenticated){
    pendingCheckout=true;
    openAuth('login');
    showToast('<i class="fa-solid fa-lock"></i> Please login to place your order',3000);
    return;
  }
  buildCheckoutModal();
});

/* ── TOAST ── */
function showToast(html,duration=3000){
  const container=document.getElementById("toastContainer");
  const t=document.createElement("div");t.className="toast";t.innerHTML=html;
  container.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("show")));
  setTimeout(()=>{t.classList.remove("show");setTimeout(()=>t.remove(),420);},duration);
}

/* ── HAMBURGER MOBILE MENU ── */
(function(){
  const ham = document.getElementById('navHamburger');
  const mob = document.getElementById('mobMenu');
  const overlay = document.getElementById('mobMenuOverlay');
  const close = document.getElementById('mobMenuClose');
  function openMob(){mob.classList.add('open');overlay.classList.add('open');ham.classList.add('open');document.body.style.overflow='hidden';}
  function closeMob(){mob.classList.remove('open');overlay.classList.remove('open');ham.classList.remove('open');document.body.style.overflow='';}
  ham.addEventListener('click', openMob);
  close.addEventListener('click', closeMob);
  overlay.addEventListener('click', closeMob);
  const mobLoginBtn=document.getElementById('mobLoginBtn');
  const mobSignupBtn=document.getElementById('mobSignupBtn');
  const mobLogoutBtn=document.getElementById('mobLogoutBtn');
  if(mobLoginBtn)mobLoginBtn.addEventListener('click',()=>{closeMob();openAuth('login');});
  if(mobSignupBtn)mobSignupBtn.addEventListener('click',()=>{closeMob();openAuth('register');});
  if(mobLogoutBtn)mobLogoutBtn.addEventListener('click',async()=>{await fetch('/api/logout/',{method:'POST',headers:{'X-CSRFToken':getCSRF()}});window.location.reload();});
  document.querySelectorAll('.mob-prod-item[data-pdp]').forEach(item=>{
    item.addEventListener('click',()=>{window.location.href='/product/?id='+item.dataset.pdp;});
  });
  document.querySelectorAll('.mob-nav-links a').forEach(a=>{a.addEventListener('click',closeMob);});
})();

/* ── SEARCH WIDGET ── */
(function(){
  const modal     = document.getElementById('searchModal');
  const overlay   = document.getElementById('searchOverlay');
  const smInput   = document.getElementById('smInput');
  const smClear   = document.getElementById('smClear');
  const smBack    = document.getElementById('smBack');
  const smBody    = document.getElementById('smBody');
  const smResults = document.getElementById('smResults');

  const catalog = [
    {id:'milletvanilla',    name:'Millet Vanilla',    cat:'Millet Snack',   price:299, img:'/static/images/green.png'},
    {id:'milletchoco',      name:'Millet Choco',      cat:'Millet Snack',   price:299, img:'/static/images/a6bf2fb7-be25-4e5c-94f4-ba9215f70999_removalai_preview.png'},
    {id:'blueberrypancake', name:'Blueberry Pancake', cat:'Pancake Snack',  price:299, img:'/static/images/b3e47e53-7399-423b-a88a-c4cadb4de3b3_removalai_preview.png'},
    {id:'quinoapuffs',      name:'Quinoa Puffs',      cat:'Puff Snack',     price:299, img:'/static/images/red.png'},
  ];

  function openWidget() {
    modal.classList.add('open');
    overlay.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    setTimeout(() => smInput.focus(), 150);
  }
  function closeWidget() {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    smInput.value = '';
    smClear.classList.remove('visible');
    smBody.classList.remove('hidden');
    smResults.classList.remove('active');
    smResults.innerHTML = '';
  }

  const navSearchBtn = document.getElementById('navSearchBtn');
  if (navSearchBtn) navSearchBtn.addEventListener('click', e => { e.stopPropagation(); openWidget(); });
  const mobSearchInput = document.getElementById('mobSearchInput');
  if (mobSearchInput) mobSearchInput.addEventListener('focus', openWidget);

  smBack.addEventListener('click', closeWidget);
  overlay.addEventListener('click', closeWidget);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWidget(); });

  document.querySelectorAll('.sm-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      smInput.value = tag.dataset.q;
      smClear.classList.add('visible');
      doSearch(tag.dataset.q);
    });
  });

  smInput.addEventListener('input', () => {
    const q = smInput.value.trim();
    smClear.classList.toggle('visible', q.length > 0);
    doSearch(q);
  });

  smClear.addEventListener('click', () => {
    smInput.value = '';
    smClear.classList.remove('visible');
    smBody.classList.remove('hidden');
    smResults.classList.remove('active');
    smResults.innerHTML = '';
    smInput.focus();
  });

  function doSearch(q) {
    if (!q) {
      smBody.classList.remove('hidden');
      smResults.classList.remove('active');
      smResults.innerHTML = '';
      return;
    }
    smBody.classList.add('hidden');
    smResults.classList.add('active');
    const matches = catalog.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.cat.toLowerCase().includes(q.toLowerCase())
    );
    if (matches.length === 0) {
      smResults.innerHTML = `<div class="sm-no-result"><i class="fa-solid fa-magnifying-glass"></i><p>No results for "${q}"</p><span>Try Millet, Puffs or Pancake</span></div>`;
    } else {
      smResults.innerHTML = `<div class="sm-res-label">${matches.length} result${matches.length>1?'s':''} found</div>` +
        matches.map(p => `
          <div class="sm-res-item" onclick="window.location.href='/product/?id=${p.id}'">
            <img src="${p.img}" alt="${p.name}" class="sm-res-img">
            <div class="sm-res-info">
              <div class="sm-res-name">${p.name}</div>
              <div class="sm-res-cat">${p.cat} · 100g</div>
              <div class="sm-res-price">₹${p.price}</div>
            </div>
            <button class="sm-res-add add-to-cart-btn" data-name="${p.name}" data-price="${p.price}" data-image="${p.img}" onclick="event.stopPropagation()">ADD</button>
          </div>`
        ).join('');
    }
  }
})();

/* ── PRODUCT PAGE NAVIGATION ── */
(function(){
  /* mega menu items → navigate to product page */
  document.querySelectorAll('.mega-item[data-pdp]').forEach(item => {
    item.addEventListener('click', () => {
      window.location.href = '/product/?id=' + item.dataset.pdp;
    });
  });

  /* product cards on page → navigate to product page */
  const nameMap = {
    'Millet Vanilla':'milletvanilla','Millet Choco':'milletchoco',
    'Blueberry Pancake':'blueberrypancake','Quinoa Puffs':'quinoapuffs',
  };
  document.querySelectorAll('.k-prod-card').forEach(card => {
    const nameEl = card.querySelector('.k-prod-name');
    if (!nameEl) return;
    const pid = nameMap[nameEl.textContent.trim()];
    if (!pid) return;
    card.addEventListener('click', e => {
      if (e.target.closest('.add-to-cart-btn')) return;
      window.location.href = '/product/?id=' + pid;
    });
  });
})();

/* ── REELS SLIDER ── */
(function(){
  const viewport = document.getElementById('reelsViewport');
  const track    = document.getElementById('reelsTrack');
  const prevBtn  = document.getElementById('reelPrev');
  const nextBtn  = document.getElementById('reelNext');
  const dotsWrap = document.getElementById('reelsDots');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.reel-card'));
  const total = cards.length;
  const GAP   = 20;
  let current  = 1;
  let dragStartX = 0, dragDelta = 0, dragging = false;

  /* create dots */
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'reels-dot';
    d.setAttribute('aria-label', 'Reel ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('.reels-dot'));

  function applyCarousel(extraPx) {
    const cardW  = cards[0].offsetWidth;
    const slot   = cardW + GAP;
    const vpW    = viewport.offsetWidth;
    let offset   = (vpW / 2) - (current * slot) - (cardW / 2);
    if (extraPx) offset += extraPx;
    track.style.transform = 'translateX(' + offset + 'px)';

    cards.forEach((card, i) => {
      const isActive = i === current;
      card.classList.toggle('active', isActive);
      const v = card.querySelector('.reel-video');
      if (isActive && !card.classList.contains('user-paused')) {
        v.play().catch(() => {});
      } else if (!isActive) {
        v.pause();
        card.classList.remove('user-paused');
      }
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  function goTo(idx) {
    if (idx < 0 || idx >= total) return;
    current = idx;
    applyCarousel();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  /* click card: center it; click active: pause/resume */
  cards.forEach(card => {
    const video   = card.querySelector('.reel-video');
    const muteBtn = card.querySelector('.reel-mute-btn');

    card.addEventListener('click', e => {
      if (e.target.closest('.reel-mute-btn') || dragging) return;
      const idx = parseInt(card.dataset.index);
      if (idx !== current) { goTo(idx); return; }
      if (video.paused) {
        video.play().catch(() => {});
        card.classList.remove('user-paused');
      } else {
        video.pause();
        card.classList.add('user-paused');
      }
    });

    if (muteBtn) {
      muteBtn.addEventListener('click', e => {
        e.stopPropagation();
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted
          ? '<i class="fa-solid fa-volume-xmark"></i>'
          : '<i class="fa-solid fa-volume-high"></i>';
      });
    }

    /* auto-advance to next reel when video ends */
    video.addEventListener('ended', () => {
      const next = (parseInt(card.dataset.index) + 1) % total;
      goTo(next);
    });
  });

  /* touch swipe */
  viewport.addEventListener('touchstart', e => {
    dragStartX = e.touches[0].clientX; dragging = false;
  }, { passive: true });
  viewport.addEventListener('touchmove', e => {
    dragDelta = e.touches[0].clientX - dragStartX;
    if (Math.abs(dragDelta) > 10) dragging = true;
  }, { passive: true });
  viewport.addEventListener('touchend', () => {
    if (Math.abs(dragDelta) > 55) goTo(dragDelta < 0 ? current + 1 : current - 1);
    dragDelta = 0;
    setTimeout(() => { dragging = false; }, 50);
  });

  /* mouse drag */
  viewport.addEventListener('mousedown', e => {
    dragStartX = e.clientX; dragging = false;
    track.classList.add('dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!track.classList.contains('dragging')) return;
    dragDelta = e.clientX - dragStartX;
    if (Math.abs(dragDelta) > 8) dragging = true;
    applyCarousel(dragDelta * 0.65);
  });
  window.addEventListener('mouseup', () => {
    if (!track.classList.contains('dragging')) return;
    track.classList.remove('dragging');
    if (Math.abs(dragDelta) > 55) goTo(dragDelta < 0 ? current + 1 : current - 1);
    else applyCarousel();
    dragDelta = 0;
    setTimeout(() => { dragging = false; }, 50);
  });

  /* pause when section scrolls out of view */
  const section = document.getElementById('kids-video');
  if (section) {
    new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) {
        cards.forEach(c => c.querySelector('.reel-video').pause());
      } else {
        const v = cards[current].querySelector('.reel-video');
        if (!cards[current].classList.contains('user-paused')) v.play().catch(() => {});
      }
    }, { threshold: 0.2 }).observe(section);
  }

  applyCarousel();
  window.addEventListener('resize', () => applyCarousel());
})();

/* ── FOOTER FORM ── */
document.getElementById("footerForm")?.addEventListener("submit",e=>{e.preventDefault();showToast('<i class="fa-solid fa-envelope"></i> You\'re subscribed! 🎉');});

/* ── OWL CAROUSEL ── */
$(function(){
  $(".kids-testimonial-carousel").owlCarousel({
    loop:true,margin:24,nav:true,dots:true,
    center:true,autoplay:true,autoplayTimeout:5000,autoplayHoverPause:true,
    navText:["&#8592;","&#8594;"],
    responsive:{0:{items:1},768:{items:2},1200:{items:3}}
  });

});

