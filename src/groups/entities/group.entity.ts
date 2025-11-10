import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ nullable: true })
  schedule: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.groups, { eager: true })
  teacher: Teacher;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @OneToMany(() => Payment, (payment) => payment.group)
  payments: Payment[];
}
