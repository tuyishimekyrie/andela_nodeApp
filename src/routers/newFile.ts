import { currentUser } from "../controllers/userController";
import { router } from "./users";

router.post("/me", auth, currentUser);
