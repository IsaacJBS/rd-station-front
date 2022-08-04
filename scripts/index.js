const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
  const active = nav.classList.contains('active');
  event.currentTarget.setAttribute('aria-expanded', active);
  if (active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
  } else {
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
  }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);


const passwordBtn = document.querySelector(".button-password")
const confirmPasswordBtn = document.querySelector(".button-password-confirm")

passwordBtn.addEventListener('click', showPassword)
confirmPasswordBtn.addEventListener('click', showConfirmPass)

function showPassword () {
  const inputPassword = document.querySelector("#pass")

  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    passwordBtn.classList.add("button-password-hidden")
  } else {
    inputPassword.type = "password";
    passwordBtn.classList.remove("button-password-hidden")
  }
}

function showConfirmPass () {
  const inputPassword = document.querySelector("#confirm-pass")

  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    confirmPasswordBtn.classList.add("button-password-confirm-hidden")
  } else {
    inputPassword.type = "password";
    confirmPasswordBtn.classList.remove("button-password-confirm-hidden")
  }
}

