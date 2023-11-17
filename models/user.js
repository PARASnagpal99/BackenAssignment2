const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: { type: String, unique: true, required: true, minlength: 4 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  module.exports = User ;