import express from 'express';
import {
  createGenre,
  deleteGenre,
  findGenres,
  updateGenre,
} from "../controllers/genresController";
const router = express.Router();

router.get("/", findGenres);
router.post("/", createGenre);
router.patch("/:id", updateGenre);
router.delete("/:id", deleteGenre);


export default router;