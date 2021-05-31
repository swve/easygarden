import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  gardenName: string;

  // Data from the user 
  @IsNotEmpty()
  gardenGeo: string;

  // Data from GEO API GOUV FR
  gardenPreciseGeo: Array<string>;

  @IsNotEmpty()
  taskName: string;

  @IsNotEmpty()
  taskSummary: string;

  @IsNotEmpty()
  taskStatus: Boolean;

  @IsNotEmpty()
  plantsIds: Array<string>;
}
