import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsInt, IsNumber } from "class-validator";
export class AddMemberDto {
       @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ArrayUnique()
  @IsInt({ each: true })
  members: number[];
}