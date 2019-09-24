const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

var { User } = require('./models/User');
var { Group } = require('./models/Group');
// require('./models/User');
// require('./models/Group');
mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

// const User = mongoose.model('User');
// const Group = mongoose.model('Group');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server up at port ${PORT}`);
});

app.get('/api/test', (req, res) => {
  res.send("it's working");
});

app.post('/api/users', (req, res) => {
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

app.post('/api/groups', (req, res) => {
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
