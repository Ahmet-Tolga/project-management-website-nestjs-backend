import { Controller, Get, Post, Body, } from '@nestjs/common';
import { EcoService } from './eco.service';
import { CreateEcoDto } from './dto/create-eco.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Echo')
@Controller('echo')
export class EcoController {
  constructor(private readonly ecoService: EcoService) {}

  @Post('test')
  postTest(@Body() createEcoDto: CreateEcoDto) {
    return this.ecoService.postTest(createEcoDto);
  }

  @Get('msg')
  getTest() {
    return this.ecoService.getTest();
  }
}
