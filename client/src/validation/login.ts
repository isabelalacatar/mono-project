import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email invalid" }),
  password: z.string().min(6, { message: "Parola trebuie să aibă minim 6 caractere" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
