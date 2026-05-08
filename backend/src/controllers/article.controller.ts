import { Request, Response, NextFunction } from 'express';
import { ArticleService } from '../services/article.service';
import { ApiResponse } from '../utils/api-response';

const articleService = new ArticleService();

export class ArticleController {
  async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, page = '1', limit = '20' } = req.query;
      const result = await articleService.getArticles({ category: category as string, page: Number(page), limit: Number(limit) });
      res.json(ApiResponse.paginated(result.articles, result.total, Number(page), Number(limit)));
    } catch (err) { next(err); }
  }

  async getArticleBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const article = await articleService.getArticleBySlug(req.params.slug);
      res.json(ApiResponse.success(article));
    } catch (err) { next(err); }
  }
}
