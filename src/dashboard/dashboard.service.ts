import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async getStats() {
    const totalStudents = await this.studentRepo.count();
    const monthlyStats = await this.studentRepo
      .createQueryBuilder('student')
      .select("TO_CHAR(student.createdAt, 'Month')", 'month')
      .addSelect('COUNT(student.id)', 'count')
      .groupBy('month')
      .getRawMany();

    return { totalStudents, monthlyStats };
  }
}
