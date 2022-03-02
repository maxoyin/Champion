import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionStatusChangeReasonController } from '../web/rest/champion-status-change-reason.controller';
import { ChampionStatusChangeReasonRepository } from '../repository/champion-status-change-reason.repository';
import { ChampionStatusChangeReasonService } from '../service/champion-status-change-reason.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChampionStatusChangeReasonRepository])],
  controllers: [ChampionStatusChangeReasonController],
  providers: [ChampionStatusChangeReasonService],
  exports: [ChampionStatusChangeReasonService],
})
export class ChampionStatusChangeReasonModule {}
