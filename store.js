const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
  });








function openModal() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('show');
  }
}

function closeModal() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
  }
}

// Add to cart
function addToCart(name, price, image, category) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, image, category, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  openModal();
}

// View cart
function viewCart() {
  window.location.href = 'cart.html';
}

// View game details
function viewDetails(name, category, image, price, description, trailer) {
  const game = { name, category, image, price, description, trailer };
  localStorage.setItem('selectedGame', JSON.stringify(game));
  window.location.href = 'details.html';
}

// Filter games
function filterGames() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categorySelect').value;
  const cards = document.querySelectorAll('.game-card');

  cards.forEach(card => {
    const title = card.querySelector('h4').innerText.toLowerCase();
    const cardCategory = card.dataset.category;
    const matchesSearch = title.includes(query);
    const matchesCategory = category === 'all' || category === cardCategory;

    card.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
  });
}









//login
const user = JSON.parse(localStorage.getItem('loggedInUser'));
if (user) {
  document.getElementById('userGreeting').textContent = `Welcome, ${user.username}`;
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
}
