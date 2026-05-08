import prisma from '../utils/prisma';

export class SavedRepository {
  async findByUser(userId: number) {
    return prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: {
          include: {
            courses: { include: { course: { select: { name: true } } }, take: 3 },
            rankings: { take: 1, orderBy: { year: 'desc' } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async save(userId: number, collegeId: number) {
    return prisma.savedCollege.create({
      data: { userId, collegeId },
    });
  }

  async remove(userId: number, collegeId: number) {
    return prisma.savedCollege.delete({
      where: { userId_collegeId: { userId, collegeId } },
    });
  }

  async exists(userId: number, collegeId: number) {
    const saved = await prisma.savedCollege.findUnique({
      where: { userId_collegeId: { userId, collegeId } },
    });
    return !!saved;
  }

  async getSavedIds(userId: number) {
    const saved = await prisma.savedCollege.findMany({
      where: { userId },
      select: { collegeId: true },
    });
    return saved.map((s) => s.collegeId);
  }
}
