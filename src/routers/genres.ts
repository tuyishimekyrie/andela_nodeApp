import express from 'express';
import {
  createGenre,
  deleteGenre,
  findGenres,
  findOneGenre,
  updateGenre,
} from "../controllers/genresController";
const router = express.Router();

router.get("/", findGenres);
router.get("/:id",findOneGenre)
router.post("/", createGenre);
router.patch("/:id", updateGenre);
router.delete("/:id", deleteGenre);


export default router;