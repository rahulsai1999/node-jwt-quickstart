import mongoose from "mongoose";

const TaskModel = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phoneNumber: Number,
  CIF: String,
  address1: String,
  address2: String,
  email: String
});

const Task = mongoose.model("Task", TaskModel);

export default Task;
