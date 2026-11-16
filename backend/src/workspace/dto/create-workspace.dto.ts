import { IsOptional, IsString } from "class-validator";

export class CreateWorkspaceDto {

    @IsString()
    title : string

    @IsOptional()
    @IsString()
    description : string
}
