import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const student = await this.studentRepo.findOneBy({ id: dto.studentId });
    const group = await this.groupRepo.findOneBy({ id: dto.groupId });
    const payment = this.paymentRepo.create({
      ...dto,
      student: student as Student,
      group: group as Group,
    });
    return this.paymentRepo.save(payment);
  }

  findAll() {
    return this.paymentRepo.find({ relations: ['student', 'group'] });
  }

  findOne(id: number) {
    return this.paymentRepo.findOne({ where: { id }, relations: ['student', 'group'] });
  }

  async update(id: number, dto: UpdatePaymentDto) {
    await this.paymentRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.paymentRepo.delete(id);
  }
}
