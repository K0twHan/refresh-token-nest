import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEmail, IsEmpty, isEmpty, isEnum, Length, IsEnum, IsDate, IsNotEmpty } from "class-validator"
import { Decimal } from "generated/prisma/internal/prismaNamespace"

export class CreateUserDTO {
    @ApiProperty({ type: String, description: 'User email' })
    @IsEmail()
    @IsNotEmpty()
    email   :  string 
    @IsNotEmpty()
    @Length(6, 20) 
    @ApiProperty({ type: String, description: 'User password' })
  password : string
  @IsNotEmpty()
  @Length(3, 15)
   @ApiProperty({ type: String, description: 'User first name' })
  name     : string
    @IsNotEmpty()
    @Length(3, 15)
    @ApiProperty({ type: String, description: 'User last name' })
  lastName  : string
  @IsEnum(['TRY', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR'], { message: 'currency must be one of the following values: TRY, USD, EUR, GBP, JPY, CNY, INR' })
   @ApiProperty({ enum: ['TRY', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR'] })
  currency  : string
    @IsNotEmpty()
    @ApiProperty({ type: Date, description: 'User birth date' })
    @Type(() => Date)
    @IsDate()
  birthDay     : Date
}