import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from './entities/Community.entity';
import { AppService } from '../app.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Community.name, schema: CommunitySchema }])],
  controllers: [CommunityController],
  providers: [CommunityService, AppService]
})
export class CommunityModule {}
