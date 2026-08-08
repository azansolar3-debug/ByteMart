/* =========================================================
   ByteMart — front-end demo store (no backend required)
   Data + cart + orders persist in localStorage.
   ========================================================= */

/* ---------- Product catalog ---------- */
const PRODUCTS = [
  {
    id: "bm-01",
    name: "7-Button Wired Gaming Mouse",
    price: 1199,
    badge: "Peripheral",
    rating: 4.5,
    reviewsBase: 128,
    stock: 46,
    image: "https://i.ibb.co/sdp9DCpQ/Screenshot-2026-08-08-020049.png",
    gallery: [
      "https://i.ibb.co/sdp9DCpQ/Screenshot-2026-08-08-020049.png",
      "https://i.ibb.co/DHwLd9tY/Screenshot-2026-08-08-020102.png",
      "https://i.ibb.co/Sw4mFQRT/Screenshot-2026-08-08-020115.png"
    ],
    short: "A 7-button wired gaming mouse with mechanical switches, RGB lighting, and adjustable DPI — built for fast-paced play.",
    specs: [
      ["Buttons", "7 programmable buttons"],
      ["Switch Type", "Mechanical micro-switches"],
      ["Lighting", "RGB, 7 lighting modes"],
      ["DPI Levels", "4-level adjustable DPI"],
      ["Included Accessory", "Mouse pad included"],
      ["Best For", "FPS games, PUBG Mobile emulator play"],
      ["Connection", "Wired, USB-A"]
    ]
  },
  {
    id: "bm-02",
    name: "JEDEL KL69 — 60% Mechanical RGB Keyboard",
    price: 4000,
    badge: "Peripheral",
    rating: 4.6,
    reviewsBase: 94,
    stock: 30,
    image: "https://i.ibb.co/G3xC0DZt/Screenshot-2026-08-08-020615.png",
    gallery: [
      "https://i.ibb.co/G3xC0DZt/Screenshot-2026-08-08-020615.png"
    ],
    short: "A compact 61-key 60% mechanical keyboard with red switches and rainbow RGB backlighting.",
    specs: [
      ["Layout", "61-key compact (60%) layout"],
      ["Switch Type", "Red mechanical switches"],
      ["Backlight", "RGB rainbow, multiple effects"],
      ["Anti-Ghosting", "Yes"],
      ["Connection", "Wired, USB"],
      ["Compatibility", "Windows / macOS / Linux"]
    ]
  },
  {
    id: "bm-03",
    name: "i5-11400H / RTX 3050 Gaming Laptop",
    price: 260000,
    badge: "System",
    rating: 4.7,
    reviewsBase: 52,
    stock: 6,
    image: "https://i.ibb.co/wrz5SfSy/Screenshot-2026-08-08-020715.png",
    gallery: [
      "https://i.ibb.co/wrz5SfSy/Screenshot-2026-08-08-020715.png"
    ],
    short: "11th Gen Core i5 gaming laptop with an RTX 3050, 32GB RAM, and a 16.1\" FHD IPS display — box packed with 1 year warranty.",
    specs: [
      ["Processor", "Intel Core i5-11400H (11th Gen)"],
      ["RAM", "32GB DDR4"],
      ["Storage", "512GB NVMe SSD"],
      ["Graphics", "NVIDIA RTX 3050 4GB"],
      ["Display", "16.1\" FHD IPS"],
      ["Operating System", "Windows 11"],
      ["Condition", "Box packed, 1 year warranty"]
    ]
  },
  {
    id: "bm-04",
    name: "Full-Desk Gaming Mousepad, 700×300mm",
    price: 1399,
    badge: "Peripheral",
    rating: 4.4,
    reviewsBase: 76,
    stock: 60,
    image: "https://i.ibb.co/hxS4wpV4/Screenshot-2026-08-08-020810.png",
    gallery: [
      "https://i.ibb.co/hxS4wpV4/Screenshot-2026-08-08-020810.png",
      "https://i.ibb.co/hGbH8wc/Screenshot-2026-08-08-020825.png",
      "https://i.ibb.co/zV82383v/Screenshot-2026-08-08-020843.png"
    ],
    short: "A large 700×300mm desk mat with a rubber and nylon surface, anti-slip base, and stitched edges.",
    specs: [
      ["Dimensions", "700 x 300 mm"],
      ["Surface Material", "Rubber + nylon"],
      ["Base", "Anti-slip rubber base"],
      ["Water Resistance", "Water-resistant surface"],
      ["Edges", "Stitched, frays-resistant"],
      ["Shape", "Rectangular, full-desk size"]
    ]
  },
  {
    id: "bm-05",
    name: "Ryzen 5 3600 / RX 590 8GB Gaming Tower",
    price: 120000,
    badge: "System",
    rating: 4.5,
    reviewsBase: 38,
    stock: 8,
    image: "https://i.ibb.co/JRQQW3vv/Screenshot-2026-08-08-021037.png",
    gallery: [
      "https://i.ibb.co/JRQQW3vv/Screenshot-2026-08-08-021037.png",
      "https://i.ibb.co/GfN2KsYm/Screenshot-2026-08-08-021048.png",
      "https://i.ibb.co/tpRZGzFW/Screenshot-2026-08-08-021113.png"
    ],
    short: "A Ryzen 5 3600 prebuilt gaming tower with an RX 590 8GB, 16GB RAM, and RGB airflow — ready to play out of the box.",
    specs: [
      ["Processor", "AMD Ryzen 5 3600"],
      ["Motherboard", "A320 chipset"],
      ["RAM", "16GB DDR4 3200MHz"],
      ["Graphics", "AMD RX 590 8GB"],
      ["Storage", "128GB NVMe SSD + 1TB HDD"],
      ["Power Supply", "650W PSU"],
      ["Case & Cooling", "Gaming case, 3x ARGB fans, Chillspike cooler"]
    ]
  }
];

const REVIEW_NAMES = ["Ayesha K.", "Bilal R.", "Hira M.", "Usman T.", "Sana A.", "Fahad Z.", "Mahnoor S.", "Danish I."];
const REVIEW_LINES = [
  "Exactly as described, arrived in great packaging and works perfectly.",
  "Good value for the price. Performs better than I expected.",
  "Build quality feels solid. Would recommend to a friend.",
  "Delivery was quick — ordered on Monday, had it by Thursday.",
  "Does the job well, though the manual could be clearer.",
  "Really happy with this purchase, matches the listing photos closely.",
  "Setup was simple and it worked right out of the box.",
  "Solid product for the price, one star off only for the packaging."
];

function seedReviews(product) {
  const key = "bytemart_reviews_" + product.id;
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  const count = 3 + (product.id.charCodeAt(3) % 3);
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      name: REVIEW_NAMES[(i + product.id.length) % REVIEW_NAMES.length],
      rating: Math.max(3, Math.min(5, Math.round(product.rating) - (i % 2))),
      text: REVIEW_LINES[(i * 3 + product.id.length) % REVIEW_LINES.length],
      date: new Date(Date.now() - i * 9 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    });
  }
  localStorage.setItem(key, JSON.stringify(list));
  return list;
}
function addReview(productId, review) {
  const key = "bytemart_reviews_" + productId;
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  list.unshift(review);
  localStorage.setItem(key, JSON.stringify(list));
}

function money(n) {
  return "Rs. " + n.toLocaleString("en-PK");
}
function stars(rating, size = "stars") {
  const full = Math.round(rating);
  let out = `<span class="${size}">`;
  for (let i = 1; i <= 5; i++) out += i <= full ? "★" : '<span class="muted-star">★</span>';
  out += "</span>";
  return out;
}
function findProduct(id) { return PRODUCTS.find(p => p.id === id); }

/* ---------- Cart (localStorage) ---------- */
function getCart() { return JSON.parse(localStorage.getItem("bytemart_cart") || "{}"); }
function saveCart(cart) { localStorage.setItem("bytemart_cart", JSON.stringify(cart)); updateCartCount(); }
function addToCart(id, qty = 1) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
  toast(`Added "${findProduct(id).name}" to cart`);
}
function setCartQty(id, qty) {
  const cart = getCart();
  if (qty <= 0) delete cart[id]; else cart[id] = qty;
  saveCart(cart);
  render();
}
function removeFromCart(id) { setCartQty(id, 0); }
function cartCount() { return Object.values(getCart()).reduce((a, b) => a + b, 0); }
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.textContent = cartCount();
}

/* ---------- Orders (localStorage) ---------- */
function getOrders() { return JSON.parse(localStorage.getItem("bytemart_orders") || "[]"); }
function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem("bytemart_orders", JSON.stringify(orders));
}
function findOrder(id) { return getOrders().find(o => o.id === id); }
function genOrderId() {
  return "BM" + Math.floor(100000 + Math.random() * 900000);
}
function orderStatusSteps(order) {
  const hoursSince = (Date.now() - order.timestamp) / 36e5;
  const stageIndex = Math.min(4, Math.floor(hoursSince / 6)); // simulate progress over time
  const steps = [
    ["Order Placed", "We've received your order and it's being prepared."],
    ["Order Confirmed", "Payment verified and order confirmed by ByteMart."],
    ["Shipped", "Your package has left the ByteMart warehouse."],
    ["Out for Delivery", "Courier is on the way to your address."],
    ["Delivered", "Package delivered. Enjoy your new gear!"]
  ];
  return steps.map((s, i) => ({
    title: s[0], desc: s[1],
    state: i < stageIndex ? "done" : i === stageIndex ? "current" : "upcoming"
  }));
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  el.innerHTML = `<span class="dot"></span>${msg}`;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------- Router ---------- */
function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  return parts;
}
window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  render();
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("searchInput").value.trim();
    location.hash = "#/search/" + encodeURIComponent(q);
  });
});

function render() {
  const app = document.getElementById("app");
  const parts = currentRoute();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (parts.length === 0) { app.innerHTML = viewHome(PRODUCTS); attachHomeEvents(); return; }
  if (parts[0] === "search") {
    const q = decodeURIComponent(parts[1] || "").toLowerCase();
    const results = PRODUCTS.filter(p => p.name.toLowerCase().includes(q));
    app.innerHTML = viewHome(results, q);
    attachHomeEvents();
    return;
  }
  if (parts[0] === "product" && parts[1]) {
    const p = findProduct(parts[1]);
    if (!p) { app.innerHTML = `<div class="container"><div class="empty-state"><h3>Product not found</h3><a class="btn btn-primary" href="#/">Back to home</a></div></div>`; return; }
    app.innerHTML = viewProduct(p);
    attachProductEvents(p);
    return;
  }
  if (parts[0] === "cart") { app.innerHTML = viewCart(); attachCartEvents(); return; }
  if (parts[0] === "checkout") { app.innerHTML = viewCheckout(parts[1]); attachCheckoutEvents(parts[1]); return; }
  if (parts[0] === "confirmation" && parts[1]) { app.innerHTML = viewConfirmation(parts[1]); attachConfirmationEvents(parts[1]); return; }
  if (parts[0] === "track") { app.innerHTML = viewTrack(parts[1]); attachTrackEvents(); return; }

  app.innerHTML = `<div class="container"><div class="empty-state"><h3>Page not found</h3><a class="btn btn-primary" href="#/">Back to home</a></div></div>`;
}

/* ---------- Home view ---------- */
function viewHome(products, query) {
  const heroBlock = query ? "" : `
  <section class="hero">
    <div class="container">
      <div>
        <p class="hero-eyebrow">// Free delivery on orders over Rs. 5,000</p>
        <h1>Gaming gear that<br>keeps up with your <em>reflexes.</em></h1>
        <p>ByteMart stocks the mice, keyboards, mousepads, laptops and prebuilt PCs gamers actually reach for — at honest prices, with delivery across Pakistan.</p>
        <div class="hero-ctas">
          <button class="btn btn-primary" id="shopBestSellers">Shop Gaming Gear</button>
          <a class="btn btn-ghost" href="#/track">Track an Order</a>
        </div>
        <div class="hero-badges">
          <div><div><strong>2–4 Days</strong>Nationwide delivery</div></div>
          <div><div><strong>7-Day</strong>Easy returns</div></div>
          <div><div><strong>100%</strong>Secure checkout</div></div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="orb"></div>
        <div class="chip c1">Rating <span class="g">4.5★</span> avg.</div>
        <div class="chip c2">5k+ orders delivered</div>
      </div>
    </div>
  </section>`;

  const heading = query
    ? `<h2>Results for "${escapeHtml(query)}"</h2><p>${products.length} product${products.length === 1 ? "" : "s"} found</p>`
    : `<h2>Gaming Gear</h2><p>Hand-picked peripherals and systems, ready to ship</p>`;

  const cards = products.length ? products.map(cardHtml).join("") :
    `<div class="empty-state"><h3>No products match your search</h3><p>Try a different keyword, or browse all products.</p><br><a class="btn btn-primary" href="#/">Browse all products</a></div>`;

  return `
    ${heroBlock}
    <section class="section container">
      <div class="section-head">
        <div>${heading}</div>
      </div>
      <div class="grid">${cards}</div>
    </section>
  `;
}

function cardHtml(p) {
  return `
  <article class="card" data-id="${p.id}">
    <div class="card-media">
      <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
      ${p.badge ? `<span class="badge">${escapeHtml(p.badge)}</span>` : ""}
    </div>
    <div class="card-body">
      <div class="card-name">${escapeHtml(p.name)}</div>
      <div>${stars(p.rating)} <span class="rating-count">(${p.reviewsBase})</span></div>
      <div class="price-row">
        <span class="price">${money(p.price)}</span>
      </div>
      <div class="card-actions">
        <button class="btn btn-outline add-cart-btn" data-id="${p.id}">Add to Cart</button>
        <button class="btn btn-primary buy-now-btn" data-id="${p.id}">Buy Now</button>
      </div>
    </div>
  </article>`;
}

function attachHomeEvents() {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => { location.hash = "#/product/" + card.dataset.id; });
  });
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); addToCart(btn.dataset.id, 1); });
  });
  document.querySelectorAll(".buy-now-btn").forEach(btn => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); location.hash = "#/checkout/buy-" + btn.dataset.id; });
  });
  const shopBtn = document.getElementById("shopBestSellers");
  if (shopBtn) shopBtn.addEventListener("click", () => {
    document.querySelector(".section").scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------- Product detail view ---------- */
function viewProduct(p) {
  const reviews = seedReviews(p);
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) || p.rating;
  const dist = [5, 4, 3, 2, 1].map(star => reviews.filter(r => r.rating === star).length);
  const maxDist = Math.max(1, ...dist);

  return `
  <div class="container">
    <div class="breadcrumb"><a href="#/">Home</a><span>/</span>${escapeHtml(p.name)}</div>
    <div class="product-detail">
      <div>
        <div class="gallery-main"><img id="mainImg" src="${p.image}" alt="${escapeHtml(p.name)}"></div>
        <div class="gallery-thumbs">
          ${p.gallery.map((src, i) => `<button class="thumb ${i === 0 ? "active" : ""}" data-src="${src}"><img src="${src}" alt=""></button>`).join("")}
        </div>
      </div>
      <div>
        <h1 class="pd-title">${escapeHtml(p.name)}</h1>
        <div class="pd-meta">${stars(p.rating)} <span>${avg.toFixed(1)} · ${reviews.length + p.reviewsBase} reviews</span> <span>·</span> <span>SKU: ${p.id.toUpperCase()}</span></div>
        <p style="color:var(--muted);font-size:14px;line-height:1.6;max-width:480px;">${escapeHtml(p.short)}</p>

        <div class="pd-price-box">
          <span class="pd-price">${money(p.price)}</span>
        </div>

        <div class="stock-line"><span class="stock-dot"></span> In Stock — ${p.stock} units available</div>

        <div class="qty-row">
          <div class="stepper">
            <button id="qtyMinus" type="button">−</button>
            <span id="qtyVal">1</span>
            <button id="qtyPlus" type="button">+</button>
          </div>
          <span style="font-size:12.5px;color:var(--muted);">Max ${p.stock} per order</span>
        </div>

        <div class="pd-actions">
          <button class="btn btn-outline btn-block" id="pdAddCart">Add to Cart</button>
          <button class="btn btn-primary btn-block" id="pdBuyNow">Buy Now</button>
        </div>

        <div class="delivery-box">
          <div><b>Delivery:</b> 2–4 business days nationwide, free over Rs. 5,000</div>
          <div><b>Returns:</b> 7-day easy return if item arrives damaged or incorrect</div>
          <div><b>Payment:</b> Cash on Delivery, Card, or EasyPaisa</div>
        </div>
      </div>
    </div>

    <div class="pd-section">
      <h3>Full Specifications</h3>
      <table class="spec-table">
        ${p.specs.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("")}
      </table>
    </div>

    <div class="pd-section" style="margin-bottom:60px;">
      <h3>Customer Reviews</h3>
      <div class="review-summary">
        <div class="review-score">
          <div class="num">${avg.toFixed(1)}</div>
          ${stars(avg)}
          <div style="font-size:12px;color:var(--muted);margin-top:4px;">${reviews.length} local reviews</div>
        </div>
        <div class="review-bars">
          ${[5, 4, 3, 2, 1].map((star, i) => `
            <div class="review-bar-row">
              <span style="width:38px;">${star}★</span>
              <span class="bar"><span style="width:${(dist[i] / maxDist) * 100}%"></span></span>
              <span style="width:20px;text-align:right;">${dist[i]}</span>
            </div>`).join("")}
        </div>
      </div>

      <div id="reviewList">
        ${reviews.map(r => `
          <div class="review-item">
            <div class="review-head">
              <span class="review-name">${escapeHtml(r.name)}</span>
              <span class="review-date">${r.date}</span>
            </div>
            ${stars(r.rating)}
            <p class="review-text">${escapeHtml(r.text)}</p>
          </div>`).join("")}
      </div>

      <div class="review-form">
        <h4>Write a review</h4>
        <div class="form-row">
          <label>Your rating</label>
          <div class="star-picker" id="starPicker">
            ${[1, 2, 3, 4, 5].map(i => `<span data-val="${i}">★</span>`).join("")}
          </div>
        </div>
        <div class="form-row">
          <label for="reviewName">Your name</label>
          <input id="reviewName" type="text" placeholder="e.g. Ahmed K.">
        </div>
        <div class="form-row">
          <label for="reviewText">Your review</label>
          <textarea id="reviewText" rows="3" placeholder="Share your experience with this product..."></textarea>
        </div>
        <button class="btn btn-secondary" id="submitReview">Submit Review</button>
      </div>
    </div>
  </div>`;
}

function attachProductEvents(p) {
  let qty = 1;
  const qtyVal = document.getElementById("qtyVal");
  document.getElementById("qtyMinus").addEventListener("click", () => { qty = Math.max(1, qty - 1); qtyVal.textContent = qty; });
  document.getElementById("qtyPlus").addEventListener("click", () => { qty = Math.min(p.stock, qty + 1); qtyVal.textContent = qty; });
  document.getElementById("pdAddCart").addEventListener("click", () => addToCart(p.id, qty));
  document.getElementById("pdBuyNow").addEventListener("click", () => {
    const cart = getCart();
    cart[p.id] = qty;
    saveCart(cart);
    location.hash = "#/checkout/buy-" + p.id;
  });
  document.querySelectorAll(".thumb").forEach(t => {
    t.addEventListener("click", () => {
      document.querySelectorAll(".thumb").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      document.getElementById("mainImg").src = t.dataset.src;
    });
  });

  let picked = 5;
  const starEls = document.querySelectorAll("#starPicker span");
  function paintStars() { starEls.forEach(s => s.classList.toggle("on", +s.dataset.val <= picked)); }
  paintStars();
  starEls.forEach(s => s.addEventListener("click", () => { picked = +s.dataset.val; paintStars(); }));

  document.getElementById("submitReview").addEventListener("click", () => {
    const name = document.getElementById("reviewName").value.trim() || "Anonymous";
    const text = document.getElementById("reviewText").value.trim();
    if (!text) { toast("Please write a few words before submitting"); return; }
    addReview(p.id, { name, rating: picked, text, date: "Just now" });
    toast("Thanks! Your review was posted.");
    render();
  });
}

/* ---------- Cart view ---------- */
function viewCart() {
  const cart = getCart();
  const ids = Object.keys(cart);
  if (!ids.length) {
    return `<div class="container">
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p><br>
        <a class="btn btn-primary" href="#/">Start Shopping</a>
      </div>
    </div>`;
  }
  const items = ids.map(id => ({ p: findProduct(id), qty: cart[id] })).filter(x => x.p);
  const subtotal = items.reduce((sum, x) => sum + x.p.price * x.qty, 0);
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  return `
  <div class="container">
    <div class="section-head" style="margin-top:24px;"><h2>Your Cart</h2><p>${items.length} item${items.length > 1 ? "s" : ""}</p></div>
    <div class="cart-layout">
      <div>
        ${items.map(x => `
          <div class="cart-row" data-id="${x.p.id}">
            <img src="${x.p.image}" alt="${escapeHtml(x.p.name)}">
            <div>
              <div class="name">${escapeHtml(x.p.name)}</div>
              <div class="unit">${money(x.p.price)} each</div>
            </div>
            <div class="stepper">
              <button type="button" class="cart-minus">−</button>
              <span>${x.qty}</span>
              <button type="button" class="cart-plus">+</button>
            </div>
            <div style="text-align:right;">
              <div class="price" style="font-size:15px;">${money(x.p.price * x.qty)}</div>
              <button class="remove" type="button">Remove</button>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="summary-card">
        <h3>Order Summary</h3>
        <div class="summary-line"><span>Subtotal</span><span class="val">${money(subtotal)}</span></div>
        <div class="summary-line"><span>Shipping</span><span class="val">${shipping === 0 ? "Free" : money(shipping)}</span></div>
        <div class="summary-line total"><span>Total</span><span class="val">${money(total)}</span></div>
        <button class="btn btn-primary btn-block" id="checkoutBtn" style="margin-top:14px;">Proceed to Checkout</button>
        <a href="#/" style="display:block;text-align:center;margin-top:12px;font-size:12.5px;color:var(--muted);">Continue Shopping</a>
      </div>
    </div>
  </div>`;
}

function attachCartEvents() {
  document.querySelectorAll(".cart-row").forEach(row => {
    const id = row.dataset.id;
    const cart = getCart();
    row.querySelector(".cart-plus").addEventListener("click", () => setCartQty(id, (cart[id] || 0) + 1));
    row.querySelector(".cart-minus").addEventListener("click", () => setCartQty(id, (cart[id] || 0) - 1));
    row.querySelector(".remove").addEventListener("click", () => removeFromCart(id));
  });
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", () => { location.hash = "#/checkout"; });
}

/* ---------- Checkout view ---------- */
function checkoutItems(mode) {
  if (mode && mode.startsWith("buy-")) {
    const id = mode.replace("buy-", "");
    const cart = getCart();
    const p = findProduct(id);
    return p ? [{ p, qty: cart[id] || 1 }] : [];
  }
  const cart = getCart();
  return Object.keys(cart).map(id => ({ p: findProduct(id), qty: cart[id] })).filter(x => x.p);
}

function viewCheckout(mode) {
  const items = checkoutItems(mode);
  if (!items.length) {
    return `<div class="container"><div class="empty-state"><h3>Nothing to check out</h3><p>Add a product to your cart first.</p><br><a class="btn btn-primary" href="#/">Browse Products</a></div></div>`;
  }
  const subtotal = items.reduce((s, x) => s + x.p.price * x.qty, 0);
  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  return `
  <div class="container">
    <div class="breadcrumb"><a href="#/">Home</a><span>/</span><a href="#/cart">Cart</a><span>/</span>Checkout</div>
    <div class="section-head"><h2>Checkout</h2></div>
    <div class="checkout-layout">
      <div>
        <div class="checkout-card">
          <h3>Shipping Details</h3>
          <div class="grid-2">
            <div class="form-row" id="fullName-row"><label for="fullName">Full name</label><input id="fullName" type="text" placeholder="Ahmed Khan"><span class="field-error">Please enter your full name</span></div>
            <div class="form-row" id="phone-row"><label for="phone">Phone number</label><input id="phone" type="tel" placeholder="03XX-XXXXXXX"><span class="field-error">Please enter a valid phone number</span></div>
          </div>
          <div class="form-row" id="address-row"><label for="address">Delivery address</label><input id="address" type="text" placeholder="House #, Street, Area"><span class="field-error">Please enter your delivery address</span></div>
          <div class="grid-2">
            <div class="form-row" id="city-row"><label for="city">City</label><input id="city" type="text" placeholder="Lahore"><span class="field-error">Please enter your city</span></div>
            <div class="form-row"><label for="postal">Postal code (optional)</label><input id="postal" type="text" placeholder="54000"></div>
          </div>
        </div>

        <div class="checkout-card">
          <h3>Payment Method</h3>
          <div class="pay-options" id="payOptions">
            <label class="pay-option selected" data-val="cod"><input type="radio" name="pay" value="cod" checked style="display:none;"><div><strong>Cash on Delivery</strong><span>Pay when your order arrives</span></div></label>
            <label class="pay-option" data-val="card"><input type="radio" name="pay" value="card" style="display:none;"><div><strong>Credit / Debit Card</strong><span>Visa, Mastercard accepted</span></div></label>
            <label class="pay-option" data-val="easypaisa"><input type="radio" name="pay" value="easypaisa" style="display:none;"><div><strong>EasyPaisa</strong><span>Pay via mobile wallet</span></div></label>
          </div>
        </div>
      </div>

      <div class="summary-card">
        <h3>Order Summary</h3>
        ${items.map(x => `<div class="summary-line"><span>${escapeHtml(x.p.name)} × ${x.qty}</span><span class="val">${money(x.p.price * x.qty)}</span></div>`).join("")}
        <div class="summary-line"><span>Shipping</span><span class="val">${shipping === 0 ? "Free" : money(shipping)}</span></div>
        <div class="summary-line total"><span>Total</span><span class="val">${money(total)}</span></div>
        <button class="btn btn-primary btn-block" id="placeOrderBtn" style="margin-top:14px;">Place Order</button>
      </div>
    </div>
  </div>`;
}

function attachCheckoutEvents(mode) {
  document.querySelectorAll(".pay-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".pay-option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      opt.querySelector("input").checked = true;
    });
  });

  const btn = document.getElementById("placeOrderBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const fields = [
      ["fullName", v => v.trim().length > 1],
      ["phone", v => v.trim().length >= 7],
      ["address", v => v.trim().length > 4],
      ["city", v => v.trim().length > 1]
    ];
    let valid = true;
    fields.forEach(([id, check]) => {
      const input = document.getElementById(id);
      const row = document.getElementById(id + "-row");
      if (!check(input.value)) { row.classList.add("invalid"); valid = false; }
      else row.classList.remove("invalid");
    });
    if (!valid) { toast("Please fill in all required shipping fields"); return; }

    const items = checkoutItems(mode);
    const subtotal = items.reduce((s, x) => s + x.p.price * x.qty, 0);
    const shipping = subtotal >= 5000 ? 0 : 250;
    const payMethod = document.querySelector('input[name="pay"]:checked').value;

    const order = {
      id: genOrderId(),
      items: items.map(x => ({ id: x.p.id, name: x.p.name, qty: x.qty, price: x.p.price })),
      subtotal, shipping, total: subtotal + shipping,
      name: document.getElementById("fullName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
      city: document.getElementById("city").value.trim(),
      payment: payMethod,
      timestamp: Date.now()
    };
    saveOrder(order);

    // Clear cart: full cart if checking out from cart, or just the single item if "Buy Now"
    if (mode && mode.startsWith("buy-")) {
      const id = mode.replace("buy-", "");
      const cart = getCart(); delete cart[id]; saveCart(cart);
    } else {
      saveCart({});
    }

    btn.disabled = true;
    btn.textContent = "Placing order...";
    setTimeout(() => { location.hash = "#/confirmation/" + order.id; }, 500);
  });
}

/* ---------- Confirmation view ---------- */
function viewConfirmation(orderId) {
  const order = findOrder(orderId);
  if (!order) return `<div class="container"><div class="empty-state"><h3>Order not found</h3><a class="btn btn-primary" href="#/">Back to home</a></div></div>`;
  return `
  <div class="confirm-wrap">
    <div class="confirm-icon">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <h1>Order Placed Successfully!</h1>
    <p>Thank you, ${escapeHtml(order.name.split(" ")[0] || "there")} — your order has been confirmed.</p>
    <p>A confirmation has been prepared for <b>${escapeHtml(order.phone)}</b>.</p>
    <div class="order-id-chip">Order ID: ${order.id}</div>
    <div class="confirm-actions">
      <a class="btn btn-primary" href="#/track/${order.id}">Track Your Order</a>
      <button class="btn btn-outline" id="goHomeBtn">Continue Shopping</button>
    </div>
    <p class="redirect-note" id="redirectNote">Redirecting to homepage in 6s...</p>
  </div>`;
}

function attachConfirmationEvents(orderId) {
  const goHomeBtn = document.getElementById("goHomeBtn");
  if (goHomeBtn) goHomeBtn.addEventListener("click", () => { location.hash = "#/"; });

  let seconds = 6;
  const note = document.getElementById("redirectNote");
  const interval = setInterval(() => {
    seconds -= 1;
    if (!note) { clearInterval(interval); return; }
    if (seconds <= 0) {
      clearInterval(interval);
      location.hash = "#/";
    } else {
      note.textContent = `Redirecting to homepage in ${seconds}s...`;
    }
  }, 1000);
}

/* ---------- Track order view ---------- */
function viewTrack(orderId) {
  const order = orderId ? findOrder(orderId) : null;
  const recentOrders = getOrders().slice(0, 5);

  return `
  <div class="container track-wrap">
    <div class="section-head"><h2>Track Your Order</h2><p>Enter your order ID to see its current status</p></div>
    <div class="track-search">
      <input id="trackInput" type="text" placeholder="e.g. BM482913" value="${order ? order.id : ""}">
      <button class="btn btn-primary" id="trackBtn">Track</button>
    </div>

    ${order ? `
      <div class="checkout-card" style="margin-bottom:24px;">
        <h3>Order ${order.id}</h3>
        <p style="font-size:13px;color:var(--muted);margin:0 0 4px;">Placed on ${new Date(order.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <p style="font-size:13px;color:var(--muted);margin:0 0 16px;">Deliver to: ${escapeHtml(order.address)}, ${escapeHtml(order.city)}</p>
        <div class="timeline">
          ${orderStatusSteps(order).map(s => `
            <div class="tl-step ${s.state}">
              <div class="tl-dot">${s.state === "done" ? "✓" : ""}</div>
              <div>
                <div class="tl-title">${s.title}</div>
                <div class="tl-desc">${s.desc}</div>
              </div>
            </div>`).join("")}
        </div>
      </div>
      <div class="checkout-card">
        <h3>Items</h3>
        ${order.items.map(it => `<div class="summary-line"><span>${escapeHtml(it.name)} × ${it.qty}</span><span class="val">${money(it.price * it.qty)}</span></div>`).join("")}
        <div class="summary-line total"><span>Total</span><span class="val">${money(order.total)}</span></div>
      </div>
    ` : orderId ? `<div class="empty-state"><h3>No order found for "${escapeHtml(orderId)}"</h3><p>Double-check the order ID and try again.</p></div>` : ""}

    ${!order && recentOrders.length ? `
      <div class="checkout-card">
        <h3>Your Recent Orders</h3>
        ${recentOrders.map(o => `
          <div class="summary-line" style="align-items:center;">
            <span>${o.id} — ${new Date(o.timestamp).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span>
            <a class="btn btn-outline" style="padding:6px 14px;font-size:12px;" href="#/track/${o.id}">View</a>
          </div>`).join("")}
      </div>` : ""}
  </div>`;
}

function attachTrackEvents() {
  const btn = document.getElementById("trackBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const val = document.getElementById("trackInput").value.trim();
    if (!val) { toast("Please enter an order ID"); return; }
    location.hash = "#/track/" + encodeURIComponent(val);
  });
}

/* ---------- Utils ---------- */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
