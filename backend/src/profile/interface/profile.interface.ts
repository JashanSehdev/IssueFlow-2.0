import { Role } from "../../users/enum/roles.enum.js"
import { UserResponse } from "../../users/interfaces/user.interface.js"

export interface Profile {
    firstName : string,
    lastName : string,
    mobileNumber : string,
    age : number
}

export interface UserWithProfile {
    id : number,
    username : string,
    email:string,
    role : Role,
    avatar : string
    profile : Profile
}