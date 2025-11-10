import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student, Group])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [TypeOrmModule],
})
export class AttendanceModule {}
