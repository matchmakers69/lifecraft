import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";
import { z } from "zod";

export const updateAvatarSchema = z.object({
	image: z
		.union([
			z
				.instanceof(File)
				.refine((file) => !file || file.size !== 0 || file.size <= MAX_FILE_SIZE, `Max image size is ${MAX_FILE_SIZE}MB`)
				.refine(
					(file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
					"Only .jpg, .jpeg, and .png formats are supported",
				),
			z.string(),
			z.undefined(), // allow undefined explicitly
		])
		.refine((value) => value instanceof File || typeof value === "string", {
			message: "Image is required",
		})
		.optional(),
});

export type UpdateAvatarValues = z.infer<typeof updateAvatarSchema>;
