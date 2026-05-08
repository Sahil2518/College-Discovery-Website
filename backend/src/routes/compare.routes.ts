import { Router } from 'express';
import { CompareController } from '../controllers/compare.controller';
import { validate } from '../middleware/validate.middleware';
import { compareSchema } from '../validators/compare.validator';

const router = Router();
const controller = new CompareController();

router.post('/', validate(compareSchema), controller.compare.bind(controller));

export default router;
