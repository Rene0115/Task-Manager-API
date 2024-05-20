import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './task.schema';
import { User, userSchema } from '../user/user.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: taskSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
