const config = require('../config/config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

//Wes
const { Status } = require('./Status');
const statusTypes = [
  {
    name: 'Open Voting'
  },
  {
    name: 'Closed Voted'
  },
  {
    name: 'Closed Abandoned'
  },
  {
    name: 'Inactive'
  },
  {
    name: 'Paused'
  }
];

Status.deleteMany({})
  .then(
    Status.insertMany(statusTypes).then(stuff => console.log('inserted', stuff))
  )
  .catch(err => console.log(err));
