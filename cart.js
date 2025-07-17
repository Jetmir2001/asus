 // cart.js

// Load cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save the cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function updateQuantity(index, change){
  cart[index].quantity += change;
  if(cart[index].quantity <= 0){
    cart.splice(index, 1);
  }
  saveCart();
  displayCart();
}

function removeItem(index){
  cart.splice(index, 1);
  saveCart();
  displayCart();
}



// Display the cart items on cart.html
function displayCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-summary');

  if (!cartContainer) return;

  cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    if (totalContainer) totalContainer.innerHTML = "";
    return;
  }

  cartContainer.innerHTML = "";
  if (totalContainer) totalContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.classList.add('cart-item');

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="80" height="80">
      <div>
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div>
          <button onclick="updateQuantity(${index}, -1)">➖</button>
          <span>Quantity: ${item.quantity}</span>
          <button onclick="updateQuantity(${index}, 1)">➕</button>
        </div>
        <p>Subtotal: $${itemTotal.toFixed(2)}</p>
        <button onclick="removeItem(${index})">🗑 Remove</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  if (totalContainer) {
    totalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  }
}


// Clear the cart
function clearCart() {
  cart = [];
  saveCart();
  displayCart();
}

// Load cart on page ready
window.addEventListener('DOMContentLoaded', displayCart);









//continue button
document.getElementById('continue-shopping').addEventListener('click', () => {
  window.location.href = 'store.html'; // Change to your actual store page URL
});



//checkout form
// Format card number: XXXX XXXX XXXX XXXX
document.addEventListener('DOMContentLoaded', function () {
  // Your form logic here
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const card = document.getElementById('card').value.replace(/\s/g, '');
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    const errors = [];

    if (name.length < 3) errors.push("Name must be at least 3 characters.");
    if (!validateEmail(email)) errors.push("Invalid email format.");
    if (!/^[0-9]{16}$/.test(card)) errors.push("Card number must be 16 digits.");
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errors.push("Expiry must be in MM/YY format.");
    if (!/^[0-9]{3,4}$/.test(cvv)) errors.push("CVV must be 3 or 4 digits.");

    if (errors.length > 0) {
      alert("Please fix the following:\n\n" + errors.join("\n"));
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Clear cart
    localStorage.removeItem('cart');
    cart = [];
    displayCart();

    // Show success message
    const formElement = document.getElementById('checkoutForm');
    const successMessage = document.getElementById('successMessage');

    if (formElement && successMessage) {
      formElement.style.display = 'none';
      successMessage.style.display = 'block';
    } else {
      console.error('Missing successMessage or checkoutForm element.');
    }
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

