import mongoose from "mongoose";

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const genreModel = mongoose.model("genre", genreSchema);

export default genreModel;
