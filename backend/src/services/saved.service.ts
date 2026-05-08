import { SavedRepository } from '../repositories/saved.repository';
import { ApiError } from '../utils/api-error';
import prisma from '../utils/prisma';

const savedRepo = new SavedRepository();

export class SavedService {
  async getSavedColleges(userId: number) {
    return savedRepo.findByUser(userId);
  }

  async saveCollege(userId: number, collegeId: number) {
    const college = await prisma.college.findUnique({ where: { id: collegeId } });
    if (!college) throw ApiError.notFound('College');

    const exists = await savedRepo.exists(userId, collegeId);
    if (exists) throw ApiError.conflict('College already saved');

    return savedRepo.save(userId, collegeId);
  }

  async removeCollege(userId: number, collegeId: number) {
    const exists = await savedRepo.exists(userId, collegeId);
    if (!exists) throw ApiError.notFound('Saved college');
    return savedRepo.remove(userId, collegeId);
  }

  async getSavedIds(userId: number) {
    return savedRepo.getSavedIds(userId);
  }
}
