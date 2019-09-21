const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  name: String,
  active: Boolean
});

//this creates a model class
const Status = mongoose.model('Status', StatusSchema);
module.exports = { Status };
