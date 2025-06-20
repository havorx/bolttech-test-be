import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseConfigService } from './mongoose/mongoose-config.service';
import { CarsModule } from './modules/cars/cars.module';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    CarsModule,

    BookingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
