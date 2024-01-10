import express from "express";
import { createUser,currentUser } from "../controllers/userController";
import auth from "../../middleware/auth";

export const router = express.Router();

router.get('/me', auth, currentUser);
router.post("/", createUser);

export default router;
