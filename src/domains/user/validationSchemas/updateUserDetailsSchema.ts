import { z } from "zod";

export const updateUserDetailsSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name is a required field" })
      .max(30, { message: "Too many characters for name field. Max is 30" })
      .nullish()
      .transform((val) => (val === "" ? undefined : val))
      .optional(),
    email: z
      .string()
      .email("Sorry, wrong email format")
      .nullish()
      .transform((val) => (val === "" ? undefined : val))
      .optional(),
  })


export type UpdateUserDetailsValues = z.infer<typeof updateUserDetailsSchema>;
