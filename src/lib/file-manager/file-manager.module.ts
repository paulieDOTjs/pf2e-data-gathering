import { DynamicModule, Module } from '@nestjs/common';
import { FileManagerService } from 'src/lib/file-manager/file-manager.service';

@Module({})
export class FileManagerModule {
  static register(basePath: string): DynamicModule {
    return {
      module: FileManagerModule,
      providers: [
        {
          provide: FileManagerService,
          useFactory: () => new FileManagerService(basePath),
        },
      ],
      exports: [FileManagerService],
    };
  }
}
