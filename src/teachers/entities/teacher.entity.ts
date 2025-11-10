import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  subject: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Group, (group) => group.teacher)
  groups: Group[];
}
