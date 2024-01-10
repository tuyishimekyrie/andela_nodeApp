import z from "zod";

// Define your Zod schema
const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

// Define the DTO type using Zod's inference
type AuthDtos = z.infer<typeof authSchema>;

export { authSchema, AuthDtos };
