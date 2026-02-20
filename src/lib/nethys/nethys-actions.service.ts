import { Injectable, Logger } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { FileManagerService } from 'src/lib/file-manager/file-manager.service';
import { NethysInquiryService } from 'src/lib/nethys/nethys-inquiry.service';
import { NETHYS_TARGETS } from 'src/lib/nethys/nethys.config';
import { WebScraperService } from 'src/lib/web-scraper/web-scraper.service';
import { Actionable } from 'src/models/Action';
import { InquiryResult } from 'src/models/InquiryResults';

@Injectable()
export class NethysActionsService implements Actionable {
  private logger = new Logger(NethysActionsService.name);

  constructor(
    private inquirerService: InquirerService,
    private nethysInquiryService: NethysInquiryService,
    private webScraperService: WebScraperService,
    private fileManagerService: FileManagerService,
  ) {}

  private num = 1;

  async main() {
    const { getConfirmation } = await this.inquirerService.ask<
      InquiryResult<NethysInquiryService>
    >(this.nethysInquiryService.name, undefined);
    if (getConfirmation) {
      await new Promise((res, rej) => {
        this.webScraperService.scrape(NETHYS_TARGETS).subscribe({
          next: (data) => {
            this.fileManagerService.saveFile(`file-${this.num++}`, data);
          },
          error: (err) => {
            const message = `Something error occurred: ${err}`;
            console.error(message);
            rej(new Error(message));
          },
          complete: () => {
            console.log('done');
            res('done');
          },
        });
      });
    }
  }
}
