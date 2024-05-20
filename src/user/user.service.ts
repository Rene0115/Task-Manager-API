import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.shema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async getUsers() {
    try {
      const users = await this.userModel.find({}, '-password -__v');
      return {
        success: true,
        users: users,
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
  async getUserById(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id }, '-password -__v');
      return {
        success: true,
        user: user,
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
