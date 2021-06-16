import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class FindCommunitiesDTO {

    @IsNotEmpty()
    @ApiProperty()
    filter: string;

    @IsNotEmpty()
    @ApiProperty()
    sort: string;
}
