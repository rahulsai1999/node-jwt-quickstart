import mongoose from "mongoose";

const DocsModel = new mongoose.Schema({
  name: String,
  datemod: Date
});

const Docs = mongoose.model("Docs", DocsModel);

export default Docs;
