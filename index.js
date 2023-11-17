const express = require('express');
const app = express();
const User = require('./models/user');
const db = require('./db/db');
const bodyParser = require('body-parser');
require('dotenv').config();
db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/v1/users/verify-username', (req, res) => {
  const { username } = req.body;

  const existingUser = User.findOne({ username }).exec();
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Username already taken'
    });
  }

  if (username.length < 4 || ! /\w/.test(username) || ! /[a-zA-Z]/.test(username)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid username'
    });
  }

  const existingEmail = User.findOne({ emailId: username }).exec();
  if (existingEmail) {
    return res.status(400).json({
      success: false,
      message: 'Email address already taken'
    });
  }

  res.json({
    success: true,
    message: 'Username available'
  });
});

const PORT = 3000 || process.env.PORT ;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
