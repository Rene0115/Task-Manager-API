import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tasks', schema: taskSchema }])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
