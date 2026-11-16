import { Type } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

export class CreateProfileDto {

        @IsString()
        firstName : string

        @IsOptional()
        @IsString()
        lastName : string
    
        @IsString()
        mobileNumber : string

        @IsOptional()
        @Type(() => Number)
        age : number
}
