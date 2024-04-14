import { Module } from '@nestjs/common';
import { EcoService } from './eco.service';
import { EcoController } from './eco.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcoEntity } from './entities/eco.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EcoEntity])],
  controllers: [EcoController],
  providers: [EcoService],
  exports: [EcoService]
})
export class EcoModule {}
