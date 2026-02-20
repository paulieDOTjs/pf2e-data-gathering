import { Module } from '@nestjs/common';
import { FileManagerModule } from 'src/lib/file-manager/file-manager.module';
import { NethysActionsService } from 'src/lib/nethys/nethys-actions.service';
import { NethysInquiryService } from 'src/lib/nethys/nethys-inquiry.service';
import {
  NETHYS_BASE_PATH,
  NETHYS_CLIENT_NODE_URL,
  NETHYS_ELASTIC_SEARCH_INDEX,
} from 'src/lib/nethys/nethys.config';
import { WebScraperModule } from 'src/lib/web-scraper/web-scraper.module';

@Module({
  imports: [
    WebScraperModule.register(
      NETHYS_CLIENT_NODE_URL,
      NETHYS_ELASTIC_SEARCH_INDEX,
    ),
    FileManagerModule.register(NETHYS_BASE_PATH),
  ],
  exports: [NethysActionsService],
  providers: [NethysActionsService, NethysInquiryService],
})
export class NethysModule {}
