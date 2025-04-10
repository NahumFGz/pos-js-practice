import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
  //exports: [AppService], //! Con el exports se hace q el service esté disponible donde se importe y no solo donde el módulo
})
export class AppModule {}
