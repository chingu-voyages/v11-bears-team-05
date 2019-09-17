const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    nameFirst: String,
    nameLast: String,
    email: String
})

//this creates a model class
const User = mongoose.model('User', UserSchema);
module.exports = User;
