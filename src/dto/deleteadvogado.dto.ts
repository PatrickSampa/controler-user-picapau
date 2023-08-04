import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvogadoDto } from './create-advogado.dto';


export class deleteAdvogadoDTO extends PartialType(CreateAdvogadoDto) {}
