import z from "zod";

const schema = z.object({
  name: z.string().min(3).max(50),
});

export type genreDtos = z.infer<typeof schema>;

