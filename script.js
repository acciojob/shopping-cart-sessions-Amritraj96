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

// --- Get cart from sessionStorage ---
function getCart() {
  const stored = sessionStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
}

// --- Save cart to sessionStorage ---
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// --- Render products ---
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(parseInt(btn.dataset.id));
    });
  });
}

// --- Render cart from storage ---
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// --- Add product to cart ---
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();   // always load current cart
  cart.push(product);       // allow duplicates
  saveCart(cart);           // update storage
  renderCart();             // update UI
}

// --- Clear cart ---
function clearCart() {
  sessionStorage.removeItem("cart"); // completely remove
  renderCart();
}

// Event listener
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();

