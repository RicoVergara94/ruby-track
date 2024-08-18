const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Failed to connect to the database", err));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Fetch all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Add a new transaction
app.post('/api/transaction', async (req, res) => {
  const { description, amount, date, category } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO transactions (description, amount, date, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [description, amount, date, category]
    );
    const newTransaction = result.rows[0];
    io.emit('newTransaction', newTransaction);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

// Fetch budget information
app.get('/api/budget', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM budget');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching budget:', error);
    res.status(500).json({ error: 'Failed to fetch budget' });
  }
});

// Start the server with WebSocket
http.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
