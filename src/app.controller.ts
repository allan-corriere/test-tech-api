import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Monument } from './classes/monument';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('monuments')
  async findAll(@Query() queries?: object): Promise<Monument[]> {
    return await this.appService.findAll(queries);
  }

  @Post('best_monument')
  async markAsBest(@Body('id') id: string): Promise<Monument> {
    return await this.appService.markAsBest(id);
  }

  @Get('types')
  async findAllTypes(): Promise<string[]> {
    return await this.appService.findAllTypes();
  }
}
