import {
  Injectable,
  ConflictException,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from 'src/user/user.shema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}
  async signup(email: string, password: string) {
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
        user: {
          email: user.email,
          id: user._id,
        },
        token: this.jwtService.sign({ email: user.email, id: user.id }),
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

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Email or password is incorrect');
      }
      return {
        success: true,
        user: {
          email: user.email,
          id: user._id,
        },
        token: this.jwtService.sign({ email: user.email, id: user.id }),
      };
    } catch (error: any) {
      console.log(error);
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        400,
      );
    }
  }
}
