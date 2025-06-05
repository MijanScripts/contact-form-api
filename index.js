const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (your HTML, CSS, JS) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// POST /contact endpoint to receive form submissions
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }

  try {
    const query = `INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)`;
    await pool.query(query, [name, email, message]);
    res.status(200).json({ message: 'Your message has been received. Thank you!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
