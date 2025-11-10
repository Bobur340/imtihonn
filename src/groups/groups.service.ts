import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async create(dto: CreateGroupDto) {
    let teacher: Teacher | undefined = undefined;
    if (dto.teacherId) {
      const foundTeacher = await this.teacherRepo.findOneBy({ id: dto.teacherId });
      teacher = foundTeacher ?? undefined;
    }
    const group = teacher
      ? this.groupRepo.create({ ...dto, teacher })
      : this.groupRepo.create({ ...dto });
    return this.groupRepo.save(group);
  }

  findAll() {
    return this.groupRepo.find({ relations: ['teacher', 'students'] });
  }

  findOne(id: number) {
    return this.groupRepo.findOne({ where: { id }, relations: ['teacher', 'students'] });
  }

  async update(id: number, dto: UpdateGroupDto) {
    const group = await this.groupRepo.findOneBy({ id });
    if (!group) {
      throw new Error(`Group with id ${id} not found`);
    }
    Object.assign(group, dto);
    return this.groupRepo.save(group);
  }

  remove(id: number) {
    return this.groupRepo.delete(id);
  }
}
