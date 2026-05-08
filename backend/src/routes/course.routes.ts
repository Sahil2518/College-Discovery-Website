import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';

const router = Router();
const controller = new CourseController();

router.get('/', controller.getCourses.bind(controller));
router.get('/streams', controller.getStreams.bind(controller));
router.get('/:id', controller.getCourseById.bind(controller));

export default router;
