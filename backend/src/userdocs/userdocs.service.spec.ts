import { Test, TestingModule } from '@nestjs/testing';
import { UserdocsService } from './userdocs.service';

describe('UserdocsService', () => {
  let service: UserdocsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserdocsService],
    }).compile();

    service = module.get<UserdocsService>(UserdocsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
