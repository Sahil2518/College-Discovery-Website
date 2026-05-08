import prisma from '../utils/prisma';

export class ExamRepository {
  async findMany(filters: { type?: string; page: number; limit: number }) {
    const { type, page, limit } = filters;
    const where: any = {};
    if (type) where.type = type;
    const skip = (page - 1) * limit;

    const [exams, total] = await Promise.all([
      prisma.exam.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: { _count: { select: { colleges: true } } },
      }),
      prisma.exam.count({ where }),
    ]);
    return { exams, total };
  }

  async findById(id: number) {
    return prisma.exam.findUnique({
      where: { id },
      include: {
        colleges: {
          include: {
            college: {
              select: { id: true, name: true, slug: true, city: true, state: true, rating: true, logoUrl: true },
            },
          },
        },
      },
    });
  }
}
