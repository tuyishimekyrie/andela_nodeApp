import express from 'express'
import { createMovie, deleteMovie, findMovie, findOneMovie, updateMovie } from '../controllers/movieController';

const router = express.Router();


router.get("/", findMovie);

router.post("/", createMovie);

router.put("/:id", updateMovie);

router.delete("/:id",deleteMovie);

router.get("/:id", findOneMovie);

export default router;