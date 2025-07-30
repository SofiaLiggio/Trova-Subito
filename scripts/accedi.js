function accedi() {
  const input_email = document.getElementById("inputEmail");
  const value_email = input_email.value;
  //   console.log(value_email);
  localStorage.setItem("email", value_email);

  const input_password = document.getElementById("inputPassword");
  const value_password = input_password.value;
  //   console.log(value_password);
  localStorage.setItem("password", value_password);
}
