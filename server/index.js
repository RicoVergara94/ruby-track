const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

// Middleware
app.use(cors()); // Allow requests from React frontend
app.use(express.json()); // Parse JSON requests

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
