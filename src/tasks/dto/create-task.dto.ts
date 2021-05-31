import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
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
