import mongoose from "mongoose";
import config from "config";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});
// userSchema.methods.generateAuthToken = function () {
//   try {
//     const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
//     return token;
//   } catch (error) {
//     // Log the error or handle it as needed
//     console.error("Error generating JWT:", error);
//     throw error;
//   }
// };

const User = mongoose.model("User", userSchema);

export default User;
