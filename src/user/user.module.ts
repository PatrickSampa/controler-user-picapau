import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PostgresUsersRepository } from '../repositories/adapters/PostgreeUserRepository';

@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule/* , forwardRef(() => PostgresUsersRepository) */],
  controllers: [UserController],
  providers: [UserService, PostgresUsersRepository, {
    provide: 'IUsersRepository',
    useExisting: PostgresUsersRepository,
  }],
  exports: [UserService]
})
export class UserModule {}
