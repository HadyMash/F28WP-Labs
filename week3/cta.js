document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('main').innerHTML += `
<div class="dim-background"></div>
<form action="" id="form">
  <div class="content">
    <h1>Some random form</h1>
    <div class="input-control">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required />
      <div class="error" id="username-error"></div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <div class="error" id="email-error"></div>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <div class="error" id="password-error"></div>
      <label for="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        required
      />
      <div class="error" id="confirm-password-error"></div>
      <button type="submit">Submit</button>
      <button id="form-close" type="button">Close</button>
    </div>
  </div>
</form>`;

  const form = document.querySelector('#form');
  const dimBackground = document.querySelector('.dim-background');

  function showForm() {
    form.classList.add('active');
    dimBackground.classList.add('active');
  }
  function hideForm() {
    form.classList.remove('active');
    dimBackground.classList.remove('active');
  }

  document.querySelectorAll('.cta-button').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      showForm();
    });
  });

  document.querySelector('#form-close').addEventListener('click', (e) => {
    e.preventDefault();
    hideForm();
  });

  form.addEventListener('submit', (e) => {
    // prevent reload
    e.preventDefault();

    function setErrorFor(inputId, message) {
      document.getElementById(inputId).classList.add('error');
      document.getElementById(`${inputId}-error`).innerHTML = message;
    }

    function setSuccessFor(inputId) {
      document.getElementById(`${inputId}-error`).innerHTML = '';
      const input = document.getElementById(inputId);
      input.classList.remove('error');
      input.classList.add('success');
    }

    const isEmail = (email) => {
      return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(email);
    };

    // Password must be at least 8 characters long, have a number, and a special character, and 1 capital letter
    const isValidPassword = (password) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(
        password
      );
    };

    let valid = true;

    const username = document.querySelector('#username');
    const usernameValue = username.value.trim();
    if (usernameValue === '') {
      setErrorFor('username', 'Username cannot be blank');
      valid = false;
    } else {
      setSuccessFor('username');
    }

    const email = document.querySelector('#email');
    const emailValue = email.value.trim();
    if (emailValue === '') {
      setErrorFor('email', 'Email cannot be blank');
      valid = false;
    } else if (!isEmail(emailValue)) {
      setErrorFor('email', 'Email is not valid');
      valid = false;
    } else {
      setSuccessFor('email');
    }

    const password = document.querySelector('#password');
    const passwordValue = password.value.trim();
    if (passwordValue === '') {
      setErrorFor('password', 'Password cannot be blank');
      valid = false;
    } else if (passwordValue.length < 8) {
      setErrorFor('password', 'Password must be at least 8 characters');
      valid = false;
    } else if (!isValidPassword(passwordValue)) {
      setErrorFor(
        'password',
        'Password must contain a special character, a number, and a capital letter'
      );
      valid = false;
    } else {
      setSuccessFor('password');
    }

    const confirmPassword = document.querySelector('#confirm-password');
    const confirmPasswordValue = confirmPassword.value.trim();

    if (confirmPasswordValue === '') {
      setErrorFor('confirm-password', 'Confirm Password cannot be blank');
      valid = false;
    } else if (confirmPasswordValue !== passwordValue) {
      setErrorFor('confirm-password', 'Passwords do not match');
      valid = false;
    } else {
      setSuccessFor('confirm-password');
    }

    if (valid) {
      alert('form submitted!');
    }
  });
});
