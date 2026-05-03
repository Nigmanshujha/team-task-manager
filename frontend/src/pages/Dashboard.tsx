import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    API.get("/tasks").then((res) => {
      const tasks = res.data;

      setData({
        total: tasks.length,
        completed: tasks.filter((t: any) => t.status === "completed").length,
        pending: tasks.filter((t: any) => t.status === "pending").length,
      });
    });
  }, []);

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

      {/* CONTENT */}
      <div className="container">
        <h1>Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div className="card">Total: {data.total}</div>
          <div className="card">Completed: {data.completed}</div>
          <div className="card">Pending: {data.pending}</div>
        </div>
      </div>
    </div>
  );
}