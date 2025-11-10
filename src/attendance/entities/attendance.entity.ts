import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.id, { eager: true })
  student: Student;

  @ManyToOne(() => Group, (group) => group.id, { eager: true })
  group: Group;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: false })
  present: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
