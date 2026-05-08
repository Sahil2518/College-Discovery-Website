import { Request, Response, NextFunction } from 'express';
import { CollegeService } from '../services/college.service';
import { ApiResponse } from '../utils/api-response';

const collegeService = new CollegeService();

export class CollegeController {
  async getColleges(req: Request, res: Response, next: NextFunction) {
    try {
      const { colleges, total } = await collegeService.getColleges(req.query as any);
      res.json(ApiResponse.paginated(colleges, total, Number(req.query.page) || 1, Number(req.query.limit) || 20));
    } catch (err) { next(err); }
  }

  async getCollegeById(req: Request, res: Response, next: NextFunction) {
    try {
      const college = await collegeService.getCollegeById(Number(req.params.id));
      res.json(ApiResponse.success(college));
    } catch (err) { next(err); }
  }

  async searchColleges(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, limit } = req.query;
      const results = await collegeService.searchColleges(String(q || ''), Number(limit) || 10);
      res.json(ApiResponse.success(results));
    } catch (err) { next(err); }
  }

  async getStates(req: Request, res: Response, next: NextFunction) {
    try {
      const states = await collegeService.getStates();
      res.json(ApiResponse.success(states));
    } catch (err) { next(err); }
  }

  async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await collegeService.getCities(req.query.state as string);
      res.json(ApiResponse.success(cities));
    } catch (err) { next(err); }
  }
}
