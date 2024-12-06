import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const configOptions = {
  isGlobal: true,
  envFilePath: ['.env.development', '.env']
}


@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
      
        // WIP: Add parseInt to env 
        port: 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
        entities: [],
        synchronize: true,
      }
      ),
  ],
  
  controllers: [],
  providers: [],
})

export class AppModule {}
