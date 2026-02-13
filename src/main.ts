import { CommandFactory } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, new Logger());

  console.log('Thanks!');
}

bootstrap().catch((err) => {
  console.error('oh no!');
  console.error(err);
});
