import z from "zod";

export const updateUserSchema = z.object({
  name: z.optional(z.string()),
  last_name: z.optional(z.string()),
  age: z.optional(z.number()),
  email: z.optional(z.string()),
  bio: z.optional(z.string()),
  image_profile: z.optional(
    z.instanceof(FileList).transform((list) => list?.[0] || undefined),
  ),
  image_banner: z.optional(
    z.instanceof(FileList).transform((list) => list?.[0] || undefined),
  ),
});
export type UptadteUserData = z.output<typeof updateUserSchema>;
