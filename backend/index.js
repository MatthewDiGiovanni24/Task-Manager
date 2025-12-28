const express = require("express");
const cors = require("cors");

const app = express();

// Allow all origins for testing in Kubernetes
app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Get tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = { id: nextId++, title, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).send();
});

// Update task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = req.body.completed ?? task.completed;
    task.title = req.body.title ?? task.title;

    res.json(task);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Backend running on port ${PORT}`));
