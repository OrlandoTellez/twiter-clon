import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, "Username minimo es de 2 caracteres")
    .max(50, "El maximo de caracateres de de 10"),
  password: z
    .string()
    .min(6, "El minimo de caracteres es de 2")
    .max(100, "El maximo de caracateres de de 10"),
});

export type LoginData = z.infer<typeof loginSchema>;
