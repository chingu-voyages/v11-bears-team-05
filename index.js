const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

require('./models/User');
mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

const User = mongoose.model('User');

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
