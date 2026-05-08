import { z } from 'zod';

export const createReviewSchema = z.object({
  collegeId: z.number().int().positive(),
  rating: z.number().min(1).max(5),
  title: z.string().min(3).max(200),
  content: z.string().min(10).max(5000),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
