require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/connect');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check — confirms the API is up and the database is reachable
app.get('/api/health', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT now() AS time');
    res.json({ status: 'ok', database: 'connected', time: rows[0].time });
  } catch (err) {
    console.error('Health check failed:', err.message);
    res.status(503).json({ status: 'error', database: 'unreachable' });
  }
});

// Routes mounted here as each sprint adds them
// app.use('/api/auth', require('./auth/auth'));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});