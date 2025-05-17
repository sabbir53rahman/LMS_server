import { z } from "zod";

export const courseValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  thumbnail: z.string().url("Invalid thumbnail URL").optional(),
  category: z.string().optional(),
  price: z.number({ invalid_type_error: "Price must be a number" }).min(0, "Price must be a positive number"),
  teacher: z.string().min(1, "Teacher ID is required"),
  lessons: z.array(z.string()).optional(),
});
