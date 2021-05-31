import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  gardenName: string;

  @IsNotEmpty()
  gardenGeo: string;

  @IsNotEmpty()
  taskName: string;

  @IsNotEmpty()
  taskSummary: string;

  @IsNotEmpty()
  taskStatus: Boolean;

  @IsNotEmpty()
  plantsIds: Array<string>;
}
