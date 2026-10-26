const express = require("express");

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my Node.js Backend Server!");
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Node.js Basic Server is running!",
    technology: "Node.js + Express",
    status: "Active"
  });
});

app.post("/api/users", (req, res) => {
  res.status(201).json({
    success: true,
    message: "User data received successfully!",
    data: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});