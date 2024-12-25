require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const plainPassword = 'MBA7-MOAZ770054'; // استبدل هذه بكلمة المرور الفعلية التي تريد تشفيرها
const saltRounds = 10;

let hashed;

bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
  if (err) {
    console.error(err);
  } else {
    hashed = hashedPassword;
    console.log('Hashed password:', hashedPassword);
  }
});

const users = [
  {
    id: 1,
    username: "moaz",
    password: hashed,
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
