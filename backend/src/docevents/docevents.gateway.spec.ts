import { Test, TestingModule } from '@nestjs/testing';
import { DoceventsGateway } from './docevents.gateway';

describe('DoceventsGateway', () => {
  let gateway: DoceventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoceventsGateway],
    }).compile();

    gateway = module.get<DoceventsGateway>(DoceventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
