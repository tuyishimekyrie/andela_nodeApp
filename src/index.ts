import config from 'config'
import express from "express";
import mongoose from "mongoose";
import genres from "./routers/genres";
import customers from "./routers/customers";
import movies from "./routers/movies";
import rentals from "./routers/rentals";
import users from "./routers/users";
import auth from './routers/auth'


if (!config.get("jwtPrivateKey")) {
  console.error("Configuration is not set");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/movierental")
  .then(() => console.log("Database Running"))
  .catch((error) => console.error("Database Connection Failed:", error));

const app = express();

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies)
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth)

app.get("/", (req, res) => {
  res.send("Imaginary movie rental");
});

app.listen(8000, () => {
  console.log("Server Started..");
});

