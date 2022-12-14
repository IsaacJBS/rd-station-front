const form = document.querySelector("#form")
const clientName = document.querySelector("#name") 
const email = document.querySelector("#email") 
const tel = document.querySelector("#tel") 
const occupation = document.querySelector("#occupation") 
const pass = document.querySelector("#pass") 
const confirmPass = document.querySelector("#confirm-pass") 
const site = document.querySelector("#site") 

const messageConfirmation = document.querySelector(".success-message")

const loader = document.querySelector(".loader")

const urlPost = "https://rdstation-signup-psel.herokuapp.com"

tel.addEventListener('input', handleInput, false)

function handleInput (e) {
  e.target.value = phoneMask(e.target.value)
}

form.addEventListener("submit", e => {
  e.preventDefault()

  checkForm()
})

async function postFetch (body) {
  try {
    loader.classList.add("loader-show")
    const requisition = await fetch(urlPost, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  })
  const responseApi = await requisition.json()

  if (responseApi.success) {
    form.classList.remove("form-control")
    form.classList.add("confirm-post")
    messageConfirmation.classList.remove("success-message")
    messageConfirmation.classList.add("confirm-message")
    window.scrollTo({ top: 0});
  }
  } catch (error) {
    throw new Error(error)
  } finally {
    loader.classList.remove("loader-show")
  }
}

function checkForm() {
  const clientNameValue = clientName.value.trim()
  const emailValue = email.value.trim()
  const telValue = tel.value.trim()
  const occupationValue = occupation.value.trim()
  const passValue = pass.value.trim()
  const confirmPassValue = confirmPass.value.trim()
  const siteValue = site.value.trim()

  if (clientNameValue === "") {
    setError(clientName, "O campo nome é obrigatório.")
  } else {
    setSuccess(clientName)
  }

  if (emailValue === "") {
    setError(email, "O campo email é obrigatório.")
  } else if (!checkEmail(emailValue)) {
    setError(email, "Por favor, insira um email válido.");
  } else {
    setSuccess(email);
  }

  if (telValue === "") {
    setError(tel, "O tel é obrigatório.")
  } else {
    setSuccess(tel);
  }

  if (occupationValue === "") {
    setError(occupation, "O seu cargo é obrigatório.")
  } else {
    setSuccess(occupation);
  }

  if (passValue === "") {
    setError(pass, "O campo senha é obrigatório.")
  } else if (!checkPassword(passValue)) {
    setError(pass, "O campo senha deve conter 6 a 10 caracteres, uma letra minúscula e uma maiúscula, e pelo menos um número.")
  } else {
    setSuccess(pass);
  }

  if (confirmPassValue === "") {
    setError(confirmPass, "Por favor, confirme a senha.")
  } else if (confirmPassValue !== passValue){
    setError(confirmPass, "As senhas não conferem")
  }  else {
    setSuccess(confirmPass);
  }

  if (siteValue === "") {
    setError(site, "O campo site é obrigatório.")
  } else if (!checkUrl(siteValue)) {
    setError(site, "Por favor, insira uma url válida")
  } else {
    setSuccess(site);
  }

  const formControls = form.querySelectorAll(".form-control")

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success"
  })

  if (formIsValid) {
    const body = {
      clientName: clientNameValue,
      email: emailValue,
      tel: telValue,
      occupation: occupationValue,
      pass: passValue,
      site: siteValue
    }
    postFetch(body)
  }
}

function setError(input, message) {
  const formControl = input.parentElement
  const errorMessage = formControl.querySelector("small")

  errorMessage.innerText = message

  formControl.className = "form-control error"
}

function setSuccess(input) {
  const formControl = input.parentElement;

  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function checkPassword (pass) {
  return pass.match(/[a-z]/g) && pass.match(/[A-Z]/g) && pass.match(/[0-9]/g) && pass.length >= 6 && pass.length <= 10
}

function checkUrl (url) {
  return url.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)
}


function phoneMask (phone) {
  return phone.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{5})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}
