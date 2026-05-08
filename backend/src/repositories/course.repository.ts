import prisma from '../utils/prisma';

export class CourseRepository {
  async findMany(filters: { stream?: string; level?: string; page: number; limit: number }) {
    const { stream, level, page, limit } = filters;
    const where: any = {};
    if (stream) where.stream = { equals: stream, mode: 'insensitive' };
    if (level) where.level = level;

    const skip = (page - 1) * limit;
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: { _count: { select: { colleges: true } } },
      }),
      prisma.course.count({ where }),
    ]);
    return { courses, total };
  }

  async findById(id: number) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        colleges: {
          include: {
            college: {
              select: { id: true, name: true, slug: true, city: true, state: true, rating: true, logoUrl: true, type: true },
            },
          },
        },
      },
    });
  }

  async getStreams() {
    const streams = await prisma.course.findMany({
      select: { stream: true },
      distinct: ['stream'],
      orderBy: { stream: 'asc' },
    });
    return streams.map((s) => s.stream);
  }
}
