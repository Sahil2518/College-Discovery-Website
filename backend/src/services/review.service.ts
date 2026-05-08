import { ReviewRepository } from '../repositories/review.repository';
import { CreateReviewInput } from '../validators/review.validator';

const reviewRepo = new ReviewRepository();

export class ReviewService {
  async getReviews(collegeId: number, page: number, limit: number) {
    return reviewRepo.findByCollege(collegeId, page, limit);
  }

  async createReview(userId: number, input: CreateReviewInput) {
    return reviewRepo.create({ ...input, userId });
  }
}
