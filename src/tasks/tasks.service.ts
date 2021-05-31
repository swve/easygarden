import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskDocument } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}


  // TOOD : add Trefle usage + French Gov address before creating the Task object 
  create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll() {
    const task = await this.taskModel.find().exec();
    return task;
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.updateOne({ id: id }, updateTaskDto);
    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel.deleteOne({ id: id });
    return task;
  }
}
