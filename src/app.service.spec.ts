import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Monument } from './classes/monument';

describe('AppService', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('stringArrayToSet', () => {
    it('should return unique strings', () => {
      const stringArrayPayload = [
        'Dog',
        'Cat',
        'Turtle',
        'Cat',
        'Dolphin',
        'Dog',
      ];

      const stringArrayExpected = ['Dog', 'Cat', 'Turtle', 'Dolphin'];

      expect(appService.stringArrayToSet(stringArrayPayload)).toStrictEqual(
        stringArrayExpected,
      );
    });

    it('should return an empty array if receive an empty array', () => {
      const stringArrayPayload = [];

      const stringArrayExpected = [];

      expect(appService.stringArrayToSet(stringArrayPayload)).toStrictEqual(
        stringArrayExpected,
      );
    });
  });

  describe('extractTypes', () => {
    it('should return a string array with all the types', () => {
      const monumentsPayload = [
        new Monument('AA', 50.1, 3.2, 'House', 1984, 'Roubaix'),
        new Monument('AB', 50.2, 3.3, 'House', 1985, 'Lille'),
        new Monument('AC', 50.3, 3.4, 'Apartment', 1986, 'Roubaix'),
        new Monument('AD', 50.4, 3.5, 'Square', 1987, 'Armentières'),
      ];

      const typesExpected = ['House', 'House', 'Apartment', 'Square'];

      expect(appService.extractTypes(monumentsPayload)).toStrictEqual(
        typesExpected,
      );
    });

    it('should return an empty array if receive an empty array', () => {
      const monumentsPayload = [];

      const typesExpected = [];

      expect(appService.extractTypes(monumentsPayload)).toStrictEqual(
        typesExpected,
      );
    });
  });
});
