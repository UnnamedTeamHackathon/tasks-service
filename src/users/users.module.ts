import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { DecompileModule } from 'src/decompile/decompile.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    PrismaModule,
    JwtModule,
    DecompileModule,
    ClientsModule.register([
      {
        name: 'AWARD_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'award',
            brokers: [process.env.KAFKA_ENDPOINT],
          },
          producerOnlyMode: true,
          producer: {
            createPartitioner: Partitioners.DefaultPartitioner,
          },
        },
      },
    ]),
  ],
})
export class UsersModule {}
