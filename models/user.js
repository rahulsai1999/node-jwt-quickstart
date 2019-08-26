import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserModel = new mongoose.Schema({
  email: String,
  name: String,
  username: String,
  password: String,
  DOB: String,
  stocks: Array
});

UserModel.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserModel);

export default User;
