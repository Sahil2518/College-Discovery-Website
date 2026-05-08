import { z } from 'zod';

export const collegeQuerySchema = z.object({
  search: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  type: z.enum(['GOVERNMENT', 'PRIVATE', 'DEEMED']).optional(),
  minFee: z.coerce.number().min(0).optional(),
  maxFee: z.coerce.number().min(0).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  course: z.string().optional(),
  exam: z.string().optional(),
  sortBy: z.enum(['rating_desc', 'rating_asc', 'fees_asc', 'fees_desc', 'name_asc', 'name_desc', 'established_desc']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const collegeIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CollegeQueryInput = z.infer<typeof collegeQuerySchema>;
export type CollegeIdInput = z.infer<typeof collegeIdSchema>;
