import { Injectable } from '@nestjs/common';

// ✅ Export qo‘shildi
export interface Student {
  id: number;
  name: string;
  age: number;
  group?: string;
}

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  create(student: Omit<Student, 'id'>): Student {
    const newStudent: Student = { id: Date.now(), ...student };
    this.students.push(newStudent);
    return newStudent;
  }

  findAll(): Student[] {
    return this.students;
  }

  findOne(id: number): Student | undefined {
    return this.students.find((s) => s.id === id);
  }

  update(id: number, data: Partial<Student>): Student | { message: string } {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return { message: 'Student not found' };

    this.students[index] = { ...this.students[index], ...data };
    return this.students[index];
  }

  remove(id: number): { message: string } {
    this.students = this.students.filter((s) => s.id !== id);
    return { message: 'Deleted successfully' };
  }
}
