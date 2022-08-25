import { Test, TestingModule } from '@nestjs/testing';
import { PassangerController } from './passanger.controller';

describe('PassangerController', () => {
  let controller: PassangerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassangerController],
    }).compile();

    controller = module.get<PassangerController>(PassangerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
