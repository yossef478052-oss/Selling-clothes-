/* ============================================================
   HASSAN — Client-side Store
   localStorage-backed cart / wishlist / session + toast helper.
   Cart line items support a free-text "note" field (gift notes,
   alteration requests, etc.) per the brief.
============================================================ */

const HStore = (() => {
  const KEYS = { cart: 'logo_cart', wishlist: 'logo_wishlist', session: 'logo_session', orders: 'logo_orders' };

  function read(key, fallback){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch(e){ return fallback; } }
  function write(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

  // ---------- Cart ----------
  function getCart(){ return read(KEYS.cart, []); }
  function setCart(items){ write(KEYS.cart, items); updateBadges(); }
  function addToCart({ productId, size, color, qty=1, note='' }){
    const cart = getCart();
    const existing = cart.find(i => i.productId === productId && i.size === size && i.color === color && i.note === note);
    if (existing) existing.qty += qty;
    else cart.push({ productId, size, color, qty, note });
    setCart(cart);
  }
  function removeFromCart(index){ const cart = getCart(); cart.splice(index,1); setCart(cart); }
  function updateCartQty(index, qty){ const cart = getCart(); if(cart[index]){ cart[index].qty = Math.max(1, qty); setCart(cart); } }
  function updateCartNote(index, note){ const cart = getCart(); if(cart[index]){ cart[index].note = note; setCart(cart); } }
  function cartCount(){ return getCart().reduce((sum,i) => sum + i.qty, 0); }
  function clearCart(){ setCart([]); }

  function updateBadges(){
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      const n = cartCount(); el.textContent = n; el.style.display = n > 0 ? '' : 'none';
    });
    document.querySelectorAll('[data-wishlist-count]').forEach(el => {
      const n = getWishlist().length; el.textContent = n; el.style.display = n > 0 ? '' : 'none';
    });
  }

  // ---------- Wishlist ----------
  function getWishlist(){ return read(KEYS.wishlist, []); }
  function setWishlist(ids){ write(KEYS.wishlist, ids); updateBadges(); }
  function toggleWishlist(productId){
    const list = getWishlist(); const idx = list.indexOf(productId);
    if (idx >= 0) list.splice(idx,1); else list.push(productId);
    setWishlist(list); return idx < 0;
  }
  function isWishlisted(productId){ return getWishlist().includes(productId); }

  // ---------- Session (mock auth) ----------
  function getSession(){ return read(KEYS.session, null); }
  function login(email, name){ write(KEYS.session, { email, name: name || email.split('@')[0] }); }
  function logout(){ localStorage.removeItem(KEYS.session); }
  function isLoggedIn(){ return !!getSession(); }

  // ---------- Orders ----------
  function getOrders(){ return read(KEYS.orders, []); }
  function createOrder(order){ const orders = getOrders(); orders.unshift(order); write(KEYS.orders, orders); }

  // ---------- Toast ----------
  function toast(message, type='success'){
    let stack = document.querySelector('.toast-stack');
    if(!stack){ stack = document.createElement('div'); stack.className = 'toast-stack'; document.body.appendChild(stack); }
    const el = document.createElement('div'); el.className = `toast ${type}`; el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .3s, transform .3s'; el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
      setTimeout(() => el.remove(), 300);
    }, 2700);
  }

  document.addEventListener('DOMContentLoaded', updateBadges);

  return {
    getCart, setCart, addToCart, removeFromCart, updateCartQty, updateCartNote, cartCount, clearCart,
    getWishlist, toggleWishlist, isWishlisted,
    getSession, login, logout, isLoggedIn,
    getOrders, createOrder,
    toast,
  };
})();

function hPrice(n){ return '$' + n.toFixed(2); }

document.addEventListener("DOMContentLoaded", () => {
  const selectors = '.cat-tile, .h-card, h1';
  
  // 1. تجهيز الـ CSS الأساسي للحركة
  const style = document.createElement('style');
  style.innerHTML = `
    ${selectors} { 
      opacity: 0; 
      transform: translateY(40px); 
      transition: opacity 0.6s ease-out, transform 0.6s ease-out; 
    }
    .scroll-reveal-active {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // 2. مراقبة السكرول
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.05 // يلقط العنصر أول ما يلمس طرف الشاشة
  });

  // 3. السحر كله هنا: تشغيل المراقبة
  setTimeout(() => {
    document.querySelectorAll(selectors).forEach((el) => {
      const rect = el.getBoundingClientRect();
      // لو الكارت مكانه في أول الشاشة فوق (يعني باين للمستخدم أول ما فتح)، اظهر علطول من غير نطة
      if (rect.top < window.innerHeight) {
        el.classList.add("scroll-reveal-active");
      } else {
        // لو الكارت تحت ومحتاج سكرول، خليه تحت المراقبة
        observer.observe(el);
      }
    });
  }, 250); 
});