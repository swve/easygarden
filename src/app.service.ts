import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "./tasks/entities/task.entity";

@Injectable()
export class AppService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  getHello(): string {
    return "Hello World!";
  }
}
