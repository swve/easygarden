import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
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


  @ApiProperty()
  plant: Array<object>;

  @IsNotEmpty()
  @ApiProperty()
  plantSearch: string;
  
  
}
