import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@app/common/entities/task.entity';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from '@app/common/nats/nats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Task]),
    DatabaseModule,
    NatsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
