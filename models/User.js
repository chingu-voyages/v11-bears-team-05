const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/config');

const UserSchema = new mongoose.Schema({
  nameFirst: String,
  nameLast: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//instance method that we call on a specifc instance of user, not the User model
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function() {
  var user = this;

  const token = jwt.sign({ _id: user._id.toString() }, config.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
  // var access = 'auth';
  // var token = jwt
  //   .sign({ _id: user._id.toHexString(), access }, config.JWT_SECRET)
  //   .toString();

  // user.tokens.push({ token });

  // return user.save().then(() => {
  //   return token;
  // });
};

//This is a model method, so you can call it with User.findByToken; as opposed to an instance method
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, config.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to log in.');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new error('Unable to log in.');
  }

  return user;

  //old
  // const User = this;
  // return User.findOne({ email }).then(user => {
  //   if (!user) {
  //     return Promise.reject();
  //   }

  //   return new Promise((resolve, reject) => {
  //     bcrypt.compare(password, user.password, (err, res) => {
  //       if (res) {
  //         resolve(user);
  //       } else {
  //         return reject();
  //       }
  //     });
  //   });
  // });
};

//hashing and salting passwords before
UserSchema.pre('save', async function(next) {
  var user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // if (user.isModified('password')) {
  //   var password = user.password;

  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(password, salt, (err, hash) => {
  //       user.password = hash;
  //       next();
  //     });
  //   });
  // } else {
  //   next();
  // }
});

//this creates a model class
const User = mongoose.model('User', UserSchema);
// module.exports = { User };
mongoose.model('users', UserSchema);
