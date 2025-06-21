const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const currentTaskDisplay = document.getElementById('currentTask');

let tasks = JSON.parse(localStorage.getItem('limitwork-tasks')) || [];
let currentIndex = 0;

function saveTasks() {
    localStorage.setItem('limitwork-tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <span>${task.label} - ${task.duration} menit</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function sendNotification(title, message) {
    OneSignal.sendSelfNotification(
        title,
        message,
        '',
        '',
        {
            notificationType: 'limitwork'
        }
    );
}

function startReminderLoop() {
    if (!tasks.length) return;
    const task = tasks[currentIndex];
    currentTaskDisplay.innerText = `Sedang: ${task.label} (${task.duration} menit)`;

    setTimeout(() => {
        sendNotification('LimitWork', `Selesai: ${task.label}`);
        currentIndex = (currentIndex + 1) % tasks.length;
        startReminderLoop();
    }, task.duration * 60000);
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const label = document.getElementById('label').value.trim();
    const duration = parseInt(document.getElementById('duration').value);

    if (label && duration > 0) {
        tasks.push({ label, duration });
        saveTasks();
        renderTasks();
        taskForm.reset();
        if (tasks.length === 1) startReminderLoop();
    }
});

renderTasks();
if (tasks.length) startReminderLoop();