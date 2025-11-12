import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupsService {
  private groups: any[] = [];

  create(group: any) {
    const newGroup = { id: Date.now(), ...group };
    this.groups.push(newGroup);
    return newGroup;
  }

  findAll() {
    return this.groups;
  }

  findOne(id: number) {
    return this.groups.find((g) => g.id === id);
  }

  update(id: number, data: any) {
    const index = this.groups.findIndex((g) => g.id === id);
    if (index === -1) return { message: 'Group not found' };
    this.groups[index] = { ...this.groups[index], ...data };
    return this.groups[index];
  }

  remove(id: number) {
    this.groups = this.groups.filter((g) => g.id !== id);
    return { message: 'Deleted successfully' };
  }
}
