import z from "zod";

export const updateUserSchema = z.object({
  name: z.optional(z.string()),
  image_profile: z.optional(
    z.instanceof(FileList).transform((list) => list?.[0] || undefined),
  ),
});
export type UptadteUserData = z.output<typeof updateUserSchema>;
