import { Injectable } from '@nestjs/common';

@Injectable()
export class AttendanceService {
  private records: any[] = [];

  create(record: any) {
    const newRecord = { id: Date.now(), ...record };
    this.records.push(newRecord);
    return newRecord;
  }

  findAll() {
    return this.records;
  }

  findOne(id: number) {
    return this.records.find((r) => r.id === id);
  }

  update(id: number, data: any) {
    const index = this.records.findIndex((r) => r.id === id);
    if (index === -1) return { message: 'Record not found' };
    this.records[index] = { ...this.records[index], ...data };
    return this.records[index];
  }

  remove(id: number) {
    this.records = this.records.filter((r) => r.id !== id);
    return { message: 'Deleted successfully' };
  }
}
