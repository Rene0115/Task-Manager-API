import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto, updateTaskDto } from './task.dto';
import { UserRequest } from 'src/auth/auth.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  async createTask(@Body() data: CreateTaskDto, @Req() req: UserRequest) {
    const userId = req.user.id;

    return await this.taskService.createTask(
      userId,
      data.title,
      data.description,
    );
  }
  @UseGuards(AuthGuard())
  @Get('user-tasks')
  async getUsersTasks(@Req() req: UserRequest) {
    const userId = req.user.id;
    return await this.taskService.getUsersTasks(userId);
  }

  @UseGuards(AuthGuard())
  @Put('update')
  async updateTasks(@Body() data: updateTaskDto, @Req() req: UserRequest) {
    const userId = req.user.id;
    return await this.taskService.updateTask(data.taskId, data, userId);
  }

  @UseGuards(AuthGuard())
  @Delete('delete')
  async deleteTask(@Body('id') id: string, @Req() req: UserRequest) {
    const userId = req.user.id;
    return await this.taskService.deleteTask(id, userId);
  }
  @UseGuards(AuthGuard())
  @Get('/:id')
  async getTaskById(@Req() req: UserRequest, @Param('id') id: string) {
    const userId = req.user.id;
    return await this.taskService.getTaskById(id, userId);
  }
}
