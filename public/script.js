document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  const todoList = document.getElementById("todo-list");

  form.onsubmit = function (e) {
    e.preventDefault();
    const task = taskInput.value;
    addTask(task);
    taskInput.value = ""; // Clear input after submit
  };

  // Add a new task
  function addTask(task) {
    fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        getTasks(); // Refresh the list after adding
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Fetch all tasks
  function getTasks() {
    fetch("/todos")
      .then((response) => response.json())
      .then((tasks) => {
        todoList.innerHTML = ""; // Clear existing tasks
        tasks.forEach((task) => {
          const li = document.createElement("li");
          li.textContent = task.task;
          todoList.appendChild(li);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Initial fetch of tasks
  getTasks();
});
