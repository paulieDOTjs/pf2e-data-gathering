import { Module } from '@nestjs/common';
import { NethysActionsService } from 'src/lib/nethys/nethys-actions.service';
import { NethysInquiryService } from 'src/lib/nethys/nethys-inquiry.service';
import { WebScraperModule } from 'src/lib/web-scraper/web-scraper.module';

@Module({
  imports: [WebScraperModule],
  exports: [NethysActionsService],
  providers: [NethysActionsService, NethysInquiryService],
})
export class NethysModule {}
