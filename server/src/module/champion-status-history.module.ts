import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionStatusHistoryController } from '../web/rest/champion-status-history.controller';
import { ChampionStatusHistoryRepository } from '../repository/champion-status-history.repository';
import { ChampionStatusHistoryService } from '../service/champion-status-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChampionStatusHistoryRepository])],
  controllers: [ChampionStatusHistoryController],
  providers: [ChampionStatusHistoryService],
  exports: [ChampionStatusHistoryService],
})
export class ChampionStatusHistoryModule {}
