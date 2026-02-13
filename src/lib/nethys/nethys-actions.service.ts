import { Injectable } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { NethysInquiryService } from 'src/lib/nethys/nethys-inquiry.service';
import { WebScraperService } from 'src/lib/web-scraper/web-scraper.service';
import { Actionable } from 'src/models/Action';
import { InquiryResult } from 'src/models/InquiryResults';

@Injectable()
export class NethysActionsService implements Actionable {
  constructor(
    private inquirerService: InquirerService,
    private nethysInquiryService: NethysInquiryService,
    private webScraperService: WebScraperService,
  ) {}

  async main() {
    const { getConfirmation } = await this.inquirerService.ask<
      InquiryResult<NethysInquiryService>
    >(this.nethysInquiryService.name, undefined);

    if (getConfirmation) await this.webScraperService.scrape();
  }
}
