const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = [{ id: 1, username: 'example', password: '$2b$10$C4HPlQJW7s6mP1NRe64cDumPwXrkJmffwZx6lOCMZSwx6vVoOIxBC' }]; // كلمة المرور المشفرة هي "password"

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send('Invalid username or password');
  }
};

module.exports = { login };
