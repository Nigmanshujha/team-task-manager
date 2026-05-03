import { useEffect, useState } from "react";
import API from "../api/api";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const projectId = "69f6f3cde1ca5412b98752c3";

  const load = async () => {
    const t = await API.get("/tasks");
    setTasks(t.data);

    const p = await API.get("/projects");
    setMembers(p.data[0]?.members || []);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!title) return alert("Enter task title");

    await API.post("/tasks", {
      title,
      project: projectId,
      assignedTo,
    });

    setTitle("");
    setAssignedTo("");
    load();
  };

  const update = async (id: string, status: string) => {
    await API.put(`/tasks/${id}`, { status });
    load();
  };

  const del = async (id: string) => {
    await API.delete(`/tasks/${id}`);
    load();
  };

  return (
    <div>
      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 30px",
          background: "#111827",
          color: "white",
        }}
      >
        <h2>TeamTask</h2>

        <div>
          <button onClick={() => (window.location.href = "/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => (window.location.href = "/tasks")}>
            Tasks
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            style={{ background: "red", marginLeft: "10px" }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container">
        <h1>Task Manager</h1>

        {/* CREATE TASK */}
        <div className="card">
          <h3>Create Task</h3>

          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Assign Member</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>

          <button onClick={create}>Add Task</button>
        </div>

        {/* TASK LIST */}
        {tasks.map((t) => (
          <div className="card" key={t._id}>
            <h3>{t.title}</h3>

            <p>Assigned: {t.assignedTo?.name || "None"}</p>

            <p>Status:</p>

            <select
              value={t.status}
              onChange={(e) => update(t._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <br />

            <button onClick={() => del(t._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}