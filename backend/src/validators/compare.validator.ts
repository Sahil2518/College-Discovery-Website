import { z } from 'zod';

export const compareSchema = z.object({
  collegeIds: z.array(z.number().int().positive()).min(2).max(3),
});

export type CompareInput = z.infer<typeof compareSchema>;
