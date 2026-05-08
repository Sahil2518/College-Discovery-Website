import prisma from '../utils/prisma';
import { Prisma } from '@prisma/client';
import { CollegeQueryInput } from '../validators/college.validator';

export class CollegeRepository {
  async findMany(query: CollegeQueryInput) {
    const { search, state, city, type, minFee, maxFee, minRating, course, exam, sortBy, page, limit } = query;

    const where: Prisma.CollegeWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (state) where.state = { equals: state, mode: 'insensitive' };
    if (city) where.city = { equals: city, mode: 'insensitive' };
    if (type) where.type = type;
    if (minRating) where.rating = { gte: minRating };

    if (course) {
      where.courses = {
        some: {
          course: { name: { contains: course, mode: 'insensitive' } },
        },
      };
    }

    if (exam) {
      where.exams = {
        some: {
          exam: { name: { contains: exam, mode: 'insensitive' } },
        },
      };
    }

    if (minFee !== undefined || maxFee !== undefined) {
      where.courses = {
        ...where.courses as object,
        some: {
          ...(where.courses as any)?.some,
          fee: {
            ...(minFee !== undefined ? { gte: minFee } : {}),
            ...(maxFee !== undefined ? { lte: maxFee } : {}),
          },
        },
      };
    }

    let orderBy: Prisma.CollegeOrderByWithRelationInput = { rating: 'desc' };
    switch (sortBy) {
      case 'rating_asc': orderBy = { rating: 'asc' }; break;
      case 'rating_desc': orderBy = { rating: 'desc' }; break;
      case 'name_asc': orderBy = { name: 'asc' }; break;
      case 'name_desc': orderBy = { name: 'desc' }; break;
      case 'established_desc': orderBy = { establishedYear: 'desc' }; break;
      default: orderBy = { rating: 'desc' };
    }

    const skip = (page - 1) * limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          courses: {
            include: { course: { select: { name: true } } },
            take: 3,
          },
          exams: {
            include: { exam: { select: { name: true } } },
            take: 5,
          },
          rankings: { take: 1, orderBy: { year: 'desc' } },
        },
      }),
      prisma.college.count({ where }),
    ]);

    return { colleges, total };
  }

  async findById(id: number) {
    return prisma.college.findUnique({
      where: { id },
      include: {
        courses: {
          include: { course: true },
        },
        exams: {
          include: { exam: true },
        },
        placements: {
          orderBy: { year: 'desc' },
          take: 3,
        },
        rankings: {
          orderBy: { year: 'desc' },
        },
        reviews: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        cutoffs: {
          include: { exam: { select: { name: true } } },
          orderBy: { year: 'desc' },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.college.findUnique({
      where: { slug },
      include: {
        courses: { include: { course: true } },
        exams: { include: { exam: true } },
        placements: { orderBy: { year: 'desc' }, take: 3 },
        rankings: { orderBy: { year: 'desc' } },
        reviews: {
          include: { user: { select: { id: true, name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async findByIds(ids: number[]) {
    return prisma.college.findMany({
      where: { id: { in: ids } },
      include: {
        courses: { include: { course: true } },
        exams: { include: { exam: true } },
        placements: { orderBy: { year: 'desc' }, take: 1 },
        rankings: { orderBy: { year: 'desc' }, take: 1 },
      },
    });
  }

  async search(query: string, limit = 10) {
    return prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: { id: true, name: true, city: true, state: true, logoUrl: true, rating: true },
      take: limit,
      orderBy: { rating: 'desc' },
    });
  }

  async getStates() {
    const states = await prisma.college.findMany({
      select: { state: true },
      distinct: ['state'],
      orderBy: { state: 'asc' },
    });
    return states.map((s) => s.state);
  }

  async getCities(state?: string) {
    const where = state ? { state: { equals: state, mode: 'insensitive' as const } } : {};
    const cities = await prisma.college.findMany({
      where,
      select: { city: true },
      distinct: ['city'],
      orderBy: { city: 'asc' },
    });
    return cities.map((c) => c.city);
  }

  async getStats() {
    const [totalColleges, totalCourses, totalExams] = await Promise.all([
      prisma.college.count(),
      prisma.course.count(),
      prisma.exam.count(),
    ]);
    return { totalColleges, totalCourses, totalExams };
  }
}
