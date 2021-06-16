import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommunityDto {
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
    communityContext: string; // département

    @ApiProperty()
    communityWebsite: string;
}
