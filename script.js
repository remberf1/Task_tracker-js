let tasks = [];

const button = document.querySelector('.input_btn');
const input = document.querySelector('.input_field');
const taskContainer = document.getElementById('task_container');

// Add a new task
function addTask() {
    const trimmedInput = input.value.trim();
    if (trimmedInput === '') return;

    const newTask = {
        description: trimmedInput,
        status: false,
    };
    tasks.push(newTask);
    input.value = '';
    renderTasks();
    // saveTasksToLocalStorage(); // Optional
}

// Render tasks
function renderTasks() {
    taskContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        taskElement.innerHTML = `
            <input type="checkbox" ${task.status ? 'checked' : ''}>
            <span>${task.description}</span>
            <button class="delete-btn" aria-label="Delete Task">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `;

        const checkbox = taskElement.querySelector('input[type="checkbox"]');
        const span = taskElement.querySelector('span');
        const deleteBtn = taskElement.querySelector('.delete-btn');

        // Toggle task status
        checkbox.addEventListener('change', () => {
            task.status = checkbox.checked;
            renderTasks();
            // saveTasksToLocalStorage(); // Optional
        });

        // Delete task
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
            saveTasksToLocalStorage(); // Optional
        });

        // Apply strikethrough if task is completed
        span.style.textDecoration = task.status ? 'line-through' : 'none';

        taskContainer.appendChild(taskElement);
    });
}

// Button click event
button.addEventListener('click', addTask);

// Pressing Enter in input field
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Optional: Persist tasks in localStorage

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

loadTasksFromLocalStorage(); // Call on page load

