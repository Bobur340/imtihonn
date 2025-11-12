import { Injectable } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';
import { GroupsService } from '../groups/groups.service';
import { AttendanceService } from '../attendance/attendance.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService,
    private readonly groupsService: GroupsService,
    private readonly attendanceService: AttendanceService,
  ) {}

  getDashboardData() {
    const students = this.studentsService.findAll();
    const teachers = this.teachersService.findAll();
    const groups = this.groupsService.findAll();
    const attendance = this.attendanceService.findAll();

    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalGroups: groups.length,
      totalAttendanceRecords: attendance.length,
    };
  }
}
