function inviaMessaggio() {
  const input_name = document.getElementById("f-nome");
  const value_name = input_name.value;

  const input_email = document.getElementById("f-email");
  const value_email = input_email.value;

  const input_msg = document.getElementById("f-messaggio");
  const value_msg = input_msg.value;

  const form = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // blocca l'invio predefinito del form

    const nomeInput = document.getElementById("f-nome");
    const nome = nomeInput.value.trim();
    const erroreNome = document.getElementById("nomeError");
    let nameIsValid = true;

    if (nome === "") {
      erroreNome.textContent = "Il campo Nome è obbligatorio";
      nomeInput.classList.add("is-invalid");
      nomeInput.classList.remove("is-valid");
      nameIsValid = false; // indica che c'è almeno un errore
    } else {
      erroreNome.textContent = "";
      nomeInput.classList.remove("is-invalid");
      nomeInput.classList.add("is-valid");
    }

    const emailInput = document.getElementById("f-email");
    const email = emailInput.value.trim();
    const erroreEmail = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailIsValid = true;

    if (email === "") {
      erroreEmail.textContent = "Il campo Indirizzo email è obbligatorio";
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      emailIsValid = false;
    } else if (!emailRegex.test(email)) {
      erroreEmail.textContent = "L'indirizzo email non è valido";
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      emailIsValid = false;
    } else {
      erroreEmail.textContent = "";
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
    }

    const msgInput = document.getElementById("f-messaggio");
    const msg = msgInput.value.trim();
    const erroreMsg = document.getElementById("messaggioError");
    let msgIsValid = true;

    if (msg === "") {
      erroreMsg.textContent = "Il campo Messaggio è obbligatorio";
      msgInput.classList.add("is-invalid");
      msgInput.classList.remove("is-valid");
      msgIsValid = false;
    } else {
      erroreMsg.textContent = "";
      msgInput.classList.remove("is-invalid");
      msgInput.classList.add("is-valid");
    }

    if (nameIsValid && emailIsValid && msgIsValid) {
      // se tutti i campi sono validi, salva in localStorage
      localStorage.setItem("nome", nome);
      localStorage.setItem("email", email);
      localStorage.setItem("messaggio", msg);

      contactMessage.textContent =
        "Messaggio inviato con successo e dati salvati!";
      contactMessage.className = "mt-3 alert alert-success";
      form.reset();
    }
  });
}
