import { z } from 'zod';

export const saveCollegeSchema = z.object({
  collegeId: z.number().int().positive(),
});

export type SaveCollegeInput = z.infer<typeof saveCollegeSchema>;
