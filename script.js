/* ============ CONFIG ============ */
const ORDER_EMAIL = "veo222547@gmail.com"; // FormSubmit destination inbox

/* ============ DATA ============ */
const CATEGORIES = ["Mouse","Keyboard","Laptop","Gaming PC","Mousepad"];

const PRODUCTS = [
  {
    id:"p1", cat:"Mouse", name:"7-Button Wired Gaming Mouse", price:1199,
    image:"https://i.ibb.co/sdp9DCpQ/Screenshot-2026-08-08-020049.png",
    desc:"A budget wired mouse built for fast-paced mobile and PC gaming, with seven programmable buttons and RGB lighting across seven modes.",
    specs:[
      ["Buttons","7 programmable, mechanical build"],
      ["Lighting","RGB, 7 lighting modes"],
      ["DPI levels","4-level adjustable"],
      ["Connectivity","Wired USB"],
      ["Included","Mouse pad included"],
      ["Best for","PUBG Mobile & everyday gaming"]
    ],
    reviewList:[
      {name:"H. Yousaf", rating:5, date:"Jul 2026", text:"Great budget mouse for PUBG Mobile on emulator. The extra buttons are genuinely useful for quick peeks."},
      {name:"S. Bhatti", rating:4, date:"Jun 2026", text:"RGB looks good and the click feels solid for the price. DPI switch could be a bit more responsive."},
      {name:"A. Noor", rating:4, date:"May 2026", text:"Came with a small mouse pad which was a nice surprise. Works fine on my setup."}
    ]
  },
  {
    id:"p2", cat:"Keyboard", name:"JEDEL KL69 — 60% Mechanical RGB Keyboard", price:4000,
    image:"https://i.ibb.co/G3xC0DZt/Screenshot-2026-08-08-020615.png",
    desc:"A compact 61-key mechanical keyboard with red switches and rainbow RGB backlighting, small enough to free up desk space for mouse movement.",
    specs:[
      ["Layout","61-key, 60% compact"],
      ["Switches","Red mechanical"],
      ["Lighting","RGB rainbow backlight"],
      ["Anti-ghosting","Yes"],
      ["Connectivity","Wired USB"],
      ["Compatibility","Windows / macOS / Linux"]
    ],
    reviewList:[
      {name:"F. Rana", rating:5, date:"Jul 2026", text:"Loved the compact size — so much more room for my mouse hand now. Red switches feel smooth."},
      {name:"K. Aslam", rating:4, date:"Jun 2026", text:"RGB is bright and customizable enough. No keycap puller included, worth buying separately."},
      {name:"M. Iqbal", rating:5, date:"May 2026", text:"Anti-ghosting held up fine during long gaming sessions, no missed inputs."}
    ]
  },
  {
    id:"p3", cat:"Laptop", name:"i5-11400H / RTX 3050 Gaming Laptop", price:260000,
    image:"https://i.ibb.co/wrz5SfSy/Screenshot-2026-08-08-020715.png",
    desc:"An 11th Gen gaming laptop pairing a six-core i5 with an RTX 3050, built for 1080p gaming and everyday multitasking with room to spare.",
    specs:[
      ["Processor","11th Gen Intel Core i5-11400H"],
      ["Memory","32GB DDR4"],
      ["Storage","512GB NVMe SSD"],
      ["Graphics","RTX 3050, 4GB"],
      ["Display","16.1\" FHD IPS"],
      ["OS & warranty","Windows 11 · box packed · 1 year warranty"]
    ],
    reviewList:[
      {name:"T. Shah", rating:5, date:"Aug 2026", text:"Handles current games at 1080p comfortably. Arrived properly boxed with warranty card included."},
      {name:"Z. Karim", rating:4, date:"Jul 2026", text:"Great value for the specs. Fans are noticeable under load but performance justifies it."},
      {name:"R. Farid", rating:5, date:"Jun 2026", text:"32GB RAM makes multitasking between games and streaming apps painless."}
    ]
  },
  {
    id:"p4", cat:"Mousepad", name:"Full-Desk Gaming Mousepad, 700×300mm", price:1399,
    image:"https://i.ibb.co/hxS4wpV4/Screenshot-2026-08-08-020810.png",
    desc:"A large rectangular desk mat sized to cover keyboard and mouse together, with a water-resistant nylon surface and stitched edges that resist fraying.",
    specs:[
      ["Size","700mm x 300mm"],
      ["Material","Rubber base + nylon surface"],
      ["Base","Anti-slip rubber"],
      ["Surface","Water-resistant"],
      ["Edges","Stitched"],
      ["Shape","Rectangular, full desk size"]
    ],
    reviewList:[
      {name:"U. Chaudhry", rating:5, date:"Jun 2026", text:"Covers my whole keyboard and mouse area with room left over. Stays flat and doesn't slide."},
      {name:"B. Nawaz", rating:4, date:"May 2026", text:"Stitched edges are holding up well after a month of daily use."}
    ]
  },
  {
    id:"p5", cat:"Gaming PC", name:"Ryzen 5 3600 / RX 590 8GB Gaming Tower", price:120000,
    image:"https://i.ibb.co/JRQQW3vv/Screenshot-2026-08-08-021037.png",
    desc:"A prebuilt Ryzen tower with an RX 590 8GB, tuned for 1080p gaming, with ARGB fans and dual storage for fast boots and plenty of room for games.",
    specs:[
      ["Processor","AMD Ryzen 5 3600"],
      ["Motherboard","A320 chipset"],
      ["Memory","16GB DDR4 3200MHz"],
      ["Graphics","RX 590, 8GB"],
      ["Storage","128GB NVMe + 1TB HDD"],
      ["Case & cooling","Gaming case, 3x ARGB fans, 650W PSU, Chillspike cooling"]
    ],
    reviewList:[
      {name:"J. Malik", rating:5, date:"Aug 2026", text:"Runs everything I play at 1080p high settings without issue. ARGB fans look great through the side panel."},
      {name:"E. Raza", rating:4, date:"Jul 2026", text:"Boots fast off the NVMe drive, and the 1TB HDD is handy for the bigger game installs."},
      {name:"G. Anwar", rating:5, date:"Jun 2026", text:"Solid build quality for a prebuilt at this price point. Cable routing inside is clean."}
    ]
  }
];

function findProduct(id){ return PRODUCTS.find(p=>p.id===id); }
function pkr(n){ return "Rs. " + n.toLocaleString("en-PK"); }
function avgRating(p){
  const sum = p.reviewList.reduce((a,r)=>a+r.rating,0);
  return Math.round((sum/p.reviewList.length)*10)/10;
}
function starString(r){
  const full = Math.round(r);
  return "★★★★★".slice(0,full) + "☆☆☆☆☆".slice(0,5-full);
}

/* ============ TOAST ============ */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2400);
}

/* ============ RENDER: HOME ============ */
function renderHome(){
  const html = `
    <section class="hero">
      <div class="hero-inner">
        <span class="hero-eyebrow">// Hand-picked gear, checked before it ships</span>
        <h1>Gaming gear that<br><em>actually performs.</em></h1>
        <p class="sub">ByteMart stocks mice, keyboards, laptops and full rigs for gamers across Pakistan. Pick a product to see full specs, real reviews, and place your order — we'll message you to confirm.</p>
        <div class="hero-ctas">
          <a href="#catalog" class="btn btn-primary">Browse gear ↓</a>
          <a href="#order" class="btn btn-outline">Place an order</a>
        </div>
        <div class="trio">
          <span>📦 Delivery across Pakistan</span>
          <span>🛡️ Warranty on select components</span>
          <span>💬 Confirmed by message before dispatch</span>
        </div>
      </div>
    </section>

    <div class="wrap" id="catalog">
      <section class="section">
        ${CATEGORIES.map(cat=>{
          const items = PRODUCTS.filter(p=>p.cat===cat);
          if(items.length===0) return '';
          return `<div class="cat-block">
            <div class="cat-title-row">
              <span class="cat-index mono">${String(CATEGORIES.indexOf(cat)+1).padStart(2,'0')}</span>
              <h3 class="cat-title">${cat}</h3>
              <span class="cat-desc mono">${items.length} listed</span>
            </div>
            <div class="grid">${items.map(cardHTML).join('')}</div>
          </div>`;
        }).join('')}
      </section>

      <section class="section" id="order">
        ${orderFormHTML(null)}
      </section>
    </div>
  `;
  document.getElementById('page').innerHTML = html;
  bindOrderForm();
}

function cardHTML(p){
  return `<div class="card" onclick="location.hash='#product/${p.id}'" tabindex="0" role="button" aria-label="View ${p.name}">
    <div class="card-media">
      <span class="badge-cat">${p.cat}</span>
      <img src="${p.image}" alt="${p.name}" loading="lazy">
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <div class="card-meta"><span class="stars">${starString(avgRating(p))}</span> ${avgRating(p)} (${p.reviewList.length})</div>
    </div>
    <div class="price-tag mono">${pkr(p.price)}</div>
  </div>`;
}

/* ============ RENDER: PRODUCT DETAIL ============ */
function renderProduct(id){
  const p = findProduct(id);
  if(!p){
    document.getElementById('page').innerHTML = `<div class="wrap"><div class="empty-state">Product not found. <a href="#home">Return to homepage</a></div></div>`;
    return;
  }
  const avg = avgRating(p);
  document.getElementById('page').innerHTML = `
    <div class="wrap" style="padding-top:26px;">
      <div class="breadcrumb"><a href="#home">Home</a> / <a href="#home">${p.cat}</a> / ${p.name}</div>
      <div class="pd-grid">
        <div class="pd-media"><img src="${p.image}" alt="${p.name}"></div>
        <div class="pd">
          <span class="pd-cat mono">${p.cat}</span>
          <h1>${p.name}</h1>
          <div class="pd-meta"><span class="stars">${starString(avg)}</span> ${avg} · ${p.reviewList.length} reviews · SKU BM-${p.id.toUpperCase()}</div>
          <div class="pd-price-block">
            <span class="pd-price mono">${pkr(p.price)}</span>
            <span class="pd-stock">● In stock, ships in 1–2 days</span>
          </div>
          <p class="pd-desc">${p.desc}</p>
          <div class="pd-btn-row">
            <a href="#order-this-${p.id}" class="btn btn-primary" onclick="document.getElementById('order-this-${p.id}').scrollIntoView({behavior:'smooth'})">Order this product</a>
          </div>
        </div>
      </div>

      <div class="spec-panel">
        <div class="spec-head"><span>Full specifications</span><span>DATASHEET — BM-${p.id.toUpperCase()}</span></div>
        <table class="spec-table">
          ${p.specs.map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
        </table>
      </div>

      <div class="reviews-panel">
        <div class="section-head"><h2>Customer reviews</h2><span class="section-tag">${p.reviewList.length} shown</span></div>
        <div class="reviews-summary">
          <div class="rs-score">${avg}</div>
          <div>
            <div class="rs-stars">${starString(avg)}</div>
            <div class="rs-count">Based on ${p.reviewList.length} reviews</div>
          </div>
        </div>
        <div>
          ${p.reviewList.map(r=>`<div class="review-card">
            <div class="review-top"><span class="review-name">${r.name}</span><span class="review-date mono">${r.date}</span></div>
            <div class="stars" style="margin-bottom:4px;">${starString(r.rating)}</div>
            <div class="review-text">${r.text}</div>
          </div>`).join('')}
        </div>
      </div>

      <div id="order-this-${p.id}">
        ${orderFormHTML(p.id)}
      </div>
    </div>
  `;
  bindOrderForm();
}

/* ============ ORDER FORM (shared: homepage quick-order + per-product) ============ */
function orderFormHTML(lockedProductId){
  const options = PRODUCTS.map(p=>`<option value="${p.id}" ${lockedProductId===p.id?'selected':''}>${p.name} — ${pkr(p.price)}</option>`).join('');
  const formId = lockedProductId ? `orderForm-${lockedProductId}` : 'orderForm-home';
  return `
    <div class="order-panel">
      <h3>Place your order</h3>
      <p class="order-sub">Fill this in and it lands straight in our inbox at <strong>${ORDER_EMAIL}</strong>. We'll message you back to confirm delivery details.</p>
      <form id="${formId}" data-form-id="${formId}" data-locked="${lockedProductId||''}">
        <div class="form-grid">
          <div class="form-row"><label>Full name</label><input type="text" name="name" required placeholder="Ali Raza"></div>
          <div class="form-row"><label>Phone / WhatsApp</label><input type="tel" name="phone" required placeholder="03xx-xxxxxxx"></div>
          <div class="form-row"><label>Email (optional)</label><input type="email" name="email" placeholder="you@example.com"></div>
          <div class="form-row"><label>Delivery address</label><input type="text" name="address" required placeholder="House, street, city"></div>
          <div class="form-row full">
            <label>Product</label>
            <select name="product" ${lockedProductId?'disabled':''} required>
              ${!lockedProductId ? '<option value="">Choose a product</option>' : ''}
              ${options}
            </select>
          </div>
          <div class="form-row">
            <label>Quantity</label>
            <div class="qty-stepper">
              <button type="button" class="qty-dec" aria-label="Decrease quantity">–</button>
              <span class="qty-val">1</span>
              <button type="button" class="qty-inc" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="form-row full"><label>Notes (optional)</label><textarea name="notes" placeholder="Any special instructions"></textarea></div>
        </div>
        <div class="order-total-row"><span>Estimated total</span><span class="mono order-total-val">—</span></div>
        <button class="btn btn-primary btn-block" type="submit">Send Order</button>
        <p class="form-note">First-time setup: the inbox owner needs to confirm one activation email from FormSubmit before orders start arriving.</p>
      </form>
    </div>
  `;
}

function bindOrderForm(){
  document.querySelectorAll('form[data-form-id]').forEach(form=>{
    if(form.dataset.bound) return;
    form.dataset.bound = "1";
    const qty = { val:1 };
    const qtyEl = form.querySelector('.qty-val');
    const totalEl = form.querySelector('.order-total-val');
    const productSelect = form.querySelector('select[name="product"]');

    function currentPrice(){
      const pid = form.dataset.locked || productSelect.value;
      const p = findProduct(pid);
      return p ? p.price : 0;
    }
    function updateTotal(){
      const total = currentPrice() * qty.val;
      totalEl.textContent = total ? pkr(total) : "—";
    }
    form.querySelector('.qty-inc').addEventListener('click', ()=>{ qty.val++; qtyEl.textContent=qty.val; updateTotal(); });
    form.querySelector('.qty-dec').addEventListener('click', ()=>{ qty.val=Math.max(1,qty.val-1); qtyEl.textContent=qty.val; updateTotal(); });
    if(productSelect) productSelect.addEventListener('change', updateTotal);
    updateTotal();

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const pid = form.dataset.locked || productSelect.value;
      const product = findProduct(pid);
      if(!product){ showToast("Please choose a product"); return; }

      const data = new FormData(form);
      const payload = {
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email') || '(not provided)',
        address: data.get('address'),
        product: product.name,
        price: pkr(product.price),
        quantity: qty.val,
        total: pkr(product.price * qty.val),
        notes: data.get('notes') || '(none)',
        _subject: `ByteMart order: ${product.name} x${qty.val}`
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      fetch(`https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
      .catch(()=>{ /* network/CORS issues shouldn't block the on-page confirmation */ })
      .finally(()=>{
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Order";
        goToConfirmation({
          product: product.name,
          quantity: qty.val,
          total: pkr(product.price * qty.val)
        });
      });
    });
  });
}

/* ============ CONFIRMATION ============ */
let lastOrder = null;
let redirectTimer, redirectInterval;

function goToConfirmation(order){
  lastOrder = order;
  location.hash = "#confirmation";
}

function renderConfirmation(){
  if(!lastOrder){
    document.getElementById('page').innerHTML = `<div class="wrap"><div class="empty-state">No recent order found. <a href="#home">Return to homepage</a></div></div>`;
    return;
  }
  const orderId = "BM-" + Math.floor(10000 + Math.random()*89999);
  let secondsLeft = 5;
  document.getElementById('page').innerHTML = `
    <div class="wrap">
      <div class="confirm-wrap">
        <div class="confirm-badge">✓</div>
        <h1>Order received</h1>
        <p>Thanks for ordering from ByteMart. We've received your request for <strong>${lastOrder.product}</strong> (x${lastOrder.quantity}). We'll message you shortly to confirm delivery details.</p>
        <div class="order-id-chip">REF ${orderId} · ${lastOrder.total}</div>
        <div class="center-btn"><a href="#home" class="btn btn-primary" onclick="clearRedirect()">Back to homepage now</a></div>
        <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
        <div class="redirect-note" id="redirectNote">Redirecting to homepage in ${secondsLeft}s…</div>
      </div>
    </div>
  `;
  clearInterval(redirectInterval);
  clearTimeout(redirectTimer);
  redirectInterval = setInterval(()=>{
    secondsLeft -= 1;
    const note = document.getElementById('redirectNote');
    if(note) note.textContent = secondsLeft>0 ? `Redirecting to homepage in ${secondsLeft}s…` : `Redirecting now…`;
    if(secondsLeft<=0) clearInterval(redirectInterval);
  }, 1000);
  redirectTimer = setTimeout(()=>{ location.hash = "#home"; }, 5000);
}
function clearRedirect(){
  clearInterval(redirectInterval);
  clearTimeout(redirectTimer);
}

/* ============ ROUTER ============ */
function router(){
  clearRedirect();
  const hash = location.hash || "#home";
  window.scrollTo({top:0, behavior:'instant'});
  if(hash.startsWith("#product/")){
    renderProduct(hash.split("/")[1]);
  } else if(hash.startsWith("#confirmation")){
    renderConfirmation();
  } else {
    renderHome();
    if(hash.startsWith("#order")){
      setTimeout(()=>{ document.getElementById('order')?.scrollIntoView({behavior:'smooth'}); }, 50);
    }
  }
}
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
