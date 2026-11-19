
import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5002/api/users";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  city: ""
};

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // READ: Fetch users from MongoDB backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Unable to load users. Check whether backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // CREATE and UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Operation failed");
      }

      setMessage(
        editingId
          ? "User updated successfully!"
          : "User added successfully!"
      );

      setForm(emptyForm);
      setEditingId(null);
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Load user details into form for editing
  const handleEdit = (user) => {
    setEditingId(user._id);
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      company: user.company || "",
      city: user.city || ""
    });

    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete user");
      }

      setMessage("User deleted successfully!");
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setMessage("");
  };

  // SEARCH
  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      (user.name || "").toLowerCase().includes(query) ||
      (user.email || "").toLowerCase().includes(query) ||
      (user.company || "").toLowerCase().includes(query) ||
      (user.city || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="app">
      <header className="header">
        <h1>Full-Stack CRUD Application</h1>
        <p>React + Node.js + Express + MongoDB</p>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>{editingId ? "Update User" : "Add New User"}</h2>

          <form className="user-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="company"
              placeholder="Enter company"
              value={form.company}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={form.city}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button type="submit" disabled={saving}>
                {saving
                  ? "Please wait..."
                  : editingId
                  ? "Update User"
                  : "Add User"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <div className="title-row">
          <div>
            <h2>User Directory</h2>
            <p className="subtitle">
              Manage users stored in MongoDB Atlas.
            </p>
          </div>

          <span className="user-count">
            {users.length} Users
          </span>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search by name, email, company or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="message">Loading users...</p>}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="message">No users found. Add a new user!</p>
        )}

        {!loading && (
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <div className="user-card" key={user._id}>
                <div className="card-top">
                  <div className="avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="profile-id">
                    ID #{user._id.slice(-5)}
                  </span>
                </div>

                <h3>{user.name}</h3>
                <p className="user-email">✉ {user.email}</p>
                <p>🏢 {user.company || "Not provided"}</p>
                <p>📍 {user.city || "Not provided"}</p>
                <p>📞 {user.phone || "Not provided"}</p>

                <div className="card-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>React Fundamentals | Full-Stack CRUD Application</p>
      </footer>
    </div>
  );
}

export default App;
