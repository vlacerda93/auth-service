const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mocked users
const users = [
  { username: 'admin', password: 'password123', id: 1, name: 'Admin User' },
  { username: 'john', password: 'doe', id: 2, name: 'John Doe' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Retornando sucesso sem JWT
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, name: user.name } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = app;
