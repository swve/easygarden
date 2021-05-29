import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommunityModule } from "./community/community.module";
import { HealthModule } from "./health/health.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from './tasks/tasks.module';


// DB Crendentials
const DB_CREDENTIALS = process.env.MONGO_CREDENTIALS || '';
const DB_HOST = process.env.MONGO_HOST || 'localhost';
const DB_PORT = process.env.MONGO_PORT || '27017';
const DB_NAME = process.env.MONGO_DB_NAME || 'easygarden';
const DB_CONNECTION_STRING = `mongodb://${DB_CREDENTIALS}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

@Module({
  imports: [
    CommunityModule,
    HealthModule,
    TasksModule,
    MongooseModule.forRoot(DB_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
