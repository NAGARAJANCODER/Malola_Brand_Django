/* ══ PRODUCT CATALOG ══ */
const productCatalog = {

  /* ── BITES & CRUNCHIES ── */
  milletvanilla:{id:'milletvanilla',name:'Millet Vanilla',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Best Seller 🔥',badgeColor:'#4e7a1e',bg:'#edf5e1',image:'/static/images/green.png',imageBack:'/static/images/green.png',description:'Creamy vanilla meets wholesome millet in every delightful bite. A smooth, guilt-free treat packed with fibre and natural goodness — loved by kids and parents alike.',ingredients:['Whole Millet','Natural Vanilla','Jaggery','Rice Flour','No Artificial Colours','Non-GMO'],nutrition:{Calories:'400 kcal',Protein:'7g',Fat:'12g',Carbs:'64g',Fibre:'6g'},weights:['100g','200g','500g']},

  milletchoco:{id:'milletchoco',name:'Millet Choco',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Fan Fav ✨',badgeColor:'#5c3e18',bg:'#f5ede6',image:'/static/images/a6bf2fb7-be25-4e5c-94f4-ba9215f70999_removalai_preview.png',imageBack:'/static/images/Choco Bytes Back.png',description:'Rich dark chocolate meets wholesome millet in every crunchy bite. A guilt-free indulgence packed with fibre, iron and natural energy — perfect for everyday snacking.',ingredients:['Whole Millet','Dark Chocolate Coating','Cocoa Powder','Jaggery','No Artificial Colours','Non-GMO'],nutrition:{Calories:'420 kcal',Protein:'8g',Fat:'14g',Carbs:'62g',Fibre:'6g'},weights:['100g','200g','500g']},

  chocobytes:{id:'chocobytes',name:'Choco Bytes',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Kids Pick 🍫',badgeColor:'#4a2000',bg:'#fbe8d8',image:'/static/images/Choco Bytes Front.png',imageBack:'/static/images/Choco Bytes Back.png',description:'Bite-sized millet snacks coated in rich chocolate — crunchy, chocolatey, made without junk. A smart swap for chocolate bars that kids will love every single day.',ingredients:['Millet','Cocoa','Jaggery','Rice Flour','Natural Flavour','No Preservatives'],nutrition:{Calories:'415 kcal',Protein:'7g',Fat:'13g',Carbs:'63g',Fibre:'5g'},weights:['100g','200g','500g']},

  chococrunch:{id:'chococrunch',name:'Choco Crunch',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Crunchy 🌾',badgeColor:'#3e2000',bg:'#f9e6d0',image:'/static/images/choco crunch front.png',imageBack:'/static/images/choco crunch back.png',description:'Ragi and millet come together in this irresistibly crunchy chocolate snack. Light, airy, packed with calcium — satisfies every crunch craving guilt-free.',ingredients:['Ragi','Millet','Cocoa Powder','Jaggery','Sea Salt','No Artificial Additives'],nutrition:{Calories:'390 kcal',Protein:'9g',Fat:'11g',Carbs:'62g',Fibre:'7g'},weights:['100g','200g','500g']},

  cheddarball:{id:'cheddarball',name:'Cheddar Cheese Balls',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Cheesy! 🧀',badgeColor:'#7a4800',bg:'#fff3d0',image:'/static/images/cheddar cheese balls front.png',imageBack:'/static/images/cheddar cheese balls back.png',description:'Puffy, cheesy, millet-based balls with a bold cheddar punch. Baked not fried — each ball delivers real cheese flavour with a wholesome nutritious core.',ingredients:['Millet','Cheddar Cheese','Sea Salt','Sunflower Oil','No MSG','No Artificial Colours'],nutrition:{Calories:'395 kcal',Protein:'9g',Fat:'13g',Carbs:'60g',Fibre:'5g'},weights:['100g','200g','500g']},

  buttermakhana:{id:'buttermakhana',name:'Butter Makhana',category:'Bites & Crunchies',categoryId:'bites',price:249,badge:'Premium 🌟',badgeColor:'#4e3700',bg:'#fef8e7',image:'/static/images/butter makhana front.png',imageBack:'/static/images/butter makhana back.png',description:'Premium lotus seeds roasted in real butter and lightly seasoned. A protein-rich, low-calorie snack that feels indulgent but is completely wholesome — anytime, anywhere.',ingredients:['Lotus Seeds (Makhana)','Butter','Sea Salt','Black Pepper','No Preservatives','Gluten-Free'],nutrition:{Calories:'325 kcal',Protein:'9g',Fat:'10g',Carbs:'50g',Fibre:'4g'},weights:['50g','100g','200g']},

  cheddaropuff:{id:'cheddaropuff',name:'Cheddar Cheese Puffs',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Puff Up! 🧀',badgeColor:'#6b4a00',bg:'#fff9e8',image:'/static/images/Puff Cheddar Cheese.png',imageBack:'/static/images/cheese puff back.png',description:'Light-as-air quinoa puffs with bold cheddar cheese seasoning. Each puff melts in your mouth with irresistible cheese goodness — no MSG, no artificial colours.',ingredients:['Quinoa','Cheddar Seasoning','Sea Salt','Sunflower Oil','No MSG','No Artificial Colours'],nutrition:{Calories:'390 kcal',Protein:'10g',Fat:'12g',Carbs:'60g',Fibre:'5g'},weights:['100g','200g','500g']},

  tangipuffs:{id:'tangipuffs',name:'Tangi Tomato Puffs',category:'Bites & Crunchies',categoryId:'bites',price:199,badge:'Tangy! 🍅',badgeColor:'#8b1a00',bg:'#fff0ee',image:'/static/images/Puff Tangi Tomato.png',imageBack:'/static/images/Puff Tangi Tomato (1).png',description:'Zesty tomato meets the crunch of quinoa in these irresistible puffs. Bold, tangy, and full of flavour — the guilt-free answer to your namkeen cravings.',ingredients:['Quinoa','Tomato Powder','Tamarind','Sea Salt','Sunflower Oil','No Artificial Additives'],nutrition:{Calories:'385 kcal',Protein:'9g',Fat:'11g',Carbs:'62g',Fibre:'5g'},weights:['100g','200g','500g']},

  quinoapuffs:{id:'quinoapuffs',name:'Quinoa Puffs',category:'Bites & Crunchies',categoryId:'bites',price:299,badge:'Season 🌾',badgeColor:'#7a3810',bg:'#fdf0e2',image:'/static/images/red.png',imageBack:'/static/images/red.png',description:'Airy, crunchy quinoa puffs seasoned to perfection. Loaded with complete protein and essential amino acids — a smarter snack that kids love and parents trust.',ingredients:['Quinoa','Cheddar Seasoning','Sea Salt','Sunflower Oil','No MSG','Gluten-Free'],nutrition:{Calories:'390 kcal',Protein:'10g',Fat:'12g',Carbs:'60g',Fibre:'5g'},weights:['100g','200g','500g']},

  /* ── CEREALS & GRANOLA ── */
  bananagranola:{id:'bananagranola',name:'Banana Granola',category:'Cereals & Granola',categoryId:'cereals',price:349,badge:'Breakfast 🍌',badgeColor:'#c77700',bg:'#fff8e1',image:'/static/images/Banana Granola.png',imageBack:'/static/images/Banana Granola Back.png',description:'Sun-dried banana slices meet toasted oats, millet, and honey in this vibrant granola. A naturally sweet, energising start to your morning that keeps you going all day.',ingredients:['Rolled Oats','Dried Banana','Millet','Honey','Coconut Oil','No Refined Sugar'],nutrition:{Calories:'420 kcal',Protein:'8g',Fat:'11g',Carbs:'70g',Fibre:'6g'},weights:['200g','400g','800g']},

  chocodelightmuesli:{id:'chocodelightmuesli',name:'Choco Delight Muesli',category:'Cereals & Granola',categoryId:'cereals',price:349,badge:'Choco Boost 🍫',badgeColor:'#4a2000',bg:'#fde8d0',image:'/static/images/Choco Delight Muesli.png',imageBack:'/static/images/Choco Delight Muesli back.png',description:'A luxurious blend of multigrain flakes, dark chocolate chips, and roasted nuts. Rich, indulgent, and incredibly nutritious — breakfast that feels like a treat every morning.',ingredients:['Multigrain Flakes','Dark Chocolate Chips','Oats','Raisins','Almonds','No Artificial Flavours'],nutrition:{Calories:'440 kcal',Protein:'10g',Fat:'14g',Carbs:'66g',Fibre:'6g'},weights:['200g','400g','800g']},

  fruitnutmuesli:{id:'fruitnutmuesli',name:'Fruit & Nut Muesli',category:'Cereals & Granola',categoryId:'cereals',price:379,badge:'Power Mix 🌰',badgeColor:'#5c3d00',bg:'#fef6e8',image:'/static/images/Fruit and Nut muesli.png',imageBack:'/static/images/Fruit and Nut muesli Back.png',description:'A wholesome muesli loaded with sun-dried fruits, crunchy nuts, and toasted multigrain flakes. Rich in fibre and antioxidants — the complete breakfast that powers your day.',ingredients:['Multigrain Flakes','Almonds','Cashews','Raisins','Cranberries','Sunflower Seeds'],nutrition:{Calories:'430 kcal',Protein:'11g',Fat:'15g',Carbs:'64g',Fibre:'7g'},weights:['200g','400g','800g']},

  quinoamuesli:{id:'quinoamuesli',name:'Quinoa Muesli',category:'Cereals & Granola',categoryId:'cereals',price:399,badge:'Protein Rich 🌿',badgeColor:'#2e5c00',bg:'#edf7e6',image:'/static/images/Quinoa muesli back.png',imageBack:'/static/images/Quinoa muesli back (1).png',description:'Quinoa-enriched muesli with all 9 essential amino acids. Combined with multigrain flakes, seeds, and dried fruits — a premium protein-packed breakfast for active lifestyles.',ingredients:['Quinoa','Multigrain Flakes','Chia Seeds','Flax Seeds','Dried Berries','No Added Sugar'],nutrition:{Calories:'435 kcal',Protein:'14g',Fat:'12g',Carbs:'62g',Fibre:'8g'},weights:['200g','400g','800g']},

  /* ── PANCAKES & MIXES ── */
  blueberrypancake:{id:'blueberrypancake',name:'Blueberry Pancake',category:'Pancakes & Mixes',categoryId:'pancakes',price:249,badge:'Limited 🌿',badgeColor:'#4a2070',bg:'#ede8fb',image:'/static/images/Blueberry Pancake.png',imageBack:'/static/images/Blueberry Pancake Back.png',description:'Light, fluffy pancake bites bursting with real blueberry goodness. Made with wholesome grains and no artificial colours — a breakfast treat you can enjoy anytime.',ingredients:['Whole Wheat Flour','Real Blueberry','Oats','Honey','No Artificial Flavours','Baked Not Fried'],nutrition:{Calories:'380 kcal',Protein:'7g',Fat:'10g',Carbs:'64g',Fibre:'4g'},weights:['200g','400g']},

  chocopancake:{id:'chocopancake',name:'Choco Pancake Mix',category:'Pancakes & Mixes',categoryId:'pancakes',price:249,badge:'Choco Joy 🍫',badgeColor:'#3b1800',bg:'#fbe8d8',image:'/static/images/Choco Pancake Front.png',imageBack:'/static/images/Choco Pancake Back.png',description:'Fluffy chocolate pancakes made wholesome with millet flour and real cocoa. Quick to prepare, rich in flavour, loved by every kid — mornings just got sweeter.',ingredients:['Millet Flour','Cocoa Powder','Jaggery','Oats','Baking Powder','No Artificial Colours'],nutrition:{Calories:'395 kcal',Protein:'8g',Fat:'11g',Carbs:'65g',Fibre:'5g'},weights:['200g','400g']},

  /* ── NOODLES & SOUPS ── */
  milletnoodles:{id:'milletnoodles',name:'Millet Noodles',category:'Noodles & Soups',categoryId:'noodles',price:199,badge:'Quick Cook 🍜',badgeColor:'#0d3d6b',bg:'#e3f2fd',image:'/static/images/noodles front.png',imageBack:'/static/images/Noodles Back.png',description:'The Maggi taste you love, now made with wholesome millet. Quick-cooking noodles free from maida and artificial additives — healthy comfort food for the whole family.',ingredients:['Millet Flour','Rice Flour','Sea Salt','Natural Spices','No Maida','No Artificial Colours'],nutrition:{Calories:'360 kcal',Protein:'9g',Fat:'6g',Carbs:'68g',Fibre:'5g'},weights:['75g','200g','400g']},

  pirandaisoup:{id:'pirandaisoup',name:'Pirandai Soup Mix',category:'Noodles & Soups',categoryId:'noodles',price:249,badge:'Immunity 🌿',badgeColor:'#1a5200',bg:'#e8f5e9',image:'/static/images/Pirandai Soup Front.png',imageBack:'/static/images/Pirandai Soup Back.png',description:'Pirandai (Hadjod) — used for centuries in traditional medicine. This instant soup harnesses its bone-strengthening, immunity-boosting power in a delicious, easy-to-make cup.',ingredients:['Pirandai Powder','Lentils','Spices','Turmeric','Black Pepper','No Preservatives'],nutrition:{Calories:'120 kcal',Protein:'6g',Fat:'2g',Carbs:'18g',Fibre:'4g'},weights:['100g','250g']},

  moringasoup:{id:'moringasoup',name:'Moringa Soup Mix',category:'Noodles & Soups',categoryId:'noodles',price:249,badge:'Superfood 🌱',badgeColor:'#2e5c00',bg:'#f1f8e9',image:'/static/images/Morniga Soup Front.png',imageBack:'/static/images/Morniga Soup Back.png',description:'Moringa — the miracle tree — in a warming, flavourful soup. Packed with iron, vitamins A and C, and antioxidants — the immunity-boosting cup your body craves daily.',ingredients:['Moringa Leaf Powder','Lentils','Coconut Milk Powder','Spices','Turmeric','No Preservatives'],nutrition:{Calories:'115 kcal',Protein:'7g',Fat:'3g',Carbs:'16g',Fibre:'5g'},weights:['100g','250g']},

  mudavattukalsoup:{id:'mudavattukalsoup',name:'Mudavattukal Soup',category:'Noodles & Soups',categoryId:'noodles',price:249,badge:'Traditional 🏺',badgeColor:'#5c3d00',bg:'#fef6e8',image:'/static/images/Mudavattukal Soup Front.png',imageBack:'/static/images/Mudavattukal Soup Back.png',description:'Rooted in South Indian tradition, Mudavattukal is known for its anti-inflammatory properties. This instant mix brings the goodness of heritage herbs to your everyday meal.',ingredients:['Mudavattukal Powder','Lentils','Spices','Turmeric','Cumin','No Artificial Additives'],nutrition:{Calories:'110 kcal',Protein:'5g',Fat:'2g',Carbs:'17g',Fibre:'4g'},weights:['100g','250g']},

  /* ── HEALTH MIXES & STAPLES ── */
  datespowder:{id:'datespowder',name:'Dates Powder',category:'Health Mixes & Staples',categoryId:'health',price:299,badge:'Natural Sweet 🍯',badgeColor:'#5c2d00',bg:'#fef3e2',image:'/static/images/Dates Powder.png',imageBack:'/static/images/Dates Powder trial 2.png',description:"Pure, sun-dried date powder — nature's perfect sweetener. Use in smoothies, baking, porridges and sweets as a healthier alternative to refined sugar. Rich in iron and potassium.",ingredients:['100% Dates','No Added Sugar','No Preservatives','Vegan','Gluten-Free','Natural Processing'],nutrition:{Calories:'280 kcal',Protein:'2g',Fat:'0.5g',Carbs:'68g',Fibre:'8g'},weights:['100g','250g','500g']},
};

/* ══ TOAST ══ */
function showToast(html,duration=3000){
  const container=document.getElementById('toastContainer');
  const t=document.createElement('div');t.className='toast';t.innerHTML=html;
  container.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),420);},duration);
}

/* ══ CART ══ */
let cart=[];
const cartSidebar =document.getElementById('cartSidebar');
const cartOverlay =document.getElementById('cartOverlay');
const cartItemsEl =document.getElementById('cartItems');
const cartEmptyEl =document.getElementById('cartEmpty');
const cartFooterEl=document.getElementById('cartFooter');
const cartTotalEl =document.getElementById('cartTotal');
const cartBadgeEl =document.getElementById('cartBadge');

function openCart(){cartSidebar.classList.add('open');cartOverlay.classList.add('open');document.body.style.overflow='hidden';}
function closeCart(){cartSidebar.classList.remove('open');cartOverlay.classList.remove('open');document.body.style.overflow='';}

document.getElementById('navCartBtn').addEventListener('click',openCart);
document.getElementById('cartClose').addEventListener('click',closeCart);
cartOverlay.addEventListener('click',closeCart);

function addToCart(name,price,image){
  const existing=cart.find(i=>i.name===name);
  if(existing){existing.qty+=1;}else{cart.push({name,price:parseFloat(price),image,qty:1});}
  renderCart();
}
function renderCart(){
  const total=cart.reduce((s,i)=>s+i.qty,0);
  if(total>0){cartBadgeEl.style.display='flex';cartBadgeEl.textContent=total>99?'99+':total;}
  else{cartBadgeEl.style.display='none';}
  cartItemsEl.innerHTML='';
  if(cart.length===0){cartItemsEl.appendChild(cartEmptyEl);cartEmptyEl.style.display='block';cartFooterEl.style.display='none';return;}
  cartEmptyEl.style.display='none';cartFooterEl.style.display='block';
  cart.forEach((item,idx)=>{
    const row=document.createElement('div');row.className='cart-item';
    row.innerHTML=`<img class="cart-item-img" src="${item.image}" alt="${item.name}"><div class="cart-item-body"><div class="cart-item-name">${item.name}</div><div class="cart-item-price">&#8377;${(item.price*item.qty).toFixed(2)}</div><div class="cart-qty"><button class="qty-btn" data-idx="${idx}" data-action="dec">&#8722;</button><span class="qty-num">${item.qty}</span><button class="qty-btn" data-idx="${idx}" data-action="inc">&#43;</button></div></div><button class="cart-item-remove" data-idx="${idx}" aria-label="Remove"><i class="fa-solid fa-xmark"></i></button>`;
    cartItemsEl.appendChild(row);
  });
  cartTotalEl.innerHTML=`&#8377;${cart.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2)}`;
  cartItemsEl.querySelectorAll('.qty-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const idx=+btn.dataset.idx;
      if(btn.dataset.action==='inc'){cart[idx].qty+=1;}else{cart[idx].qty-=1;if(cart[idx].qty<=0)cart.splice(idx,1);}
      renderCart();
    });
  });
  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn=>{
    btn.addEventListener('click',()=>{cart.splice(+btn.dataset.idx,1);renderCart();});
  });
}

/* ══ AUTH ══ */
function getCSRF(){return document.querySelector('meta[name="csrf-token"]')?.content||'';}
let pendingCheckout=false;

const authModal  =document.getElementById('authModal');
const authOverlay=document.getElementById('authOverlay');
function openAuth(tab){authModal.classList.add('open');authOverlay.classList.add('open');document.body.style.overflow='hidden';if(tab)switchTab(tab);}
function closeAuth(){authModal.classList.remove('open');authOverlay.classList.remove('open');document.body.style.overflow='';}
function switchTab(tab){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.getElementById('loginForm').style.display   =tab==='login'   ?'block':'none';
  document.getElementById('registerForm').style.display=tab==='register'?'block':'none';
}
const navLoginBtn=document.getElementById('navLoginBtn');
const navSignupBtn=document.getElementById('navSignupBtn');
if(navLoginBtn)navLoginBtn.addEventListener('click',()=>openAuth('login'));
if(navSignupBtn)navSignupBtn.addEventListener('click',()=>openAuth('register'));

/* Profile dropdown (server-rendered logged-in state) */
(function(){
  const wrap=document.getElementById('navProfileWrap');
  if(!wrap)return;
  const btn=document.getElementById('navProfileBtn');
  const logoutBtn=document.getElementById('navLogoutBtn');
  btn.addEventListener('click',e=>{e.stopPropagation();wrap.classList.toggle('open');});
  document.addEventListener('click',()=>wrap.classList.remove('open'));
  wrap.querySelector('.nav-profile-drop').addEventListener('click',e=>e.stopPropagation());
  if(logoutBtn)logoutBtn.addEventListener('click',async()=>{
    await fetch('/api/logout/',{method:'POST',headers:{'X-CSRFToken':getCSRF()}});
    window.location.reload();
  });
})();
document.getElementById('authClose').addEventListener('click',closeAuth);
authOverlay.addEventListener('click',closeAuth);
document.querySelectorAll('.auth-tab').forEach(t=>t.addEventListener('click',()=>switchTab(t.dataset.tab)));
document.querySelectorAll('.switch-link').forEach(l=>l.addEventListener('click',e=>{e.preventDefault();switchTab(l.dataset.switch);}));

function updateNavAfterLogin(name){
  const loginBtn=document.getElementById('navLoginBtn');
  const signupBtn=document.getElementById('navSignupBtn');
  if(loginBtn)loginBtn.style.display='none';
  if(signupBtn)signupBtn.style.display='none';
  if(!document.getElementById('navProfileWrap')){
    const navActions=document.querySelector('.nav-actions');
    if(navActions){
      const initial=name.charAt(0).toUpperCase();
      const first=name.split(' ')[0];
      const wrap=document.createElement('div');
      wrap.id='navProfileWrap';wrap.className='nav-profile-wrap';
      wrap.innerHTML=`<button class="nav-profile-btn" id="navProfileBtn"><span class="nav-profile-avatar">${initial}</span><span class="nav-profile-name">${first}</span><i class="fa-solid fa-chevron-down nav-profile-caret"></i></button><div class="nav-profile-drop"><div class="npd-header"><div class="npd-avatar-lg">${initial}</div><div class="npd-info"><div class="npd-name">${name}</div></div></div><div class="npd-divider"></div><a href="/orders/" class="npd-item"><i class="fa-solid fa-bag-shopping"></i> My Orders</a><div class="npd-divider"></div><button class="npd-item npd-logout" id="_dynLogout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button></div>`;
      const ham=document.getElementById('navHamburger');
      if(ham)navActions.insertBefore(wrap,ham);else navActions.appendChild(wrap);
      document.getElementById('navProfileBtn').addEventListener('click',e=>{e.stopPropagation();wrap.classList.toggle('open');});
      wrap.querySelector('.nav-profile-drop').addEventListener('click',e=>e.stopPropagation());
      document.addEventListener('click',()=>wrap.classList.remove('open'));
      document.getElementById('_dynLogout').addEventListener('click',async()=>{
        await fetch('/api/logout/',{method:'POST',headers:{'X-CSRFToken':getCSRF()}});
        window.location.reload();
      });
    }
  }
  const mobLogin=document.getElementById('mobLoginBtn');
  const mobSignup=document.getElementById('mobSignupBtn');
  if(mobLogin)mobLogin.style.display='none';
  if(mobSignup)mobSignup.style.display='none';
}

function onAuthSuccess(name){
  window.MALOLA_AUTH={authenticated:true,name};
  updateNavAfterLogin(name);
  closeAuth();
  showToast(`<i class="fa-solid fa-circle-check"></i> Welcome, ${name.split(' ')[0]}! 🎉`);
  if(pendingCheckout){pendingCheckout=false;setTimeout(buildCheckoutModal,300);}
}

async function submitAuth(url,payload,btn,errEl){
  const orig=btn.innerHTML;btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';errEl.textContent='';
  try{
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','X-CSRFToken':getCSRF()},body:JSON.stringify(payload)});
    const d=await r.json();
    if(d.success){onAuthSuccess(d.name);}else{errEl.textContent=d.error||'Something went wrong';}
  }catch(err){errEl.textContent='Connection error. Try again.';}
  btn.disabled=false;btn.innerHTML=orig;
}

(function(){
  const lf=document.getElementById('loginForm');
  const le=Object.assign(document.createElement('p'),{style:'color:#c62828;font-size:.8rem;font-weight:700;margin:8px 0 0;text-align:center;min-height:18px'});
  lf.appendChild(le);
  lf.addEventListener('submit',e=>{
    e.preventDefault();
    const email=lf.querySelector('input[type="email"]').value.trim();
    const password=lf.querySelector('input[type="password"]').value;
    if(!email){le.textContent='Please enter your email address';return;}
    if(!password){le.textContent='Please enter your password';return;}
    submitAuth('/api/login/',{email,password},lf.querySelector('.auth-submit'),le);
  });

  const rf=document.getElementById('registerForm');
  const re=Object.assign(document.createElement('p'),{style:'color:#c62828;font-size:.8rem;font-weight:700;margin:8px 0 0;text-align:center;min-height:18px'});
  rf.appendChild(re);
  rf.addEventListener('submit',e=>{
    e.preventDefault();
    const inputs=rf.querySelectorAll('input');
    const name=inputs[0].value.trim();
    const email=inputs[1].value.trim();
    const password=inputs[2].value;
    if(!name){re.textContent='Please enter your full name';return;}
    if(!email){re.textContent='Please enter your email address';return;}
    if(!password||password.length<6){re.textContent='Password must be at least 6 characters';return;}
    submitAuth('/api/register/',{name,email,password},rf.querySelector('.auth-submit'),re);
  });
})();

/* ══ FOOTER FORM ══ */
const footerFormEl=document.getElementById('footerForm');
if(footerFormEl)footerFormEl.addEventListener('submit',e=>{e.preventDefault();showToast('<i class="fa-solid fa-envelope"></i> You\'re subscribed!');});

/* ══ NAV SCROLL ══ */
const mainNav=document.getElementById('mainNav');
/* Product/shop pages always have a light background — keep nav scrolled at all times */
mainNav.classList.add('nav-scrolled');
window.addEventListener('scroll',()=>{mainNav.classList.add('nav-scrolled');},{passive:true});

/* ══ MOBILE HAMBURGER MENU ══ */
(function(){
  const ham=document.getElementById('navHamburger');
  const mob=document.getElementById('mobMenu');
  const overlay=document.getElementById('mobMenuOverlay');
  const close=document.getElementById('mobMenuClose');
  if(!ham||!mob)return;
  function openMob(){mob.classList.add('open');overlay.classList.add('open');ham.classList.add('open');document.body.style.overflow='hidden';}
  function closeMob(){mob.classList.remove('open');overlay.classList.remove('open');ham.classList.remove('open');document.body.style.overflow='';}
  ham.addEventListener('click',openMob);
  close.addEventListener('click',closeMob);
  overlay.addEventListener('click',closeMob);
  const mobLoginBtn=document.getElementById('mobLoginBtn');
  const mobSignupBtn=document.getElementById('mobSignupBtn');
  const mobLogoutBtn=document.getElementById('mobLogoutBtn');
  if(mobLoginBtn)mobLoginBtn.addEventListener('click',()=>{closeMob();openAuth('login');});
  if(mobSignupBtn)mobSignupBtn.addEventListener('click',()=>{closeMob();openAuth('register');});
  if(mobLogoutBtn)mobLogoutBtn.addEventListener('click',async()=>{await fetch('/api/logout/',{method:'POST',headers:{'X-CSRFToken':getCSRF()}});window.location.reload();});
  document.querySelectorAll('.mob-nav-links a').forEach(a=>a.addEventListener('click',closeMob));
})();

/* ══ CHECKOUT ══ */
let _coSaved=null;
const _esc=s=>(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const _iStyle='width:100%;padding:13px 16px;border:2px solid rgba(21,101,192,.2);border-radius:14px;font-size:.9rem;font-family:\'Nunito\',sans-serif;font-weight:700;outline:none;box-sizing:border-box;transition:border-color .2s';
const _bStyle='width:100%;height:56px;background:var(--yellow);border:none;border-radius:999px;font-family:\'Fredoka One\',cursive;font-size:1.15rem;color:var(--kids-dark);cursor:pointer;box-shadow:0 8px 28px rgba(254,207,10,.45)';

async function _coSubmit(name,phone,address){
  const btn=document.getElementById('coSubmit')||document.getElementById('coConfirmBtn');
  if(btn){btn.disabled=true;btn.innerHTML='Proceeding… <i class="fa-solid fa-spinner fa-spin"></i>';}
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const payload={name,phone,address,items:cart.map(i=>({name:i.name,price:i.price,qty:i.qty,image:i.image})),total};
  try{
    const resp=await fetch('/api/place-order/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await resp.json();
    if(data.success){cart=[];renderCart();closeCart();closeCheckoutModal();window.location.href=data.redirect;}
    else throw new Error(data.error||'Unknown error');
  }catch(err){
    if(btn){btn.disabled=false;btn.innerHTML='Proceed to Payment <i class="fa-solid fa-arrow-right"></i>';}
    showToast('<i class="fa-solid fa-circle-exclamation"></i> '+err.message,3000);
  }
}

function _coRenderSaved(){
  const a=_coSaved;
  document.getElementById('coAddrSection').innerHTML=`
    <div>
      <div style="font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:rgba(13,43,107,.4);margin-bottom:10px;display:flex;align-items:center;gap:6px">
        <i class="fa-solid fa-location-dot" style="color:#1565C0"></i> Saved Delivery Address
      </div>
      <div style="border:2px solid rgba(21,101,192,.15);border-radius:18px;padding:16px 18px;background:#f7f9ff;margin-bottom:12px">
        <div style="font-weight:900;font-size:.92rem;color:#0d2b6b;margin-bottom:3px">${_esc(a.name)}</div>
        <div style="font-size:.78rem;color:rgba(13,43,107,.45);font-weight:700;margin-bottom:8px">${_esc(a.phone)}</div>
        <div style="font-size:.82rem;color:rgba(13,43,107,.6);font-weight:600;line-height:1.55;margin-bottom:14px">${(()=>{const p=_coParseAddress(a.address);const ad=[p.addr1,p.area,p.landmark?'Near: '+p.landmark:'',`${p.city}${p.pincode?' - '+p.pincode:''}${p.state?', '+p.state:''}`].filter(Boolean).join(', ');return _esc(ad||a.address);})()}</div>
        <button id="coDeliverBtn" style="width:100%;height:46px;background:#0d2b6b;border:none;border-radius:999px;color:#FECF0A;font-family:'Fredoka One',cursive;font-size:.95rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
          <i class="fa-solid fa-check"></i> Deliver Here
        </button>
      </div>
      <div style="text-align:center">
        <button id="coNewAddrBtn" style="background:transparent;border:none;font-size:.8rem;font-weight:800;color:rgba(13,43,107,.4);cursor:pointer;text-decoration:underline;padding:4px">
          + Use a different address
        </button>
      </div>
    </div>`;
  document.getElementById('coDeliverBtn').addEventListener('click',_coConfirm);
  document.getElementById('coNewAddrBtn').addEventListener('click',()=>_coRenderForm(false));
}

function _coConfirm(){
  const a=_coSaved;
  const parsed=_coParseAddress(a.address);
  const addrDisplay=[parsed.addr1,parsed.area,parsed.landmark?'Near: '+parsed.landmark:'',`${parsed.city}${parsed.pincode?' - '+parsed.pincode:''}${parsed.state?', '+parsed.state:''}`].filter(Boolean).join(', ');
  const typeIcon={Home:'🏠',Work:'🏢',Other:'📍'}[parsed.addrType]||'📍';
  document.getElementById('coAddrSection').innerHTML=`
    <div style="background:#f0f9f0;border:1.5px solid rgba(46,125,50,.25);border-radius:16px;padding:14px 18px;margin-bottom:14px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
        <div style="flex:1;min-width:0">
          <div style="font-size:.64rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em;color:#2e7d32;margin-bottom:6px;display:flex;align-items:center;gap:6px">
            <i class="fa-solid fa-circle-check"></i> Delivering to &nbsp;<span style="background:#d4edda;color:#155724;border-radius:999px;padding:1px 8px">${typeIcon} ${_esc(parsed.addrType||'Home')}</span>
          </div>
          <div style="font-weight:900;font-size:.9rem;color:#0d2b6b;margin-bottom:3px">${_esc(a.name)} &nbsp;·&nbsp; <span style="font-weight:700">${_esc(a.phone)}</span></div>
          <div style="font-size:.78rem;color:rgba(13,43,107,.55);font-weight:600;line-height:1.65;margin-top:3px">${_esc(addrDisplay)}</div>
        </div>
        <button id="coChangeBtn" style="background:#fff;border:1.5px solid rgba(13,43,107,.15);border-radius:10px;padding:6px 12px;font-size:.72rem;font-weight:800;color:rgba(13,43,107,.5);cursor:pointer;white-space:nowrap;flex-shrink:0">
          ✏ Change
        </button>
      </div>
    </div>
    <button id="coConfirmBtn" style="${_bStyle}">
      Proceed to Payment &nbsp;<i class="fa-solid fa-arrow-right"></i>
    </button>`;
  document.getElementById('coChangeBtn').addEventListener('click',()=>_coRenderForm(true));
  document.getElementById('coConfirmBtn').addEventListener('click',()=>_coSubmit(a.name,a.phone,a.address));
}

function _coParseAddress(raw){
  /* Parse a stored structured address back into components */
  const def={addr1:'',area:'',city:'',pincode:'',state:'',landmark:'',addrType:'Home'};
  if(!raw)return def;
  const lines=raw.split('\n').map(l=>l.trim()).filter(Boolean);
  if(lines.length<2)return{...def,addr1:raw};
  def.addr1=lines[0]||'';
  def.area=lines[1]||'';
  /* third line may be landmark or city */
  let idx=2;
  if(lines[idx]&&lines[idx].startsWith('Landmark:')){def.landmark=lines[idx].replace('Landmark:','').trim();idx++;}
  const cityLine=lines[idx]||'';
  /* format: "City - 600001, Tamil Nadu" */
  const cm=cityLine.match(/^(.+?)\s*-\s*(\d{4,6}),\s*(.+)$/);
  if(cm){def.city=cm[1].trim();def.pincode=cm[2].trim();def.state=cm[3].trim();}else{def.city=cityLine;}
  const typeLine=lines[idx+1]||'';
  def.addrType=typeLine.replace(/\[|\]/g,'').trim()||'Home';
  return def;
}

function _coFormatAddress(addr1,area,city,pincode,state,landmark,addrType){
  const parts=[addr1,area];
  if(landmark)parts.push('Landmark: '+landmark);
  parts.push(`${city} - ${pincode}, ${state}`);
  parts.push(`[${addrType||'Home'}]`);
  return parts.filter(Boolean).join('\n');
}

function _coRenderForm(prefill){
  const n=prefill&&_coSaved?_coSaved.name:'';
  const ph=prefill&&_coSaved?_coSaved.phone:'';
  const parsed=prefill&&_coSaved?_coParseAddress(_coSaved.address):{addr1:'',area:'',city:'',pincode:'',state:'',landmark:'',addrType:'Home'};

  const iS='width:100%;height:46px;border:2px solid rgba(21,101,192,.12);border-radius:12px;padding:0 14px;font-family:\'Nunito\',sans-serif;font-size:.88rem;font-weight:700;color:#0d2b6b;background:#fff;outline:none;box-sizing:border-box;transition:border-color .2s,box-shadow .2s';
  const iF="this.style.borderColor='#FECF0A';this.style.boxShadow='0 0 0 3px rgba(254,207,10,.15)'";
  const iB="this.style.borderColor='rgba(21,101,192,.12)';this.style.boxShadow='none'";
  const row2='display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px';
  const secH='font-size:.65rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:rgba(13,43,107,.38);margin:16px 0 10px;display:flex;align-items:center;gap:6px';

  document.getElementById('coAddrSection').innerHTML=`
    ${_coSaved&&!prefill?`<div style="margin-bottom:10px"><button id="coBackSaved" style="background:transparent;border:none;font-size:.78rem;font-weight:800;color:rgba(13,43,107,.4);cursor:pointer;display:flex;align-items:center;gap:5px"><i class="fa-solid fa-arrow-left"></i> Use saved address</button></div>`:''}
    <form id="coForm" novalidate>

      <div style="${secH}"><i class="fa-solid fa-user" style="color:#1565C0"></i> Contact Information</div>

      <div style="${row2}">
        <input type="text" id="coName" value="${_esc(n)}" placeholder="Full Name *" required style="${iS}" onfocus="${iF}" onblur="${iB}">
        <input type="tel" id="coPhone" value="${_esc(ph)}" placeholder="Mobile Number *" required maxlength="10" pattern="[6-9][0-9]{9}" style="${iS}" onfocus="${iF}" onblur="${iB}">
      </div>

      <div style="${secH}"><i class="fa-solid fa-location-dot" style="color:#1565C0"></i> Delivery Address</div>

      <div style="${row2}">
        <input type="text" id="coPincode" value="${_esc(parsed.pincode)}" placeholder="Pincode *" required maxlength="6" pattern="[0-9]{6}" style="${iS}" onfocus="${iF}" onblur="${iB}">
        <input type="text" id="coState" value="${_esc(parsed.state)}" placeholder="State *" required style="${iS}" onfocus="${iF}" onblur="${iB}">
      </div>
      <div style="margin-bottom:10px">
        <input type="text" id="coAddr1" value="${_esc(parsed.addr1)}" placeholder="House/Flat No., Building, Society *" required style="${iS}" onfocus="${iF}" onblur="${iB}">
      </div>
      <div style="margin-bottom:10px">
        <input type="text" id="coArea" value="${_esc(parsed.area)}" placeholder="Area / Colony / Street / Sector *" required style="${iS}" onfocus="${iF}" onblur="${iB}">
      </div>
      <div style="${row2}">
        <input type="text" id="coCity" value="${_esc(parsed.city)}" placeholder="City / District *" required style="${iS}" onfocus="${iF}" onblur="${iB}">
        <input type="text" id="coLandmark" value="${_esc(parsed.landmark)}" placeholder="Landmark (optional)" style="${iS}" onfocus="${iF}" onblur="${iB}">
      </div>

      <div style="${secH}"><i class="fa-solid fa-tag" style="color:#1565C0"></i> Save Address As</div>
      <div style="display:flex;gap:10px;margin-bottom:18px">
        ${['Home','Work','Other'].map(t=>`
          <label style="flex:1;border:2px solid rgba(21,101,192,.14);border-radius:12px;padding:10px 8px;cursor:pointer;text-align:center;font-size:.78rem;font-weight:800;color:#0d2b6b;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px" id="coTypeLabel${t}">
            <input type="radio" name="coAddrType" value="${t}" ${parsed.addrType===t?'checked':''} style="display:none" onchange="document.querySelectorAll('[id^=coTypeLabel]').forEach(l=>l.style.cssText=l.style.cssText.replace('background:#fffde7;border-color:#FECF0A',''));this.parentElement.style.background='#fffde7';this.parentElement.style.borderColor='#FECF0A'">
            ${{Home:'🏠 Home',Work:'🏢 Work',Other:'📍 Other'}[t]}
          </label>`).join('')}
      </div>

      <div id="coFormError" style="display:none;background:#fce8e6;border:1.5px solid #e53935;border-radius:10px;padding:10px 14px;font-size:.8rem;font-weight:700;color:#b71c1c;margin-bottom:12px;display:flex;align-items:center;gap:8px">
        <i class="fa-solid fa-circle-exclamation"></i><span id="coFormErrorMsg"></span>
      </div>

      <button type="submit" id="coSubmit" style="${_bStyle}">
        Proceed to Payment &nbsp;<i class="fa-solid fa-arrow-right"></i>
      </button>
    </form>`;

  /* Highlight the pre-selected address type */
  const checkedType=document.querySelector('[name="coAddrType"]:checked');
  if(checkedType){checkedType.parentElement.style.background='#fffde7';checkedType.parentElement.style.borderColor='#FECF0A';}

  const backBtn=document.getElementById('coBackSaved');
  if(backBtn)backBtn.addEventListener('click',_coRenderSaved);

  document.getElementById('coForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const name   =document.getElementById('coName').value.trim();
    const phone  =document.getElementById('coPhone').value.trim();
    const pincode=document.getElementById('coPincode').value.trim();
    const state  =document.getElementById('coState').value.trim();
    const addr1  =document.getElementById('coAddr1').value.trim();
    const area   =document.getElementById('coArea').value.trim();
    const city   =document.getElementById('coCity').value.trim();
    const landmark=document.getElementById('coLandmark').value.trim();
    const addrType=(document.querySelector('[name="coAddrType"]:checked')||{}).value||'Home';

    const errEl=document.getElementById('coFormError');
    const errMsg=document.getElementById('coFormErrorMsg');
    function showErr(msg){errEl.style.display='flex';errMsg.textContent=msg;errEl.scrollIntoView({behavior:'smooth',block:'nearest'});}

    if(!name){showErr('Please enter your full name.');return;}
    if(!/^[6-9][0-9]{9}$/.test(phone)){showErr('Enter a valid 10-digit Indian mobile number.');return;}
    if(!/^[0-9]{6}$/.test(pincode)){showErr('Enter a valid 6-digit pincode.');return;}
    if(!state){showErr('Please enter your state.');return;}
    if(!addr1){showErr('Please enter your house/flat number and building.');return;}
    if(!area){showErr('Please enter your area/colony/street.');return;}
    if(!city){showErr('Please enter your city/district.');return;}

    errEl.style.display='none';
    const address=_coFormatAddress(addr1,area,city,pincode,state,landmark,addrType);
    await _coSubmit(name,phone,address);
  });
}

async function buildCheckoutModal(){
  const existing=document.getElementById('checkoutModal');if(existing)existing.remove();
  if(cart.length===0){showToast('<i class="fa-solid fa-basket-shopping"></i> Your cart is empty!');return;}
  _coSaved=null;
  const itemsHtml=cart.map(i=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px dashed rgba(21,101,192,.15)"><span style="font-weight:700;font-size:.88rem;color:var(--kids-dark);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:12px">${_esc(i.name)} <span style="color:rgba(13,43,107,.4)">×${i.qty}</span></span><span style="font-family:'Fredoka One',cursive;font-size:1rem;color:var(--aqua2);flex-shrink:0">&#8377;${(i.price*i.qty).toFixed(0)}</span></div>`).join('');
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const modal=document.createElement('div');modal.id='checkoutModal';
  modal.style.cssText='position:fixed;inset:0;z-index:3500;display:flex;align-items:center;justify-content:center;background:rgba(10,31,94,.55);backdrop-filter:blur(6px);padding:16px';
  modal.innerHTML=`<div style="background:#fff;border-radius:28px;padding:32px 28px;max-width:460px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,.3)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:22px"><h2 style="font-family:'Fredoka One',cursive;font-size:1.7rem;color:var(--kids-dark);margin:0"><i class="fa-solid fa-basket-shopping" style="color:var(--aqua2);margin-right:10px"></i>Your Order</h2><button id="coClose" style="background:rgba(13,43,107,.08);border:none;width:36px;height:36px;border-radius:50%;font-size:1.1rem;cursor:pointer;color:var(--kids-dark);display:flex;align-items:center;justify-content:center">&times;</button></div><div style="margin-bottom:18px;max-height:180px;overflow-y:auto">${itemsHtml}</div><div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;margin-bottom:22px;border-top:2.5px solid var(--yellow)"><span style="font-weight:800;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:rgba(13,43,107,.5)">Total</span><span style="font-family:'Fredoka One',cursive;font-size:2rem;color:var(--kids-dark)">&#8377;${total.toFixed(0)}</span></div><div id="coAddrSection"><div style="text-align:center;padding:24px;color:rgba(13,43,107,.35)"><i class="fa-solid fa-spinner fa-spin"></i></div></div></div>`;
  document.body.appendChild(modal);document.body.style.overflow='hidden';
  document.getElementById('coClose').addEventListener('click',closeCheckoutModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeCheckoutModal();});
  try{
    const resp=await fetch('/api/saved-address/');
    const data=await resp.json();
    if(data.found){_coSaved=data;_coRenderSaved();}else{_coRenderForm(false);}
  }catch{_coRenderForm(false);}
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

/* ══ MEGA MENU NAVIGATION ══ */
document.querySelectorAll('.mega-item[data-pdp]').forEach(item=>{
  item.addEventListener('click',()=>{window.location.href='/product/?id='+item.dataset.pdp;});
});

/* ══ RENDER PRODUCT DETAIL PAGE (PDP only) ══ */
(function(){
  if(!document.querySelector('.pdp-main'))return;

  const params =new URLSearchParams(window.location.search);
  const pid    =params.get('id');
  /* First check hardcoded catalog; fall back to a DB product injected by Django */
  const product=productCatalog[pid]||(window.DB_PRODUCT_DATA&&window.DB_PRODUCT_DATA.id===pid?window.DB_PRODUCT_DATA:null);
  if(!product){window.location.href='/#kids-shop';return;}

  document.title=product.name+' — Malola';
  document.getElementById('pdpBcName').textContent=product.name;

  const img=document.getElementById('pdpImg');
  img.src=product.image;img.alt=product.name;

  const badge=document.getElementById('pdpImgBadge');
  badge.textContent=product.badge;badge.style.background=product.badgeColor;

  const thumbsRow=document.getElementById('pdpThumbsRow');
  const thumbImgs=[product.image];
  if(product.imageBack&&product.imageBack!==product.image)thumbImgs.push(product.imageBack);
  if(product.galleryImages&&product.galleryImages.length){
    product.galleryImages.forEach(u=>{if(!thumbImgs.includes(u))thumbImgs.push(u);});
  }
  thumbImgs.forEach((src,i)=>{
    const d=document.createElement('div');
    d.className='pdp-thumb-item'+(i===0?' active':'');
    d.innerHTML=`<img src="${src}" alt="${product.name}">`;
    d.addEventListener('click',()=>{
      img.src=src;
      document.querySelectorAll('.pdp-thumb-item').forEach(t=>t.classList.remove('active'));
      d.classList.add('active');
    });
    thumbsRow.appendChild(d);
  });

  document.getElementById('pdpCat').textContent =product.category;
  document.getElementById('pdpName').textContent=product.name;
  if(product.reviewCount!==undefined){
    const starsEl=document.querySelector('.pdp-info-stars .stars');
    const revEl  =document.querySelector('.pdp-info-stars .rev-count');
    if(starsEl){const r=Math.round(product.rating||4.5);starsEl.textContent='★'.repeat(r)+'☆'.repeat(5-r);}    
    if(revEl&&product.reviewCount>0)revEl.textContent='('+product.reviewCount+' reviews)';
  }
  const priceEl=document.getElementById('pdpPrice');
  const baseGrams=parseInt(product.weights[0]);
  let currentPrice=product.price;

  function _renderPrice(p){
    const mrp=product.discountPrice;
    if(mrp&&mrp>p){
      const pct=Math.round((mrp-p)/mrp*100);
      priceEl.innerHTML='&#8377;'+p+'<span class="pdp-mrp">&#8377;'+mrp+'</span><span class="pdp-savings">'+pct+'% off</span>';
    }else{
      priceEl.innerHTML='&#8377;'+p;
    }
  }
  _renderPrice(currentPrice);

  const weightsEl=document.getElementById('pdpWeights');
  weightsEl.innerHTML=product.weights.map((w,i)=>`<button class="pdp-w-btn${i===0?' active':''}">${w}</button>`).join('');
  weightsEl.querySelectorAll('.pdp-w-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      weightsEl.querySelectorAll('.pdp-w-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const selectedGrams=parseInt(btn.textContent);
      currentPrice=Math.round(product.price*selectedGrams/baseGrams);
      _renderPrice(currentPrice);
    });
  });

  document.getElementById('pdpDesc').textContent=product.description;
  const ingHtml=(product.ingredients||[]).map(i=>`<li>${i}</li>`).join('');
  const ingSection=document.getElementById('pdpIng');
  if(ingHtml){ingSection.innerHTML=ingHtml;}else{ingSection.closest('.pdp-info-sec')&&(ingSection.closest('.pdp-info-sec').style.display='none');}
  const nutEntries=Object.entries(product.nutrition||{});
  const nutSection=document.getElementById('pdpNut');
  if(nutEntries.length){nutSection.innerHTML=nutEntries.map(([k,v])=>`<div class="pdp-nut-cell"><div class="pdp-nut-val">${v}</div><div class="pdp-nut-lbl">${k}</div></div>`).join('');}else{nutSection.closest('.pdp-info-sec')&&(nutSection.closest('.pdp-info-sec').style.display='none');}

  let qty=1;
  const qtyEl=document.getElementById('pdpQtyVal');
  document.getElementById('pdpMinus').addEventListener('click',()=>{if(qty>1){qty--;qtyEl.textContent=qty;}});
  document.getElementById('pdpPlus').addEventListener('click',()=>{qty++;qtyEl.textContent=qty;});
  document.getElementById('pdpAddCart').addEventListener('click',()=>{
    const selectedWeight=weightsEl.querySelector('.pdp-w-btn.active').textContent;
    for(let i=0;i<qty;i++)addToCart(product.name+' ('+selectedWeight+')',currentPrice,product.image);
    openCart();
    showToast('<i class="fa-solid fa-basket-shopping"></i> '+product.name+' added to cart!');
  });

  const related=Object.values(productCatalog).filter(p=>p.id!==product.id).slice(0,4);
  document.getElementById('pdpRelated').innerHTML=related.map(p=>`
    <div class="pdp-rel-card" onclick="window.location.href='/product/?id=${p.id}'">
      <div class="pdp-rel-img-wrap" style="background:${p.bg}"><img src="${p.image}" alt="${p.name}" class="pdp-rel-img"></div>
      <div class="pdp-rel-body">
        <div class="pdp-rel-cat">${p.category}</div>
        <div class="pdp-rel-name">${p.name}</div>
        <div class="pdp-rel-footer"><div class="pdp-rel-price">&#8377;${p.price}</div><button class="pdp-rel-btn">View</button></div>
      </div>
    </div>`).join('');

  /* ── Brand / SKU / short desc row ── */
  const metaRowEl=document.getElementById('pdpMetaRow');
  if(metaRowEl){
    const parts=[];
    if(product.brand)parts.push('<span class="pdp-brand"><i class="fa-solid fa-building"></i> '+_esc(product.brand)+'</span>');
    if(product.sku)parts.push('<span class="pdp-sku">SKU: '+_esc(product.sku)+'</span>');
    if(parts.length)metaRowEl.innerHTML='<div class="pdp-meta-chips">'+parts.join('')+'</div>';
    if(product.shortDesc)metaRowEl.innerHTML+='<p class="pdp-shortdesc">'+_esc(product.shortDesc)+'</p>';
  }

  /* ── Health Benefits & Certifications ── */
  const healthCertsEl=document.getElementById('pdpHealthCerts');
  if(healthCertsEl){
    let html='';
    if(product.healthBenefits){
      const lines=product.healthBenefits.split('\n').map(l=>l.trim()).filter(Boolean);
      if(lines.length){
        html+='<div class="pdp-info-sec"><div class="pdp-sec-label"><i class="fa-solid fa-heart-pulse"></i> Health Benefits</div><ul class="pdp-benefits-list">'+lines.map(l=>'<li>'+_esc(l)+'</li>').join('')+'</ul></div>';
      }
    }
    const c=product.certifications||{};
    const certs=[];
    if(c.organic)certs.push('<span class="pdp-cert-badge cert-organic"><i class="fa-solid fa-leaf"></i> Organic</span>');
    if(c.nonGmo) certs.push('<span class="pdp-cert-badge cert-ngmo"><i class="fa-solid fa-dna"></i> Non-GMO</span>');
    if(c.vegan)  certs.push('<span class="pdp-cert-badge cert-vegan"><i class="fa-solid fa-seedling"></i> Vegan</span>');
    if(c.halal)  certs.push('<span class="pdp-cert-badge cert-halal"><i class="fa-solid fa-moon"></i> Halal</span>');
    if(c.iso)    certs.push('<span class="pdp-cert-badge cert-iso"><i class="fa-solid fa-award"></i> ISO</span>');
    if(certs.length){
      html+='<div class="pdp-info-sec"><div class="pdp-sec-label"><i class="fa-solid fa-certificate"></i> Certifications</div><div class="pdp-cert-row">'+certs.join('')+'</div></div>';
    }
    healthCertsEl.innerHTML=html;
  }

  /* ── Product Details table ── */
  const detailsEl=document.getElementById('pdpDetailsSection');
  if(detailsEl&&product.productInfo){
    const pi=product.productInfo;
    const rows=[];
    if(pi.packageSize)       rows.push(['Package Size',pi.packageSize]);
    if(pi.countryOfOrigin)   rows.push(['Country of Origin',pi.countryOfOrigin]);
    if(pi.shelfLife)         rows.push(['Shelf Life',pi.shelfLife]);
    if(pi.storageInstructions)rows.push(['Storage Instructions',pi.storageInstructions]);
    if(pi.manufacturerDetails)rows.push(['Manufacturer',pi.manufacturerDetails]);
    if(rows.length){
      detailsEl.innerHTML='<div class="pdp-section"><h3 class="pdp-section-title"><i class="fa-solid fa-list-ul"></i> Product Details</h3><table class="pdp-details-table">'+rows.map(([k,v])=>'<tr><th>'+k+'</th><td>'+_esc(v)+'</td></tr>').join('')+'</table></div>';
    }
  }

  /* ── Recipe section ── */
  const recipeEl=document.getElementById('pdpRecipeSection');
  if(recipeEl&&product.recipe){
    const r=product.recipe;
    const metaItems=[];
    if(r.prepTime)metaItems.push('<span><i class="fa-regular fa-clock"></i> Prep: '+_esc(r.prepTime)+'</span>');
    if(r.cookTime)metaItems.push('<span><i class="fa-solid fa-fire"></i> Cook: '+_esc(r.cookTime)+'</span>');
    if(r.servings)metaItems.push('<span><i class="fa-solid fa-utensils"></i> Serves '+_esc(r.servings)+'</span>');
    const ingLines=r.ingredients?r.ingredients.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>'<li>'+_esc(l)+'</li>').join(''):'';
    const instLines=r.instructions?r.instructions.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>'<li>'+_esc(l)+'</li>').join(''):'';
    const colsHtml=(ingLines||instLines)?'<div class="pdp-recipe-cols">'+(ingLines?'<div class="pdp-recipe-col"><h4>Ingredients</h4><ul>'+ingLines+'</ul></div>':'')+(instLines?'<div class="pdp-recipe-col"><h4>Instructions</h4><ol>'+instLines+'</ol></div>':'')+'</div>':'';
    const imgHtml=r.image?'<div class="pdp-recipe-img-wrap"><img src="'+r.image+'" alt="'+_esc(r.name)+'"></div>':'';
    const vidHtml=r.videoUrl?'<div style="margin-top:18px"><a href="'+_esc(r.videoUrl)+'" target="_blank" rel="noopener" class="pdp-recipe-video-link"><i class="fa-brands fa-youtube"></i> Watch Recipe Video</a></div>':'';
    recipeEl.innerHTML='<div class="pdp-section"><h3 class="pdp-section-title"><i class="fa-solid fa-utensils"></i> '+_esc(r.name)+'</h3>'+(metaItems.length?'<div class="pdp-recipe-meta">'+metaItems.join('')+'</div>':'')+'<div class="pdp-recipe-body">'+imgHtml+colsHtml+vidHtml+'</div></div>';
  }
})();

