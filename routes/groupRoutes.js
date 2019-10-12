const express = require('express');
const mongoose = require('mongoose');
const Group = mongoose.model('groups');
const axios = require('axios');

const auth = require('../middleware/authenticate');
const config = require('../config/config');

module.exports = app => {
  const router = express.Router();

  router.get('/cuisines/:id', auth, async (req, res) => {
    const id = req.params.id;

    try {
      const group = await Group.findById(id);
      if (!group) {
        return res.status(404).send();
      } else {
        axios
          .get(
            `https://developers.zomato.com/api/v2.1/cuisines?lat=${
              group.location.coordinates[0]
            }&lon=${group.location.coordinates[1]}`,
            {
              headers: {
                'user-key': config.zomatoAPIKey
              }
            }
          )
          .then(result => res.status(200).send(result.data))
          .catch(err => res.status(500).send());
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  });

  router.post('/joinvote/:id/:cuisine', auth, async (req, res) => {
    console.log('join vote');
    const _id = req.params.id;
    const cuisine = req.params.cuisine;
    try {
      const group = await Group.findById(_id);
      if (!group) {
        return res.status(404).send();
      }
      if (!cuisine) {
        return res.status(404).send();
      }

      //check to see if user already voted
      votes = group.votes;
      //      console.log({ votes });
      //const alreadyVoted = await group.find({ 'votes.user': _id });
      const alreadyVoted = votes.find(vote => vote._id == _id);
      //    console.log('already voted', alreadyVoted);
      if (alreadyVoted) {
        throw Error;
      }

      //if they haven't voted already
      cleanedCuisine = cuisine.toLowerCase();
      group.votes.push({ _id, category: cleanedCuisine });

      await group.save();
      res.status(201).send(group);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });

  router.post('/groups', auth, async (req, res) => {
    //console.log('/groups called', req.body.coordinates[0]);
    var group = new Group({
      name: req.body.name,
      _creator: req.user._id,
      location: { type: 'Point', coordinates: req.body.coordinates },
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

  router.get('/groups/:id', auth, async (req, res) => {
    const _id = req.params.id;

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
