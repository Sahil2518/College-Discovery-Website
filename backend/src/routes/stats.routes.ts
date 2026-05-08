import { Router, Request, Response, NextFunction } from 'express';
import { CollegeService } from '../services/college.service';
import { ApiResponse } from '../utils/api-response';

const router = Router();
const collegeService = new CollegeService();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await collegeService.getStats();
    res.json(ApiResponse.success(stats));
  } catch (err) { next(err); }
});

export default router;
