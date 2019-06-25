import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserModel = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  phoneNumber: Number,
  isAdmin: Boolean,
  empid: String
});

UserModel.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserModel);

export default User;
