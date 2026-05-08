import { ArticleRepository } from '../repositories/article.repository';
import { ApiError } from '../utils/api-error';

const articleRepo = new ArticleRepository();

export class ArticleService {
  async getArticles(filters: { category?: string; page: number; limit: number }) {
    return articleRepo.findMany(filters);
  }

  async getArticleBySlug(slug: string) {
    const article = await articleRepo.findBySlug(slug);
    if (!article) throw ApiError.notFound('Article');
    return article;
  }
}
