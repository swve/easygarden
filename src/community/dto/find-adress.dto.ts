import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class FindCommunityAdressDTO {

    @IsNotEmpty()
    @ApiProperty()
    adresse: string;

    @IsNotEmpty()
    @ApiProperty()
    filtre: string;
}
