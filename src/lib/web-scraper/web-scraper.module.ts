import { Module } from '@nestjs/common';
import { WebScraperService } from 'src/lib/web-scraper/web-scraper.service';

@Module({
  providers: [WebScraperService],
  exports: [WebScraperService],
})
export class WebScraperModule {}
