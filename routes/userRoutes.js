const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const auth = require('../middleware/authenticate');

module.exports = app => {
  const router = express.Router();

  router.post('/users', (req, res) => {
    const nameFirst = req.body.nameFirst;
    const nameLast = req.body.nameLast;
    const email = req.body.email;
    const password = req.body.password;

    var user = new User({ nameFirst, nameLast, email, password });
    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res.header('x-auth', token).send(user);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  router.post('/users/login', (req, res) => {
    User.findByCredentials(req.body.email, req.body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header('x-auth', token).send(user);
        });
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  router.post('/users/logout', auth, async (req, res) => {
    console.log('/users/logout called');
    try {
      req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  });

  app.use('/api', router);
};
