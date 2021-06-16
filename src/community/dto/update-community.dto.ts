import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityDto } from './create-community.dto';
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {
    @IsNotEmpty()
    @ApiProperty()
    communityName: string;

    // adresse complète
    @IsNotEmpty()
    @ApiProperty()
    communityGeo: string;

    // Data from GEO API GOUV FR
    communityPreciseGeo: Array<string>;

    @ApiProperty()
    communityVille: string;

    @ApiProperty()
    communityCP: string;

    @ApiProperty()
    communityWebsite: string;
}
