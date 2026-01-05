import React, { useState, useEffect } from "react";

const BACKEND_URL = "http://127.0.0.1:54862";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tasks on load
  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Add a task
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await fetch(`${BACKEND_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const createdTask = await res.json();

      // IMPORTANT: append returned task
      setTasks((prev) => [...prev, createdTask]);
      setNewTask("");
    } catch (err) {
      console.error("Add task error:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Toggle completed
  const toggleTask = async (task) => {
    try {
      const res = await fetch(`${BACKEND_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const updated = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading tasks...</h2>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Task Manager</h1>

      <div>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask} style={{ marginLeft: "5px" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginLeft: "10px",
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
