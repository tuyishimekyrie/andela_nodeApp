import express from "express";
import { createGenre, deleteGenre, findGenres, updateGenre } from "./routers/GenresRouter";
import mongoose from "mongoose";
import genres from "./routers/genres";

mongoose
  .connect("mongodb://localhost:27017/movierental")
  .then(() => console.log("Database Running"))
  .catch((error) => console.error("Database Connection Failed:", error));

const app = express();

app.use(express.json());
app.use("/api/genres", genres);
// app.get("/api/genres/", findGenres);
// app.post("/api/genres/", createGenre);
// app.patch("/api/genres/:id", updateGenre);
// app.delete("/api/genres/:id", deleteGenre)
// app.use("/api/genres", router);

app.get("/", (req, res) => {
  res.send("Imaginary movie rental");
});

app.listen(8000, () => {
  console.log("Server Started..");
});
