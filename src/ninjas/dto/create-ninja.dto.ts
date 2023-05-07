import { IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    readonly name: string;

    @IsEnum(['green', 'black', 'purple'], {message: 'Invalid belt'})
    readonly belt: 'green' | 'black' | 'purple';
}
