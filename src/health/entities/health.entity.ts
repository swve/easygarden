import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HealthDocument = Health & Document;

@Schema()
export class Health {
  @Prop()
  gardenName: string;

  @Prop()
  ville: string;

  @Prop()
  qualitéAir: string;

  @Prop()
  meteo: string;

  @Prop()
  température: string;

  @Prop()
  humidité: string;

  @Prop()
  planteInfo:string;

  
 

}

export const HealthSchema = SchemaFactory.createForClass(Health);