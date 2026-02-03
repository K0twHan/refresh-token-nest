import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsInt, IsNotEmpty } from "class-validator";

export class DepositDTO {
    @ApiProperty({type: Number, description: 'ID of the user making the deposit' })
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({type: Number, description: 'Amount to deposit' })
    amount: number;
}