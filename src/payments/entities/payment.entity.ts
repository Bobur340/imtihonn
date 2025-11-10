import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.id, { eager: true })
  student: Student;

  @ManyToOne(() => Group, (group) => group.payments, { eager: true })
  group: Group;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'paid' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
