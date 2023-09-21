const updateTaskForm = document.forms.updateTaskForm;

const addMoreTagsBtn = document.getElementById("addMoreTagsBtn");
const todayOnlyBtn = document.getElementById("todayOnlyBtn");

addMoreTagsBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (updateTaskForm.tag.value.trim() != "") {
    let newTag = `
    <div class="tag flex">
    <p>${updateTaskForm.tag.value}</p>
    <button class="tagCancelBtn" onclick="tagCancel(this)">&#215</button>
    </div>
        `;
    document.querySelector(".list-of-tags").innerHTML += newTag;
    updateTaskForm.tag.value = "";
  }
});
todayOnlyBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  updateTaskForm.dueTime.value = `11:59`;
});
function tagCancel(btnElem) {
  btnElem.parentElement.remove();
}
updateTaskForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let [titleError, descriptionError] = [
    document.getElementById("titleError"),
    document.getElementById("descriptionError"),
  ];
  let validate_check = [false, false];

  if (updateTaskForm.title.value.trim() == "") {
    titleError.classList.add("showError");
    validate_check[0] = false;
    titleError.innerHTML = "** required Field";
  } else {
    titleError.classList.remove("showError");
    validate_check[0] = true;
  }

  if (updateTaskForm.description.value.trim() == "") {
    descriptionError.classList.add("showError");
    validate_check[1] = false;
    descriptionError.innerHTML = "** required Field";
  } else {
    descriptionError.classList.remove("showError");
    validate_check[1] = true;
  }

  let counter = 0;
  while (counter <= validate_check.length) {
    if (counter == validate_check.length) {
      const listOfTags = document.querySelector(".list-of-tags").children;

      debugger;

      for (let i = 0; i < listOfTags.length; i++) {
        updateTaskForm.tag.value +=
          listOfTags[i].firstElementChild.innerText + ",";
      }
      updateTaskForm.submit();
    }
    if (validate_check[counter] == false) break;
    counter++;
  }
});