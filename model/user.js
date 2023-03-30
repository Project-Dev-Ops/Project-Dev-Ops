const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  password: String,
  email: String,
});
module.exports.User = mongoose.model("User", UserSchema);