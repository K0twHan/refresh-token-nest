import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty, Length } from "class-validator"

export class SignInDTO {
  @ApiProperty({ type: String, description: 'User email' })
  @IsEmail()
  email: string
  @ApiProperty({ type: String, description: 'User password' })
  @IsNotEmpty()
  @Length(6, 20)
  password: string
}