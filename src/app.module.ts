import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'src/app.service';
import { NethysModule } from 'src/lib/nethys/nethys.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), NethysModule],
  providers: [AppService],
})
export class AppModule {}
