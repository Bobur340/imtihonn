import { IsBoolean, IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @IsNotEmpty()
  @IsInt()
  groupId: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsBoolean()
  present: boolean;
}
