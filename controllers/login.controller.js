require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    username: "example",
    password: "$2b$10$4lXgSons9yB3.RwiaqzJN.kBY.UFuBbpGVpVIzQ0xCbVxAzyX5MhO",
  },
];

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } else {
    res.status(401).send("Invalid username or password");
  }
};

module.exports = { login };
