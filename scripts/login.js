const contactMessage = document.getElementById("contactMessage");
const accedi_form = document.getElementById("contactForm");

// localStorage accedi
function accedi() {
  const input_email = document.getElementById("inputEmail");
  const value_email = input_email.value;
  const email_accedi_error = document.getElementById("emailAccediError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let em_acc_valid = true;

  if (value_email === "") {
    email_accedi_error.textContent = "Il campo Indirizzo email è obbligatorio";
    input_email.classList.add("is-invalid");
    input_email.classList.remove("is-valid");
    em_acc_valid = false;
  } else if (!emailRegex.test(value_email)) {
    email_accedi_error.textContent = "L'indirizzo email non è valido";
    input_email.classList.add("is-invalid");
    input_email.classList.remove("is-valid");
    em_acc_valid = false;
  } else {
    email_accedi_error.textContent = "";
    input_email.classList.remove("is-invalid");
    input_email.classList.add("is-valid");
  }

  const input_password = document.getElementById("inputPassword");
  const value_password = input_password.value;
  const password_accedi_error = document.getElementById("passwordAccediError");
  const passwordRegex = /^[a-zA-Z0-9]{8,20}$/;
  let pass_acc_valid = true;

  if (value_password === "") {
    password_accedi_error.textContent = "Il campo Password è obbligatorio";
    input_password.classList.add("is-invalid");
    input_password.classList.remove("is-valid");
    pass_acc_valid = false;
  } else if (!passwordRegex.test(value_password)) {
    password_accedi_error.textContent = "La password non è valida";
    input_password.classList.add("is-invalid");
    input_password.classList.remove("is-valid");
    pass_acc_valid = false;
  } else {
    password_accedi_error.textContent = "";
    input_password.classList.remove("is-invalid");
    input_password.classList.add("is-valid");
  }

  if (em_acc_valid && pass_acc_valid) {
    // se tutti i campi sono validi, salva in localStorage
    localStorage.setItem("email", value_email);
    localStorage.setItem("password", value_password);

    contactMessage.textContent = "Dati salvati!";
    contactMessage.className = "mt-3 alert alert-success";
    accedi_form.reset();
  }
}

// localStorage registrati
function registrati() {
  // Indirizzo email
  const input_reg_email = document.getElementById("registerEmail");
  const value_reg_email = input_reg_email.value;
  const email_error = document.getElementById("emailRegisterError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailIsValid = true;

  if (value_reg_email === "") {
    email_error.textContent = "Il campo Indirizzo email è obbligatorio";
    input_reg_email.classList.add("is-invalid");
    input_reg_email.classList.remove("is-valid");
    emailIsValid = false;
  } else if (!emailRegex.test(value_reg_email)) {
    email_error.textContent = "L'indirizzo email non è valido";
    input_reg_email.classList.add("is-invalid");
    input_reg_email.classList.remove("is-valid");
    emailIsValid = false;
  } else {
    email_error.textContent = "";
    input_reg_email.classList.remove("is-invalid");
    input_reg_email.classList.add("is-valid");
  }
  localStorage.setItem("email", value_reg_email);

  // Password
  const input_reg_password = document.getElementById("registerPassword");
  const value_reg_password = input_reg_password.value;
  const password_error = document.getElementById("passwordRegisterError");
  const passwordRegex = /^[a-zA-Z0-9]{8,20}$/;
  let passwordIsValid = false;

  if (value_reg_password === "") {
    password_error.textContent = "Il campo Password è obbligatorio";
    input_reg_password.classList.add("is-invalid");
    input_reg_password.classList.remove("is-valid");
    passwordIsValid = false;
  } else if (!passwordRegex.test(value_reg_password)) {
    password_error.textContent = "La password non è valida";
    input_reg_password.classList.add("is-invalid");
    input_reg_password.classList.remove("is-valid");
    passwordIsValid = false;
  } else {
    password_error.textContent = "";
    input_reg_password.classList.remove("is-invalid");
    input_reg_password.classList.add("is-valid");
  }

  // Conferma password
  const input_reg_conferma_password =
    document.getElementById("confirmPassword");
  const value_reg_conferma_password = input_reg_conferma_password.value;
  const confirm_password_error = document.getElementById(
    "confirmPasswordRegisterError"
  );
  const confirmPasswordRegex = /^[a-zA-Z0-9]{8,20}$/;
  let confirmPasswordIsValid = false;

  if (value_reg_conferma_password === "") {
    confirm_password_error.textContent =
      "Il campo Conferma password è obbligatorio";
    input_reg_conferma_password.classList.add("is-invalid");
    input_reg_conferma_password.classList.remove("is-valid");
    confirmPasswordIsValid = false;
  } else if (!confirmPasswordRegex.test(value_reg_conferma_password)) {
    confirm_password_error.textContent = "La password non è valida";
    input_reg_conferma_password.classList.add("is-invalid");
    input_reg_conferma_password.classList.remove("is-valid");
    confirmPasswordIsValid = false;
  } else {
    confirm_password_error.textContent = "";
    input_reg_conferma_password.classList.remove("is-invalid");
    input_reg_conferma_password.classList.add("is-valid");
  }

  if (value_reg_password === value_reg_conferma_password) {
    localStorage.setItem("password", value_reg_password);
    localStorage.setItem("conferma password", value_reg_conferma_password);
    contactMessage.textContent = "Dati salvati!";
    contactMessage.className = "mt-3 alert alert-success";
    form.reset();
  } else {
    alert("Le password non corrispondono!");
  }
}

// Select menu
const select = document.getElementById("formSelect");
const form_accedi = document.getElementById("loginFormContainer");
const form_registrati = document.getElementById("registerFormContainer");
const btn_accedi = document.getElementById("accediButton");
const btn_registrati = document.getElementById("registratiButton");

select.addEventListener("change", function () {
  const valore_selezionato = select.value;
  if (valore_selezionato === "accedi") {
    form_accedi.style.display = "block";
    form_registrati.style.display = "none";
    // btn_accedi.textContent = "Accedi"
  } else if (valore_selezionato === "registrati") {
    form_registrati.style.display = "block";
    form_accedi.style.display = "none";
  }
});
