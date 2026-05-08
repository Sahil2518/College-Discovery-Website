import prisma from '../utils/prisma';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, avatarUrl: true, createdAt: true },
    });
  }

  async create(data: { name: string; email: string; passwordHash: string }) {
    return prisma.user.create({
      data,
      select: { id: true, name: true, email: true, createdAt: true },
    });
  }
}
