import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new AuthController();

router.post('/register', validate(registerSchema), controller.register.bind(controller));
router.post('/login', validate(loginSchema), controller.login.bind(controller));
router.get('/profile', authMiddleware, controller.getProfile.bind(controller));

export default router;
