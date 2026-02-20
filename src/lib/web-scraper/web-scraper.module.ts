import { DynamicModule, Module } from '@nestjs/common';
import { WebScraperService } from 'src/lib/web-scraper/web-scraper.service';

@Module({})
export class WebScraperModule {
  static register(
    clientNodeUrl: string,
    elasticSearchIndex: string,
  ): DynamicModule {
    return {
      module: WebScraperModule,
      providers: [
        {
          provide: WebScraperService,
          useFactory: () =>
            new WebScraperService(clientNodeUrl, elasticSearchIndex),
        },
      ],
      exports: [WebScraperService],
    };
  }
}
