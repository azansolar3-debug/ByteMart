// ============ mobile category menu toggle ============
const navToggle = document.getElementById('navToggle');
const categoryNav = document.getElementById('categoryNav');

navToggle.addEventListener('click', () => {
  const isOpen = categoryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

categoryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    categoryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ product card image galleries ============
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const mainImg = gallery.querySelector('[data-main-img]');
  const thumbs = gallery.querySelectorAll('.thumb');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-src');
      if (!src || !mainImg) return;
      mainImg.src = src;
      thumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
});

// ============ "Order Now" buttons pre-fill the order form ============
const productSelect = document.getElementById('product');
const orderSection = document.getElementById('order');

document.querySelectorAll('.order-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-product');
    if (productSelect && value) {
      const match = Array.from(productSelect.options).find((opt) => opt.value === value);
      if (match) productSelect.value = match.value;
    }
    orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (productSelect) {
      productSelect.style.borderColor = 'var(--brand)';
      setTimeout(() => { productSelect.style.borderColor = ''; }, 1200);
    }
  });
});

// ============ simple live search across product cards ============
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('.product-card').forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// ============ order form submit feedback ============
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', () => {
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Sending…';
  });
}
