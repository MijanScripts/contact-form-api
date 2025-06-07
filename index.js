const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Serve static files (your HTML, CSS, JS) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// POST /contact endpoint to receive form submissions
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
