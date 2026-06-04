
const toggleBtn = document.getElementById("toggleMode");
const input = document.getElementById("inputtext");
const taskDate = document.getElementById("taskDate");
const btn = document.getElementById("btnadd");
const list = document.getElementById("list");
const currentDate = document.getElementById("currentDate");


toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙 Dark Mode";
    }
};


window.onload = () => {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggleBtn.textContent = "☀️ Light Mode";
    }

   
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(t => createTask(t.text, t.completed, t.dueDate));

    
    currentDate.textContent = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
};


btn.onclick = () => {
    const value = input.value.trim();

    if (!value) return alert("Enter task!");

    createTask(value, false, taskDate.value || "No due date");

    input.value = "";
    taskDate.value = "";

    save();
};


input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btn.click();
});


function createTask(text, done, date) {

    const li = document.createElement("li");

    const content = document.createElement("div");
    content.className = "task-content";

    const span = document.createElement("span");
    span.textContent = text;

    const d = document.createElement("div");
    d.className = "task-date";
    d.textContent = date;

    if (done) span.classList.add("completed");

    content.appendChild(span);
    content.appendChild(d);

    span.onclick = () => {
        span.classList.toggle("completed");
        save();
    };

    const del = document.createElement("button");
    del.textContent = "✕";
    del.className = "delete-btn";

    del.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        save();
    };

    li.appendChild(content);
    li.appendChild(del);

    list.appendChild(li);
}


function save() {
    const tasks = [];

    document.querySelectorAll("#list li").forEach(li => {

        const text = li.querySelector("span").textContent;
        const done = li.querySelector("span").classList.contains("completed");
        const date = li.querySelector(".task-date").textContent;

        tasks.push({
            text,
            completed: done,
            dueDate: date
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

