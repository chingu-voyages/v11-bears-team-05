const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now
  },
  _creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    // long, lat
    coordinates: [
      {
        type: Number
      }
    ]
  },
  categories: [String],
  votes: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
      category: String
    }
  ],
  status: { type: mongoose.Schema.ObjectId, ref: 'Status' },
  winCategory: String,
  winRestaurant: {
    name: String,
    location: {
      type: {
        type: String,
        default: 'Point'
      },
      // long, lat
      coordinates: [
        {
          type: Number
        }
      ]
    }
  }
});

//this creates a model class
const Group = mongoose.model('Group', GroupSchema);
module.exports = { Group };
//in index.js, its:
// var { User } = require('./models/User');

//in index.js, if you are doing
// require('./models/Group');
// const Group = mongoose.model('Group');
// it would be this instead
// module.exports = Group;
