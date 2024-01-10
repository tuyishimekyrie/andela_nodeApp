import express from "express";
import {
  createGenre,
  deleteGenre,
  findGenres,
  findOneGenre,
  updateGenre,
} from "../controllers/genresController";
import auth from "../../middleware/auth";
import admin from "../../middleware/admin";

const router = express.Router();

router.get("/", findGenres);
router.get("/:id", findOneGenre);
router.post("/",auth, createGenre);
router.patch("/:id", updateGenre);
router.delete("/:id",[auth,admin], deleteGenre);

export default router;
