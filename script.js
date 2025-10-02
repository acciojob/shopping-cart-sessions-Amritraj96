// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// --- Utility to get cart from sessionStorage ---
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// --- Utility to save cart ---
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// --- Render product list ---
function renderProducts() {
  productList.innerHTML = ""; // clear before re-render
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // attach event listeners for buttons
  const addButtons = document.querySelectorAll(".add-to-cart-btn");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id);
    });
  });
}

// --- Render cart list ---
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = ""; // clear before rendering
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// --- Add item to cart ---
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  renderCart();
}

// --- Clear cart ---
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// --- Event listener for clear cart ---
clearCartBtn.addEventListener("click", clearCart);

// --- Initial render ---
renderProducts();
renderCart();

