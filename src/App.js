
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load users. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>React API Integration</h1>
        <p>Frontend Consuming API</p>
      </header>

      <main className="container">
        <h2>User Directory</h2>

        {loading && <p className="message">Loading users...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="user-grid">
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <div className="avatar">
                  {user.name.charAt(0)}
                </div>
                <h3>{user.name}</h3>
                <p>📧 {user.email}</p>
                <p>🏢 {user.company.name}</p>
                <p>📍 {user.address.city}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        React Fundamentals | API Integration Task
      </footer>
    </div>
  );
}

export default App;
