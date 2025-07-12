const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// In-memory storage for demo purposes
const users = [];

// Register a new user
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    // Return success like a login response
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

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.json({ message: 'Login successful' });
    }
    return res.status(400).json({ error: 'Invalid credentials' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
