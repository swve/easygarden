import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskDocument } from "./entities/task.entity";
const axios = require("axios");

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  /**
   * Create the task object after assiging the proper geolocalisation data from Data Geo Gouv
   * @param createTaskDto Body object 
   * @returns 
   */
  async create(createTaskDto: CreateTaskDto) {
    // get user provided data
    const sentGeo = createTaskDto.gardenGeo;

    // pass to the API to get precise geolocalisation and pass it to the Task Object
    createTaskDto.gardenPreciseGeo = await this.getCompleteAddress(sentGeo);

    // save data to the mongoDB database
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  /**
   * Get The complete Geolocalisation data from a user request 
   * @param geo 
   * @returns 
   */
  async getCompleteAddress(geo) {
    // get the response from the API
    const response = await axios.get("https://api-adresse.data.gouv.fr/search/?q=" + geo);
    return response.data.features;
  }

  /**
   * Find all tasks
   * @returns 
   */
  async findAll() {
    const task = await this.taskModel.find().exec();
    return task;
  }

  /**
   * Find one task by its ID
   * @param id 
   * @returns 
   */
  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();
    return task;
  }

  /**
   * Update a particular Task Object by ID
   * @param id 
   * @param updateTaskDto 
   * @returns 
   */
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.updateOne({ id: id }, updateTaskDto);
    return task;
  }

  /**
   * Remove a task (delete)
   * @param id 
   * @returns 
   */
  async remove(id: string) {
    const task = await this.taskModel.deleteOne({ id: id });
    return task;
  }
}
