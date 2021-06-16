import { PartialType } from "@nestjs/mapped-types";
import { CreateHealthDto } from "./create-health.dto";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateHealthDto extends PartialType(CreateHealthDto) {


    @IsNotEmpty()
    @ApiProperty()
    gardenName: string;

    // Data from the user 
    @IsNotEmpty()
    @ApiProperty()
    gardenGeo: string;

    @IsNotEmpty()
    @ApiProperty()
    plantsIds: Array<string>;

    // Data from GEO API GOUV FR
    ville: string

    meteo: string;

    température: string;

    humidité: string;

    qualitéAir: string;

    planteInfo:string;

    
}
