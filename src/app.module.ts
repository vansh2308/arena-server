import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './db/db.module';
// import { AuthModule } from './auth/auth.module';
import * as Joi from '@hapi/joi';
// import { UsersModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required()
      }),
    }),

    DatabaseModule,
    AuthModule,
    UsersModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
