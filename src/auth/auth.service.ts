import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { User } from 'src/user/user.shema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async createUser(email: string, password: string) {
    try {
      const userExists = await this.userModel.findOne({ email: email });
      if (userExists) {
        throw new ConflictException('User already exists');
      }
      const user = await this.userModel.create({
        email: email,
        password: bcrypt.hashSync(password, 10),
      });
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
