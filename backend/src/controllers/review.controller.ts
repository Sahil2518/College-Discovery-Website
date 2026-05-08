import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/review.service';
import { ApiResponse } from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

const reviewService = new ReviewService();

export class ReviewController {
  async getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = '1', limit = '10' } = req.query;
      const result = await reviewService.getReviews(Number(req.params.collegeId), Number(page), Number(limit));
      res.json(ApiResponse.paginated(result.reviews, result.total, Number(page), Number(limit)));
    } catch (err) { next(err); }
  }

  async createReview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const review = await reviewService.createReview(req.userId!, req.body);
      res.status(201).json(ApiResponse.success(review));
    } catch (err) { next(err); }
  }
}
