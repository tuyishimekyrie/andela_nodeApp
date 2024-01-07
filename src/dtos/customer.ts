import z from "zod";

const schema = z.object({
  name: z.string().min(5).max(50),
  phone: z.string().min(5).max(50),
  isGold: z.boolean(),
});

export type customerDtos = z.infer<typeof schema>;
