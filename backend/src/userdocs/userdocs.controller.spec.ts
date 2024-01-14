import { Test, TestingModule } from '@nestjs/testing';
import { UserdocsController } from './userdocs.controller';

describe('UserdocsController', () => {
  let controller: UserdocsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdocsController],
    }).compile();

    controller = module.get<UserdocsController>(UserdocsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
