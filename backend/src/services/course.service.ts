import { CourseRepository } from '../repositories/course.repository';
import { ApiError } from '../utils/api-error';

const courseRepo = new CourseRepository();

export class CourseService {
  async getCourses(filters: { stream?: string; level?: string; page: number; limit: number }) {
    return courseRepo.findMany(filters);
  }

  async getCourseById(id: number) {
    const course = await courseRepo.findById(id);
    if (!course) throw ApiError.notFound('Course');
    return course;
  }

  async getStreams() {
    return courseRepo.getStreams();
  }
}
