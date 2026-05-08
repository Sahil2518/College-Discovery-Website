import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../services/course.service';
import { ApiResponse } from '../utils/api-response';

const courseService = new CourseService();

export class CourseController {
  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const { stream, level, page = '1', limit = '20' } = req.query;
      const result = await courseService.getCourses({
        stream: stream as string,
        level: level as string,
        page: Number(page),
        limit: Number(limit),
      });
      res.json(ApiResponse.paginated(result.courses, result.total, Number(page), Number(limit)));
    } catch (err) { next(err); }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.getCourseById(Number(req.params.id));
      res.json(ApiResponse.success(course));
    } catch (err) { next(err); }
  }

  async getStreams(req: Request, res: Response, next: NextFunction) {
    try {
      const streams = await courseService.getStreams();
      res.json(ApiResponse.success(streams));
    } catch (err) { next(err); }
  }
}
