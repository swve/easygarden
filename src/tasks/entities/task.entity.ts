import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  gardenName: string;

  @Prop()
  gardenPreciseGeo: Array<string>;

  @Prop()
  taskName: string;

  @Prop()
  taskSummary: string;

  @Prop()
  taskStatus: Boolean;

  @Prop()
  plantsIds: Array<Object>;

}

export const TaskSchema = SchemaFactory.createForClass(Task);