import express from "express";
import mongoose from "mongoose";
import genres from "./routers/genres";
import customers from "./routers/customers";

mongoose
  .connect("mongodb://localhost:27017/movierental")
  .then(() => console.log("Database Running"))
  .catch((error) => console.error("Database Connection Failed:", error));

const app = express();

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

app.get("/", (req, res) => {
  res.send("Imaginary movie rental");
});

app.listen(8000, () => {
  console.log("Server Started..");
});
