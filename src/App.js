
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

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
        setError("Unable to load users. Please check your internet.");
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app">
      <header className="header">
        <h1>React API Integration</h1>
        <p>Frontend Consuming API</p>
      </header>

      <main className="container">
        <div className="title-row">
          <div>
            <h2>User Directory</h2>
            <p className="subtitle">
              Explore users and view their profiles.
            </p>
          </div>

          <span className="user-count">
            {users.length} Users
          </span>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search by name, email or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && (
          <p className="message">Loading users...</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="message">No users found.</p>
        )}

        {!loading && !error && (
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <button
                type="button"
                className="user-card"
                key={user.id}
                onClick={() => setSelectedUser(user)}
                aria-label={`View profile of ${user.name}`}
              >
                <div className="card-top">
                  <div className="avatar">
                    {user.name.charAt(0)}
                  </div>
                  <span className="profile-id">
                    ID #{user.id}
                  </span>
                </div>

                <h3>{user.name}</h3>
                <p className="user-email">
                  ✉ {user.email}
                </p>
                <p>🏢 {user.company.name}</p>
                <p>📍 {user.address.city}</p>

                <span className="view-btn">
                  View Profile →
                </span>
              </button>
            ))}
          </div>
        )}
      </main>

      {selectedUser && (
        <div
          className="profile-overlay"
          onClick={() => setSelectedUser(null)}
        >
          <section
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-name"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-btn"
              onClick={() => setSelectedUser(null)}
              aria-label="Close profile"
            >
              ✕
            </button>

            <div className="profile-header">
              <div className="avatar large-avatar">
                {selectedUser.name.charAt(0)}
              </div>

              <h2 id="profile-name">{selectedUser.name}</h2>
              <p className="profile-company">
                {selectedUser.company.name}
              </p>
              <span className="profile-badge">
                User ID: {selectedUser.id}
              </span>
            </div>

            <div className="profile-details">
              <h3>Contact Information</h3>

              <div className="detail-item">
                <span>Email</span>
                <p>{selectedUser.email}</p>
              </div>

              <div className="detail-item">
                <span>Phone</span>
                <p>{selectedUser.phone}</p>
              </div>

              <div className="detail-item">
                <span>Website</span>
                <p>{selectedUser.website}</p>
              </div>

              <h3>Company Details</h3>

              <div className="detail-item">
                <span>Company</span>
                <p>{selectedUser.company.name}</p>
              </div>

              <div className="detail-item">
                <span>Business</span>
                <p>{selectedUser.company.bs}</p>
              </div>

              <h3>Address</h3>

              <div className="detail-item">
                <span>Street</span>
                <p>
                  {selectedUser.address.street},{" "}
                  {selectedUser.address.suite}
                </p>
              </div>

              <div className="detail-item">
                <span>City / ZIP</span>
                <p>
                  {selectedUser.address.city} -{" "}
                  {selectedUser.address.zipcode}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="close-profile-btn"
              onClick={() => setSelectedUser(null)}
            >
              Close Profile
            </button>
          </section>
        </div>
      )}

      <footer>
        <p>React Fundamentals | API Integration Project</p>
      </footer>
    </div>
  );
}

export default App;
