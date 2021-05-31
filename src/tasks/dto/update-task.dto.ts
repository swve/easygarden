import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @ApiProperty()
  gardenName: string;

  // Data from the user 
  @IsNotEmpty()
  @ApiProperty()
  gardenGeo: string;

  // Data from GEO API GOUV FR
  gardenPreciseGeo: Array<string>;

  @IsNotEmpty()
  @ApiProperty()
  taskName: string;

  @IsNotEmpty()
  @ApiProperty()
  taskSummary: string;

  @IsNotEmpty()
  @ApiProperty()
  taskStatus: Boolean;

  @IsNotEmpty()
  @ApiProperty()
  plantsIds: Array<string>;
}
