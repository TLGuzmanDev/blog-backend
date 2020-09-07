const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// create user
const create_user = (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hash,
  });
  user.save((err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.json(user);
  });
};

// Validate user login
const handle_login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (!user || !user.verifyPassword(req.body.password)) {
      return res.status(400).json({ error: 'invaild username or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({
      token,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    });
  });
};

module.exports = {
  create_user,
  handle_login,
};
