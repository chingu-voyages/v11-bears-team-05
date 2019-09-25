const express = require('express');
const mongoose = require('mongoose');
const Group = mongoose.model('groups');

const auth = require('../middleware/authenticate');

module.exports = app => {
  const router = express.Router();

  router.post('/groups', auth, (req, res) => {
    var group = new Group({
      name: req.body.name,
      _creator: req.user._id,
      coordinates: [req.coordinates[0], req.coordinates[1]],
      status: 'Active Voting'
    });

    group.save().then(doc => {
      res.send(doc);
    }),
      err => {
        res.status(400).send(err);
      };
  });

  app.use('/api', router);
};
