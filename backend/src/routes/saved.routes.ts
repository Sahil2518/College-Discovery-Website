import { Router } from 'express';
import { SavedController } from '../controllers/saved.controller';
import { validate } from '../middleware/validate.middleware';
import { saveCollegeSchema } from '../validators/saved.validator';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new SavedController();

router.use(authMiddleware);
router.get('/', controller.getSaved.bind(controller));
router.get('/ids', controller.getSavedIds.bind(controller));
router.post('/', validate(saveCollegeSchema), controller.saveCollege.bind(controller));
router.delete('/:collegeId', controller.removeCollege.bind(controller));

export default router;
