import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
        message: "role not valid"
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}

