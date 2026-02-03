import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [UserService,UserRepository],
  controllers: [UserController],
  imports: [DbModule],
})
export class UserModule {}
