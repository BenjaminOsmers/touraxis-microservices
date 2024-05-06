import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { NatsModule } from '@app/common/nats/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
