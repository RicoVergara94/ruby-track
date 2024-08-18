const express = require("express");
const { Client, Pool } = require("pg");
var bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const port = 4000;
require("dotenv").config();

// Middleware
app.use(cors()); // Allow requests from React frontend
app.use(express.json()); // Parse JSON requests

// database
const client = new Client({
  user: "oscarvergara",
  host: "localhost", // Container IP address
  database: "mydatabase",
  password: "hacker-headstarter",
  port: 5432,
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
});
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is running!");
  console.log("here");
});

app.post("/login", (req, res) => {
  res.send(JSON.stringify(req.body));
  const username = req.body.username;
  const password = req.body.password;
  console.log(`username: ${username}`);
  console.log(`password: ${password}`);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(hash);
  const insertUser = async (username, hashedPassword) => {
    try {
      // Define the SQL query
      const query =
        "INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *";

      // Execute the query with parameters
      const res = await client.query(query, [username, hashedPassword]);

      // Log the inserted user
      console.log("Inserted user:", res.rows[0]);
    } catch (err) {
      console.error("Error inserting user:", err);
    } finally {
      // Close the database connection
      // await client.end();
    }
  };

  if (bcrypt.compareSync(password, hash)) {
    console.log("here");
    insertUser(username, hash);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
