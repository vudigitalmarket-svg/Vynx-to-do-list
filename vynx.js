const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const taskCounter = document.getElementById("task-counter");
const progressFill = document.getElementById("progress-fill");
const progressBar = document.getElementById("progress-bar");

const emptyState = document.getElementById("empty-state");

localStorage.setItem("name", "tony");
localStorage.setItem("food", "plantain");
const myName = localStorage.getItem("name");
console.log(myName);
// const myName = localStorage.getItem("name");
// console.log(myName);
localStorage.removeItem("food");
localStorage.clear();

// console.log(myFood);
 const doy = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
 for (let index = 0; index < doy.length; index++) {
    const element = doy[index];
    console.log(element);
    
    // console.log(doy[index]);
    
 }
//  console.log(doy);
//  doy.forEach((day , i) => {
// //   console.log(doy[i]);
//   console.log(day);
//  })
 doy.forEach(function (day , i) {   
//   console.log(doy[i]);
  console.log(day);
 })
// async function checkName() {
//  const name = await "tony";
//  console.log(name);
 
    
 
// }

// console.log(checkName());

const person = {
    name:"vivian",
    age: 23,
    isFemale: true,
    hobbies: ["sleeping", "singing", "watch movies"]
}

const {age , name} = person;
console.log(age);
console.log(name);

function checkAge() {
    console.log("hiiii");
    
}



checkAge();


function updateProgress() {
  const totalTasks = taskList.children.length;

  const completedTasks = taskList.querySelectorAll(".completed").length;

  taskCounter.textContent = `${completedTasks} of ${totalTasks} tasks completed`;

  const progressPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  progressFill.style.width = `${progressPercentage}%`;

  progressBar.setAttribute("aria-valuenow", progressPercentage);
  emptyState.style.display = totalTasks === 0 ? "block" : "none";
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const taskItem = document.createElement("li");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.classList.add("task-checkbox");

  const taskTextElement = document.createElement("span");
  taskTextElement.textContent = taskText;

  taskCheckbox.addEventListener("change", function () {
    taskTextElement.classList.toggle("completed", taskCheckbox.checked);
    updateProgress();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "×";
  deleteButton.type = "button";
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("aria-label", "Delete task");

  deleteButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete")) {
      taskItem.remove();
      updateProgress();
    }
  });

  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
  updateProgress();
  taskInput.value = "";
});
updateProgress();
