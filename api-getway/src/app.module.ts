import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PassangerModule } from './passanger/passanger.module';
import { FlightModule } from './flight/flight.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PassangerModule,
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
