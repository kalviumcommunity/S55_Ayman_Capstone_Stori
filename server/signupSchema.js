const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    email: String,
    username: String,
    password:String,
    confirm_password: String
});
const UserModel = mongoose.model("storie", signupSchema);
module.exports = {UserModel};