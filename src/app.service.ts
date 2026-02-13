import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { NethysActionsService } from 'src/lib/nethys/nethys-actions.service';

@Command({ name: 'main', options: { isDefault: true } })
export class AppService extends CommandRunner {
  private logger = new Logger(AppService.name);

  constructor(private nethysActionService: NethysActionsService) {
    super();
  }

  async run() {
    await this.nethysActionService.main();
  }
}
