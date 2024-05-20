import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Task {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  title: string;

  @Prop({ type: mongoose.SchemaTypes.String })
  description: string;

  @Prop({ type: mongoose.SchemaTypes.String, required: true })
  userId: string;
}

export const taskSchema = SchemaFactory.createForClass(Task);
