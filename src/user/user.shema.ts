import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true, type: mongoose.SchemaTypes.String, unique: true })
  email: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
