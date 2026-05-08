import prisma from '../utils/prisma';

export class ReviewRepository {
  async findByCollege(collegeId: number, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { collegeId },
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.review.count({ where: { collegeId } }),
    ]);
    return { reviews, total };
  }

  async create(data: { collegeId: number; userId: number; rating: number; title: string; content: string }) {
    const review = await prisma.review.create({
      data,
      include: { user: { select: { id: true, name: true, avatarUrl: true } } },
    });

    // Update college rating
    const agg = await prisma.review.aggregate({
      where: { collegeId: data.collegeId },
      _avg: { rating: true },
      _count: true,
    });

    await prisma.college.update({
      where: { id: data.collegeId },
      data: {
        rating: Math.round((agg._avg.rating || 0) * 10) / 10,
        totalReviews: agg._count,
      },
    });

    return review;
  }
}
