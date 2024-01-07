import express from "express";
import {
  createCustomer,
  deleteCustomer,
  findCustomers,
  findOneCustomer,
  updateCustomer,
} from "../controllers/customerController";
const router = express.Router();

router.get("/", findCustomers);
router.get("/:id", findOneCustomer);
router.post("/", createCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
