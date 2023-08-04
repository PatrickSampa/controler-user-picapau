import { Module } from '@nestjs/common';
import { AdvogadosController } from './advogados.controller';
import { AdvogadosService } from './advogados.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AdvogadosController],
  providers: [AdvogadosService],
  exports: [AdvogadosService]
})
export class AdvogadosModule {}
