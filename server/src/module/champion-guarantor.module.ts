import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionGuarantorController } from '../web/rest/champion-guarantor.controller';
import { ChampionGuarantorRepository } from '../repository/champion-guarantor.repository';
import { ChampionGuarantorService } from '../service/champion-guarantor.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChampionGuarantorRepository])],
  controllers: [ChampionGuarantorController],
  providers: [ChampionGuarantorService],
  exports: [ChampionGuarantorService],
})
export class ChampionGuarantorModule {}
