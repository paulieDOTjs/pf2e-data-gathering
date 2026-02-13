import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WebScraperService {
  private logger = new Logger(WebScraperService.name);
  // eslint-disable-next-line @typescript-eslint/require-await
  async scrape() {
    this.logger.log('i am scraping the interwebz');
  }
}
