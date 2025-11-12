import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() group: any) {
    return this.groupsService.create(group);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.groupsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.groupsService.remove(Number(id));
  }
}
