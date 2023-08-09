import { Module } from '@nestjs/common';
import { AdvogadosController } from './advogados.controller';
import { AdvogadosService } from './advogados.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PostgresLawyerRepository } from '../repositories/adapters/PostgreeLawyerRepository';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AdvogadosController],
  providers: [AdvogadosService, PostgresLawyerRepository ,{
    provide: 'ILawyerRepository',
    useExisting: PostgresLawyerRepository,
  }],
  exports: [AdvogadosService]
})
export class AdvogadosModule {}
