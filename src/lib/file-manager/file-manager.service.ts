import { Injectable } from '@nestjs/common';
import { mkdirSync, WriteFileOptions, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileManagerService {
  constructor(private basePath: string) {
    mkdirSync(this.sanitizePath(''), { recursive: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveFile(path: string, data: any, options?: WriteFileOptions) {
    writeFileSync(
      `${this.sanitizePath(path)}.json`,
      JSON.stringify(data),
      options,
    );
  }

  protected sanitizePath(path: string) {
    return join(
      __dirname,
      `${['../../..', this.basePath, path].join('/').replaceAll('//', '/')}`,
    );
  }
}
