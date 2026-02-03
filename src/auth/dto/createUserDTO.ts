import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, Length } from "class-validator"

export class SignInDTO {
  @ApiProperty({ type: String, description: 'User email' })
  @IsEmail()
  email: string
  @ApiProperty({ type: String, description: 'User password' })
  @IsEmpty()
  @Length(6, 20)
  password: string
}