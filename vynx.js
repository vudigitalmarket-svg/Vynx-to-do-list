
// import questions from 'questions.json';

// const myquestion = JSON.parse(questions);




let tasks = [];


const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const taskCounter = document.getElementById("task-counter");
const progressFill = document.getElementById("progress-fill");
const progressBar = document.getElementById("progress-bar");

const emptyState = document.getElementById("empty-state");


// UPDATE PROGRESS
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


// SAVE TASKS
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// LOAD TASKS
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}


// CREATE AND DISPLAY TASK
function renderTask(taskData) {
  const taskItem = document.createElement("li");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.classList.add("task-checkbox");

  taskCheckbox.checked = taskData.completed;

  const taskTextElement = document.createElement("span");
  taskTextElement.textContent = taskData.text;

  taskTextElement.classList.toggle("completed", taskData.completed);


  // COMPLETE TASK
  taskCheckbox.addEventListener("change", function () {
    taskData.completed = taskCheckbox.checked;

    taskTextElement.classList.toggle("completed", taskData.completed);

    saveTasks();

    updateProgress();
  });


  // DELETE TASK
  const deleteButton = document.createElement("button");

  deleteButton.textContent = "×";
  deleteButton.type = "button";
  deleteButton.classList.add("delete-button");

  deleteButton.setAttribute("aria-label", "Delete task");

  deleteButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete?")) {

      tasks = tasks.filter(function (task) {
        return task !== taskData;
      });

      taskItem.remove();

      saveTasks();

      updateProgress();
    }
  });


  // ADD ELEMENTS TO TASK
  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
}



// ADD TASK
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const taskData = {
    text: taskText,
    completed: false
  };

  tasks.push(taskData);

  renderTask(taskData);

  saveTasks();

  updateProgress();

  taskInput.value = "";
});



// INITIALIZE VYNX
loadTasks();

tasks.forEach(function (task) {
  renderTask(task);
});

updateProgress();