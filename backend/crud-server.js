
const express = require("express");

const app = express();
const PORT = 5001;

app.use(express.json());

// Temporary data
let users = [
  { id: 1, name: "Kartik", email: "kartik@example.com" },
  { id: 2, name: "Rahul", email: "rahul@example.com" }
];

let nextId = 3;

// Home route
app.get("/", (req, res) => {
  res.send("Express.js CRUD API is running!");
});

// READ: Get all users
app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// READ: Get one user
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// CREATE: Add a user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required"
    });
  }

  const newUser = {
    id: nextId++,
    name: name.trim(),
    email: email.trim()
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
});

// UPDATE: Edit a user
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const { name, email } = req.body;

  if (
    (name !== undefined &&
      (typeof name !== "string" || !name.trim())) ||
    (email !== undefined &&
      (typeof email !== "string" || !email.trim()))
  ) {
    return res.status(400).json({
      success: false,
      message: "Name and email must be non-empty strings"
    });
  }

  if (name !== undefined) user.name = name.trim();
  if (email !== undefined) user.email = email.trim();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user
  });
});

// DELETE: Remove a user
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const deletedUser = users.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON"
    });
  }

  next(err);
});

app.listen(PORT, () => {
  console.log(`CRUD API running at http://localhost:${PORT}`);
});
