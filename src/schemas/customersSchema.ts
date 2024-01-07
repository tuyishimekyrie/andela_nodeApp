import mongoose from "mongoose";
import { z } from "zod";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const zodSchema = z.object({
  name: z.string().min(5).max(50),
  phone: z.string().min(5).max(50),
  isGold: z.boolean(),
});

// function validateCustomer(customer) {
//   try {
//     zodSchema.parse(customer); // Validate the customer
//     return true; // Validation successful
//   } catch (error) {
//     console.error(error);
//     return false; // Validation failed
//   }
// }

export default Customer;
