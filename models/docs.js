import mongoose from "mongoose";

const DocsModel = new mongoose.Schema({
  name: String,
  datemod: Date,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

const Docs = mongoose.model("Docs", DocsModel);

export default Docs;
