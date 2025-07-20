const express = require('express');
const bcrypt = require('bcrypt');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(express.json());

// Lowdb setup for simple JSON-based storage
const dbFile = path.join(__dirname, '../database/db.json');
const adapter = new JSONFile(dbFile);
// Initialize LowDB with default structure so a missing database file doesn't
// throw an error when the server starts
const db = new Low(adapter, { users: [], moods: [] }); //  added moods array
const SECRET = process.env.JWT_SECRET || 'dev-secret';

async function initDB() {
  await db.read();
  if (!db.data || !Array.isArray(db.data.users)) {
    db.data = { users: [], moods: [] }; //  ensure moods is initialized
  }
  await db.write();
}

async function readDB() {
  await db.read();
  if (!db.data || !Array.isArray(db.data.users)) {
    db.data = { users: [], moods: [] }; //  same here
  }
}


// Initialize the database before starting the server
// to ensure db.data is always defined
// Server start moved to the bottom of the file
// Register a new user

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  await readDB();
  const existing = db.data.users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.data.users.push({ id: uuidv4(), email, password: hashedPassword });
    await db.write();
    return res.json({ message: 'Registration successful' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  await readDB();
  const user = db.data.users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
      return res.json({ message: 'Login successful', token });
    }
    return res.status(400).json({ error: 'Invalid credentials' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Example protected route
app.get('/profile', authMiddleware, async (req, res) => {
  await readDB();
  const user = db.data.users.find(u => u.id === req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ email: user.email });
});

// ➕ Save a mood entry (protected route)
app.post('/moods', authMiddleware, async (req, res) => {
  const { mood, note } = req.body;
  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  await readDB();
  const userId = req.user.userId;

  if (!db.data.moods) {
    db.data.moods = [];
  }

  const entry = {
    id: uuidv4(),
    userId,
    mood,
    note: note || '',
    timestamp: new Date().toISOString(),
  };

  db.data.moods.push(entry);
  await db.write();
  res.status(201).json({ message: 'Mood saved', entry });
});

// ➕ Fetch all mood entries for the logged-in user
app.get('/moods', authMiddleware, async (req, res) => {
  await readDB();
  const userId = req.user.userId;

  if (!db.data.moods) {
    return res.json([]);
  }

  const userMoods = db.data.moods.filter(m => m.userId === userId);
  res.json(userMoods);
});


const PORT = process.env.PORT || 3000;
// Start server after database initialization
initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
