import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserModel = new mongoose.Schema({
  _id: { 'type' : String },
  username: String,
  password: String,
  name: String,
  phoneNumber: Number,
  isAdmin: Boolean,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Docs" }]
});

UserModel.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserModel);

export default User;
