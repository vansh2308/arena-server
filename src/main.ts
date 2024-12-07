import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';


declare const module: any;



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();
  

  await app.listen(process.env.PORT ?? 3000);

  if(module.hot){
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
