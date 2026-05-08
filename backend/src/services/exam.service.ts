import { ExamRepository } from '../repositories/exam.repository';
import { ApiError } from '../utils/api-error';

const examRepo = new ExamRepository();

export class ExamService {
  async getExams(filters: { type?: string; page: number; limit: number }) {
    return examRepo.findMany(filters);
  }

  async getExamById(id: number) {
    const exam = await examRepo.findById(id);
    if (!exam) throw ApiError.notFound('Exam');
    return exam;
  }
}
