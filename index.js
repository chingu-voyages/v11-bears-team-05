const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

require('./models/User');
require('./models/Group');
mongoose.connect(config.mongodb.dbURI, { useNewUrlParser: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server up at port ${PORT}`);
});

require('./routes/userRoutes')(app);
require('./routes/groupRoutes')(app);

app.get('/api/test', (req, res) => {
  res.send("it's working");
});
