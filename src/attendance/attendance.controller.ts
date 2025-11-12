import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() body: any) {
    return this.attendanceService.create(body);
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attendanceService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.attendanceService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.attendanceService.remove(Number(id));
  }
}
