import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  password: String,
  email: String,
});
module.exports.user = mongoose.model("User", UserSchema);