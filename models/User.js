const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');

const UserSchema = new mongoose.Schema({
  nameFirst: String,
  nameLast: String,
  email: String,
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//instance method that we call on a specifc instance of user, not the User model
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, config.JWT_SECRET)
    .toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

//this creates a model class
const User = mongoose.model('User', UserSchema);
module.exports = { User };
