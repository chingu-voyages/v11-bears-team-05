const express = require('express');
const mongoose = require('mongoose');
const Group = mongoose.model('groups');

const auth = require('../middleware/authenticate');

module.exports = app => {
  const router = express.Router();

  router.post('/groups', auth, async (req, res) => {
    var group = new Group({
      name: req.body.name,
      _creator: req.user._id,
      coordinates: [req.body.coordinates[0], req.body.coordinates[1]],
      status: 'Active Voting'
    });

    try {
      await group.save();
      res.status(201).send(group);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  router.get('/groups', async (req, res) => {
    try {
      const groups = await Group.find({});
      res.send(groups);
    } catch (e) {
      res.status(500).send();
    }
  });

  router.get('/groups/:id', async (req, res) => {
    const _id = req.params._id;

    try {
      const group = await Group.findById(_id);
      if (!group) {
        return res.status(404).send();
      }
      res.send(group);
    } catch (e) {
      res.status(500).send();
    }
  });

  app.use('/api', router);
};
