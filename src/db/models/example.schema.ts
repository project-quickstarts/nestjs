
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

export type ExampleDocument = HydratedDocument<Example>;

@Schema({ collection: 'examples', timestamps: true })
export class Example extends BaseSchema {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.Number,
    default: 0,
  })
  age: number;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
