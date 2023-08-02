import { Get, Injectable } from '@nestjs/common';
import { CurrentUser } from './auth/decorators/current-user.decorator';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


}
