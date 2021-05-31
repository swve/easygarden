import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  gardenName: string;

  @Prop()
  gardenGeo: string;

  @Prop()
  taskName: string;

  @Prop()
  taskSummary: string;

  @Prop()
  taskStatus: Boolean;

  @Prop()
  plantsIds: Array<string>;

}

export const TaskSchema = SchemaFactory.createForClass(Task);