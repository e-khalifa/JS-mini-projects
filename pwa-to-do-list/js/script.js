if ('serviceWorker' in navigator) {
    console.log(Notification.permission);

    navigator.serviceWorker.register('/task2/service-worker.js')
        .then(registration => {
            console.log(`Service Worker Registered: ${registration.scope}`)
        })
        .catch(err => {
            console.log(`Service Worker registration failed:${err}`);
        });
}

if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        permission == 'granted' ? console.log('Notification Permission Granted') : console.log('Notification Permission Denied')
    })
}

var dbPromise = idb.open('task2Db', 1, upgradeDb => {
    var store = upgradeDb.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
})
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskName = document.getElementById("taskName").value;
    let taskHours = document.getElementById("taskHours").value;
    let taskMinutes = document.getElementById("taskMinutes").value;
    let taskDate = document.getElementById("taskDate").value;

    if (!taskName || !taskDate || taskHours === "" || taskMinutes === "") {
        alert("Please enter task name, date, and time.");
        return;
    }
    let currentTime = new Date();
    let taskTime = new Date(`${taskDate}T${taskHours.padStart(2, "0")}:${taskMinutes.padStart(2, "0")}`);
    let delay = taskTime - currentTime
    if (delay <= 0) {
        alert("Selected time must be in the future!");
        return;
    }
    let task = {
        name: taskName,
        time: `${taskHours.padStart(2, "0")}:${taskMinutes.padStart(2, "0")}`,
        date: taskDate,
        notified: false
    };
    dbPromise.then(db => {
        var tx = db.transaction('tasks', 'readwrite');
        var store = tx.objectStore('tasks');
        return store.add(task);
    }).catch(() => {
        console.log('failed to add task in indexedDB')
    })
    loadTasks();
    navigator.serviceWorker.ready.then(registration => {
        console.log('social worker ready')
        setTimeout(() => {
            registration.showNotification(task.name, {
                body: "Don't forget your task!",
                icon: 'http://127.0.0.1:5500/task2/manifest_and_icons/icon512_rounded.png'
            });
            updateNotifiedTask(task);
        }, delay);
    });

    document.getElementById("taskName").value = "";
    document.getElementById("taskHours").value = "";
    document.getElementById("taskMinutes").value = "";
    document.getElementById("taskDate").value = "";
}

function loadTasks() {
    dbPromise.then(db => {
        var tx = db.transaction('tasks', 'readonly');
        var store = tx.objectStore('tasks');
        return store.getAll()
            .then(tasks => {
                let taskList = document.getElementById("taskList");
                taskList.innerHTML = "";

                tasks.forEach((task) => {
                    let li = document.createElement("li");

                    li.innerHTML = task.notified
                        ? `<del>${task.name} - ${task.time} on ${task.date}</del>
               <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>`
                        : `${task.name} - ${task.time} on ${task.date} 
               <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>`;
                    taskList.appendChild(li);
                });
            })
    }).catch(() => {
        console.log('failed to load tasks from indexedDB')
    })

}

function deleteTask(taskId) {
    dbPromise.then(db => {
        var tx = db.transaction('tasks', 'readwrite');
        var store = tx.objectStore('tasks');
        store.delete(taskId)
        return tx.complete;
    }).then(() => {
        console.log('Task deleted');
        loadTasks();
    }).catch(() => {
        console.log('Failed to delete task from IndexedDB');
    });
}

function updateNotifiedTask(task) {
    dbPromise.then(db => {
        var tx = db.transaction('tasks', 'readwrite');
        var store = tx.objectStore('tasks');

        store.getAll()
            .then(tasks => {
                let existingTask = tasks.find(t => t.name === task.name && t.date === task.date && t.time === task.time);
                if (existingTask) {
                    existingTask.notified = true;
                    store.put(existingTask)
                }
            });
        return tx.complete;
    }).then(() => {
        console.log("Task notification status updated in IndexedDB.");
        loadTasks();
    }).catch(() => {
        console.log("Failed to update task in IndexedDB.");
    });
}
