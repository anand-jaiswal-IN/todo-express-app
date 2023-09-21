//passward show and hide features
const loginForm = document.forms.loginForm;
// const loginForm = document.forms[0];
const showPasswardBtn = document.getElementById("showPasswardBtn");
const hidePasswardBtn = document.getElementById("hidePasswardBtn");

hidePasswardBtn.style.display = "none";

showPasswardBtn.addEventListener("click", (ev) => {
  showPasswardBtn.style.display = "none";
  loginForm.passward.setAttribute("type", "text");
  hidePasswardBtn.style.display = "inline-block";
});

hidePasswardBtn.addEventListener("click", (ev) => {
  hidePasswardBtn.style.display = "none";
  loginForm.passward.setAttribute("type", "password");
  showPasswardBtn.style.display = "inline-block";
});

// login form
const [emailError, passwardError] = [
  document.getElementById("emailError"),
  document.getElementById("passwardError"),
];

loginForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let validate_check = [false, false];

  if (validateEmail(loginForm.email.value)) {
    emailError.classList.remove("showError");
    validate_check[0] = true;
  } else {
    emailError.classList.add("showError");
    emailError.innerHTML = "Enter correct email";
  }

  if (loginForm.passward.value == "") {
    passwardError.classList.add("showError");
    passwardError.innerHTML = "**Empty passward";
  } else {
    passwardError.classList.remove("showError");
    validate_check[1] = true;
  }

  let counter = 0;
  while (counter <= validate_check.length) {
    if (counter == validate_check.length) {
      loginForm.submit();
    }
    if (validate_check[counter] == false) {
      break;
    }
    counter++;
  }
});
function validateEmail(value) {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
  return regex.test(value) ? true : false;
}
