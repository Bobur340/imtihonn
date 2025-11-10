import { Injectable } from '@nestjs/common';

// 🔹 Avval interfeys yaratamiz
export interface Teacher {
  id: number;
  name: string;
  subject: string;
  experience: number;
}

@Injectable()
export class TeachersService {
  // endi massiv turi Teacher[] deb belgilanadi
  private teachers: Teacher[] = [];

  // Yangi teacher yaratish
  create(teacher: Omit<Teacher, 'id'>): Teacher {
    const newTeacher: Teacher = { id: Date.now(), ...teacher };
    this.teachers.push(newTeacher);
    return newTeacher;
  }

  // Barchasini olish
  findAll(): Teacher[] {
    return this.teachers;
  }

  // Bitta teacher topish
  findOne(id: number): Teacher | undefined {
    return this.teachers.find((t) => t.id === id);
  }

  // Yangilash
  update(id: number, data: Partial<Teacher>): Teacher | { message: string } {
    const index = this.teachers.findIndex((t) => t.id === id);
    if (index === -1) return { message: 'Teacher not found' };
    this.teachers[index] = { ...this.teachers[index], ...data };
    return this.teachers[index];
  }

  // O‘chirish
  remove(id: number): { message: string } {
    this.teachers = this.teachers.filter((t) => t.id !== id);
    return { message: 'Deleted successfully' };
  }
}
