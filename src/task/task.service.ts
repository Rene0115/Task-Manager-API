import {
  Injectable,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Task } from './task.schema';
import { User } from '../user/user.shema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: mongoose.Model<Task>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async getUsersTasks(userId: string) {
    try {
      const tasks = await this.taskModel.find({ userId: userId });
      if (tasks.length < 1) {
        throw new NotFoundException('User does not have any tasks');
      }

      return {
        success: true,
        tasks: tasks,
      };
    } catch (error: any) {
      console.log(error);
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status,
      );
    }
  }
  async createTask(userId: string, title: string, description: string) {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const task = await this.taskModel.create({
        userId: user.id,
        title: title,
        description: description,
      });
      return {
        success: true,
        task: task,
      };
    } catch (error: any) {
      console.log(error);
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status,
      );
    }
  }

  async updateTask(taskId: string, updateData: object, userId: string) {
    try {
      const task = await this.taskModel.findById(taskId);
      if (!task) {
        throw new NotFoundException('Invalid Task ID');
      }
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new UnauthorizedException('Invalid Token');
      }
      if (task.userId !== user.id) {
        throw new UnauthorizedException('Invalid Token');
      }
      const newTask = await this.taskModel.updateOne(
        { _id: taskId, userId: user.id },
        updateData,
        { new: true },
      );
      return {
        success: true,
        task: newTask,
      };
    } catch (error: any) {
      console.log(error);
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status,
      );
    }
  }
}
