import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoriesModule } from './categories/categories.module'
import { typeOrmConfig } from './config/typeorm.config'
import { ProductsModule } from './products/products.module'
import { TransactionsModule } from './transactions/transactions.module'
import { CouponsModule } from './coupons/coupons.module'
import { UploadImageModule } from './upload-image/upload-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    CategoriesModule,
    ProductsModule,
    TransactionsModule,
    CouponsModule,
    UploadImageModule,
    //!Para el seeder hay q quitar esto despues de crear el modulo
    //SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService], //!Aqui tmb se quita el seeder
})
export class AppModule {}
