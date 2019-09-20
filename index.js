const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/config');

require('./models/User');
mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

const User = mongoose.model('User');

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up at port ${PORT}`);
});

app.get('/api/test', (req, res) => {
  res.send("it's working");
});

app.post('/api/user/register', (req, res) => {
  const nameFirst = request.nameFirst;
  const nameLast = request.nameLast;
  const email = request.email;
  User.create(...nameFirst, nameLast, email, function(err, small) {
    if (err) {
      res.send(err);
    } else {
    }
  });

  res.send();
});
