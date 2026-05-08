import prisma from '../utils/prisma';

export class ArticleRepository {
  async findMany(filters: { category?: string; page: number; limit: number }) {
    const { category, page, limit } = filters;
    const where: any = {};
    if (category) where.category = { equals: category, mode: 'insensitive' };
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, authorName: true, category: true, readTime: true, publishedAt: true },
      }),
      prisma.article.count({ where }),
    ]);
    return { articles, total };
  }

  async findBySlug(slug: string) {
    return prisma.article.findUnique({ where: { slug } });
  }
}
