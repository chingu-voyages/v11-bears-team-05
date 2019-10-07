const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const auth = require('../middleware/authenticate');

module.exports = app => {
  const router = express.Router();

  router.get('/users', auth, async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (e) {
      res.status(500).send();
    }
  });

  router.post('/users', async (req, res) => {
    const nameFirst = req.body.nameFirst;
    const nameLast = req.body.nameLast;
    const email = req.body.email;
    const password = req.body.password;
    //console.log(req.body);
    var user = new User({ nameFirst, nameLast, email, password });

    try {
      await user.save();
      //  console.log('user saved');
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      console.log(('/post users error:', e));
      res.status(400).send(e);
    }
  });

  router.post('/users/login', async (req, res) => {
    //new way of doing this
    //console.log('in /users/loging', req.body);

    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );

      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }

    // User.findByCredentials(req.body.email, req.body.password)
    //   .then(user => {
    //     return user.generateAuthToken().then(token => {
    //       res.header('x-auth', token).send(user);
    //     });
    //   })
    //   .catch(e => {
    //     res.status(400).send(e);
    //   });
  });

  router.get('/users/me', auth, (req, res) => {
    console.log('me called');
    res.send(req.user);
  });

  router.post('/users/logout', auth, async (req, res) => {
    //console.log('/users/logout called');
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

  router.post('/users/logoutAll', auth, async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  });

  router.patch('/users/:id', async (req, res) => {
    // const updates = Object.keys
  });
  app.use('/api', router);
};
