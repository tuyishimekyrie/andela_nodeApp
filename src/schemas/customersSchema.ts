import mongoose from "mongoose";
import { z, ZodError } from "zod";

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
  phone: z.string().min(5).max(50).optional(),
  isGold: z.boolean().optional(),
});

export { Customer, zodSchema as customerZodSchema };

export function validateCustomerInput(input: any) {
  try {
    zodSchema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.errors.map((e) => e.message).join(", "));
    }
    throw error;
  }
}

// export { Customer, validateCustomerInput };
