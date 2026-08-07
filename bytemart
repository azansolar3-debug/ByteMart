// ============ mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// close mobile menu after tapping a link
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ product image galleries ============
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
    const name = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');
    if (productSelect && name) {
      const matchValue = Array.from(productSelect.options).find((opt) =>
        opt.value.startsWith(name)
      );
      if (matchValue) {
        productSelect.value = matchValue.value;
      }
    }
    orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // brief highlight so it's obvious the form reacted
    if (productSelect) {
      productSelect.style.borderColor = 'var(--cyan)';
      setTimeout(() => { productSelect.style.borderColor = ''; }, 1200);
    }
  });
});

// ============ order form submit feedback ============
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', () => {
    const submitBtn = orderForm.querySelector('button[type="submit"] span');
    if (submitBtn) submitBtn.textContent = 'Sending…';
  });
}
