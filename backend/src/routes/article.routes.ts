import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';

const router = Router();
const controller = new ArticleController();

router.get('/', controller.getArticles.bind(controller));
router.get('/:slug', controller.getArticleBySlug.bind(controller));

export default router;
