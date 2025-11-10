import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(dto: CreateAttendanceDto) {
    const student = await this.studentRepo.findOneBy({ id: dto.studentId });
    const group = await this.groupRepo.findOneBy({ id: dto.groupId });
    if (!student || !group) {
      throw new Error('Student yoki Group topilmadi');
    }

    const record = this.attendanceRepo.create({
      student,
      group,
      date: dto.date,
      present: dto.present,
    });
    return this.attendanceRepo.save(record);
  }

  findAll() {
    return this.attendanceRepo.find({ relations: ['student', 'group'] });
  }

  findOne(id: number) {
    return this.attendanceRepo.findOne({ where: { id }, relations: ['student', 'group'] });
  }

  async update(id: number, dto: UpdateAttendanceDto) {
    const record = await this.attendanceRepo.findOneBy({ id });
    if (!record) throw new Error('Davomat topilmadi');

    Object.assign(record, dto);
    return this.attendanceRepo.save(record);
  }

  remove(id: number) {
    return this.attendanceRepo.delete(id);
  }

  async findByDate(date: string) {
    return this.attendanceRepo.find({ where: { date }, relations: ['student', 'group'] });
  }
}
