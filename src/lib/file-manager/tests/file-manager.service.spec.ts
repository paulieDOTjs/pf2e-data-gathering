import { Test, TestingModule } from '@nestjs/testing';
import { FileManagerService } from '../file-manager.service';
import { join } from 'path';

class TestClass extends FileManagerService {
  testSanitize(path: string) {
    return this.sanitizePath(path);
  }
}

jest.mock('fs');

describe('FileManagerService', () => {
  const mockPath = 'some/path/somewhere';
  let fileManagerService: TestClass;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FileManagerService,
          useFactory() {
            return new TestClass(mockPath);
          },
        },
      ],
    }).compile();

    fileManagerService = module.get<TestClass>(FileManagerService);
  });

  it('should be defined', () => {
    expect(fileManagerService).toBeDefined();
  });

  describe('sanitizePath', () => {
    it('should combine base path and the passed in path', () => {
      const result = fileManagerService.testSanitize('a-path');
      expect(result).toBe(
        join(__dirname, '../../../..') + '/some/path/somewhere/a-path.json',
      );
    });
    it('should remove extra "///////"', () => {
      const result = fileManagerService.testSanitize('/a-path');
      expect(result).toBe(
        join(__dirname, '../../../..') + '/some/path/somewhere/a-path.json',
      );
    });
    it('should remove extra ".json"', () => {
      const result = fileManagerService.testSanitize('/a-path.json');
      expect(result).toBe(
        join(__dirname, '../../../..') + '/some/path/somewhere/a-path.json',
      );
    });
  });
});
