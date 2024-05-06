import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { NatsModule } from '@app/common/nats/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [TasksController],
  providers: [],
})
export class TasksModule {}
