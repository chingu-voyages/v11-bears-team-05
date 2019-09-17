const express = require('express');
const mongoose = require("mongoose");
const User = mongoose.model("User")
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up at port ${PORT}`);
});

app.get('/test', (req, res)=>{res.send("it's working")})
app.get('/API/user/register', (req, res)=>{
    const nameFirst = request.nameFirst
    const nameLast = request.nameLast
    const email = request.email
    User.create(...nameFirst, nameLast, email, function (err, small) {
        if (err) {res.send(err)}
        else {}
      });

    res.send()
})