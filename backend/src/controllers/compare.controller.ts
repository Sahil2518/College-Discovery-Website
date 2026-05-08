import { Request, Response, NextFunction } from 'express';
import { CompareService } from '../services/compare.service';
import { ApiResponse } from '../utils/api-response';

const compareService = new CompareService();

export class CompareController {
  async compare(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await compareService.compareColleges(req.body.collegeIds);
      res.json(ApiResponse.success(result));
    } catch (err) { next(err); }
  }
}
