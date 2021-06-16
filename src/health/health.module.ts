import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Health, HealthSchema } from './entities/health.entity';
import { AppService } from 'src/app.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Health.name, schema: HealthSchema }])],
  controllers: [HealthController],
  providers: [HealthService,AppService]
})
export class HealthModule {}
