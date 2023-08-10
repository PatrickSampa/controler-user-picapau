import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvogadoDto } from './create-advogado.dto';
import { IsInt, IsNumber } from 'class-validator';


export class deleteAdvogadoDTO extends PartialType(CreateAdvogadoDto) {

    @IsNumber()
    @IsInt()
    id: number
}
