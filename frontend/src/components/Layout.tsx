import { Link } from "react-router-dom";

export default function Layout({ children }: any) {
  return (
    <div className="app">
      <div className="sidebar">
        <h2>Task Manager</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
      </div>

      <div className="main">{children}</div>
    </div>
  );
}