 // Example game data (in real use, this would come from the store page)
const game = JSON.parse(localStorage.getItem('selectedGame')) || {
  name: 'Default Game',
  description: 'This is a placeholder description.',
  price: 49.99,
  image: 'https://via.placeholder.com/200x250'
};

document.getElementById('gameTitle').innerText = game.name;
document.getElementById('gameDescription').innerText = game.description;
document.getElementById('gamePrice').innerText = game.price.toFixed(2);
document.getElementById('gameImage').src = game.image;

document.getElementById('addToCartBtn').addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === game.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...game, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
});

// Comments logic
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
const commentsKey = `comments_${game.name.replace(/\s+/g, '_')}`;

function loadComments() {
  const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
  commentsList.innerHTML = comments.map(c => 
   `<div class="comment">
      <strong>${c.name}</strong> <em>(${c.time})</em>
      <p>${c.text}</p>
    </div>`
  ).join('');
}

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('commentName').value.trim();
  const text = document.getElementById('commentText').value.trim();
  const time = new Date().toLocaleString();

  if (!name || !text) return;

  const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
  comments.push({ name, text, time });
  localStorage.setItem(commentsKey, JSON.stringify(comments));

  document.getElementById('commentName').value = '';
  document.getElementById('commentText').value = '';
  loadComments();
});

loadComments();




//ratings
const ratingForm = document.getElementById('ratingForm');
const stars = document.querySelectorAll('.stars span');
const ratingsList = document.getElementById('ratingsList');
const avgDisplay = document.getElementById('averageRating');
const ratingKey = `ratings_${game.name.replace(/\s+/g, '_')}`;

let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    updateStars(selectedRating);
  });
});

ratingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('ratingName').value.trim();
  const time = new Date().toLocaleString();

  if (!selectedRating || !name) return;

  const ratings = JSON.parse(localStorage.getItem(ratingKey)) || [];
  ratings.push({ name, rating: selectedRating, time });
  localStorage.setItem(ratingKey, JSON.stringify(ratings));
  document.getElementById('ratingName').value = '';
  selectedRating = 0;
  updateStars(0);
  updateAverage(ratings);
  showRatings(ratings);
});

function updateStars(value) {
  stars.forEach(star => {
    star.classList.toggle('selected', parseInt(star.dataset.value) <= value);
  });
}

function updateAverage(ratings) {
  if (!ratings.length) {
    avgDisplay.innerText = 'Average Rating: N/A';
    return;
  }
  const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  avgDisplay.innerText = `Average Rating: ${avg.toFixed(1)} ⭐ (${ratings.length} ratings)`;
}

function showRatings(ratings) {
  ratingsList.innerHTML = ratings.map(r =>
    `<div class="rating">
      <strong>${r.name}</strong> <em>(${r.time})</em><br>
      Rated: ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
    </div>`
  ).join('');
}

const savedRatings = JSON.parse(localStorage.getItem(ratingKey)) || [];
updateAverage(savedRatings);
showRatings(savedRatings);




//game trailer
// Game Trailer Logic
const trailerIframe = document.getElementById('trailer');
if (trailerIframe && game.trailer) {
  trailerIframe.src = game.trailer;
}
