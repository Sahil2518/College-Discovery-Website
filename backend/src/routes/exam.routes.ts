import { Router } from 'express';
import { ExamController } from '../controllers/exam.controller';

const router = Router();
const controller = new ExamController();

router.get('/', controller.getExams.bind(controller));
router.get('/:id', controller.getExamById.bind(controller));

export default router;
