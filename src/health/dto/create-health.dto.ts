import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateHealthDto {
  @IsNotEmpty()
  @ApiProperty()
  gardenName: string;

  // Data from the user 
  @IsNotEmpty()
  @ApiProperty()
  gardenGeo: string;
  
  ville: string;

  meteo: string;

  humidité: string;

  qualitéAir: string;


}
