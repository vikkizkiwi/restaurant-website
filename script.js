// Mobile menu toggle
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector("#navbar ul").classList.toggle("show");
});

// Shopping Cart Logic
const cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} ($${item.price.toFixed(2)}) x ${item.quantity}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart.length = 0;
  updateCart();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".menu-card");
    const name = card.getAttribute("data-name");
    const price = parseFloat(card.getAttribute("data-price"));

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

clearCartBtn.addEventListener("click", clearCart);
