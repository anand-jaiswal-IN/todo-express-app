const signUpForm = document.forms.signUpForm;

signUpForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const [fullNameError, emailError, passwardError, confirmPasswardError] = [
    document.getElementById("fullNameError"),
    document.getElementById("emailError"),
    document.getElementById("passwardError"),
    document.getElementById("confirmPasswardError"),
  ];

  let validation_check = [false, false, false, false]; //fullname, email, passward, confirmpassward

  //validate full name
  if (validatePersonName(signUpForm.fullname.value.trim())) {
    fullNameError.classList.remove("showError");
    validation_check[0] = true;
  } else {
    fullNameError.classList.add("showError");
    fullNameError.innerHTML = "** Person name is not correct";
  }

  //validate email
  if (validateEmail(signUpForm.email.value.trim())) {
    emailError.classList.remove("showError");
    validation_check[1] = true;
  } else {
    emailError.classList.add("showError");
    emailError.innerHTML = "** Email is not correct";
  }

  //validate Passward
  if (validatePassward(signUpForm.passward.value)) {
    passwardError.classList.remove("showError");
    validation_check[2] = true;
  } else {
    passwardError.classList.add("showError");
    passwardError.innerHTML =
      "** Passward should contain uppercase letter, lowercase letter and special character with more than 7 characters";
  }

  // validation of passward and confirm passward
  if (signUpForm.passward.value == signUpForm.confirmPassward.value) {
    confirmPasswardError.classList.remove("showError");
    validation_check[3] = true;
  } else {
    confirmPasswardError.classList.add("showError");
    confirmPasswardError.innerHTML = "** Passward does not match";
  }

  {
    // check empty input
    if (signUpForm.fullname.value == "") {
      fullNameError.classList.add("showError");
      fullNameError.innerHTML = "**required input";
    }
    if (signUpForm.email.value == "") {
      emailError.classList.add("showError");
      emailError.innerHTML = "**required input";
    }
    if (signUpForm.passward.value == "") {
      passwardError.classList.add("showError");
      passwardError.innerHTML = "**required input";
    }
    if (signUpForm.confirmPassward.value == "") {
      confirmPasswardError.classList.add("showError");
      confirmPasswardError.innerHTML = "**required input";
    }
  }

  let counter = 0;
  while (counter <= validation_check.length) {
    if (counter == validation_check.length) {
      signUpForm.submit();
      return;
    }
    if (validation_check[counter] == false) break;
    counter++;
  }
});

function validatePersonName(value) {
  let regex = /^[a-zA-Z-_\s]+$/g;
  return regex.test(value) ? true : false;
}
function validateEmail(value) {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
  return regex.test(value) ? true : false;
}
function validatePassward(value) {
  let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
  return regex.test(value) ? true : false;
}
