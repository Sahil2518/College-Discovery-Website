import { Request, Response, NextFunction } from 'express';
import { ExamService } from '../services/exam.service';
import { ApiResponse } from '../utils/api-response';

const examService = new ExamService();

export class ExamController {
  async getExams(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, page = '1', limit = '20' } = req.query;
      const result = await examService.getExams({ type: type as string, page: Number(page), limit: Number(limit) });
      res.json(ApiResponse.paginated(result.exams, result.total, Number(page), Number(limit)));
    } catch (err) { next(err); }
  }

  async getExamById(req: Request, res: Response, next: NextFunction) {
    try {
      const exam = await examService.getExamById(Number(req.params.id));
      res.json(ApiResponse.success(exam));
    } catch (err) { next(err); }
  }
}
