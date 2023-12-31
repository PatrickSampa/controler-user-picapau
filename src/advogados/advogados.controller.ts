import { Body, Controller, Delete, Get, Patch, Post, Request } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateAdvogadoDto } from '../dto/create-advogado.dto';
import { AdvogadosService } from './advogados.service';
import { deleteAdvogadoDTO } from '../dto/deleteadvogado.dto';
import { UpdateAdvogadoDTO } from '../dto/update-advogado.dto';

@Controller('advogados')
export class AdvogadosController {
constructor(private readonly advogadosService: AdvogadosService){}


    
 
    @Post('create/')
    async create(@Request() req: AuthRequest, @Body() advogado: CreateAdvogadoDto){
        return await this.advogadosService.create(req.headers.authorization, advogado)
    }



    @Get('findAll')
    findAll() {
      return this.advogadosService.advogadosAll()
    }

    @Get('findAllFromUser')
    findAllUserAdvogados(@Request() req: AuthRequest){
        return this.advogadosService.advogadosAllUser(req.headers.authorization)
    } 


    @Patch('update')
    update(@Request() req: AuthRequest, @Body() advogado: UpdateAdvogadoDTO) { 
     return this.advogadosService.update(req.headers.authorization, advogado)
    }





  @Delete('delete')
  async remove(@Request() req: AuthRequest, @Body() advogado: deleteAdvogadoDTO) {
    return  await this.advogadosService.remove(req.headers.authorization, advogado)
  } 
  


}
