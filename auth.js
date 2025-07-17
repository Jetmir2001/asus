 // Save users in localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Handle sign-up
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;

    if (users.some(u => u.username === username)) {
      alert('Username already taken!');
      return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created!');
    window.location.href = 'login.html';
  });
}

// Handle login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'store.html';
    } else {
      alert('Invalid credentials');
    }
  });
}





//show error
function showError(id,message){
    const el = document.getElementById(id);
    if(el){
        el.innerText = message;
        el.style.display = 'block';
    }
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
}