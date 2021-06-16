import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommunityDocument = Community & Document;

@Schema()
export class Community {

    @Prop()
    communityName: string;

    @Prop()
    communityGeo: string;

    @Prop()
    communityPreciseGeo: Array<string>;

    @Prop()
    communityVille: string;

    @Prop()
    communityContext: string;

    @Prop()
    communityWebsite: string;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);