import { CollegeRepository } from '../repositories/college.repository';
import { CollegeQueryInput } from '../validators/college.validator';
import { ApiError } from '../utils/api-error';

const collegeRepo = new CollegeRepository();

export class CollegeService {
  async getColleges(query: CollegeQueryInput) {
    return collegeRepo.findMany(query);
  }

  async getCollegeById(id: number) {
    const college = await collegeRepo.findById(id);
    if (!college) throw ApiError.notFound('College');
    return college;
  }

  async getCollegeBySlug(slug: string) {
    const college = await collegeRepo.findBySlug(slug);
    if (!college) throw ApiError.notFound('College');
    return college;
  }

  async searchColleges(query: string, limit?: number) {
    return collegeRepo.search(query, limit);
  }

  async getStates() {
    return collegeRepo.getStates();
  }

  async getCities(state?: string) {
    return collegeRepo.getCities(state);
  }

  async getStats() {
    return collegeRepo.getStats();
  }
}
