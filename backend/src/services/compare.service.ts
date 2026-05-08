import { CollegeRepository } from '../repositories/college.repository';
import { ApiError } from '../utils/api-error';

const collegeRepo = new CollegeRepository();

export class CompareService {
  async compareColleges(collegeIds: number[]) {
    const colleges = await collegeRepo.findByIds(collegeIds);
    if (colleges.length !== collegeIds.length) {
      const foundIds = colleges.map((c) => c.id);
      const missing = collegeIds.filter((id) => !foundIds.includes(id));
      throw ApiError.notFound(`Colleges with IDs ${missing.join(', ')}`);
    }

    return colleges.map((college) => ({
      id: college.id,
      name: college.name,
      slug: college.slug,
      logoUrl: college.logoUrl,
      type: college.type,
      establishedYear: college.establishedYear,
      city: college.city,
      state: college.state,
      rating: college.rating,
      totalReviews: college.totalReviews,
      totalCourses: college.courses.length,
      feeRange: this.calculateFeeRange(college.courses),
      placement: college.placements[0] || null,
      ranking: college.rankings[0] || null,
      examsAccepted: college.exams.map((e) => e.exam.name),
      courses: college.courses.map((c) => c.course.name),
    }));
  }

  private calculateFeeRange(courses: any[]) {
    const fees = courses.map((c) => c.fee).filter((f): f is number => f !== null);
    if (fees.length === 0) return { min: null, max: null };
    return { min: Math.min(...fees), max: Math.max(...fees) };
  }
}
