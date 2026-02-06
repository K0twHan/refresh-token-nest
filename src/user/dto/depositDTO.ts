import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsInt, IsNotEmpty } from "class-validator";

export class DepositDTO {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({type: Number, description: 'Amount to deposit' })
    amount: number;
}