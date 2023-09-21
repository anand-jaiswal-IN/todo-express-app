const newTaskForm = document.forms.newTaskForm;

const addMoreTagsBtn = document.getElementById("addMoreTagsBtn");
const todayOnlyBtn = document.getElementById("todayOnlyBtn");

addMoreTagsBtn.addEventListener("click", (ev) => {
  ev.preventDefault();

  if (newTaskForm.tag.value.trim() != "") {
    let newTag = `
    <div class="tag flex">
    <p>${newTaskForm.tag.value}</p>
    <button class="tagCancelBtn" onclick="tagCancel(this)">&#215</button>
    </div>
        `;
    document.querySelector(".list-of-tags").innerHTML += newTag;
    newTaskForm.tag.value = "";
  }
});
todayOnlyBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  newTaskForm.dueTime.value = `11:59`;
});
{
  const dateNow = new Date();
  let [year, month, date] = [
    dateNow.getFullYear(),
    dateNow.getMonth() + 1,
    dateNow.getDate(),
  ];

  if (month.toString().length < 2) {
    month = "0" + month;
  }

  if (date.toString().length < 2) {
    date = "0" + date;
  }

  newTaskForm.dueDate.setAttribute("value", `${year}-${month}-${date}`);
  newTaskForm.dueDate.setAttribute("min", `${year}-${month}-${date}`);

  let [hours, minutes] = [dateNow.getHours(), dateNow.getMinutes()];
  if (hours.toString().length < 2) {
    hours = "0" + hours;
  }
  if (minutes.toString().length < 2) {
    minutes = "0" + minutes;
  }
  newTaskForm.dueTime.setAttribute("value", `${hours}:${minutes}`);

  newTaskForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
  });

  function tagCancel(btnElem) {
    btnElem.parentElement.remove();
  }
}

newTaskForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  // debugger;
  let [titleError, descriptionError] = [
    document.getElementById("titleError"),
    document.getElementById("descriptionError"),
  ];
  let validate_check = [false, false];

  if (newTaskForm.title.value.trim() == "") {
    titleError.classList.add("showError");
    validate_check[0] = false;
    titleError.innerHTML = "** required Field";
  } else {
    titleError.classList.remove("showError");
    validate_check[0] = true;
  }

  if (newTaskForm.description.value.trim() == "") {
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

      for (let i = 0; i < listOfTags.length; i++) {
        newTaskForm.tag.value +=
          listOfTags[i].firstElementChild.innerText + ",";
      }
      
      newTaskForm.submit();
    }
    if (validate_check[counter] == false) break;
    counter++;
  }
});
