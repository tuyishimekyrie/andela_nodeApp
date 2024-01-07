import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: String,
});

const genreModel = mongoose.model("genre", genreSchema);

export default genreModel;
