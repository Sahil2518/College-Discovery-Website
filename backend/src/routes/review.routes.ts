import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { validate } from '../middleware/validate.middleware';
import { createReviewSchema } from '../validators/review.validator';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new ReviewController();

router.get('/:collegeId', controller.getReviews.bind(controller));
router.post('/', authMiddleware, validate(createReviewSchema), controller.createReview.bind(controller));

export default router;
