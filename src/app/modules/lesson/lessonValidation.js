import { z } from "zod";

export const lessonValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  videoUrl: z.string().url("Invalid video URL").optional(),
  course: z.string().min(1, "Course ID is required"),
});
