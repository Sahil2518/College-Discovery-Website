import { Router } from 'express';
import { CollegeController } from '../controllers/college.controller';
import { validate } from '../middleware/validate.middleware';
import { collegeQuerySchema } from '../validators/college.validator';

const router = Router();
const controller = new CollegeController();

router.get('/', validate(collegeQuerySchema, 'query'), controller.getColleges.bind(controller));
router.get('/search', controller.searchColleges.bind(controller));
router.get('/states', controller.getStates.bind(controller));
router.get('/cities', controller.getCities.bind(controller));
router.get('/:id', controller.getCollegeById.bind(controller));

export default router;
