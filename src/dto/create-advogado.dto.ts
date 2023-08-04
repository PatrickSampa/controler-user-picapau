import {
  IsString,
  IsUUID,
} from 'class-validator';


export class CreateAdvogadoDto {
  @IsString()
  name: string;


}
