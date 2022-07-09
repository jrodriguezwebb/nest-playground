import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  create(@Body() taskDTO: TaskDTO) {
    return this.taskService.create(taskDTO);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  //  @Post(':id/description/:description/isdone/:isdone')
  //   methodParams(
  //     @Param('id') id: number,
  //     @Param('description') description: string,
  //     @Param('isdone') isdone: string,
  //   ) {
  //     return { id, description, isdone };
  //   }

  //   @Get('done')
  //   done(@Req() req: Request) {
  //     return `method ${req.method}`;
  //   }
}
