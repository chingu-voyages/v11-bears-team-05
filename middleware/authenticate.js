const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const config = require('../config/config');

const authenticate = async (req, res, next) => {
  //new way
  try {
    const token = req.header('x-auth');
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }

  //old way
  const token = req.header('x-auth');
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send();
    });
};

module.exports = authenticate;
