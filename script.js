
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const emptyMessage = document.getElementById("emptyMessage");


// Load tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display existing tasks
displayTasks();


// Add task using button
addTaskBtn.addEventListener("click", addTask);


// Add task using Enter key
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Add Task Function
function addTask() {

    const taskText = taskInput.value.trim();

    // Check empty input
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }


    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };


    // Add task to array
    tasks.push(task);


    // Save tasks
    saveTasks();


    // Display tasks
    displayTasks();


    // Clear input
    taskInput.value = "";

    taskInput.focus();
}


// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";


    // Show empty message
    if (tasks.length === 0) {

        emptyMessage.classList.remove("hidden");

    } else {

        emptyMessage.classList.add("hidden");
    }


    // Create each task
    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className =
            "bg-gray-800 border border-gray-700 rounded-lg " +
            "p-4 flex items-center gap-3";


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.className =
            "w-5 h-5 accent-blue-600 cursor-pointer";


        // Task Text
        const taskText = document.createElement("span");

        taskText.textContent = task.text;

        taskText.className =
            "flex-1 text-gray-200 break-words";


        // Completed styling
        if (task.completed) {

            taskText.classList.add(
                "line-through",
                "text-gray-500"
            );
        }


        // Checkbox event
        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();

            displayTasks();

        });


        // Edit Button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className =
            "text-blue-400 hover:text-blue-300 text-sm";


        editButton.addEventListener("click", function() {

            const newText = prompt(
                "Edit your task:",
                task.text
            );


            if (newText !== null) {

                const updatedText = newText.trim();


                if (updatedText !== "") {

                    task.text = updatedText;

                    saveTasks();

                    displayTasks();
                }
            }

        });


        // Delete Button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className =
            "text-red-400 hover:text-red-300 text-sm";


        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {

                return item.id !== task.id;

            });


            saveTasks();

            displayTasks();

        });


        // Add elements to task
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);


        // Add task to list
        taskList.appendChild(li);

    });


    // Update counters
    updateCounts();
}


// Update Task Counters
function updateCounts() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    const pending = total - completed;


    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;
}


// Save tasks to Local Storage
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// Clear All Tasks
clearAllBtn.addEventListener("click", function() {

    if (tasks.length === 0) {
        return;
    }


    const confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );


    if (confirmClear) {

        tasks = [];

        saveTasks();

        displayTasks();
    }

});
