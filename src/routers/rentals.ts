import express from "express";
import { createRental, findOneRental, findRental } from "../controllers/rentalController";

const router = express.Router();

router.get("/", findRental);
router.post("/", createRental);
router.get("/:id", findOneRental);

export default router;
