import { z } from "zod";

export const updateAvatarSchema = z
  .object({
      image: z.string().nullish().optional(),
      avatar: z.union([
        z.instanceof(File, {message: "Image is required"})
         .refine(file => !file || file.size !== 0 || file.size <= 5000000, {message:"Max size exceeded"}),
        z.string().optional() // to hold default image
      ])
      .refine(value => value instanceof File || typeof value === "string", {
        message: "Image is required"
      }).optional(),
    // avatar: z
    //   .any()
    //   .refine(
    //     (file) => {
    //       if (!file) return true; // optional
    //       return file instanceof File && file.size < 5 * 1024 * 1024; // under 5MB
    //     },
    //     {
    //       message: "Avatar must be an image file under 5MB",
    //     },
    //   )
    //   .optional(),
  })

export type UpdateAvatarValues = z.infer<typeof updateAvatarSchema>;
