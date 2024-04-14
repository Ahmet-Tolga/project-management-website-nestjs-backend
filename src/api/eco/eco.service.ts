import { Injectable } from '@nestjs/common';
import { CreateEcoDto } from './dto/create-eco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EcoEntity } from './entities/eco.entity';

@Injectable()
export class EcoService {
  constructor(
    @InjectRepository(EcoEntity)
    private readonly ecoRepository: Repository<EcoEntity>
  ){}

  async postTest(createEcoDto: CreateEcoDto) {
    return await this.ecoRepository.save(createEcoDto);
  }

  async getTest() {
    return this.ecoRepository.find();
  }
}
